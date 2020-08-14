'use strict';
//新增用户收货地址
const collection = uniCloud.database().collection('mall_address')

exports.main = async (event, context) => {
	
	const {userId} = event;
	
	if(typeof userId == "undefined" || userId.length == 0){
		return {
			flag: false,
			msg: '当前用户未登录'
		}
	}
	
	let data = Object.assign({}, event, {
		createTime: new Date().toISOString(),
		isDelete: false
	})
	
	delete data['default']
	  
	console.log(data)
	  
	let res = await collection.add(data)
		
	//返回数据给客户端
	return {
		flag: true,
		msg: res.id
	  }

};
