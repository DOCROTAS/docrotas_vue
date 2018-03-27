<template>
    <el-dialog title="Inserir certificado" :visible.sync="exibe" size="large">
        <el-upload
            class="upload-demo"
            ref="upload"
            action="http://localhost:8180/certificado/teste"
            :auto-upload="false">
            <el-button slot="trigger" size="small" type="primary">select file</el-button>
            <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">upload to server</el-button>
            <div class="el-upload__tip" slot="tip">jpg/png files with a size less than 500kb</div>
        </el-upload>
    </el-dialog>
</template>
<script>
    export default {
        name: 'DrtDialogInputCertificado',
        componenteName: 'DrtDialogInputCertificado',
        created () {

        },
        data () {
            return {
                currentExibe: this.exibe,
                isSaving : false,
                isInitial : true,
                uploadFieldName : ''
            }
        },
        methods : {
            submitUpload() {
                this.$refs.upload.submit();
            }
        },
        props: {
            exibe: Boolean
        }
    }
</script>
<style>

</style>