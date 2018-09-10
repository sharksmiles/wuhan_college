<template>
  <Table :data="data.table"></Table>
</template>

<script>

  import chartLine from "../../common/swiper/line.vue";
  import percent from "../../common/chart/percent";
  import search from "../../common/card/search";
  import Table from "../../common/swiper/table.vue";

  export default {
    components: {chartLine, percent, search, Table},
    data() {
      return {
        data: {
          percent: {},
          chart: [],
          table: [
            {
              config: {
                nav: "",
                title: []
              },
              content: []
            }
          ]
        }
      }
    },
    mounted() {
      axios('https://www.easy-mock.com/mock/5b902cd275d00c6196a36b94/example/class#!method=get')
        .then(res => {
          this.data.table = res.data.data.table
      console.log(this.data.table);
    })
    }
  }
</script>
