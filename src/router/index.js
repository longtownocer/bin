import Vue from 'vue'
import Router from 'vue-router'
import NewsList from '@/components/news/NewsList'
import NewsInfo from '@/components/news/NewsInfo'
import Imgpreview from '@/components/plugincomponents/Imgpreview'

Vue.use(Router)

export default new Router({
    routes: [
        {path: '/', redirect: '/home/1'},
        {
            path: '/home',
            name: 'HelloWorld',
            component: NewsList
        },
        {
            path: '/home/:id',
            component: NewsList,
        },
        {path: '/home/newsInfo/:id', component: NewsInfo},
        {path: '/home/newsInfo/Imgpreview'},
        {path:'/tabbar',component:Imgpreview}
    ],
    linkActiveClass: 'mui-active newslist-active'
})
