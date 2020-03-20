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
export function getDetile(id) {
  return request({
    url: URL+'/scmapi/order/detail?In-Gx-Inline-Access-Token-UserId=1&gxOrderId='+id,
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
  },
  })
}

export function tgOrder(id) {
  return request({
    url: URL+'/scmback/report/scmOrder/white/verifyOrder?gxOrderId='+id,
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
  },
  })
}

export function bhOrder(data) {
  return request({
    url: URL+'/scmback/report/scmOrder/white/localBack',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
  },
  data
  })
}

export function whiteUrl(url) {
  return request({
    url: URL+'/scmback/report/scmOrder/white/'+url+'?In-Gx-Inline-Access-Token-UserId=1',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
  },
  })
}
