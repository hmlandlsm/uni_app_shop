'use strict';
const collection = uniCloud.database().collection('mall_order')
const cartCollection = uniCloud.database().collection('mall_cart')
const dbCmd = uniCloud.database().command
exports.main = async (event, context) => {
	const {orderNo, orderStatus,createTime,addressData,total,realTotal,itemList,userId, cartIdList} = event;
	
	// 检查账号是否已存在
	let selectRes = await collection.where({
		orderNo: orderNo
	}).get()
	
	if (selectRes.data.length > 0){
		return {
			flag: false,
			msg: '提交订单失败'
		}
	}
	
	//订单数据库新增记录
	let res = await collection.add({
		"userId": userId,
		"orderNo": orderNo,
		"orderStatus": orderStatus,
		"createTime": createTime,
		"addressData":addressData,
		"total":total,
		"realTotal":realTotal,
		"itemList":itemList
	})
	
	//删除购物车数据库记录
	if (res.id){
		if(cartIdList.length == 0){
			return {
				flag: true
			}
		}
		let cartRes = await cartCollection.where({
			"_id": dbCmd.in(cartIdList)
		}).remove()
		
		console.log(cartRes)
		const {deleted} = cartRes;
		return {
			flag: deleted > 0,
			msg: deleted > 0? '': '创建失败'
		};
	}
  
	return {
		flag: false,
		msg: '创建失败'
	};
};
