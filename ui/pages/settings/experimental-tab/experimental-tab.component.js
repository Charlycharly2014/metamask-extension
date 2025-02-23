import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ToggleButton from '../../../components/ui/toggle-button';
import {
  getNumberOfSettingRoutesInTab,
  handleSettingsRefs,
} from '../../../helpers/utils/settings-search';
///: BEGIN:ONLY_INCLUDE_IF(keyring-snaps)
import {
  MetaMetricsEventCategory,
  MetaMetricsEventName,
} from '../../../../shared/constants/metametrics';
///: END:ONLY_INCLUDE_IF

import {
  ///: BEGIN:ONLY_INCLUDE_IF(keyring-snaps)
  Text,
  ///: END:ONLY_INCLUDE_IF
  Box,
} from '../../../components/component-library';

import {
  ///: BEGIN:ONLY_INCLUDE_IF(keyring-snaps)
  TextColor,
  TextVariant,
  ///: END:ONLY_INCLUDE_IF
  ///: BEGIN:ONLY_INCLUDE_IF(keyring-snaps)
  FontWeight,
  ///: END:ONLY_INCLUDE_IF
} from '../../../helpers/constants/design-system';

export default class ExperimentalTab extends PureComponent {
  static contextTypes = {
    t: PropTypes.func,
    trackEvent: PropTypes.func,
  };

  static propTypes = {
    ///: BEGIN:ONLY_INCLUDE_IF(keyring-snaps)
    addSnapAccountEnabled: PropTypes.bool,
    setAddSnapAccountEnabled: PropTypes.func,
    ///: END:ONLY_INCLUDE_IF
    useRequestQueue: PropTypes.bool,
    setUseRequestQueue: PropTypes.func,
    petnamesEnabled: PropTypes.bool.isRequired,
    setPetnamesEnabled: PropTypes.func.isRequired,
    featureNotificationsEnabled: PropTypes.bool,
    setFeatureNotificationsEnabled: PropTypes.func,
    redesignedConfirmationsEnabled: PropTypes.bool.isRequired,
    setRedesignedConfirmationsEnabled: PropTypes.func.isRequired,
  };

  settingsRefs = Array(
    getNumberOfSettingRoutesInTab(
      this.context.t,
      this.context.t('experimental'),
    ),
  )
    .fill(undefined)
    .map(() => {
      return React.createRef();
    });

  componentDidUpdate() {
    const { t } = this.context;
    handleSettingsRefs(t, t('experimental'), this.settingsRefs);
  }

  componentDidMount() {
    const { t } = this.context;
    handleSettingsRefs(t, t('experimental'), this.settingsRefs);
  }

  renderTogglePetnames() {
    const { t } = this.context;
    const { petnamesEnabled, setPetnamesEnabled } = this.props;

    return (
      <Box
        ref={this.settingsRefs[0]}
        className="settings-page__content-row settings-page__content-row-experimental"
      >
        <div className="settings-page__content-item">
          <span>{t('petnamesEnabledToggle')}</span>
          <div className="settings-page__content-description">
            {t('petnamesEnabledToggleDescription')}
          </div>
        </div>

        <div className="settings-page__content-item-col">
          <ToggleButton
            className="petnames-toggle"
            value={petnamesEnabled}
            onToggle={(value) => setPetnamesEnabled(!value)}
            offLabel={t('off')}
            onLabel={t('on')}
            dataTestId="toggle-petnames"
          />
        </div>
      </Box>
    );
  }

  renderToggleRedesignedConfirmations() {
    const { t } = this.context;
    const {
      redesignedConfirmationsEnabled,
      setRedesignedConfirmationsEnabled,
    } = this.props;

    return (
      <Box
        ref={this.settingsRefs[0]}
        className="settings-page__content-row settings-page__content-row-experimental"
      >
        <div className="settings-page__content-item">
          <span>{t('redesignedConfirmationsEnabledToggle')}</span>
          <div className="settings-page__content-description">
            {t('redesignedConfirmationsToggleDescription')}
          </div>
        </div>

        <div className="settings-page__content-item-col">
          <ToggleButton
            className="redesigned-confirmations-toggle"
            value={redesignedConfirmationsEnabled}
            onToggle={(value) => setRedesignedConfirmationsEnabled(!value)}
            offLabel={t('off')}
            onLabel={t('on')}
            dataTestId="toggle-redesigned-confirmations"
          />
        </div>
      </Box>
    );
  }

  ///: BEGIN:ONLY_INCLUDE_IF(keyring-snaps)
  renderKeyringSnapsToggle() {
    const { t, trackEvent } = this.context;
    const { addSnapAccountEnabled, setAddSnapAccountEnabled } = this.props;

    return (
      <>
        <Text
          variant={TextVariant.headingSm}
          as="h4"
          color={TextColor.textAlternative}
          marginBottom={2}
          fontWeight={FontWeight.Bold}
        >
          {t('snaps')}
        </Text>
        <Box
          ref={this.settingsRefs[1]}
          className="settings-page__content-row settings-page__content-row-experimental"
          marginBottom={3}
        >
          <div className="settings-page__content-item">
            <span>{t('snapAccounts')}</span>
            <div className="settings-page__content-description">
              <Text
                variant={TextVariant.bodySm}
                as="h6"
                color={TextColor.textAlternative}
              >
                {t('snapAccountsDescription')}
              </Text>

              <div className="settings-page__content-item-col">
                <Text
                  variant={TextVariant.bodyMd}
                  as="h5"
                  color={TextColor.textDefault}
                  fontWeight={FontWeight.Medium}
                  marginBottom={0}
                >
                  {t('addSnapAccountToggle')}
                </Text>
                <div data-testid="add-account-snap-toggle-div">
                  <ToggleButton
                    value={addSnapAccountEnabled}
                    dataTestId="add-account-snap-toggle-button"
                    onToggle={(value) => {
                      trackEvent({
                        event: MetaMetricsEventName.AddSnapAccountEnabled,
                        category: MetaMetricsEventCategory.Settings,
                        properties: {
                          enabled: !value,
                        },
                      });
                      setAddSnapAccountEnabled(!value);
                    }}
                  />
                </div>
              </div>
              <Text
                variant={TextVariant.bodySm}
                as="h6"
                color={TextColor.textAlternative}
                marginTop={0}
              >
                {t('addSnapAccountsDescription')}
              </Text>
            </div>
          </div>
        </Box>
      </>
    );
  }
  ///: END:ONLY_INCLUDE_IF

  renderToggleRequestQueue() {
    const { t } = this.context;
    const { useRequestQueue, setUseRequestQueue } = this.props;
    return (
      <Box
        ref={this.settingsRefs[7]}
        className="settings-page__content-row settings-page__content-row-experimental"
      >
        <div className="settings-page__content-item">
          <span>{t('toggleRequestQueueField')}</span>
          <div className="settings-page__content-description">
            {t('toggleRequestQueueDescription')}
          </div>
        </div>

        <div
          data-testid="experimental-setting-toggle-request-queue"
          className="settings-page__content-item-col"
        >
          <ToggleButton
            className="request-queue-toggle"
            value={useRequestQueue || false}
            onToggle={(value) => setUseRequestQueue(!value)}
            offLabel={t('toggleRequestQueueOff')}
            onLabel={t('toggleRequestQueueOn')}
          />
        </div>
      </Box>
    );
  }

  renderNotificationsToggle() {
    const { t } = this.context;
    const { featureNotificationsEnabled, setFeatureNotificationsEnabled } =
      this.props;
    return (
      <Box
        ref={this.settingsRefs[0]}
        className="settings-page__content-row settings-page__content-row-experimental"
      >
        <div className="settings-page__content-item">
          <span>{t('notificationsFeatureToggle')}</span>
          <div className="settings-page__content-description">
            {t('notificationsFeatureToggleDescription')}
          </div>
        </div>

        <div className="settings-page__content-item-col">
          <ToggleButton
            value={featureNotificationsEnabled}
            onToggle={(value) => setFeatureNotificationsEnabled(!value)}
            offLabel={t('off')}
            onLabel={t('on')}
            dataTestId="toggle-notifications"
          />
        </div>
      </Box>
    );
  }

  render() {
    return (
      <div className="settings-page__body">
        {this.renderTogglePetnames()}
        {this.renderToggleRedesignedConfirmations()}
        {process.env.NOTIFICATIONS ? this.renderNotificationsToggle() : null}
        {
          ///: BEGIN:ONLY_INCLUDE_IF(keyring-snaps)
          this.renderKeyringSnapsToggle()
          ///: END:ONLY_INCLUDE_IF
        }
        {this.renderToggleRequestQueue()}
      </div>
    );
  }
}
