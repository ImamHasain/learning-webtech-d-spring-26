<?php
$errors = [];
$message = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($_POST['username'] ?? '');
    $password = $_POST['password'] ?? '';
    if ($username === '' || $password === '') {
        $errors[] = 'Both User Name and Password are required.';
    } else {
        // Demo: any non-empty credentials succeed
        $message = 'Login successful (demo).';
    }
}
?>
<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>Login</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
<h2>Login</h2>
<?php if ($errors): ?>
  <div class="errors"><ul><?php foreach ($errors as $e) echo '<li>'.htmlspecialchars($e).'</li>'; ?></ul></div>
<?php endif; ?>
<?php if ($message): ?>
  <div class="success"><?php echo htmlspecialchars($message); ?></div>
<?php endif; ?>

<form method="post" action="">
  <fieldset>
    <legend>Login</legend>
    <label>User Name: <input type="text" name="username" value="<?php echo htmlspecialchars($_POST['username'] ?? ''); ?>"></label>
    <label>Password: <input type="password" name="password"></label>
    <button type="submit">Submit</button>
    <p><a href="#" onclick="alert('Forgot password demo: contact admin.');return false;">Forgot password?</a></p>
  </fieldset>
</form>

<p><a href="index.php">Back to index</a></p>
</body>
</html>
