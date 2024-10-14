// start notes, beta 1.1... ahhhhh i hate this shity code omfgggggg why does nothing work omfgggggg
// made a number system to diffirentiate different inputs depending on the 10s place
// got it to run by having it send a input with a 10 value of 0, then a input with a 10 value of 1 followed by player id
// everything sucks and my day is ruined, when more than 4 inputs are sent the server gets fuzzed
// nope just orginization
//  what was i on when i wrote that omfg whyyy also why did i use math to plot the progress instead of a grid and a bunch of values
// ok so it wasent a total waste i have a framework all i need to do is change around a few things and use a differet number system
// number sustem changed to the 10s place being the player id and then the input
// 0 is assighned to end the game
//  finnaly got this shit to work omfggggggg finnalyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy
//  and it dosent fuzzzzzzz when i use a FOR LOOOOOOPPP LETS GOOOOO
let x = 0
let j = 0
radio.setGroup(1)
let running = true
//  number system to diffirentiate different levels of input
//  number signals less than 10 operate in the controllers wich use 1-9 to select spaces on their grids
// when the signal needs to be elevated to server level they add their PlayerId in the 10's place 
//  while the input is in the number's place
function interi(i: number): number {
    // interpret_input
    if (i >= 20) {
        return i - 20
    } else {
        return i - 10
    }
    
}

function interp(i: number): number {
    // interpret_PlayerId
    if (i >= 20) {
        return 2
    } else {
        return 1
    }
    
}

function test(rec: number, pid: number) {
    let i: number;
    let x = rec
    if (pid == 1) {
        for (i = 0; i < x; i += 1) {
            control.waitMicros(100000)
            if (i >= 5) {
                led.plot(1, 0 + 2 * (i - 6))
                led.plot(1, 0 + (2 * (i - 6) + 1))
            }
            
            led.plot(0, 5 - i)
        }
        if (x == 9) {
            end(pid)
        }
        
    }
    
    if (pid == 2) {
        for (i = 0; i < x; i += 1) {
            control.waitMicros(100000)
            if (i >= 5) {
                led.plot(3, 0 + 2 * (i - 6))
                led.plot(3, 0 + (2 * (i - 6) + 1))
            }
            
            led.plot(4, 5 - i)
        }
        if (x == 9) {
            end(pid)
        }
        
    }
    
}

function end(pid: number) {
    let i: number;
    let running = false
    endPackage()
    control.waitMicros(500000)
    for (i = 0; i < 5; i += 1) {
        control.waitMicros(500000)
        for (let c = 0; c < 5; c += 1) {
            led.unplot(c, i)
        }
    }
    for (i = 0; i < 5; i += 1) {
        basic.showString("player " + ("" + pid) + "lost")
    }
}

radio.onReceivedNumber(function on_received_number(receivedNumber: number) {
    let rec = receivedNumber
    if (running && rec > 10) {
        // ignore controller level values
        test(interi(rec), interp(rec))
    }
    
})
// test function it mostly just used to send test inputs to the server
function endPackage() {
    radio.sendNumber(0)
}

//  be in a two pair of first the pid so the pid +10 and the number
// to track, the inter function can help you interpret them and g 
// keeps the graph from taking illegal packets
input.onButtonPressed(Button.A, function on_button_pressed_a() {
    let inputs = [11, 12, 23, 14, 15, 26, 18, 29]
    //  List of inputs to send
    for (let num of inputs) {
        radio.sendNumber(num)
        control.waitMicros(80000)
    }
})
