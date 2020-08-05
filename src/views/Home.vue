<template>
  <div>
    <div class="type">
      <router-link v-for="(item,index) in typeList" :to="'/floor?type='+item" :key="index">{{item}}</router-link>
    </div>

    <div class="banner" @mouseover="stop" @mouseout="start">
      <transition v-for="(item,index) in banners" :name="move" :key="index">
        <img v-show="x==index" :src="item" />
      </transition>
      <div class="left" @click="prev">&lt;</div>
      <div class="right" @click="next">&gt;</div>
    </div>

    <ul class="list" id="goods">
      <li v-for="(items,index) in list" :key="index">
        <router-link :to="'/detail?goodId='+items.Id">
          <img class="goodImg" src="../assets/img/laayload.gif" alt />
          <h5 class="item_title">{{items.title}}</h5>
          <div class="price_box">
            <span class="price">￥{{items.price}}</span>
            <div class="scale" v-html="items.mack"></div>
          </div>
        </router-link>
      </li>
    </ul>
    <div id="return-top">
      <p id="font">
        返回
        <br />顶部
      </p>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import axios from "axios";
export default {
  name: "Home",
  data() {
    return {
      typeList: [],
      banners: [
        //不用require包裹路径的话，无法渲染图片
        require("../assets/img/a.jpg"),
        require("../assets/img/b.jpg"),
        require("../assets/img/c.jpg"),
        require("../assets/img/d.jpg"),
        require("../assets/img/e.jpg"),
      ],
      x: 0,
      list: [],
      move: "right_move",
      timer: null,
      flag: true,
      page: 0,
    };
  },
  created() {
    this.getType();
    this.start();
    this.getList();
    window.addEventListener("scroll", this.scrollHandle); //只绑定事件，并未执行scrollHandle函数
  },
  mounted() {
    $("#return-top").hide();
    // 控制按钮的显示和消失
    $(window).scroll(function () {
      if ($(window).scrollTop() > 300) {
        $("#return-top").fadeIn(300);
      } else {
        $("#return-top").fadeOut(200);
      }
    });
    // 点击按钮，使得页面返回顶部
    $("#return-top").click(function () {
      scrollTo(0, 0);
    });
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.scrollHandle); //组件销毁前移除监听scroll 防止影响全局
    //console.log("11111111");
  },
  methods: {
    prev: function () {
      if (this.flag) {
        this.flag = false;
        this.move = "right_move";
        this.x--;
        if (this.x < 0) {
          this.x = this.banners.length - 1;
        }
        setTimeout(() => {
          this.flag = true;
        }, 500);
      }
    },
    next: function () {
      if (this.flag) {
        this.flag = false;
        this.move = "left_move";
        this.x++;
        if (this.x > this.banners.length - 1) {
          this.x = 0;
        }
        setTimeout(() => {
          this.flag = true;
        }, 500);
      }
    },
    start() {
      //触发计时器
      this.timer = setInterval(() => {
        this.next();
      }, 2000);
    },
    stop() {
      //停止计时器
      clearInterval(this.timer);
    },
    getType: function () {
      axios.get("http://vebcoder.cn:9527/api/getTypeOne").then((res) => {
        this.typeList = res.data;
      });
    },
    getList: function (page) {
      page = page || 1;
      axios
        .get("http://vebcoder.cn:9527/api/goodList?page=" + page)
        .then((res) => {
          if (res.data.length) {
            this.list = this.list.concat(res.data);
          } else {
            alert("我是有底线的哟~");
          }

          this.$nextTick(() => {
            this.scrollHandle(); //视图更新后才执行scollHandle函数
          });
        });
    },
    scrollHandle() {
      var scrollTop =
        document.body.scrollTop || document.documentElement.scrollTop;
      var H = window.innerHeight;
      var goodImg = document.getElementsByClassName("goodImg");
      for (let i = 0; i < goodImg.length; i++) {
        var offsetTop = goodImg[i].offsetTop;
        if (scrollTop + H > offsetTop) {
          goodImg[i].src = this.list[i].img_list_url;
        }
      }

      var offsetTop = goods.offsetTop;
      var offsetHeight = goods.offsetHeight;
      console.log(offsetTop, offsetHeight, scrollTop, H);
      if (offsetTop + offsetHeight - 5 <= scrollTop + H) {
        this.page++;

        this.getList(this.page);
      }
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
