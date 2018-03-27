<template>
    <el-dialog title="Inserir certificado" :visible.sync="exibe" size="large">
        <div id="formulario" v-show="modoUpload">
            <el-upload
                class="upload-demo"
                ref="upload"
                action="http://localhost:8180/certificado"
                :data="data"
                :auto-upload="false">
                <el-button slot="trigger" size="small" type="primary">Encontrar o arquivo</el-button>
                <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">Upload para o servidor</el-button>
                <div class="el-upload__tip" slot="tip"></div>
            </el-upload>
        </div>
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
                modoUpload : true,
                uploadFieldName : '',
                data : {senha : '123456'}
            }
        },
        methods : {
            submitUpload() {
                this.$refs.upload.submit();
                this.modoUpload = false;
            }
        },
        props: {
            exibe: Boolean
        }
    }
</script>
<style>

</style>