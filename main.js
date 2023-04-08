//
//  JS File

function fullscreen() {
    if (!fullWindowState) {
        fullWindowState = true;
        //canvas goes full Window
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.className = "fullscreen"

    }

}

// Variables
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d')


const gravity = 0.2

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
        this.position.y += this.velocity.y

        if (this.position.y + this.height + this.velocity.y >= canvas.height) {
            this.velocity.y = 0
        }
    }
}

const player = new Sprite({
    position:{
    x: 0,
    y: 0
    },
    velocity: {
        x: 0,
        y: 10
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

