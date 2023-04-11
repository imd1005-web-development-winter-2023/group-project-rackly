//
//  JS File

// Variables
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 3840
canvas.height = 2240

c.fillRect(0, 0, canvas.width, canvas.height)

const gravity = 0.7

const background = new Sprite({
    position: {
        x: 0,
        y:0
    },
    imageSrc: './images/favicon/Background.png'
}) 

const player = new Fighter({
    position:{
        x: 0,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    },
    offset: {
        x: 0,
        y: 0
    },
    imageSrc: './images/favicon/Kangaroo_Idle.png',
    framesMax: 48,
    scale: 1,
    offset: {
        x: 30,
        y: 1200
    },
    sprites: {
        idle: {
            imageSrc: './images/favicon/Kangaroo_Idle.png',
            framesMax: 8
        },
        attackKan: {
            imageSrc: './images/favicon/Kangaroo_Attack.png',
            framesMax: 4
        },
    }
})


const enemy = new Fighter({
    position:{
    x: 400,
    y: 100
    },
    velocity: {
        x: 0,
        y: 0
    },
    color: 'blue',
    offset: {
        x: -50,
        y: 0
    },
    imageSrc: './images/favicon/Dinosaur_Idle.png',
    framesMax: 4,
    scale: 1,
    offset: {
        x: -2900,
        y: 1200
    },
    sprites: {
        idle: {
            imageSrc: './images/favicon/Dinosaur_Idle.png',
            framesMax: 4
        },
        attackKan: {
            imageSrc: './images/favicon/Dinosaur_Attack.png',
            framesMax: 4
        },
    }
})


console.log(player)

const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    }
}


decreaseTimer()

// infinite loop
function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
   c.fillRect(0, 0, canvas.width, canvas.height)
    background.update()
    player.update()
    enemy.update()

    player.velocity.x = 0
    enemy.velocity.x = 0

    // Player mouvement
    if (keys.a.pressed && player.lastKey === 'a') {
        player.velocity.x = -5
        player.switchSprite('idle')
    } else if (keys.d.pressed && player.lastKey === 'd') {
        player.velocity.x = 5
        player.switchSprite('idle')
    }

    // Enemy mouvement
    if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
        enemy.velocity.x = -5
        enemy.switchSprite('idle')
    } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
        enemy.velocity.x = 5
        enemy.switchSprite('idle')
    }

    // detect for collision
    if(
        rectangularCollision({
        rectangle1: player,
        rectangle2: enemy
    }) &&
    player.isAttacking
         ){
        player.isAttacking = false
        enemy.health -= 20
        document.querySelector('#enemyHealth').style.width = enemy.health + '%'
         
    }

    // for enemy
    if(
        rectangularCollision({
        rectangle1: enemy,
        rectangle2: player
    }) &&
         enemy.isAttacking
         ){
        enemy.isAttacking = false
        player.health -= 20
        document.querySelector('#playerHealth').style.width = player.health + '%'
    }

    // end game based on health
    if (enemy.health <= 0 || player.health <= 0) {
        determineWinner({player, enemy, timerId})

    }
}

animate()

window.addEventListener('keydown', (event) => {
    switch (event.key) {
    case 'd':
        keys.d.pressed = true
        player.lastKey='d'
        break
    case 'a':
        keys.a.pressed = true
        player.lastKey ='a'
        break
    case 'w':
        player.velocity.y = -20
        break
    case ' ':
        player.attack()
        break

    case 'ArrowRight':
            keys.ArrowRight.pressed = true
            enemy.lastKey = 'ArrowRight'
            break
    case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            enemy.lastKey ='ArrowLeft'
            break
    case 'ArrowUp':
            enemy.velocity.y = -20
            break 
    case 'ArrowDown':
            enemy.attack()
            break
   }
    
})

window.addEventListener('keyup', (event) => {
    switch (event.key) {
    case 'd':
        keys.d.pressed = false
        break
    case 'a':
        keys.a.pressed = false
        break
    
    }

    //enemy event listeners
    switch (event.key) {
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            break
       
    }
     
 })
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
