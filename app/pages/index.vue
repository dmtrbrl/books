<template>
  <section class="container">
    <h1>
        Bestsellers
    </h1>
    <h2>
        {{ bestsellers.listName }}
    </h2>
    <ul>
        <li v-for="book in bestsellers.books" :key="book.id">
            <img :src="book.cover" :alt="book.title">
            <h3>{{ book.title }}</h3>
            <div>{{ book.isbn }}</div>
            <div v-for="author in book.authors" :key="author.id">
                {{ author.name }}
            </div>
        </li>
    </ul>
  </section>
</template>

<script>

import { BestsellersQuery } from '~/apollo/queries'

export default {
    apollo: {
        bestsellers: {
            query: BestsellersQuery,
            prefetch: true,
            variables() {
                return { list: "combined-print-and-e-book-fiction" }
            }
        }
    },
    head: {
        title: 'Bestsellers'
    }
}
</script>

<style>

</style>
