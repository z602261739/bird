const skyDom = document.getElementsByClassName('sky')[0];
const skyStyle = getComputedStyle(skyDom);
const skyWidth = parseFloat(skyStyle.width);
const skyHeight = parseFloat(skyStyle.height);
class Sky extends Rectangle{
    constructor() {
        super(skyWidth,skyHeight,0,0,-70,0,skyDom)
    }

    resetMove() {
        if (this.left <= -skyWidth / 2) {
            this.left = 0;
        }
    }
}

// const sky = new Sky();

// setInterval(() => {
//     sky.move(60/1000)
// }, 60);