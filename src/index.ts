import express, { Request, Response, NextFunction } from 'express';
import axios, { AxiosResponse } from 'axios';
import dotenv from 'dotenv'

dotenv.config()
const app = express();
const port = 3000;
const apiKey = process.env.CURRENCY_API_KEY as string;


// get current rates based on the US Dollar
app.get('/latest/:baseCurrency', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const baseCurrency = req.params.baseCurrency;
    const response: AxiosResponse = await axios.get(`https://api.currencybeacon.com/v1/latest?api_key=${apiKey}&base=${baseCurrency}`);
    console.log(`Response is ${response}`)
    res.json({ baseCurrency: baseCurrency, comparisons:  response.data.rates})
  } catch (error) {
    console.log(`Error when getting the latest rates: ${error}`);
    res.json({
      message: "Try /latest/baseCurrency such as /latest/USD"
    })
  }
});

// get all currencies supported by the api
app.get('/all/:currencyType', async ( req: Request, res: Response, next: NextFunction ) => {
  try {
    const currencyType = req.params.currencyType;
     const response: AxiosResponse = await axios.get(`https://api.currencybeacon.com/v1/currencies?api_key=${apiKey}&type=${currencyType}`);
    console.log(`Response is ${response}`);
     res.json({
       currencyType: currencyType,
       response: response.data.response
     });
  } 
  catch ( err ) {
    console.log(`Error when fetching all currencies: ${err}`);
    res.json({
      message: "Error occured. Try selecing what type of currency, maybe fiat or crypto"
    })
  }
})

// Convert currency to , from and amount
app.get('/convert:from/:to/:amount', async ( req: Request, res: Response, next: NextFunction ) => {
  try {
    const { from, to, amount } = req.query;
     const response: AxiosResponse = await axios.get(`https://api.currencybeacon.com/v1/convert?api_key=${apiKey}`);
    console.log(`Response is ${response}`);
     res.json({
      from: from,
      to: to,
      amount: amount,
      conversion: response.data
     });
  } 
  catch ( err ) {
    console.log(`Error when converting currencies: ${err}`);
    res.json({
      message: "Error when converting currencies, try specifying from/to/amount such as /KES/USD/5000"
    })
  }
})


// Get historical context of of exachange rate data, from 1996 actually
app.get('/history/:base/:date', async ( req: Request, res: Response, next: NextFunction ) => {
  try {
    const { base, date } = req.query;
     const response: AxiosResponse = await axios.get(`https://api.currencybeacon.com/v1/historical?api_key=${apiKey}`);
    console.log(`Response is ${response}`);
     res.json({
       baseCurrency: base,
       date: date,
       history: response.data
     })
  } 
  catch ( err ) {
    console.log(`Error when digging into the past: ${err}`);
    res.json({
      message: "Error when checking history, maybe try /history/base/date such as /history/USD/10-10-2024"
    })
  }
})


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
