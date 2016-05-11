using UnityEngine;
using System.Collections;
using System.Collections.Generic;

[System.Serializable]
public class User {

	public string username;
	public int[] scores;

	public User () {
		this.username = "";
		this.scores = new int[8];
		this.scores[0] = 0;
		this.scores[1] = 0;
		this.scores[2] = 0;
		this.scores[3] = 0;
		this.scores[4] = 0;
		this.scores[5] = 0;
		this.scores[6] = 0;
		this.scores[7] = 0;
	}
}
