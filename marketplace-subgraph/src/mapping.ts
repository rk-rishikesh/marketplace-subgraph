import { BigInt } from "@graphprotocol/graph-ts"
import {
  Marketplace,
  OrderCreated,
  OrderSuccessful,
  OrderCancelled,
  ChangedPublicationFee,
  ChangedOwnerCutPerMillion
} from "../generated/Marketplace/Marketplace"
import { Order } from "../generated/schema"

export function handleOrderCreated(event: OrderCreated): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = Order.load(event.params.id.toHex())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (entity == null) {
    entity = new Order(event.params.id.toHex())
  }
  //event.transaction.from.toHex()
  entity.tokenId = event.params.assetId
  entity.nftAddress = event.address.toHexString()
  entity.txHash = event.transaction.hash
  entity.owner = event.params.seller
  entity.price = event.params.priceInWei
  entity.expiresAt = event.params.expiresAt
  entity.blockNumber = event.block.number
  entity.createdAt = event.block.timestamp
  entity.updatedAt = event.block.timestamp

  entity.save()
}

export function handleOrderSuccessful(event: OrderSuccessful): void {

  let orderId = event.params.id.toHex()

  //let nft = NFT.load(nftId)
  let order = Order.load(orderId)

  if (order == null) {
    order = new Order(event.params.id.toHex())
  }

  //order.status = status.SOLD
  order.buyer = event.params.buyer
  order.price = event.params.totalPrice
  order.blockNumber = event.block.number
  order.updatedAt = event.block.timestamp
  order.save()

  //nft.owner = event.params.buyer.toHex()
  //nft.updatedAt = event.block.timestamp
  //nft = updateNFTOrderProperties(nft!, order!)
  //nft.save()
}

export function handleOrderCancelled(event: OrderCancelled): void {

  let orderId = event.params.id.toHex()


  let order = Order.load(orderId)

  if (order == null) {
    order = new Order(event.params.id.toHex())
  }

    order.blockNumber = event.block.number
    order.updatedAt = event.block.timestamp
    order.save()

}

export function handleChangedPublicationFee(
  event: ChangedPublicationFee
): void {}

export function handleChangedOwnerCutPerMillion(
  event: ChangedOwnerCutPerMillion
): void {}
