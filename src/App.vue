<template>
  <div id="app">
    <el-row>
      <el-col :span="4">
        <h5>DOC ROTAS</h5>
        <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" router>
          <el-menu-item index="/">Home</el-menu-item>
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-document"></i>Cadastros</template>
            <el-menu-item index="/certificadoDigital">Certificado Digital</el-menu-item>
            <el-menu-item index="/cidade">Cidade</el-menu-item>
            <el-menu-item index="/empresa">Empresa</el-menu-item>
            <el-menu-item index="/pessoa">Pessoa</el-menu-item>
            <el-menu-item index="/uf">Unidade Federativa</el-menu-item>
            <el-menu-item index="/usuario">Usuário</el-menu-item>
            <el-menu-item index="/veiculo">Veículo</el-menu-item>
          </el-submenu>
          <el-menu-item index="/config"><i class="el-icon-setting"></i>Configurações</el-menu-item>
          <el-menu-item index="/cte"><i class="el-icon-menu"></i>CT-e</el-menu-item>
          <el-menu-item index="/mdfe"><i class="el-icon-menu"></i>MDF-e</el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="20">
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
      return {
        isCollapse: true
      };
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style>
#app {
  font-family: Helvetica, sans-serif;
  text-align: center;
}
</style>
