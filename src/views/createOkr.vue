<template>
    <div>
    <Modal ref="createProjectModel" v-model="state"
        title="新建OKR"
        :loading="loading"
        :mask-closable="false"
        ok-text= '好了'
        @on-cancel="cancel"
        @on-ok="asyncOK">
        <Form :model="formItem" ref="createOkrForm" :label-width="80" :rules="ruleValidate">
            <FormItem label="名称" prop="CName">
                <Input v-model="formItem.CName" placeholder="请输入名称"></Input>
            </FormItem>
            <FormItem label="完成日期" prop="DComplateDate">
                <DatePicker v-model="formItem.DComplateDate" format="yyyy年MM月dd日" type="date" placeholder="选择日期" :options="options_date" style="width: 200px"></DatePicker>
            </FormItem>
            <FormItem label="工作量">
                <InputNumber v-model="formItem.NComplateDay" :max="10" :min="0" :step="0.5"></InputNumber>
            </FormItem>
            <FormItem label="工作内容" prop="CCentent">
                <Input v-model="formItem.CCentent" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></Input>
            </FormItem>
        </Form>
        <Alert type="error" v-show="error" show-icon>名字错误，有重复</Alert>
    </Modal>    
    </div>
</template>
<script>
    export default {
        data () {
            return {    
                state: false,error: false,
                loading: true,
                options_date: {
                    disabledDate (date) {
                        return date && date.valueOf() < Date.now() - 86400000;
                    }
                },
                formItem: {
                    CName: ''
                },
                ruleValidate: {
                    CName: [
                        { required: true, message: '名称不能为空', trigger: 'blur' }
                    ],
                    DComplateDate: [
                        { required: true,type: 'date', message: '完成日期不能为空', trigger: 'change' }
                    ],
                    CCentent: [
                        { required: true, message: '工作内容不能为空', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            asyncOK () {
                this.$refs["createOkrForm"].validate((valid) => {
                    if (valid) {
                        this.$Message.success('提交成功!');
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                });
                // var formData = JSON.stringify(this.formItem);
                // this.$http.post("/api/project", formData).then((result)=>{
                //      this.state = false;
                //      this.formItem.CName = "";
                //      this.$Message.success('添加成功');
                // },(result)=>{                    
                //     this.error = true;
                //     this.$Modal.remove();
                //     // this.$refs.createProjectModel.remove();
                // });
            },
            cancel() {
                this.error = false;
            },
            show () {                
                this.state = true;
            }
        }
    }
</script>