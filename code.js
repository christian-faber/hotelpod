const CAPSULE_COUNT = 100;
const capNumInput = document.querySelector("#bookingCapsule");
const guestNameInput = document.querySelector("#guest");
const checkoutInput = document.querySelector("#checkOutCapsule");
const bookForm = document.querySelector("#bookForm");
const checkoutForm = document.querySelector("#checkoutForm");
const messages = document.querySelector("#messages");
let timeout;

const handleMsgs = (msg, type) => {
  if (timeout) clearTimeout(timeout);
  messages.innerText = msg;
  messages.className = `alert alert-${type}`;

  setTimeout(() => {
    handleMsgs("", "info");
  }, 7000);
};

// const handleMessages = (i) => {
//   messages.classList.add("alert-success");
//   messages.classList.remove("alert-danger");
//   messages.classList.remove("alert-info");
//   messages.innerHTML = "Success!";
// };

// const handleErrors = (err) => {
//   messages.classList.add("alert-danger");
//   messages.classList.remove("alert-info");
//   messages.classList.remove("alert-success");

//change the message span's classes
//show the errMsg in the message span
// this can also be used to set it back to normal by taking in a classname as the second parameter
//};
// Book
const book = (evt) => {
  evt.preventDefault();
  const capNum = capNumInput.value;
  const guestName = guestNameInput.value;

  const capsule = document.querySelector(`#capsuleLabel${capNum}`);
  const guest = document.querySelector(`#guest${capNum}`);

  //messages.classList.add('alert-danger'); && .remove('alert-info')

  //if either are false
  //check to make sure form fields are filled out!
  if (!guestNameInput.value || !capNumInput.value) {
    handleMsgs("Forgot something!", "danger");

    //check to make sure capsule exists
  } else if (capNumInput.value > CAPSULE_COUNT) {
    handleMsgs("Can't count, idiot?", "danger");

    //check if capsule is available
  } else if (
    guest.innerHTML != "Unoccupied" &&
    capsule.classList != "badge-success"
  ) {
    handleMsgs("Ocupado!", "danger");
  } else {
    capsule.classList.remove("badge-success");
    capsule.classList.add("badge-danger");

    guest.innerHTML = guestName;
    handleMsgs("Success!", "success");
  }

  evt.target.reset();
};

bookForm.addEventListener("submit", book);

const checkOut = (evt) => {
  evt.preventDefault();
  // get the checkout room number from the input (select the input at the top of this page)
  const checkoutNum = checkoutInput.value;
  const out = document.querySelector(`#capsuleLabel${checkoutNum}`);
  const guest = document.querySelector(`#guest${checkoutNum}`);

  // make sure the room input is filled out
  // make sure the room is occupied
  // if the room is blank or unoccupied, show an error in messages
  // change the label and name back to the original state, including classes
  if (guest.innerHTML != "Unoccupied" && out.classList != "badge-danger") {
    out.classList.add("badge-success");
    out.classList.remove("badge-danger");

    guest.innerHTML = "Unoccupied";
    handleMsgs("Success!", "success");
  } else {
    handleMsgs("Can't do!", "danger");
  }
  evt.target.reset();
};

checkoutForm.addEventListener("submit", checkOut);

function init() {
  const capsuleContainer = document.getElementById("capsules");
  let html = "";
  for (let i = 0; i < CAPSULE_COUNT; i++) {
    html += `<div>
            <span id="capsuleLabel${
              i + 1
            }" class="badge badge-pill badge-success">Capsule #${i + 1}</span>
            &nbsp;<span id="guest${i + 1}">Unoccupied</span>
        </div>`;
  }
  capsuleContainer.innerHTML = html;
}

init();
// comment for github
