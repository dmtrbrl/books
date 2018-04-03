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
        position: relative;
        width: 300px;
        flex-shrink: 0;
        padding: 20px 30px 20px 0;
        &:before{
            content: "";
            position: absolute;
            top: 0;
            right: 0;
            z-index: 0;
            width: 100vw;
            height: 100%;
            background: rgba($c-light-gray, 0.3);
        }
    }
}
</style>
