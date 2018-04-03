<template>
  <section>
    <header class="cta" ref="cta">
        <h1 class="cta__text" ref="ctaText">
            Meet your next favorite book
        </h1>
    </header>
    <div class="bestsellers">
        <div class="bestsellers__header">
            <div class="container bestsellers__header-container">
                <h2 class="bestsellers__header-title">
                    The New York Times Best Sellers
                </h2>
                <p class="bestsellers__header-text">
                    Authoritatively ranked lists of books sold in the United States, sorted by format and genre.
                </p>
                <div class="bestsellers__header-nyt">
                    <img src="../static/nyt-logo.svg" alt="">
                </div>
            </div>
        </div>
        <div class="container" v-if="bestsellersListsOverview">
            <div class="bestsellers__overview" v-for="(bestsellersList, key) in bestsellersListsOverview.lists" :key="key">
                <h2 class="bestsellers__title">
                    <nuxt-link class="bestsellers__title-link" :to="`/lists/${bestsellersList.listNameEncoded}`">{{ bestsellersList.listName }}</nuxt-link>
                </h2>
                <ol class="bestsellers__list">
                    <li class="bestsellers__book" v-for="book in bestsellersList.books" v-if="book" :key="book.id">
                        <nuxt-link class="bestsellers__book-link" :to="`/books/${book.id}`">
                            <img v-if="book.cover" class="bestsellers__book-img" :src="book.cover" :alt="book.title" />
                            <img v-else class="bestsellers__book-img" src="../static/no-book-cover.jpg">
                            <div class="bestsellers__book-info">
                                <strong class="bestsellers__book-title">{{ book.title }}</strong>
                                <div class="bestsellers__book-authors">
                                    by
                                    <div class="bestsellers__book-author" v-for="(author, i) in book.authors" v-if="!author.role" :key="author.id">
                                        <span v-if="i > 0">, </span>
                                        <span>{{ author.name }}</span>
                                    </div>
                                </div>
                            </div>
                        </nuxt-link>
                    </li>
                </ol>
            </div>
        </div>
        <Loading v-else />
    </div>
  </section>
</template>

<script>

import bestsellersListsOverviewQuery from '~/apollo/queries/bestsellersListsOverview'
import Loading from '../components/loading'

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
    components: {
        Loading
    },
    data() {
        return {
            bestsellersListsOverview: null
        }
    },
    methods: {
        ctaOnScroll() {
            let ctaY = this.$refs.cta.clientHeight/2 + this.$refs.cta.offsetTop;
            let windowY = window.scrollY;
            if(ctaY > windowY) {
                this.$refs.ctaText.style.cssText = `opacity: ${1 - windowY/ctaY}`
            }
        }
    },
    mounted() {
        window.addEventListener('scroll', this.ctaOnScroll);
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.ctaOnScroll)
    }
}
</script>

<style lang="scss">
.cta{
    position: fixed;
    top: 60px;
    left: 0;
    width: 100%;
    height: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: $c-black;
    background-image: url("../static/covers.jpg");
    background-size: cover;
    background-position: center;
    @include tablet-min{
        height: 200px;
    }
    @include desktop-min{
        height: 250px;
    }
    &:before{
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background: rgba($c-black, 0.7);
    }
    &__text{
        position: relative;
        max-width: 300px;
        padding: 0 20px;
        font-size: 24px;
        line-height: 1.2;
        color: $c-white;
        text-align: center;
        @include mobile-ls-min{
            max-width: 400px;
            font-size: 36px;
        }
        @include tablet-min{
            max-width: 500px;
            font-size: 48px;
        }
        @include desktop-min{
            max-width: 600px;
            font-size: 64px;
        }
    }
}
.bestsellers{
    position: relative;
    margin-top: 150px;
    background: $c-white;
    @include tablet-min{
        margin-top: 200px;
    }
    @include desktop-min{
        margin-top: 250px;
    }
    &__header{
        background: $c-light;
        color: $c-gray;
        &-container{
            position: relative;
            padding-top: 20px;
            padding-bottom: 20px;
            overflow: hidden;
            @include mobile-ls-min{
                padding-top: 30px;
                padding-bottom: 30px;
            }
            @include tablet-min{
                padding-top: 40px;
                padding-bottom: 40px;
            }
        }
        &-title{
            margin: 0;
            font-size: 16px;
            line-height: 1;
            font-weight: 500;
            @include mobile-ls-min{
                font-size: 24px;
            }
            @include tablet-min{
                font-size: 36px;
            }
        }
        &-text{
            margin: 10px 0 0;
            font-size: 12px;
            opacity: 0.5;
            @include mobile-ls-min{
                font-size: 13px;
            }
        }
        &-nyt{
            position: absolute;
            top: 50%;
            right: 30px;
            width: 100px;
            transform: translateY(-50%);
            pointer-events: none;
            opacity: 0.05;
            @include mobile-ls-min{
                width: 150px;
            }
            img{
                width: 100%;
                height: auto;
                display: block;
            }
        }
    }
    &__overview{
        padding: 30px 0;
        &:not(:first-child){
            border-top: 1px solid $c-light-gray;
        }
    }
        &__title{
            margin: 0;
            font-size: 16px;
            font-weight: normal;
            @include mobile-ls-min{
                font-size: 18px;
            }
            &-link{
                color: $c-gray;
                text-decoration: none;
                line-height: 1.4;
                &:after{
                    content: "";
                    display: inline-block;
                    width: 6px;
                    height: 6px;
                    margin-top: -2px;
                    border-top: 2px solid $c-gray;
                    border-right: 2px solid $c-gray;
                    margin-left: 5px;
                    transform: rotate(45deg);
                    vertical-align: middle;
                }
                &:hover{
                    text-decoration: underline;
                }
            }
        }
        &__list{
            display: flex;
            flex-wrap: wrap;
            list-style: none;
            padding: 0;
            margin: 20px 0 0;
            counter-reset: li;
            @include tablet-ls-min{
                flex-wrap: nowrap;
                margin: 20px -15px 0;
            }
        }
        &__book{
            position: relative;
            display: flex;
            width: 100%;
            &:not(:first-child){
                margin-top: 10px;
            }
            @include tablet-ls-min{
                width: percentage(1/5);
                padding: 0 15px;
                &:not(:first-child){
                    margin-top: 0;
                    border-left: 1px solid $c-light-gray;
                }
            }
            &-link{
                display: flex;
                text-decoration: none;
                color: $c-gray;
                @include tablet-ls-min{
                    display: block;
                }
                &:before{
                    width: 20px;
                    flex-shrink: 0;
                    counter-increment: li;
                    content: "0"counter(li);
                    font-size: 18px;
                    font-weight: 500;
                    color: $c-light-gray;
                    @include mobile-ls-min{
                        width: 30px;
                        margin-top: 10px;
                        font-size: 24px;
                    }
                    @include tablet-ls-min{
                        position: absolute;
                        top: 15px;
                        left: 15px;
                        width: auto;
                        margin-top: 0;
                    }
                }
            }
            &-img{
                display: block;
                flex-shrink: 0;
                width: 70px;
                max-height: 100px;
                margin-left: 10px;
                object-fit: contain;
                @include tablet-ls-min{
                    width: 100%;
                    margin: 0 auto;
                    max-height: 140px;
                }
                @include desktop-min{
                    max-height: 200px;
                }
            }
            &-info{
                margin-left: 15px;
                @include mobile-ls-min{
                    margin-top: 10px;
                }
                @include tablet-ls-min{
                    margin-left: 0;
                    margin-top: 20px;
                }
            }
            &-title{
                display: block;
                font-size: 14px;
                font-weight: 500;
                @include mobile-ls-min{
                    font-size: 16px;
                }
            }
            &:hover &-title{
                text-decoration: underline;
            }
            &-authors{
                display: block;
                margin-top: 5px;
                font-size: 14px;
                opacity: 0.7;
            }
                &-author{
                    display: inline;
                }
        }
}
</style>
