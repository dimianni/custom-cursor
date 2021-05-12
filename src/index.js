import gsap from 'gsap'
import './scss/style.scss'


function initCursor() {

    const cursor = document.getElementById('cursor');

    // Initial position
    let xPos = -100;
    let yPos = -100;

    // Getting x & y values;
    document.addEventListener('mousemove', function (e) {
        xPos = e.clientX
        yPos = e.clientY
    })

    function render() {

        // Vanilla JS
        // cursor.style.left = xPos + 'px'
        // cursor.style.top = yPos + 'px'

        // GSAP
        gsap.set(cursor, {
            x: xPos,
            y: yPos
        })
        requestAnimationFrame(render)
    }
    render()
}

initCursor()



