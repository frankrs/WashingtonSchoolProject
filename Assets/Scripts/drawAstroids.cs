using UnityEngine;
using System.Collections;

public class drawAstroids : MonoBehaviour {
	public GameObject astroid1;
	public GameObject astroid2;
	public GameObject astroid3;

	public float scale = 1f;
	public float radius = 10000f;
	public float amount = 1000f;
	private int Size;
	private float Theta = 0f;
	private GameObject newAstroid;
	void Start ()
	{       
		Theta = 0f;
		for (int i = 0; i < amount; i++) {
			float randMeteor = Random.Range (1, 4);
			Theta += (2.0f * Mathf.PI * 0.01f);
			float x = radius * Mathf.Cos (Theta);
			float z = radius * Mathf.Sin (Theta);    
			if (randMeteor == 1) {
				newAstroid = astroid1;
			} else if (randMeteor == 2) {
				newAstroid = astroid2;
			} else if (randMeteor == 3) {
				newAstroid = astroid3;
			}
			x += Random.Range (0, 1000);
			z += Random.Range (0, 1000);
			float y = Random.Range (-100, 100);
			if (y < 0) {
				if (y > -10) {
					y = -10;
				}
			} else if (y > 0) {
				if (y < 10) {
					y = 10;
				}
			}
			GameObject go = Instantiate (newAstroid, new Vector3 (x, y, z), Quaternion.identity) as GameObject;
			float newScale = Random.Range (1, 5);
			go.transform.localScale += new Vector3 (newScale,newScale,newScale);
		}
	}
}
