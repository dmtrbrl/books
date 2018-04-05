<template>
  <section class="container">
    <div v-if="book && book.id" class="book">
        <div class="book__cover">
            <img class="book__cover-img" v-if="book.cover" :src="book.cover" :alt="book.title">
            <img class="book__cover-img" v-else src="../../static/no-book-cover.jpg" alt="">
        </div>
        <div class="book__info">
            <h1 class="book__title">
                {{ book.title }}
            </h1>
            <div class="book__authors">
                by 
                <div class="book__author" v-for="(author, i) in book.authors" :key="author.id">
                    <span v-if="i > 0">, </span>
                    <nuxt-link class="book__author-link" :to="`/authors/${author.id}`">
                        <span v-if="author.role">{{ author.name }} <i class="book__author-role">({{ author.role }})</i></span>
                        <span v-else>{{ author.name }}</span>
                    </nuxt-link>
                </div>
            </div>
            <div class="book__description" v-html="book.description"></div>
        </div>
        <aside class="book__aside">
            fgdfgfdgfd
        </aside>
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

<style lang="scss">
    .book{
        display: flex;
        padding-top: 20px;
        &__cover{
            width: 250px;
            flex-shrink: 0;
            &-img{
                display: block;
                width: 100%;
            }
        }
        &__info{
            padding: 10px 30px 30px;
        }
            &__title{
                margin: 0;
                padding: 0;
                font-weight: 500;
            }
            &__authors{
                margin-top: 15px;
                opacity: 0.7;
                font-size: 13px;
                @include mobile-ls-min{
                    font-size: 16px;
                }
            }
                &__author{
                    display: inline;
                    &-link{
                        color: $c-gray;
                        text-decoration: none;
                        &:hover{
                            text-decoration: underline;
                        }
                    }
                    &-role{
                        font-style: normal;
                        opacity: 0.6;
                    }
                }
            &__description{
                margin-top: 20px;
                font-size: 14px;
                line-height: 1.5;
                br{
                    content: " ";
                    display: block;
                    margin: 7px;
                }
            }
        &__aside{
            width: 250px;
            flex-shrink: 0;
        }
    }
</style>
