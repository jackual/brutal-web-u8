onload = async () => {
    const svg = await fetch("svg/v2.svg")
        .then(i => i.text())
        .then(i => {
            parser = new DOMParser()
            return parser.parseFromString(i, "text/xml")
                .querySelector("svg")
        })
    document.getElementById("bg").appendChild(svg)
}

const move = (up, diff) => {
    const images = [...document.querySelectorAll("use")]
    images.map((i, j) => {
        const original = i.attributes.transform.value,
            y = Number(original.match(/translate.*? ([0-9.]+)/)[1])
        i.attributes.transform.value = original.replace(y, y * (up ? 1 + diff : 1 - diff))
    })

}

onwheel = e => {
    move(e.deltaY > 0, 0.002)
}