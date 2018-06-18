import './style.scss'
import 'static/font-icon/style.css'

import dAudio from './lib/d-audio.js'

import axios from 'axios'
axios.get('http://www.daiwei.org/vue/server/music.php?inAjax=1&do=playlist&id=2179377798').then((res) => {
	console.log(res.data)
	let music = res.data.playlist.tracks
	let index = 0
	axios.get('http://www.daiwei.org/vue/server/music.php?inAjax=1&do=musicInfo&id=' + music[0].id).then((res) => {
		const d = new dAudio ({
			ele: '#d-audio',
			src: res.data.data[0].url,
			imageurl: music[0].al.picUrl,
			name: music[0].name,
			singer: music[0].ar[0].name,
			next: function () {
				index++
				if (index > music.length - 1) index = 0
				axios.get('http://www.daiwei.org/vue/server/music.php?inAjax=1&do=musicInfo&id=' + music[index].id).then((res) => {
					console.log(music[index].ar[0].name)
					const info = {
						src: res.data.data[0].url,
						imageurl: music[index].al.picUrl,
						name: music[index].name,
						singer: music[index].ar[0].name
					}
					d.checkAudio(info.src, info.imageurl, info.name, info.singer)
				}, (err) => {
					console.log(err)
				})
			}
		})
	})
}, (err) => {
	console.log(err)
})

// const d = new dAudio ({
// 	next: function () {
// 		const info = {
// 			src: 'http://oiq8j9er1.bkt.clouddn.com/%E6%9E%97%E4%BF%8A%E6%9D%B0%20-%20%E4%B8%80%E7%9C%BC%E4%B8%87%E5%B9%B41.mp3',
// 			imageurl: 'http://oiq8j9er1.bkt.clouddn.com/music_%E6%88%91%E8%BF%98%E6%83%B3%E5%A5%B9.jpg',
// 			name: '一眼万年',
// 			singer: '林俊杰'	
// 		}
// 		d.checkAudio(info.src, info.imageurl, info.name, info.singer)
// 	}
// })
