#pragma strict

var spaceShip:GameObject;
var thisRenderer:Renderer;


function Update () {
	if(spaceShip.transform.position.x >= 10000 || spaceShip.transform.position.z >= 10000 || spaceShip.transform.position.x <= -10000 || spaceShip.transform.position.z <= -10000) {
		thisRenderer.enabled = false;
	} else {
		thisRenderer.enabled = true;
	}
	 transform.LookAt(Camera.main.transform);
}