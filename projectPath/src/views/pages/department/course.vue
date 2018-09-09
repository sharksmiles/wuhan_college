<template>
  <div>
    <search :searchArry="searchArry"></search>
    <div v-for="item in data.percents">
      <p style="text-align: center">{{item.class}}班</p>
      <percent :data="item" ></percent>
    </div>

    <Table :data="data.table"></Table>
  </div>
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
          percents: {},
          chart: [],
          table: [
            {
              config: {nav: "", title: []},
              content: []
            }
          ]
        }
      }
    },
    mounted() {
      axios('https://www.easy-mock.com/mock/5b902cd275d00c6196a36b94/example/123456#!method=get')
        .then(res => {
          this.data.percents = res.data.data.percents
          this.data.chart.push(...res.data.data.chart)
          this.data.table = res.data.data.table
        })
    },
    computed: {
      searchArry() {
        let data = this.data.table[0].content, arr = [];
        for (let item of data) {
          arr.push(item[0]);
        }
        return arr;
      }
    }
  }
</script>
