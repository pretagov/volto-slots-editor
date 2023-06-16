import menuSVG from '@plone/volto/icons/menu.svg';
import { getAddonFooter } from './actions';
// import { dropdownMenuNavItemsReducer } from './reducers';
// import { getItemsByPath } from './utils';
// import MenuConfigurationForm from './widget/MenuConfigurationForm';
import { ControlPanelWidget } from '@plone-collective/volto-blocks-footer/components';

export { GET_ADDON_FOOTER } from '@plone-collective/volto-blocks-footer/constants';
export { getAddonFooter };

export default (config) => {
  config.widgets.id = {
    ...config.widgets.id,
    volto_blocks_footer_controlpanel_data: ControlPanelWidget,
  };

  // config.registerComponent({
  //   name: 'MenuConfigurationForm',
  //   component: MenuConfigurationForm,
  // });

  // config.addonReducers = {
  //   ...config.addonReducers,
  //   voltoBlocksFooter: dropdownMenuNavItemsReducer,
  // };

  // config.settings.asyncPropsExtenders = [
  //   ...(config.settings.asyncPropsExtenders ?? []),
  //   {
  //     path: '/',
  //     extend: (dispatchActions) => {
  //       if (
  //         dispatchActions.filter(
  //           (asyncAction) => asyncAction.key === 'dropdownMenuNavItems'
  //         ).length === 0
  //       ) {
  //         dispatchActions.push({
  //           key: 'dropdownMenuNavItems',
  //           promise: ({ location, store: { dispatch } }) =>
  //             __SERVER__ && dispatch(getDropdownMenuNavitems()),
  //         });
  //       }
  //       return dispatchActions;
  //     },
  //   },
  // ];

  // config.settings.controlPanelsIcons['dropdown-menu-settings'] = menuSVG;

  config.settings['volto-blocks-footer'] = {
    options: {},
  };

  return config;
};
