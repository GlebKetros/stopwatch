const time = document.getElementById('time')
const minutes = document.getElementById('minutes')
const seconds = document.getElementById('seconds')
const milliseconds = document.getElementById('milliseconds')
const start = document.getElementById('btn-start')
const stop = document.getElementById('btn-stop')
const clear = document.getElementById('btn-clear')

const loop = document.getElementById('btn-loop')
const loopBox = document.getElementById('loop-box')
const currentLoop = document.createElement('div')
currentLoop.className = 'loop'
currentLoop.id = 'current-loop'
currentLoop.innerHTML = `
    <p class="loop__title" id="current-loop-title">loop 1</p>

    <div class="loop__time">
        <p><span id="loopMinutes">00</span> :
        <span id="loopSeconds">00</span> :
        <span id="loopMilliseconds">00</span></p>
    </div>
`
const currentLooptitle = currentLoop.querySelector('#current-loop-title')
const loopMinutes = currentLoop.querySelector('#loopMinutes')
const loopSeconds = currentLoop.querySelector('#loopSeconds')
const loopMilliseconds = currentLoop.querySelector('#loopMilliseconds')



let ms = 0
let playMs

let loopMs = 0
let playLoopMs
let loopNumber = 1
// функция, добавляющая в начало ноль, если число одноразряддное
function addZero(num) {
    if (String(num).length === 1) {
        return '0' + num
    } else {
        return num
    }
}

// функция, обновляющая времяя на таймере
function updateTime() {
    milliseconds.innerHTML = addZero(ms % 100)
    seconds.innerHTML = addZero((Math.floor(ms / 100)) % 60)
    minutes.innerHTML = addZero(Math.floor(ms / 6000))
}

// функция убирает у элемента атрибут hidden, если он есть идобавляет, если его нет
function toggleHidden(element) {
    if (element.hasAttribute('hidden')) {
        element.removeAttribute('hidden')
    } else {
        element.setAttribute('hidden', '')
    }
}

// функция создает текущий круг
function createCurrentLoop() {
    
}

start.addEventListener('click', () => {
    console.log('start')
    clearInterval(playMs)
    playMs = setInterval(() => {
        updateTime()
        ms += 1
    }, 10)

    loopBox.prepend(currentLoop)

    playLoopMs = setInterval(() => {
        updateLoopTime()
        loopMs += 1
    }, 10)

    toggleHidden(stop)
    toggleHidden(start)
    toggleHidden(clear)
    toggleHidden(loop)


})

// при нажатии на "стоп" время перестает идти,
stop.addEventListener('click', () => {
    console.log('stop')
    clearInterval(playMs)
    clearInterval(playLoopMs)

    toggleHidden(stop)
    toggleHidden(start)
    toggleHidden(clear)
    toggleHidden(loop)
})

clear.addEventListener('click', () => {
    ms = 0
    clearInterval(playMs)   
    loopMs = 0
    loopNumber = 1
    currentLooptitle.innerHTML = `Loop ${loopNumber}`

    updateTime()
    loopBox.innerHTML = ''
})







// =================== loops
// функция, которая создает loop с текущим временем
function createLoop() {
    const loop = document.createElement('div')
    loop.className = 'loop'

    const loopTitle = document.createElement('p')
    loopTitle.className = 'loop__title'
    loopTitle.innerHTML = `Loop ${loopNumber}`

    const loopTime = document.createElement('p')
    loopTime.className = 'loop__time'
    loopTime.innerText = `${loopMinutes.innerText} : ${loopSeconds.innerText} : ${loopMilliseconds.innerText}`

    loop.append(loopTitle, loopTime)

    currentLoop.insertAdjacentElement('afterend', loop)
    return loop
}

// функция, обновляющая времяя круга
function updateLoopTime() {
    loopMilliseconds.innerHTML = addZero(loopMs % 100)
    loopSeconds.innerHTML = addZero((Math.floor(loopMs / 100)) % 60)
    loopMinutes.innerHTML = addZero(Math.floor(loopMs / 6000))
}

loop.addEventListener('click', function() {
    createLoop()
    loopMs = 0
    loopNumber += 1
    currentLooptitle.innerHTML = `Loop ${loopNumber}`
})