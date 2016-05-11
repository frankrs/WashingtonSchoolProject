#pragma strict

var range:float = 2.0f;
var speed:float = 0.5f;

private var _elapsed:float;

function Update () {
	// Rotate the object back and forth on its local Z axis 
	transform.Rotate(Vector3.forward * Mathf.Sin(false ? Time.deltaTime : _elapsed) * range);
	_elapsed += Time.deltaTime * speed;
}