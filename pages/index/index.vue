<template>
	<view class="container">
		<view v-show="unSearching">
			<!-- 头部轮播 -->
			<view class="carousel-section">
				<view class="titleNview-placing"></view>
				<view class="titleNview-background" :style="{ backgroundColor: titleNViewBackground }"></view>
				<swiper class="carousel" circular autoplay @change="swiperChange">
					<swiper-item v-for="(item, index) in carouselList" :key="index" class="carousel-item" @click="navToProductList(item.type)">
						<image :src="item.src" />
					</swiper-item>
				</swiper>
				<view class="swiper-dots">
					<text class="num">{{ swiperCurrent + 1 }}</text>
					<text class="sign">/</text>
					<text class="num">{{ swiperLength }}</text>
				</view>
			</view>
			<!-- 分类 -->
			<view class="cate-section">
				<view class="cate-item" @click="navToProductList(1)">
					<image src="/static/temp/c3.png"></image>
					<text>当天秒杀</text>
				</view>
				<view class="cate-item" @click="navToProductList(2)">
					<image src="/static/temp/c6.png"></image>
					<text>大量批发</text>
				</view>
				<view class="cate-item" @click="navToProductList(3)">
					<image src="/static/temp/c1.png"></image>
					<text>口碑老农</text>
				</view>
				<view class="cate-item" @click="navToProductList(4)">
					<image src="/static/temp/c4.png"></image>
					<text>优惠特价</text>
				</view>
				<view class="cate-item" @click="navToProductList(5)">
					<image src="/static/temp/c8.png"></image>
					<text>品类分析</text>
				</view>
			</view>

			<view class="ad-1"><image src="/static/image/long2.jpg" mode="scaleToFill"></image></view>

			<!-- 秒杀楼层 -->
			<view class="seckill-section m-t">
				<view class="s-header">
					<image class="s-img" src="/static/temp/secskill-img.jpg" mode="widthFix"></image>
					<text class="hour timer">{{ day }}</text>
					<span class="tip">天</span>
					<text class="hour timer">{{ hour }}</text>
					<span class="tip">时</span>
					<text class="minute timer">{{ minute }}</text>
					<span class="tip">分</span>
					<text class="second timer">{{ second }}</text>
					<span class="tip">秒</span>
					<text class="yticon icon-you"></text>
				</view>
				<scroll-view class="floor-list" scroll-x>
					<view class="scoll-wrapper">
						<view v-for="(item, index) in goodsListActi" :key="index" class="floor-item" @click="navToDetailPage(item)">
							<image :src="item.image" mode="aspectFill"></image>
							<text class="title clamp">{{ item.title }}</text>
							<text class="price">￥{{ item.price }}</text>
						</view>
					</view>
				</scroll-view>
			</view>

			<!-- 分类精选 -->
			<view class="f-header m-t">
				<image src="/static/image/long3.jpg"></image>
				<view class="tit-box">
					<text class="tit">分类精选</text>
					<text class="tit2">Competitive Products For You</text>
				</view>
				<text class="yticon icon-you"></text>
			</view>
			<view class="hot-floor">
				<view class="floor-img-box"><image class="floor-img" src="../../static/image/long5.jpg" mode="scaleToFill"></image></view>
				<scroll-view class="floor-list" scroll-x>
					<view class="scoll-wrapper">
						<view v-for="(item, index) in goodsListClassify" :key="index" class="floor-item" @click="navToDetailPage(item)">
							<image :src="item.image" mode="aspectFill"></image>
							<text class="title clamp">{{ item.title }}</text>
							<text class="price">￥{{ item.price }}</text>
						</view>
						<view class="more" @click="navToProductList()">
							<text>查看全部</text>
							<text>More+</text>
						</view>
					</view>
				</scroll-view>
			</view>

			<!-- 商品推荐 -->
			<view class="f-header m-t">
				<image src="/static/image/v1.jpg"></image>
				<view class="tit-box">
					<text class="tit">商品推荐</text>
					<text class="tit2">Guess You Like It</text>
				</view>
				<text class="yticon icon-you" @click="navToProductList()"></text>
			</view>
		</view>
		<view class="guess-section">
			<view v-for="(item, index) in goodsList" :key="index" class="guess-item" @click="navToDetailPage(item)">
				<view class="image-wrapper"><image :src="item.image" mode="aspectFill"></image></view>
				<text class="title clamp">{{ item.title }}</text>
				<span>
					<text class="price">￥{{ item.price }}</text>
					<text class="sale">{{ item.sales }}{{ item.unit }}已售</text>
				</span>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			titleNViewBackground: '',
			swiperCurrent: 0,
			swiperLength: 0,
			carouselList: [],
			goodsList: [],
			goodsListActi: [], //限时秒杀
			goodsListClassify: [], //分类精选
			inputContent: '',
			second: '',
			minute: '',
			hour: '',
			day: '',
			time: 0,
			unSearching: true
		};
	},
	onLoad() {
		this.init();
	},
	watch: {
		time: {
			deep: true,
			handler(newVal) {
				this.time = newVal;
				this.countTime();
			}
		}
	},
	methods: {
		init() {
			this.loadData();
			this.countTime();
			this.time = new Date().getTime() + 1000 * 60 * 60 * 24 * 4;
		},
		// 倒计时模块
		async countTime() {
			let now = new Date().getTime();
			var end = parseInt(this.time);
			var leftTime = end - now;
			if (leftTime > 0) {
				this.day = Math.floor(leftTime / 1000 / 60 / 60 / 24) || 0;
				this.hour = Math.floor((leftTime / 1000 / 60 / 60) % 24) || 0;
				this.minute = Math.floor((leftTime / 1000 / 60) % 60) || 0;
				this.second = Math.floor((leftTime / 1000) % 60) || 0;
			}
			setTimeout(this.countTime, 1000);
		},

		// 数据展示模块
		async loadData() {
			// 获取头部swiper列表
			uniCloud
				.callFunction({
					name: 'getCarouselList',
					data: {}
				})
				.then(res => {
					this.carouselList = res.result.data || [];
					this.titleNViewBackground = this.carouselList[0].background;
					this.swiperLength = this.carouselList.length;
				});
			// 获取轮播图

			// 获取商品列表
			uniCloud
				.callFunction({
					name: 'getGoodList',
					data: {}
				})
				.then(res => {
					this.goodsList = res.result.data || [];
					this.goodsList = this.goodsList.slice(0, 42);
					let list = Object.assign([], this.goodsList);

					// 秒杀商品：显示低于12元商品
					this.goodsListActi = this.goodsList.filter(item => {
						return item.price < 12;
					});
					// 分类精选
					this.goodsListClassify = this.goodsList.filter(item => {
						return item.type == 4;
					});
				});
		},
		//轮播图切换修改背景色与第n张
		swiperChange(e) {
			const index = e.detail.current;
			this.swiperCurrent = index;
			this.titleNViewBackground = this.carouselList[index].background;
		},
		// 跳转商品列表 type:类型1,2,3,4
		navToProductList(type) {
			uni.navigateTo({
				url: `/pages/product/list?type=${type}`
			});
		},
		// 跳转商品详情，对应商品分类内容
		navToDetailPage(item) {
			uni.navigateTo({
				url: `/pages/product/product?goodId=${item.goodId}`
			});
		},
		//查看更多
		viewMore() {
			uni.navigateTo({});
		}
	},

	// 监听输入框的内容变化（微信小程序端无效）
	onNavigationBarSearchInputChanged: async function(e) {
		if (e.text.length == 0) {
			this.unSearching = true;
			this.init();
			return;
		}
		this.unSearching = false;
		uniCloud
			.callFunction({
				name: 'selectGoodListByTitle',
				data: { title: e.text }
			})
			.then(res => {
				this.goodsList = (res.result && res.result.data) || [];
			});
	}
};
</script>

<style lang="scss">
/* #ifdef MP */
.mp_search_box {
	position: absolute;
	left: 0;
	top: 30upx;
	z-index: 9999;
	width: 100%;
	padding: 0 80upx;
	.ser-input {
		flex: 1;
		height: 56upx;
		line-height: 56upx;
		text-align: center;
		font-size: 28upx;
		color: $font-color-base;
		border-radius: 20px;
		background: rgba(255, 255, 255, 0.6);
	}
}
page {
	.cate-section {
		position: relative;
		z-index: 5;
		border-radius: 16upx 16upx 0 0;
		margin-top: -20upx;
	}
	.carousel-section {
		padding: 0;
		.titleNview-placing {
			padding-top: 0;
			height: 0;
		}
		.carousel {
			.carousel-item {
				padding: 0;
			}
		}
		.swiper-dots {
			left: 45upx;
			bottom: 40upx;
		}
	}
}
/* #endif */

page {
	background: #f5f5f5;
}
.m-t {
	margin-top: 16upx;
}
/* 头部 轮播图 */
.carousel-section {
	position: relative;
	padding-top: 10px;

	.titleNview-placing {
		height: var(--status-bar-height);
		padding-top: 44px;
		box-sizing: content-box;
	}

	.titleNview-background {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 460upx;
		transition: 0.4s;
	}
}
.carousel {
	width: 100%;
	height: 350upx;

	.carousel-item {
		width: 100%;
		height: 100%;
		padding: 0 28upx;
		overflow: hidden;
	}

	image {
		width: 100%;
		height: 100%;
		border-radius: 10upx;
	}
}
.swiper-dots {
	display: flex;
	position: absolute;
	left: 60upx;
	bottom: 15upx;
	width: 72upx;
	height: 36upx;
	background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAABkCAYAAADDhn8LAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTMyIDc5LjE1OTI4NCwgMjAxNi8wNC8xOS0xMzoxMzo0MCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTk4MzlBNjE0NjU1MTFFOUExNjRFQ0I3RTQ0NEExQjMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTk4MzlBNjA0NjU1MTFFOUExNjRFQ0I3RTQ0NEExQjMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6Q0E3RUNERkE0NjExMTFFOTg5NzI4MTM2Rjg0OUQwOEUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6Q0E3RUNERkI0NjExMTFFOTg5NzI4MTM2Rjg0OUQwOEUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4Gh5BPAAACTUlEQVR42uzcQW7jQAwFUdN306l1uWwNww5kqdsmm6/2MwtVCp8CosQtP9vg/2+/gY+DRAMBgqnjIp2PaCxCLLldpPARRIiFj1yBbMV+cHZh9PURRLQNhY8kgWyL/WDtwujjI8hoE8rKLqb5CDJaRMJHokC6yKgSCR9JAukmokIknCQJpLOIrJFwMsBJELFcKHwM9BFkLBMKFxNcBCHlQ+FhoocgpVwwnv0Xn30QBJGMC0QcaBVJiAMiec/dcwKuL4j1QMsVCXFAJE4s4NQA3K/8Y6DzO4g40P7UcmIBJxbEesCKWBDg8wWxHrAiFgT4fEGsB/CwIhYE+AeBAAdPLOcV8HRmWRDAiQVcO7GcV8CLM8uCAE4sQCDAlHcQ7x+ABQEEAggEEAggEEAggEAAgQACASAQQCCAQACBAAIBBAIIBBAIIBBAIABe4e9iAe/xd7EAJxYgEGDeO4j3EODp/cOCAE4sYMyJ5cwCHs4rCwI4sYBxJ5YzC84rCwKcXxArAuthQYDzC2JF0H49LAhwYUGsCFqvx5EF2T07dMaJBetx4cRyaqFtHJ8EIhK0i8OJBQxcECuCVutxJhCRoE0cZwMRyRcFefa/ffZBVPogePihhyCnbBhcfMFFEFM+DD4m+ghSlgmDkwlOgpAl4+BkkJMgZdk4+EgaSCcpVX7bmY9kgXQQU+1TgE0c+QJZUUz1b2T4SBbIKmJW+3iMj2SBVBWz+leVfCQLpIqYbp8b85EskIxyfIOfK5Sf+wiCRJEsllQ+oqEkQfBxmD8BBgA5hVjXyrBNUQAAAABJRU5ErkJggg==);
	background-size: 100% 100%;

	.num {
		width: 36upx;
		height: 36upx;
		border-radius: 50px;
		font-size: 24upx;
		color: #fff;
		text-align: center;
		line-height: 36upx;
	}

	.sign {
		position: absolute;
		top: 0;
		left: 50%;
		line-height: 36upx;
		font-size: 12upx;
		color: #fff;
		transform: translateX(-50%);
	}
}
/* 分类 */
.cate-section {
	display: flex;
	justify-content: space-around;
	align-items: center;
	flex-wrap: wrap;
	padding: 30upx 22upx;
	background: #fff;
	.cate-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size: $font-sm + 2upx;
		color: $font-color-dark;
	}
	/* 原图标颜色太深,不想改图了,所以加了透明度 */
	image {
		width: 88upx;
		height: 88upx;
		margin-bottom: 14upx;
		border-radius: 50%;
		opacity: 0.7;
		box-shadow: 4upx 4upx 20upx rgba(250, 67, 106, 0.3);
	}
}
.ad-1 {
	width: 100%;
	height: 280upx;
	image {
		width: 100%;
		height: 100%;
	}
}
/* 秒杀专区 */
.seckill-section {
	padding: 4upx 30upx 24upx;
	background: #fff;
	.s-header {
		display: flex;
		align-items: center;
		height: 92upx;
		line-height: 1;
		.s-img {
			width: 140upx;
			height: 30upx;
		}
		.tip {
			font-size: $font-base;
			color: $font-color-light;
			margin-right: 5upx;
		}
		.timer {
			display: inline-block;
			width: 40upx;
			height: 36upx;
			text-align: center;
			line-height: 36upx;
			margin-right: 14upx;
			font-size: $font-sm + 2upx;
			color: #fff;
			border-radius: 2px;
			background: rgba(0, 0, 0, 0.8);
		}
		.icon-you {
			font-size: $font-lg;
			color: $font-color-light;
			flex: 1;
			text-align: right;
		}
	}
	.floor-list {
		white-space: nowrap;
	}
	.scoll-wrapper {
		display: flex;
		align-items: flex-start;
	}
	.floor-item {
		width: 150upx;
		margin-right: 20upx;
		font-size: $font-sm + 2upx;
		color: $font-color-dark;
		line-height: 1.8;
		image {
			width: 150upx;
			height: 150upx;
			border-radius: 6upx;
		}
		.price {
			color: $uni-color-primary;
		}
	}
}

.f-header {
	display: flex;
	align-items: center;
	height: 140upx;
	padding: 6upx 30upx 8upx;
	background: #fff;
	image {
		flex-shrink: 0;
		width: 140upx;
		height: 140upx;
		margin-right: 20upx;
	}
	.tit-box {
		flex: 1;
		display: flex;
		flex-direction: column;
	}
	.tit {
		font-size: $font-lg + 2upx;
		color: #font-color-dark;
		line-height: 1.3;
	}
	.tit2 {
		font-size: $font-sm;
		color: $font-color-light;
	}
	.icon-you {
		font-size: $font-lg + 2upx;
		color: $font-color-light;
	}
}
/* 团购楼层 */
.group-section {
	background: #fff;
	.g-swiper {
		height: 650upx;
		padding-bottom: 30upx;
	}
	.g-swiper-item {
		width: 100%;
		padding: 0 30upx;
		display: flex;
	}
	image {
		width: 100%;
		height: 460upx;
		border-radius: 4px;
	}
	.g-item {
		display: flex;
		flex-direction: column;
		overflow: hidden;
		// border: solid #C0C4CC 1upx;
		// box-sizing: border-box;
	}
	.left {
		flex: 1;
		margin-right: 24upx;
		.t-box {
			padding-top: 20upx;
		}
	}
	.right {
		flex: 1;
		flex-direction: column-reverse;
		.t-box {
			padding-bottom: 20upx;
		}
	}
	.t-box {
		height: 160upx;
		font-size: $font-base + 2upx;
		color: $font-color-dark;
		line-height: 1.6;
	}
	.price {
		color: $uni-color-primary;
	}
	.m-price {
		font-size: $font-sm + 2upx;
		text-decoration: line-through;
		color: $font-color-light;
		margin-left: 8upx;
	}
	.pro-box {
		display: flex;
		align-items: center;
		margin-top: 10upx;
		font-size: $font-sm;
		color: $font-base;
		padding-right: 10upx;
	}
	.progress-box {
		flex: 1;
		border-radius: 10px;
		overflow: hidden;
		margin-right: 8upx;
	}
}
/* 分类推荐楼层 */
.hot-floor {
	width: 100%;
	overflow: hidden;
	margin-bottom: 20upx;
	.floor-img-box {
		width: 100%;
		height: 320upx;
		position: relative;
		&:after {
			content: '';
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			background: linear-gradient(rgba(255, 255, 255, 0.06) 30%, #f8f8f8);
		}
	}
	.floor-img {
		width: 100%;
		height: 100%;
	}
	.floor-list {
		white-space: nowrap;
		padding: 20upx;
		padding-right: 50upx;
		border-radius: 6upx;
		margin-top: -140upx;
		margin-left: 30upx;
		background: #fff;
		box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
		position: relative;
		z-index: 1;
	}
	.scoll-wrapper {
		display: flex;
		align-items: flex-start;
	}
	.floor-item {
		width: 180upx;
		margin-right: 20upx;
		font-size: $font-sm + 2upx;
		color: $font-color-dark;
		line-height: 1.8;
		image {
			width: 180upx;
			height: 180upx;
			border-radius: 6upx;
		}
		.price {
			color: $uni-color-primary;
		}
	}
	.more {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		flex-shrink: 0;
		width: 180upx;
		height: 180upx;
		border-radius: 6upx;
		background: #f3f3f3;
		font-size: $font-base;
		color: $font-color-light;
		text:first-child {
			margin-bottom: 4upx;
		}
	}
}
/* 猜你喜欢 */
.guess-section {
	display: flex;
	flex-wrap: wrap;
	padding: 0 30upx;
	background: #fafafa;
	.guess-item {
		display: flex;
		flex-direction: column;
		width: 48%;
		background: #fff;
		margin-bottom: 20upx;
		border-radius: 20upx;
		padding-bottom: 40upx;
		&:nth-child(2n + 1) {
			margin-right: 4%;
		}
	}
	.image-wrapper {
		width: 100%;
		height: 330upx;
		border-radius: 3px;
		overflow: hidden;
		image {
			width: 100%;
			height: 100%;
			opacity: 1;
		}
	}
	.title {
		font-size: $font-lg;
		color: $font-color-dark;
		line-height: 80upx;
	}
	.price {
		font-size: $font-lg;
		color: $uni-color-primary;
		line-height: 1;
	}
	.sale {
		font-size: $font-sm;
		color: $font-color-light;
		padding-left: 10upx;
	}
}
</style>
