<?php
require_once '../config/db.php';
require_once '../services/InsumoService.php';

$pdo = getConnection();
$svc = new InsumoService($pdo);

$method = $_SERVER['REQUEST_METHOD'];
$path = $_SERVER['PATH_INFO'] ?? null;

switch ($method) {
    case 'GET':
        if ($path && preg_match('#/(\d+)#', $path, $m)) {
            $id = intval($m[1]);
            responder(true, $svc->getById($id), "Insumo encontrado");
        } else {
            responder(true, $svc->listar(), "Lista de insumos");
        }
        break;
    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);
        $res = $svc->crear($data);
        responder($res['success'], $res['data'], $res['message'], $res['code'] ?? 201);
        break;
    case 'PUT':
        if ($path && preg_match('#/(\d+)#', $path, $m)) {
            $id = intval($m[1]);
            $data = json_decode(file_get_contents('php://input'), true);
            $res = $svc->actualizar($id, $data);
            responder($res['success'], $res['data'], $res['message'], $res['code'] ?? 200);
        } else {
            responder(false, null, "ID requerido", 400);
        }
        break;
    case 'DELETE':
        if ($path && preg_match('#/(\d+)#', $path, $m)) {
            $id = intval($m[1]);
            $res = $svc->eliminar($id);
            responder($res['success'], null, $res['message'], $res['code'] ?? 200);
        } else {
            responder(false, null, "ID requerido", 400);
        }
        break;
    default:
        responder(false, null, "Método no permitido", 405);
}
?>
