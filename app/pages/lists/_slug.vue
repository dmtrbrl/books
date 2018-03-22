<template>
  <section class="list">
    <div v-if="bestsellersList && bestsellersList.listName">
        <h1>
            {{ bestsellersList.listName }}
        </h1>
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
    <Loading v-else />
  </section>
</template>

<script>

import bestsellersListQuery from '~/apollo/queries/bestsellersList'
import Loading from '../../components/loading'

export default {
    layout: 'lists',
    apollo: {
        bestsellersList: {
            query: bestsellersListQuery,
            prefetch: ({ route }) => ({ list: route.params.slug }),
            variables() {
                return { list: this.$route.params.slug }
            }
        }
    },
    head() {
        return {
            title: (this.bestsellersList && this.bestsellersList.listName ? this.bestsellersList.listName : 'Loading')
        }
    },
    components: {
        Loading
    },
    data() {
        return {
            bestsellersList: {}
        }
    },
    middleware: ({ route, redirect }) => {
        if(!route.params.slug) {
            return redirect('/');
        }
    }
}
</script>
