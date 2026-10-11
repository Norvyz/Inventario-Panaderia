<?php
class DashboardService {
    private $pdo;
    public function __construct($pdo) {
        $this->pdo = $pdo;
    }
    public function resumen() {
        $ventas = $this->pdo->query("SELECT COALESCE(SUM(total),0) as total_ventas FROM ventas")->fetchColumn();
        $gastos = $this->pdo->query("SELECT COALESCE(SUM(monto),0) as total_gastos FROM gastos")->fetchColumn();
        $insumos_bajo = $this->pdo->query("SELECT COUNT(*) FROM insumos WHERE stock_actual <= stock_minimo")->fetchColumn();
        $ganancias = floatval($ventas) - floatval($gastos);
        return [
            'total_ventas' => floatval($ventas),
            'total_gastos' => floatval($gastos),
            'ganancias' => $ganancias,
            'insumos_stock_bajo' => intval($insumos_bajo)
        ];
    }
}
?>
