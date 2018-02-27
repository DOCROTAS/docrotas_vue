<template>
    <el-button type="success" icon="check" @click="handleClick">Salvar</el-button>
</template>
<script>
    export default {
        name: 'DrtButtonSalvar',
        componenteName: 'DrtButtonSalvar',
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