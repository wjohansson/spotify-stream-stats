// Our main CSS
import '../css/app.css'
import'./blobanimation.js'

/**
* We'll load the axios HTTP library which allows us to easily issue requests
* to our Laravel back-end. This library automatically handles sending the
* CSRF token as a header based on the value of the 'XSRF' token cookie.
*/

import axios from 'axios'
window.axios = axios

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'


const html = document.getElementById('html')
const body = document.body

const frontPage = document.getElementById('front-page')
const frontPageText = document.getElementById('front-page-text')
const frontPageButton = document.getElementById('front-page-button')
const frontPageButtonContainer = document.getElementById('front-page-button-container')

const questionPage = document.getElementById('question-page')
const questionPageText = document.getElementById('question-page-text')
const questionPageButton = document.getElementById('question-page-button')
const questionPageButtonContainer = document.getElementById('question-page-button-container')

const answerPage = document.getElementById('answer-page')
const answerPageText = document.getElementById('answer-page-text')
const answerPageButtonYes = document.getElementById('answer-page-button-yes')
const answerPageButtonNo = document.getElementById('answer-page-button-no')
const answerPageButtonContainer = document.getElementById('answer-page-button-container')

const resultPage = document.getElementById('result-page')
const resultPageText = document.getElementById('result-page-text')
const resultPageBlobs = document.getElementById('result-page-blobs')
const resultPageButton = document.getElementById('result-page-button')
const resultPageButtonContainer = document.getElementById('result-page-button-container')

const navHeader = document.getElementById('nav-header')
const logoBlob = document.getElementById('logo-blob')
const logoDonkey = document.getElementById('logo-donkey')
const logoEye = document.getElementById('logo-eye')
const nav = [navHeader, logoBlob, logoDonkey, logoEye]

const progressBarContainer = document.getElementById('progress-bar-container')
const progressLine = document.getElementById('progress-line')
const progressBar = document.getElementById('progress-bar')
const progress = [progressBarContainer, progressLine, progressBar]

const questionNumber = document.getElementById('question-number')
const totalResult = document.getElementById('total-result')

const category = document.getElementById('category')
const question = document.getElementById('question')
const answer = document.getElementById('answer')

const leftBlob = document.getElementById('left-blob')
const rightBlob = document.getElementById('right-blob')

const durationChange = {}

const white = '#FFFFFF'
const lightblue = '#7678ED'

let questions, count, correct, blobs, thisCategoryBlobs, colorBlobs
let correctCategory = {}

const transitionDuration = 500

function scaleUp(delayfactor, element) {
    setTimeout(function() {
        element.classList.remove('scale-0')
        element.classList.add('scale-100')
    }, delayfactor*transitionDuration)
}

function scaleDown(delayfactor, element) {
    setTimeout(function() {
        element.classList.remove('scale-100')
        element.classList.add('scale-0')
    }, delayfactor*transitionDuration)
}

function durationAdd(element) {
    element.classList.remove('duration-0')
    element.classList.add('duration-500')
}

function durationRemove(element) {
    element.classList.remove('duration-500')
    element.classList.add('duration-0')
}

setTimeout(function() {
    html.style.display = 'block'
    frontPage.style.display = 'block'

    durationAdd(body)

    for (let i = 0; i < nav.length; i++) {
        durationAdd(nav[i])
    }

    for (let i = 0; i < progress.length; i++) {
        durationAdd(progress[i])
    }
}, 0)

scaleUp(0.5, frontPageText)
scaleUp(1, frontPageButtonContainer)


function yesAndNoButton() {
    questionPageButton.disabled = false
    answerPageButtonYes.disabled = true
    answerPageButtonNo.disabled = true

    count.push(1)

    scaleDown(0, answerPageText)
    scaleDown(0.5, answerPageButtonContainer)

    setTimeout(function() {
        answerPage.style.display = 'none'

        body.classList.remove('bg-lightblue')
        body.classList.add('bg-white')

        leftBlob.style.fill = lightblue
        rightBlob.style.fill = lightblue
    
        progressBar.style.transition = 'all 0.5s, width 1s'
        questionNumber.innerHTML = 'Fråga ' + count.length + ' av ' + questions.length
        progressBar.style.width = (count.length / questions.length) * 100  + '%'

        logoBlob.style.fill = lightblue
        logoDonkey.style.fill = white
        logoEye.style.fill = white

        navHeader.classList.remove('text-white')
        navHeader.classList.add('text-darkblue')
    }, 1.5*transitionDuration)

    if (count.length > questions.length) {

        for (var key in correctCategory) {
            thisCategoryBlobs = blobs.splice(0, 5)
            colorBlobs = thisCategoryBlobs.splice(0, correctCategory[key].length)
            
            for (var key in colorBlobs) {
                colorBlobs[key].classList.remove('bg-lightgray')
                colorBlobs[key].classList.add('bg-green')
            }
        }

        scaleDown(1, progressBarContainer)

        setTimeout(function() {
            resultPage.style.display = 'block'
            progressBarContainer.style.display = 'none'
            totalResult.innerHTML = correct.length + ' av ' + questions.length + ' rätt'
        }, 2.5*transitionDuration)

        scaleUp(3, resultPageText)
        scaleUp(3.5, resultPageBlobs)
        scaleUp(4, resultPageButtonContainer)

    } else if (count.length <= questions.length) {
        setTimeout(function() {
            questionPage.style.display = 'block'

            category.innerHTML = questions[count.length - 1]['category']
            question.innerHTML = questions[count.length - 1]['question']
            answer.innerHTML = questions[count.length - 1]['answer']

            progressBarContainer.classList.remove('text-white')
            progressBarContainer.classList.add('text-darkblue')

            progressLine.classList.remove('bg-white')
            progressLine.classList.add('bg-lightblue')

            progressBar.classList.remove('bg-white')
            progressBar.classList.add('bg-darkblue')
        }, 1.5*transitionDuration)

        scaleUp(1.6, questionPageText)
        scaleUp(2.1, questionPageButtonContainer)
    }
}

frontPageButton.onclick = function() {
    axios.get('/questions').then(response => {
        resultPageButton.disabled = false
        frontPageButton.disabled = true

        questions = response.data

        count = []
        correct = []
        correctCategory['Film & TV'] = []
        correctCategory['Geografi'] = []
        correctCategory['Historia'] = []
        correctCategory['Musik'] = []
        correctCategory['Övrigt'] = []
        correctCategory['Vetenskap'] = []
        correctCategory['Sport'] = []     

        blobs = Object.values(document.getElementsByTagName('li'))

        for (var i = 0; i < blobs.length; i++) {
            blobs[i].classList.remove('bg-green')
            blobs[i].classList.add('bg-lightgray')
        }

        count.push(1)

        progressBarContainer.classList.remove('text-white')
        progressBarContainer.classList.add('text-darkblue')

        progressLine.classList.remove('bg-white')
        progressLine.classList.add('bg-lightblue')

        progressBar.classList.remove('bg-white')
        progressBar.classList.add('bg-darkblue')

        scaleDown(0, frontPageText)
        scaleDown(0.5, frontPageButtonContainer)

        setTimeout(function() {
            frontPage.style.display = 'none'
            questionPage.style.display = 'block'
            progressBarContainer.style.display = 'block'

            progressBar.style.width = (count.length / questions.length) * 100 + '%'
            questionNumber.innerHTML = 'Fråga ' + count.length + ' av ' + questions.length

            category.innerHTML = questions[count.length - 1]['category']
            question.innerHTML = questions[count.length - 1]['question']
            answer.innerHTML = questions[count.length - 1]['answer']
        }, 1.5*transitionDuration)

        scaleUp(1.6, questionPageText)
        scaleUp(2.1, questionPageButtonContainer)
        scaleUp(2.6, progressBarContainer)
    })
}

questionPageButton.onclick = function() {
    frontPageButton.disabled = false
    answerPageButtonYes.disabled = false
    answerPageButtonNo.disabled = false
    questionPageButton.disabled = true

    scaleDown(0, questionPageText)
    scaleDown(0.5, questionPageButtonContainer)

    setTimeout(function() {
        questionPage.style.display = 'none'
        answerPage.style.display = 'block'

        body.classList.remove('bg-white')
        body.classList.add('bg-lightblue')

        logoBlob.style.fill = white
        logoDonkey.style.fill = lightblue
        logoEye.style.fill = lightblue

        navHeader.classList.remove('text-darkblue')
        navHeader.classList.add('text-white')

        leftBlob.style.fill = white
        rightBlob.style.fill = white

        progressBarContainer.classList.remove('text-darkblue')
        progressBarContainer.classList.add('text-white')

        progressLine.classList.remove('bg-lightblue')
        progressLine.classList.add('bg-white')

        progressBar.classList.remove('bg-darkblue')
        progressBar.classList.add('bg-white')
    }, 1.5*transitionDuration)

    scaleUp(1.6, answerPageText)
    scaleUp(2.1, answerPageButtonContainer)
}

answerPageButtonYes.onclick = function() {
    correct.push(1)
    correctCategory[category.textContent].push(1)

    yesAndNoButton()
}

answerPageButtonNo.onclick = function() {      
    yesAndNoButton()
}

resultPageButton.onclick = function() {
    answerPageButtonYes.disabled = false
    answerPageButtonNo.disabled = false
    resultPageButton.disabled = true

    durationRemove(body)

    scaleDown(0, resultPageText)
    scaleDown(0.5, resultPageBlobs)
    scaleDown(1, resultPageButtonContainer)

    setTimeout(function() {
        resultPage.style.display = 'none'
        frontPage.style.display = 'block'
    }, 2*transitionDuration)
        
    scaleUp(2.1, frontPageText)
    scaleUp(2.6, frontPageButtonContainer)
}