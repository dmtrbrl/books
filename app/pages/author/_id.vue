<template>
  <section class="container">
    <div v-if="author">
        <h1>
            {{ author.name }}
        </h1>
        <p><nuxt-link to="/">Home page</nuxt-link></p>
    </div>
  </section>
</template>

<script>

import authorQuery from '~/apollo/queries/author'

export default {
    apollo: {
        author: {
            query: authorQuery,
            prefetch: ({ route }) => ({ id: route.params.id }),
            variables() {
                return { id: this.$route.params.id }
            }
        }
    },
    head() {
        return {
            title: (this.author ? this.author.name : 'Loading')
        }
    },
    data() {
        return {
            author: null
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
