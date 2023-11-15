import { getVoltoBlocksFooter } from '@plone-collective/volto-blocks-footer/actions';
import { voltoBlocksFooterReducer } from '@plone-collective/volto-blocks-footer/reducers';

import {
  ControlPanelWidget,
  FooterDisplay,
} from '@plone-collective/volto-blocks-footer/components';

export { GET_ADDON_FOOTER } from '@plone-collective/volto-blocks-footer/constants';
export { useVoltoBlocksFooter } from '@plone-collective/volto-blocks-footer/hooks';
export { getVoltoBlocksFooter };

export default (config) => {
  config.widgets.id = {
    ...config.widgets.id,
    volto_blocks_footer_controlpanel_data: ControlPanelWidget,
  };

  config.registerComponent({
    name: 'VoltoBlocksFooterDisplay',
    component: FooterDisplay,
  });
  const slotDefinitions = config.settings['volto-blocks-footer']?.slots;
  // Register all of the slots as dependent components for easier lookup later
  if (slotDefinitions && typeof slotDefinitions === 'object') {
    Object.keys(config.settings['volto-blocks-footer'].slots).forEach(
      (slotId) => {
        config.registerComponent({
          name: 'VoltoBlocksFooterDisplay',
          component: () => <FooterDisplay slot={slotId} />,
          dependencies: slotId,
        });
      },
    );
  }

  config.addonReducers = {
    ...config.addonReducers,
    voltoBlocksFooter: voltoBlocksFooterReducer,
  };

  config.settings.asyncPropsExtenders = [
    ...(config.settings.asyncPropsExtenders ?? []),
    {
      path: '/',
      extend: (dispatchActions) => {
        if (
          dispatchActions.filter(
            (asyncAction) => asyncAction.key === 'voltoBlocksFooter',
          ).length === 0
        ) {
          dispatchActions.push({
            key: 'voltoBlocksFooter',
            promise: ({ location, store: { dispatch } }) =>
              __SERVER__ && dispatch(getVoltoBlocksFooter()),
          });
        }
        return dispatchActions;
      },
    },
  ];

  config.settings['volto-blocks-footer'] = {
    slots: {
      // e.g.
      // footer: {
      //   title: 'Footer',
      // },
    },
  };

  return config;
};

export function eeaVoltoSlots(config) {
  const slotDefinitions = config.settings['volto-blocks-footer']?.slots;

  if (!slotDefinitions || typeof slotDefinitions !== 'object') {
    console.log('No slots defined');
    return config;
  }
  Object.keys(config.settings['volto-blocks-footer'].slots).forEach(
    (slotId) => {
      const SlotRenderer = config.getComponent({
        name: 'VoltoBlocksFooterDisplay',
        dependencies: [slotDefinitions],
      }).component;
      config.slots[slotId].push({
        path: '/',
        component: () => SlotRenderer,
      });
    },
  );

  return config;
}
