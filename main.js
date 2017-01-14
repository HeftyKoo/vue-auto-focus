import autoFocus from './src/auto-focus'

const install = function (Vue) {
    if (install.installed) return;
    Vue.directive('auto-focus',autoFocus)
}


if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
};


export default {
    install,
}
