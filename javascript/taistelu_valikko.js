// Avaa taistelu näkymän. pelaaja-status siirretään alaspäin jotta arvot pysyvät samoina
function avaa_taistelu_ikkuna() {
  // Asettaa oikean puolen taistelu näkymään
  document.querySelector('.oikea-puoli').style.display = 'none';
  document.querySelector('.oikea-puoli-taistelu').style.display = 'block';

  // Tallennetaan muuttujat jotta voidaan siirtää pelaaja status taistelu riville
  const pelaaja_status = document.querySelector('.pelaaja-status');
  const taistelu_rivi = document.querySelector('.taistelu-rivi');

  // Piilota Lepää ja Esineet napit status ikkunasta
  const napit = pelaaja_status.querySelectorAll('.nappi');
  napit.forEach(nappi => {
    nappi.style.display = 'none';
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
  taistelu();
}


// Sulkee taistelu näkymän. Siirretään pelaajan status takaisin ylös
function lopeta_taistelu() {
  // Asetetaan oikea puoli kartta näkymään
  document.querySelector('.oikea-puoli-taistelu').style.display = 'none';
  document.querySelector('.oikea-puoli').style.display = 'flex';

  // Tallennetaan muuttujat jotta voidaan siirtää pelaaja status ylemmälle riville
  const pelaaja_status = document.querySelector('.pelaaja-status');
  const pelaaja_info = document.querySelector('.pelaaja-info');

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
  document.querySelectorAll('.taistelu-valikko-nappi, .isku-nappi').
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
}
