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

const searchInput = document.getElementById('searchInput')

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

searchInput.addEventListener('keyup', () => {
    let query = searchInput.value
    let url = `https://api.cord19.vespa.ai/search/?query=${query}`
    fetch(url, {
        method: 'POST'
    })
    .then(response => response.json())
    .then(data => {
        let articles = data['root']['children']
        let output = ''
        articles.forEach(article => {
            console.log(article)
            let authors = article.fields.authors
            let authorNames = ''
            authors.forEach(author => {
                authorNames += `${author.name},`
            })
            output += `<div class="card text-left" style="width: 100%;">
                <div class="card-body">
                    <h5 class="card-title">${article.fields.title}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">Authors - ${authorNames}</h6>
                    <p class="card-text">${article.fields.abstract}...</p>
                    <u><a href="${article.fields.doi}" class="text-white" target='_blank'>Full Article</a></u> |
                    <u><a href="${article.fields.url}" class="text-white" target='_blank'>Research Paper</a></u>
                </div>
            </div><br>`
        })
        result.innerHTML = output
    })
})

fetch(url)
.then(response => response.json())
.then(data => {
    // lastUpdatedDate.innerHTML = data.Date
    // totalCasesCount.innerHTML = commaSeperatedInteger(data['Global']['TotalConfirmed'])
    // newCasesCount.innerHTML = commaSeperatedInteger(data['Global']['NewConfirmed'])
    // totalDeathsCount.innerHTML = commaSeperatedInteger(data['Global']['TotalDeaths'])
    // newDeathsCount.innerHTML = commaSeperatedInteger(data['Global']['NewDeaths'])
    // totalRecoveredCount.innerHTML = commaSeperatedInteger(data['Global']['TotalRecovered'])
    // newRecoveredCount.innerHTML = commaSeperatedInteger(data['Global']['NewRecovered'])

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