const images = {
    map(fn) {
        return [...document.querySelectorAll("use")].map(fn)
    },
    regex(use, isOriginal = false) {
        const original = use.attributes.transform.value,
            regex = original.match(/translate\(([-0-9.]+) ([-0-9.]+)/),
            x = parseFloat(regex[1]),
            y = parseFloat(regex[2]),
            dataX = parseFloat(use.getAttribute("data-x" + (isOriginal ? "-original" : ""))),
            dataY = parseFloat(use.getAttribute("data-y" + (isOriginal ? "-original" : "")))
        return { x, y, dataX, dataY }
    },
    stamp(use) {
        const stretchHeight = (window.innerHeight / (window.innerWidth / 1920))
        document.querySelector("svg").setAttribute("viewBox", `0 0 1920 ${(stretchHeight)}`)
        //might need to above if more than one svg
        images.map(i => {
            const coords = images.regex(i, true)
            coords.y = coords.y * (stretchHeight / 1080)
            i.setAttribute("data-x", coords.x)
            i.setAttribute("data-y", coords.y)
            images.move(i, () => coords)

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
    const animation = () => images.map((image, j) => {
        image.style.display = "none"
        const coords = images.regex(image)
        image.setAttribute("data-x-original", coords.x)
        image.setAttribute("data-y-original", coords.y)
        setTimeout(() => {
            image.style.display = "unset"
        }, j * 35)
    })
    animation()
    document.onscroll = () => {
        if (window.scrollY == 0)
            animation()
    }
    images.stamp();

    [...document.querySelectorAll("p")].map(x => {
        x.setAttribute("data-splitting", "")
    });

    [...document.querySelectorAll("marquee")].map(x => {
        x.innerText = (x.innerText + " // ").repeat("30")
        x.setAttribute("scrollamount", String(parseInt(10 + (Math.random() * 15))))
    })
    Splitting();

    [...document.querySelectorAll("button")].map(i => {
        i.onclick = x => {
            newWindow({
                title: x.target.innerText,
                toolWindow: false,
                resizable: true,
                content: `pages/${x.target.id}.html`,
                xhr: true,
                close: () => {
                    //add animation()
                }
            })
        }
    })
    //todo: fix splitting
}

onmousemove = mouse => {
    images.moveAll((data, element) => {
        const clientRect = element.getBoundingClientRect(),
            div = element.getAttribute("xlink:href") == "#image-2" ? 1000 : 3000,
            distanceY = ((mouse.clientY - data.dataY) ** 2) / div //2.086956
        return { x: data.dataX, y: data.dataY - distanceY }
        //get centre of element
        //calculate distance to mouse pointer
        //find percent of total screen width
        //move based off of this
    })
}
