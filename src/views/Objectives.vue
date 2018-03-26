<style>
    .demo-badge-alone{
        background: #5cb85c !important;
    }
    .demo-badge-yellow{
        background:#ff9900 !important;
    }
    .cardprogress .ivu-progress-text {
        margin-right: -15px;
    }
    .ivu-card-body .cardrow{margin-top: 10px;margin-bottom: -5px;text-align: center;}
    .ivu-card-body .cardrow .cardbuttom{background-color: #f0f0f0; color:#999;border-color:#f0f0f0;font-size:16px;margin-left:10px;}
    .ivu-card-body .cardrow .cardbuttom:hover{background-color: #57a3f3; color:#FFF;}
    .ivu-card-body .cardrow .more{background-color: #FFF;border-color:#FFF; color:#999;}
    .ivu-card-body .cardrow .more:hover{background-color: #FFF;border-color:#FFF; color:#57a3f3;}
    .ivu-card-body .cardrow .ivu-badge-dot{top: -2px; right: -5px;}
</style>
<template>
    <Row :gutter="16">
        <template v-for="(data,key) in okrlist">
        <Col span="8" :id="'CARD_' + data.cid" style="margin-bottom:15px;">
            <Card>
                <p slot="title">
                    <font style="float:left;">{{data.cname}}</font>
                    <Badge :count="data.remain < 0 ? '超期 ' + Math.abs(data.remain) + ' 天' : '剩余 ' +  data.remain + ' 天'"  style="float:right;" :class-name="data.remain ==0 ? 'demo-badge-yellow' : data.remain < 0 ? '' : 'demo-badge-alone'"></Badge>
                </p>
                <div style="height:50px;">
                    <div style="float:left;">
                        <p>完成时间：{{data.dcomplateDate}}</p>
                        <p>工作量：{{data.ncomplateDay}}天</p>
                    </div>
                    <div style="float:right;" >
                        <Circle :percent="data.nspeed" :size="45">
                            <span class="demo-circle-inner" style="font-size:14px">{{data.nspeed}}%</span>
                        </Circle>
                    </div>
                </div>
                <p>工作内容：{{data.ccentent}}</p>
                <!--<Progress :percent="data.nspeed" class="cardprogress" status="active">进度 {{data.nspeed}}%</Progress>-->
                <p class="cardrow">
                    <Button type="primary" class="cardbuttom" shape="circle" size="small" icon="ios-compose" title="填写进度"></Button>
                    <Badge dot class-name="demo-badge-alone"><Button type="primary" class="cardbuttom" shape="circle" size="small" icon="chatbox-working" title="评论"></Button></Badge>
                    <Button type="primary" class="cardbuttom" shape="circle" size="small" icon="ribbon-b" title="委派给他人"></Button>
                    <Button type="primary" class="cardbuttom more" shape="circle" size="small" icon="more" title="更多"></Button>
                </p>
            </Card>
        </Col>
        </template>
    </Row>
</template>
<script>
    export default {
        created() {
            Hub.$on('reloadObjectives', () => { //Hub接收事件
                this.load();
            });
        },
        data () {
            return {
                okrlist:[]
            }
        },
        mounted () {            
           this.load();
        },
        methods: {
            load() {
                this.$http.get(this.Const.ApiURL + "/api/objective",{params:this.$route.params}).then((result)=>{
                    this.okrlist=result.data;
                });
            }
        }
    }
</script>