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
const front = {frontPage, frontPageText, frontPageButton, frontPageButtonContainer}

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

let blobs
let thisCategoryBlobs
let colorBlobs

const category = document.getElementById('category')
const question = document.getElementById('question')
const answer = document.getElementById('answer')

const leftBlob = document.getElementById('left-blob')
const rightBlob = document.getElementById('right-blob')

const durationChange = {}

//Adding colors
const white = '#FFFFFF'
const lightblue = '#7678ED'

let questions
let count

let correct
let correctCategory = []

const transitionDuration = 500

setTimeout(function() {
    html.style.display = 'block'
    frontPage.style.display = 'block'
}, 0)

setTimeout(function() {
    frontPageText.classList.remove('scale-0')
    frontPageText.classList.add('scale-100')
}, 0.5*transitionDuration)

setTimeout(function() {
    frontPageButtonContainer.classList.remove('scale-0')
    frontPageButtonContainer.classList.add('scale-100')
}, 1*transitionDuration)


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

        body.classList.remove('duration-0')
        body.classList.add('duration-500')

        for (let i = 0; i < nav.length; i++) {
            nav[i].classList.remove('duration-0')
            nav[i].classList.add('duration-500')
        }

        for (let i = 0; i < progress.length; i++) {
            progress[i].classList.remove('duration-0')
            progress[i].classList.add('duration-500')
        }

        progressBarContainer.classList.remove('text-white')
        progressBarContainer.classList.add('text-darkblue')

        progressLine.classList.remove('bg-white')
        progressLine.classList.add('bg-lightblue')

        progressBar.classList.remove('bg-white')
        progressBar.classList.add('bg-darkblue')

        frontPageText.classList.remove('scale-100')
        frontPageText.classList.add('scale-0')

        setTimeout(function() {
            frontPageButtonContainer.classList.remove('scale-100')
            frontPageButtonContainer.classList.add('scale-0')
        }, 0.5*transitionDuration)

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
            
        setTimeout(function() {
            questionPageText.classList.remove('scale-0')
            questionPageText.classList.add('scale-100')
        }, 1.6*transitionDuration)

        setTimeout(function() {
            questionPageButtonContainer.classList.remove('scale-0')
            questionPageButtonContainer.classList.add('scale-100')
        }, 2.1*transitionDuration)

        setTimeout(function() {
            progressBarContainer.classList.remove('scale-0')
            progressBarContainer.classList.add('scale-100')
        }, 2.6*transitionDuration)
    })
}

questionPageButton.onclick = function() {
    frontPageButton.disabled = false
    answerPageButtonYes.disabled = false
    answerPageButtonNo.disabled = false
    questionPageButton.disabled = true

    questionPageText.classList.remove('scale-100')
    questionPageText.classList.add('scale-0')

    setTimeout(function() {
        questionPageButtonContainer.classList.remove('scale-100')
        questionPageButtonContainer.classList.add('scale-0')
    }, 0.5*transitionDuration)

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
        
    setTimeout(function() {
        answerPageText.classList.remove('scale-0')
        answerPageText.classList.add('scale-100')
    }, 1.6*transitionDuration) 

    setTimeout(function() {
        answerPageButtonContainer.classList.remove('scale-0')
        answerPageButtonContainer.classList.add('scale-100')
    }, 2.1*transitionDuration) 
}

answerPageButtonYes.onclick = function() {
    questionPageButton.disabled = false
    answerPageButtonYes.disabled = true
    answerPageButtonNo.disabled = true

    correctCategory[category.textContent].push(1)

    correct.push(1)
    count.push(1)

    answerPageText.classList.remove('scale-100')
    answerPageText.classList.add('scale-0')

    setTimeout(function() {
        answerPageButtonContainer.classList.remove('scale-100')
        answerPageButtonContainer.classList.add('scale-0')
    }, 0.5*transitionDuration)

    setTimeout(function() {
        answerPage.style.display = 'none'

        body.classList.remove('bg-lightblue')
        body.classList.add('bg-white')

        leftBlob.style.fill = lightblue
        rightBlob.style.fill = lightblue
    
        progressBar.style.transition = 'all ' + transitionDuration
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

        setTimeout(function() {
            progressBarContainer.classList.remove('scale-100')
            progressBarContainer.classList.add('scale-0')
        }, 1*transitionDuration)

        setTimeout(function() {
            resultPage.style.display = 'block'
            progressBarContainer.style.display = 'none'
            totalResult.innerHTML = correct.length + ' av ' + questions.length + ' rätt'
        }, 2.5*transitionDuration)

        setTimeout(function() {
            resultPageText.classList.remove('scale-0')
            resultPageText.classList.add('scale-100')
        }, 2.6*transitionDuration)

        setTimeout(function() {
            resultPageBlobs.classList.remove('scale-0')
            resultPageBlobs.classList.add('scale-100')
        }, 3.1*transitionDuration)

        setTimeout(function() {
            resultPageButtonContainer.classList.remove('scale-0')
            resultPageButtonContainer.classList.add('scale-100')
        }, 3.6*transitionDuration)

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

        setTimeout(function() {
            questionPageText.classList.remove('scale-0')
            questionPageText.classList.add('scale-100')
        }, 1.6*transitionDuration)

        setTimeout(function() {
            questionPageButtonContainer.classList.remove('scale-0')
            questionPageButtonContainer.classList.add('scale-100')
        }, 2.1*transitionDuration)
    }
}

answerPageButtonNo.onclick = function() {
    questionPageButton.disabled = false
    answerPageButtonYes.disabled = true
    answerPageButtonNo.disabled = true

    count.push(1)

    answerPageText.classList.remove('scale-100')
    answerPageText.classList.add('scale-0')

    setTimeout(function() {
        answerPageButtonContainer.classList.remove('scale-100')
        answerPageButtonContainer.classList.add('scale-0')
    }, 0.5*transitionDuration)

    setTimeout(function() {
        answerPage.style.display = 'none'

        body.classList.remove('bg-lightblue')
        body.classList.add('bg-white')

        leftBlob.style.fill = lightblue
        rightBlob.style.fill = lightblue
    
        progressBar.style.transition = 'all 0.5s'
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
        
        setTimeout(function() {
            progressBarContainer.classList.remove('scale-100')
            progressBarContainer.classList.add('scale-0')
        }, 1*transitionDuration)

        setTimeout(function() {
            resultPage.style.display = 'block'
            progressBarContainer.style.display = 'none'
            totalResult.innerHTML = correct.length + ' av ' + questions.length + ' rätt'
        }, 2.5*transitionDuration)

        setTimeout(function() {
            resultPageText.classList.remove('scale-0')
            resultPageText.classList.add('scale-100')
        }, 2.6*transitionDuration)

        setTimeout(function() {
            resultPageBlobs.classList.remove('scale-0')
            resultPageBlobs.classList.add('scale-100')
        }, 3.1*transitionDuration)

        setTimeout(function() {
            resultPageButtonContainer.classList.remove('scale-0')
            resultPageButtonContainer.classList.add('scale-100')
        }, 3.6*transitionDuration)

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

        setTimeout(function() {
            questionPageText.classList.remove('scale-0')
            questionPageText.classList.add('scale-100')
        }, 1.6*transitionDuration)

        setTimeout(function() {
            questionPageButtonContainer.classList.remove('scale-0')
            questionPageButtonContainer.classList.add('scale-100')
        }, 2.1*transitionDuration)
    }
}

resultPageButton.onclick = function() {
    answerPageButtonYes.disabled = false
    answerPageButtonNo.disabled = false
    resultPageButton.disabled = true

    body.classList.remove('duration-500')
    body.classList.add('duration-0')

    resultPageText.classList.remove('scale-100')
    resultPageText.classList.add('scale-0')

    setTimeout(function() {
        resultPageBlobs.classList.remove('scale-100')
        resultPageBlobs.classList.add('scale-0')
    }, 0.5*transitionDuration)
    

    setTimeout(function() {
        resultPageButtonContainer.classList.remove('scale-100')
        resultPageButtonContainer.classList.add('scale-0')
    }, 1*transitionDuration)

    setTimeout(function() {
        resultPage.style.display = 'none'
        frontPage.style.display = 'block'
    }, 2*transitionDuration)
        

    setTimeout(function() {
        frontPageText.classList.remove('scale-0')
        frontPageText.classList.add('scale-100')
    }, 2.1*transitionDuration) 

    setTimeout(function() {
        frontPageButtonContainer.classList.remove('scale-0')
        frontPageButtonContainer.classList.add('scale-100')
    }, 2.6*transitionDuration) 
}