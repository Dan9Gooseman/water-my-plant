#include "WiFi.h"
#include "time.h"
#include "HTTPClient.h"
#include "ArduinoJson.h"
#include "secret.h"

const char* ssid = WIFI_SSID;
const char* password = WIFI_PASSWORD;
const char* serverUrl = SERVER_URL;
// const char* ntpServer = "pool.ntp.org";
// const long gmtOffset_sec = 7 * 3600;
// const int daylightOffset_sec = 0;

//utility
// void printLocalTime() {
//   struct tm timeinfo;
//   if(!getLocalTime(&timeinfo)){
//     Serial.println("Failed to obtain time");
//     return;
//   }
//   Serial.println(&timeinfo, "%A, %B %d %Y %H:%M:%S");
//   Serial.print("Day of week: ");
//   Serial.println(&timeinfo, "%A");
//   Serial.print("Month: ");
//   Serial.println(&timeinfo, "%B");
//   Serial.print("Day of Month: ");
//   Serial.println(&timeinfo, "%d");
//   Serial.print("Year: ");
//   Serial.println(&timeinfo, "%Y");
//   Serial.print("Hour: ");
//   Serial.println(&timeinfo, "%H");
//   Serial.print("Hour (12 hour format): ");
//   Serial.println(&timeinfo, "%I");
//   Serial.print("Minute: ");
//   Serial.println(&timeinfo, "%M");
//   Serial.print("Second: ");
//   Serial.println(&timeinfo, "%S");

//   Serial.println("Time variables");
//   char timeHour[3];
//   strftime(timeHour,3, "%H", &timeinfo);
//   Serial.println(timeHour);
//   char timeWeekDay[10];
//   strftime(timeWeekDay,10, "%A", &timeinfo);
//   Serial.println(timeWeekDay);
//   Serial.println();
// }

void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, password);
  Serial.println("Connecting to wifi...");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\n Wifi connected!");
  // configTime(gmtOffset_sec, daylightOffset_sec, ntpServer);
  // printLocalTime();
}

void loop() {
  //get current time
  // time_t now;
  // char strftime_buf[64];
  // struct tm timeinfo;

  // time(&now);
  // setenv("TZ", "ICT-7", 1); //indo time == vietnam
  // tzset();

  // localtime_r(&now, &timeinfo);
  // strftime(strftime_buf, sizeof(strftime_buf), "%c", &timeinfo);
  // Serial.printf("Thời gian hiện tại ở Việt Nam: %s\n", strftime_buf);
  // printLocalTime();

  //wifi detail
  int rssi = WiFi.RSSI();
  String json = "{\"ssid\":\"" + String(ssid) + "\",\"rssi\":\"" + rssi * (-1) + "\"}";
  Serial.println(json);
  StaticJsonDocument<200> doc;
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
  delay(10000);  // 10s loop
}
