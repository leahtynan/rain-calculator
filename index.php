<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Rain Calculator</title>
	<link rel="stylesheet" type="text/css" href="style.css">
	<link href="https://fonts.googleapis.com/css?family=Open+Sans|Roboto:400,700" rel="stylesheet">
  </head>
  <body>
	<div id="rain-screen"></div>
	<div id="graphics-container">
		<div id="gallons-cups-container">
			<ul id="gallons" class="floated-graphics clearfix">
			</ul>
			<ul id="cups" class="floated-graphics clearfix">
			</ul>
		</div>
	</div>
	<div id="control-panel">
		<div id="sliders" class="ui-section">
			<h2>Dimensions (meters)</h2>
			<table id="sliders-table">
			    <tr>
			      <td>Height</td>
			      <td><input type="range" id="myHeightRange" value="50" onchange="displayHeight()"></td>
				  <td><p id="height">50</p></td>
			    </tr>
			    <tr>
			      <td>Width</td>
			      <td><input type="range" id="myWidthRange" value="50" onchange="displayWidth()"></td>
				  <td><p id="width">50</p></td>
			    </tr>
			    <tr>
			      <td>Depth</td>
			      <td><input type="range" id="myDepthRange" value="50" onchange="displayDepth()"></td>
				  <td><p id="depth">50</p></td>
			    </tr>
			</table> 
		</div>
		<div id="location-and-button" class="ui-section">
			<h2>Location</h2>
			<select id="location">
			  <option value="waco">Waco, TX</option>
			  <option value="cambridge">Cambridge, MA</option>
			  <option value="butterfield">Butterfield, MN</option>
			  <option value="miami">Miami, FL</option>
			</select>
			<button id="start-rain-button">Start Rain</button>
		</div>
	</div>
	<div id="dialog-box">
		<div id="dialog-box-background">
			<div id="message">
				<p>Let's explore how cloud size affects rain showers!</p>
				<p>Using the controls on the left, choose the size of your cloud and a location to rain. For reference, 1 meter is about the length of a guitar or doorway.</p>
				<p>* This activity has audio! Turn the volume on to hear the rain.</p> 
			</div>
			<button id="tryAgainButton">Try Again</button>
		</div>
	</div>
			  	  
	 <script type="text/javascript" src="rain.js"></script> 
  </body>
</html>