<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Wheel of Concept</title>

    <link rel="stylesheet" type="text/css" href="./assets/styles/style.css"/>

    <script type="importmap">
        {
            "imports": {
                "wheel": "./modules/wheel.js",
                "indicator": "./modules/indicator.js",
                "mechanics": "./modules/mechanics.js",
                "wheel_data": "./assets/data/wheel.json"
            }
        }
    </script>
</head>

<body>
    <section id="content">
        <div class="wheel-container">
            <canvas id="wheel" width="600" height="600">Wheel drawn in canvas.</canvas>
            <div class="start-button flex-container align-center justify-center">Spin!</div>
        </div>

        <p id="wheel-output"></p>
    </section>

    <script type="module" src="./assets/js/main.js"></script>
</body>
</html>