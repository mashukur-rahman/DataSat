const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
var mysql = require("mysql2");
const axios = require("axios");
var ee = require("@google/earthengine");
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "DataSat",
});
const app = express();
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyparser.json());

app.post("/requestdata", (req, res) => {
  const qry = "insert into request values(?,?,?,?)";
  connection.query(
    qry,
    ["demo", req.body.date, req.body.lat, req.body.long],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(result);
    }
  );
  // callGoogleearth();
});

// const privateKey = require("./key.json");

// ee.data.authenticateViaPrivateKey(privateKey, () => {
//   ee.initialize(null, null, () => {
//     console.log("Earth Engine client initialized.");
//   });
// });

// var callGoogleearth = async (date, email, lat, long) => {
//   try {
//     console.log(date, email, lat, long);

//     var point = ee.Geometry.Point([-122.292, 37.9018]);
//     var l8 = ee.ImageCollection("LANDSAT/LC08/C02/T1_TOA");

//     // Get the least cloudy image for 2020
//     var image = ee.Image(
//       l8
//         .filterBounds(point)
//         .filterDate("2020-01-01", "2020-12-31")
//         .sort("CLOUD_COVER")
//         .first()
//     );

//     // Compute NDVI (Normalized Difference Vegetation Index)
//     var ndvi = image.normalizedDifference(["B5", "B4"]).rename("NDVI");

//     // Use `reduceRegion` to calculate the NDVI value for the point
//     var ndviValue = ndvi.reduceRegion({
//       reducer: ee.Reducer.mean(), // Computes the mean NDVI value
//       geometry: point, // Focus on the point
//       scale: 30, // Scale in meters (30 for Landsat)
//       maxPixels: 1e9, // Maximum number of pixels to include
//     });

//     // Evaluate the NDVI value and handle the result in a callback
//     ndviValue.evaluate((result) => {
//       if (result) {
//         console.log("NDVI Value:", result.NDVI);
//       } else {
//         console.log("No NDVI value found.");
//       }
//     });

//     var ndwi = image.normalizedDifference(["B3", "B5"]).rename("NDWI");

//     // Reduce region to calculate NDWI for the point
//     var ndwiValue = ndwi.reduceRegion({
//       reducer: ee.Reducer.mean(),
//       geometry: point,
//       scale: 30,
//       maxPixels: 1e9,
//     });

//     // Evaluate and log NDWI value
//     ndwiValue.evaluate((result) => {
//       if (result) {
//         console.log("NDWI Value:", result.NDWI);
//       } else {
//         console.log("No NDWI value found.");
//       }
//     });

//     var radiance = image.select("B10").multiply(0.0003342).add(0.1); // Constants from metadata (vary based on image)

//     // Convert radiance to brightness temperature (LST)
//     var lst = radiance.log().multiply(-1321.0789).add(774.8853); // Constants from metadata (Planck function)

//     // Reduce region to calculate LST for the point
//     var lstValue = lst.reduceRegion({
//       reducer: ee.Reducer.mean(),
//       geometry: point,
//       scale: 30,
//       maxPixels: 1e9,
//     });

//     // Evaluate and log LST value
//     lstValue.evaluate((result) => {
//       if (result) {
//         console.log("LST Value (K):", result.B10);
//       } else {
//         console.log("No LST value found.");
//       }
//     });
//     var LST = "303k";
//   } catch (error) {
//     console.error("Error fetching data from Google Earth Engine:", error);
//   }
// };

// const checkDates = () => {
//   const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

//   // Query to get dates from your database
//   connection.query(
//     "SELECT email, date, latitude, longitude FROM request",
//     (error, results) => {
//       if (error) throw error;

//       results.forEach((row) => {
//         const dbDate = row.date;
//         callGoogleearth(dbDate, email, latitude, longitude);
//         // Compare database date with today's date
//         if (dbDate === today) {
//           callGoogleearth(dbDate, email, latitude, longitude);
//         } else if (dbDate < today) {
//           console.log(`Date ${dbDate} is older than today. Discarding...`);
//         }
//       });
//     }
//   );
// };

app.listen(3000, (req, res) => {});
