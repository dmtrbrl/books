<template>
  <section>
    <div v-if="bestsellersListsOverview">
        <header class="cta" ref="cta">
            <h1 class="cta__text" ref="ctaText">
                Meet your next favorite book
            </h1>
        </header>
        <section class="bestsellers">
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
            <div class="container">
                <div class="bestsellers__overview" v-for="(bestsellersList, key) in bestsellersListsOverview.lists" :key="key">
                    <h2 class="bestsellers__title">
                        <nuxt-link class="bestsellers__title-link" :to="`/lists/${bestsellersList.listNameEncoded}`">{{ bestsellersList.listName }}</nuxt-link>
                    </h2>
                    <ol class="bestsellers__list">
                        <li class="bestsellers__book" v-for="book in bestsellersList.books" v-if="book" :key="book.id">
                            <nuxt-link class="bestsellers__book-link" :to="`/books/${book.id}`">
                                <img class="bestsellers__book-img" :src="book.cover" :alt="book.title" />
                                <strong class="bestsellers__book-title">{{ book.title }}</strong>
                                <span class="bestsellers__book-author">By {{ book.authors[0].name }}</span>
                            </nuxt-link>
                        </li>
                    </ol>
                </div>
            </div>
        </section>
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
    height: 250px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #000;
    background-image: url("../static/covers.jpg");
    background-size: cover;
    background-position: center;
    &:before{
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background: rgba(#000, 0.7);
    }
    &__text{
        position: relative;
        max-width: 600px;
        padding: 0 20px;
        font-size: 64px;
        line-height: 1.2;
        color: #fff;
        text-align: center;
    }
}
.bestsellers{
    position: relative;
    margin-top: 250px;
    background: #fff;
    &__header{
        background: #f9f9f9;
        color: #333;
        &-container{
            position: relative;
            padding-top: 40px;
            padding-bottom: 40px;
            overflow: hidden;
        }
        &-title{
            margin: 0;
            font-size: 36px;
            line-height: 1;
            font-weight: 500;
        }
        &-text{
            margin: 10px 0 0;
            font-size: 13px;
            opacity: 0.5;
        }
        &-nyt{
            position: absolute;
            top: 50%;
            right: 30px;
            width: 150px;
            transform: translateY(-50%);
            pointer-events: none;
            opacity: 0.05;
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
            border-top: 1px solid #eee;
        }
    }
        &__title{
            margin: 0;
            font-size: 18px;
            font-weight: normal;
            &-link{
                display: flex;
                align-items: center;
                color:#333;
                text-decoration: none;
                line-height: 1.4;
                &:after{
                    content: "";
                    display: inline-block;
                    width: 6px;
                    height: 6px;
                    border-top: 2px solid #333;
                    border-right: 2px solid #333;
                    margin-left: 5px;
                    transform: rotate(45deg);
                }
                &:hover{
                    text-decoration: underline;
                }
            }
        }
        &__list{
            display: flex;
            list-style: none;
            padding: 0;
            margin: 20px -15px 0;
            counter-reset: li;
        }
        &__book{
            position: relative;
            display: flex;
            flex-wrap: wrap;
            width: percentage(1/5);
            padding: 0 15px;
            &:not(:first-child){
                border-left: 1px solid #eee;
            }
            &:before{
                counter-increment: li;
                content: "0"counter(li);
                position: absolute;
                top: 15px;
                left: 15px;
                font-size: 24px;
                font-weight: 500;
                color: #eee;
            }
            &-link{
                text-decoration: none;
                color:#333;  
            }
            &-img{
                display: block;
                width: 70%;
                max-height: 200px;
                margin: 0 auto;
                object-fit: contain;
            }
            &-title{
                display: block;
                margin-top: 20px;
                font-size: 16px;
                font-weight: 500;
            }
            &:hover &-title{
                text-decoration: underline;
            }
            &-author{
                display: block;
                margin-top: 5px;
                font-size: 14px;
                opacity: 0.7;
            }
        }
}
</style>
