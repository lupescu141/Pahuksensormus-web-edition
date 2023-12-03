import json
import mysql.connector
import os
import config

import flask
from flask import Flask, request

app = Flask(__name__)

# Tietokantayhteys

try:
    conn = mysql.connector.connect(
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


class Pelaaja:
    def __init__(self, peli_id, pelaaja_nimi, pelaaja_sijainti, menneet_paivat, pelaaja_hp, pelaaja_maxhp,
                 pelaaja_suojaus, pelaaja_isku, pelaaja_taitopiste, pelaaja_max_taitopiste,
                 onko_sormus, sormus_sijainti):
        self.id = peli_id
        self.nimi = pelaaja_nimi
        self.sijainti = pelaaja_sijainti
        self.menneet_paivat = menneet_paivat
        self.hp = pelaaja_hp
        self.maxhp = pelaaja_maxhp
        self.suojaus = pelaaja_suojaus
        self.isku = pelaaja_isku
        self.taitopiste = pelaaja_taitopiste
        self.max_taitopiste = pelaaja_max_taitopiste
        self.onko_sormus = onko_sormus
        self.sormus_sijainti = sormus_sijainti

class Vihollinen:
    def __init__(self, vihollinen_id, vihollinen_nimi, vihollinen_hp, vihollinen_maxhp, vihollinen_suojaus, vihollinen_isku):
        self.id = vihollinen_id
        self.nimi = vihollinen_nimi
        self.hp = vihollinen_hp
        self.maxhp = vihollinen_maxhp
        self.suojaus = vihollinen_suojaus
        self.isku = vihollinen_isku




def hae_kaikki_kohteet():

    sql = f'''SELECT airport.id, airport.fantasia_nimi, airport.latitude_deg, airport.longitude_deg 
              FROM airport'''
    kursori = conn.cursor(dictionary=True)
    kursori.execute(sql)
    lista = kursori.fetchall()
    #for nimi in lista:
        #print(nimi)
    return lista

print(hae_kaikki_kohteet())