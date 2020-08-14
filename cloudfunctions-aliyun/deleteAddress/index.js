'use strict';
//根据id删除用户地址
const collection = uniCloud.database().collection('mall_address')

exports.main = async (event, context) => {
	const {id} = event
	const res = await collection.doc(id).remove();
	
	const {deleted} = res;
	return {
		flag: deleted > 0
	};
};
