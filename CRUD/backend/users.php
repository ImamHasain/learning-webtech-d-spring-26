<?php
header('Content-Type: application/json');
$file = __DIR__ . '/users.json';
if (!file_exists($file)) file_put_contents($file, '[]');
$users = json_decode(file_get_contents($file), true);

function respond($data, $code = 200) {
    http_response_code($code);
    echo json_encode($data);
    exit;
}

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        respond($users);
        break;
    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);
        if (!isset($data['name'], $data['email']) || !$data['name'] || !$data['email']) {
            respond(['error' => 'Name and Email required'], 400);
        }
        $id = count($users) ? max(array_column($users, 'id')) + 1 : 1;
        $user = [ 'id' => $id, 'name' => $data['name'], 'email' => $data['email'] ];
        $users[] = $user;
        file_put_contents($file, json_encode($users, JSON_PRETTY_PRINT));
        respond($user, 201);
        break;
    case 'PUT':
        $data = json_decode(file_get_contents('php://input'), true);
        if (!isset($data['id'], $data['name'], $data['email']) || !$data['id'] || !$data['name'] || !$data['email']) {
            respond(['error' => 'ID, Name, and Email required'], 400);
        }
        $found = false;
        foreach ($users as &$user) {
            if ($user['id'] == $data['id']) {
                $user['name'] = $data['name'];
                $user['email'] = $data['email'];
                $found = true;
                break;
            }
        }
        if (!$found) respond(['error' => 'User not found'], 404);
        file_put_contents($file, json_encode($users, JSON_PRETTY_PRINT));
        respond(['status' => 'updated']);
        break;
    case 'DELETE':
        $data = json_decode(file_get_contents('php://input'), true);
        if (!isset($data['id']) || !$data['id']) {
            respond(['error' => 'ID required'], 400);
        }
        $before = count($users);
        $users = array_values(array_filter($users, function($u) use ($data) { return $u['id'] != $data['id']; }));
        if (count($users) === $before) respond(['error' => 'User not found'], 404);
        file_put_contents($file, json_encode($users, JSON_PRETTY_PRINT));
        respond(['status' => 'deleted']);
        break;
    default:
        respond(['error' => 'Method not allowed'], 405);
}
