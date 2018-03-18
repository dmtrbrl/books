<template>
  <nav class="bestsellers-nav">
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
                    <nuxt-link to="/lists/series-books">Children’s Series</nuxt-link>
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
  </nav>
</template>

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
    &__list{
        display: block;
        position: sticky;
        top: 60px;
        padding: 30px 0;
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
        padding: 15px 0 15px 15px;
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

