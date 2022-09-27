const gameWidth = gameDom.clientWidth;
class Pipe extends Rectangle{
    constructor(height,top,Xspeed,dom) {
        super(52,height,gameWidth,top,Xspeed,0,dom);
    }

    resetMove() {
        if (this.left < -this.width) {
            this.dom.remove();
        }
    }
}

/**
 * 产生随机数
 */
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}


/**
 * 生成上下一对水管
 */
class PipePair{
    constructor(xSpeed) {
        this.pipeSpace = 150;
        this.minHeight = 80;
        this.maxHeight = gameHeight - this.pipeSpace - this.minHeight;
        const pipeUpHeight = getRandom(this.minHeight, this.maxHeight)
        const pipeUpDom = document.createElement('div');
        pipeUpDom.className = 'pipe up';
        this.pipeUp = new Pipe(pipeUpHeight, 0, xSpeed,pipeUpDom);

        const pipeDownHeight = gameHeight - pipeUpHeight - this.pipeSpace;
        const pipeDownTop = gameHeight - pipeDownHeight;
        const pipeDownDom = document.createElement('div');
        pipeDownDom.className = 'pipe down';
        this.pipeDown = new Pipe(pipeDownHeight, pipeDownTop, xSpeed, pipeDownDom);
        
        gameDom.appendChild(pipeUpDom);
        gameDom.appendChild(pipeDownDom);
    }

    move(times) {
        this.pipeUp.move(times);
        this.pipeDown.move(times);
    }
} 


/**
 * 持续生成多对水管
 */
class PipePairProducer{
    constructor(xSpeed) {
        this.pipePairs = [];
        this.timer = null;
        this.xSpeed = xSpeed;
    }

    starProducer() {
        if (this.timer) {
            return
        }
        this.timer = setInterval(() => {
            this.pipePairs.push(new PipePair(this.xSpeed))
            for (let i = 0; i < this.pipePairs.length; i++) {
                const pipePair = this.pipePairs[i].pipeDown;
                if (pipePair.left < -pipePair.width) {
                    this.pipePairs.splice(i, 1);
                    i--;
                }
            }
        }, 1500);
    }

    stopProducer() {
        clearInterval(this.timer);
        this.timer = null;
    }
}


// const p = new PipePairProducer(-100);
// p.starProducer();


// setInterval(() => {
//     p.pipePairs.forEach((ele) => {
//         ele.move(60 / 1000);
//     })
// }, 60);