'use strict';
// 根据分类查询商品数据
const collection = uniCloud.database().collection('mall_goodList')
exports.main = async (event, context) => {
	var {goodId} = event;
	let selectRes = await collection.where({
	goodId:goodId
	}).get()
	// console.log('查询商品返回'+ JSON.stringify(selectRes))
	return selectRes
};
