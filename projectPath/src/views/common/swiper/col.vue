<template>
  <div>
    <Swiper :height="this.height">
      <SwiperItem v-for="(a,index) in chart" :key="index">
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
    computed: {
      height() {
        return (window.innerWidth > window.innerHeight
          ? window.innerHeight - 54
          : window.innerWidth * 0.707) + 40 + 'px';
      }
    },
    data() {
      return {
        chart: [{
          config: {
            title: '上周班级签到率报表',
            max: 100,
            min: 0
          },
          data: [
            {x: '1501班', y: 80},
            {x: '1502班', y: 50},
            {x: '1503班', y: 66},

          ]
        }, {
          config: {
            title: '上月班级签到率报表',
            max: 100,
            min: 0
          },
          data: [
            {x: '1501班', y: 85},
            {x: '1502班', y: 70},
            {x: '1503班', y: 79},

          ]
        },
          {
            config: {
              title: '本学期班级签到率报表',
              max: 100,
              min: 0
            },
            data: [
              {x: '1501班', y: 75},
              {x: '1502班', y: 60},
              {x: '1503班', y: 79},

            ]
          }
        ]
      }
    }
  }
</script>

<style scoped>

</style>
