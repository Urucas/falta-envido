var Home = {	
	load: function() {
		if (_('#home_container').length) {
			Home.show();
			return;
		}
		_container(
			'home.html', 
			'main_container',
			'home_container',
			function() {
				Home.show();
			}						
		);
	},
	show: function() {
		mainView.show('home_container');
	}
}
