<template>
  <section>
    <div v-if="bestsellersListsOverview">
        <header class="cta" ref="cta">
            <h1 class="cta__text" ref="ctaText">
                Meet your next favorite book
            </h1>
        </header>
        <section class="bestsellers">
            <div class="container">
                <div v-for="(bestsellersList, key) in bestsellersListsOverview.lists" :key="key">
                    <h2>
                        <nuxt-link :to="`/lists/${bestsellersList.listNameEncoded}`">{{ bestsellersList.listName }}</nuxt-link>
                    </h2>
                    <ul>
                        <li v-for="book in bestsellersList.books" v-if="book" :key="book.id">
                            <nuxt-link :to="`/books/${book.id}`">
                                <img :src="book.cover" :alt="book.title" style="width: 100px" />
                                <h3>{{ book.title }}</h3>
                            </nuxt-link>
                            <div>{{ book.isbn }}</div>
                            <div v-for="author in book.authors" :key="author.id">
                                <nuxt-link :to="`/authors/${author.id}`">
                                    {{ author.name }}
                                </nuxt-link>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    </div>
  </section>
</template>

<script>

import bestsellersListsOverviewQuery from '~/apollo/queries/bestsellersListsOverview'

export default {
    apollo: {
        bestsellersListsOverview: {
            query: bestsellersListsOverviewQuery,
            prefetch: true
        }
    },
    head: {
        titleTemplate: '%s',
        title: 'Books'
    },
    data() {
        return {
            bestsellersListsOverview: null
        }
    },
    methods: {
        ctaOnScroll() {
            let ctaY = this.$refs.cta.clientHeight/2 + this.$refs.cta.offsetTop;
            let windowY = window.scrollY;
            if(ctaY > windowY) {
                this.$refs.ctaText.style.cssText = `opacity: ${1 - windowY/ctaY}`
            }
        }
    },
    mounted() {
        window.addEventListener('scroll', this.ctaOnScroll);
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.ctaOnScroll)
    }
}
</script>

<style lang="scss">
.cta{
    position: fixed;
    top: 60px;
    left: 0;
    width: 100%;
    height: 250px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #000;
    background-image: url("../static/covers.jpg");
    background-size: cover;
    background-position: center;
    &:before{
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background: rgba(#000, 0.7);
    }
    &__text{
        position: relative;
        max-width: 600px;
        padding: 0 20px;
        font-size: 64px;
        line-height: 1.2;
        color: #fff;
        text-align: center;
    }
}
.bestsellers{
    position: relative;
    margin-top: 250px;
    background: #fff;
}
</style>
