<template>
  <div style="border-bottom: 1px solid #e0e0e0">
    <Flexbox id="topTime">
      <FlexboxItem :span="1/6">
        <x-icon type="ios-arrow-back" size="24" class="icon" @click="setDate(-7)"></x-icon>
      </FlexboxItem>
      <FlexboxItem style="text-align: center">
        <datetime format="MM-DD" v-model="nowTime" @on-confirm="parseTime">
          <h4>{{nowTime}}</h4>
        </datetime>
      </FlexboxItem>
      <FlexboxItem :span="1/6">
        <x-icon type="ios-arrow-forward" size="24" class="icon" @click="setDate(7)"></x-icon>
      </FlexboxItem>
    </Flexbox>
    <div style="padding: 8px;background: #fff">
      <Flexbox>
        <FlexboxItem v-for="n of list.week" :key="n">
          <div class="week">{{n}}</div><!--显示日期-->
        </FlexboxItem>
      </Flexbox>
      <Flexbox>
        <FlexboxItem v-for="(item,index) of this.setWeek" :key="item">
          <div class="week" style="line-height: 2.5"
               :style="nowDate.getDate() == item?'border-bottom: 3px solid #407cb8;color:#407cb8':''">
            <div @click="changeDate(index)">
              {{item}}
            </div>
          </div>
        </FlexboxItem>
      </Flexbox>
    </div>
  </div>
</template>

<script>
  import {Datetime, Group, Flexbox, FlexboxItem, XButton} from 'vux';
   import  bus from '../../store/eventBus';
  export default {
    components: {
      Datetime,
      Group,
      Flexbox,
      FlexboxItem,
      XButton
    },
    data() {
      return {
        list: {
          week: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
          day: [15, 16, 17, 18, 19, 20, 21]
        },
        nowTime: '',
        nowDate: {}
      }
    },
    created() {
      this.nowDate = new Date()
      //console.log(this.nowDate);

      // 获取格式化后的时间
      this.nowTime = `${this.nowDate.getMonth() + 1}月${this.nowDate.getDate()}日`

    },
    computed: {
      // push一个日期列表
      aDay() {
        return 24 * 60 * 60 * 1000
      },
      setWeek() {
        let now = this.nowDate;
        let day = [];
        const aDay = this.aDay
        // 获取到星期戳之前的Date
        for (let i = now.getDay(); i => 0; i--) {
          day[i] = new Date(now.getTime() - (now.getDay() - i) * aDay).getDate()
          if (i === 0) {
            break
          }
        }
        // 获取到星期戳之后的Date
        for (let i = now.getDay() + 1; i < 7; i++) {
          day[i] = new Date(now.getTime() + (i - now.getDay()) * aDay).getDate()
        }
        return day
      }
    },
    methods: {
      parseTime(value) {
        // 可接受数组和Date()对象
        if (typeof (value) === 'string') {
          this.nowTime = `${value.split("-")[0]}月${value.split("-")[1]}日`;
          console.log(this.nowTime+'1233');

          this.nowDate = new Date(`${this.nowDate.getFullYear()}-${value}`)

        } else if (typeof (value) === 'object') {
          this.nowTime = `${value.getMonth()+1}月${value.getDate()}日`
        } else throw error()
      },
      setDate(changeDay) {
        // changeDay为正负
        const aDay = this.aDay;
        this.nowDate = new Date(this.nowDate.getTime() + aDay * changeDay);

          var Datetimer=this.nowDate;
        bus.$emit("changeDate",Datetimer);
        this.parseTime(this.nowDate);
      },
      changeDate(value) {
        let changeDay = value - this.nowDate.getDay();
        this.setDate(changeDay)
      }
    }
  }
</script>

<style scoped>
  #topTime {
    background: #393a3f;
    color: #393a3f;
    text-align: center;
    padding: 8px 0;
    line-height: 100%;
  }

  .vux-flexbox {
    text-align: center;
  }

  .vux-datetime {
    color: white;
    display: block;
  }

  .vux-datetime-value {
    text-align: center !important;
  }

  .weui-cell_access .weui-cell__ft::after {
    content: none !important;
  }

  .week {
    font-weight: 800;
    text-align: center;
    margin: 0 auto;
    line-height: 2;
  }

  .day {
    font-weight: 300;
    border-radius: 50%;
  }

  .icon {
    fill: white;
  }
</style>
