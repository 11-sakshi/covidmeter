from django.shortcuts import render
from . import scrape

# Create your views here.
def home(request):
    url = 'https://api.covid19api.com/summary'
    data, countries = scrape.get_data(url)
    context = {
        'data': data,
        'countries': countries
    }
    return render(request, 'index.html', context=context)