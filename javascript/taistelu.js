

jatka.addEventListener('click', async () => {
  taisteluloki.value = ' ';

  if (pelaaja_olio.pelaaja_hp > 0){
    await lopeta_taistelu();
  }
  else {
    location.reload();
  }
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

const taistelu = async (vihollinen1) => {

// Hakee vihollisen taidon/taidot
async function hae_vihollisen_taidot(vihollisen_id){
  const response = await fetch(`http://localhost:5000/hae_vihollisen_taidot/${vihollisen_id}`);
  const vastaus = await response.json();
  return vastaus;
}


const taistelu = async () => {

  taisteluloki.value += 'Jouduit taisteluun!';

  //hakee random vihollisen
  let vihollinen = await vihollinen1;

  hyokkaa_tooltip.innerText = `Perus hyökkäys 1-${pelaaja_olio.pelaaja_isku + 2} vahinkoa.`
  hyokkaa_tooltip.style.display = `hidden`;

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

  //Aktivoi taitonappien kuuntelijat
  taito1.addEventListener("click", taito1_painettu = () => {

    if (pelaaja_olio.pelaaja_taitopiste > 0) {

      palaa();
      tarkista_taito(pelaaja_taidot[0].taito_nimi, vihollinen, vihollinen_statukset, pelaaja_olio, pelaaja_statukset);
      pelaaja_olio.pelaaja_taitopiste -= 1;
      pelaaja_tp.innerText = pelaaja_olio.pelaaja_taitopiste;

    }
    else {

      taisteluloki.value += "\nSinulla ei ole taitopisteitä."
    }
  })

    taito2.addEventListener("click", taito2_painettu = () => {
      if (pelaaja_olio.pelaaja_taitopiste > 0) {

        palaa();
        tarkista_taito(pelaaja_taidot[1].taito_nimi, vihollinen, vihollinen_statukset, pelaaja_olio, pelaaja_statukset);
        pelaaja_olio.pelaaja_taitopiste -= 1;
        pelaaja_tp.innerText = pelaaja_olio.pelaaja_taitopiste;

      }
      else {

      taisteluloki.value += "\nSinulla ei ole taitopisteitä."
    }
  })

    taito3.addEventListener("click", taito3_painettu = () => {
      if (pelaaja_olio.pelaaja_taitopiste > 0) {

        palaa();
        tarkista_taito(pelaaja_taidot[2].taito_nimi, vihollinen, vihollinen_statukset, pelaaja_olio, pelaaja_statukset);
        pelaaja_olio.pelaaja_taitopiste -= 1;
        pelaaja_tp.innerText = pelaaja_olio.pelaaja_taitopiste;

    }
      else {

      taisteluloki.value += "\nSinulla ei ole taitopisteitä."
    }
  })


  hyokkaa.addEventListener('click', hyokkaa_painettu = async () => {

    if (pelaaja_olio.pelaaja_hp > 0) {

      const isku_osuma = (Math.floor(Math.random() * 21) + 1) + 2;

      if (isku_osuma >= vihollinen.vihollinen_suojaus) {
        const isku = (Math.floor(Math.random() * pelaaja_olio.pelaaja_isku) +
            1) + 2;
        vihollinen.vihollinen_hp -= isku;

        taisteluloki.value += `\nTeit viholliseen ${isku} vahinkoa!`;
        taisteluloki.scrollTop = taisteluloki.scrollHeight;
        vihollinen_hp.innerText = vihollinen.vihollinen_hp;
      } else {
        taisteluloki.value += `\n${vihollinen.vihollinen_nimi} väisti iskusi!`;
        taisteluloki.scrollTop = taisteluloki.scrollHeight;
      }

      await vihollisen_vuoro(vihollinen);
    }
  });

  taidot.addEventListener('click', taito_painettu = () => {

    console.log(pelaaja_taidot);
    piilota_kaikki_napit();
    taistelu_palaa_nappi.style.display = 'block'

    for (let i = 0; i < pelaaja_taidot.length; i++) {
      taito_napit[i].textContent = pelaaja_taidot[i].taito_nimi;
      taito_napit[i].style.display = 'block';
    }
  });

  taistelu_esineet_nappi.addEventListener('click', esineet_painettu = () =>{

    console.log(pelaaja_inventaario);
    piilota_kaikki_napit();
    esineet.style.display = 'inline-grid'
    taistelu_palaa_nappi.style.display = 'block';
    inventaario_nappi.forEach((nappi) =>{
      nappi.style.display = 'none'
    })
  })
};

const vihollisen_vuoro = async (vihollinen) => {

  if (pelaaja_statukset['myrkytetty'] > 0) {
    const myrkkyvahinko = (Math.floor(Math.random() * 4) + 1);
    pelaaja_olio.pelaaja_hp -= myrkkyvahinko;
    taisteluloki.value += `${pelaaja_olio.pelaaja_nimi} on myrkyttyneenä ja menetti ${myrkkyvahinko} elämäpistettä.`;
    pelaaja_statukset['myrkytetty'] -= 1;
  }

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
      pelaaja_hp.innerText = pelaaja_olio.pelaaja_hp;
    } else {
      taisteluloki.value += `\nVäistit vihollisen iskun!`;
      taisteluloki.scrollTop = taisteluloki.scrollHeight;
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
    taisteluloki.value += `\nVihollinen on myrkyttyneenä ja menetti ${myrkkyvahinko} elämäpistettä.`;
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
    taito1.removeEventListener('click', taito1_painettu);
    taito2.removeEventListener('click', taito2_painettu);
    taito3.removeEventListener('click', taito3_painettu);
    return
  }

  if (pelaaja_statukset['palaa'] > 0) {
    pelaaja_olio.pelaaja_hp -= 2;
    pelaaja_hp.innerText = pelaaja_olio.pelaaja_hp;
    pelaaja_statukset['palaa'] -= 1;
  }

  if (pelaaja_olio.pelaaja_hp <= 0) {

    await peli_ohi();
    piilota_kaikki_napit();
    jatka.style.display = 'block';
    hyokkaa.removeEventListener('click', hyokkaa_painettu);
    taidot.removeEventListener('click', taito_painettu);
    taito1.removeEventListener('click', taito1_painettu);
    taito2.removeEventListener('click', taito2_painettu);
    taito3.removeEventListener('click', taito3_painettu);
  }
};


const tarkista_taito = (taitonimi, vihollinen, vihollinen_statukset, pelaaja, pelaaja_statukset) => {

  if (taitonimi === "tulipallo"){
    tulipallo(vihollinen, vihollinen_statukset);
    vihollisen_vuoro(vihollinen);
  }

  else if (taitonimi === "siunaus"){
    siunaus(pelaaja, pelaaja_statukset);
    vihollisen_vuoro(vihollinen);
  }

  else if (taitonimi === "pyhä isku"){
    pyha_isku(vihollinen);
    vihollisen_vuoro(vihollinen);
  }

  else if (taitonimi === "myrkytetty miekka"){
    myrkytetty_miekka(vihollinen, vihollinen_statukset);
    vihollisen_vuoro(vihollinen);
  }

  else if (taitonimi === "palava nuoli"){
    palava_nuoli(vihollinen, vihollinen_statukset);
    vihollisen_vuoro(vihollinen);
  }
}


