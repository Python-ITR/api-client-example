import axios from "axios";
import $ from "jquery";
import * as _ from "lodash";
import L from "leaflet";

import "leaflet/dist/leaflet.css";
import marker_png from "leaflet/dist/images/marker-icon.png";
import "bootstrap/dist/css/bootstrap.css";
import "./styles/style.css";
import story_card from "./templates/story_card.ejs";

function main() {
  const standard_icon = L.icon({
    iconUrl: marker_png,
    iconSize: [38, 95],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
  });
  const map = L.map("map_holder", {
    center: [42.496403, 77.57438],
    zoom: 10,
  });

  L.tileLayer("https://a.tile.openstreetmap.de/{z}/{x}/{y}.png").addTo(map);

  // add cards
  const jBody = $(".row");
  const story_card_tpl = _.template(story_card);
  axios.get("http://localhost:9999/api/stories").then((res) => {
    console.log(
      res.data.forEach((story) => {
        jBody.append($(story_card_tpl(story)));
        L.marker([story.lat, story.lng], { icon: standard_icon }).addTo(map);
      })
    );
  });
}

console.log("HELLO!");

window.addEventListener("load", main);
