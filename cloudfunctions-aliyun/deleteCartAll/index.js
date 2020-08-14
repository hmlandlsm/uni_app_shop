'use strict';
const db = uniCloud.database();
const collection = uniCloud.database().collection('mall_cart')
exports.main = async (event, context) => {
	const {userId} = event;
	let res = await collection.where({
		userId: userId
	}).remove()
	const {deleted} = res;
	return {
		flag: deleted > 0
	};
};
