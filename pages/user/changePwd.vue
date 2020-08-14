<template>
	<view class="container">
		<view class="left-bottom-sign"></view>
		<view class="right-top-sign"></view>
		<view class="input-content">
			<view class="input-item">
				<text class="tit">旧密码</text>
				<input 
					placeholder="请输入旧密码"
					maxlength="18"
					password
					data-key="repwd"
					@input="inputChange"
				/>
			</view>
			<view class="input-item">
				<text class="tit">新密码</text>
				<input 
					placeholder="8-18位不含特殊字符的数字、字母组合"
					maxlength="18"
					password
					data-key="newpwd"
					@input="inputChange"
				/>
			</view>
			<view class="input-item">
				<text class="tit">确认密码</text>
				<input 
					placeholder="8-18位不含特殊字符的数字、字母组合"
					placeholder-class="input-empty"
					maxlength="18"
					password 
					data-key="conformpwd"
					@input="inputChange"
				/>
			</view>
		</view>
		<button class="confirm-btn" @click="changePwd" :disabled="toChangePwd">确认</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				toChangePwd: false
			}
		},
		onLoad(option){
			this.account = option.account;
		},
		methods: {
			inputChange(e){
				const key = e.currentTarget.dataset.key;
				this[key] = e.detail.value;
			},
			changePwd(){
				this.toChangePwd = true;
				const {account,repwd, newpwd, conformpwd} = this;
				// 密码正则
				const pwdReg = /[a-z0-9]{6,16}/ ;
				
				// 数据验证
				if (!pwdReg.test(repwd)){
					this.$api.msg('旧密码错误！');
					return ;
				}
				if (!pwdReg.test(newpwd)){
					this.$api.msg('新密码由8-16位数字、字母组成！');
					return ;
				}
				if (newpwd !== conformpwd){
					this.$api.msg('确认密码需与新密码相同！');
					return ;
				}
				uni.showLoading({
					title:"请稍等"
				})
				// 调用云函数
				uniCloud.callFunction({
					name: 'changePwd',
					data: {
						account: account,
						password: repwd,
						newpassword: newpwd
					}
				}).then(res => {
					let data = res.result;
					uni.hideLoading()
					if (data.flag){
						this.$api.msg('修改成功！')
						uni.navigateBack();
					}else{
						this.$api.msg(data.msg)
					}
				})
			}
		}
	}
</script>

<style lang='scss'>
	page{
		background: #fff;
	}
	.container{
		padding-top: 115px;
		position:relative;
		width: 100vw;
		height: calc(100vh - 90rpx);
		overflow: hidden;
		background: #fff;
	}
	.wrapper{
		position:relative;
		z-index: 90;
		background: #fff;
		padding-bottom: 40upx;
	}
	.back-btn{
		position:absolute;
		left: 40upx;
		z-index: 9999;
		padding-top: var(--status-bar-height);
		top: 40upx;
		font-size: 40upx;
		color: $font-color-dark;
	}
	.left-top-sign{
		font-size: 120upx;
		color: $page-color-base;
		position:relative;
		left: -16upx;
	}
	.right-top-sign{
		position:absolute;
		top: 80upx;
		right: -30upx;
		z-index: 95;
		&:before, &:after{
			display:block;
			content:"";
			width: 400upx;
			height: 80upx;
			background: #b4f3e2;
		}
		&:before{
			transform: rotate(50deg);
			border-radius: 0 50px 0 0;
		}
		&:after{
			position: absolute;
			right: -198upx;
			top: 0;
			transform: rotate(-50deg);
			border-radius: 50px 0 0 0;
			/* background: pink; */
		}
	}
	.left-bottom-sign{
		position:absolute;
		left: -270upx;
		bottom: -320upx;
		border: 100upx solid #d0d1fd;
		border-radius: 50%;
		padding: 180upx;
	}
	.input-content{
		padding: 0 60upx;
	}
	.input-item{
		display:flex;
		flex-direction: column;
		align-items:flex-start;
		justify-content: center;
		padding: 0 30upx;
		background:$page-color-light;
		height: 120upx;
		border-radius: 4px;
		margin-bottom: 50upx;
		&:last-child{
			margin-bottom: 0;
		}
		.tit{
			height: 50upx;
			line-height: 56upx;
			font-size: $font-sm+2upx;
			color: $font-color-base;
		}
		input{
			height: 60upx;
			font-size: $font-base + 2upx;
			color: $font-color-dark;
			width: 100%;
		}	
	}
	.confirm-btn{
		width: 630upx;
		height: 76upx;
		line-height: 76upx;
		border-radius: 50px;
		margin-top: 70upx;
		background: $uni-color-primary;
		color: #fff;
		font-size: $font-lg;
		&:after{
			border-radius: 100px;
		}
	}
</style>
