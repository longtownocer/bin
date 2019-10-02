<template>
    <div class="root">
        <div class="newslist-root" v-if="previewflag" ref="newslist">
            <!--返回-->
            <div class="goback">
                <!--<span class="mui-icon mui-icon-back" @click="goback"></span>
                <span class="el-icon-more"></span>-->
                <van-nav-bar
                        left-text="返回"
                        right-text="按钮"
                        left-arrow
                        @click-left="onClickLeft"
                />
            </div>
            <!--新闻详情模块-->
            <div class="newsinfo-container" v-height>
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
        </div>
    </div>
</template>
<script>
    import {ImagePreview} from 'vant';
    import Asynchronous from '@/api/asyc'

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
        },
        mounted() {
            this.getscroll()
        },
        updated() {
            this.getPreview()
        },
        methods: {
            getNewsInfo(aid, callback) {
                Asynchronous({
                    url: '/ndetail',
                    params: {
                        aid,
                    }
                }).then((ret) => {
                    if (ret.code == '200') {
                        callback && callback(ret.data)
                        this.infodata = ret.data
                    }
                }, ((err) => {
                    console.error('加载失败')
                }))
            },
            awesome(e) {
                if (e.target.style.color == 'red') {
                    return
                }
                e.target.style.color = 'red'
                this.infodata.click_count++
            },
            onClickLeft() {
                this.$router.back()
            },
            getPreview() {
                const $this = this
                $('.newsinfo-container img').each((i, item) => {
                    $this.imgarr.push(item.src)
                })
                $('.newsinfo-container img').click(function (e) {
                    let index = 0
                    $this.imgarr.some((item, i) => {
                        if (item == $(this)[0].src) {
                            index = i
                        }
                    })
                    ImagePreview({
                        images: $this.imgarr,
                        startPosition: index,
                        onClose() {
                            // do something
                        }
                    });
                    return false
                })
            },
            getscroll() {
                if (!this.$refs.preview) {
                    window.onscroll = () => {
                        let wscr = document.documentElement.scrollTop
                        if (wscr == 0) {
                            return
                        }
                        this.scrolltop = wscr
                    }
                }

            },
        },
        directives: {
            'height': {
                bind(el, binding) {
                    el.style.height = (document.documentElement.clientHeight - 50) + 'px'
                }
            }
        },
        components: {}
    }
</script>
<style lang="less">
    .goback-to {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
    }

    .root {
        position: fixed;
        width: 100%;
        height: 100%;
        opacity: 0.999;
    }

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


    .goback:hover span {
        color: #4d62c4;
    }


    .newsinfo-container {
        color: #3a3a3a;
        padding: 0 10px;
        padding-top: 15px;
        text-align: left;
        padding-top: 0px;
        overflow: scroll;

        .awesome-info {
            padding-bottom: 70px;
        }


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
            margin: 15px 0 10px 0;
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
