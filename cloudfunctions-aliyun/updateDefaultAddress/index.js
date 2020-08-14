'use strict';
//更新用户默认地址
const collection = uniCloud.database().collection('mall_user')

exports.main = async (event, context) => {
  const {userId, value} = event;
  
  console.log(event)
  
  let data = {
	  "defaultAddress": value,
	  "updateTime": new Date().toISOString()
  }
  
  console.log(userId)
  
  const res = await collection.doc(userId).update(data);
  
  //返回数据给客户端
  return {
	  flag: true
  }
};
