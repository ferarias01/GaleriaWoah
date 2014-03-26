$(document).ready(function(e) {
    var albums = new Array();
    var offset = 0;
    window.fbAsyncInit = function() {
        FB.init({
            appId: '558967644198943',
            status: true,
            cookie: true,
            xfbml: true
        });

        FB.Event.subscribe('auth.authResponseChange', function(response) {
            if (response.status === 'connected') {
                testAPI();
            } else if (response.status === 'not_authorized') {
                FB.login();
            } else {
                FB.login();
            }
        });
    };

// Load the SDK asynchronously
    (function(d) {
        var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
        if (d.getElementById(id)) {
            return;
        }
        js = d.createElement('script');
        js.id = id;
        js.async = true;
        js.src = "//connect.facebook.net/es_ES/all.js";
        ref.parentNode.insertBefore(js, ref);
    }(document));

    function testAPI() {

        FB.api('/me?fields=id,birthday,email,gender,picture.type(large),name', function(response) {
            console.log(response);
            $('#nombreUsuario').html(response.name);
            $('#fotoPerfil').attr('src', response.picture.data.url);
        });

        FB.api({
            method: 'fql.multiquery',
            queries: {
                query0: 'select aid,name,photo_count from album where owner = me() LIMIT 4 offset 0',
                query1: 'select aid,pid,pid,src_small,caption,src_big,src_big_width,src_big_height from photo where aid in "100002036318147_2868"'
            }
        },
        function(response) {
            var album = response[0].fql_result_set;
            var photos = response[1].fql_result_set;

            $.each(album, function(index, value) {
                if (jQuery.inArray(value.name, albums) != 0 && jQuery.inArray(value.name, albums) != 1) {
                    $('#album').append(
                            $('<li/>').append(
                            $('<a/>')
                            .attr('href', 'javascript:void(0)')
                            .attr('idAlbum', value.aid)
                            .text(value.name)
                            )
                            )
                    albums.push(value.name);
                }
            });

            $.each(photos, function(index, value) {
                $('#mask')
                        .append(
                        $('<li/>').css({'background-image': 'url(' + value.src_small + ')'})
                        .attr('idImagen', index)
                        .attr('big_photo', value.src_big)
                        .attr('caption', value.caption)
                        .attr('idFoto', value.pid)
                        .html(value.titulo)
                        )


                $('#bigphoto')
                        .append(
                        $('<li/>').css({'background-image': 'url(' + value.src_big + ')'})
                        .attr('idImagen', index)
                        )
                contador = contador + 1;
            });
        }
        );


        $("#nextAlbum").click(function() {
            offset = offset + 4;
            FB.api({
                method: 'fql.multiquery',
                queries: {
                    query0: 'select aid,name,photo_count from album where owner = me() LIMIT 4 offset ' + offset,
                    query1: 'select aid,pid,pid,src_small,caption,src_big,src_big_width,src_big_height from photo where aid in "100002036318147_2868"'
                }
            },
            function(response) {
                var album = response[0].fql_result_set;
                $('#album').empty();
                $.each(album, function(index, value) {
                    if (jQuery.inArray(value.name, albums) != 0 && jQuery.inArray(value.name, albums) != 1) {
                        $('#album').append(
                                $('<li/>').append(
                                $('<a/>')
                                .attr('href', 'javascript:void(0)')
                                .attr('idAlbum', value.aid)
                                .text(value.name)
                                )
                                )
                        albums.push(value.name);
                    }
                });
            });
        });

        $("#backAlbum").click(function() {
            if (offset > 0)
                offset = offset - 4;
            else
                offset = 0;

            console.log(offset);
            FB.api({
                method: 'fql.multiquery',
                queries: {
                    query0: 'select aid,name,photo_count from album where owner = me() LIMIT 4 offset ' + offset,
                    query1: 'select aid,pid,pid,src_small,caption,src_big,src_big_width,src_big_height from photo where aid in "100002036318147_2868"'
                }
            },
            function(response) {
                var album = response[0].fql_result_set;
                $('#album').empty();
                $.each(album, function(index, value) {
                    if (jQuery.inArray(value.name, albums) != 0 && jQuery.inArray(value.name, albums) != 1) {
                        $('#album').append(
                                $('<li/>').append(
                                $('<a/>')
                                .attr('href', 'javascript:void(0)')
                                .attr('idAlbum', value.aid)
                                .text(value.name)
                                )
                                )
                        albums.push(value.name);
                    }
                });
            });
        });




        $("#album li a").live("click", function() {
            contador = 0;
            $("#mask").empty();
            $('#bigphoto').empty();
            var temporal = $(this).attr('idAlbum');
            FB.api({
                method: 'fql.query',
                query: 'select aid,pid,src_small,caption,src_big,src_big_width,src_big_height from photo where aid in "' + temporal + '"'},
            function(response) {
                $.each(response, function(index, value) {
                    if (value.aid === temporal) {

                        $('#mask')
                                .append(
                                $('<li/>').css({'background-image': 'url(' + value.src_small + ')'})
                                .attr('idImagen', index)
                                .attr('big_photo', value.src_big)
                                .attr('caption', value.caption)
                                .attr('idFoto', value.pid)
                                .html(value.titulo)
                                )


                        $('#bigphoto')
                                .append(
                                $('<li/>').css({'background-image': 'url(' + value.src_big + ')'})
                                .attr('idImagen', index)
                                )
                        contador = contador + 1;
                    }
                });
            });
        });

        FB.api({
            method: 'fql.query',
            query: 'select object_id,name from album where owner=me()'},
        function(response) {

            $.each(response, function(index, value) {

                $("#comboAlbum").append("<option value=" + value.object_id + ">" + value.name + "</option> ");

            });

        });

    }

    var entra = true;
    $("#newAlbumBox").click(function() {

        if (entra) {
            $("#albumNew").show();
            $("#albumOld").hide();
            $("#tipoAlbum").val("new");
            entra = false;
        } else {
            $("#albumNew").hide();
            $("#albumOld").show();
            $("#tipoAlbum").val("old");
            entra = true;
        }

    });
});