#pragma strict

// minimum pause for letter typed
var letterPause:float = 0.75;
// keypress audio clip
var keySound:AudioClip;
// planet object with stats to display
var planetStats:GameObject;

// stats text component
private var statsText:UnityEngine.UI.Text;
// toggles text loop on/off
private var clearText:boolean;
// game object with audio source
private var player:GameObject;
// audio source for keypress clip
private var playerAudio:AudioSource;

private var strArr:String[];
private var bldArr:String[];

function Start () {
	// get player object
	player = GameObject.Find("Player");
	// get audio source
	playerAudio = player.GetComponent(AudioSource);
	// get planet stats text component
	statsText = planetStats.GetComponent(UnityEngine.UI.Text);
	// clear default text
	statsText.text = "";
}
public function TypeText (stats:String) {
	var seperator:char[] = ["\n"[0]];
	var bold:char[] = ["@"[0]];
	strArr = stats.Split(seperator);

	for(var i:int=0; i < strArr.length; i++) {
		
		bldArr = strArr[i].Split(bold);
		bldArr[1] = "<b>" + bldArr[1] + "</b>";
		statsText.text += bldArr[1]+bldArr[2]+"\n";

		// plays keypress clip per line displayed
    	if(keySound)
    	playerAudio.PlayOneShot(keySound);
    	// waits for time 
		yield WaitForSeconds (letterPause);
	}
}

function ClearText() {
	// clears text
	clearText = true;
	statsText.text = "";
}