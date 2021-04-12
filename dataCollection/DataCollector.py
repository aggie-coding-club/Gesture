from pynput import keyboard

currently_pressed_key = ""

#
#   Basically, call record_data for each frame with data you want to record.
#

"""
Inputs: 1) A list of data to write. 2) A file name for the output (e.g. "output.csv")

Function: Saves all data from argument 1 in a csv-like text format along            
with the unicode value of whatever key is being pressed at function call. 
"""
def record_data(data_input, output_filename):
    with keyboard.Listener(on_press=keyPress) as kb:
        kb.join()
        
    #
    output_file = open(output_filename, "a")
    
    #Writes unicode value of curently pressed key and all the values in data_input
    output_file.write(str(ord(str(currently_pressed_key)[1:2])) + ",")
    for i in range(0, len(data_input)-1):
        output_file.write(str(data_input[i]) + ",")
        
    output_file.write(str(data_input[len(data_input)-1]) + "\n");
    print("Going")

#Callback function that finds the currently pressed key
def keyPress(key):
    global currently_pressed_key;
    currently_pressed_key = key;
    return False;

