const userDataJSON = localStorage.getItem("userData"); // retrieve data from local storage
const userData = JSON.parse(userDataJSON); // parse data back to

const userNameAndScoreDisplayEl = document.getElementById("userNameAndScoreDisplay"); // save the button tag from HTML to a variable

userNameAndScoreDisplayEl.textContent = `${userData.newName}: ${userData.score}`; // display name and score using a template literal and .textContent method