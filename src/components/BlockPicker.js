import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { defineMessages, useIntl } from 'react-intl';
import { blockHasValue } from '@plone/volto/helpers';

import { Form as UIForm, Grid, Button } from 'semantic-ui-react';
import { Form } from '@plone/volto/components';

import config from '@plone/volto/registry';

const messages = defineMessages({
  deleteMenuPath: {
    id: 'dropdownmenu-delete-menupath',
    defaultMessage: 'Delete menu path',
  },
  deleteButton: {
    id: 'dropdownmenu-delete-button',
    defaultMessage: 'Delete',
  },
  root_path: {
    id: 'dropdownmenu-rootpath',
    defaultMessage: 'Root path',
  },
  moveMenuItemUp: {
    id: 'dropdownmenu-move-menuitem-up',
    defaultMessage: 'Move menu item up',
  },
  moveMenuItemDown: {
    id: 'dropdownmenu-move-menuitem-down',
    defaultMessage: 'Move menu item down',
  },
  emptyActiveSection: {
    id: 'empty-active-section',
    defaultMessage: 'Select a section',
  },
  emptyActiveMenuItem: {
    id: 'dropdownmenu-emptyActiveMenuItem',
    defaultMessage: 'Select a menu item',
  },
});

export function BlockPicker({ onChange, value }) {
  function onChangeFormBlocks(data) {
    debugger;
    onChange({
      ...blocksData,
      blocks: data.blocks,
      blocks_layout: data.blocks_layout,
    });
    // debugger;
  }
  const intl = useIntl();
  const defaultBlockId = uuid();
  const [blocksData, setBlocksData] = useState(value);

  console.log('blocksData', blocksData);
  // const [blocksData, setBlocksData] = useState({
  //   blocks: {
  //     [defaultBlockId]: {
  //       '@type': config.settings.defaultBlockType,
  //     },
  //   },
  //   blocks_layout: {
  //     items: [defaultBlockId],
  //   },
  // });
  // if (!menuItem.blocks_layout || isEmpty(menuItem.blocks_layout.items)) {
  //   menuItem.;
  // }
  // if (!menuItem.blocks || isEmpty(menuItem.blocks)) {
  //   menuItem.
  // }

  return (
    <Grid>
      <Grid.Column>
        <UIForm.Field inline className="help wide" id="menu-blocks">
          <Grid>
            <Grid.Row stretched>
              <Grid.Column width={12}>
                <div className="wrapper">
                  <p className="help">Add a block</p>
                </div>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row stretched>
              <Grid.Column width={12}>
                <div className="menu-blocks-container">
                  <Form formData={blocksData} visual={true} hideActions onChangeFormData={onChangeFormBlocks} />
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </UIForm.Field>
      </Grid.Column>
    </Grid>
  );
}
