<template>
    <div id="root">
        <!--新闻列表导航头-->
        <div id="top" ref="tabbar">
            <div class="swiper-container" id="nav">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="(item,i)  in  newslist" :key="i">
                        <span :class="{'first':i==0}">{{item}}</span>
                    </div>
                    <div class="bar">
                        <div class="color"></div>
                    </div>
                </div>
            </div>
        </div>
        <!--新闻频道列表-->
        <div class="swiper-container" id="page">
            <div class="swiper-wrapper">
                <div class="swiper-slide slidepage index" v-for="(item,index) in newslist">
                    <div class="hole">
                        <router-link :to="'/home/newsInfo/'+list.aid" class="newslist-info"
                                     v-show="!isLoading[index].nomore" v-for="(list,i) in lists[index]"
                                     :key="i" tag="div">
                            <div class="left">
                                <p class="n-title">{{list.title}}</p>
                                <div class="left-top">
                                    <span>来自:<i>{{list.source}}</i></span>
                                    <span class="send_time">发表时间:<i>{{list.pub_time|formattiem|formatdate}}</i></span>
                                </div>
                                <div class="left-bottom">
                                    <span class="reply">评论: <i>{{list.reply_count}}</i></span>
                                    <span class="click_count">点击数: <i>{{list.click_count}}</i></span>
                                </div>
                            </div>
                            <div class="right">
                                <img :src="list.headpic" alt="">
                            </div>
                        </router-link>
                        <div class="nomore" v-show="isLoading[index].nomore">没有更多关于此频道的信息</div>
                        <div class="load" v-show="!isLoading[index].nomore"
                             :class="[{'topshow':lists[index].length==0}]">
                            <van-loading color="#ff3f46"/>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import slide from '@/js/plugins/slider-plugin'
    import Asynchronous from '@/api/asyc'
    import SliderBound from '@/js/plugins/SliderBound'

    export default {
        data() {
            return {
                newslist: ['娱乐', '军事', '汽车', '财经', '笑话', '体育', '科技', '感情', '头条'],
                activeIndex: 0,
                offsets: [1, 1, 1, 1, 1, 1, 1, 1, 1],
                lists: [[], [], [], [], [], [], [], [], []],
                isLoading: [
                    {status: false, nomore: false},
                    {status: false, nomore: false},
                    {status: false, nomore: false},
                    {status: false, nomore: false},
                    {status: false, nomore: false},
                    {status: false, nomore: false},
                    {status: false, nomore: false},
                    {status: false, nomore: false},
                    {status: false, nomore: false}],
                listPosition: []
            }
        },
        watch: {
            activeIndex(n, l) {
                if (n !== 0 && this.lists[n].length == 0) {
                    this.getSongsList(n + 1, this.offsets[n])
                }
            }
        },
        methods: {
            getSongsList(cid, page, callback) {
                Asynchronous({
                    url: '/nlist?callback',
                    params: {
                        cid,
                        page,
                        psize: 20
                    }
                }).then((ret) => {
                    if (ret.code == '200') {
                        if (ret.data.list == 0) {
                            return this.$set(this.isLoading[cid - 1], 'nomore', true)
                        }
                        this.$set(this.lists, cid - 1, this.lists[cid - 1].concat(ret.data.list))
                    }
                    callback && callback()
                })
            },
            LoadMore(cid, i, next) {  // cid : 频道数   i: 当前活动项索引
                this.offsets[i] += 1
                this.getSongsList(cid, this.offsets[i], (() => {
                    next && next()
                }))
            },
            Slide(that) {
                SliderBound($('.swiper-slide-active')[1], {
                    touchmove(el, event, defit) {
                        if (Math.abs(el.scrollTop + el.offsetHeight - el.firstElementChild.offsetHeight) < 1) {
                            if (defit.Longitudinaldeficit < 0) {
                                if (Math.abs(defit.Longitudinaldeficit) < 40) {
                                    el.firstElementChild.style.transform = `translateY(${defit.Longitudinaldeficit}px)`
                                } else if (Math.abs(defit.Longitudinaldeficit) >= 40) {
                                    el.firstElementChild.style.transform = 'translateY(-40px)'
                                }
                            }
                        }
                    },
                    touchend(el, event, defit) {
                        if (Math.abs(el.scrollTop + el.offsetHeight - el.firstElementChild.offsetHeight) < 1) {
                            if (defit.Longitudinaldeficit < 0) {
                                if (Math.abs(defit.Longitudinaldeficit) < 40) {
                                    el.firstElementChild.style.transform = 'translateY(0px)'
                                } else if (Math.abs(defit.Longitudinaldeficit) >= 40) {
                                    if (!that.isLoading[that.activeIndex].status) {
                                        that.isLoading[that.activeIndex].status = true
                                        that.LoadMore(that.activeIndex + 1, that.activeIndex, (() => {
                                            el.firstElementChild.style.transform = 'translateY(0px)'
                                            that.isLoading[that.activeIndex].status = false
                                        }))
                                    }
                                }
                            }
                        }
                    }
                })
            }
        },
        created() {
            this.getSongsList(1, this.offsets[0])
        },
        mounted() {
            slide.setSlider((id) => {
                //把活动页的索引第一时间赋给activeIndex
                this.activeIndex = id
            })
        },
        updated() {
            this.Slide(this)
        },
        beforeRouteLeave(to, from, next) {
            this.listPosition = []
            $('.index').each((index, el) => {
                this.listPosition.push({scroll: el.scrollTop})
            })
            next()
        },
        activated() {
            if (!this.listPosition.length == 0) {
                $('.index').each((index, el) => {
                    $(el).scrollTop(this.listPosition[index].scroll)
                })
            }
        }
    }
</script>
<style scoped lang="less">
    .topshow {
        top: 70px;
    }


    .slidepage {
        position: relative;
    }

    #root {
        position: fixed;
        width: 100%;
        height: 100%;
        opacity: 0.999; /*  根元素添加 opacity防止 移动端url栏上滑隐藏  使其一直固定 */
    }

    #page {
        position: absolute;
        width: 100%;

        .slidepage {
            overflow: scroll;
            background: #fff;

            .hole {
                padding-top: 45px;
                padding-bottom: 50px;
                transition: transform 0.4s ease;
            }

            .nomore {
                font-size: 14px;
                padding-top: 50px;
                letter-spacing: 1px;
                color: #767676;
            }

            .load {
                position: absolute;
                width: 100%;
                z-index: 999;
                height: 40px;
                line-height: 40px;

                .van-loading {
                    span {
                        box-sizing: border-box;
                        padding: 3px;
                        border-radius: 50%;
                        background-color: rgba(255, 255, 255, 0.84);
                        border: 0.5px solid rgba(157, 167, 204, 0.91);
                    }
                }
            }
        }
    }


    #top {
        height: 45px;
        /*display: flex;*/
        align-items: center;
    }

    .first {
        color: rgba(234, 28, 81, 0.93);
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
</style>
