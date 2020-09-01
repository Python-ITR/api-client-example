import axios from "axios";
import * as _ from "lodash";

function main() {
  const story_card_tpl = _.template(
    document.querySelector("#story_card_tpl").innerHTML
  );
  axios.get("http://localhost:9999/api/stories").then((res) => {
    console.log(
      res.data.forEach((story) => {
        console.log(story_card_tpl({ title: story.title }));
      })
    );
  });
}

window.addEventListener("load", main);
