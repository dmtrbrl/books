<template>
    <div class="main">
        <Header></Header>
        <nuxt/>
    </div>
</template>

<script>
import Header from '../components/header'
export default {
    components: {
        Header
    }
}
</script>



<style lang="scss">
    @import url('https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.0/normalize.min.css');
    @import url('https://fonts.googleapis.com/css?family=Montserrat:400,400i,500,700&subset=cyrillic,cyrillic-ext,latin-ext,vietnamese');

    // Box-sizing
    *{
        box-sizing: border-box;
    }

    body{
        padding-top: 50px;
        font-family: 'Montserrat', sans-serif;
    }

    // Transitions
    .page-enter-active, .page-leave-active {
        transition: opacity .5s
    }
    .page-enter, .page-leave-active {
        opacity: 0
    }

    // Container
    .container{
        max-width: 1280px;
        padding: 0 30px;
        margin: 0 auto;
    }
</style>
