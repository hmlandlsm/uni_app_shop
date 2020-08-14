<template>
	<view class="app">
		<view class="price-box">
			<text>支付金额</text>
			<text class="price">{{ orderItem.total }}</text>
		</view>

		<view class="pay-type-list">
			<view class="type-item b-b" @click="changePayType(1)">
				<text class="icon yticon icon-weixinzhifu"></text>
				<view class="con">
					<text class="tit">微信支付</text>
					<text>推荐使用微信支付</text>
				</view>
				<label class="radio"><radio value="" color="#fa436a" :checked="payType == 1" /></label>
			</view>
			<view class="type-item b-b" @click="changePayType(2)">
				<text class="icon yticon icon-alipay"></text>
				<view class="con"><text class="tit">支付宝支付</text></view>
				<label class="radio"><radio value="" color="#fa436a" :checked="payType == 2" /></label>
			</view>
		</view>
		<view class="box_btn">
			<text class="mix-btn" @click="confirm('cancel')">取消支付</text>
			<text class="mix-btn" @click="confirm('')">确认支付</text>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			payType: 1,
			orderInfo: {},
			orderItem: ''
		};
	},
	computed: {},
	onLoad(options) {
		// this.orderItem = JSON.parse(options.orderItem);
		let orderNo = options.orderNo;
		uni.showLoading({
			title: '加载中'
		});
		uniCloud
			.callFunction({
				name: 'getOrderItemByOrderNo',
				data: { orderNo: orderNo }
			})
			.then(res => {
				this.orderItem = (res.result && res.result.data[0]) || {};
				uni.hideLoading();
			});
	},

	methods: {
		//选择支付方式
		changePayType(type) {
			this.payType = type;
		},
		//确认支付
		confirm: async function(type) {
			let str = '已完成';
			let url = '/pages/money/paySuccess';
			if (type) {
				str = '已取消';
				url = '/pages/index/index'
			}
			this.orderItem.orderStatus = str;
			// 更新订单状态
			uniCloud
				.callFunction({
					name: 'updateOrderStatus',
					data: {
						id: this.orderItem._id,
						orderItem: this.orderItem
					}
				})
				.then(res => {
					if (res.result.flag) {
						this.$api.msg(str);
					} else {
						return;
					}
				});
			uni.redirectTo({
				url
			});
		}
	}
};
</script>

<style lang="scss">
.app {
	width: 100%;
}

.price-box {
	background-color: #fff;
	height: 265upx;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	font-size: 28upx;
	color: #909399;

	.price {
		font-size: 50upx;
		color: #303133;
		margin-top: 12upx;
		&:before {
			content: '￥';
			font-size: 40upx;
		}
	}
}

.pay-type-list {
	margin-top: 20upx;
	background-color: #fff;
	padding-left: 60upx;

	.type-item {
		height: 120upx;
		padding: 20upx 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-right: 60upx;
		font-size: 30upx;
		position: relative;
	}

	.icon {
		width: 100upx;
		font-size: 52upx;
	}
	.icon-erjiye-yucunkuan {
		color: #fe8e2e;
	}
	.icon-weixinzhifu {
		color: #36cb59;
	}
	.icon-alipay {
		color: #01aaef;
	}
	.tit {
		font-size: $font-lg;
		color: $font-color-dark;
		margin-bottom: 4upx;
	}
	.con {
		flex: 1;
		display: flex;
		flex-direction: column;
		font-size: $font-sm;
		color: $font-color-light;
	}
}
.box_btn {
	display: flex;
	justify-content: space-between;
	flex-direction: row;
	margin: 80upx 30upx 30upx 30upx;
}
.mix-btn {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 40%;
	height: 80upx;
	margin: 80upx auto 30upx;
	font-size: $font-lg;
	color: #fff;
	background-color: $base-color;
	border-radius: 10upx;
	box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
}
</style>
