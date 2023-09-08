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
                "reusable": "./modules/reusable.js",
                "wheel_data": "./assets/data/wheel.json"
            }
        }
    </script>
</head>

<body>
    <?php include_once './partials/reusable.php'; ?>

    <section id="content">
        <div class="wheel-container">
            <canvas id="wheel" width="600" height="600">Wheel drawn in canvas.</canvas>
            <div class="start-button flex-container align-center justify-center">Spin!</div>
        </div>

        <p id="wheel-output"></p>
    </section>

    <nav id="control-panel" class="expanded">
        <h2>Wheel settings</h2>

        <div class="form-group flex-container dir-row">
            <label for="test">Test setting</label>
            <input type="text" name="test" autocomplete="off">
            <span>Some additional info about above setting.</span>
        </div>

        <div class="form-group flex-container dir-row">
            <label for="test">Test setting</label>
            <div class="input-container">
                <input type="checkbox" name="checkbox">
            </div>
            <span>Some additional info about above setting.</span>
        </div>

        <div class="button">
            <p>Save</p>
        </div>

        <div id="shrink-expand-button" class="shrink">
            <?php echo arrow_icon(); ?>
        </div>
    </nav>

    <script type="module" src="./assets/js/main.js"></script>
</body>
</html>