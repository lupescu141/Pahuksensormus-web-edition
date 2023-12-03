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

def hae_kaikki_kohteet(pelaaja):

    sql = f'''SELECT airport.id, airport.fantasia_nimi, airport.latitude_deg, airport.longitude_deg 
              FROM airport WHERE airport.id != {pelaaja.sijainti}'''
    kursori = yhteys.cursor(dictionary=True)
    kursori.execute(sql)
    lista = kursori.fetchall()
    #for nimi in lista:
        #print(nimi)
    return lista

hae_kaikki_kohteet()