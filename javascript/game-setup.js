document.addEventListener('DOMContentLoaded', function() {
  // Etsi vasemman puolen elementti ja aseta sille display: none;
  const vasen_puoli = document.querySelector('.vasen-puoli');
  vasen_puoli.style.display = 'none';

});

// Hakee nimet tietokannasta
async function hae_nimet() {
  // Hakee Flask tietokannasta nimet
  const vastaus = await fetch('http://localhost:5000/hae_pelaaja_nimet');
  return await vastaus.json();
}

// Tämä hoitaa uuden pelin aloittamisen
async function avaa_uusipeli_valikko() {
  // Piilota paavalikko
  const paavalikko = document.querySelector('.valikko');
  paavalikko.style.display = 'none';

  const uusi_peli_valikko = document.querySelector('.uusi-peli-valikko');
  uusi_peli_valikko.style.display = 'flex';

  const varatut_nimet = await hae_nimet();
  const varatut_nimet_lista = [];
  for (let varattu_nimi of varatut_nimet) {
    let varattu_nimi_caps = varattu_nimi.pelaaja_nimi.toUpperCase();
    varatut_nimet_lista.push(varattu_nimi_caps);
  }
  console.log(varatut_nimet_lista);

  // Etsi lomake ja lisää sille submit-kuuntelija
  const uusi_peli_form = document.getElementById('uusi-peli-form');
  uusi_peli_form.addEventListener('submit', function(event) {
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
      console.log('Aloita peli pelaajalla:', pelaaja_nimi);

      // Tyhjennä pelaajan nimi
      pelaaja_nimi_elementti.value = '';

      uusi_peli_valikko.style.display = 'none';

      const vasen_puoli = document.querySelector('.vasen-puoli');
      vasen_puoli.style.display = 'flex';
    }
  });
}

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

  // Esitetään tallenukset nappeina
  for (const pelaaja of data) {
    const pelaaja_nappi = document.createElement('button');
    pelaaja_nappi.textContent = pelaaja.pelaaja_nimi;
    pelaaja_nappi.classList.add('nappi');
    lataapeli_valikko.appendChild(pelaaja_nappi);

    // Kuuntelee tallennus napin painallusta
    pelaaja_nappi.addEventListener('click', function() {
      console.log('Pelaaja nappia painettu:', pelaaja.pelaaja_nimi);

      lataapeli_valikko.style.display = 'none';

      const vasen_puoli = document.querySelector('.vasen-puoli');
      vasen_puoli.style.display = 'flex';
    });
  }
}


