<template>
  <section class="container">
    <div>
      <h1 class="title">
        books-app
      </h1>
    </div>
  </section>
</template>

<script>
import book from '~/apollo/queries/book.gql'
export default {
    apollo: {
        Book: {
            query: book,
            prefetch: () => ({ id: 34930873 }),
            variables() {
                return { id: 34930873 }
            }
        }
    },
}
</script>

<style>

</style>
