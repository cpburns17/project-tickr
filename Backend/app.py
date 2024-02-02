from flask import Flask, make_response, jsonify, request, session
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
import datetime
from flask_cors import CORS
from dotenv import dotenv_values
from flask_bcrypt import Bcrypt;
import requests;
from dotenv import dotenv_values
from models import db, User, Trades;
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
        
def json_list():
    with open('tickers.json') as f:
        data = json.load(f)
        if data:
            return data
        else:
            return None

@app.get("/")
def index():
    return "Home"

@app.get('/tickers_list')
def get_tickers():
    stocks = json_list()

    return stocks


@app.get('/random_stock')
def get_stocks():
    d  = {}
    fetched = False
    while not fetched:
        stock = random_stock()
        # print(stock['ticker'])
        url = f"https://www.alphavantage.co/query?function=OVERVIEW&symbol={stock['ticker']}&apikey={config['my_key']}"
        r = requests.get(url)
        data = r.json() 
        # print(data)
        if r.ok and len(data) != 0:
            d['name']= data.get('Name')
            d['symbol'] = data.get('Symbol')
            d['exchange'] = data.get('Exchange')
            d['description'] = data.get('Description')
            d['industry'] = data.get('Industry')
            d['fiftytwo_high'] = data.get('52WeekHigh') 
            d['fiftytwo_low'] = data.get('52WeekLow')
            d['pe_ratio'] = data.get('PERatio')
            fetched = True

    return d,200


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

@app.get("/stock_price/<stock>")
def get_stock_pride(stock):
    url = f"https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol={stock}&apikey={config['my_key']}"
    r = requests.get(url)
    data = r.json() 
    # print(data)
    global_quote = data.get('Global Quote', {})
    # print(global_quote)

    d = {

    'symbol': global_quote.get('01. symbol', ''),
    'open': global_quote.get('02. open', ''),
    'high': global_quote.get('03. high', ''),
    'low': global_quote.get('04. low', ''),
    'price': global_quote.get('05. price', ''),
    'volume': global_quote.get('06. volume', ''),
    'previous_close': global_quote.get('08. previous close', ''),

    }
    # print(d)

    return d


@app.get("/intraday/<ticker>")
def get_stock_intraday(ticker):
    print(ticker)
    url = f'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol={ticker}&interval=1min&entitlement=delayed&apikey={config["my_key"]}'
    r = requests.get(url)
    data = r.json() 

    time = data.get('Meta Data', {})
    # print(time)
    d = {
        'last_refreshed': time.get('3. Last Refreshed', '')
    }
    print(data)
    time = data['Meta Data']['3. Last Refreshed']
    intraday = data['Time Series (1min)'][time]

    print(f"intraday:\n{intraday}\n")

    p = {
        'open': intraday.get('1. open', ''),
        'high': intraday.get('2. high', ''),
        'low': intraday.get('3. low', ''),
        'close': intraday.get('4. close', ''),
        'volume': intraday.get('5. volume', '')

    }

    return p, d


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


@app.get('/search')
def search_by_ticker(ticker):
    url = f'https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords={ticker}&apikey={config["my_key"]}'
    r = requests.get(url)
    data = r.json()

    search_results = data.get('bestMatches', [])
    results_list = []
    for result in search_results:
        d = {
        'symbol': result.get('1. symbol', ''),
        'name': result.get('2, name', ''),
        }
        results_list.append(d)

    return results_list



# @app.get('/top_trades')
# def get_top_trades():
#     url = f'https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey={config["my_key"]}'
#     r = requests.get(url)
#     data = r.json()
#     print(data)
#     return data



@app.get('/trades')
def get_trades():
    trades = Trades.query.all()
    return [t.to_dict() for t in trades]

@app.post('/trades')
def transaction():
    try:
        data = request.json
        print(data)
        new_trade = Trades(
            name = data.get('name'),
            ticker = data.get('ticker'),
            stock_price = data.get('stock_price'),
            bought = data.get('bought'),
            sold = data.get('sold'),
            quantity = data.get('quantity'),
            time = data.get('time'),
            user_id = data.get('user_id')
        )
        user = db.session.get(User, data.get('user_id'))
        total_purchase = db.session.query(Trades).filter_by(bought=data.get('bought')).count()
        total_sale = db.session.query(Trades).filter_by(sold=data.get('sold')).count()

        if not user:
            raise ValueError('no user error 1')
        
        if total_purchase != 0:
            user.balance = user.balance + int(data.get('quantity'))* float(data.get('stock_price'))
            if user.balance < 0:
                raise Exception
        db.session.add(user)
        db.session.commit()
        
        if total_sale != 0:
            user.balance = user.balance - int(data.get('quantity')) * float(data.get('stock_price'))
        db.session.add(user)
        db.session.commit()

        db.session.add(new_trade)
        db.session.commit()
        print(new_trade)
        return new_trade.to_dict(), 201
    
    except Exception as e:
        print(e)
        return {'errors': str(e)}, 400
    
    
# @app.get('/stocks')
# def retrieve_stocks():
#     stocks = Stock.query.all()
#     return [s.to_dict() for s in stocks]

# @app.post('/stocks')
# def post_stock():
#     try:
#         data = request.json
#         new_stock = Stock(
#             name = data.get('name'),
#             ticker = data.get('ticker'),
#         )

#         db.session.add(new_stock)
#         db.session.commit()
#         return new_stock.to_dict(), 201
    
#     except Exception as e:
#         print(e)
#         return {'errors': str(e)}, 400


@app.get('/user')
def get_user():
    users = User.query.all()
    return [u.to_dict() for u in users]


app.post('/user')
def create_user():
    try:
        data = request.json
        print(data)
        new_user = User(
            name = data.get('name'),
            balance = data.get('balance'),
        )
        db.session.add(new_user)
        db.session.commit()
        return new_user.to_dict(), 201

    except Exception as e:
        print(e)
        return {'error': str(e)}, 400

@app.get("/user/<int:id>")
def get_user_by_id(id):
    current_user = db.session.get(User, id)
    if not current_user:
        return {"error": "User not found"}, 404
    
    return current_user.to_dict(), 200
        










# # Load your JSON file
# with open('db.json', 'r') as file:
#     object_list = json.load(file)

# # Add an 'id' key to each object
# for i, obj in enumerate(object_list):
#     obj['id'] = i + 1  # IDs start from 1

# # Save the modified JSON back to the file
# with open('tickers.json', 'w') as file:
#     json.dump(object_list, file, indent=2)













if __name__ == "__main__":
    app.run(port=5555, debug=True)



# link for sec : https://www.sec.gov/files/company_tickers.json
# link for dumb stock without index: https://dumbstockapi.com/stock?exchanges=NYSE
# github with ticker info in jsons: https://github.com/rreichel3/US-Stock-Symbols



