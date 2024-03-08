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
config['my_key_2']

app = Flask(__name__)
app.secret_key = config['FLASK_SECRET_KEY']
CORS(app, resources={r"/*": {"origins": "*"}})
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///app.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.json.compact = False
bcrypt = Bcrypt(app)
migrate = Migrate(app, db)


db.init_app(app)


@app.get("/")
def index():
    return "Home"



# GRABS CRYPTO JSON FILE
def crypto_list():
    with open('cryptos.json') as f:
        data = json.load(f)
        if data:
            return data
        else:
            return None
        
def random_crypto():
    data = crypto_list()
    if data:
        if isinstance(data, dict):
            symbol = random.choice(list(data.keys()))
        elif isinstance(data, list):
            symbol = random.choice(data)
        else:
            symbol = None
        print(f' this is just symbol {symbol}')
        return symbol
    else:
        return None
            

@app.get('/api/random_crypto')
def get_random_symbol():
    crypto = random_crypto()
    if crypto:
        return {"symbol": crypto}
    else:
        return {"error": "No cryptocurrencies available"}
        

# CRYPTO LIST
@app.get('/api/crypto_intraday/<symbol>')
def get_crypto(symbol: str):
        url = f"https://www.alphavantage.co/query?function=CRYPTO_INTRADAY&symbol={symbol}&market=USD&interval=5min&apikey={config['my_key']}"
        r = requests.get(url)
        data = r.json()

        if "Error Message" in data:
            return {"error": data["Error Message"]}

        meta_data = data.get('Meta Data', {})
        time_series = data.get('Time Series Crypto (5min)', {})

        # if not time_series:
        #     return {'error': 'no intraday data found'}
        
        last_refreshed = meta_data.get('6. Last Refreshed', '')
        currency_code = meta_data.get('2. Digital Currency Code', '')
        currency_name = meta_data.get('3. Digital Currency Name')

        latest_data = time_series.get(last_refreshed)



        crypto_info= {
            'last_refreshed': last_refreshed,
            'currency_code': currency_code,
            'currency_name': currency_name,
            'open': latest_data.get('1. open', ''),
            'high': latest_data.get('2. high', ''),
            'low': latest_data.get('3. low', ''),
            'close': latest_data.get('4. close', ''),
            'volume': latest_data.get('5. volume', '')
        }
        print(f'this is crypto info {crypto_info}')

        return crypto_info

        # d = {
        #     'last_refreshed': time.get('6. Last Refreshed', '')
        # }
        # print(data)



        # time = data['Meta Data']['6. Last Refreshed']
        # name = data['Meta Data']['2. Digital Currency Code']
        # intraday = data['Time Series (5min)'][time]
        # print(name)

        # t = {
        #     'open': intraday.get('1. open', ''),
        #     'high': intraday.get('2. high', ''),
        #     'low': intraday.get('3. low', ''),
        #     'close': intraday.get('4. close', ''),
        #     'volume': intraday.get('5. volume', '')
        # }
        # return t, d 


# GET CRYPTO INTRADAY DATA
# @app.get('/api/crypto_list/<symbol>')
# def get_crypto_intraday(symbol):
#     fetched = False
#     while not fetched:
#         crypto = random_crypto()
#         url = f"https://www.alphavantage.co/query?function=CRYPTO_INTRADAY&symbol={symbol}&market=USD&interval=5min&apikey={config['my_key']}"
#         r = requests.get(url)
#         data = r.json()

#         time = data.get('Meta Data', {})
#         # print(time)
#         d = {
#             'last_refreshed': time.get('6. Last Refreshed', '')
#         }
#         # print(data)
#         time = data['Meta Data']['6. Last Refreshed']
#         name = data['Meta Data']['2. Digital Currency Code']
#         intraday = data['Time Series (5min)'][time]
#         # print(name)

#         t = {
#             'open': intraday.get('1. open', ''),
#             'high': intraday.get('2. high', ''),
#             'low': intraday.get('3. low', ''),
#             'close': intraday.get('4. close', ''),
#             'volume': intraday.get('5. volume', '')
#         }
#         return t, d 


# FinnHub FETCH (LOGO)

@app.get('/api/logo/<ticker>')
def get_logo(ticker):
    url = f"https://finnhub.io/api/v1/stock/profile2?symbol={ticker}&token={config['my_key_2']}"
    r = requests.get(url)
    data = r.json() 
    d = {}
    d['logo'] = data.get('logo')
    d['ticker'] = data.get('ticker')
    d['exchange'] = data.get('exchange')

    return d, 200 


# LOGIN AND SIGNUP 
@app.get("/api/check_session")
def check_session():
    user = db.session.get(User, session.get("user_id"))
    print(f'check session {session.get("user_id")}')
    if user:
        return user.to_dict(rules=["-password_hash"]), 200
    else:
        return {"message": "No user logged in"}, 401

# LOGIN
@app.post("/api/login")
def login():
    data = request.json

    user = User.query.filter(User.username == data.get("username")).first()
    # print(data)
    print(user)
    if user and bcrypt.check_password_hash(user.password, data.get("password")):
        session["user_id"] = user.id
        print("success")
        return user.to_dict(rules=['-password']), 200
    else:
        return {"error": "Invalid username or password"}, 401
    
# LOGOUT
@app.delete("/api/logout")
def logout():
    session.pop("user_id")
    return {"message": "Logged out"}, 200


# GET USER 

@app.get('/api/user')
def get_user():
    users = User.query.all()
    return [u.to_dict() for u in users]

# POST USER

@app.post('/api/user')
def create_user():
    try:
        data = request.json
        print(data)
        new_user = User(
            name = data.get('name'),
            username = data.get('username'),
            password = bcrypt.generate_password_hash(data.get('password')),
            balance = data.get('balance'),
        )
        db.session.add(new_user)
        db.session.commit()
        session["user_id"] = new_user.id
        return new_user.to_dict(), 201

    except Exception as e:
        print(e)
        return {'error': str(e)}, 400

@app.get("/api/user/<int:id>")
def get_user_by_id(id):
    current_user = db.session.get(User, id)
    if not current_user:
        return {"error": "User not found"}, 404
    
    return current_user.to_dict(), 200
        

# RANDOM STOCK FUNCTION
def random_stock():
    with open('tickers.json') as f:
        data = json.load(f)
        if data:
            return random.choice(data)
        else:
            return None

# GRABS TICKERS JSON FILE 
def json_list():
    with open('tickers.json') as f:
        data = json.load(f)
        if data:
            return data
        else:
            return None
        

# RETURNS TICKERS JSON LIST
@app.get('/api/tickers_list')
def get_tickers():
    stocks = json_list()

    return stocks

# GETS RANDOM STOCK FROM API
@app.get('/api/random_stock')
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



# GET INTRADAY DATA 
@app.get("/api/intraday/<ticker>")
def get_stock_intraday(ticker):
    # print(ticker)
    url = f'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol={ticker}&interval=1min&entitlement=delayed&apikey={config["my_key"]}'
    r = requests.get(url)
    data = r.json() 

    time = data.get('Meta Data', {})
    # print(time)
    d = {
        'last_refreshed': time.get('3. Last Refreshed', '')
    }
    # print(data)
    time = data['Meta Data']['3. Last Refreshed']
    intraday = data['Time Series (1min)'][time]

    # print(f"intraday:\n{intraday}\n")

    p = {
        'open': intraday.get('1. open', ''),
        'high': intraday.get('2. high', ''),
        'low': intraday.get('3. low', ''),
        'close': intraday.get('4. close', ''),
        'volume': intraday.get('5. volume', '')

    }
    return p, d



# OVERVIEW OF STOCK 
@app.get("/api/overview/<ticker>")
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
    d['div_per_share'] = data.get('DividendPerShare')
    

    return d


# GLOBAL QUOTE OF STOCK 
@app.get("/api/stock_price/<stock>")
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




# NEWS & SENTIMENTS
@app.get("/api/news/<ticker>")
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


# TOP TRADES
@app.get('/api/top_trades')
def get_top_trades():
    url = f'https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey={config["my_key"]}'
    r = requests.get(url)
    data = r.json()

    most_traded = data.get('most_actively_traded', [])
    top_trades_list = []

    for g in most_traded:
        d = {
            'ticker': g.get('ticker', ''),
            'price': g.get('price', ''),
            'change': g.get('change_amount', ''),
            'percentage': g.get('change_percentage', '')
        }
        top_trades_list.append(d)


    return top_trades_list




# SEARCH FOR STOCK 
@app.get('/api/search')
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





# TRADES TABLE
@app.get('/api/trades')
def get_trades():
    trades = Trades.query.all()
    return [t.to_dict() for t in trades]

# POST TRADES TO TABLE
@app.post('/api/trades')
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
        
# THIS UPDATES BALANCE WHEN BOUGHT OR SOLD      
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
    

    # SIMPLE MOVING AVERAGE GRAPH
@app.get('/api/SMA/<ticker>')
def get_sma(ticker):
    url = f'https://www.alphavantage.co/query?function=SMA&symbol={ticker}&interval=monthly&time_period=10&series_type=open&apikey={config["my_key"]}'
    r = requests.get(url)
    data = r.json()

    d = data['Technical Analysis: SMA']
    dates = []
    values = []
    for date, value in d.items():
        dates.append(date)
        values.append(float(value['SMA']))
    
    sma_graph = {
        'dates': dates,
        'values': values,
    }

    return sma_graph

# @app.get('/api/thirty_day/<ticker>')
# def get_thirty(ticker):
#     url = f'https://www.alphavantage.co/query?function=SMA&symbol={ticker}&interval=30min&time_period=10&series_type=open&apikey={config["my_key"]}'
#     r = requests.get(url)
#     data = r.json()

#     d = data['Technical Analysis: SMA']
#     dates = []
#     values = []
#     for date, value in d.items():
#         dates.append(date)
#         values.append(float(value['SMA']))
    
#     sma_graph2 = {
#         'dates': dates,
#         'values': values,
#     }

#     return sma_graph2








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



