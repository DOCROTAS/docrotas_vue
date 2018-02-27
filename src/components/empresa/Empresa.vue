<template>
<div class="desktop">
    <h1>Empresa</h1>

    <div class="desktop">
        <div id="formulario" v-show="modoFormulario" v-loading.body="loadingForm" element-loading-text="Carregando...">
            <el-row>
                <drt-button-modo-grade v-on:click="ativarModoGrade()"></drt-button-modo-grade>
                <drt-button-novo v-on:click="novo()"></drt-button-novo>
            </el-row>
            <el-form ref="form" :model="empresa" label-width="180px">
                <el-form-item label="ID">
                    <el-col :span="4">
                        <el-input v-model="empresa.id" disabled></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="Razão social">
                    <el-col :span="12">
                        <el-input v-model="empresa.razao"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="Nome fantasia">
                    <el-col :span="12">
                        <el-input v-model="empresa.fantasia"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="CNPJ">
                    <el-col :span="12">
                        <drt-input-cpf-cnpj v-model="empresa.cnpj"></drt-input-cpf-cnpj>
                    </el-col>
                </el-form-item>
                <el-form-item label="Inscrição estadual">
                    <el-col :span="12">
                        <el-input v-model="empresa.ie"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="E-mail">
                    <el-col :span="12">
                        <el-input v-model="empresa.email"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="Logradouro">
                    <el-col :span="12">
                        <el-input v-model="empresa.endereco.logradouro"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="Número">
                    <el-col :span="12">
                        <el-input v-model="empresa.endereco.numero"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="Complemento">
                    <el-col :span="12">
                        <el-input v-model="empresa.endereco.complemento"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="Bairro">
                    <el-col :span="12">
                        <el-input v-model="empresa.endereco.bairro"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="CEP">
                    <el-col :span="12">
                        <drt-input-cep v-model="empresa.endereco.cep"></drt-input-cep>
                    </el-col>
                </el-form-item>
                <el-form-item label="Cidade">
                    <el-col :span="12">
                        <el-input v-model="nomeCidade" :readonly="true">
                            <el-button slot="append" icon="search" @click="exibirDialogPesquisaCidade()"></el-button>    
                        </el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="Data criação">
                    <el-col :span="5">
                        <el-date-picker v-model="empresa.dtCriacao" type="datetime" format="dd/MM/yyyy HH:mm:ss" disabled></el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="Data da última alteração">
                    <el-col :span="5">
                        <el-date-picker v-model="empresa.dtAlteracao" type="datetime" format="dd/MM/yyyy HH:mm:ss" disabled></el-date-picker>
                    </el-col>
                </el-form-item>
            </el-form>
            <drt-button-salvar v-on:click="salvar"></drt-button-salvar>
            <drt-button-excluir v-on:click="excluir(empresa.id, empresa.razao)"></drt-button-excluir>
            <drt-dialog-pesquisa-cidade :exibe.sync="exibeDialogPesqCidade" v-on:cidadeSelecionada="alterarCidade" v-on:fecharDialogCidade="fecharDialogCidade"></drt-dialog-pesquisa-cidade>
        </div>
        <div v-show="!modoFormulario" v-loading.body="loadingTable" element-loading-text="Carregando...">
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
            <el-table :data="empresas" border style="width: 100%">
                <el-table-column prop="id" label="ID" width="60"></el-table-column>
                <el-table-column prop="razao" label="Razão Social"></el-table-column>
                <el-table-column prop="fantasia" label="Nome Fantasia"></el-table-column>
                <el-table-column prop="cnpj" label="CNPJ"></el-table-column>
                <el-table-column>
                    <template scope="scope">
                        <drt-button-editar :somenteIcone="true" v-on:click="editar(scope.row.id)"></drt-button-editar>
                        <drt-button-excluir :somenteIcone="true" v-on:click="excluir(scope.row.id, scope.row.razao)"></drt-button-excluir>
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
</div> 
</template>

<script>
import Empresa from '../../domain/empresa/Empresa'
import EmpresaService from '../../domain/empresa/EmpresaService'
import DrtInputCpfCnpj from '../shared/input-cpf-cnpj/input-cpf-cnpj.vue'
import DrtInputCep from '../shared/input-cep/input-cep.vue'
import DrtButtonSalvar from '../shared/btn-salvar/btn-salvar.vue'
import DrtButtonExcluir from '../shared/btn-excluir/btn-excluir.vue'
import DrtButtonModoGrade from '../shared/btn-modo-grade/btn-modo-grade.vue'
import DrtButtonNovo from '../shared/btn-novo/btn-novo.vue'
import DrtButtonPesquisar from '../shared/btn-pesquisar/btn-pesquisar.vue'
import DrtButtonEditar from '../shared/btn-editar/btn-editar.vue'
import DrtDialogPesquisaCidade from '../shared/dialog-pesquisa-cidade/dialog-pesquisa-cidade.vue'

export default {
    components :{
        'drt-input-cpf-cnpj' : DrtInputCpfCnpj,
        'drt-input-cep' : DrtInputCep,
        'drt-button-salvar' : DrtButtonSalvar,
        'drt-button-excluir' : DrtButtonExcluir,
        'drt-button-modo-grade' : DrtButtonModoGrade,
        'drt-button-novo' : DrtButtonNovo,
        'drt-button-pesquisar' : DrtButtonPesquisar,
        'drt-button-editar' : DrtButtonEditar,
        'drt-dialog-pesquisa-cidade' :DrtDialogPesquisaCidade
    },
    computed: {
        nomeCidade : function() {
            if (this.empresa.endereco.cidade.nome) {
                if (this.empresa.endereco.cidade.uf.sigla) {
                    return this.empresa.endereco.cidade.nome + '-' + this.empresa.endereco.cidade.uf.sigla;
                } else {
                    return this.empresa.endereco.cidade.nome;
                }
            }
            return '';
        }
    }, 
    created () {
        this.service = new EmpresaService(this.$http);
        this.buscar();
    },
    data () {
        return {
            empresa : this.novaEmpresa(),
            empresas : [],
            exibeDialogPesqCidade : false,
            filtroEscolhido : '',
            loadingForm : false,
            loadingTable : false,
            modoFormulario : false,
            opcoesFiltro: [
                {valor : 'id', descricao: 'ID'},
                {valor : 'razao', descricao: 'Razão Social'},
                {valor : 'cnpj', descricao: 'CNPJ'}
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
        alterarCidade (cidade) {
            this.empresa.endereco.cidade = cidade;
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
                                this.empresas = page.content;
                                this.qtdRegistrosLocalizados = page.totalElements;
                                this.qtdPaginas = page.totalPages;
                                this.loadingTable = false;
                            }, function(err) {
                                this.loadingTable = false;
                                this.abrirPopUpErro(err, 'Tivemos um problema ao buscar os dados das empresas.');
                            });
            } else {
                this.service.buscarComPaginacao(this.paginaAtual, this.qtdRegistros)
                    .then(function (page) {
                                    this.empresas = page.content;
                                    this.qtdRegistrosLocalizados = page.totalElements;
                                    this.qtdPaginas = page.totalPages;
                                    this.loadingTable = false;
                                }, function (err){
                                    this.loadingTable = false;
                                    this.abrirPopUpErro(err, 'Tivemos um problema ao buscar os dados das empresas.');
                                });
            }
        },
        editar(id) {
            this.ativarModoFormulario();
            this.loadingForm = true;
            this.service
                    .buscarPorId(id)
                        .then(function(empresa) {
                          this.empresa = empresa;
                          this.loadingForm = false;
                        }, function (err) {
                            this.loadingForm = false;
                            this.abrirPopUpErro(err, 'Tivemos um problema ao buscar os dados da empresa.');
                        });
        },
         excluir(id, razao) {  
            this.$confirm('Deseja realmente excluir a empresa ' + razao + '?', 'Atenção', {
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
                                        message: 'Empresa excluída com sucesso'
                                    });
                                }, function(err) {
                                    if (this.modoFormulario) {
                                        this.loadingForm = false;
                                    } else {
                                        this.loadingTable = false;
                                    }
                                    this.abrirPopUpErro(err, 'Tivemos um problema ao tentar excluir  a empresa.')
                                });

                    
                }).catch(() => {});
        },
        exibirDialogPesquisaCidade() {
            this.exibeDialogPesqCidade = true;
        },
        fecharDialogCidade () {
            this.exibeDialogPesqCidade = false;
        },
        formatarCnpj(cnpj) {
            return cnpj + '123';
        },
        novaEmpresa() {
            return {
                endereco : {
                    cidade : {
                        uf : {}
                    }
                }
            }
        },
        novo() {
            this.empresa = this.novaEmpresa();
            this.modoFormulario = true;
        },
        salvar() {
            this.loadingForm = true;
            this.service
                    .salvar(this.empresa)
                        .then( function (empresa) {
                            this.loadingForm = false;
                            this.empresa = empresa;
                            this.$message({
                                message: 'Empresa salva com sucesso!',
                                type: 'success'
                            })
                            }, function (err) {
                                this.loadingForm = false;
                                this.abrirPopUpErro(err, 'Tivemos um problema ao tentar salvar a empresa.');
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
