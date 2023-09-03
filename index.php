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
                "mechanics": "./modules/mechanics.js"
            }
        }
    </script>
</head>

<body>
    <canvas id="wheel" width="600" height="600">Wheel drawn in canvas.</canvas>

    <script type="module" src="./assets/js/main.js"></script>
</body>
</html>