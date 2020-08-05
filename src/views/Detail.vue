<template>
  <div>
    <input type="button" name="Submit" value="←返回" @click="goback" class="go_back" />

    <div id="view" @mousemove="move" @mouseover="flag=true" @mouseout="flag=false">
      <img id="small_pic" :src="selectedImg" alt />
      <div id="mark" v-show="flag" :style="{left:x-50+'px',top:y-50+'px'}"></div>
    </div>
    <div id="box" v-show="flag">
      <img :style="{left:-x*2+100+'px',top:-y*2+100+'px'}" :src="selectedImg" alt />
    </div>

    <div id="imgs">
      <img v-for="item in good.imgs" @click="selectedImg=item" :src="item" :key="item" alt />
    </div>

    <div id="goodsinfo">
      <h2>{{good.title}}</h2>
      <p>{{good.supplier}}</p>
      <span class="price myprice">￥{{good.price}}</span>
      <Star :score="num" @change="changeNum" class="mystar"></Star>
      <button class="pick" @click="showmsg">添加到购物车</button>
    </div>

    <div class="same"></div>
  </div>
</template>

<script>
import Star from "../components/Star.vue";
import axios from "axios";
export default {
  name: "Detail",
  components: {
    Star,
  },
  data() {
    return {
      x: 0,
      y: 0,
      flag: false,
      selectedImg: "",
      good: {},
      num: 4,
    };
  },
  created() {
    // 获取路由中携带的参数信息
    // console.log(this.$route.query)

    axios
      .get(
        "http://vebcoder.cn:9527/api/detail?goodId=" + this.$route.query.goodId
      )
      .then((res) => {
        this.good = res.data[0];
        // 转换图片集合    json字符串转化json对象
        this.good.imgs = JSON.parse(this.good.imgs);
        this.selectedImg = this.good.imgs[0];
      });
  },
  methods: {
    move(e) {
      var scrollTop =
        document.body.scrollTop || document.documentElement.scrollTop;

      var offsetTop = view.offsetTop;
      var offsetLeft = view.offsetLeft;

      var y = scrollTop + e.clientY - offsetTop;
      var x = e.clientX - offsetLeft;

      if (y >= 50 && y <= 190) {
        // box/4,view高-box/4
        this.y = y;
      }
      if (x >= 50 && x <= 190) {
        // box/4,view宽-box/4
        this.x = x;
      }
    },
    changeNum(a) {
      this.num = a;
      //console.log(this.num);
    },
    goback() {
      history.back(-1);
    },
    showmsg() {
      alert("成功加入购物车啦~");
    },
  },
};
</script>

<style>
</style>