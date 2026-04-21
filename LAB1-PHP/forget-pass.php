<?php
$errors = [];
$success = '';
// For demo purposes we use a hardcoded current password.
$CURRENT_PASSWORD = 'OldPass@123';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $current = $_POST['current_password'] ?? '';
    $new = $_POST['new_password'] ?? '';
    $retype = $_POST['retype_password'] ?? '';

    if ($current !== $CURRENT_PASSWORD) {
        $errors[] = 'Current Password is incorrect (demo check).';
    }
    if ($new === $CURRENT_PASSWORD) {
        $errors[] = 'New Password should not be same as the Current Password.';
    }
    if ($new !== $retype) {
        $errors[] = 'New Password must match with the Retyped Password.';
    }
    if (strlen($new) < 8) {
        $errors[] = 'New Password must be at least 8 characters.';
    }

    if (empty($errors)) {
        $success = 'Password changed (demo).';
    }
}
?>
<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>Change Password</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
<h2>Change Password</h2>
<?php if ($errors): ?>
  <div class="errors"><ul><?php foreach ($errors as $e) echo '<li>'.htmlspecialchars($e).'</li>'; ?></ul></div>
<?php endif; ?>
<?php if ($success): ?>
  <div class="success"><?php echo htmlspecialchars($success); ?></div>
<?php endif; ?>

<form method="post" action="">
  <label>Current Password: <input type="password" name="current_password"></label>
  <label>New Password: <input type="password" name="new_password"></label>
  <label>Retype New Password: <input type="password" name="retype_password"></label>
  <button type="submit">Change Password</button>
</form>

<p><a href="index.php">Back to index</a></p>
</body>
</html>
