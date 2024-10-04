import { useEffect, useState } from "react";
import timestamp from "unix-timestamp";
import axios from "axios";
function Getdata() {
  const [userlatlong, setLatlong] = useState({
    userlatitude: "",
    userLongitude: "",
  });

  var userLocation = navigator.geolocation;
  userLocation.getCurrentPosition((position) => {
    setLatlong({
      userlatitude: position.coords.latitude,
      userLongitude: position.coords.longitude,
    });
  });

  const [positionobject, setpositiononj] = useState({});

  useEffect(() => {
    async function getsat() {
      try {
        if (
          userlatlong.userLongitude !== "" &&
          userlatlong.userlatitude !== ""
        ) {
          var response = await axios.get(
            "http://localhost:5000/n2yo/rest/v1/satellite/radiopasses/39084/" +
              "55.13079950168493" +
              "/" +
              "-120.98817586290781" +
              "/0/10/78/&apiKey=FKD8P9-RSUKDY-L3M9N8-5CG4"
          );
          var response2 = await axios.get(
            "http://localhost:5000/n2yo/rest/v1/satellite/positions/39084/" +
              userlatlong.userlatitude +
              "/" +
              userlatlong.userLongitude +
              "/0/300/&apiKey=FKD8P9-RSUKDY-L3M9N8-5CG4"
          );
          setpositionobj(response2.data);
          response.data.passes.map((pass) => {
            console.log(String(timestamp.toDate(pass.startUTC)));
          });
        }
      } catch (error) {
        console.log(error);
      }
    }

    getsat();
  }, [userlatlong.userLongitude, userlatlong.userlatitude]);

  // if ("geolocation" in navigator) {
  //   navigator.geolocation.getCurrentPosition((position) => {
  //     console.log(position);
  //   });
  // }

  return (
    <>
      <h1>{userlatlong.userLongitude}</h1>
    </>
  );
}

export default Getdata;
