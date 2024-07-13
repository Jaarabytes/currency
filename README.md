## Currency

This API deals with currencies and their respective rates.

## Usage
| **Endpoint** | **Functioning** |
| ------------ | --------------- |
|`/`| Returns a JSON welcome message|
|`/latest/USD`| Returns a JSON showing the latest currency rates based on the US Dollar|
|`/all/crypto`| Returns a JSON showing all current rates of crypto|
|`/convert/KES/USD/300`| Returns a JSON showing the conversion of KES to USD based on the input amount|
|`/history/USD/12-12-2000`| Returns a JSON showing the US Dollar rates on the date specified (12-12-2000)|

## Installation
Prerequisites:
- Node installed
- Typescript installed

Clone the git repository and install the required dependiencies;

```bash
git clone git@github.com:Jaarabytes/currency.git    
npm install

```
To run it locally, obtain an API key from [here](https://currencybeacon.com/api-documentation?ref=morioh.com&utm_source=morioh.com) :
```bash
tsc && node src/index.js

```

## Conributions

To contribute:
- Fork the repository
- Create your branch
- Make you respective contribution
- Open a pull request
