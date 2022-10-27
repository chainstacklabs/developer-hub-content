# Deposit Detector Agent

## Description

This agent detects any deposit transactions

## Supported Chains

- Polygon Mumbai

## Alerts

- deposit-001

  - Fired when a transaction contains Deposited event is called
  - Severity is always set to "low"
  - Type is always set to "info"
  - Metadata include the submitter address and deposited amount

- deposit-002

  - Fired when a deposit transaction with less than 0.01 MATIC
  - Severity is always set to "Medium"
  - Type is always set to "Suspicious"
  - Metadata include the submitter address and deposited amount

- deposit-003
  - Fired when a deposit transaction from a blacklisted address
  - Severity is always set to "Exploit"
  - Type is always set to "Critical"
  - Metadata include the submitter address and deposited amount

## Test Data
The following test was generate by smart contract included in `contracts/` directory and it deployed on [Mumbai network](https://mumbai.polygonscan.com/address/0xa87db9fe057cff6e296586bec6a6982a5a9b44b0)
The agent behavior can be verified with the following transactions:

-  [0x1400efa233deb27d9bd0c456a612a5fee0d12cb40c518cd0200afd4c25034e80](https://mumbai.polygonscan.com/tx/0x1400efa233deb27d9bd0c456a612a5fee0d12cb40c518cd0200afd4c25034e80)

To check the results, set a Mumbai testnet RPC (e.g. https://matic-mumbai.chainstacklabs.com) as jsonRpcUrl in your forta.config.json file and run:

By Transaction Hash
```
npm run tx 0x1400efa233deb27d9bd0c456a612a5fee0d12cb40c518cd0200afd4c25034e80
```

Or by block number
``` 
 npm run block 28271630
```