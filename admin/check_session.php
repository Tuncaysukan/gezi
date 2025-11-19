<?php
/**
 * Session Check - Admin sayfalarında kullanılacak
 */

session_start();

// Session kontrolü
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    header('Location: login.html');
    exit;
}
?>
