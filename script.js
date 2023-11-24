var password = "Parzival";
var resetPassword = "first-to-the-key";
var isPasswordEntered = false;
var scoreboard = [];
var currentPoints = 100000;

document.addEventListener("DOMContentLoaded", function () {
  if (localStorage.getItem('isPasswordEntered') === 'true') {
    isPasswordEntered = true;
  }

  if (!isPasswordEntered) {
    openPasswordModal(); // Focus on the password input when the page loads
  }
});

function openPasswordModal() {
  document.getElementById('passwordModal').style.display = 'flex';
  document.getElementById('password').value = '';

  var passwordInput = document.getElementById('password');
  passwordInput.focus(); // Focus on the password input

  passwordInput.addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
      processPassword();
    }
  });
}

function openUsernameModal() {
  document.getElementById('usernameModal').style.display = 'flex';
  document.getElementById('username').value = '';

  var usernameInput = document.getElementById('username');
  usernameInput.focus(); // Focus on the username input

  usernameInput.addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
      processUsername();
    }
  });
}

function openInvalidPasswordModal() {
  document.getElementById('invalidPassword').style.display = 'flex';
}

function openErrorMessageModal() {
  document.getElementById('errorMessageModal').style.display = 'flex';
}

function openUsernameExistsModal() {
  document.getElementById('usernameExistsModal').style.display = 'flex';
}

function closeModal(modalId) {
  document.getElementById(modalId).style.display = 'none';
  if (modalId === 'usernameExistsModal' || modalId === 'invalidPassword' || modalId === 'errorMessageModal') {
    openPasswordModal(); // Focus on the password input after closing these modals
  }
}

function processPassword() {
  var enteredPassword = document.getElementById('password').value;

  if (enteredPassword === password) {
    isPasswordEntered = true;
    localStorage.setItem('isPasswordEntered', 'true');
    closeModal('passwordModal');
    openUsernameModal();
    return;  // Exit the function to prevent further execution
  } else if (enteredPassword === resetPassword) {
    resetScoreboard();
    closeModal('passwordModal');
    return;  // Exit the function to prevent further execution
  } else {
    openInvalidPasswordModal();
    return;  // Exit the function to prevent further execution
  }
}

function processUsername() {
  var enteredUsername = document.getElementById('username').value;

  var usernameExists = scoreboard.some(function(entry) {
    // Check if the entered username already exists in a case-insensitive manner
    return entry.username.toLowerCase() === enteredUsername.toLowerCase();
  });

  if (!usernameExists && currentPoints > 0 && enteredUsername) {
    addToScoreboard(enteredUsername, currentPoints);
    currentPoints = Math.floor(currentPoints / 2);

    localStorage.setItem('scoreboard', JSON.stringify(scoreboard));
    localStorage.setItem('currentPoints', currentPoints);

    updateScoreboardDisplay();
    closeModal('usernameModal');
  } else if (usernameExists) {
    openUsernameExistsModal();
  } else if (currentPoints <= 0) {
    openErrorMessageModal();
  }
}

function addToScoreboard(username, points) {
  scoreboard.push({
    username: username,
    points: points
  });
}

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

function togglePasswordVisibility(inputId) {
  var passwordInput = document.getElementById(inputId);
  passwordInput.type = (passwordInput.type === 'password') ? 'text' : 'password';
}

function resetScoreboard() {
  scoreboard = [];
  currentPoints = 100000;
  localStorage.setItem('scoreboard', JSON.stringify(scoreboard));
  localStorage.setItem('currentPoints', currentPoints);
  updateScoreboardDisplay();
}

if (localStorage.getItem('scoreboard')) {
  scoreboard = JSON.parse(localStorage.getItem('scoreboard'));
}

if (localStorage.getItem('currentPoints')) {
  currentPoints = parseInt(localStorage.getItem('currentPoints'));
}

document.addEventListener('keyup', function (event) {
  if (event.key === 'Enter') {
    if (document.getElementById('passwordModal').style.display === 'flex') {
      processPassword();
    } else if (document.getElementById('usernameModal').style.display === 'flex') {
      processUsername();
    }
    // Add other modal handling here if needed
  }
});
