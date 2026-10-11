<?php
// Conexión sencilla a MySQL (XAMPP)
header("Content-Type: application/json; charset=utf-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

define('DB_HOST', 'localhost');
define('DB_PORT', 3306);
define('DB_NAME', 'panaderia_inventario');
define('DB_USER', 'root');
define('DB_PASS', '');

function getConnection() {
    $dsn = "mysql:host=" . DB_HOST . ";port=" . DB_PORT . ";dbname=" . DB_NAME . ";charset=utf8mb4";
    try {
        $pdo = new PDO($dsn, DB_USER, DB_PASS, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ]);
        return $pdo;
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode([
            "success" => false,
            "message" => "Error de conexión a base de datos",
            "error" => $e->getMessage() // Solo para desarrollo
        ]);
        exit();
    }
}

function responder($success, $data = null, $message = "", $code = 200) {
    http_response_code($code);
    echo json_encode([
        "success" => $success,
        "message" => $message,
        "data" => $data
    ], JSON_UNESCAPED_UNICODE);
    exit();
}
?>
