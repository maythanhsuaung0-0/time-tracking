let cards = document.querySelectorAll('.card__time')
let ttl = document.querySelectorAll('.card__ttl')

let timing = document.querySelectorAll('.timing')
let day = document.querySelector('#day')
let week = document.querySelector('#week')
let mth = document.querySelector('#mth')

let activenow = day.id
let mapTitle = (e) => {
    return `<h5 class='card__ttl'>${e}</h5>`
}
let mapData = (e) => {
    return `<div class='time-gap'><div class="current">${e.current} hrs</div><span class="prev">last day - ${e.previous} hrs</span></div>`
}
let loopingData = (e, x) => {
    for (let i = 0; i < e.length; i++) {
        for (let j = 0; j < x.length; j++) {
            if (i === j) {
                e[i].innerHTML = x[j]
            }
            else {
                continue
            }
        }
    }
}

const hoverCards = () => {

    cards.forEach(e => {
        e.addEventListener('mouseover', () => {
            e.classList.add('activee')
        });
        e.addEventListener('mouseout', () => {
            e.classList.remove('activee')
        })
    })
}
const fetchDay = () => {
    fetch('data.json').then(res => res.json()).then(data => {
        let title = data.map(e => mapTitle(e.title));
        let dayhtml = data.map(e => mapData(e.timeframes.daily));
        loopingData(ttl, title)
        loopingData(timing, dayhtml)

    })
}
const fetchWeek = () => {
    fetch('data.json').then(res => res.json()).then(data => {
        let title = data.map(e => mapTitle(e.title));
        let weekhtml = data.map(e => mapData(e.timeframes.weekly));
        loopingData(ttl, title)
        loopingData(timing, weekhtml)

    })
}
const fetchMth = () => {
    fetch('data.json').then(res => res.json()).then(data => {
        let title = data.map(e => mapTitle(e.title));
        let mthhtml = data.map(e => mapData(e.timeframes.monthly));
        loopingData(ttl, title)
        loopingData(timing, mthhtml)

    })
}

day.addEventListener('click', () => {
    day.classList.add('active')
    week.classList.remove('active')
    mth.classList.remove('active')
    fetchDay()
})
week.addEventListener('click', () => {
    week.classList.add('active')
    day.classList.remove('active')
    mth.classList.remove('active')
    activenow = week.id
    fetchWeek()
})
mth.addEventListener('click', () => {
    mth.classList.add('active')
    week.classList.remove('active')
    day.classList.remove('active')
    activenow = mth.id
    fetchMth()
})
day.classList.add('active')
fetchDay()
hoverCards()

