// Initial setup
var password = "Parzival";
var resetPassword = "first-to-the-key";
var isPasswordEntered = false;
var scoreboard = JSON.parse(localStorage.getItem('scoreboard')) || [];
var currentPoints = parseInt(localStorage.getItem('currentPoints')) || 100000;

// Function to handle document load
document.addEventListener("DOMContentLoaded", function () {
  if (!localStorage.getItem('isPasswordEntered')) {
    openModal('passwordModal', 'password');
  }
});

// Function to open a modal
function openModal(modalId, focusInputId) {
  var modal = document.getElementById(modalId);
  modal.style.display = 'flex';

  if (focusInputId) {
    var input = document.getElementById(focusInputId);
    input.value = '';
    input.focus();
  }
}

// Function to close a modal
function closeModal(modalId) {
  var modal = document.getElementById(modalId);
  modal.style.display = 'none';
}

// Function to open password modal
function openPasswordModal() {
  openModal('passwordModal', 'password');
}

// Function to close password modal
function closePasswordModal() {
  closeModal('passwordModal');
}

// Function to open username modal
function openUsernameModal() {
  openModal('usernameModal', 'username');
}

// Function to open invalid password modal
function openInvalidPasswordModal() {
  openModal('invalidPassword');
}

// Function to open error message modal
function openErrorMessageModal() {
  openModal('errorMessageModal');
}

// Function to open username exists modal
function openUsernameExistsModal() {
  openModal('usernameExistsModal');
}

// Function to process password
function processPassword() {
  var enteredPassword = document.getElementById('password').value;

  if (enteredPassword === password) {
    isPasswordEntered = true;
    localStorage.setItem('isPasswordEntered', 'true');
    closePasswordModal();
    openUsernameModal();
  } else if (enteredPassword === resetPassword) {
    resetScoreboard();
    closePasswordModal();
  } else {
    openInvalidPasswordModal();
  }
}

// Function to process username
function processUsername() {
  var enteredUsername = document.getElementById('username').value;

  var usernameExists = scoreboard.some(function (entry) {
    return entry.username.toLowerCase() === enteredUsername.toLowerCase();
  });

  if (usernameExists && scoreboard.length > 0) {
    openUsernameExistsModal();
  } else if (!usernameExists && currentPoints > 0 && enteredUsername) {
    addToScoreboard(enteredUsername, currentPoints);
    currentPoints = Math.floor(currentPoints / 2);

    localStorage.setItem('scoreboard', JSON.stringify(scoreboard));
    localStorage.setItem('currentPoints', currentPoints);

    updateScoreboardDisplay();
    closeModal('usernameModal');
  } else if (currentPoints <= 0) {
    openErrorMessageModal();
  }

  // Close all modals after processing username
  closeModal('usernameExistsModal');
  closeModal('invalidPassword');
  closeModal('errorMessageModal');
}

// Function to add entry to scoreboard
function addToScoreboard(username, points) {
  scoreboard.push({ username: username, points: points });
}

// Function to update scoreboard display
function updateScoreboardDisplay() {
  var scoreboardList = document.getElementById("scoreboard");
  scoreboardList.innerHTML = "";

  scoreboard.forEach(function (entry) {
    var listItem = document.createElement("li");
    listItem.classList.add("red-text");

    var usernameSpan = document.createElement("span");
    usernameSpan.classList.add("username");
    usernameSpan.appendChild(document.createTextNode(entry.username));

    var pointsSpan = document.createElement("span");
    pointsSpan.classList.add("points");
    pointsSpan.appendChild(document.createTextNode(entry.points + " points"));

    listItem.appendChild(usernameSpan);
    listItem.appendChild(pointsSpan);

    scoreboardList.appendChild(listItem);
  });
}

// Function to toggle password visibility
function togglePasswordVisibility(inputId) {
  var passwordInput = document.getElementById(inputId);
  passwordInput.type = (passwordInput.type === 'password') ? 'text' : 'password';
}

// Function to reset the scoreboard
function resetScoreboard() {
  scoreboard = [];
  currentPoints = 100000;
  localStorage.setItem('scoreboard', JSON.stringify(scoreboard));
  localStorage.setItem('currentPoints', currentPoints);
  updateScoreboardDisplay();
}

// Event listener for scrolling to scoreboard
document.querySelector('.square-button').addEventListener('click', function () {
  document.getElementById('scoreboardContainer').scrollIntoView({ behavior: 'smooth' });
});

// Event listener for Copper Key button hover effect
var copperKeyButton = document.getElementById('copperKeyButton');
copperKeyButton.addEventListener('mouseenter', function () {
  copperKeyButton.style.transform = 'scale(1.1)';
});

copperKeyButton.addEventListener('mouseleave', function () {
  copperKeyButton.style.transform = 'scale(1)';
});

// Event listener for Copper Key button click
copperKeyButton.addEventListener('click', function () {
  openPasswordModal();
});

// Event listeners for button clicks
document.getElementById('copperKeyButton').addEventListener('click', function () {
  openPasswordModal();
});

document.getElementById('submitButton').addEventListener('click', function () {
  processPassword();
});

document.getElementById('usernameSubmitButton').addEventListener('click', function () {
  processUsername();
});

// Additional event listener for Enter key in modals
document.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    if (document.getElementById('passwordModal').style.display === 'flex') {
      processPassword();
    } else if (document.getElementById('usernameModal').style.display === 'flex') {
      processUsername();
    }
  }
});
