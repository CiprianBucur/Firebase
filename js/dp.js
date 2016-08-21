var urlPlanete = 'https://planetesiluni.firebaseio.com/Planete';
var planets = new Firebase(urlPlanete);

var urlLuni = 'https://planetesiluni.firebaseio.com/Luni';
var luni = new Firebase(urlLuni);

var fileName = decodeURIComponent((window.location.href.substring(window.location.href.lastIndexOf("/")+1,window.location.href.lastIndexOf("."))+'').replace(/\+/g, '%20'));

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
		if (nume == fileName) {
			planet+='<li class="active"><a href="' + nume + '.html">' + nume + '<span class="sr-only">(current)</span></a></li>';
			descriere+='<div class=" col-sm-12 placeholder">';
			descriere+='<img align="left" src="' + planetele[i].poza + '" class="img-responsive" alt="Descriere ' + nume + '">';
			descriere+='</div>';
			descriere+='<div class=" col-sm-12 placeholder">';
			descriere+='<span class="text-muted">' + planetele[i].detaliu + '</span>';
			descriere+='</div>';
			
			/*detalii += '<tr>';
			detalii += '<td>' + nume + '</td>';
			detalii += '<td>' + planetele[i].distanta + ' UA</td>';
			detalii += '<td>' + planetele[i].sateliti + '</td>';
			detalii += '</tr>';*/
		}
		else
			planet+='<li><a href="' + nume + '.html">' + nume + '</a></li>';
	}
	document.getElementById('planets').innerHTML = planet;
	document.getElementById('descrierePlanete').innerHTML = descriere;
	//document.getElementById('moons').innerHTML = detalii;
}

function refreshLuni(luni) {
	var lunile = '';
	//alert(luni[0].planetName);

	if (luni[0].nr > 0) {
		var data = luni[0].mName;
		for (var key in data) {
			if (data.hasOwnProperty(key)) {
				lunile += '<tr>';
				lunile += '<td>' + data[key].nume + '</td>';
				lunile += '</tr>';
			}
		}
	}
	else {
		lunile += '<tr><td>' + luni[0].planetName + ' nu are sateliți.</td></tr>';
	}
	document.getElementById('moons').innerHTML = lunile;
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
			poza = data[key].poza ? data[key].poza : 'data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==';
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

luni.on("value", function(snapshot) {
    var data = snapshot.val();
    var luni = [];
    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            name = data[key].planetName ? data[key].planetName : 'Fără nume';
			if (name == fileName) {
				mName = data[key].moonName ? data[key].moonName : 'Fără nume';
				nr = data[key].nr ? data[key].nr : 'Fără sateliți';
				if (name.trim().length > 0) {
					luni.push({
						planetName: name,
						mName: mName,
						nr: nr,
						key: key
					})
				}				
			}
        }
    }
    refreshLuni(luni);
})
