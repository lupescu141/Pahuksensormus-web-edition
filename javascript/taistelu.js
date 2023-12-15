let vihollinen;

jatka.addEventListener('click', async () => {
  taisteluloki.value = ' ';

  if (pelaaja_olio.pelaaja_hp > 0) {


    if (vihollinen.vihollinen_nimi === 'Gorgon') {
      await lopeta_taistelu();
      console.log(vihollinen.vihollinen_nimi + 'voitettu');
      textarea.scrollTop = textarea.scrollHeight;
      valinta1.style.display = 'block';
      valinta2.style.display = 'block';
      tutki_nappi.style.display = 'none';
      document.getElementById('lepo').style.display = 'none'
    }
    else {
      await lopeta_taistelu();
      await hae_esine()
      console.log(vihollinen.vihollinen_nimi + 'voitettu');
      textarea.scrollTop = textarea.scrollHeight;
    }
  }

  else if (vihollinen.vihollinen_nimi === 'Gorgon') {
    jatka.style.display = 'none';
    taisteluloki.scrollTop = taisteluloki.scrollHeight;
    valinta1.style.display = 'none';
    valinta2.style.display = 'none';
    oikea_puoli.style.pointerEvents = 'none';
    vasen_puoli.style.pointerEvents = 'none';
    taisteluloki.value = '-Olet epäonnistunut. Gorgon ottaa kuolleen ruumiisi haltuun. Nyt uudella vartalolla hän on vahvempi kuin koskaan ja maailma on hänen vallassaan.';
    taisteluloki.value += `\n\n-Seikkailusi kesti ${pelaaja_olio.menneet_paivat} päivää.`;
    taisteluloki.value += `\n\n-Paina Enter palataksesi alkuvalikkoon`;
    document.addEventListener('keydown', function(event) {
      // Tarkistetaan, onko painalluksen koodi Enter (koodi 'Enter' tai 'NumpadEnter')
      if (event.code === 'Enter' || event.code === 'NumpadEnter') {
        // Kutsutaan haluamaasi toimintoa tässä
        location.reload();
      }
    });
  }

  else {
    jatka.style.display = 'none';
    taisteluloki.scrollTop = taisteluloki.scrollHeight;
    valinta1.style.display = 'none';
    valinta2.style.display = 'none';
    oikea_puoli.style.pointerEvents = 'none';
    vasen_puoli.style.pointerEvents = 'none';
    taisteluloki.value = '-Olet epäonnistunut. Gorgon ottaa maailman haltuunsa.';
    taisteluloki.value += `\n\n-Seikkailusi kesti ${pelaaja_olio.menneet_paivat} päivää.`;
    taisteluloki.value += `\n\n-Paina Enter palataksesi alkuvalikkoon`;
    document.addEventListener('keydown', function(event) {
      // Tarkistetaan, onko painalluksen koodi Enter (koodi 'Enter' tai 'NumpadEnter')
      if (event.code === 'Enter' || event.code === 'NumpadEnter') {
        // Kutsutaan haluamaasi toimintoa tässä
        location.reload();
      }
    });
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
  vihollinen_tp.textContent = random_vihollinen.vihollinen_tp
  document.querySelector(
      '.vihollinen-kuva').style.backgroundImage = `url("../static/images/viholliset/${random_vihollinen.vihollinen_nimi.toLocaleLowerCase()}.png")`;

  return random_vihollinen;
}

// Hakee vihollisen taidon/taidot
async function hae_vihollisen_taidot(vihollisen_id) {
  const response = await fetch(
      `http://localhost:5000/hae_vihollisen_taidot/${vihollisen_id}`);
  const vastaus = await response.json();
  return vastaus;
}

const taistelu = async (vihollinen1) => {

  if (vihollinen1.vihollinen_nimi === 'Gorgon') {
    pysayta_musiikit();
    gorgon_musiikki.play();
  } else {
    pysayta_musiikit();
    random_taistelubiisi();
  }

  //hakee random vihollisen
  vihollinen = await vihollinen1;

  taisteluloki.value += `\n\n-Jouduit taisteluun! vihollisesi on: ${vihollinen.vihollinen_nimi}!`;

  hyokkaa_tooltip.innerText = `Perus hyökkäys 1-${pelaaja_olio.pelaaja_isku +
  2} vahinkoa.`;
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

   for (let i = 0; i < 11; i++){
    inventaario_nappi[i].addEventListener('click', () =>{
      if (pelaaja_inventaario[i].esine_nimi === 'vesipullo'){
        kayta_vesipullo(pelaaja_statukset);
      }

      else if (pelaaja_inventaario[i].esine_nimi === 'eliksiiri'){
        kayta_eliksiiri();
      }

       else if (pelaaja_inventaario[i].esine_nimi === 'taikasauva'){
        kayta_taikasauva(vihollinen,vihollinen_statukset);
      }

        else if (pelaaja_inventaario[i].esine_nimi === 'taitojuoma'){
        kayta_taitojuoma();
      }
    })
  }

  //Aktivoi taitonappien kuuntelijat
  taito1.addEventListener('click', taito1_painettu = () => {

    if (pelaaja_olio.pelaaja_taitopiste > 0) {

      palaa();
      tarkista_taito(pelaaja_taidot[0].taito_nimi, vihollinen,
          vihollinen_statukset, pelaaja_olio, pelaaja_statukset);
      pelaaja_olio.pelaaja_taitopiste -= 1;
      pelaaja_tp.innerText = pelaaja_olio.pelaaja_taitopiste;

    } else {

      taisteluloki.value += '\nSinulla ei ole taitopisteitä.';
    }
  });

  taito2.addEventListener('click', taito2_painettu = () => {
    if (pelaaja_olio.pelaaja_taitopiste > 0) {

      palaa();
      tarkista_taito(pelaaja_taidot[1].taito_nimi, vihollinen,
          vihollinen_statukset, pelaaja_olio, pelaaja_statukset);
      pelaaja_olio.pelaaja_taitopiste -= 1;
      pelaaja_tp.innerText = pelaaja_olio.pelaaja_taitopiste;

    } else {

      taisteluloki.value += '\nSinulla ei ole taitopisteitä.';
    }
  });

  taito3.addEventListener('click', taito3_painettu = () => {
    if (pelaaja_olio.pelaaja_taitopiste > 0) {

      palaa();
      tarkista_taito(pelaaja_taidot[2].taito_nimi, vihollinen,
          vihollinen_statukset, pelaaja_olio, pelaaja_statukset);
      pelaaja_olio.pelaaja_taitopiste -= 1;
      pelaaja_tp.innerText = pelaaja_olio.pelaaja_taitopiste;

    } else {

      taisteluloki.value += '\nSinulla ei ole taitopisteitä.';
    }
  });

  hyokkaa.addEventListener('click', hyokkaa_painettu = async () => {

    if (pelaaja_olio.pelaaja_hp > 0) {

      const isku_osuma = (Math.floor(Math.random() * 21) + 1) + 2;

      if (isku_osuma >= vihollinen.vihollinen_suojaus) {
        const isku = (Math.floor(Math.random() * pelaaja_olio.pelaaja_isku) +
            1) + 2;
        vihollinen.vihollinen_hp -= isku;
        efekti_perusisku();
        taisteluloki.value += `\nTeit viholliseen ${isku} vahinkoa!`;
        taisteluloki.scrollTop = taisteluloki.scrollHeight;
        vihollinen_hp.innerText = vihollinen.vihollinen_hp;
      } else {
        efekti_huti.play();
        taisteluloki.value += `\n${vihollinen.vihollinen_nimi} väisti iskusi!`;
        taisteluloki.scrollTop = taisteluloki.scrollHeight;
      }

      await vihollisen_vuoro(vihollinen);
    }
  });

  taidot.addEventListener('click', taito_painettu = () => {

    console.log(pelaaja_taidot);
    piilota_kaikki_napit();
    taistelu_palaa_nappi.style.display = 'block';

    for (let i = 0; i < pelaaja_taidot.length; i++) {
      taito_napit[i].textContent = pelaaja_taidot[i].taito_nimi;
      taito_napit[i].style.display = 'block';
    }
  });

  taistelu_esineet_nappi.addEventListener('click', esineet_painettu = () => {

    console.log(pelaaja_inventaario);
    piilota_kaikki_napit();
    esineet.style.display = 'inline-grid';
    taistelu_palaa_nappi.style.display = 'block';
    inventaario_nappi.forEach((nappi) => {
      nappi.style.display = 'none';
    });

    for (let i = 0; i < pelaaja_inventaario.length; i++) {
      inventaario_nappi[i].textContent = pelaaja_inventaario[i].esine_nimi;

      if (pelaaja_inventaario[i].esine_nimi === 'vesipullo'){
        console.log('yo');
        inventaario_nappi[i].src = '../static/images/esineet/vesipullo.png';
        inventaario_nappi[i].style.display = 'block';
      }

      else if (pelaaja_inventaario[i].esine_nimi === 'eliksiiri'){
        console.log('yo');
        inventaario_nappi[i].src = '../static/images/esineet/elämäjuoma.png';
        inventaario_nappi[i].style.display = 'block';
      }

      else if (pelaaja_inventaario[i].esine_nimi === 'taitojuoma'){
        console.log('yo');
        inventaario_nappi[i].src = "../static/images/esineet/tp_eliksiiri.png";
        inventaario_nappi[i].style.display = 'block';
      }

      else if (pelaaja_inventaario[i].esine_nimi === 'vastamyrkky'){
        console.log('yo');
        inventaario_nappi[i].src = '../static/images/esineet/vastamyrkky.png';
        inventaario_nappi[i].style.display = 'block';
      }

        else if (pelaaja_inventaario[i].esine_nimi === 'taikasauva'){
        console.log('yo');
        inventaario_nappi[i].src = '../static/images/esineet/taikasauva.png';
        inventaario_nappi[i].style.display = 'block';
      }
    }
  });
};

const vihollisen_vuoro = async (vihollinen) => {

  if (pelaaja_statukset['myrkytetty'] > 0) {
    const myrkkyvahinko = (Math.floor(Math.random() * 4) + 1);
    pelaaja_olio.pelaaja_hp -= myrkkyvahinko;
    pelaaja_hp.innerText = pelaaja_olio.pelaaja_hp;
    taisteluloki.value += `${pelaaja_olio.pelaaja_nimi} on myrkyttyneenä ja menetti ${myrkkyvahinko} elämäpistettä.`;
    pelaaja_statukset['myrkytetty'] -= 1;
  }

  if (vihollinen_statukset['palaa'] > 0) {
    vihollinen.vihollinen_hp -= 2;
    vihollinen_hp.innerText = vihollinen.vihollinen_hp;
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
      efekti_mies_sattuu.play();
      taisteluloki.value += `\n${vihollinen.vihollinen_nimi} teki sinuun ${isku} vahinkoa!`;
      taisteluloki.scrollTop = taisteluloki.scrollHeight;
      pelaaja_hp.innerText = pelaaja_olio.pelaaja_hp;
    } else {
      efekti_huti.play();
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
    vihollinen_hp.innerText = vihollinen.vihollinen_hp;
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
    taistelu_esineet_nappi.removeEventListener('click', esineet_painettu);
    musiikki_sijainti();
    return;
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
    taistelu_esineet_nappi.removeEventListener('click', esineet_painettu);
    efekti_mies_kuolee.play();
  }
};

const tarkista_taito = (
    taitonimi, vihollinen, vihollinen_statukset, pelaaja,
    pelaaja_statukset) => {

  if (taitonimi === 'tulipallo') {
    tulipallo(vihollinen, vihollinen_statukset);
    vihollisen_vuoro(vihollinen);
  } else if (taitonimi === 'siunaus') {
    siunaus(pelaaja, pelaaja_statukset);
    vihollisen_vuoro(vihollinen);
  } else if (taitonimi === 'pyhä isku') {
    pyha_isku(vihollinen);
    vihollisen_vuoro(vihollinen);
  } else if (taitonimi === 'myrkytetty miekka') {
    myrkytetty_miekka(vihollinen, vihollinen_statukset);
    vihollisen_vuoro(vihollinen);
  } else if (taitonimi === 'palava nuoli') {
    palava_nuoli(vihollinen, vihollinen_statukset);
    vihollisen_vuoro(vihollinen);
  } else if (taitonimi === 'elämä varkaus') {
    elämä_varkaus(pelaaja);
  } else if (taitonimi === 'parasiitti') {
    parasiitti(pelaaja);
  } else if (taitonimi === 'kannibalismi') {
    kannibalismi(pelaaja);
  } else if (taitonimi === 'puukon heilutus') {
    puukon_heilutus(pelaaja);
  } else if (taitonimi === 'myrkytys') {
    myrkytys(pelaaja);
  } else if (taitonimi === 'luuhyökkäys') {
    luuhyökkäys(pelaaja);
  } else if (taitonimi === 'nappaus') {
    nappaus(pelaaja);
  } else if (taitonimi === 'noituus') {
    noituus(pelaaja);
  } else if (taitonimi === 'jengi') {
    jengi(pelaaja);
  } else if (taitonimi === 'siipisakset') {
    siipisakset(pelaaja);
  } else if (taitonimi === 'kaato') {
    kaato(pelaaja);
  } else if (taitonimi === 'myrkky') {
    myrkky(pelaaja);
  } else if (taitonimi === 'suohonveto') {
    suohonveto(pelaaja);
  } else if (taitonimi === 'myrkky') {
    myrkky(pelaaja);
  } else if (taitonimi === 'palanaps') {
    palanaps(pelaaja);
  } else if (taitonimi === 'palo') {
    palo(pelaaja);
  } else if (taitonimi === 'puraisu') {
    puraisu(pelaaja);
  } else if (taitonimi === 'oppilaan loitsu') {
    loitsu_oppilas(pelaaja);
  } else if (taitonimi === 'vesikauhu') {
    vesikauhu(pelaaja);
  } else if (taitonimi === 'velhon loitsu') {
    loitsu_velho(pelaaja);
  } else if (taitonimi === 'super peikkojengi') {
    speikkojengi(pelaaja);
  } else if (taitonimi === 'vihollisen tulipallo') {
    vtulipallo(pelaaja);
  } else if (taitonimi === 'noidan loitsu') {
    loitsu_noita(pelaaja);
  } else if (taitonimi === 'herran vesikauhu') {
    herravesikauhu(pelaaja);
  } else if (taitonimi === 'sielunotto') {
    sielunotto(pelaaja);
  }
};
