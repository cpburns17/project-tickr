from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin


metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

db = SQLAlchemy(metadata=metadata)


class User(db.Model, SerializerMixin):
    __tablename__ = 'user_table'
    serialize_rules = ['-trades.user',]

    id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.String, nullable = False)
    password = db.Column(db.String, nullable = False)
    name = db.Column(db.String)
    balance = db.Column(db.Float)

    trades = db.relationship('Trades', back_populates='user')



class Trades(db.Model, SerializerMixin):
    __tablename__ = 'trades_table'
    serialize_rules = ['-user.trades']

    id = db.Column(db.Integer, primary_key = True)

    name = db.Column(db.String, nullable = False)
    ticker = db.Column(db.String, nullable = False)
    
    #this is value of stock at the specific time of purchase
    stock_price = db.Column(db.Float, nullable = False)
    #this is total purchase of quantity x stock_price
    bought = db.Column(db.Float)
    #this is total sale of quantity x stock_price
    sold = db.Column(db.Float )
    #number of shares
    quantity = db.Column(db.Integer, nullable = False)
    #time stamp of transaction
    time = db.Column(db.Integer)


    user_id = db.Column(db.Integer, db.ForeignKey('user_table.id'))
    

    user = db.relationship('User', back_populates='trades')





# class Stock(db.Model, SerializerMixin):
#     __tablename__ = 'stock_table'
#     serialize_rules = ['-trades.stock', '-trades.user']

#     id = db.Column(db.Integer, primary_key = True)
#     name = db.Column(db.String, nullable = False)
#     ticker = db.Column(db.String, nullable = False)

#     trades = db.relationship('Trades', back_populates='stock')







# class Porfolio(db.Model, SerializerMixin):
#     __tablename__ = 'portfolio_table'
#     serialize_rules = []

#     id = db.Column(db.Integer, primary_key = True)
#     stock = db.Column(db.String, nullable = False)


