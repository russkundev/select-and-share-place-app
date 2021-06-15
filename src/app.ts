import axios from "axios";
import { Loader } from "@googlemaps/js-api-loader";
import { GoogleResponse } from "./google-response";

const GOOGLE_API_KEY = "{Google API here}";

const form = document.querySelector("form") as HTMLFormElement;
const inputAddress = document.getElementById("address") as HTMLInputElement;
const map = document.getElementById("map") as HTMLDivElement;

const loader = new Loader({
  apiKey: GOOGLE_API_KEY,
  version: "weekly",
});

const submitHandler = (event: Event) => {
  event.preventDefault();
  const address = inputAddress.value;

  axios
    .get<GoogleResponse>(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
        address
      )}&key=${GOOGLE_API_KEY}`
    )
    .then((response) => {
      if (response.data.status === "OK") {
        const location = response.data.results[0].geometry.location;
        loader
          .load()
          .then(() => {
            const gMap = new google.maps.Map(map, {
              center: location,
              zoom: 16,
            });
            new google.maps.Marker({ position: location, map: gMap });
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        throw new Error(response.data.status);
      }
    })
    .catch((error) => {
      alert(error.message);
      console.log(error);
    });
};

form.addEventListener("submit", submitHandler);
