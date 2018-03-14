<template>
  <section class="container">
    <div v-if="book">
        <img :src="book.cover" alt="">
        <h1>
            {{ book.title }}
        </h1>
        <p><nuxt-link to="/">Home page</nuxt-link></p>
    </div>
  </section>
</template>

<script>

import bookQuery from '~/apollo/queries/book'

export default {
    apollo: {
        book: {
            query: bookQuery,
            prefetch: ({ route }) => ({ id: route.params.id }),
            variables() {
                return { id: this.$route.params.id }
            }
        }
    },
    head() {
        return {
            title: (this.book ? this.book.title : 'Loading')
        }
    },
    data() {
        return {
            book: null
        }
    },
    middleware: ({ route, redirect }) => {
        if(!route.params.id) {
            return redirect('/');
        }
    }
}
</script>

<style>

</style>
