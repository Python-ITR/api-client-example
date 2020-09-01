import axios from "axios";
import $ from "jquery";
import * as _ from "lodash";

function main() {
  const jBody = $("body");
  const story_card_tpl = _.template(
    document.querySelector("#story_card_tpl").innerHTML 
  );

  axios.get("http://localhost:9999/api/stories").then((res) => {
    console.log(
      res.data.forEach((story) => {
        jBody.append($(story_card_tpl(story)))
      })
    );
  });
}

window.addEventListener("load", main);
