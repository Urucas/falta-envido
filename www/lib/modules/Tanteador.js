var Tanteador = {	
	load: function() {
		if (_('#tanteador_container').length) {
			Tanteador.init();
			return;
		}
		_container(
			'tanteador.html', 
			'main_container',
			'tanteador_container',
			function() {
				Tanteador.init();
			}						
		);
	},	
	init: function() {

		$('#nosotros_col').html(faltaEnvido.nosotros);
		$('#ellos_col').html(faltaEnvido.ellos);		
		$('#arrow_left > .quince').text(faltaEnvido.contadorNos);
		$('#arrow_right > .quince').text(faltaEnvido.contadorEllos);
		
		//armo los fosforos
		var cant = 0;
		if(faltaEnvido.puntos == 15){
			cant = 3;
		}else{
			cant = 6;
		}
		xhtml_left = "";
		
		for(var i =0;i<cant;i++){
			if(i == 3) {
				xhtml_left += "<br clear=\"all\" /><div style=\"border-bottom:1px solid #000; padding-top:10px; width:100%;\"></div>";
				xhtml_left += "<div class=\"modulo\" style=\"margin-top:5px;\">"
			}else {
				xhtml_left += "<div class=\"modulo\">"
			}
            xhtml_left += "  <button class=\"match fosforo_1 nos\"></button>"
            xhtml_left += "  <div>"
            xhtml_left += "      <button class=\"match fosforo_2 nos\"></button>"
            xhtml_left += "      <button class=\"match fosforo_5 nos\"></button>"
            xhtml_left += "      <button class=\"match fosforo_4 nos\"></button>"
            xhtml_left += "      <br clear=\"all\" />"
            xhtml_left += "  </div>"
            xhtml_left += "  <button class=\"match fosforo_3 nos\"></button>"
            xhtml_left += "  <br clear=\"all\" />"
            xhtml_left += "</div>";				
		}
		
		$("#left").html(xhtml_left);
		xhtml_right = "";
		
		for(var i =0;i<cant;i++){
			if(i == 3) {
				xhtml_right += "<br clear=\"all\" /><div style=\"border-bottom:1px solid #000; padding-top:10px; width:100%;\"></div>";
				xhtml_right += "<div class=\"modulo\" style=\"margin-top:5px;\">";
			}else {
				xhtml_right += "<div class=\"modulo\">";
			}									
            xhtml_right += "  <button class=\"match fosforo_1\"></button>"
            xhtml_right += "  <div>"
            xhtml_right += "      <button class=\"match fosforo_2\"></button>"
            xhtml_right += "      <button class=\"match fosforo_5\"></button>"
            xhtml_right += "      <button class=\"match fosforo_4\"></button>"
            xhtml_right += "      <br clear=\"all\" />"
            xhtml_right += "  </div>"
            xhtml_right += "  <button class=\"match fosforo_3\"></button>"
            xhtml_right += "  <br clear=\"all\" />"
            xhtml_right += "</div>";					
		}
		
		$("#right").html(xhtml_right);
		
		$('.match').each(function(index) {
			$(this).unbind('click');
		    $(this).click(function(){
		    	if ($(this).hasClass('activo')) {
					$(this).removeClass('activo');
					if($(this).hasClass('nos')) {
						if(faltaEnvido.contadorNos > 0) { 
							faltaEnvido.contadorNos--;
							$('#arrow_left > .quince').text(faltaEnvido.contadorNos);
						}
					}
					else {
						if(faltaEnvido.contadorEllos > 0) { 
							faltaEnvido.contadorEllos--;
							$('#arrow_right > .quince').text(faltaEnvido.contadorEllos);
						}
					}
				}
				else {
					if($(this).hasClass('nos')) {
						if(faltaEnvido.contadorNos < faltaEnvido.puntos) {
							faltaEnvido.contadorNos++;
							$('#arrow_left > .quince').text(faltaEnvido.contadorNos);
						}						
					}else {
						if(faltaEnvido.contadorEllos < faltaEnvido.puntos) {
							faltaEnvido.contadorEllos++;
							$('#arrow_right > .quince').text(faltaEnvido.contadorEllos);
						}
					}				
					$(this).addClass('activo');
				}							
				if(faltaEnvido.contadorNos == faltaEnvido.puntos){
					Tanteador.winner(faltaEnvido.nosotros);
				}else if(faltaEnvido.contadorEllos == faltaEnvido.puntos) {
					Tanteador.winner(faltaEnvido.ellos);					
				}
			});
		});		
		Tanteador.show();		
	},
	winner: function(nombre) {
		$('#mensaje2 > .mensaje').html('<p style"text-align:center">' + nombre + ' ganan!<br />Desea iniciar una nueva partida ?</p>');
		$('#popup2').show();		
	},	
	clear: function() {
		$('.match').each(function(index) {
			$(this).removeClass('activo');
		});
		Players.load();
	},
	show: function() {
		$('#popup').hide();		
		$('#popup2').hide();
		mainView.show('tanteador_container');
	}	
}
