<template>
  <div class="container">
    <div v-for="(list,index) of classList" :key='index'>
      <Flexbox class="classCard" :class="cardBg(index)">
        <FlexboxItem :span="1/6">
          <p>{{list.time}}</p>
        </FlexboxItem>
        <FlexboxItem>
          <p>{{list.classname}}</p>
          <p>{{list.location}} {{list.teacher}}</p>
        </FlexboxItem>
        <FlexboxItem :span="1/4">
          <p>{{list.success}}</p>
        </FlexboxItem>
      </Flexbox>
    </div>
    <FlexboxItem :span="1/4" v-show="errors==-1" class="classCard" >
      <p>暂无课程</p>
    </FlexboxItem>
    <!--<div>{{$route.params.xuehao}}</div>-->
  </div>
</template>

<script>
  import {getCookie} from '../../../../test/unit/util'
  import {Flexbox, FlexboxItem, Confirm} from 'vux'
  import  bus from '../../../store/eventBus';

  export default {
    components: {Flexbox, FlexboxItem, Confirm},
    data() {
      return {
        classList: [{
          time: '',
          classname: '',
          teacher: '',
          location: '',
          done: false,
          signin: false,
          signout: false,
          success: ''
        }],
        Datetimer:new Date(),
        xuehao:'',
        year:'',
        month:'',
        day:'',
        errors:0

      }
    },
    created(){
      this.xuehao= this.$route.params.xuehao;
      //this.xuehao =  getCookie('whxy_xuehao');
      this.xuehao=15031103
      console.log(this.xuehao);
    },
    mounted() {
      var _this=this;
      _this.Datetimer=new Date();
      _this.year=_this.Datetimer.getFullYear();
      _this.month=_this.Datetimer.getMonth()+1;
      _this.day=_this.Datetimer.getDate();
      var qs=require('qs');
      var instance = axios.create({
        headers: {'content-type': 'application/x-www-form-urlencoded'}
      });
      instance.post(`http://qd.whxy.edu.cn/index.php?g=Api&m=Kecheng&a=kebiao`,qs.stringify({xuehao:_this.xuehao,year:_this.year, month:_this.month, day:_this.day}))
        .then(res => {
        _this.classList = res.data.data;
     //console.log(res.data);
      _this.errors=res.data.error;
    });
      bus.$on("changeDate",function(Datetimer){
        _this.Datetimer=Datetimer;
        _this.year=_this.Datetimer.getFullYear();
        _this.month=_this.Datetimer.getMonth()+1;
        _this.day=_this.Datetimer.getDate();
        instance.post(`http://qd.whxy.edu.cn/index.php?g=Api&m=Kecheng&a=kebiao`,qs.stringify({xuehao:_this.xuehao,year:_this.year, month:_this.month, day:_this.day}))
          .then(res => {
          _this.classList = res.data.data;
       //console.log(res.data);
        _this.errors=res.data.error
     })
   })
    }
    ,
    methods: {
      cardBg(index) {
        let classList = this.classList[index];

        if (classList.done===true) {
          if (classList.signin===true && classList.signout===true) {
            classList.success = '签到成功';
            return 'bgGreen';
          } else {
            classList.success = '签到失败';
            return 'bgRed';
          }
        } else {
          classList.success = '未开始';
          return ''
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../scss/var";

  .classCard {
    font-size: 0.88em;
    font-weight: 800;
    background: #eeeeee;
    color: $font__black;
    padding-top: 20px;
    padding-bottom: 20px;
    border-radius: 10px;
    justify-content: center;
    text-align: center;
    margin-top: 12px;
  }
  .bgGreen {
    background: $font__green;
    color: #fbfbfb !important;
  }
  .bgRed {
    background: $font__red;
    color: $font__white;
  }
</style>

