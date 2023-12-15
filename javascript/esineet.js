const kayta_eliksiiri = () => {
  const vahinko_arvo = (Math.floor(Math.random() * 7) + 1) +
      (Math.floor(Math.random() * 7) + 1) + 2;
  efekti_eliksiiri1.play();
  wait(500);
  efekti_eliksiiri2.play();
  pelaaja_olio.pelaaja_hp += vahinko_arvo;
  pelaaja_hp.innerText = pelaaja_olio.pelaaja_hp;
  taisteluloki.innerText += `\nJoit eliksiirin ja sait ${vahinko_arvo} elämäpistettä`;
  poista_esine(pelaaja_inventaario, 1)
};

const kayta_vastamyrkky = (pelaaja_statukset) => {
  efekti_eliksiiri1.play();
  wait(500);
  efekti_eliksiiri2.play();
  pelaaja_statukset.myrkytetty = 0;
  taisteluloki.innerText += '\nJoit vastamyrkyn.';
  poista_esine(pelaaja_inventaario, 4)
};

const kayta_vesipullo = (pelaaja_statukset) => {
  efekti_eliksiiri1.play();
  wait(500);
  efekti_eliksiiri2.play();
  pelaaja_statukset.palaa = 0;
  taisteluloki.innerText += '\nKastelit itsesi vesipullolla.';
  poista_esine(pelaaja_inventaario, 5)
};

const kayta_taikasauva = (vihollinen, vihollinen_statukset) => {
  const vahinko_arvo = (Math.floor(Math.random() * 7) + 1) +
      (Math.floor(Math.random() * 7) + 1) + 2;
  efekti_tulipallo.play();
  wait(500);
  vihollinen.vihollinen_hp -= vahinko_arvo;
  vihollinen_hp.innerText = vihollinen.vihollinen_hp;
  vihollinen_statukset.tainnutettu += 1;
  taisteluloki.innerText += `\nKäytit taikasauvaa ja ${vihollinen.vihollinen_nimi} menetti ${vahinko_arvo} elämäpistettä.`;
  poista_esine(pelaaja_inventaario, 3)
};

const kayta_taitojuoma = () => {
  efekti_eliksiiri1.play();
  wait(500);
  efekti_eliksiiri2.play();
  pelaaja_olio.pelaaja_taitopiste = pelaaja_olio.pelaaja_maksimi_taitopiste;
  pelaaja_tp.innerText = pelaaja_olio.pelaaja_taitopiste;
  taisteluloki.innerText += `\nJoit taitojuoman ja sait ${pelaaja_olio.pelaaja_taitopiste} taitopistettä.`;
  poista_esine(pelaaja_inventaario, 2)
};

function poista_esine(lista, poistettava_id) {
  for (var i = 0; i < lista.length; i++) {
    if (parseInt(lista[i].esineen_id) === poistettava_id) {
      lista.splice(i, 1);
      break; // Poista vain yksi objekti
    }
  }
  return lista;
}

const eliksiiri = {
  'esine_nimi': 'eliksiiri',
  'esineen_id': 1,
};

const taitojuoma = {
  'esine_nimi': 'taitojuoma',
  'esineen_id': 2,
};

const taikasauva = {
  'esine_nimi': 'taikasauva',
  'esineen_id': 3,
};

const vastamyrkky = {
  'esine_nimi': 'vastamyrkky',
  'esineen_id': 4,
};

const vesipullo = {
  'esine_nimi': 'vesipullo',
  'esineen_id': 5,
};
