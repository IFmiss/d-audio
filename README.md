# d-audio

插件演示地址: http://www.daiwei.org/components/d-audio <br>

简洁的音乐播放器插件

![](https://github.com/IFmiss/music/blob/master/es5/img/TlPtuyzEtc.gif)

## 新版本d-audio上线


### 食用方法
安装：
<pre>
  npm install d-audio
</pre>

引入

```js
import dAudio from 'd-audio'
const d = new dAudio ({
    ele: '#d-audio',
    src: '地址',
    imageurl: '地址',
    name: '音乐名字',
    singer: '歌手名字',
    next: function () {},
    ended: function () {}
})
```

### 参数

```js
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
```

### 实例化对象方法

```js
// 显示loading
d.showLoading()

// 隐藏loading
d.hideLoading()

// 播放
d.play()

// 暂停
d.pause()

// 播放暂停
d.playPause()

// 切歌曲 播放下一首  音频地址，封面地址，名字，歌手
d.checkAudio(src, imageurl, name, singer)
```