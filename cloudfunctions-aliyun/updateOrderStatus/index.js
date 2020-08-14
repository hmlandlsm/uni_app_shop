'use strict';
const collection = uniCloud.database().collection('mall_order')
exports.main = async (event, context) => {
	let {id, orderItem} = event
	delete orderItem['_id']
	// orderItem.updateTimer = new Date().toISOString();
	const res = await collection.doc(id).update(orderItem)
	
	if(res.updated == 0){
		return {
			flag: false,
			msg: '更新失败'
		}
	}
	return {
		flag: true
	};
};
