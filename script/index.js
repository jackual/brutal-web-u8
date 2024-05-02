const images = {
    map(fn) {
        return [...document.querySelectorAll("use")].map(fn)
    },
    regex(use) {
        const original = use.attributes.transform.value,
            regex = original.match(/translate\(([-0-9.]+) ([-0-9.]+)/),
            x = parseFloat(regex[1]),
            y = parseFloat(regex[2])
        return { x, y }
    },
    stamp(use) {
        this.map(i => {
            const coords = this.regex(i)
            Object.entries(coords).map(x => {
                i.setAttribute("data-" + x[0], x[1])
            })
        })
    }
}

onload = async () => {
    const svg = await fetch("svg/v2.svg")
        .then(i => i.text())
        .then(i => {
            parser = new DOMParser()
            return parser.parseFromString(i, "text/xml")
                .querySelector("svg")
        })
    document.getElementById("bg").appendChild(svg)
    images.stamp()
}