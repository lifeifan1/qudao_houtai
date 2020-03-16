import request from '@/utils/request';
var URL = "http://i.mmjinbao.cn";

export function getList(data) {
  return request({
    url: URL+'/scmapi/goods/query?In-Gx-Inline-Access-Token-UserId=10000',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
  },
    // params:{token},
    data
  })
}
export function edit(data) {
  return request({
    url: URL+'/scmback/report/scmGoodsCustom/white/updatePrice',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
  },
    // params:{token},
    data
  })
}
export function orderUrl(data) {
  console.log(URL);
  return request({
    url: URL+'/scmapi/order/query?In-Gx-Inline-Access-Token-UserId=1',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
  },
    // params:{token},
    data
  })
}
