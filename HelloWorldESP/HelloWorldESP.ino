#include "WiFi.h"
#include "HTTPClient.h"
#include "ArduinoJson.h"

const char* ssid = "Choptop";
const char* password = "choptop.vn";
const char* serverUrl = "http://192.168.1.83:3000/wifi";

void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, password);
  Serial.println("Đang kết nối wifi...");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\n Đã kết nối WiFi!");
  
}

void loop() {
  String json = "{\"ssid\":\"" + String(ssid) + "\",\"password\":\"" + String(password) + "\"}";

  StaticJsonDocument<200> doc; // Adjust size as needed
  doc["sensor"] = "temperature";
  doc["value"] = 25.5;
  String jsonString;
  serializeJson(doc, jsonString);

  HTTPClient http;
  http.begin(serverUrl);
  http.addHeader("Content-Type","application/json");
  int httpResponseCode = http.POST(json);
  Serial.printf("HTTP POST: %d\n", httpResponseCode);

  http.end();
  // Serial.println("Đang quét WiFi...");

  // int n = WiFi.scanNetworks();  // Quét mạng
  // if (n == 0) {
  //   Serial.println("Không tìm thấy mạng nào.");
  // } else {

  //   for (int i = 0; i < n; ++i) {
  //     String ssid = WiFi.SSID(i);
  //     int rssi = WiFi.RSSI(i);

  //     Serial.printf("Gửi: %s (%d dBm)\n", ssid.c_str(), rssi);

  //     HTTPClient http;
  //     http.begin(serverUrl);
  //     http.addHeader("Content-Type:","application/json");

  //     String json = "{\"ssid\":\"" + ssid + "\",\"rssi\":" + String(rssi) + "}";

  //     int httpResponseCode = http.POST(json);
  //     Serial.printf("HTTP POST: %d\n", httpResponseCode);

      
  //     http.end();
  //     delay(300);
  //   }
  // }

  Serial.println("------------------------\n");
  // Serial.println(WiFi.localIP());
  delay(10000);  // Đợi 10 giây rồi quét lại
}
