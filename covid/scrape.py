import requests
from operator import itemgetter

def get_data(url):
    response = requests.get(url)
    data = response.json()
    countries = data['Countries']
    countries = sorted(countries, key=itemgetter('TotalConfirmed'), reverse=True)
    return data, countries