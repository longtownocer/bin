<template>
    <div class="newslist-hole" ref="hole">
        <!--新闻列表导航头-->
        <div class="newslist-header">
            <div class="nav-container" ref="newscontainer">
                <ul>
                    <!--<p v-for="(item,i) in list" :key='i' @click='my(item)'>这是{{item}}----的描述</p>-->
                    <router-link tag="li" :to="'/home/'+(i+1)" v-for="(item,i) in newslist"
                                 @click="clicklist" :key="i">{{item}}
                    </router-link>
                </ul>
            </div>
        </div>
        <!--新闻列表-->
        <router-link :to="'/home/newsInfo/'+list.aid" class="newslist-info" :class="{'first-info':i==0}"
                     v-for="(list,i) in newsInfo" :key="i">
            <div class="left">
                <p class="n-title">{{list.title}}</p>


                <div class="left-top">
                    <span>来自:<i>{{list.source}}</i></span>
                    <span class="send_time">
                    发表时间:<i>{{list.pub_time|formattiem|formatdate}}</i>
                     </span>
                </div>

                <div class="left-bottom">
                    <span class="reply">
                    评论: <i>{{list.reply_count}}</i>
                </span>
                    <span class="click_count">
                    点击数: <i>{{list.click_count}}</i>
                </span>
                </div>

            </div>
            <div class="right">
                <img :src="list.headpic" alt="">
            </div>
        </router-link>
        <!--懒加载模块-->
        <!--<div class="lazyloader" v-if="lazyloadflag"
             v-loading="loading"
             style="width: 100%;margin-top: 30px;"
        >
        </div>-->
        <!--加载更多-->
        <div class="lazyload-more">
            <button v-if="loadmoreflag" @click="loadmore">
                加载更多
            </button>
            <span class="el-icon-loading" v-else="!loadmoreflag"></span>
        </div>
        <!--新闻列表切换的模态框-->
        <div class="lazyload-switch" v-if="loadswitchflag">

        </div>
    </div>
</template>

<script>
    export default {
        name: 'newslist',
        data() {
            return {
                msg: 'Welcome to Your Vue.js App',
                newslist: ['娱乐', '军事', '汽车', '财经', '笑话', '体育', '科技', '感情', '头条'],
                id: this.$route.params.id,
                newsInfo: [],
                loading: true,
                minpage: 1,
                lazyloadflag: false,
                loadmoreflag: false,
                loadswitchflag: false,
                scrolltop: 0
            }
        },
        created() {
            //if(this)
            this.getNewsList(this.id, this.minpage, (data) => {
                this.loadmoreflag = true
            }, true)

            this.$emit('getroute', this.$route.path)
        },
        mounted() {
            if (this.id > 5) {
                this.$refs.newscontainer.scrollLeft = 305
            }
            const $this = this
            this.$('.nav-container li').click(function (e) {
                //console.log($this.$(this).index())
                let curnum = $this.$(this).index() + 1
                $this.getNewsList(curnum, 1, () => {
                }, false)
            })

            this.getscrolltop()
        },
        updated() {
        },
        beforeRouteLeave(to, from, next) {
           // alert('gaga')
            let t1 = document.documentElement.scrollTop || document.body.scrollTop;
            this.$store.commit('saveReadPosition', {name: this.$route.path, t: t1})
            next()
        },
        beforeRouteEnter(to, from, next) {
            next()
        },

        methods: {
            getNewsList(cid, page, callback, issame) {
                //console.log(cid, page, callback)
                this.$.ajax({
                    dataType: 'jsonp',
                    url: 'http://api.dagoogle.cn/news/nlist?callback',
                    data: {
                        cid: cid,
                        page: page
                    }
                }).then(ret => {
                    if (ret.code == '200') {
                        callback && callback(ret)
                        if (issame) {
                            return this.newsInfo = this.newsInfo.concat(ret.data.list)
                        }
                        this.newsInfo = ret.data.list
                    }
                    // console.log(ret)
                }).catch((err) => {
                    console.log(err)
                })
            },
            loadmore() {
                this.loadmoreflag = false
                this.minpage++
                this.getNewsList(this.$route.params.id, this.minpage, (data) => {
                    console.log(data)
                    this.loadmoreflag = true
                }, true)
            },
            clicklist() {
                alert('this')
            },
            getscrolltop() {

            }
        },
        // props:['curheight'],
        watch: {
            '$route': function (newval, oldval) {

            },
        },
        activated() {
            let readpt = this.$store.getters.getReadPosition
            let t = 0
            readpt.some((item) => {
                if (item.name == this.$route.path) {
                    t = parseInt(item.t)
                }
            })
            document.documentElement.scrollTop= t


            if (this.id > 5) {
                this.$refs.newscontainer.scrollLeft = 305
            }
        },
        deactivated() {

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .newslist-hole {
        padding-bottom: 56px;
        position: relative;
        margin-top: 13px;
    }

    .newslist-hole .newslist-info .left .n-title:visited {
        color: rgba(255, 255, 255, 0.82);
    }

    .lazyload-switch {
        width: 100%;
        height: 100%;
        background-color: #fff;
        position: absolute;
        top: 0;
        opacity: 0.1;
        z-index: 99999;
    }

    .lazyload-more {
        padding: 20px 40px;

        button {
            width: 100%;
            height: 40px;
            background: none;
            background-color: rgba(33, 81, 191, 0.84);
            color: rgba(255, 255, 255, 0.87);
            border-radius: 5px;
        }

        span {
            font-size: 30px;
            opacity: 0.4;
        }

        button:active {
            background: none;
            border: 1px solid #009ab6;
            color: #000;
        }
    }

    .newslist-info {
        display: flex;
        justify-content: space-between;
        flex-direction: row;
        align-items: center;
        padding: 13px;
        background-color: #ffffff;
        border-bottom: 1px solid rgba(204, 204, 204, 0.58);
        z-index: 99;

        .left {
            overflow: hidden;

            .left-top {
                overflow: hidden;
            }

            .left-bottom {
                display: flex;
                justify-content: flex-start;
            }

            span {
                float: left;
                margin-right: 10px;
                font-size: 11px;
                color: rgba(134, 134, 134, 0.74);

                i {
                    font-style: normal;
                    color: #5caaff;
                }
            }

            .send_time {
                margin-left: 10px;
            }

            .click_count {
                margin: 0 0 0 44px;
            }

            p {
                text-align: left;
                color: #402f37;
                font-size: 14px;
                font-weight: 500;
                margin-bottom: 5px;
            }

        }

        p:hover {
            color: #d83632;
        }

        .right {
            width: 120px;
            margin-left: 4px;

            img {
                width: 100%;
            }
        }
    }

    .el-loading-spinner {
        top: 50%;
        margin-top: 21px;
        width: 100%;
        text-align: center;
        position: none;
    }

    .first-info {
        margin-top: 15px;
    }

    .newslist-header {
        width: auto;
        height: 23px;
        overflow-y: hidden;
    }

    .nav-container {
        overflow-x: auto;
        overflow-y: hidden;
        /*position: relative;*/
    }

    .nav-container ul {
        padding: 0;
        margin: 0;
        width: 670px;
        display: flex;
        justify-content: space-between;
        border-bottom: 7px solid transparent;
    }

    .nav-container ul > li {
        width: 80px;
        height: 120%;
        font-size: 13px;
        margin: 1px 24px;
    }

    .newslist-active {
        border-bottom: 4px solid #e7291c;
        color: #ff0062;
    }

</style>
<!--

 <router-link tag="li" to="home/entertainment">娱乐</router-link>
             <router-link tag="li" to="home/military">军事</router-link>
             <router-link tag="li" to="home/car">汽车</router-link>
             <router-link tag="li" to="home/finance">财经</router-link>
             <router-link tag="li" to="home/joke">笑话</router-link>
             <router-link tag="li" to="home/physicaleducation">体育</router-link>
             <router-link tag="li" to="home/technology">科技</router-link>
             <router-link tag="li" to="home/feeling">感情</router-link>
             <router-link tag="li" to="home/headline">头条</router-link>


             <div class="ceter">
                <span class="load-tip">正在加载中...</span>
                <span class="el-icon-loading"></span>
            </div>


             /* window.onscroll = () => {
                 let ht_sctp = document.documentElement.scrollTop
                 let ht_clht = document.documentElement.clientHeight
                 let newListhgt = document.querySelector('.newslist-hole').offsetHeight
                 if (ht_sctp + ht_clht - 60 > newListhgt) {
                     this.lazyloadflag = true
                     this.minpage++
                     alert('gaga')
                    // this.getNewsList(this.id, this.minpage, () => {
                    //   this.lazyloadflag = false
                    // }, true)
                 }
             }*/
-->
