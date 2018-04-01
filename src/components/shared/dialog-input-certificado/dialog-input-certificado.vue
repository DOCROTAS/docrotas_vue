<template>
    <el-dialog title="Inserir certificado" :visible.sync="exibe" size="large">
        <div id="formulario" v-show="modoUpload">
            <el-upload
                class="upload-demo"
                ref="upload"
                action="http://localhost:8180/certificado"
                :data="data"
                :auto-upload="false"
                :on-success="sucesso"
                :on-error="erro">
                <el-button slot="trigger" size="small" type="primary">Encontrar o arquivo</el-button>
                <el-form ref="form" label-width="180px">
                    <el-form-item label="Senha">
                        <el-col :span="4">
                            <el-input v-model="data.senha"></el-input>
                        </el-col>
                    </el-form-item>
                </el-form>
                <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">Salvar</el-button>
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
                data : {senha : ''},
            }
        },
        methods : {
            submitUpload() {
                this.$refs.upload.submit()
            },
            sucesso(v) {
                this.$emit('fecharDialogInputCertificado');
            },
            erro(v) {
                this.$alert(v.message, 'OPS!', {
                    confirmButtonText: 'OK',
                    type: 'error'
                });
            }
        },
        props: {
            exibe: Boolean
        }
    }
</script>
<style>

</style>