<template>
<div class="desktop">
    <h1>Pessoa</h1>
    <div id="formulario" v-show="modoFormulario" v.loading.body="loadingForm" element-loading-text="Carregando...">
        <el-row>
            <drt-button-modo-grade v-on:click="ativarModoGrade()"></drt-button-modo-grade>
            <drt-button-novo v-on:click="novo()"></drt-button-novo>
        </el-row>
        <el-form ref="form" :model="pessoa" label-width="180px">
            <el-form-item label="ID">
                <el-col :span="4">
                    <el-input v-model="pessoa.id" disabled></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="Razão Social\Nome">
                <el-col :span="12">
                    <el-input v-model="pessoa.nome"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="CPF\CNPJ">
                <el-col :span="12">
                    <drt-input-cpf-cnpj v-model="pessoa.cpfCnpj"></drt-input-cpf-cnpj>
                </el-col>
            </el-form-item>
            <el-form-item label="Inscrição Estadual">
                <el-col :span="12">
                    <el-input v-model="pessoa.ie"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="Tipo">
                <el-col :span="3">
                    <el-select v-model="pessoa.tipoPessoa">
                        <el-option
                            v-for="tipo in tiposPessoa"
                            :key="tipo.valor"
                            :label="tipo.descricao"
                            :value="tipo.valor">
                        </el-option>
                    </el-select>
                </el-col>
            </el-form-item>
            <el-form-item label="Data criação">
                <el-col :span="3">
                    <el-date-picker v-model="pessoa.dtCriacao" type="datetime" format="dd/MM/yyyy HH:mm:ss" disabled></el-date-picker>
                </el-col>
            </el-form-item>
            <el-form-item label="Data da última alteração">
                <el-col :span="3">
                    <el-date-picker v-model="pessoa.dtAlteracao" type="datetime" format="dd/MM/yyyy HH:mm:ss" disabled></el-date-picker>
                </el-col>
            </el-form-item>
        </el-form>
        <drt-button-salvar v-on:click="salvar"></drt-button-salvar>
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
        <el-table :data="pessoas" border style="width: 100%">
            <el-table-column prop="id" label="ID" width="70"></el-table-column>
            <el-table-column prop="nome" label="Nome"></el-table-column>
            <el-table-column prop="cpfCnpj" label="CPF\CNPJ"></el-table-column>
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
import DrtInputCpfCnpj from '../shared/input-cpf-cnpj/input-cpf-cnpj.vue'
import DrtButtonSalvar from '../shared/btn-salvar/btn-salvar.vue'
import DrtButtonExcluir from '../shared/btn-excluir/btn-excluir.vue'
import DrtButtonModoGrade from '../shared/btn-modo-grade/btn-modo-grade.vue'
import DrtButtonNovo from '../shared/btn-novo/btn-novo.vue'
import DrtButtonPesquisar from '../shared/btn-pesquisar/btn-pesquisar.vue'
import DrtButtonEditar from '../shared/btn-editar/btn-editar.vue'
import Pessoa from '../../domain/pessoa/Pessoa'
import PessoaService from '../../domain/pessoa/PessoaService'

export default {
    components: {
        'drt-input-cpf-cnpj' : DrtInputCpfCnpj,
        'drt-button-salvar' : DrtButtonSalvar,
        'drt-button-excluir' : DrtButtonExcluir,
        'drt-button-modo-grade' : DrtButtonModoGrade,
        'drt-button-novo' : DrtButtonNovo,
        'drt-button-pesquisar' : DrtButtonPesquisar,
        'drt-button-editar' : DrtButtonEditar
    },
    created() {
        this.service = new PessoaService(this.$http);
        this.buscar();
    },
    data() {
        return {
            filtroEscolhido : '',
            loadingTable : false,
            modoFormulario: false,
            opcoesFiltro: [
                {valor : 'id', descricao: 'ID'},
                {valor : 'nome', descricao: 'Nome'},
                {valor : 'cpfCnpj', descricao: 'CPF/CNPJ'}
            ],
            paginaAtual: 1,
            pessoa: {},
            pessoas: [],
            qtdRegistros : 10,
            qtdRegistrosLocalizados: 0,
            tiposPessoa: [
                {valor: 0, descricao: 'Cliente'},
                {valor: 1, descricao: 'Motorista'},
                {valor: 2, descricao: 'Fornecedor'},
                {valor: 3, descricao: 'Seguradora'}
            ],
            valorFiltro: ''
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
        ativarModoGrade () {
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
                                this.pessoas = page.content;
                                this.qtdRegistrosLocalizados = page.totalElements;
                                this.qtdPaginas = page.totalPages;
                                this.loadingTable = false;
                            }, function(err) {
                                this.loadingTable = false;
                                this.abrirPopUpErro(err, 'Tivemos um problema ao buscar os dados das pessoas.');
                            });
            } else {
                this.service.buscarComPaginacao(this.paginaAtual, this.qtdRegistros)
                    .then(function (page) {
                                    this.pessoas = page.content;
                                    this.qtdRegistrosLocalizados = page.totalElements;
                                    this.qtdPaginas = page.totalPages;
                                    this.loadingTable = false;
                                }, function (err){
                                    this.loadingTable = false;
                                    this.abrirPopUpErro(err, 'Tivemos um problema ao buscar os dados das pessoas.');
                                });
            }
        },
        editar(id) {
            this.ativarModoFormulario();
            this.loadingForm = true;
            this.service
                    .buscarPorId(id)
                        .then(function(pessoa) {
                          this.pessoa = pessoa;
                          this.loadingForm = false;
                        }, function (err) {
                            this.loadingForm = false;
                            this.abrirPopUpErro(err, 'Tivemos um problema ao buscar os dados da pessoa.');
                        });
        },
        excluir(id, nome) {
            this.$confirm('Deseja realmente excluir a pessoa ' + nome + '?', 'Atenção', {
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
                                        message: 'Pessoa excluída com sucesso'
                                    });
                                }, function(err) {
                                    if (this.modoFormulario) {
                                        this.loadingForm = false;
                                    } else {
                                        this.loadingTable = false;
                                    }
                                    this.abrirPopUpErro(err, 'Tivemos um problema ao tentar excluir a pessoa.')
                                });
                                

                    
                }).catch(() => {});
        },
        novaPessoa() {
            return {
                conta : {},
                enderecoPessoa : []
            }
        },
        novo() {
            this.pessoa = this.novaPessoa();
            this.modoFormulario = true;
        },
        salvar() {
            this.loadingForm = true;
            this.service
                    .salvar(this.pessoa)
                        .then( function (pessoa) {
                            this.loadingForm = false;
                            this.pessoa = pessoa;
                            this.$message({
                                message: 'Pessoa salva com sucesso!',
                                type: 'success'
                            })
                            }, function (err) {
                                this.loadingForm = false;
                                this.abrirPopUpErro(err, 'Tivemos um problema ao tentar salvar a pessoa.');
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
