<?php
require_once __DIR__ . '/../models/UsuarioModel.php';

class AuthService {
    private $usuarioModel;

    public function __construct($pdo) {
        $this->usuarioModel = new UsuarioModel($pdo);
    }

    public function login($correo, $clave) {
        $usuario = $this->usuarioModel->findByCorreo($correo);
        if (!$usuario) {
            return ['success' => false, 'message' => 'Credenciales inválidas'];
        }
        if (!$usuario['activo']) {
            return ['success' => false, 'message' => 'Usuario inactivo'];
        }
        // Verificar hash (usar password_verify con hash generado)
        if (!password_verify($clave, $usuario['clave_hash'])) {
            return ['success' => false, 'message' => 'Credenciales inválidas'];
        }
        unset($usuario['clave_hash']);
        return ['success' => true, 'data' => $usuario];
    }
}
?>
