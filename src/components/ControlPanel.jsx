import { getVoltoSlotsEditorConfig } from '@plone-collective/volto-slots-editor';
import { usePrevious } from '@plone/volto/helpers';
import config from '@plone/volto/registry';
import { useEffect, useState } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

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

function useControlPanelSubmission() {
  const { loading, loaded } = useSelector(
    (state) => state.controlpanels.update,
  );
  const previous = usePrevious({ loading, loaded });

  return previous?.loading === false && loading === true;
}

export function ControlPanelWidget({ value, id, onChange, description }) {
  const intl = useIntl();
  const dispatch = useDispatch();
  const controlPanelSubmission = useControlPanelSubmission();

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

  // Probably a smart way of doing it on initial load AND on all submissions in a single event, but what's one more network request
  useEffect(() => {
    dispatch(getVoltoSlotsEditorConfig());
  }, [dispatch]);
  useEffect(() => {
    if (useControlPanelSubmission) {
      dispatch(getVoltoSlotsEditorConfig());
    }
  }, [dispatch, controlPanelSubmission]);
  const activeSlotDescription = slots[activeSlotId]?.description;

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
                      {activeSlotDescription ? (
                        <p style={{ whiteSpace: 'pre-line' }}>
                          {activeSlotDescription}
                        </p>
                      ) : null}
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
