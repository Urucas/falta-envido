var Players = {	
	load: function() {
		if (_('#players_container').length) {
			Players.show();
			return;
		}
		_container(
			'players.html', 
			'main_container',
			'players_container',
			function() {
				Players.show();
			}						
		);
	},
	show: function() {
		mainView.show('players_container');
	}	
}
