# music

[![](https://img.shields.io/badge/musicJs-demo-brightgreen.svg)](http://www.daiwei.org/components/music) ![](https://img.shields.io/badge/version-2.0-blue.svg) ![](https://img.shields.io/badge/IE-10%2B-orange.svg)<br>

插件演示地址: http://www.daiwei.org/components/music <br>
插件扩展演示地址: http://www.daiwei.org/music

简洁的音乐播放器插件

![](https://github.com/IFmiss/music/blob/master/es5/img/TlPtuyzEtc.gif)


基于插件的扩展页面
主题:纯背景色

![纯背景色](https://github.com/IFmiss/music/blob/master/es5/img/m1.jpg)

主题:犬夜叉

![犬夜叉](https://github.com/IFmiss/music/blob/master/es5/img/m2.jpg)

加入Webaudio的音频显示

![加入Webaudio的音频显示](https://github.com/IFmiss/music/blob/master/es5/img/m3.jpg)

以及线上音乐的播放(酷我音乐API)

![以及线上音乐的播放(酷我音乐API)](https://github.com/IFmiss/music/blob/master/es5/img/qFpVviMBrh.gif)

### 插件参数

* width：music宽度 <br>
* height：music高度 <br>
* hasBlur: 是否显示模糊效果<br>
* blur: 模糊效果的值<br>


* left:music left 的值<br>
* right:music right 的值<br>
* bottom: music bottom 的值<br>
* top: music top 的值<br>
* btnBackground:播放暂停按钮的背景色,不包括图标<br>
* iconColor:播放暂停按钮的图标颜色<br>
* hasSelect:是否可选择类型 (音乐的类型,在js中以静态数组的形式显示,可以的话从后台获取)<br>
* musicType:音乐类型   数组类型<br>
* hasAjax:是否是ajax请求数据,为false  则使用默认的source<br>
* source:音乐的数据信息  包括 name:名称,singer:歌手,url:音乐地址,img_url:封面地址<br>
* durationBg:canvas进度条的背景色<br>
* progressBg:canvas进度条当前状态的背景色<br>
方法
* beforeMusicPlay:function(){}   在音乐播放之前触发 (首次加载的时候)<br>
* afterMusicLoading:function(){}    在音乐加载成功 可播放之前<br>
* musicChanged:function(ret){}     音乐切换之后，播放结束 或者点击下一首触发   返回值:index:音乐索引,data:所有的music数据,url:音乐地址<br>
* getMusicInfo:function(ret){}    获取所有音乐的信息<br>

<pre>
  MC.music({
      hasAjax:false,
      musicChanged:function(ret){
      var data = ret.data;
      var index = ret.index;
      var imageUrl = data[index].img_url;

      var music_bg = document.getElementById('music-bg');
      music_bg.style.background = 'url('+imageUrl+')no-repeat';
      music_bg.style.backgroundSize = 'cover';
      music_bg.style.backgroundPosition = 'center 30%';
    }
  });
</pre>

为了方便 我把我自己写的loading插件和music.js放在一起 
MC  可以在music.js倒数第二行更改你想要的名称
