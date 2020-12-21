import {request} from './request'

export function getDetail(iid) {
  return request({
    url:'/detail',
    params: {
      iid
    }
  })
}

export class Goods{
  constructor(itemInfo, columns, service) {
    this.desc = itemInfo.desc 
    this.newPrice = itemInfo.price
    this.oldPrice = itemInfo.oldPrice
    this.discount = itemInfo.discountDesc
    this.discountBgColor = itemInfo.discountBgColor
    this.columns = columns
    this.services = service
  }
}


