<template>
  <div id="head">
    <div class="logo">
      <img src="../assets/img/logo.f.png" alt="这是logo" />
    </div>
    <div class="top_nav">
      <router-link to="/home">首页</router-link>
      <router-link to="/login">登录</router-link>
      <router-link to="/register">注册</router-link>
    </div>

    <div class="searchA">
      <input type="text" placeholder="请输入想了解的内容..." class="inputBox" v-model="search" />
      <router-link
        :to="{path:'/search',query:{search:search}}"
        tag="button"
        class="searchBtn"
        @click.native="to_search"
      >搜一搜</router-link>
    </div>
  </div>
</template>

<script>
import Bus from "../bus.js";
export default {
  name: "Top",
  data() {
    return {
      search: "",
    };
  },
  methods: {
    to_search() {
      Bus.$emit("sear", this.search);
    },
  },
};
</script>

<style scoped>
#head {
  background: #fff;
  padding-top: 10px;
  box-shadow: 0 2px 6px #999;
  margin-bottom: 10px;
  height: 150px;
  width: 100%;
}
.logo {
  display: inline-block;
  width: 188px;
  height: 74px;
  margin-top: 20px;
  margin-left: 30px;
}
.logo img {
  width: 188px;
  height: 74px;
}
.top_nav {
  padding: 15px 0;
  position: relative;
  width: 100%;
  margin: 0 auto;
  font-family: 微软雅黑;
}

.top_nav a {
  text-decoration: none;
  margin: 0 20px;
  font-weight: bolder;
  padding: 0 10px;
  padding-bottom: 4px;
  display: inline-block;
  border-bottom: 2px solid #fff;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  color: black;
  font-family: 微软雅黑;
  cursor: pointer;
}
.top_nav .router-link-exact-active,
.top_nav a:hover {
  color: rgb(60, 171, 245);
  border-color: rgb(60, 171, 245);
}
.searchA {
  position: relative;
  top: -110px;
  left: 900px;
  width: 600px;
  height: 80px;
}
.inputBox {
  height: 40px;
  width: 400px;
  border: 1px solid #dcdfe6;
  font-size: 15px;
  border-radius: 5px;
  line-height: 40px;
  position: relative;
  outline: none;
  color: #606266;
  display: inline-block;
  font-size: inherit;
  line-height: 40px;
  padding: 0 15px;
}
.inputBox:focus {
  outline: none;
  border-color: skyblue;
}

.searchBtn {
  border: none;
  background-color: skyblue;
  border-radius: 5px;
  height: 40px;
  width: 80px;
  color: white;
  font-size: 15px;
  cursor: pointer;
  outline: none;
  opacity: 0.9;
  position: relative;
  right: 3px;
}

.searchBtn:hover {
  opacity: 1;
  font-weight: bold;
}
</style>>

