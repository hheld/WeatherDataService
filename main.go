// WeatherDataService project main.go
package main

import (
	"log"
	"net/http"
	"time"
)

func getWeatherData(w http.ResponseWriter, r *http.Request) {
	queryValues := r.URL.Query()
	quantity := r.URL.Path[1:]

	const timeFormat = "2006-01-02T15:04:05"

	var fromTime int64
	if from := queryValues["from"]; len(from) == 1 {
		actualFromTime, _ := time.Parse(timeFormat, from[0])
		fromTime = actualFromTime.Unix()
	}

	var toTime int64
	if to := queryValues["to"]; len(to) == 1 {
		actualToTime, _ := time.Parse(timeFormat, to[0])
		toTime = actualToTime.Unix()
	}

	log.Printf("Got the following request: %s from %d to %d.", quantity, fromTime, toTime)
}

func main() {
	http.HandleFunc("/", getWeatherData)

	log.Fatal(http.ListenAndServe(":9090", nil))
}
