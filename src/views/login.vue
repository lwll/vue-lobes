/**
* @Author: lwsmilence
* @Create time: 2019/6/30 19:21
* @Last Modified time: 2019/6/30 19:21
* @Desc: 登录页
*/

<template>
  <div class="login">
    <section>
      <div class="login-left">
        <Form ref="loginForm" :model="loginParam" :rules="loginRules">
          <FormItem class="logo-item">
            <img src="../assets/image/logo.png">
            <span class="login-title">似花还似非花</span>
          </FormItem>
          <FormItem>
            <span class="slogan"></span>
          </FormItem>
          <FormItem prop="username">
            <Input type="text" v-model="loginParam.username" placeholder="用户名"></Input>
          </FormItem>
          <FormItem prop="password">
            <Input type="password" v-model="loginParam.password" placeholder="密码"></Input>
          </FormItem>
          <FormItem class="login-helper">
            <div class="login-helper-item">
              <Checkbox v-model="rememberMe">记住我</Checkbox>
              <router-link to="">忘记密码？</router-link>
            </div>
          </FormItem>
          <FormItem class="login-tip">
            <span>未注册的用户登录时将自动注册</span>
          </FormItem>
          <FormItem>
            <Button type="primary" size="large" @click="handleLogin">{{buttonText}}</Button>
          </FormItem>
        </Form>
      </div>
      <div class="login-right">
        <img src="../assets/image/cover.png">
      </div>
      <div class="login-shadow"></div>
    </section>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from "vue-property-decorator";
  import {isValidPassword, isValidUsername} from "@/utils/validate";
  import {Form as IForm} from "iview";
  import {UserModule} from "@/store/modules/user";

  const validateUsername = (rule: any, value: string, callback: any) => {
    if (!isValidUsername(value)) {
      callback(new Error("用户名长度在3到30之间！"));
    } else {
      callback();
    }
  };

  const validatePassword = (rule: any, value: string, callback: any) => {
    if (!isValidPassword(value)) {
      callback(new Error("用户名长度在3到30之间！"));
    } else {
      callback();
    }
  };

  @Component
  export default class Login extends Vue {
    loginParam = {
      username: "",
      password: ""
    };
    buttonText = '登录叶瓣';
    rememberMe = false;
    loginRules = {
      username: [{ trigger: "blur", validator: validateUsername}],
      password: [{ trigger: "blur", validator: validatePassword}]
    };

    handleLogin() {
      (this.$refs.loginForm as IForm).validate((valid: any) => {
        if (valid) {
          this.buttonText = '登录中...';
          UserModule.login(this.loginParam).then(() => {
            this.$router.push({path: '/'});
          }).catch((e) => {
            this.$Message.error(e);
          }).finally(() => {
            this.buttonText = '登录叶瓣';
          })
        } else {
          return false;
        }
      });
    }
  }
</script>

<style lang="scss" scoped>
  .login {
    display: flex;
    align-items: center;
    position: fixed;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-size: 100% 100%;
    background: #fcfcfc url("../assets/image/login_bg.png");

    > section {
      display: flex;
      position: relative;
      width: 978.2555208333px;
      height: 550px;
      margin: auto;
      background-color: #FFFFFF;
      box-shadow: 0 3px 3px 0 #DDDDDD1A;

      .login-left {
        display: flex;
        flex-direction: column;
        width: 50%;
        padding: 62px 41px;
        z-index: 1;
        background-color: #FFFFFF;

        .ivu-form-item {
          color: #7A7D77;
          font-weight: 600;
        }

        .logo-item {
          display: flex;
          align-items: baseline;

          .login-title {
            font-size: 16px;
            font-weight: 400;
            color: #141d0e;
          }
        }

        .login-helper {
          margin-bottom: 0;

          .login-helper-item {
            display: flex;
            justify-content: space-between;
          }
        }

        .login-tip {
          display: flex;
        }
      }

      .login-right {
        width: 50%;
        height: 100%;
        z-index: 1;

        img {
          max-height: 100%;
          max-width: 100%;
        }
      }

      .login-shadow {
        position: absolute;
        bottom: -50px;
        height: 100px;
        width: 978px;
        background: url("../assets/image/login_shadow.png");
        background-size: 100% 100%;
      }
    }
  }
</style>
