function right () {
    pins.servoSetPulse(AnalogPin.P8, 1700)
    pins.servoSetPulse(AnalogPin.P13, 0)
    control.waitMicros(20000)
}
function left () {
    pins.servoSetPulse(AnalogPin.P8, 0)
    pins.servoSetPulse(AnalogPin.P13, 1300)
    control.waitMicros(20000)
}
function stop () {
    pins.servoSetPulse(AnalogPin.P8, 0)
    pins.servoSetPulse(AnalogPin.P13, 0)
    control.waitMicros(20000)
}
input.onButtonPressed(Button.A, function () {
    forward()
    for (let index = 0; index < 4; index++) {
        sensor()
        if (distance <= 4) {
            num += 1
        }
        if (num <= 4) {
            stop()
            control.waitMicros(20000)
            forward()
        }
    }
})
radio.onReceivedString(function (receivedString) {
	
})
function backwards () {
    pins.servoSetPulse(AnalogPin.P8, 1300)
    pins.servoSetPulse(AnalogPin.P13, 1700)
    control.waitMicros(20000)
}
input.onButtonPressed(Button.B, function () {
    right()
})
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
let num = 0
let distance = 0
basic.showIcon(IconNames.Heart)
distance = 0
num = 0
basic.forever(function () {
    sensor()
    basic.showNumber(distance)
})
