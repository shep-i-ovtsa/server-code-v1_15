#start notes, beta 1.1... ahhhhh i hate this shity code omfgggggg why does nothing work omfgggggg
#made a number system to diffirentiate different inputs depending on the 10s place
#got it to run by having it send a input with a 10 value of 0, then a input with a 10 value of 1 followed by player id
#everything sucks and my day is ruined, when more than 4 inputs are sent the server gets fuzzed
#nope just orginization
# what was i on when i wrote that omfg whyyy also why did i use math to plot the progress instead of a grid and a bunch of values
#ok so it wasent a total waste i have a framework all i need to do is change around a few things and use a differet number system
#number sustem changed to the 10s place being the player id and then the input
#0 is assighned to end the game
# finnaly got this shit to work omfggggggg finnalyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy
    # and it dosent fuzzzzzzz when i use a FOR LOOOOOOPPP LETS GOOOOO
x = 0
j=0
radio.set_group(1)
running = True



# number system to diffirentiate different levels of input
# number signals less than 10 operate in the controllers wich use 1-9 to select spaces on their grids
#when the signal needs to be elevated to server level they add their PlayerId in the 10's place 
# while the input is in the number's place
def interi(i):#interpret_input
    
    if i >= 20:
        return(i - 20)
    else:
        return(i-10)
def interp(i):#interpret_PlayerId
    if i >= 20:
        return(2)
    else:
        return(1)

def test(rec,pid):
    x = rec
    if pid ==1:
        for i in range(0,x,1):
            control.wait_micros(100000)
            if i >= 5:
                led.plot(1,0+(2*(i-6)))
                led.plot(1,0+(2*(i-6)+1))
            led.plot(0,5-i)
        if x ==9:
            end(pid)
    if pid ==2:
        for i in range(0,x,1):
            control.wait_micros(100000)
            if i >= 5:
                led.plot(3,0+(2*(i-6)))
                led.plot(3,0+(2*(i-6)+1))
            led.plot(4,5-i)
        if x == 9:
            end(pid)


def end(pid):
    running = False
    endPackage()
    control.wait_micros(500000)
    for i in range(0,5,1):
        control.wait_micros(500000)
        for c in range (0,5,1):
            led.unplot(c,i)
    for i in range(0,5,1):
        basic.show_string("player "+str(pid)+"lost")


def on_received_number(receivedNumber):
    rec = receivedNumber
    if running and rec > 10: #ignore controller level values
        test(interi(rec),interp(rec))

radio.on_received_number(on_received_number)




#test function it mostly just used to send test inputs to the server
def on_button_pressed_a():
    inputs = [11, 12, 23, 14, 15, 26, 18, 29]  # List of inputs to send
    for num in inputs:
        radio.send_number(num)
        control.wait_micros(80000)




def endPackage():
    radio.send_number(0)
# be in a two pair of first the pid so the pid +10 and the number
#to track, the inter function can help you interpret them and g 
#keeps the graph from taking illegal packets
input.on_button_pressed(Button.A, on_button_pressed_a)

# code to go with it https://makecode.microbit.org/_fp6TKCCYzWqR