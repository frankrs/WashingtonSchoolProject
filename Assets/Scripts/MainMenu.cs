using UnityEngine;
using UnityEngine.UI;
using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine.SceneManagement;

public class MainMenu : MonoBehaviour {
	public GameObject mainMenu;
	public GameObject loginMenu;
	public GameObject objectiveScreen;
	public GameObject progressMenu;
	public GameObject loadingScreen;
	public GameObject keyboard;
	public GameObject data;
	public Text loadingText;
	public Text progressUserTxt;
	public GameObject easterTxt;

	private AsyncOperation operation;
	private AudioSource objectiveAudio;
	private bool checkAudio = false;

	// Use this for initialization
	void Start () {
		Screen.sleepTimeout = SleepTimeout.NeverSleep;
		int dateCompared = System.DateTime.Now.Date.CompareTo (new DateTime(2016,5,25));
		if (dateCompared >= 0) {
			Application.Quit();
		}
		objectiveAudio = objectiveScreen.GetComponent<AudioSource> ();
		if (GameObject.Find ("Data(Clone)")) {
			Debug.Log ("found it");
		} else {
			Debug.Log ("didnt find it");
			Instantiate (data);
		}
	}

	void Update () {
		// VR Back/Return button press
		if(Input.GetKeyDown(KeyCode.Escape)) {
			ExitButton();
		}
		if(checkAudio == true) {
			StartCoroutine (CheckAudio ());
		}
	}

	IEnumerator CheckAudio() {
		if(!objectiveAudio.isPlaying) {
			Debug.Log("objective audio done");
			checkAudio = false;
			yield return new WaitForSeconds (2);
			ActivateObjective (false);
			LoadScene (1);
		}
	}

	/*public void LoadSceneAdditive(int level) {
		// disable main menu
		ActivateMainMenu(false);
		// Load scene additive
		SceneManager.LoadScene(level,LoadSceneMode.Additive);
	}*/

	public void Objective() {
		ActivateMainMenu (false);
		ActivateObjective (true);
	}

	public void ActivateObjective(bool active) {
		checkAudio = active;
		objectiveScreen.SetActive (active);
	}

	public void IsTest(bool test) {
		Debug.Log("Test active " + test);
		Test.isTest = test;
	}

	public void LoadScene(int level) {
		// Load scene
		//SceneManager.LoadScene(level);
		StartCoroutine(LoadAsync(level));
		Loading ();
	}

	IEnumerator LoadAsync(int level) {
		Debug.Log("loading scene");
		operation = SceneManager.LoadSceneAsync (level);
		operation.allowSceneActivation = false;

		while (!operation.isDone) {
			loadingText.text = "LOADING " + Mathf.Round(operation.progress * 100) + "%";
			yield return new WaitForEndOfFrame ();
			Debug.Log ("Loaded");
			operation.allowSceneActivation = true;
		}
	}

	private void Loading() {
		ActivateProgress (false);
		ActivateMainMenu (false);
		ActivateLoading (true);
	}

	private void ActivateLoading(bool active) {
		if (Test.isTest) {
			easterTxt.SetActive (true);
		}
		loadingScreen.SetActive (active);
	}

	public void Login() {
		ActivateMainMenu (false);
		ActivateLogin (true);
	}

	public void LoginSubmit(Text userName) {
		if (userName.text != "") {
			print ("user= " + userName.text);
			if (SaveLoad.Load (userName.text.ToLower ())) {
				print ("found user " + userName.text);
				/* continue */
				foreach (Test g in SaveLoad.savedProgress) {
					Test.currentProgress = g;
					//Move on to game...
					//Application.LoadLevel(1);
					print ("Username= " + g.currentUser.username + " Scores= " + g.currentUser.scores.Length);
				}
				progressUserTxt.text = "Welcome back " + userName.text;
			} else {
				print ("created user " + userName.text);
				/* if username progress not found new progress */
				Test.currentProgress = new Test ();
				Test.currentProgress.currentUser.username = userName.text;

				/* Save the current progress as a new saved progress */
				SaveLoad.Save (userName.text.ToLower ());
				progressUserTxt.text = "Welcome " + userName.text;
			}

			Progress ();
		}
	}

	public void Progress() {
		ActivateLogin (false);
		ActivateProgress (true);
	}

	public void ActivateMainMenu(bool active) {
		mainMenu.SetActive (active);
	}

	public void ActivateLogin(bool active) {
		loginMenu.SetActive (active);
		if (keyboard.activeInHierarchy) {
			keyboard.SetActive (false);
		}
	}

	public void ActivateProgress(bool active) {
		progressMenu.SetActive (active);
	}

	public void BackToMainMenu() {
		ActivateLogin(false);
		ActivateMainMenu (true);
	}

	public void BackToLogin() {
		ActivateProgress (false);
		ActivateLogin(true);
	}

	public void ExitButton() {
		// Exit application
		Application.Quit();
	}
}
