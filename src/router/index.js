import Vue from 'vue'
import Router from 'vue-router'
import NewsInfo from '@/components/news/NewsInfo'
import NewsDuplicate from '@/components/news/NewsList-duplicate'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: NewsDuplicate
        },
        {
            name:'newsInfo',
            path: '/home/newsInfo/:id',
            component: NewsInfo
        },
    ],
})
