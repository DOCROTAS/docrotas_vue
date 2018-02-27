<<template>
    <div class="desktop">
        <h1>Certificado Digital</h1>
        <div v-loading.body="loadingTable" element-loading-text="Carregando...">
            <el-form :inline="true">
                <el-form-item>
                    <drt-button-novo v-on:click="novo()"></drt-button-novo>
                </el-form-item>
                <el-form-item>
                    <el-input-number size="small" v-model="qtdRegistros"></el-input-number>
                </el-form-item>
                <el-form-item label="Filtrar">
                    <el-select v-model="filtroEscolhido">
                        <el-option 
                            v-for="opcao in opcoesFiltro"
                            :key="opcao.valor"
                            :label="opcao.descricao"
                            :value="opcao.valor">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="valorFiltro" placeholder="O que você procura?"></el-input>
                </el-form-item>
                <el-form-item>
                    <drt-button-pesquisar v-on:click="buscar()"></drt-button-pesquisar>
                </el-form-item>
            </el-form>
            <el-table :data="certificados" border style="width: 100%">
                <el-table-column prop="id" label="ID"></el-table-column>
                <el-table-column prop="nomeArquivo" label="Nome do arquivo"></el-table-column>
                <el-table-column prop="dtVencimentoFormatada" label="Vencimento"></el-table-column>
                <el-table-column>
                    <template scope="scope">
                        <drt-button-info :somenteIcone="true" v-on:click="editar(scope.row.id)"></drt-button-info>
                        <drt-button-excluir :somenteIcone="true" v-on:click="excluir(scope.row.id, scope.row.nomeArquivo)"></drt-button-excluir>
                    </template>
                </el-table-column>
            </el-table>
        </div>  
    </div>
</template>
<script>
import CertificadoService from '../../domain/certificado/CertificadoService'
import DrtButtonExcluir from '../shared/btn-excluir/btn-excluir.vue'
import DrtButtonInfo from '../shared/btn-info/btn-info.vue'
import DrtButtonModoGrade from '../shared/btn-modo-grade/btn-modo-grade.vue'
import DrtButtonNovo from '../shared/btn-novo/btn-novo.vue'
import DrtButtonPesquisar from '../shared/btn-pesquisar/btn-pesquisar.vue'
import DrtButtonSalvar from '../shared/btn-salvar/btn-salvar.vue'

export default {
    components: {
        'drt-button-info' : DrtButtonInfo,
        'drt-button-excluir' : DrtButtonExcluir,
        'drt-button-modo-grade' : DrtButtonModoGrade,
        'drt-button-novo' : DrtButtonNovo,
        'drt-button-pesquisar' : DrtButtonPesquisar,
        'drt-button-salvar' : DrtButtonSalvar
    },
    created() {
        this.service = new CertificadoService(this.$http);
        this.buscar();
    },
    data () {
        return {
            certificado : {},
            certificados : [],
            filtroEscolhido : '',
            loadingForm : false,
            loadingTable : false,
            opcoesFiltro : [
                {valor : 'id', descricao : 'ID'},
                {valor : 'nomeArquivo', descricao : 'Nome do arquivo'}
            ],
            paginaAtual : 1,
            qtdPaginas : 0,
            qtdRegistros : 10,
            qtdRegistrosLocalizados : 0,
            valorFiltro : ''
        }
    },
    methods: {
        abrirPopUpErro(err, titulo) {
            console.log(err);

            this.$alert(titulo + '\n' + err.body.message, 'OPS!', {
                    confirmButtonText: 'OK',
                    type: 'error'
            });
        },
        ativarModoFormulario() {
            this.modoFormulario = true;
        },
        ativarModoGrade() {
            this.modoFormulario = false;
        },
        beforeUploadArquivo() {
            console.log('antes de fazer o upload');
        },
        buscar() {
            this.loadingTable = true;
            if (this.valorFiltro != '' && this.filtroEscolhido != '') {
                this.service
                        .buscarComFiltro(this.paginaAtual, this.qtdRegistros, this.filtroEscolhido, this.valorFiltro)
                            .then(function (page) {
                                this.certificados = page.content;
                                this.qtdRegistrosLocalizados = page.totalElements;
                                this.qtdPaginas = page.totalPages;
                                this.loadingTable = false;
                            }, function(err) {
                                this.loadingTable = false;
                                this.abrirPopUpErro(err, 'Tivemos um problema ao buscar os dados dos certificados.');
                            });
            } else {
                this.service.buscarComPaginacao(this.paginaAtual, this.qtdRegistros)
                    .then(function (page) {
                                    this.certificados = page.content;
                                    this.qtdRegistrosLocalizados = page.totalElements;
                                    this.qtdPaginas = page.totalPages;
                                    this.loadingTable = false;
                                }, function (err){
                                    this.loadingTable = false;
                                    this.abrirPopUpErro(err, 'Tivemos um problema ao buscar os dados dos certificados.');
                                });
            }
        },
        excluir (id, nomeArquivo) {
            this.$confirm('Deseja realmente excluir o certificado ' + nomeArquivo + '?', 'Atenção', {
                confirmButtonText: 'Sim',
                cancelButtonText: 'Não',
                type: 'warning'
            }).then(() =>{
                if (this.modoFormulario) {
                    this.loadingForm = true;
                } else {
                    this.loadingTable = true;
                }
                this.service.excluir(id)
                                .then(function() {
                                    if (this.modoFormulario) {
                                        this.loadingForm = false;
                                    } else {
                                        this.loadingTable = false;
                                    }

                                    if (this.modoFormulario) {
                                        this.novo();
                                    } else {
                                        this.buscar();
                                    }

                                    this.$message({
                                        type: 'success',
                                        message: 'Certificado excluído com sucesso'
                                    });
                                }, function(err) {
                                    if (this.modoFormulario) {
                                        this.loadingForm = false;
                                    } else {
                                        this.loadingTable = false;
                                    }
                                    this.abrirPopUpErro(err, 'Tivemos um problema ao tentar excluir o certificado.')
                                })
            }).catch(() => {});
        },
        handlePreview(file) {
            console.log("teste");
            console.log(file);
        }
    }
}
</script>

<style>
    .desktop {
        margin-left : 10px;
        margin-right : 10px
    }
</style>
