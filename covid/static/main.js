const url = 'https://api.covid19api.com/summary'
const lastUpdatedDate = document.getElementById('last-updated-date')
const totalCasesCount = document.getElementById('total-cases')
const newCasesCount = document.getElementById('new-cases')
const totalDeathsCount = document.getElementById('total-deaths')
const newDeathsCount = document.getElementById('new-deaths')
const totalRecoveredCount = document.getElementById('total-recovered')
const newRecoveredCount = document.getElementById('new-recovered')
const countryWiseData = document.getElementById('country-wise-data')

fetch(url)
.then(response => response.json())
.then(data => {
    lastUpdatedDate.innerHTML = data.Date
    totalCasesCount.innerHTML = data['Global']['TotalConfirmed']
    newCasesCount.innerHTML = data['Global']['NewConfirmed']
    totalDeathsCount.innerHTML = data['Global']['TotalDeaths']
    newDeathsCount.innerHTML = data['Global']['NewDeaths']
    totalRecoveredCount.innerHTML = data['Global']['TotalRecovered']
    newRecoveredCount.innerHTML = data['Global']['NewRecovered']

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
