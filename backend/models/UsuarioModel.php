<?php
class UsuarioModel {
    private $pdo;

    public function __construct($pdo) {
        $this->pdo = $pdo;
    }

    public function findByCorreo($correo) {
        $sql = "SELECT u.id, u.nombre, u.correo, u.clave_hash, u.activo, r.id as id_rol, r.nombre as rol
                FROM usuarios u
                INNER JOIN roles r ON u.id_rol = r.id
                WHERE u.correo = ?";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$correo]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
}
?>
