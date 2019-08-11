<template>
    <div id="app">
        <Header v-if="!$route.path.includes('/home/newsInfo')"></Header>
        <!--!$route.path.includes('/home/newsInfo')-->
        <!--        <img src="./assets/logo.png">-->
        <keep-alive exclude="newsInfo,preview">
            <router-view @getroute="getroute"/>
        </keep-alive>

        <nav class="mui-bar mui-bar-tab"
             v-if="!$route.path.includes('/home/newsInfo')">
            <!--!$route.path.includes('/home/newsInfo')||!$route.path.includes('/home/newsInfo/imgpreview')-->
            <router-link class="mui-tab-item" :to="currentactive">
                <span class="mui-icon mui-icon-home el-icon-s-home"></span>
                <span class="mui-tab-label">首页</span>
            </router-link>
            <router-link class="mui-tab-item" to="/tabbar">
                <span class="mui-icon mui-icon-email"><span class="mui-badge">9</span></span>
                <span class="mui-tab-label">消息</span>
            </router-link>
            <router-link class="mui-tab-item" to="/tabbar-contact">
                <span class="mui-icon mui-icon-contact"></span>
                <span class="mui-tab-label">通讯录</span>
            </router-link>
            <router-link class="mui-tab-item" to="/tabbar-map">
                <span class="mui-icon mui-icon-gear"></span>
                <span class="mui-tab-label">设置</span>
            </router-link>
        </nav>


    </div>
</template>

<script>
    import Header from './components/rootcomponents/Header.vue'

    export default {
        name: 'App',
        data() {
            return {
                active: 0,
                currentactive: '',
                cachecomps: 'newslist'
            }
        },
        mounted() {

        },
        created() {
            this.sethomeroute()
        },
        activated() {

        },
        updated() {

        },
        methods: {
            getroute(data) {
                console.log('子组件传递过来的数据----' + data)
            },
            sethomeroute() {
                if (this.$route.params.id) {
                    return this.currentactive = this.$route.path
                }
                this.currentactive = '/home/1'
            }
        },
        watch: {
            '$route': function (newval, oldval) {
                if (newval.params.id) {
                    this.currentactive = newval.path
                }
            }
        },
        components: {
            Header
        },
        filters: {
            'cutroute': function (from, to) {
                if (!from) {
                    return 1
                }
            }
        }


    }
</script>

<style scoped>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
        /*margin-top: 20px;*/
    }

    div {
        text-align: center;
    }

    .mui-bar-tab .mui-tab-item.mui-active {
        color: #d4131d;
    }

    nav {
        z-index: 99999999;
    }

</style>
