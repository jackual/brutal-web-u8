[...document.querySelectorAll("#examples a")].map(i => {
    i.onmouseover = () => {
        document.querySelector("[data-id=examples] .status-bar").innerText = i.href
    }
    i.onmouseout = () => {
        document.querySelector("[data-id=examples] .status-bar").innerText = "　"
    }
    i.onclick = event => {
        event.preventDefault()
        const id = "id" + new Date().getTime()
        counter++
        newWindow({
            title: event.target.title,
            toolWindow: false,
            resizable: true,
            id: id,
            content: event.target.href,
            type: "iframe",
            left: (window.innerWidth / 2) - 250,
            top: (window.innerHeight / 8) + (counter * 15),
            width: 500,
            close: () => {
                counter--
            }
        })
        setTimeout(() => {
            const el = document.querySelector(`[data-id="${id}"]`)
            el.style.zIndex = 100
            el.focus()
            el.click()
        }, 200)

    }
})