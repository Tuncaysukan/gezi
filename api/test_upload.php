<?php
header('Content-Type: application/json');
echo json_encode([
    'success' => true,
    'message' => 'Upload API is reachable!',
    'data' => [
        'files' => $_FILES,
        'post' => $_POST,
        'method' => $_SERVER['REQUEST_METHOD']
    ]
]);
?>
