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