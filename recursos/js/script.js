var margen=10;
var ancho=100;
var albums = new Array();
var contador = 0;
var ind=0;
var llave=false;
	$(document).ready(function(e) {	
		
		
		$('#thumbnails li').live('click',function(){
			$('#bigphoto').animate({'margin-top':-470*$(this).attr('idImagen')},500);
                        $('#imagenpop').attr('src',$(this).attr('big_photo'));
                        $('#caption').text($(this).attr('caption'));
                        
                        window.location.hash=$(this).attr('idFoto');
                        
                        $(".fb-comments").attr('data-href',window.location);
                        
                        FB.XFBML.parse();
		});
		var time;
//		$('#bigphoto').live('click',function(){
//			if(llave == true){
//				clearInterval(time);
//				llave = false;
//			}else if(llave == false){
//					time = setInterval(function() { 	
//						$('#bigphoto').animate({'margin-top':-470*ind},500);			
//						ind = ind+1;
//						if(ind == contador)
//						ind= 0;
//					}, 3000);
//					llave = true;
//			}
//		});
		
//		$("#personaliza").click(function(){
//			$("#panel").slideToggle();
//		});		
		
		$("#tema1").click(function(){
			$("#body").css('background-color','black');
			
			$("#warp").css({'background-color':'rgb(39, 39, 39)'})
			
			$("#banner").css({'background-color':'rgb(31, 31, 31)','�olor':'black','border-color':'black'})
			
			$("#album").css('background-color','rgb(119, 119, 119))')		
			
			$("#mascara").css({'border-color':'black','background-color':'rgb(77, 77, 82)'});
			
			$("#thumbnails").css({'border-color':'black','background-color':'rgb(77, 77, 82)'});
			
			$("#panel").css({'background-color':'rgb(119, 119, 119)'});
			$("#flip").css({'background-color':'rgb(119, 119, 119)'});
		});			
		
		$("#tema2").click(function(){
			$("#body").css('background-color','white');
			
			$("#warp").css({'background-color':'rgb(214, 214, 214)'})
			
			$("#banner").css({'background-color':'rgb(253, 252, 252)','�olor':'black','border-color':'black'})
			
			$("#album").css('background-color','rgb(253, 252, 252)')		
			
			$("#mascara").css({'border-color':'black','background-color':'white'});
			
			$("#thumbnails").css({'border-color':'black','background-color':'white'});
			
			$("#panel").css({'border-color':'black','background-color':'white'});
			$("#flip").css({'border-color':'black','background-color':'white'});
		});		

		
});