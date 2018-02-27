<template>
    <el-button type="warning" icon="search" @click="handleClick">Pesquisar</el-button>
</template>
<script>
    export default {
        name: 'DrtPesquisar',
        componenteName: 'DrtPesquisar',
        data () {
            return {};
        },
        methods: {
             handleClick(evt) {
                this.$emit('click', evt);
            }
        }
    }
</script>
<style>

</style>