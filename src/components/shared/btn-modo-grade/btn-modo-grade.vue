<template>
    <el-button type="info" icon="menu" @click="handleClick">Grade</el-button>
</template>
<script>
    export default {
        name: 'DrtButtonModoGrade',
        componenteName: 'DrtButtonModoGrade',
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