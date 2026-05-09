<?php
$errors = [];
$success = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($_POST['username'] ?? '');
    $password = $_POST['password'] ?? '';

    if (!preg_match('/^[A-Za-z0-9._-]+$/', $username)) {
        $errors[] = 'User Name can contain alpha numeric characters, period, dash or underscore only.';
    }
    if (strlen($username) < 2) {
        $errors[] = 'User Name must contain at least two (2) characters.';
    }
    if (strlen($password) < 8) {
        $errors[] = 'Password must not be less than eight (8) characters.';
    }
    if (!preg_match('/[@#$%]/', $password)) {
        $errors[] = 'Password must contain at least one of the special characters (@, #, $, %).';
    }

    if (empty($errors)) {
        $success = 'Validation passed. (Demo only — no user stored.)';
    }
}
?>
<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>Register</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
<h2>Register</h2>
<?php if ($errors): ?>
  <div class="errors">
    <ul>
      <?php foreach ($errors as $e): ?>
        <li><?php echo htmlspecialchars($e); ?></li>
      <?php endforeach; ?>
    </ul>
  </div>
<?php endif; ?>
<?php if ($success): ?>
  <div class="success"><?php echo htmlspecialchars($success); ?></div>
<?php endif; ?>

<form method="post" action="">
  <label>User Name: <input type="text" name="username" value="<?php echo htmlspecialchars($_POST['username'] ?? ''); ?>"></label>
  <label>Password: <input type="password" name="password"></label>
  <button type="submit">Register</button>
</form>

<p><a href="index.php">Back to index</a></p>
</body>
</html>
