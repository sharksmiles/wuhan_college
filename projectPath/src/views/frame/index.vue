<template>
  <div>
    <div v-if="role==3">
    <GroupTitle>个人概况</GroupTitle>
    <Flexbox :gutter="16">
      <FlexboxItem>
        <swiperLine :data="chart"></swiperLine>
      </FlexboxItem>
    </Flexbox>
    <GroupTitle>今日课程</GroupTitle>
      <myCourse></myCourse>
    </div>
    <div v-else="role==4">
      <GroupTitle>班级趋势</GroupTitle>
      <Flexbox :gutter="16">
        <FlexboxItem>
          <swiperLine :data="chart"></swiperLine>
        </FlexboxItem>
      </Flexbox>
      <GroupTitle>班级概况</GroupTitle>
      <Flexbox>
        <FlexboxItem>
          <chartSwiper></chartSwiper>
        </FlexboxItem>
      </Flexbox>
    </div>
    <div v-else>
      <GroupTitle>今日情况</GroupTitle>
      <Flexbox :gutter="16" class="bgWhite">
        <FlexboxItem>
          <percent :data="siginValue"></percent>
        </FlexboxItem>
      </Flexbox>
      <GroupTitle>校园概况</GroupTitle>
      <Flexbox :gutter="16">
        <FlexboxItem>
          <swiperLine :data="chart"></swiperLine>
        </FlexboxItem>
      </Flexbox>
      <GroupTitle>系部概况</GroupTitle>
      <Flexbox>
        <FlexboxItem>
          <chartSwiper></chartSwiper>
        </FlexboxItem>
      </Flexbox>
    </div>
  </div>
</template>

<script>
  import {GroupTitle, Flexbox, FlexboxItem} from "vux";
  import swiperLine from "../common/swiper/line";
  import chartLine from "../common/chart/line";
  import chartCol from "../common/chart/col";
  import percent from "../common/chart/percent";
  import chartSwiper from "../common/swiper/col";
  import myCourse from "../pages/student/myCourse"
  export default {
    components: {GroupTitle, percent, Flexbox, FlexboxItem, chartLine, chartCol, chartSwiper, swiperLine,myCourse},
    data() {
      return {
        siginValue: {},
        chart: [],
        role:'4'
      }
    },
    mounted() {
      if(this.role==4) {
        axios('https://www.easy-mock.com/mock/5b902cd275d00c6196a36b94/example/123456#!method=get')
          .then(res => {
            this.siginValue = res.data.data.percent
            this.chart = res.data.data.chart
          })
      }
        if(this.role==3){
          axios('https://www.easy-mock.com/mock/5b902cd275d00c6196a36b94/example/123321 #!method=get')
            .then(res => {
              this.chart = res.data.data.chart
            })
      }
    }
  }
</script>
