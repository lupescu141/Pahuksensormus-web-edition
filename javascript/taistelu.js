

// Luodaan random viholliselle olio muuttuja
let random_vihollinen

//hakee elementit
const vihollinen_nimi = document.getElementById('vihollinen_nimi');
const vihollinen_hp =document.getElementById('vihollinen-hp');
const taisteluloki = document.getElementById("taistelu-loki");
const pelaaja_hp = document.getElementById("pelaaja-hp")

// Haetaan random vihollinen
async function hae_random_vihollinen_tietokannasta() {
  // Hakee Flask tietokannasta random vihollisen
  random_vihollinen = await fetch('http://localhost:5000/hae_random_vihollinen');
  random_vihollinen = await random_vihollinen.json();

  document.getElementById('vihollinen_nimi').textContent = random_vihollinen.vihollinen_nimi;
  vihollinen_hp.textContent = random_vihollinen.vihollinen_hp;
  document.querySelector(".vihollinen-kuva").style.backgroundImage = `url("../static/images/viholliset/${random_vihollinen.vihollinen_nimi.toLocaleLowerCase()}.png")`;

  return random_vihollinen;
}

const taistelu = async () => {

  //hakee random vihollisen
  let vihollinen = await hae_random_vihollinen_tietokannasta();

  //hakee taisteluvalikon napit
    const hyokkaa = document.getElementById("hyokkaa");
    const taito1 = document.getElementById("taito1");
    const taito2 = document.getElementById("taito2");
    const taito3 = document.getElementById("taito3");
    const esine1 = document.getElementById("esine1");
    const esine2 = document.getElementById("esine2");
    const esine3 = document.getElementById("esine3");


    if (parseInt(pelaaja_olio.pelaaja_hp) <= 0) {
    }

    if (vihollinen.vihollinen_hp <= 0){
    }

    hyokkaa.addEventListener("click", ()=> {

        if (pelaaja_olio.pelaaja_hp > 0) {

            const isku_osuma = (Math.floor(Math.random() * 21) + 1) + 2;

            if (isku_osuma >= vihollinen.vihollinen_suojaus) {
                const isku = (Math.floor(Math.random() * pelaaja_olio.pelaaja_isku) + 1) + 2;
                vihollinen.vihollinen_hp -= isku

                taisteluloki.value += `\nTeit viholliseen ${isku} vahinkoa!`
                taisteluloki.scrollTop = taisteluloki.scrollHeight;
                vihollinen_hp.textContent = vihollinen.vihollinen_hp;
            }

            else {
                taisteluloki.value += `\n${vihollinen.vihollinen_nimi} väisti iskusi!`
                taisteluloki.scrollTop = taisteluloki.scrollHeight;
            }

            vihollisen_vuoro(vihollinen)
        }
    })
}

const vihollisen_vuoro = (vihollinen) => {

    if (vihollinen.vihollinen_hp > 0){

        const isku_osuma = (Math.floor(Math.random() * 21) + 1) + 2;

        if (isku_osuma >= pelaaja_olio.pelaaja_suojaus) {
                const isku = (Math.floor(Math.random() * vihollinen.vihollinen_isku) + 1) + 2;
                pelaaja_olio.pelaaja_hp -= isku

                taisteluloki.value += `\n${vihollinen.vihollinen_nimi} teki sinuun ${isku} vahinkoa!`
                taisteluloki.scrollTop = taisteluloki.scrollHeight;
                pelaaja_hp.innerHTML = pelaaja_olio.pelaaja_hp;
            }

        else {
                taisteluloki.value += `\nVäistit vihollisen iskun!`
                taisteluloki.scrollTop = taisteluloki.scrollHeight;
        }
    }
}

