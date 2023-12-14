const eliksiiri = () => {
    const vahinko_arvo = (Math.floor(Math.random() * 7) + 1) + (Math.floor(Math.random() * 7) + 1) + 2;
    efekti_eliksiiri1.play();
    wait(500);
    efekti_eliksiiri2.play();
    pelaaja_olio.pelaaja_hp += vahinko_arvo;
    pelaaja_hp.innerText = pelaaja_olio.pelaaja_hp;
    taisteluloki.innerText += `Joit eliksiirin ja sait ${vahinko_arvo} elämäpistettä`;
}

const vastamyrkky = (pelaaja_statukset) =>  {
    efekti_eliksiiri1.play();
    wait(500);
    efekti_eliksiiri2.play();
    pelaaja_statukset.myrkytetty = 0;
    taisteluloki.innerText += 'Joit vastamyrkyn';
}

const vesipullo = (pelaaja_statukset) =>  {
    efekti_eliksiiri1.play();
    wait(500);
    efekti_eliksiiri2.play();
    pelaaja_statukset.palaa = 0;
    taisteluloki.innerText += 'Joit vastamyrkyn';
}

const taikasauva = (vihollinen, vihollinen_statukset) =>{
    const vahinko_arvo = (Math.floor(Math.random() * 7) + 1) + (Math.floor(Math.random() * 7) + 1) + 2;
    efekti_tulipallo.play();
    wait(500);
    vihollinen.vihollinen_hp -= vahinko_arvo;
    vihollinen_hp.innerText = vihollinen.vihollinen_hp;
    vihollinen_statukset.tainnutettu += 1;
    taisteluloki.innerText += `Käytit taikasauvaa ja ${vihollinen.vihollinen_nimi} menetti ${vahinko_arvo} elämäpistettä.`
}