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
async function lepo() {
// Tarkistaa, onko pelaajan hp sama kuin maksimi_hp ja tp sama kuin maksimi_tp
  if (pelaaja_olio.pelaaja_hp === pelaaja_olio.pelaaja_maksimi_hp &&
      pelaaja_olio.pelaaja_taitopiste ===
      pelaaja_olio.pelaaja_maksimi_taitopiste) {
    textarea.value += '\n-Pelaajan HP ja TP ovat jo maksimissaan!';
    textarea.scrollTop = textarea.scrollHeight;
  } else {
    // Päivittää pelaajalle maksimi HP:n ja TP:n
    pelaaja_olio.pelaaja_hp = pelaaja_olio.pelaaja_maksimi_hp;
    pelaaja_olio.pelaaja_taitopiste = pelaaja_olio.pelaaja_maksimi_taitopiste;
    textarea.value += '\n-Lepäsit yhden päivä. HP ja TP ovat maksimissaan';
    textarea.scrollTop = textarea.scrollHeight;

    pelaaja_olio.menneet_paivat++
    textarea.value += `\n-Olet käyttänyt ${pelaaja_olio.menneet_paivat} päivää etsiessäsi pahuksen sormusta.`;
    textarea.scrollTop = textarea.scrollHeight;

    await tallenna()

    document.getElementById(
        'pelaaja-hp').textContent = pelaaja_olio.pelaaja_hp;
    document.getElementById(
        'pelaaja-tp').textContent = pelaaja_olio.pelaaja_taitopiste;
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

// Laskee mahdollisuuden tasiteluun
async function taistelu_mahdollisuus(matkan_pituus) {
  const mahdollisuus = Math.floor(Math.random() * 20) + 1;
  const ei_taistelua = parseInt(pelaaja_olio.pelaaja_suojaus) -
      parseInt(matkan_pituus);
  if (mahdollisuus > ei_taistelua) {
    textarea.value += `\n-Jouduit taisteluun!`;
    textarea.scrollTop = textarea.scrollHeight;
    await avaa_taistelu_ikkuna()
  } else {
    textarea.value += `\n-Pääsit turvallisesti perille.`;
    textarea.scrollTop = textarea.scrollHeight;
  }
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

async function peli_ohi(){
  await inventaario_tyhjennys()
  console.log(pelaaja_olio.peli_id);
  const response = await fetch(`http://localhost:5000/peli_ohi/${pelaaja_olio.peli_id}`);
  const vastaus = await response.json();
  console.log(vastaus);
  textarea.value = '';
  textarea.value += '\n-Sinä kuolit.';
  textarea.value += `\n-Selvisit ${pelaaja_olio.menneet_paivat} Päivää.`;
  taisteluloki.value += '\n-Sinä kuolit.';
  taisteluloki.value += `\n-Selvisit ${pelaaja_olio.menneet_paivat} Päivää.`;
}

// Tarkistaa onko kohteessa sormus
async function tarkista_sormus(){
  console.log(pelaaja_olio.onko_sormus)
  if (parseInt(pelaaja_olio.onko_sormus) === 0 && parseInt(pelaaja_olio.pelaaja_sijainti) === parseInt(pelaaja_olio.sormus_sijainti)){
    textarea.value += '\n-Onneksi olkoon! Löysit pahuksen sormuksen. Voit nyt täyttää kohtalosi ja kohdata Gorgonin tulivuoressa.'
    textarea.scrollTop = textarea.scrollHeight;
    pelaaja_olio.onko_sormus = 1
  }
  else if (parseInt(pelaaja_olio.onko_sormus) === 1 && parseInt(pelaaja_olio.pelaaja_sijainti) === 10) {
    textarea.value += '\n-Tässä alkaa viimeinen taistelu gorgonin kanssa'
    textarea.scrollTop = textarea.scrollHeight;
  }
  else if (parseInt(pelaaja_olio.onko_sormus) === 1) {
    textarea.value += '\n-Sinulla on jo sormus. Voit kohdata Gorgonin tulivuoressa'
    textarea.scrollTop = textarea.scrollHeight;
  }
  else {
    textarea.value += '\n-Kohteessa ei ole sormusta'
    textarea.scrollTop = textarea.scrollHeight;
  }
}

async function hae_säätila() {
  const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=haiti&units=metric&appid=e34434fb9afb590f02e150bcb3eee98d');
  const vastaus = await response.json();
  const aste = parseInt(vastaus.main.temp);
  if (aste > 25) {
    return 1
  }
  else {return 0
  }
}


