<template>
  <section class="container">
    <div v-if="book && book.id">
        <img :src="book.cover" alt="">
        <h1>
            {{ book.title }}
        </h1>
    </div>
    <Loading v-else />
  </section>
</template>

<script>

import bookQuery from '~/apollo/queries/book'
import Loading from '../../components/loading'

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
            title: (this.book && this.book.title ? this.book.title : 'Loading')
        }
    },
    components: {
        Loading
    },
    data() {
        return {
            book: {}
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
