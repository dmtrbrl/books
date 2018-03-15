<template>
  <section class="container">
    <div v-if="bestsellersListsOverview">
        <h1>
            Bestsellers
        </h1>
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
    }
}
</script>

<style>

</style>
