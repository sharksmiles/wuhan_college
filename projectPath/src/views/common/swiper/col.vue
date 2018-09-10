<template>
  <div>
    <Swiper :height="this.height">
      <SwiperItem v-for="(a,index) in charts" :key="index">
        <chartCol :chart="a"></chartCol>
      </SwiperItem>
    </Swiper>
  </div>
</template>

<script>
  import {Swiper, SwiperItem} from 'vux'
  import chartCol from '../chart/col'

  export default {
    components: {chartCol, Swiper, SwiperItem},
    props:['charts'],
    computed: {
      height() {
        return (window.innerWidth > window.innerHeight
          ? window.innerHeight - 54
          : window.innerWidth * 0.707) + 40 + 'px';
      }
    },
    data() {
      return {

      }
    }
  }
</script>

<style scoped>

</style>
