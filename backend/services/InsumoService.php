<?php
require_once __DIR__ . '/../models/InsumoModel.php';

class InsumoService {
    private $model;

    public function __construct($pdo) {
        $this->model = new InsumoModel($pdo);
    }

    public function listar() {
        return $this->model->all();
    }

    public function getById($id) {
        return $this->model->findById($id);
    }

    public function crear($data) {
        $campos = ['nombre', 'unidad_medida', 'stock_actual', 'stock_minimo', 'precio_unitario', 'codigo'];
        foreach ($campos as $c) {
            if (!isset($data[$c]) || $data[$c] === '') {
                return ['success' => false, 'message' => "$c es obligatorio", 'code' => 400];
            }
        }
        $id = $this->model->create($data);
        return ['success' => true, 'data' => ['id' => $id], 'message' => 'Insumo creado'];
    }

    public function actualizar($id, $data) {
        $this->model->update($id, $data);
        return ['success' => true, 'message' => 'Insumo actualizado'];
    }

    public function eliminar($id) {
        $this->model->delete($id);
        return ['success' => true, 'message' => 'Insumo eliminado'];
    }
}
?>
