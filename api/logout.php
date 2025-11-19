<?php
/**
 * Logout API
 */

session_start();

// Session'ı temizle
session_destroy();

// Login sayfasına yönlendir
header('Location: ../admin/login.html');
exit;
?>
