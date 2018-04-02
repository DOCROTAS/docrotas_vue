<template>
    <div class="desktop">
        <h1>Cidade</h1>
        <div id="formulario" v-show="modoFormulario" v.loading.body="loadingForm" element-loading-text="Carregando...">
            <el-row>
                <drt-button-modo-grade v-on:click="ativarModoGrade()"></drt-button-modo-grade>
                <drt-button-novo v-on:click="novo()"></drt-button-novo>
            </el-row>
            <el-form ref="form" :model="cidade" label-width="180px">
                <el-form-item label="ID">
                    <el-col :span="4">
                        <el-input v-model="cidade.id" disabled></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="Nome">
                    <el-col :span="12">
                        <el-input v-model="cidade.nome"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="UF">
                    <el-col :span="12">
                        <el-input v-model="cidade.uf.descricao" :readonly="true">
                            <el-button slot="append" icon="search" @click="exibirDialogPesquisaUf()"></el-button>    
                        </el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="Código IBGE">
                    <el-col :span="4">
                        <el-input v-model="cidade.codIBGE"></el-input>
                    </el-col>
                </el-form-item>
            </el-form>
            <drt-button-salvar v-on:click="salvar"></drt-button-salvar>
            <drt-button-excluir v-on:click="excluir(cidade.id, cidade.nome)"></drt-button-excluir>
            <drt-dialog-pesquisa-uf :exibe.sync="exibeDialogPesqUf" v-on:ufSelecionada="alterarUf" v-on:fecharDialogUf="fecharDialogUf"></drt-dialog-pesquisa-uf>
        </div>
        <div v-show="!modoFormulario"  v-loading.body="loadingTable" element-loading-text="Carregando...">
            <el-form :inline="true">
                <el-form-item>
                    <drt-button-novo v-on:click="novo()"></drt-button-novo>
                </el-form-item>
                <el-form-item label="Quantidade">
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
            <el-table :data="cidades" border style="width: 100%">
                <el-table-column prop="id" label="ID" width="70"></el-table-column>
                <el-table-column prop="nome" label="Nome"></el-table-column>
                <el-table-column prop="uf.sigla" label="UF" width="60"></el-table-column>
                <el-table-column prop="codIBGE" label="Código IBGE"></el-table-column>
                <el-table-column>
                    <template scope="scope">
                        <drt-button-editar :somenteIcone="true" v-on:click="editar(scope.row.id)"></drt-button-editar>
                        <drt-button-excluir :somenteIcone="true" v-on:click="excluir(scope.row.id, scope.row.nome)"></drt-button-excluir>
                    </template>        
                </el-table-column>
            </el-table>
            <div class="block">
                <el-pagination
                    layout="prev, pager, next"
                    :total="qtdRegistrosLocalizados"
                    :page-size="qtdRegistros"
                    :current-page.sync="paginaAtual"
                    @current-change="buscar">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import Cidade from '../../domain/cidade/Cidade'
import CidadeService from '../../domain/cidade/CidadeService'
import DrtButtonSalvar from '../shared/btn-salvar/btn-salvar.vue'
import DrtButtonExcluir from '../shared/btn-excluir/btn-excluir.vue'
import DrtButtonModoGrade from '../shared/btn-modo-grade/btn-modo-grade.vue'
import DrtButtonNovo from '../shared/btn-novo/btn-novo.vue'
import DrtButtonPesquisar from '../shared/btn-pesquisar/btn-pesquisar.vue'
import DrtButtonEditar from '../shared/btn-editar/btn-editar.vue'
import DrtDialogPesquisaUf from '../shared/dialog-pesquisa-uf/dialog-pesquisa-uf.vue'

export default {
    components: {
        'drt-button-salvar' : DrtButtonSalvar,
        'drt-button-excluir' : DrtButtonExcluir,
        'drt-button-modo-grade' : DrtButtonModoGrade,
        'drt-button-novo' : DrtButtonNovo,
        'drt-button-pesquisar' : DrtButtonPesquisar,
        'drt-button-editar' : DrtButtonEditar,
        'drt-dialog-pesquisa-uf' :DrtDialogPesquisaUf
    },
    created() {
        this.service = new CidadeService(this.$http);
        this.buscar();
    },
    data() {
        return {
            cidade : this.novaCidade(),
            cidades : [],
            exibeDialogPesqUf : false,
            filtroEscolhido : '',
            loadingForm: false,
            loadingTable : false,
            modoFormulario: false,
            opcoesFiltro: [
                {valor : 'id', descricao: 'ID'},
                {valor : 'nome', descricao: 'Nome'},
                {valor : 'codIBGE', descricao: 'Código IBGE'}
            ],
            paginaAtual : 1,
            qtdRegistros : 10,
            qtdRegistrosLocalizados : 0,
            qtdPaginas : 0,
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
        alterarUf (uf) {
            this.cidade.uf = uf;
        },
        ativarModoGrade() {
            this.modoFormulario = false;
            this.buscar();
        },
        ativarModoFormulario() {
            this.modoFormulario = true;
        },
        buscar() {
            this.loadingTable = true;
            if (this.valorFiltro != '' && this.filtroEscolhido != '') {
                this.service
                        .buscarComFiltro(this.paginaAtual, this.qtdRegistros, this.filtroEscolhido, this.valorFiltro)
                            .then(function (page) {
                                this.cidades = page.content;
                                this.qtdRegistrosLocalizados = page.totalElements;
                                this.qtdPaginas = page.totalPages;
                                this.loadingTable = false;
                            }, function(err) {
                                this.loadingTable = false;
                                this.abrirPopUpErro(err, 'Tivemos um problema ao buscar os dados das cidades.');
                            });
            } else {
                this.service.buscarComPaginacao(this.paginaAtual, this.qtdRegistros)
                    .then(function (page) {
                                    this.cidades = page.content;
                                    this.qtdRegistrosLocalizados = page.totalElements;
                                    this.qtdPaginas = page.totalPages;
                                    this.loadingTable = false;
                                }, function (err){
                                    this.loadingTable = false;
                                    this.abrirPopUpErro(err, 'Tivemos um problema ao buscar os dados das cidades.');
                                });
            }
        },
        editar(id) {
            this.ativarModoFormulario();
            this.loadingForm = true;
            this.service
                    .buscarPorId(id)
                        .then(function(cidade) {
                          this.cidade = cidade;
                          this.loadingForm = false;
                        }, function (err) {
                            this.loadingForm = false;
                            this.abrirPopUpErro(err, 'Tivemos um problema ao buscar os dados da cidade.');
                        });
        },
        excluir(id, nome) {
            this.$confirm('Deseja realmente excluir a cidade ' + nome + '?', 'Atenção', {
                confirmButtonText: 'Sim',
                cancelButtonText: 'Não',
                type: 'warning'
                }).then(() => {
                    if (this.modoFormulario) {
                        this.loadingForm = true;
                    } else {
                        this.loadingTable = true;
                    }

                    this.service
                            .excluir(id)
                                .then(function () {
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
                                        message: 'Cidade excluída com sucesso'
                                    });
                                }, function(err) {
                                    if (this.modoFormulario) {
                                        this.loadingForm = false;
                                    } else {
                                        this.loadingTable = false;
                                    }
                                    this.abrirPopUpErro(err, 'Tivemos um problema ao tentar excluir a Cidade.')
                                });
                                

                    
                }).catch(() => {});
        },
        exibirDialogPesquisaUf() {
            this.exibeDialogPesqUf = true;
        },
        fecharDialogUf() {
            this.exibeDialogPesqUf = false;
        },
        novaCidade() {
            return {
                uf : {}
            }
        },
        novo() {
            this.cidade = this.novaCidade();
            this.modoFormulario = true;
        },
        salvar() {
            this.loadingForm = true;
            this.service
                    .salvar(this.cidade)
                        .then( function (cidade) {
                            this.loadingForm = false;
                            this.cidade = cidade;
                            this.$message({
                                message: 'Cidade salva com sucesso!',
                                type: 'success'
                            })
                            }, function (err) {
                                this.loadingForm = false;
                                this.abrirPopUpErro(err, 'Tivemos um problema ao tentar salvar a cidade.');
                            })
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
