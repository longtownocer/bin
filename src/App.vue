<template>
    <div id="app">
        <keep-alive exclude="newsInfo">
            <router-view/>
        </keep-alive>
        <van-tabbar route active-color="#e71335" v-if="$route.name!== 'newsInfo'">
            <van-tabbar-item replace to="/" icon="home-o">
                首页
            </van-tabbar-item>
            <van-tabbar-item replace to="/video" icon="play-circle-o">
                视频
            </van-tabbar-item>
            <van-tabbar-item replace to="/more" icon="search">
                发现
            </van-tabbar-item>
            <van-tabbar-item replace to="/users" icon="contact">
                我的
            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>

    export default {
        name: 'App',
        data() {
            return {
                active: 0,
                currentactive: '',
                cachecomps: 'newslist',


            }
        },
        methods: {},
        created() {

        },
        mounted() {

        },
        watch: {},
        components: {},
        filters: {}


    }
</script>

<style scoped lang="less">
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
        opcity: 0.999;
        height: 600px;
    }

    div {
        text-align: center;
    }


    nav {
        z-index: 99999999;
        overflow-y: hidden;
    }


</style>
