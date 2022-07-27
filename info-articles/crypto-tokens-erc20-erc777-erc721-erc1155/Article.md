## Introduction

With the rise in popularity of blockchain technologies and cryptocurrencies, we are seeing many more tokens being created. But what are they, exactly? This post will go over some of the most common types of crypto tokens: ERC20, ERC777, ERC721, and ERC1155.

## What are Tokens?

Tokens are digital assets built on a cryptocurrency’s blockchain. They differ from coins because while a coin is built on its native blockchain, a token is built on an existing blockchain.

For example, ETH is the official coin for the Ethereum blockchain, while Basic Attention Token (BAT), Chainlink (LINK), and OmiseGo (OMG) are tokens built on Ethereum.

Tokens are often a quicker way to leverage the existing standards of a successful and popular blockchain while building digital assets. Their most common use case is smart contracts on decentralized applications (DApps).

### Fungible and Non-fungible Tokens

Tokens generally fall under two categories: fungible tokens and non-fungible tokens.

Fungible tokens are divisible digital assets that you can swap for other assets of the same type. No single unit is worth more or less than another. Think about how a dollar bill is similar to another one and can be easily exchanged.

On the other hand, non-fungible tokens (also known as NFTs) are digital assets that you cannot easily exchange for other assets due to their uniqueness. For example, consider an artwork that holds a particular value for its owner and would be difficult to exchange for another artwork because their perceived values are different.

### ERCs and EIPs

Before the adoption of token standards, blockchain developers often created tokens according to personal preferences, causing token ecosystems to experience difficulties when interacting.

To solve this problem, Ethereum developers now create ERCs (Ethereum Request for Comments) and EIPs (Ethereum Improvement Proposals). These help to define the rules and required functions for tokens created on the Ethereum blockchain, making integrations and interactions much more accessible.

## ERC20 Tokens

[**ERC20**](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md) is a protocol that defines standard APIs for creating fungible tokens in a smart contract. It was created in 2015 by [Fabian Vogelsteller](https://twitter.com/feindura).

Its main methods include:

- **`name()`** (_optional_): The name of the token.
- **`symbol()`** (_optional_): The symbol of the token.
- **`decimals()`** (_optional_): The decimal places of the token. This allows for fungibility.
- **`totalSupply()`**: The total number of existing tokens.
- **`balanceOf()`**: The total number of tokens owned by a particular `account`.
- **`transfer()`**: Moves a number of tokens from the caller’s account to a specified `address`.
- **`transferFrom()`**: Same as `transfer()`, but it also specifies the address to move tokens from.
- **`allowance()`**: The number of tokens a `spender` is allowed to spend on behalf of the `owner` via `transferFrom()`.
- **`approve()`**: Sets the number of tokens a `spender` is allowed to spend.

All these methods are strictly required in an ERC20 smart contract, apart from the first three marked “(_optional_)” which help to improve usability.

An ERC20 also has two events - **`Transfer`** (which triggers when tokens are transferred) and **`Approved`** (which triggers on any successful call to the `approve()` method).

Examples of ERC20 tokens are [USDC](https://www.circle.com/en/usdc), a stablecoin pegged to the dollar, or [UNI](https://www.coingecko.com/en/coins/uniswap), the governance token used in Uniswap to vote on changes on the platform.

Many projects use ERC20 tokens during their fundraising period (known as ICO - Initial Coin Offering). They are also widely used for trading purposes - some exchanges only support trading in tokens that adhere to this standard due to their popularity among investors and traders.

## ERC777 Tokens

The [**ERC777**](https://eips.ethereum.org/EIPS/eip-777) standard offers improvements in how users interact with fungible tokens in a smart contract while remaining backward compatible with ERC20. It was created in 2017 by [Jacques Dafflon](https://github.com/0xjac), [Jordi Baylina](https://github.com/jbaylina), and Thomas Shabibi.

Some of its improvements include clearing the confusion around decimals in a smart contract and introducing hooks that allow your smart contract to react when you send or receive tokens. These help to prevent tokens from getting locked forever or lost when sent to the wrong address.

ERC777 contains methods like:

- **`granularity()`**: The smallest part of the token that is not divisible.
- **`send()`**: Sends a specific `amount` of tokens to a `recipient`
- **`burn()`**: Destroys a specific `amount` of tokens, which reduces the `totalSupply`.
- **`isOperatorFor()`**: Checks if an account is an operator.
- **`authorizeOperator()`**: Makes an account an operator.
- **`revokeOperator()`**: Revokes an account's operator status.
- **`defaultOperators()`**: Returns a list of token holders who are default operators.
- **`tokensToSend()`**: This hook is called when tokens are about to be destroyed or moved `from` a specific holder's address. It is triggered **_before_** the smart contract's state is updated and can prevent the operation from being executed.
- **`tokensReceived()`**: This hook is called when tokens are about to be destroyed or moved `to` a specific holder's address. It is triggered **_after_** the smart contract's state is updated, which can prevent the operation from being executed.

Popular implementations of ERC777 include [Lab10](https://lab10.coop/) and [Global Crypto Alliance](https://gcalliance.io/call-token/).

## ERC721 Tokens

[**ERC721**](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-721.md) is a standard for creating non-fungible tokens (NFTs) on Ethereum. It was created in 2018 by [Dieter Shirley](https://twitter.com/dete73), Jacob Evans, [Natassia Sachs](https://github.com/nastassiasachs), and [William Entriken](https://twitter.com/fulldecent).

A few examples include rare collectibles (e.g., [CryptoKitties](https://www.cryptokitties.co/) and [Gods Unchained](https://godsunchained.com/)), or limited edition items like [sneakers](https://www.nytimes.com/2022/05/26/style/nike-nft-sneaker.html) and [art prints](https://onlineonly.christies.com/s/beeple-first-5000-days/beeple-b-1981-1/112924).
They can also signify membership in a community, like [Developer DAO](https://www.developerdao.com/).

A basic ERC721 smart contract contains methods like:

- **`balanceOf()`**: The number of tokens in the `owner`'s account.
- **`ownerOf()`**: The `tokenId` of the owner.
- **`safeTransferFrom()`**: Safely transfers tokens from the owner's address to the recipient’s. The `tokenId` must be specified as a parameter.
- **`transferFrom()`**: Same function as `safeTransferFrom()`, but generally not recommended.
- **`approve()`**: Allows an address to transfer a token identified by its `tokenId`, into another account. It triggers the `Approval` event.
- **`setApprovalForAll()`**: Allows an `operator` to call `safeTransferFrom` or `transferFrom` for any token owned by the caller.
- **`getApproved()`**: Gets the approved account for a specific `tokenId`.
- **`isApprovedForAll()`**: Checks if an `operator` is allowed to manage all the assets of the `owner`.

It also contains events like **`Transfer`** (which triggers when ownership of any NFT changes) and **`Approval`** (which activates when the approved address for an NFT is changed).

ERC721 has multiple extensions split across different contracts. Here are two such extensions:

### ERC721Enumerable

The [**ERC721Enumerable**](https://docs.openzeppelin.com/contracts/4.x/api/token/erc721#IERC721Enumerable) contains all the methods available in the original ERC721 and three extra methods:

- **`totalSupply()`**: The total amount of tokens in the contract.
- **`tokenOfOwnerByIndex()`**: The `tokenId` of an owner’s address at a given `index` in its token list. You can use it with `balanceOf` to enumerate all of the `owner`'s tokens.
- **`tokenByIndex()`**: The `tokenId` at a given `index`. You can use it with `totalSupply` to enumerate all tokens.

This extension is often not implemented because enumerating tokens on the blockchain could significantly spike gas costs.

### ERC721A

[**ERC721A**](https://github.com/chiru-labs/ERC721A) is an extension of ERC721 that aims to significantly reduce transaction fees by allowing users to mint multiple unique NFTs in a single transaction.

It was created by the Azuki team in 2022 and is currently used by projects like [Dastardly Ducks](https://www.dastardlyducks.com/) and [Zero Gravity Club](https://www.thezerogravity.club/).

In addition to the original ERC721 methods, it contains extra methods like:

- **`_startTokenId()`**: The starting token ID.
- **`_nextTokenId()`**: The next token ID to be minted.
- **`_totalMinted()`**: The total amount of minted tokens.
- **`_numberMinted()`**: The number of tokens minted by an `owner`.
- **`_getAux()`**: Gets the auxiliary data for an `owner` (e.g., the number of whitelist mint slots used.)
- **`_setAux()`**: Sets the auxiliary data for an `owner`
- **`_ownershipOf()`**: The token ownership data for a specific `tokenId`.
- **`_initializeOwnershipAt()`**: This can be used to initialize some tokens in a large batch to reduce first-time transfer costs. It initializes token ownership data at the `index` slot.
- **`_mint()`**: Mints a number of tokens and transfers them to a specific address.
- **`_safeMint()`**: Same functionality as `_mint`, but it contains a `data` parameter which gets forwarded to contract recipients in `IERC721Receiver.onERC721Received`.
- **`_beforeTokenTransfers()`**: This hook is called **before** a token ID set is about to be transferred. It is also called before burning one token. It contains the `startTokenId` and the `quantity` of tokens.
- **`_afterTokenTransfers()`**: This hook is called **after** a set of token IDs are to be transferred.

## ERC1155 Tokens

The [**ERC1155**](https://docs.openzeppelin.com/contracts/4.x/erc1155) protocol combines the abilities of ERC20 and ERC721, allowing tokens to have fungible and non-fungible characteristics. It was created by [Witek Radomski](https://twitter.com/witekradomski) and made public in 2019.

ERC1155 provides a way to model assets and their ownership, as well as a way to create, transfer, and settle those assets. With these capabilities, you can trade fungible assets like gold bullion, or collectibles such as art, baseball cards, loyalty points, etc., using the same smart contract.

In an ERC1155 smart contract, the **`balanceOf()`** method contains an `id` argument to identify the token you want to query its balance.

It also contains other methods like:

- **`balanceOfBatch()`**: It returns the balance in a batch of accounts with specified ids.
- **`setApprovalForAll()`**: Allows an `operator` to transfer a `caller`'s tokens.
- **`isApprovedForAll()`**: Checks if an `operator` is allowed to transfer a `caller`'s tokens.
- **`safeTransferFrom()`**: Transfers a number of tokens from a `caller`'s address to a recipient’s address. The tokens must have a type of `id`.
- **`safeBatchTransferFrom()`**: Same functionality as `safeTransferFrom()` but in batches.

Popular ERC1155 projects include [FingerNFT](https://www.fingerchar.com/) and [Valorem](https://github.com/valorem-labs-inc/valorem-core).

## Conclusion

The first step in creating a smart contract is deciding the right tool for the job. You can choose to create a simple fungible token based on ERC20, improve its features based on ERC777, create NFTs with ERC721, or hybrid smart contracts with ERC1155.

Other token standards exist with their specific use-cases, and you can learn more about crypto tokens through our blog or these resources listed below.

## Resources

- [Token vs Coin: What's the Difference? (bitdegree.org)](https://www.bitdegree.org/crypto/tutorials/token-vs-coin)
- [7 Most Popular Ethereum Based Tokens (brokerxplorer.com)](https://www.brokerxplorer.com/article/7-most-popular-ethereum-based-tokens-2185)
- [Tokens - OpenZeppelin Docs](https://docs.openzeppelin.com/contracts/4.x/tokens)
- [ERC-721A - Azuki](https://www.azuki.com/erc721a)
- [Token standards: ERC20 vs ERC721 vs ERC1155 (leewayhertz.com)](https://www.leewayhertz.com/erc-20-vs-erc-721-vs-erc-1155/)
- [ERC20 & ERC721: How Do They Work? - CoinMarketCap Blog](https://blog.coinmarketcap.com/2019/02/25/erc20-erc721-how-do-they-work/)
- [What is ERC-721? The Ethereum NFT Token Standard - Decrypt](https://decrypt.co/resources/erc-721-ethereum-nft-token-standard)
- [ERC-721: An Intro to the ERC-721 Token Standard](https://komodoplatform.com/en/academy/erc-721-token-standard/)
- [ERC-1155: An NFT Standard for Online Games and Gamified Apps – The New Stack](https://thenewstack.io/erc-1155-an-nft-standard-for-online-games-and-gamified-apps/)
