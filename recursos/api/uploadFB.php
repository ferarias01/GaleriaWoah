<?php

require_once "../php-sdk/src/facebook.php";

$appId = '558967644198943';
$secret = '46c8b50d9e11e1805d28ae8622bc01b5';

$facebook = new Facebook(array(
    'appId' => $appId,
    'secret' => $secret,
    'cookie' => true,
        ));

$session = $facebook->getUser();


$login_url = $facebook->getLoginUrl(
        array(
            'req_perms' => 'read_stream,publish_stream,photo_upload,user_photos,user_photo_video_tags'
        )
);

if ($session) {

    copy($_FILES['image']['tmp_name'], $_FILES['image']['name']);

    $nom = $_FILES['image']['name'];

    //Le indicamos a facebook que vamos a subir un archivo a su plataforma.
    $facebook->setFileUploadSupport(true);
    if (isset($_REQUEST['tipoAlbum'])) {
        $tipoAlbum = $_REQUEST['tipoAlbum'];

        if ($tipoAlbum == 'new') {
            //Esto crea album
            //Componemos nuestro array con los datos de nuestro album nombre y descripcion.
            $album_details = array(
                'message' => $_REQUEST['albumDescr'],
                'name' => $_REQUEST['albumName']
            );

            
            $create_album = $facebook->api('/me/albums', 'post', $album_details);

            
            $album_uid = $create_album['id'];
            
        } else {
            $album_uid = $_REQUEST['idAlbum'];
        }
    }

//    Componemos el array que tendra los datos de nuestra imagen mensaje, nombre, path donde se encuentra la imagen album donde lo vamos a depositar.
    $photo_details = array(
        'message' => $_REQUEST['message']
    );
    $file = $_FILES['image']['tmp_name'];
    $photo_details['image'] = '@' . realpath($file);

    //Luego de esto enviamos a $facebook los datos de nuestra imagen
    $upload_photo = $facebook->api('/' . $album_uid . '/photos', 'post', $photo_details);

    header("Location: ../index.html");
} else {
    echo '<a href="' . $login_url . '">Login</a>';
}




