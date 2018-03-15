// 浏览器相关方法
export const utils = {
	deviceVersion () {
		const u = navigator.userAgent
		const app = navigator.appVersion
		return {		// 移动终端浏览器版本信息
			userAgent: u,
			appVersion: app,
			trident: u.includes('Trident'),	 // IE内核
			presto: u.includes('Presto'), 	// opera内核
			webKit: u.includes('AppleWebKit'), 	// 苹果、谷歌内核
			gecko: u.includes('Gecko') && !u.includes('KHTML'), 	// 火狐内核
			mobile: !!u.match(/AppleWebKit.*Mobile/i) || !!u.match(/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/),   // 是否为移动终端
			ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), 	// ios终端
			android: u.includes('Android') || u.includes('Linux'), 	// android终端或者uc浏览器
			iPhone: u.includes('iPhone') || u.includes('Mac'), 	// 是否为iPhone或者QQHD浏览器
			iPad: u.includes('iPad'), 	// 是否iPad
			webApp: !u.includes('Safari'), 	// 是否web应该程序，没有头部与底部,
			language: (navigator.browserLanguage || navigator.language).toLowerCase()	// 浏览器语言
			// audroidVersion: u.substr(u.indexOf('Android') + 8, 3),
			// iosVersion: u.substr(u.indexOf('ios') + 8, 3)
		}
	},

	// 设置console  带有自定义美化的功能
	// text： 内容;
	// isOneLine：  是否一行显示（1行相当于3行log的高度 所以不能换行）;
	// author：用户名称 ；
	setConsole (text = 'this is console!', isOneLine = 1, author = '未曾遗忘的青春') {
		if (isOneLine) {
			console.log('')
			console.log(`%c${text}  ---  ${author}`, `background-image: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4gPHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJncmFkIiBncmFkaWVudFVuaXRzPSJvYmplY3RCb3VuZGluZ0JveCIgeDE9IjAuMCIgeTE9IjAuNSIgeDI9IjEuMCIgeTI9IjAuNSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iIzY2Y2NjYyIvPjxzdG9wIG9mZnNldD0iMjAlIiBzdG9wLWNvbG9yPSIjMzM5OTk5Ii8+PHN0b3Agb2Zmc2V0PSI0MCUiIHN0b3AtY29sb3I9IiNjY2NjOTkiLz48c3RvcCBvZmZzZXQ9IjYwJSIgc3RvcC1jb2xvcj0iIzk5Y2NmZiIvPjxzdG9wIG9mZnNldD0iODAlIiBzdG9wLWNvbG9yPSIjY2NjY2ZmIi8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjZmY5OWNjIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmFkKSIgLz48L3N2Zz4g');background-size: 100%;background-image: -webkit-gradient(linear, 0% 50%, 100% 50%, color-stop(0%, #66cccc), color-stop(20%, #339999), color-stop(40%, #cccc99), color-stop(60%, #99ccff), color-stop(80%, #ccccff), color-stop(100%, #ff99cc));background-image: -moz-linear-gradient(left, #66cccc 0%, #339999 20%, #cccc99 40%, #99ccff 60%, #ccccff 80%, #ff99cc 100%);background-image: -webkit-linear-gradient(left, #66cccc 0%, #339999 20%, #cccc99 40%, #99ccff 60%, #ccccff 80%, #ff99cc 100%);background-image: linear-gradient(to right, #66cccc 0%, #339999 20%, #cccc99 40%, #99ccff 60%, #ccccff 80%, #ff99cc 100%);padding:20px 40px;color:#fff;font-size:12px;`)
			console.log('')
		} else {
			console.log(`%c${text}  ---  ${author}`, `background-image: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4gPHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJncmFkIiBncmFkaWVudFVuaXRzPSJvYmplY3RCb3VuZGluZ0JveCIgeDE9IjAuMCIgeTE9IjAuNSIgeDI9IjEuMCIgeTI9IjAuNSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iIzY2Y2NjYyIvPjxzdG9wIG9mZnNldD0iMjAlIiBzdG9wLWNvbG9yPSIjMzM5OTk5Ii8+PHN0b3Agb2Zmc2V0PSI0MCUiIHN0b3AtY29sb3I9IiNjY2NjOTkiLz48c3RvcCBvZmZzZXQ9IjYwJSIgc3RvcC1jb2xvcj0iIzk5Y2NmZiIvPjxzdG9wIG9mZnNldD0iODAlIiBzdG9wLWNvbG9yPSIjY2NjY2ZmIi8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjZmY5OWNjIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmFkKSIgLz48L3N2Zz4g');background-size: 100%;background-image: -webkit-gradient(linear, 0% 50%, 100% 50%, color-stop(0%, #66cccc), color-stop(20%, #339999), color-stop(40%, #cccc99), color-stop(60%, #99ccff), color-stop(80%, #ccccff), color-stop(100%, #ff99cc));background-image: -moz-linear-gradient(left, #66cccc 0%, #339999 20%, #cccc99 40%, #99ccff 60%, #ccccff 80%, #ff99cc 100%);background-image: -webkit-linear-gradient(left, #66cccc 0%, #339999 20%, #cccc99 40%, #99ccff 60%, #ccccff 80%, #ff99cc 100%);background-image: linear-gradient(to right, #66cccc 0%, #339999 20%, #cccc99 40%, #99ccff 60%, #ccccff 80%, #ff99cc 100%);padding:0;color:#fff;font-size:12px;`)
		}
	},

	// 移动端rem的设计
	initRem () {
        var _self = {};
        var _pdfwidth = 750
        var _minScreenWidth = 320
        var _maxScreenWidth = 768
        var _minScreenWidthP = _minScreenWidth / _pdfwidth
        var _maxScreenWidthP = _maxScreenWidth / _pdfwidth
        _self.resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
        _self.Html = document.getElementsByTagName("html")[0];
        _self.widthProportion = function(){
            var p = Number((document.body&&document.body.clientWidth || _self.Html.offsetWidth) / _pdfwidth).toFixed(3);
            return p > _maxScreenWidthP ? _maxScreenWidthP:p<0.426?0.426:p;
        };
        _self.changePage = function(){
            _self.Html.setAttribute("style","font-size:" + _self.widthProportion() * 100 + "px");
        };
        _self.changePage();
        if (!document.addEventListener) return;
        window.addEventListener(_self.resizeEvt,_self.changePage,false);
        document.addEventListener('DOMContentLoaded', _self.changePage, false);
	}
}
