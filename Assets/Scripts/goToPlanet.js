#pragma strict

// toggles test mode (tour = false/test = true)
var testMode:boolean = false;

// planet order array for reference
var planetArray:String[];

// planet stats array
var planetStatsArray:String[];

// travel seconds to planet
var travelSeconds:float;

// navigation buttons
var navButtons:GameObject;

// previous navigation button
var prevButton:GameObject;

// next navigation button
var nextButton:GameObject;

var questions:GameObject;

var bonusQuestion:GameObject;

// current planet array number
public var currentPlanetNum:int = -1;

// current planet object
public var currentPlanet:GameObject = null;

// current planet size
private var planetSize:Vector3;

// ship audio source
private var shipAudio:AudioSource;

// space dust object
private var spaceDust:GameObject;

// player object
private var player:GameObject;

// player transition script
private var playerTransition:playerShipTransition;

// auto type script
//private var autoType:autoTypeRich;
private var autoType:autoTextLine;
// test mode toggle
private var TestMode:TestMode;

private var planetStats:GameObject;
private var planetAudioSource:AudioSource;
public var checkAudio:boolean = false;
private var planetRotation:rotatePlanet;

function Start () {
	// get test mode toggle
	TestMode = GetComponent("TestMode");
	testMode = TestMode.testMode;
	//testMode = true;

	// gets auto type script
	//autoType = GetComponent(autoTypeRich);
	autoType = GetComponent(autoTextLine);

	// gets ship audio source
	shipAudio = GetComponent(AudioSource);

	// gets space dust object
	spaceDust = GameObject.Find("Dust");

	// gets player object
	player = GameObject.Find("Player");

	// gets player ship transition script
	playerTransition = player.GetComponent(playerShipTransition);

	// moves player to ship hull
	playerTransition.hullPosition();

	// go to first planet
	GoToPlanet("Mercury");
}

function Update() {
	if(checkAudio == true) {
		CheckAudio();
	}
}

function MoveShip (startpos:Vector3, endpos:Vector3, seconds:float) {
	var timeDelta = 0.0;
	while (timeDelta <= 1.0) {
		timeDelta += Time.deltaTime/seconds;

		// rotate to planet
		var shipRotation = Quaternion.LookRotation(currentPlanet.transform.position - transform.position);
		transform.rotation = Quaternion.Lerp(transform.rotation, shipRotation, Mathf.SmoothStep(0.0, 1.0, timeDelta));

		// move to planet
		transform.position = Vector3.Lerp(startpos, endpos, Mathf.SmoothStep(0.0, 1.0, timeDelta));
		yield;
	}
	Debug.Log("Arrived at planet " + currentPlanet.name);
	ActivatePlanet();
}

function GoToPlanet(planetName:String) {
	// deactivate current planet info and audio
	if(currentPlanet != null) {
		DeactivatePlanet();
	}
	// curent planet object = planet array number
	currentPlanet = GameObject.Find(planetName);

	// sets current planet number
	currentPlanetNum  = System.Array.IndexOf(planetArray, planetName);

	// get planet size
	var planetSize = currentPlanet.transform.lossyScale;

	// get ship position minus planet size
	var shipPosition = planetSize.y - 2;

	// get planet direction
	var planetDirection:Vector3 = transform.position - currentPlanet.transform.position;

	// get near planet point
	var newPlanetPoint:Vector3 = currentPlanet.transform.position + planetDirection.normalized * shipPosition;

	// get players camera rotation
	var playerCamRotation = Camera.main.transform.rotation.y;

	// get players camera local rotation
	var playerCamLocalRot = Camera.main.transform.localRotation.y;

	// set ship rotation to camera rotation
	transform.rotation.y = playerCamRotation;

	// set player rotation to camera local rotation
	//player.transform.localRotation.y = -playerCamLocalRot;

	// travel to planet point
	MoveShip(transform.position, newPlanetPoint, travelSeconds);
}

function GoToNextPlanet() {
	// goes to next planet if not at last planet
	if(currentPlanetNum != (planetArray.length - 1)) {
		GoToPlanet(planetArray[currentPlanetNum + 1]);
	} else {
		SceneManager.LoadScene(0);
	}
}

function GoToPrevPlanet() {
	// goes to prevoius planet if not at first planet
	if(currentPlanetNum != 0) {
		GoToPlanet(planetArray[currentPlanetNum - 1]);
	} 
}

function ActivatePlanet() : void {
	// stop space dust particles
	spaceDust.SetActive(false);

	planetAudioSource = currentPlanet.GetComponent(AudioSource);

	if(!testMode) {
		activatePlanetStats(false);
	}

	// gets navigation text components
	var pt = prevButton.GetComponentInChildren(Text);
	var nt = nextButton.GetComponentInChildren(Text);

	// gets navigation button components
	var pb = prevButton.GetComponent(Button);
	var nb = nextButton.GetComponent(Button);

	if(currentPlanetNum == (planetArray.length - 1)) {
		// deactivates next button if at last planet
		nt.text = "< No Planet";
		nt.color = Color(1,1,1,0.5);
		nb.interactable = false;
		pt.text = "To " + planetArray[currentPlanetNum-1] + ">";
	} else if(currentPlanetNum == 0) {
		// deactivates prevoius button if at first planet
		pt.text = "No Planet >";
		pt.color = Color(1,1,1,0.5);
		pb.interactable = false;
		nt.text = "< To " + planetArray[currentPlanetNum+1];
	} else {
		// activates prevoius and next buttons
		nb.interactable = true;
		pb.interactable = true;
		nt.text = "< To " + planetArray[currentPlanetNum+1];
		pt.text = "To " + planetArray[currentPlanetNum-1] + ">";
		nt.color = Color(1,1,1,1);
		pt.color = Color(1,1,1,1);
	}

	// displays navigation
	if(testMode == true) {
		activateQuestions();
	} else {
		//activateNavButtons();
		checkAudio = true;
	}
}

function activatePlanetStats(spin:boolean) : void {
	if(spin == true) {
		planetRotation = currentPlanet.GetComponent(rotatePlanet);
		planetRotation.spinPlanet();
	}

	// stop ship audio source
	shipAudio.Stop();

	planetAudioSource.Play();

	// displays hud info for planet
	var stats = planetStatsArray[currentPlanetNum];
	stats = stats.Replace("\\n", "\n");
	autoType.TypeText(stats);
}

function CheckAudio() {
	if(!planetAudioSource.isPlaying) {
		Debug.Log("planet audio done");
		checkAudio = false;
		if(testMode == true) {
			autoType.ClearText();
			activateQuestions();
		} else {
			activateNavButtons();
		}
	}
}

function activateQuestions() : void {
	bonusQuestion.transform.rotation = transform.rotation;
	bonusQuestion.transform.position = transform.position;

	questions.transform.rotation = transform.rotation;
	questions.transform.position = transform.position;
	questions.GetComponent(Questions).activateButtons(true);
	questions.SetActive(true);
}

function activateNavButtons() : void {
	navButtons.transform.rotation = transform.rotation;
	navButtons.transform.position = transform.position;
	if(currentPlanetNum == (planetArray.length - 1)) {
		SceneManager.LoadScene(0);
	} else {
		navButtons.SetActive(true);
	}
}

function DeactivatePlanet() : void {
	// hides navigation
	navButtons.SetActive(false);

	// clears hud info for planet
	autoType.ClearText();

	// stop audio on planet
	planetAudioSource.Stop();

	// plays ship audio source
	//if(!shipAudio.isPlaying()){
	shipAudio.Play();
	//}
	// start space dust particles
	spaceDust.SetActive(true);
}