<?php
header('Content-Type: application/json');
$file = 'users.json';
if (!file_exists($file)) file_put_contents($file, '[]');
$users = json_decode(file_get_contents($file), true);

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        echo json_encode($users);
        break;
    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);
        $id = count($users) ? max(array_column($users, 'id')) + 1 : 1;
        $user = [ 'id' => $id, 'name' => $data['name'], 'email' => $data['email'] ];
        $users[] = $user;
        file_put_contents($file, json_encode($users));
        echo json_encode($user);
        break;
    case 'PUT':
        $data = json_decode(file_get_contents('php://input'), true);
        foreach ($users as &$user) {
            if ($user['id'] == $data['id']) {
                $user['name'] = $data['name'];
                $user['email'] = $data['email'];
                break;
            }
        }
        file_put_contents($file, json_encode($users));
        echo json_encode(['status' => 'updated']);
        break;
    case 'DELETE':
        $data = json_decode(file_get_contents('php://input'), true);
        $users = array_values(array_filter($users, function($u) use ($data) { return $u['id'] != $data['id']; }));
        file_put_contents($file, json_encode($users));
        echo json_encode(['status' => 'deleted']);
        break;
}
