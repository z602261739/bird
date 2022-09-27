class Game {
    constructor() {
        this.sky = new Sky();
        this.bird = new Bird();
        this.pipes = new PipePairProducer(-100);
        this.timer = null;

    }

    isHit(rec1, rec2) {
        const rec1X = rec1.left + rec1.width / 2;
        const rec1Y = rec1.top + rec1.height / 2;
        const rec2X = rec2.left + rec2.width / 2;
        const rec2Y = rec2.top + rec2.height / 2;
        const disX = Math.abs(rec1X - rec2X);
        const disY = Math.abs(rec1Y - rec2Y);
        if (disX < (rec1.width + rec2.width) / 2 && disY < (rec1.height + rec2.height) / 2) {
            return true;
        }
        return false;

    }

    isGameOver() {
        if (this.bird.top >= this.bird.maxY || this.bird.top <= this.bird.minY) {
            return true;
        }

        for (let i = 0; i < this.pipes.pipePairs.length; i++) {
            const pair = this.pipes.pipePairs[i];
            if (this.isHit(this.bird, pair.pipeUp) || this.isHit(this.bird, pair.pipeDown)) {
                return true;
            }

        }
        return false
    }

    start() {
        if (this.timer) {
            return
        }
        if (this.gameOver) {
            window.location.reload();
        }
        this.pipes.starProducer();
        this.timer = setInterval(() => {
            const timers = 60 / 1000;
            this.sky.move(timers);
            this.bird.move(timers);
            this.pipes.pipePairs.forEach(pipe => {
                pipe.move(60 / 1000);
            })


            if (this.isGameOver()) {
                this.stop();
                this.gameOver = true;
            }
        }, 60);
    }

    stop() {
        clearInterval(this.timer);
        this.timer = null;
        this.pipes.stopProducer();
    }

    keyControl() {
        window.addEventListener('keydown', e => {
            if (e.key === 'Enter') {
                if (this.timer) {
                    this.stop();
                } else {
                    this.start();
                }
            } else if (e.key === ' ') {
                this.bird.jump();
            }
        },false)
    }
}

const game = new Game();
game.keyControl();