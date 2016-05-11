using UnityEngine;
using System.Collections;

public class shipAI : MonoBehaviour {

	// Fix a range how early u want your enemy detect the obstacle.
	private int range;
	private float speed ;
	private bool isThereAnyThing = false;
	// Specify the target for the shit.
	public GameObject target;
	private float rotationSpeed ;
	private RaycastHit hit;
	private float hitBounds;
	// Use this for initialization
	void Start ()
	{
		range = 500;
		speed = 200f;
		rotationSpeed = 20f;
	}
	// Update is called once per frame
	void Update ()
	{
		//Look At Somthly Towards the Target if there is nothing in front.
		if (!isThereAnyThing) {
			Vector3 relativePos = target.transform.position - transform.position;
			Quaternion rotation = Quaternion.LookRotation (relativePos);
			transform.rotation = Quaternion.Slerp (transform.rotation, rotation, Time.deltaTime);
		}
		// Ship translate in forward direction.
		transform.Translate (Vector3.forward * Time.deltaTime * speed);
		//Checking for any Obstacle in front.
		// Two rays left and right to the object to detect the obstacle.
		Transform leftRay = transform;
		Transform rightRay = transform;
		//Use Phyics.RayCast to detect the obstacle
		if (Physics.Raycast (leftRay.position + (transform.right * 20) , transform.forward,out hit, range) || Physics.Raycast(rightRay.position - (transform.right * 20), transform.forward,out hit ,range)) {
			if (hit.collider.gameObject.CompareTag("Planet") && hit.collider.gameObject != target){
				isThereAnyThing = true;
				transform.Rotate(Vector3.up * Time.deltaTime * rotationSpeed);

				Debug.Log ("Hit planet " + hit.collider.name);
				//GameObject hitObj = GameObject.Find (hit.collider.name);
				Debug.Log (hit.collider.bounds.extents.x);
				hitBounds = hit.collider.bounds.extents.x;
			}
		}
		// Now Two More RayCast At The End of Object to detect that object has already pass the obsatacle.
		// Just making this boolean variable false it means there is nothing in front of object.
		if (Physics.Raycast(transform.position - (transform.forward * (hitBounds/2)), transform.right, out hit, 40) ||
			Physics.Raycast(transform.position - (transform.forward * (hitBounds/2)), -transform.right, out hit, 40))
		{
			if (hit.collider.gameObject.CompareTag("Planet") && hit.collider.gameObject != target)
			{
				isThereAnyThing = false;
				Debug.Log ("Passed planet " + hit.collider.name);
			}
		}
		// Use to debug the Physics.RayCast.
		Debug.DrawRay (transform.position + (transform.right * 20), transform.forward * range, Color.red);
		Debug.DrawRay (transform.position - (transform.right * 20), transform.forward * range, Color.red);
		Debug.DrawRay (transform.position - (transform.forward * (hitBounds/2)), - transform.right * 40, Color.yellow);
		Debug.DrawRay (transform.position - (transform.forward * (hitBounds/2)), transform.right * 40, Color.yellow);
	}
}
