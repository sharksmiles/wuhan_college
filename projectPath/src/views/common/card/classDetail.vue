<template>
  <div class='popContainer'v-if="res==null"><p>正在加载中...</p></div>
  <div v-else>
  <div v-if="error===0" >
    <Swiper height="500px">
      <SwiperItem v-for="item of classList" :key="item.key" v-if="item.title">
        <div>
          <p class="title">第 {{item.title}} 节</p>
        </div>
        <div class="classInfo">
          <p>{{item.class}}</p>
          <p>地&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;点：{{item.location}}</p>
          <p>签到情况：{{item.signin}}/{{item.total}}</p>
        </div>
        <div>
          <x-table :cell-bordered="false">
            <thead>
            <tr>
              <th>姓名</th>
              <th>签到情况</th>
              <th v-model="show">修改</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(student,index) of item.studentList" :key="index">
              <td>{{student.name}}</td>
              <td :style="student.success===0?'':'color:#fa6e57'">
                {{student.success===0?'成功':'失败'}}
              </td>
              <td>
                <div @click="showChange(item.key,index,student.xuehao,student.xqid,student.kcdm,student.zhous,student.days,student.skjc)" style="color: dodgerblue">
                  修改
                </div>
              </td>
            </tr>
            </tbody>
          </x-table>
        </div>
      </SwiperItem>
    </Swiper>
    <div v-if="errors===0">
    <Confirm v-model="show"
             title="签到修正"
             @on-confirm="successChange(confirm.key,confirm.index)"
             dialog-transition="false"
    >
      <p style="text-align:center;">确定切换为
        <span
          :style="confirmStyle">
          {{confirmContent}}
        </span>吗？
      </p>
    </Confirm>
    </div>
    <div v-if="errors===-1" >
      <Confirm title="暂无权限修改" v-model="show" dialog-transition="false"></Confirm>
    </div>
  </div>
    <div v-else style="text-align: center">
      今天没课
    </div>
  </div>
</template>

<script>
  import {getCookie} from '../../../../test/unit/util'
  import {Swiper, SwiperItem, XTable, Confirm, XButton} from 'vux'
  import  bus from '../../../store/eventBus';
  export default {
    components: {
      Swiper,
      SwiperItem,
      XTable,
      Confirm,
      XButton
    },
    props:['gonghao'],
    data() {
      return {
        confirm: {
          index: 0,
          key: 0
        },
        show: false,
        classList: [{
          key: 0,
          title: '',
          class: '',
          location: '',
          signin: 0,
          total: 0,
          studentList: [{}]
        }, {
          key: 1,
          title: '',
          class: '',
          location: '',
          signin: 0,
          total: 0,
          studentList: []
        },
          {
            key: 2,
            title: '',
            class: '',
            location: '',
            signin: 0,
            total: 0,
            studentList: [{}]
          },
          {
            key: 3,
            title: '',
            class: '',
            location: '',
            signin: 0,
            total: 0,
            studentList: [{}]
          }],
        error:-1,
        errors:2,
        res:null,


      }
    },

    computed: {
      confirmStyle() {
        if (this.classList[this.confirm.key].studentList[this.confirm.index].success==1)
          return 'color:#fa6e57 !important'
        else
          return 'color:#7ebc59 !important'
      },
      confirmContent() {
        if (this.classList[this.confirm.key].studentList[this.confirm.index].success===true)
          return '未签到'
        else
          return '已签到'
      }
    },
    created(){
    },
    mounted(){
      var _this=this;
      var qs=require('qs');
      _this.Datetimer=new Date();
      _this.year=_this.Datetimer.getFullYear();
      _this.month=_this.Datetimer.getMonth()+1;
      _this.day=_this.Datetimer.getDate();
      var instance = axios.create({
        headers: {'content-type': 'application/x-www-form-urlencoded'}
      });

      instance.post(`http://qd.whxy.edu.cn/index.php?g=Api&m=Teach&a=teach`,qs.stringify({gonghao:_this.gonghao,dtimes:_this.year+'-'+_this.month+'-'+_this.day}))
        .then(res => {
        _this.error=res.data.error;
      console.log(res.data);
        _this.res=res;
      if(res.data.error==0)
      {
        for(let i=0;i<res.data.class.length;i++)
      {
        _this.classList[i].class=res.data.class[i].join(',')
        _this.classList[i].location=res.data.location[i].join(',');
        _this.classList[i].studentList=res.data.list[i];
        _this.classList[i].total=res.data.list[i].length;
        _this.classList[i].title=res.data.title[i];
      }
      }
    });
      bus.$on("changeDate",function(Datetimer){
        _this.Datetimer=Datetimer;
        _this.year=_this.Datetimer.getFullYear();
        _this.month=_this.Datetimer.getMonth()+1;
        _this.day=_this.Datetimer.getDate();
        console.log(_this.year+'-'+_this.month+'-'+_this.day);
        _this.res=null;

        instance.post(`http://qd.whxy.edu.cn/index.php?g=Api&m=Teach&a=teach`,qs.stringify({gonghao:_this.gonghao,dtimes:_this.year+'-'+_this.month+'-'+_this.day}))
          .then(res => {
          _this.error=res.data.error;
       console.log(res.data);
        _this.res=res;
        if(res.data.error==0)
        {
          for(let i=0;i<res.data.class.length;i++)
          {
            _this.classList[i].class=res.data.class[i].join(',')
            _this.classList[i].location=res.data.location[i].join(',');
            _this.classList[i].studentList=res.data.list[i];
            _this.classList[i].total=res.data.list[i].length;
            _this.classList[i].title=res.data.title[i];
          }
        }
      })
      })
  },
    methods: {
      showChange(key, index,xh,xqid,kcdm,week_num,day_num,keshu) {
//        console.log(xh);
//        console.log(xqid);
//        console.log(kcdm);
//        console.log(week_num);
//        console.log(day_num);
//        console.log(keshu);
        var _this=this;
        var qs=require('qs');
        var instance = axios.create({
          headers: {'content-type': 'application/x-www-form-urlencoded'}
        });
        instance .post(`http://qd.whxy.edu.cn/index.php?g=Api&m=Kao&a=modify`, qs.stringify({xh,xqid,kcdm,week_num,day_num,keshu}))
          .then(res => {
          console.log(res.data);
        _this.errors=res.data.error;
        });

        this.show = true
        let that = this.confirm
        that.key = key
        that.index = index
      },

      successChange(key, index) {

        if(this.errors===-1)
        {
          alert('暂无权限修改！')
          return
        }
        let that = this.classList[key].studentList[index];
          if (that.success===0) {
            that.success = 1
          } else {
            that.success = 0
          }

      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../scss/var";
  .classCard {
    height: 100%;
    padding: 8px 0;
  }
  .classInfo {
    margin: 18px 0;
    line-height: 1.55;

  }
  .title {
    text-align: center;
    color: dodgerblue !important;
    font-size: 1.55em;
    font-weight: 800;
    /*line-height: 1.55;*/

  }
  .vux-swiper-item {
    position: relative;
    overflow: auto;
  }
  div.popContainer{
    position: fixed;
    left: 0;
    right: 0;
    margin:0 auto;
    top:40%;
    background: rgba(0,0,0,0.3);
    height: 120px;
    width: 120px;
  }
  div.popContainer p{
    text-align: center;
    margin-top: 30%
  }

</style>
