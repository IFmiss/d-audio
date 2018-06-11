import './d-audio.scss'
import { dom } from './utils.js'
export default class Dmusic {
  constructor (options) {
    let defaultOptions = {
      // 音乐append的元素
      ele: '#d-audio',
      // 音乐封面
      imageurl: 'http://www.daiwei.org/sunmmer.jpg',
      // 音乐地址
      src: '',
      // 音乐名字
      name: '',
      // 音乐歌手
      singer: '',
      // 是否显示进度信息
      showprogress: true,
      // '' 就是默认状态， cricle则是初始化就是圆形且可以旋转
      initstate: '',
      // 是否循环
      loop: false,
      // 音乐播放结束事件，可设置播放下一首音乐
      ended: () => {},
      // 音乐下一曲的点击事件触发，需要配合checkAudio体现切歌的效果
      next: () => {}
    }
    if (document.getElementById('d-audio-content')) {
      console.error('you have already init d-auido, do not init again');
      return
    }

    this.opt = Object.assign(defaultOptions, options)
    // 判断传进来的是DOM还是字符串
    if (typeof this.opt.ele === 'string') {
      this.opt.ele = document.querySelector(this.opt.ele)
    }

    // 初始化一些内部设置
    this.loading = false
    this.isplaying = false
    this.progress = 0
    this.height = this.opt.ele.offsetHeight || 50
    this.duration = 0
    this.currentTime = 0
    this.defaultimg = 'http://www.daiwei.org/sunmmer.jpg'

    // 需要的元素
    this.dom = {
      cricleImage: null,
      playPause: null,
      next: null,
      audioTitle: null,
      audioSinger: null,
    }

    // 初始化audio   // 拿到各个元素
    this.initAudio()
    this.initEvent()
  }

  // 初始化元素
  initAudio() {
    let d = this.dom
    // audio-content
    d.audioContent = document.createElement('div')
    if (this.opt.initstate === 'cricle') {
      d.audioContent.className = 'audio-content ' + this.opt.initstate
    } else {
      d.audioContent.className = 'audio-content'
    }
    d.audioContent.setAttribute('id', 'd-audio-content')
    this.opt.ele.appendChild(d.audioContent)

    // audio-cricle
    d.audioCricle = document.createElement('div')
    d.audioCricle.className = 'audio-cricle'
    d.audioCricle.title = this.opt.name + ' - ' + this.opt.singer
    d.audioCricle.innerHTML = `<img id="d-audio-cricleImage" src=${this.opt.imageurl || this.defaultimg}>`
    d.audioCricle.style.cssText = `width: ${this.height}px; height: ${this.height}px;`
    d.audioContent.appendChild(d.audioCricle)


    // audio-detail
    d.audioDetail = document.createElement('div')
    d.audioDetail.className = 'audio-detail'
    d.audioDetail.innerHTML = `<div class="left-config">
                                      <i id="d-audio-playPause" class="pause icon-pause"></i>
                                      <i id="d-audio-next" class="next icon-next"></i>
                                    </div>
                                    <div class="right-info">
                                      <h3 id="d-audio-audioTitle" class="m-title">${this.opt.name}</h3>
                                      <p id="d-audio-audioSinger" class="m-singer">${this.opt.singer}</p>
                                    </div>`
    d.audioContent.appendChild(d.audioDetail)

    // audio-bg
    d.audioBg = document.createElement('div')
    d.audioBg.className = 'audio-bg'
    d.audioBg.style.cssText = `background: url("${this.opt.imageurl || this.defaultimg}");background-size: cover;background-position: center;`
    d.audioContent.appendChild(d.audioBg)

    // audio-loading
    d.audioLoading = document.createElement('div')
    d.audioLoading.className = 'audio-loading'
    d.audioLoading.innerHTML = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"  width="200px" height="200px"  viewBox="0 0 200 200"
                                    xml:space="preserve">
                                    <!--#4886CD为深色值   #9DBFE4为中间值 可以随意修改-->  
                                    <style type="text/css">
                                    .left{fill:url(#left);}
                                    .right{fill:url(#right);}
                                    .top{fill:rgba(72, 134, 205, 0.781);}
                                    @keyframes load{
                                    0%{transform:rotate(0)}
                                    100%{transform:rotate(-360deg)}
                                    }
                                    #load{animation:load 1s  linear infinite; transform-origin:center center; } 
                                    </style>
                                    <g id="load">
                                    <linearGradient id="right" gradientUnits="userSpaceOnUse" x1="150" y1="20" x2="150" y2="180">
                                    <stop  offset="0" style="stop-color:rgba(72, 134, 205, 0.849)"/>
                                    <stop  offset="1" style="stop-color:rgba(157, 191, 228, 0.788)"/><!--蓝到浅蓝渐变-->
                                    </linearGradient>
                                    <path class="right" d="M100,0v20c44.1,0,80,35.9,80,80c0,44.1-35.9,80-80,80v20c55.2,0,100-44.8,100-100S155.2,0,100,0z"/><!--右半圆环-->
                                    <linearGradient id="left" gradientUnits="userSpaceOnUse" x1="50" y1="0" x2="50" y2="180">
                                    <stop  offset="0" style="stop-color:rgba(255, 255, 255, 0.808)"/>
                                    <stop  offset="1" style="stop-color:rgba(157, 191, 228, 0.767)"/><!--浅蓝到白色渐变-->
                                    </linearGradient>
                                    <path class="left" d="M20,100c0-44.1,35.9-80,80-80V0C44.8,0,0,44.8,0,100s44.8,100,100,100v-20C55.9,180,20,144.1,20,100z"/><!--左半圆环-->
                                    <circle class="top" cx="100" cy="10" r="10"/>
                                    </g>
                                  </svg>`
    d.audioContent.appendChild(d.audioLoading)

    // audio-progress
    if (this.opt.showprogress) {
      d.audioProgress = document.createElement('div')
      d.audioProgress.className = 'audio-progress'
      d.audioContent.appendChild(d.audioProgress)
    }

    d.audioEle = document.createElement('audio')
    d.audioEle.src = this.opt.src
    if (this.opt.loop) {
      d.audioEle.loop = true
    }
    d.audioContent.appendChild(d.audioEle)

    this.initDomInfo()
  }

  // 将初始化需呀使用的元素放到this.dom中方便使用
  initDomInfo () {
    this.dom.cricleImage = document.getElementById('d-audio-cricleImage')
    this.dom.playPause = document.getElementById('d-audio-playPause')
    this.dom.next = document.getElementById('d-audio-next')
    this.dom.audioTitle = document.getElementById('d-audio-audioTitle')
    this.dom.audioSinger = document.getElementById('d-audio-audioSinger')
  }

  // 初始化事件
  initEvent () {
    let d = this.dom
    let _this = this
    // 状态切换
    d.audioCricle.onclick = () => {
      dom.removeClass(d.audioContent, 'cricle')
    }
    d.audioDetail.onclick = () => {
      dom.addClass(d.audioContent, 'cricle')
    }

    // 点击播放暂停
    d.playPause.onclick = (e) => {
      e.stopPropagation()
      _this.playPause()
    }

    // 点击播放下一首
    d.next.onclick = (e) => {
      e.stopPropagation()
      _this.opt.next()
    }

    // audio的相关事件
    // onplaying
    d.audioEle.onplaying = (e) => {
      _this.isplaying = true
      // cricle + 旋转
      dom.addClass(d.audioCricle, 'active')
      // 图标变化
      dom.removeClass(d.playPause, 'icon-pause')
      dom.addClass(d.playPause, 'icon-play')
      this.hideLoading()
    }

    // onpause
    d.audioEle.onpause = (e) => {
      _this.isplaying = false
      // cricle + 旋转
      dom.removeClass(d.audioCricle, 'active')
      // 图标变化
      dom.removeClass(d.playPause, 'icon-play')
      dom.addClass(d.playPause, 'icon-pause')
    }

    // 音乐播放结束时间
    d.audioEle.onended = () => {
      dom.removeClass(d.playPause, 'icon-pause')
      dom.addClass(d.playPause, 'icon-play')
      _this.opt.next()
    }

    // 可以播放的时候触发
    d.audioEle.oncanplay = () => {
      _this.loading = false
      _this.duration = d.audioEle.duration
    }

    // 进度信息
    if (this.opt.showprogress) {
      d.audioEle.ontimeupdate = (e) => {
        _this.updateProgress(e.target.currentTime)
      }
    }

    // 加载事件
    d.audioEle.onwaiting = () => {
      _this.showLoading()
    },

    d.audioEle.onerror = (e) => {
      console.error(e)
      _this.opt.next()
    }
  }

  /**
   * 切歌
   * src  地址
   * imageurl  封面
   * name  歌曲名称
   * singer  歌手
   */
  checkAudio (src, imageurl = this.defaultimg, name, singer) {
    let d = this.dom

    d.audioEle.src = src
    d.cricleImage.src = imageurl
    d.audioBg.style.cssText = `background: url("${imageurl}");background-size: cover;background-position: center;`
    d.audioTitle.innerText = name
    d.audioSinger.innerText = singer
    d.audioCricle.title = name + ' - ' + singer
    this.play()
  }

  // 播放暂停
  playPause () {
    let d = this.dom
    if (d.audioEle.paused) {
      this.play()
    } else {
      this.pause()
    }
  }

  // 播放
  play () {
    this.dom.audioEle.play()
  }

  // 暂停
  pause () {
    this.dom.audioEle.pause()
  }

  // 进度条变化
  updateProgress (currentTime) {
    let d = this.dom
    this.currentTime = currentTime
    this.progress = this.currentTime / this.duration
    d.audioProgress.style.width = this.progress * 100 + '%'
  }

  // 显示loading
  showLoading () {
    this.loading = true
    dom.addClass(this.dom.audioLoading, 'active')
  }

  // 隐藏loading
  hideLoading () {
    this.loading = false
    dom.removeClass(this.dom.audioLoading, 'active')
  }
}
