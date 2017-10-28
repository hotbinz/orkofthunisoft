<style>
    .demo-badge-alone{
        background: #5cb85c !important;
    }
    .demo-badge-yellow{
        background:#ff9900 !important;
    }
</style>
<template>
    <Row :gutter="16">
        <template v-for="(data,key) in okrlist">
        <Col span="8" :id="'CARD_' + data.cid" style="margin-bottom:15px;">
            <Card>
                <p slot="title"><font style="float:left;">{{data.cname}}</font><Badge :count="data.remain < 0 ? '超期 ' + (Math.abs(data.remain)+1) + ' 天' : '剩余 ' +  data.remain + ' 天'"  style="float:right;" :class-name="data.remain ==0 ? 'demo-badge-yellow' : data.remain < 0 ? '' : 'demo-badge-alone'"></Badge></p>
                <p>完成时间：{{data.dcomplateDate}}</p>
                <p>工作量：{{data.ncomplateDay}}天</p>
                <p>工作内容：{{data.ccentent}}</p>
                <br/>进度
                <Progress :percent="data.nspeed" status="active"></Progress>
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
                this.$http.get(this.Const.ApiURL + "/api/objective").then((result)=>{
                    this.okrlist=result.data;
                });
            }
        }
    }
</script>