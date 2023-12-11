
const tulipallo = () => {

    const vahinko_arvo = (Math.floor(Math.random() * 7) + 1) + (Math.floor(Math.random() * 7) + 1) + 2;
    pelaaja_olio.taitopiste -= 1;
    vihollinen.vihollinen_hp -= vahinko_arvo;
    taisteluloki.value += `\nTulipallo käristi ${vahinko_arvo} elämäpistettä viholliselta.`
}

const palava_nuoli = () => {
    const vahinko_arvo = (Math.floor(Math.random() * 7) + 1) + 2;
    vihollinen.vihollinen_hp -= vahinko_arvo;
    taisteluloki.value += `\nAmmut palavan nuolen.`
    taisteluloki.value += `\nPalavaa nuoli lävistää ja sytyttää vihollisen palamaan 2 vuoroksi.`
}