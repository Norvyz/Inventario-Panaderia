<?php
// Health check para Render (no depende de la base de datos)
header("Content-Type: application/json; charset=utf-8");
echo json_encode(["status" => "ok", "service" => "panaderia-backend"]);
?>
