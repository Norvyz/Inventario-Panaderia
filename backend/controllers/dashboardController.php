<?php
require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../services/DashboardService.php';

$pdo = getConnection();
$svc = new DashboardService($pdo);
$res = $svc->resumen();
responder(true, $res, "Resumen dashboard");
?>
