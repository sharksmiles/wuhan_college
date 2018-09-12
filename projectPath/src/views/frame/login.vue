<template>
  <div>
  <div class="login" v-if="show">
    <div class="logo">
      <img src="../../img/login.jpg" alt="" class="logo_img">
      <p>武汉学院签到系统</p>
    </div>
    <div class="sign">
      <div class="login_select">
      <p>身份验证:</p>
        <select v-model="selected">
          <option
            v-for="option in options"
            :value="option.value"
          >{{option.text}}</option>
        </select>
      </div>
      <div class="login_input">
      <p>请输入:</p>
     <input type="text" placeholder="请输入学号/工号" v-model="xuehao">
      </div>
    </div>
    <div class="buttons" >
      <button @click="login">登录</button>
    </div>
  </div>
    <div v-show="show1">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import  bus from '../../store/eventBus'

  export default {
    name: 'login',
    data () {
      return {
        selected: '4',
        xuehao:'',
        options: [
          {
            text: '学生',
            value: '4'
          },
          {
            text: '教师',
            value: '3'
          }
        ],
        show:true,
        show1:false
      }
    },
    methods: {
   login(){
      console.log(this.xuehao);
     let xue_hao = this.xuehao
     console.log(this.selected)
     let role=this.selected
     this.show=false;
     this.show1=!this.show;
     bus.$emit("login",xue_hao,role)
   }
    }

  }
</script>

<style scoped>
  body{
    background-color: #fdfdfc;
  }
  .login{
    text-align: center;
  }
  .logo_img{
  margin-top: 10%;
  width: 40%;
}
  .logo p{
    font-size: 18px;
    margin-top: 20px;
    font-weight: bold;
  }
  .sign{
    margin-top: 15px;
    font-size: 14px;

  }
  .login_select{
    margin-bottom: 15px;
    display: flex;
  }
  .login_select p{
   width: 30%;
    display: inline-block;
    text-align: right;
    margin-left: 20%;
    padding-right: 20px;

  }
  .login_select select{
      width: 20%;
    font-size: 14px;
    text-align: left;
    margin-right: 30%;
  }
  .login_input{
    display: flex;
  }
  .login_input p{
    width: 30%;
    display: inline-block;
    margin-left: 20%;
    padding-right: 0;
  }
  .login_input input{
   width: 35%;
   font-size: 14px;
    text-align: center;
  }
  .buttons button{
    margin-top:50px;
    width: 100px;
    border-radius: 5px;
    height: 25px;
    border:1px solid #e0e0e0;
    box-shadow: 2px 2px 5px #888888;
    margin-bottom: 10px;
  }
</style>
