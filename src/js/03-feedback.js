import throttle from "lodash.throttle";

const formEl = document.querySelector(".feedback-form");
const LOCAL_KEY = "feedback-form-state";
let currentData = {};
formEl.addEventListener("input", throttle(whenInput, 500));

function whenInput(event) {
  currentData[event.target.name] = event.target.value.trim();
  localStorage.setItem(LOCAL_KEY, JSON.stringify(currentData));
}

formEl.addEventListener("submit", whenSubmit);

function whenSubmit(e) {
  e.preventDefault();
  console.log(currentData);
  currentData = {};
  localStorage.removeItem(LOCAL_KEY);
  e.target.reset();
}

const onLoad = () => {
  try {
    const data = localStorage.getItem(LOCAL_KEY);
    if (!data) return;
    currentData = JSON.parse(data);
    Object.entries(currentData).forEach(([key, val]) => {
      formEl.elements[key].value = val;
    });
  } catch (error) {
    console.log(error.message);
  }
};

window.addEventListener("load", onLoad);
