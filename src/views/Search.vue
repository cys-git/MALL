<template>
  <div>
    <ul class="list" id="goods">
      <li v-for="(items,index) in resultList" :key="index">
        <router-link :to="'/detail?goodId='+items.Id">
          <img class="goodImg" :src="items.img_list_url" alt />
          <h5 class="item_title">{{items.title}}</h5>
          <div class="price_box">
            <span class="price">￥{{items.price}}</span>
            <div class="scale" v-html="items.mack"></div>
          </div>
        </router-link>
      </li>
    </ul>
    <h2 v-if="isShowTip">没有搜索到匹配结果</h2>
  </div>
</template>

<script>
import axios from "axios";
import Bus from "../bus.js";
export default {
  name: "Search",
  data() {
    return {
      list: [],
      resultList: [],
      isShowTip: false,
    };
  },
  created() {
    let search = this.$route.query.search;
    //console.log(this.search);
    if (search == "") {
      alert("请输入要搜索的内容~");
      return;
    }
    this.getList(search);
  },
  mounted() {
    Bus.$on("sear", (val) => {
      //console.log("----->", val);
      if (val == "") {
        alert("请输入要搜索的内容~");
        return;
      }
      this.getList(val);
    });
  },
  methods: {
    getList(search) {
      this.resultList = [];
      axios.get("http://vebcoder.cn:9527/api/goodList").then((res) => {
        this.list = res.data;
        //console.log("已请求数据----->", res.data);
        this.list.forEach((item) => {
          if (
            item.title.indexOf(search) > -1 ||
            item.type_one.indexOf(search) > -1 ||
            item.type_two.indexOf(search) > -1
          ) {
            this.isShowTip = false;
            this.resultList.push(item);
            //console.log(this.isShowTip, this.resultList.length);
          }
        });
        if (this.resultList.length == 0) {
          this.isShowTip = true;
          //console.log("gg");
        }
      });
    },
  },
};
</script>

<style scoped>
.item_title {
  color: black;
  font-size: 15px;
}
.item_title:hover {
  color: rgb(11, 95, 250);
  font-size: 15px;
}
</style>>
