import express, {Express, Request, Response} from "express";
import axios from "axios";

//using the weather forecast API from open-meteo

const app = express();

const port:3000 = 3000;

const directory:string = __dirname + '/../views';

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/', (req: Request, res: Response) =>{

    res.render('index.ejs');

});

app.get('/weather', (req: Request, res: Response) => {

    let params:object = {};
    let api_response:object = {};

    const apiurl = "https://api.open-meteo.com/v1/forecast";

    const oras = req.query.cityId;
    if (oras == 'Bucharest'){
        params = {

            "latitude": 44.45,
            "longitude": 26.11,
            "hourly": "temperature_2m"

        }

    }

    axios.get(apiurl, {params})

    .then((response) =>{
        //console.log(response.data.hourly);
        //console.log('OpenMeteo API data successfully retrieved!');
        api_response = response.data;
     
    })
    .catch((error)=>{
        console.log('Error when retrieving data from the OpenMeteoAPI: ' + error);
    })
    .finally(()=>{
        //console.log('Weather page rendered successfully with the API data!')
        res.render('weather.ejs', {json_data:api_response, oras:oras});
    });

    
});

app.listen(port, () =>{

    console.log('Server opened at: http://localhost:' + port);
  

})