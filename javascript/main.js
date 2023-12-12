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
const ennatukset = document.querySelector('.ennatykset');
const taulukko = document.querySelector('.top-lista');
// Pelaaja rivi
const paikkatausta = document.getElementById('paikkatausta');
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
const hyokkaa_tooltip = document.getElementById('hyokkaa-tooltip');

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

  const kartta_divit = kartta.querySelectorAll('.kartta-nappi');
  kartta_divit.forEach((div) => {
    for (kohde of kohteet) {
      if (parseInt(kohde.id) === parseInt(div.id)) {
        div.value = kohde.matka_pv
        console.log(`kohteeseen ${div.name} on ${div.value} eli ${kohde.matka_pv} matkustus`)
        break
      }
    }
  });
}

// Kartta nappien kuuntelijat
const kohde_1 = document.getElementById('1');
kohde_1.addEventListener('click', function() {
  console.log(`klikattu ${kohde_1.id} : ${kohde_1.name}`);
  pelaaja_olio.pelaaja_sijainti = kohde_1.id;
  paikkatausta.src = `../static/images/paikka_numerot/${pelaaja_olio.pelaaja_sijainti}.png`;
  console.log('matkan kesto on ' + kohde_1.value);
  taistelu_mahdollisuus(kohde_1.value);
});

const kohde_2 = document.getElementById('2');
kohde_2.addEventListener('click', function() {
  console.log(`klikattu ${kohde_2.id} : ${kohde_2.name}`);
  pelaaja_olio.pelaaja_sijainti = kohde_2.id;
  paikkatausta.src = `../static/images/paikka_numerot/${pelaaja_olio.pelaaja_sijainti}.png`;
  console.log('matkan kesto on ' + kohde_2.value);
  taistelu_mahdollisuus(kohde_2.value);
});

const kohde_3 = document.getElementById('3');
kohde_3.addEventListener('click', function() {
  console.log(`klikattu ${kohde_3.id} : ${kohde_3.name}`);
  pelaaja_olio.pelaaja_sijainti = kohde_3.id;
  paikkatausta.src = `../static/images/paikka_numerot/${pelaaja_olio.pelaaja_sijainti}.png`;
  console.log('matkan kesto on ' + kohde_3.value);
  taistelu_mahdollisuus(kohde_3.value);
});

const kohde_4 = document.getElementById('4');
kohde_4.addEventListener('click', function() {
  console.log(`klikattu ${kohde_4.id} : ${kohde_4.name}`);
  pelaaja_olio.pelaaja_sijainti = kohde_4.id;
  paikkatausta.src = `../static/images/paikka_numerot/${pelaaja_olio.pelaaja_sijainti}.png`;
  console.log('matkan kesto on ' + kohde_4.value);
  taistelu_mahdollisuus(kohde_4.value);
});

const kohde_5 = document.getElementById('5');
kohde_5.addEventListener('click', function() {
  console.log(`klikattu ${kohde_5.id} : ${kohde_5.name}`);
  pelaaja_olio.pelaaja_sijainti = kohde_5.id;
  paikkatausta.src = `../static/images/paikka_numerot/${pelaaja_olio.pelaaja_sijainti}.png`;
  console.log('matkan kesto on ' + kohde_5.value);
  taistelu_mahdollisuus(kohde_5.value);
});

const kohde_6 = document.getElementById('6');
kohde_6.addEventListener('click', function() {
  console.log(`klikattu ${kohde_6.id} : ${kohde_6.name}`);
  pelaaja_olio.pelaaja_sijainti = kohde_6.id;
  paikkatausta.src = `../static/images/paikka_numerot/${pelaaja_olio.pelaaja_sijainti}.png`;
  console.log('matkan kesto on ' + kohde_6.value);
  taistelu_mahdollisuus(kohde_6.value);
});

const kohde_7 = document.getElementById('7');
kohde_7.addEventListener('click', function() {
  console.log(`klikattu ${kohde_7.id} : ${kohde_7.name}`);
  pelaaja_olio.pelaaja_sijainti = kohde_7.id;
  paikkatausta.src = `../static/images/paikka_numerot/${pelaaja_olio.pelaaja_sijainti}.png`;
  console.log('matkan kesto on ' + kohde_7.value);
  taistelu_mahdollisuus(kohde_7.value);
});

const kohde_8 = document.getElementById('8');
kohde_8.addEventListener('click', function() {
  console.log(`klikattu ${kohde_8.id} : ${kohde_8.name}`);
  pelaaja_olio.pelaaja_sijainti = kohde_8.id;
  paikkatausta.src = `../static/images/paikka_numerot/${pelaaja_olio.pelaaja_sijainti}.png`;
  console.log('matkan kesto on ' + kohde_8.value);
  taistelu_mahdollisuus(kohde_8.value);
});

const kohde_9 = document.getElementById('9');
kohde_9.addEventListener('click', function() {
  console.log(`klikattu ${kohde_9.id} : ${kohde_9.name}`);
  pelaaja_olio.pelaaja_sijainti = kohde_9.id;
  paikkatausta.src = `../static/images/paikka_numerot/${pelaaja_olio.pelaaja_sijainti}.png`;
  console.log('matkan kesto on ' + kohde_9.value);
  taistelu_mahdollisuus(kohde_9.value);
});

const kohde_10 = document.getElementById('10');
kohde_10.addEventListener('click', function() {
  console.log(`klikattu ${kohde_10.id} : ${kohde_10.name}`);
  pelaaja_olio.pelaaja_sijainti = kohde_10.id;
  paikkatausta.src = `../static/images/paikka_numerot/${pelaaja_olio.pelaaja_sijainti}.png`;
  console.log('matkan kesto on ' + kohde_10.value);
  taistelu_mahdollisuus(kohde_10.value);
});