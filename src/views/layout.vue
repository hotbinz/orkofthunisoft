<style scoped>
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
    }
    .layout-topnav{
        width: 1300px;
        margin:0px auto;
    }
    .layout-logo{
        width: 70px;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        float: left;
        position: relative;
        top: 15px;
        left: 0px;
        color:#FFF;
        font-size: 18px;
        line-height: 30px;
        text-align: center;
    }
    .layout-logo-text{
        width: 70px;
        height: 30px;
        line-height: 40px;
        float: left;
        position: relative;
        top: 15px;
        left: 3px;
        color:#d7dde4;
    }
    .layout-nav{
        width: 120px;
        float: left;
        margin: 0 auto;
    }
    .layout-assistant{
        width: 300px;
        margin: 0 auto;
        height: inherit;
    }
    .layout-breadcrumb{
        padding: 10px 15px 0;
    }
    .layout-content{
        min-height: 200px;
        width: 1300px;
        margin: 15px auto;
        overflow: hidden;
        border-radius: 4px;
    }
    .layout-content-main{
        padding: 10px;
    }
    .layout-copy{
        text-align: center;
        padding: 10px 0 20px;
        color: #9ea7b4;
    }
    .layout-ceiling-main{
        float: right;
        margin-right: 15px;
        padding-top:11px;
    }
    .layout-ceiling-main a{
        color: #9ba7b5;
    }
    .top-myproject{
        float: left;
        padding: 0 20px;
        position: relative;
    }
    .zIndexNone{z-index: 0;}
    .ivu-menu-vertical.ivu-menu-light{border:#dddee1 solid 1px;border-right: none;}
    .ivu-breadcrumb{float: left;}
    .content-top{height:21px;}
    .ivu-btn-group{float:right;}
</style>
<template>
    <div class="layout">
        <Menu mode="horizontal" theme="dark" active-name="1">
            <div class="layout-topnav">
                <div class="layout-logo">
                    OKRs
                </div>
                <div class="layout-logo-text">
                    Thunisoft
                </div>
                <div class="layout-nav">
                    <Dropdown style="margin-left: 20px" class="top-myproject">                        
                        <Button shape="circle">
                            {{currentProject}}
                            <Icon type="arrow-down-b"></Icon>
                        </Button>
                        <DropdownMenu slot="list">
                            <DropdownItem @click.native="onSelectProject('所有项目')">所有项目</DropdownItem>
                            <template v-for="(data,index) in dataItem">
                            <DropdownItem @click.native="onSelectProject(data.cname)">{{data.cname}}</DropdownItem>
                            </template>
                            <DropdownItem divided @click.native="showNewProjectModal">新建项目</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
                <div class="layout-ceiling-main">
                    <Avatar src="https://i.loli.net/2017/08/21/599a521472424.jpg" />
                </div>
            </div>            
        </Menu>

        <div class="layout-content">
            <Row :gutter="16">
                <Col span="5">
                    <Menu active-name="1" width="auto" class="zIndexNone" :open-names="['1']">
                        <MenuItem name="1"><Icon type="pinpoint"></Icon>我的OKR</MenuItem>
                        <MenuItem name="2"><Icon type="ribbon-b"></Icon>我委派的</MenuItem>
                        <MenuItem name="3">
                            <Icon type="person"></Icon>
                                项目成员
                        </MenuItem>                        
                    </Menu>
                    <!-- 日期-->
                    <Card style="margin-top:15px;">
                        <div style="text-align:center">
                            <h3 style="font-size: 26px;">{{today.yyyyMM}}</h3>
                            <h3 style="font-size: 42px; color:red;">{{today.dd}}</h3>
                            <h3 style="font-size: 26px;">{{today.EEEE}}</h3>
                            </h3>
                        </div>
                    </Card>
                    <Card style="margin-top:15px;">
                        <TimeLine style="margin-top:15px;"></TimeLine>
                    </Card>
                </Col>
                <Col span="19">
                    <div class="content-top">
                        <Breadcrumb>
                            <BreadcrumbItem href="/">Home</BreadcrumbItem>
                            <BreadcrumbItem>我的OKR</BreadcrumbItem>
                        </Breadcrumb>
                        <ButtonGroup size="small" shape="circle">
                            <Button icon="android-apps"></Button>
                            <Button icon="navicon-round"></Button>        
                        </ButtonGroup>
                    </div>
                    <Objectives ref="objectives" style="margin-top:15px;"></Objectives>
                    <div style="text-align: center;padding:30px;">
                        <Button type="info" shape="circle" icon="ios-plus-outline" size="large" @click="showNewObjectiveModal">创建OKR</Button>
                    </div>                    
                </Col>
            </Row>
        </div>
        <div class="layout-copy">
            2017-2017 &copy; THUNISOFT
        </div>
        <NewProjectModal ref="newProjectModal"></NewProjectModal>
        <NewObjectiveModal ref="newObjectiveModal"></NewObjectiveModal>
    </div>
</template>
<script>
    import Objectives from './Objectives.vue'
    import TimeLine from './TimeLine.vue'
    import NewProjectModal from './NewProjectModal.vue'
    import NewObjectiveModal from './NewObjectiveModal.vue'
    export default {
        data() {
            return {currentProject:'所有项目',dataItem:[],today:{yyyyMM:"",dd:"",eeee:""}}
        },
        mounted () {
           this.getAllMyProject ();
           this.getSchedule();
        },
        methods: {
            showNewProjectModal () {
                this.$refs.newProjectModal.show();
            },
            showNewObjectiveModal () {
                this.$refs.newObjectiveModal.show();
            },
            onSelectProject (t,d) {
                this.currentProject = t;
                //console.info(t,d);
            },
            getAllMyProject () {
                this.$http.get(this.Const.ApiURL + "/api/project").then((result)=>{
                    for(var data in result.data) {
                        this.dataItem.push(result.data[data]);
                    }
                });
            },
            getSchedule () {
                this.$http.get(this.Const.ApiURL + "/api/schedule").then((result)=>{
                    this.today = result.data.today;
                });
            }            
        },
        components: {
            Objectives,
            TimeLine,
            NewProjectModal,
            NewObjectiveModal
        }
    }
</script>