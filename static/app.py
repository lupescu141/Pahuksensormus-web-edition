import json
import mysql.connector
import os
import config

import flask
from flask import Flask, request

app = Flask(__name__)

# Tietokantayhteys

try:
    config.conn = mysql.connector.connect(
        host='mysql.metropolia.fi',
        port=3306,
        database='danielup',
        user='danielup',
        password='gidajahe',
        autocommit=True
    )

except Exception as e:
   print(e)
   print(type(e))