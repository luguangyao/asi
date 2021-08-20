<template>
  <main>
    <div class="form">
      <div class="form__cover"></div>
      <div class="form__loader">
        <div class="spinner active">
          <svg class="spinner__circular" viewBox="25 25 50 50">
            <circle
              class="spinner__path"
              cx="50"
              cy="50"
              r="20"
              fill="none"
              stroke-width="4"
              stroke-miterlimit="10"
            ></circle>
          </svg>
        </div>
      </div>
      <div class="form__content">
        <h2>
          <a-icon type="double-left" class="backicon" @click="gohome"></a-icon>
          {{ title }}
        </h2>
        <div v-show="this.displayType == 1">
          <div class="styled-input">
            <a-input
              size="large"
              :placeholder="$t('m.inputAccount')"
              v-model="loginData.account"
            >
              <a-icon type="user" slot="prefix"></a-icon>
            </a-input>
          </div>
          <div class="styled-input">
            <a-input-password
              size="large"
              :placeholder="$t('m.inputPassword')"
              v-model="loginData.password"
            >
              <a-icon type="safety" slot="prefix"></a-icon>
            </a-input-password>
          </div>
          <div class="styled-input" style="border:0px">
            <a-radio-group v-model="loginType" @change="changLoginType">
              <a-radio :value="1" style="color:white"> 普通用户 </a-radio>
              <a-radio :value="2" style="color:white"> 管理员 </a-radio>
            </a-radio-group>
          </div>
          <div class="styled-input">
            <a-input
              size="large"
              :placeholder="'验证码'"
              v-model="loginData.code"
            >
              <a-icon slot="prefix" type="qrcode"></a-icon>
              <template slot="suffix" v-if="this.codeData.image">
                <img
                  :src="'data:image/gif;base64,' + this.codeData.image"
                  alt=""
                  style="width: 100px"
                  @click="getCode()"
                />
              </template>
            </a-input>
          </div>
        </div>
        <div v-show="this.displayType == 2">
          <div class="styled-input">
            <a-input-search
              :placeholder="$t('m.inputAccount')"
              size="large"
              v-model="registData.account"
              @search="checkAccount"
            >
              <a-icon type="user" slot="prefix"></a-icon>
              <a-button slot="enterButton" type="primary"> 确认可用 </a-button>
            </a-input-search>
          </div>
          <div class="styled-input">
            <a-input-password
              size="large"
              :placeholder="$t('m.inputPassword')"
              v-model="registData.password"
            >
              <a-icon type="safety" slot="prefix"></a-icon>
            </a-input-password>
          </div>
          <div class="styled-input">
            <a-input-password
              size="large"
              placeholder="再次输入密码"
              v-model="registData.chkpassword"
            >
              <a-icon type="safety" slot="prefix"></a-icon>
            </a-input-password>
          </div>
        </div>
        <div v-show="this.displayType == 3">
          <div class="styled-input">
            <a-input
              :placeholder="$t('m.inputAccount')"
              size="large"
              v-model="updatePwdData.account"
            >
              <a-icon type="user" slot="prefix"></a-icon>
            </a-input>
          </div>
          <div class="styled-input">
            <a-input-password
              size="large"
              placeholder="输入旧密码"
              v-model="updatePwdData.oldpassword"
            >
              <a-icon type="safety" slot="prefix"></a-icon>
            </a-input-password>
          </div>
          <div class="styled-input">
            <a-input-password
              size="large"
              :placeholder="this.$t('m.inputPassword')"
              v-model="updatePwdData.newpassword"
            >
              <a-icon type="safety" slot="prefix"></a-icon>
            </a-input-password>
          </div>
          <div class="styled-input">
            <a-input-password
              size="large"
              placeholder="再次输入密码"
              v-model="updatePwdData.chkpassword"
            >
              <a-icon type="safety" slot="prefix"></a-icon>
            </a-input-password>
          </div>
        </div>
        <div v-show="displayType == 4">
          <!-- user: idcard-->
          <div class="styled-input">
            <a-input
              size="default"
              :placeholder="$t('m.inputAccount')"
              v-model="userRegistData.idcard"
            >
              <a-icon type="user" slot="prefix"></a-icon>
            </a-input>
          </div>

          <!-- user: password-->
          <div class="styled-input">
            <a-input-password
              size="default"
              :placeholder="$t('m.inputPassword')"
              v-model="userRegistData.password"
            >
              <a-icon type="safety" slot="prefix"></a-icon>
            </a-input-password>
          </div>

          <!-- user: chkPassword-->
          <div class="styled-input">
            <a-input-password
              size="default"
              :placeholder="$t('m.chkPassword')"
              v-model="userRegistData.chkpassword"
            >
              <a-icon type="safety" slot="prefix"></a-icon>
            </a-input-password>
          </div>

          <!-- user: name-->
          <div class="styled-input">
            <a-input
              size="default"
              :placeholder="$t('m.username')"
              v-model="userRegistData.name"
            >
              <a-icon type="user" slot="prefix"></a-icon>
            </a-input>
          </div>

          <!-- user: sex-->
          <div class="styled-input" style="border:0px">
            <a-radio-group v-model="userRegistData.sex" >
              <a-radio :value="true" style="color:white"> {{this.$t('m.m')}} </a-radio>
              <a-radio :value="false" style="color:white"> {{this.$t('m.f')}} </a-radio>
            </a-radio-group>
          </div>

          <!-- user: age -->
          <div class="styled-input_half">
            <a-input-number
              size="small"
              :placeholder="$t('m.age')"
              v-model="userRegistData.age"
            >
            </a-input-number>
          </div>

          <!-- user: phone-->
          <div class="styled-input">
            <a-input
              size="small"
              :placeholder="$t('m.phone')"
              v-model="userRegistData.phone"
            >
            </a-input>
          </div>
        </div> <!-- end of type 4: userRegist -->

        <div style="width: 100%">
          <a-space align="center" size="large">
            <a-button @click="login" size="large" type="primary" ghost>
              {{ this.$t("m.login") }}  </a-button
            >
            <a-button
              @click="this.regist"
              size="large"
              type="primary"
              ghost
              v-if="false"
            >
              {{ this.$t("m.regist") }}   
            </a-button>
            <a-button
              @click="this.updatePwd"
              size="large"
              type="primary"
              ghost
              v-if="false"
            >
              修改密码</a-button
            >
            <a-button
              @click = 'userRegist'
              size = 'large'
              type = 'primary'
              ghost>
              {{ this.$t("m.userRegist") }}
            </a-button>
          </a-space>
        </div>
       
      </div>
      
    </div>
  </main>
</template>
<script>
import LoginNet from "@/network/LoginNet";
const userRegistCodeInfo = new Map([
  [1, '注册成功'],
  [-1, 'idcard为空'],
  [-2, 'idcard已被注册'],
  [-3, '密码为空不符合要求'],
  [-4, '前后密码不一致'],
  [-5, '性别字符超出'],
  [-6, '电话号码格式错误'],
  [-7, '年龄格式错误'],
]);
export default {
  name: "Login",
  data() {
    return {
      title: "授权登录",
      codeData: {codekey:"",code:""},
      loginType:1,
      loginData: {
        account: "",
        password: "",
        code: "",
        codekey: "",
      },
      registData: {
        account: '',
        password: '',
        chkpassword: '',
      },
      updatePwdData: {
        account: "",
        oldpassword: "",
        newpassword: "",
        chkpassword: "",
      },
      userRegistData: {
        idcard: '',
        password: '',
        chkpassword: '',
        name: '',
        sex: false,
        age: '',
        phone: '',
      },
      displayType: 1,
    };
  },
  methods: {
    getCode() {
      switch(this.loginType){
        case 1:
          LoginNet.userGetCode(this.setCode.bind(this));
          break;
        case 2:
          LoginNet.adminGetCode(this.setCode.bind(this));
          break;
      }
    },
    setCode(data) {
      (this.codeData = data), (this.loginData.codekey = this.codeData.uuid);
    },
    changLoginType(){
      this.getCode()
    },
    login() {
      if (this.displayType != 1) {
        this.displayType = 1;
        this.title = "授权登录";
        return;
      }
      switch(this.loginType){
        case 1:
          LoginNet.userLogin(this.loginData,this.loginSuccess.bind(this),this.loginFailure.bind(this))
          break
        case 2:
          LoginNet.login(this.loginData,this.loginSuccess.bind(this),this.loginFailure.bind(this))
          break
      }
    },
    loginSuccess() {
      this.$message.success("登陆成功!! 5 后返回主页", 5, this.gohome);
      this.$store.commit("setLoginData",true,this.loginType)
      this.$store.commit("setLoginType",this.loginType)
      sessionStorage.setItem('loginType',this.loginType)
    },
    loginFailure(reason) {
      this.loginData.code = "";
      this.$message.error("登陆失败: " + reason);
      this.getCode();
    },
    gohome() {
      this.$router.push("/Home");
    },
    regist() {
      if (this.displayType != 2) {
        this.displayType = 2;
        this.title = "用户注册";
        return;
      }
      if (this.registData.password != this.registData.password) {
        this.$message.error("密码不一致!!");
        return;
      }
      LoginNet.doRegister(
        this.registData,
        this.registSuccess.bind(this),
        this.registerFailure.bind(this)
      );
    },
    registSuccess() {
      this.$message.success("注册成功");
    },
    registerFailure() {
      this.$message.success("注册失败");
    },
    checkAccount() {
      LoginNet.checkAccount(
        this.registData.account,
        this.checkAccountSuccess.bind(this),
        this.checkAccountFailure.bind(this)
      );
    },
    checkAccountSuccess() {
      this.$message.success("账户可用");
    },
    checkAccountFailure() {
      this.$message.error("账户不可用");
    },
    updatePwd() {
      if (this.displayType != 3) {
        this.displayType = 3;
        this.title = "修改密码";
        return;
      }
      if (this.updatePwdData.newpassword != this.updatePwdData.chkpassword) {
        this.$message.error("密码不一致!!");
        return;
      }
      LoginNet.updatePwd(
        this.updatePwdData,
        this.updatePwdSuccess.bind(this),
        this.updatePwdFailure.bind(this)
      );
    },
    updatePwdSuccess() {
      this.$message.success("修改密码成功");
    },
    updatePwdFailure() {
      this.$message.error("修改密码失败");
    },
    userRegist () {
      if (this.displayType !== 4) {
        this.displayType = 4;
        this.title = "用户注册中";
        return ;
      }

      // 检测数据，注册申请
      let receive = (code) =>{
        // todo： 根据code为用户展示信息或导航等。
        if (code === 1){
          this.$message.success(userRegistCodeInfo.get(code));
          this.gohome();
        } else {
          this.$message.error(userRegistCodeInfo.get(code));
        }
      }
      let reject = (e) =>{
        console.log(e);
      }
      let error = (err) =>{
        console.log(err);
      }

      LoginNet.userRegist(this.userRegistData, receive, reject, error);
    },
    init() {
      setTimeout(function () {
        document.body.classList.add("on-start");
      }, 100);

      setTimeout(function () {
        document.body.classList.add("document-loaded");
      }, 1800);
    },
  },
  created() {
    this.init();
    this.getCode();
  },
};
</script>
<style scoped>
* {
  box-sizing: border-box;
}
main {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  background-image: url("~@/common/images/background.png");
}
.form {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  position: relative;
  width: 400px;
  height: 500px;
  -ms-flex-negative: 0;
  flex-shrink: 0;
  padding: 20px;
  border-radius: 5px;
}
.form__loader {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  z-index: -4;
  -webkit-transition: all 0.5s ease;
  transition: all 0.5s ease;
}
.form__content {
  text-align: center;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  position: relative;
  opacity: 0;
  -webkit-transform: translateY(10px);
  transform: translateY(10px);
  -webkit-transition: all 0.5s ease 0.7s;
  transition: all 0.5s ease 0.7s;
}
.form__cover {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  z-index: -4;
  border-radius: 7px;
  overflow: hidden;
  -webkit-transition: all 0.3s ease 0.8s;
  transition: all 0.3s ease 0.8s;
  box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
}
.form__cover:after {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  background: #4d317a;
  z-index: -4;
  border-radius: 50%;
  -webkit-transition: all 1.5s ease 0.3s;
  transition: all 1.5s ease 0.3s;
  -webkit-transform: scale(0);
  transform: scale(0);
}
.form__cover:before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  background: white;
  z-index: -5;
  border-radius: 50%;
  -webkit-transition: all 0.5s ease;
  transition: all 0.5s ease;
  -webkit-transform: scale(0);
  transform: scale(0);
}
body.on-start .form__cover:before {
  -webkit-transform: scale(0.15);
  transform: scale(0.15);
}
body.document-loaded .form__loader {
  -webkit-transform: scale(0);
  transform: scale(0);
  opacity: 0;
  visibility: hidden;
}
body.document-loaded .form__content {
  opacity: 1;
  -webkit-transform: none;
  transform: none;
}
body.document-loaded .form__cover {
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
}
body.document-loaded .form__cover:after {
  -webkit-transform: scale(2);
  transform: scale(2);
}
body.document-loaded .form__cover:before {
  -webkit-transition: opacity 0.3s ease 0.8s, -webkit-transform 2s ease;
  transition: opacity 0.3s ease 0.8s, -webkit-transform 2s ease;
  transition: transform 2s ease, opacity 0.3s ease 0.8s;
  transition: transform 2s ease, opacity 0.3s ease 0.8s,
    -webkit-transform 2s ease;
  -webkit-transform: scale(2);
  transform: scale(2);
  opacity: 0;
}
h2 {
  font-size: 40px;
  margin: 15px 0 20px 0;
  letter-spacing: 0.05em;
  color: #714cab;
  font-weight: 700;
}
.styled-button {
  -webkit-appearance: none;
  cursor: pointer;
  font-size: 14px;
  width: 100%;
  padding: 20px;
  outline: none;
  background: none;
  position: relative;
  color: #492e72;
  border-radius: 3px;
  margin-bottom: 25px;
  border: none;
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 0.1em;
  background: #714cac;
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
  overflow: hidden;
}
.styled-button__real-text-holder {
  position: relative;
}
.styled-button__real-text {
  color: transparent;
  display: inline-block;
}
.styled-button__text-holder {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
}
.styled-button__moving-block {
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  overflow: hidden;
}
.styled-button__moving-block.back {
  color: white;
  -webkit-transform: translateX(-100%);
  transform: translateX(-100%);
}
.styled-button__moving-block.back .styled-button__text-holder {
  -webkit-transform: translateX(100%);
  transform: translateX(100%);
}
.styled-button:hover,
.styled-button:active {
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  background: #7a51bb;
}
.styled-button:hover .face,
.styled-button:active .face {
  -webkit-transform: translateX(100%);
  transform: translateX(100%);
}
.styled-button:hover .face .styled-button__text-holder,
.styled-button:active .face .styled-button__text-holder {
  -webkit-transform: translateX(-100%);
  transform: translateX(-100%);
}
.styled-button:hover .back,
.styled-button:active .back {
  -webkit-transform: translateX(0);
  transform: translateX(0);
}
.styled-button:hover .back .styled-button__text-holder,
.styled-button:active .back .styled-button__text-holder {
  -webkit-transform: translateX(0);
  transform: translateX(0);
}
.styled-button:active {
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
}
.styled-input {
  width: 100%;
  position: relative;
  margin-bottom: 25px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 3px;
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
}
.styled-input__circle {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: -2;
  overflow: hidden;
  border-radius: 3px;
}
.styled-input__circle:after {
  content: "";
  position: absolute;
  left: 16.5px;
  top: 19px;
  height: 14px;
  width: 14px;
  z-index: -2;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 0 10px rgba(255, 255, 255, 0);
  -webkit-transition: opacity 1s ease, -webkit-transform 0.6s ease;
  transition: opacity 1s ease, -webkit-transform 0.6s ease;
  transition: transform 0.6s ease, opacity 1s ease;
  transition: transform 0.6s ease, opacity 1s ease, -webkit-transform 0.6s ease;
}
.styled-input__input {
  width: 100%;
  -webkit-appearance: none;
  font-size: 14px;
  outline: none;
  background: none;
  padding: 18px 15px;
  color: #ceafff;
  border: none;
  font-weight: 600;
  letter-spacing: 0.035em;
}
.styled-input__placeholder {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  z-index: -1;
  padding-left: 45px;
  color: white;
}
.styled-input__placeholder-text {
  -webkit-perspective: 500px;
  perspective: 500px;
  display: inline-block;
}
.styled-input__placeholder-text .letter {
  display: inline-block;
  vertical-align: middle;
  position: relative;
  -webkit-animation: letterAnimOut 0.25s ease forwards;
  animation: letterAnimOut 0.25s ease forwards;
  text-shadow: 0 0 5px;
}
.styled-input__placeholder-text .letter.active {
  -webkit-animation: letterAnimIn 0.25s ease forwards;
  animation: letterAnimIn 0.25s ease forwards;
}
.styled-input:hover {
  border-color: rgba(255, 255, 255, 0.4);
}
.styled-input.filled {
  border-color: rgba(255, 255, 255, 0.2);
}
.styled-input.filled .styled-input__circle:after {
  -webkit-transform: scale(37);
  transform: scale(37);
  opacity: 0;
}
@-webkit-keyframes letterAnimIn {
  0% {
    -webkit-transform: translate(0, 0);
    transform: translate(0, 0);
  }
  25% {
    -webkit-transform: translate(0, 10px);
    transform: translate(0, 10px);
    color: red;
  }
  45% {
    -webkit-transform: translate(0, 10px);
    transform: translate(0, 10px);
    opacity: 0;
    color: red;
  }
  55% {
    -webkit-transform: translate(0, 10px);
    transform: translate(0, 10px);
    opacity: 0;
  }
  56% {
    -webkit-transform: translate(-30px, -27px);
    transform: translate(-30px, -27px);
    opacity: 0;
    color: #00ff6b;
  }
  76% {
    color: #00ff6b;
    opacity: 1;
    -webkit-transform: translate(-30px, -27px);
    transform: translate(-30px, -27px);
  }
  100% {
    -webkit-transform: translate(-30px, -27px);
    transform: translate(-30px, -27px);
    opacity: 1;
  }
}
@keyframes letterAnimIn {
  0% {
    -webkit-transform: translate(0, 0);
    transform: translate(0, 0);
  }
  25% {
    -webkit-transform: translate(0, 10px);
    transform: translate(0, 10px);
    color: red;
  }
  45% {
    -webkit-transform: translate(0, 10px);
    transform: translate(0, 10px);
    opacity: 0;
    color: red;
  }
  55% {
    -webkit-transform: translate(0, 10px);
    transform: translate(0, 10px);
    opacity: 0;
  }
  56% {
    -webkit-transform: translate(-30px, -27px);
    transform: translate(-30px, -27px);
    opacity: 0;
    color: #00ff6b;
  }
  76% {
    color: #00ff6b;
    opacity: 1;
    -webkit-transform: translate(-30px, -27px);
    transform: translate(-30px, -27px);
  }
  100% {
    -webkit-transform: translate(-30px, -27px);
    transform: translate(-30px, -27px);
    opacity: 1;
  }
}
@-webkit-keyframes letterAnimOut {
  0% {
    -webkit-transform: translate(-30px, -27px);
    transform: translate(-30px, -27px);
    opacity: 1;
  }
  25% {
    -webkit-transform: translate(-30px, -40px);
    transform: translate(-30px, -40px);
    opacity: 0;
  }
  45% {
    -webkit-transform: translate(0, 10px);
    transform: translate(0, 10px);
    opacity: 0;
  }
  55% {
    -webkit-transform: translate(0, 10px);
    transform: translate(0, 10px);
    opacity: 0;
    color: red;
  }
  56% {
    -webkit-transform: translate(0, 10px);
    transform: translate(0, 10px);
    color: red;
  }
  100% {
    -webkit-transform: translate(0, 0);
    transform: translate(0, 0);
  }
}
@keyframes letterAnimOut {
  0% {
    -webkit-transform: translate(-30px, -27px);
    transform: translate(-30px, -27px);
    opacity: 1;
  }
  25% {
    -webkit-transform: translate(-30px, -40px);
    transform: translate(-30px, -40px);
    opacity: 0;
  }
  45% {
    -webkit-transform: translate(0, 10px);
    transform: translate(0, 10px);
    opacity: 0;
  }
  55% {
    -webkit-transform: translate(0, 10px);
    transform: translate(0, 10px);
    opacity: 0;
    color: red;
  }
  56% {
    -webkit-transform: translate(0, 10px);
    transform: translate(0, 10px);
    color: red;
  }
  100% {
    -webkit-transform: translate(0, 0);
    transform: translate(0, 0);
  }
}
.spinner {
  position: relative;
  margin: auto;
  width: 50px;
  height: 50px;
  -webkit-transition: all 0.2s ease 0s;
  transition: all 0.2s ease 0s;
}
.spinner__circular {
  -webkit-animation: rotate 1.5s linear infinite;
  animation: rotate 1.5s linear infinite;
  -webkit-animation-play-state: paused;
  animation-play-state: paused;
  -webkit-transform-origin: center center;
  transform-origin: center center;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  margin: auto;
}
.spinner__path {
  stroke-dasharray: 1, 200;
  stroke-dashoffset: 0;
  -webkit-animation: dash 1.3s ease forwards 0.5s;
  animation: dash 1.3s ease forwards 0.5s;
  opacity: 0;
  stroke-linecap: round;
  stroke: #7b23ff;
  -webkit-animation-play-state: running;
  animation-play-state: running;
}
@-webkit-keyframes dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
    opacity: 0;
  }
  50% {
    stroke-dasharray: 40, 200;
    opacity: 1;
  }
  100% {
    stroke-dasharray: 125, 200;
    opacity: 1;
  }
}
@keyframes dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
    opacity: 0;
  }
  50% {
    stroke-dasharray: 40, 200;
    opacity: 1;
  }
  100% {
    stroke-dasharray: 125, 200;
    opacity: 1;
  }
}
.backicon {
  transition: all 0.5s;
}
.backicon :hover {
  transform: translateX(-20px);
  transition: all 0.5s;
  cursor: pointer;
}
.style-input_half {
  width: 50%;
  position: relative;
  margin-bottom: 25px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 3px;
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
}
</style>