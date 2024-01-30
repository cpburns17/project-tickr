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
    serialize_rules = []

    id = db.Column(db.Integer, primary_key = True)
    # username = db.Column(db.String, nullable = False)
    # password = db.Column(db.String, nullable = False)
    name = db.Column(db.String, nullable = False)
    balance = db.Column(db.Integer, nullable = False)



class Trades(db.Model, SerializerMixin):
    __tablename__ = 'trades_table'
    serialize_rules = []

    id = db.Column(db.Integer, primary_key = True)
    bought = db.Column(db.Integer, nullable = False)
    sold = db.Column(db.Integer, nullable = False)
    quantity = db.Column(db.Integer, nullable = False)


    user_id = db.Column(db.Integer, db.ForeignKey('user_table.id'))
    stock_id = db.Column(db.Integer, db.ForeignKey('stock_table.id'))


class Stock(db.Model, SerializerMixin):
    __tablename__ = 'stock_table'

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String, nullable = False)
    ticker = db.Column(db.String, nullable = False)







# class Porfolio(db.Model, SerializerMixin):
#     __tablename__ = 'portfolio_table'
#     serialize_rules = []

#     id = db.Column(db.Integer, primary_key = True)
#     stock = db.Column(db.String, nullable = False)


