<?php
require_once '../config/db.php';
require_once '../services/AuthService.php';

$pdo = getConnection();
$auth = new AuthService($pdo);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $correo = trim($data['correo'] ?? '');
    $clave = $data['clave'] ?? '';

    if ($correo === '' || $clave === '') {
        responder(false, null, "Correo y clave son obligatorios", 400);
    }

    $result = $auth->login($correo, $clave);
    if (!$result['success']) {
        responder(false, null, $result['message'], 401);
    }

    responder(true, $result['data'], "Login exitoso");
} else {
    responder(false, null, "Método no permitido", 405);
}
?>
