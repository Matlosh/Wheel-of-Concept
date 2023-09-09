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
                "control_panel": "./modules/control_panel.js",
                "data/": "./assets/data/"
            }
        }
    </script>
</head>

<body>
    <?php include_once './partials/reusable.php'; ?>

    <section id="content" class="flex-container align-center justify-center dir-column">
        <h2>Wheel name</h2>

        <div class="wheel-container">
            <canvas id="wheel" width="600" height="600">Wheel drawn in canvas.</canvas>
            <div class="start-button flex-container align-center justify-center">Spin!</div>
        </div>

        <p id="wheel-output"></p>
    </section>

    <nav id="control-panel" class="expanded">
        <div class="panel-menu">
            <div class="option menu">
                <p>Menu</p>
            </div>
        </div>

        <div class="panel-container"></div>

        <div id="shrink-expand-button" class="shrink">
            <?php echo arrow_icon(); ?>
        </div>
    </nav>

    <div id="info-box">
        <p>Saved!</p>
    </div>

    <script type="module" src="./assets/js/main.js"></script>
</body>
</html>