import { getVoltoSlotsEditorConfig } from '@plone-collective/volto-slots-editor';
import config from '@plone/volto/registry';
import { useEffect, useState } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';

import { BlockPicker } from '@plone-collective/volto-slots-editor/components';
import { Checkbox, Form, Grid, Menu, Segment } from 'semantic-ui-react';

const messages = defineMessages({
  selectASlot: {
    id: 'selectASlot',
    defaultMessage: 'Select a slot',
  },
});

function isSlotActive({ value, slotId }) {
  if (!slotId || !value) {
    return false;
  }
  return value[slotId]?.enabled === true;
}

export function ControlPanelWidget({
  value,
  id,
  onChange,
  required,
  title,
  description,
}) {
  const intl = useIntl();
  const dispatch = useDispatch();

  const slots = config.settings['volto-slots-editor'].slots ?? {};
  const [activeSlotId, setActiveSlotId] = useState(
    typeof slots === 'object' && Object.keys(slots).length > 0
      ? Object.keys(slots)[0]
      : '',
  );
  const decodedValue = typeof value === 'object' ? value : JSON.parse(value);

  function onBlocksChange(newValue) {
    newValue[activeSlotId].enabled = isSlotActive({
      value: decodedValue,
      slotId: activeSlotId,
    });
    onChange(id, JSON.stringify(newValue));
    dispatch(getVoltoSlotsEditorConfig());
  }
  function onEnabledChange(event, { checked }) {
    const newValue = {
      ...decodedValue,
      [activeSlotId]: {
        ...decodedValue[activeSlotId],
        enabled: checked,
      },
    };

    onChange(id, JSON.stringify(newValue));
  }

  useEffect(() => {
    dispatch(getVoltoSlotsEditorConfig());
  }, [dispatch]);

  return (
    <div className="menu-configuration-widget">
      <Form.Field inline id={id}>
        <Grid>
          <Grid.Row>
            <Grid.Column width="12" className="menu-configuration-widget">
              <div id="menu-configuration">
                <Menu pointing secondary className="menu-path-menu">
                  {Object.entries(slots).map(([slotId, { title }], idx) => {
                    return (
                      <Menu.Item
                        key={`menu-path-${idx}`}
                        name={title}
                        active={activeSlotId === slotId}
                        onClick={() => {
                          setActiveSlotId(slotId);
                        }}
                      >
                        <span>{title}</span>
                      </Menu.Item>
                    );
                  })}
                </Menu>
                <>
                  {activeSlotId ? (
                    <>
                      <Segment attached>
                        <Checkbox
                          label="Enabled"
                          checked={isSlotActive({
                            value: decodedValue,
                            slotId: activeSlotId,
                          })}
                          onChange={onEnabledChange}
                        />
                      </Segment>
                      <Segment vertical>
                        <BlockPicker
                          onChange={onBlocksChange}
                          value={decodedValue}
                          slotId={activeSlotId}
                        />
                      </Segment>
                    </>
                  ) : (
                    <p>{intl.formatMessage(messages.selectASlot)}</p>
                  )}
                </>
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
