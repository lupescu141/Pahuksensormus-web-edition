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


# Hakee pelaaja_nimet ja pelaaja_id:et tietokannasta, jotta voidaan välttää tupla nimiä
# ja saadaan valittua oikea tallennus hae_pelaaja_tiedot funktiolla
@app.route('/hae_pelaaja_nimet')
def hae_pelaaja_nimet():
    sql = f'SELECT pelaaja_nimi, peli_id FROM peli;'
    kursori = conn.cursor(dictionary=True)
    kursori.execute(sql)
    pelaajat = kursori.fetchall()
    return pelaajat


# Hakee tallennetun pelaajan tiedot tietokannasta pelaaja id:n avulla.
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


# Hakee ennätykset
@app.route('/hae_ennatukset')
def hae_ennatukset():
    sql = f'''SELECT pelaaja_nimi, menneet_paivat FROM ennatukset ORDER BY (menneet_paivat) LIMIT 10;'''
    kursori = conn.cursor(dictionary=True)
    kursori.execute(sql)
    top = kursori.fetchall()

    return top


# Tallentaa pelin
@app.route('/tallennus/<peli_id>/<pelaaja_sijainti>/<menneet_paivat>/<pelaaja_hp>/<pelaaja_maksimi_hp>/<pelaaja_suojaus>/<pelaaja_isku>/<pelaaja_taitopiste>/<pelaaja_maksimi_taitopiste>/<onko_sormus>')
def tallennus(peli_id, pelaaja_sijainti, menneet_paivat, pelaaja_hp, pelaaja_maksimi_hp, pelaaja_suojaus, pelaaja_isku, pelaaja_taitopiste, pelaaja_maksimi_taitopiste, onko_sormus, ):

    try:
        sql = f'''UPDATE peli SET pelaaja_sijainti = {pelaaja_sijainti},
                  menneet_paivat = {menneet_paivat}, pelaaja_hp = {pelaaja_hp}, pelaaja_maksimi_hp = {pelaaja_maksimi_hp},
                  pelaaja_suojaus = {pelaaja_suojaus}, pelaaja_isku = {pelaaja_isku}, pelaaja_taitopiste = {pelaaja_taitopiste}, 
                  pelaaja_maksimi_taitopiste = {pelaaja_maksimi_taitopiste}, onko_sormus = {onko_sormus} WHERE peli_id = {peli_id}'''
        kursori = conn.cursor(dictionary=True)
        kursori.execute(sql)

        return jsonify({'tallennus': 'onnistui'})

    except Exception as e:
        # Käsittele virhe tarvittaessa
        return str(e)


# Tyhjennä inventaario ennen tallennusta
@app.route('/inventaario_tyhjennys/<peli_id>')
def inventaario_tyhjennys(peli_id):
    try:
        sql = f'DELETE FROM inventaario WHERE pelaajan_id = "{peli_id}"'
        kursori = conn.cursor()
        kursori.execute(sql)

        return jsonify({'inventaario': 'nollattu'})

    except Exception as e:
        # Käsittele virhe tarvittaessa
        return str(e)


# Tallenna inventaario
@app.route ('/inventaario_tallennus/<peli_id>/<esineen_id>')
def inventaario_tallennus(peli_id, esineen_id):
    try:
        sql = f'INSERT INTO inventaario (pelaajan_id, esineen_id) VALUES ({peli_id}, {esineen_id})'
        kursori = conn.cursor(dictionary=True)
        kursori.execute(sql)

        return jsonify({f'Esine: {esineen_id}': 'tallennettu'})

    except Exception as e:
        # Käsittele virhe tarvittaessa
        return str(e)


# Poistaa tallennuksen ja lisää pisteet ennatukset tauluun
@app.route('/tallennuksen_poisto_ja_pisteet/<peli_id>/<pelaaja_nimi>/<menneet_paivat>')
def tallennuksen_poisto_ja_pisteet(peli_id, pelaaja_nimi, menneet_paivat):

    try:
        sql = (f'''INSERT INTO ennatukset (peli_id, pelaaja_nimi, menneet_paivat) VALUES ("{peli_id}", "{pelaaja_nimi}", "{menneet_paivat}")''')
        kursori = conn.cursor()
        kursori.execute(sql)

        sql = (f'DELETE FROM inventaario WHERE pelaajan_id = "{peli_id}";')
        kursori.execute(sql)
        sql = (f'DELETE FROM peli WHERE peli_id = "{peli_id}";')
        kursori.execute(sql)

        return jsonify({'status': 'success'})

    except Exception as e:
        # Käsittele virhe tarvittaessa
        return str(e)


# Poistaa kuolleen pelaajan
@app.route('/peli_ohi/<peli_id>')
def peli_ohi(peli_id):
    try:
        sql = (f'DELETE FROM peli WHERE peli_id = "{peli_id}";')
        kursori = conn.cursor()
        kursori.execute(sql)

        sql = (f'DELETE FROM inventaario WHERE pelaajan_id = "{peli_id}";')
        kursori.execute(sql)

        return jsonify({'peli': 'poistettu'})

    except Exception as e:
        # Käsittele virhe tarvittaessa
        return str(e)


# Hakee pelaajan inventaarion
@app.route('/hae_inventaario/<peli_id>')
def hae_inventaario(peli_id):
    sql = (
        f'SELECT esine_nimi, esineen_id FROM inventaario, esineet, peli WHERE esineen_id = esine_id AND pelaajan_id = "{peli_id}" AND peli_id = "{peli_id}"')
    kursori = conn.cursor(dictionary=True)
    kursori.execute(sql)
    inventaario_lista = kursori.fetchall()

    return inventaario_lista


# Hae kaikki luokan taidot
@app.route('/hae_luokan_taidot/<pelaaja_luokka>')
def hae_luokan_taidot(pelaaja_luokka):
    sql = (
        f'SELECT taito_id, taito_nimi FROM taidot WHERE hahmon_luokka = "{pelaaja_luokka}"')
    kursori = conn.cursor(dictionary=True)
    kursori.execute(sql)
    luokan_taidot = kursori.fetchall()

    return luokan_taidot


# Hakee esineen tietokannasta
@app.route('/hae_esine')
def hae_esine():
    sql = 'SELECT esine_nimi, esine_id AS esineen_id FROM esineet ORDER by RAND() LIMIT 1'
    kursori = conn.cursor(dictionary=True)
    kursori.execute(sql)
    random_esine = kursori.fetchone()
    return random_esine


# Hakee random ei boss vihollisen
@app.route('/hae_random_vihollinen')
def hae_random_vihollinen():
    sql = 'SELECT * FROM viholliset WHERE bossi = "0" ORDER by RAND() LIMIT 1'
    kursori = conn.cursor(dictionary=True)
    kursori.execute(sql)
    haku_tiedot = kursori.fetchone()
    return haku_tiedot


# Hakee tunnetun vihollisen id:n perusteella. Esim Gorgon id:3
@app.route('/hae_tunnettu_vihollinen/<vihollinen_id>')
def hae_tunnettu_vihollinen(vihollinen_id):
    sql = f'SELECT * FROM viholliset WHERE vihollinen_id = {int(vihollinen_id)}'
    kursori = conn.cursor(dictionary=True)
    kursori.execute(sql)
    haku_tiedot = kursori.fetchone()
    return haku_tiedot


# Hae kaikki vihollisen taidot
@app.route('/hae_vihollisen_taidot/<vihollisen_id>')
def hae_vihollisen_taidot(vihollisen_id):
    sql = (
        f'SELECT taito_id, vihollisen_id, taito_nimi FROM taidot_viholliset WHERE vihollisen_id = "{vihollisen_id}"')
    kursori = conn.cursor(dictionary=True)
    kursori.execute(sql)
    vihollisen_taidot = kursori.fetchall()

    return vihollisen_taidot


# Hakee random bossin
@app.route('/hae_random_bossi')
def hae_random_bossi():
    sql = 'SELECT * FROM viholliset WHERE bossi = "1" ORDER by RAND() LIMIT 1'
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


# Hakee pelaajan sijainnin. Käytetään etäisyyksien laskennassa
def hae_pelaajan_sijainti(pelaaja_sijainti):
    sql = f'''SELECT airport.id, airport.fantasia_nimi, airport.latitude_deg, airport.longitude_deg 
                  FROM airport WHERE airport.id = {pelaaja_sijainti}'''
    kursori = conn.cursor(dictionary=True)
    kursori.execute(sql)
    lista = kursori.fetchone()

    return lista


# Laskee etäisyydet pelaajan sijainnin mukaan.
@app.route('/laske_etäisyydet/<pelaajan_sijainti>')
def laske_etäisyydet(pelaajan_sijainti):
    kohteet_ja_matkat = []

    nykyinen_sijainti = hae_pelaajan_sijainti(pelaajan_sijainti)

    kohteet = hae_kaikki_kohteet()

    for kohde in kohteet:
        loppu_koordinaatit = kohde['latitude_deg'], kohde['longitude_deg']
        alku_koordinaatit = nykyinen_sijainti['latitude_deg'], nykyinen_sijainti['longitude_deg']
        matka = distance.distance(alku_koordinaatit, loppu_koordinaatit).km
        if matka < 1:
            matka = 0
        elif matka < 75:
            matka = 1
        elif matka < 125:
            matka = 2
        elif matka < 200:
            matka = 3
        else:
            matka = 4
        vastaus = {
            'fantasia_nimi': kohde['fantasia_nimi'],
            'matka_pv': matka,
            'id' : kohde['id']
        }
        kohteet_ja_matkat.append(vastaus)

    return kohteet_ja_matkat


if __name__ == '__main__':
    app.run(use_reloader=True, host='127.0.0.1', port=5000)
