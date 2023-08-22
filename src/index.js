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
    options: {},
  };

  return config;
};
