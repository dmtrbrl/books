<template>
  <section class="container">
    <div v-if="author && author.id">
        <h1>
            {{ author.name }}
        </h1>
    </div>
    <Loading v-else />
  </section>
</template>

<script>

import authorQuery from '~/apollo/queries/author'
import Loading from '../../components/loading'

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
            title: (this.author && this.author.name ? this.author.name : 'Loading')
        }
    },
    components: {
        Loading
    },
    data() {
        return {
            author: {}
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
