<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

$request = json_decode(file_get_contents('php://input'), true);

$mail = new PHPMailer(true);

$ltco_config = [
  'to'=> 'contato@ltco.com.br',
  'from' => 'noreply@ltco.com.br',
  'companyName' => 'LTCO',
  'title' => '[LTCO] Contato via formulário',
  'server' => [
    'host' => 'smtp.example.com',
    'port' => 587,
    'username' => 'user@example.com',
    'password' => 'secret',
  ]
];

$isTLS = ($ltco_config['server']['port'] !== 465)
  ? PHPMailer::ENCRYPTION_STARTTLS
  : PHPMailer::ENCRYPTION_SMTPS;

try {
  // Server settings
  $mail->isSMTP();
  $mail->CharSet = 'UTF-8';
  $mail->SMTPSecure = $isTLS;       // Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` also accepted

  $mail->SMTPAuth = true;
  $mail->Host = $ltco_config['server']['host'];             // Set the SMTP server to send through
  $mail->Port = $ltco_config['server']['port'];             // TCP port to connect to, use 465 for `PHPMailer::ENCRYPTION_SMTPS` above
  $mail->Username = $ltco_config['server']['username'];     // SMTP username
  $mail->Password = $ltco_config['server']['password'];     // SMTP password

  //Recipients
  $mail->setFrom($ltco_config['from'], $ltco_config['companyName']);
  $mail->addAddress($ltco_config['to']);

  // Content
  $mail->isHTML(true);
  $mail->Subject = $ltco_config['title'];

  $ltco_html_body = null;

  foreach ( $request as $field ) {
    $ltco_html_body .= "<b>$field[0]</b>: $field[1]<br>";
  }

  $mail->Body = $ltco_html_body;

  $mail->send();

  $response = array(
    "ok" => true,
    "class" => "success",
    "message" => "Mensagem enviada com sucesso!"
  );

  echo json_encode($response);
} catch (Exception $e) {
  $response = array(
    "ok" => false,
    "class" => "danger",
    "message" => "Não foi possível enviar a mensagem. Tente novamente mais tarde.",
    "error" => $mail->ErrorInfo
  );

  echo json_encode($response);
}
