// Avaa taistelu näkymän. pelaaja-status siirretään alaspäin jotta arvot pysyvät samoina
async function avaa_taistelu_ikkuna() {
  // Asettaa oikean puolen taistelu näkymään
  document.querySelector('.oikea-puoli').style.display = 'none';
  document.querySelector('.oikea-puoli-taistelu').style.display = 'block';


  // Piilota Lepää ja Esineet napit status ikkunasta
  document.querySelector(".esine-napit").style.display = 'none';
  const napit = pelaaja_status.querySelectorAll('.nappi');
  napit.forEach(nappi => {
    nappi.style.display = 'none';

    // Avaa taisteluvalikon napit
    document.querySelectorAll('.taistelu-valikko-nappi').forEach(nappi => {
      nappi.style.display = 'block';
    });

    jatka.style.display = 'none'
  });

  // Tuodaan vihollisen kuva esiin pelaajan viereen
  document.querySelector('.vihollinen-kuva').style.display = 'flex'
  // Piilotetaan loki
  document.querySelector('.loki').style.display = 'none'
  // Lokin tilalle taistelu rivi
  document.querySelector('.taistelu-rivi').style.display = 'flex'

  // Lisää pelaaja_status taistelu_rivi:n ensimmäiseksi lapseksi
  taistelu_rivi.insertBefore(pelaaja_status, taistelu_rivi.firstChild);

  // Testausta varten
  await taistelu();
}


// Sulkee taistelu näkymän. Siirretään pelaajan status takaisin ylös
function lopeta_taistelu() {
  //sulkee jatka napin taisteluvalikosta
  jatka.style.display = 'none';

  // Asetetaan oikea puoli kartta näkymään
  document.querySelector('.oikea-puoli-taistelu').style.display = 'none';
  document.querySelector('.oikea-puoli').style.display = 'flex';



  // Tuodaan Lepää ja Esineet napit esiin status näkymään
  const napit = pelaaja_status.querySelectorAll('.nappi');
  napit.forEach(nappi => {
    nappi.style.display = 'block';
  });

  // Piilotetaan vihollisen kuva
  document.querySelector('.vihollinen-kuva').style.display = 'none'
  // Tuodaan Loki esiin
  document.querySelector('.loki').style.display = 'flex'
  // Piilotetaan taistelurivi
  document.querySelector('.taistelu-rivi').style.display = 'none'

  // Lisää pelaaja_status ylärivin viimeiseksi lapseksi
  pelaaja_info.appendChild(pelaaja_status);
}


// Avaa halutun ala-valikon taistelussa
function nayta_valikko(valikko) {
  // Piilotaa ensin kaikki napit
  piilota_kaikki_napit();
  // Avaa halutut napit
  document.querySelectorAll(`.${valikko}`).forEach(nappi => {
    nappi.style.display = 'block';
  });
  document.getElementById('palaa').style.display = 'block';
}


// Piilottaa kaikki napit taistelu valikosta
function piilota_kaikki_napit() {
  document.querySelector(".esine-napit").style.display = 'none';

  taito_napit.forEach((nappi)=> {
    nappi.style.display = 'none';
  })

  document.querySelectorAll('.taistelu-valikko-nappi, .isku-nappi, .jatka-nappi').
      forEach(nappi => {
        nappi.style.display = 'none';
      });
}


// Palaa ala-valikosta taistelu valikkoon
function palaa() {
  // Piilotaa ensin kaikki napit
  piilota_kaikki_napit();
  // Avaa taisteluvalikon napit
   document.querySelectorAll('.taistelu-valikko-nappi').forEach(nappi => {
    nappi.style.display = 'block';
  });

   jatka.style.display = 'none';
}
