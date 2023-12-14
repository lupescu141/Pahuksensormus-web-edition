// Hakee pelaaja_nimet ja pelaaja_id:et tietokannasta
async function hae_nimet() {
  // Hakee Flask tietokannasta nimet
  const vastaus = await fetch('http://localhost:5000/hae_pelaaja_nimet');
  return await vastaus.json();
}

// Asettaa Pelaajan tiedot pelaaja-status ikkunaan
function aseta_tiedot() {
  document.getElementById(
      'pelaaja-nimi').textContent = pelaaja_olio.pelaaja_nimi;
  document.getElementById('pelaaja-hp').textContent = pelaaja_olio.pelaaja_hp;
  document.getElementById(
      'pelaaja-tp').textContent = pelaaja_olio.pelaaja_taitopiste;
  document.querySelector(
      '.pelaaja-kuva').style.backgroundImage = `url("../static/images/pelaaja-luokat/${pelaaja_olio.pelaaja_luokka}-${pelaaja_olio.sukupuoli}.png")`;
  paikkatausta.src = `../static/images/paikka_numerot/${pelaaja_olio.pelaaja_sijainti}.png`;
  textarea.value = 'Kauan sitten hyvyys ja pahuus taistelivat keskenään. ' +
      'Taistelut jatkuivat pitkään ja ne jättivät jälkeensä usein vain tuhoa. ' +
      'Hyvyttään puolustaneet paladinit kuitenkin keksivät juonen pahan Gorgonin päihittämiseksi. ' +
      'He hyökkäsivät Gorgonin kimppuun suurella voimalla ja saivat hänet heikennettyä. ' +
      'Kun Gorgon oli tarpeeksi heikoilla, paladinit lausuivat kirouksen. ' +
      'Sen avulla paladinit pystyivät vangitsemaan Gorgonin sielun sormukseen. ' +
      '\n\nKauan paladinit varjelivat sormusta ja pitivät sen turvassa, mutta ' +
      'pahuus ei koskaan pysy poissa ikuisesti. Ajan saatossa paladinien rivit ovat vähentyneet ' +
      'ja he ovat hävittäneet sormuksen. Nyt pahuus on alkanut kasvaa ja maailma tarvitsee sankaria, ' +
      'joka löytää ja tuhoaa pahuksen sormuksen! ' +
      '\n\nSinun tarinasi alkaa Uudentoivon-kylästä, jossa olet ikäsi viettänyt. ' +
      'Olet aina haaveillut seikkailusta ulkomaailmassa, mutta kylän rajoista poistuminen on asukkailta kielletty. ' +
      'Vain kylän päällikkö voi antaa erityisluvan poistua kylästä, ' +
      'sillä kylä joutuu usein puolustautumaan Gorgonin kätyreitä vastaan, eikä kylällä ole varaa menettää enempää asukkaita. ' +
      '\n\nUudentoivon-kylä tunnetaankin maailmalla sen vahvoista ja sinnikkäistä sotureistaan. ' +
      'Eräänä päivänä kätyrit hyökkäsivät Uudentoivon-kylään ja he onnistuivat murtamaan kylän puolustuksen. ' +
      'Taistelu oli julma, mutta lopulta kylän taistelijat saivat lyötyä kätyrit. ' +
      'Mellakan jälkeen nousit piilostasi vain huomataksesi vanhempiesi makaavan elottomina maassa. ' +
      'Tälläinen pahuus ei saa nousta valtaan. Vaadit päälliköltä lupaa lähteä etsimään Pahuksen sormusta ja ' +
      'väittelyn jälkeen hän myöntää sinulle luvan kostaa vanhempiesi kohtalo. ' +
      '\n\n-Tehtäväsi on etsiä maailmalta pahuksen sormus ja heittää se tulivuoreen, jotta se tuhoutuu ja maailma vapautuu sen korruptiolta. ' +
      'Ken tietää, mitä kaikkea muuta löydätkään seikkailusi aikana. ' +
      '\n\n-Voit liikkua kartalla klikkaamalla kohteita. Liikuttamalla hiiren kohteen päälle näet kartan yläreunassa matkan keston. ' +
      'Ylä-reunassa näet myös tämän hetken lämpötilan. Liian korkea tai matala lämpötila vaikeuttaa matkustamista ja kasvattaa matkan kestoa ' +
      '\n\n-Mitä nopeammin löydät sormuksen sen parempi, mutta jos matkustat liian pitkälle niin Gorgonin kätyrit saattavat löytää sinut helpommin. ' +
      '\n\n-Tutkimalla kohteita saatat parantaa mahdollisuuksiasi viimeisessä taistelussa Gorgonia vastaan. '
}

// Tämä piilottaa valikon ja avaa hahmoluokka valinnan
function valitse_hahmoluokka() {

if (paavalikko_musiikki.playing() === false){
    paavalikko_musiikki.play();
  }

  // Piilota paavalikko
  paavalikko.style.display = 'none';
  uusipeli_valikko.style.display = 'flex';
  document.querySelector('.pelaajan-nimi-valinta').style.display = 'none';
  document.querySelector('.slideshow-laatikko').style.display = 'flex';
}

// Tämä hoitaa uuden pelaajan luomisen
const hahmoluokka_kuva = document.querySelectorAll('.luokka-kuvat');
hahmoluokka_kuva.forEach(kuva => {
  kuva.addEventListener('click', async function() {
    let hahmoluokka = kuva.value;
    let sukupuoli = kuva.name;
    // Tulostetaan hahmoluokka konsoliin
    console.log(hahmoluokka);

    document.querySelector('.slideshow-laatikko').style.display = 'none';
    document.querySelector('.slideshow-pallot').style.display = 'none';
    document.querySelector('.pelaajan-nimi-valinta').style.display = 'flex';

    // Haetaan nimet ja varmistetaan että ei tule saman nimisiä
    const varatut_nimet = await hae_nimet();
    const varatut_nimet_lista = [];
    for (let varattu_nimi of varatut_nimet) {
      let varattu_nimi_caps = varattu_nimi.pelaaja_nimi.toUpperCase();
      varatut_nimet_lista.push(varattu_nimi_caps);
    }
    console.log('varatut nimet: ' + varatut_nimet_lista);

    // Etsi lomake ja lisää sille submit-kuuntelija
    const uusi_peli_form = document.getElementById('uusi-peli-form');
    uusi_peli_form.addEventListener('submit', async function(event) {
      event.preventDefault(); // Estä lomakkeen oletustoiminta

      // Tässä vaiheessa voit käsitellä pelaajan nimen ja aloittaa pelin
      const pelaaja_nimi_elementti = document.getElementById('pelaajan-nimi');
      const pelaaja_nimi = pelaaja_nimi_elementti.value;

      if (varatut_nimet_lista.includes(pelaaja_nimi.toUpperCase())) {
        console.log('nimi varattu');
        // Tyhjennä pelaajan nimi
        pelaaja_nimi_elementti.value = '';
        pelaaja_nimi_elementti.placeholder = `${pelaaja_nimi} on varattu`;
      } else {
        const vastaus = await fetch(
            `http://localhost:5000//luo_uusi_pelaaja/${pelaaja_nimi}/${hahmoluokka}/${sukupuoli}`);
        pelaaja_olio = await vastaus.json();
        // console.log(pelaaja_tiedot);

        aseta_tiedot();
        console.log(pelaaja_olio);

        // Hakee pelaajan inventaarion ja palauttaa pelaaja_inventaario olion
        await hae_inventaario();
        await hae_luokan_taidot();

        // Tyhjennä pelaajan nimi
        pelaaja_nimi_elementti.value = '';

        uusipeli_valikko.style.display = 'none';
        ennatukset.style.display = 'none';

        vasen_puoli.style.display = 'flex';
        oikea_puoli.style.display = 'flex';
        kartta.style.display = 'flex';

        await matkustaminen();
        await musiikki_sijainti()

      }
    });

  });
});

// Tämä hoitaa ladatun pelin aloittamisen
// Tämä on vanha funktio. UUSI ON ALEMPANA
async function avaa_lataapeli_valikko() {

  if (paavalikko_musiikki.playing() === false){
    paavalikko_musiikki.play();
  }

  // Piilota paavalikko
  paavalikko.style.display = 'none';

  // Tuo lataapeli valikko esiin
  lataapeli_valikko.style.display = 'flex';

  // Hakee Flask tietokannasta tallennukset
  data = await hae_nimet();
  console.log(data);

  // Esitetään tallenukset nappeina
  for (const pelaaja of data) {
    const pelaaja_nappi = document.createElement('button');
    pelaaja_nappi.textContent = pelaaja.pelaaja_nimi;
    pelaaja_nappi.classList.add('nappi', 'tallennus');
    lataapeli_valikko.appendChild(pelaaja_nappi);

    // Kuuntelee tallennus napin painallusta
    pelaaja_nappi.addEventListener('click', async function() {
      console.log('Pelaaja nappia painettu:', pelaaja.pelaaja_nimi,
          pelaaja.peli_id);

      const vastaus = await fetch(
          `http://localhost:5000//hae_pelaaja_tiedot/${pelaaja.peli_id}`);
      const pelaaja_tiedot = await vastaus.json();
      console.log(pelaaja_tiedot);

      pelaaja_olio = pelaaja_tiedot;
      aseta_tiedot();

      // Hakee pelaajan inventaarion ja palauttaa pelaaja_inventaario olion
      await hae_inventaario();
      await hae_luokan_taidot();

      // Piilottaa alkuvalikon
      lataapeli_valikko.style.display = 'none';

      ennatukset.style.display = 'none';

      vasen_puoli.style.display = 'flex';
      oikea_puoli.style.display = 'flex';
      kartta.style.display = 'flex';

      await matkustaminen();

    });
  }
}

// Tämä hoitaa ladatun pelin aloittamisen
async function hae_tallennus() {

  if (paavalikko_musiikki.playing() === false){
    paavalikko_musiikki.play();
  }

  // Piilota paavalikko
  paavalikko.style.display = 'none';

  // Tuo lataapeli valikko esiin
  lataapeli_valikko.style.display = 'flex';

  // Hakee Flask tietokannasta tallennukset
  data = await hae_nimet();
  console.log(data);

  // Kuuntelee tallennus napin painallusta
  lataapeli_form.addEventListener('submit', async function(event) {
    event.preventDefault();

    const haettu_tallennus_nimi = document.getElementById('tallennus-nimi').value;

    for (let tallennus of data) {
      if (tallennus.pelaaja_nimi.toLowerCase() === haettu_tallennus_nimi.toLowerCase()) {
        const vastaus = await fetch(`http://localhost:5000//hae_pelaaja_tiedot/${tallennus.peli_id}`);
        const pelaaja_tiedot = await vastaus.json();
        console.log(pelaaja_tiedot);

        pelaaja_olio = pelaaja_tiedot;
        aseta_tiedot();

        // Hakee pelaajan inventaarion ja palauttaa pelaaja_inventaario olion
        await hae_inventaario();
        await hae_luokan_taidot();

        // Piilottaa alkuvalikon
        lataapeli_valikko.style.display = 'none';

        ennatukset.style.display = 'none';

        vasen_puoli.style.display = 'flex';
        oikea_puoli.style.display = 'flex';
        kartta.style.display = 'flex';

        await matkustaminen();
        await musiikki_sijainti()
      } else {
        document.getElementById('tallennus-nimi').value = ''
        document.getElementById('tallennus-nimi').placeholder = 'Tallennusta ei löytynyt'
      }
    }
  })
}

// Palaa alkuvalikkoon
function palaa_alkuvalikkoon() {
  // Piilota napit
  lataapeli_valikko.style.display = 'none';
  uusipeli_valikko.style.display = 'none';

  // Käy läpi jokainen tallennusnappi ja poista se
  const tallennus_nappi = document.querySelectorAll('.tallennus');
  tallennus_nappi.forEach(nappi => {
    nappi.parentNode.removeChild(nappi);
  });

  // Näytä päävalikko
  paavalikko.style.display = 'flex';
}
