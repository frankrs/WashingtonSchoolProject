#pragma strict

var duration:float = 1.0;
var startFade:float = 1.0;
var endFade:float = 0.0;
var alpha:float = 0.0;
private var rend:Renderer;

function Start () {
	rend = GetComponent(Renderer); 
}

function lerpAlpha() {
	//var lerp:float = Mathf.SmoothDamp(Time.time, duration) / duration;
	alpha = Mathf.Lerp(startFade, endFade, (Time.time/duration));
	rend.material.color.a = alpha;
}

function Update () {
	lerpAlpha();
}