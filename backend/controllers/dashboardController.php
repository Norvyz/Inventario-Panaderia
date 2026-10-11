<?php
require_once '../config/db.php';
require_once '../services/DashboardService.php';

$pdo = getConnection();
$svc = new DashboardService($pdo);
$res = $svc->resumen();
responder(true, $res, "Resumen dashboard");
?>
