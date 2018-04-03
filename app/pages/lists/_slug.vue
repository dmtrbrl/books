<template>
  <section class="list">
    <div v-if="bestsellersList && bestsellersList.listName">
        <h1 class="list__title">
            {{ bestsellersList.listName }}
        </h1>
        <ul class="list__items">
            <li class="list__item l-book" v-for="(book, i) in bestsellersList.books" v-if="book" :key="book.id">
                <nuxt-link class="l-book__link" :to="`/books/${book.id}`">
                    <span class="l-book__position">{{ i+1 > 9 ? i+1 : `0${(i+1)}` }}</span>
                    <div class="l-book__cover">
                        <img class="l-book__cover-img" v-if="book.cover" :src="book.cover" :alt="book.title" />
                        <img class="l-book__cover-img" v-else src="../../static/no-book-cover.jpg" alt="" />
                    </div>
                    <div class="l-book__info">
                        <strong class="l-book__title" >{{ book.title }}</strong>
                        <div class="l-book__authors">
                            by 
                            <div class="l-book__author" v-for="(author, i) in book.authors" :key="author.id">
                                <span v-if="i > 0">, </span>
                                <span v-if="author.role">{{ author.name }} <i class="l-book__author-role">({{ author.role }})</i></span>
                                <span v-else>{{ author.name }}</span>
                            </div>
                        </div>
                        <div class="l-book__description" v-if="book.description" v-description="book.description"></div>
                    </div>
                </nuxt-link>
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

<style lang="scss">
.list{
    padding-left: 30px;
    &__title{
        margin: 0;
        padding: 30px 0 0;
        font-weight: normal;
    }
    &__items{
        padding: 0;
        margin: 20px 0;
        list-style: none;
    }
    &__item{
        border-top: 1px solid $c-light-gray;
    }
}
.l-book{
    &__link{
        display: flex;
        padding: 20px 0;
        color: $c-dark;
        text-decoration: none;
    }
        &__position{
            display: block;
            width: 50px;
            padding-top: 10px;
            flex-shrink: 0;
            font-weight: 500;
            font-size: 24px;
            color: rgba($c-dark, 0.2);
        }
        &__cover{
            width: 120px;
            flex-shrink: 0;
            &-img{
                display: block;
                width: 100%;
            }
        }
        &__info{
            padding: 10px 0 0 15px;
        }
            &__title{
                font-size: 20px;
                font-weight: 500;
            }
            &__authors{
                margin-top: 10px;
                opacity: 0.6;
            }
                &__author{
                    display: inline;
                    &-role{
                        font-style: normal;
                        opacity: 0.6;
                    }
                }
            &__description{
                margin-top: 10px;
                line-height: 1.6;
                font-size: 13px;
                color: rgba($c-dark, 0.7);
            }
}
</style>

