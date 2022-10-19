// Our main CSS
import '../css/app.css'
  

/**
* We'll load the axios HTTP library which allows us to easily issue requests
* to our Laravel back-end. This library automatically handles sending the
* CSRF token as a header based on the value of the 'XSRF' token cookie.
*/

import axios from 'axios'
window.axios = axios

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

import { spline } from '@georgedoescode/spline';
import { createNoise2D } from 'simplex-noise';



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
const resultpagetext = document.getElementById('result-page-text')
const resultpageblobs = document.getElementById('result-page-blobs')
const resultpagebutton = document.getElementById('result-page-button')
const resultpagebuttoncontainer = document.getElementById('result-page-button-container')

const logo = document.getElementById('logo')
const navheader = document.getElementById('nav-header')
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

//Animering av blobbar
const leftblob = document.getElementById('left-blob')
const rightblob = document.getElementById('right-blob')

function createPoints() {
    const points = []
    const numPoints = 6
    const angleStep = (Math.PI * 2) / numPoints
    const rad = 75

    for (let i = 1; i <= numPoints; i++) {
        const theta = i * angleStep

        const x = 100 + Math.cos(theta) * rad
        const y = 100 + Math.sin(theta) * rad

        points.push({
            x: x,
            y: y,
            originX: x,
            originY: y,
            noiseOffsetX: Math.random() * 1000,
            noiseOffsetY: Math.random() * 1000,
        })
    }
    return points
}

const points = createPoints()

function map(n, start1, end1, start2, end2) {
    return ((n - start1) / (end1 - start1)) * (end2 - start2) + start2
}

const simplex = new createNoise2D()

let noiseStep = 0.0025;

function noise(x, y) {
  return simplex(x, y);
};

(function animate() {
    leftblob.setAttribute('d', spline(points, 1, true));
    rightblob.setAttribute('d', spline(points, 1, true));
    
    requestAnimationFrame(animate)

    for (let i = 0; i < points.length; i++) {
        const point = points[i]

        const nX= noise(point.noiseOffsetX, point.noiseOffsetX)
        const nY= noise(point.noiseOffsetY, point.noiseOffsetY)

        const x = map(nX, -1, 1, point.originX - 5, point.originX + 5)
        const y = map(nY, -1, 1, point.originY - 20, point.originY + 20)

        point.x = x
        point.y = y

        point.noiseOffsetX += noiseStep
        point.noiseOffsetY += noiseStep
    }
})()

//End of animation

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

const animationduration = 500

setTimeout(function() {
    frontpage.style.display = 'block'
}, 0)

setTimeout(function() {
    frontpagetext.classList.remove('scale-0')
    frontpagetext.classList.add('scale-100')
}, 0.5*animationduration)

setTimeout(function() {
    frontpagebuttoncontainer.classList.remove('scale-0')
    frontpagebuttoncontainer.classList.add('scale-100')
}, 1*animationduration)


frontpagebutton.onclick = function() {
    axios.get('/questions').then(response => {
        resultpagebutton.disabled = false
        frontpagebutton.disabled = true

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

        for (var i = 0; i < blobs.length; i++) {
            blobs[i].classList.remove('bg-green')
            blobs[i].classList.add('bg-lightgray')
        }

        count.push(1)

        body.classList.remove('duration-0')
        body.classList.add('duration-500')

        logo.classList.remove('duration-0')
        logo.classList.add('duration-500')

        navheader.classList.remove('duration-0')
        navheader.classList.add('duration-500')

        progressbarcontainer.classList.remove('duration-0')
        progressbarcontainer.classList.add('duration-300')

        frontpagetext.classList.remove('scale-100')
        frontpagetext.classList.add('scale-0')

        setTimeout(function() {
            frontpagebuttoncontainer.classList.remove('scale-100')
            frontpagebuttoncontainer.classList.add('scale-0')
        }, 0.5*animationduration)

        setTimeout(function() {
            frontpage.style.display = 'none'
            questionpage.style.display = 'block'
            progressbarcontainer.style.display = 'block'

            progressbar.style.width = (count.length / questions.length) * 100 + '%'
            questionnumber.innerHTML = 'Fråga ' + count.length + ' av ' + questions.length

            category.innerHTML = questions[count.length - 1]['category']
            question.innerHTML = questions[count.length - 1]['question']
            answer.innerHTML = questions[count.length - 1]['answer']
        }, 1.5*animationduration)
            
        setTimeout(function() {
            questionpagetext.classList.remove('scale-0')
            questionpagetext.classList.add('scale-100')
        }, 1.6*animationduration)

        setTimeout(function() {
            questionpagebuttoncontainer.classList.remove('scale-0')
            questionpagebuttoncontainer.classList.add('scale-100')
        }, 2.1*animationduration)

        setTimeout(function() {
            progressbarcontainer.classList.remove('scale-0')
            progressbarcontainer.classList.add('scale-100')
        }, 2.6*animationduration)
    })
}

questionpagebutton.onclick = function() {
    frontpagebutton.disabled = false
    answerpagebuttonyes.disabled = false
    answerpagebuttonno.disabled = false
    questionpagebutton.disabled = true

    questionpagetext.classList.remove('scale-100')
    questionpagetext.classList.add('scale-0')

    setTimeout(function() {
        questionpagebuttoncontainer.classList.remove('scale-100')
        questionpagebuttoncontainer.classList.add('scale-0')
    }, 0.5*animationduration)

    setTimeout(function() {
        questionpage.style.display = 'none'
        answerpage.style.display = 'block'

        body.classList.remove('bg-white')
        body.classList.add('bg-lightblue')

        logo.src = '/images/LogoSecondary.svg'
        navheader.classList.remove('text-darkblue')
        navheader.classList.add('text-white')

        leftblob.style.fill = 'white'
        rightblob.style.fill = 'white'

        progressbarcontainer.classList.remove('text-darkblue')
        progressbarcontainer.classList.add('text-white')

        progressline.classList.remove('bg-lightblue')
        progressline.classList.add('bg-white')

        progressbar.classList.remove('bg-darkblue')
        progressbar.classList.add('bg-white')
    }, 1.5*animationduration)
        
    setTimeout(function() {
        answerpagetext.classList.remove('scale-0')
        answerpagetext.classList.add('scale-100')
    }, 1.6*animationduration) 

    setTimeout(function() {
        answerpagebuttoncontainer.classList.remove('scale-0')
        answerpagebuttoncontainer.classList.add('scale-100')
    }, 2.1*animationduration) 
}

answerpagebuttonyes.onclick = function() {
    questionpagebutton.disabled = false
    answerpagebuttonyes.disabled = true
    answerpagebuttonno.disabled = true

    if (category.textContent === 'Film & TV') {
        movblobs[correctMov.length].classList.remove('bg-lightgray')
        movblobs[correctMov.length].classList.add('bg-green')
        correctMov.push(1)
    }

    if (category.textContent === 'Geografi') {
        geoblobs[correctGeo.length].classList.remove('bg-lightgray')
        geoblobs[correctGeo.length].classList.add('bg-green')
        correctGeo.push(1)
    }

    if (category.textContent === 'Historia') {
        hisblobs[correctHis.length].classList.remove('bg-lightgray')
        hisblobs[correctHis.length].classList.add('bg-green')
        correctHis.push(1)
    }

    if (category.textContent === 'Musik') {
        musblobs[correctMus.length].classList.remove('bg-lightgray')
        musblobs[correctMus.length].classList.add('bg-green')
        correctMus.push(1)
    }

    if (category.textContent === 'Övrigt') {
        othblobs[correctOth.length].classList.remove('bg-lightgray')
        othblobs[correctOth.length].classList.add('bg-green')
        correctOth.push(1)
    }

    if (category.textContent === 'Vetenskap') {
        sciblobs[correctSci.length].classList.remove('bg-lightgray')
        sciblobs[correctSci.length].classList.add('bg-green')
        correctSci.push(1)
    }

    if (category.textContent === 'Sport') {
        spoblobs[correctSpo.length].classList.remove('bg-lightgray')
        spoblobs[correctSpo.length].classList.add('bg-green')
        correctSpo.push(1)
    }

    correct.push(1)
    count.push(1)

    answerpagetext.classList.remove('scale-100')
    answerpagetext.classList.add('scale-0')

    setTimeout(function() {
        answerpagebuttoncontainer.classList.remove('scale-100')
        answerpagebuttoncontainer.classList.add('scale-0')
    }, 0.5*animationduration)

    setTimeout(function() {
        answerpage.style.display = 'none'

        body.classList.remove('bg-lightblue')
        body.classList.add('bg-white')

        leftblob.style.fill = '#7678ED'
        rightblob.style.fill = '#7678ED'
    
        progressbar.style.transition = 'width 1s'
        questionnumber.innerHTML = 'Fråga ' + count.length + ' av ' + questions.length
        progressbar.style.width = (count.length / questions.length) * 100  + '%'

        progressbarcontainer.classList.remove('text-white')
        progressbarcontainer.classList.add('text-darkblue')

        progressline.classList.remove('bg-white')
        progressline.classList.add('bg-lightblue')

        progressbar.classList.remove('bg-white')
        progressbar.classList.add('bg-darkblue')

        logo.src = 'images/LogoPrimary.svg'
        navheader.classList.remove('text-white')
        navheader.classList.add('text-darkblue')
    }, 1.5*animationduration)
        
    if (count.length > questions.length) {

        setTimeout(function() {
            progressbarcontainer.classList.remove('scale-100')
            progressbarcontainer.classList.add('scale-0')
        }, 1*animationduration)

        setTimeout(function() {
            resultpage.style.display = 'block'
            progressbarcontainer.style.display = 'none'
            totalresult.innerHTML = correct.length + ' av ' + questions.length + ' rätt'
        }, 2.5*animationduration)

        setTimeout(function() {
            resultpagetext.classList.remove('scale-0')
            resultpagetext.classList.add('scale-100')
        }, 2.6*animationduration)

        setTimeout(function() {
            resultpageblobs.classList.remove('scale-0')
            resultpageblobs.classList.add('scale-100')
        }, 3.1*animationduration)

        setTimeout(function() {
            resultpagebuttoncontainer.classList.remove('scale-0')
            resultpagebuttoncontainer.classList.add('scale-100')
        }, 3.6*animationduration)

    } else if (count.length <= questions.length) {
        setTimeout(function() {
            questionpage.style.display = 'block'

            category.innerHTML = questions[count.length - 1]['category']
            question.innerHTML = questions[count.length - 1]['question']
            answer.innerHTML = questions[count.length - 1]['answer']
        }, 1.5*animationduration)

        setTimeout(function() {
            questionpagetext.classList.remove('scale-0')
            questionpagetext.classList.add('scale-100')
        }, 1.6*animationduration)

        setTimeout(function() {
            questionpagebuttoncontainer.classList.remove('scale-0')
            questionpagebuttoncontainer.classList.add('scale-100')
        }, 2.1*animationduration)
    }
}

answerpagebuttonno.onclick = function() {
    questionpagebutton.disabled = false
    answerpagebuttonyes.disabled = true
    answerpagebuttonno.disabled = true

    count.push(1)

    answerpagetext.classList.remove('scale-100')
    answerpagetext.classList.add('scale-0')

    setTimeout(function() {
        answerpagebuttoncontainer.classList.remove('scale-100')
        answerpagebuttoncontainer.classList.add('scale-0')
    }, 0.5*animationduration)

    setTimeout(function() {
        answerpage.style.display = 'none'

        body.classList.remove('bg-lightblue')
        body.classList.add('bg-white')

        leftblob.style.fill = '#7678ED'
        rightblob.style.fill = '#7678ED'
    
        progressbar.style.transition = 'width 1s'
        questionnumber.innerHTML = 'Fråga ' + count.length + ' av ' + questions.length
        progressbar.style.width = (count.length / questions.length) * 100  + '%'

        progressbarcontainer.classList.remove('text-white')
        progressbarcontainer.classList.add('text-darkblue')

        progressline.classList.remove('bg-white')
        progressline.classList.add('bg-lightblue')

        progressbar.classList.remove('bg-white')
        progressbar.classList.add('bg-darkblue')

        logo.src = 'images/LogoPrimary.svg'
        navheader.classList.remove('text-white')
        navheader.classList.add('text-darkblue')
    }, 1.5*animationduration)
        
    if (count.length > questions.length) {

        setTimeout(function() {
            progressbarcontainer.classList.remove('scale-100')
            progressbarcontainer.classList.add('scale-0')
        }, 1*animationduration)

        setTimeout(function() {
            resultpage.style.display = 'block'
            progressbarcontainer.style.display = 'none'
            totalresult.innerHTML = correct.length + ' av ' + questions.length + ' rätt'
        }, 2.5*animationduration)

        setTimeout(function() {
            resultpagetext.classList.remove('scale-0')
            resultpagetext.classList.add('scale-100')
        }, 2.6*animationduration)

        setTimeout(function() {
            resultpageblobs.classList.remove('scale-0')
            resultpageblobs.classList.add('scale-100')
        }, 3.1*animationduration)

        setTimeout(function() {
            resultpagebuttoncontainer.classList.remove('scale-0')
            resultpagebuttoncontainer.classList.add('scale-100')
        }, 3.6*animationduration)

    } else if (count.length <= questions.length) {
        setTimeout(function() {
            questionpage.style.display = 'block'

            category.innerHTML = questions[count.length - 1]['category']
            question.innerHTML = questions[count.length - 1]['question']
            answer.innerHTML = questions[count.length - 1]['answer']
        }, 1.5*animationduration)

        setTimeout(function() {
            questionpagetext.classList.remove('scale-0')
            questionpagetext.classList.add('scale-100')
        }, 1.6*animationduration)

        setTimeout(function() {
            questionpagebuttoncontainer.classList.remove('scale-0')
            questionpagebuttoncontainer.classList.add('scale-100')
        }, 2.1*animationduration)
    }
}

resultpagebutton.onclick = function() {
    answerpagebuttonyes.disabled = false
    answerpagebuttonno.disabled = false
    resultpagebutton.disabled = true

    body.classList.remove('duration-500')
    body.classList.add('duration-0')

    resultpagetext.classList.remove('scale-100')
    resultpagetext.classList.add('scale-0')

    setTimeout(function() {
        resultpageblobs.classList.remove('scale-100')
        resultpageblobs.classList.add('scale-0')
    }, 0.5*animationduration)
    

    setTimeout(function() {
        resultpagebuttoncontainer.classList.remove('scale-100')
        resultpagebuttoncontainer.classList.add('scale-0')
    }, 1*animationduration)

    setTimeout(function() {
        resultpage.style.display = 'none'
        frontpage.style.display = 'block'
    }, 2*animationduration)
        

    setTimeout(function() {
        frontpagetext.classList.remove('scale-0')
        frontpagetext.classList.add('scale-100')
    }, 2.1*animationduration) 

    setTimeout(function() {
        frontpagebuttoncontainer.classList.remove('scale-0')
        frontpagebuttoncontainer.classList.add('scale-100')
    }, 2.6*animationduration) 
}
