<template>
    <Login/>
</template>
<script>
import Login from '@/components/auth/Login'
export default {
    name: 'login-page',
    components: {Login}
}
</script>
<style scoped>
form {
    border: black 1px solid;
    padding: 10px;
    margin: auto;
}
input{
    margin-bottom: 10px
}
button{
    margin-top: 10px
}
</style>