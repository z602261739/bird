const birdDom = document.getElementsByClassName('bird')[0];
const birdStyle = getComputedStyle(birdDom);
const birdWidth = parseFloat(birdStyle.width);
const birdHeight = parseFloat(birdStyle.height);
const birdleft = parseFloat(birdStyle.left);
const birdTop = parseFloat(birdStyle.top);
const gameDom = document.getElementsByClassName('game')[0]
const gameHeight = gameDom.clientHeight;

class Bird extends Rectangle{
    constructor() {
        super(birdWidth, birdHeight, birdleft, birdTop, 0, 0, birdDom);
        this.g = 1500;
        this.maxY = gameHeight - birdHeight;
        this.minY = birdHeight;
    }

    move(times) {
        super.move(times)
        this.ySpeed += this.g * times;
    }
    
    resetMove() {
        if (this.top < 0) {
            this.top = 0;
        }else if (this.top >= this.maxY) {
            this.top = this.maxY;
        }
    }

    jump() {
        this.ySpeed = -400;
    }
}

// const bird = new Bird();

// setInterval(() => {
//     bird.move(60/1000)
// }, 60);