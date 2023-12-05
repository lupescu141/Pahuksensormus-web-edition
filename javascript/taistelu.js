function taistelu_testi() {
  document.querySelector('.vasen-puoli').style.display = 'none';
  document.querySelector('.oikea-puoli').style.display = 'none';
  document.querySelector('.vasen-puoli-taistelu').style.display = 'block';
  document.querySelector('.oikea-puoli-taistelu').style.display = 'block';

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
