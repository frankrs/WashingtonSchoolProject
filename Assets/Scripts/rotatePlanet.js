#pragma strict

var rotationYSpeed:float = 1;
var rotationXSpeed:float = 1;
var rotationZSpeed:float = 0;

private var spin:boolean = false;
private var spinRotation:float;
private var step:int = 0;

function Update() {
	// Rotate the object around its local Y axis 1 unit/second.
	transform.Rotate(Vector3.right * (Time.deltaTime*rotationYSpeed));
	// Rotate the object around its local X axis 1 unit/second.
	if(spin == true) {
		if(step < 60) {
			step ++;
			transform.Rotate(Vector3.up * (Time.deltaTime*spinRotation));
		} else {
			spin = false;
		}
	} else {
		transform.Rotate(Vector3.up * (Time.deltaTime*rotationXSpeed));
	}
	// Rotate the object around its local Z axis 1 unit/second.
	transform.Rotate(Vector3.forward * (Time.deltaTime*rotationZSpeed));
}

function spinPlanet() {
	if(rotationXSpeed < 0) {
		spinRotation = -100;
	} else {
		spinRotation = 100;
	}

	step = 0;
	spin = true;
}