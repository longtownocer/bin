// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import axios from 'axios'

Vue.prototype.axios = axios
axios.defaults.baseURL = 'http://toutiao-ali.juheapi.com/toutiao/index'

//导入jquery
import $ from 'jquery'

Vue.prototype.$ = $

import './css/index.css'

//导入 mui
import './lib/mui_dist/css/mui.min.css'
//导入  mui 扩展的 图标样式文件和字体文件
import './lib/mui_dist/css/icons-extra.css'
import './lib/mui_dist/fonts/mui-icons-extra.ttf'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
//作废

/* 导入swiper轮播图样式*/
import 'swiper/dist/css/swiper.css'

import Vuex from 'vuex'
Vue.use(Vuex)
const readposition = JSON.parse(localStorage.getItem('readposition') || '[]')
const store = new Vuex.Store({
    state: {
        readposition: readposition
    },
    mutations: {
        saveReadPosition(state, params) {
            //if (!params.name.includes('/home/')||!params.name.includes('/home/newsInfo/')) {
            //    return
            //}

            let flag = false
            state.readposition.some((item) => {
                if (item.name == params.name) {
                    item.t = params.t
                    return flag = true
                }
            })
            if (!flag) {
                state.readposition.push(params)
            }
            localStorage.setItem('readposition', JSON.stringify(state.readposition))
        },

    },
    //过滤或者获取
    getters: {
        getReadPosition(state) {
            return state.readposition || []
        }
    }
})



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

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: {App},
    template: '<App/>',
    store
})
