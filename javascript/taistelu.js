// Luodaan random viholliselle olio muuttuja
let random_vihollinen


// Haetaan random vihollinen
async function hae_random_vihollinen_tietokannasta() {
  // Hakee Flask tietokannasta random vihollisen
  random_vihollinen = await fetch('http://localhost:5000/hae_random_vihollinen');
  random_vihollinen = await random_vihollinen.json();

  document.getElementById('vihollinen_nimi').textContent = random_vihollinen.vihollinen_nimi
  document.getElementById('vihollinen-hp').textContent = random_vihollinen.vihollinen_hp
}


