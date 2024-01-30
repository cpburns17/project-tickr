from flask import Flask, make_response, jsonify, request, session
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
import datetime
from flask_cors import CORS
from dotenv import dotenv_values
from flask_bcrypt import Bcrypt;
import requests;
from dotenv import dotenv_values
from models import db, User, Stock, Trades;
import random
import json

config = dotenv_values(".env")
config['my_key']

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///app.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.json.compact = False
bcrypt = Bcrypt(app)
migrate = Migrate(app, db)

db.init_app(app)



def random_stock():
    with open('tickers.json') as f:
        data = json.load(f)
        if data:
            return random.choice(data)
        else:
            return None



@app.get("/")
def index():
    return "Home"

@app.get('/random_stock')
def get_stocks():

    return {'stock': random_stock()}


@app.get("/overview/<ticker>")
def get_stock_overview(ticker):
    url = f"https://www.alphavantage.co/query?function=OVERVIEW&symbol={ticker}&apikey={config['my_key']}"
    r = requests.get(url)
    data = r.json() 
    d = {}
    d['name']= data.get('Name')
    d['symbol'] = data.get('Symbol')
    d['exchange'] = data.get('Exchange')
    d['description'] = data.get('Description')
    d['industry'] = data.get('Industry')
    d['fiftytwo_high'] = data.get('52WeekHigh')
    d['fiftytwo_low'] = data.get('52WeekLow')
    d['pe_ratio'] = data.get('PERatio')
    

    return d

@app.get("/stock_price/<ticker>")
def get_stock_pride(ticker):
    url = f'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol={ticker}&apikey={config["my_key"]}'
    r = requests.get(url)
    data = r.json() 
    
    global_quote = data.get('Global Quote', {})

    d = {

    'symbol': global_quote.get('01. symbol', ''),
    'open': global_quote.get('02. open', ''),
    'high': global_quote.get('03. high', ''),
    'low': global_quote.get('04. low', ''),
    'price': global_quote.get('05. price', ''),
    'volume': global_quote.get('06. volume', ''),
    'previous_close': global_quote.get('08. previous close', ''),

    }

    return d


@app.get("/intraday/<ticker>")
def get_stock_intraday(ticker):
    url = f'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol={ticker}&interval=5min&apikey={config["my_key"]}'
    r = requests.get(url)
    data = r.json() 

    time_series = data.get('Time Series (5min)', {})

    print(data)
    return data


@app.get("/news/<ticker>")
def get_stock_news(ticker):
    url = f'https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers={ticker}&apikey={config["my_key"]}'
    r = requests.get(url)
    data = r.json() 

    news_feed = data.get('feed', [])
    news_list = []

    for news in news_feed:
        d = {
            'title': news.get('title', ''),
            'url': news.get('url', ''),
            'published': news.get('time_published', ''),
            'authors': news.get('authors', ''),
            'summary': news.get('summary', ''),
            'image': news.get('banner_image', ''),
            'source_domain': news.get('source_domain', ''),
        }
        news_list.append(d)


    return news_list


# @app.get('/search')
# def search_by_ticker():
#     url = f'https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=tesco&apikey={config["my_key"]}'
#     r = requests.get(url)
#     data = r.json()

#     search_results = data.get('bestMatches', [])
#     results_list = []
#     for result in search_results:
#         d = {
#         'symbol': result.get('1. symbol', ''),
#         'name': result.get('2, name', ''),
#         }
#         results_list.append(d)

#     return results_list

# @app.get('/top_trades')
# def get_top_trades():
#     url = f'https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey={config["my_key"]}'
#     r = requests.get(url)
#     data = r.json()
#     print(data)
#     return data


app.get('/stock/<int:id>')
def get_stock_by_id(id):
    pass






# link for sec : https://www.sec.gov/files/company_tickers.json
# link for dumb stock without index: https://dumbstockapi.com/stock?exchanges=NYSE
# github with ticker info in jsons: https://github.com/rreichel3/US-Stock-Symbols




# Load your JSON file
with open('db.json', 'r') as file:
    object_list = json.load(file)

# Add an 'id' key to each object
for i, obj in enumerate(object_list):
    obj['id'] = i + 1  # IDs start from 1

# Save the modified JSON back to the file
with open('tickers.json', 'w') as file:
    json.dump(object_list, file, indent=2)


if __name__ == "__main__":
    app.run(port=5555, debug=True)
