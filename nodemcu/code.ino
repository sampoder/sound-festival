#include <ESP8266WiFi.h>

#include <ESP8266HTTPClient.h>

#include <WiFiClient.h>

const char * ssid = "SECRET";
const char * password = "PASSWORD";

String serverName = "https://sound-festival.vercel.app/api/event";

WiFiClientSecure client;

void setup() {

  WiFi.begin(ssid, password);
  Serial.println("Connecting");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Connected to WiFi network with IP Address: ");
  Serial.println(WiFi.localIP());

  
        client.setInsecure(); //the magic line, use with caution
        client.connect(serverName, '3000');

  // put your setup code here, to run once:
  Serial.begin(9600);
  pinMode(D0, INPUT);
  pinMode(D1, INPUT);
  pinMode(D2, INPUT);
  pinMode(D5, INPUT);
  pinMode(D6, INPUT);
  pinMode(D7, INPUT);
  pinMode(D8, INPUT);
  pinMode(LED_BUILTIN, OUTPUT);
  Serial.println(WiFi.macAddress());
}

void request(String urlPath) {
  if (WiFi.status() == WL_CONNECTED) {
        HTTPClient http;

        

        // Your Domain name with URL path or IP address with path
        http.begin(client, (serverName+urlPath).c_str());

        // Send HTTP GET request
        int httpResponseCode = http.GET();

        if (httpResponseCode > 0) {
          Serial.print("HTTP Response code: ");
          Serial.println(httpResponseCode);
          String payload = http.getString();
          Serial.println(payload);
        } else {
          Serial.print("Error code: ");
          Serial.println(http.getString());
          Serial.println(httpResponseCode);
        }
        // Free resources
        http.end();
        delay(500);
      }
}

void loop() {
  if (WiFi.macAddress() == "48:3F:DA:75:1A:86") {

    byte val = digitalRead(D8);
    if (val == HIGH) {

      Serial.println('8');
      Serial.println('\n');
      request("?sfx=3");
    } else {

    }

    val = digitalRead(D7);
    if (val == HIGH) {

      Serial.println('7');
      Serial.println('\n');
      request("?sfx=2");
    } else {

    }
    val = digitalRead(D6);
    if (val == HIGH) {

      Serial.println('6');
      Serial.println('\n');
      request("?sfx=1");
    } else {

    }
    val = digitalRead(D5);
    if (val == HIGH) {

      Serial.println('5');
      Serial.println('\n');
      request("?sfx=0");
    } else {

    }
    val = digitalRead(D2);
    if (val == HIGH) {

      Serial.println('2');
      Serial.println('\n');
      request("?beat=2");
    } else {

    }
    val = digitalRead(D1);
    if (val == HIGH) {
      Serial.println('1');
      Serial.println('\n');
      request("?beat=0");
      
    } else {

    }
    val = digitalRead(D0);
    if (val == HIGH) {

      Serial.println('0');
      Serial.println('\n');
      request("?beat=1");
    } else {

    }
  }
  if (WiFi.macAddress() == "C8:2B:96:2E:D2:48") {

    byte val = digitalRead(D1);
    if (val == HIGH) {

      Serial.println('1');
      Serial.println('\n');
      request("?sfx=4");
    } else {

    }

    val = digitalRead(D0);
    if (val == HIGH) {

      Serial.println('0');
      Serial.println('\n');
      request("?sfx=5");
    } else {

    }
    val = digitalRead(D7);
    if (val == HIGH) {

      Serial.println('7');
      Serial.println('\n');
      request("?sfx=6");
    } else {

    }
    val = digitalRead(D2);
    if (val == HIGH) {

      Serial.println('2');
      Serial.println('\n');
      request("?sfx=7");
    } else {

    }
    val = digitalRead(D5);
    if (val == HIGH) {

      Serial.println('5');
      Serial.println('\n');
      request("?beat=0");
    } else {

    }
    val = digitalRead(D6);
    if (val == HIGH) {
      Serial.println('6');
      Serial.println('\n');
      request("?beat=2");
      
    } else {

    }
    val = digitalRead(D8);
    if (val == HIGH) {
      Serial.println('8');
      Serial.println('\n');
      request("?beat=1");
    } else {

    }
  }
  if (WiFi.macAddress() == "48:3F:DA:75:1A:F7") {

    byte val = digitalRead(D2);
    if (val == HIGH) {
      Serial.println('2');
      Serial.println('\n');
      request("?sfx=11");
    } else {

    }

    val = digitalRead(D5);
    if (val == HIGH) {
      Serial.println('5');
      Serial.println('\n');
      request("?sfx=10");
    } else {

    }
    val = digitalRead(D6);
    if (val == HIGH) {

      Serial.println('6');
      Serial.println('\n');
      request("?sfx=9");
    } else {

    }
    val = digitalRead(D7);
    if (val == HIGH) {

      Serial.println('7');
      Serial.println('\n');
      request("?sfx=8");
    } else {

    }
    val = digitalRead(D1);
    if (val == HIGH) {

      Serial.println('1');
      Serial.println('\n');
      request("?beat=2");
    } else {

    }
    val = digitalRead(D0);
    if (val == HIGH) {
      Serial.println('0');
      Serial.println('\n');
      request("?beat=0");
      
    } else {

    }
    val = digitalRead(D8);
    if (val == HIGH) {

      Serial.println('8');
      Serial.println('\n');
      request("?beat=1");
    } else {

    }
  }
}
