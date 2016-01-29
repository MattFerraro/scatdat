# Scatdat

This repo contains two separate chunks of code:
  - The python code for the server
  - The arduino code for microcontroller


## Server

  - models.py: Our interface to deal with sqlalchemy and build a database
  - api.py: A pythonic api for adding and querying things from an abstracted data store
  - app.py: A nice HTTP api which has no business logic except for translation HTTP <-> Plain Old Python

The server stands up on port 5000 as per flask default

Run with:

```python app.py```

## Microcontroller

  - scatdat_v2.ino: Everything for connecting to WiFi, reading sensors, and posting to the server
  - arduino_test.ino: Scratchpad testing file because god this thing is hard to debug

Compile and upload using the arduino IDE (which I hate a lot).

To debug, use a program like CoolTerm. Importantly, remember that during programming you must connect all programmer pins. If you want to debug you must disconnect the DTR pin. If you do not disconnect the DTR pin, connecting CoolTerm will pull it down which switches the microcontroller into bootloader mode, which of course prevents any meaningful debugging.
