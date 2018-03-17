<template>
    <div class="main">
        <Header></Header>
        <nuxt class="page" />
        <Footer></Footer>
    </div>
</template>

<script>
import Header from '../components/header'
import Footer from '../components/footer'
export default {
    components: {
        Header,
        Footer
    }
}
</script>
