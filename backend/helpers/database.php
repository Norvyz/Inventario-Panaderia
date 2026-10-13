<?php
// Inserta una fila y devuelve el id generado.
// PostgreSQL (Supabase) soporta "RETURNING id".
function insertarYRetornarId($pdo, $sql, $params = []) {
    $stmt = $pdo->prepare($sql . ' RETURNING id');
    $stmt->execute($params);
    return $stmt->fetchColumn();
}
?>
