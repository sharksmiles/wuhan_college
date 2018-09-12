<template>
  <div>
    <div v-if="role==4">
    <GroupTitle>个人概况</GroupTitle>
    <Flexbox :gutter="16">
      <FlexboxItem>
        <swiperLine :data="chart"></swiperLine>
      </FlexboxItem>
    </Flexbox>
    <GroupTitle>今日课程</GroupTitle>
      <myCourse></myCourse>
    </div>
    <div v-else-if="role==3">
      <GroupTitle>班级趋势</GroupTitle>
      <Flexbox :gutter="16">
        <FlexboxItem>
          <swiperLine :data="chart"></swiperLine>
        </FlexboxItem>
      </Flexbox>
      <GroupTitle>班级概况</GroupTitle>
      <Flexbox style="width: 100%">
        <FlexboxItem>
          <chartSwiper :charts="charts"></chartSwiper>
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
          <chartSwiper :charts="chart"></chartSwiper>
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
  import myCourse from "../pages/student/myCourse";
  import  bus from '../../store/eventBus';
  export default {
    components: {GroupTitle, percent, Flexbox, FlexboxItem, chartLine, chartCol, chartSwiper, swiperLine,myCourse},
    data() {
      return {
        siginValue: {},
        chart: [],
        charts:[],
        role:'3',
        xuehao:''
      }
    },
    created(){
    },
    mounted() {
      bus.$on("login",function (xue_hao,role) {
        var _this=this;
        _this.xuehao=xue_hao
        _this.role=role;
        console.log(_this.xuehao,_this.role)
      })
      if(this.role==3) {
        axios('https://www.easy-mock.com/mock/5b902cd275d00c6196a36b94/example/123321#!method=get')
          .then(res => {
            this.chart = res.data.data.chart
        this.charts = res.data.data.charts
      })
      }
      else if(this.role==4){
        axios('https://www.easy-mock.com/mock/5b902cd275d00c6196a36b94/example/123456#!method=get')
          .then(res => {
          this.chart = res.data.data.chart
      })
      }
      else{
        axios('https://www.easy-mock.com/mock/5b47fcbebad3321130bf0ab0/sigin_copy/department/counselor#!method=get')
          .then(res => {
          this.siginValue = res.data.data.percent;
        console.log(res.data);
        this.chart = res.data.data.chart
      })
      }


    }
  }
</script>
