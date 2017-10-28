<template>
    <div>
    <Modal ref="projectModel" v-model="state"
        title="新建项目"
        :loading="loading"
        :mask-closable="false"
        ok-text= '好了'
        @on-cancel="cancel"
        @on-ok="asyncOK">
        <Form ref="createProjectForm" :model="formItem" :label-width="80">
            <FormItem label="项目名称">
                <Input v-model="formItem.cname" placeholder="请输入项目名称"></Input>
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
                formItem: {
                    cname: ''
                }
            }
        },
        methods: {
            asyncOK () {
                var formData = JSON.stringify(this.formItem);
                this.$http.post(this.Const.ApiURL + "/api/project", formData).then((result)=>{
                     this.state = false;
                     this.formItem.cname="";
                     this.$Message.success('添加成功');
                },(result)=>{                    
                    this.error = true;
                    this.$Modal.remove();
                });
            },
            cancel() {
                this.formItem.cname="";
                this.error = false;
            },
            show () {                
                this.state = true;
            }
        }
    }
</script>