'use strict';
//更新用户信息
const collection = uniCloud.database().collection('mall_user')

exports.main = async (event, context) => {
	let {id, updateData} = event;
	updateData.updateTime = new Date().toISOString();
	
	const res = await collection.doc(id).update(updateData)
	
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
