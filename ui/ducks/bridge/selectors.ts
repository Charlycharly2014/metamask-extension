import { createSelector } from 'reselect';
import { ProviderConfig } from '@metamask/network-controller';
import { getProviderConfig } from '../metamask/metamask';
import { getIsBridgeEnabled } from '../../selectors';
import { BridgeState } from './bridge';
import { ALLOWED_BRIDGE_CHAIN_IDS } from '../../../shared/constants/bridge';

export const getFromChain = (state: any): ProviderConfig =>
  getProviderConfig(state);
export const getToChain = (state: { bridge: BridgeState }): ProviderConfig =>
  state.bridge.toChain;
// TODO read from feature flags and return ProviderConfig/RPCDefinition
export const getFromChains = (state: any) => ALLOWED_BRIDGE_CHAIN_IDS;
// TODO read from feature flags and return ProviderConfig/RPCDefinition
export const getToChains = (state: any) => ALLOWED_BRIDGE_CHAIN_IDS;

export const getIsBridgeTx = createSelector(
  getFromChain,
  getToChain,
  (state) => getIsBridgeEnabled(state),
  (fromChain, toChain, isBridgeEnabled: boolean) =>
    isBridgeEnabled &&
    toChain !== null &&
    fromChain.chainId !== toChain.chainId,
);
