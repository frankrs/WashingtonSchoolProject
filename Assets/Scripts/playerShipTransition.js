#pragma strict

// hud object
var hud:GameObject;
// spaceship object
var spaceship:GameObject;
// ship tail position
var tailTransform:Transform;
// ship hull position
var hullTransform:Transform;
// transition speed
var playerSpeed:float = 1.0f;
// toggles loop to move player
private var positionChange:boolean = false;
// holds new transition position
private var newTransform:Transform;

function Update () {
	// moves player
	if(positionChange == true) {
		var step = playerSpeed * Time.deltaTime;
		transform.position = Vector3.MoveTowards(transform.position, newTransform.position, step);
		if(newTransform.position == transform.position) {
			if(newTransform.position == hullTransform.position) {
				spaceship.SetActive(false);
				hud.SetActive(true);
			} else {
				hud.SetActive(false);
				spaceship.SetActive(true);
			}
			positionChange = false;
		}
	}
}

// moves player to ship hull
function hullPosition() {
	newTransform = hullTransform;
	positionChange = true;
	
}

// moves player to tail of ship
function tailPosition() {
	newTransform = tailTransform;
	positionChange = true;
	
}

// displays and hides ship
function shipActive(active:boolean) {
	spaceship.SetActive(active);
}

// displays and hides hud
function hudActive(active:boolean) {
	hud.SetActive(active);
}