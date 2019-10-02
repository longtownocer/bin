// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

//导入jquery
import $ from 'jquery'

//导入index.css
import './css/index.css'

//导入swiper
import '@/lib/swiper/css/style.css'
import '@/lib/swiper/css/swiper.min.css'

//导入vant ui组件
import {NavBar, PullRefresh, Toast, Loading, ImagePreview,Icon,Tabbar, TabbarItem} from 'vant';
Vue.use(ImagePreview)
Vue.use(NavBar);
Vue.use(PullRefresh)
Vue.use(Toast)
Vue.use(Loading)
Vue.use(Icon)
Vue.use(Tabbar)
Vue.use(TabbarItem)

Vue.filter('formattiem', function (datatime) {
    var unixTimestamp = new Date(datatime * 1000);
    datatime = unixTimestamp.toLocaleString();
    return
})

import moment from 'moment'
Vue.filter('formatdate', function (dataStr, pattern = 'YYYY-MM-DD HH:MM'/*HH:mm:ss*/) {
    return moment(dataStr).format(pattern)
})

Vue.config.productionTip = false


new Vue({
    el: '#app',
    router,
    components: {App},
    template: '<App/>',
})
