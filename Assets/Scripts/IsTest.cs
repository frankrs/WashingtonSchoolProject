using UnityEngine;
using System.Collections;

public class IsTest : MonoBehaviour {
	private TestMode TestMode;

	void Awake() {
		TestMode = this.GetComponent<TestMode>();
		TestMode.testMode = Test.isTest;
		//TestMode.testMode = true;
	}

	// Use this for initialization
	void Start () {
		
	}
	
	// Update is called once per frame
	void Update () {
		
	}
}
