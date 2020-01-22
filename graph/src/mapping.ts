import { NewTokenAndInstanceCall, NewOpenEnterpriseCall } from '../generated/OpenEnterpriseTemplate/OpenEnterpriseTemplate'
import { Dao, Transaction } from '../generated/schema'
import { EthereumBlock } from '@graphprotocol/graph-ts'

export function handleBlock(block: EthereumBlock): void {
  let id = block.hash.toHex()
  // TODO: how to get transaction hash?
  // we can't use block.hash as Dao ID,
  // since multiple Daos could be created in a single block
  block.transactionsRoot.toString()
  block.receiptsRoot
}

export function handleDaoInitialization(call: NewTokenAndInstanceCall): void {
  const txId = call.transaction.hash.toHex()
  const transaction = new Transaction(txId)
}
export function handleDaoFinalization(call: NewOpenEnterpriseCall): void {
}

// import { NewGravatar, UpdatedGravatar } from '../generated/Gravity/Gravity'
// import { Gravatar } from '../generated/schema'
//
// export function handleNewGravatar(event: NewGravatar): void {
//   let gravatar = new Gravatar(event.params.id.toHex())
//   gravatar.owner = event.params.owner
//   gravatar.displayName = event.params.displayName
//   gravatar.imageUrl = event.params.imageUrl
//   gravatar.save()
// }
//
// export function handleUpdatedGravatar(event: UpdatedGravatar): void {
//   let id = event.params.id.toHex()
//   let gravatar = Gravatar.load(id)
//   if (gravatar == null) {
//     gravatar = new Gravatar(id)
//   }
//   gravatar.owner = event.params.owner
//   gravatar.displayName = event.params.displayName
//   gravatar.imageUrl = event.params.imageUrl
//   gravatar.save()
// }
