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
            <div class="book__rating" v-if="book.average_rating">
                <no-ssr><star-rating
                    :star-size="15"
                    active-color="#2B2B2B"
                    inactive-color="#EEEEEE"
                    :rating="book.average_rating" 
                    :round-start-rating="false"
                    :read-only="true"
                    class="book__rating-value">
                </star-rating></no-ssr>
                <div class="book__rating-count">
                    {{ book.ratings_count.toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",") }} Ratings
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
    </div>
    <Loading v-else />
  </section>
</template>

<script>

import bookQuery from '~/apollo/queries/book'
import Loading from '../../components/loading'
import StarRating from 'vue-star-rating'

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
        Loading, StarRating
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
            this.descriptionIsTruncated = this.$refs.descriptionText.clientHeight > 300;
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
            width: 350px;
            flex-shrink: 0;
            &-img{
                display: block;
                width: 100%;
            }
        }
        &__info{
            padding: 25px 0 30px 50px;
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
            &__rating{
                display: flex;
                align-items: center;
                margin-top: 15px;
                &-count{
                    position: relative;
                    padding-left: 20px;
                    font-size: 13px;
                    &:before{
                        content: "";
                        position: absolute;
                        left: 8px;
                        top: 5px;
                        width: 4px;
                        height: 4px;
                        border-radius: 50%;
                        background: rgba($c-dark, 0.1);
                    }
                }
            }
            &__description{
                position: relative;
                margin-top: 40px;
                font-size: 14px;
                line-height: 1.7;
                overflow: hidden;
                &--less{
                    max-height: 300px;
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
                    padding: 0 10px;
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
    }

    .vue-star-rating{
        align-items: center;
        &-star{
            svg{
                display: block;
            }
        }
        &-rating-text{
            margin: 0 0 0 5px !important;
            font-size: 13px;
        }
    }
</style>
