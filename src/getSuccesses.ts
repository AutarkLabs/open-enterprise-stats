import provider from 'eth-provider'
import Web3 from 'web3'

// TODO: use `import` syntax (currently causes TypeScript to complain)
const oeAbi = require('./abi.json')

const web3 = new Web3(provider('infura'))

const contractAddresses = [
  '0xc54c5db63ab0e79fbb9555373b969093deb17859',
  '0xde40122f2a86db6af51e20c79653f6cb8b30eda0',
]

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
