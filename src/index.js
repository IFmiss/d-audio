import './style.less'
import 'static/font-icon/style.css'

import dAudio from './lib/d-audio.js'
import LogUtils from 'd-utils/lib/logUtils/index'
import axios from 'axios'
const getUrlById = (id) => {
  return `https://music.163.com/song/media/outer/url?id=${id}.mp3`
}
LogUtils.logInfo('d-utils');
axios.get('https://daiwei.site/netease/playlist/detail?id=2179377798').then((res) => {
	let music = res.data.playlist.tracks
  let index = Math.floor(Math.random() * music.length)
	axios.get('https://daiwei.site/netease/song/detail?ids=' + music[index].id).then((res) => {
		console.log(res)
		const d = new dAudio ({
			ele: '#d-audio',
			src: getUrlById(res.data.songs[0].id),
			imageurl: music[index].al.picUrl + '?param=300y300',
			name: music[index].name,
      singer: music[index].ar[0].name,
      height: '45px',
			initstate: 'cricle', 
			next: function () {
				index = Math.floor(Math.random() * music.length)
				axios.get('https://daiwei.site/netease/song/detail?ids=' + music[index].id).then((res) => {
					console.log(music[index].ar[0].name)
					const info = {
						src: getUrlById(res.data.songs[0].id),
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