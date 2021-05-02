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

checkButton.addEventListener('click', () => {
    console.log('in')
    fetch(url)
    .then(response => response.json())
    .then(data => displayCountryData(data, countryInput.value))
})

function displayCountryData(data, countryName) {
    console.log('in')
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