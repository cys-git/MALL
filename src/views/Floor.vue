<template>
  <div>
    <div class="type">
      <router-link v-for="(item,index) in typeList" :to="'/floor?type='+item" :key="index">{{item}}</router-link>
    </div>
    <div id="nav">
      <div
        v-for="(item,index) in list"
        :class="{con:index==count}"
        @click="scrollTo(index)"
        :key="index"
      >{{item.type_two}}</div>
    </div>
    <div id="content">
      <div class="floor" v-for="floor in list" :key="floor.type_two">
        <h1 class="type_two">{{floor.type_two}}</h1>
        <ul class="list">
          <li v-for="item in floor.goods" :key="item.Id">
            <router-link :to="'/detail?goodId='+item.Id">
              <img :src="item.img_list_url" alt />
              <h5 class="goods-title">{{item.title}}</h5>
              <div class="price_box">
                <span class="price">￥{{item.price}}</span>
                <div class="scale" v-html="item.mack"></div>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
      <div id="return-top_2">
        <p id="font_2">
          返回
          <br />顶部
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import axios from "axios";
export default {
  name: "Floor",
  data() {
    return {
      typeList: [],
      list: [],
      count: 0,
    };
  },
  created: function () {
    this.getList();
    this.getType();

    window.onscroll = () => {
      let content = document.getElementById("content");
      for (var i = 0; i < content.children.length; i++) {
        let H = window.innerHeight;
        let scrollTop =
          document.body.scrollTop || document.documentElement.scrollTop;
        let offsetTop = content.children[i].offsetTop;
        // 元素自身高度
        let offsetHeight = content.children[i].offsetHeight;
        //console.log(H, scrollTop, offsetTop, offsetHeight);
        // 元素顶部在窗口中线以上  底部在中线以下
        if (
          offsetTop - scrollTop < H / 2 &&
          scrollTop + H / 2 < offsetTop + offsetHeight
        ) {
          // 找到处于视图区域的楼层
          this.count = i;
        }
      }
    };
  },
  mounted() {
    $("#return-top_2").hide();
    // 控制按钮的显示和消失
    $(window).scroll(function () {
      if ($(window).scrollTop() > 300) {
        $("#return-top_2").fadeIn(300);
      } else {
        $("#return-top_2").fadeOut(200);
      }
    });
    // 点击按钮，使得页面返回顶部
    $("#return-top_2").click(function () {
      scrollTo(0, 0);
    });
  },
  methods: {
    getType() {
      axios.get("http://vebcoder.cn:9527/api/getTypeOne").then((res) => {
        this.typeList = res.data;
      });
    },
    getList() {
      // 获取分类列表
      axios
        .get(
          "http://vebcoder.cn:9527/api/goodList?type_one=" +
            this.$route.query.type
        )
        .then((res) => {
          //console.log(res.data);
          var list = [];

          res.data.forEach((item) => {
            // 检测list中是否已经存储了相应二级分类
            var flag = true;
            for (var i = 0; i < list.length; i++) {
              if (list[i].type_two == item.type_two) {
                list[i].goods.push(item);
                flag = false;
              }
            }
            // for循环执行结束 如果flag仍然为true 说明没有存储相应分类
            if (flag) {
              list.push({
                type_two: item.type_two,
                goods: [item],
              });
            }
          });

          // console.log(list)
          this.list = list;
        });
    },
    scrollTo(index) {
      this.count = index;
      console.log(index);
      // 对应主体内容的顶部偏移量
      var content = document.getElementById("content");
      var offsetTop = content.children[index].offsetTop;
      // 设置页面滚动高度
      document.body.scrollTop = offsetTop - 100;
      document.documentElement.scrollTop = offsetTop - 100;
    },
  },
  watch: {
    // 监听路由信息变化
    $route() {
      this.getList();
      //location.reload();
    },
  },
};
</script>

<style>
.floor .type_two {
  color: rgb(83, 190, 233);
}
.list .goods-title {
  font-size: 15px;
  color: rgb(0, 0, 0);
}

.list .goods-title:hover {
  color: rgb(11, 95, 250);
}
</style>