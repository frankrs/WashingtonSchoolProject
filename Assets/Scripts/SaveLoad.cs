using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using System.Runtime.Serialization.Formatters.Binary;
using System.IO;

public static class SaveLoad {

	public static List<Test> savedProgress = new List<Test> ();

	public static void Save(string user) {
		SaveLoad.savedProgress.Add(Test.currentProgress);
		BinaryFormatter bf = new BinaryFormatter();
		FileStream file = File.Create(Application.persistentDataPath + "/savedProgress." + user);
		bf.Serialize(file, SaveLoad.savedProgress);
		file.Close();
	}

	public static bool Load(string user) {
		if (File.Exists (Application.persistentDataPath + "/savedProgress." + user)) {
			BinaryFormatter bf = new BinaryFormatter ();
			FileStream file = File.Open (Application.persistentDataPath + "/savedProgress." + user, FileMode.Open);
			SaveLoad.savedProgress = (List<Test>)bf.Deserialize (file);
			file.Close ();
			return true;
		} else {
			Debug.Log ("user not found");
			return false;
		}
	}
}
