#pragma strict

public var ship:GameObject;
public var question:Text;
public var questionNumberTxt:Text;
public var bonusQuestion:Text;
public var yesBtn:GameObject;
public var noBtn:GameObject;
public var bonus:GameObject;
public var bonusBtn:GameObject;
public var bonusYesBtn:GameObject;
public var bonusNoBtn:GameObject;
public var fact1:GameObject;
public var fact2:GameObject;
public var fact3:GameObject;
public var fact1Window:GameObject;
public var fact2Window:GameObject;
public var fact3Window:GameObject;
public var fact1Txt:Text;
public var fact2Txt:Text;
public var fact3Txt:Text;

public var planetsQuestions:Array = new Array(8);
public var planetsBonusQuestions:Array = new Array(8);

private var GoToPlanet:goToPlanet;
private var questionTxt:String;
private var questionNumTxt:String = "Question 1 of 3";
private var bonusQuestionTxt:String;
private var currentPlanetQuestions:int = 0;

private var data:GameObject;
private var dataScript:TestData;

private var f1Text:String;
private var f2Text:String;
private var f3Text:String;

function Start () {
// todo:  get saved data and apply data to arrays 
	data  = GameObject.Find("Data(Clone)");
	dataScript = data.GetComponent(TestData);
	GoToPlanet = ship.GetComponent(goToPlanet);
	questionTxt = question.text;
	yesBtn.GetComponent(Button).onClick.AddListener(function() {MercuryQ1(0);});
	noBtn.GetComponent(Button).onClick.AddListener(function() {MercuryQ1(1);});
	bonusYesBtn.GetComponent(Button).onClick.AddListener(function() {MercuryBonus(0);});
	bonusNoBtn.GetComponent(Button).onClick.AddListener(function() {MercuryBonus(1);});
	f1Text = "Mercury is one of only two planets in our Solar System that has no moons.  The other is Venus.";
	f2Text = " Even though Mercury is really hot, there's ice on the surface that stays frozen!  It can be found in permanently shaded craters where the Sun never shines.";
}

function BonusOnClick () {
	activateButtons(false);
	bonusBtn.SetActive(false);
	bonus.SetActive(true);
	bonusYesBtn.SetActive(true);
	bonusNoBtn.SetActive(true);
}

function Fact1OnClick() {
	fact1Window.SetActive(true);
	fact1Txt.text = f1Text;
}

function Fact2OnClick() {
	fact2Window.SetActive(true);
	fact2Txt.text = f2Text;
}

function Fact3OnClick() {
	fact3Window.SetActive(true);
	fact3Txt.text = f3Text;
}

function Fact1Close() {
	fact1Window.SetActive(false);
}

function Fact2Close() {
	fact2Window.SetActive(false);
}

function Fact3Close() {
	fact3Window.SetActive(false);
}

// Begin Mercury

function MercuryQ1 (btn:int) :void {
	if (btn == 0) {
		// true : wrong
		question.text = "Wrong: Try again!";
		StartCoroutine(deActivate(2, true));
	} else if (btn == 1) {
		// false : correct
		currentPlanetQuestions = 1;
		dataScript.planetsQuestions[GoToPlanet.currentPlanetNum] = currentPlanetQuestions;
		question.text = "Correct: Good job!";
		removeListeners();
		yesBtn.GetComponent(Button).onClick.AddListener(function() {MercuryQ2(0);});
		noBtn.GetComponent(Button).onClick.AddListener(function() {MercuryQ2(1);});
		StartCoroutine(deActivate(3, false));
		questionNumTxt = "Question 2 of 3";
		questionTxt = "Mercury is larger than Earth's Moon.";
	}
}

function MercuryQ2 (btn:int) :void {
	if (btn == 0) {
		// true : correct
		currentPlanetQuestions = 2;
		dataScript.planetsQuestions[GoToPlanet.currentPlanetNum] = currentPlanetQuestions;
		question.text = "Correct: Good job!";
		removeListeners();
		yesBtn.GetComponent(Button).onClick.AddListener(function() {MercuryQ3(0);});
		noBtn.GetComponent(Button).onClick.AddListener(function() {MercuryQ3(1);});
		StartCoroutine(deActivate(3, false));
		questionNumTxt = "Question 3 of 3";
		questionTxt = "The Surface of Mercury is very smooth.";
	} else if (btn == 1) {
		// false : wrong
		question.text = "Wrong: Try again!";
		StartCoroutine(deActivate(2, true));
	}
}

function MercuryQ3 (btn:int) :void {
	if (btn == 0) {
		// true : wrong
		question.text = "Wrong: Try again!";
		StartCoroutine(deActivate(2, true));
	} else if (btn == 1) {
		// false : correct
		currentPlanetQuestions = 3;
		dataScript.planetsQuestions[GoToPlanet.currentPlanetNum] = currentPlanetQuestions;
		question.text = "Correct: Good job!";
		removeListeners();
		yesBtn.GetComponent(Button).onClick.AddListener(function() {VenusQ1(0);});
		noBtn.GetComponent(Button).onClick.AddListener(function() {VenusQ1(1);});
		StartCoroutine(deActivate(3, false));
		questionNumTxt = "Question 1 of 3";
		questionTxt = "Venus is hotter than Mercury, even though it's further away from the Sun.";
		f1Text = "Venus is the second brightest object in the night sky -- our moon is the brightest!";
		f2Text = "Venus is often called Earth's \"sister planet\", because it's so close to Earth in size and structure.";
		f3Text = "There is a thick atmosphere on Venus that is made up of sulphuric acid -- imagine what a rain storm would be like there!";
		fact3.SetActive(true);
	}
}

function MercuryBonus (btn:int) :void {
	removeBonusListeners();
	bonusYesBtn.GetComponent(Button).onClick.AddListener(function() {VenusBonus(0);});
	bonusNoBtn.GetComponent(Button).onClick.AddListener(function() {VenusBonus(1);});
	if (btn == 0) {
		// yes : wrong
		dataScript.planetsBonusQuestions[GoToPlanet.currentPlanetNum] = 0;
		bonusQuestion.text = "Wrong: Nice try!";
		StartCoroutine(deactivateBonus(2));
	} else if (btn == 1) {
		// no : correct
		dataScript.planetsBonusQuestions[GoToPlanet.currentPlanetNum] = 1;
		bonusQuestion.text = "Correct: It would be too difficult to overcome those obstacles for us to attemt colonizing Mercury.";
		StartCoroutine(deactivateBonus(3));
	}
	bonusQuestionTxt = "When scientists first observed the thick clouds on Venus, before they could tell what they were made of, did they think it would be safe to humans?";
}

// End Mercury
// Begin Venus

function VenusQ1 (btn:int) :void {
	if (btn == 0) {
		// true : correct
		currentPlanetQuestions = 1;
		dataScript.planetsQuestions[GoToPlanet.currentPlanetNum] = currentPlanetQuestions;
		question.text = "Correct: Good job!";
		removeListeners();
		yesBtn.GetComponent(Button).onClick.AddListener(function() {VenusQ2(0);});
		noBtn.GetComponent(Button).onClick.AddListener(function() {VenusQ2(1);});
		StartCoroutine(deActivate(3, false));
		questionNumTxt = "Question 2 of 3";
		questionTxt = "Venus spins in the oposite direction from most of the other planets.";
	} else if (btn == 1) {
		// false : wrong
		question.text = "Wrong: Try again!";
		StartCoroutine(deActivate(2, true));
	}
}

function VenusQ2 (btn:int) :void {
	if (btn == 0) {
		// true : correct
		currentPlanetQuestions = 2;
		dataScript.planetsQuestions[GoToPlanet.currentPlanetNum] = currentPlanetQuestions;
		question.text = "Correct: Good job!";
		removeListeners();
		yesBtn.GetComponent(Button).onClick.AddListener(function() {VenusQ3(0);});
		noBtn.GetComponent(Button).onClick.AddListener(function() {VenusQ3(1);});
		StartCoroutine(deActivate(3, false));
		questionNumTxt = "Question 3 of 3";
		questionTxt = "The atmosphere on Venus is safe for humans.";
	} else if (btn == 1) {
		// false : wrong
		question.text = "Wrong: Try again!";
		StartCoroutine(deActivate(2, true));
	}
}

function VenusQ3 (btn:int) :void {
	if (btn == 0) {
		// true : wrong
		question.text = "Wrong: Try again!";
		StartCoroutine(deActivate(2, true));
	} else if (btn == 1) {
		// false : correct
		currentPlanetQuestions = 3;
		dataScript.planetsQuestions[GoToPlanet.currentPlanetNum] = currentPlanetQuestions;
		question.text = "Correct: Good job!";
		removeListeners();
		yesBtn.GetComponent(Button).onClick.AddListener(function() {EarthQ1(0);});
		noBtn.GetComponent(Button).onClick.AddListener(function() {EarthQ1(1);});
		StartCoroutine(deActivate(3, false));
		questionNumTxt = "Question 1 of 3";
		questionTxt = "2/3 of our planet is covered by water.";
		f1Text = "We may think we know a lot about our home planet, but there are still places here that haven't been explored by humans!";
		f2Text = "";
		f3Text = "";
		fact2.SetActive(false);
		fact3.SetActive(false);
	}
}

function VenusBonus (btn:int) :void {
	removeBonusListeners();
	bonusYesBtn.GetComponent(Button).onClick.AddListener(function() {EarthBonus(0);});
	bonusNoBtn.GetComponent(Button).onClick.AddListener(function() {EarthBonus(1);});
	if (btn == 0) {
		// yes : correct
		dataScript.planetsBonusQuestions[GoToPlanet.currentPlanetNum] = 1;
		bonusQuestion.text = "Correct: They thought it would be safe. In fact, they thought there was a tropical paradise under the atmosphere of Venus.";
		StartCoroutine(deactivateBonus(3));
	} else if (btn == 1) {
		// no : wrong
		dataScript.planetsBonusQuestions[GoToPlanet.currentPlanetNum] = 0;
		bonusQuestion.text = "Wrong: Nice try!";
		StartCoroutine(deactivateBonus(2));
	}
	bonusQuestionTxt = "If Earth was closer to the Sun, do you think it would still be so perfect for living creatures?";
}

// End Venus
// Begin Earth

function EarthQ1 (btn:int) :void {
	if (btn == 0) {
		// true : correct
		currentPlanetQuestions = 1;
		dataScript.planetsQuestions[GoToPlanet.currentPlanetNum] = currentPlanetQuestions;
		question.text = "Correct: Good job!";
		removeListeners();
		yesBtn.GetComponent(Button).onClick.AddListener(function() {EarthQ2(0);});
		noBtn.GetComponent(Button).onClick.AddListener(function() {EarthQ2(1);});
		StartCoroutine(deActivate(3, false));
		questionNumTxt = "Question 2 of 3";
		questionTxt = "Earth is one of many worlds known to harbor life.";
	} else if (btn == 1) {
		// false : wrong
		question.text = "Wrong: Try again!";
		StartCoroutine(deActivate(2, true));
	}
}

function EarthQ2 (btn:int) :void {
	if (btn == 0) {
		// true : wrong
		question.text = "Wrong: Try again!";
		StartCoroutine(deActivate(2, true));
	} else if (btn == 1) {
		// false : correct
		currentPlanetQuestions = 2;
		dataScript.planetsQuestions[GoToPlanet.currentPlanetNum] = currentPlanetQuestions;
		question.text = "Correct: Good job!";
		removeListeners();
		yesBtn.GetComponent(Button).onClick.AddListener(function() {EarthQ3(0);});
		noBtn.GetComponent(Button).onClick.AddListener(function() {EarthQ3(1);});
		StartCoroutine(deActivate(3, false));
		questionNumTxt = "Question 3 of 3";
		questionTxt = "The Earth travels around the Sun at 18 miles per hour.";
	}
}

function EarthQ3 (btn:int) :void {
	if (btn == 0) {
		// true : wrong
		question.text = "Wrong: Try again!";
		StartCoroutine(deActivate(2, true));
	} else if (btn == 1) {
		// false : correct
		currentPlanetQuestions = 3;
		dataScript.planetsQuestions[GoToPlanet.currentPlanetNum] = currentPlanetQuestions;
		question.text = "Correct: Good job!";
		removeListeners();
		yesBtn.GetComponent(Button).onClick.AddListener(function() {MarsQ1(0);});
		noBtn.GetComponent(Button).onClick.AddListener(function() {MarsQ1(1);});
		StartCoroutine(deActivate(3, false));
		questionNumTxt = "Question 1 of 3";
		questionTxt = "Mars is called \"the green planet\".";
		f1Text = "There have been 43 missions to Mars starting in 1960!  Many of them were failures, but the successful missions have given us a lot of great information.";
	}
}

function EarthBonus (btn:int) :void {
	removeBonusListeners();
	bonusYesBtn.GetComponent(Button).onClick.AddListener(function() {MarsBonus(0);});
	bonusNoBtn.GetComponent(Button).onClick.AddListener(function() {MarsBonus(1);});
	if (btn == 0) {
		// yes : wrong
		dataScript.planetsBonusQuestions[GoToPlanet.currentPlanetNum] = 0;
		bonusQuestion.text = "Wrong: Nice try!";
		StartCoroutine(deactivateBonus(2));
	} else if (btn == 1) {
		// no : correct
		dataScript.planetsBonusQuestions[GoToPlanet.currentPlanetNum] = 1;
		bonusQuestion.text = "Correct: Our placement in the Solar System is the reason why Earth is so hospitable to life. A different location would change that.";
		StartCoroutine(deactivateBonus(3));
	}
	bonusQuestionTxt = "Gravity on Mars is not as strong as it is on Earth. Do you think you could jump higher?";
}

// End Earth
// Begin Mars

function MarsQ1 (btn:int) :void {
	if (btn == 0) {
		// true : wrong
		question.text = "Wrong: Try again!";
		StartCoroutine(deActivate(2, true));
	} else if (btn == 1) {
		// false : correct
		currentPlanetQuestions = 1;
		dataScript.planetsQuestions[GoToPlanet.currentPlanetNum] = currentPlanetQuestions;
		question.text = "Correct: Good job!";
		removeListeners();
		yesBtn.GetComponent(Button).onClick.AddListener(function() {MarsQ2(0);});
		noBtn.GetComponent(Button).onClick.AddListener(function() {MarsQ2(1);});
		StartCoroutine(deActivate(3, false));
		questionNumTxt = "Question 2 of 3";
		questionTxt = "The surface of Mars shares many similarities with Earth.";
	}
}

function MarsQ2 (btn:int) :void {
	if (btn == 0) {
		// true : correct
		currentPlanetQuestions = 2;
		dataScript.planetsQuestions[GoToPlanet.currentPlanetNum] = currentPlanetQuestions;
		question.text = "Correct: Good job!";
		removeListeners();
		yesBtn.GetComponent(Button).onClick.AddListener(function() {MarsQ3(0);});
		noBtn.GetComponent(Button).onClick.AddListener(function() {MarsQ3(1);});
		StartCoroutine(deActivate(3, false));
		questionNumTxt = "Question 3 of 3";
		questionTxt = "Mars can be seen with the naked eye at night.";
	} else if (btn == 1) {
		// false : wrong
		question.text = "Wrong: Try again!";
		StartCoroutine(deActivate(2, true));
	}
}

function MarsQ3 (btn:int) :void {
	if (btn == 0) {
		// true : correct
		currentPlanetQuestions = 3;
		dataScript.planetsQuestions[GoToPlanet.currentPlanetNum] = currentPlanetQuestions;
		question.text = "Correct: Good job!";
		removeListeners();
		yesBtn.GetComponent(Button).onClick.AddListener(function() {JupiterQ1(0);});
		noBtn.GetComponent(Button).onClick.AddListener(function() {JupiterQ1(1);});
		StartCoroutine(deActivate(3, false));
		questionNumTxt = "Question 1 of 3";
		questionTxt = "Is Jupiter the biggest planet in our Solar System.";
		f1Text = "Jupiter is 2 1/2 times bigger than all of the other planets in our solar system combined!  You could fit 318 Earths inside of this massive planet!";
	} else if (btn == 1) {
		// false : wrong
		question.text = "Wrong: Try again!";
		StartCoroutine(deActivate(2, true));
	}
}

function MarsBonus (btn:int) :void {
	removeBonusListeners();
	bonusYesBtn.GetComponent(Button).onClick.AddListener(function() {JupiterBonus(0);});
	bonusNoBtn.GetComponent(Button).onClick.AddListener(function() {JupiterBonus(1);});
	if (btn == 0) {
		// yes : correct
		dataScript.planetsBonusQuestions[GoToPlanet.currentPlanetNum] = 1;
		bonusQuestion.text = "Correct: You could jump higher, and throw balls farther, just like on the moon.";
		StartCoroutine(deactivateBonus(3));
	} else if (btn == 1) {
		// no : wrong
		dataScript.planetsBonusQuestions[GoToPlanet.currentPlanetNum] = 0;
		bonusQuestion.text = "Wrong: Nice try!";
		StartCoroutine(deactivateBonus(2));
	}
	bonusQuestionTxt = "Jupiter is a gaseous planet. Do you think the surface of the planet is a lot like that of Earth?";
}

// End Mars
// Begin Jupiter

function JupiterQ1 (btn:int) :void {
	if (btn == 0) {
		// true : correct
		currentPlanetQuestions = 1;
		dataScript.planetsQuestions[GoToPlanet.currentPlanetNum] = currentPlanetQuestions;
		question.text = "Correct: Good job!";
		removeListeners();
		yesBtn.GetComponent(Button).onClick.AddListener(function() {JupiterQ2(0);});
		noBtn.GetComponent(Button).onClick.AddListener(function() {JupiterQ2(1);});
		StartCoroutine(deActivate(3, false));
		questionNumTxt = "Question 2 of 3";
		questionTxt = "The red spot on Jupiter is actualy a storm that has been raging for hundreds of years.";
	} else if (btn == 1) {
		// false : wrong
		question.text = "Wrong: Try again!";
		StartCoroutine(deActivate(2, true));
	}
}

function JupiterQ2 (btn:int) :void {
	if (btn == 0) {
		// true : correct
		currentPlanetQuestions = 2;
		dataScript.planetsQuestions[GoToPlanet.currentPlanetNum] = currentPlanetQuestions;
		question.text = "Correct: Good job!";
		removeListeners();
		yesBtn.GetComponent(Button).onClick.AddListener(function() {JupiterQ3(0);});
		noBtn.GetComponent(Button).onClick.AddListener(function() {JupiterQ3(1);});
		StartCoroutine(deActivate(3, false));
		questionNumTxt = "Question 3 of 3";
		questionTxt = "Jupiter has only one moon, just like Earth.";
	} else if (btn == 1) {
		// false : wrong
		question.text = "Wrong: Try again!";
		StartCoroutine(deActivate(2, true));
	}
}

function JupiterQ3 (btn:int) :void {
	if (btn == 0) {
		// true : wrong
		question.text = "Wrong: Try again!";
		StartCoroutine(deActivate(2, true));
	} else if (btn == 1) {
		// false : correct
		currentPlanetQuestions = 3;
		dataScript.planetsQuestions[GoToPlanet.currentPlanetNum] = currentPlanetQuestions;
		question.text = "Correct: Good job!";
		removeListeners();
		yesBtn.GetComponent(Button).onClick.AddListener(function() {SaturnQ1(0);});
		noBtn.GetComponent(Button).onClick.AddListener(function() {SaturnQ1(1);});
		StartCoroutine(deActivate(3, false));
		questionNumTxt = "Question 1 of 3";
		questionTxt = "Saturn's rings are made of ice and rock.";
		f1Text = "Saturn is the most distant planet that can be seen with the naked eye.";
		f2Text = "Saturn is shaped a little bit like a squished ball because it spins so fast -- it's not perfectly round like we sometimes think.";
		fact2.SetActive(true);
	}
}

function JupiterBonus (btn:int) :void {
	removeBonusListeners();
	bonusYesBtn.GetComponent(Button).onClick.AddListener(function() {SaturnBonus(0);});
	bonusNoBtn.GetComponent(Button).onClick.AddListener(function() {SaturnBonus(1);});
	if (btn == 0) {
		// yes : wrong
		dataScript.planetsBonusQuestions[GoToPlanet.currentPlanetNum] = 0;
		bonusQuestion.text = "Wrong: Nice try!";
		StartCoroutine(deactivateBonus(2));
	} else if (btn == 1) {
		// no : correct
		dataScript.planetsBonusQuestions[GoToPlanet.currentPlanetNum] = 1;
		bonusQuestion.text = "Correct: The surface is mostly ice, clouds and gasses. There isn't a solid surface like we see here.";
		StartCoroutine(deactivateBonus(3));
	}
	bonusQuestionTxt = "Do you think you could drive a car on Saturn's rings?";
}

// End Jupiter
// Begin Saturn

function SaturnQ1 (btn:int) :void {
	if (btn == 0) {
		// true : correct
		currentPlanetQuestions = 1;
		dataScript.planetsQuestions[GoToPlanet.currentPlanetNum] = currentPlanetQuestions;
		question.text = "Correct: Good job!";
		removeListeners();
		yesBtn.GetComponent(Button).onClick.AddListener(function() {SaturnQ2(0);});
		noBtn.GetComponent(Button).onClick.AddListener(function() {SaturnQ2(1);});
		StartCoroutine(deActivate(3, false));
		questionNumTxt = "Question 2 of 3";
		questionTxt = "Some of Saturns moons are made almost entirely out of ice.";
	} else if (btn == 1) {
		// false : wrong
		question.text = "Wrong: Try again!";
		StartCoroutine(deActivate(2, true));
	}
}

function SaturnQ2 (btn:int) :void {
	if (btn == 0) {
		// true : correct
		currentPlanetQuestions = 2;
		dataScript.planetsQuestions[GoToPlanet.currentPlanetNum] = currentPlanetQuestions;
		question.text = "Correct: Good job!";
		removeListeners();
		yesBtn.GetComponent(Button).onClick.AddListener(function() {SaturnQ3(0);});
		noBtn.GetComponent(Button).onClick.AddListener(function() {SaturnQ3(1);});
		StartCoroutine(deActivate(3, false));
		questionNumTxt = "Question 3 of 3";
		questionTxt = "Scientists know how Saturn's rings were formed.";
	} else if (btn == 1) {
		// false : wrong
		question.text = "Wrong: Try again!";
		StartCoroutine(deActivate(2, true));
	}
}

function SaturnQ3 (btn:int) :void {
	if (btn == 0) {
		// true : wrong
		question.text = "Wrong: Try again!";
		StartCoroutine(deActivate(2, true));
	} else if (btn == 1) {
		// false : correct
		currentPlanetQuestions = 3;
		dataScript.planetsQuestions[GoToPlanet.currentPlanetNum] = currentPlanetQuestions;
		question.text = "Correct: Good job!";
		removeListeners();
		yesBtn.GetComponent(Button).onClick.AddListener(function() {UranusQ1(0);});
		noBtn.GetComponent(Button).onClick.AddListener(function() {UranusQ1(1);});
		StartCoroutine(deActivate(3, false));
		questionNumTxt = "Question 1 of 3";
		questionTxt = "Uranus spins on its side.";
		f1Text = "Uranus was the first planet discovered with the use of a telescope -- it's not visible without one.";
		f2Text = "";
		fact2.SetActive(false);
	}
}

function SaturnBonus (btn:int) :void {
	removeBonusListeners();
	bonusYesBtn.GetComponent(Button).onClick.AddListener(function() {UranusBonus(0);});
	bonusNoBtn.GetComponent(Button).onClick.AddListener(function() {UranusBonus(1);});
	if (btn == 0) {
		// yes : wrong
		dataScript.planetsBonusQuestions[GoToPlanet.currentPlanetNum] = 0;
		bonusQuestion.text = "Wrong: Nice try!";
		StartCoroutine(deactivateBonus(2));
	} else if (btn == 1) {
		// no : correct
		dataScript.planetsBonusQuestions[GoToPlanet.currentPlanetNum] = 1;
		bonusQuestion.text = "Correct: Saturn's rings only appear to be solid from a great distance. Up close they're made of many smaller pieces of matter that don't connect.";
		StartCoroutine(deactivateBonus(3));
	}
	bonusQuestionTxt = "Uranus is not visible in the night sky, and was the first planet to be discovered with a telescpoe. Do you think there might be more planets in our Solar System that we haven't found yet?";

}

// End Saturn
// Begin Uranus

function UranusQ1 (btn:int) :void {
	if (btn == 0) {
		// true : correct
		currentPlanetQuestions = 1;
		dataScript.planetsQuestions[GoToPlanet.currentPlanetNum] = currentPlanetQuestions;
		question.text = "Correct: Good job!";
		removeListeners();
		yesBtn.GetComponent(Button).onClick.AddListener(function() {UranusQ2(0);});
		noBtn.GetComponent(Button).onClick.AddListener(function() {UranusQ2(1);});
		StartCoroutine(deActivate(3, false));
		questionNumTxt = "Question 2 of 3";
		questionTxt = "Uranus is blue-green in color.";
	} else if (btn == 1) {
		// false : wrong
		question.text = "Wrong: Try again!";
		StartCoroutine(deActivate(2, true));
	}
}

function UranusQ2 (btn:int) :void {
	if (btn == 0) {
		// true : correct
		currentPlanetQuestions = 2;
		dataScript.planetsQuestions[GoToPlanet.currentPlanetNum] = currentPlanetQuestions;
		question.text = "Correct: Good job!";
		removeListeners();
		yesBtn.GetComponent(Button).onClick.AddListener(function() {UranusQ3(0);});
		noBtn.GetComponent(Button).onClick.AddListener(function() {UranusQ3(1);});
		StartCoroutine(deActivate(3, false));
		questionNumTxt = "Question 3 of 3";
		questionTxt = "Uranus was originally thought to be a star.";
	} else if (btn == 1) {
		// false : wrong
		question.text = "Wrong: Try again!";
		StartCoroutine(deActivate(2, true));
	}
}

function UranusQ3 (btn:int) :void {
	if (btn == 0) {
		// true : correct
		currentPlanetQuestions = 3;
		dataScript.planetsQuestions[GoToPlanet.currentPlanetNum] = currentPlanetQuestions;
		question.text = "Correct: Good job!";
		removeListeners();
		yesBtn.GetComponent(Button).onClick.AddListener(function() {NeptuneQ1(0);});
		noBtn.GetComponent(Button).onClick.AddListener(function() {NeptuneQ1(1);});
		StartCoroutine(deActivate(3, false));
		questionNumTxt = "Question 1 of 3";
		questionTxt = "Neptune is known for its light breezes and temperate weather.";
		f1Text = "Neptune takes 165 Earth years to go around the Sun one time!";
	} else if (btn == 1) {
		// false : wrong
		question.text = "Wrong: Try again!";
		StartCoroutine(deActivate(2, true));
	}
}

function UranusBonus (btn:int) :void {
	removeBonusListeners();
	bonusYesBtn.GetComponent(Button).onClick.AddListener(function() {NeptuneBonus(0);});
	bonusNoBtn.GetComponent(Button).onClick.AddListener(function() {NeptuneBonus(1);});
	if (btn == 0) {
		// yes : correct
		dataScript.planetsBonusQuestions[GoToPlanet.currentPlanetNum] = 1;
		bonusQuestion.text = "Correct: Scientists have actually found evidence that there is at least one more planet we havent discovered yet.";
		StartCoroutine(deactivateBonus(3));
	} else if (btn == 1) {
		// no : wrong
		dataScript.planetsBonusQuestions[GoToPlanet.currentPlanetNum] = 0;
		bonusQuestion.text = "Wrong: Nice try!";
		StartCoroutine(deactivateBonus(2));
	}
	bonusQuestionTxt = "Neptunes winds can be faster than the speed of sound! Do you think humans could survive in winds like that?";

}

// End Uranus
// Begin Neptune

function NeptuneQ1 (btn:int) :void {
	if (btn == 0) {
		// true : wrong
		question.text = "Wrong: Try again!";
		StartCoroutine(deActivate(2, true));
	} else if (btn == 1) {
		// false : correct
		currentPlanetQuestions = 1;
		dataScript.planetsQuestions[GoToPlanet.currentPlanetNum] = currentPlanetQuestions;
		question.text = "Correct: Good job!";
		removeListeners();
		yesBtn.GetComponent(Button).onClick.AddListener(function() {NeptuneQ2(0);});
		noBtn.GetComponent(Button).onClick.AddListener(function() {NeptuneQ2(1);});
		StartCoroutine(deActivate(3, false));
		questionNumTxt = "Question 2 of 3";
		questionTxt = "Neptune is named for the Roman god of water.";
	}
}

function NeptuneQ2 (btn:int) :void {
	if (btn == 0) {
		// true : correct
		currentPlanetQuestions = 2;
		dataScript.planetsQuestions[GoToPlanet.currentPlanetNum] = currentPlanetQuestions;
		question.text = "Correct: Good job!";
		removeListeners();
		yesBtn.GetComponent(Button).onClick.AddListener(function() {NeptuneQ3(0);});
		noBtn.GetComponent(Button).onClick.AddListener(function() {NeptuneQ3(1);});
		StartCoroutine(deActivate(3, false));
		questionNumTxt = "Question 3 of 3";
		questionTxt = "Neptune is the furthest planet from the Sun that we know of.";
	} else if (btn == 1) {
		// false : wrong
		question.text = "Wrong: Try again!";
		StartCoroutine(deActivate(2, true));
	}
}

function NeptuneQ3 (btn:int) :void {
	if (btn == 0) {
		// true : correct
		currentPlanetQuestions = 3;
		dataScript.planetsQuestions[GoToPlanet.currentPlanetNum] = currentPlanetQuestions;
		question.text = "Correct: Good job!";
		removeListeners();
		StartCoroutine(deActivate(3, false));
		questionNumTxt = "";
		questionTxt = "";
	} else if (btn == 1) {
		// false : wrong
		question.text = "Wrong: Try again!";
		StartCoroutine(deActivate(2, true));
	}
}

function NeptuneBonus (btn:int) :void {
	removeBonusListeners();
	if (btn == 0) {
		// yes : wrong
		dataScript.planetsBonusQuestions[GoToPlanet.currentPlanetNum] = 0;
		bonusQuestion.text = "Wrong: Nice try!";
		StartCoroutine(deactivateBonus(2));
	} else if (btn == 1) {
		// no : correct
		dataScript.planetsBonusQuestions[GoToPlanet.currentPlanetNum] = 1;
		bonusQuestion.text = "Correct: Not without a space suit. We're unable to inhale and exhale air moving at that speed.";
		StartCoroutine(deactivateBonus(3));
	}
	bonusQuestionTxt = "";
}

// End Neptune

function removeListeners() : void {
	yesBtn.GetComponent(Button).onClick.RemoveAllListeners();
	noBtn.GetComponent(Button).onClick.RemoveAllListeners();
}

function removeBonusListeners() : void {
	bonusYesBtn.GetComponent(Button).onClick.RemoveAllListeners();
	bonusNoBtn.GetComponent(Button).onClick.RemoveAllListeners();
}

public function activateButtons(active:boolean) {
	yesBtn.SetActive(active);
	noBtn.SetActive(active);
}

function deActivate(delay:int, retest:boolean) {
	Fact1Close();
	Fact2Close();
	Fact3Close();
	activateButtons(false);
	yield WaitForSeconds(delay);
	questionNumberTxt.text = questionNumTxt;
	question.text = questionTxt;
	if(retest) {
		GoToPlanet.activatePlanetStats(true);
		GoToPlanet.checkAudio = true;
		gameObject.SetActive(false);
	} else {
		if(currentPlanetQuestions == 3){
			Debug.Log("Questions Array = " + dataScript.planetsQuestions);
			currentPlanetQuestions = 0;
			GoToPlanet.GoToNextPlanet();
			bonusBtn.SetActive(true);
			gameObject.SetActive(false);
		} else {
			activateButtons(true);
		}
	}
}

function deactivateBonus(delay:int) {
	Debug.Log("Bonus Array = " + dataScript.planetsBonusQuestions);
	bonusYesBtn.SetActive(false);
	bonusNoBtn.SetActive(false);
	yield WaitForSeconds(delay);
	bonusQuestion.text = bonusQuestionTxt;
	bonus.SetActive(false);
	activateButtons(true);
}