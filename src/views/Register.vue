<template>
  <div id="area">
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
    <button class="mybtn" @click="newUser">注册</button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Register",
  data() {
    return {
      userName: "",
      password: "",
      err_1: "",
      err_2: "",
      ms: 5,
    };
  },
  methods: {
    newUser: function () {
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
        .get("http://vebcoder.cn:9527/api/register", {
          params: {
            userName: this.userName,
            password: this.password,
          },
        })
        .then((res) => {
          if (res.data.code) {
            //alert("注册成功！")
            setInterval(() => {
              this.Tologin();
            }, 1000);
          } else {
            alert("用户名已存在，请重新输入用户名！");
            this.userName = "";
            this.password = "";
          }
        });
    },
    Tologin() {
      if (this.ms > 0) {
        document.getElementById("area").innerHTML =
          "<span id='txt'>恭喜注册成功！" +
          "将于" +
          '<span id="gotime">' +
          this.ms +
          "</span>" +
          "秒后自动跳转至登录页面...</span><button @click='tologinnow' id='tz'>立即跳转</button>";
      } else {
        this.$router.push("/login");
      }
      this.ms--;
    },
    tologinnow() {
      this.$router.push("/login");
    },
  },
};
</script>

<style>
</style>