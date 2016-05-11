#pragma strict
import UnityEngine.SceneManagement;

// spaceship object
var spaceShip:GameObject;

// go to planet script
private var gotoPlanet:goToPlanet;

function Start () {
	gotoPlanet = spaceShip.GetComponent(goToPlanet);
}

function Update () {
	// VR Back/Return button press
	if(Input.GetKeyDown(KeyCode.Escape)) {
			SceneManager.LoadScene(0);
		}
}

function prevoiusPlanetClick() {
	gotoPlanet.GoToPrevPlanet();
}

function nextPlanetClick() {
	gotoPlanet.GoToNextPlanet();
}