import express from "express";
import axios from 'axios'


const app = express();
const port = 3000;
const apiKey = process.env.CURRENCY_API_KEY as string;
app.use(express.json())


// keep track of requests made per user
// generate a token key

// getting the latest currencies and their value;

app.get('/latest', ( req: Request , res: Response ) => {
const latest = axios.get(`https://api.currencybeacon.com/v1/latest?api_key=${apiKey}`)
return res.status(200).json(latest)
})


app.listen( port, () => {
  console.log(`Server running on port ${port}`)
})
