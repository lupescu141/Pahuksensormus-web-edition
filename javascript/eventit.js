// UUDET BOSSIT: VELHO, SYÖJÄTÄR, PEIKKOKUNINGAS, RITARITAISTELU TURNAJAISET
// KOLMIPÄINEN NOITA, DEMONI. VARISTEN HERRA KUVA PUUTTUU!

// Event: uudentoivonKylaEvent
// tavernaNoppapeli
// laksiaisjuhlat
// kylanKummallinenKojukauppias

// Event: ruoholaaksonNiityt
// kukkienHurmio - SYÖJÄTÄR (valinta2)
// varjojenPiilo
// lumotunRiipuksenArvoitus

// Event: velhotorniEvent
// loitsuhuone
// salakaytavienSokkelo
// velhonKaksintaistelu - VELHO (valinta1)

// Event: varisrameenSalaisuudet
// variksenkielenLoitsut
// varjorituaalit
// taikaesineenLoytaminen - VARISTEN HERRA (valinta2)

// Event: noitametsa (Noitametsä taustakuvat ja boss kuva ok!)
// noitataloTaistelu -KOLMIPÄINEN NOITA (valinta2)
// noitataloMetsassa
// harhailuNoitametsassa

// Event: sammakkojarvi
// lumoavaSammakkokonsertti
// lumoavaJarvenpeili

// Event: hiisisuonLaakso
// keijukaistenKuningatar
// seuraaTulikarpastenValoa
// suonLumous

// Event: suurentarmonKaupunkiEvent
// turnajaiset - RITARITAISTELU (valinta1)
// taikurimarkkinat - DEMONI (valinta2)
// uhkapeliOnnenpelikortit

// Event: peikkoluola
// peikkokuningas - PEIKKOKUNINGAS (valinta2)
// hamahakkikuningatar
// lohikaarmeenPesa

const eliksiiri = {
  'esine_nimi': 'eliksiiri',
  'esineen_id': 1,
}

const taitojuoma = {
  'esine_nimi': 'taitojuoma',
  'esineen_id': 2,
}

const taikasauva = {
  'esine_nimi': 'taikasauva',
  'esineen_id': 3,
}

// Viimeisen eventin ohjaus
async function pelin_lopetus () {
  valinta1.style.display = 'block'
  valinta2.style.display = 'block'
  try {
    valinta1.removeEventListener('click', valinta1kuuntelija)
    valinta2.removeEventListener('click', valinta2kuuntelija)
  } catch (err) {
  } finally {

    textarea.value += '\n\n-Paha gorgon on voitettu. Nostat sormuksen maasta ja tunnet sen lämmön hiipuvan. Sormus kaipaa uutta mestaria. ' +
      'Se kutsuu sinua käyttämään voimaansa. Allasi näet kuuman kuplivan laavan tulivuoressa. Heittämällä sormuksen tulivuoreen voit tuhota pahuuden lopullisesti.'
    // Valinnat
    textarea.value += '\n\n1: Antaudu sormukselle ja laita se sormeesi.'
    textarea.value += '\n\n2: Heitä se tulivuoreen.'
    textarea.scrollTop = textarea.scrollHeight

    valinta1.addEventListener('click', valinta1kuuntelija = async function () {
      // Nämä pistävät tekstiä pelaajalle nähtäväksi
      textarea.value = '\n\n-Heität sormuksen tulivuoreen ja näät kuinka se laskeutuu hehkuvaan laavamereen. ' +
        'Hetken sormus pysyy pinnalla, mutta nopeasti se sulaa ja uppoaa laavaan. ' +
        'Päästät huokauksen helpotuksesta ja katsot ylös kuinka taivas kirkastuu. ' +
        'Sormuksen vaikutus alkaa jo pikkuhiljaa hiipua maailmasta. ' +
        'Uutinen teostasi kulkee läpi maailman nopeasti ja sinusta on tuleva LEGENDA! Maailman väki HURRAA sankaruudellesi!'
      textarea.scrollTop = textarea.scrollHeight
      // piilotetaan valinta napit eventin jälkeen
      valinta1.style.display = 'none'
      valinta2.style.display = 'none'
    })

    valinta2.addEventListener('click', valinta2kuuntelija = async function () {
      // Nämä pistävät tekstiä pelaajalle nähtäväksi
      textarea.value = '\n\n-Katsot sormusta ja alla hehkuvaa laavamerta. Sormus tarjoaa käyttäjälleen voimaa ja valtaa. ' +
        'Se houkuttelee sinua ja antaudut sen valtaan. ' +
        'Laitat sormuksen sormeen ja tunnet kuinka voima alkaa kasvaa sisälläsi. ' +
        'Mielestäsi sinun tulisi ohjata maailmaa, vai onko se sormuksen vaikutus sinuun ' +
        'Sormuksen vaikutus maailmaan kasvaa ja uudet kätyrit nousevat sinun komennettavaksi ' +
        'Uutinen teostasi kulkee läpi maailman nopeasti. Maailman väki on kauhuissaan siitä mitä on luvassa kun uusi sormuksen haltija laskeutuu tulivuoren huipulta.'
      textarea.scrollTop = textarea.scrollHeight
      // piilotetaan valinta napit eventin jälkeen
      valinta1.style.display = 'none'
      valinta2.style.display = 'none'
    })

  }
}

// Laukaisee eventin pelaajan sijainnin mukaan.
function laukaise_event () {
  valinta1.style.display = 'block'
  valinta2.style.display = 'block'
  try {
    valinta1.removeEventListener('click', valinta1kuuntelija)
    valinta2.removeEventListener('click', valinta2kuuntelija)
  } catch (err) {
  } finally {
    switch (parseInt(pelaaja_olio.pelaaja_sijainti)) {
      case 1:
        uudentoivonKylaEvent()
        break
      case 2:
        ruoholaaksonNiityt()
        break
      case 3:
        velhotorniEvent()
        break
      case 4:
        varisrameenSalaisuudet()
        break
      case 5:
        noitametsa()
        break
      case 6:
        sammakkojarvi()
        break
      case 7:
        suurentarmonKaupunkiEvent()
        break
      case 8:
        hiisisuonLaakso()
        break
      case 9:
        peikkoluola()
        break
    }
  }

}

// Peli Eventti: Uudentoivon kylä
let uudentoivonkylä_käytetyt_eventit = []

function uudentoivonKylaEvent () {
  textarea.value = ''
  textarea.scrollTop = textarea.scrollHeight
  textarea.value += '\n\n-Tervetuloa Uudentoivon kylään, seikkailusi alkupisteeseen. Kylässä on monia tapahtumia ja mahdollisuuksia, jotka voivat muokata matkaasi. Tästä seikkailusi alkaa, onnea matkaan!'
  textarea.scrollTop = textarea.scrollHeight
  // Arpoo randomilla pelaajalle eventin 1, 2, 3.

  // Tarkista, onko kaikki eventit jo käytetty
  if (uudentoivonkylä_käytetyt_eventit.length === 3) {
    // Kaikki eventit on käytetty, ilmoita pelaajalle
    textarea.value += '\n\n-Et löytänyt enää mitään uutta'
    textarea.scrollTop = textarea.scrollHeight
    valinta1.style.display = 'none'
    valinta2.style.display = 'none'
    return // Lopeta funktio
  } else {

    let event_nro
    do {
      event_nro = Math.floor(Math.random() * 3) + 1
    } while (uudentoivonkylä_käytetyt_eventit.includes(event_nro))

    console.log(event_nro)

    uudentoivonkylä_käytetyt_eventit.push(event_nro)

    // Ohjaa valintoihin, jossa pelaaja saa valita mitä tekee.
    switch (event_nro) {
      case 1:
        tavernaNoppapeli()
        break
      case 2:
        laksiaisjuhlat()
        break
      case 3:
        kylanKummallinenKojukauppias()
        break
      default:
        console.log('Virheellinen syöte, valitse uudelleen!')
        break
    }
  }
}

// Event 1: Tavernan noppapeli-ilta
function tavernaNoppapeli () {
  // Voidaan tulostaa konsoliin mikä event kyseessä jos tarvitsee esim debug
  console.log('1. Tavernan noppapeli-ilta:')
  // Nämä pistävät tekstiä pelaajalle nähtäväksi
  // \n\n Jättää tyhjän rivin selkeyden vuoksi. käytetään aina stringin alussa
  textarea.value += '\n\n-Kylän tavernassa pelaajalla on mahdollisuus osallistua noppapeli-iltaan. Istu alas paikallisten kanssa ja näytä taitosi. Kuka tietää, mitä voit voittaa tai menettää?'
  // Valinnat
  textarea.value += '\n\n1: Istu alas pelaamaan noppaa.'
  textarea.value += '\n\n2: Kieltäydy pelistä.'
  textarea.scrollTop = textarea.scrollHeight

  // Tehdään valinnoille event listenerit jotka kuuntelevat nappien klikkausta
  // Tämä kuuntelee valinta 1 nappia
  valinta1.addEventListener('click', valinta1kuuntelija = async function () {
    textarea.value = ''
    textarea.scrollTop = textarea.scrollHeight
    // Tämä liittyy valintaan yksi. Tässä eventissä heitetään random noppaa ja pelataan peliä
    const heitto = Math.floor(Math.random() * 21) + 1
    // Nämä pistävät tekstiä pelaajalle nähtäväksi
    textarea.value += `\n\nNopan heitto: ${heitto}`
    textarea.scrollTop = textarea.scrollHeight
    // Häviö noppa 1-10:
    if (heitto >= 1 && heitto <= 10) {
      textarea.value += '\n\n-Hävisit! Menetit juuri esineen.'
      textarea.scrollTop = textarea.scrollHeight
      pelaaja_inventaario.pop() // Poistaa pelaajalta yhden esineen
    } else {
      // Voitto noppa 11-21:
      textarea.value += '\n\n-Voitto! Sait juuri uuden taitopisteen!'
      textarea.scrollTop = textarea.scrollHeight
      pelaaja_olio.pelaaja_taitopiste += 1
      // Tällä tavalla päivitetään uusi arvo näkyviin
      // Sama HPlle toimii pelaaja_hp.textContent = pelaaja_olio.pelaaja_hp
      pelaaja_tp.textContent = pelaaja_olio.pelaaja_taitopiste
    }
    // piilotetaan valinta napit eventin jälkeen
    valinta1.style.display = 'none'
    valinta2.style.display = 'none'
  })

  // Tehdään valinnoille event listenerit jotka kuuntelevat nappien klikkausta
  // Tämä kuuntelee valinta 2 nappia
  valinta2.addEventListener('click', valinta2kuuntelija = async function () {
    textarea.value = ''
    textarea.scrollTop = textarea.scrollHeight
    // Nämä pistävät tekstiä pelaajalle nähtäväksi
    textarea.value += '\n\n-Kieltäydyt pelistä ja pöytä seurue antaa sinulle ilkeitä katseita'
    textarea.scrollTop = textarea.scrollHeight
    // piilotetaan valinta napit eventin jälkeen
    valinta1.style.display = 'none'
    valinta2.style.display = 'none'
  })

}

// Event 2: Läksiäisjuhlat
function laksiaisjuhlat () {
  console.log('2. Läksiäisjuhlat:')
  textarea.value += '\n\n-Uudentoivon kylä järjestää sydämelliset läksiäisjuhlat sinulle. Koko kylässä vallitsee iloinen tunnelma. Osallistut juhliin ja liityt kyläläisten joukkoon juhlan huumassa. Ole kuitenkin varovainen, sillä liiallinen juhlinta saattaa tuoda mukanaan ikäviä seurauksia...'
  // Valinnat
  textarea.value += '\n\n1: Hillitsen itseni.'
  textarea.value += '\n\n2: Täysillä mukaan!'
  textarea.scrollTop = textarea.scrollHeight

  valinta1.addEventListener('click', valinta1kuuntelija = async function () {
    textarea.value = ''
    textarea.scrollTop = textarea.scrollHeight
    // Nämä pistävät tekstiä pelaajalle nähtäväksi
    textarea.value += '\n\n-Valinta 1: Päätät osallistua juhliin hillitysti ja ottaa osaa kylän iloiseen tunnelmaan, ansaitset tällä paikallisten suosion. Kyläläiset muistavat ystävällisyytesi ikuisesti, ja saat heiltä mukaasi arvokkaita esineitä.'
    textarea.scrollTop = textarea.scrollHeight
    for (let i = 0; i < 5; i++) if (pelaaja_inventaario.length < 12) {
      pelaaja_inventaario.push(eliksiiri)
      // piilotetaan valinta napit eventin jälkeen
      valinta1.style.display = 'none'
      valinta2.style.display = 'none'
    }
  })

  valinta2.addEventListener('click', valinta2kuuntelija = async function () {
    textarea.value = ''
    textarea.scrollTop = textarea.scrollHeight
    // Nämä pistävät tekstiä pelaajalle nähtäväksi
    textarea.value += '\n\n-Valinta 2: Annat juhlavan tunnelman viedä mukanaan ja juot liikaa viiniä, menetät otteesi todellisuudesta. Seurauksena kyläläiset menettävät kunnioituksen sinuun. Menetit 5 HP voipuessa krapulasta ja maineesi on mennyt!'
    textarea.scrollTop = textarea.scrollHeight
    pelaaja_olio.pelaaja_hp -= 5
    pelaaja_hp.textContent = pelaaja_olio.pelaaja_hp
    // piilotetaan valinta napit eventin jälkeen
    valinta1.style.display = 'none'
    valinta2.style.display = 'none'
  })

}

// Event 3: Kylän Kummallinen Kojukauppias
function kylanKummallinenKojukauppias () {
  console.log('3. Kylän kummallinen kojukauppias:')
  textarea.value += '\n\n-Kylästä löytyy salaperäinen kojukauppias, joka myy erikoisia esineitä. Voit käydä tutustumassa hänen tarjontaansa ja tehdä kauppoja. Kuka tietää, mitä hänellä on varastossaan?'
  // Valinnat
  textarea.value += '\n\n1: Kojukauppias näyttää luotettavalta, katsotaan miten käy!.'
  textarea.value += '\n\n2: Epäilyttävän oloinen ukkeli mutta pistetään rahat likoon!'
  textarea.scrollTop = textarea.scrollHeight

  valinta1.addEventListener('click', valinta1kuuntelija = async function () {
    textarea.value = ''
    textarea.scrollTop = textarea.scrollHeight
    textarea.value += '\n\n-Hyvä valinta! Saat mukaasi harvinaisen pullon, sait matkaasi mukaan taitojuomaa!'
    textarea.scrollTop = textarea.scrollHeight
    for (let i = 0; i < 3; i++) {
      if (pelaaja_inventaario.length < 12) {
        pelaaja_inventaario.push(taitojuoma)
      }
    }
    console.log(pelaaja_inventaario)
    // piilotetaan valinta napit eventin jälkeen
    valinta1.style.display = 'none'
    valinta2.style.display = 'none'
  })

  valinta2.addEventListener('click', valinta2kuuntelija = async function () {
    textarea.value = ''
    textarea.scrollTop = textarea.scrollHeight
    textarea.value += '\n\n-Voi ei! Valintasi ei ollut fiksu, kylän kummajainen kirosi sinut, menetit juuri 5 HP!'
    textarea.scrollTop = textarea.scrollHeight
    pelaaja_olio.pelaaja_hp -= 5
    pelaaja_hp.textContent = pelaaja_olio.pelaaja_hp
    // piilotetaan valinta napit eventin jälkeen
    valinta1.style.display = 'none'
    valinta2.style.display = 'none'
  })
}

// Peli Eventti: Ruoholaakson niityt
let ruoholaakso_käytetyt_eventit = []
function ruoholaaksonNiityt () {
  textarea.value = ''
  textarea.scrollTop = textarea.scrollHeight
  textarea.value += '\n\n-Matkaat Ruoholaaksoon joka on täynnä niittyjä ja salaperäisiä hohtavia kukkia. Laakson sydämessä asuu tappavan kaunis syöjätär, jonka lumoava voima vetää puoleensa uteliaita seikkailijoita. Seuraat kukkien huumaavaa tuoksua..'
  textarea.scrollTop = textarea.scrollHeight

  // Tarkista, onko kaikki eventit jo käytetty
  if (ruoholaakso_käytetyt_eventit.length === 3) {
    // Kaikki eventit on käytetty, ilmoita pelaajalle
    textarea.value += '\n\n-Et löytänyt enää mitään uutta'
    textarea.scrollTop = textarea.scrollHeight
    valinta1.style.display = 'none'
    valinta2.style.display = 'none'
    return // Lopeta funktio
  } else {

    let event_nro
    do {
      event_nro = Math.floor(Math.random() * 3) + 1
    } while (ruoholaakso_käytetyt_eventit.includes(event_nro))

    console.log(event_nro)

    ruoholaakso_käytetyt_eventit.push(event_nro)

    // Ohjaa valintoihin, jossa pelaaja saa valita mitä tekee.
    switch (event_nro) {
      case 1:
        kukkienHurmio()
        break
      case 2:
        varjojenPiilo()
        break
      case 3:
        lumotunRiipuksenArvoitus()
        break
      default:
        console.log('Virheellinen syöte, valitse uudelleen!')
        break
    }
  }
}

// Event 1: Kukkien Hurmio
function kukkienHurmio () {
  console.log('1. Kukkien Hurmio:')
  textarea.value += '\n\n-Haistat lumoavien kukkien tuoksun, tuoksu kutsuu sinua kohti piilotettua laaksoa. Keskellä laaksoa avautuu kukkien ympäröimä paikka, jossa voit kokea niiden lumoavan voiman..'
  // Valinnat
  textarea.value += '\n\n1: Astut varoen kukkien keskelle'
  textarea.value += '\n\n2: Poimit kukkia ympärillesi huolettomasti'
  textarea.scrollTop = textarea.scrollHeight

  valinta1.addEventListener('click', valinta1kuuntelija = async function () {
    textarea.value = ''
    textarea.scrollTop = textarea.scrollHeight
    textarea.value += '\n\n-Astut varovasti kukkien keskelle ja tunnet niiden lumoavan voiman ympärilläsi. Kukat suojelevat sinua vihollisilta lyhyen aikaa. Saat matkaasi mukaan eliksiirejä.'
    textarea.scrollTop = textarea.scrollHeight
    for (let i = 0; i < 5; i++) {
      if (pelaaja_inventaario.length < 12) {
        pelaaja_inventaario.push(eliksiiri)
      }
    }
    console.log(pelaaja_inventaario)
    // piilotetaan valinta napit eventin jälkeen
    valinta1.style.display = 'none'
    valinta2.style.display = 'none'
  })

  valinta2.addEventListener('click', valinta2kuuntelija = async function () {
    textarea.value = ''
    textarea.scrollTop = textarea.scrollHeight
    textarea.value += '\n\n-Poimimalla kukkia huolettomasti, kukkien henki herää ja ne kutsuvat tappavan kauniin syöjättären luokseen. Joudut taisteluun syöjättären kanssa!'
    textarea.scrollTop = textarea.scrollHeight
    await avaa_taistelu_ikkuna(await hae_tunnettu_vihollinen(14)) // OHJAA TAISTELUUN SYÖJÄTÄR KUNINGATTAREN KANSSA
    valinta1.style.display = 'none'
    valinta2.style.display = 'none'
  })
}

// Event 2: Varjojen piilo
function varjojenPiilo () {
  console.log('2. Varjojen piilo:')
  textarea.value += '\n\n-Kohtaat syöjättärien salaperäisen piilon, joka näyttää olevan täynnä vaarallisia petoja ja pimeää voimaa. Liitytkö vahingossa varjojen tanssiin vai piilottelet...'
  // Valinnat
  textarea.value += '\n\n1: Liityt varjojen tanssiin'
  textarea.value += '\n\n2: Pysyt varjojen ulottumattomissa'
  textarea.scrollTop = textarea.scrollHeight

  valinta1.addEventListener('click', valinta1kuuntelija = async function () {
    textarea.value = ''
    textarea.scrollTop = textarea.scrollHeight
    textarea.value += '\n\n-Liityt syöjättärien kanssa varjojen tanssiin ja saat osaksi niiden voimaa. Varjot suojaavat sinua pimeyden voimilta ja tarjoavat sinulle erityistaitoja varjojen maailmassa liikkumiseen. Saat 5 HP.'
    textarea.scrollTop = textarea.scrollHeight
    pelaaja_olio.pelaaja_hp += 5
    pelaaja_hp.textContent = pelaaja_olio.pelaaja_hp
    valinta1.style.display = 'none'
    valinta2.style.display = 'none'
  })

  valinta2.addEventListener('click', valinta2kuuntelija = async function () {
    textarea.value = ''
    textarea.scrollTop = textarea.scrollHeight
    textarea.value += '\n\n-Pysyt varjojen ulottumattomissa, mutta syöjättäret huomaavat sinut! Varjot luovat illuusioita, jotka hämmentävät sinua ja aiheuttavat tilapäistä sokeutta. Vajoat syvään uneen ja menetät 5 HP.'
    textarea.scrollTop = textarea.scrollHeight
    pelaaja_olio.pelaaja_hp -= 5
    pelaaja_hp.textContent = pelaaja_olio.pelaaja_hp
    // piilotetaan valinta napit eventin jälkeen
    valinta1.style.display = 'none'
    valinta2.style.display = 'none'
  })
}

// Event 3: Lumotun Riipuksen Arvoitus
function lumotunRiipuksenArvoitus () {
  console.log('3. Lumotun Riipuksen Arvoitus:')
  textarea.value += '\n\n-Löydät laakson keskeltä demonisen riipuksen, joka kiinnittää huomiosi voimakkaaseen energiaan. Riipus näyttää sisältävän piilotetun viestin, voit joko yrittää selvittää sen tai ohittaa sen.'
  // Valinnat
  textarea.value += '\n\n1: Yritän ymmärtää riipuksen viestin'
  textarea.value += '\n\n2: Ohitan riipuksen ja jatkan matkaani'
  textarea.scrollTop = textarea.scrollHeight

  valinta1.addEventListener('click', valinta1kuuntelija = async function () {
    textarea.value = ''
    textarea.scrollTop = textarea.scrollHeight
    textarea.value += '\n\n-Valinta 1: Riipus paljastaa sinulle tulevaisuuden näkymiä ja vihjeitä seuraavista vaiheista. Saat etulyöntiaseman tulevissa kohtaamisissa. Saat lisää taitoja matkaasi!'
    textarea.scrollTop = textarea.scrollHeight
    pelaaja_olio.pelaaja_taitopiste += 1
    pelaaja_tp.textContent = pelaaja_olio.pelaaja_taitopiste
    valinta1.style.display = 'none'
    valinta2.style.display = 'none'
  })

  valinta2.addEventListener('click', valinta2kuuntelija = async function () {
    textarea.value = ''
    textarea.scrollTop = textarea.scrollHeight
    textarea.value += '\n\n-Valinta 2: Ohitat riipuksen, mutta sen voima koskettaa sinua. Joudut hetkellisesti ajan vääristymisen uhriksi, menettäen näkemyksen ajasta ja paikasta. Syöjätär ui mielesi sopukoihin ja hypnotisoi sinut lumouksiinsa, menetät 5 HP.'
    textarea.scrollTop = textarea.scrollHeight
    pelaaja_olio.pelaaja_hp -= 5
    pelaaja_hp.textContent = pelaaja_olio.pelaaja_hp
    valinta1.style.display = 'none'
    valinta2.style.display = 'none'
  })

}

// Peli Eventti: Velhotorni
let velhotorni_käytetyt_eventit = []

function velhotorniEvent () {
  textarea.value = ''
  textarea.scrollTop = textarea.scrollHeight
  textarea.value += '\n\n-Astuttuasi sisälle Velhotorniin, huomaat sen olevan täynnä salaisuuksia ja vaaroja, siellä asustaa hullunkurinen velho. Torni on täynnä salakäytäviä ja ansoja. Eksytkö käytävien uumeniin, vai kohtaatko mahdollisesti velhon. Onnea matkaan!'
  textarea.scrollTop = textarea.scrollHeight

  // Tarkista, onko kaikki eventit jo käytetty
  if (velhotorni_käytetyt_eventit.length === 3) {
    // Kaikki eventit on käytetty, ilmoita pelaajalle
    textarea.value += '\n\n-Et löytänyt enää mitään uutta'
    textarea.scrollTop = textarea.scrollHeight
    valinta1.style.display = 'none'
    valinta2.style.display = 'none'
    return // Lopeta funktio
  } else {

    let event_nro
    do {
      event_nro = Math.floor(Math.random() * 3) + 1
    } while (velhotorni_käytetyt_eventit.includes(event_nro))

    console.log(event_nro)

    velhotorni_käytetyt_eventit.push(event_nro)

    // Ohjaa valintoihin, jossa pelaaja saa valita mitä tekee.
    switch (event_nro) {
      case 1:
        loitsuhuone()
        break
      case 2:
        salakaytavienSokkelo()
        break
      case 3:
        velhonKaksintaistelu()
        break
      default:
        console.log('Virheellinen syöte, valitse uudelleen!')
        break
    }
  }
}

// Event 1: Loitsuhuone
function loitsuhuone () {
  console.log('1. Loitsuhuone:')
  textarea.value += '\n\n-Astuttuasi tornin eteishalliin, huomaat huoneen joka on täynnä korkeita hyllyjä, joissa on pölyisiä loitsukirjoja ja taikavarusteita. Keskellä huonetta leijailee vanha aave, joka vaikuttaa olevan tornin menneiden aikojen suojelija. Se katsoo sinua kylmän sinisillä silmillään ja lausuu kumealla äänellään: "Astu eteenpäin vain jos uskallat"'
  // Valinnat
  textarea.value += '\n\n1: Astut rohkeana sisään'
  textarea.value += '\n\n2: Lähdet karkuun'
  textarea.scrollTop = textarea.scrollHeight

  valinta1.addEventListener('click', valinta1kuuntelija = async function () {
    textarea.value = ''
    textarea.scrollTop = textarea.scrollHeight
    textarea.value += '\n\n-Valinta 1: Aave nyökkää hyväksyvästi. "Olet osoittanut olevasi arvollinen. Saat tämän loitsukirjan ja sen voiman omaksesi." Saat matkaasi loitsukirjan, joka lisää taitojasi erilaisissa taikuuden muodoissa. Maksimi taitopisteesi kasvaa yhdellä!'
    textarea.scrollTop = textarea.scrollHeight
    pelaaja_olio.pelaaja_maksimi_taitopiste += 1
    pelaaja_olio.pelaaja_taitopiste = pelaaja_olio.pelaaja_maksimi_taitopiste
    pelaaja_tp.textContent = pelaaja_olio.pelaaja_taitopiste
    valinta1.style.display = 'none'
    valinta2.style.display = 'none'
  })

  valinta2.addEventListener('click', valinta2kuuntelija = async function () {
    textarea.value = ''
    textarea.scrollTop = textarea.scrollHeight
    textarea.value += '\n\n-Valinta 2: Aave raivostuu yrityksestäsi paeta ja päättää opettaa sinulle läksyn. Sinut peittää hetkellinen kylmyys, ja tunnet voimakkaan magian värähtelyn ympärilläsi. Aave varastaa sinulta esineen.'
    textarea.scrollTop = textarea.scrollHeight
    pelaaja_inventaario.pop() // Poistaa pelaajalta yhden esineen
    valinta1.style.display = 'none'
    valinta2.style.display = 'none'
  })

}

// Event 2: Salakäytävien Sokkelo
function salakaytavienSokkelo () {
  console.log('2. Salakäytävien Sokkelo:')
  textarea.value += '\n\n-Kun olet kiivennyt tornin portaita ylemmäs, huomaat labyrinttimaisen salakäytävien sokkelon. Jokainen käytävä näyttää samanlaiselta, mutta vain yksi johtaa ylös. Kuinka päätät navigoida sokkelossa?'
  // Valinnat
  textarea.value += '\n\n1: Kuuntele intuitiotasi ja käänny oikealle'
  textarea.value += '\n\n2: Seuraat outoa kutinaa ja jatka suoraan eteenpäin'
  textarea.scrollTop = textarea.scrollHeight

  valinta1.addEventListener('click', valinta1kuuntelija = async function () {
    textarea.value = ''
    textarea.scrollTop = textarea.scrollHeight
    textarea.value += '\n\n-Valinta 1: Intuition avulla valitset oikean tien sokkelossa. Pääset helposti ylös tornin huipulle. Saat matkaasi taitopisteen salakäytävien navigointiin.'
    textarea.scrollTop = textarea.scrollHeight
    pelaaja_olio.pelaaja_taitopiste += 1
    pelaaja_tp.textContent = pelaaja_olio.pelaaja_taitopiste
    valinta1.style.display = 'none'
    valinta2.style.display = 'none'
  })

  valinta2.addEventListener('click', valinta2kuuntelija = async function () {
    textarea.value = ''
    textarea.scrollTop = textarea.scrollHeight
    textarea.value += '\n\n-Valinta 2: Vaistosi johdattavat sinut sokkeloiseen luolastoon ja eksyt. Menetät 2 HP!'
    textarea.scrollTop = textarea.scrollHeight
    pelaaja_olio.pelaaja_hp -= 2
    pelaaja_hp.textContent = pelaaja_olio.pelaaja_hp
    valinta1.style.display = 'none'
    valinta2.style.display = 'none'
  })

}

// Event 3: Velhon Kaksintaistelu
function velhonKaksintaistelu () {
  console.log('3. Velhon Kaksintaistelu:')
  textarea.value += '\n\n-Saavut tornin huipulle, Velhon hullunkurinen hahmo seisoo edessäsi, hänen katseensa paljastaa vuosisatojen viisauden ja taikuuden. Hän kohottaa kättään ja haastaa sinut kaksintaisteluun voimien mittelöimiseksi, onnea matkaan!'
  textarea.scrollTop = textarea.scrollHeight
  // Valinnat
  textarea.value += '\n\n1: Kohtaat velhon uhkarohkeana!'
  textarea.value += '\n\n2: Pakene!'
  textarea.scrollTop = textarea.scrollHeight

  valinta1.addEventListener('click', valinta1kuuntelija = async function () {
    textarea.value = ''
    textarea.scrollTop = textarea.scrollHeight
    textarea.value += '\n\n-Valinta 1: Taistelu on intensiivinen, kun aseet ja taikuus kohtaavat. Velho osoittautuu taitavaksi taistelijaksi, mutta sinä käytät taitojasi voimakkaasti hyväksesi.'
    textarea.scrollTop = textarea.scrollHeight
    await avaa_taistelu_ikkuna(await hae_tunnettu_vihollinen(19))  // OHJAA TAISTELUUN VELHON KANSSA
    valinta1.style.display = 'none'
    valinta2.style.display = 'none'
  })

  valinta2.addEventListener('click', valinta2kuuntelija = async function () {
    textarea.value = ''
    textarea.scrollTop = textarea.scrollHeight
    textarea.value += '\n\n-Valinta 2: Velho suuttuu pakoyrityksestäsi ja lähettää sinua kohti voimakkaan taian. Onnistut välttämään suurimman osan hyökkäyksistä ja pääset karkuun. Tornin pitkät ja kapeat portaat saavat sinut kaatumaan ja putoat tornin syvyyksiin. Häpeissäsi jatkat matkaa… Menetät 5 HP.'
    textarea.scrollTop = textarea.scrollHeight
    pelaaja_olio.pelaaja_hp -= 5
    pelaaja_hp.textContent = pelaaja_olio.pelaaja_hp
    valinta1.style.display = 'none'
    valinta2.style.display = 'none'
  })

}

// Peli Eventti: Varisrämeen Salaisuudet
let varisräme_käytetyt_eventit = []

function varisrameenSalaisuudet () {
  textarea.value = ''
  textarea.scrollTop = textarea.scrollHeight
  textarea.value += '\n\n-Astuttuasi maagiseen Varisrämeeseen, ympärilläsi väreilee pimeä magia ja punasilmäiset pelottavat varikset lentelevät ympärillä salaperäisinä. Edessäsi avautuu kolme polkua, joista jokainen johtaa kohti erilaista mysteeriä. Onnea matkaan!'
  textarea.scrollTop = textarea.scrollHeight
  // Arpoo randomilla pelaajalle eventin 1, 2, 3.
  // Tarkista, onko kaikki eventit jo käytetty
  if (varisräme_käytetyt_eventit.length === 3) {
    // Kaikki eventit on käytetty, ilmoita pelaajalle
    textarea.value += '\n\n-Et löytänyt enää mitään uutta'
    textarea.scrollTop = textarea.scrollHeight
    valinta1.style.display = 'none'
    valinta2.style.display = 'none'
    return // Lopeta funktio
  } else {

    let event_nro
    do {
      event_nro = Math.floor(Math.random() * 3) + 1
    } while (varisräme_käytetyt_eventit.includes(event_nro))

    console.log(event_nro)

    varisräme_käytetyt_eventit.push(event_nro)

    // Ohjaa valintoihin, jossa pelaaja saa valita mitä tekee.
    switch (event_nro) {
      case 1:
        variksenkielenLoitsut()
        break
      case 2:
        varjorituaalit()
        break
      case 3:
        taikaesineenLoytaminen()
        break
      default:
        console.log('Virheellinen syöte, valitse uudelleen!')
        break
    }
  }
}

// Event 1: Variksenkielen Loitsut
function variksenkielenLoitsut () {
  console.log('1. Variksenkielen Loitsut:')
  textarea.value += '\n\n-Lähdet seuraamaan varisten ääniä ja löydät piilossa olevan varisalttarin. Varikset alkavat laulamaan ikivanhoja loitsuja, Variksenkieltä. Pystytkö ymmärtämään loitsut ja saamaan varisten viisauden itsellesi?'
  textarea.scrollTop = textarea.scrollHeight
  // Valinnat
  textarea.value += '\n\n1: Olet rohkea ja annat palaa'
  textarea.value += '\n\n2: Olet uhkarohkea ja viis veisaat varoituksista'
  textarea.scrollTop = textarea.scrollHeight

  valinta1.addEventListener('click', valinta1kuuntelija = async function () {
    textarea.value = ''
    textarea.scrollTop = textarea.scrollHeight
    textarea.value += '\n\n-Valinta 1: Onnistut ymmärtämään loitsut, mikä antaa sinulle täyden voiman ja HP:n.'
    textarea.scrollTop = textarea.scrollHeight
    pelaaja_olio.pelaaja_maksimi_hp += 1
    pelaaja_olio.pelaaja_hp = pelaaja_olio.pelaaja_maksimi_hp
    pelaaja_hp.textContent = pelaaja_olio.pelaaja_hp
    valinta1.style.display = 'none'
    valinta2.style.display = 'none'
  })

  valinta2.addEventListener('click', valinta2kuuntelija = async function () {
    textarea.value = ''
    textarea.scrollTop = textarea.scrollHeight
    textarea.value += '\n\n-Valinta 2: Väärin meni! Varikset lentelevät ympärilläsi ja nokkivat naamasi verille, vaivut syvään uneen, menetät 5 HP!'
    textarea.scrollTop = textarea.scrollHeight
    pelaaja_olio.pelaaja_hp -= 5
    pelaaja_hp.textContent = pelaaja_olio.pelaaja_hp
    valinta1.style.display = 'none'
    valinta2.style.display = 'none'
  })

}

// Event 2: Varjorituaalit
function varjorituaalit () {
  console.log('2. Varjorituaalit:')
  textarea.value += '\n\n-Kohtaat rämeellä salaperäisen varjoryhmän, joka suorittaa rituaaleja puiden ympärillä. Voit liittyä heidän seuraansa tai tarkkailla sivusta. Pystytkö ymmärtämään varjorituaalien tarkoituksen ja vaikutukset?'
  textarea.scrollTop = textarea.scrollHeight
  // Valinnat
  textarea.value += '\n\n1: Varjorituaalien Siunaus'
  textarea.value += '\n\n2: Varjojen Kosto'
  textarea.scrollTop = textarea.scrollHeight

  valinta1.addEventListener('click', valinta1kuuntelija = async function () {
    textarea.value = ''
    textarea.scrollTop = textarea.scrollHeight
    textarea.value += '\n\n-Valinta 1: Liityt varjoryhmän rituaaliin, ryhmä yllättyy taidoistasi! Saat heiltä voimaa ja iskuvoimasi on kasvanut.'
    textarea.scrollTop = textarea.scrollHeight
    pelaaja_olio.pelaaja_isku += 1
    valinta1.style.display = 'none'
    valinta2.style.display = 'none'
  })

  valinta2.addEventListener('click', valinta2kuuntelija = async function () {
    textarea.value = ''
    textarea.scrollTop = textarea.scrollHeight
    textarea.value += '\n\n-Valinta 2: Häiritset ryhmän rituaalia etkä ymmärrä sen merkitystä, varjojen voima kääntyy sinua vastaan aiheuttaen pimeitä näkyjä ja painajaisia. Menetät 5 HP.'
    textarea.scrollTop = textarea.scrollHeight
    pelaaja_olio.pelaaja_hp -= 5
    pelaaja_hp.textContent = pelaaja_olio.pelaaja_hp
    valinta1.style.display = 'none'
    valinta2.style.display = 'none'
  })

}

// Event 3: Taikaesineen Löytäminen
function taikaesineenLoytaminen () {
  console.log('3. Taikaesineen Löytäminen:')
  textarea.value += '\n\n-Tutkiessasi rämettä, huomaat heikosti loistavan valon. Lähemmäksi siirtyessäsi löydät piilotetun kolon, jossa sijaitsee vanha magialla täytetty riipus. Mihin tiesi vie...'
  // Valinnat
  textarea.value += '\n\n1: Olen rohkea, kurotan käden koloon'
  textarea.value += '\n\n2: Olen uhkarohkea ja laitan käden koloon!'
  textarea.scrollTop = textarea.scrollHeight

  valinta1.addEventListener('click', valinta1kuuntelija = async function () {
    textarea.value = ''
    textarea.scrollTop = textarea.scrollHeight
    textarea.value += '\n\n-Valinta 1: Onnistuit kurottamaan käden syvälle koloon ja löydät muutaman taikasauvan, sauvat antavat sinulle suojaa pimeitä voimia vastaan.'
    textarea.scrollTop = textarea.scrollHeight
    for (let i = 0; i < 2; i++) {
      if (pelaaja_inventaario.length < 12) {
        pelaaja_inventaario.push(taikasauva)
      }
    }
    console.log(pelaaja_inventaario)
    valinta1.style.display = 'none'
    valinta2.style.display = 'none'
  })

  valinta2.addEventListener('click', valinta2kuuntelija = async function () {
    textarea.value = ''
    textarea.scrollTop = textarea.scrollHeight
    textarea.value += '\n\n-Valinta 2: Et kunnioittanut taikaesinettä ja yritit pakottaa sen voimat ulos, herätit varisvihan, ja joudut taisteluun varisten herran kanssa!'
    textarea.scrollTop = textarea.scrollHeight
    // OHJAA TAISTELUUN VARISTEN HERRAN KANSSA! PÄIVITETÄÄN FUNKTIO OIKEIN!
    await avaa_taistelu_ikkuna(await hae_tunnettu_vihollinen(23))
    valinta1.style.display = 'none'
    valinta2.style.display = 'none'
  })

}

// Peli Eventti: Noitametsä
let noitametsä_käytetyt_eventit = []

function noitametsa () {
  textarea.value = ''
  textarea.scrollTop = textarea.scrollHeight
  textarea.value += '\n\n-Eksyttyäsi polulta löydät itsesi noitametsästä, metsän uumenissa on kammottava noitatalo. Selviätkö täysijärkisenä metsästä, vai löydätkö itsesi noitatalosta keskeltä vaarallista taistelua karmivan kolmipäisen noidan kanssa. Onnea matkaan!'
  textarea.scrollTop = textarea.scrollHeight
  // Arpoo randomilla pelaajalle eventin 1, 2, 3.
  // Tarkista, onko kaikki eventit jo käytetty
  if (noitametsä_käytetyt_eventit.length === 3) {
    // Kaikki eventit on käytetty, ilmoita pelaajalle
    textarea.value += '\n\n-Et löytänyt enää mitään uutta'
    textarea.scrollTop = textarea.scrollHeight
    valinta1.style.display = 'none'
    valinta2.style.display = 'none'
    return // Lopeta funktio
  } else {

    let event_nro
    do {
      event_nro = Math.floor(Math.random() * 3) + 1
    } while (noitametsä_käytetyt_eventit.includes(event_nro))

    console.log(event_nro)

    noitametsä_käytetyt_eventit.push(event_nro)

    // Ohjaa valintoihin, jossa pelaaja saa valita mitä tekee.
    switch (event_nro) {
      case 1:
        noitataloTaistelu()
        break
      case 2:
        noitataloMetsassa()
        break
      case 3:
        harhailuNoitametsassa()
        break
      default:
        console.log('Virheellinen syöte, valitse uudelleen!')
        break
    }
  }
}

// Event 1: Noitatalo Taistelu!
function noitataloTaistelu () {
  console.log('1. Outo haju leijailee ilmassa...')
  textarea.value += '\n\n-Menet rohkeana noitatalon sisälle, talo näyttää vaaralliselta joten päätät laittaa näkymättömyysviitan päälle. Hiivit hiirenhiljaa keittiöön, jossa leijailee kummallisen pistävä haju. Siellä huomaat padan, jossa porisee karmea liemi täynnä ruumiita! Tönäiset järkytyksestä vahingossa taikapataa, jäitkö kiinni vai pääsetkö jatkamaan matkaa?'
  // Valinnat
  textarea.value += '\n\n1: Pidät henkesi voimalla taikaviitan reunasta kiinni ja toivot ettet paljastunut!'
  textarea.value += '\n\n2: Tuskanhiki valuu selkää pitkin, apua?'
  textarea.scrollTop = textarea.scrollHeight
  paikkatausta.src = '../static/images/eventit/noitametsa_noitatalotaistelu.jpg'

  valinta1.addEventListener('click', valinta1kuuntelija = async function () {
    textarea.value = ''
    textarea.scrollTop = textarea.scrollHeight
    textarea.value += '\n\n-Valinta 1: Hiippailet keittiössä näkymättömyysviitan kanssa ilman kiinnijäämistä, löydät salaisen komeron jossa säilytetään arvokkaita taika-aineita. Löydät eliksiirejä ja sait taitopisteen! Mahtavaa!'
    textarea.scrollTop = textarea.scrollHeight
    pelaaja_olio.pelaaja_maksimi_taitopiste += 1
    pelaaja_olio.pelaaja_taitopiste = pelaaja_olio.pelaaja_maksimi_taitopiste
    pelaaja_tp.textContent = pelaaja_olio.pelaaja_taitopiste
    for (let i = 0; i < 5; i++) {
      if (pelaaja_inventaario.length < 12) {
        pelaaja_inventaario.push(eliksiiri)
      }
    }
    console.log(pelaaja_inventaario)
    valinta1.style.display = 'none'
    valinta2.style.display = 'none'
  })

  valinta2.addEventListener('click', valinta2kuuntelija = async function () {
    textarea.value = ''
    textarea.scrollTop = textarea.scrollHeight
    textarea.value += '\n\n-Valinta 2: Jäit kiinni ja kolmipäinen noita huomaa sinut. Noita haastaa sinut taisteluun!'
    textarea.scrollTop = textarea.scrollHeight
    await avaa_taistelu_ikkuna(await hae_tunnettu_vihollinen(22))  // OHJAA TAISTELUUN KOLMIPÄISEN NOIDAN KANSSA
    valinta1.style.display = 'none'
    valinta2.style.display = 'none'
  })

}

// Event 2: Noitatalo metsässä
function noitataloMetsassa () {
  console.log('2. noitatalonNoitatalon Kielletty Kirjasto')
  textarea.value += '\n\n-Olet syvällä noitametsässä, kun yllättäen huomaat puiden välistä pilkottavan kaukaa kummallisen rakennuksen. Lähemmäs tultuasi tunnistat sen olevan Noitatalo, joka on kietoutunut puiden oksien ja sammaleiden peittoon. Uskallatko mennä sisälle?'
  // Valinnat
  textarea.value += '\n\n1: Menen sisään?'
  textarea.value += '\n\n2: En uskalla mennä sisään'
  textarea.scrollTop = textarea.scrollHeight
  paikkatausta.src = '../static/images/eventit/noitametsa_noitataloMetsassa.png'

  valinta1.addEventListener('click', valinta1kuuntelija = async function () {
    textarea.value = ''
    textarea.scrollTop = textarea.scrollHeight
    textarea.value += '\n\n-Valinta 1: Päätät rohkeasti avata noitatalon raskaan oven. Astut varovasti sisään ja kävelet pimeään.'
    textarea.value += '\n\n-Astut eteenpäin kohti kirjastoa. Onnistut löytämään kirjaston käytäviltä salaisen loitsukirjan. Taikoen loitsulla hetkellisen voiman, syliisi tipahtaa taitojuomia. Olet nyt vahvempi ja varustautuneempi jatkamaan seikkailuasi!'
    textarea.scrollTop = textarea.scrollHeight
    for (let i = 0; i < 3; i++) {
      if (pelaaja_inventaario.length < 12) {
        pelaaja_inventaario.push(taitojuoma)
      }
    }
    console.log(pelaaja_inventaario)
    valinta1.style.display = 'none'
    valinta2.style.display = 'none'
  })

  valinta2.addEventListener('click', valinta2kuuntelija = async function () {
    textarea.value = ''
    textarea.scrollTop = textarea.scrollHeight
    textarea.value += '\n\n-Valinta 2: Päätät olla astumatta noitataloon ja jatkat syvemmälle metsään. Matkasi johdattaa sinut yhä syvemmälle puiden siimekseen. Kompuroit ajatuksissasi puun kantoon ja menetät 5 HP.'
    textarea.scrollTop = textarea.scrollHeight
    pelaaja_olio.pelaaja_hp -= 5
    pelaaja_hp.textContent = pelaaja_olio.pelaaja_hp
    valinta1.style.display = 'none'
    valinta2.style.display = 'none'
  })

}

// Event 3: Harhailu Noitametsässä
function harhailuNoitametsassa () {
  console.log('3. Harhailu Noitametsässä:')
  textarea.value += '\n\n-Suuntaat metsän syvyyksiin, jossa vaimeat kuiskaukset ja leijailevat varjot luovat kiehtovan, mutta samalla karmaisevan tunnelman. Uppoatko metsän syvyyksiin vai löydätkö tiesi ulos?'
  // Valinnat
  textarea.value += '\n\n1: Lähdet oikealle'
  textarea.value += '\n\n2: Suuntaat vasemmalle'
  textarea.scrollTop = textarea.scrollHeight
  paikkatausta.src = '../static/images/eventit/noitametsa_harhailunoitam.png'

  valinta1.addEventListener('click', valinta1kuuntelija = async function () {
    textarea.value = ''
    textarea.scrollTop = textarea.scrollHeight
    textarea.value += '\n\n-Valinta 1: Harhailet noitametsän läpi ja löydät vanhan maagisen lähteen. Tämä lähde antaa sinulle erityisen taidon, joka auttaa tulevissa koitoksissa. Löydät tiesi ulos metsästä ja sait lähteestä mukaasi eliksiirejä!'
    textarea.scrollTop = textarea.scrollHeight
    for (let i = 0; i < 5; i++) {
      if (pelaaja_inventaario.length < 12) {
        pelaaja_inventaario.push(eliksiiri)
      }
    }
    console.log(pelaaja_inventaario)
    valinta1.style.display = 'none'
    valinta2.style.display = 'none'
  })

  valinta2.addEventListener('click', valinta2kuuntelija = async function () {
    textarea.value = ''
    textarea.scrollTop = textarea.scrollHeight
    textarea.value += '\n\n-Valinta 2: Voi ei, suuntavaistosi meni harhaan! Eksyit metsään ja sekoat sen mysteereihin, ajantaju katoaa harhaillessasi puiden keskellä. Vajoat synkkyyteen ja menetät 5 HP!'
    textarea.scrollTop = textarea.scrollHeight
    pelaaja_olio.pelaaja_hp -= 5
    pelaaja_hp.textContent = pelaaja_olio.pelaaja_hp
    valinta1.style.display = 'none'
    valinta2.style.display = 'none'
  })

}

// Peli Eventti: Sammakkojärvi
let sammakkojärvi_käytetyt_eventit = []

function sammakkojarvi () {
  textarea.value = ''
  textarea.scrollTop = textarea.scrollHeight
  textarea.value += '\n\n-Taianomainen sammakkojärvi herättää uteliaisuuden ja seikkailunhalun. Sammakkojärven rannat täyttyvät satojen sammakoiden kurnutuksesta.'
  textarea.scrollTop = textarea.scrollHeight
  // Arpoo randomilla pelaajalle eventin 1, 2, 3.
  // Tarkista, onko kaikki eventit jo käytetty
  if (sammakkojärvi_käytetyt_eventit.length === 2) {
    // Kaikki eventit on käytetty, ilmoita pelaajalle
    textarea.value += '\n\n-Et löytänyt enää mitään uutta'
    textarea.scrollTop = textarea.scrollHeight
    valinta1.style.display = 'none'
    valinta2.style.display = 'none'
    return // Lopeta funktio
  } else {

    let event_nro
    do {
      event_nro = Math.floor(Math.random() * 2) + 1
    } while (sammakkojärvi_käytetyt_eventit.includes(event_nro))

    console.log(event_nro)

    sammakkojärvi_käytetyt_eventit.push(event_nro)

    // Ohjaa valintoihin, jossa pelaaja saa valita mitä tekee.
    switch (event_nro) {
      case 1:
        lumoavaSammakkokonsertti()
        break
      case 2:
        lumoavaJarvenpeili()
        break
    }
  }
}

// Event 1: Lumoava Sammakkokonsertti
function lumoavaSammakkokonsertti () {
  console.log('1. Lumoava Sammakkokonsertti:')
  textarea.value += '\n\n-Kun saavut sammakkojärvelle, huomaat, että rannalla istuu joukko sammakoita. Yhtäkkiä ne alkavat laulaa kauniisti yhteen, muodostaen lumoavan konsertin.'
  // Valinnat
  textarea.value += '\n\n1: Liity sammakoiden seuraan'
  textarea.value += '\n\n2: Jatka matkaa'
  textarea.scrollTop = textarea.scrollHeight

  valinta1.addEventListener('click', valinta1kuuntelija = async function () {
    textarea.value = ''
    textarea.scrollTop = textarea.scrollHeight
    textarea.value += '\n\n-Valinta 1: Laulu on niin kaunis, että voit tuntea sen vaikutuksen ympärilläsi. Taikavoimat ympäröivät sinut ja sammakot antavat sinulle täyden HP:n.'
    textarea.scrollTop = textarea.scrollHeight
    pelaaja_olio.pelaaja_maksimi_hp += 1
    pelaaja_olio.pelaaja_hp = pelaaja_olio.pelaaja_maksimi_hp
    pelaaja_hp.textContent = pelaaja_olio.pelaaja_hp
    valinta1.style.display = 'none'
    valinta2.style.display = 'none'
  })

  valinta2.addEventListener('click', valinta2kuuntelija = async function () {
    textarea.value = ''
    textarea.scrollTop = textarea.scrollHeight
    textarea.value += '\n\n-Valinta 2: Päätät jatkaa matkaa, sammakot suutahtavat ja heittävät päällesi vettä.. Vaatteesi ovat läpimärät ja jäädyt kylmästä ilmasta. Menetät 5 HP.'
    textarea.scrollTop = textarea.scrollHeight
    pelaaja_olio.pelaaja_hp -= 5
    pelaaja_hp.textContent = pelaaja_olio.pelaaja_hp
    valinta1.style.display = 'none'
    valinta2.style.display = 'none'
  })

}

// Event 2: Lumoava Järvenpeili
function lumoavaJarvenpeili () {
  console.log('2. Lumoava Järvenpeili:')
  textarea.value += '\n\n-Näet järven pinnalla heijastuksen, joka ei näytä perinteiseltä veden heijastukselta. Huomaat, että heijastuksesta ilmestyy jotain. Yhtäkkiä järvestä pompsahtaa ruttuinen sammakko joka ehdottaa sinulle suudelmaa!'
  // Valinnat
  textarea.value += '\n\n1: Suostut suudelmaan!'
  textarea.value += '\n\n2: Karkuun!'
  textarea.scrollTop = textarea.scrollHeight

  valinta1.addEventListener('click', valinta1kuuntelija = async function () {
    textarea.value = ''
    textarea.scrollTop = textarea.scrollHeight
    textarea.value += '\n\n-Valinta 1: Suutelet vastenmielistä sammakkoa, ja hän muuttuu kauniiksi prinssiksi! Hän kiittää sinua pelastuksesta ja antaa sinulle taitopisteen sekä taikasauvaa;)'
    textarea.scrollTop = textarea.scrollHeight
    pelaaja_olio.pelaaja_maksimi_taitopiste += 1
    pelaaja_olio.pelaaja_taitopiste = pelaaja_olio.pelaaja_maksimi_taitopiste
    pelaaja_tp.textContent = pelaaja_olio.pelaaja_taitopiste
    for (let i = 0; i < 3; i++) {
      if (pelaaja_inventaario.length < 12) {
        pelaaja_inventaario.push(taikasauva)
      }
    }
    console.log(pelaaja_inventaario)
    valinta1.style.display = 'none'
    valinta2.style.display = 'none'
  })

  valinta2.addEventListener('click', valinta2kuuntelija = async function () {
    textarea.value = ''
    textarea.scrollTop = textarea.scrollHeight
    textarea.value += '\n\n-Valinta 2: Sammakko loukkaantuu ja heittää sinua kivellä päähän. Menetät 5 HP.'
    textarea.scrollTop = textarea.scrollHeight
    pelaaja_olio.pelaaja_hp -= 5
    pelaaja_hp.textContent = pelaaja_olio.pelaaja_hp
    valinta1.style.display = 'none'
    valinta2.style.display = 'none'
  })

}

// Peli Eventti: Hiisisuon Laakso
let hiisisuo_käytetyt_eventit = []

function hiisisuonLaakso () {
  textarea.value = ''
  textarea.scrollTop = textarea.scrollHeight
  textarea.value += '\n\n-Hiisisuon laakso on täynnä tulikärpästen tanssia ja kukkien hehkua. Kaunis keijukaiskuningatar liitelee suoliljojen yllä. Astutko lähemmäksi ihastumaan, seikkailemaan vai uppoamaan suon syvyyksiin? Onnea matkaan!'
  textarea.scrollTop = textarea.scrollHeight
  // Arpoo randomilla pelaajalle eventin 1, 2, 3.
  // Tarkista, onko kaikki eventit jo käytetty
  if (hiisisuo_käytetyt_eventit.length === 3) {
    // Kaikki eventit on käytetty, ilmoita pelaajalle
    textarea.value += '\n\n-Et löytänyt enää mitään uutta'
    textarea.scrollTop = textarea.scrollHeight
    valinta1.style.display = 'none'
    valinta2.style.display = 'none'
    return // Lopeta funktio
  } else {

    let event_nro
    do {
      event_nro = Math.floor(Math.random() * 3) + 1
    } while (hiisisuo_käytetyt_eventit.includes(event_nro))

    console.log(event_nro)

    hiisisuo_käytetyt_eventit.push(event_nro)

    // Ohjaa valintoihin, jossa pelaaja saa valita mitä tekee.
    switch (event_nro) {
      case 1:
        keijukaistenKuningatar()
        break
      case 2:
        seuraaTulikarpastenValoa()
        break
      case 3:
        suonLumous()
        break
    }
  }
}

// Event 1: Keijukaisten kuningatar
function keijukaistenKuningatar () {
  console.log('1. Keijukaisten kuningatar:')
  textarea.value += '\n\n-Astelet lähemmäksi hiisisuon keijukaiskuningatarta, jonka valo saa koko laakson kimaltelemaan.'
  textarea.scrollTop = textarea.scrollHeight
  // Valinnat
  textarea.value += '\n\n1: Olet täysin lumoutunut, otat yhteyden keijukaiseen!'
  textarea.value += '\n\n2: Pleieri mikä pleieri! Pistät kaiken likoon rohkeasti'
  textarea.scrollTop = textarea.scrollHeight

  valinta1.addEventListener('click', valinta1kuuntelija = async function () {
    textarea.value = ''
    textarea.scrollTop = textarea.scrollHeight
    textarea.value += '\n\n-Valinta 1: Ilmaisit ihailusi kunnioittavasti ja rakkaudella. Keijukainen avaa sydämensä sinulle.'
    textarea.value += '\n\n-Koette lumoavan yön suohiisien valossa. Saat keijukaiselta taitojuomia matkaasi.'
    textarea.scrollTop = textarea.scrollHeight
    for (let i = 0; i < 5; i++) {
      if (pelaaja_inventaario.length < 12) {
        pelaaja_inventaario.push(taitojuoma)
      }
    }
    console.log(pelaaja_inventaario)
    valinta1.style.display = 'none'
    valinta2.style.display = 'none'
  })

  valinta2.addEventListener('click', valinta2kuuntelija = async function () {
    textarea.value = ''
    textarea.scrollTop = textarea.scrollHeight
    textarea.value += '\n\n-Valinta 2: Ilmaisit tunteesi liian rohkeasti, kuningatar säikähtää ja lentää pois.'
    textarea.value += '\n\n-Jäät katsomaan kaunista valoa, sydämesi täyttää suru ja menetit osan voimistasi, itku täyttää silmäkulmasi, elämästäsi kuihtuu 5 HP:ta pois....'
    textarea.scrollTop = textarea.scrollHeight
    pelaaja_olio.pelaaja_hp -= 5
    pelaaja_hp.textContent = pelaaja_olio.pelaaja_hp
    valinta1.style.display = 'none'
    valinta2.style.display = 'none'
  })

}

// Event 2: Seuraa Tulikärpästen Valoa
function seuraaTulikarpastenValoa () {
  console.log('2. Seuraa Tulikärpästen Valoa:')
  textarea.value += '\n\n-Päätät seurata tulikärpästen valoa, jotka tanssivat ilmassa luoden maagista tunnelmaa.'
  // Valinnat
  textarea.value += '\n\n1: Seuraat tulikärpäsiä.'
  textarea.value += '\n\n2: Tulikärpäset johdattelevat sinut eteenpäin'
  textarea.scrollTop = textarea.scrollHeight
  // Näin asetetaan tausta eventille
  paikkatausta.src = '../static/images/eventit/hiisisuo_tulikarpastenvalo.png'

  valinta1.addEventListener('click', valinta1kuuntelija = async function () {
    textarea.value = ''
    textarea.scrollTop = textarea.scrollHeight
    textarea.value += '\n\n-Valinta 1: Onnistuit seuraamaan tulikärpäsiä, ne opastavat sinut piilotetulle aarteelle suohiisien keskellä. Löydät lumoavia esineitä ja voimakasta taikaa. Sait mukaasi eliksiirejä!'
    textarea.scrollTop = textarea.scrollHeight
    for (let i = 0; i < 3; i++) {
      if (pelaaja_inventaario.length < 12) {
        pelaaja_inventaario.push(eliksiiri)
      }
    }
    console.log(pelaaja_inventaario)
    valinta1.style.display = 'none'
    valinta2.style.display = 'none'
  })

  valinta2.addEventListener('click', valinta2kuuntelija = async function () {
    textarea.value = ''
    textarea.scrollTop = textarea.scrollHeight
    textarea.value += '\n\n-Valinta 2: Tulikärpäset johdattavat sinut suohiisin salaiseen paikkaan, tämä oli ansa! Tulikärpäset hyökkäävät kimppuusi ja menetät 5 HP.'
    textarea.scrollTop = textarea.scrollHeight
    pelaaja_olio.pelaaja_hp -= 5
    pelaaja_hp.textContent = pelaaja_olio.pelaaja_hp
    valinta1.style.display = 'none'
    valinta2.style.display = 'none'
  })

}

// Event 3: Suon lumous
function suonLumous () {
  console.log('3. Suon Lumous:')
  textarea.value += '\n\n-Suo lumoaa sinut kauneudella, kuulet kuinka hiidet laulavat kauniita laulujaan piiloissan. Aika poistua, löydätkö suolta pois?'
  // Valinnat
  textarea.value += '\n\n1: Hyppelehdit reunoja pitkin.'
  textarea.value += '\n\n2: Olet uhkarohkea ja hyppelet kiviä pitkin järven läpi'
  textarea.scrollTop = textarea.scrollHeight
  // Näin asetetaan tausta eventille
  paikkatausta.src = '../static/images/eventit/hiisisuo_suonlumous.png'

  valinta1.addEventListener('click', valinta1kuuntelija = async function () {
    textarea.value = ''
    textarea.scrollTop = textarea.scrollHeight
    textarea.value += '\n\n-Valinta 1: Pysyt suon reunoilla ja olet varovainen. Löysit vielä kaikenlisäksi taikasauvan ollessasi extra varovainen!'
    textarea.scrollTop = textarea.scrollHeight
    if (pelaaja_inventaario.length < 12) {
      pelaaja_inventaario.push(taikasauva)
    }
    console.log(pelaaja_inventaario)
    valinta1.style.display = 'none'
    valinta2.style.display = 'none'
  })

  valinta2.addEventListener('click', valinta2kuuntelija = async function () {
    textarea.value = ''
    textarea.scrollTop = textarea.scrollHeight
    textarea.value += '\n\n-Valinta 2: Hyppelehtiessäsi kivillä huomaat salaperäisen portin suossa. Kompastut ja tipahdat suoportista toiseen ulottuvuuteen. Kohtaat painajaisena elämäsi traagisimmat tapahtumat. Menetät 5 HP.'
    textarea.scrollTop = textarea.scrollHeight
    pelaaja_olio.pelaaja_hp -= 5
    pelaaja_hp.textContent = pelaaja_olio.pelaaja_hp
    valinta1.style.display = 'none'
    valinta2.style.display = 'none'
  })

}

// Peli Eventti: Suurentarmon kaupunki
let suurentarmonkaupunki_käytetyt_eventit = []

function suurentarmonKaupunkiEvent () {
  textarea.value = ''
  textarea.scrollTop = textarea.scrollHeight
  textarea.value += '\n\n-Suurentarmon kaupunki on kuin elävä maalaus, jossa turnajaiset herättävät ritarien taidot loistoon. Taikurimarkkinoiden värikkäät kojut houkuttelevat seikkailijoita etsimään mystisiä aarteita. Suurentarmo kutsuu seikkailijoita löytämään oman tarinansa sen monipuolisista tapahtumista ja historiallisista salaisuuksista!'
  textarea.scrollTop = textarea.scrollHeight
  // Arpoo randomilla pelaajalle eventin 1, 2, 3.
  // Tarkista, onko kaikki eventit jo käytetty
  if (suurentarmonkaupunki_käytetyt_eventit.length === 3) {
    // Kaikki eventit on käytetty, ilmoita pelaajalle
    textarea.value += '\n\n-Et löytänyt enää mitään uutta'
    textarea.scrollTop = textarea.scrollHeight
    valinta1.style.display = 'none'
    valinta2.style.display = 'none'
    return // Lopeta funktio
  } else {

    let event_nro
    do {
      event_nro = Math.floor(Math.random() * 3) + 1
    } while (suurentarmonkaupunki_käytetyt_eventit.includes(event_nro))

    console.log(event_nro)

    suurentarmonkaupunki_käytetyt_eventit.push(event_nro)

    // Ohjaa valintoihin, jossa pelaaja saa valita mitä tekee.
    switch (event_nro) {
      case 1:
        turnajaiset()
        break
      case 2:
        taikurimarkkinat()
        break
      case 3:
        uhkapeliOnnenpelikortit()
        break
      default:
        console.log('Virheellinen syöte, valitse uudelleen!')
        break
    }
  }
}

// Event 1: Turnajaiset
function turnajaiset () {
  console.log('1. Turnajaiset:')
  textarea.value += '\n\n-Suurentarmon kaupunki järjestää suuret turnajaiset, joissa ritarien taituruus pääsee loistamaan. Kaupunki on täynnä värikkäitä lippuja ja vilkkaita markkinoita. Voit valita osallistua turnajaisiin tai seurata niitä sivusta.'
  // Valinnat
  textarea.value += '\n\n1: Osallistun turnajaisiin ja haastan toisen ritarin.'
  textarea.value += '\n\n2: Vikittelen turnajaisten prinsessaa'
  textarea.scrollTop = textarea.scrollHeight

  valinta1.addEventListener('click', valinta1kuuntelija = async function () {
    textarea.value = ''
    textarea.scrollTop = textarea.scrollHeight
    textarea.value += '\n-Valinta 1: Osallistut turnajaisiin ja astut kilpakentälle. Heiluttelet mahtipontisesti miekkaasti kohti yleisöä ja haistattelet kilpakumppanillesi, taistelu alkaa!'
    textarea.scrollTop = textarea.scrollHeight
    await avaa_taistelu_ikkuna(await hae_tunnettu_vihollinen(21))  // OHJAA TAISTELUUN RITARIN KANSSA
    valinta1.style.display = 'none'
    valinta2.style.display = 'none'
  })

  valinta2.addEventListener('click', valinta2kuuntelija = async function () {
    textarea.value = ''
    textarea.scrollTop = textarea.scrollHeight
    textarea.value += '\n\n-Valinta 2: Innoissaan turnajaisten tunnelmasta päätät vikitellä turnajaisten prinsessaa, joka seisoo lähellä kuninkaallista katsomoa. Astut esiin ja pyydät häntä mukaan kävelylle kauniille puutarhakäytävälle. Prinsessa hymyilee viehättyneenä ja suostuu. Mennessänne kävelylle selviääkin ettei prinsessa ole oikea prinsessa! Hän ryöstää sinulta esineen...'
    textarea.scrollTop = textarea.scrollHeight
    pelaaja_inventaario.pop() // Poistaa pelaajalta yhden esineen
    valinta1.style.display = 'none'
    valinta2.style.display = 'none'
  })

}

// Event 2: Suurentarmon Taikurimarkkinat
function taikurimarkkinat () {
  console.log('2. Suurentarmon Taikurimarkkinat:')
  textarea.value += '\n\n-Kaupunki on täynnä taikureita ja magian ystäviä. Torilla järjestetään suuret taikurimarkkinat, joissa voit löytää harvinaisia taikakirjoja taikajuomia ja muita salaperäisiä esineitä. Voit valita osallistua markkinoille tai jatkaa matkaasi.'
  // Valinnat
  textarea.value += '\n\n1: Tutkin taikurimarkkinoita ja teen ostoksia.'
  textarea.value += '\n\n2: Seuraat hämärää myyjää pimeälle kujalle'
  textarea.scrollTop = textarea.scrollHeight

  valinta1.addEventListener('click', valinta1kuuntelija = async function () {
    textarea.value = ''
    textarea.scrollTop = textarea.scrollHeight
    textarea.value += '\n\n-Valinta 1: Tutustut taikureiden tarjontaan ja teet muutamia hankintoja. Saat mukaasi taianomaisia esineitä, jotka antavat sinulle taitopisteen.'
    textarea.scrollTop = textarea.scrollHeight
    pelaaja_olio.pelaaja_maksimi_taitopiste += 1
    pelaaja_olio.pelaaja_taitopiste = pelaaja_olio.pelaaja_maksimi_taitopiste
    pelaaja_tp.textContent = pelaaja_olio.pelaaja_taitopiste
    valinta1.style.display = 'none'
    valinta2.style.display = 'none'
  })

  valinta2.addEventListener('click', valinta2kuuntelija = async function () {
    textarea.value = ''
    textarea.scrollTop = textarea.scrollHeight
    textarea.value += '\n\n-Valinta 2: Salaperäinen myyjä yrittää kaupitella sinulle kiellettyjä esineitä. Tunnet luissasi kuinka tilanteessa on jotain mätää ja haluat poistua paikalta. Myyjä vihastuu tästä ja muuttuu demoniksi edessäsi! Tästä alkaa taistelu!'
    textarea.scrollTop = textarea.scrollHeight
    // Tässä haetaan tunnettu vihollinen tietokannasta ja aloitetaan taistelu
    // vihollisen id:n voi tarkistaa tietokannasta
    // Muista await jotta tietokanta haku suoritetaan ennenkuin mennään eteenpäin
    await avaa_taistelu_ikkuna(await hae_tunnettu_vihollinen(24))  // OHJAA TAISTELUUN DEMONIN KANSSA
    valinta1.style.display = 'none'
    valinta2.style.display = 'none'
  })

}

// Event 3: Uhkapeli Onnenpelikortit
function uhkapeliOnnenpelikortit () {
  console.log('3. Uhkapeli Onnenpelikortit:')
  textarea.value += '\n\n-Kaupungin sydämessä sijaitsee vilkas taverna, joka tunnetaan uhkapelaajien kohtauspaikkana. Saavuttuasi tavernaan, huomaat erikoisen pöydän, jossa ihmiset pelaavat kiehtovaa peliä nimeltä Onnenpelikortit. Jokainen pelaaja voi valita yhden pelikortin, joka paljastaa heidän kohtalonsa.'
  textarea.scrollTop = textarea.scrollHeight
  // Valinnat
  textarea.value += '\n\n1: Osallistun Onnenpelikortit-peliin ja valitsen kortin'
  textarea.value += '\n\n2: Päätän olla osallistumatta uhkapeliin ja jatkaa omaa matkaani'
  textarea.scrollTop = textarea.scrollHeight

  valinta1.addEventListener('click', valinta1kuuntelija = async function () {
    textarea.value = ''
    textarea.scrollTop = textarea.scrollHeight
    textarea.value += '\n\n-Valinta 1: Valitset rohkeasti yhden pelikortin ja avaat sen varovasti. Kortti paljastaa, että voitat arvokkaan esineen tai taikavoiman. Tavernan ympärillä kokoontuu ihmisjoukko, ja voittosi herättää huomiota. Onneksi olkoon! Saat lisää taitoa matkaasi. Saavutat myös mainetta tavernassa.'
    textarea.scrollTop = textarea.scrollHeight
    pelaaja_olio.pelaaja_taitopiste += 1
    pelaaja_tp.textContent = pelaaja_olio.pelaaja_taitopiste
    valinta1.style.display = 'none'
    valinta2.style.display = 'none'
  })

  valinta2.addEventListener('click', valinta2kuuntelija = async function () {
    textarea.value = ''
    textarea.scrollTop = textarea.scrollHeight
    textarea.value += '\n\n-Valinta 2: Päätät olla osallistumatta uhkapeliin ja istut muualle nauttimaan juomasta. Kuulet ympärilläsi pelaajien reaktiot, sekä riemunkiljahdukset että pettyneet huokaukset. Jatkat omaa matkaasi miettien, mitä olisi voinut voittaa..'
    textarea.scrollTop = textarea.scrollHeight
    valinta1.style.display = 'none'
    valinta2.style.display = 'none'
  })

}

// Peli Eventti: Peikkoluola
let peikkoluola_käytetyt_eventit = []

function peikkoluola () {
  textarea.value = ''
  textarea.scrollTop = textarea.scrollHeight
  textarea.value += '\n\n-Pimeän metsän kätköissä sijaitseva peikkoluola kuhisee salaisuuksia ja vaaroja. Luola kätkee monta salaisuuttaa uumeniinsa, katsotaan mihin tiet johtavat...'
  textarea.scrollTop = textarea.scrollHeight
  // Arpoo randomilla pelaajalle eventin 1, 2, 3.
  // Tarkista, onko kaikki eventit jo käytetty
  if (peikkoluola_käytetyt_eventit.length === 3) {
    // Kaikki eventit on käytetty, ilmoita pelaajalle
    textarea.value += '\n\n-Et löytänyt enää mitään uutta'
    textarea.scrollTop = textarea.scrollHeight
    valinta1.style.display = 'none'
    valinta2.style.display = 'none'
    return // Lopeta funktio
  } else {

    let event_nro
    do {
      event_nro = Math.floor(Math.random() * 3) + 1
    } while (peikkoluola_käytetyt_eventit.includes(event_nro))

    console.log(event_nro)

    peikkoluola_käytetyt_eventit.push(event_nro)

    // Ohjaa valintoihin, jossa pelaaja saa valita mitä tekee.
    switch (event_nro) {
      case 1:
        peikkokuningas()
        break
      case 2:
        hamahakkikuningatar()
        break
      case 3:
        lohikaarmeenPesa()
        break
    }
  }
}

// Event 1: Peikkokuningas
function peikkokuningas () {
  console.log('1. Peikkokuningas:')
  textarea.value += '\n\n-Seikkailija tutkii peikkoluolaa ja toivoo löytävänsä aarteita, törmäänkö peikkokuninkaaseen? '
  // Valinnat
  textarea.value += '\n\n1: Yrität pysyä piilossa peikkokuninkaalta.'
  textarea.value += '\n\n2: Kohtaat peikkokuninkaan'
  textarea.scrollTop = textarea.scrollHeight

  valinta1.addEventListener('click', valinta1kuuntelija = async function () {
    textarea.value = ''
    textarea.scrollTop = textarea.scrollHeight
    textarea.value += '\n\n-Valinta 1: Pysyt kärsivällisenä ja odotat peikkokuninkaan poistuvan.'
    textarea.value += '\n\n-Näet tilaisuutesi ja pääset hiipimään peikkokuninkaan kätköihin. Varastat peikkokuninkaalta sikspäkin taitojuomia ja hipsit nopeasti karkuun!'
    textarea.scrollTop = textarea.scrollHeight
    for (let i = 0; i < 6; i++) {
      if (pelaaja_inventaario.length < 12) {
        pelaaja_inventaario.push(taitojuoma)
      }
    }
    console.log(pelaaja_inventaario)
    valinta1.style.display = 'none'
    valinta2.style.display = 'none'
  })

  valinta2.addEventListener('click', valinta2kuuntelija = async function () {
    textarea.value = ''
    textarea.scrollTop = textarea.scrollHeight
    textarea.value += '\n\n-Valinta 2: Rohkeana seikkailijana päätät kohdata peikkokuninkaan suoraan. Astut esiin varjoista ja seisot hänen edessään. Peikkokuningas nauraa mahtipontisesti ja haastaa sinut taisteluun!'
    textarea.scrollTop = textarea.scrollHeight
    await avaa_taistelu_ikkuna(await hae_tunnettu_vihollinen(20)) // OHJAA TAISTELUUN PEIKKOKUNINKAAN KANSSA
    valinta1.style.display = 'none'
    valinta2.style.display = 'none'
  })

}

// Event 2: Hämähäkkikuningatar
function hamahakkikuningatar () {
  console.log('2. Hämähäkkikuningatar:')
  textarea.value += '\n\n-Syvimmän kammion pimeimmässä nurkassa seikkailija kohtaa hämähäkkikuningattaren, joka vartioi kultaisia silkkisiä aarteitaan.'
  // Valinnat
  textarea.value += '\n\n1: Päätät kohdata hämähäkkikuningattaren!'
  textarea.value += '\n\n2: Sytytät hämähäkinseitit tuleen ja pakenet'
  textarea.scrollTop = textarea.scrollHeight

  valinta1.addEventListener('click', valinta1kuuntelija = async function () {
    textarea.value = ''
    textarea.scrollTop = textarea.scrollHeight
    textarea.value += '\n\n-Valinta 1: Astut rohkeasti eteenpäin ja kohtaat kuningattaren.'
    textarea.value += '\n\n-Hämähäkkikuningatar tunnistaa rohkeutesi ja arvostaa että uskalsit astua hänen eteensä.'
    textarea.value += '\n\n-Kuningatar kietoo sinulle seitistä taistelun kestävät hanskat ja iskuvoimasi kasvaa!'
    textarea.scrollTop = textarea.scrollHeight
    pelaaja_olio.pelaaja_isku += 1
    valinta1.style.display = 'none'
    valinta2.style.display = 'none'
  })

  valinta2.addEventListener('click', valinta2kuuntelija = async function () {
    textarea.value = ''
    textarea.scrollTop = textarea.scrollHeight
    textarea.value += '\n\n-Valinta 2: Päätät turvautua äärimmäiseen toimenpiteeseen ja sytytät hämähäkinseitit tuleen.'
    textarea.value += '\n\n-Kammiossa roihahtaa liekit, hämähäkkikuningatar kiroaa sinut ja menetät 5 HP. Kuulet vaikeroivat tuskan huudot takanasi kun pakenet luolasta…'
    textarea.scrollTop = textarea.scrollHeight
    pelaaja_olio.pelaaja_hp -= 5
    pelaaja_hp.textContent = pelaaja_olio.pelaaja_hp
    valinta1.style.display = 'none'
    valinta2.style.display = 'none'
  })

}

// Event 3: Lohikäärmeen Pesä
function lohikaarmeenPesa () {
  console.log('3. Lohikäärmeen Pesä:')
  textarea.value += '\n\n-Peikkoluolan uumeniin kätkeytyy lohikäärmeen pesä, jonka peikot ovat vanginneet kahleisiin. Löydätkö lohikäärmeen?'
  // Valinnat
  textarea.value += '\n\n1: Lähdet etsimään lohikäärmeen pesää ja aarteita!'
  textarea.value += '\n\n2: Et uskalla lähteä luolaan, vaan jatkat muita seikkailuja kohti päämäärää'
  textarea.scrollTop = textarea.scrollHeight

  valinta1.addEventListener('click', valinta1kuuntelija = async function () {
    textarea.value = ''
    textarea.scrollTop = textarea.scrollHeight
    textarea.value += '\n\n-Valinta 1: Astut varoen kohti luolaa, jossa lohikäärme piileskelee.'
    textarea.value += '\n\n-Päätät olla rohkea ja vapautat lohikäärmeen kahleista. Lohikäärme syöksee tulta vapautuessaan, mutta yllättäen lohikäärme heltyy ja antaa kiitokseksi osan aarteistaan, mukaan lukien maagisia eliksiirejä.'
    textarea.scrollTop = textarea.scrollHeight
    for (let i = 0; i < 3; i++) {
      if (pelaaja_inventaario.length < 12) {
        pelaaja_inventaario.push(eliksiiri)
      }
    }
    console.log(pelaaja_inventaario)
    valinta1.style.display = 'none'
    valinta2.style.display = 'none'
  })

  valinta2.addEventListener('click', valinta2kuuntelija = async function () {
    textarea.value = ''
    textarea.scrollTop = textarea.scrollHeight
    textarea.value += '\n\n-Valinta 2: Päätät olla ottamatta riskiä ja jatkaa seikkailujasi.'
    textarea.value += '\n\n-Pian kuulet, että joku toinen rohkea seikkailija on lähtenyt lohikäärmeen pesälle ja saanut haltuunsa uskomattomia aarteita. Kieltämättä vituttaa eikö, mutta matkan on jatkuttava...'
    textarea.scrollTop = textarea.scrollHeight
    valinta1.style.display = 'none'
    valinta2.style.display = 'none'
  })

}
