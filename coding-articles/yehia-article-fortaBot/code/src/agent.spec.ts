import {
  Finding,
  HandleTransaction,
  ethers,
  FindingSeverity,
  FindingType,
} from "forta-agent";
import { createAddress, NetworkManager } from "forta-agent-tools/lib/utils";
import { TestTransactionEvent } from "forta-agent-tools/lib/test";

import { provideHandleTransaction } from "./agent";
import utils from "./utils";
import { networkData } from "./network";

const WRONG_EVENT_ABI: string[] = [
  "event Transfer(address indexed from,address indexed to,uint256 value)",
];

const WRONG_EVENT: ethers.utils.EventFragment = new ethers.utils.Interface(
  WRONG_EVENT_ABI
).getEvent("Transfer");
const WRONG_ADDRESS = createAddress("0x0d");

const expectedFindings = [
  utils.createFinding({
    alertId: "001",
    account: "0x7c71a3d85a8d620eeab9339cce776ddc14a8129c",
    depositedAmount: "0.001",
    description: "New deposit!",
    severity: FindingSeverity.Low,
    type: FindingType.Info,
  }),
  utils.createFinding({
    alertId: "002",
    account: "0x7c71a3d85a8d620eeab9339cce776ddc14a8129c",
    depositedAmount: "0.001",
    description: "Someone deposited a very small amount",
    severity: FindingSeverity.Medium,
    type: FindingType.Suspicious,
  }),
  utils.createFinding({
    alertId: "003",
    account: "0x7c71a3d85a8d620eeab9339cce776ddc14a8129c",
    depositedAmount: "0.001",
    description: "Blacklisted addresses deposit!",
    severity: FindingSeverity.Critical,
    type: FindingType.Exploit,
  }),
];

describe("Deposits monitor test suite", () => {
  let handleTx: HandleTransaction;
  const networkManager = new NetworkManager(networkData);

  beforeAll(async () => {
    await networkManager.init(utils.provider);
    handleTx = provideHandleTransaction(networkManager);
  });
  it("should return no funding if its a different event", async () => {
    const txEvent = new TestTransactionEvent()
      .addEventLog(WRONG_EVENT, WRONG_ADDRESS, [
        createAddress("0x01"),
        createAddress("0x02"),
        ethers.utils.parseEther("0.001"),
      ])
      .setFrom(networkManager.get("blacklistedAddresses")[0]);
    const findings: Finding[] = await handleTx(txEvent);
    
    expect(findings).toStrictEqual([]);
  });
  it("should return no funding if its a different contract", async () => {
    const event = utils.EVENTS_IFACE.getEvent("Deposited");

    const txEvent = new TestTransactionEvent()
      .addEventLog(event, WRONG_ADDRESS, [ethers.utils.parseEther("0.001")])
      .setFrom(networkManager.get("blacklistedAddresses")[0]);
    const findings: Finding[] = await handleTx(txEvent);
    
    expect(findings).toStrictEqual([]);
  });
  it("should return three funding on the same transaction", async () => {
    const event = utils.EVENTS_IFACE.getEvent("Deposited");

    const txEvent = new TestTransactionEvent()
      .addEventLog(event, networkManager.get("address"), [
        ethers.utils.parseEther("0.001"),
      ])
      .setFrom(networkManager.get("blacklistedAddresses")[0]);
    const findings: Finding[] = await handleTx(txEvent);
    expect(findings).toStrictEqual(expectedFindings);
  });
});
