const images = {
    map(fn) {
        return [...document.querySelector("#bg").querySelectorAll("use")].map(fn)
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

let counter = 0

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

    const config = {
        examples: {
            status: "　"
        },
        debate: {
            onload: async () => {
                const svg = await fetch("svg/gbu2.svg")
                    .then(i => i.text())
                    .then(i => {
                        let parser = new DOMParser()
                        return parser.parseFromString(i, "text/xml")
                            .querySelector("svg")
                    }),
                    div = document.getElementById("kennington")
                div.appendChild(svg);
                [...div.querySelectorAll("use")].map((i, j) => {
                    i.style.display = "none"
                    setTimeout(() => {
                        i.style.display = "unset"
                    }, (j + 1) * 59)
                })
            }
        },
        research: {
            onload: () => {
                const data = [
                    {
                        name: 'Activity',
                        desc: 'Activity-passivity: In a two-dimensional and static space dynamism or the sensation of movement can be achieved (through diagonals, distortions, saturated colours or typographical contrast): in short, activity. At the other extreme, passivity seeks to transmit a sensation of absolute repose. It is usually linked to techniques with similar objectives, like neutrality, reticence or economy, among others.',
                        img: 'img/charts/activity.png',
                        table: '<table class="interactive">  <thead>      <tr>          <th>Activity (%)</th><th>Passivity</th><th>Activity</th>      </tr>  </thead>  <tbody>      <tr>      <td>Alexa Ranking</td><td>37</td><td>63</td>      </tr>      <tr>      <td>Brutalist Websites</td><td>68</td><td>32</td>      </tr>  </tbody></table>'
                    },
                    {
                        name: 'Balance',
                        desc: 'Symmetry-asymmetry: These are really two formulas to represent balance. While symmetrical balance is the static formula par excellence, asymmetry is obtained when the elements move away from the axis and give way to new relationships of more dynamic forces. Symmetry and asymmetry (as alternatives therefore to static and dynamic equilibrium respectively) and instability (the absence of balance) constitute therefore three options for representing the distribution of forces from levelling or sharpening.',
                        img: 'img/charts/balance.png',
                        table: '<table class="interactive">  <thead>      <tr>          <th>Balance (%)</th><th>Symmetry</th><th>Asymmetry</th><th>Instability</th>      </tr>  </thead>  <tbody>      <tr>      <td>Alexa Ranking</td><td>52.5</td><td>47.5</td><td>0</td>      </tr>      <tr>      <td>Brutalist Websites</td><td>12</td><td>54</td><td>34</td>      </tr>  </tbody></table>'
                    },
                    {
                        name: 'Coherence',
                        desc: 'Coherence-variation: In coherence, the elements are governed by one and the same formal criterion and some uniform visual features. Its opposite, variation, is the technique whose elements admit original changes and modifications.',
                        img: 'img/charts/coherence.png',
                        table: '<table class="interactive">  <thead>      <tr>          <th>Coherence</th><th>Coherence</th><th>Variation</th>      </tr>  </thead>  <tbody>      <tr>      <td>Alexa Ranking</td><td>29</td><td>10</td>      </tr>      <tr>      <td>Brutalist Websites</td><td>15</td><td>5</td>      </tr>  </tbody></table>'
                    },
                    {
                        name: 'Continuity',
                        desc: 'Continuity-episodicity: Continuity is defined by the existence of links and connections between the elements. In episodicity there is no proximity between the pieces, whose individual nature is reinforced by the dispersion of the parts.',
                        img: 'img/charts/countinuity.png',
                        table: '<table class="interactive">  <thead>      <tr>          <th>Continuity</th><th>Continuity</th><th>Episodicity</th>      </tr>  </thead>  <tbody>      <tr>      <td>Alexa Ranking</td><td>34</td><td>4</td>      </tr>      <tr>      <td>Brutalist Websites</td><td>16</td><td>4</td>      </tr>  </tbody></table>'
                    },
                    {
                        name: 'Depth',
                        desc: 'Depth-flatness: On two-dimensional surfaces depth offers a three-dimensional sense, while flatness refers to the total absence of perspective in a composition. They are usually the basic criteria of visual trends such as skeuomorphism and flat design, respectively.',
                        img: 'img/charts/flatness.png',
                        table: '<table class="interactive">  <thead>      <tr>          <th>Depth</th><th>Flatness</th><th>Depth</th>      </tr>  </thead>  <tbody>      <tr>      <td>Alexa Ranking</td><td>32</td><td>7</td>      </tr>      <tr>      <td>Brutalist Websites</td><td>12</td><td>2</td>      </tr>  </tbody></table>'
                    },
                    {
                        name: 'Greyscale',
                        desc: 'Use of greyscale colour palette.',
                        img: 'img/charts/greyscale.png',
                        table: '<table class="interactive">  <thead>      <tr>          <th>Greyscale</th><th>Greyscale</th><th>Colour</th>      </tr>  </thead>  <tbody>      <tr>      <td>Alexa Ranking</td><td>0</td><td>100</td>      </tr>      <tr>      <td>Brutalist Websites</td><td>36</td><td>64</td>      </tr>  </tbody></table>'
                    },
                    {
                        name: 'Regularity',
                        desc: 'Regularity-Irregularity: Compositional regularity is based on uniformity and homogeneity of the elements which make up the piece. Visual resolution is organised, following a pre-established pattern, and usually stems from a uniform space via a clearly defined grid. Irregularity is based, on the other hand, on diversity and on a visible plan of distribution to reinforce the surprising, unusual and dynamic feature.',
                        img: 'img/charts/regularity.png',
                        table: '<table class="interactive">  <thead>      <tr>          <th>Regularity</th><th>Regularity</th><th>Irregularity</th>      </tr>  </thead>  <tbody>      <tr>      <td>Alexa Ranking</td><td>32</td><td>8</td>      </tr>      <tr>      <td>Brutalist Websites</td><td>5</td><td>20</td>      </tr>  </tbody></table>'
                    },
                    {
                        name: 'Sequentiality',
                        desc: 'Sequentiality-randomness: Sequentiality seeks to establish a logical order or rhythmic pattern from the elements and is usually used to explain developments or changes. In a given visual composition it is a synonym of hierarchy. Randomness, however, suggests a certain disorganisation of the elements.',
                        img: 'img/charts/sequentiality.png',
                        table: '<table class="interactive">  <thead>      <tr>          <th>Sequentiality</th><th>Sequentiality</th><th>Randomness</th>      </tr>  </thead>  <tbody>      <tr>      <td>Alexa Ranking</td><td>32</td><td>6</td>      </tr>      <tr>      <td>Brutalist Websites</td><td>3</td><td>11</td>      </tr>  </tbody></table>'
                    },
                    {
                        name: 'Sharpness',
                        desc: 'Sharpness-diffusiveness: Sharpness strengthens the outlines and fixes the composition through definition, clarity and precision of the units’ features. Diffusiveness aims for a softer or more blurred definition of the elements.',
                        img: 'img/charts/sharpness.png',
                        table: '<table class="interactive">  <thead>      <tr>          <th>Sharpness</th><th>Sharpness</th><th>Diffusiveness</th>      </tr>  </thead>  <tbody>      <tr>      <td>Alexa Ranking</td><td>24</td><td>14</td>      </tr>      <tr>      <td>Brutalist Websites</td><td>4</td><td>3</td>      </tr>  </tbody></table>'
                    },
                    {
                        name: 'Simplicity',
                        desc: 'Simplicity-complexity: Simplicity seeks an immediate, clear and direct solution, free of superfluous elements and useless additions. Complexity, on the other hand, is created through the use of numerous units and elements (usually) and from an implausible structure which gives rise to intricate visual schemata.',
                        img: 'img/charts/simplicity.png',
                        table: '<table class="interactive">  <thead>      <tr>          <th>Simplicity (%)</th><th>Simplicity</th><th>Complexity</th>      </tr>  </thead>  <tbody>      <tr>      <td>Alexa Ranking</td><td>63</td><td>37</td>      </tr>      <tr>      <td>Brutalist Websites</td><td>66</td><td>34</td>      </tr>  </tbody></table>'
                    },
                    {
                        name: 'Singularity',
                        desc: 'Singularity-juxtaposition: Singularity is a composition based on the absolute protagonism of one of its components which eclipses the others and forms the main point of the message. Juxtaposition, for its part, is based on the complementarity of two or more of the composition’s units which contain similar relevance and acquire a mutual dependency in order to give meaning to the image.',
                        img: 'img/charts/singularity.png',
                        table: '<table class="interactive">  <thead>      <tr>          <th>Singularity</th><th>Singularity</th><th>Juxtaposition</th>      </tr>  </thead>  <tbody>      <tr>      <td>Alexa Ranking</td><td>26</td><td>12</td>      </tr>      <tr>      <td>Brutalist Websites</td><td>6</td><td>4</td>      </tr>  </tbody></table>'
                    },
                    {
                        name: 'Webfonts',
                        desc: 'Use of external webfonts.',
                        img: 'img/charts/webfonts.png',
                        table: '<table class="interactive">  <thead>      <tr>          <th>Webfonts</th><th>Webfonts</th><th>System Fonts</th>      </tr>  </thead>  <tbody>      <tr>      <td>Alexa Ranking</td><td>85</td><td>15</td>      </tr>      <tr>      <td>Brutalist Websites</td><td>28</td><td>72</td>      </tr>  </tbody></table>'
                    }
                ]


                console.log(data.length);

                [...document.querySelectorAll("[role=tablist]")].map(tablist => {
                    const tabs = tablist.querySelectorAll("[role=tab]");
                    [...tabs].map((tab, index) => {
                        tab.onclick = event => {
                            const aria = "aria-selected";

                            [...tabs].map(x => x.removeAttribute(aria))

                            let el
                            if (event.target.localName == "li")
                                el = event.target
                            else el = event.target.parentElement

                            el.setAttribute(aria, "true")

                            const tabpanel = el
                                .parentElement
                                .parentElement
                                .querySelector("[role=tabpanel]")

                            tabpanel.querySelector(".show").classList.remove("show")

                            tabpanel.children[index].classList.add("show")
                        }
                    })
                });

                let select = document.querySelector("#vcs select")

                data.forEach(i => {
                    let el = document.createElement("option")
                    el.innerText = i.name
                    select.appendChild(el)
                })

                const updateVcs = name => {
                    const row = data.filter(i => i.name == name)[0],
                        img = document.querySelector("#vcs img")
                    img.setAttribute("src", row.img)
                    img.setAttribute("alt", `${row.name} Graph`)
                    document.querySelector("#vcs textarea").value = row.desc
                    document.querySelector("#tt").innerHTML = row.table
                }

                select.onchange = () => { updateVcs(select.value) }

                updateVcs(data[1].name)
            }
        }
    };

    [...document.querySelectorAll("button")].map(i => {
        i.innerHTML = `<img src="img/ico/${i.id}.png" /> ${i.innerHTML}`
        i.onclick = x => {
            newWindow(Object.assign({
                title: x.target.innerText,
                toolWindow: false,
                resizable: true,
                content: `pages/${x.target.id}.html`,
                id: x.target.id,
                type: "xhr",
                top: (window.innerWidth / 8) + (counter * 15),
                left: (window.innerHeight / 8) + (counter * 15),
                width: 400,
                close: () => {
                    counter--
                }
            }, config[x.target.id] || {}))
            counter++
        }
        i.onmouseover = x => x.target.classList.add("default")
        i.onmouseout = x => x.target.classList.remove("default")
    })

    document.querySelector("#research").click()
    //todo: fix splitting
}

onmousemove = mouse => {
    images.moveAll((data, element) => {
        const clientRect = element.getBoundingClientRect(),
            div = element.getAttribute("xlink:href") == "#image-2" ? 1000 : 1000,
            distanceY = ((mouse.clientY - data.dataY) ** 2) / div //2.086956
        return { x: data.dataX, y: (data.dataY - distanceY) + 200 }
        //get centre of element
        //calculate distance to mouse pointer
        //find percent of total screen width
        //move based off of this
    })
}
