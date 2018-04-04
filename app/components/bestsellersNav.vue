<template>
    <nav class="bestsellers-nav">
        <div class="bestsellers-nav__mobile">
            <select class="bestsellers-nav__select" v-model="listName" ref="select">
                <optgroup label="Fiction">
                    <option value="/lists/combined-print-and-e-book-fiction">Combined Print & E-Book Fiction</option>
                    <option value="/lists/hardcover-fiction">Hardcover Fiction</option>
                    <option value="/lists/trade-fiction-paperback">Paperback Trade Fiction</option>
                </optgroup>
                <optgroup label="Nonfiction">
                    <option value="/lists/combined-print-and-e-book-nonfiction">Combined Print & E-Book Nonfiction</option>
                    <option value="/lists/hardcover-nonfiction">Hardcover Nonfiction</option>
                    <option value="/lists/paperback-nonfiction">Paperback Nonfiction</option>
                    <option value="/lists/advice-how-to-and-miscellaneous">Advice, How-To & Miscellaneous</option>
                </optgroup>
                <optgroup label="Children’s">
                    <option value="/lists/childrens-middle-grade-hardcover">Children’s Middle Grade Hardcover</option>
                    <option value="/lists/picture-books">Children’s Picture Books</option>
                    <option value="/lists/young-adult-hardcover">Young Adult Hardcover</option>
                </optgroup>
                <option value="/lists/business-books">Business</option>
                <option value="/lists/science">Science</option>
                <option value="/lists/sports">Sports and Fitness</option>
            </select>
        </div>
        <div class="bestsellers-nav__desktop">
            <strong class="bestsellers-nav__title">Best Sellers Lists</strong>
            <ul class="bestsellers-nav__list">
                <li class="bestsellers-nav__item">
                    <strong class="bestsellers-nav__category">Fiction</strong>
                    <ul class="bestsellers-nav__sublist">
                        <li class="bestsellers-nav__subitem">
                            <nuxt-link to="/lists/combined-print-and-e-book-fiction">Combined Print & E-Book Fiction</nuxt-link>
                        </li>
                        <li class="bestsellers-nav__subitem">
                            <nuxt-link to="/lists/hardcover-fiction">Hardcover Fiction</nuxt-link>
                        </li>
                        <li class="bestsellers-nav__subitem">
                            <nuxt-link to="/lists/trade-fiction-paperback">Paperback Trade Fiction</nuxt-link>
                        </li>
                    </ul>
                </li>
                <li class="bestsellers-nav__item">
                    <strong class="bestsellers-nav__category">Nonfiction</strong>
                    <ul class="bestsellers-nav__sublist">
                        <li class="bestsellers-nav__subitem">
                            <nuxt-link to="/lists/combined-print-and-e-book-nonfiction">Combined Print & E-Book Nonfiction</nuxt-link>
                        </li>
                        <li class="bestsellers-nav__subitem">
                            <nuxt-link to="/lists/hardcover-nonfiction">Hardcover Nonfiction</nuxt-link>
                        </li>
                        <li class="bestsellers-nav__subitem">
                            <nuxt-link to="/lists/paperback-nonfiction">Paperback Nonfiction</nuxt-link>
                        </li>
                        <li class="bestsellers-nav__subitem">
                            <nuxt-link to="/lists/advice-how-to-and-miscellaneous">Advice, How-To & Miscellaneous</nuxt-link>
                        </li>
                    </ul>
                </li>
                <li class="bestsellers-nav__item">
                    <strong class="bestsellers-nav__category">Children’s</strong>
                    <ul class="bestsellers-nav__sublist">
                        <li class="bestsellers-nav__subitem">
                            <nuxt-link to="/lists/childrens-middle-grade-hardcover">Children’s Middle Grade Hardcover</nuxt-link>
                        </li>
                        <li class="bestsellers-nav__subitem">
                            <nuxt-link to="/lists/picture-books">Children’s Picture Books</nuxt-link>
                        </li>
                        <li class="bestsellers-nav__subitem">
                            <nuxt-link to="/lists/young-adult-hardcover">Young Adult Hardcover</nuxt-link>
                        </li>
                    </ul>
                </li>
                <li class="bestsellers-nav__item">
                    <strong class="bestsellers-nav__category">
                        <nuxt-link to="/lists/business-books">Business</nuxt-link>
                    </strong>
                </li>
                <li class="bestsellers-nav__item">
                    <strong class="bestsellers-nav__category">
                        <nuxt-link to="/lists/science">Science</nuxt-link>
                    </strong>
                </li>
                <li class="bestsellers-nav__item">
                    <strong class="bestsellers-nav__category">
                        <nuxt-link to="/lists/sports">Sports and Fitness</nuxt-link>
                    </strong>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
export default {
  data() {
      return {
          listName: this.$route.path
      }
  },
  watch: {
      listName(path) {
         this.$router.push({ path });
         this.$refs.select.blur();
      },
      '$route' (to, from) {
          this.listName = this.$route.path;
      }
  }
}
</script>


<style lang="scss">
.bestsellers-nav{
    position: relative;
    color: rgba($c-gray, 0.5);
    a{
        text-decoration: none;
        color: rgba($c-gray, 0.5);
        &:hover{
            text-decoration: underline;
        }
        &.nuxt-link-active{
            color: $c-gray;
        }
    }
    &__mobile{
        position: fixed;
        top: 60px;
        left: 0;
        z-index: 3;
        width: 100%;
        padding: 20px;
        background: $c-light-gray;
        @include tablet-ls-min{
            display: none;
        }
    }
        &__select{
            display: block;
            width: 100%;
            height: 40px;
            padding: 7px;
            border: 1px solid $c-dark;
            font-size: 16px;
            optgroup[label], & > option{
                font-weight: 500;
            }
        }
    &__desktop{
        display: none;
        @include tablet-ls-min{
            display: block;
            position: sticky;
            top: 80px;
            padding: 20px 0;
        }
    }
        &__title{
            display: block;
            margin-bottom: 25px;
            font-size: 16px;
            font-weight: 500;
            text-transform: uppercase;
            color: $c-gray;
        }
        &__list{
            display: block;
            padding: 0;
            margin: 0;
            list-style: none;
        }
        &__item{
            &:not(:first-child){
                padding-top: 15px;
            }
        }
        &__sublist{
            display: block;
            padding: 15px 0 10px 10px;
            margin: 0;
            list-style: none;
            font-size: 12px;
        }
        &__subitem{
            &:not(:first-child){
                padding-top: 15px;
            }
        }
        &__category{
            display: block;
            text-transform: uppercase;
            font-weight: 500;
            font-size: 14px;
        }
}
</style>

