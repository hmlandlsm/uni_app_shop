'use strict';
//根据UserId查询用户收货地址
const collection = uniCloud.database().collection('mall_address')
exports.main = async (event, context) => {
	const {userId} = event;
	let selectRes = await collection.where({
		userId: userId
	}).orderBy('createTime', 'desc').get()
	return selectRes
};
