/**
 * 矩形类，可以移动
 * 属性：宽、高，横纵坐标，横纵速度，对应的dom对象
 */
class Rectangle{
    constructor(width, height, left, top, xSpeed, ySpeed, dom) {
        this.width = width;
        this.height = height;
        this.left = left;
        this.top = top;
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
        this.dom = dom;

        this.render();
    }

    /**
     * 渲染每个物体的样式
     */
    render() {
        this.dom.style.width = this.width + 'px';
        this.dom.style.height = this.height + 'px';
        this.dom.style.left = this.left + 'px';
        this.dom.style.top = this.top + 'px';
    }

    /**
     * 物体移动
     * 移动距离 = 速度 * 时间
     */
    move(times) {
        const xDis = this.xSpeed * times;
        const yDis = this.ySpeed * times;
        this.left = this.left + xDis;
        this.top = this.top + yDis;

        if (this.resetMove) {
            this.resetMove();
        }

        this.render();
    }
}