# TT Flood Relief Form
![](https://res.cloudinary.com/rezziemaven/image/upload/v1540265097/My%20Projects/TT%20Flood%20Relief%20Form/Screen_Shot_2018-10-23_at_5.24.38_AM.png)



This is a form for users to add relief centre locations in the wake of the recent flooding in Trinidad and Tobago. It is an ongoing project by the Caribbean Developers Group.

## Getting Started

1. Open the `config.js.example` file located in the `src` folder.
2. Replace the `accessToken` value with your own [MapBox](https://www.mapbox.com/signup/) token. This API allows up to 50,000 map views and geocode requests each on the free plan.
3. Replace the `postURL` value with the necessary URL to write to the database.
4. Rename the `config.js.example` file to `config.js`.
5. Run the `index.html` file. Everything should be working now.

## Quirks

The forward geocoding feature of the `MapBox API` doesn't appear to be completely accurate. The current workaround is to drag (not click) the marker to the correct location to update the `lat` and `lng` values in the form. Clicking the marker simultaneously updates these values as well as the current address. 