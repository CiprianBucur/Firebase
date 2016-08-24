var url = 'https://planetesiluni.firebaseio.com/Planete';
var planets = new Firebase(url);

var urlLuni = 'https://planetesiluni.firebaseio.com/Luni';
var luni = new Firebase(urlLuni);

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
	var caruselPlaneta = '';
	var descriere = '';
	var detalii = '';
	for (var i = 0; i < planetele.length; i++) {
		var nume = planetele[i].name;
		planet+='<li><a href="' + nume + '.html">' + nume + '</a></li>';
		if (i==0)
			caruselPlaneta+='<li data-target="#myCarousel" data-slide-to="' + i + '"  class="active"></li>';
		else
			caruselPlaneta+='<li data-target="#myCarousel" data-slide-to="' + i + '"></li>';
		if (i==0)
			descriere+='<div class="item active">';
		else
			descriere+='<div class="item">';
		descriere+='<img src="' + planetele[i].url + '" alt="Descriere ' + nume + '" class="img-responsive" >';
		descriere+='<div class="carousel-caption">';
		descriere+='<h3>' + nume + '</h3>';
		descriere+='<p>' + planetele[i].detaliu +'.</p>';
		descriere+='</div></div>';

		detalii+='<tr>';
		detalii += '<td><h4><a href="#col' + i + 'Content" data-toggle="collapse">' + nume + '</a></h4></td>';
		detalii += '<td><h4>' + planetele[i].distanta + ' UA</h4></td>';
		detalii += '<td><h4>' + planetele[i].sateliti + '</h4></td>';
		detalii+='</tr>';
		
		detalii += '<tr id="col' + i + 'Content" class="collapse">';
		detalii += '<td colspan="3">';
		detalii += '</td></tr>';
	}
	document.getElementById('planets').innerHTML = planet;
	document.getElementById('caruselPlanete').innerHTML = caruselPlaneta;
	//document.getElementById('descrierePlanete').innerHTML = descriere;
	document.getElementById('detaliiPlanete').innerHTML = detalii;
	document.getElementById('caruselDetalii').innerHTML = descriere;
	
	document.getElementById('butonInapoi').class = "right carousel-control";
	document.getElementById('butonInainte').class = "right carousel-control";
	$().afisezButoanele();
}

function refreshLuni(luni) {
	var lunile = '';
	var detalii ='';
	for (var i=0; i<luni.length; i++) {
		var j=0;
		if (luni[i].nr>0) {
			var data = luni[i].mName;
			//detalii += '<tr id="col' + i + 'Content" class="collapse">';
			detalii += '<td colspan="3">';
			for (var key in data) {		
				if (data.hasOwnProperty(key)) {
					if (j==luni[i].mName.length-1)
						detalii += data[key].nume + '.<br />';
					else
						detalii += data[key].nume + ', ';
				}
				j++;
			}
			detalii += '</td>';//</tr>';
		}
		else 
			detalii += '<td colspan="3">Nu are sateliți</td>';
		document.getElementById('col' + i + 'Content').innerHTML = detalii;
		detalii = '';

	}
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
			url = data[key].poza ? data[key].poza : 'data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==';
			if (planetName.trim().length > 0) {
				planetele.push({
					name: planetName,
					detaliu: descrierePlaneta,
					distanta: distanta,
					sateliti: nr,
					poza: poza,
					url: url,
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
    refreshLuni(luni);
})
