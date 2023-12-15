//Pelaajan taidot

const tulipallo = (vihollinen, vihollinen_statukset) => {

    const vahinko_arvo = (Math.floor(Math.random() * 7) + 1) + (Math.floor(Math.random() * 7) + 1) + 2;
    pelaaja_olio.taitopiste -= 1;
    vihollinen.vihollinen_hp -= vahinko_arvo;
    efekti_tulipallo.play();
    wait(efekti_tulipallo.duration() * 500);
    vihollinen_hp.innerText = vihollinen.vihollinen_hp;
    taisteluloki.value += `\nTulipallo käristi ${vahinko_arvo} elämäpistettä viholliselta.`;
    vihollinen_statukset["palaa"] += 2;
    taisteluloki.value += `\n${vihollinen.vihollinen_nimi} syttyy palamaan`;
}

const palava_nuoli = (vihollinen, vihollinen_statukset) => {
    const vahinko_arvo = (Math.floor(Math.random() * 7) + 1) + 2;
    pelaaja_olio.taitopiste -= 1;
    vihollinen.vihollinen_hp -= vahinko_arvo;
    vihollinen_hp.innerText = vihollinen.vihollinen_hp;
    taisteluloki.value += `\nAmmut palavan nuolen.`;
    taisteluloki.value += `\nPalavaa nuoli lävistää vihollisen ja hän menettää ${vahinko_arvo} elämäpistettä`;
    vihollinen_statukset["palaa"] += 4;
    taisteluloki.value += `\n${vihollinen.vihollinen_nimi} syttyy palamaan`;
}

const siunaus = (pelaaja_statukset) => {

    const parannus_arvo = (Math.floor(Math.random() * 4) + 1) + 2;

  pelaaja_statukset = {
    palaa: 0,
    tainnutettu: 0,
    myrkytetty: 0,
    pelkaa: 0,
  };

    taisteluloki.value += "\nRukoilet jumalettarellesi ja hän siunaa sinua.";
    pelaaja_olio.taitopiste -= 1;
    pelaaja_olio.pelaaja_hp += parannus_arvo;
    pelaaja_hp.innerText = pelaaja_olio.pelaaja_hp;
    taisteluloki.value += `\nTunnet lämpimän aallon kulkevan lävitsesi. Sait ${parannus_arvo} elämäpistettä.`;
}

const pyha_isku = (vihollinen) => {

    const vahinko_arvo = (Math.floor(Math.random() * pelaaja_olio.pelaaja_isku) + 1) + (Math.floor(Math.random() * pelaaja_olio.pelaaja_isku) + 1) + 2;
    pelaaja_olio.taitopiste -= 1;
    efekti_pyhaisku.play();
    wait(1200);
    vihollinen.vihollinen_hp -= vahinko_arvo;
    vihollinen_hp.innerText = vihollinen.vihollinen_hp;
    taisteluloki.value += `\nSiirrät pyhää energiaa vasaraasi ja se alkaa hohtaa kultaista valoa. Rankaiset pahuuden kätyriä voimakkaalla iskulla.`;
    taisteluloki.value += `\n${vihollinen.vihollinen_nimi} menetti ${vahinko_arvo} elämäpistettä.`;
}

const myrkytetty_miekka = (vihollinen, vihollinen_statukset) => {

    const vahinko_arvo = (Math.floor(Math.random() * pelaaja_olio.pelaaja_isku) + 1) + 3;
    pelaaja_olio.taitopiste -= 1;
    taisteluloki.value += `\nHuitaiset vihollista myrkytetyllä miekalla.`;
    vihollinen.vihollinen_hp -= vahinko_arvo;
    vihollinen_hp.innerText = vihollinen.vihollinen_hp;
    taisteluloki.value += `\n${vihollinen.vihollinen_nimi} menetti ${vahinko_arvo} elämäpistettä.`;
    vihollinen_statukset["myrkytetty"] += 3;
    taisteluloki.value += `\n${vihollinen.vihollinen_nimi} on myrkyttynyt.`;
}

//Vihollisten taidot

const elämä_varkaus = (vihollinen) => {

  const vahinko_arvo = (Math.floor(Math.random() * 7) + 1) + 3;
  pelaaja_olio.pelaaja_hp -= vahinko_arvo;
  pelaaja_hp.innerText = pelaaja_olio.pelaaja_hp;
  vihollinen.vihollinen_hp += 5
  vihollinen.vihollinen_tp -= 1;
  taisteluloki.value += `\nGorgon varasti sinulta elämäpisteitä.`;
  taisteluloki.value += `\nMenetit ${vahinko_arvo} elämäpistettä.`;
  taisteluloki.value += `\n${vihollinen.vihollinen_nimi} sai 5 elämäpistettä.`;
}

const parasiitti = (vihollinen, vihollinen_hp) => {

  const vahinko_arvo = (Math.floor(Math.random() * 4) + 1) + 3;
  pelaaja_olio.pelaaja_hp -= vahinko_arvo;
  pelaaja_hp.innerText = pelaaja_olio.pelaaja_hp;
  vihollinen.vihollinen_hp += 5
  vihollinen_tp -= 1;
  taisteluloki.value += `\nEläväkuollut syöksee sinuun parasiitteja.`;
  taisteluloki.value += `\nMenetit ${vahinko_arvo} elämäpistettä.`;
  taisteluloki.value += `\n${vihollinen.vihollinen_nimi} sai 5 elämäpistettä.`;
}

const kannibalismi = (vihollinen, vihollinen_hp, pelaaja_statukset) => {

  const vahinko_arvo = (Math.floor(Math.random() * 4) + 1) + 3;
  pelaaja_olio.pelaaja_hp -= vahinko_arvo;
  pelaaja_hp.innerText = pelaaja_olio.pelaaja_hp;
  vihollinen.vihollinen_hp += 5
  vihollinen_tp -= 1;
  taisteluloki.value += `\nKannibaali ghouli syö sinut.`;
  pelaaja_statukset["tainnutettu"] += 3;
  taisteluloki.value += `\nMenetit ${vahinko_arvo} elämäpistettä.`;
  taisteluloki.value += `\n${vihollinen.vihollinen_nimi} sai 5 elämäpistettä.`;
}

const puukon_heilutus = (vihollinen, vihollinen_hp) => {

  const vahinko_arvo = (Math.floor(Math.random() * 4) + 1) + 3;
  pelaaja_olio.pelaaja_hp -= vahinko_arvo;
  pelaaja_hp.innerText = pelaaja_olio.pelaaja_hp;
  vihollinen.vihollinen_hp += 5
  vihollinen_tp -= 1;
  taisteluloki.value += `\nGoblin heiluttaa puukkoa.`;
  taisteluloki.value += `\nMenetit ${vahinko_arvo} elämäpistettä.`;
  taisteluloki.value += `\n${vihollinen.vihollinen_nimi} sai 5 elämäpistettä.`;
}

const myrkytys = (vihollinen, vihollinen_hp, pelaaja_statukset) => {

  const vahinko_arvo = (Math.floor(Math.random() * 4) + 1) + 3;
  pelaaja_olio.pelaaja_hp -= vahinko_arvo;
  pelaaja_statukset["myrkytetty"] += 3;
  pelaaja_hp.innerText = pelaaja_olio.pelaaja_hp;
  vihollinen.vihollinen_hp += 5
  vihollinen_tp -= 1;
  taisteluloki.value += `\nJättisammakko myrkyttää sinut.`;
  pelaaja_statukset["myrkytetty"] += 3;
  taisteluloki.value += `\nMenetit ${vahinko_arvo} elämäpistettä.`;
  taisteluloki.value += `\n${vihollinen.vihollinen_nimi} sai 5 elämäpistettä.`;
}

const luuhyökkäys = (vihollinen, vihollinen_hp) => {

  const vahinko_arvo = (Math.floor(Math.random() * 4) + 1) + 3;
  pelaaja_olio.pelaaja_hp -= vahinko_arvo;
  pelaaja_hp.innerText = pelaaja_olio.pelaaja_hp;
  vihollinen.vihollinen_hp += 5
  vihollinen_tp -= 1;
  taisteluloki.value += `\nLuuranko vetää värttinäluunsa sinun rintaan.`;
  taisteluloki.value += `\nMenetit ${vahinko_arvo} elämäpistettä.`;
  taisteluloki.value += `\n${vihollinen.vihollinen_nimi} sai 5 elämäpistettä.`;
}

const nappaus = (vihollinen, vihollinen_hp, pelaaja_statukset) => {

  const vahinko_arvo = (Math.floor(Math.random() * 4) + 1) + 3;
  pelaaja_olio.pelaaja_hp -= vahinko_arvo;
  pelaaja_hp.innerText = pelaaja_olio.pelaaja_hp;
  vihollinen.vihollinen_hp += 5
  vihollinen_tp -= 1;
  taisteluloki.value += `\nMimicin kieli luikertelee arkusta ja nappaa sinut arkkuun.`;  pelaaja_statukset["tainnutettu"] += 3;
  pelaaja_statukset["tainnutettu"] += 3;
  taisteluloki.value += `\nMenetit ${vahinko_arvo} elämäpistettä.`;
  taisteluloki.value += `\n${vihollinen.vihollinen_nimi} sai 5 elämäpistettä.`;
}

const noituus = (vihollinen, vihollinen_hp, pelaaja_statukset) => {

  const vahinko_arvo = (Math.floor(Math.random() * 4) + 1) + 3;
  pelaaja_olio.pelaaja_hp -= vahinko_arvo;
  pelaaja_hp.innerText = pelaaja_olio.pelaaja_hp;
  vihollinen.vihollinen_hp += 5
  vihollinen_tp -= 1;
  taisteluloki.value += `\nNoita tekee sinulle noituuksia, jotka pitävät sinut tainnutettuna.`;  pelaaja_statukset["tainnutettu"] += 3;
  pelaaja_statukset["tainnutettu"] += 3;
  taisteluloki.value += `\nMenetit ${vahinko_arvo} elämäpistettä.`;
  taisteluloki.value += `\n${vihollinen.vihollinen_nimi} sai 5 elämäpistettä.`;
}

const jengi = (vihollinen, vihollinen_hp) => {

  const vahinko_arvo = (Math.floor(Math.random() * 4) + 1) + 3;
  pelaaja_olio.pelaaja_hp -= vahinko_arvo;
  pelaaja_hp.innerText = pelaaja_olio.pelaaja_hp;
  vihollinen.vihollinen_hp += 5
  vihollinen_tp -= 1;
  taisteluloki.value += `\nPeikko kutsuu peikkojenginsä tappeluun kanssasi.`;
  taisteluloki.value += `\nMenetit ${vahinko_arvo} elämäpistettä.`;
  taisteluloki.value += `\n${vihollinen.vihollinen_nimi} sai 5 elämäpistettä.`;
}

const siipisakset = (vihollinen, vihollinen_hp) => {

  const vahinko_arvo = (Math.floor(Math.random() * 4) + 1) + 3;
  pelaaja_olio.pelaaja_hp -= vahinko_arvo;
  pelaaja_hp.innerText = pelaaja_olio.pelaaja_hp;
  vihollinen.vihollinen_hp += 5
  vihollinen_tp -= 1;
  taisteluloki.value += `\nPöllörobon siivistä tulee sakset, jotka aiheuttavat sinulle tuhoa.`;
  taisteluloki.value += `\nMenetit ${vahinko_arvo} elämäpistettä.`;
  taisteluloki.value += `\n${vihollinen.vihollinen_nimi} sai 5 elämäpistettä.`;
}

const kaato = (vihollinen, vihollinen_hp) => {

  const vahinko_arvo = (Math.floor(Math.random() * 4) + 1) + 3;
  pelaaja_olio.pelaaja_hp -= vahinko_arvo;
  pelaaja_hp.innerText = pelaaja_olio.pelaaja_hp;
  vihollinen.vihollinen_hp += 5
  vihollinen_tp -= 1;
  taisteluloki.value += `\nTäältä tulee hirmuinen rölli. Rölli kaataa sinut maahan.`;
  taisteluloki.value += `\nMenetit ${vahinko_arvo} elämäpistettä.`;
  taisteluloki.value += `\n${vihollinen.vihollinen_nimi} sai 5 elämäpistettä.`;
}

const myrkky = (vihollinen, vihollinen_hp, pelaaja_statukset) => {

  const vahinko_arvo = (Math.floor(Math.random() * 4) + 1) + 3;
  pelaaja_olio.pelaaja_hp -= vahinko_arvo;
  pelaaja_hp.innerText = pelaaja_olio.pelaaja_hp;
  vihollinen.vihollinen_hp += 5
  vihollinen_tp -= 1;
  taisteluloki.value += `\nSyöjätär saa sinusta palan.`;
  pelaaja_statukset["myrkytetty"] += 3;
  taisteluloki.value += `\nMenetit ${vahinko_arvo} elämäpistettä.`;
  taisteluloki.value += `\n${vihollinen.vihollinen_nimi} sai 5 elämäpistettä.`;
}

const suohonveto = (vihollinen, vihollinen_hp, pelaaja_statukset) => {

  const vahinko_arvo = (Math.floor(Math.random() * 4) + 1) + 3;
  pelaaja_olio.pelaaja_hp -= vahinko_arvo;
  pelaaja_hp.innerText = pelaaja_olio.pelaaja_hp;
  vihollinen.vihollinen_hp += 5
  vihollinen_tp -= 1;
  taisteluloki.value += `\nSuohirviö vetää sinut suon alle.`;
  pelaaja_statukset["tainnutettu"] += 3;
  taisteluloki.value += `\nMenetit ${vahinko_arvo} elämäpistettä.`;
  taisteluloki.value += `\n${vihollinen.vihollinen_nimi} sai 5 elämäpistettä.`;
}

const palanaps = (vihollinen, vihollinen_hp) => {

  const vahinko_arvo = (Math.floor(Math.random() * 4) + 1) + 3;
  pelaaja_olio.pelaaja_hp -= vahinko_arvo;
  pelaaja_hp.innerText = pelaaja_olio.pelaaja_hp;
  vihollinen.vihollinen_hp += 5
  vihollinen_tp -= 1;
  taisteluloki.value += `\nSyöjätär saa sinusta palan.`;
  taisteluloki.value += `\nMenetit ${vahinko_arvo} elämäpistettä.`;
  taisteluloki.value += `\n${vihollinen.vihollinen_nimi} sai 5 elämäpistettä.`;
}

const palo = (vihollinen, vihollinen_hp, pelaaja_statukset) => {

  const vahinko_arvo = (Math.floor(Math.random() * 4) + 1) + 3;
  pelaaja_olio.pelaaja_hp -= vahinko_arvo;
  pelaaja_hp.innerText = pelaaja_olio.pelaaja_hp;
  vihollinen.vihollinen_hp += 5
  vihollinen_tp -= 1;
  taisteluloki.value += `\nTraakki saa sinut palamaan.`;
  pelaaja_statukset["palaa"] += 3;
  taisteluloki.value += `\nMenetit ${vahinko_arvo} elämäpistettä.`;
  taisteluloki.value += `\n${vihollinen.vihollinen_nimi} sai 5 elämäpistettä.`;
}

const puraisu = (vihollinen, vihollinen_hp, pelaaja_statukset) => {

  const vahinko_arvo = (Math.floor(Math.random() * 4) + 1) + 3;
  pelaaja_olio.pelaaja_hp -= vahinko_arvo;
  pelaaja_hp.innerText = pelaaja_olio.pelaaja_hp;
  vihollinen.vihollinen_hp += 5
  vihollinen_tp -= 1;
  taisteluloki.value += `\nVampyyri puraisee sinua kaulasta ja hetkeksi muutut vampyyriksi.`;
  pelaaja_statukset["tainnutettu"] += 3;
  taisteluloki.value += `\nMenetit ${vahinko_arvo} elämäpistettä.`;
  taisteluloki.value += `\n${vihollinen.vihollinen_nimi} sai 5 elämäpistettä.`;
}

const loitsu_oppilas = (vihollinen, vihollinen_hp, pelaaja_statukset) => {

  const vahinko_arvo = (Math.floor(Math.random() * 4) + 1) + 3;
  pelaaja_olio.pelaaja_hp -= vahinko_arvo;
  pelaaja_hp.innerText = pelaaja_olio.pelaaja_hp;
  vihollinen.vihollinen_hp += 5
  vihollinen_tp -= 1;
  taisteluloki.value += `\nVelho-oppilas tekee sinulle loitsun, joka tainnuttaa sinut.`;
  pelaaja_statukset["tainnutettu"] += 2;
  taisteluloki.value += `\nMenetit ${vahinko_arvo} elämäpistettä.`;
  taisteluloki.value += `\n${vihollinen.vihollinen_nimi} sai 5 elämäpistettä.`;
}

const vesikauhu = (vihollinen, vihollinen_hp) => {

  const vahinko_arvo = (Math.floor(Math.random() * 4) + 1) + 3;
  pelaaja_olio.pelaaja_hp -= vahinko_arvo;
  pelaaja_hp.innerText = pelaaja_olio.pelaaja_hp;
  vihollinen.vihollinen_hp += 5
  vihollinen_tp -= 1;
  taisteluloki.value += `\nVesikauhuvaris tartuttaa sinuun vesikauhun.`;
  taisteluloki.value += `\nMenetit ${vahinko_arvo} elämäpistettä.`;
  taisteluloki.value += `\n${vihollinen.vihollinen_nimi} sai 5 elämäpistettä.`;
}

const loitsu_velho = (vihollinen, vihollinen_hp, pelaaja_statukset) => {

  const vahinko_arvo = (Math.floor(Math.random() * 4) + 1) + 3;
  pelaaja_olio.pelaaja_hp -= vahinko_arvo;
  pelaaja_hp.innerText = pelaaja_olio.pelaaja_hp;
  vihollinen.vihollinen_hp += 5
  vihollinen_tp -= 1;
  taisteluloki.value += `\nVelho tekee sinulle loitsun, joka tainnuttaa sinut.`;
  pelaaja_statukset["tainnutettu"] += 3;
  taisteluloki.value += `\nMenetit ${vahinko_arvo} elämäpistettä.`;
  taisteluloki.value += `\n${vihollinen.vihollinen_nimi} sai 5 elämäpistettä.`;
}

const speikkojengi = (vihollinen, vihollinen_hp) => {

  const vahinko_arvo = (Math.floor(Math.random() * 4) + 1) + 3;
  pelaaja_olio.pelaaja_hp -= vahinko_arvo;
  pelaaja_hp.innerText = pelaaja_olio.pelaaja_hp;
  vihollinen.vihollinen_hp += 5
  vihollinen_tp -= 1;
  taisteluloki.value += `\nPeikkokuningas kutsuu superpeikkojenginsä jengitappeluun kanssasi`;
  taisteluloki.value += `\nMenetit ${vahinko_arvo} elämäpistettä.`;
  taisteluloki.value += `\n${vihollinen.vihollinen_nimi} sai 5 elämäpistettä.`;
}

const vtulipallo = (vihollinen, vihollinen_hp) => {

  const vahinko_arvo = (Math.floor(Math.random() * 4) + 1) + 3;
  pelaaja_olio.pelaaja_hp -= vahinko_arvo;
  pelaaja_hp.innerText = pelaaja_olio.pelaaja_hp;
  vihollinen.vihollinen_hp += 5
  vihollinen_tp -= 1;
  taisteluloki.value += `\nRitari heittää tulipallon.`;
  taisteluloki.value += `\nMenetit ${vahinko_arvo} elämäpistettä.`;
  taisteluloki.value += `\n${vihollinen.vihollinen_nimi} sai 5 elämäpistettä.`;
}

const loitsu_noita = (vihollinen, vihollinen_hp, pelaaja_statukset) => {

  const vahinko_arvo = (Math.floor(Math.random() * 4) + 1) + 3;
  pelaaja_olio.pelaaja_hp -= vahinko_arvo;
  pelaaja_hp.innerText = pelaaja_olio.pelaaja_hp;
  vihollinen.vihollinen_hp += 5
  vihollinen_tp -= 1;
  taisteluloki.value += `\nNoita tekee sinulle loitsun, joka tainnuttaa sinut.`;
  pelaaja_statukset["tainnutettu"] += 3;
  taisteluloki.value += `\nMenetit ${vahinko_arvo} elämäpistettä.`;
  taisteluloki.value += `\n${vihollinen.vihollinen_nimi} sai 5 elämäpistettä.`;
}

const herravesikauhu = (vihollinen, vihollinen_hp) => {

  const vahinko_arvo = (Math.floor(Math.random() * 6) + 1) + 3;
  pelaaja_olio.pelaaja_hp -= vahinko_arvo;
  pelaaja_hp.innerText = pelaaja_olio.pelaaja_hp;
  vihollinen.vihollinen_hp += 5
  vihollinen_tp -= 1;
  taisteluloki.value += `\nVaristen herra tartuttaa sinulle supervesikauhun.`;
  taisteluloki.value += `\nMenetit ${vahinko_arvo} elämäpistettä.`;
  taisteluloki.value += `\n${vihollinen.vihollinen_nimi} sai 5 elämäpistettä.`;
}

const sielunotto = (vihollinen, vihollinen_hp, pelaaja_statukset) => {

  const vahinko_arvo = (Math.floor(Math.random() * 4) + 1) + 3;
  pelaaja_olio.pelaaja_hp -= vahinko_arvo;
  pelaaja_hp.innerText = pelaaja_olio.pelaaja_hp;
  vihollinen.vihollinen_hp += 5
  vihollinen_tp -= 1;
  taisteluloki.value += `\nDemoni varastaa sielusi.`;
  pelaaja_statukset["tainnutettu"] += 3;
  taisteluloki.value += `\nMenetit ${vahinko_arvo} elämäpistettä.`;
  taisteluloki.value += `\n${vihollinen.vihollinen_nimi} sai 5 elämäpistettä.`;
}







