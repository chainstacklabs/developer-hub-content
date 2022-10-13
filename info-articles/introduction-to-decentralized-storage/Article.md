## Introduction

To fully have a decentralized ecosystem, we need to have decentralized storage. Otherwise, we'll still rely on a centralized server with one single point of failure. What this means is that a data outage could leave you without your files for an extended period of time, if not forever. It also implies that a malicious attack could result in data leaks and privacy violations. That's where decentralized storage comes in.
In this article, we will look at how decentralized storage works and the benefits it provides. We'll also be looking at some decentralized storage networks.

## What is Decentralized storage?

Decentralized storage refers to a system that stores your files without relying on large centralized chunks of data that do not compromise critical values such as information freedom and privacy. We can also define it as using blockchain technology to improve privacy and data security in cloud storage.

Decentralized storage systems store data on a distributed network that is run by computers located in various locations, unlike centralized storage applications, where data is stored on multiple servers that are hosted in a centralized database. Nodes store and secure data collectively and are responsible for making files available to owners. Nodes on a decentralized storage network are rewarded for their efforts with tokens paid for by users.

As the name implies, decentralized storage solutions are not controlled by a single entity. Instead, peer-to-peer (p2p) nodes sustain and operate the network. Data storage with no centralized management eliminate single points of failure and reduce counterparty risk for users.

## How does it work?

With centralized storage, you are required to upload your files to a server via the internet. You then need to make a request to this same server when you need those files.

Things are done differently when it comes to decentralized storage. It possesses a unique technique. Although you must still upload the data and request it at any moment, how that data is stored differs dramatically from a centralized solution. Here's how it is done:

### Encryption

Uploading data to a decentralized storage network automatically encrypts it with cryptographic hash methods. Your private key grants you access to the data while preventing unauthorized entities from decrypting it.

### Sharding

Files are divided into small chunks and sent to many network nodes. Sharding assures that no single node stores the entire dataset, removing the possibility of censorship and privacy invasion. No one can read or limit access to your data since pieces of it are dispersed over the network.

### Storage

The sharded portions of your file are distributed to multiple nodes spread over different geographical locations. If you require the file, the network obtains its components from the nodes that store it and reassembles it for you to download.

## What are the benefits of using decentralized storage?

### Efficiency

Although centralized cloud storage appears effective, a deeper examination reveals significant flaws. For example, if their servers go down for any reason or a distributed denial-of-service (DDoS) attack happens, accessing your data stored on their server is impossible. This is not the case with decentralized systems.
Decentralized storage systems use a solid peer-to-peer architecture in which numerous nodes in various places keep copies of a file. Even if a few nodes fail, your data will still be accessible. Because these systems are fault-tolerant, a few nodes failing cannot disrupt their operation.

### Fast

With centralized storage systems, network bottlenecks are prevalent because network traffic can occasionally overload the servers. However, several copies of data are kept across numerous nodes in a decentralized storage network. It reduces the possibility of network bottlenecks because you may access your data from a large number of nodes quickly and securely.

### Fair pricing

Storage nodes compete in decentralized storage networks since only the fittest ones are compensated. Because of such competition, the chances of anti-competitive behaviors, monopolies, and unfair pricing are nearly none. As a result, when you subscribe to decentralized storage, you can anticipate reasonable pricing.

### Privacy

Ever imagined losing or leaking all of your data on Dropbox or Google Drive? This occurred with Dropbox in 2012, when a dropbox hack occurred, resulting in the details of over 68 million users, including email addresses and passwords, being exposed. The impacted users were encouraged to replace their passwords, but the compromise might have resulted in considerably more serious consequences.

Decentralized storage solves this issue. To prevent unauthorized access to data files, they are divided into bits. These bits must be combined to rebuild the file, which is impossible without a private key or sufficient permissions.

### Lower cost

A decentralized data storage system has low storage and hardware costs. It lowers machine performance requirements, reducing the need for expensive investments in high-performance software and hardware. Because the system continually uses idle storage capacity, it reduces waste and the need for additional investment for -more extensive storage space.

### Economical

Unlike centralized storage systems, which house your data in a limited number of data centers, decentralized storage networks are made up of millions of nodes eager to host your data safely. This gives a large amount of storage bandwidth and reduces storage costs, making it an affordable solution.

## Decentralized Storage Networks
Before listing some of the popular storage networks out there, it is important to note that decentralized storage systems are not a new concept. They have been around for quite a while. An example is bit torrent, which is one of the oldest decentralized data storage networks founded in 2001.

The Bit torrent has now evolved into what we now know as Btfs. It is designed to lower storage costs, improve fault tolerance, and prevent government censorship.

Now that we've noted that, let's proceed to list some of the popular file system storage:
### IPFS

InterPlanetary File System (IPFS), developed by Protocol Labs, is a decentralized protocol for storing and accessing data such as files, websites, and applications. The files are stored inside IPFS objects, and these objects can store up to 256kb worth of data.

They may also include references to other IPFS objects. A very short hello world text file that is very small can be stored in a single IPFS object. But what about files larger than 256kb, such as images and videos?

They are split up into multiple IPFS objects with 256kb in size each, and afterward, the system will create an empty IPFS object that links to other pieces of the file. The IPFS data structure can be straightforward but powerful at the same time. It allows us to use it as a file system.

Another thing to note about IPFS is that it uses content-based addressing. This means when something is added, it cannot be changed anymore. We can call it immutable data storage, like a blockchain. So how do we change stuff on it? IPFS supports versioning of your files. For example, let's say you're working on a document you want to share with everyone over IPFS when you do that, IPFS creates a new commit object for you.

**Storage costs**
IPFS is completely free to use. However, uploading files to IPFS does not guarantee permanence because the data is only stored on your computer. Pinning services and permanence tools, which cost money, are required to ensure that data is replicated in multiple locations.

### Filecoin

Filecoin is created by the same people that have created IPFS. It is a blockchain built on IPFS. Filecoin is a peer-to-peer file storage network with built-in economic incentives to ensure files are reliably stored over time. It uses the file coin blockchain to record each transaction with the storage unit.
The free market determines the amount of storage available and the price of data being stored.

**Storage costs:**
Some storage providers, such as web3.storage, provide free Filecoin storage. This is because miners earn more if they already have data stored. According to file.app, the average monthly cost is $.0000002 USD/GB, and the annual cost is $0.0000019 USD/GB.

### Siacoin

Siacoin is a decentralized blockchain-based cloud storage platform that allows network participants to rent and use storage space and excess bandwidth from other users.

The Sia network lacks a centralized authority. The entire system is democratized with the p2p system and decentralization. In terms of security, Siacoin tends to have an edge against traditional storage services and is also cost-effective, offering significantly lower prices for renting storage compared to centralized cloud storage providers.

Anyone with extra space can rent it out on the Siacoin marketplace and earn Siacoin tokens paid for by customers who use the rented bandwidth and storage space. Sia has a network capacity of more than 2 petabytes (2,256 terabytes), with roughly 333 node operators actively securing the network. It currently
The Siacoin aims to attract more users who value their secure environment with Sia's low-cost storage.

Siacoin aims to assist users in regaining control of their data because no third party or central authority controls the Siacoin network. The Siacoin addresses some of the most common issues in the cloud storage sector, such as high storage rental costs, hacking risks, data control, and data mismanagement.

As of the time of this writing, 1TB from the Sia network costs about 2 dollars per month.

### Storj

Storj is an Ethereum blockchain-based decentralized file-hosting protocol. It is a platform where people can share their drive space. Storj boasts of over 6000 active running nodes storing data. These Nodes running the Storj software earn $STORJ tokens by selling their hardware space and bandwidth.

Storj is based on these principles which are:

- **Encryption:** Storj encrypts files using the AES-256-GCM symmetric encryption. This is routine procedure for every file before it is uploaded to the network, which ensures that no unauthorized person has access to your data. Only those who have been allowed access can view your data.

- **Splitting:** Each file is divided into 80 pieces, and accessing a file requires only 29 of those components. Each piece is stored on a separate Node, each having its own set of operators, power sources, networks, and geographies.

- **Distribution:** Each component of an object is dispersed across a vast global network of nodes, ensuring that data is never concentrated in a single location.

- **Retrieveing:** Storj only need 29 encrypted fragments to get a file. The network can automatically recreate the data contained in the remaining fragments using only those 29 components.

With these principles, Storj boasts of being immune to censorship, data loss, malicious attacks, and service failures
encryption:

**Cost of storage:**
0.004$/GB/Month

### Arweave

Arweave is another decentralized storage network that aspires to dethrone major cloud storage providers such as Google. It was formerly named Archain. With more than 500 nodes in operation, the goal of Arweave is to store files over a distributed network of computers permanently.

Storage space sellers on the Arweave Network get paid in the network's native $AR coin. This gives them an incentive to keep such files available for clients. It works on two layers which are:

**Blockweave:** Arweave's data is stored on a block graph. In Arweave, each block is linked to two previous blocks, generating a structure known as a "blockweave."

**Permaweb:** Everything published on the permaweb is permanently accessible. The permaweb provides low-cost, zero-maintenance hosting for their web apps and online pages.

**Cost of storage:**
Approx $8 one-time lifetime storage cost/GB. No monthly subscription

### Bluzelle

Bluzelle is a decentralized database storage network driven by Cosmos and its Byzantine fault-tolerant  (BFT) technology Tendermint, which allows it to be compatible with several blockchains.

Bluzelle provides a decentralized framework for financial data by merging decentralized technologies with edge computing, ensuring that organizations never experience data breaches, network outages, or poor performance, all at a price of a few pennies. Bluzzelle boasts of a lot of features like data immutability, speed, lower cost, high privacy e.t.c

Bluzelle users can make money by renting out their computer storage space. Developers, academics, content providers, and others can rent this space for significantly less than the cost of using centralized cloud services like Amazon's AWS. The cost savings can be used to improve the titles and development processes. In the end, everyone benefits from a more efficient and profitable process.

## Conclusion

In this article, we discussed what decentralized storage is, how it works, and its benefits.

We also looked at few decentralized storage networks and briefly discussed them. With all of the drawbacks of centralized storage. Decentralized storage is the way to go because it provides a more secure method of keeping data.
