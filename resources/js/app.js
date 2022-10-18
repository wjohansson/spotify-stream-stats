// Our main CSS
import '../css/app.css'
  

/**
* We'll load the axios HTTP library which allows us to easily issue requests
* to our Laravel back-end. This library automatically handles sending the
* CSRF token as a header based on the value of the "XSRF" token cookie.
*/

import axios from 'axios'
window.axios = axios

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

//transition end för att ändra innerhtml? när css transitionen är färdig

const body = document.body

const frontpage = document.getElementById('front-page')
const frontpagetext = document.getElementById('front-page-text')
const frontpagebutton = document.getElementById('front-page-button')
const frontpagebuttoncontainer = document.getElementById('front-page-button-container')

const questionpage = document.getElementById('question-page')
const questionpagetext = document.getElementById('question-page-text')
const questionpagebutton = document.getElementById('question-page-button')
const questionpagebuttoncontainer = document.getElementById('question-page-button-container')

const answerpage = document.getElementById('answer-page')
const answerpagetext = document.getElementById('answer-page-text')
const answerpagebuttonyes = document.getElementById('answer-page-button-yes')
const answerpagebuttonno = document.getElementById('answer-page-button-no')
const answerpagebuttoncontainer = document.getElementById('answer-page-button-container')

const resultpage = document.getElementById('result-page')
const resultpageblobs = document.getElementById('result-page-blobs')
const resultpagebutton = document.getElementById('result-page-button')
const resultpagebuttoncontainer = document.getElementById('result-page-button-container')

const logo = document.getElementById('logo')
const navheader = document.getElementById('nav-header')
const leftblob = document.getElementById('left-blob')
const rightblob = document.getElementById('right-blob')
const progressbarcontainer = document.getElementById('progress-bar-container')
const progressline = document.getElementById('progress-line')
const progressbar = document.getElementById('progress-bar')
const questionnumber = document.getElementById('question-number')
const totalresult = document.getElementById('total-result')

const movblobs = document.getElementById('mov-blobs').children
const geoblobs = document.getElementById('geo-blobs').children
const hisblobs = document.getElementById('his-blobs').children
const musblobs = document.getElementById('mus-blobs').children
const othblobs = document.getElementById('oth-blobs').children
const sciblobs = document.getElementById('sci-blobs').children
const spoblobs = document.getElementById('spo-blobs').children

const blobs = document.getElementsByTagName('li')
const category = document.getElementById('category')
const question = document.getElementById('question')
const answer = document.getElementById('answer')

let questions
let count
let correct
let correctMov
let correctGeo
let correctHis
let correctMus
let correctOth
let correctSci
let correctSpo

frontpagebutton.onclick = function() {
    axios.get("/questions").then(response => {
        questions = response.data

        count = []
        correct = []
        correctMov = []
        correctGeo = []
        correctHis = []
        correctMus = []
        correctOth = []
        correctSci = []
        correctSpo = []

        count.push(1)

        frontpagetext.classList.remove("scale-100")
        frontpagetext.classList.add("scale-0")

        frontpagebuttoncontainer.classList.remove("scale-100")
        frontpagebuttoncontainer.classList.add("scale-0")

        frontpagetext.addEventListener('transitionend', function() {
            frontpage.style.display = "none"
            questionpage.style.display = "block"
            progressbarcontainer.style.display = "block"

            setTimeout(function() {
                questionpagetext.classList.remove("scale-0")
                questionpagetext.classList.add("scale-100")

                questionpagebuttoncontainer.classList.remove("scale-0")
                questionpagebuttoncontainer.classList.add("scale-100")

                progressbarcontainer.classList.remove("duration-0")
                progressbarcontainer.classList.add("duration-300")
                progressbarcontainer.classList.remove("scale-0")
                progressbarcontainer.classList.add("scale-100")
            }, 0)
        })

        progressbar.style.width = (count.length / questions.length) * 100 + "%"
        questionnumber.innerHTML = "Fråga " + count.length + " av " + questions.length

        category.innerHTML = questions[count.length - 1]["category"]
        question.innerHTML = questions[count.length - 1]["question"]
        answer.innerHTML = questions[count.length - 1]["answer"]

        for (var i = 0; i < blobs.length; i++) {
            blobs[i].classList.add("bg-lightgray")
        }
    })
}

questionpagebutton.onclick = function() {

    questionpagetext.classList.remove("scale-100")
    questionpagetext.classList.add("scale-0")

    questionpagebuttoncontainer.classList.remove("scale-100")
    questionpagebuttoncontainer.classList.add("scale-0")

    progressbarcontainer.classList.remove("duration-300")
    progressbarcontainer.classList.add("duration-0")

    questionpagetext.addEventListener('transitionend', function() {
        questionpage.style.display = "none"
        answerpage.style.display = "block"

        setTimeout(function() {
            answerpagetext.classList.remove("scale-0")
            answerpagetext.classList.add("scale-100")

            answerpagebuttoncontainer.classList.remove("scale-0")
            answerpagebuttoncontainer.classList.add("scale-100")
        }, 0)
    })

    questionpage.style.display = "none"
    answerpage.style.display = "block"

    body.classList.remove("bg-white")
    body.classList.add("bg-lightblue")

    logo.src = "/images/LogoSecondary.svg"
    navheader.classList.remove("text-darkblue")
    navheader.classList.add("text-white")

    leftblob.src = "/images/BlobSmallWhite.svg"
    rightblob.src = "/images/BlobBigWhite.svg"

    progressbarcontainer.classList.remove("text-darkblue")
    progressbarcontainer.classList.add("text-white")

    progressline.classList.remove("bg-lightblue")
    progressline.classList.add("bg-white")

    progressbar.classList.remove("bg-darkblue")
    progressbar.classList.add("bg-white")
}

answerpagebuttonyes.onclick = function() {
    if (category.textContent === 'Film & TV') {
        movblobs[correctMov.length].classList.remove("bg-lightgray")
        movblobs[correctMov.length].classList.add("bg-green")
        correctMov.push(1)
    }

    if (category.textContent === 'Geografi') {
        geoblobs[correctGeo.length].classList.remove("bg-lightgray")
        geoblobs[correctGeo.length].classList.add('bg-green')
        correctGeo.push(1)
    }

    if (category.textContent === 'Historia') {
        hisblobs[correctHis.length].classList.remove("bg-lightgray")
        hisblobs[correctHis.length].classList.add('bg-green')
        correctHis.push(1)
    }

    if (category.textContent === 'Musik') {
        musblobs[correctMus.length].classList.remove("bg-lightgray")
        musblobs[correctMus.length].classList.add('bg-green')
        correctMus.push(1)
    }

    if (category.textContent === 'Övrigt') {
        othblobs[correctOth.length].classList.remove("bg-lightgray")
        othblobs[correctOth.length].classList.add('bg-green')
        correctOth.push(1)
    }

    if (category.textContent === 'Vetenskap') {
        sciblobs[correctSci.length].classList.remove("bg-lightgray")
        sciblobs[correctSci.length].classList.add('bg-green')
        correctSci.push(1)
    }

    if (category.innerHTML === 'Sport') {
        spoblobs[correctSpo.length].classList.remove("bg-lightgray")
        spoblobs[correctSpo.length].classList.add('bg-green')
        correctSpo.push(1)
    }

    correct.push(1)
    count.push(1)

    questionnumber.innerHTML = "Fråga " + count.length + " av " + questions.length
    progressbar.style.transition = "width 1s"
    progressbar.style.width = (count.length / questions.length) * 100  + "%"
    
    body.classList.remove("bg-lightblue")
    body.classList.add("bg-white")

    answerpage.style.display = "none"

    progressbarcontainer.classList.remove("text-white")
    progressbarcontainer.classList.add("text-darkblue")

    progressline.classList.remove("bg-white")
    progressline.classList.add("bg-lightblue")

    progressbar.classList.remove("bg-white")
    progressbar.classList.add("bg-darkblue")

    logo.src = "images/LogoPrimary.svg"
    navheader.classList.remove("text-white")
    navheader.classList.add("text-darkblue")

    leftblob.src = "/images/BlobSmallBlue.svg"
    rightblob.src = "/images/BlobBigBlue.svg"    
    
    if (count.length > questions.length) {
        resultpage.style.display = "block"
        progressbarcontainer.style.display = "none"

        totalresult.innerHTML = correct.length + " av " + questions.length + " rätt"
        movblobs.forEach
    } else if (count.length <= questions.length) {
        questionpage.style.display = "block"

        category.innerHTML = questions[count.length - 1]["category"]
        question.innerHTML = questions[count.length - 1]["question"]
        answer.innerHTML = questions[count.length - 1]["answer"]
    }
    
}

answerpagebuttonno.onclick = function() {
    count.push(1)

    questionnumber.innerHTML = "Fråga " + count.length + " av " + questions.length
    progressbar.style.transition = "width 1s"
    progressbar.style.width = (count.length / questions.length) * 100 + "%"

    body.classList.remove("bg-lightblue")
    body.classList.add("bg-white")

    answerpage.style.display = "none"

    progressbarcontainer.classList.remove("text-white")
    progressbarcontainer.classList.add("text-darkblue")

    progressline.classList.remove("bg-white")
    progressline.classList.add("bg-lightblue")

    progressbar.classList.remove("bg-white")
    progressbar.classList.add("bg-darkblue")

    logo.src = "images/LogoPrimary.svg"
    navheader.classList.remove("text-white")
    navheader.classList.add("text-darkblue")

    leftblob.src = "/images/BlobSmallBlue.svg"
    rightblob.src = "/images/BlobBigBlue.svg"

    if (count.length > questions.length) {
        resultpage.style.display = "block"
        progressbarcontainer.style.display = "none"    

        totalresult.innerHTML = correct.length + " av " + questions.length + " rätt"
    } else if (count.length <= questions.length ) {
        questionpage.style.display = "block"

        category.innerHTML = questions[count.length - 1]["category"]
        question.innerHTML = questions[count.length - 1]["question"]
        answer.innerHTML = questions[count.length - 1]["answer"]
    }
    
}

resultpagebutton.onclick = function() {
    resultpage.style.display = "none"
    frontpage.style.display = "block"
}
