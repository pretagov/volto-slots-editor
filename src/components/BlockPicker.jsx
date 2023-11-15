import {
  getBlocksFieldname,
  getBlocksLayoutFieldname,
} from '@plone/volto/helpers';
import { isEmpty } from 'lodash';
import { useState } from 'react';
import { useLocation } from 'react-router';
import { v4 as uuid } from 'uuid';

import {
  BlockDataForm,
  BlocksForm,
  Sidebar,
  SidebarPortal,
} from '@plone/volto/components';
import config from '@plone/volto/registry';
import { useMemo } from 'react';
import { Portal } from 'react-portal';
import { Grid, Form as UIForm } from 'semantic-ui-react';

function getInitialBlocksData(value) {
  let data = value;
  // Hacky way of checking for falsey value. Empty array and empty object typecast to true.
  if (value && Object.keys(value).length > 0) {
    return value;
  }

  const blocksFieldname = getBlocksFieldname({}) ?? 'blocks';
  const blocksLayoutFieldname = getBlocksLayoutFieldname({}) ?? 'blocks_layout';

  const defaultID = uuid();
  data = {};
  if (
    !data[blocksLayoutFieldname] ||
    isEmpty(data[blocksLayoutFieldname].items)
  ) {
    data[blocksLayoutFieldname] = {
      items: [defaultID],
    };
  }
  if (!data[blocksFieldname] || isEmpty(data[blocksFieldname])) {
    data[blocksFieldname] = {
      [defaultID]: {
        '@type': config.settings.defaultBlockType,
      },
    };
  }

  return data;
}

export function BlockPicker({ onChange, value, slotId }) {
  const { pathname } = useLocation();

  function onChangeFormBlocks(newData) {
    const newValue = {
      ...value,
      [slotId]: {
        blocks: newData.blocks,
        blocks_layout: newData.blocks_layout,
      },
    };

    onChange(newValue);
  }
  const blocksData = useMemo(() => {
    return getInitialBlocksData(value[slotId]);
  }, [value, slotId]);

  const [selectedBlock, setSelectedBlock] = useState(
    blocksData.block_layout?.items?.[0],
  );

  return (
    <>
      <Grid>
        <Grid.Column>
          <UIForm.Field inline className="help wide" id="menu-blocks">
            <Grid>
              <Grid.Row stretched>
                <Grid.Column width={12}>
                  <div className="menu-blocks-container">
                    <BlocksForm
                      properties={blocksData}
                      selectedBlock={selectedBlock}
                      blocksConfig={config.blocksConfig}
                      onSelectBlock={(id) => {
                        setSelectedBlock(id);
                      }}
                      onChangeFormData={(newFormData) => {
                        onChangeFormBlocks(newFormData);
                      }}
                      isMainForm={false}
                      pathname={pathname}
                    />
                  </div>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </UIForm.Field>
        </Grid.Column>
      </Grid>
      <Sidebar />
    </>
  );
}
