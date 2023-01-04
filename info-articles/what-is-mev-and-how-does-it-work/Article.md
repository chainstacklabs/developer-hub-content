


Blockchain technology has shown the potential to transform how we operate across different industries, for instance in Decentralized finance, it has enabled permissionless networks and cross-border transactions amongst other things. However, it faces some limitations, one of which is MEV (Maximum extractable value).

It is the maximum value that can be extracted from a block by removing, adding or reordering transactions during block production. In order words, because miners have the ability to decide the order of transactions in a block, they can use it to their own advantage. This is considered one of the biggest threats to Ethereum and other smart-contract-based blockchains.

This article will explain what MEV is and how it works with practical examples.

## What is MEV?
MEV refers to the maximum value that can be extracted when a block is created this can be achieved in various ways, including adding, removing, and reordering transactions.

The term "miner extractable value," as it was originally known, was initially relevant in proof-of-work-based blockchains. However, blockchains like Ethereum have transitioned from proof of work to proof of stake, known as the merge. Therefore, for both consensus mechanisms, it is referred to as the Maximum extractable value.

The blockchain works in such a way that when you make a transaction, it is first stored in a memory pool. The memory pool is where unmined transactions are stored before they are added to the blockchain, this is where a miner/validator comes in. They select transactions of their choice, usually ones with the highest gas fees. This is one of the conventional forms of MEV.

MEV occurs in various other forms, most of which are not actually done by miners, this includes DEXes arbitrage, frontrunning bots, and liquidation. However, every one of these MEV forms is a transaction that ends up in the mempool and can be exploited by a miner or a bot.




## How miners extract value.
In Ethereum, for every block that is mined, a miner gets transaction fees and block rewards, this has been how miners have been incentivized. However, they discovered other unconventional forms of making profits off a block that does more harm than good to the Ethereum network.

### Frontrunning
Frontrunning is a term that originated when people traded on paper in the stock market. You would write your orders on paper and walk across a room to execute them. If you saw a competitor, you would swiftly run in front of the person and place the order before the next person did.

In Ethereum, frontrunning can be done by a miner or a frontrunning bot. For instance, if a miner or a bot detects a profitable transaction on the mempool he can copy the transaction details, insert his own address and execute the same transaction with a higher transaction fee. A miner would prioritize his own transaction over the original one if he were to carry out the activity. When a bot performs it, the miner chooses the transaction with the higher gas fee.

### Time Bandit Attack
This is the act of rewriting a blockchain history in order to capture the MEV opportunities in previously mined blocks. For instance, a miner, Bob finds a $20,000 MEV opportunity in a previous block. Keep in mind that this sum is higher than a block reward. Bob now has two choices: he can either mine a block on top of previously mined blocks and receive a block reward, or he can decide to re-mine earlier blocks in order to take advantage of the MEV opportunity.





## Practical examples of MEV.
Most MEVs are not actually done by miners. They are carried out by bots, complex algorithms, Searchers, and Defi traders.

#### 1. Decentralization Exchange Arbitrage
This is one of the most common MEV opportunities in Decentralized Finance. Firstly, let’s understand what an arbitrage is.

Arbitrage is the simultaneous buying and selling of commodities in different markets in order to take advantage of the different pricing of the same asset. So if two decentralized exchanges have different prices for the same token, one can buy from the exchange at a lower price and sell to the exchange at a higher price making profit from the difference in market prices.

However, this transaction can be exploited by generalized frontrunners. Generalized frontrunners are bots that watch the mempool to detect profitable trades. Note that arbitrage transactions are stored first in the mempool before it is added to a block. So, when the bot detects a profitable transaction, it copies the transaction details and makes the trade with higher gas fees. The block validator/miner eventually picks the transaction with higher gas fees making the original trader lose the opportunity.

#### 2. Liquidation
Defi lending protocols like Aave require its users to deposit some collateral in the form of cryptocurrency when borrowing. Liquidation happens when a user cannot pay back his loans, and as a result, he loses his collateral. The protocol allows anyone to liquidate the collateral and receive a liquidation fee. This brings up competition among MEV Searchers. They compete to find which borrowers can be liquidated, to get the liquidation fee for themselves

#### 3. Backrunning
As the name suggests, it is when a trader or a bot tries to have their transaction directly behind an unconfirmed transaction, in order to take advantage of an opportunity. For example, if a trader sells 1000 Eth on uniswap, it reduces the price of eth in uniswap. So to capture this arbitrage opportunity bots try to place transactions directly below the target transaction by putting the same gas fees with the transaction.



#### 4. Sandwich attack
Sandwiching involves frontrunning and back running a target transaction at the same time in order to take advantage of an opportunity. This attack occurs mostly on decentralized exchanges. For instance, Bob attempts to exchange 10 million USDT for BTC on uniswap after noticing how cheap BTC is. As he completes the transaction, it is stored in the mempool. If a bot detects this transaction, it would front-run it by purchasing the cheap BTC, which would increase the price in accordance with the law of supply and demand. It would also place a similar transaction with a lower gas fee selling the BTC below the victim transaction. In the end, it makes a profit by selling the BTC at a higher rate.




### MEV after the Ethereum merge.
The Ethereum merge has paved the way for lots of improvements to the Ethereum protocol, but it still faces some drawbacks like MEV amongst others. After the merge, Ethereum switched from proof of work to proof of stake consensus mechanism.

This is indifferent to MEV, because validators which are also known as block proposers still have the ability to reorder transactions. The only difference is that validators rather than miners can reorder transactions of a block.





## Potential solutions to MEV.
Now that we’ve understood what MEV is and how it works, let’s explore the various potential solutions to stop or mitigate it on the ethereum blockchain.

Frontrunning as a service (FAAS)
This is an initiative that involves centralized services using different techniques to mitigate MEV. Some of the methods used by these centralized services are the use of private transactions and MEV auctions.

Below are two examples of frontrunning services.

#### Flashbots.
Flashbots is a research and development initiative that was created to reduce the negative impact of MEV in the blockchain ecosystem. Their services are divided into two, Flashbots research and Flashbots products. The former focuses on creating tools and statistics that track real time MEV data and allows for easy monitoring. The latter focuses on building blockchain infrastructures that redefine block production across multiple chains.

#### Private Transactions Services.
This is a system that allows users to send their transaction via a private mempool instead of the public mempool where transactions are initially stored, this prevents bots and MEV searchers from knowing the details of the transactions. However, this system usually requires users to pay more transaction fees, in order to aid faster transaction processing.

An example is the TAICHI NETWORK, they allow users to send their transactions via Sparkpool which is their private mempool;










