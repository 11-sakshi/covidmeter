const url = 'https://api.covid19api.com/summary'
const lastUpdatedDate = document.getElementById('last-updated-date')
const totalCasesCount = document.getElementById('total-cases')
const newCasesCount = document.getElementById('new-cases')
const totalDeathsCount = document.getElementById('total-deaths')
const newDeathsCount = document.getElementById('new-deaths')
const totalRecoveredCount = document.getElementById('total-recovered')
const newRecoveredCount = document.getElementById('new-recovered')
const countryWiseData = document.getElementById('country-wise-data')

const resultTotalCasesCount = document.getElementById('result-total-cases')
const resultNewCasesCount = document.getElementById('result-new-cases')
const resultTotalDeathsCount = document.getElementById('result-total-deaths')
const resultNewDeathsCount = document.getElementById('result-new-deaths')
const resultTotalRecoveredCount = document.getElementById('result-total-recovered')
const resultNewRecoveredCount = document.getElementById('result-new-recovered')
const resultCountryWiseData = document.getElementById('result-country-wise-data')

const countryInput = document.getElementById('country-input')
const checkButton = document.getElementById('check')
const result = document.getElementById('result')

function displayCountryData(data, countryName) {
    let countries = data['Countries']
    result.classList.remove('d-none')
    countries.forEach(country => {
        if (country['Country'] == countryName) {
            resultTotalCasesCount.innerHTML = commaSeperatedInteger(country['TotalConfirmed'])
            resultNewCasesCount.innerHTML = commaSeperatedInteger(country['NewConfirmed'])
            resultTotalDeathsCount.innerHTML = commaSeperatedInteger(country['TotalDeaths'])
            resultNewDeathsCount.innerHTML = commaSeperatedInteger(country['NewDeaths'])
            resultTotalRecoveredCount.innerHTML = commaSeperatedInteger(country['TotalRecovered'])
            resultNewRecoveredCount.innerHTML = commaSeperatedInteger(country['NewRecovered'])
        }
    })
}

function commaSeperatedInteger(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

fetch(url)
.then(response => response.json())
.then(data => {
    lastUpdatedDate.innerHTML = data.Date
    totalCasesCount.innerHTML = commaSeperatedInteger(data['Global']['TotalConfirmed'])
    newCasesCount.innerHTML = commaSeperatedInteger(data['Global']['NewConfirmed'])
    totalDeathsCount.innerHTML = commaSeperatedInteger(data['Global']['TotalDeaths'])
    newDeathsCount.innerHTML = commaSeperatedInteger(data['Global']['NewDeaths'])
    totalRecoveredCount.innerHTML = commaSeperatedInteger(data['Global']['TotalRecovered'])
    newRecoveredCount.innerHTML = commaSeperatedInteger(data['Global']['NewRecovered'])

    checkButton.addEventListener('click', () => { displayCountryData(data, countryInput.value) })

//     for (let i=0; i<data['Countries'].length; i++) {
//         countryWiseData.innerHTML += "<tr class='orbitron'>"+
//         "<td>"+(i+1)+"</td>"+
//         "<td>"+data['Countries'][i]['Country']+"</td>"+
//         "<td>"+data['Countries'][i]['TotalConfirmed']+"</td>"+
//         "<td>"+data['Countries'][i]['NewConfirmed']+"</td>"+
//         "<td>"+data['Countries'][i]['TotalDeaths']+"</td>"+
//         "<td>"+data['Countries'][i]['NewDeaths']+"</td>"+
//         "<td>"+data['Countries'][i]['TotalRecovered']+"</td>"+
//         "<td>"+data['Countries'][i]['NewRecovered']+"</td>"
//         +"</tr>"      
//     }
})
