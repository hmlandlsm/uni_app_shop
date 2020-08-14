'use strict';
const collection = uniCloud.database().collection('mall_order');
exports.main = async (event, context) => {
	const {
		userId
	} = event;
	//event为客户端上传的参数
	let res = await collection.where({
		userId: userId
	}).orderBy('createTime', 'desc').get();
	//返回数据给客户端
	return res
};
