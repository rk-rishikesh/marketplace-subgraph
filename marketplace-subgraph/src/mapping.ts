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
  let entity = Order.load(event.transaction.from.toHex())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (entity == null) {
    entity = new Order(event.transaction.from.toHex())
  }

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

export function handleOrderSuccessful(event: OrderSuccessful): void {}

export function handleOrderCancelled(event: OrderCancelled): void {}

export function handleChangedPublicationFee(
  event: ChangedPublicationFee
): void {}

export function handleChangedOwnerCutPerMillion(
  event: ChangedOwnerCutPerMillion
): void {}
