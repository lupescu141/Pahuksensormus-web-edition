

jatka.addEventListener('click', () => {
  taisteluloki.value = ' ';
  lopeta_taistelu();
});


// Haetaan random vihollinen
async function hae_random_vihollinen_tietokannasta() {
  // Hakee Flask tietokannasta random
  let random_vihollinen;
  random_vihollinen = await fetch(
      'http://localhost:5000/hae_random_vihollinen');
  random_vihollinen = await random_vihollinen.json();
  console.log(random_vihollinen);
  document.getElementById(
      'vihollinen_nimi').textContent = random_vihollinen.vihollinen_nimi;
  vihollinen_hp.textContent = random_vihollinen.vihollinen_hp;
  document.querySelector(
      '.vihollinen-kuva').style.backgroundImage = `url("../static/images/viholliset/${random_vihollinen.vihollinen_nimi.toLocaleLowerCase()}.png")`;

  return random_vihollinen;
}

const taistelu = async () => {

  //hakee random vihollisen
  let vihollinen = await hae_random_vihollinen_tietokannasta();

  //statukset
  pelaaja_statukset = {
    palaa: 0,
    tainnutettu: 0,
    myrkytetty: 0,
    pelkaa: 0,
  };

  vihollinen_statukset = {
    palaa: 0,
    tainnutettu: 0,
    myrkytetty: 0,
    pelkaa: 0,
  };

  hyokkaa.addEventListener('click', hyokkaa_painettu = () => {

    if (pelaaja_olio.pelaaja_hp > 0) {

      const isku_osuma = (Math.floor(Math.random() * 21) + 1) + 2;

      if (isku_osuma >= vihollinen.vihollinen_suojaus) {
        const isku = (Math.floor(Math.random() * pelaaja_olio.pelaaja_isku) +
            1) + 2;
        vihollinen.vihollinen_hp -= isku;

        taisteluloki.value += `\nTeit viholliseen ${isku} vahinkoa!`;
        taisteluloki.scrollTop = taisteluloki.scrollHeight;
        vihollinen_hp.textContent = vihollinen.vihollinen_hp;
      } else {
        taisteluloki.value += `\n${vihollinen.vihollinen_nimi} väisti iskusi!`;
        taisteluloki.scrollTop = taisteluloki.scrollHeight;
      }

      vihollisen_vuoro(vihollinen);
    }
  });

  taidot.addEventListener('click', taito_painettu = () => {

    console.log(pelaaja_taidot);
    piilota_kaikki_napit();

    for (let i = 0; i < pelaaja_taidot.length; i++) {
      taito_napit[i].innerHTML = pelaaja_taidot[i].taito_nimi;
      taito_napit[i].style.display = 'block';
    }
  });
};

const vihollisen_vuoro = (vihollinen) => {

  if (vihollinen_statukset['palaa'] > 0) {
    vihollinen.vihollinen_hp -= 2;
    taisteluloki.value += `\nVihollinen palaa ja menetti 2 elämäpistettä.`;
    vihollinen_statukset['palaa'] -= 1;
  }

  if (vihollinen.vihollinen_hp > 0 && vihollinen_statukset['tainnutettu'] ===
      0) {

    const isku_osuma = (Math.floor(Math.random() * 21) + 1) + 2;

    if (isku_osuma >= pelaaja_olio.pelaaja_suojaus) {
      const isku = (Math.floor(Math.random() * vihollinen.vihollinen_isku) +
          1) + 2;
      pelaaja_olio.pelaaja_hp -= isku;

      taisteluloki.value += `\n${vihollinen.vihollinen_nimi} teki sinuun ${isku} vahinkoa!`;
      taisteluloki.scrollTop = taisteluloki.scrollHeight;
      pelaaja_hp.innerHTML = pelaaja_olio.pelaaja_hp;
    } else {
      taisteluloki.value += `\nVäistit vihollisen iskun!`;
      taisteluloki.scrollTop = taisteluloki.scrollHeight;
    }

    if (pelaaja_statukset['palaa'] > 0) {
      pelaaja_olio.pelaaja_hp -= 2;
      pelaaja_statukset['palaa'] -= 1;
    }

    if (pelaaja_statukset['tainnutettu'] > 0) {
      pelaaja_statukset['tainnutettu'] -= 1;
      vihollisen_vuoro(vihollinen);
    }
  }

  if (vihollinen_statukset['tainnutettu'] > 0) {
    taisteluloki.value += `\n Vihollinen on taintunut.`;
    vihollinen_statukset['tainnutettu'] -= 1;
  }

  if (vihollinen_statukset['myrkytetty'] > 0) {
    const myrkkyvahinko = (Math.floor(Math.random() * 4) + 1);
    vihollinen.vihollinen_hp -= myrkkyvahinko;
    taisteluloki.value += `Vihollinen on myrkyttyneenä ja menetti ${myrkkyvahinko} elämäpistettä.`;
    vihollinen_statukset['myrkytetty'] -= 1;
  }

  if (vihollinen.vihollinen_hp <= 0) {
    taisteluloki.value += `\n${vihollinen.vihollinen_nimi} kuoli!`;
    taisteluloki.value += `\nOnneksi olkoon voitit taistelun!`;
    taisteluloki.value += `\nPaina jatka nappia poistuaksesi taistelusta.`;
    piilota_kaikki_napit();
    jatka.style.display = 'block';
    hyokkaa.removeEventListener('click', hyokkaa_painettu);
    taidot.removeEventListener('click', taito_painettu);
  }
};


