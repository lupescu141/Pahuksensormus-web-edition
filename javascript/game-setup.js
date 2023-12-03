// Start new game new player name
document.querySelector('#player-form').addEventListener('submit', function (evt) {
  evt.preventDefault();
  const pelaaja_nimi = document.querySelector('#player-input').value;
  document.querySelector('#player-modal').style.display='none';
});