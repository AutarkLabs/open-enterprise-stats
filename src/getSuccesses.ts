import provider from 'eth-provider'
import Web3 from 'web3'
import InputDataDecoder from 'ethereum-input-data-decoder'
import { Transaction } from 'web3-core'

// TODO: use `import` syntax (currently causes TypeScript to complain)
const oeAbi = require('./abi.json')

const decoder = new InputDataDecoder(oeAbi)

const web3 = new Web3(provider('infura'))

const contracts = [
  {
    address: '0xde40122f2a86db6af51e20c79653f6cb8b30eda0',
    creationBlock: 8859175,
  },
  {
    address: '0xc54c5db63ab0e79fbb9555373b969093deb17859',
    creationBlock: 8921657,
  },
]

const contractAddresses = [
  '0xc54c5db63ab0e79fbb9555373b969093deb17859',
  '0xde40122f2a86db6af51e20c79653f6cb8b30eda0',
]

export async function walkBlocks() {
  const txsByUser: { [key: string]: object[] } = {}
  const latestBlock = await web3.eth.getBlockNumber()
  await contracts.forEach(async (contract, contractNum) => {
    const nextContract = contracts[contractNum + 1]
    const blocksToScrape = []
    for (
      let blockNum = contract.creationBlock;
      blockNum < (nextContract ? nextContract.creationBlock : latestBlock);
      blockNum++
    ) {
      blocksToScrape.push(blockNum)
    }
    console.log({ blocksToScrape })

    const relevantTxs: { [key: string]: Transaction } = {}
    await Promise.all(blocksToScrape.map(async blockNum => {
      const block = await web3.eth.getBlock(blockNum, true)
      block.transactions.forEach(tx => {
        if (tx.to && tx.to.toLowerCase() === contract.address.toLowerCase()) {
          relevantTxs[tx.hash] = tx
        }
      })
    }))
    console.log({ relevantTxs })

    // note that txsByUser may not be in order!
    await Object.values(relevantTxs).forEach(async tx => {
      txsByUser[tx.from] = txsByUser[tx.from] || []
      txsByUser[tx.from].push({
        ...tx,
        decodedInput: decoder.decodeData(tx.input),
        receipt: await web3.eth.getTransactionReceipt(tx.hash),
      })
    })
    console.log({ txsByUser })
  })

  // Now parse txsByUser to get failed & successful DAO creations
}

export default async function getSuccesses() {
  const successesByContract = await Promise.all(
    contractAddresses.map(address => {
      const contract = new web3.eth.Contract(oeAbi, address)
      return contract.getPastEvents('SetupDao', { fromBlock: 'earliest' })
    })
  )

  return successesByContract.reduce(
    (successes, forContract) => [...successes, ...forContract]
  )
}
