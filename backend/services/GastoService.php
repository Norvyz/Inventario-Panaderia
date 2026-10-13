<?php
require_once __DIR__ . '/../models/GastoModel.php';

class GastoService {
    private $model;
    public function __construct($pdo) {
        $this->model = new GastoModel($pdo);
    }
    public function listar() {
        return $this->model->all();
    }
    public function crear($data) {
        $req = ['id_categoria', 'monto', 'fecha_gasto'];
        foreach ($req as $r) {
            if (!isset($data[$r]) || $data[$r] === '') return ['success'=>false,'message'=>"$r requerido",'code'=>400];
        }
        $id = $this->model->create($data);
        return ['success'=>true,'data'=>['id'=>$id],'message'=>'Gasto registrado'];
    }
}
?>
