// Wrap your JavaScript code in a window.onload event to ensure the DOM is fully loaded
window.onload = function () {

  // Your Firebase configuration code...
  import { initializeApp } from 'firebase/app';
  import { getAnalytics } from 'firebase/analytics';

  const firebaseConfig = {
    apiKey: 'AIzaSyDgDpECVI6erhSBlPX_wPuzuoMULtq9TUw',
    authDomain: 'incogplanet-f8231.firebaseapp.com',
    projectId: 'incogplanet-f8231',
    storageBucket: 'incogplanet-f8231.appspot.com',
    messagingSenderId: '704204409452',
    appId: '1:704204409452:web:0f7c9b0f6a2b1f454c6649',
    measurementId: 'G-NDHFVS2WZ3',
  };

  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

  // Your existing JavaScript code...
  var password = "Parzival";
  var resetPassword = "first-to-the-key";
  var isPasswordEntered = false;
  var scoreboard = [];
  var currentPoints = 100000;

  // Function to load scoreboard data from local storage
  function loadScoreboardFromStorage() {
    if (localStorage.getItem('scoreboard')) {
      scoreboard = JSON.parse(localStorage.getItem('scoreboard'));
      updateScoreboardDisplay();
    }
  }

  // Function to load current points from local storage
  function loadCurrentPointsFromStorage() {
    if (localStorage.getItem('currentPoints')) {
      currentPoints = parseInt(localStorage.getItem('currentPoints'));
    }
  }

  function openPasswordModal() {
    var passwordModal = document.getElementById('passwordModal');
    passwordModal.style.display = 'flex';
    passwordModal.classList.add('modal-fade-in');
    document.getElementById('password').value = '';
    document.getElementById('password').focus();
  }

  function openUsernameModal() {
    var usernameModal = document.getElementById('usernameModal');
    usernameModal.style.display = 'flex';
    usernameModal.classList.add('modal-fade-in');
    document.getElementById('username').value = '';
    document.getElementById('username').focus();
  }

  function openInvalidPasswordModal() {
    var invalidPasswordModal = document.getElementById('invalidPassword');
    invalidPasswordModal.style.display = 'flex';
    invalidPasswordModal.classList.add('modal-fade-in');
  }

  function openErrorMessageModal() {
    var errorMessageModal = document.getElementById('errorMessageModal');
    errorMessageModal.style.display = 'flex';
    errorMessageModal.classList.add('modal-fade-in');
  }

  function openUsernameExistsModal() {
    var usernameExistsModal = document.getElementById('usernameExistsModal');
    usernameExistsModal.style.display = 'flex';
    usernameExistsModal.classList.add('modal-fade-in');
  }

  function closeModal(modalId) {
    var modal = document.getElementById(modalId);
    modal.style.display = 'none';
    modal.classList.remove('modal-fade-in');
  }

  function processPassword() {
    var enteredPassword = document.getElementById('password').value;

    if (enteredPassword === password) {
      isPasswordEntered = true;
      closeModal('passwordModal');
      openUsernameModal();
    } else if (enteredPassword === resetPassword) {
      resetScoreboard();
      closeModal('passwordModal');
    } else {
      openInvalidPasswordModal();
    }
  }

  function processUsername() {
    var enteredUsername = document.getElementById('username').value;

    var usernameExists = scoreboard.some(function (entry) {
      return entry.username.toLowerCase() === enteredUsername.toLowerCase();
    });

    if (currentPoints > 0 && enteredUsername && !usernameExists) {
      addToScoreboard(enteredUsername, currentPoints);
      currentPoints = Math.floor(currentPoints / 2);

      localStorage.setItem('scoreboard', JSON.stringify(scoreboard));
      localStorage.setItem('currentPoints', currentPoints);

      updateScoreboardDisplay();
      closeModal('usernameModal');
    } else if (usernameExists) {
      openUsernameExistsModal();
    } else {
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

  // Ensure event listeners are set up after the DOM is loaded
  document.getElementById('copperKeyButton').addEventListener('click', openPasswordModal);
  document.querySelector('.square-button').addEventListener('click', openPasswordModal);

  // Call functions to load data from local storage on page load
  loadScoreboardFromStorage();
  loadCurrentPointsFromStorage();
};
