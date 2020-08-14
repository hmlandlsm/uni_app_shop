'use strict';
const collection = uniCloud.database().collection('mall_cart')
exports.main = async (event, context) => {
	const {id} = event
	const res = await collection.doc(id).remove();
	return res;
};
