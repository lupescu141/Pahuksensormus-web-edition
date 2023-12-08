async function hae_matkustus_paivat() {
  // Hakee Flask tietokannasta kohteiden matkustus päivät pelaaja sijainnin mukaan
  const response = await fetch(`http://localhost:5000/laske_etäisyydet/${pelaaja_olio.pelaaja_sijainti}`);
  const vastaus = await response.json()
  console.log(vastaus)
  pelaaja_olio.pelaaja_sijainti = 10
  return vastaus
}