import json
import random

import mysql.connector
import os
import config

import flask
from flask import Flask, request, jsonify
from flask_cors import CORS

import geopy
from geopy import distance

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
    def __init__(self, peli_id, pelaaja_nimi, pelaaja_sijainti, sormus_sijainti, menneet_paivat, pelaaja_luokka, pelaaja_hp, pelaaja_maksimi_hp,
                 pelaaja_suojaus, pelaaja_isku, pelaaja_taitopiste, pelaaja_maksimi_taitopiste,
                 onko_sormus):
        self.id = peli_id
        self.nimi = pelaaja_nimi
        self.sijainti = pelaaja_sijainti
        self.sormus_sijainti = sormus_sijainti
        self.menneet_paivat = menneet_paivat
        self.pelaaja_luokka = pelaaja_luokka
        self.hp = pelaaja_hp
        self.maxhp = pelaaja_maksimi_hp
        self.suojaus = pelaaja_suojaus
        self.isku = pelaaja_isku
        self.taitopiste = pelaaja_taitopiste
        self.max_taitopiste = pelaaja_maksimi_taitopiste
        self.onko_sormus = onko_sormus



class Vihollinen:
    def __init__(self, vihollinen_id, vihollinen_nimi, vihollinen_hp, vihollinen_maxhp, vihollinen_suojaus,
                 vihollinen_isku):
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
    pelaaja_tiedot = kursori.fetchone()
    return pelaaja_tiedot


# Luo uuden pelaajan annetulla nimellä
@app.route('/luo_uusi_pelaaja/<pelaaja_nimi>/<pelaaja_luokka>/<sukupuoli>')
def luo_uusi_pelaaja(pelaaja_nimi, pelaaja_luokka, sukupuoli):
    # Arvotaan sormuksen sijainti
    sormus_sijainti = random.randint(2, 9, )

    try:
        # Lisää pelaaja tietokantaan sormus_sijainti-muuttujan kanssa
        sql = 'INSERT INTO peli (pelaaja_nimi, sormus_sijainti, pelaaja_luokka, sukupuoli) VALUES (%s, %s, %s, %s);'
        kursori = conn.cursor(dictionary=True)
        kursori.execute(sql, (pelaaja_nimi, sormus_sijainti, pelaaja_luokka, sukupuoli))

        # Päivitetään tiedot ja palautetaan pelaaja
        pelaaja = paivita_pelaaja_tiedot(pelaaja_nimi, pelaaja_luokka)

        return pelaaja
    except Exception as e:
        # Käsittele virhe tarvittaessa
        return str(e)


# Päivittää valitun luokan mukaiset tiedot pelaajalle
def paivita_pelaaja_tiedot(pelaaja_nimi, pelaaja_luokka):
    sql = 'SELECT * FROM luokat WHERE nimi = %s;'
    kursori = conn.cursor(dictionary=True)
    kursori.execute(sql, (pelaaja_luokka,))
    luokka_tiedot = kursori.fetchone()

    sql = f'''UPDATE peli SET pelaaja_hp = {int(luokka_tiedot['maksimi_hp'])}, pelaaja_maksimi_hp = {int(luokka_tiedot['maksimi_hp'])},  
            pelaaja_taitopiste = {int(luokka_tiedot['maksimi_tp'])}, pelaaja_maksimi_taitopiste = {int(luokka_tiedot['maksimi_tp'])} WHERE pelaaja_nimi = "{pelaaja_nimi}"'''
    kursori.execute(sql)

    sql = 'SELECT * FROM peli WHERE pelaaja_nimi = %s;'
    kursori.execute(sql, (pelaaja_nimi,))
    pelaaja = kursori.fetchone()
    return pelaaja


# Hakee random ei boss vihollisen
@app.route('/hae_random_vihollinen')
def hae_random_vihollinen():
    sql = 'SELECT * FROM viholliset WHERE bossi = "0" ORDER by RAND() LIMIT 1'
    kursori = conn.cursor(dictionary=True)
    kursori.execute(sql)
    haku_tiedot = kursori.fetchone()
    return haku_tiedot


# Hakee kaikki kohteet
def hae_kaikki_kohteet():

    sql = f'''SELECT airport.id, airport.fantasia_nimi, airport.latitude_deg, airport.longitude_deg 
              FROM airport'''
    kursori = conn.cursor(dictionary=True)
    kursori.execute(sql)
    lista = kursori.fetchall()

    return lista

def hae_pelaajan_sijainti(pelaaja_sijainti):

    sql = f'''SELECT airport.id, airport.fantasia_nimi, airport.latitude_deg, airport.longitude_deg 
                  FROM airport WHERE airport.id = {pelaaja_sijainti}'''
    kursori = conn.cursor(dictionary=True)
    kursori.execute(sql)
    lista = kursori.fetchone()

    return lista

@app.route('/laske_etäisyydet/<pelaajan_sijainti>')
def laske_etäisyydet(pelaajan_sijainti):

    kohteet_ja_matkat = []

    nykyinen_sijainti = hae_pelaajan_sijainti(pelaajan_sijainti)

    kohteet = hae_kaikki_kohteet()

    for kohde in kohteet:
        loppu_koordinaatit = kohde['latitude_deg'], kohde['longitude_deg']
        alku_koordinaatit = nykyinen_sijainti['latitude_deg'], nykyinen_sijainti['longitude_deg']
        matka = distance.distance(alku_koordinaatit, loppu_koordinaatit).km
        # Ei lisätä kohdetta jossa pelaaja on
        if matka < 1:
            continue
        if matka < 75:
            matka = 1
        elif matka < 125:
            matka = 2
        elif matka < 200:
            matka = 3
        else: matka = 4
        vastaus = {
            'fantasia_nimi' : kohde['fantasia_nimi'],
            'matka_pv' : matka
        }
        kohteet_ja_matkat.append(vastaus)

    return kohteet_ja_matkat


if __name__ == '__main__':
    app.run(use_reloader=True, host='127.0.0.1', port=5000)
