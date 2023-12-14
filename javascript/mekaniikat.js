// Tallentaa pelaajan tietokantaan
async function tallenna() {
  const response = await fetch(
      `http://localhost:5000/tallennus/${pelaaja_olio.peli_id}/${pelaaja_olio.pelaaja_sijainti}/${pelaaja_olio.menneet_paivat}/${pelaaja_olio.pelaaja_hp}/${pelaaja_olio.pelaaja_maksimi_hp}/${pelaaja_olio.pelaaja_suojaus}/${pelaaja_olio.pelaaja_isku}/${pelaaja_olio.pelaaja_taitopiste}/${pelaaja_olio.pelaaja_maksimi_taitopiste}/${pelaaja_olio.onko_sormus}`);
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
    textarea.value += '\n\n-Pelaajan HP ja TP ovat jo maksimissaan!';
    textarea.scrollTop = textarea.scrollHeight;
  } else {
    lepaa();
    // Päivittää pelaajalle maksimi HP:n ja TP:n
    pelaaja_olio.pelaaja_hp = pelaaja_olio.pelaaja_maksimi_hp;
    pelaaja_olio.pelaaja_taitopiste = pelaaja_olio.pelaaja_maksimi_taitopiste;
    textarea.value += '\n\n-Lepäsit yhden päivän. HP ja TP ovat maksimissaan';
    textarea.scrollTop = textarea.scrollHeight;

    pelaaja_olio.menneet_paivat++;
    textarea.value += `\n-Olet käyttänyt ${pelaaja_olio.menneet_paivat} päivää etsiessäsi pahuksen sormusta.`;
    textarea.scrollTop = textarea.scrollHeight;

    await tallenna();

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
  if (mahdollisuus > ei_taistelua && parseInt(pelaaja_olio.pelaaja_sijainti) !==
      10) {
    textarea.value += `\n\n-Matkalla jouduit taisteluun.`;
    textarea.scrollTop = textarea.scrollHeight;
    taisteluloki.value += `\n\n-Matkustit liian varomattomasti ja Gorgonin kätyrit huomasivat sinut.`;
    taisteluloki.scrollTop = textarea.scrollHeight;
    pysayta_musiikit();
    pysayta_taustaAanet();
    efekti_taistelu_alkaa.play();
    await avaa_taistelu_ikkuna(hae_random_vihollinen_tietokannasta());
  } else {
    textarea.value += `\n\n-Pääsit turvallisesti perille.`;
    textarea.scrollTop = textarea.scrollHeight;
    musiikki_sijainti();
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

async function peli_ohi() {
  await inventaario_tyhjennys();
  console.log(pelaaja_olio.peli_id);
  const response = await fetch(
      `http://localhost:5000/peli_ohi/${pelaaja_olio.peli_id}`);
  const vastaus = await response.json();
  console.log(vastaus);
  textarea.value = '';
  textarea.value += '\n\n-Sinä kuolit.';
  textarea.value += `\n-Selvisit ${pelaaja_olio.menneet_paivat} Päivää.`;
  taisteluloki.value += '\n-Sinä kuolit.';
  taisteluloki.value += `\n-Selvisit ${pelaaja_olio.menneet_paivat} Päivää.`;
}

// Tarkistaa onko kohteessa sormus
async function tarkista_sormus() {
  console.log(pelaaja_olio.onko_sormus);
  if (parseInt(pelaaja_olio.onko_sormus) === 0 &&
      parseInt(pelaaja_olio.pelaaja_sijainti) ===
      parseInt(pelaaja_olio.sormus_sijainti)) {
    textarea.value += '\n-Onneksi olkoon! Löysit pahuksen sormuksen. Voit nyt täyttää kohtalosi ja kohdata Gorgonin tulivuoressa.';
    efekti_sormus.play();
    textarea.scrollTop = textarea.scrollHeight;
    pelaaja_olio.onko_sormus = 1;
  } else if (parseInt(pelaaja_olio.onko_sormus) === 1 &&
      parseInt(pelaaja_olio.pelaaja_sijainti) === 10) {
    textarea.value += '\n-Tässä alkaa viimeinen taistelu gorgonin kanssa';
    await viimeinen_taistelu();
    textarea.scrollTop = textarea.scrollHeight;
  } else if (parseInt(pelaaja_olio.onko_sormus) === 1) {
    textarea.value += '\n-Sinulla on jo sormus. Voit kohdata Gorgonin tulivuoressa';
    textarea.scrollTop = textarea.scrollHeight;
  } else {
    textarea.value += '\n-Kohteessa ei ole sormusta';
    textarea.scrollTop = textarea.scrollHeight;
  }
}

// Hakee tunnetun vihollisen
async function hae_tunnettu_vihollinen(vihollisen_id) {
  const response = await fetch(
      `http://localhost:5000/hae_tunnettu_vihollinen/${vihollisen_id}`);
  const gorgon = await response.json();
  console.log(gorgon);
  document.getElementById(
      'vihollinen_nimi').textContent = gorgon.vihollinen_nimi;
  vihollinen_hp.textContent = gorgon.vihollinen_hp;
  vihollinen_tp.textContent = gorgon.vihollinen_tp;
  document.querySelector(
      '.vihollinen-kuva').style.backgroundImage = `url("../static/images/bossit/${gorgon.vihollinen_nimi.toLocaleLowerCase()}.png")`;
  return gorgon;
}

async function hae_säätila() {
  const response = await fetch(
      'https://api.openweathermap.org/data/2.5/weather?q=haiti&units=metric&appid=e34434fb9afb590f02e150bcb3eee98d');
  const vastaus = await response.json();
  const aste = parseInt(vastaus.main.temp);
  return aste;
}

async function viimeinen_taistelu() {
  valinta1.style.display = 'block';
  valinta2.style.display = 'block';
  for (let nappi of kartta_nappi) {
    nappi.style.pointerEvents = 'none';
  }
  try {
    valinta1.removeEventListener('click', valinta1kuuntelija);
    valinta2.removeEventListener('click', valinta2kuuntelija);
  } catch (err) {
  } finally {
    console.log('Viimeinen taistelu gorgonin kanssa');
    textarea.value += '\n\n-Saapuessasi tulivuoren huipulle tunnet sieltä huokuvan lämmön kasvoillasi. ' +
        'Otat sormuksen esiin heittääksesi sen tulivuoreen. Sormus alkaa kuitenkin polttaa kättäsi ja pudotat sen maahan. ' +
        'Sormuksen osuessa maahan siitä purkautuu mustaa savua, joka alkaa ottaa muotoaan.' +
        'Gorgon ilmestyy eteesi';
    textarea.value += `\n\n-Gorgon: "Seikkailusi on tullut päätöksen ${pelaaja_olio.pelaaja_nimi}. Voimani ovat kasvaneet ja olen vihdoin vapaa pahuksen sormuksesta. Valmistaudu kuolemaan!"`;
    // Valinnat
    textarea.value += '\n\n1: "Olet mitätön ja minä tuhoan sinut palauttaakseni rauhan maailmaan."';
    textarea.value += '\n\n2: "Olet liian heikko ottaaksesi maailmaa haltuusi. Minä tulen johtamaan maailmaa sormuksen voimalla"';
    textarea.scrollTop = textarea.scrollHeight;

    valinta1.addEventListener('click', valinta1kuuntelija = async function() {
      valinta1.style.display = 'none';
      valinta2.style.display = 'none';
      for (let nappi of kartta_nappi) {
        nappi.style.pointerEvents = 'none';
      }
      await avaa_taistelu_ikkuna(await hae_tunnettu_vihollinen(3));

      await pelin_lopetus();
    });

    valinta2.addEventListener('click', valinta2kuuntelija = async function() {
      valinta1.style.display = 'none';
      valinta2.style.display = 'none';
      for (let nappi of kartta_nappi) {
        nappi.style.pointerEvents = 'none';
      }
      await avaa_taistelu_ikkuna(await hae_tunnettu_vihollinen(3));

      await pelin_lopetus();
    });
  }
}