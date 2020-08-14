<template>
	<view>
		<divider></divider>
		<view class="bg-white">
			<uni-list-item title="头像" :showArrow="false" showRightSlot @click="uploadUserIcon">
				<block slot="right">
					<image
						class="portrait"
						:src="userInfo.userIcon || '../../static/missing-face.png'"
						style="width: 90upx;height: 90upx;"
					></image>
				</block>
			</uni-list-item>
			<uni-list-item title="姓名" showRightSlot @click="openPopup(`updateName`)">
				<block slot="right">{{ userInfo.name || '游客' }}</block>
			</uni-list-item>
			<uni-list-item title="性别" @click="openPopup(`updateSex`)">
				<block slot="right">{{ userInfo.sex || '-' }}</block>
			</uni-list-item>
		</view>
		<divider></divider>
		<view class="bg-white"><uni-list-item title="修改密码" @click="toChangePwd()"></uni-list-item></view>

		<!-- 修改姓名弹窗 -->
		<uni-popup ref="updateName" type="center">
			<view class="uni-tip">
				<text class="uni-tip-title">修改姓名</text>
				<view class="uni-form-item uni-column">
					<view class="uni-input-wrapper"><input class="uni-input" focus :value="nameValue || ``" @input="onKeyInput" placeholder="修改姓名" /></view>
				</view>
				<view class="uni-tip-group-button">
					<text class="uni-tip-button" @click="closePopup('updateName')">取消</text>
					<text class="uni-tip-button" @click="updateNameInfo">确定</text>
				</view>
			</view>
		</uni-popup>

		<!-- 修改性别弹窗 -->
		<uni-popup ref="updateSex" type="center">
			<view class="uni-tip">
				<text class="uni-tip-title">修改性别</text>
				<view class="uni-common-mt">
					<view class="uni-form-item uni-column">
						<radio-group class="uni-list" @change="changeSex">
							<view class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in sexItems" :key="index">
								<view><radio :id="item" :value="item" :checked="item === sexValue" style="transform:scale(0.7)"></radio></view>
								<label class="label-2-text" :for="item">
									<text class="uni-tip-content">{{ item }}</text>
								</label>
							</view>
						</radio-group>
					</view>
				</view>
				<view class="uni-tip-group-button">
					<text class="uni-tip-button" @click="closePopup('updateSex')">取消</text>
					<text class="uni-tip-button" @click="updateSexInfo">确定</text>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
import { mapMutations } from 'vuex';
import divider from '@/components/divider';
import uniListItem from '@/components/uni-list-item/uni-list-item.vue';
import uniPopup from '@/components/uni-popup/uni-popup.vue';
export default {
	components: {
		uniListItem,
		divider,
		uniPopup
	},
	data() {
		return {
			// 性别选项
			sexItems: ['男', '女'],
			// 性别是否更改
			sexSave: false,
			// 当前性别值
			sexValue: '-',
			// 当前姓名值
			nameValue: '',
			userInfo: {}
		};
	},
	onShow() {
		this.userInfo = this.$store.state.userInfo;
		this.sexValue = this.userInfo.sex;
	},
	methods: {
		...mapMutations(['updateUserInfo']),
		//打开弹窗
		openPopup(name) {
			if (name === 'updateSex') {
				this.sexSave = false;
				this.sexValue = this.userInfo.sex;
			}
			if (name === 'updateName') {
				this.nameValue = this.userInfo.name;
			}
			this.$refs[name].open();
		},
		// 取消按钮的关闭弹窗
		closePopup(name) {
			if (name === 'updateName') {
				this.nameValue = this.userInfo.name;
			}
			this.$refs[name].close();
		},
		// 修改性别值
		changeSex(e) {
			this.sexSave = true;
			this.sexValue = e.detail.value;
		},
		// 修改姓名值
		onKeyInput: function(event) {
			this.nameValue = event.detail.value;
		},
		// 提交修改性别信息
		updateSexInfo() {
			if (this.sexSave) {
				let sex = this.sexValue;
				uniCloud
					.callFunction({
						name: 'updateUser',
						data: {
							id: this.userInfo._id,
							updateData: {
								sex: sex
							}
						}
					})
					.then(res => {
						if (res.result.flag) {
							this.$set(this.userInfo, 'sex', this.sexValue);
							this.updateUserInfo(this.userInfo);
							this.$api.msg('设置成功');
						} else {
							this.$api.msg(res.result.msg);
						}
					});
			}
			this.$refs.updateSex.close();
		},
		// 提交修改姓名信息
		updateNameInfo() {
			let name = this.nameValue;
			uniCloud
				.callFunction({
					name: 'updateUser',
					data: {
						id: this.userInfo._id,
						updateData: {
							name: name
						}
					}
				})
				.then(res => {
					if (res.result.flag) {
						this.$set(this.userInfo, 'name', this.nameValue);
						this.updateUserInfo(this.userInfo);
						this.$api.msg('设置成功');
					} else {
						this.$api.msg(res.result.msg);
					}
				});
			this.$refs.updateName.close();
		},
		//修改密码
		toChangePwd() {
			uni.navigateTo({
				url: './changePwd?account=' + this.userInfo.account
			});
		},
		//修改头像
		uploadUserIcon() {
			const that = this;
			uni.chooseImage({
				count: 1,
				success(res) {
					if (res.tempFilePaths.length > 0) {
						let filePath = res.tempFilePaths[0];

						//进行上传操作
						uniCloud.uploadFile({
							filePath: filePath,
							success(result) {
								if (!result.success) {
									this.$api.msg('上传失败，请稍后重试');
									return;
								}

								//图片路径
								let imgUrl = result.fileID;

								console.log('111');
								that.updateUserIcon(imgUrl);
							}
						});
					}
				}
			});
		},
		updateUserIcon(imgUrl) {
			console.log('updateUserIcon');
			// 更新数据库
			uniCloud
				.callFunction({
					name: 'updateUser',
					data: {
						id: this.userInfo._id,
						updateData: {
							userIcon: imgUrl
						}
					}
				})
				.then(res => {
					console.log('========');
					console.log(res);
					if (res.result.flag) {
						this.$set(this.userInfo, 'userIcon', imgUrl);
						this.updateUserInfo(this.userInfo);
						this.$api.msg('设置成功');
					} else {
						this.$api.msg(res.result.msg);
					}
				});
		}
	}
};
</script>

<style lang="scss">
page {
	background: #eeeeee;
}
.bg-white {
	background-color: #fff !important;
}
/* 提示窗口 */
.uni-tip {
	/* #ifndef APP-NVUE */
	display: flex;
	flex-direction: column;
	/* #endif */
	padding: 15px;
	width: 300px;
	background-color: #fff;
	border-radius: 10px;
}

.uni-tip-title {
	margin-bottom: 10px;
	text-align: center;
	font-weight: bold;
	font-size: 16px;
	color: #333;
}

.uni-tip-content {
	font-size: 14px;
	color: #666;
}

.uni-tip-group-button {
	/* #ifndef APP-NVUE */
	display: flex;
	/* #endif */
	flex-direction: row;
	margin-top: 20px;
}

.uni-tip-button {
	flex: 1;
	text-align: center;
	font-size: 14px;
	color: #3b4144;
}

.uni-list-cell {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: flex-start;
	padding: 8px 16px;
}

.uni-list {
	display: flex;
	flex-direction: column;
	padding: 0;
}

.label-2-text {
	flex: 1;
}
.portrait {
	width: 130upx;
	height: 130upx;
	border: 5upx solid #fff;
	border-radius: 50%;
}
</style>
