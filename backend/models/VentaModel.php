<?php
class VentaModel {
    private $pdo;
    public function __construct($pdo) {
        $this->pdo = $pdo;
    }
    public function all() {
        $sql = "SELECT v.*, u.nombre as usuario FROM ventas v LEFT JOIN usuarios u ON v.id_usuario=u.id ORDER BY v.fecha_venta DESC";
        return $this->pdo->query($sql)->fetchAll();
    }
    public function registrarVenta($data) {
        $this->pdo->beginTransaction();
        try {
            $numero = 'V-' . date('YmdHis') . '-' . rand(100,999);
            $total = 0;
            foreach ($data['detalles'] as $d) {
                $total += ($d['cantidad'] * $d['precio_unitario']);
            }
            $stmt = $this->pdo->prepare("INSERT INTO ventas (numero_venta, id_usuario, total, observacion, fecha_venta) VALUES (?,?,?,?,NOW())");
            $stmt->execute([$numero, $data['id_usuario'] ?? null, $total, $data['observacion'] ?? null]);
            $idVenta = $this->pdo->lastInsertId();
            $stmtDet = $this->pdo->prepare("INSERT INTO detalle_venta (id_venta, id_producto, cantidad, precio_unitario, subtotal) VALUES (?,?,?,?,?)");
            foreach ($data['detalles'] as $d) {
                $subtotal = $d['cantidad'] * $d['precio_unitario'];
                $stmtDet->execute([$idVenta, $d['id_producto'], $d['cantidad'], $d['precio_unitario'], $subtotal]);
            }
            $this->pdo->commit();
            return $idVenta;
        } catch (Exception $e) {
            $this->pdo->rollBack();
            throw $e;
        }
    }
}
?>
