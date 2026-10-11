<?php
require_once '../config/db.php';
require_once '../services/GastoService.php';

$pdo = getConnection();
$svc = new GastoService($pdo);
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        responder(true, $svc->listar(), "Lista de gastos");
        break;
    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);
        $res = $svc->crear($data);
        responder($res['success'], $res['data'], $res['message'], $res['code'] ?? 201);
        break;
    default:
        responder(false, null, "Método no permitido", 405);
}
?>
