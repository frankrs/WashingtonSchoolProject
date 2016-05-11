using UnityEngine;
using System.Collections;

[System.Serializable]
public class Test {
	public static bool isTest = false;
	public static Test currentProgress;
	public User currentUser;

	public Test () {
		currentUser = new User ();
	}
}
