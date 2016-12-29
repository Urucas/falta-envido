function objFaltaEnvido(){

    this.puntos = 15;
	this.nosotros;
	this.ellos;
	this.contadorNos   = 0;
	this.contadorEllos = 0;
	
    this.setTotal = function(puntosSeleccionados){
		
		$('#aquince').removeClass('activo');
		$('#atreinta').removeClass('activo');
		
		this.puntos	= puntosSeleccionados;
		if( puntosSeleccionados == 15 ){
			$('#aquince').addClass('activo');					
		} else {
			$('#atreinta').addClass('activo');					
		}
	}
	
	this.setPlayers = function(){
		this.nosotros	=	($('#nosotros').val() != '') ? $('#nosotros').val() : 'Nosotros';
		this.ellos		=	($('#ellos').val() != '') ? $('#ellos').val() : 'Ellos';
		this.contadorEllos = this.contadorNos = 0;
		Tanteador.load();
	}
}

var faltaEnvido = new objFaltaEnvido();
var mainView = new View();

function init(){
	
	$('#splash').hide();
    Home.load();
}

try {
	// nokia button vibrate
	sysinfo = document.getElementById("sysinfo");
    document.addEventListener('click', tactileFeedback, false);
}catch(e) { }