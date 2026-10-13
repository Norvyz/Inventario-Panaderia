<?php
// Helper de base de datos que funciona igual en MySQL y PostgreSQL.

/**
 * Ejecuta un INSERT y devuelve el id generado.
 * - PostgreSQL usa "RETURNING id"
 * - MySQL usa lastInsertId()
 */
function insertarYRetornarId($pdo, $sql, $params = []) {
    $driver = $pdo->getAttribute(PDO::ATTR_DRIVER_NAME);

    if ($driver === 'pgsql') {
        $stmt = $pdo->prepare($sql . ' RETURNING id');
        $stmt->execute($params);
        return $stmt->fetchColumn();
    }

    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    return $pdo->lastInsertId();
}
?>
