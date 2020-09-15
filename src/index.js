import axios from "axios";
import $ from "jquery";
import * as _ from "lodash";
import L from "leaflet";

import "leaflet/dist/leaflet.css";
import marker_png from "leaflet/dist/images/marker-icon.png";
import "bootstrap/dist/css/bootstrap.css";
import "./styles/style.css";
import story_card from "./templates/story_card.ejs";

const CARD_TPL = _.template(story_card);
const DEFAULT_COORDS = [42.496403, 77.57438];

/**
 * Add new card on page
 * @arg {Object} story object
 */
function addNewCard(story) {
  const jBody = $("#cards_list");
  jBody.append($(CARD_TPL(story)));
}

function createMap(holder) {
  const standard_icon = L.icon({
    iconUrl: marker_png,
    iconSize: [38, 95],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
  });
  const map = L.map(holder, {
    center: DEFAULT_COORDS,
    zoom: 10,
  });

  L.tileLayer("https://a.tile.openstreetmap.de/{z}/{x}/{y}.png").addTo(map);
  return {
    map,
    icon: standard_icon,
  };
}

function addNewStoryMarker(map, story, icon) {
  L.marker([story.lat, story.lng], { icon }).addTo(map);
}

/**
 * @return {Promise} request result
 */
function fetchCards() {
  return axios.get("/api/stories").then((res) => {
    return res.data;
  });
}

function initStoryForm(form_el) {
  const map_holder = form_el.querySelector(".story_form__map");
  const lat_input = form_el.querySelector('[name="lat"]');
  const lng_input = form_el.querySelector('[name="lng"]');
  // create map
  const { map, icon } = createMap(map_holder);
  // create marker
  const marker = L.marker(DEFAULT_COORDS, { icon, draggable: true });
  marker.on("move", (e) => {
    lat_input.value = e.latlng.lat;
    lng_input.value = e.latlng.lng;
  });
  marker.addTo(map);
  // обработка события submit
  form_el.addEventListener("submit", (event) => {
    event.preventDefault();
    const inputs = Array.from(form_el.elements).filter((control) =>
      ["TEXTAREA", "INPUT"].includes(control.tagName)
    );
    const form_data = inputs.reduce((acc, el) => {
      acc[el.name] = el.value;
      return acc;
    }, {});
    axios.post("/api/stories", form_data).then((response) => {
      console.log(response);
      window.location.reload();
    });
  });
}

function main() {
  const { map, icon } = createMap(document.getElementById("map_holder"));
  initStoryForm(document.querySelector(".story_form"));
  fetchCards().then((stories) => {
    for (let i = 0; i < stories.length; i++) {
      addNewCard(stories[i]);
      addNewStoryMarker(map, stories[i], icon);
    }
  });
}

window.addEventListener("load", main);
