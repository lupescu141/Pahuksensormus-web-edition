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
  return vastaus
}

async function hae_random_bossi() {
// Hakee Flask tietokannasta bossin
  const response = await fetch(`http://localhost:5000/hae_random_bossi`);
  const vastaus = await response.json()
  console.log(vastaus)
  return vastaus
}