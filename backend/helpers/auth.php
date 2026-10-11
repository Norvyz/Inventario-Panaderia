<?php
// Helper simple para validación de sesión/token (para uso futuro)
function requiereSesion() {
    if (session_status() === PHP_SESSION_NONE) {
        session_start();
    }
    if (!isset($_SESSION['usuario_id'])) {
        responder(false, null, "No autorizado", 401);
    }
}
?>
