<template>
  <div class="container" style="padding:0px 15px">
    <classDetail :gonghao="gonghao"></classDetail>
  </div>
  <!--<div>{{$route.params.gonghao}}</div>-->
</template>

<script>
  import classDetail from '../../common/card/classDetail'
  export default {
    components: {
      classDetail
    },
    data(){
      return{
      }
    },
    created(){
      this.gonghao= this.$route.params.gonghao;
    }
  }
</script>

<style scoped>
  canvas {
    width: 60% !important;
  }

</style>
