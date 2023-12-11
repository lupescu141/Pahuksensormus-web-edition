// Luodaan pelaajalle muuttuja
let pelaaja_olio;

let pelaaja_inventaario;

let pelaaja_taidot;

// Päävalikon elementtejä
const paavalikko = document.querySelector('.valikko');
const vasen_puoli = document.querySelector('.vasen-puoli');
const oikea_puoli = document.querySelector('.oikea-puoli');
const lataapeli_valikko = document.querySelector('.lataapeli-valikko');
const uusipeli_valikko = document.querySelector('.uusi-peli-valikko');
const ennatukset = document.querySelector('.ennatykset')
const taulukko = document.querySelector('.top-lista');
// Loki elementit
const textarea = document.getElementById('loki');
const taisteluloki = document.getElementById('taistelu-loki');
// Kartta elementit
const kartta = document.querySelector('.kartta');
const kartta_nappi = kartta.querySelectorAll('.kartta-nappi-kuva');
// Taistelu elementit
const hyokkaa = document.getElementById('hyokkaa');
const taidot = document.getElementById('taidot');
const esineet = document.getElementById('esineet');
const jatka = document.getElementById('jatka');
const taito_napit = document.querySelectorAll(`.taidot`);
console.log(taito_napit);
const taito2 = document.getElementById('taito2');
const taito3 = document.getElementById('taito3');
const esine1 = document.getElementById('esine1');
const esine2 = document.getElementById('esine2');
const esine3 = document.getElementById('esine3');
const vihollinen_nimi = document.getElementById('vihollinen_nimi');
const vihollinen_hp = document.getElementById('vihollinen-hp');
const pelaaja_hp = document.getElementById('pelaaja-hp');
const pelaaja_status = document.querySelector('.pelaaja-status');
const taistelu_rivi = document.querySelector('.taistelu-rivi');
const pelaaja_info = document.querySelector('.pelaaja-info');

// Hoitaa alkuvalikon esittelyn sivun latautuessa
document.addEventListener('DOMContentLoaded', async function() {
  // Etsi vasemman puolen elementti ja aseta sille display: none;
  document.querySelector('.vasen-puoli').style.display = 'none';
  document.querySelector('.kartta').style.display = 'none';
  document.getElementById('loki').value = '';

  const response = await fetch(`http://localhost:5000/hae_ennatukset`);
  const vastaus = await response.json();
  console.log(vastaus);

  for (const pisteet of vastaus) {
    const rivi = taulukko.insertRow();

    const solu1 = rivi.insertCell(0);
    solu1.textContent = pisteet.pelaaja_nimi;

    const solu2 = rivi.insertCell(1);
    solu2.textContent = pisteet.menneet_paivat;
  }

});