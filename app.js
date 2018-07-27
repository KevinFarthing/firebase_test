

var appid = "8d3a60d4a1f2d1883d961aa33ccbe29b"
//var url = `https://api.openweathermap.org/data/2.5/weather?q=chicago,usk&appid=${appid}`
var url = `https://marketdata.websol.barchart.com/getQuote.json?apikey=8d3a60d4a1f2d1883d961aa33ccbe29b&symbols=AAPL,GOOG,NOG`


$.get(url, data => {
    var ApplelastPrice = data.results[0].lastPrice
    var Appleopen = data.results[0].open
    var Appleclose = data.results[0].close
    var GooglelastPrice = data.results[1].lastPrice
    var Googleopen = data.results[1].open
    var Googleclose = data.results[1].close
    var NOGlastPrice = data.results[2].lastPrice
    var NOGopen = data.results[2].open
    var NOGclose= data.results[2].close
console.log(ApplelastPrice, Appleopen, Appleclose, GooglelastPrice, Googleopen, Googleclose, NOGlastPrice, NOGopen, NOGclose);
    });



