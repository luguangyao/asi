<template>
  <div>
    <a-tabs :default-active-key="this.selected" tab-position="top">
      <template slot="tabBarExtraContent">
        <div>
          <h1>{{selected}}</h1>
         
        </div>
      </template>
      <a-tab-pane :key="me.name" :tab="me.name" v-for="me in this.menu.children">
        <UserInfoDataJoin :title="$t(me.display)" :showData="dataSet[me.name]" :needBut="butSet[me.name] || []" />
      </a-tab-pane>

    </a-tabs>
  </div>
</template>
<script>
  import UserInfoNet from "@/network/UserInfoNet";
  import UserInfoDataJoin from '@/components/function/UserInfoDataJoin';
  const changeInfoMessage = [
    [-5, '性别字符超出'],
    [-6, '电话号码格式错误'],
    [-7, '年龄格式错误'],
    [-1, '性别字符超出'],
    [1, '成功'],
  ];
  const changeInfoMap = new Map(changeInfoMessage);
  const changePassMessage = [
    [1, '更改成功'],
    [-1, '登陆账号为空'],
    [-2, '旧密码为空'],
    [-3, '新密码为空'],
    [-4, '前后密码不一致'],
  ];
  const changePassMap = new Map(changePassMessage);

  let testing = false;

  function myLog(e) {
    if (testing) console.log(e);
  }
  myLog

  export default {
    name: "UserInfo",
    components: {
      UserInfoDataJoin
    },
    props: {
      selected: {
        type: String,
        required: true,
      },
    },
    methods: {
      async userInfo() {
        return UserInfoNet.displayUserInfo().then((res) => {
          return res && res.data;
        }, (e) => {
          myLog(e);
        }).catch((e) => {
          myLog(e);
        });
      },
      async changeInfo(nInfo) {
        return UserInfoNet.updateUserInfo(nInfo).then((res) => {
          return res && res.data;
        }, (e) => {
          myLog(e);
        }).catch(e => {
          myLog(e);
        });
      },
      async changePwd(nPwd) {
        return UserInfoNet.updatePwd(nPwd).then((res) => {
          return res && res.data;
        }, (e) => {
          myLog(e);
        }).catch(e => {
          myLog(e);
        });
      },
      formData(name, data) {
        let nd = [];
        switch (name) {
          case this.menu.children[0].name: {
            let obj = {
              ...data
            };
            delete obj.password;
            for (let key of Object.keys(obj)) {
              nd.push({
                name: key,
                display: `m.${key}`,
                value: obj[key],
                changeAble: false,
              });
            }
            break;
          }
          case this.menu.children[1].name: {
            let obj = {
              ...data
            };
            delete obj.password;
            delete obj.idcard;
            for (let key of Object.keys(obj)) {
              let _o= {
                name: key,
                display: `m.${key}`,
                value: obj[key],
                changeAble: true,
              };

              if (key == 'sex') {
                _o.radio = true;
                _o.selectList = [{
                  value: 'm',
                  key: 1,
                  display: 'm'
                }, {
                  value: 'f',
                  key: 2,
                  display: 'f'
                }];
              }

              nd.push(_o);
            }
            break;
          }
          case this.menu.children[2].name: {
            nd = [{
              name: "oldpassword",
              display: "m.oldPassword",
              value: "",
              changeAble: true,
              needCover: true,
            }, {
              name: "newpassword",
              display: "m.newPassword",
              value: "",
              changeAble: true,
              needCover: true,
            }, {
              name: "chkpassword",
              display: "m.chkPassword",
              value: "",
              changeAble: true,
              needCover: true,
            }, {
              name: "idcard",
              value: data.idcard,
              hidden: true,
            }]
            break;
          }
          default:
            break;
        }
        this.dataSet[name] = nd;
      },
      formBut() {
        let that = this;
        this.butSet[this.menu.children[0].name] = [];
        this.butSet[this.menu.children[1].name] = [{
          name: "submit",
          span: 12,
          display: "m.btnUserInfoChange",
          callback: async (td) => {
            let code = await that.changeInfo(td);
            if (code === 1) {
              this.$message.success(changeInfoMap.get(code))
              this.$router.push("/personal/userInfo");
            }
            else {
              this.$message.error(changeInfoMap.get(code))
            }
            await that.initData();
          }
        }];
        this.butSet[this.menu.children[2].name] = [{
          name: "changePass",
          span: 12,
          offset: 6,
          display: "m.btnPasswordChange",
          callback: async (td) => {
            let code = await that.changePwd(td);
            if (code == 1){
              this.$message.success(changePassMap.get(code));
              this.$router.push("/personal/userInfo");
            }
            else {
              this.$message.error(changePassMap.get(code))
            }
            await that.initData();
          }
        }];
      },
      async initData() {
        let that = this;
        let data = await this.userInfo();
        this.menu.children.forEach((item) => {
          delete that.dataSet[item.name];
          that.formData(item.name, data);
        });
        this.$forceUpdate();
        // console.log(this.dataSet[this.menu.children[0].name]);
      }
    },
    data() {
      return {
        menu: this.$store.state.personalMenuList[0],
        butSet: {},
        dataSet: {},
      };
    },
    async created() {
      // console.log("created")
      let that = this;
      this.formBut();
      let data = await this.userInfo();
      this.menu.children.forEach((item) => {
        that.formData(item.name, data);
      });
      this.$forceUpdate();
    },
  };
</script>
<style scoped>
</style>