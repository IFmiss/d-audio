(function($,window){
    var DW = {};
    //音乐播放器插件
    DW.music = function(options) {
        var musicValue = {
            width:                  260,                        //宽度
            height:                 56,                         //高度
            hasBlur:                true,                       //是否显示模糊效果
            blur:                   8,                          //模糊的数值
            left:                   0,
            right:                  30,
            bottom:                 30,
            direction:              'bottomright',              //bottomright  bottomleft
            btnBackground:          'rgba(0,0,0,0.2)',          //按钮背景色
            iconColor:              'rgba(250,250,250.0.2)',    //图标背景色
            hasSelect:              true,                       //是否可选择音乐类型
            hasAjax:                true,                       //是否是ajax请求数据
            selectClassName:        'select-type',              //选择类型按钮的className名称
            musicType:              ['纯音乐','华语','欧美','霉霉','电音','韩国','爱乐之城','网络歌曲'],         //音乐的类型  （需要随机显示）;
            source:                 [
                                        {
                                            name:'告白气球',
                                            singer:'周杰伦',
                                            url:'http://oiq8j9er1.bkt.clouddn.com/周杰伦 - 告白气球.mp3',
                                            img_url:'http://www.daiwei.org/index/music/musicImg/%E5%91%A8%E6%9D%B0%E4%BC%A6-%E5%91%8A%E7%99%BD%E6%B0%94%E7%90%83.jpg',
                                        },{
                                            name:'Fade',
                                            singer:'Alan Walker',
                                            url:'http://oiq8j9er1.bkt.clouddn.com/Alan Walker - Faded.mp3',
                                            img_url:'http://www.daiwei.org/index/music/musicImg/Faded.jpg',
                                        },{
                                            name:'你的爱',
                                            singer:'王力宏',
                                            url:'http://oiq8j9er1.bkt.clouddn.com/王力宏 - 你的爱.mp3',
                                            img_url:'http://www.daiwei.org/index/music/musicImg/%E7%8E%8B%E5%8A%9B%E5%AE%8F-%E4%BD%A0%E7%9A%84%E7%88%B1.jpg'
                                        },{
                                            name:'Such',
                                            singer:'姜贤敏,赵贤雅',
                                            url:'http://oiq8j9er1.bkt.clouddn.com/姜贤敏,赵贤雅 - Such.mp3',
                                            img_url:'http://www.daiwei.org/index/music/musicImg/such.jpg'
                                        }
                                    ],

            //进度信息
            durationBg:             'rgba(255,255,255,0)',
            progressBg:             [{
                                        position:0,
                                        color:'#FB3232',
                                    },{
                                        position:1,
                                        color:'#FC8F3F',
                                    }],
            //滚动列表正在播放的背景色  //配合长按事件使用
            // scrollActiveBg:         'rgba(224, 189, 134, 0.298039)',

            beforeMusicPlay:function(){},                               //音乐加载之前   可以播放之前
            afterMusicLoading:function(){},                             //音乐加载成功  可播之后
            musicChanged:function(){},                                  //音乐切换之后，类似切歌
            getMusicInfo:function(){},                                  //获取所有音乐信息
        }


        var _this = this;
        var opt = $.extend(musicValue,options || {});

        var music_duration = 0;
        var musicLenth = 0;
        var musicData = '';

        //音乐dom初始化
        musicValue._init = function(){
            if(opt.direction == 'bottomleft'){
                _this.cpt_music = $('<div class="cpt-dw-music music-div active"></div>').css({
                    width:opt.width,
                    height:opt.height,
                    bottom:opt.bottom,
                    left:opt.left
                }).appendTo($('body'));
            }else{
                _this.cpt_music = $('<div class="cpt-dw-music music-div active"></div>').css({
                    width:opt.width,
                    height:opt.height,
                    right:opt.right,
                    bottom:opt.bottom,
                }).appendTo($('body'));
            }
            _this.music_play = $('<div class="music-play-div"></div>').appendTo(_this.cpt_music);

            if(opt.hasSelect && opt.hasAjax){
                //选择音乐类型
                _this.music_typeSelect = $('<div class="music-typeSelect"></div>').appendTo(_this.cpt_music);
                _this.music_all = $('<div class="music-all music-typeSelect" data-type="">全部</div>').appendTo(_this.music_typeSelect);
                _this.music_typeList = $('<div class="music-random-typeSelect music-typeSelect" data-type="纯音乐">纯音乐</div><div class="music-random-typeSelect music-typeSelect" data-type="华语">华语</div>').appendTo(_this.music_typeSelect);
                _this.music_refresh = $('<div class="music-refresh">刷新</div>').appendTo(_this.music_typeSelect);
            }

            if(opt.hasBlur){
                _this.music_blur = $('<div class="filterBg"></div>').css({
                    '-webkit-filter': 'blur('+opt.blur+'px)',
                    '-moz-filter': 'blur('+opt.blur+'px)',
                    '-ms-filter': 'blur('+opt.blur+'px)',
                    'filter': 'progid:DXImageTransform.Microsoft.Blur(PixelRadius='+opt.blur+', MakeShadow=false)', /* IE6~IE9 */
                }).appendTo(_this.cpt_music);
            }

            _this.music_status = $('<div class="pauseplay"><i class="dw-icon-play"></i></div>').appendTo(_this.music_play);
            _this.music_next = $('<div class="next"><i class="dw-icon-next"></i></div>').appendTo(_this.music_play);
            _this.music_info = $('<div class="music-info"></div>').appendTo(_this.music_play);
            _this.music_name = $('<p class="music-name">未曾遗忘的青春</p>').appendTo(_this.music_info);
            _this.music_singer = $('<p class="music-singer">music plugin</p>').appendTo(_this.music_info);

            _this.music_logo = $('<div class="music-div-logo"></div>').appendTo(_this.cpt_music);
            // _this.music_shadow = $('<div class="music-logo-shadow"></div>').appendTo(_this.music_logo);
            _this.music_img = $('<img class="music-logo" src="http://www.daiwei.org/index/images/img/indeximg.jpg">').appendTo(_this.music_logo);
            _this.music_progress = $('<canvas id="music_canvas" style="position:absolute;top:0;left:0;zoom:0.25"></canvas>').appendTo(_this.music_logo );

            _this.audio = $('<audio id="cpt_dw_music" src=""></audio>').appendTo($('body'));

            opt.beforeMusicPlay();
            

            //监听选择类型事件
            musicValue._selectEvent();

            musicValue._selectByClass();
        }

        //给类型选择列表加监听事件
        musicValue._selectEvent = function(){
            if(opt.hasSelect && opt.hasAjax){
                musicValue._randomSelect(2);

                _this.music_typeSelect.find('.music-typeSelect').on('click',function(event){
                    var text = $(this).attr('data-type');
                    event.stopPropagation();
                    _this.music_typeSelect.remove();
                    //获取数据
                    musicValue._dataType(text);
                });

                _this.music_refresh.on('click',function(event){
                    event.stopPropagation();
                    musicValue._randomSelect(2);
                });
            }else{
                musicValue._dataType();
            }
        };

        //随机设置类型
        musicValue._randomSelect = function(index){
            var arr = opt.musicType;
            var new_arr = $DW.getRandomElementFromArr(arr,index);
            for(var i = 0;i < index; i++){
                _this.music_typeSelect.find('.music-typeSelect').eq(i+1).text(new_arr[i]).attr('data-type',new_arr[i]);
            };
        };

        //音乐播放的点击事件
        musicValue._clickEvent = function(){
            _this.music_status.off().on('click',function(event){
                event.stopPropagation();
                musicValue._playPause();
            });

            _this.music_next.off().on('click',function(event){
                event.stopPropagation();
                musicValue._playNext();
            });

            _this.cpt_music.off().on('click',function(){
                $(this).toggleClass('circle');
            });

            $(".li-music-list").off().on('click',function(){
                var _this = $(this);
                var index = _this.attr('data-index');
                musicValue._playIndex(index);
            })

            //长按事件
           //  _this.cpt_music.longPress({
           //   duration:300,
           //   longPress:function(){
           //       var music_list = new Array();
           //       for(var i = 0 ; i < musicData.length ; i++ ){
           //           music_list.push({'title':musicData[i].name +' - '+ musicData[i].singer,
           //                           'hasHref':false,
           //                           'font_imgClass':'dw-icon-music',
           //                           'rightFont_imgClass':''});
           //       }

           //       var index = _this.audio.attr('data-index') * 1;
           //       // alert(JSON.stringify(music_list));
           //       DW.scrollMenu({
           //           source:music_list,
           //           hasLineBorder:false,
           //           click:function(ret){
           //               musicValue._playIndex(ret.index);
           //           }
           //       });

           //       $('.cpt-selectScrollMenu').find('li').eq(index).css({
                    //  background:opt.scrollActiveBg,
                    // });
           //   }
           //  });
        };

        //显示加载的loading   需引用loading插件
        musicValue._showMusicLoading = function(name){
            if($('.music-div').find('.cpt_loading_mask').length > 0){
                return;
            }
            var name = name || 'music';
            //添加加载浮层
            $('.music-div').loading({
                name:name,
                hasTitle:false,
                hasDescription:false,
                originDivWidth:30,
                originDivHeight:30,
                // smallLoading:true,
                originWidth:5,
                originHeight:5,
                loadingWidth:260,
                loadingHeight:60,
                originBg:'rgba(34,222,44,0.5)'
            });
        };

        //暂停
        musicValue._pause = function(){
            _this.audio[0].pause();
            // _this.music_img.removeClass('active');
            // _this.music_status.find('i').removeClass('dw-icon-pause').addClass('dw-icon-play');
        };

        //播放
        musicValue._play = function(){
            musicValue._showMusicLoading('music_play_index');
            _this.audio[0].play();
            _this.music_img.addClass('active');
            _this.music_status.find('i').removeClass('dw-icon-play').addClass('dw-icon-pause');
        };

        //播放暂停效果
        musicValue._playPause = function(){
            try{
                if(_this.audio[0].paused){
                    musicValue._showMusicLoading('music_play_index');
                    _this.audio[0].play();
                }else{
                    _this.audio[0].pause();
                }
            } catch (e){
                DW.showMessage(e.name + ": " + e.message);
            }
        };

        //音频播放结束事件
        musicValue._onended = function(){
            _this.audio.on('ended',function(){
                if(_this.audio[0].loop){
                    _this.audio[0].load();
                    _this.audio[0].play();
                }else{
                    musicValue._playNext();
                }
            });
        };

        //音频处于播放状态的事件
        musicValue._onplaying = function(){
            _this.audio.on('playing',function(){
                $dw.removeLoading('music_waiting');
                $dw.removeLoading('music_play_index');
                $dw.removeLoading('music_play_next');
                $dw.removeLoading('music_play_index');
            });

            var dw_audio = document.getElementById('cpt_dw_music');
            dw_audio.addEventListener('canplay',function(){
                musicValue._showLoading(dw_audio);
            });
        };

        //音频需要加载之后才播放事件
        musicValue._onwaiting = function(){
            _this.audio.on('waiting',function(){
                musicValue._showMusicLoading('music_waiting');
            });
        };

        //监听音乐是否暂停
        musicValue._onpause = function(){
            _this.audio.on('pause',function(){
                _this.music_img.removeClass('active');
                _this.music_status.find('i').removeClass('dw-icon-pause').addClass('dw-icon-play');
            })
        };

        //监听音乐是否暂停
        musicValue._onplay = function(){
            _this.audio.on('play',function(){
                _this.music_img.addClass('active');
                _this.music_status.find('i').removeClass('dw-icon-play').addClass('dw-icon-pause');
            })
        };

        //跳动进度的时候执行
        // musicValue._seeked = function(){

        // };

        musicValue._keyPress = function(){
            document.onkeydown = function(e) {
                var keycode = e.which || window.event.keyCode;
                if(keycode == 32 && !$('input').is(':focus')){
                    musicValue._playPause();
                }

                if(keycode == 39 || keycode == 40 && !$('input').is(':focus')){
                    musicValue._playNext();
                }
            }
        };

        //自定义选择音乐类型事件 
        musicValue._selectByClass = function () {
            var typeClass = opt.selectClassName;
            $('.'+typeClass).on('click',function(){
                var type = $(this).attr('data-type');
                musicValue._pause();
                musicValue._dataType(type);
            })
        };


        //点击下一首音乐事件
        musicValue._playNext = function(){
            musicValue._showMusicLoading('music_play_next');

            //通过data-index+1来播放下一集
            var index = _this.audio.attr('data-index')*1 + 1;
            if(index >= musicLenth){
                index = 0;
            }

            musicValue._insertData(musicData,index);
            musicValue._playPause();

            if($('.cpt-selectScrollMenu').length){
                $('.cpt-selectScrollMenu').find('li').eq(index).css({
                    background:opt.scrollActiveBg,
                    // color:'#fff',
                }).siblings().css({
                    background:'#fff',
                    // color:'#fff',
                });
            }

            // opt.musicChanged(index);
        };

        musicValue._playIndex = function(index){
            musicValue._showMusicLoading('music_play_index');

            //通过data-index+1来播放下一集
            var index = index;
            if(index >= musicLenth){
                index = 0;
            }

            musicValue._insertData(musicData,index);
            musicValue._playPause();
        };

        //写入音乐的事件监听
        musicValue._musicListener = function(){
            if(_this.audio[0].readyState === 3){
                opt.afterMusicLoading();
                //删除加载浮层
                $dw.removeLoading('music_waiting');
                $dw.removeLoading('music_play_index');
                $dw.removeLoading('music_play_next');
                $dw.removeLoading('music_play_index');
            }

            //注册点击事件
            musicValue._clickEvent();

            //音乐播放结束事件
            musicValue._onended();

            // 音乐处于播放或中途中暂停的状态
            musicValue._onplaying();

            //当媒介已停止播放但打算继续播放时运行脚本
            musicValue._onwaiting();

            //音乐暂停会触发事件   主要是图标的改动
            musicValue._onpause();

            //音乐暂停会触发事件   主要是图标的改动
            musicValue._onplay();

            //按键事件  控制音乐播放
            musicValue._keyPress();
        };

        //给dom装填数据
        musicValue._insertData = function(data,index){
            var music_imgUrl = data[index].img_url || 'http://www.daiwei.org/index/images/img/indeximg.jpg';
            var music_name = data[index].name || '爱乐之城 纯音乐';
            var music_url = data[index].url || 'http://oiq8j9er1.bkt.clouddn.com/Justin%20Hurwitz%20-%20Planetarium%20-%20From%20La%20La%20Land%20Soundtrack.mp3';
            var music_singer = data[index].singer || '默认音乐';
            var music_sortIndex = data[index].sort_index || 0;
            _this.music_name.text(music_name).attr('title',music_name);
            _this.music_singer.text(music_singer).attr('title',music_singer);
            _this.music_img.attr('src',music_imgUrl);
            if(opt.hasBlur){
                var blur_bg = ('url('+ music_imgUrl +')center right no-repeat').toString();
                _this.music_blur.css({
                    background:blur_bg,
                    'background-size':'cover',
                });
            };

            var ret = {
                index:index,
                data:data,
                url:music_url,
            };

            // opt.musicPlayByWebAudio(ret);
            opt.musicChanged(ret);
            
            _this.audio.attr('src',music_url);
            _this.audio.attr('data-index',music_sortIndex);
        };

        //获取数据之后的操作  添加sort_index属性
        musicValue._getMusicInfo = function(){
            //给获取的音乐添加sortindex 索引   添加属性
            musicLenth = musicData.length;

            for(var i = 0; i < musicLenth; i++){
                musicData[i].sort_index = i;
            }

            if(musicLenth){
                opt.getMusicInfo(musicData);

                musicValue._insertData(musicData,0);

                //监听状态
                musicValue._musicListener();
            }else{
                return;
            }
        };

        //选择获取数据类型  本地 or ajax
        musicValue._dataType = function(text){
            var value = text || '';
            if(opt.hasAjax){
                musicValue._ajax(value);
                // data = $DW.getStorage('music_info') == 'null'? {}:$DW.getStorage('music_info');          //数据为空时   使用本地静态数据
                // parseData = JSON.parse(data);
            }else{
                // parseData = opt.source;
                musicValue._localData();
            }
        };

        //执行本地数据
        musicValue._localData = function() {
            musicData = opt.source;
            musicValue._getMusicInfo();
        };

        musicValue._showMusicList = function() {

        };

        //执行ajax请求的数据
        musicValue._ajax = function(value){
            var value = value || '';
            var host = window.location.host;
            var music_data = '';
            $.ajax({
                url:"server.php?inAjax=1&do=getMusic",
                type:'post',
                datatype:'json',
                data:{type:value},
                success:function(data){
                    musicData = JSON.parse(data);
                    // alert(musicData);
                    musicValue._getMusicInfo();
                    // $DW.setStorage('music_info',data);
                },

                error:function(XMLHttpRequest, textStatus, errorThrown) {
                    console.error('XMLHttpRequest.status: ' +XMLHttpRequest.status);
                    console.error('XMLHttpRequest.readyState: ' +XMLHttpRequest.readyState);
                    console.error('textStatus: '+textStatus);
                    return;
                },
            });
        }

        //显示canvas进度
        musicValue._showLoading = function(audio) {
            var music_ele = audio || '';
            // var myAudio = document.getElementById('music_canvas');
            music_duration = music_ele.duration;
            
            // init canvas
            var canvas = document.getElementById('music_canvas');
            canvas.width = (opt.height + 2) * 4;
            canvas.height = (opt.height + 2) * 4;
            var context = canvas.getContext('2d');

            var centerX = opt.height / 2 + 1;
            var centerY = opt.height / 2 + 1;

            var currnt = 0;
            var rate = (Math.PI * 2 / music_duration).toFixed(5);

            //音频播放事件
            music_ele.ontimeupdate = function(currnt){
                currnt = music_ele.currentTime;
                context.clearRect(0, 0, opt.height, opt.height);
                durationCircle();
                // text(Math.floor(currnt/duration*100));
                progressCircle(currnt);
                if(currnt >= music_duration) currnt = 0;
            };
            


            function progressCircle(currnt) {
                context.save();
                // console.log(currnt);
                var grd = context.createLinearGradient(0,0,opt.height,opt.height);
                for(var i = 0;i<opt.progressBg.length;i++){
                    grd.addColorStop(opt.progressBg[i].position,opt.progressBg[i].color);
                }

                context.translate(0.5, 0.5);
                context.lineCap="round";
                context.strokeStyle = grd;  //设置描边样式
                context.lineWidth = 3.5;     //设置线宽
                context.scale(4,4);
                context.beginPath();   //路径开始
                context.arc(centerX,centerY,opt.height / 2,-Math.PI/2, -Math.PI/2 +currnt*rate, false);   //用于绘制圆弧context.arc(x坐标，y坐标，半径，起始角度，终止角度，顺时针/逆时针)
                context.stroke(); //绘制
                context.closePath(); //路径结束
                context.restore();
            }

            //绘制白色外圈
            function durationCircle(){
                context.save();
                context.scale(4,4);
                context.beginPath();
                context.strokeStyle = opt.durationBg;
                context.lineWidth = 3.5;
                context.arc(centerX, centerY, opt.height / 2 , 0, Math.PI*2, false);
                context.stroke();
                context.closePath();
                context.restore();
            }  
        }

        musicValue._init();
        return _this;
    }

    window.$api = DW;
})(jQuery,window)