#pragma strict
import UnityEngine.UI;

var hudPlanetTxt:GameObject;

private var hudCanvas:Canvas;
private var planetText:Text;
private var rectile:GameObject;
private var rectileRenderer:Renderer;

function Start () {
	planetText = hudPlanetTxt.GetComponent(UI.Text);
	hudCanvas = GetComponent(Canvas);
	rectile = GameObject.Find("Rectile");
	rectileRenderer = rectile.GetComponent(Renderer);
}

function Update () {
	// sets target point to center of screen
	var ray = Camera.main.ScreenPointToRay(new Vector3(Screen.width/2,Screen.height/2,0));

	// gets objects in center view and sets the name in hud
	var hit:RaycastHit;
	if(Physics.Raycast(ray,hit)) {
		planetText.text = hit.transform.name;
		rectileRenderer.material.color = Color(1,1,1,0.3);
	} else {
		planetText.text = "";
		rectileRenderer.material.color = Color(1,1,1,1);
	}
}