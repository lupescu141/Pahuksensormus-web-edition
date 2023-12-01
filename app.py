import json
import mysql.connector
import os
import config

import flask
from flask import Flask, request

app = Flask(__name__)

# Tietokantayhteys
config.conn = mysql.connector.connect(
         host=os.environ.get('HOST'),
         port= 3306,
         database=os.environ.get('DB_NAME'),
         user=os.environ.get('DB_USER'),
         password=os.environ.get('DB_PASS'),
         autocommit=True
         )