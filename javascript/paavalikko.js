// Luodaan pelaajalle muuttuja
let pelaaja_olio;

let pelaaja_inventaario;

let pelaaja_taidot;

// Hoitaa alkuvalikon esittelyn
document.addEventListener('DOMContentLoaded', async function() {
  // Etsi vasemman puolen elementti ja aseta sille display: none;
  document.querySelector('.vasen-puoli').style.display = 'none';
  document.querySelector('.kartta').style.display = 'none';

  const response = await fetch(`http://localhost:5000/hae_ennatukset`);
  const vastaus = await response.json();
  console.log(vastaus);

  const taulukko = document.querySelector('.top-lista');

  for (const pisteet of vastaus) {
    const rivi = taulukko.insertRow();

    const solu1 = rivi.insertCell(0);
    solu1.textContent = pisteet.pelaaja_nimi;

    const solu2 = rivi.insertCell(1);
    solu2.textContent = pisteet.menneet_paivat;
  }

});

// Hakee pelaaja_nimet ja pelaaja_id:et tietokannasta
async function hae_nimet() {
  // Hakee Flask tietokannasta nimet
  const vastaus = await fetch('http://localhost:5000/hae_pelaaja_nimet');
  return await vastaus.json();
}

// Asettaa Pelaajan tiedot pelaaja-status ikkunaan
function aseta_tiedot() {
  document.getElementById(
      'pelaaja-nimi').textContent = pelaaja_olio.pelaaja_nimi;
  document.getElementById(
      'pelaaja-hp').textContent = pelaaja_olio.pelaaja_hp;
  document.getElementById(
      'pelaaja-tp').textContent = pelaaja_olio.pelaaja_taitopiste;
  document.querySelector(
      '.pelaaja-kuva').style.backgroundImage = `url("../static/images/pelaaja-luokat/${pelaaja_olio.pelaaja_luokka}-${pelaaja_olio.sukupuoli}.png")`;
}

// Tämä piilottaa valikon ja avaa hahmoluokka valinnan
function valitse_hahmoluokka() {
  // Piilota paavalikko
  document.querySelector('.valikko').style.display = 'none';

  document.querySelector('.uusi-peli-valikko').style.display = 'flex';

  document.querySelector('.pelaajan-nimi-valinta').style.display = 'none';

  document.querySelector('.slideshow-laatikko').style.display = 'flex';
}

// Tämä hoitaa uuden pelaajan luomisen
const hahmoluokka_kuva = document.querySelectorAll('.luokka-kuvat');
hahmoluokka_kuva.forEach(kuva => {
  kuva.addEventListener('click', async function() {
    let hahmoluokka = kuva.value;
    let sukupuoli = kuva.name;
    // Tulostetaan hahmoluokka konsoliin
    console.log(hahmoluokka);

    document.querySelector('.slideshow-laatikko').style.display = 'none';
    document.querySelector('.slideshow-pallot').style.display = 'none';
    document.querySelector('.pelaajan-nimi-valinta').style.display = 'flex';

    // Haetaan nimet ja varmistetaan että ei tule saman nimisiä
    const varatut_nimet = await hae_nimet();
    const varatut_nimet_lista = [];
    for (let varattu_nimi of varatut_nimet) {
      let varattu_nimi_caps = varattu_nimi.pelaaja_nimi.toUpperCase();
      varatut_nimet_lista.push(varattu_nimi_caps);
    }
    console.log('varatut nimet: ' + varatut_nimet_lista);

    // Etsi lomake ja lisää sille submit-kuuntelija
    const uusi_peli_form = document.getElementById('uusi-peli-form');
    uusi_peli_form.addEventListener('submit', async function(event) {
      event.preventDefault(); // Estä lomakkeen oletustoiminta

      // Tässä vaiheessa voit käsitellä pelaajan nimen ja aloittaa pelin
      const pelaaja_nimi_elementti = document.getElementById('pelaajan-nimi');
      const pelaaja_nimi = pelaaja_nimi_elementti.value;

      if (varatut_nimet_lista.includes(pelaaja_nimi.toUpperCase())) {
        console.log('nimi varattu');
        // Tyhjennä pelaajan nimi
        pelaaja_nimi_elementti.value = '';
        pelaaja_nimi_elementti.placeholder = `${pelaaja_nimi} on varattu`;
      } else {
        const vastaus = await fetch(
            `http://localhost:5000//luo_uusi_pelaaja/${pelaaja_nimi}/${hahmoluokka}/${sukupuoli}`);
        pelaaja_olio = await vastaus.json();
        // console.log(pelaaja_tiedot);

        aseta_tiedot();
        console.log(pelaaja_olio);

        // Hakee pelaajan inventaarion ja palauttaa pelaaja_inventaario olion
        await hae_inventaario();
        await hae_luokan_taidot();

        // Tyhjennä pelaajan nimi
        pelaaja_nimi_elementti.value = '';

        document.querySelector('.uusi-peli-valikko').style.display = 'none';
        document.querySelector('.ennatykset').style.display = 'none';

        document.querySelector('.vasen-puoli').style.display = 'flex';
        document.querySelector('.oikea-puoli').style.display = 'flex';
        document.querySelector('.kartta').style.display = 'flex';

      }
    });

  });
});

// Tämä hoitaa ladatun pelin aloittamisen
async function avaa_lataapeli_valikko() {
  // Piilota paavalikko
  const paavalikko = document.querySelector('.valikko');
  paavalikko.style.display = 'none';

  // Tuo lataapeli valikko esiin
  const lataapeli_valikko = document.querySelector('.lataapeli-valikko');
  lataapeli_valikko.style.display = 'flex';

  // Hakee Flask tietokannasta tallennukset
  data = await hae_nimet();
  console.log(data);

  // Esitetään tallenukset nappeina
  for (const pelaaja of data) {
    const pelaaja_nappi = document.createElement('button');
    pelaaja_nappi.textContent = pelaaja.pelaaja_nimi;
    pelaaja_nappi.classList.add('nappi', 'tallennus');
    lataapeli_valikko.appendChild(pelaaja_nappi);

    // Kuuntelee tallennus napin painallusta
    pelaaja_nappi.addEventListener('click', async function() {
      console.log('Pelaaja nappia painettu:', pelaaja.pelaaja_nimi,
          pelaaja.peli_id);

      const vastaus = await fetch(
          `http://localhost:5000//hae_pelaaja_tiedot/${pelaaja.peli_id}`);
      const pelaaja_tiedot = await vastaus.json();
      console.log(pelaaja_tiedot);

      pelaaja_olio = pelaaja_tiedot;
      aseta_tiedot();

      // Hakee pelaajan inventaarion ja palauttaa pelaaja_inventaario olion
      await hae_inventaario();
      await hae_luokan_taidot();

      // Piilottaa alkuvalikon
      lataapeli_valikko.style.display = 'none';

      document.querySelector('.ennatykset').style.display = 'none';

      document.querySelector('.vasen-puoli').style.display = 'flex';
      document.querySelector('.oikea-puoli').style.display = 'flex';
      document.querySelector('.kartta').style.display = 'flex';
    });
  }
}

// Palaa alkuvalikkoon
function palaa_alkuvalikkoon() {
  // Piilota napit
  const lataapeli_valikko = document.querySelector('.lataapeli-valikko');
  lataapeli_valikko.style.display = 'none';

  const uusipeli_valikko = document.querySelector('.uusi-peli-valikko');
  uusipeli_valikko.style.display = 'none';

  // Piilottaa tallennukset
  // Etsi kaikki tallennusnapit
  const tallennus_nappi = document.querySelectorAll('.tallennus');

  // Käy läpi jokainen tallennusnappi ja poista se
  tallennus_nappi.forEach(nappi => {
    nappi.parentNode.removeChild(nappi);
  });

  // Näytä päävalikko
  const paavalikko = document.querySelector('.valikko');
  paavalikko.style.display = 'flex';
}
