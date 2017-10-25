<style>
    .demo-badge-alone{
        background: #5cb85c !important;
    }
</style>
<template>
    <Row :gutter="16">
        <template v-for="(data,key) in okrlist">
        <Col span="8" :id="'CARD_' + data.CId">
            <Card>
                <p slot="title"><font style="float:left;">{{data.CName}}</font><Badge count="剩余 2天"  style="float:right;" class-name="demo-badge-alone"></Badge></p>
                <p>完成时间：{{data.DComplateDate}}</p>
                <p>工作量：{{data.NComplateDay}}天</p>
                <p>工作内容：{{data.CCentent}}</p>
                <br/>进度
                <Progress :percent="data.NSpeed" status="active"></Progress>
            </Card>
        </Col>
        </template>
    </Row>
</template>
<script>
    export default {
        data () {
            return {
                okrlist:[]
            }
        },
        methods: {
            setOkrList (okrlist) {
                this.okrlist=okrlist;
            }
        }
    }
</script>