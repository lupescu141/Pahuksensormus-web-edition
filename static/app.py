import json
import mysql.connector
import os
import config

import flask
from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)

cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

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


# Hakee pelaaja_nimet ja pelaaja_id:et tietokannasta, jotta voidaan välttää tupla nimiä
# ja saadaan valittua oikea tallennus hae_pelaaja_tiedot funktiolla
@app.route('/hae_pelaaja_nimet')
def hae_pelaaja_nimet():
    sql = f'SELECT pelaaja_nimi, peli_id FROM peli;'
    kursori = conn.cursor(dictionary=True)
    kursori.execute(sql)
    pelaajat = kursori.fetchall()
    return pelaajat


# Hakee tallennetun pelaajan tiedot tietokannasta pelaaja id:n avulla
@app.route('/hae_pelaaja_tiedot/<peli_id>')
def hae_pelaaja_tiedot(peli_id):
    sql = f'SELECT * FROM peli WHERE peli_id = {peli_id};'
    kursori = conn.cursor(dictionary=True)
    kursori.execute(sql)
    pelaaja_tiedot = kursori.fetchall()
    return pelaaja_tiedot


# Luo uuden pelaajan annetulla nimellä
@app.route('/luo_uusi_pelaaja/<pelaaja_nimi>')
def luo_uusi_pelaaja(pelaaja_nimi):
    try:
        # Käytä turvallisempaa parametriseen kyselyyn
        sql = 'INSERT INTO peli (pelaaja_nimi) VALUES (%s);'
        kursori = conn.cursor(dictionary=True)
        kursori.execute(sql, (pelaaja_nimi,))

        # Hae luodun pelaajan tiedot
        sql = f'SELECT * FROM peli WHERE pelaaja_nimi = %s;'
        kursori.execute(sql, (pelaaja_nimi,))
        pelaaja_tiedot = kursori.fetchall()

        return pelaaja_tiedot
    except Exception as e:
        # Käsittele virhe tarvittaessa
        return str(e)


# Hakee random ei boss vihollisen
@app.route('/hae_random_vihollinen')
def hae_random_vihollinen():
    sql = 'SELECT * FROM viholliset WHERE bossi = "0" ORDER by RAND() LIMIT 1'
    kursori = conn.cursor(dictionary=True)
    kursori.execute(sql)
    haku_tiedot = kursori.fetchone()
    return haku_tiedot


if __name__ == '__main__':
    app.run(use_reloader=True, host='127.0.0.1', port=5000)