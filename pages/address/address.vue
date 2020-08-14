<template>
	<view class="content b-t">
		<view class="list b-b" v-for="(item, index) in addressList" :key="index" @click="checkAddress(item)">
			<view class="wrapper">
				<view class="address-name">
					<text v-if="item._id === defaultAddress" class="tag">默认</text>
					<text class="address">
						{{ item.addressName }}
					</text>
				</view>
				<view class="address-name">
					<span class="addressDetail">{{ item.addressDetail }}</span>
				</view>
				<view class="u-box">
					<text class="name">{{ item.name }}</text>
					<text class="mobile">{{ item.mobile }}</text>
				</view>
			</view>
			<text class="yticon icon-bianji" @click.stop="managerAddress('edit', item)"></text>
			<text class="yticon icon-iconfontshanchu1" @click.stop="deleteAddresee(item._id)"></text>
		</view>

		<button class="add-btn" @click="managerAddress('add')">新增地址</button>
	</view>
</template>

<script>
import {
    mapState, mapMutations
} from 'vuex';
export default {
	data() {
		return {
			userId: "",
			source: 0,	// 页面类型，0为管理地址；1为选择地址
			defaultAddress: "",
			addressList: []
		}
	},
	onLoad(option){
		//获取页面类型、用户id与默认地址id
		if (option.source){
			this.source = option.source;
		}

		this.userId = this.$store.state.userInfo._id
		this.defaultAddress = this.$store.state.userInfo.defaultAddress || ""

		//初始化已有收货地址
		uniCloud.callFunction({
			name:"selectAddressByUserId",
			data:{userId: this.userId},
		}).then(res => {
			this.addressList = res.result.data
		})
	},
	methods: {
		...mapMutations(['setDefaultAddress']),
		//选择地址
		checkAddress(item){
			if(this.source == 1){
				this.$api.prePage().addressData = item;
				uni.navigateBack()
			}
		},
		managerAddress(type, item){
			if(type == 'edit'){
				item.isDefault = (item._id === this.defaultAddress)
			}
			uni.navigateTo({
				url: `/pages/address/addressManage?type=${type}&data=${JSON.stringify(item)}`
			})
		},
		//添加或修改成功之后回调
		refreshList(data, type, isUpdateDefaultAddress){
			const userId = this.userId;
			// 保留this指针，promise内无法通过this指针调用
			const that = this;
			//修改信息
			uni.showLoading({
				title:"请稍后"
			})
			new Promise(function(resolve, reject){
				if(type == 'add'){
					data.userId = userId
					uniCloud.callFunction({
						name: 'addAddress',
						data:data
					}).then(res => {
						if(res.result.flag){
							that.addressList.unshift(data);
							resolve(res.result.msg);
						}else{
							this.$api.msg(res.result.msg);
							reject();
						}
					})
				}
				//修改地址
				else if(type == 'edit'){
					for (let i = 0; i < that.addressList.length; i++) {
						if (that.addressList[i]._id == data._id){
							uniCloud.callFunction({
								name:'updateAddress',
								data: {
									id: data._id,
									addressInfo: data
								}
							}).then(res =>{
								if (res.result.flag){
									that.$set(that.addressList, i, data);
									resolve(data._id);
								}else{
									reject()
								}
							})
				
						}
					}
				}
				}).then((id) => {
					// 是否修改默认地址
					if(isUpdateDefaultAddress){
						const newDefaultAddressId = data.isDefault? data._id : '';
						let sendData = {
							"userId": userId,
							"value": data.isDefault? id : ''
						}
						uniCloud.callFunction({
							name: 'updateDefaultAddress',
							data: sendData
						}).then(res =>{
							uni.hideLoading()
							if(res.result.flag){
								that.defaultAddress = newDefaultAddressId
								that.setDefaultAddress(newDefaultAddressId)
								that.$api.msg(`${type=='edit' ? '修改': '添加'}成功`)
								
							}else{
								return;
							}
						})
					}
					uni.hideLoading()
				}).catch((e) => {
					uni.hideLoading()
					if(type === 'add'){
						this.$api.msg("新增失败");
					}
					if(type === 'edit'){
						this.$api.msg("修改失败");
					}
				})
		},

		deleteAddresee(id){
			uni.showModal({
			    content: '确定删除地址信息么',
			    success: (e)=>{
					let that = this
			    	if(e.confirm){
						uniCloud.callFunction({
							name: "deleteAddress",
							data: {
								id: id
							}
						}).then((res) => {
							if (res.result.flag){
								for(let i=0; i < that.addressList.length; i++){
									if(that.addressList[i]._id == id){
										console.log("delete id: "+ id);
										that.addressList.splice(i, 1);
										break;
									}
								}
								//判断是否需要修改默认地址
								if (that.defaultAddress == id){
									let sendData = {
										"userId": that.userId,
										"value": ''
									}
									uniCloud.callFunction({
										name: 'updateDefaultAddress',
										data: sendData
									}).then(res =>{
										if(res.result.flag){
											console.log("delete default address: ")
											that.defaultAddress = ""
											that.setDefaultAddress("");
											that.$api.msg("删除成功")
										}else{
											that.$api.msg("删除失败")
											return;
										}
									})
									
								}else{
									that.$api.msg("删除成功")
								}
								
			
							}else{
								that.$api.msg("删除失败");
							}
						})
			    		
			    	}
			    }
			});
		}
		
	}
}
</script>

<style lang="scss">
page {
	padding-bottom: 120upx;
}
.content {
	position: relative;
}
.list {
	display: flex;
	align-items: center;
	padding: 20upx 30upx;
	background: #fff;
	position: relative;
}
.wrapper {
	display: flex;
	flex-direction: column;
	width: 50upx;
	flex: 1;
}
.address-name {
	display: flex;
	align-items: center;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	.tag {
		font-size: 24upx;
		color: $base-color;
		margin-right: 10upx;
		background: #fffafb;
		border: 1px solid #ffb4c7;
		border-radius: 4upx;
		padding: 4upx 10upx;
		line-height: 1;
	}
	.address {
		font-size: 30upx;
		color: $font-color-dark;
	}
	.addressDetail {
		font-size: 28upx;
		color: $font-color-light;
	}
}
.u-box {
	font-size: 28upx;
	color: $font-color-light;
	margin-top: 16upx;
	.name {
		margin-right: 30upx;
	}
}
.icon-bianji {
	display: flex;
	align-items: center;
	height: 80upx;
	font-size: 40upx;
	color: $font-color-light;
	padding-left: 30upx;
}

.icon-iconfontshanchu1 {
	display: flex;
	align-items: center;
	height: 80upx;
	font-size: 40upx;
	color: $font-color-light;
	margin-left: 30upx;
}

.add-btn {
	position: fixed;
	left: 30upx;
	right: 30upx;
	bottom: 16upx;
	z-index: 95;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 690upx;
	height: 80upx;
	font-size: 32upx;
	color: #fff;
	background-color: $base-color;
	border-radius: 10upx;
	box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
}
</style>
