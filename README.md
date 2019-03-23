# APOD Email Subscription
NASA features a different image of our fantastic universe every day on this website - [apod](https://apod.nasa.gov/apod/astropix.html). The pictures are very good and there is usually a very interesting explaination for each picture. 


Visiting that page each day for viewing picture and reading explanination may not be possible. Hence, I built this website through which you can enter your email and each day you'll get picture and explaination in your email at 10:00 AM IST. 

## Getting Started
* Clone the repository `$ git clone https://github.com/harshit23897/APOD-Email-subscription.git* `
* Install node dependencies `$ npm install`
* Go to **frontend** folder and install react dependencies 
```sh
  cd frontend/
  npm install
```
* Go to NASA Open API website - [openapi](https://api.nasa.gov/index.html) and sign up for an API key.
* Go to mlab and make a new database. Copy MongoDB URI from there.
* Make a new .env file in **APOD-Email-Subscription** folder
* Enter the following environment variables in .env file:
```
MONGO_URI=
NASA_API_KEY=
EMAIL_USERNAME=
EMAIL_PASSWORD=
```
* Run this command to start server:
```sh
npm run dev
```

## Contributing
Feel free to raise issues and send PRs.
