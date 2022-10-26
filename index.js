import { ColorStrip } from "./colorStrip.js";

let colorStripArray = [];
let mode = "";

document.getElementById("btn-select").addEventListener("click", (e) => {
  let color = document.getElementById("color-picker").value;
  color = color.replace("#", "");
  mode = document.getElementById("color-selector").value;
  console.log(mode);

  getColors(color);
});

const getColors = (color) => {
  colorStripArray = [];
  fetch(`https://www.thecolorapi.com/scheme?hex=${color}&mode=${mode}`)
    .then((res) => res.json())
    .then((data) => {
      data.colors.forEach((color) => {
        let colorStrip = new ColorStrip(color.hex.value, color.hex.clean);
        colorStripArray.push(colorStrip);
      });

      console.log("Colors got, rendering..");
      render();
    });
};

const render = () => {
  let colorHtml = ``;
  colorStripArray.forEach((colorStrip) => {
    colorHtml += `
            <div class="strip">
            <div class="color-strip" style="background-color: ${colorStrip.stripColor}"></div>
            <div class="color-strip-text">#${colorStrip.stripText}</div>
            </div>
        `;
  });

  document.getElementById("color-strips").innerHTML = colorHtml;
};

getColors("559aa2");
