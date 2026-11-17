// The things Tezga stores. Each model mirrors one table from migrations/.
// `npm run migrate` checks that every model's fields match its table.
// Types: money = integer in minor units (cents/deni), datetime = ISO 8601 text, "?" = can be empty.
import { User } from './user.js'
import { Shop } from './shop.js'
import { ShopMember } from './shop-member.js'
import { Category } from './category.js'
import { Product } from './product.js'
import { ProductImage } from './product-image.js'
import { ProductVariant } from './product-variant.js'
import { DeliveryPrice } from './delivery-price.js'
import { Coupon } from './coupon.js'
import { CustomerPhone } from './customer-phone.js'
import { Order } from './order.js'
import { OrderItem } from './order-item.js'
import { Payment } from './payment.js'

export const models = [
  User,
  Shop,
  ShopMember,
  Category,
  Product,
  ProductImage,
  ProductVariant,
  DeliveryPrice,
  Coupon,
  CustomerPhone,
  Order,
  OrderItem,
  Payment,
]

export {
  User,
  Shop,
  ShopMember,
  Category,
  Product,
  ProductImage,
  ProductVariant,
  DeliveryPrice,
  Coupon,
  CustomerPhone,
  Order,
  OrderItem,
  Payment,
}
