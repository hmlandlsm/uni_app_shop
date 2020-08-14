// 分类列表
const cateList = [
	{
		id: 1,
		name: '蔬菜'
	},
	{
		id: 2,
		name: '水果'
	},
	{
		id: 3,
		name: '主食'
	},
	{
		id: 4,
		name: '汤料'
	},
	{
		id: 5,
		name: '生鲜肉类'
	},
	{
		id: 11,
		pid: 1,
		name: '果蔬'
	},
	{
		id: 12,
		pid: 1,
		name: '青菜',
	},
	{
		id: 13,
		pid: 1,
		name: '胡萝卜',
	},
	{
		id: 14,
		pid: 2,
		name: '热带水果'
	},
	{
		id: 15,
		pid: 2,
		name: '畅销水果'
	},
	{
		id: 16,
		pid: 3,
		name: '家常填肚子',
	},
	{
		id: 17,
		pid: 4,
		name: '营养主食',
	},
	{
		id: 18,
		pid: 4,
		name: '滋补汤底',
	},
	{
		id: 19,
		pid: 5,
		name: '新鲜肉肉',
	},
	{
		id: 8,
		pid: 11,
		name: '西红柿',
		picture: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-maxmall/d4561070-8394-11ea-8bd0-2998ac5bbf7e.jpg',
		goodId: 1
	},
	{
		id: 9,
		pid: 12,
		name: '香菜',
		picture: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-maxmall/d44d36d0-8394-11ea-b997-9918a5dda011.jpg',
		goodId: 2
	},
	{
		id: 10,
		pid: 12,
		name: '大白菜',
		picture: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-maxmall/d3da50c0-8394-11ea-b997-9918a5dda011.jpg',
		goodId: 3
	},
	{
		id: 11,
		pid: 12,
		name: '韭菜',
		picture: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-maxmall/d3f1f770-8394-11ea-8bd0-2998ac5bbf7e.jpg',
		goodId: 4
	},
	{
		id: 12,
		pid: 12,
		name: '青色的菜',
		picture: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-maxmall/d4116650-8394-11ea-8bd0-2998ac5bbf7e.jpg',
		goodId: 5
	},
	{
		id: 14,
		pid: 12,
		name: '芹菜',
		picture: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-maxmall/d419f1d0-8394-11ea-8bd0-2998ac5bbf7e.jpg',
		goodId: 6
	},
	{
		id: 15,
		pid: 13,
		name: '胡萝卜',
		picture: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-maxmall/d42b2fe0-8394-11ea-b244-a9f5e5565f30.jpg',
		goodId: 7
	},
	{
		id: 16,
		pid: 14,
		name: '榴莲',
		picture: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-maxmall/d445e3d0-8394-11ea-b43d-2358b31b6ce6.jpg',
		goodId: 8
	},
	{
		id: 19,
		pid: 14,
		name: '芒果',
		picture: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-maxmall/d4596bd0-8394-11ea-b43d-2358b31b6ce6.jpg',
		goodId: 9
	},
	{
		id: 20,
		pid: 14,
		name: '香蕉',
		picture: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-maxmall/d45f5f40-8394-11ea-b997-9918a5dda011.jpg',
		goodId: 10
	},
	{
		id: 21,
		pid: 14,
		name: '葡萄',
		picture: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-maxmall/d3e685c0-8394-11ea-b244-a9f5e5565f30.jpg',
		goodId: 11
	},
	{
		id: 22,
		pid: 15,
		name: '草莓',
		picture: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-maxmall/d3e6faf0-8394-11ea-8bd0-2998ac5bbf7e.jpg',
		goodId: 12
	},
	{
		id: 23,
		pid: 15,
		name: '龙眼',
		picture: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-maxmall/d3ee7500-8394-11ea-8bd0-2998ac5bbf7e.jpg',
		goodId: 13
	},
	{
		id: 24,
		pid: 15,
		name: '金枕头',
		picture: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-maxmall/d3ea2f40-8394-11ea-b997-9918a5dda011.jpg',
		goodId: 14
	},
	{
		id: 27,
		pid: 15,
		name: '橙子',
		picture: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-maxmall/d3f66440-8394-11ea-b43d-2358b31b6ce6.jpg',
		goodId: 15
	},
	{
		id: 28,
		pid: 15,
		name: '山竹',
		picture: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-maxmall/d413fe60-8394-11ea-8bd0-2998ac5bbf7e.jpg',
		goodId: 16
	},
	{
		id: 29,
		pid: 15,
		name: '小台芒',
		picture: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-maxmall/d425b1a0-8394-11ea-b43d-2358b31b6ce6.jpg',
		goodId: 17
	},
	{
		id: 30,
		pid: 16,
		name: '经典灌汤包',
		picture: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-maxmall/d42ae1c0-8394-11ea-b244-a9f5e5565f30.jpg',
		goodId: 18
	},
	{
		id: 31,
		pid: 16,
		name: '面粉',
		picture: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-maxmall/d4419e10-8394-11ea-b43d-2358b31b6ce6.jpg',
		goodId: 19
	},
	{
		id: 32,
		pid: 16,
		name: '袋装馒头',
		picture: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-maxmall/d457e530-8394-11ea-8bd0-2998ac5bbf7e.jpg',
		goodId: 20
	},
	{
		id: 36,
		pid: 17,
		name: '有机奶粉',
		picture: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-maxmall/d41d2620-8394-11ea-8bd0-2998ac5bbf7e.jpg',
		goodId: 21

	},
	{
		id: 37,
		pid: 16,
		name: '菜包',
		picture: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-maxmall/d42870c0-8394-11ea-b244-a9f5e5565f30.jpg',
		goodId: 22
	},
	{
		id: 39,
		pid: 18,
		name: '茶树菇',
		picture: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-maxmall/d45b8eb0-8394-11ea-b43d-2358b31b6ce6.jpg',
		goodId: 23
	},
	{
		id: 42,
		pid: 17,
		name: '八宝粥',
		picture: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-maxmall/d4205a70-8394-11ea-b997-9918a5dda011.jpg',
		goodId: 24
	},
	{
		id: 43,
		pid: 18,
		name: '乱七八糟',
		picture: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-maxmall/d414c1b0-8394-11ea-b997-9918a5dda011.jpg',
		goodId: 25
	},
	{
		id: 44,
		pid: 18,
		name: '红枣枸杞',
		picture: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-maxmall/d4295b20-8394-11ea-b997-9918a5dda011.jpg',
		goodId: 26
	},
	{
		id: 45,
		pid: 18,
		name: '鱼汤汤底',
		picture: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-maxmall/d42b7e00-8394-11ea-8bd0-2998ac5bbf7e.jpg',
		goodId: 27
	},
	{
		id: 46,
		pid: 19,
		name: '精细猪肉',
		picture: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-maxmall/d44b8920-8394-11ea-8bd0-2998ac5bbf7e.jpg',
		goodId: 28
	},
	{
		id: 47,
		pid: 19,
		name: '排骨',
		picture: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-maxmall/d44a2990-8394-11ea-b244-a9f5e5565f30.jpg',
		goodId: 29
	},
	{
		id: 48,
		pid: 19,
		name: '进口猪肉',
		picture: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-maxmall/d4602290-8394-11ea-b244-a9f5e5565f30.jpg',
		goodId: 30
	},
	{
		id: 49,
		pid: 19,
		name: '瘦肉',
		picture: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-maxmall/d4220820-8394-11ea-b244-a9f5e5565f30.jpg',
		goodId: 30
	},
	{
		id: 50,
		pid: 19,
		name: '筒骨',
		picture: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-maxmall/d428e5f0-8394-11ea-b43d-2358b31b6ce6.jpg',
		goodId: 30
	},
	{
		id: 51,
		pid: 19,
		name: '特价包装肉',
		picture: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-maxmall/d43d5850-8394-11ea-8bd0-2998ac5bbf7e.jpg',
		goodId: 30
	}
]
const shareList = [
	{
		type: 1,
		icon: '/static/temp/share_wechat.png',
		text: '微信好友'
	},
	{
		type: 2,
		icon: '/static/temp/share_moment.png',
		text: '朋友圈'
	},
	{
		type: 3,
		icon: '/static/temp/share_qq.png',
		text: 'QQ好友'
	},
	{
		type: 4,
		icon: '/static/temp/share_qqzone.png',
		text: 'QQ空间'
	}
]
export default {
	cateList,
	shareList
}
