﻿using UnityEngine;
using System.Collections;

public class sSinRotate : MonoBehaviour
{

    public GameObject Ship;

    public Vector3 Axis = Vector3.up;
    public float RangeMultiplier = 2f;
    public float SpeedMultiplier = 0.5f;

    public bool FixedTime = false;

    private float _elapsedTime = 0f;

    public void Update()
    {
        if (Ship.gameObject != gameObject)
            transform.rotation = Quaternion.LookRotation(Ship.transform.position - transform.position);
        transform.RotateAround(Ship.transform.position, Axis, Mathf.Sin(FixedTime ? Time.deltaTime : _elapsedTime) * RangeMultiplier);

        _elapsedTime += Time.deltaTime * SpeedMultiplier;
    }


}
