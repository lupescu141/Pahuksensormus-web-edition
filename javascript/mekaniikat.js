// Tallentaa pelaajan tietokantaan
async function tallenna() {
  const response = await fetch(`http://localhost:5000/tallennus/${pelaaja_olio.peli_id}/${pelaaja_olio.pelaaja_sijainti}/${pelaaja_olio.menneet_paivat}/${pelaaja_olio.pelaaja_hp}/${pelaaja_olio.pelaaja_taitopiste}/${pelaaja_olio.onko_sormus}`);
  const vastaus = await response.json()
  console.log(vastaus)
  return vastaus
}


// Laskee kohtiden sijainnit pelaajan sijainnin perusteella. Palauttaa kohteen nimen ja ja päivien määrän
async function hae_matkustus_paivat() {
  // Hakee Flask tietokannasta kohteiden matkustus päivät pelaaja sijainnin mukaan
  const response = await fetch(`http://localhost:5000/laske_etäisyydet/${pelaaja_olio.pelaaja_sijainti}`);
  const vastaus = await response.json()
  console.log(vastaus)
  pelaaja_olio.pelaaja_sijainti = 10
  return vastaus
}


// Hakee pelaajan inventaarion
async function hae_inventaario() {
  // Hakee Flask tietokannasta kohteiden matkustus päivät pelaaja sijainnin mukaan
  const response = await fetch(`http://localhost:5000/hae_inventaario/${pelaaja_olio.peli_id}`);
  const vastaus = await response.json()
  console.log(vastaus)
  return pelaaja_inventaario = vastaus
}


// Hakee Flask tietokannasta bossin
async function hae_random_bossi() {
  const response = await fetch(`http://localhost:5000/hae_random_bossi`);
  const vastaus = await response.json()
  console.log(vastaus)
  return vastaus
}


// Hakee Flask tietokannasta esineen
async function hae_esine() {
  const response = await fetch(`http://localhost:5000/hae_esine`);
  const vastaus = await response.json()
  console.log(vastaus)
  return vastaus
}


// Hakee Flask tietokannasta tallennuksen poiston
async function tallennuksen_poisto_ja_pisteet() {
  const response = await fetch(`http://localhost:5000/tallennuksen_poisto_ja_pisteet`);
  const vastaus = await response.json()
  console.log(vastaus)
  return vastaus
}