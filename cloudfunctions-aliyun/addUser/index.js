'use strict';
//添加新用户
const collection = uniCloud.database().collection('mall_user')

exports.main = async (event, context) => {
	const {account, password} = event;
	
	// 检查账号是否已存在
	let selectRes = await collection.where({
		account: account
	}).get()
	
	if (selectRes.data.length > 0){
		return {
			flag: false,
			msg: '该账号已存在，请重新输入'
		}
	}
	
	//数据库新增记录
	let res = await collection.add({
		"account": account,
		"password": password,
		"createTime": new Date().toISOString()
	})
  
	//返回数据给客户端
	return {
		flag: true,
		msg: res.id
	}
};
