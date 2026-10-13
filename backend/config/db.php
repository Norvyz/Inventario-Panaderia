<?php
// ============================================================
//  Conexión a la base de datos -> SUPABASE (PostgreSQL)
//  Única base de datos del proyecto. No se usa MySQL ni XAMPP.
// ============================================================
//
//  ¿De dónde sale la conexión?
//   - Producción (Render): variable de entorno DATABASE_URL
//   - Local: archivo backend/.env con DATABASE_URL (ver backend/.env.example)
//
//  La conexión local también apunta a Supabase, así que no hace falta
//  levantar MySQL en XAMPP: solo necesitas Apache/PHP para servir el backend.
// ============================================================

// Carga simple de variables desde backend/.env (solo desarrollo local)
cargarEnv(__DIR__ . '/../.env');

header("Content-Type: application/json; charset=utf-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') {
    http_response_code(200);
    exit();
}

function cargarEnv($ruta) {
    if (!is_readable($ruta)) {
        return;
    }
    foreach (file($ruta, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) as $line) {
        $line = trim($line);
        if ($line === '' || $line[0] === '#' || strpos($line, '=') === false) {
            continue;
        }
        [$clave, $valor] = explode('=', $line, 2);
        $clave = trim($clave);
        $valor = trim(trim($valor), "\"'");
        // Las variables reales del sistema (Render) tienen prioridad sobre el .env local
        if (getenv($clave) === false) {
            putenv("$clave=$valor");
            $_ENV[$clave] = $valor;
        }
    }
}

function getConnection() {
    $url = getenv('DATABASE_URL');

    if (!$url) {
        http_response_code(500);
        echo json_encode([
            "success" => false,
            "message" => "Falta la variable DATABASE_URL (cadena de conexión de Supabase)"
        ]);
        exit();
    }

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

    // Supabase exige SSL
    $dsn = "pgsql:host=$host;port=$port;dbname=$dbname;sslmode=require";

    try {
        return new PDO($dsn, $user, $pass, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            // El pooler de Supabase no soporta prepared statements del servidor
            PDO::ATTR_EMULATE_PREPARES => true,
        ]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode([
            "success" => false,
            "message" => "Error de conexión a Supabase",
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
