'use strict';
const collection = uniCloud.database().collection('mall_order')
exports.main = async (event, context) => {
	var {orderNo} = event;
	let selectRes = await collection.where({
	orderNo:orderNo
	}).get()
	return selectRes
};
