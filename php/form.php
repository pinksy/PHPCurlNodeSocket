<?php
  if(!isset($_POST['submit'])){
?>
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title>Form</title>
      </head>
      <body>
        <form method="post" action="<?php $_SERVER['PHP_SELF'];?>">
          Value 1:<input type="text" name="value1">
          <br />
          Value 2:<input type="text" name="value2">
          <br />
          <input type="submit" name="submit">
        </form>
      </body>
    </html>
<?php
  } 
  else {	
    $value1 = $_POST["value1"];
    $value2 = $_POST["value2"];

    $data = "value1=" . $value1 . "&value2=" . $value2;

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_URL, "http://127.0.0.1:8000");

    $response = curl_exec($ch);
    $status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    echo "Response status: " . $status;
    echo "<br />Response body: " . $response;
  }
?>