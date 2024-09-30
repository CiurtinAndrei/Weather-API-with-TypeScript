"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
//using the weather forecast API from open-meteo
const app = (0, express_1.default)();
const port = 3000;
const directory = __dirname + '/../views';
app.set('view engine', 'ejs');
app.use(express_1.default.static('public'));
app.get('/', (req, res) => {
    res.render('index.ejs');
});
app.get('/weather', (req, res) => {
    let params = {};
    let api_response = {};
    const apiurl = "https://api.open-meteo.com/v1/forecast";
    const oras = req.query.cityId;
    if (oras == 'Bucharest') {
        params = {
            "latitude": 44.45,
            "longitude": 26.11,
            "hourly": "temperature_2m"
        };
    }
    axios_1.default.get(apiurl, { params })
        .then((response) => {
        //console.log(response.data.hourly);
        //console.log('OpenMeteo API data successfully retrieved!');
        api_response = response.data;
    })
        .catch((error) => {
        console.log('Error when retrieving data from the OpenMeteoAPI: ' + error);
    })
        .finally(() => {
        //console.log('Weather page rendered successfully with the API data!')
        res.render('weather.ejs', { json_data: api_response, oras: oras });
    });
});
app.listen(port, () => {
    console.log('Server opened at: http://localhost:' + port);
});
