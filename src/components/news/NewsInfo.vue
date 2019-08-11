<template>
    <div class="root">
        <div class="newslist-root" v-if="previewflag" ref="newslist">
            <!--返回-->
            <div class="goback">
                <span class="mui-icon mui-icon-back" @click="goback"></span>
                <span class="el-icon-more"></span>
            </div>
            <!--新闻详情模块-->
            <div class="newsinfo-container">
                <!--标题-->
                <div class="info-title" style="transform: none">
                    {{infodata.title}}
                </div>
                <div class="pub_time">
                    {{infodata.pub_time|formattiem|formatdate}}
                    <span class="source"> 来源:{{infodata.source}}</span>
                </div>
                <!--标题图片-->
                <div class="info-title-topicpictrue">
                    <img :src="infodata.headpic" alt="">
                </div>
                <!--概要-->
                <div class="summary">
                    {{infodata.summary}}
                </div>
                <!--主体内容-->
                <div class="main-info-container" v-html="infodata.content"></div>
                <!--点赞-->
                <div class="awesome-info" v-if="awesomeflag">
                    <div class="awesome">
                        <span class="mui-icon-extra mui-icon-extra-like" @click="awesome($event)"></span>
                        <br>
                        <span refs="awenum">点赞: {{infodata.click_count}}</span>
                    </div>
                </div>
            </div>
            <!--评论模块-->
            <div class="info-comment">

            </div>
            <!--底部固定框-->
            <div class="reply-fixed" ref="reply">

                <div class="send-message">
                    <label for="send" class="mui-icon mui-icon-compose">
                        <input type="del" placeholder="发表你的神评论" id="send">
                    </label>
                </div>
                <div class="chatbox">
                    <!--                <span class="mui-badge">9</span>-->
                    <span class="mui-icon mui-icon-chatbubble"></span>
                    <span class="mui-badge mui-badge-danger">{{infodata.reply_count=='0'?'抢沙发':infodata.reply_count}}</span>
                    <span :class="{'mui-icon mui-icon-star':true,'yellow':collectionflag}"
                          @click="collectionflag=!collectionflag"></span>
                    <span class="mui-icon mui-icon-redo"></span>
                </div>

            </div>
        </div>
        <!--缩略图组件-->
        <!--        <preview v-else="previewflag" :imgarr="imgarr" @close="closepreview" :cur="curclicksrc"></preview>-->
        <div class="preview-container" v-if="!previewflag" ref="preview">
            <div class="close" @click="closepreview">X</div>
            <div class="swiper-container">
                <div class="swiper-wrapper" style="display: flex;flex-direction: row;align-items: center">
                    <div class="swiper-slide" v-for="(item,i) in imgarr" :key="i"><img :src="imgarr[i]" alt="">
                    </div>
                </div>
                <!-- 如果需要分页器 -->
                <div class="swiper-pagination"></div>
            </div>
        </div>
    </div>
</template>
<script>
    import Swiper from 'swiper'

    export default {
        name: 'newsInfo',
        data() {
            return {
                id: this.$route.params.id,
                infodata: {},
                awesomeflag: false,
                collectionflag: false,
                previewflag: true,
                imgarr: [],
                curclicksrc: '',
                scrolltop: 0
            }
        },
        created() {
            this.getNewsInfo(this.id, () => {
                this.awesomeflag = true
            })
            this.getPosition()
        },
        updated() {
            this.getPreview()
            this.getImgaddress()
            document.documentElement.scrollTop = this.scrolltop
        },
        mounted() {

            this.getscroll()
        },

        methods: {
            getNewsInfo(aid, callback) {
                this.$.ajax({
                    url: 'http://api.dagoogle.cn/news/ndetail',
                    dataType: 'jsonp',
                    data: {
                        aid: aid
                    }
                }).then((ret) => {
                    if (ret.code == '200') {
                        callback && callback(ret.data)
                        this.infodata = ret.data
                    }
                    //console.log(ret)
                }).catch((err) => {
                    console.log(err)
                })
            },
            awesome(e) {
                if (e.target.style.color == 'red') {
                    return
                }
                e.target.style.color = 'red'
                this.infodata.click_count++
            },
            goback() {
                this.$router.go(-1)
            },
            getPreview() {
                const $this = this
                this.$('.newsinfo-container img').click(function (e) {
                    this.curclicksrc = $this.$(this)[0].src
                    $this.imgarr.forEach((item, i) => {
                        if (item == this.curclicksrc) {
                            $this.imgarr.unshift(item)
                            $this.imgarr.splice(i, 1)
                        }
                    })
                    $this.previewflag = false
                    return false
                })
            },
            getImgaddress() {
                this.$('.newsinfo-container img').each((i, item) => {
                    this.imgarr.push(item.src)
                })
            },
            closepreview() {
                this.previewflag = true
            },
            getPosition() {

            },
            getscroll() {
                if (!this.$refs.preview) {
                    window.onscroll = () => {
                        let wscr = document.documentElement.scrollTop
                        if (wscr == 0) {
                            return
                        }
                        this.scrolltop = wscr
                        console.log(this.scrolltop)
                    }
                }

            }
        },
        activated() {

        },
        components: {}
    }
</script>
<style lang="less">

    .swiper-slide-duplicate {
        display: none;
    }

    .preview-container {
        width: 100%;
        height: 100%;
        background: #000;
        position: fixed;
        top: 0;
        left: 0;

        .close {
            position: absolute;
            width: 30px;
            height: 30px;
            background-color: rgba(255, 255, 255, 0.65);
            border-radius: 50%;
            top: 20px;
            left: 20px;
            text-align: center;
            line-height: 30px;
            z-index: 999;
        }

        .swiper-container {
            width: 100%;
            margin: 0 auto;
            background-color: #000000;
            position: relative;
            top: 50%;
            transform: translateY(-50%);

            img {
                vertical-align: bottom;
                width: 100%;
                position: relative;
                overflow: hidden;
            }

            img:nth-of-type(1) {
                position: relative;
                top: 50%;
                transform: rotateY(50%);
            }

            .swiper-slide-active {
                position: relative;
                top: 50%;
                transform: rotateY(50%);
            }
        }

    }

    .newslist-root {
        position: relative;
        margin-bottom: 80px;
    }

    .goback {
        line-height: 50px;
        position: fixed;
        height: 50px;
        top: 0;
        left: 0;
        width: 100%;
        background-color: #fff;

        .el-icon-more {
            float: right;
            margin-top: 15px;
            margin-right: 20px;
            font-size: 22px;
        }

        .mui-icon-back {
            float: left;
        }

        span {
            color: #4a65c9;
            margin-top: 12px;
            margin-left: 10px;
            font-size: 30px;
        }
    }

    .goback:hover span {
        color: #4d62c4;
    }


    .newsinfo-container {
        color: #3a3a3a;
        padding: 10px;
        text-align: left;
        margin-top: 50px;

        .pub_time {
            font-size: 12px;
            color: #3a44c7;
            margin-bottom: 10px;
        }

        .summary {
            font-size: 13px;
            margin: 15px 0 25px 0;
        }

        .source {
            font-size: 12px;
            color: #c92f2f;
            margin-left: 20px;
            overflow: hidden;
        }

        .info-title {
            text-align: left;
            font-size: 15px;
            letter-spacing: 2px;
            margin: 10px 0;
            font-family: '微软雅黑';
            font-weight: 700;
        }

        div {
            width: 100%;
        }

        .photo {
            /*width: 100%;*/

            a {
                width: 100%;

                span {
                    text-align: left;
                    /*float: left;*/
                    font-size: 13px;
                    color: rgb(66, 106, 207);
                    /*padding: 5px 0 20px;*/
                    display: block;
                    margin: 5px 0 10px 0;
                }

                img {
                    width: 100%;
                }
            }

        }

        p {
            text-align: left;
            font-size: 13px;
            margin-top: 10px;
            color: rgb(53, 52, 53);
        }

        /*p, .summary {*/
        /*    text-indent: 2em;*/
        /*}*/

        .editor {
            text-indent: 0;
        }

        b {
            color: #d6006f;
        }

        strong {
            color: #4c4c4c;
        }

        .editor {
            color: #2f41c5;
        }

        .video {
            width: 100%;

            video {
                width: 100%;
            }
        }
    }

    .info-title-topicpictrue {
        text-align: center;
        width: 100% px;

        img {
            width: 100%;
        }
    }

    .reply-fixed {
        position: fixed;
        width: 100%;
        height: 50px;
        bottom: 0;
        background-color: #fff;
        border-top: 0.5px solid rgba(118, 106, 111, 0.37);
        line-height: 50px;
        text-align: left;
        transition: all 0.6s ease;
        display: flex;
        justify-content: start;
        flex-direction: row;
        align-items: center;

        .send-message {
            label {
                margin-left: 15px;
            }

            input {
                border: none;
                border: 1px solid rgba(204, 204, 204, 0.72);
                margin-left: 10px;
                padding-left: 10px;
                font-size: 12px;
                width: 160px;
                min-height: 25px;
                max-height: 60px;
                border-radius: 3px;
                height: auto;
            }
        }

        .chatbox {
            position: absolute;
            top: 3px;
            right: -5px;

            .mui-badge {
                font-size: 12px;
                padding: 2px 4px;
                position: absolute;
                top: 8px;
                left: 14px;
            }

            .mui-icon-star {
                margin-left: 7px;
            }

            span {
                margin-right: 25px;
            }
        }

    }

    .awesome {
        span:nth-of-type(1) {
            font-size: 15px;
            margin: 20px 0 0 12px;
        }

        span:nth-of-type(2) {
            font-size: 14px;
        }
    }

</style>
