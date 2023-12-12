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
// Pelaaja rivi
const paikkatausta = document.getElementById('paikkatausta')
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
const taito1 = document.getElementById('taito1');
const taito2 = document.getElementById('taito2');
const taito3 = document.getElementById('taito3');
const esine1 = document.getElementById('esine1');
const esine2 = document.getElementById('esine2');
const esine3 = document.getElementById('esine3');
const vihollinen_nimi = document.getElementById('vihollinen_nimi');
const vihollinen_tp = document.getElementById(`vihollinen-tp`);
const vihollinen_hp = document.getElementById('vihollinen-hp');
const pelaaja_tp = document.getElementById(`pelaaja-tp`);
const pelaaja_hp = document.getElementById('pelaaja-hp');
const pelaaja_status = document.querySelector('.pelaaja-status');
const taistelu_rivi = document.querySelector('.taistelu-rivi');
const pelaaja_info = document.querySelector('.pelaaja-info');
const hyokkaa_tooltip = document.getElementById("hyokkaa-tooltip");

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


// Funktio joka hoitaa matkustuksen ja kutsuu taistelua jos taistelu tapahtuu
async function matkustaminen() {
  const kohteet = await hae_matkustus_paivat();

  if (kartta) {
    // Etsi kaikki span-elementit kartta-divin sisältä
    const spanit = kartta.querySelectorAll('.tooltiptext');

    // Käy läpi jokainen span-elementti
    for (let span of spanit) {
      // Saadaan span-elementin id eli kohteen nimi
      const span_id = span.id;

      // Etsi vastaava kohde-elementti kartta-divin sisältä
      const kohde = kartta.querySelector(`#${span_id}`);

      // Tarkista, onko kohde-elementti olemassa
      if (kohde) {
        for (let laskettu_matka of kohteet) {
          if (laskettu_matka.fantasia_nimi === span_id) {
            // Päivitä spanin teksti
            span.value = laskettu_matka.matka_pv;
            span.textContent = `${span_id} : ${laskettu_matka.matka_pv} päivän matkustus`;
            // Tallennetaan name arvoon kohteen id jotta voidaan asetta se pelaajalle
            span.name = laskettu_matka.id
            span.type = laskettu_matka.fantasia_nimi
          }
        }
      } else {
        console.error('Kohde-elementtiä ei löytynyt spanille', span);
      }
    }
  } else {
    console.error('Kartta-elementtiä ei löytynyt.');
  }


  // Käy läpi jokainen div ja lisää sille event listener
  kartta_nappi.forEach(div => {
    div.addEventListener('click', async function() {
      // Etsi spanin value attribuutti ja tulosta se konsoliin
      const span = div.previousElementSibling;
      const matkustus_paivien_maara = span.value;
      console.log('päivien määrä:', matkustus_paivien_maara);

      pelaaja_olio.pelaaja_sijaint = span.name
      console.log('sijainnin id ' + span.name)
      console.log('pelaajan sijainnin id ' + pelaaja_olio.pelaaja_sijaint)
      document.querySelector('.paikkatausta').src = `../static/images/paikat/${span.type}.png`;
      await taistelu_mahdollisuus(matkustus_paivien_maara);
    });
  });
}