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

let myChart = document.getElementById('myChart')

checkButton.addEventListener('click', () => {
    myChart.parentElement.classList.remove('d-none')
    myChart.classList.remove('d-none')
    getCasesTimeSeriesData()
    fetch(url)
    .then(response => response.json())
    .then(data => displayCountryData(data, countryInput.value))
})

function getCasesTimeSeriesData() {
    let url = 'https://api.covid19india.org/data.json'
    let date = []
    let dailyConfirmed = []
    let dailyDeceased = []
    let dailyRecovered = []

    fetch(url)
    .then(response => response.json())
    .then(data => {
        let cases_time_series = data['cases_time_series']
        cases_time_series.forEach(cases => {
            dailyConfirmed.push(cases['dailyconfirmed'])
            dailyDeceased.push(cases['dailydeceased'])
            dailyRecovered.push(cases['dailyrecovered'])
            date.push(cases['date'])
        })
        new Chart(myChart.getContext('2d'), {
            type: 'line',
            data: {
                labels: date,
                datasets: [{ 
                    data: dailyConfirmed,
                    label: "Daily Confirmed",
                    borderColor: "blue",
                    fill: false
                },
                { 
                    data: dailyDeceased,
                    label: "Daily Deceased",
                    borderColor: "red",
                    fill: false
                },
                { 
                    data: dailyRecovered,
                    label: "Daily Recovered",
                    borderColor: "green",
                    fill: false
                }
                ]
            },
            options: {
                responsive: true,
                title: {
                display: true,
                text: 'World population per region (in millions)'
                }
            }
    });
    })
}

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