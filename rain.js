// Rain Calculator by Leah Tynan 2018

// -------------------- VARIABLES & LISTENERS --------------------
var isRaining = false; 
var sceneLocation = "waco";
var body = document.getElementsByTagName('body')[0];
var rainScreen = document.getElementById('rain-screen');
// Nice-to-have: Store rainfall data in its own file ------ //
var locationsData  = { // Rainfall data from timeanddate.com
	"butterfield": { // This is technically Minneapolis data, since Butterfield data isn't available
		"fullLocationName": "Butterfield, MN",
		"averageRainfall": {
			"0": "0.39",
			"1": "0.38",
			"2": "0.82",
			"3": "1.53",
			"4": "2.11",
			"5": "2.57",
			"6": "1.77", 
			"7": "1.72",
			"8": "1.23",
			"9": "0.89",
			"10": "0.65", 
			"11": "0.53"
		}
	},
	"cambridge": {
		"fullLocationName": "Cambridge, MA",
		"averageRainfall": {
			"0": "1.79",
			"1": "1.54",
			"2": "1.95",
			"3": "1.84",
			"4": "1.77",
			"5": "1.82",
			"6": "1.62", 
			"7": "1.51",
			"8": "1.61",
			"9": "1.76",
			"10": "1.89", 
			"11": "2.04"
		}
	},
	"waco": {
		"fullLocationName": "Waco, TX",
		"averageRainfall": {
			"0": "0.78",
			"1": "1.05",
			"2": "1.08",
			"3": "1.04",
			"4": "1.98",
			"5": "1.30",
			"6": "0.40", 
			"7": "0.41",
			"8": "0.83",
			"9": "1.33",
			"10": "1.10", 
			"11": "0.82"
		}
	},
	"miami": {
		"fullLocationName": "Miami, FL",
		"averageRainfall": {
			"0": "0.54",
			"1": "0.63",
			"2": "0.71",
			"3": "1.05",
			"4": "2.19",
			"5": "6.52",
			"6": "4.62", 
			"7": "5.85",
			"8": "6.17",
			"9": "2.90",
			"10": "1.15", 
			"11": "0.68"
		}
	}
}
var monthNames  = {
	"0": "January",
	"1": "February",
	"2": "March",
	"3": "April",
	"4": "May",
	"5": "June",
	"6": "July",
	"7": "August",
	"8": "September",
	"9": "October",
	"10": "November",
	"11": "December"
}
var date = new Date();
var month = date.getMonth();

document.getElementById("myHeightRange").addEventListener("change", function(){
    var height = document.getElementById("myHeightRange").value;
    document.getElementById("height").innerHTML = height;
});
document.getElementById("myWidthRange").addEventListener("change", function(){
    var width = document.getElementById("myWidthRange").value;
    document.getElementById("width").innerHTML = width;
});
document.getElementById("myDepthRange").addEventListener("change", function(){
    var depth = document.getElementById("myDepthRange").value;
    document.getElementById("depth").innerHTML = depth;
});
document.getElementById("location").addEventListener("change", function(){
    sceneLocation = document.getElementById("location").value;
    console.log("Updated location: " + sceneLocation);
	console.log("URL:" + "url('img/locations/" + sceneLocation + ".jpg')")
	body.style.backgroundImage = "url('img/locations/" + sceneLocation + ".jpg')";
});

// -------------------- HELPER FUNCTIONS --------------------

function displayGallons() {
// *** Generates one gallon carton graphic for each gallon the cloud holds ***
	for (i = 0; i < gallons; i++) { 
		var node = document.createElement("LI");
		var gallon = document.createElement("img");
		gallon.src = "img/gallon.png";
		gallon.setAttribute("width", "80");
		node.appendChild(gallon);
		document.getElementById("gallons").appendChild(node);
    }
}

function displayCups() {
// *** Generates one cup graphic for each cup the cloud holds (leftover after subtracting full gallons) ***
    for (i = 0; i < cups; i++) { 
		var node = document.createElement("LI");
		var cup = document.createElement("img");
		cup.src = "img/cup.png";
		cup.setAttribute("width", "40");
		node.appendChild(cup);
		document.getElementById("cups").appendChild(node);
    }
}

function toggleControlPanel() {
// *** Toggles between interactable control panel and ghosted non-interactable panel with option to click "Try Again" to re-activate panel ***
	if (isRaining == true) {
		var nodes = document.getElementById("control-panel").getElementsByTagName('*'); 
		for(var i = 0; i < nodes.length; i++){
		     nodes[i].disabled = true;
			 nodes[i].style.opacity = "0.5"
		}
	} else {
		var nodes = document.getElementById("control-panel").getElementsByTagName('*'); 
		for(var i = 0; i < nodes.length; i++){
		     nodes[i].disabled = false;
			 nodes[i].style.opacity = "1"
		}
		document.getElementById("message").innerHTML = "<p>Let's explore how cloud size affects rain showers!</p><p>Using the controls on the left, choose the size of your cloud and a location to rain. For reference, 1 meter is about the length of a guitar or doorway.</p> "
		document.getElementById("tryAgainButton").style.display = "none";
		rainScreen.style.backgroundImage = "url('img/textures/blank.png')";
	}
}

function clearGallonsCups() {
// ** Clears all gallons and cups graphics for a new test
	var gallons = document.getElementById("gallons").querySelectorAll('LI');
	for(var i = 0; i < gallons.length; i++){
		gallons[i].remove();
	}
	var cups = document.getElementById("cups").querySelectorAll('LI');
	for(var i = 0; i < cups.length; i++){
		cups[i].remove();
	}
}

// -------------------- CORE FUNCTIONS --------------------

//  Idea: The "Start Rain" button could instead map to a function called "startRain" which would contain a sub-function called "calculateRain(cloudHeight, cloudWidth, cloudDepth" and return values: gallons, cups, and mass (maybe don't need mass? But currently using it to choose the rain screen). Updating the cups and gallons graphics and displaying the rain screen could also be helper functions (displayCupsGallons and displayRainScreen) //

function compareToMonthlyRainfall(cloudWidth, cloudDepth, massCloudWater, location) {
// *** Generates a percentage using the ratio of the mass of water (found using the area that rain falls upon) held by the cloud to the mass of the water included in the average rainfall
	
	// Convert monthly rainfall (in inches) to mass of water
	console.log("------ AVERAGE RAINFALL -------");
	console.log("Mass of water held in the cloud: " + massCloudWater);
	var monthlyRainfall = locationsData[sceneLocation]["averageRainfall"][month]; 
	console.log("Average rainfall in " + sceneLocation + ": " + monthlyRainfall);
	var avgRainfallMeters  = monthlyRainfall/39.37; // (there are 39.37 inches in a meter)
	console.log("Average rainfall in " + sceneLocation + ", in meters: " + avgRainfallMeters);
	console.log("Cloud width: " + cloudWidth + " Cloud depth: " + cloudDepth);
	var volumeAvgRainfall = avgRainfallMeters * cloudWidth * cloudDepth; // This is a volume of water
	console.log("Volume of average rainfall " + sceneLocation + ", in meters: " + volumeAvgRainfall);
	var massAvgRainfall = volumeAvgRainfall/4; // 1 cumulus cloud contains .25-.30 grams of water per meter cubed
	var massTotalInMonth = massAvgRainfall * 30;
	var percentageAvgRainfall = Math.round((massCloudWater/massTotalInMonth));
	return percentageAvgRainfall;
}

function calcRain() {
// *** Generates numbers and graphics showing the number of gallons and cups of rain a cloud of a given size holds ***
	
    var cloudHeight = parseInt(document.getElementById('myHeightRange').value);
    var cloudWidth = parseInt(document.getElementById('myWidthRange').value);
    var cloudDepth = parseInt(document.getElementById('myDepthRange').value);
	volume = Math.floor((4/3) * (Math.PI) * (cloudHeight/2) * (cloudWidth/2) * (cloudDepth/2)); // Volume of an ellipsoid
	console.log("------ CLOUD CREATED -------");
	console.log("Volume: " + volume + "meters cubed");
	mass = Math.floor(volume/4); // 1 cumulus cloud contains .25-.30 grams of water per meter cubed
	console.log("Mass: " + mass + "grams of water");
	gallons = Math.floor(mass/3785); // There are 3785 grams to a gallon
	cups = Math.floor((mass % 3785)/236); // Take the remainder of grams that don't fit into a full gallon and divide by number of grams in a cup
	var percentageAvgRainfall = compareToMonthlyRainfall(cloudWidth, cloudDepth, mass, sceneLocation);
	document.getElementById("message").innerHTML = "<p>At " + cloudHeight + " meters tall, " +  cloudWidth + " meters wide, and " + cloudDepth + " meters front to back, the cloud rains " + gallons + " gallons and " + cups + " cups. For the area the cloud covers, that's " + percentageAvgRainfall + "% the " + monthNames[month] + " rainfall in " + locationsData[sceneLocation]["fullLocationName"] + ".</p><p>Try new dimensions or a different location?</p>";	
	document.getElementById("tryAgainButton").style.display = "block";
	console.log("That is " + percentageAvgRainfall + "% the average rainfall in");

	// Nice-to-have: Make this its own function: displayCupsGallons ------ //
    // Grab the number of gallon and cup li's on the page
    var gallonNum = document.getElementById('gallons').getElementsByTagName('li').length;
    var cupNum = document.getElementById('cups').getElementsByTagName('li').length;
    // Create or update the gallon carton and cup graphics
	if (gallonNum > 0 && cupNum > 0) { // If there are graphics on the screen, clear the past round's graphics and add the new quantities 
        document.getElementById("gallons").innerHTML = "";
    	document.getElementById("cups").innerHTML = "";
		displayGallons();
		displayCups();
    } else { // Otherwise, start generating images from scratch
    	displayGallons();
		displayCups();
	}
	
	// Nice-to-have: Make this its own function: displayRainScreen(mass) ------ //
	if (mass < 10000) { 
		rainScreen.style.backgroundImage = "url('img/textures/light.png')";
		var audio = new Audio('audio/light-rain.mp3'); 
		audio.play(); 
	}
	if (mass >= 10001 && mass <= 42000) {
		rainScreen.style.backgroundImage = "url('img/textures/medium.png')";
		var audio = new Audio('audio/medium-rain.mp3'); 
		audio.play(); 
	}
	if (mass >= 42001 && mass <= 130899) {
		rainScreen.style.backgroundImage = "url('img/textures/heavy.png')";
		var audio = new Audio('audio/heavy-rain.mp3'); 
		audio.play(); 
	}
	isRaining = true;
	toggleControlPanel();
};

// -------------------- BUTTONS (MORE LISTENERS) --------------------

var calcRainButton = document.getElementById("start-rain-button"); 
calcRainButton.addEventListener("click", function () { 
  calcRain();
});
var tryAgainButton = document.getElementById("tryAgainButton"); 
tryAgainButton.addEventListener("click", function () { 
	isRaining = false;
	console.log("Try again button was pressed");
	toggleControlPanel();
	clearGallonsCups();
});