<?php
require_once __DIR__ . '/../helpers/database.php';

class GastoModel {
    private $pdo;
    public function __construct($pdo) {
        $this->pdo = $pdo;
    }
    public function all() {
        $sql = "SELECT g.*, c.nombre as categoria FROM gastos g LEFT JOIN categorias_gasto c ON g.id_categoria=c.id ORDER BY g.fecha_gasto DESC";
        return $this->pdo->query($sql)->fetchAll();
    }
    public function create($data) {
        $sql = "INSERT INTO gastos (id_categoria, descripcion, monto, fecha_gasto, id_usuario, fecha_creacion) VALUES (?,?,?,?,?,NOW())";
        return insertarYRetornarId($this->pdo, $sql, [
            $data['id_categoria'],
            $data['descripcion'] ?? null,
            $data['monto'],
            $data['fecha_gasto'],
            $data['id_usuario'] ?? null
        ]);
    }
}
?>
