'use strict';
//传入id与addressInfo更新用户收货地址
const collection = uniCloud.database().collection('mall_address')
exports.main = async (event, context) => {
	let {id, addressInfo} = event
	addressInfo.updateTimer = new Date().toISOString();
	delete addressInfo['_id']
	
	const res = await collection.doc(id).update(addressInfo)
	
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
