import { getVoltoSlotsEditorConfig } from '@plone-collective/volto-slots-editor/actions';
import { voltoSlotsEditorReducer } from '@plone-collective/volto-slots-editor/reducers';

import {
  ControlPanelWidget,
  SlotDisplay,
} from '@plone-collective/volto-slots-editor/components';

export { GET_SLOTS_EDITOR_CONFIG } from '@plone-collective/volto-slots-editor/constants';
export { useVoltoSlotsEditor } from '@plone-collective/volto-slots-editor/hooks';
export { getVoltoSlotsEditorConfig };

export default (config) => {
  config.widgets.id = {
    ...config.widgets.id,
    volto_slots_editor_controlpanel_data: ControlPanelWidget,
  };

  config.registerComponent({
    name: 'VoltoBlocksSlotDisplay',
    component: SlotDisplay,
  });
  const slotDefinitions = config.settings['volto-slots-editor']?.slots;
  // Register all of the slots as dependent components for easier lookup later
  if (slotDefinitions && typeof slotDefinitions === 'object') {
    Object.keys(config.settings['volto-slots-editor'].slots).forEach(
      (slotId) => {
        config.registerComponent({
          name: 'VoltoBlocksSlotDisplay',
          component: () => <SlotDisplay slot={slotId} />,
          dependencies: slotId,
        });
      },
    );
  }

  config.addonReducers = {
    ...config.addonReducers,
    voltoBlocksFooter: voltoSlotsEditorReducer,
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
              __SERVER__ && dispatch(getVoltoSlotsEditorConfig()),
          });
        }
        return dispatchActions;
      },
    },
  ];

  config.settings['volto-slots-editor'] = {
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
  const slotDefinitions = config.settings['volto-slots-editor']?.slots;

  if (!slotDefinitions || typeof slotDefinitions !== 'object') {
    console.log('No slots defined');
    return config;
  }
  Object.keys(config.settings['volto-slots-editor'].slots).forEach((slotId) => {
    const SlotRenderer = config.getComponent({
      name: 'VoltoBlocksSlotDisplay',
      dependencies: [slotDefinitions],
    }).component;
    config.slots[slotId].push({
      path: '/',
      component: () => SlotRenderer,
    });
  });

  return config;
}
