<template>
	<view class="content">
		<view class="navbar">
			<view v-for="(item, index) in navList" :key="index" class="nav-item" :class="{ current: tabCurrentIndex === index }" @click="tabClick(index)">{{ item.text }}</view>
		</view>

		<swiper :current="tabCurrentIndex" class="swiper-box" duration="300" @change="changeTab">
			<swiper-item class="tab-content" v-for="(tabItem, tabIndex) in navList" :key="tabIndex">
				<scroll-view class="list-scroll-content" scroll-y @scrolltolower="loadData">
					<!-- 空白页 -->
					<empty v-if="tabItem.loaded === true && tabItem.orderList.length === 0"></empty>

					<!-- 订单列表 -->
					<view v-for="(item, index) in tabItem.orderList" :key="index" class="order-item">
						<view class="i-top b-b">
							<text class="time">{{ item.createTime }}</text>
							<text class="state" :class="item.orderStatus == '待支付' ? 'red' : item.orderStatus == '已完成' ? 'blue' : 'grey'">{{ item.orderStatus }}</text>
							<text class="del-btn yticon icon-iconfontshanchu1" @click="deleteOrder(index, item._id)"></text>
						</view>

						<scroll-view v-if="item.itemList.length > 1" class="goods-box" scroll-x>
							<view v-for="(goodsItem, goodsIndex) in item.itemList" :key="goodsIndex" class="goods-item">
								<image class="goods-img" :src="goodsItem.image" mode="aspectFill"></image>
							</view>
						</scroll-view>
						<view v-if="item.itemList.length === 1" class="goods-box-single" v-for="(goodsItem, goodsIndex) in item.itemList" :key="goodsIndex">
							<image class="goods-img" :src="goodsItem.image" mode="aspectFill"></image>
							<view class="right">
								<text class="title clamp">{{ goodsItem.title }}</text>
								<text class="attr-box">{{ goodsItem.sku }} x {{ goodsItem.number }}</text>
								<text class="price">{{ goodsItem.price }}</text>
							</view>
						</view>

						<view class="price-box">
							共
							<text class="num">{{ item.itemList.length }}</text>
							件商品 实付款
							<text class="price">{{ item.realTotal }}</text>
						</view>
						<view class="action-box b-t" v-if="item.state != 9">
							<button class="action-btn" @click="cancelOrder(item)" v-if="item.orderStatus !== '已取消' && item.orderStatus !== '已完成'">取消订单</button>
							<button class="action-btn recom" @click="goForPay(item)" v-if="item.orderStatus === '待支付'">立即支付</button>
						</view>
					</view>

					<uni-load-more :status="tabItem.loadingType"></uni-load-more>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
import empty from '@/components/empty';
export default {
	components: {
		uniLoadMore,
		empty
	},
	data() {
		return {
			tabCurrentIndex: 0,
			navList: [
				{
					state: 0,
					text: '全部',
					loadingType: 'more',
					orderList: []
				},
				{
					state: 1,
					text: '待付款',
					loadingType: 'more',
					orderList: []
				},
				{
					state: 2,
					text: '已完成',
					loadingType: 'more',
					orderList: []
				},
				{
					state: 3,
					text: '已取消',
					loadingType: 'more',
					orderList: []
				}
			],
			orderList: []
		};
	},

	onLoad(options) {
		this.tabCurrentIndex = +options.state;
		this.loadData();
	},

	methods: {
		//获取订单列表
		loadData(source) {
			//这里是将订单挂载到tab列表下
			let index = this.tabCurrentIndex;
			let navItem = this.navList[index];
			let state = navItem.state;

			let userId = this.$store.state.userInfo._id;

			if (source === 'tabChange' && navItem.loaded === true) {
				//tab切换只有第一次需要加载数据
				return;
			}
			if (navItem.loadingType === 'loading') {
				//防止重复加载
				return;
			}

			navItem.loadingType = 'loading';

			// 云函数获取订单
			uni.showLoading({
				title: '加载中'
			});
			uniCloud
				.callFunction({
					name: 'getOrderList',
					data: {
						userId: userId
					}
				})
				.then(res => {
					this.orderList = res.result.data || [];
					this.orderList.slice(0, 2);
					this.navList[0].orderList = this.orderList;
					this.navList[0].orderList.forEach(item => {
						item.createTime = this.transDateFun(item.createTime, 'yyyy-MM-dd hh:mm:ss');
					});
					this.navList[1].orderList = this.orderList.filter(item => {
						return item.orderStatus == '待支付';
					});
					this.navList[2].orderList = this.orderList.filter(item => {
						return item.orderStatus == '已完成';
					});
					this.navList[3].orderList = this.orderList.filter(item => {
						return item.orderStatus == '已取消';
					});
					uni.hideLoading();
				});

			//loaded新字段用于表示数据加载完毕，如果为空可以显示空白页
			this.$set(navItem, 'loaded', true);

			//判断是否还有数据， 有改为 more， 没有改为noMore
			navItem.loadingType = 'more';
		},
		// 时间戳转日期格式
		transDateFun(val, fm) {
			if (!val) return '';
			if (String(val).length < 13) val = val * 1000;
			var date = new Date(val),
				o = {
					'M+': date.getMonth() + 1, //month
					'd+': date.getDate(), //day
					'h+': date.getHours(), //hour
					'm+': date.getMinutes(), //minute
					's+': date.getSeconds(), //second
					'q+': Math.floor((date.getMonth() + 3) / 3), //quarter
					S: date.getMilliseconds() //millisecond
				},
				format = fm || 'yyyy-MM-dd hh:mm:ss';
			if (/(y+)/.test(format)) format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
			for (var k in o)
				if (new RegExp('(' + k + ')').test(format)) format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
			return format;
		},

		//swiper 切换
		changeTab(e) {
			this.tabCurrentIndex = e.target.current;
			this.loadData('tabChange');
		},
		//顶部tab点击
		tabClick(index) {
			this.tabCurrentIndex = index;
		},
		//删除订单
		deleteOrder(index, id) {
			uni.showLoading({
				title: '请稍后'
			});

			// 删除云数据
			uniCloud
				.callFunction({
					name: 'deleteOrderItem',
					data: { id: id }
				})
				.then(res => {
					this.navList[this.tabCurrentIndex].orderList.splice(index, 1);
					uni.hideLoading();
					this.$api.msg("删除成功")
				});
		},
		//取消订单
		cancelOrder(item) {
			uni.showLoading({
				title: '请稍后'
			});
			item.orderStatus = '已取消';
			uniCloud
				.callFunction({
					name: 'updateOrderStatus',
					data: {
						id: item._id,
						orderItem: item
					}
				})
				.then(res => {
					if (res.result.flag) {
						this.$api.msg('订单取消成功！');
					} else {
						return;
					}
				});
			//取消订单后删除待付款中该项
			let list = this.navList[1].orderList;
			let index = list.findIndex(val => val.id === item.id);
			index !== -1 && list.splice(index, 1);

			uni.hideLoading();
		},
		goForPay(item) {
			uni.redirectTo({
				url: `/pages/money/pay?orderNo=${item.orderNo}`
			});
		}
	}
};
</script>

<style lang="scss">
page,
.content {
	background: $page-color-base;
	height: 100%;
}

.swiper-box {
	height: calc(100% - 40px);
}
.list-scroll-content {
	height: 100%;
}

.navbar {
	display: flex;
	height: 40px;
	padding: 0 5px;
	background: #fff;
	box-shadow: 0 1px 5px rgba(0, 0, 0, 0.06);
	position: relative;
	z-index: 10;
	.nav-item {
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		font-size: 15px;
		color: $font-color-dark;
		position: relative;
		&.current {
			color: $base-color;
			&:after {
				content: '';
				position: absolute;
				left: 50%;
				bottom: 0;
				transform: translateX(-50%);
				width: 44px;
				height: 0;
				border-bottom: 2px solid $base-color;
			}
		}
	}
}

.uni-swiper-item {
	height: auto;
}
.order-item {
	display: flex;
	flex-direction: column;
	padding-left: 30upx;
	background: #fff;
	margin-top: 16upx;
	.i-top {
		display: flex;
		align-items: center;
		height: 80upx;
		padding-right: 30upx;
		font-size: $font-base;
		color: $font-color-dark;
		position: relative;
		.time {
			flex: 1;
		}
		// .state{
		// 	color: $base-color;
		// }
		.red {
			color: #fa436a;
		}
		.grey {
			color: #909399;
		}
		.blue {
			color: #4385fd;
		}
		.del-btn {
			padding: 10upx 0 10upx 36upx;
			font-size: $font-lg;
			color: $font-color-light;
			position: relative;
			&:after {
				content: '';
				width: 0;
				height: 30upx;
				border-left: 1px solid $border-color-dark;
				position: absolute;
				left: 20upx;
				top: 50%;
				transform: translateY(-50%);
			}
		}
	}
	/* 多条商品 */
	.goods-box {
		height: 160upx;
		padding: 20upx 0;
		white-space: nowrap;
		.goods-item {
			width: 120upx;
			height: 120upx;
			display: inline-block;
			margin-right: 24upx;
		}
		.goods-img {
			display: block;
			width: 100%;
			height: 100%;
		}
	}
	/* 单条商品 */
	.goods-box-single {
		display: flex;
		padding: 20upx 0;
		.goods-img {
			display: block;
			width: 120upx;
			height: 120upx;
		}
		.right {
			flex: 1;
			display: flex;
			flex-direction: column;
			padding: 0 30upx 0 24upx;
			overflow: hidden;
			.title {
				font-size: $font-base + 2upx;
				color: $font-color-dark;
				line-height: 1;
			}
			.attr-box {
				font-size: $font-sm + 2upx;
				color: $font-color-light;
				padding: 10upx 12upx;
			}
			.price {
				font-size: $font-base + 2upx;
				color: $font-color-dark;
				&:before {
					content: '￥';
					font-size: $font-sm;
					margin: 0 2upx 0 8upx;
				}
			}
		}
	}

	.price-box {
		display: flex;
		justify-content: flex-end;
		align-items: baseline;
		padding: 20upx 30upx;
		font-size: $font-sm + 2upx;
		color: $font-color-light;
		.num {
			margin: 0 8upx;
			color: $font-color-dark;
		}
		.price {
			font-size: $font-lg;
			color: $font-color-dark;
			&:before {
				content: '￥';
				font-size: $font-sm;
				margin: 0 2upx 0 8upx;
			}
		}
	}
	.action-box {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		height: 100upx;
		position: relative;
		padding-right: 30upx;
	}
	.action-btn {
		width: 160upx;
		height: 60upx;
		margin: 0;
		margin-left: 24upx;
		padding: 0;
		text-align: center;
		line-height: 60upx;
		font-size: $font-sm + 2upx;
		color: $font-color-dark;
		background: #fff;
		border-radius: 100px;
		&:after {
			border-radius: 100px;
		}
		&.recom {
			background: #fff9f9;
			color: $base-color;
			&:after {
				border-color: #f7bcc8;
			}
		}
	}
}

/* load-more */
.uni-load-more {
	display: flex;
	flex-direction: row;
	height: 80upx;
	align-items: center;
	justify-content: center;
}

.uni-load-more__text {
	font-size: 28upx;
	color: #999;
}

.uni-load-more__img {
	height: 24px;
	width: 24px;
	margin-right: 10px;
}

.uni-load-more__img > view {
	position: absolute;
}

.uni-load-more__img > view view {
	width: 6px;
	height: 2px;
	border-top-left-radius: 1px;
	border-bottom-left-radius: 1px;
	background: #999;
	position: absolute;
	opacity: 0.2;
	transform-origin: 50%;
	animation: load 1.56s ease infinite;
}

.uni-load-more__img > view view:nth-child(1) {
	transform: rotate(90deg);
	top: 2px;
	left: 9px;
}

.uni-load-more__img > view view:nth-child(2) {
	transform: rotate(180deg);
	top: 11px;
	right: 0;
}

.uni-load-more__img > view view:nth-child(3) {
	transform: rotate(270deg);
	bottom: 2px;
	left: 9px;
}

.uni-load-more__img > view view:nth-child(4) {
	top: 11px;
	left: 0;
}

.load1,
.load2,
.load3 {
	height: 24px;
	width: 24px;
}

.load2 {
	transform: rotate(30deg);
}

.load3 {
	transform: rotate(60deg);
}

.load1 view:nth-child(1) {
	animation-delay: 0s;
}

.load2 view:nth-child(1) {
	animation-delay: 0.13s;
}

.load3 view:nth-child(1) {
	animation-delay: 0.26s;
}

.load1 view:nth-child(2) {
	animation-delay: 0.39s;
}

.load2 view:nth-child(2) {
	animation-delay: 0.52s;
}

.load3 view:nth-child(2) {
	animation-delay: 0.65s;
}

.load1 view:nth-child(3) {
	animation-delay: 0.78s;
}

.load2 view:nth-child(3) {
	animation-delay: 0.91s;
}

.load3 view:nth-child(3) {
	animation-delay: 1.04s;
}

.load1 view:nth-child(4) {
	animation-delay: 1.17s;
}

.load2 view:nth-child(4) {
	animation-delay: 1.3s;
}

.load3 view:nth-child(4) {
	animation-delay: 1.43s;
}

@-webkit-keyframes load {
	0% {
		opacity: 1;
	}

	100% {
		opacity: 0.2;
	}
}
</style>
