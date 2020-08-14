'use strict';
const collection = uniCloud.database().collection('mall_cart')
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const {
		goodId,
		image,
		sku,
		sales,
		title,
		price,
		number,
		createTime,
		userId
	} = event;
	// 塞进数据库
	let res = await collection.add({
		"userId": userId,
		"goodId": goodId,
		"image": image,
		"sku": sku,
		"sales": sales,
		"title": title,
		"price": price,
		"number": number,
		"createTime": createTime
	})
	//返回数据给客户端
	return res
};
