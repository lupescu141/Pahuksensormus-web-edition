const kayta_eliksiiri = () => {
  const vahinko_arvo = (Math.floor(Math.random() * 7) + 1) +
      (Math.floor(Math.random() * 7) + 1) + 2;
  efekti_eliksiiri1.play();
  wait(500);
  efekti_eliksiiri2.play();
  pelaaja_olio.pelaaja_hp += vahinko_arvo;
  pelaaja_hp.innerText = pelaaja_olio.pelaaja_hp;
  taisteluloki.innerText += `\nJoit eliksiirin ja sait ${vahinko_arvo} elämäpistettä`;
};

const kayta_vastamyrkky = (pelaaja_statukset) => {
  efekti_eliksiiri1.play();
  wait(500);
  efekti_eliksiiri2.play();
  pelaaja_statukset.myrkytetty = 0;
  taisteluloki.innerText += '\nJoit vastamyrkyn.';
};

const kayta_vesipullo = (pelaaja_statukset) => {
  efekti_eliksiiri1.play();
  wait(500);
  efekti_eliksiiri2.play();
  pelaaja_statukset.palaa = 0;
  taisteluloki.innerText += '\nKastelit itsesi vesipullolla.';
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
};

const kayta_taitojuoma = () => {
  efekti_eliksiiri1.play();
  wait(500);
  efekti_eliksiiri2.play();
  pelaaja_olio.pelaaja_taitopiste = pelaaja_olio.pelaaja_maksimi_taitopiste;
  pelaaja_tp.innerText = pelaaja_olio.pelaaja_taitopiste;
  taisteluloki.innerText += `\nJoit taitojuoman ja sait ${pelaaja_olio.pelaaja_taitopiste} taitopistettä.`;
};

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
