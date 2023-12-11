const aloita_peli_napit = document.querySelectorAll('.aloita-peli');

aloita_peli_napit.forEach((nappi) => {
  nappi.addEventListener('click', () => {
    // Tässä voit asettaa toiminnallisuuden, joka suoritetaan napin klikkauksen yhteydessä
    console.log('Painoit aloita-peli nappia!');
    aseta_matkustus_paivat()
  });
});
