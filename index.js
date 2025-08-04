const BASE = "https://fsa-crud-2aa9294fe819.herokuapp.com/api";
const COHORT = "/2507-FTB-ET-WEB-FT"; 
const RESOURCE = "/events";
const API = BASE + COHORT + RESOURCE;

let events = [];
let selectedEvent;

async function getEvents() {
  try {
    const response = await fetch(API);
    const data = await response.json();
    events = data.data;
  } catch (error) {
    console.error(error);
  }
};

async function getEvent(id) {
  try {
    const res = await fetch(`${API}/${id}`);
    const data = await res.json();
    selectedEvent = data.data;
    console.log(selectedEvent);
  } catch (error) {
    console.error(error);
  }
}

function EventListItem(event) {
  const $li = document.createElement("li");
  const $a = document.createElement("a");
  $a.setAttribute("href", "#selected");
  $a.innerHTML = event.name;
  $a.dataset.eventId = event.id;
  $a.addEventListener("click", async (clickEvent) => { 
    clickEvent.preventDefault(); 
    await getEvent(clickEvent.target.dataset.eventId); 
    render(); 
  });
  $li.appendChild($a);
  return $li;
}

function EventList() {
  const $ul = document.createElement("ul");
  $ul.classList.add("lineup");
  events.forEach((event) => {
    const $li = document.createElement("li");
    const eventContent = EventListItem(event); 
    $li.appendChild(eventContent); 
    $ul.appendChild($li); 
  });
  return $ul;
}

function EventDetails() {
  if (!selectedEvent) {
    const $p = document.createElement("p");
    $p.textContent = "Please select a party to learn more.";
    return $p;
  }

  const $section = document.createElement("section");
  const $h3 = document.createElement("h3");
  const $figure = document.createElement("figure");
  const $img = document.createElement("img");
  const $date = document.createElement("p"); 
  const $location = document.createElement("p");
  const $p = document.createElement("p");
  $section.classList.add("event");
  $h3.textContent = `${selectedEvent.name} #${selectedEvent.id}`;
  $img.setAttribute("alt", selectedEvent.name);
  $img.setAttribute("src", selectedEvent.imageUrl); 
  $date.textContent = selectedEvent.date;
  $location.textContent = selectedEvent.location;
  $p.textContent = selectedEvent.description;
  $figure.append($img);
  $section.append($h3); 
  $section.append($figure); 
  $section.append($date); 
  $section.append($location);
  $section.append($p);
  return $section;
}

function render() {
  const $app = document.querySelector("#app");
  $app.innerHTML = `
    <h1>Party Planner</h1>
    <main>
      <section>
        <h2>Upcoming Parties</h2>
        <EventList></EventList>
      </section>
      <section id="selected">
        <h2>Party Details</h2>
        <EventDetails></EventDetails>
      </section>
    </main>
  `;
  $app.querySelector("EventList").replaceWith(EventList());
  $app.querySelector("EventDetails").replaceWith(EventDetails());
}

async function init() {
  await getEvents();
  render();
}

init();