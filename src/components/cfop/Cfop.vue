<<template>
    <div class="desktop">
        <h1>CFOP</h1>

        <div class="desktop">
            <div id="formulario" v-show="modoFormulario"  v-loading.body="loadingForm" element-loading-text="Carregando...">
                <el-row>
                    <el-button type="info" icon="menu" v-on:click="ativarModoGrade()">Grade</el-button>
                    <el-button type="success" icon="document" v-on:click="novo()">Novo</el-button>
                </el-row>
                <el-form ref="form" :model="cfop" label-width="180px" style="margin-top:20px">
                    <el-form-item label="Código">
                        <el-col :span="4">
                            <el-input v-model="cfop.id"></el-input>
                         </el-col>
                    </el-form-item>
                    <el-form-item label="Nome">
                        <el-col :span="12">
                            <el-input v-model="cfop.descricao"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="Data criação">
                        <el-col :span="5">
                            <el-date-picker v-model="cfop.dtCriacao" type="datetime" format="dd/MM/yyyy HH:mm:ss" disabled></el-date-picker>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="Data da última alteração">
                        <el-col :span="5">
                            <el-date-picker v-model="cfop.dtAlteracao" type="datetime" format="dd/MM/yyyy HH:mm:ss" disabled></el-date-picker>
                        </el-col>
                    </el-form-item>
                </el-form>
                <el-button type="danger" icon="delete" v-on:click="excluir(cfop.id, cfop.descricao)">Excluir</el-button>
                <el-button type="success" icon="check" v-on:click="salvar()">Salvar</el-button>
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
                <el-table :data="cfops" border style="width: 100%">
                    <el-table-column prop="id" label="ID" width="70"></el-table-column>
                    <el-table-column prop="descricao" label="Nome"></el-table-column>
                    <el-table-column width="150">
                        <template scope="scope">
                            <el-button type="info" icon="edit" v-on:click="editar(scope.row.id)"></el-button>
                            <el-button type="danger" icon="delete" v-on:click="excluir(scope.row.id, scope.row.descricao)"></el-button>
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
import Cfop from '../../domain/cfop/Cfop';
import CfopService from '../../domain/cfop/CfopService';

export default {
  data () {
      return {
          cfop : new Cfop(),
          cfops : [],
          paginaAtual : 1,
          qtdRegistros : 10,
          qtdRegistrosLocalizados : 0,
          qtdPaginas: 0,
          msgErro : '',
          modoFormulario : false,
          opcoesFiltro: [
              {valor : 'id', descricao: 'ID'},
              {valor : 'descricao', descricao: 'Descrição'}
          ],
          filtroEscolhido : '',
          valorFiltro : '',
          loadingTable: false,
          loadingForm: false
      }
  },
  created () {
      this.cfop = new Cfop();
      this.service = new CfopService(this.$http);
      this.buscar();
  },
  methods: {
        buscar() {
            this.loadingTable = true;
            if (this.valorFiltro != '' && this.filtroEscolhido != '') {
                this.service
                        .buscarComFiltro(this.paginaAtual, this.qtdRegistros, this.filtroEscolhido, this.valorFiltro)
                            .then(function (page) {
                                this.cfops = page.content;
                                this.qtdRegistrosLocalizados = page.totalElements;
                                this.qtdPaginas = page.totalPages;
                                this.loadingTable = false;
                            }, function(err) {
                                this.loadingTable = false;
                                this.abrirPopUpErro(err, 'Tivemos um problema ao buscar as CFOPs.');
                            });
            } else {
                this.service.buscarComPaginacao(this.paginaAtual, this.qtdRegistros)
                    .then(function (page) {
                                    this.cfops = page.content;
                                    this.qtdRegistrosLocalizados = page.totalElements;
                                    this.qtdPaginas = page.totalPages;
                                    this.loadingTable = false;
                                }, function (err){
                                    this.loadingTable = false;
                                    this.abrirPopUpErro(err, 'Tivemos um problema ao buscar as CFOPs.');
                                });
            }
        },
        editar(id) {
            this.ativarModoFormulario();
            this.loadingForm = true;
            this.service
                    .buscarPorId(id)
                        .then(function(cfop) {
                          this.cfop = cfop;
                          this.loadingForm = false;
                        }, function (err) {
                            this.loadingForm = false;
                            this.abrirPopUpErro(err, 'Tivemos um problema ao buscar as CFOPs.');
                        });
        },
        salvar() {
            this.loadingForm = true;
            this.service
                    .salvar(this.cfop)
                        .then( function (cfop) {
                            this.loadingForm = false;
                            this.cfop = cfop;
                            this.$message({
                                message: 'CFOP salva com sucesso!',
                                type: 'success'
                            })
                            }, function (err) {
                                this.loadingForm = false;
                                this.abrirPopUpErro(err, 'Tivemos um problema ao tentar salvar a CFOP.');
                            });
        },
        novo() {
            this.ativarModoFormulario();
            this.cfop = new Cfop();
        },
        excluir(id, descricao) {
            this.$confirm('Deseja realmente excluir a CFOP ' + descricao + '?', 'Atenção', {
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
                                        message: 'CFOP excluída com sucesso'
                                    });
                                }, function(err) {
                                    if (this.modoFormulario) {
                                        this.loadingForm = false;
                                    } else {
                                        this.loadingTable = false;
                                    }
                                    this.abrirPopUpErro(err, 'Tivemos um problema ao tentar excluir a CFOP.')
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

<<style>
    .desktop {
        margin-left : 10px;
        margin-right : 10px
    }
</style>
