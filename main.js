//
//  JS File

// Variables
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

const gravity = 0.7

function fullscreen() {
    if (!fullWindowState) {
        fullWindowState = true;
        //canvas goes full Window
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.className = "fullscreen"

        document.body.scrollTop = 0; // <-- pull the page back up to the top
        document.body.style.overflow = 'hidden'; // <-- relevant addition
    } else {
        fullWindowState = false;
        //canvas goes normal
        canvas.width = 820;
        canvas.height = 600;
        canvas.className = "";

        document.body.style.overflow = 'visible'; // <-- toggle back to normal mode
    }

}


class Sprite {
    constructor({position, velocity}) {
        this.position = position
        this.velocity = velocity
        this.height = 150
    }

    draw() {
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, 50, this.height)
    }

    update() {
        this.draw()
        this.velocity.y += gravity
        this.position.y += this.velocity.y

        if (this.position.y + this.height + this.velocity.y >= canvas.height) {
            this.velocity.y = 0
        }else this.velocity.y += gravity
    }
}

const player = new Sprite({
    position:{
    x: 0,
    y: 0
    },
    velocity: {
        x: 0,
        y: 0
    }
})


const enemy = new Sprite({
    position:{
    x: 400,
    y: 100
    },
    velocity: {
        x: 0,
        y: 0
    }
})


console.log(player)

// infinite loop
function animate() {
    window.requestAnimationFrame(animate)
   
    player.update()
    enemy.update()
}

animate()

/* start
start() {
    this.toggleScreen('start-screen',false);
    this.toggleScreen('canvas', true);
}

function startGame() {
    console.log('start game');

}

toggleScreen(id,toggle) {
    let element = document.getElementById(id);
    let display = (toggle) ? 'block' : 'none';
    element.style.display = display;
}
*/
