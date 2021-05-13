const blogResult = document.getElementById('blog-result')
const searchInput = document.getElementById('searchInput')

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
        blogResult.innerHTML = output
    })
})