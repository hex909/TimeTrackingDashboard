if (!localStorage.getItem('data')) {
    localStorage.setItem('data', 'weekly')
}

let jsonData
let index = 0;



const cards = document.querySelectorAll('.cards')

const dailyBtn = document.querySelector('.daily')
const weeklyBtn = document.querySelector('.weekly')
const monthlyBtn = document.querySelector('.monthly')

switch (localStorage.getItem('data')) {
    case 'daily':
        data('daily')
        document.querySelector('.monthly').classList.remove('active')
        document.querySelector('.weekly').classList.remove('active')
        document.querySelector('.daily').classList.add('active')
        break;

    case 'weekly':
        data('weekly')
        document.querySelector('.monthly').classList.remove('active')
        document.querySelector('.daily').classList.remove('active')
        document.querySelector('.weekly').classList.add('active')
    break;

    case 'monthly':
        data('monthly')
        document.querySelector('.weekly').classList.remove('active')
        document.querySelector('.daily').classList.remove('active')
        document.querySelector('.monthly').classList.add('active')

    break;
}


async function data(type) {
    if (!jsonData) {
        let fetchdata = await fetch('./../data.json');
        jsonData = await fetchdata.json()
    }
    console.log(type);

    for (let i of cards) {
        i.querySelector('.currentHours').textContent = `${jsonData[index].timeframes[type].current}hrs`
        if (type === 'daily'){
            localStorage.setItem('data', 'daily')
            i.querySelector('.previous').textContent =  `Day - ${jsonData[index].timeframes[type].previous}hrs`
        }else if (type === 'weekly') {
            i.querySelector('.previous').textContent =  `Week - ${jsonData[index].timeframes[type].previous}hrs`
            localStorage.setItem('data', 'weekly')
        }else {
            i.querySelector('.previous').textContent =  `Month - ${jsonData[index].timeframes[type].previous}hrs`
            localStorage.setItem('data', 'monthly')
            console.log('monthly');
        }
        index++
    }
    index = 0
}


dailyBtn.addEventListener('click', async (e) => {
    if (!e.currentTarget.classList.contains('active')) {
        monthlyBtn.classList.remove('active')
        weeklyBtn.classList.remove('active')
        dailyBtn.classList.add('active')
        localStorage.setItem('data', 'daily')
        await data('daily')
    }
})

weeklyBtn.addEventListener('click', (e) => {
    if (!e.currentTarget.classList.contains('active')) {
        monthlyBtn.classList.remove('active')
        dailyBtn.classList.remove('active')
        weeklyBtn.classList.add('active')
        data('weekly')
        localStorage.setItem('data', 'weekly')

    }
})

monthlyBtn.addEventListener('click', (e) => {
    if (!e.currentTarget.classList.contains('active')) {
        weeklyBtn.classList.remove('active')
        dailyBtn.classList.remove('active')
        monthlyBtn.classList.add('active')
        data('monthly')
        localStorage.setItem('data', 'monthly')

    }
})