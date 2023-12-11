
const tulipallo = (vihollinen) => {

    const vahinko_arvo = (Math.floor(Math.random() * 7) + 1) + (Math.floor(Math.random() * 7) + 1) + 2;
    pelaaja_olio.taitopiste -= 1;
    vihollinen.vihollinen_hp -= vahinko_arvo;
    taisteluloki.value += `\nTulipallo käristi ${vahinko_arvo} elämäpistettä viholliselta.`
}

const palava_nuoli = (vihollinen) => {
    const vahinko_arvo = (Math.floor(Math.random() * 7) + 1) + 2;
    vihollinen.vihollinen_hp -= vahinko_arvo;
    taisteluloki.value += `\nAmmut palavan nuolen.`
    taisteluloki.value += `\nPalavaa nuoli lävistää ja sytyttää vihollisen palamaan 2 vuoroksi.`
}

const siunaus = (pelaaja_statukset) => {

    const parannus_arvo = (Math.floor(Math.random() * 4) + 1) + 2;

  pelaaja_statukset = {
    palaa: 0,
    tainnutettu: 0,
    myrkytetty: 0,
    pelkaa: 0,
  };

    taisteluloki.value += "Rukoilet jumalettarellesi ja hän siunaa sinua.";
    pelaaja_olio.pelaaja_hp += parannus_arvo;
    taisteluloki.value += `Tunnet lämpimän aallon kulkevan lävitsesi. Sait ${parannus_arvo} elämäpistettä.`;
}

const pyha_isku = (vihollinen) => {

    const vahinko_arvo = (Math.floor(Math.random() * 9) + 1) + (Math.floor(Math.random() * 9) + 1) + 2;
    vihollinen.vihollinen_hp -= vahinko_arvo;
    taisteluloki.value += `Siirrät pyhää energiaa vasaraasi ja se alkaa hohtaa kultaista valoa. Rankaiset pahuuden kätyriä voimakkaalla iskulla.`;
    taisteluloki.value += `${vihollinen.vihollinen_nimi} menetti ${vahinko_arvo} elämäpistettä.`;
}