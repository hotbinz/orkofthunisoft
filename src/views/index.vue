<style scoped lang="less">
    .index{
        width: 100%;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        text-align: center;
        h1{
            height: 150px;
            img{
                height: 100%;
            }
        }
        h2{
            color: #666;
            margin-bottom: 200px;
            p{
                margin: 0 0 50px;
            }
        }
        .ivu-row-flex{
            height: 100%;
        }
    }
    .loginError{
         width:280px;
         margin:0px auto;
    }    
</style>
<template>
    <div class="index">
        <Row type="flex" justify="center" align="middle">
            <Col span="24">
                <h1>
                    <img src="../images/logo.png">                    
                </h1>
                <h2>
                    <p v-show="!loginFailed">Welcome to your OKR!</p>       
                    <Avatar shape="square" v-show="isOnUserShow" :src="loginUserAvatar" size="large" />
                    <br />   <br />              
                    <Button type="ghost" v-show="!loginFailed" shape="circle" @click="handleStart">Loading...</Button>
                    <Alert show-icon v-show="loginFailed" class="loginError">
                        登录失败
                        <template slot="desc">{{loginFailedMessage}}</template>
                    </Alert>
                </h2>
            </Col>
        </Row>
    </div>
</template>
<script>
    import CoCallSsoClient from '../libs/cocall-sso';
    export default {        
        data () {
            return {loginFailed:false, loginFailedMessage:"", isOnUserShow:false, loginUserAvatar:"",ssoClient:null}
        },
        methods: {
            handleStart () {             
                var url = (this.$route.query.Rurl) ? this.$route.query.Rurl : "/prod";   
                this.$router.push({ path: url });
            },
            get_login_account (accountList) {
                if(accountList.length == 1) {
                    this.loginToUser(accountList[0]);                                      
                } 
                else { //TODO 多个登录用户选择

                }              
            },
            onError() {
                this.loginFailedMessage = "请先登录Cocall，再刷新本页面";
                this.loginFailed = true;
            },
            loginToUser(account) {//通过token验证登录
                var _this = this;
                var uid = account.jid.substring(0,account.jid.indexOf("@"));
                this.isOnUserShow = true;
                this.loginUserAvatar = window.User.avatar = account.avatar;                
                this.ssoClient.getToken({
                    uid: uid,
                    server: account.server,
                    misid:"OKRsThunisoft",
                    onSuccess:function (data) {
                        _this.$http.post(_this.Const.ApiURL + "/ssologin/quickLogin",{uid:uid,clientToken:data.token},{emulateJSON:true}).then((result)=>{
                            if(result.data == "ok:") {
                                window.User.isLogin = "200";
                                setTimeout(function () {
                                    _this.handleStart();
                                },500);  
                            }                            
                        },(result)=>{
                            console.info("登录失败！");
                        });
                    },
                    onError:function () {
                        _this.loginFailedMessage = "获取token失败";
                        _this.loginFailed = true;
                    }
                });
            }
        },
        mounted(){
            //SSO COCALL 登录            
            var _this = this;
            if(this.ssoClient == null || ssoClient == undefined)
            {
                this.ssoClient = new CoCallSsoClient()
            }                
            this.ssoClient.getAllLoginAccount({
                onSuccess : _this.get_login_account,
                onError : _this.onError
            });   
        }
    }
</script>
