import {
  ethers,
  Finding,
  FindingSeverity,
  FindingType,
  HandleTransaction,
  LogDescription,
  TransactionEvent,
} from "forta-agent";
import { NetworkManager } from "forta-agent-tools";

import { NetworkData, networkData } from "./network";

import utils from "./utils";

const networkManager = new NetworkManager(networkData);

export const provideInitialize = (
  provider: ethers.providers.JsonRpcProvider
) => {
  return async () => {
    await networkManager.init(provider);
  };
};

export const provideHandleTransaction =
  (networkManager: NetworkManager<NetworkData>): HandleTransaction =>
  async (txEvent: TransactionEvent) => {
    const findings: Finding[] = [];

    const depositLogs = txEvent.filterLog(
      utils.EVENT_ABI,
      networkManager.get("address")
    );
    depositLogs.forEach((log: LogDescription) => {
      const amount = ethers.utils.formatEther(log.args.amount);
      // Emit finding for new deposit
      findings.push(
        utils.createFinding({
          alertId: "001",
          account: txEvent.transaction.from,
          depositedAmount: amount,
          description: "New deposit!",
          severity: FindingSeverity.Low,
          type: FindingType.Info,
        })
      );
      // Emit finding if deposit less than the minimum amount
      if (Number(amount) < networkManager.get("minimumDepositAmount")) {
        findings.push(
          utils.createFinding({
            alertId: "002",
            account: txEvent.transaction.from,
            depositedAmount: amount,
            description: "Someone deposited a very small amount",
            severity: FindingSeverity.Medium,
            type: FindingType.Suspicious,
          })
        );
      }
      // Emit finding for blacklisted addresses
      if (
        networkManager
          .get("blacklistedAddresses")
          .includes(txEvent.transaction.from)
      ) {
        findings.push(
          utils.createFinding({
            alertId: "003",
            account: txEvent.transaction.from,
            depositedAmount: amount,
            description: "Blacklisted addresses deposit!",
            severity: FindingSeverity.Critical,
            type: FindingType.Exploit,
          })
        );
      }
    });

    return findings;
  };

export default {
  initialize: provideInitialize(utils.provider),
  handleTransaction: provideHandleTransaction(networkManager),
};
