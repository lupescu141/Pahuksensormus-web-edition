

// Luodaan random viholliselle olio muuttuja
let random_vihollinen

//hakee elementit
const vihollinen_nimi = document.getElementById('vihollinen_nimi');
const vihollinen_hp =document.getElementById('vihollinen-hp');

// Haetaan random vihollinen
async function hae_random_vihollinen_tietokannasta() {
  // Hakee Flask tietokannasta random vihollisen
  random_vihollinen = await fetch('http://localhost:5000/hae_random_vihollinen');
  random_vihollinen = await random_vihollinen.json();

  document.getElementById('vihollinen_nimi').textContent = random_vihollinen.vihollinen_nimi;
  document.getElementById('vihollinen-hp').textContent = random_vihollinen.vihollinen_hp;

  return random_vihollinen;
}


const taistelu = async () => {
  //hakee taistelulokin tekstialueen
  const taisteluloki = document.getElementById("taistelu-loki");

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
                vihollinen_hp.innerHTML = vihollinen.vihollinen_hp;
            }

            else {
                taisteluloki.value += `\n${vihollinen.vihollinen_nimi} väisti iskusi!`
                taisteluloki.scrollTop = taisteluloki.scrollHeight;
            }
        }
    })

}

const vihollisen_vuoro = () => {

    if (vihollinen.vihollinen_hp > 0){

    }
}

