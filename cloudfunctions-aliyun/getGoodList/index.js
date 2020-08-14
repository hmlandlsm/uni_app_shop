'use strict';
const collection = uniCloud.database().collection('mall_goodList');
exports.main = async (event, context) => {
  //event为客户端上传的参数
  console.log('event : ' + event)
  let res = await collection.orderBy('goodId','asc').get();
  //返回数据给客户端
  return res
};
