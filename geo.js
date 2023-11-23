<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fun with HTML, CSS, and JavaScript</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            text-align: center;
            margin: 50px;
        }

        button {
            padding: 10px;
            font-size: 16px;
            margin-bottom: 20px;
            cursor: pointer;
        }

        h1, h2, p {
            margin-bottom: 20px;
        }

        .animated-box {
            width: 100px;
            height: 100px;
            background-color: coral;
            animation: bounce 1s infinite;
        }

        .image-gallery {
            display: flex;
            justify-content: space-around;
        }

        .image-gallery img {
            width: 200px;
            height: 150px;
            object-fit: cover;
            border: 2px solid #333;
            border-radius: 8px;
            transition: transform 0.3s;
        }

        .image-gallery img:hover {
            transform: scale(1.1);
        }

        .dancing-text {
            animation: dance 1s infinite;
        }

        @keyframes dance {
            0%, 100% {
                transform: translateY(0);
            }
            50% {
                transform: translateY(-20px);
            }
        }

        .emoji-rain {
            height: 100vh;
            overflow: hidden;
            position: relative;
        }

        .emoji {
            position: absolute;
            animation: fall linear infinite;
        }

        @keyframes fall {
            to {
                transform: translateY(100vh);
            }
        }
    </style>
</head>
<body>

<button onclick="changeColor()">Change Color</button>
<h1 id="colorText">Change my color!</h1>

<button onclick="shakeMagic8Ball()">Shake the Magic 8-Ball</button>
<p id="magic8BallAnswer"></p>

<h2 class="dancing-text">Dance with me!</h2>

<div class="image-gallery">
    <img src="image1.jpg" alt="Image 1">
    <img src="image2.jpg" alt="Image 2">
    <img src="image3.jpg" alt="Image 3">
</div>

<div class="animated-box"></div>

<button onclick="getLocation()">Get Location</button>
<p id="demo"></p>

<div class="emoji-rain"></div>

<script>
    function changeColor() {
        const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        document.getElementById('colorText').style.color = randomColor;
    }

    function shakeMagic8Ball() {
        const answers = [
            "Yes",
            "No",
            "Ask again later",
            "Cannot predict now",
            "Don't count on it",
            "Most likely"
        ];
        const randomAnswer = answers[Math.floor(Math.random() * answers.length)];
        document.getElementById('magic8BallAnswer').innerText = `Magic 8-Ball says: ${randomAnswer}`;
    }

    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            document.getElementById("demo").innerHTML = "Geolocation is not supported by this browser.";
        }
    }

    function showPosition(position) {
        document.getElementById("demo").innerHTML = `Latitude: ${position.coords.latitude}<br>Longitude: ${position.coords.longitude}`;
    }

    const emojiContainer = document.querySelector('.emoji-rain');

    setInterval(() => {
        const emoji = document.createElement('div');
        emoji.innerHTML = '😊'; // Use your favorite emoji
        emoji.className = 'emoji';
        emoji.style.left = `${Math.random() * 100}vw`;
        emojiContainer.appendChild(emoji);

        emoji.addEventListener('animationend', () => {
            emoji.remove();
        });
    }, 500);
</script>

</body>
</html>
