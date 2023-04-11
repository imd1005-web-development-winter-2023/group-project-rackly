
class Sprite {
    constructor({
        position, 
        imageSrc, 
        scale=1, 
        framesMax = 1, 
        offset = {x: 0, y: 0}}) {
        this.position = position
        this.width = 50
        this.height = 150
        this.image = new Image()
        this.image.src = imageSrc
        this.scale = scale
        this.framesMax = framesMax
        this.framesCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 5
        this.offset = offset
    }

    draw() {
        c.drawImage(
        this.image,
        this.framesCurrent * (this.image.width / this.framesMax),
        0,
        this.image.width / this.framesMax,
        this.image.height,
        this.position.x - this.offset.x,
        this.position.y - this.offset.y,
        (this.image.width / this.framesMax) * this.scale,
        this.image.height * this.scale
        )
    }

    animateFrames() {
        if (this.framesElapsed % this.framesHold === 0) {
            if (this.framesCurrent < this.framesMax - 1) {
                this.framesCurrent++
            } else {
                this.framesCurrent = 0
            }
        }
    }

    update() {
        this.draw()
        this.animateFrames()
    }
}


// new class duplicate
class Fighter extends Sprite {
    constructor({
        sprites,
        position, 
        velocity, 
        color = 'red',  
        imageSrc, 
        scale = 1, 
        framesMax = 1,
        offset = {x: 0, y: 0}
    }) {
        super({
            position,
            imageSrc,
            scale,
            framesMax,
            offset
        })

        this.velocity = velocity
        this.width = 50
        this.height = 150
        this.lastKey
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset,
            width: 100,
            height: 50
        }
        this.color = color
        this.isAttacking
        this.health = 100
        this.framesCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 5
        this.sprites = sprites
    }


    update() {
        this.draw()
        this.animateFrames()

        this.attackBox.position.x = this.position.x + this.attackBox.offset.x
        this.attackBox.position.y = this.position.y

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if (this.position.y + this.height + this.velocity.y >= canvas.height - 100) {
            this.velocity.y = 0
        }else this.velocity.y += gravity
    }
    attack() {
        this.switchSprite('attackKan')
        this.isAttacking = true
        setTimeout(() => {
            this.isAttacking = false
        }, 100)
    }

    switchSprite(sprite) {
        if (this.image === this.sprites.attackKan.image && 
            this.framesCurrent < this.sprites.attackKan.framesMax -1) return

        switch (sprite) {
            case 'idle':
                if (this.image !== this.sprites.idle.image) {
                    this.image = this.sprites.idle.image
                    this.framesMax = this.sprites.idle.framesMax
                    this.framesCurrent = 0
                }
                break
            case 'attackKan':
                if (this.image !== this.sprites.attackKan.image) {
                    this.image = this.sprites.attackKan.image
                    this.framesMax = this.sprites.attackKan.framesMax
                    this.framesCurrent = 0
                    }
                    break
        }
    }

}
