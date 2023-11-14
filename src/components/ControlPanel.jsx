import { getVoltoBlocksFooter } from '@plone-collective/volto-blocks-footer';
import { Component, TextWidget } from '@plone/volto/components';
import { flattenToAppURL } from '@plone/volto/helpers/Url/Url';
import config from '@plone/volto/registry';
import { useEffect, useState } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Form,
  Grid,
  Header,
  Icon,
  Menu,
  Segment,
} from 'semantic-ui-react';

import { BlockPicker } from '@plone-collective/volto-blocks-footer/components';
import { useMemo } from 'react';

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
  return { title, visible: true };
}

function defaultRootMenu(title) {
  return [defaultMenuItem(title)];
}

const defaultMenuConfiguration = [defaultRootMenu(`Tab 0`)];

const leccData = {
  blocks: {
    'f610b132-1bcc-4d64-8ba7-bdf16509bee1': {
      '@type': 'columnsBlock',
      data: {
        blocks: {
          '97a1b94c-7793-4c69-9a7c-4b0adf3c58f0': {
            blocks: {
              '9ea70002-3ff3-4757-92de-03f81ca8de2d': {
                '@type': 'slate',
                plaintext: '',
                value: [
                  {
                    children: [
                      {
                        text: '',
                      },
                    ],
                    type: 'p',
                  },
                ],
              },
              'e04207cf-2f04-4d15-b16b-004a4a772465': {
                '@type': 'image',
                alt: '',
                captionBackgroundColour: 'grey',
                sectionType: '',
                size: 'fullWidth',
                url: '/aoc.png',
              },
            },
            blocks_layout: {
              items: [
                'e04207cf-2f04-4d15-b16b-004a4a772465',
                '9ea70002-3ff3-4757-92de-03f81ca8de2d',
              ],
            },
            settings: {
              backgroundColor: null,
            },
          },
          'a3c8d85f-5e27-49df-ade2-732cddfd354c': {
            blocks: {
              'c7e97f77-a9e7-4c44-9591-7e492ef7d2ad': {
                '@type': 'slate',
                plaintext:
                  ' The Law Enforcement Conduct Commission acknowledges and pays respect to the Traditional Owners and Custodians of the lands on which we work, and recognises their continuing connection to the lands and waters of NSW.\u00a0We pay our respects to the people, the cultures, and the Elders past and present. ',
                value: [
                  {
                    children: [
                      {
                        text: '',
                      },
                      {
                        children: [
                          {
                            text:
                              'The Law Enforcement Conduct Commission acknowledges and pays respect to the Traditional Owners and Custodians of the lands on which we work, and recognises their continuing connection to the lands and waters of NSW.\u00a0We pay our respects to the people, the cultures, and the Elders past and present.',
                          },
                        ],
                        type: 'strong',
                      },
                      {
                        text: '',
                      },
                    ],
                    type: 'p',
                  },
                ],
              },
            },
            blocks_layout: {
              items: ['c7e97f77-a9e7-4c44-9591-7e492ef7d2ad'],
            },
            settings: {
              backgroundColor: null,
              column_class: 'nsw-intro',
              grid_vertical_align: 'middle',
              padding: {
                bottom: 'sm',
                left: '0',
                right: '0',
                top: 'sm',
                unlock: false,
              },
            },
          },
        },
        blocks_layout: {
          items: [
            'a3c8d85f-5e27-49df-ade2-732cddfd354c',
            '97a1b94c-7793-4c69-9a7c-4b0adf3c58f0',
          ],
        },
      },
      gridCols: ['oneThird', 'twoThirds'],
      gridSize: 12,
      sectionType: 'colour-grey-02',
      sectionspacing: 'no',
    },
  },
  blocks_layout: {
    items: ['f610b132-1bcc-4d64-8ba7-bdf16509bee1'],
  },
};

export function ControlPanelWidget({
  value,
  id,
  onChange,
  required,
  title,
  description,
  ...rest
}) {
  const intl = useIntl();
  const dispatch = useDispatch();
  const [activeSlot, setActiveSlot] = useState(0);
  function handleChangeConfiguration(newValue) {
    // debugger;
    // onChange(id, JSON.parse(leccData));
  }

  function onBlocksChange(newValue) {
    onChange(id, JSON.stringify(newValue));
  }

  const decodedValue = useMemo(() => {
    console.log('re-memo');
    return typeof value === 'object' ? value : JSON.parse(value);
  }, [value]);

  useEffect(() => {
    dispatch(getVoltoBlocksFooter());
  }, [dispatch]);

  const slots = config.settings['volto-blocks-footer'].slots ?? {};

  return (
    <div className="menu-configuration-widget">
      <Form.Field inline id={id}>
        <Grid>
          <Grid.Row>
            <Grid.Column width="12" className="menu-configuration-widget">
              <div id="menu-configuration">
                <Menu pointing secondary className="menu-path-menu">
                  {Object.entries(slots).map(([slotId, { title }], idx) => {
                    // debugger;
                    return (
                      <Menu.Item
                        key={`menu-path-${idx}`}
                        name={title}
                        active={activeSlot === idx}
                        onClick={() => {
                          setActiveSlot(idx);
                          // setActiveMenuItem(0);
                        }}
                      >
                        <span>{title}</span>
                      </Menu.Item>
                    );
                  })}
                  <Menu.Item
                    active={false}
                    name={intl.formatMessage(messages.addSection)}
                    onClick={() => {
                      console.log('Added section');
                    }}
                  >
                    <Icon name="plus" />
                  </Menu.Item>
                </Menu>
                <Segment attached="top">
                  <BlockPicker onChange={onBlocksChange} value={decodedValue} />
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
