<?php
class InsumoModel {
    private $pdo;

    public function __construct($pdo) {
        $this->pdo = $pdo;
    }

    public function all() {
        $sql = "SELECT * FROM insumos ORDER BY nombre ASC";
        $stmt = $this->pdo->query($sql);
        return $stmt->fetchAll();
    }

    public function findById($id) {
        $sql = "SELECT * FROM insumos WHERE id=?";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$id]);
        return $stmt->fetch();
    }

    public function create($data) {
        $sql = "INSERT INTO insumos (codigo, nombre, unidad_medida, stock_actual, stock_minimo, precio_unitario, fecha_creacion)
                VALUES (?, ?, ?, ?, ?, ?, NOW())";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([
            $data['codigo'],
            $data['nombre'],
            $data['unidad_medida'],
            $data['stock_actual'],
            $data['stock_minimo'],
            $data['precio_unitario']
        ]);
        return $this->pdo->lastInsertId();
    }

    public function update($id, $data) {
        $sql = "UPDATE insumos SET codigo=?, nombre=?, unidad_medida=?, stock_actual=?, stock_minimo=?, precio_unitario=?
                WHERE id=?";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([
            $data['codigo'],
            $data['nombre'],
            $data['unidad_medida'],
            $data['stock_actual'],
            $data['stock_minimo'],
            $data['precio_unitario'],
            $id
        ]);
    }

    public function delete($id) {
        $sql = "DELETE FROM insumos WHERE id=?";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$id]);
    }
}
?>
