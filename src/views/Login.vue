<template>
  <div>
    <p class="myinput1">
      <input
        class="username"
        type="text"
        placeholder="请输入用户名..."
        v-model="userName"
        @input="err_1=''"
      />
      <span class="err_1">{{err_1}}</span>
    </p>
    <p class="myinput2">
      <input
        class="pwd"
        type="password"
        placeholder="请输入密码..."
        v-model="password"
        @input="err_2=''"
      />
      <span class="err_2">{{err_2}}</span>
    </p>
    <button class="mybtn" @click="login">登录</button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Login",
  data() {
    return {
      userName: "",
      password: "",
      err_1: "",
      err_2: "",
    };
  },
  methods: {
    login: function () {
      if (!/^.{3,12}$/.test(this.userName)) {
        this.err_1 = "请确保用户名在3-12位之间！";
        return false;
      }
      if (!/^.{6,12}$/.test(this.password)) {
        this.err_2 = "密码总长度需在6-12位之间哟！";
        return false;
      }
      if (!/^[A-z]\w{5,11}$/.test(this.password)) {
        this.err_2 = "密码需以字母开头，且只含数字、字母、下划线！";
        return false;
      }

      this.getData();
    },
    getData: function () {
      axios
        .get("http://vebcoder.cn:9527/api/login", {
          params: {
            userName: this.userName,
            password: this.password,
          },
        })
        .then((res) => {
          if (res.data.code) {
            alert("登录成功~快去选购吧~");
          } else {
            alert("用户名或密码输入错误，请重新输入！");
            this.userName = "";
            this.password = "";
          }
        });
    },
  },
};
</script>

<style>
</style>