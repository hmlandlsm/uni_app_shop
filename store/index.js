import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		hasLogin: false,
		userInfo: {},
	},
	mutations: {
		login(state, provider) {
			console.log("login")
			// 如果不存在属性，返回
			if(provider._id == null || typeof provider._id == "undefined"){
				state.hasLogin = false;
				return;
			}
			
			state.userInfo = provider;
			//缓存用户信息
			uni.setStorage({
			    key: 'userInfo',  
			    data: provider  
			}) 
			state.hasLogin = true;
		},
		logout(state) {
			state.hasLogin = false;
			state.userInfo = {};
			uni.removeStorage({  
                key: 'userInfo'  
            })
		},
		setDefaultAddress(state, provider){
			state.userInfo.defaultAddress = provider;
			//覆盖用户信息
			uni.setStorage({
			    key: 'userInfo',  
			    data: state.userInfo  
			}) 
		},
		updateUserInfo(state, provider){
			state.userInfo = provider
			//覆盖用户信息
			uni.setStorage({
			    key: 'userInfo',  
			    data: state.userInfo  
			}) 
		}
	},
	actions: {
	
	}
})

export default store
