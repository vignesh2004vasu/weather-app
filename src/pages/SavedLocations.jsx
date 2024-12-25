import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { db } from "../firebase/config";

const SavedLocations = () => {
  const [locations, setLocations] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      const unsubscribe = db
        .collection("savedLocations")
        .where("userId", "==", user.uid)
        .onSnapshot((snapshot) => {
          const locationData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setLocations(locationData);
        });

      return () => unsubscribe();
    }
  }, [user]);

  const deleteLocation = async (id) => {
    try {
      await db.collection("savedLocations").doc(id).delete();
    } catch (err) {
      console.error("Error deleting location:", err);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Saved Locations</h1>
      {locations.length === 0 ? (
        <p>No saved locations yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {locations.map((location) => (
            <div key={location.id} className="bg-white rounded-lg shadow p-4">
              <h2 className="text-xl font-bold">{location.name}</h2>
              <button
                onClick={() => deleteLocation(location.id)}
                className="mt-2 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedLocations;
