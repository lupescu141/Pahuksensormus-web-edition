// Avaa taistelu näkymän. pelaaja-status siirretään alaspäin jotta arvot pysyvät samoina
function avaa_taistelu_ikkuna() {
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

// Avaa halutun ala-valikon
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
