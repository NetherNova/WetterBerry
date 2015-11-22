#!C:\Python27\python.exe -u
# #!/usr/bin/env python

import json
import time
import sys
try:
    import RPi.GPIO as GPIO
except ImportError:
    sys.exit(0)

pinNum = 17
GPIO.setmode(GPIO.BCM)
GPIO.setup(pinNum, GPIO.OUT)

GPIO.output(pinNum, GPIO.HIGH)
time.sleep(1)
GPIO.output(pinNum, GPIO.LOW)

print(json.JSONEncoder().encode({"status" : "ok"}))