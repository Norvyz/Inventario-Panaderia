<?php
require_once __DIR__ . '/../models/VentaModel.php';

class VentaService {
    private $model;
    public function __construct($pdo) {
        $this->model = new VentaModel($pdo);
    }
    public function listar() {
        return $this->model->all();
    }
    public function crear($data) {
        if (empty($data['detalles'])) return ['success'=>false,'message'=>'Detalles vacíos','code'=>400];
        $id = $this->model->registrarVenta($data);
        return ['success'=>true,'data'=>['id_venta'=>$id],'message'=>'Venta registrada'];
    }
}
?>
