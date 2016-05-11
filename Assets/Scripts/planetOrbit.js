#pragma strict

var sun:Transform;
var speed:float;

function Update () {
	transform.RotateAround(sun.position, Vector3.up, speed * Time.deltaTime);
}