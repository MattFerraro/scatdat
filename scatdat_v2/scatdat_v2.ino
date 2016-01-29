// Code for Scatdat door sensors with power saving shield installed.
// Arduino ESP8266 Wifi library
#include <ESP8266WiFi.h>

//////////////////////////
// Constant Definitions //
//////////////////////////
#define CLOSED 0
#define OPEN 1
#define VOLTAGE_DIVIDER_CONST 5.7

//////////////////////
// WiFi Definitions //
//////////////////////
const char WIFI_SSID[] = "exoplanet";  //planetoids
const char WIFI_PSK[] = "kEf8Qr28vNSv";  //62D4A6ED
const char STALL_ID[] = "Floor2Mens1";

/////////////////////////////
// Remote Site Definitions //
/////////////////////////////
// const char http_site[] = "scatdat.earth.planet.com";
const char http_site[] = "";
const int http_port = 5000;

/////////////////////
// Pin Definitions //
/////////////////////
const int LED_PIN = 5;
const int ANALOG_PIN = A0; // The only analog pin on the Thing
const int DOOR_SENSOR_PIN = 4; // Digital pin to be read
const int SLEEP_TIME_S = 3600; //sleep time between non door wakeups (in seconds), max is about 1 hr

//////////////////////
// Global Variables //
//////////////////////
WiFiClient client;
int doorState = OPEN;
int analogValue = 0;
int vbatt = 0;

//////////////////////////
// connectWiFi Function //
//////////////////////////
void connectWiFi() {

  byte led_status = 0;

  // Set WiFi mode to station (client)
  WiFi.mode(WIFI_STA);

  // Initiate connection with SSID and PSK
  WiFi.begin(WIFI_SSID, WIFI_PSK);

  // Blink LED while we wait for WiFi connection
  while ( WiFi.status() != WL_CONNECTED ) {
    digitalWrite(LED_PIN, led_status);
    led_status ^= 0x01;
    delay(100);
  }

  // Turn LED on when we are connected
  digitalWrite(LED_PIN, LOW);
}

////////////////////////
// postEvent Function //
////////////////////////
// Perform an HTTP POST to a remote page
bool postEvent(int doorOpen,int battmV) {
  char paramString[256];
  Serial.println("Attempting to connect to");
  sprintf(paramString,"%s:%i",http_site,http_port);
  Serial.println(paramString);

  // Attempt to make a connection to the remote server
  if ( !client.connect(http_site, http_port) ) {
    return false;
  }
  // Construct parameter string
  sprintf(paramString,"?stallId=%s&doorOpen=%i&battV=%i",STALL_ID,doorOpen,battmV);
  // Make an HTTP GET request
  client.print("GET /newdata");
  client.print(paramString);
  client.println(" HTTP/1.1");
  client.print("Host: ");
  client.println(http_site);
  client.println("Connection: close");
  client.println();

  return true;
}

///////////////////////////
// initHardware Function //
///////////////////////////
void initHardware(){
  Serial.begin(230400);
  // Set door sensor pin as input, no pull up needed because there is an external pull up
  pinMode(DOOR_SENSOR_PIN, INPUT);
  // Set led pin as output and turn it off
  pinMode(LED_PIN, OUTPUT);
  digitalWrite(LED_PIN, LOW);
  // Don't need to set ANALOG_PIN as input, that's all it can be.
}

//////////////////////////////
// calcBattVoltage Function //
//////////////////////////////
int calcBattmV(int analogValue){
  // Input is the ADC, its 10 bit so 0-1023 for 1V FSR
  // The power saver has a built in voltage divider
  // R1 = 470000  R2 = 100000
  // VOUT = R2/ (R1+R2) * VIN
  float v_adc = 0;
  float battmV = 0;
  v_adc = (float) analogValue / 1023;
  battmV = VOLTAGE_DIVIDER_CONST * v_adc * 1000;
  return (int) battmV;
}

////////////////////
// setup Function //
////////////////////
byte led_status = 0;
void setup() {
  Serial.begin(230400);
  Serial.println("hello world!");


  pinMode(LED_PIN, OUTPUT);
  digitalWrite(LED_PIN, LOW);

  for (int i = 0; i < 50; ++i)
  {
    Serial.println("in loop");
    Serial.println(i);
    digitalWrite(LED_PIN, led_status);
    led_status ^= 0x01;
    delay(500);
  }
  // setup pins/serial comms
  initHardware();
  Serial.println("Done with init hardware!");

  // connect to the newtwork
  connectWiFi();
  Serial.println("Done with connect wifi!");

  // turn on LED
  digitalWrite(LED_PIN, HIGH);
  Serial.println("LED on!");

  // Read door sensor state
  doorState = digitalRead(DOOR_SENSOR_PIN);
  Serial.println("Read door state!");

  // get analog reading & calculate battery voltage
  analogValue = analogRead(ANALOG_PIN);
  Serial.println("got analog value!");
  vbatt = calcBattmV(analogValue);
  Serial.println("got vbatt!");

  // Post the data
  if (!postEvent(doorState,vbatt)) {
    Serial.println("POST request failed");
  }
  else {
    Serial.println("POST request success");
  }

  // turn off LED
  digitalWrite(LED_PIN,LOW);
  Serial.println("LED off. Going to sleep");

  // go into deep sleep mode
  ESP.deepSleep(SLEEP_TIME_S * 1000000, WAKE_RF_DEFAULT);
  Serial.println("in deep sleep");
}

///////////////////
// loop Function //
///////////////////
void loop() {
  // intentially left empty
 }
