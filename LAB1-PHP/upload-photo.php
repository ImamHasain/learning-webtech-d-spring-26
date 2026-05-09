<?php
$errors = [];
$success = '';
$uploadedPath = '';
$MAX_BYTES = 4 * 1024 * 1024; // 4MB
$allowedTypes = ['image/jpeg', 'image/png'];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!isset($_FILES['photo']) || $_FILES['photo']['error'] !== UPLOAD_ERR_OK) {
        $errors[] = 'Please select a file to upload.';
    } else {
        $file = $_FILES['photo'];
        if ($file['size'] > $MAX_BYTES) {
            $errors[] = 'Picture size should not be more than 4MB.';
        } else {
            $info = @getimagesize($file['tmp_name']);
            $mime = $info['mime'] ?? '';
            if (!in_array($mime, $allowedTypes)) {
                $errors[] = 'Picture format must be in jpeg, jpg or png.';
            } else {
                $ext = ($mime === 'image/png') ? 'png' : 'jpg';
                $targetDir = __DIR__ . DIRECTORY_SEPARATOR . 'uploads' . DIRECTORY_SEPARATOR;
                if (!is_dir($targetDir)) mkdir($targetDir, 0755, true);
                $name = 'photo_' . time() . '_' . bin2hex(random_bytes(4)) . '.' . $ext;
                $dest = $targetDir . $name;
                if (move_uploaded_file($file['tmp_name'], $dest)) {
                    $success = 'Upload successful.';
                    $uploadedPath = 'uploads/' . $name;
                } else {
                    $errors[] = 'Failed to move uploaded file.';
                }
            }
        }
    }
}
?>
<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>Upload Photo</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
<h2>Upload Photo</h2>
<?php if ($errors): ?>
  <div class="errors"><ul><?php foreach ($errors as $e) echo '<li>'.htmlspecialchars($e).'</li>'; ?></ul></div>
<?php endif; ?>
<?php if ($success): ?>
  <div class="success"><?php echo htmlspecialchars($success); ?></div>
  <?php if ($uploadedPath): ?>
    <p>Preview:</p>
    <img src="<?php echo htmlspecialchars($uploadedPath); ?>" alt="Uploaded image" style="max-width:300px;">
  <?php endif; ?>
<?php endif; ?>

<form method="post" action="" enctype="multipart/form-data">
  <label>Select picture: <input type="file" name="photo" accept="image/jpeg,image/png"></label>
  <button type="submit">Upload</button>
</form>

<p><a href="index.php">Back to index</a></p>
</body>
</html>

