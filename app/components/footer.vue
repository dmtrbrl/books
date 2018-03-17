<template>
    <footer class="footer">
        <div class="container footer__container">
            <div class="footer__credits">
                Designed and developed by <a href="https://github.com/dmtrbrl" target="_blank">Dmytro Barylo</a>
            </div>
            <div class="footer__github">
                <a href="https://github.com/dmtrbrl/books" class="footer__github-link" target="_blank">
                    View code
                </a>
            </div>
            <div class="footer__powered-by">
                Powered by <a href="https://www.goodreads.com/api" target="_blank">Goodreads</a> and <a href="https://developer.nytimes.com/" target="_blank">The New York Times</a>
            </div>
        </div>
    </footer>
</template>

<style lang="scss">
    .footer{
        padding: 30px 0;
        background: #eee;
        font-size: 12px;
        color: rgba(#333, 0.5);
        a{
            color: rgba(#333, 0.5);
            text-decoration: none;
            font-weight: 500;
            &:hover{
                text-decoration: underline;
            }
        }
        &__container{
            display: flex;
            align-items: center;
            justify-content: space-between;
            & > *{
                width: percentage(1/3);
            }
        }
        &__github{
            text-align: center;
            &-link{
                display: inline-flex;
                align-items: center;
                &:before{
                    content: "";
                    display: inline-block;
                    width: 16px;
                    height: 15px;
                    margin-right: 5px;
                    background-image: url('../static/github-icon.svg');
                    background-size: contain;
                    background-repeat: no-repeat;
                    background-position: center;
                    opacity: 0.5;
                }
            }
        }
        &__powered-by{
            text-align: right;
        }
    }
</style>
