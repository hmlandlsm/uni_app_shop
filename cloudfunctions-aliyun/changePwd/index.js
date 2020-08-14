'use strict';
// 修改账户密码
const collection = uniCloud.database().collection('mall_user')
exports.main = async (event, context) => {
  	const {account, password, newpassword} = event;
	
	// 获取数据库账号
	let selectRes = await collection.where({
		account: account
	}).get()
	const data = selectRes.data[0];
	
	//检查账号是否存在
	if (typeof data === "undefined" || data.length === 0){
		return {
			flag: false,
			msg: '该账号不存在'
		}
	}
	
	//检查密码正确
	if (data.password !== password){
		return {
			flag: false,
			msg: '密码错误'
		}
	}
	
	//修改密码
	const res = await collection.doc(data['_id']).update({
		password: newpassword
	})
	
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
