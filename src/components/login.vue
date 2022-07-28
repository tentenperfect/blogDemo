<template>
  <div class="login">
    <div class="back"></div>
    <div class="main animate__animated animate__zoomInDown">
      <div class="main-left">
        <h2>New World Blog</h2>
        <p>与我们保持联系，请登录您的账号，进入New world</p>
        <span>还没有New World 账号 ?
          <el-button style="float: right; padding: 3px 0"
                     type="text"
                     @click="changetype">{{ type == "login" ? "去注册" : "去登陆" }}</el-button>
        </span>
      </div>
      <div class="main-right">
        <el-card shadow="none">
          <div slot="header"
               class="clearfix">
            <span>{{ type == "login" ? "登录" : "注册" }}</span>
          </div>
          <div class="text item">
            <el-form :model="ruleForm"
                     status-icon
                     :rules="rules"
                     ref="ruleForm"
                     class="demo-ruleForm"
                     label-width="auto">
              <el-form-item label="用户名"
                            prop="username">
                <el-input v-model="ruleForm.username"
                          autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="密码"
                            prop="pass">
                <el-input type="password"
                          v-model="ruleForm.pass"
                          autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="确认密码"
                            prop="checkPass"
                            v-if="type == 'register'">
                <el-input type="password"
                          v-model="ruleForm.checkPass"
                          autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button class="submit-btn"
                           @click="submitForm('ruleForm')">{{
                  type == "login" ? "登录" : "注册"
                }}</el-button>
                <el-button class="reset-btn"
                           @click="resetForm('ruleForm')">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",

  data () {
    var checkUsername = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("用户名不能为空"));
      }
      setTimeout(() => {
        if (value.length > 10) {
          callback(new Error("用户名长度不能超过10"));
        } else {
          callback();
        }
      }, 1000);
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    return {
      ruleForm: { username: "", pass: "", checkPass: "" },
      rules: {
        username: [{ validator: checkUsername, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
      },
      type: "login",
    };
  },
  computed: {},
  methods: {
    changetype () {
      if (this.type == "login") {
        this.type = "register";
      } else if (this.type == "register") {
        this.type = "login";
      }
      this.resetForm("ruleForm");
    },

    submitForm (formName) {
      console.log(this.$refs[formName].validateField(this.rules));
      this.$refs[formName].validate(async (valid) => {
        console.log(valid);
        if (valid) {
          this.$loading({
            text: "请稍等！正在处理登录的请求数据",
            fullscreen: true,
          });
          if (this.type == "login") {
            await this.$store.dispatch("user/login", {
              username: this.ruleForm.username,
              pass: this.ruleForm.pass,
            });
            if (sessionStorage.getItem("blogToken")) {
              this.$router
                .push({
                  name: "index",
                })
                .catch((err) => {
                  console.error("路由跳转出现错误啦  " + err);
                });
            } else {
              this.$message({
                type: "error",
                message: "用户名与密码不匹配",
              })
            }
            this.$loading().close();
          } else if (this.type == "register") {
            console.log(this.type);
            await this.$store.dispatch("user/register", this.ruleForm);
            this.$message({
              type: "info",
              message: "注册成功！",
            });
            this.type = "login";
          }
          this.$loading().close();
        } else {
          console.log("error submit!!");
          this.$router.push({ name: "login" })
          this.$loading().close();
        }
      });
    },
    resetForm (formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style scoped>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.clearfix .el-button {
  color: #fff;
  margin: 0 16px;
}
.login {
  display: flex;
  height: 100vh;
  width: 100vw;
  justify-content: center;
  align-items: center;
  background: linear-gradient(45deg, var(--color0), hsl(204, 70%, 63%));
}
.main {
  display: flex;
  height: 480px;
  width: 900px;
  border: 1px solid #fff;
  justify-content: space-between;
  border-radius: 10px;
  overflow: hidden;
}
.main-left .el-button {
  color: #fff;
}
.el-input {
  width: 300px;
}
.el-card {
  display: flex;
  backdrop-filter: blur(6px);
  width: 480px;
  height: 480px;
  background: transparent;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 0;
}
.main-left {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 480px;
  width: 420px;
}
.main-left h2 {
  margin-bottom: 10px;
}
.main-left span {
  margin: 20px 0;
}
.main-right {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: #f5f6f0;
}
.submit-btn {
  background: #4ec9b0;
}
.submit-btn:hover {
  color: #fff;
}
.reset-btn {
  border: 1px solid #4ec9b0;
}
.reset-btn:hover {
  color: #4ec9b0;
}
</style>