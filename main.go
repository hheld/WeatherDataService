// WeatherDataService project main.go
package main

import (
	"encoding/json"
	"database/sql"
	"fmt"
	_ "github.com/mattn/go-sqlite3"
	"log"
	"net/http"
	"time"
)

var db, _ = sql.Open("sqlite3", "./weewx.sdb")
const timeFormat = "2006-01-02T15:04:05"

type WeatherData struct {
	TimePoints []time.Time
	DataPoints []float64
}

func getWeatherData(w http.ResponseWriter, r *http.Request) {
	queryValues := r.URL.Query()
	quantity := r.URL.Path[10:]

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

	weatherData := getDataFromDb(quantity, fromTime, toTime)

	b, err := json.Marshal(weatherData)

	if err != nil {
        log.Fatal(err)
    }

	w.Write(b)
}

func getDataFromDb(quantity string, from, to int64) WeatherData {
	queryStr := fmt.Sprintf("SELECT dateTime,%s FROM archive WHERE dateTime>=? AND dateTime<=?", quantity)
	rows, err := db.Query(queryStr, from, to)

	if err != nil {
        log.Fatal(err)
    }

	defer rows.Close()

	timePoints := make([]time.Time, 0)
	dataPoints := make([]float64, 0)

	for rows.Next() {
		var dateTimeValue int64
		var quantityValue float64

		if err := rows.Scan(&dateTimeValue, &quantityValue); err != nil {
			log.Fatal(err)
		}

		timePoints = append(timePoints, time.Unix(dateTimeValue, 0))
		dataPoints = append(dataPoints, quantityValue)
	}

	return WeatherData{timePoints, dataPoints}
}

func main() {
	defer db.Close()

	http.HandleFunc("/wdrf/api/", getWeatherData)

	log.Fatal(http.ListenAndServe(":9090", nil))
}
