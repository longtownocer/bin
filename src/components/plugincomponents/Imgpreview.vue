<template>
    <div class="preview-container">

        <div class="close" @click="closepreview">X</div>
        <div class="swiper-container" @click="">
            <div class="swiper-wrapper" style="display: flex;flex-direction: row;align-items: center">
                <div class="swiper-slide" v-for="(item,i) in imgarr" :key="i"><img
                        :src="imgarr[i]"
                        alt="">
                </div>
            </div>
            <!-- 如果需要分页器 -->
            <div class="swiper-pagination"></div>
        </div>

    </div>
</template>
<script>
    import Swiper from 'swiper'

    export default {
        naem: 'preview',
        created() {
            this.sortsrc()
        },
        mounted() {
            new Swiper('.swiper-container', {
                loop: true,
                // 如果需要分页器
                pagination: '.swiper-pagination',
            })

        },
        data() {
            return {}
        },
        methods: {
            closepreview() {
                this.$emit('close')
            },
            sortsrc() {

            }
        },
        props: ['imgarr', 'close']
    }
</script>
<style scoped lang="less">
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
</style>
