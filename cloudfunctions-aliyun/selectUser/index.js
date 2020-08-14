'use strict';
//根据account+password 查询用户账号信息
const collection = uniCloud.database().collection('mall_user')
exports.main = async (event, context) => {
	const {account, password} = event;
	
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
	//检查密码是否正确
	
	if (data.password !== password){
		return {
			flag: false,
			msg: '密码错误'
		}
	}
	  
	//返回数据给客户端
	return {
		flag: true,
		data: data
	}
};
