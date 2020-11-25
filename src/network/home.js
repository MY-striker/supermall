import {request} from './request'

export function getHomeMultidata() {
  return request({
    url:'/home/multidata'
  })
}

// export function getHomeMultiData() {
//   return request({
//     url:'/test/getBanners'
//   });
// }