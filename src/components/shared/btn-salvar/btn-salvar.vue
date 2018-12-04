<template>
    <el-button icon="check" @click="handleClick" class="bntSalvar">Salvar</el-button>
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
    .bntSalvar {
        background: orange;
        color: white;
        margin-left : 10px;
        margin-right : 10px
    }
</style>