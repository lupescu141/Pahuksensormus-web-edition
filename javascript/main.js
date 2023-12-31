// Luodaan pelaajalle muuttuja
let pelaaja_olio;

let pelaaja_inventaario;

let pelaaja_taidot;

let nykyinen_sijainti;

// Päävalikon elementtejä
const paavalikko = document.querySelector('.valikko');
const vasen_puoli = document.querySelector('.vasen-puoli');
const oikea_puoli = document.querySelector('.oikea-puoli');
const lataapeli_valikko = document.querySelector('.lataapeli-valikko');
const lataapeli_form = document.getElementById('lataa-peli-form');
const uusipeli_valikko = document.querySelector('.uusi-peli-valikko');
const ennatukset = document.querySelector('.ennatykset');
const taulukko = document.querySelector('.top-lista');
// Pelaaja rivi
const paikkatausta = document.getElementById('paikkatausta');
const tutki_nappi = document.getElementById('tutki');
const valinta1 = document.getElementById('valinta1');
const valinta2 = document.getElementById('valinta2');
const pelaaja_napit = document.querySelectorAll('.pelaaja-nappi');
// Loki elementit
const textarea = document.getElementById('loki');
const taisteluloki = document.getElementById('taistelu-loki');

// Kartta elementit
const kartta = document.querySelector('.kartta');
const kartta_nappi = kartta.querySelectorAll('.kartta-nappi-kuva');
const sijainti_nimi = document.getElementById('sijainti_nimi');
const sää = document.getElementById('sää');
const kesto = document.getElementById('kesto');

// Taistelu elementit
const hyokkaa = document.getElementById('hyokkaa');
const taidot = document.getElementById('taidot');
const jatka = document.getElementById('jatka');
const taito_napit = document.querySelectorAll(`.taidot`);
console.log(taito_napit);
const taito1 = document.getElementById('taito1');
const taito2 = document.getElementById('taito2');
const taito3 = document.getElementById('taito3');
const taistelu_esineet_nappi = document.getElementById('esineet');
const esineet = document.querySelector('.esine-napit');
const inventaario_nappi = document.querySelectorAll('.inventaaio_nappi');
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
const taistelu_palaa_nappi = document.getElementById('palaa');

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

  let aste = await hae_säätila();
  aste = parseInt(aste);

  let matkan_vaikeus;

  sää.innerText = 'Lämpötila: ' + aste + ' C';

  if (aste > 32) {
    matkan_vaikeus = 3;
  } else if (aste > 29) {
    matkan_vaikeus = 2;
  } else if (aste > 27) {
    matkan_vaikeus = 1;
  } else if (aste > 25) {
    matkan_vaikeus = 0;
  } else if (aste > 22) {
    matkan_vaikeus = 1;
  } else {
    matkan_vaikeus = 2;
  }

  const kartta_divit = kartta.querySelectorAll('.kartta-nappi');
  kartta_divit.forEach((div) => {
    for (kohde of kohteet) {
      if (parseInt(kohde.id) === parseInt(div.id) && parseInt(kohde.id) !==
          pelaaja_olio.pelaaja_sijainti) {
        div.value = kohde.matka_pv + matkan_vaikeus;
        console.log(
            `Sää on ${aste} C. Matkan vaikeus ${matkan_vaikeus}. Kokonais matka on ${div.value}`);
        break;
      }
    }
  });

  const tooltipit = kartta.querySelectorAll('.tooltiptext');
  tooltipit.forEach((span) => {
    for (kohde of kohteet) {
      if (kohde.fantasia_nimi === span.id) {
        if (parseInt(kohde.matka_pv) !== 0) {
          span.textContent = kohde.fantasia_nimi;
          break;
        } else {
          span.textContent = `Olet täällä!`;
          sijainti_nimi.textContent = span.id;
          break;
        }
      }
    }
  });
}

// Kartta nappien kuuntelijat
const kohde_1 = document.getElementById('1');
kohde_1.addEventListener('click', async function() {
  kartta_nappi.forEach(function(nappi) {
    nappi.style.pointerEvents = 'auto';
  });
  kohde_1.style.pointerEvents = 'none';
  tutki_nappi.style.display = 'block';
  textarea.value = ``;
  textarea.scrollTop = textarea.scrollHeight;
  console.log(`klikattu ${kohde_1.id} : ${kohde_1.name}`);
  pelaaja_olio.pelaaja_sijainti = kohde_1.id;
  pelaaja_olio.menneet_paivat = parseInt(pelaaja_olio.menneet_paivat) +
      parseInt(kohde_1.value);
  paikkatausta.src = `../static/images/paikka_numerot/${pelaaja_olio.pelaaja_sijainti}.png`;
  console.log('matkan kesto on ' + kohde_1.value);
  console.log(`pelaaja on matkustanut ${pelaaja_olio.menneet_paivat} päivää`);
  textarea.value += `\n-Päätät matkustaa kohteeseen ${kohde_1.name}. Sinne on ${kohde_1.value} päivän matkustus`;
  textarea.scrollTop = textarea.scrollHeight;
  await taistelu_mahdollisuus(kohde_1.value);
  await matkustaminen();
  textarea.value += `\n-Olet matkustanut yhteensä ${pelaaja_olio.menneet_paivat} päivää. Voit levätä matkojen välissä jos tarvitset lisää HP tai TP`;
  textarea.scrollTop = textarea.scrollHeight;
  await tarkista_sormus();
  await tallenna();
  await inventaario_tyhjennys();
  await inventaario_tallennus();
});

const kohde_2 = document.getElementById('2');
kohde_2.addEventListener('click', async function() {
  kartta_nappi.forEach(function(nappi) {
    nappi.style.pointerEvents = 'auto';
  });
  kohde_2.style.pointerEvents = 'none';
  tutki_nappi.style.display = 'block';
  textarea.value = ``;
  textarea.scrollTop = textarea.scrollHeight;
  console.log(`klikattu ${kohde_2.id} : ${kohde_2.name}`);
  pelaaja_olio.pelaaja_sijainti = kohde_2.id;
  pelaaja_olio.menneet_paivat = parseInt(pelaaja_olio.menneet_paivat) +
      parseInt(kohde_2.value);
  paikkatausta.src = `../static/images/paikka_numerot/${pelaaja_olio.pelaaja_sijainti}.png`;
  console.log('matkan kesto on ' + kohde_2.value);
  console.log(`pelaaja on matkustanut ${pelaaja_olio.menneet_paivat} päivää`);
  textarea.value += `\n-Päätät matkustaa kohteeseen ${kohde_2.name}. Sinne on ${kohde_2.value} päivän matkustus`;
  textarea.scrollTop = textarea.scrollHeight;
  await taistelu_mahdollisuus(kohde_2.value);
  await matkustaminen();
  textarea.value += `\n-Olet matkustanut yhteensä ${pelaaja_olio.menneet_paivat} päivää. Voit levätä matkojen välissä jos tarvitset lisää HP tai TP`;
  textarea.scrollTop = textarea.scrollHeight;
  await tarkista_sormus();
  await tallenna();
  await inventaario_tyhjennys();
  await inventaario_tallennus();
});

const kohde_3 = document.getElementById('3');
kohde_3.addEventListener('click', async function() {
  kartta_nappi.forEach(function(nappi) {
    nappi.style.pointerEvents = 'auto';
  });
  kohde_3.style.pointerEvents = 'none';
  tutki_nappi.style.display = 'block';
  textarea.value = ``;
  textarea.scrollTop = textarea.scrollHeight;
  console.log(`klikattu ${kohde_3.id} : ${kohde_3.name}`);
  pelaaja_olio.pelaaja_sijainti = kohde_3.id;
  pelaaja_olio.menneet_paivat = parseInt(pelaaja_olio.menneet_paivat) +
      parseInt(kohde_3.value);
  paikkatausta.src = `../static/images/paikka_numerot/${pelaaja_olio.pelaaja_sijainti}.png`;
  console.log('matkan kesto on ' + kohde_3.value);
  console.log(`pelaaja on matkustanut ${pelaaja_olio.menneet_paivat} päivää`);
  textarea.value += `\n-Päätät matkustaa kohteeseen ${kohde_3.name}. Sinne on ${kohde_3.value} päivän matkustus`;
  textarea.scrollTop = textarea.scrollHeight;
  await taistelu_mahdollisuus(kohde_3.value);
  await matkustaminen();
  textarea.value += `\n-Olet matkustanut yhteensä ${pelaaja_olio.menneet_paivat} päivää. Voit levätä matkojen välissä jos tarvitset lisää HP tai TP`;
  textarea.scrollTop = textarea.scrollHeight;
  await tarkista_sormus();
  await tallenna();
  await inventaario_tyhjennys();
  await inventaario_tallennus();
});

const kohde_4 = document.getElementById('4');
kohde_4.addEventListener('click', async function() {
  kartta_nappi.forEach(function(nappi) {
    nappi.style.pointerEvents = 'auto';
  });
  kohde_4.style.pointerEvents = 'none';
  tutki_nappi.style.display = 'block';
  textarea.value = ``;
  textarea.scrollTop = textarea.scrollHeight;
  console.log(`klikattu ${kohde_4.id} : ${kohde_4.name}`);
  pelaaja_olio.pelaaja_sijainti = kohde_4.id;
  pelaaja_olio.menneet_paivat = parseInt(pelaaja_olio.menneet_paivat) +
      parseInt(kohde_4.value);
  paikkatausta.src = `../static/images/paikka_numerot/${pelaaja_olio.pelaaja_sijainti}.png`;
  console.log('matkan kesto on ' + kohde_4.value);
  console.log(`pelaaja on matkustanut ${pelaaja_olio.menneet_paivat} päivää`);
  textarea.value += `\n-Päätät matkustaa kohteeseen ${kohde_4.name}. Sinne on ${kohde_4.value} päivän matkustus`;
  textarea.scrollTop = textarea.scrollHeight;
  await taistelu_mahdollisuus(kohde_4.value);
  await matkustaminen();
  textarea.value += `\n-Olet matkustanut yhteensä ${pelaaja_olio.menneet_paivat} päivää. Voit levätä matkojen välissä jos tarvitset lisää HP tai TP`;
  textarea.scrollTop = textarea.scrollHeight;
  await tarkista_sormus();
  await tallenna();
  await inventaario_tyhjennys();
  await inventaario_tallennus();
});

const kohde_5 = document.getElementById('5');
kohde_5.addEventListener('click', async function() {
  kartta_nappi.forEach(function(nappi) {
    nappi.style.pointerEvents = 'auto';
  });
  kohde_5.style.pointerEvents = 'none';
  tutki_nappi.style.display = 'block';
  textarea.value = ``;
  textarea.scrollTop = textarea.scrollHeight;
  console.log(`klikattu ${kohde_5.id} : ${kohde_5.name}`);
  pelaaja_olio.pelaaja_sijainti = kohde_5.id;
  pelaaja_olio.menneet_paivat = parseInt(pelaaja_olio.menneet_paivat) +
      parseInt(kohde_5.value);
  paikkatausta.src = `../static/images/paikka_numerot/${pelaaja_olio.pelaaja_sijainti}.png`;
  console.log('matkan kesto on ' + kohde_5.value);
  console.log(`pelaaja on matkustanut ${pelaaja_olio.menneet_paivat} päivää`);
  textarea.value += `\n-Päätät matkustaa kohteeseen ${kohde_5.name}. Sinne on ${kohde_5.value} päivän matkustus`;
  textarea.scrollTop = textarea.scrollHeight;
  await taistelu_mahdollisuus(kohde_5.value);
  await matkustaminen();
  textarea.value += `\n-Olet matkustanut yhteensä ${pelaaja_olio.menneet_paivat} päivää. Voit levätä matkojen välissä jos tarvitset lisää HP tai TP`;
  textarea.scrollTop = textarea.scrollHeight;
  await tarkista_sormus();
  await tallenna();
  await inventaario_tyhjennys();
  await inventaario_tallennus();
});

const kohde_6 = document.getElementById('6');
kohde_6.addEventListener('click', async function() {
  kartta_nappi.forEach(function(nappi) {
    nappi.style.pointerEvents = 'auto';
  });
  kohde_6.style.pointerEvents = 'none';
  tutki_nappi.style.display = 'block';
  textarea.value = ``;
  textarea.scrollTop = textarea.scrollHeight;
  console.log(`klikattu ${kohde_6.id} : ${kohde_6.name}`);
  pelaaja_olio.pelaaja_sijainti = kohde_6.id;
  pelaaja_olio.menneet_paivat = parseInt(pelaaja_olio.menneet_paivat) +
      parseInt(kohde_6.value);
  paikkatausta.src = `../static/images/paikka_numerot/${pelaaja_olio.pelaaja_sijainti}.png`;
  console.log('matkan kesto on ' + kohde_6.value);
  console.log(`pelaaja on matkustanut ${pelaaja_olio.menneet_paivat} päivää`);
  textarea.value += `\n-Päätät matkustaa kohteeseen ${kohde_6.name}. Sinne on ${kohde_6.value} päivän matkustus`;
  textarea.scrollTop = textarea.scrollHeight;
  await taistelu_mahdollisuus(kohde_6.value);
  await matkustaminen();
  textarea.value += `\n-Olet matkustanut yhteensä ${pelaaja_olio.menneet_paivat} päivää. Voit levätä matkojen välissä jos tarvitset lisää HP tai TP`;
  textarea.scrollTop = textarea.scrollHeight;
  await tarkista_sormus();
  await tallenna();
  await inventaario_tyhjennys();
  await inventaario_tallennus();
});

const kohde_7 = document.getElementById('7');
kohde_7.addEventListener('click', async function() {
  kartta_nappi.forEach(function(nappi) {
    nappi.style.pointerEvents = 'auto';
  });
  kohde_7.style.pointerEvents = 'none';
  tutki_nappi.style.display = 'block';
  textarea.value = ``;
  textarea.scrollTop = textarea.scrollHeight;
  console.log(`klikattu ${kohde_7.id} : ${kohde_7.name}`);
  pelaaja_olio.pelaaja_sijainti = kohde_7.id;
  pelaaja_olio.menneet_paivat = parseInt(pelaaja_olio.menneet_paivat) +
      parseInt(kohde_7.value);
  paikkatausta.src = `../static/images/paikka_numerot/${pelaaja_olio.pelaaja_sijainti}.png`;
  console.log('matkan kesto on ' + kohde_7.value);
  console.log(`pelaaja on matkustanut ${pelaaja_olio.menneet_paivat} päivää`);
  textarea.value += `\n-Päätät matkustaa kohteeseen ${kohde_7.name}. Sinne on ${kohde_7.value} päivän matkustus`;
  textarea.scrollTop = textarea.scrollHeight;
  await taistelu_mahdollisuus(kohde_7.value);
  await matkustaminen();
  textarea.value += `\n-Olet matkustanut yhteensä ${pelaaja_olio.menneet_paivat} päivää. Voit levätä matkojen välissä jos tarvitset lisää HP tai TP`;
  textarea.scrollTop = textarea.scrollHeight;
  await tarkista_sormus();
  await tallenna();
  await inventaario_tyhjennys();
  await inventaario_tallennus();
});

const kohde_8 = document.getElementById('8');
kohde_8.addEventListener('click', async function() {
  kartta_nappi.forEach(function(nappi) {
    nappi.style.pointerEvents = 'auto';
  });
  kohde_8.style.pointerEvents = 'none';
  tutki_nappi.style.display = 'block';
  textarea.value = ``;
  textarea.scrollTop = textarea.scrollHeight;
  console.log(`klikattu ${kohde_8.id} : ${kohde_8.name}`);
  pelaaja_olio.pelaaja_sijainti = kohde_8.id;
  pelaaja_olio.menneet_paivat = parseInt(pelaaja_olio.menneet_paivat) +
      parseInt(kohde_8.value);
  paikkatausta.src = `../static/images/paikka_numerot/${pelaaja_olio.pelaaja_sijainti}.png`;
  console.log('matkan kesto on ' + kohde_8.value);
  console.log(`pelaaja on matkustanut ${pelaaja_olio.menneet_paivat} päivää`);
  textarea.value += `\n-Päätät matkustaa kohteeseen ${kohde_8.name}. Sinne on ${kohde_8.value} päivän matkustus`;
  textarea.scrollTop = textarea.scrollHeight;
  await taistelu_mahdollisuus(kohde_8.value);
  await matkustaminen();
  textarea.value += `\n-Olet matkustanut yhteensä ${pelaaja_olio.menneet_paivat} päivää. Voit levätä matkojen välissä jos tarvitset lisää HP tai TP`;
  textarea.scrollTop = textarea.scrollHeight;
  await tarkista_sormus();
  await tallenna();
  await inventaario_tyhjennys();
  await inventaario_tallennus();
});

const kohde_9 = document.getElementById('9');
kohde_9.addEventListener('click', async function() {
  kartta_nappi.forEach(function(nappi) {
    nappi.style.pointerEvents = 'auto';
  });
  kohde_9.style.pointerEvents = 'none';
  tutki_nappi.style.display = 'block';
  textarea.value = ``;
  textarea.scrollTop = textarea.scrollHeight;
  console.log(`klikattu ${kohde_9.id} : ${kohde_9.name}`);
  pelaaja_olio.pelaaja_sijainti = kohde_9.id;
  pelaaja_olio.menneet_paivat = parseInt(pelaaja_olio.menneet_paivat) +
      parseInt(kohde_9.value);
  paikkatausta.src = `../static/images/paikka_numerot/${pelaaja_olio.pelaaja_sijainti}.png`;
  console.log('matkan kesto on ' + kohde_9.value);
  console.log(`pelaaja on matkustanut ${pelaaja_olio.menneet_paivat} päivää`);
  textarea.value += `\n-Päätät matkustaa kohteeseen ${kohde_9.name}. Sinne on ${kohde_9.value} päivän matkustus`;
  textarea.scrollTop = textarea.scrollHeight;
  await taistelu_mahdollisuus(kohde_9.value);
  await matkustaminen();
  textarea.value += `\n-Olet matkustanut yhteensä ${pelaaja_olio.menneet_paivat} päivää. Voit levätä matkojen välissä jos tarvitset lisää HP tai TP`;
  textarea.scrollTop = textarea.scrollHeight;
  await tarkista_sormus();
  await tallenna();
  await inventaario_tyhjennys();
  await inventaario_tallennus();
});

const kohde_10 = document.getElementById('10');
kohde_10.addEventListener('click', async function() {
  kartta_nappi.forEach(function(nappi) {
    nappi.style.pointerEvents = 'auto';
  });
  kohde_10.style.pointerEvents = 'none';
  tutki_nappi.style.display = 'none';
  textarea.value = ``;
  textarea.scrollTop = textarea.scrollHeight;
  console.log(`klikattu ${kohde_10.id} : ${kohde_10.name}`);
  pelaaja_olio.pelaaja_sijainti = kohde_10.id;
  pelaaja_olio.menneet_paivat = parseInt(pelaaja_olio.menneet_paivat) +
      parseInt(kohde_10.value);
  paikkatausta.src = `../static/images/paikka_numerot/${pelaaja_olio.pelaaja_sijainti}.png`;
  console.log('matkan kesto on ' + kohde_10.value);
  console.log(`pelaaja on matkustanut ${pelaaja_olio.menneet_paivat} päivää`);
  textarea.value += `\n-Päätät matkustaa kohteeseen ${kohde_10.name}. Sinne on ${kohde_10.value} päivän matkustus`;
  textarea.scrollTop = textarea.scrollHeight;
  await taistelu_mahdollisuus(kohde_10.value);
  await matkustaminen();
  textarea.value += `\n-Olet matkustanut yhteensä ${pelaaja_olio.menneet_paivat} päivää. Voit levätä matkojen välissä jos tarvitset lisää HP tai TP`;
  textarea.scrollTop = textarea.scrollHeight;
  await tarkista_sormus();
  await tallenna();
  await inventaario_tyhjennys();
  await inventaario_tallennus();
});

// Lisää tapahtumakäsittelijät jokaiselle .kartta-nappi -elementille
kartta_nappi.forEach(nappi => {
  nappi.addEventListener('mouseover', () => {
    // Tapahtuu kun hiiri on elementin päällä (hover)
    nykyinen_sijainti = sijainti_nimi.innerText;
    sijainti_nimi.innerText = nappi.name;
    sää.style.display = 'none';
    kesto.style.display = 'flex';
    if (parseInt(nappi.id) !== parseInt(pelaaja_olio.pelaaja_sijainti)) {
      kesto.innerText = nappi.value + ' Päivää';
    } else {
      kesto.innerText = 'Olet täällä';
    }
  });

  nappi.addEventListener('mouseout', () => {
    // Tapahtuu kun hiiri poistuu elementin päältä (hoverin poistuminen)
    sijainti_nimi.innerText = nykyinen_sijainti;
    sää.style.display = 'flex';
    kesto.style.display = 'none';
    kesto.innerText = '';
  });
});