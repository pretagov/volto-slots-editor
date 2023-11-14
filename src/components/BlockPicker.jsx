import { getVoltoBlocksFooter } from '@plone-collective/volto-blocks-footer';
import {
  getBlocksFieldname,
  getBlocksLayoutFieldname,
} from '@plone/volto/helpers';
import { isEmpty } from 'lodash';
import { useState } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { v4 as uuid } from 'uuid';

import { Form, Sidebar } from '@plone/volto/components';
import config from '@plone/volto/registry';
import { Portal } from 'react-portal';
import { useDispatch } from 'react-redux';
import { Grid, Form as UIForm } from 'semantic-ui-react';

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

function getInitialBlocksData(value) {
  // Hacky way of checking for falsey value. Empty array and empty object typecast to true.
  if (Object.keys(value).length > 0) {
    return value;
  }

  const blocksFieldname = getBlocksFieldname({}) ?? 'blocks';
  const blocksLayoutFieldname = getBlocksLayoutFieldname({}) ?? 'blocks_layout';

  // debugger;
  const defaultID = uuid();

  if (
    !value[blocksLayoutFieldname] ||
    isEmpty(value[blocksLayoutFieldname].items)
  ) {
    value[blocksLayoutFieldname] = {
      items: [defaultID],
    };
  }
  if (!value[blocksFieldname] || isEmpty(value[blocksFieldname])) {
    value[blocksFieldname] = {
      [defaultID]: {
        '@type': config.settings.defaultBlockType,
      },
    };
  }

  return value;
}

export function BlockPicker({ onChange, value }) {
  const intl = useIntl();
  const dispatch = useDispatch();
  function onChangeFormBlocks(newData) {
    const newValue = {
      ...value,
      blocks: newData.blocks,
      blocks_layout: newData.blocks_layout,
    };

    setBlocksData(newValue);
    onChange(newValue);
    dispatch(getVoltoBlocksFooter());
  }
  const [blocksData, setBlocksData] = useState(getInitialBlocksData(value));

  return (
    <>
      <Grid>
        <Grid.Column>
          <UIForm.Field inline className="help wide" id="menu-blocks">
            <Grid>
              <Grid.Row stretched>
                <Grid.Column width={12}>
                  <div className="menu-blocks-container">
                    <Form
                      formData={blocksData}
                      visual={true}
                      hideActions
                      onChangeFormData={onChangeFormBlocks}
                    />
                  </div>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </UIForm.Field>
        </Grid.Column>
      </Grid>
      <Portal node={document.getElementById('sidebar')}>
        <Sidebar />
      </Portal>
    </>
  );
}
