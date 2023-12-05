// Aloitetaan taistelu. pelaaja-status siirretään alaspäin jotta arvot pysyvät samoina
function taistelu_testi() {
  document.querySelector('.vasen-puoli').style.display = 'none';
  document.querySelector('.oikea-puoli').style.display = 'none';
  document.querySelector('.vasen-puoli-taistelu').style.display = 'block';
  document.querySelector('.oikea-puoli-taistelu').style.display = 'block';

  const pelaaja_status = document.querySelector('.pelaaja-status');
  const taistelu_rivi = document.querySelector('.taistelu-rivi');

  // Piilota napit
  const napit = pelaaja_status.querySelectorAll('.nappi');
  napit.forEach(nappi => {
    nappi.style.display = 'none';
  });

  // Lisää pelaaja_status taistelu_rivi:n ensimmäiseksi lapseksi
  taistelu_rivi.insertBefore(pelaaja_status, taistelu_rivi.firstChild);
}

// Kun taistelu loppuu siirretään pelaajan status takaisin
function lopeta_taistelu() {
  document.querySelector('.vasen-puoli-taistelu').style.display = 'none';
  document.querySelector('.oikea-puoli-taistelu').style.display = 'none';
  document.querySelector('.vasen-puoli').style.display = 'flex';
  document.querySelector('.oikea-puoli').style.display = 'flex';

  const pelaaja_status = document.querySelector('.pelaaja-status');
  const pelaaja_info = document.querySelector('.pelaaja-info');

  // Piilota napit
  const napit = pelaaja_status.querySelectorAll('.nappi');
  napit.forEach(nappi => {
    nappi.style.display = 'block';
  });

  // Lisää pelaaja_status taistelu_rivi:n ensimmäiseksi lapseksi
  pelaaja_info.appendChild(pelaaja_status);
}

function naytaValikko(valikko) {
  piilotaKaikkiNapit();
  document.querySelectorAll(`.${valikko}`).forEach(nappi => {
    nappi.style.display = 'block';
  });
  document.getElementById('palaa').style.display = 'block';
}

function piilotaKaikkiNapit() {
  document.querySelectorAll('.taistelu-valikko-nappi, .isku-nappi').
      forEach(nappi => {
        nappi.style.display = 'none';
      });
}

function palaa() {
  piilotaKaikkiNapit();
  document.querySelectorAll('.taistelu-valikko-nappi').forEach(nappi => {
    nappi.style.display = 'block';
  });
}
