<template>
  <div>
    <h3 style="text-align:center;padding:16px;background:white">{{table.config.nav}}</h3>
    <x-table :cell-bordered="false" :content-bordered="false" style="background-color:#fff;">
      <thead>
      <tr style="background-color: #F7F7F7">
        <th v-for="title in table.config.title" style="width: 30%; ">{{title}}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="content in table.content" style="border-bottom: 1px solid #e0e0e0">
        <td v-for="item in content">{{item}}</td>
      </tr>
      </tbody>
    </x-table>
  </div>
</template>
<script>
  import {XTable, LoadMore} from "vux";

  export default {
    props: ['table'],
    components: {XTable, LoadMore}
  };
</script>
