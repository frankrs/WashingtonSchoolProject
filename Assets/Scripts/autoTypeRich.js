#pragma strict

// minimum pause for letter typed
var letterPause:float = 0.2;
// keypress audio clip
var keySound:AudioClip;
// planet object with stats to display
var planetStats:GameObject;

// stats text component
private var statsText:Text;
// toggles text loop on/off
private var clearText:boolean;
// game object with audio source
private var player:GameObject;
// audio source for keypress clip
private var playerAudio:AudioSource;

function Start () {
	// get player object
	player = GameObject.Find("Player");
	// get audio source
	playerAudio = player.GetComponent(AudioSource);
	// get planet stats text component
	statsText = planetStats.GetComponent(Text);
	// clear default text
	statsText.text = "";
}
 
function TypeText (stats:String) {
	// toggles text loop
 	clearText = false;
 	//toggles the style for bold;
	var bold : boolean = false;
	// toggle red 
	var red : boolean = false; 
	//toggles the style for italics;
	var italics : boolean = false;

 	//for ignoring special characters that toggle styles
	var ignore : boolean = false; 
 
	for (var nextletter in stats.ToCharArray()) {
		// breaks loop if true
		if(clearText == true)
			break;

		switch (nextletter) {
			case "@":
				//make sure this character isn't printed by ignoring it
				ignore = true; 
				//toggle red styling
				red = !red; 
			break;
			case "¬":
				//make sure this character isn't printed by ignoring it
				ignore = true;
				//toggle bold styling
				bold = !bold; 
			break;
			case "/":
				//make sure this character isn't printed by ignoring it
				ignore = true; 
				//toggle italic styling
				italics = !italics; 
			break;
		}
 		// adds rich text styles
		var letter : String = nextletter.ToString();
		if (!ignore) {
			if (bold){
				letter = "<b>"+letter+"</b>";
			}
			if (italics){
				letter = "<i>"+letter+"</i>";
			}
			if (red){
				letter = "<color=#00ddff><b>"+letter+"</b></color>";
			}
			statsText.text += letter; 
		}
                //make sure the next character isn't ignored
                ignore = false;
         // plays keypress clip per character displayed
        if(keySound)
        	playerAudio.PlayOneShot(keySound);
        // waits for random time to simulate typing
		yield WaitForSeconds (Random.Range(letterPause, letterPause*2));
	}
}

function ClearText() {
	// clears text
	clearText = true;
	statsText.text = "";
}