export const dom = {
	// 判断元素是否有某一个className
	// el 被判断的元素
	// className class 的名称
	hasClass (el, className) {
		let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
		return reg.test(el.className)
	},

	// 给一个元素添加className
	// el 要添加的元素
	// className class 的名称
	addClass (el, className) {
		if (hasClass(el, className)) {
			return
		}

		let newClass = el.className.split(' ')
		newClass.push(className)
		el.className = newClass.join(' ')
	},

	// 给一个元素删除className
	// el 要删除的元素
	// className class 的名称
	removeClass (el, className) {
		if (hasClass(el, className)) {
			let newClass = el.className.split(' ')
			newClass.forEach((value, index, array) => {
				if (value === className) {
					newClass.splice(index, 1)
				}
			})
			el.className = newClass
		}
	},

	// 获取 、添加属性
	// el 要获取添加的元素
	// dataname 属性的名字
	// setValue 不存在则是获取的操作   存在就是设置的操作  其值就是设置的值
	getData (el, dataname, setValue) {
		if(setValue) {
			el.setAttribute(dataname, setValue)
		} else {
			el.getAttribute(dataname)
		}
	}
}
