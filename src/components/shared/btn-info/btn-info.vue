<template>
    <el-button type="warning" icon="search" @click="handleClick">{{nome}}</el-button>
</template>
<script>
    export default {
        name: 'DrtButtonInfo',
        componenteName: 'DrtButtonInfo',
        computed: {
            nome () {
                return this.somenteIcone ? '' : 'Info';
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