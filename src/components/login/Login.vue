<template>
    <div class="desktop">
        <h1>CT-e</h1>

        <div class="desktop">
            <div id="formulario" v-show="modoFormulario"  v-loading.body="loadingForm" element-loading-text="Carregando...">
                <el-row class="barra">
                        <el-button class="btn-grade" icon="menu" v-on:click="ativarModoGrade()">Grade</el-button>
                        <el-button type="info" icon="plus" v-on:click="novo()">Novo</el-button>
                        <el-button type="danger" icon="delete" v-on:click="excluir(cte.id, cte.numero)">Excluir</el-button>
                        <el-button type="success" icon="check" v-on:click="salvar()">Salvar</el-button>
                        <el-button style="background-color: orange; color: white" icon="upload2" v-on:click="novo()">Transmitir</el-button>
                        <el-button style="background-color: #6600cc; color: white" icon="document" v-on:click="novo()">Imprimir DACTE</el-button>
                        <el-button style="background-color: #0000ff; color: white" type="success" icon="message" v-on:click="novo()">Enviar por E-mail</el-button>
                </el-row>
                <el-form ref="form" :inline="true" :model="cte" label-width="80px" class="form" label-position="left">
                    <el-form-item label="ID">
                        <el-col>
                            <el-input v-model="cte.id" disabled></el-input>
                         </el-col>
                    </el-form-item>
                    <el-form-item label="Série">
                        <el-col>
                            <el-input v-model="cte.serie"></el-input>
                         </el-col>
                    </el-form-item>
                    <el-form-item label="Número">
                        <el-col>
                            <el-input v-model="cte.numero"></el-input>
                         </el-col>
                    </el-form-item>
                </el-form>
                <div class="title-form">Pessoas</div>
                <el-form :inline="false" label-width="80px" label-position="left" class="form">                    
                    <el-form-item label="Empresa">
                        <el-col>
                            <el-input v-model="cte.empresa.fantasia" :readonly="true">
                                <el-button slot="append" icon="search" @click="exibirDialogPesquisaEmpresa()"></el-button>    
                            </el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="Remetente">
                        <el-col>
                            <el-input v-model="cte.remetente.nome" :readonly="true">
                                <el-button slot="append" icon="search" @click="exibirDialogPesquisaRemetente()"></el-button>    
                            </el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="Destinatario">
                        <el-col>
                            <el-input v-model="cte.destinatario.nome" :readonly="true">
                                <el-button slot="append" icon="search" @click="exibirDialogPesquisaDestinatario()"></el-button>    
                            </el-input>
                        </el-col>
                    </el-form-item>
                </el-form>
                <div class="title-form">Valores</div>
                <el-form :inline="true" label-width="140px" label-position="left" class="form">
                    <el-form-item label="Valor Frete">
                        <el-col >
                            <el-input v-model="cte.vlrFrete"></el-input>
                         </el-col>
                    </el-form-item>
                    <el-form-item label="Valor Mercadoria">
                        <el-col >
                            <el-input v-model="cte.vlrMercadoria"></el-input>
                         </el-col>
                    </el-form-item>
                    <el-form-item label="Base do ICMS">
                        <el-col >
                            <el-input v-model="cte.baseCalculo"></el-input>
                         </el-col>
                    </el-form-item>
                    <el-form-item label="Alíquota de ICMS">
                        <el-col >
                            <el-input v-model="cte.aliquota"></el-input>
                         </el-col>
                    </el-form-item>
                    <el-form-item label="Valor de ICMS">
                        <el-col >
                            <el-input v-model="cte.vlrIcms"></el-input>
                         </el-col>
                    </el-form-item>
                </el-form>
                <div class="title-form">Carga</div>
                <el-form :inline="true" label-width="120px" label-position="left" class="form">
                    <el-form-item label="Valor Mercadoria">
                        <el-col >
                            <el-input v-model="cte.vlrMercadoria"></el-input>
                         </el-col>
                    </el-form-item>
                    <el-form-item label="Produto">
                        <el-col >
                            <el-input v-model="cte.produto"></el-input>
                         </el-col>
                    </el-form-item>
                    <el-form-item label="CFOP">
                        <el-col >
                            <el-input v-model="cte.cfop.id"></el-input>
                         </el-col>
                    </el-form-item>
                </el-form>
                <div class="title-form">Transmissão</div>
                <el-form :inline="false" label-width="160px" label-position="left" class="form">
                    <el-form-item label="Chave de Acesso">
                        <el-col :span="10">
                            <el-input v-model="cte.chaveAcesso" disabled="true"></el-input>
                            </el-col>
                    </el-form-item>
                    <el-form-item label="Protoloco Lote">
                        <el-col :span="8">
                            <el-input v-model="cte.protocoloLote" disabled="true"></el-input>
                         </el-col>
                    </el-form-item>
                    <el-form-item label="Data Protocolo Lote">
                        <el-col :span="4">
                            <el-date-picker v-model="cte.dtProtocoloLote" type="datetime" format="dd/MM/yyyy HH:mm:ss" disabled></el-date-picker>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="Protoloco Autorização">
                        <el-col :span="8">
                            <el-input v-model="cte.protocoloAutorizacao" disabled="true"></el-input>
                         </el-col>
                    </el-form-item>
                    <el-form-item label="Data Protocolo Autorização">
                        <el-col :span="4">
                            <el-date-picker v-model="cte.dtProcolocoloAutorizacao" type="datetime" format="dd/MM/yyyy HH:mm:ss" disabled></el-date-picker>
                        </el-col>
                    </el-form-item>
                </el-form>
                <drt-dialog-pesquisa-empresa :exibe.sync="exibeDialogPesqEmpresa" v-on:empresaSelecionada="alterarEmpresa" v-on:fecharDialogEmpresa="fecharDialogEmpresa"></drt-dialog-pesquisa-empresa>
                <drt-dialog-pesquisa-pessoa :exibe.sync="exibeDialogPesqRemetente" v-on:pessoaSelecionada="alterarRemetente" v-on:fecharDialogPessoa="fecharDialogRemetente"></drt-dialog-pesquisa-pessoa>
                <drt-dialog-pesquisa-pessoa :exibe.sync="exibeDialogPesqDestinatario" v-on:pessoaSelecionada="alterarDestinatario" v-on:fecharDialogPessoa="fecharDialogDestinatario"></drt-dialog-pesquisa-pessoa>
            </div>
            <div v-show="!modoFormulario" v-loading.body="loadingTable" element-loading-text="Carregando...">
                <el-form :inline="true">
                    <el-form-item>
                        <el-button type="success" icon="document" v-on:click="novo()">Novo</el-button>
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
                        <el-button type="warning" icon="search" v-on:click="buscar()">Pesquisar</el-button>
                    </el-form-item>
                </el-form>
                <el-table :data="ctes" border style="width: 100%">
                    <el-table-column prop="id" label="ID" width="60"></el-table-column>
                    <el-table-column prop="numero" label="Número"></el-table-column>
                    <el-table-column prop="numero" label="Série"></el-table-column>
                    <el-table-column prop="empresa.fantasia" label="Empresa"></el-table-column>
                    <el-table-column width="150">
                        <template scope="scope">
                            <el-button type="info" icon="edit" v-on:click="editar(scope.row.id)"></el-button>
                            <el-button type="danger" icon="delete" v-on:click="excluir(scope.row.id, scope.row.numero)"></el-button>
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
        </div>
    </div>
</template>

<script>
import Cte from '../../domain/cte/Cte';
import Empresa from '../../domain/empresa/Empresa';
import CteService from '../../domain/cte/CteService';
import DrtDialogPesquisaEmpresa from '../shared/dialog-pesquisa-empresa/dialog-pesquisa-empresa.vue'
import DrtDialogPesquisaPessoa from '../shared/dialog-pesquisa-pessoa/dialog-pesquisa-pessoa.vue'

export default {
    components: {
        'drt-dialog-pesquisa-empresa' :DrtDialogPesquisaEmpresa,
        'drt-dialog-pesquisa-pessoa' :DrtDialogPesquisaPessoa
    },
  data () {
      return {
          cte : new Cte(),
          ctes : [],
          exibeDialogPesqEmpresa : false,
          exibeDialogPesqDestinatario : false,
          exibeDialogPesqRemetente : false,
          paginaAtual : 1,
          qtdRegistros : 10,
          qtdRegistrosLocalizados : 0,
          qtdPaginas: 0,
          msgErro : '',
          modoFormulario : false,
          opcoesFiltro: [
              {valor : 'id', descricao: 'ID'},
              {valor : 'numero', descricao: 'Número'},
              {valor : 'serie', descricao: 'Série'}
          ],
          filtroEscolhido : '',
          valorFiltro : '',
          loadingTable: false,
          loadingForm: false
      }
  },
  created () {
      this.cte = this.novoCte();
      this.service = new CteService(this.$http);
      this.buscar();
  },
  methods: {
        alterarEmpresa (empresa) {
            this.cte.empresa = empresa;
        },
        alterarDestinatario (pessoa) {
            this.cte.destinatario = pessoa;
        },
        alterarRemetente (pessoa) {
            this.cte.remetente = pessoa;
        },
        buscar() {
            this.loadingTable = true;
            if (this.valorFiltro != '' && this.filtroEscolhido != '') {
                this.service
                        .buscarComFiltro(this.paginaAtual, this.qtdRegistros, this.filtroEscolhido, this.valorFiltro)
                            .then(function (page) {
                                this.ctes = page.content;
                                this.qtdRegistrosLocalizados = page.totalElements;
                                this.qtdPaginas = page.totalPages;
                                this.loadingTable = false;
                            }, function(err) {
                                this.loadingTable = false;
                                this.abrirPopUpErro(err, 'Tivemos um problema ao buscar os dados dos usuários.');
                            });
            } else {
                this.service.buscarComPaginacao(this.paginaAtual, this.qtdRegistros)
                    .then(function (page) {
                                    this.ctes = page.content;
                                    this.qtdRegistrosLocalizados = page.totalElements;
                                    this.qtdPaginas = page.totalPages;
                                    this.loadingTable = false;
                                }, function (err){
                                    this.loadingTable = false;
                                    this.abrirPopUpErro(err, 'Tivemos um problema ao buscar os dados dos CT-es.');
                                });
            }
        },
        editar(id) {
            this.ativarModoFormulario();
            this.loadingForm = true;
            this.service
                    .buscarPorId(id)
                        .then(function(cte) {
                          this.cte = cte;
                          this.loadingForm = false;
                        }, function (err) {
                            this.loadingForm = false;
                            this.abrirPopUpErro(err, 'Tivemos um problema ao buscar os dados do CT-e.');
                        });
        },
        exibirDialogPesquisaEmpresa() {
            this.exibeDialogPesqEmpresa = true;
        },
        exibirDialogPesquisaDestinatario() {
            this.exibeDialogPesqDestinatario = true;
        },
        exibirDialogPesquisaRemetente() {
            this.exibeDialogPesqRemetente = true;
        },
        fecharDialogEmpresa() {
            this.exibeDialogPesqEmpresa = false;
        },
        fecharDialogDestinatario() {
            this.exibeDialogPesqDestinatario = false;
        },
        fecharDialogRemetente() {
            this.exibeDialogPesqRemetente = false;
        },
        salvar() {
            this.loadingForm = true;
            this.service
                    .salvar(this.cte)
                        .then( function (cte) {
                            this.loadingForm = false;
                            this.cte = cte;
                            this.$message({
                                message: 'CT-e salvo com sucesso!',
                                type: 'success'
                            })
                            }, function (err) {
                                this.loadingForm = false;
                                this.abrirPopUpErro(err, 'Tivemos um problema ao tentar salvar o CT-e.');
                            });
        },
        novo() {
            this.ativarModoFormulario();
            this.cte = this.novoCte();
        },
        novoCte() {
            return {
                empresa : new Empresa(),
                remetente : {},
                destinatario : {},
                tomador : {},
                cfop : {}
            }
        },
        excluir(id, nome) {
            this.$confirm('Deseja realmente excluir o CT-e ' + nome + '?', 'Atenção', {
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
                                        message: 'CT-e excluído com sucesso'
                                    });
                                }, function(err) {
                                    if (this.modoFormulario) {
                                        this.loadingForm = false;
                                    } else {
                                        this.loadingTable = false;
                                    }
                                    this.abrirPopUpErro(err, 'Tivemos um problema ao tentar excluir o CT-e.')
                                });

                    
                }).catch(() => {});
        },
        ativarModoFormulario() {
            this.modoFormulario = true;
        },
        ativarModoGrade() {
            this.buscar();
            this.modoFormulario = false;
        },
        abrirPopUpErro(err, titulo) {
            console.log(err);

            this.$alert(titulo + '\n' + err.body.message, 'OPS!', {
                    confirmButtonText: 'OK',
                    type: 'error'
            });
        } 
  }, watch: {
      'qtdRegistros' : function (val, oldVal) {
          this.paginaAtual = 1;
          this.buscar();
      }
  }
}
</script>

<style>
    .desktop {
        margin-left : 10px;
        margin-right : 10px
    }
    .title-form {
        background : #E5E9F2;
        text-align : center;
        border-radius: 10px;
        border-width: 5px;
        border-color: #E5E9F2;
        border-style: solid;
        color : black;
        font-style: bold;
        margin-top: 10px
    }
    .form {
        margin-top:10px; 
        margin-left:10px
    }
    .barra {
        background : #E5E9F2;
        border-radius: 10px;
    }
    .btn-grade {
        background : #8492A6;
    }
</style>
