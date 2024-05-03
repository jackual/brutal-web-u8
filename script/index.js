const images = {
    map(fn) {
        return [...document.querySelectorAll("use")].map(fn)
    },
    regex(use) {
        const original = use.attributes.transform.value,
            regex = original.match(/translate\(([-0-9.]+) ([-0-9.]+)/),
            x = parseFloat(regex[1]),
            y = parseFloat(regex[2]),
            dataX = parseFloat(use.getAttribute("data-x")),
            dataY = parseFloat(use.getAttribute("data-y"))
        return { x, y, dataX, dataY }
    },
    stamp(use) {
        this.map(i => {
            const coords = this.regex(i)
            Object.entries(coords).map(x => {
                i.setAttribute("data-" + x[0], x[1])
            })
        })
    },
    move(use, fn) {
        const data = this.regex(use)
        const output = fn(data, use)
        use.attributes.transform.value = use
            .attributes
            .transform
            .value
            .replace(data.x, output.x)
            .replace(data.y, output.y)
    },
    moveAll(fn) {
        images.map(image => {
            images.move(image, fn)
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

onmousemove = mouse => {
    images.moveAll((data, element) => {
        const clientRect = element.getBoundingClientRect()
        const div = element.getAttribute("xlink:href") == "#image-2" ? 500 : 3000
        const distanceY = ((mouse.clientY - data.dataY) ** 2) / div//2.086956
        return { x: data.dataX, y: data.dataY - distanceY }
        //get centre of element
        //calculate distance to mouse pointer
        //find percent of total screen width
        //move based off of this
    })
}