<template>
    <el-dialog title="Procurar Unidade Federativa..." :visible.sync="exibe" size="large">
        <div v-loading.body="loadingTable" element-loading-text="Carregando...">
                
            <el-form :inline="true">
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
                    <el-button type="warning" icon="search" v-on:click="pesquisar()">Pesquisar</el-button>
                </el-form-item>
            </el-form>
            <el-table :data="ufs" border style="width: 100%">
                <el-table-column prop="id" label="ID"></el-table-column>
                <el-table-column prop="descricao" label="Nome"></el-table-column>
                <el-table-column prop="sigla" label="Sigla"></el-table-column>
                <el-table-column width="150">
                    <template scope="scope">
                        <el-button type="sucess" icon="check" v-on:click="selecionar(scope.row)"></el-button>
                    </template>        
                </el-table-column>
            </el-table>
            <div class="block">
                <el-pagination
                    layout="prev, pager, next"
                    :total="qtdRegistrosLocalizados"
                    :page-size="qtdRegistros"
                    :current-page.sync="paginaAtual"
                    @current-change="buscar"
                    >
                </el-pagination>
            </div>
        </div>
    </el-dialog>
</template>
<script>
    import UfService from '../../../domain/uf/UfService';

    export default {
        name: 'DrtDialogPesquisaUf',
        componenteName: 'DrtDialogPesquisaUf',
        created () {
            this.service = new UfService(this.$http);
        },
        data () {
            return {
                ufs : [],
                currentExibe : this.exibe,
                filtroEscolhido : '',
                loadingTable : false,
                opcoesFiltro: [
                    {valor : 'id', descricao: 'ID'},
                    {valor : 'descricao', descricao: 'Nome'},
                    {valor : 'sigla', descricao: 'Sigla'}
                ],
                paginaAtual : 1,
                qtdPaginas : 0,
                qtdRegistros : 5,
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
            buscar () {
                this.loadingTable = true;
                if (this.valorFiltro != '' && this.filtroEscolhido != '') {
                    this.service
                        .buscarComFiltro(this.paginaAtual, this.qtdRegistros, this.filtroEscolhido, this.valorFiltro)
                            .then(function (page) {
                                this.ufs = page.content;
                                this.qtdRegistrosLocalizados = page.totalElements;
                                this.qtdPaginas = page.totalPages;
                                this.loadingTable = false;
                            }, function(err) {
                                this.loadingTable = false;
                                this.abrirPopUpErro(err, 'Tivemos um problema ao buscar os dados das Unidades Federativas.');
                            });
                } else {
                    this.service.buscarComPaginacao(this.paginaAtual, this.qtdRegistros)
                    .then(function (page) {
                                    this.ufs = page.content;
                                    this.qtdRegistrosLocalizados = page.totalElements;
                                    this.qtdPaginas = page.totalPages;
                                    this.loadingTable = false;
                                }, function (err){
                                    this.loadingTable = false;
                                    this.abrirPopUpErro(err, 'Tivemos um problema ao buscar os dados das Unidades Federativas.');
                                });
                }
            },
            pesquisar () {
                this.paginaAtual = 1;
                this.buscar();
            },
            selecionar (uf) {
                this.$emit('ufSelecionada', uf);
                this.$emit('fecharDialogUf');
            }
        },
        props: {
             exibe : Boolean
        }
    }
</script>
<style>

</style>