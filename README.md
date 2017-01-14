# vue-auto-focus

[![GitHub issues](https://img.shields.io/github/issues/yeyuqiudeng/vue-auto-focus.svg)](https://github.com/yeyuqiudeng/vue-auto-focus/issues)
[![GitHub forks](https://img.shields.io/github/forks/yeyuqiudeng/vue-auto-focus.svg)](https://github.com/yeyuqiudeng/vue-auto-focus/network)
[![GitHub stars](https://img.shields.io/github/stars/yeyuqiudeng/vue-auto-focus.svg)](https://github.com/yeyuqiudeng/vue-auto-focus/stargazers)
[![Twitter](https://img.shields.io/twitter/url/https/github.com/yeyuqiudeng/vue-auto-focus.svg?style=social)](https://twitter.com/intent/tweet?text=Wow:&url=%5Bobject%20Object%5D)

[![NPM](https://nodei.co/npm/vue-auto-focus.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/vue-auto-focus/)

## Description

A vue directive that can let you control your input and textarea auto focus very easily!

Vue指令,你可以很方便地对页面中所有input和textarea的自动聚焦行为进行流程控制

## Installation

    npm install vue-auto-focus
   
## Usage

### 引入指令

    import AutoFocus from 'vue-auto-focus'
    Vue.use(AutoFocus)

### 限制
* 指令必需用在需要控制的input和textarea元素父节点上
* 需要指令控制自动聚焦的input和textarea元素必需设置data-index属性

### 使用说明
看使用说明时,请参对例子
* data-current 指令挂载的父元素的属性,为当前聚焦的元素的data-index属性的值
* data-action 执行指令时的自动聚焦行为,值为next时,自动聚焦到下一个元素,prev时,聚焦到上一个元素,first时聚焦到第一个元素,last时聚焦到最后一个元素,jump时,跳转到指令的元素
* v-auto-focus="focusCtrl"  指令值,指令值变化时,执行data-action指定的行为
* 自动聚焦后,需要监听@focus,更新data-current的值,否则下一次指令执行时,不会得到预期的行为

## Example

[例子](https://github.com/yeyuqiudeng/vue-auto-focus/blob/master/src/auto-focus.js)
    
    <template>
        <form v-auto-focus="focusCtrl" :data-current="currentIndex" :data-action="actionType">
            <input @focus="setFocusIndex(0)" type="text" data-index="0">
            <input @focus="setFocusIndex(1)" type="text" data-index="1">
            <textarea @focus="setFocusIndex(2)" name="" id="" cols="30" rows="10" data-index="2"></textarea>
            <input @focus="setFocusIndex(3)" type="text" data-index="3">
        </form>
    </template>
    
    <style rel="stylesheet/less" lang="less" scoped>
        
    </style>
    
    <script type="text/babel">
        export default {
            data() {
                return {
                    focusCtrl: 0,  // 自动聚焦控制,变动时,执行自动聚焦指令
                    currentIndex: 0, // 当前聚焦元素的索引
                    actionType: 'next', // 自动聚焦的行为类型
                }
            },
            methods: {
                /**
                 * 控制自动聚焦指令执行
                 * @param actionType {string} 自动聚焦类型 it can be 'next'/'prev'/'first'/'last'/'jump'
                 * @param index {string} 当actionType为'jump'时,需要传入将要聚焦元素的索引
                 **/
                setFocus(actionType,index) {
                    if (actionType === 'jump') {
                        this.currentIndex = index
                    }
                    this.focusCtrl++
                    this.actionType = actionType
                },
                /**
                 * 元素聚焦时,获取当前聚焦元素的索引
                 * @param index {number} 当前聚焦的索引
                 **/
                setFocusIndex(index) {
                    this.currentIndex = index
                },
            }
        }
        
    </script>
    
## Development

    npm run dev

## License

[MIT](https://opensource.org/licenses/MIT)


