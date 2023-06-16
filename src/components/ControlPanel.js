import { Component, TextWidget } from '@plone/volto/components';
import { flattenToAppURL } from '@plone/volto/helpers/Url/Url';
import { useState, useEffect } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { Button, Form, Grid, Header, Icon, Menu, Segment } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { getAddonFooter } from '@plone-collective/volto-blocks-footer';

import { BlockPicker } from '@plone-collective/volto-blocks-footer/components';

// import './menu_configuration.css';

const messages = defineMessages({
  menuItemsHeader: {
    id: 'dropdownmenu-menuitems-header',
    defaultMessage: 'Menu items',
  },
  addSection: {
    id: 'add-section',
    defaultMessage: 'Add section',
  },
  deleteSection: {
    id: 'delete-section',
    defaultMessage: 'Delete section',
  },
  addMenuItem: {
    id: 'dropdownmenu-addmenuitem',
    defaultMessage: 'Add menu item',
  },
});

function defaultMenuItem(title) {
  return { title, visible: true, mode: 'simpleLink', linkUrl: [] };
}

function defaultRootMenu(title) {
  return [defaultMenuItem(title)];
}

const defaultMenuConfiguration = [defaultRootMenu(`Tab 0`)];

export function ControlPanelWidget({ value, id, onChange, required, title, description, ...rest }) {
  function handleChangeConfiguration(value) {
    setMenuConfiguration(value);
    debugger;
    onChange(id, JSON.stringify(value));
  }

  function addSection(e) {
    e.preventDefault();
    const menuItemsNumber = menuConfiguration.length;
    const menuItem = `/tab${menuItemsNumber}`;
    debugger;
    let newMenuConfiguration = [
      ...menuConfiguration,
      {
        ...defaultRootMenu(`Tab ${menuItemsNumber}`),
      },
    ];

    handleChangeConfiguration(newMenuConfiguration);
    setActiveMenu(newMenuConfiguration.length - 1);
  }

  const intl = useIntl();
  const [menuConfiguration, setMenuConfiguration] = useState(value ? JSON.parse(value) : defaultMenuConfiguration);
  const [activeMenu, setActiveMenu] = useState(0);
  const [activeMenuItem, setActiveMenuItem] = useState(0);
  const dispatch = useDispatch();
  const thingy = useSelector((state) => {
    debugger;
    return '';
  });

  useEffect(() => {
    dispatch(getAddonFooter());
  }, [dispatch]);

  return (
    <div className="menu-configuration-widget">
      <Form.Field inline id={id}>
        <Grid>
          <Grid.Row>
            <Grid.Column width="12">
              <div className="wrapper">
                <label htmlFor="menu-configuration">{title}</label>
              </div>
            </Grid.Column>
            <Grid.Column width="12" className="menu-configuration-widget">
              <div id="menu-configuration">
                <Menu pointing secondary className="menu-path-menu">
                  {menuConfiguration.map((menu, idx) => {
                    const visibleIndex = idx + 1;
                    return (
                      <Menu.Item
                        key={`section-${visibleIndex}`}
                        name={`section-${visibleIndex}`}
                        active={activeMenu === idx}
                        onClick={() => {
                          setActiveMenu(idx);
                          setActiveMenuItem(0);
                        }}
                      >
                        <span>Section {visibleIndex}</span>
                      </Menu.Item>
                    );
                  })}
                  <Menu.Item active={false} name={intl.formatMessage(messages.addSection)} onClick={addSection}>
                    <Icon name="plus" />
                  </Menu.Item>
                </Menu>
                <Segment>
                  <BlockPicker onChange={onChange} value={value} />
                </Segment>
              </div>
            </Grid.Column>
          </Grid.Row>
          {description && (
            <Grid.Row stretched>
              <Grid.Column stretched width="12">
                <p className="help">{description}</p>
              </Grid.Column>
            </Grid.Row>
          )}
        </Grid>
      </Form.Field>
    </div>
  );
}
