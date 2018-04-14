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
            <div class="book__description" :class="{'book__description--less': descriptionIsTruncated && !showFullDescription}" ref="descriptionContainer">
                <div class="book__description-text" v-html="book.description" ref="descriptionText"></div>
                <a href="#" class="book__description-link"
                    v-if="descriptionIsTruncated && !showFullDescription"
                    @click.prevent="showFullDescription = true">
                    More »
                </a>
                <a href="#" class="book__description-link"
                    v-if="descriptionIsTruncated && showFullDescription"
                    @click.prevent="showFullDescription = false">
                    « Less
                </a>
            </div>
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
            book: {},
            descriptionIsTruncated: true,
            showFullDescription: false
        }
    },
    methods: {
        handleDescription() {
            if(!this.$refs.descriptionText) return;
            this.descriptionIsTruncated = this.$refs.descriptionText.clientHeight > 250;
        }
    },
    mounted() {
        this.handleDescription();
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
                position: relative;
                margin-top: 20px;
                font-size: 14px;
                line-height: 1.7;
                overflow: hidden;
                &--less{
                    max-height: 250px;
                    &:before{
                        content: "";
                        display: block;
                        position: absolute;
                        left: 0;
                        bottom: 0;
                        width: 100%;
                        height: 100px;
                        background-image: linear-gradient(to top, $c-white 30%, rgba($c-white, 0))
                    }
                }
                &-text{
                    br{
                        content: " ";
                        display: block;
                        margin: 7px;
                    }
                }
                &-link{
                    display: inline-block;
                    padding: 0 7px;
                    margin-top: 10px;
                    line-height: 26px;
                    text-decoration: none;
                    font-size: 13px;
                    color: $c-dark;
                    background: $c-light;
                    &:hover{
                        text-decoration: underline;
                    }
                }
                &--less &-link{
                    position: absolute;
                    bottom: 0;
                    left: 0;
                }
            }
        &__aside{
            width: 250px;
            flex-shrink: 0;
        }
    }
</style>
