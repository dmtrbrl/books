<template>
    <div class="lists">
        <Header />
        <div class="container lists__container">
            <BestsellersNav class="lists__nav" />
            <nuxt class="lists__content page" />
        </div>
        <Footer />
    </div>
</template>

<script>
import Header from '../components/header'
import Footer from '../components/footer'
import BestsellersNav from '../components/bestsellersNav'
export default {
    components: {
        Header,
        Footer,
        BestsellersNav
    }
}
</script>

<style lang="scss">
.lists{
    &__container{
        display: flex;
    }
    &__nav{
        width: 250px;
        flex-shrink: 0;
    }
    &__content{
        margin-left: 30px;
    }
}
</style>
