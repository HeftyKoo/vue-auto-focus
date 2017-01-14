/**
 * 该指令用于设定自动聚焦,使用时,需要聚焦的元素必须设置data-index属性,
 * 用法 父元素 v-auto-focus="focusCtrl" :data-action="actionType" :data-current="focusIndex"
 * 需要聚焦的元素需要设置索引 data-index="index"
 */
export default {
    /**
     * 进入页面时,根据设置的data-index索引值,聚焦到对应的输入框
     * @param el
     */
    inserted: function (el) {
        const allFocusEls = getAllFocusEls(el)  // 获取需要聚焦的input元素组
        let current = getTargetIndex(el,allFocusEls)
        if (!current || current < 0 || current >= allFocusEls.length) {  // 如果没有设置data-current,或者current的数值范围不符合要求,则默认聚焦到第一个输入框
            current = 0
        }
        const currentEl = allFocusEls[current]

        autoFocus(currentEl)
    },
    /**
     * 更新时,如果focusCtrl有变动,则根据actionType来判断聚焦的行为,聚焦到对应的元素
     * @param el
     * @param value
     * @param oldValue
     */
    update: function (el,{value,oldValue}) {
        if (value !== oldValue) {
            focusCtrl(el)
        }
    },
}

/**
 * 自动聚焦到对应的input
 * @param focusEl {Node} 需要聚焦的元素对象
 * 如果当前的元素不为input或textarea,则获取其为input或textarea的子元素
 */
const autoFocus = function (focusEl) {
    let elInput = focusEl
    if (['INPUT','TEXTAREA'].indexOf(focusEl.tagName.toUpperCase()) === -1) {
        elInput = focusEl.querySelector('input,textarea')
    }
    elInput && elInput.focus()
}
/**
 * 获取需要聚焦的所有元素
 * @param el {Node} 指令挂载的元素
 * @returns {NodeList} 需要聚焦的元素列表
 */
const getAllFocusEls = function (el) {
    return el.querySelectorAll('[data-index]')
}

/**
 * 聚焦行为控制
 * next 聚焦到下一个元素
 * prev 聚焦到上一个元素
 * first 聚焦到第一个元素
 * last 聚焦到最后一个元素
 * jump 跳转到指定的元素
 * @param el
 */
const focusCtrl = function (el) {
    const action = el.dataset.action
    const allFocusEls = getAllFocusEls(el)
    const focusLen = allFocusEls.length
    let current = getTargetIndex(el,allFocusEls)
    switch (action) {
        case 'next':  // 如果action为next,则聚焦到下一个输入框
            if (current >= focusLen - 1) {
                current = focusLen - 1
            } else {
                current++
            }
            autoFocus(allFocusEls[current])
            break
        case 'prev':  // 如果action为prev,则聚焦到上一个输入框
            if (current <= 0) {
                current = 0
            } else {
                current--
            }
            autoFocus(allFocusEls[current])
            break
        case 'first': // 如果为first,则聚焦到第一个输入框
            current = 0
            autoFocus(allFocusEls[current])
            break;
        case 'last': // 如果为last,则聚焦到最后一个输入框
            current = focusLen - 1
            autoFocus(allFocusEls[current])
            break
        case 'jump': // 如果为jump,则获取focusIndex,跳转到对应的输入框
            if (current >= 0 && current < focusLen) {
                autoFocus(allFocusEls[current])
            }
            break
    }
}

const getTargetIndex = function(el,collection) {
    const target = document.querySelector(`[data-index="${el.dataset.current}"]`)
    return Array.from(collection).indexOf(target)
}
