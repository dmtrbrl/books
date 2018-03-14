<template>
  <section class="container">
    <div v-if="bestsellers">
        <h1>
            Bestsellers
        </h1>
        <h2>
            {{ bestsellers.listName }}
        </h2>
        <ul>
            <li v-for="book in bestsellers.books" :key="book.id">
                <nuxt-link :to="`book/${book.id}`">
                    <img :src="book.cover" :alt="book.title" style="width: 100px" />
                    <h3>{{ book.title }}</h3>
                </nuxt-link>
                <div>{{ book.isbn }}</div>
                <div v-for="author in book.authors" :key="author.id">
                    <nuxt-link :to="`author/${author.id}`">
                        {{ author.name }}
                    </nuxt-link>
                </div>
            </li>
        </ul>
    </div>
  </section>
</template>

<script>

import bestsellersQuery from '~/apollo/queries/bestsellers'

export default {
    apollo: {
        bestsellers: {
            query: bestsellersQuery,
            prefetch: () => ({ list: "combined-print-and-e-book-fiction" }),
            variables() {
                return { list: "combined-print-and-e-book-fiction" }
            }
        }
    },
    head: { title: 'Bestsellers' },
    data() {
        return {
            bestsellers: null
        }
    }
}
</script>

<style>

</style>
