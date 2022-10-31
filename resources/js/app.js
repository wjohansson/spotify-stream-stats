// Our main CSS
import '../css/app.css'


const frontPage = document.getElementById('front-page')
const frontPageButton = document.getElementById('front-page-button')
const secondPage = document.getElementById('second-page')
const secondPageButton = document.getElementById('second-page-button')

frontPageButton.addEventListener("click", function() {
    frontPage.classList.remove('flex')
    frontPage.classList.add('hidden')

    secondPage.classList.remove('hidden')
    secondPage.classList.add('flex')
})

secondPageButton.addEventListener("click", function() {
    secondPage.classList.remove('flex')
    secondPage.classList.add('hidden')

    frontPage.classList.remove('hidden')
    frontPage.classList.add('flex')
})