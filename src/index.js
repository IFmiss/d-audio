import './a.scss'
import 'static/font-icon/style.css'
// import './test_scroll.scss'
// import Bscroll from 'better-scroll'
// // alert(Bscroll);
// let test_scroll = document.querySelector('.test_scroll');
// let scroll = new Bscroll(test_scroll,{
//     scrollY: true,
//     click: true,
//     pullUpLoad: true,
//     pullDownRefresh: true
// })

// scroll.on('pullingDown', () => {
// 	console.log(1)
// })

// scroll.on('scroll', (pos) => {
// 	// console.log(pos)
// })


import {utils} from 'commonjs/utils.js';
import {dom} from 'commonjs/dom.js';
// alert(utils.dataType.isNumber(1))

// console.log(utils.deviceVersion ())
// dom.addCss('http://www.daiwei.org/global.css');

// console.log(utils.getRandomEleFromArr([1,3,4,5,6,222,3312,1,2,3,4,1,4,22123,41], 25))
// console.log(dom.getScrollWidth())
utils.notification().then((res) => {
	alert('你点击了我')
}, (err) => {
	alert('不支持哦')
})

console.log(utils.randomColor(0.2))

utils.showLayoutFramework()

console.log(utils.strLength('nihao啊啊啊啊啊'))