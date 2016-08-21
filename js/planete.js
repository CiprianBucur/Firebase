var url = 'https://planetesiluni.firebaseio.com/Planete';
var planets = new Firebase(url);

function caut(event) {
	if (event.which == 13 || event.keyCode == 13) {
		var text = document.getElementById('caut').value.trim();
		if (text.length > 0) {
			alert("Vrei să cauți: " + text);
		}
		document.getElementById('caut').value = '';
		return false;
	}
}

function refresh(planetele) {
	var planet = '';
	var descriere = '';
	var detalii = '';
	for (var i = 0; i < planetele.length; i++) {
		var nume = planetele[i].name;
		planet+='<li><a href="' + nume + '.html">' + nume + '</a></li>';
	
		descriere+='<div class=" col-sm-12 placeholder">';
		if (i!=0) descriere+='<hr /><br />';
		descriere+='<img align="left" src="' + planetele[i].poza + '" width="200" height="200" class="img-responsive" alt="Descriere ' + nume + '">';
		descriere+='<h3>' + nume + '</h3>';
		descriere+='<span class="text-muted">' + planetele[i].detaliu + '</span>';
		descriere+='</div>';

		detalii += '<tr>';
		detalii += '<td>' + nume + '</td>';
		detalii += '<td>' + planetele[i].distanta + ' UA</td>';
		detalii += '<td>' + planetele[i].sateliti + '</td>';
		detalii += '</tr>';
	}
	document.getElementById('planets').innerHTML = planet;
	document.getElementById('descrierePlanete').innerHTML = descriere;
	document.getElementById('detaliiPlanete').innerHTML = detalii;
}

planets.on("value", function(snapshot) {
	var data = snapshot.val();
	var planetele = [];
	for (var key in data) {
		if (data.hasOwnProperty(key)) {
			planetName = data[key].planetName ? data[key].planetName : 'Nu are nume';
			descrierePlaneta = data[key].Descriere ? data[key].Descriere : 'Nu are descriere';
			distanta = data[key].distanta ? data[key].distanta : 'Nu are distanță';
			nr = data[key].nr ? data[key].nr : 'Nu are sateliți';
			poza = data[key].png ? data[key].png : 'data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==';
			if (planetName.trim().length > 0) {
				planetele.push({
					name: planetName,
					detaliu: descrierePlaneta,
					distanta: distanta,
					sateliti: nr,
					poza: poza,
					key: key
				})
			}
		}
	}
	refresh(planetele);
})