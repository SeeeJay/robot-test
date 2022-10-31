function right () {
    pins.servoSetPulse(AnalogPin.P8, 1700)
    pins.servoSetPulse(AnalogPin.P13, 1700)
    control.waitMicros(20000)
}
radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 1) {
        forward()
    }
    if (receivedNumber == 2) {
        backwards()
    }
    if (receivedNumber == 3) {
        left()
    }
    if (receivedNumber == 4) {
        right()
    }
    if (receivedNumber == 5) {
        stop()
    }
})
function left () {
    pins.servoSetPulse(AnalogPin.P8, 1300)
    pins.servoSetPulse(AnalogPin.P13, 1300)
    control.waitMicros(20000)
}
function stop () {
    pins.servoSetPulse(AnalogPin.P8, 0)
    pins.servoSetPulse(AnalogPin.P13, 0)
    control.waitMicros(20000)
}
function backwards () {
    pins.servoSetPulse(AnalogPin.P8, 1300)
    pins.servoSetPulse(AnalogPin.P13, 1700)
    control.waitMicros(20000)
}
function forward () {
    pins.servoSetPulse(AnalogPin.P8, 1700)
    pins.servoSetPulse(AnalogPin.P13, 1300)
    control.waitMicros(20000)
}
function sensor () {
    pins.digitalWritePin(DigitalPin.P1, 0)
    control.waitMicros(2)
    pins.digitalWritePin(DigitalPin.P1, 1)
    control.waitMicros(10)
    pins.digitalWritePin(DigitalPin.P1, 0)
    distance = pins.pulseIn(DigitalPin.P2, PulseValue.High) / 58
}
let distance = 0
basic.showIcon(IconNames.Heart)
radio.setGroup(11)
distance = 0
let count = 0
basic.forever(function () {
    forward()
    basic.showNumber(distance)
    for (let index = 0; index < 4; index++) {
        sensor()
        if (distance <= 4) {
            count += 1
        }
        if (count == 4) {
            stop()
            control.waitMicros(500000)
            backwards()
            control.waitMicros(500000)
            stop()
            control.waitMicros(500000)
            left()
            control.waitMicros(500000)
            stop()
            control.waitMicros(500000)
            forward()
            count = 0
        }
    }
    count = 0
})
