# Venue API

Thank you very much to Headbox for giving me the opportunity to take this tech test. It was great fun!
My implementation is written using Typescript and the well-known Express framework.

## Running the project
* First, install the deps with `npm install`
* Start the server with `npm run start`
* Start the dev server with `npm run dev`. This uses `nodemon` and the Typescript compiler's `--watch` flag to implement hot module reloading.

## Using the API
* I decided to treat spaces, venues and bookings as separate resources, available under the routes `/spaces`, `/bookings` and `/venues`.
* The root `/` does not return any data. It just returns a welcome message and instructions for operating the API.
* Data filtering is handled via query parameters. A request to `/spaces?venue=fulham%20palace` will return a list of spaces at the Fulham Palace venue.
* Bookings can be filtered by venue, status and date. So a request to `/bookings?venue=fulham%20palace&date=2019-03-31&status=cancelled` will return a list of cancelled bookings at Fulham Palace on the 31 March 2019.
  The query params are of course optional.
* Bad requests will result in a 400 error. Internal server errors will result in a 500 error.

## Running the tests
* Tests are written using the Jest framework.
* Run them with `npm run test`

## Implementation details
### Importing data
* I decided to use the `csvtojson` third-party library to read the csv data, which I've stored locally. 
  This made it simple to separate concerns in my `BookingDataDao` class and test it with mock data.
  
* I considered using Node.js native tools to undertake this operation and to write my own json converter. This would have been an interesting challenge but I felt I did not have enough time to do it justice.

* Currently the data dir is not copied over to the `dist` directory where the compiled .js files are. This is perhaps unsatisfactory. With more time I would have wanted to copy the data over to the `dist`, or find a better way of storing and accessing the data.
