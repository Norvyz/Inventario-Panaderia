<?php
// Conexión a base de datos (soporta MySQL local y PostgreSQL en la nube)
//
// - LOCAL (XAMPP): por defecto usa MySQL -> localhost / root / sin clave
// - PRODUCCIÓN (Render + Supabase): si existe la variable DATABASE_URL, usa PostgreSQL
//
// Variables de entorno soportadas:
//   DATABASE_URL  -> cadena de conexión completa de Supabase/Postgres (recomendado)
//   DB_DRIVER     -> 'mysql' o 'pgsql' (se detecta solo si hay DATABASE_URL)
//   DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASS -> conexión por campos (opcional)
header("Content-Type: application/json; charset=utf-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$databaseUrl = getenv('DATABASE_URL');
$driver = getenv('DB_DRIVER') ?: ($databaseUrl ? 'pgsql' : 'mysql');

define('DB_DRIVER', $driver);
define('DB_HOST', getenv('DB_HOST') ?: 'localhost');
define('DB_PORT', getenv('DB_PORT') ?: ($driver === 'pgsql' ? '5432' : '3306'));
define('DB_NAME', getenv('DB_NAME') ?: ($driver === 'pgsql' ? 'postgres' : 'panaderia_inventario'));
define('DB_USER', getenv('DB_USER') ?: ($driver === 'pgsql' ? 'postgres' : 'root'));
define('DB_PASS', getenv('DB_PASS') !== false ? getenv('DB_PASS') : '');

function getConnection() {
    $options = [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ];

    if (DB_DRIVER === 'pgsql') {
        $host = DB_HOST;
        $port = DB_PORT;
        $dbname = DB_NAME;
        $user = DB_USER;
        $pass = DB_PASS;

        // Si viene la cadena completa (Supabase), la usamos
        $url = getenv('DATABASE_URL');
        if ($url) {
            $p = parse_url($url);
            if ($p === false || empty($p['host'])) {
                http_response_code(500);
                echo json_encode(["success" => false, "message" => "DATABASE_URL inválida"]);
                exit();
            }
            $host = $p['host'];
            $port = $p['port'] ?? 5432;
            $dbname = isset($p['path']) ? ltrim($p['path'], '/') : 'postgres';
            $user = isset($p['user']) ? urldecode($p['user']) : 'postgres';
            $pass = isset($p['pass']) ? urldecode($p['pass']) : '';
        }

        // Supabase exige SSL
        $dsn = "pgsql:host=$host;port=$port;dbname=$dbname;sslmode=require";
        // El pooler de Supabase no soporta prepared statements del servidor -> emulados
        $options[PDO::ATTR_EMULATE_PREPARES] = true;

        try {
            return new PDO($dsn, $user, $pass, $options);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode([
                "success" => false,
                "message" => "Error de conexión a PostgreSQL",
                "error" => $e->getMessage()
            ]);
            exit();
        }
    }

    // MySQL (XAMPP local)
    $dsn = "mysql:host=" . DB_HOST . ";port=" . DB_PORT . ";dbname=" . DB_NAME . ";charset=utf8mb4";
    $options[PDO::ATTR_EMULATE_PREPARES] = false;

    try {
        return new PDO($dsn, DB_USER, DB_PASS, $options);
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
