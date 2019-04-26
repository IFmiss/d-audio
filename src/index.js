import './style.less'
import 'static/font-icon/style.css'

import dAudio from './lib/d-audio.js'

import axios from 'axios'
axios.get('http://www.daiwei.org/vue/server/music.php?inAjax=1&do=playlist&id=2179377798').then((res) => {
	let music = res.data.playlist.tracks
  let index = Math.floor(Math.random() * music.length)
	axios.get('http://www.daiwei.org/vue/server/music.php?inAjax=1&do=musicInfo&id=' + music[index].id).then((res) => {
		const d = new dAudio ({
			ele: '#d-audio',
			src: res.data.data[0].url,
			imageurl: music[index].al.picUrl + '?param=300y300',
			name: music[index].name,
      singer: music[index].ar[0].name,
      height: '45px',
			initstate: 'cricle', 
			next: function () {
				index = Math.floor(Math.random() * music.length)
				axios.get('http://www.daiwei.org/vue/server/music.php?inAjax=1&do=musicInfo&id=' + music[index].id).then((res) => {
					console.log(music[index].ar[0].name)
					const info = {
						src: res.data.data[0].url,
						imageurl: music[index].al.picUrl + '?param=300y300',
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