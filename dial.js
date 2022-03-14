function draw_line(x, y, l, theta) {
    line(x, y, x + l * cos(theta), y - l * sin(theta))
}



class Dial {
    constructor(x, y, r) {
        this.origin = { x, y }
        this.r = r
        this.true_angle = -PI/6
        this.pin_angle = HALF_PI
        this.mouse_angle = 0
        this.hidden = false
        this.BACKGROUND_COLOR = [100, 100, 100]
        this.ARC_COLOUR = [0, 0, 0]
        this.PIN_COLOUR = [255, 255, 255]
        this.MOUSE_COLOUR = [0, 128, 0]
        this.SCORE_COLOURS = [[128, 128, 0], [0, 128, 128], [128, 0, 128]]
    }

    draw() {
        this.draw_arc()
        this.draw_wedge()
        this.draw_pin()
        this.draw_mouse()
    }
    
    draw_arc() {
        background(100)
        fill(this.ARC_COLOUR[0], this.ARC_COLOUR[1], this.ARC_COLOUR[2])
        noStroke()
        arc(this.origin.x, this.origin.y, this.r, this.r, radians(-180), 0)
    }
    
    draw_pin() {
        stroke(this.PIN_COLOUR[0], this.PIN_COLOUR[1], this.PIN_COLOUR[2])
        strokeCap("square")
        strokeWeight(5)
        draw_line(this.origin.x, this.origin.y, this.r / 2, this.pin_angle)
    }
    
    draw_wedge() {
        if (!this.hidden) {
            noStroke()
            for (let i = 3; i > 1; i--) {
                let c = this.SCORE_COLOURS[i - 1]
                fill(c[0], c[1], c[2])
                arc(this.origin.x, this.origin.y, this.r, this.r, this.true_angle - (i - 0.5) * PI / 32, this.true_angle + (i - 0.5)*PI / 32)
            }
            let i=1
            let c = this.SCORE_COLOURS[i-1]
            fill(c[0], c[1], c[2])
            arc(this.origin.x, this.origin.y, this.r, this.r, this.true_angle - 0.5*PI/32, this.true_angle + 0.5*PI / 32)
        }
    }

    draw_mouse() {
        if (this.hidden) {
            stroke(this.MOUSE_COLOUR[0], this.MOUSE_COLOUR[1], this.MOUSE_COLOUR[2])
            draw_line(canvas_w / 2, canvas_h, dial_r, this.mouse_angle)
        }
    }

    set_pin() {
        if (this.hidden) {
            this.pin_angle = this.mouse_angle
        }
    }

    spin() {
        this.true_angle = -radians(random(181))
        this.pin_angle = HALF_PI
    }
}
