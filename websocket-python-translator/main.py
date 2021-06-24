import pysher
import sys
import time
# Add a logging handler so we can see the raw communication data
import logging
import rtmidi
import json
from dotenv import load_dotenv
load_dotenv()
import os

midiout = rtmidi.MidiOut()
available_ports = midiout.get_ports()

if available_ports:
    midiout.open_port(0)
else:
    midiout.open_virtual_port("My virtual output")

root = logging.getLogger()
root.setLevel(logging.INFO)
ch = logging.StreamHandler(sys.stdout)
root.addHandler(ch)

pusher = pysher.Pusher(os.getenv("KEY"), cluster='us2')

def my_func(data, *args, **kwargs):
    y = json.loads(data)
    global b
    global x
    try:
      note_off = [0x90, 100, int(y['sfx'])]
      b = int(y['sfx'])
      midiout.send_message(note_off)
      
    except:
      note_on = [0x90, int(y['beat']), 100]
      x = int(y['beat'])
      midiout.send_message(note_on)
    
    print("processing Args:", args)
    print("processing Kwargs:", kwargs)

# We can't subscribe until we've connected, so we use a callback handler
# to subscribe when able


def connect_handler(data):
    channel = pusher.subscribe('sound-festival')
    channel.bind('incoming', my_func)


pusher.connection.bind('pusher:connection_established', connect_handler)
pusher.connect()

while True:
    # Do other things in the meantime here...
    time.sleep(1)
