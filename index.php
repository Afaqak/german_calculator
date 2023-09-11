
<?php
include('connection.php');
?>
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Material Dropdown</title>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
</head>
<style>
    

</style>
</head>

<body>
    <div class="container">
        <h2>Mengenrechner fur Deine Bedarfsermittlung</h2>
        <h5>Mit unserem Mengenrechner ermittelst Du die fur Dein Projekt empfohlene Menge an Zierkies bzw. Ziersplitt</h5>
        <form action="submit.php" method="post" class="form">
            <div class="form-group">
                    <label for="title" class="form-title">Material: </label>
                  <div class="search">
                    <div class="search-input">
                         
                  <input type="text" id="materialInput" name="title" class="select2 search-field" placeholder="Search for a Material">
                  <i class="fa fa-window-close" aria-hidden="true"></i>
                    </div>
                  <div id="materialOptions" class="material-options"></div>
                     </div>
            </div>
           
            <div class="form-group row">
                    <label for="material_bis" class="form-title">Kornung:  </label>
                    <input type="number" id="bis" name="mm">
                    <span class="unit">bis</span>
                    <input type="number" id="mm" name="material_bis">
                    <span class="unit">mm</span>
            </div>
            <div class="form-group row">
                    <label for="flache1 " class="form-title">Flache: </label>
                    <input required type="number" min='0' id="length" name="length">
                    <span class="unit">x</span>
                    <input required type="number" min='0' id="width" name="width">
                  
                    <div class="form-group2">
                        <label for="flache2 " class="form-title2">HÖhe: </label>
                       <div class="form-group2__hohe">
                        <input type="number" class="hohe" readonly id="result" name="result" readonly>
                        <span class="unit">cm</span>
                        </div>
                    </div>
            </div>
            <div class="form-group3">
                <label for="material_kg" class="form-title">Empfohlene<br/>Menge in kg: </label>
                <input class="material-input" readonly type="text" id="material_kg" name="material_kg">
            </div>
            <div class="form-group3">
                <label for="notes" class="form-title">ArtikellNummer/VE: </label>
                <div class="form-group3__notes">
                <div id="notes__container" class="notes">No items yet.</div>
                <button type="button" class="reset-button" onclick="resetForm()">Reset</button>
            </div>
            </div>
        </form>
    </div>


   <script src="./index.js"></script>
   

</body>

</html>