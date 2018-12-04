<template>
    <el-button type="success" icon="plus" @click="handleClick">Novo</el-button>
</template>
<script>
    export default {
        name: 'DrtButtonNovo',
        componenteName: 'DrtButtonNovo',
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