<template>
    <header class="header">
        <div class="container header__container">
            <nuxt-link to="/" class="logo">
                <img class="logo__img" src="../static/logo.svg" alt="Books">
            </nuxt-link>
        </div>
    </header>
</template>

<style lang="scss">
    @import url('https://fonts.googleapis.com/css?family=Quicksand:700');
    .header{
        width: 100%;
        position: fixed;
        top: 0;
        left: 0;
        background: $c-dark;
        z-index: 100;
        &__container{
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 60px;
        }
    }
    .logo{
        display: block;
        width: 80px;
        &__img{
            display: block;
            width: 100%;
            height: auto;
        }
    }
</style>

