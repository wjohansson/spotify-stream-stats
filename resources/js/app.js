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


const html = document.getElementById('html')
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

const logoblob = document.getElementById('logo-blob')
const logodonkey = document.getElementById('logo-donkey')
const logoeye = document.getElementById('logo-eye')

const navheader = document.getElementById('nav-header')
const progressbarcontainer = document.getElementById('progress-bar-container')
const progressline = document.getElementById('progress-line')
const progressbar = document.getElementById('progress-bar')
const questionnumber = document.getElementById('question-number')
const totalresult = document.getElementById('total-result')

let blobs
let thiscategoryblobs
let colorblobs

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
    const rad = 90

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
        const y = map(nY, -1, 1, point.originY - 10, point.originY + 10)

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
let correctCategory = []

const transitionduration = 0 //Ändra tillbaka till 500

setTimeout(function() {
    html.style.display = 'block'
    frontpage.style.display = 'block'
}, 0)

setTimeout(function() {
    frontpagetext.classList.remove('scale-0')
    frontpagetext.classList.add('scale-100')
}, 0.5*transitionduration)

setTimeout(function() {
    frontpagebuttoncontainer.classList.remove('scale-0')
    frontpagebuttoncontainer.classList.add('scale-100')
}, 1*transitionduration)


frontpagebutton.onclick = function() {
    axios.get('/questions').then(response => {
        resultpagebutton.disabled = false
        frontpagebutton.disabled = true

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

        logoblob.classList.remove('duration-0')
        logoblob.classList.add('duration-500')

        logodonkey.classList.remove('duration-0')
        logodonkey.classList.add('duration-500')

        logoeye.classList.remove('duration-0')
        logoeye.classList.add('duration-500')

        navheader.classList.remove('duration-0')
        navheader.classList.add('duration-500')

        progressbarcontainer.classList.remove('duration-0')
        progressbarcontainer.classList.add('duration-300')

        frontpagetext.classList.remove('scale-100')
        frontpagetext.classList.add('scale-0')

        setTimeout(function() {
            frontpagebuttoncontainer.classList.remove('scale-100')
            frontpagebuttoncontainer.classList.add('scale-0')
        }, 0.5*transitionduration)

        setTimeout(function() {
            frontpage.style.display = 'none'
            questionpage.style.display = 'block'
            progressbarcontainer.style.display = 'block'

            progressbar.style.width = (count.length / questions.length) * 100 + '%'
            questionnumber.innerHTML = 'Fråga ' + count.length + ' av ' + questions.length

            category.innerHTML = questions[count.length - 1]['category']
            question.innerHTML = questions[count.length - 1]['question']
            answer.innerHTML = questions[count.length - 1]['answer']
        }, 1.5*transitionduration)
            
        setTimeout(function() {
            questionpagetext.classList.remove('scale-0')
            questionpagetext.classList.add('scale-100')
        }, 1.6*transitionduration)

        setTimeout(function() {
            questionpagebuttoncontainer.classList.remove('scale-0')
            questionpagebuttoncontainer.classList.add('scale-100')
        }, 2.1*transitionduration)

        setTimeout(function() {
            progressbarcontainer.classList.remove('scale-0')
            progressbarcontainer.classList.add('scale-100')
        }, 2.6*transitionduration)
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
    }, 0.5*transitionduration)

    setTimeout(function() {
        questionpage.style.display = 'none'
        answerpage.style.display = 'block'

        body.classList.remove('bg-white')
        body.classList.add('bg-lightblue')

        logoblob.style.fill = '#FFFFFF'
        logodonkey.style.fill = '#7678ED'
        logoeye.style.fill = '#7678ED'

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
    }, 1.5*transitionduration)
        
    setTimeout(function() {
        answerpagetext.classList.remove('scale-0')
        answerpagetext.classList.add('scale-100')
    }, 1.6*transitionduration) 

    setTimeout(function() {
        answerpagebuttoncontainer.classList.remove('scale-0')
        answerpagebuttoncontainer.classList.add('scale-100')
    }, 2.1*transitionduration) 
}

answerpagebuttonyes.onclick = function() {
    questionpagebutton.disabled = false
    answerpagebuttonyes.disabled = true
    answerpagebuttonno.disabled = true

    correctCategory[category.textContent].push(1)

    correct.push(1)
    count.push(1)

    answerpagetext.classList.remove('scale-100')
    answerpagetext.classList.add('scale-0')

    setTimeout(function() {
        answerpagebuttoncontainer.classList.remove('scale-100')
        answerpagebuttoncontainer.classList.add('scale-0')
    }, 0.5*transitionduration)

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

        logoblob.style.fill = '#7678ED'
        logodonkey.style.fill = '#FFFFFF'
        logoeye.style.fill = '#FFFFFF'

        navheader.classList.remove('text-white')
        navheader.classList.add('text-darkblue')
    }, 1.5*transitionduration)
        
    if (count.length > questions.length) {

        for (var key in correctCategory) {
            thiscategoryblobs = blobs.splice(0, 5)
            colorblobs = thiscategoryblobs.splice(0, correctCategory[key].length)
            
            for (var key in colorblobs) {
                colorblobs[key].classList.remove('bg-lightgray')
                colorblobs[key].classList.add('bg-green')
            }
        }

        setTimeout(function() {
            progressbarcontainer.classList.remove('scale-100')
            progressbarcontainer.classList.add('scale-0')
        }, 1*transitionduration)

        setTimeout(function() {
            resultpage.style.display = 'block'
            progressbarcontainer.style.display = 'none'
            totalresult.innerHTML = correct.length + ' av ' + questions.length + ' rätt'
        }, 2.5*transitionduration)

        setTimeout(function() {
            resultpagetext.classList.remove('scale-0')
            resultpagetext.classList.add('scale-100')
        }, 2.6*transitionduration)

        setTimeout(function() {
            resultpageblobs.classList.remove('scale-0')
            resultpageblobs.classList.add('scale-100')
        }, 3.1*transitionduration)

        setTimeout(function() {
            resultpagebuttoncontainer.classList.remove('scale-0')
            resultpagebuttoncontainer.classList.add('scale-100')
        }, 3.6*transitionduration)

    } else if (count.length <= questions.length) {
        setTimeout(function() {
            questionpage.style.display = 'block'

            category.innerHTML = questions[count.length - 1]['category']
            question.innerHTML = questions[count.length - 1]['question']
            answer.innerHTML = questions[count.length - 1]['answer']
        }, 1.5*transitionduration)

        setTimeout(function() {
            questionpagetext.classList.remove('scale-0')
            questionpagetext.classList.add('scale-100')
        }, 1.6*transitionduration)

        setTimeout(function() {
            questionpagebuttoncontainer.classList.remove('scale-0')
            questionpagebuttoncontainer.classList.add('scale-100')
        }, 2.1*transitionduration)
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
    }, 0.5*transitionduration)

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

        logoblob.style.fill = '#7678ED'
        logodonkey.style.fill = '#FFFFFF'
        logoeye.style.fill = '#FFFFFF'

        navheader.classList.remove('text-white')
        navheader.classList.add('text-darkblue')
    }, 1.5*transitionduration)
        
    if (count.length > questions.length) {

        setTimeout(function() {
            progressbarcontainer.classList.remove('scale-100')
            progressbarcontainer.classList.add('scale-0')
        }, 1*transitionduration)

        setTimeout(function() {
            resultpage.style.display = 'block'
            progressbarcontainer.style.display = 'none'
            totalresult.innerHTML = correct.length + ' av ' + questions.length + ' rätt'
        }, 2.5*transitionduration)

        setTimeout(function() {
            resultpagetext.classList.remove('scale-0')
            resultpagetext.classList.add('scale-100')
        }, 2.6*transitionduration)

        setTimeout(function() {
            resultpageblobs.classList.remove('scale-0')
            resultpageblobs.classList.add('scale-100')
        }, 3.1*transitionduration)

        setTimeout(function() {
            resultpagebuttoncontainer.classList.remove('scale-0')
            resultpagebuttoncontainer.classList.add('scale-100')
        }, 3.6*transitionduration)

    } else if (count.length <= questions.length) {
        setTimeout(function() {
            questionpage.style.display = 'block'

            category.innerHTML = questions[count.length - 1]['category']
            question.innerHTML = questions[count.length - 1]['question']
            answer.innerHTML = questions[count.length - 1]['answer']
        }, 1.5*transitionduration)

        setTimeout(function() {
            questionpagetext.classList.remove('scale-0')
            questionpagetext.classList.add('scale-100')
        }, 1.6*transitionduration)

        setTimeout(function() {
            questionpagebuttoncontainer.classList.remove('scale-0')
            questionpagebuttoncontainer.classList.add('scale-100')
        }, 2.1*transitionduration)
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
    }, 0.5*transitionduration)
    

    setTimeout(function() {
        resultpagebuttoncontainer.classList.remove('scale-100')
        resultpagebuttoncontainer.classList.add('scale-0')
    }, 1*transitionduration)

    setTimeout(function() {
        resultpage.style.display = 'none'
        frontpage.style.display = 'block'
    }, 2*transitionduration)
        

    setTimeout(function() {
        frontpagetext.classList.remove('scale-0')
        frontpagetext.classList.add('scale-100')
    }, 2.1*transitionduration) 

    setTimeout(function() {
        frontpagebuttoncontainer.classList.remove('scale-0')
        frontpagebuttoncontainer.classList.add('scale-100')
    }, 2.6*transitionduration) 
}
