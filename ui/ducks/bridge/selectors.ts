import { createSelector } from 'reselect';
import { ProviderConfig } from '@metamask/network-controller';
import { getProviderConfig } from '../metamask/metamask';
import { getIsBridgeEnabled } from '../../selectors';
import { BridgeState } from './bridge';

export const getFromChain = getProviderConfig;
export const getToChain = (state: { bridge: BridgeState }): ProviderConfig =>
  state.bridge.toChain;

export const getIsBridgeTx = createSelector(
  getFromChain,
  getToChain,
  (state) => getIsBridgeEnabled(state),
  (fromChain, toChain, isBridgeEnabled: boolean) =>
    isBridgeEnabled &&
    toChain !== null &&
    fromChain.chainId !== toChain.chainId,
);
