// Tallentaa pelaajan tietokantaan
async function tallenna() {
  const response = await fetch(
      `http://localhost:5000/tallennus/${pelaaja_olio.peli_id}/${pelaaja_olio.pelaaja_sijainti}/${pelaaja_olio.menneet_paivat}/${pelaaja_olio.pelaaja_hp}/${pelaaja_olio.pelaaja_taitopiste}/${pelaaja_olio.onko_sormus}`);
  const vastaus = await response.json();
  console.log(vastaus);
  return vastaus;
}

// Tyhjentää pelaajan inventaarion
async function inventaario_tyhjennys() {
  const response = await fetch(
      `http://localhost:5000/inventaario_tyhjennys/${pelaaja_olio.peli_id}`);
  const vastaus = await response.json();
  console.log(vastaus);
  return vastaus;
}

// Tallentaa nykyisen inventaarion tietokantaan
async function inventaario_tallennus() {
  for (esine of pelaaja_inventaario) {
    console.log(esine.esine_id);
    const response = await fetch(
        `http://localhost:5000/inventaario_tallennus/${pelaaja_olio.peli_id}/${esine.esineen_id}`);
    const vastaus = await response.json();
    console.log(vastaus);
  }
}

// Hakee pelaajan inventaarion
async function hae_inventaario() {
  // Hakee Flask tietokannasta kohteiden matkustus päivät pelaaja sijainnin mukaan
  const response = await fetch(
      `http://localhost:5000/hae_inventaario/${pelaaja_olio.peli_id}`);
  const vastaus = await response.json();
  console.log(vastaus);
  return pelaaja_inventaario = vastaus;
}

// Päivittää pelaajalle maksimi HP:n ja TP:n
async function paivita_maksimi_hp_ja_tp() {
// Tarkistaa, onko pelaajan hp sama kuin maksimi_hp ja tp sama kuin maksimi_tp
  if (pelaaja_olio.hp === pelaaja_olio.maksimi_hp &&
      pelaaja_olio.pelaaja_taitopiste ===
      pelaaja_olio.pelaaja_maksimi_taitopiste) {
    console.log('Pelaajan HP ja TP ovat jo maksimissaan!');
  } else {
    // Päivittää pelaajalle maksimi HP:n ja TP:n
    pelaaja_olio.hp = pelaaja_olio.maksimi_hp;
    pelaaja_olio.pelaaja_taitopiste = pelaaja_olio.pelaaja_maksimi_taitopiste;
    console.log('päivitetty');
  }
}

// Hakee pelaajan luokan taidot
async function hae_luokan_taidot() {
  // Hakee Flask tietokannasta pelaajan taidot
  const response = await fetch(
      `http://localhost:5000/hae_luokan_taidot/${pelaaja_olio.pelaaja_luokka}`);
  const vastaus = await response.json();
  console.log(vastaus);
  return pelaaja_taidot = vastaus;
}

// Laskee kohtiden sijainnit pelaajan sijainnin perusteella. Palauttaa kohteen nimen ja päivien määrän
// kutsutaan aseta_matkustus_paivat funktiossa
async function hae_matkustus_paivat() {
  // Hakee Flask tietokannasta kohteiden matkustus päivät pelaaja sijainnin mukaan
  const response = await fetch(
      `http://localhost:5000/laske_etäisyydet/${pelaaja_olio.pelaaja_sijainti}`);
  const vastaus = await response.json();
  console.log(vastaus);
  return vastaus;
}

// Asettaa matkustus päivät kohteisiin
async function aseta_matkustus_paivat() {
  const kohteet = await hae_matkustus_paivat();

  const kartta = document.querySelector('.kartta');

  if (kartta) {
    // Etsi kaikki span-elementit kartta-divin sisältä
    const spanit = kartta.querySelectorAll('.tooltiptext');

    // Käy läpi jokainen span-elementti
    for (let span of spanit) {
      // Saadaan span-elementin id
      const spanId = span.id;

      // Etsi vastaava kohde-elementti kartta-divin sisältä
      const kohde = kartta.querySelector(`#${spanId}`);

      // Tarkista, onko kohde-elementti olemassa
      if (kohde) {
        for (let laskettu_matka of kohteet) {
          if (laskettu_matka.fantasia_nimi === spanId) {
            // Päivitä spanin teksti
            span.value = laskettu_matka.matka_pv;
            span.textContent = `${spanId} : ${laskettu_matka.matka_pv} päivän matkustus`;
          }
        }
      } else {
        console.error('Kohde-elementtiä ei löytynyt spanille', span);
      }
    }
  } else {
    console.error('Kartta-elementtiä ei löytynyt.');
  }

  // Etsi kaikki kartta-divin sisällä olevat divit
  const karttaDiv = document.querySelector('.kartta');
  const nappiDivs = karttaDiv.querySelectorAll('.kartta-nappi-kuva');

// Käy läpi jokainen div ja lisää sille event listener
  nappiDivs.forEach(div => {
    div.addEventListener('click', function() {
      // Etsi spanin value attribuutti ja tulosta se konsoliin
      const span = div.previousElementSibling;
      const spanValue = span.value;
      console.log('Span value:', spanValue);
    });
  });

}

// Hakee Flask tietokannasta bossin
async function hae_random_bossi() {
  const response = await fetch(`http://localhost:5000/hae_random_bossi`);
  const vastaus = await response.json();
  console.log(vastaus);
  return vastaus;
}

// Hakee Flask tietokannasta esineen
async function hae_esine() {
  const response = await fetch(`http://localhost:5000/hae_esine`);
  const vastaus = await response.json();
  console.log(vastaus);
  return vastaus;
}

// Hakee Flask tietokannasta tallennuksen poiston
async function tallennuksen_poisto_ja_pisteet() {
  const response = await fetch(
      `http://localhost:5000/tallennuksen_poisto_ja_pisteet/${pelaaja_olio.peli_id}/${pelaaja_olio.pelaaja_nimi}/${pelaaja_olio.menneet_paivat}`);
  const vastaus = await response.json();
  console.log(vastaus);
  return vastaus;

}

async function hae_säätila() {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=haiti&units=metric&appid=e34434fb9afb590f02e150bcb3eee98d`);
  const vastaus = await response.json();
  console.log(vastaus.temp);
  return vastaus.temp;
}