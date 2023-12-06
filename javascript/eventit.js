// UUDET BOSSIT: VELHO, SYÖJÄTÄR, PEIKKOKUNINGAS, RITARITAISTELU TOURNAMENT
// KOLMIPÄINEN NOITA, VARISTEN HERRA, DEMONI

// Event: uudentoivonKylaEvent
// tavernaNoppapeli
// laksiaisjuhlat
// kylanKummallinenKojukauppias

// Event: ruoholaaksonNiityt
// kukkienHurmio
// varjojenPiilo
// lumotunRiipuksenArvoitus

// Event: velhotorniEvent
// loitsuhuone
// salakaytavienSokkelo
// velhonKaksintaistelu

// Event: varisrameenSalaisuudet
// variksenkielenLoitsut
// varjorituaalit
// taikaesineenLoytaminen

// Event: noitametsa
// noitataloTaistelu
// noitatalonKirjasto
// harhailuNoitametsassa

// Event: sammakkojarvi
// lumoavaSammakkokonsertti
// lumoavaJarvenpeili

// Event: hiisisuonLaakso
// keijukaistenKuningatar
// seuraaTulikarpastenValoa
// suonLumous

// Event: suurentarmonKaupunkiEvent
// turnajaiset
// taikurimarkkinat
// uhkapeliOnnenpelikortit

// Event: peikkoluola
// peikkokuningas
// hamahakkikuningatar
// lohikaarmeenPesa

 const textarea = document.getElementById('loki');

// Peli Eventti: Uudentoivon kylä

function uudentoivonKylaEvent(pelaaja) {
  textarea.value += '\nTervetuloa Uudentoivon kylään, seikkailusi alkupisteeseen. Kylässä on monia tapahtumia ja mahdollisuuksia, jotka voivat muokata matkaasi. Tästä seikkailusi alkaa, onnea matkaan!';

  // Arpoo randomilla pelaajalle eventin 1, 2, 3.
  const event_nro = Math.floor(Math.random() * 3) + 1;

  // Ohjaa valintoihin, jossa pelaaja saa valita mitä tekee.
  switch (event_nro) {
    case 1:
      tavernaNoppapeli(pelaaja);
      break;
    case 2:
      laksiaisjuhlat(pelaaja);
      break;
    case 3:
      kylanKummallinenKojukauppias(pelaaja);
      break;
    default:
      console.log('Virheellinen syöte, valitse uudelleen!');
      break;
  }
}

// Event 1: Tavernan noppapeli-ilta
function tavernaNoppapeli(pelaaja) {
  console.log('1. Tavernan noppapeli-ilta:');
  textarea.value += '\nKylän tavernassa pelaajalla on mahdollisuus osallistua noppapeli-iltaan. Istu alas paikallisten kanssa ja näytä taitosi. Kuka tietää, mitä voit voittaa tai menettää?';

  // Valinnat:
  console.log('Valinnat:');
  const heitto = Math.floor(Math.random() * 21) + 1;

  console.log(`Heitetään noppaa!`);
  textarea.value += `Noppa: ${heitto}`;

  // Voitto noppa 1-10:
  if (heitto >= 1 && heitto <= 10) {
    textarea.value += '\nVoitto! Sait juuri uuden taitopisteen!';
    pelaaja.taitopiste += 1;
  } else {
    // Häviö noppa 11-21:
    textarea.value += '\nHävisit! Menetit juuri kasan eliksiirejä.';
    // Pitää muuttaa inventaarioksi
    pelaaja.eliksiirit -= 2;
  }
}

// Event 2: Läksiäisjuhlat
function laksiaisjuhlat(pelaaja) {
  console.log('2. Läksiäisjuhlat:');
  textarea.value += '\nUudentoivon kylä järjestää sydämelliset läksiäisjuhlat sinulle. Koko kylässä vallitsee iloinen tunnelma. Osallistut juhliin ja liityt kyläläisten joukkoon juhlan huumassa. Ole kuitenkin varovainen, sillä liiallinen juhlinta saattaa tuoda mukanaan ikäviä seurauksia...';

  // Valinnat:
  console.log('Valinnat:');
  const valinta = prompt('1. Hillitsen itseni.\n2. Täysillä mukaan!');

  // Valinta 1:
  if (valinta === '1') {
    textarea.value += '\nValinta 1: Päätät osallistua juhliin hillitysti ja ottaa osaa kylän iloiseen tunnelmaan, ansaitset tällä paikallisten suosion. Kyläläiset muistavat ystävällisyytesi ikuisesti, ja saat heiltä mukaasi arvokkaita esineitä.';
    // MUOKATAAN TÄTÄ MITÄ PELAAJA SAA
    pelaaja.esine();
  } else if (valinta === '2') {
    // Valinta 2:
    textarea.value += '\nValinta 2: Annat juhlavan tunnelman viedä mukanaan ja juot liikaa viiniä, menetät otteesi todellisuudesta. Seurauksena kyläläiset menettävät kunnioituksen sinuun. Menetit 5 HP voipuessa krapulasta ja maineesi on mennyt!';
    pelaaja.hp -= 5;
  } else {
    console.log('Virheellinen syöte, valitse uudelleen!');
  }
}

// Event 3: Kylän Kummallinen Kojukauppias
function kylanKummallinenKojukauppias() {
  textarea.value += '\nKylästä löytyy salaperäinen kojukauppias, joka myy erikoisia esineitä. Voit käydä tutustumassa hänen tarjontaansa ja tehdä kauppoja. Kuka tietää, mitä hänellä on varastossaan?';

  const valinta = prompt(
      'Valinta 1: Kojukauppias näyttää luotettavalta, katsotaan miten käy!\nValinta 2: Epäilyttävän oloinen ukkeli mutta pistetään rahat likoon!');

  switch (valinta) {
    case '1':
      textarea.value += '\nHyvä valinta! Saat mukaasi harvinaisen esineen, sait matkaasi mukaan uuden taikavoiman!';
      // LISÄTÄÄN TÄHÄN JOTAIN MITÄ PELAAJA SAA
      pelaaja.esine();
      break;
    case '2':
      textarea.value += '\nVoi ei! Valintasi ei ollut fiksu, kylän kummajainen kirosi sinut, menetit nimittäin juuri yhden taikapotionin!';
      // LISÄTÄÄN TÄHÄN JOTAIN MITÄ PELAAJA MENETTÄÄ
      pelaaja.esine();
      break;
    default:
      console.log('Virheellinen syöte, valitse uudelleen!');
      break;
  }
}

// Peli Eventti: Ruoholaakson niityt
function ruoholaaksonNiityt(pelaaja) {
  textarea.value += '\nMatkaat Ruoholaaksoon joka on täynnä niittyjä ja salaperäisiä hohtavia kukkia. Laakson sydämessä asuu tappavan kaunis syöjätär, jonka lumoava voima vetää puoleensa uteliaita seikkailijoita. Seuraat kukkien huumaavaa tuoksua..';

  // Arpoo randomilla pelaajalle eventin 1, 2, 3.
  const tapahtuma = Math.floor(Math.random() * 3) + 1;

  // Ohjaa valintoihin, jossa pelaaja saa valita mitä tekee.
  switch (tapahtuma) {
    case 1:
      kukkienHurmio(pelaaja);
      break;
    case 2:
      varjojenPiilo(pelaaja);
      break;
    case 3:
      lumotunRiipuksenArvoitus(pelaaja);
      break;
    default:
      console.log('Virheellinen syöte, valitse uudelleen!');
      break;
  }
}

// Event 1: Kukkien Hurmio
function kukkienHurmio(pelaaja) {
  console.log('1. Kukkien Hurmio:');
  textarea.value += '\nHaistat lumoavien kukkien tuoksun, tuoksu kutsuu sinua kohti piilotettua laaksoa. Keskellä laaksoa avautuu kukkien ympäröimä paikka, jossa voit kokea niiden lumoavan voiman..';

  // Valinnat:
  console.log('Valinnat:');
  const valinta1 = prompt(
      'Valinta 1: Astut varoen kukkien keskelle\nValinta 2: Poimit kukkia ympärillesi huolettomasti');

  // Valinta 1:
  if (valinta1 === '1') {
    textarea.value += '\nAstut varovasti kukkien keskelle ja tunnet niiden lumoavan voiman ympärilläsi. Kukat suojelevat sinua vihollisilta lyhyen aikaa. Saat matkaasi mukaan 10 eliksiiriä.';
    //ELIKSIIREJÄ VAI MUUTA? MUOKATAAN
    pelaaja.eliksiirit += 10;
  } else if (valinta1 === '2') {
    // Valinta 2:
    textarea.value += '\nPoimimalla kukkia huolettomasti, kukkien henki herää ja ne kutsuvat tappavan kauniin syöjättären luokseen. Joudut taisteluun syöjättären kanssa!';
    // OHJAA TAISTELUUN SYÖJÄTTÄREN KANSSA! PÄIVITETÄÄN FUNKTIO OIKEIN!
    avaa_taistelu_ikkuna();
  } else {
    console.log('Virheellinen syöte, valitse uudelleen!');
  }
}

// Event 2: Varjojen piilo
function varjojenPiilo(pelaaja) {
  console.log('2. Varjojen piilo:');
  textarea.value += '\nKohtaat syöjättärien salaperäisen piilon, joka näyttää olevan täynnä vaarallisia petoja ja pimeää voimaa. Liitytkö vahingossa varjojen tanssiin vai piilottelet...';

  // Valinnat:
  console.log('Valinnat:');
  const valinta2 = prompt(
      'Valinta 1: Liityt varjojen tanssiin\nValinta 2: Pysyt varjojen ulottumattomissa');

  // Valinta 1:
  if (valinta2 === '1') {
    textarea.value += '\nLiityt syöjättärien kanssa varjojen tanssiin ja saat osaksi niiden voimaa. Varjot suojaavat sinua pimeyden voimilta ja tarjoavat sinulle erityistaitoja varjojen maailmassa liikkumiseen. Saat 20 HP.';
    pelaaja.hp += 20;
  } else if (valinta2 === '2') {
    // Valinta 2:
    textarea.value += '\nPysyt varjojen ulottumattomissa, mutta syöjättäret huomaavat sinut! Varjot luovat illuusioita, jotka hämmentävät sinua ja aiheuttavat tilapäistä sokeutta. Vajoat syvään uneen ja menetät yhden päivän matkastasi.';
    //VOIKO MENETTÄÄ PÄIVÄN MATKASTA? MUOKATAAN
    pelaaja.paivat -= 1;
  } else {
    console.log('Virheellinen syöte, valitse uudelleen!');
  }
}

// Event 3: Lumotun Riipuksen Arvoitus
function lumotunRiipuksenArvoitus(pelaaja) {
  console.log('3. Lumotun Riipuksen Arvoitus:');
  textarea.value += '\nLöydät laakson keskeltä demonisen riipuksen, joka kiinnittää huomiosi voimakkaaseen energiaan. Riipus näyttää sisältävän piilotetun viestin, voit joko yrittää selvittää sen tai ohittaa sen.';

  // Valinnat:
  console.log('Valinnat:');
  const valinta3 = prompt(
      'Valinta 1: Yritän ymmärtää riipuksen viestin\nValinta 2: Ohitan riipuksen ja jatkan matkaani');

  // Valinta 1:
  if (valinta3 === '1') {
    textarea.value += '\nValinta 1: Riipus paljastaa sinulle tulevaisuuden näkymiä ja vihjeitä seuraavista vaiheista. Saat etulyöntiaseman tulevissa kohtaamisissa. Saat lisää taitoja matkaasi!';
    // LISÄTÄÄN TÄHÄN JOTAIN MITÄ PELAAJA SAA
    pelaaja.taitopiste();
  } else if (valinta3 === '2') {
    // Valinta 2:
    textarea.value += '\nValinta 2: Ohitat riipuksen, mutta sen voima koskettaa sinua. Joudut hetkellisesti ajan vääristymisen uhriksi, menettäen näkemyksen ajasta ja paikasta. Syöjätär ui mielesi sopukoihin ja hypnotisoi sinut lumouksiinsa, menetät 10 HP.';
    pelaaja.hp -= 10;
  } else {
    console.log('Virheellinen syöte, valitse uudelleen!');
  }
}

// Peli Eventti: Velhotorni
function velhotorniEvent(pelaaja) {
  textarea.value += '\nAstuttuasi sisälle Velhotorniin, huomaat sen olevan täynnä salaisuuksia ja vaaroja, siellä asustaa hullunkurinen velho. Torni on täynnä salakäytäviä ja ansoja. Eksytkö käytävien uumeniin, vai kohtaatko mahdollisesti velhon. Onnea matkaan!';

  // Arpoo randomilla pelaajalle eventin 1, 2, 3.
  const event_nro = Math.floor(Math.random() * 3) + 1;

  // Ohjaa valintoihin, jossa pelaaja saa valita mitä tekee.
  switch (event_nro) {
    case 1:
      loitsuhuone(pelaaja);
      break;
    case 2:
      salakaytavienSokkelo(pelaaja);
      break;
    case 3:
      velhonKaksintaistelu(pelaaja);
      break;
    default:
      console.log('Virheellinen syöte, valitse uudelleen!');
      break;
  }
}

// Event 1: Loitsuhuone
function loitsuhuone(pelaaja) {
  console.log('1. Loitsuhuone:');
  textarea.value += '\nAstuttuasi tornin eteishalliin, huomaat huoneen joka on täynnä korkeita hyllyjä, joissa on pölyisiä loitsukirjoja ja taikavarusteita. Keskellä huonetta leijailee vanha aave, joka vaikuttaa olevan tornin menneiden aikojen suojelija. Se katsoo sinua kylmän sinisillä silmillään ja lausuu kumealla äänellään: "Astu eteenpäin vain jos uskallat"';

  // Valinnat:
  console.log('Valinnat:');
  const valinta1 = prompt(
      'Valinta 1. Astut rohkeana sisään\nValinta 2. Lähdet karkuun');

  // Valinta 1:
  if (valinta1 === '1') {
    textarea.value += '\nValinta 1: Aave nyökkää hyväksyvästi. "Olet osoittanut olevasi arvollinen. Saat tämän loitsukirjan ja sen voiman omaksesi." Saat matkaasi loitsukirjan, joka lisää taitojasi erilaisissa taikuuden muodoissa.';
    // LISÄTÄÄN TÄHÄN JOTAIN MITÄ PELAAJA SAA
    pelaaja.taitopiste();
  } else if (valinta1 === '2') {
    // Valinta 2:
    textarea.value += '\nValinta 2: Aave raivostuu yrityksestäsi paeta ja päättää opettaa sinulle läksyn. Sinut peittää hetkellinen kylmyys, ja tunnet voimakkaan magian värähtelyn ympärilläsi. Saat hetkellisen pienen rangaistuksen, menettäen osan energiaasi ja taidoistasi.';
    pelaaja.hp -= 5;
    pelaaja.taitopiste -= 2;
  } else {
    console.log('Virheellinen syöte, valitse uudelleen!');
  }
}

// Event 2: Salakäytävien Sokkelo
function salakaytavienSokkelo(pelaaja) {
  console.log('2. Salakäytävien Sokkelo:');
  textarea.value += '\nKun olet kiivennyt tornin portaita ylemmäs, huomaat labyrinttimaisen salakäytävien sokkelon. Jokainen käytävä näyttää samanlaiselta, mutta vain yksi johtaa ylös. Kuinka päätät navigoida sokkelossa?';

  // Valinnat:
  console.log('Valinnat:');
  const valinta2 = prompt(
      '1. Kuuntele intuitiotasi ja käänny oikealle\n2. Seuraat outoa kutinaa ja jatka suoraan eteenpäin');

  // Valinta 1:
  if (valinta2 === '1') {
    textarea.value += '\nValinta 1: Intuition avulla valitset oikean tien sokkelossa. Pääset helposti ylös tornin huipulle. Saat matkaasi +10 taitoa salakäytävien navigointiin.';
    pelaaja.taitopiste += 10;
  } else if (valinta2 === '2') {
    // Valinta 2:
    textarea.value += '\nValinta 2: Vaistosi johdattavat sinut sokkeloiseen luolastoon ja eksyt. Menetät päivän matkastasi!';
    // MUOKATAAN, VOIKO MENETTÄÄ PÄIVÄN MATKASTA?
    pelaaja.paivat -= 1;
  } else {
    console.log('Virheellinen syöte, valitse uudelleen!');
  }
}

// Event 3: Velhon Kaksintaistelu
function velhonKaksintaistelu(pelaaja) {
  console.log('3. Velhon Kaksintaistelu:');
  textarea.value += '\nSaavut tornin huipulle, Velhon hullunkurinen hahmo seisoo edessäsi, hänen katseensa paljastaa vuosisatojen viisauden ja taikuuden. Hän kohottaa kättään ja haastaa sinut kaksintaisteluun voimien mittelöimiseksi, onnea matkaan!';

  // Valinnat:
  console.log('Valinnat:');
  const valinta3 = prompt(
      'Valinta 1: Kohtaat velhon uhkarohkeana!\nValinta 2: Pakene!');

  // Valinta 1:
  if (valinta3 === '1') {
    textarea.value += '\nValinta 1: Taistelu on intensiivinen, kun aseet ja taikuus kohtaavat. Velho osoittautuu taitavaksi taistelijaksi, mutta sinä käytät taitojasi voimakkaasti hyväksesi.';
    // OHJAA TAISTELUUN VELHON KANSSA! PÄIVITETÄÄN FUNKTIO OIKEIN!
    avaa_taistelu_ikkuna();
  } else if (valinta3 === '2') {
    // Valinta 2:
    textarea.value += '\nValinta 2: Velho suuttuu pakoyrityksestäsi ja lähettää sinua kohti voimakkaan taian. Onnistut välttämään suurimman osan hyökkäyksistä ja pääset karkuun. Tornin pitkät ja kapeat portaat saavat sinut kaatumaan ja putoat tornin syvyyksiin. Häpeissäsi jatkat matkaa… Menetät 10HP.';
    pelaaja.hp -= 10;
  } else {
    console.log('Virheellinen syöte, valitse uudelleen!');
  }
}

// Peli Eventti: Varisrämeen Salaisuudet
function varisrameenSalaisuudet(pelaaja) {
  textarea.value += '\nAstuttuasi maagiseen Varisrämeeseen, ympärilläsi väreilee pimeä magia ja punasilmäiset pelottavat varikset lentelevät ympärillä salaperäisinä. Edessäsi avautuu kolme polkua, joista jokainen johtaa kohti erilaista mysteeriä. Onnea matkaan!';

  // Arpoo randomilla pelaajalle eventin 1, 2, 3.
  const tapahtuma = Math.floor(Math.random() * 3) + 1;

  // Ohjaa valintoihin, jossa pelaaja saa valita mitä tekee.
  switch (tapahtuma) {
    case 1:
      variksenkielenLoitsut(pelaaja);
      break;
    case 2:
      varjorituaalit(pelaaja);
      break;
    case 3:
      taikaesineenLoytaminen(pelaaja);
      break;
    default:
      console.log('Virheellinen syöte, valitse uudelleen!');
      break;
  }
}

// Event 1: Variksenkielen Loitsut
function variksenkielenLoitsut(pelaaja) {
  console.log('1. Variksenkielen Loitsut:');
  textarea.value += '\nLähdet seuraamaan varisten ääniä ja löydät piilossa olevan varisalttarin. Varikset alkavat laulamaan ikivanhoja loitsuja, Variksenkieltä. Pystytkö ymmärtämään loitsut ja saamaan varisten viisauden itsellesi?';

  // Valinnat:
  console.log('Valinnat:');
  const valinta1 = prompt(
      'Valinta 1: Olet rohkea ja annat palaa\nValinta 2: Olet uhkarohkea ja viis veisaat varoituksista');

  // Valinta 1:
  if (valinta1 === '1') {
    textarea.value += '\nValinta 1: Onnistut ymmärtämään loitsut, mikä antaa sinulle taitoja tulevaisuuden ennustamiseen, saat yhden päivän matkastasi takaisin.';
    pelaaja.paivat += 1;
  } else if (valinta1 === '2') {
    // Valinta 2:
    textarea.value += '\nValinta 2: Väärin meni! Varikset lentelevät ympärilläsi ja nokkivat naamasi verille, vaivut syvään uneen, menetät yhden päivän matkastasi!';
    pelaaja.paivat -= 1;
  } else {
    console.log('Virheellinen syöte, valitse uudelleen!');
  }
}

// Event 2: Varjorituaalit
function varjorituaalit(pelaaja) {
  console.log('2. Varjorituaalit:');
  textarea.value += '\nKohtaat rämeellä salaperäisen varjoryhmän, joka suorittaa rituaaleja puiden ympärillä. Voit liittyä heidän seuraansa tai tarkkailla sivusta. Pystytkö ymmärtämään varjorituaalien tarkoituksen ja vaikutukset?';

  // Valinnat:
  console.log('Valinnat:');
  const valinta2 = prompt(
      'Valinta 1: Varjorituaalien Siunaus\nValinta 2: Varjojen Kosto');

  // Valinta 1:
  if (valinta2 === '1') {
    textarea.value += '\nValinta 1: Liityt varjoryhmän rituaaliin, ryhmä yllättyy voimakkaista taidoistasi ja saat heiltä täyden HP:n voiman.';
    //KORJATAAN MITEN MAX HP?
    pelaaja.hp = pelaaja.maxHP;
  } else if (valinta2 === '2') {
    // Valinta 2:
    textarea.value += '\nValinta 2: Häiritset ryhmän rituaalia etkä ymmärrä sen merkitystä, varjojen voima kääntyy sinua vastaan aiheuttaen pimeitä näkyjä ja painajaisia. Menetät 10 HP.';
    pelaaja.hp -= 10;
  } else {
    console.log('Virheellinen syöte, valitse uudelleen!');
  }
}

// Event 3: Taikaesineen Löytäminen
function taikaesineenLoytaminen(pelaaja) {
  console.log('3. Taikaesineen Löytäminen:');
  textarea.value += '\nTutkiessasi rämettä, huomaat heikosti loistavan valon. Lähemmäksi siirtyessäsi löydät piilotetun kolon, jossa sijaitsee vanha magialla täytetty riipus. Mihin tiesi vie...';

  // Valinnat:
  console.log('Valinnat:');
  const valinta3 = prompt(
      'Valinta 1: Olen rohkea, kurotan käden koloon\nValinta 2: Olen uhkarohkea ja laitan käden koloon!');

  // Valinta 1:
  if (valinta3 === '1') {
    textarea.value += '\nValinta 1: Onnistut kurottamaan käden syvälle koloon ja saat magialla täytetyn riipuksen, joka antaa sinulle suojaa pimeitä voimia vastaan. Riipuksen voima taikoi sinulle kasan eliksiirejä!';
    //MUITA TAIKAESINEITÄ? MUOKATAAN
    pelaaja.eliksiirit += 10;
  } else if (valinta3 === '2') {
    // Valinta 2:
    textarea.value += '\nValinta 2: Et kunnioittanut taikaesinettä ja yritit pakottaa sen voimat ulos, herätit varisvihan, ja joudut taisteluun varisten herran kanssa!';
    // OHJAA TAISTELUUN VARISTEN HERRAN KANSSA! PÄIVITETÄÄN FUNKTIO OIKEIN!
    avaa_taistelu_ikkuna();
  } else {
    console.log('Virheellinen syöte, valitse uudelleen!');
  }
}

// Peli Eventti: Noitametsä
function noitametsa(pelaaja) {
  textarea.value += '\nEksyttyäsi polulta löydät itsesi noitametsästä, metsän uumenissa on kammottava noitatalo. Selviätkö täysijärkisenä metsästä, vai löydätkö itsesi noitatalosta keskeltä vaarallista taistelua karmivan kolmipäisen noidan kanssa. Onnea matkaan!';

  // Arpoo randomilla pelaajalle eventin 1, 2, 3.
  const tapahtuma = Math.floor(Math.random() * 3) + 1;

  // Ohjaa valintoihin, jossa pelaaja saa valita mitä tekee.
  switch (tapahtuma) {
    case 1:
      noitataloTaistelu(pelaaja);
      break;
    case 2:
      noitatalonKirjasto(pelaaja);
      break;
    case 3:
      harhailuNoitametsassa(pelaaja);
      break;
    default:
      console.log('Virheellinen syöte, valitse uudelleen!');
      break;
  }
}

// Event 1: Noitatalossa löyhkää!
function noitataloTaistelu(pelaaja) {
  console.log('1. Mikä täällä haisee...');
  textarea.value += '\nMenet rohkeana noitatalon sisälle, talo näyttää vaaralliselta joten päätät laittaa näkymättömyysviitan päälle. Hiivit hiirenhiljaa keittiöön, jossa leijailee kummallisen pistävä haju. Siellä huomaat padan, jossa porisee karmea liemi täynnä ruumiita! Tönäiset järkytyksestä vahingossa taikapataa, jäitkö kiinni vai pääsetkö jatkamaan matkaa?';

  // Valinnat:
  console.log('Valinnat:');
  const valinta1 = prompt(
      'Valinta 1: Pidät henkesi voimalla taikaviitan reunasta kiinni ja toivot ettet paljastunut!\nValinta 2: Tuskanhiki valuu selkää pitkin, apua?');

  // Valinta 1:
  if (valinta1 === '1') {
    textarea.value += '\nValinta 1: Hiippailet keittiössä näkymättömyysviitan kanssa ilman kiinnijäämistä, löydät salaisen komeron jossa säilytetään arvokkaita taika-aineita. Löydät taikapotioneita! Mahtavaa!';
    // MITÄ PELAAJA SAA, MUOKATAAN
    pelaaja.potion += 10;
  } else if (valinta1 === '2') {
    // Valinta 2:
    textarea.value += '\nValinta 2: Jäit kiinni ja kolmipäinen noita huomaa sinut. Noita haastaa sinut taisteluun!';
    // OHJAA TAISTELUUN NOIDAN KANSSA, MUOKKAA FUNKTIO
    avaa_taistelu_ikkuna();
  } else {
    console.log('Virheellinen syöte, valitse uudelleen!');
  }
}

// Event 2: Noitatalon Kielletty Kirjasto
function noitatalonKirjasto(pelaaja) {
  console.log('2. Noitatalon Kielletty Kirjasto');
  textarea.value += '\nHiivit noitatalossa pimeään kirjastoon, joka on täynnä mysteerisiä kirjoja hämähäkin seittien peitossa. Voit löytää ikivanhoja loitsuja tai piilotettuja käytäviä, mutta ole varovainen, sillä noita voi ilmestyä odottamatta.';

  // Valinnat:
  console.log('Valinnat:');
  const valinta2 = prompt(
      'Valinta 1: Narahtiko lattialauta alla?\nValinta 2: Hämähäkin seitit häiritsevät!');

  // Valinta 1:
  if (valinta2 === '1') {
    textarea.value += '\nValinta 1: Onnistut löytämään kirjaston käytäviltä salaisen loitsukirjan, taiot loitsulla hetkellisen voiman ja saat 5 kpl eliksiirejä.';
    // ELIKSIIRIT VAI JOTAIN MUUTA, MUOKATAAN
    pelaaja.eliksiirit += 10;
  } else if (valinta2 === '2') {
    // Valinta 2:
    textarea.value += '\nValinta 2: Häiritset liikaa hämähäkin seittiverhoa, kolmipäinen noita ilmaantuu, hän haastaa sinut taisteluun!';
    // OHJAA TAISTELUUN NOIDAN KANSSA, MUOKKAA FUNKTIO!
    avaa_taistelu_ikkuna();
  } else {
    console.log('Virheellinen syöte, valitse uudelleen!');
  }
}

// Event 3: Harhailu Noitametsässä
function harhailuNoitametsassa(pelaaja) {
  console.log('3. Harhailu Noitametsässä:');
  textarea.value += '\nSuuntaat metsän syvyyksiin, jossa vaimeat kuiskaukset ja leijailevat varjot luovat kiehtovan, mutta samalla karmaisevan tunnelman. Uppoatko metsän syvyyksiin vai löydätkö tiesi ulos?';

  // Valinnat:
  console.log('Valinnat:');
  const valinta3 = prompt(
      'Valinta 1: Lähdet oikealle\nValinta 2: Suuntaat vasemmalle');

  // Valinta 1:
  if (valinta3 === '1') {
    textarea.value += '\nValinta 1: Harhailet noitametsän läpi ja löydät vanhan maagisen lähteen. Tämä lähde antaa sinulle erityisen taidon, joka auttaa tulevissa koitoksissa. Löydät tiesi ulos metsästä ja sait taskusi täyteen eliksiirejä!';
    // SAAKO ELIKSIIREJÄ VAI MUUTA? PÄIVITETÄÄN MUOKATAAN
    pelaaja.eliksiirit += 10;
  } else if (valinta3 === '2') {
    // Valinta 2:
    textarea.value += '\nValinta 2: Voi ei, suuntavaistosi meni harhaan! Eksyit metsään ja sekoat sen mysteereihin, ajantaju katoaa harhaillessasi puiden keskellä. Vajoat synkkyyteen ja menetät päivän pelissä!';
    // PELAAJAN SEURAAMUKSET EKSYYMISESTÄ, VOIKO PÄIVIÄ OTTAA POIS?
    pelaaja.paivat -= 1;
  } else {
    console.log('Virheellinen syöte, valitse uudelleen!');
  }
}

// Peli Eventti: Sammakkojärvi

function sammakkojarvi(pelaaja) {
  textarea.value += '\nTaianomainen sammakkojärvi herättää uteliaisuuden ja seikkailunhalun. Sammakkojärven rannat täyttyvät satojen sammakoiden kurnutuksesta.';

  // Arpoo randomilla pelaajalle eventin 1, 2, 3.
  const tapahtuma = Math.floor(Math.random() * 3) + 1;

  // Ohjaa valintoihin, jossa pelaaja saa valita mitä tekee.
  switch (tapahtuma) {
    case 1:
      lumoavaSammakkokonsertti(pelaaja);
      break;
    case 2:
      lumoavaJarvenpeili(pelaaja);
      break;
    default:
      console.log('Päätät jatkaa matkaa sammakkojärveltä.');
      break;
  }
}

// Event 1: Lumoava Sammakkokonsertti
function lumoavaSammakkokonsertti(pelaaja) {
  console.log('1. Lumoava Sammakkokonsertti:');
  textarea.value += '\nKun saavut sammakkojärvelle, huomaat, että rannalla istuu joukko sammakoita. Yhtäkkiä ne alkavat laulaa kauniisti yhteen, muodostaen lumoavan konsertin.';

  // Valinnat:
  console.log('Valinnat:');
  const valinta1 = prompt(
      'Valinta 1: Liity sammakoiden seuraan\nValinta 2: Jatka matkaa');

  // Valinta 1:
  if (valinta1 === '1') {
    textarea.value += '\nValinta 1: Laulu on niin kaunis, että voit tuntea sen vaikutuksen ympärilläsi. Taikavoimat ympäröivät sinut ja saat täyden HP:n.';
    // KORJAA FUNKTIO OIKEIN, MITEN MAXHP?
    pelaaja.pelaaja_hp = pelaaja.pelaaja_maksimi_hp;
  } else if (valinta1 === '2') {
    // Valinta 2:
    textarea.value += '\nValinta 2: Päätät jatkaa matkaa, sammakot loukkaantuvat ja heittävät päällesi vettä. Viittasi on läpimärkä, ja jäädyt kylmästä ilmasta. Menetät 10 HP.';
    pelaaja.pelaaja_hp -= 10;
  } else {
    console.log('Virheellinen syöte, valitse uudelleen!');
  }
}

// Event 2: Lumoava Järvenpeili
function lumoavaJarvenpeili(pelaaja) {
  console.log('2. Lumoava Järvenpeili:');
  textarea.value += '\nNäet järven pinnalla heijastuksen, joka ei näytä perinteiseltä veden heijastukselta. Huomaat, että heijastuksesta ilmestyy jotain. Yhtäkkiä järvestä pompsahtaa ruttuinen sammakko joka ehdottaa sinulle suudelmaa!';

  // Valinnat:
  console.log('Valinnat:');
  const valinta2 = prompt('Valinta 1: Suostut suudelmaan\nValinta 2: Karkuun!');

  // Valinta 1:
  if (valinta2 === '1') {
    textarea.value += '\nValinta 1: Suutelet vastenmielistä sammakkoa, ja hän muuttuu kauniiksi prinssiksi! Hän kiittää sinua pelastuksesta ja antaa sinulle lisää taikavoimia.';
    // MITÄ SAA PRINSSILTÄ
  } else if (valinta2 === '2') {
    // Valinta 2:
    textarea.value += '\nValinta 2: Sammakko loukkaantuu ja heittää sinua kivellä päähän. Menetät 10 HP.';
    pelaaja.hp -= 10;
  } else {
    console.log('Virheellinen syöte, valitse uudelleen!');
  }
}

// Peli Eventti: Hiisisuon Laakso

function hiisisuonLaakso(pelaaja) {
  textarea.value += '\nHiisisuon laakso on täynnä tulikärpästen tanssia ja kukkien hehkua. Kaunis keijukaiskuningatar liitelee suoliljojen yllä. Astutko lähemmäksi ihastumaan, seikkailemaan vai uppoamaan suon syvyyksiin? Onnea matkaan!';

  // Arpoo randomilla pelaajalle eventin 1, 2, 3.
  const tapahtuma = Math.floor(Math.random() * 3) + 1;

  // Ohjaa valintoihin, jossa pelaaja saa valita mitä tekee.
  switch (tapahtuma) {
    case 1:
      keijukaistenKuningatar(pelaaja);
      break;
    case 2:
      seuraaTulikarpastenValoa(pelaaja);
      break;
    default:
      suonLumous(pelaaja);
      break;
  }
}

// Event 1: Keijukaisten kuningatar
function keijukaistenKuningatar(pelaaja) {
  console.log('1. Keijukaisten kuningatar:');
  textarea.value += '\nAstelet lähemmäksi hiisisuon keijukaiskuningatarta, jonka valo saa koko laakson kimaltelemaan.';

  // Valinnat:
  console.log('Valinnat:');
  const valinta1 = prompt(
      'Valinta 1: Olet täysin lumoutunut, otat yhteyden keijukaiseen.\nValinta 2: Pistät kaiken likoon rohkeasti');

  // Valinta 1:
  if (valinta1 === '1') {
    textarea.value += '\nValinta 1: Ilmaisit ihailusi kunnioittavasti ja rakkaudella. Keijukainen avaa sydämensä sinulle.';
    textarea.value += '\nKoette lumoavia hetkiä suohiisien valossa. Saat keijukaiselta loistavan esineen matkaasi.';
    // MITÄ PELAAJA SAA ISOTISSISELTÄ KUNINGATARELTA??
    pelaaja.esine();
  } else if (valinta1 === '2') {
    // Valinta 2:
    textarea.value += '\nValinta 2: Ilmaisit tunteesi liian rohkeasti, kuningatar säikähtää ja lentää pois.';
    textarea.value += '\nJäät katsomaan kaunista valoa, sydämesi täyttää suru ja menetit osan voimistasi, itku täyttää silmäkulmasi, matkan on jatkuttava....';
    pelaaja.hp -= 10;
  } else {
    console.log('Virheellinen syöte, valitse uudelleen!');
  }
}

// Event 2: Seuraa Tulikärpästen Valoa
function seuraaTulikarpastenValoa(pelaaja) {
  console.log('2. Seuraa Tulikärpästen Valoa:');
  textarea.value += '\nPäätät seurata tulikärpästen valoa, jotka tanssivat ilmassa luoden maagista tunnelmaa.';

  // Valinnat:
  console.log('Valinnat:');
  const valinta2 = prompt(
      'Valinta 1: Seuraat tulikärpäsiä.\nValinta 2: Tulikärpäset johdattelevat sinut eteenpäin');

  // Valinta 1:
  if (valinta2 === '1') {
    textarea.value += '\nValinta 1: Onnistuit seuraamaan tulikärpäsiä, ne opastavat sinut piilotetulle aarteelle suohiisien keskellä. Löydät lumoavia esineitä ja voimakasta taikaa. Sait 10 eliksiiriä!';
    // ELIKSIIRI VAI JOTAIN MUUTA, MUOKKAA
    pelaaja.eliksiiri();
  } else if (valinta2 === '2') {
    // Valinta 2:
    textarea.value += '\nValinta 2: Tulikärpäset johdattavat sinut suohiisin salaiseen paikkaan, tämä oli ansa! Tulikärpäset hyökkäävät kimppuusi ja menetät 10 HP.';
    pelaaja.hp -= 10;
  } else {
    console.log('Virheellinen syöte, valitse uudelleen!');
  }
}

// Event 3: Suon lumous
function suonLumous(pelaaja) {
  console.log('3. Suon Lumous:');
  textarea.value += '\nSuo lumoaa sinut kauneudella, kuulet kuinka hiisit laulavat kauniita laulujaan piiloissan. Aika poistua, löydätkö suolta pois?';

  // Valinnat:
  console.log('Valinnat:');
  const valinta3 = prompt(
      'Valinta 1: Hyppelehdit reunoja pitkin.\nValinta 2: Olet uhkarohkea ja hyppelet kiviä pitkin');

  // Valinta 1:
  if (valinta3 === '1') {
    textarea.value += '\nValinta 1: Pysyt suon reunoilla ja olet varovainen. Löydät suon uumenista kasan eliksiirejä ja piilotetun reitin ulos. Hej på dej suo!';
    // ELIKSIIRIT VAI JOTAIN MUUTA??
    pelaaja.eliksiiri();
  } else if (valinta3 === '2') {
    // Valinta 2:
    textarea.value += '\nValinta 2: Hyppelehtiessäsi kivillä huomaat salaperäisen portin suossa.Kompastut ja tipahdat suoportista toiseen ulottuvuuteen. Kohtaat painajaisena elämäsi traagisimmat tapahtumat. Menetät 5HP.';
    pelaaja.hp -= 5;
  } else {
    console.log('Virheellinen syöte, valitse uudelleen!');
  }
}

// Peli Eventti: Suurentarmon kaupunki
function suurentarmonKaupunkiEvent(pelaaja) {
  textarea.value += '\nSuurentarmon kaupunki on kuin elävä maalaus, jossa turnajaiset herättävät ritarien taidot loistoon. Taikurimarkkinoiden värikkäät kojut houkuttelevat seikkailijoita etsimään mystisiä aarteita. Suurentarmo kutsuu seikkailijoita löytämään oman tarinansa sen monipuolisista tapahtumista ja historiallisista salaisuuksista!';

  // Arpoo randomilla pelaajalle eventin 1, 2, 3.
  const tapahtuma = Math.floor(Math.random() * 3) + 1;

  // Ohjaa valintoihin, jossa pelaaja saa valita mitä tekee.
  switch (tapahtuma) {
    case 1:
      turnajaiset(pelaaja);
      break;
    case 2:
      taikurimarkkinat(pelaaja);
      break;
    case 3:
      uhkapeliOnnenpelikortit(pelaaja);
      break;
    default:
      console.log('Virheellinen syöte, valitse uudelleen!');
      break;
  }
}

// Event 1: Turnajaiset
function turnajaiset(pelaaja) {
  console.log('1. Turnajaiset:');
  textarea.value += '\nSuurentarmon kaupunki järjestää suuret turnajaiset, joissa ritarien taituruus pääsee loistamaan. Kaupunki on täynnä värikkäitä lippuja ja vilkkaita markkinoita. Voit valita osallistua turnajaisiin tai seurata niitä sivusta.';

  // Valinnat:
  console.log('Valinnat:');
  const valinta = prompt(
      '1. Osallistun turnajaisiin ja haastan toisen ritarin.\n2. Vikittelen turnajaisten prinsessaa');

  // Valinta 1:
  if (valinta === '1') {
    textarea.value += '\nValinta 1: Osallistut turnajaisiin ja astut kilpakentälle. Heiluttelet mahtipontisesti miekkaasti kohti yleisöä ja haistattelet kilpakumppanillesi, taistelu alkaa!';
    // OHJAA TAISTELUUN TEE FUNKTIO OIKEIN
    avaa_taistelu_ikkuna();
  } else if (valinta === '2') {
    // Valinta 2:
    textarea.value += '\nValinta 2: Innoissaan turnajaisten tunnelmasta päätät vikitellä turnajaisten prinsessaa, joka seisoo lähellä kuninkaallista katsomoa. Astut esiin ja pyydät häntä mukaan kävelylle kauniille puutarhakäytävälle. Prinsessa hymyilee viehättyneenä ja suostuu. Mennessänne kävelylle selviääkin ettei prinsessa ole oikea prinsessa! Hän ryöstää sinut ja menetät kaikki taikapotionit.';
    // MUOKKAA MITÄ MENETTÄÄ, ELIKSIIREJÄ?
    pelaaja.eliksiirit = 0;
  } else {
    console.log('Virheellinen syöte, valitse uudelleen!');
  }
}

// Event 2: Suurentarmon Taikurimarkkinat
function taikurimarkkinat(pelaaja) {
  console.log('2. Suurentarmon Taikurimarkkinat:');
  textarea.value += '\nKaupunki on täynnä taikureita ja magian ystäviä. Torilla järjestetään suuret taikurimarkkinat, joissa voit löytää harvinaisia taikakirjoja taikajuomia ja muita salaperäisiä esineitä. Voit valita osallistua markkinoille tai jatkaa matkaasi.';

  // Valinnat:
  console.log('Valinnat:');
  const valinta = prompt(
      '1. Tutkin taikurimarkkinoita ja teen ostoksia.\n2. Seuraat hämärää myyjää pimeälle kujalle');

  // Valinta 1:
  if (valinta === '1') {
    textarea.value += '\nValinta 1: Tutustut taikureiden tarjontaan ja teet muutamia hankintoja. Saat mukaasi taianomaisia esineitä, kuten lumouksia poistavia taikakiviä tai taikajuomia, jotka voivat auttaa tulevissa haasteissa.';
    // TAITOPISTEET VAI MUUTA? MUOKKAA
    pelaaja.taitopiste += 2;
  } else if (valinta === '2') {
    // Valinta 2:
    textarea.value += '\nValinta 2: Salaperäinen myyjä yrittää kaupitella sinulle kiellettyjä esineitä. Tunnet luissasi kuinka tilanteessa on jotain mätää ja haluat poistua paikalta. Myyjä vihastuu tästä ja muuttuu demoniksi edessäsi! Tästä alkaa taistelu!';
    // LISÄÄ TAISTELUFUNKTIO
    avaa_taistelu_ikkuna();
  } else {
    console.log('Virheellinen syöte, valitse uudelleen!');
  }
}

// Event 3: Uhkapeli Onnenpelikortit
function uhkapeliOnnenpelikortit(pelaaja) {
  console.log('3. Uhkapeli Onnenpelikortit:');
  textarea.value += '\nKaupungin sydämessä sijaitsee vilkas taverna, joka tunnetaan uhkapelaajien kohtauspaikkana. Saavuttuasi tavernaan, huomaat erikoisen pöydän, jossa ihmiset pelaavat kiehtovaa peliä nimeltä Onnenpelikortit. Jokainen pelaaja voi valita yhden pelikortin, joka paljastaa heidän kohtalonsa.';

  // Valinnat:
  console.log('Valinnat:');
  const valinta = prompt(
      '1. Osallistun Onnenpelikortit-peliin ja valitsen kortin\n2. Päätän olla osallistumatta uhkapeliin ja jatkaa omaa matkaani');

  // Valinta 1:
  if (valinta === '1') {
    textarea.value += '\nValinta 1: Valitset rohkeasti yhden pelikortin ja avaat sen varovasti. Kortti paljastaa, että voitat arvokkaan esineen tai taikavoiman. Tavernan ympärillä kokoontuu ihmisjoukko, ja voittosi herättää huomiota. Onneksi olkoon! Saat lisää taitoa matkaasi. Saavutat myös mainetta tavernassa.';
    pelaaja.taitopiste += 1;
  } else if (valinta === '2') {
    // Valinta 2:
    textarea.value += '\nValinta 2: Päätät olla osallistumatta uhkapeliin ja istut muualle nauttimaan juomasta. Kuulet ympärilläsi pelaajien reaktiot, sekä riemunkiljahdukset että pettyneet huokaukset. Jatkat omaa matkaasi miettien, mitä olisi voinut voittaa..';
    // LISÄTÄÄNKÖ TÄHÄN JOKU MITÄ MENETTÄÄ JNE?
  } else {
    console.log('Virheellinen syöte, valitse uudelleen!');
  }
}

// Peli Eventti: Peikkoluola

function peikkoluola(pelaaja) {
      textarea.value += '\nPimeän metsän kätköissä sijaitseva peikkoluola kuhisee salaisuuksia ja vaaroja. Luola kätkee monta salaisuuttaa uumeniinsa, katsotaan mihin tiet johtavat...';

  // Arpoo randomilla pelaajalle eventin 1, 2, 3.
  const tapahtuma = Math.floor(Math.random() * 3) + 1;

  // Ohjaa valintoihin, jossa pelaaja saa valita mitä tekee.
  switch (tapahtuma) {
    case 1:
      peikkokuningas(pelaaja);
      break;
    case 2:
      hamahakkikuningatar(pelaaja);
      break;
    default:
      lohikaarmeenPesa(pelaaja);
      break;
  }
}

// Event 1: Peikkokuningas
function peikkokuningas(pelaaja) {
  console.log('1. Peikkokuningas:');
  textarea.value += '\nSeikkailija tutkii peikkoluolaa ja toivoo löytävänsä aarteita, törmäänkö peikkokuninkaaseen? ';

  // Valinnat:
  console.log('Valinnat:');
  const valinta1 = prompt(
      'Valinta 1: Yrität pysyä piilossa peikkokuninkaalta.\nValinta 2: Kohtaat peikkokuninkaan');

  // Valinta 1:
  if (valinta1 === '1') {
    textarea.value += '\nValinta 1: Pysyt kärsivällisenä ja odotat peikkokuninkaan poistuvan.';
    textarea.value += '\nNäet tilaisuutesi ja pääset hiipimään peikkokuninkaan kätköihin. Varastat kuninkaalta kasan esineitä ja hipsit nopeasti karkuun!';
    // MITÄ VARASTETTIIN? MUOKKAA
    pelaaja.esine();
  } else if (valinta1 === '2') {
    // Valinta 2:
    textarea.value += '\nValinta 2: Rohkeana seikkailijana päätät kohdata peikkokuninkaan suoraan. Astut esiin varjoista ja seisot hänen edessään. Peikkokuningas nauraa mahtipontisesti ja haastaa sinut taisteluun!';
    // MUOKKAA TAISTELUFUNKTIO
    avaa_taistelu_ikkuna();
  } else {
    console.log('Virheellinen syöte, valitse uudelleen!');
  }
}

// Event 2: Hämähäkkikuningatar
function hamahakkikuningatar(pelaaja) {
  console.log('2. Hämähäkkikuningatar:');
  textarea.value += '\nSyvimmän kammion pimeimmässä nurkassa seikkailija kohtaa hämähäkkikuningattaren, joka vartioi kultaisia silkkisiä aarteitaan.';

  // Valinnat:
  console.log('Valinnat:');
  const valinta2 = prompt(
      'Valinta 1: Päätät kohdata hämähäkkikuningattaren!\nValinta 2: Sytytät hämähäkinseitit tuleen ja pakenet');

  // Valinta 1:
  if (valinta2 === '1') {
    textarea.value += '\nValinta 1: Astut rohkeasti eteenpäin ja kohtaat kuningattaren.';
    textarea.value += '\nHämähäkkikuningatar tunnistaa rohkeutesi ja arvostaa että uskalsit astua hänen eteensä.';
    textarea.value += '\nKuningatar ojentaa sinulle arvokkaita taikaesineitä, joilla saat lisää taikavoimaa, ja toivottaa onnea matkaan!';
    // MITÄ SAADAAN HÄMÄHÄKILTÄ, LISÄTÄÄN SE TÄHÄN
    pelaaja.esine();
  } else if (valinta2 === '2') {
    // Valinta 2:
    textarea.value += '\nValinta 2: Päätät turvautua äärimmäiseen toimenpiteeseen ja sytytät hämähäkinseitit tuleen.';
    textarea.value += '\nKammiossa roihahtaa liekkejä, hämähäkkikuningatar kiroaa sinut. Kuulet vaikeroivat tuskan huudot takanasi kun pakenet luolasta…';
    // MENETETÄÄNKÖ HP VAI JOTAIN MUUTA?
    pelaaja.hp -= 10;
  } else {
    console.log('Virheellinen syöte, valitse uudelleen!');
  }
}

// Event 3: Lohikäärmeen Pesä
function lohikaarmeenPesa(pelaaja) {
  console.log('3. Lohikäärmeen Pesä:');
  textarea.value += '\nPeikkoluolan uumeniin kätkeytyy lohikäärmeen pesä, jonka peikot ovat vanginneet kahleisiin. Löydätkö lohikäärmeen?';

  // Valinnat:
  console.log('Valinnat:');
  const valinta3 = prompt(
      'Valinta 1: Lähdet etsimään lohikäärmeen pesää ja aarteita\nValinta 2: Et uskalla lähteä luolaan, vaan jatkat muita seikkailuja kohti päämäärää');

  // Valinta 1:
  if (valinta3 === '1') {
    textarea.value += '\nValinta 1: Astut varoen kohti luolaa, jossa lohikäärme piileskelee.';
    textarea.value += '\nPäätät olla rohkea ja vapautat lohikäärmeen kahleista. Lohikäärme syöksee tulta vapautuessaan, mutta yllättäen lohikäärme heltyy ja antaa kiitokseksi osan aarteistaan, mukaan lukien maagisen suojelua antavan amuletin.';
    textarea.value += '\nJatkat haikeana matkaasi ja toivot, että törmäät lohikäärmeeseen vielä joku päivä...';
    // MITÄS KAIKKEA LOHIKÄÄRMELTÄ SAATIIN, ESINE? MUOKATAAN
    pelaaja.esine();
  } else if (valinta3 === '2') {
    // Valinta 2:
    textarea.value += '\nValinta 2: Päätät olla ottamatta riskiä ja jatkaa seikkailujasi.';
    textarea.value += '\nPian kuulet, että joku toinen rohkea seikkailija on lähtenyt lohikäärmeen pesälle ja saanut haltuunsa uskomattomia aarteita. Kieltämättä vituttaa eikö, mutta matkan on jatkuttava...';
  } else {
    console.log('Virheellinen syöte, valitse uudelleen!');
  }
}