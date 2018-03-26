<template>
    <div>
    <Modal ref="createProjectModel" v-model="state"
        title="新建OKR"
        :loading="loading"
        :mask-closable="false"
        ok-text= '好了'
        @on-cancel="cancel"
        @on-ok="asyncOK">
        <Form :model="formItem" ref="objectiveForm" :label-width="80" :rules="ruleValidate">
            <FormItem label="任务线" prop="pname">
                <Input v-model="formItem.pname" placeholder="请选择任务线"></Input>
            </FormItem>
            <FormItem label="任务名称" prop="cname">
                <Input v-model="formItem.cname" placeholder="请输入名称"></Input>
            </FormItem>
            <FormItem label="完成日期" prop="dcomplateDate">
                <DatePicker  v-model="formItem.dcomplateDate" format="yyyy年MM月dd日" type="date" placeholder="选择日期" :options="options_date" style="width: 200px"></DatePicker>
            </FormItem>
            <FormItem label="工作量">
                <InputNumber v-model="formItem.ncomplateDay" :max="10" :min="0" :step="0.5"></InputNumber>
            </FormItem>
            <FormItem label="工作内容" prop="ccentent">
                <Input  v-model="formItem.ccentent" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></Input>
            </FormItem>
        </Form>
    </Modal>    
    </div>
</template>
<script>
    export default {
        data () {
            return {    
                state: false,
                loading: true,
                options_date: {
                    disabledDate (date) {
                        return date && date.valueOf() < Date.now() - 86400000;
                    }
                },
                formItem: {
                },
                ruleValidate: {
                    pname: [
                        { required: true, message: '任务线不能为空', trigger: 'blur' }
                    ],
                    cname: [
                        { required: true, message: '名称不能为空', trigger: 'blur' }
                    ],
                    dcomplateDate: [
                        { required: true,type: 'date', message: '完成日期不能为空', trigger: 'change' }
                    ],
                    ccentent: [
                        { required: true, message: '工作内容不能为空', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            asyncOK () {
                this.$refs["objectiveForm"].validate((valid) => {
                    if (valid) {
                        this.formItem.cparentId = 0;
                        var formData = JSON.stringify(this.formItem);
                        this.$http.post(this.Const.ApiURL + "/api/objective", formData).then((result)=>{
                            this.$refs["objectiveForm"].resetFields();
                            Hub.$emit('reloadObjectives');
                            this.state = false;
                            this.$Message.success('添加成功');
                        },(result)=>{ 
                            this.$Message.error('服务器错误');
                        });
                    }
                    else {
                        this.loading = false;                        
                    }                    
                    setTimeout(h=>{
                        this.loading = true;
                    },10);
                });
            },
            cancel() {
                this.$refs["objectiveForm"].resetFields();
            },
            show () {          
                this.state = true;
            }
        }
    }
</script>