async function hae_matkustus_paivat() {
  // Hakee Flask tietokannasta kohteiden matkustus päivät pelaaja sijainnin mukaan
  const vastaus = await fetch(`http://localhost:5000/laske_etäisyydet/${pelaaja_olio.pelaaja_sijanti}`);
  return await vastaus.json();
}