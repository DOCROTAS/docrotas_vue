<template>
    <el-button type="info" icon="edit" @click="handleClick">{{nome}}</el-button>
</template>
<script>
    export default {
        name: 'DrtButtonExcluir',
        componenteName: 'DrtButtonExcluir',
        computed: {
            nome () {
                return this.somenteIcone ? '' : 'Editar';
            }
        },
        data () {
            return {};
        },
        methods: {
             handleClick(evt) {
                this.$emit('click', evt);
            }
        }, 
        props: {
            somenteIcone : {
                type : Boolean,
                default : false
            }
        }
    }
</script>
<style>

</style>