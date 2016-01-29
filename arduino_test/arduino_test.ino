// Code for Scatdat door sensors with power saving shield installed.
// Arduino ESP8266 Wifi library

const int LED_PIN = 5;
byte led_status = 0;

////////////////////
// setup Function //
////////////////////
void setup() {
  // setup pins/serial comms
  // initHardware();
  Serial.begin(230400);
  Serial.println("hello world!");


  pinMode(LED_PIN, OUTPUT);
  digitalWrite(LED_PIN, LOW);
}

///////////////////
// loop Function //
///////////////////
void loop() {
  // intentially left empty
  Serial.println("hello world!");

  digitalWrite(LED_PIN, led_status);
  led_status ^= 0x01;
  delay(250);
}

