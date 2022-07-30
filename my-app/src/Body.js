import React, { useState, useEffect } from "react";
import { database } from "./firebaseConnect";
import { ref, onValue } from "firebase/database";

const Body = () => {
  const [listYoutube, setlistYoutube] = useState();
  useEffect(() => {
    const dataFef = ref(database, "/ListYoutube");
    var arrayData = [];
    onValue(dataFef, (snapshot) => {
      snapshot.forEach((element) => {
        arrayData.push(element.val());
      });
      setlistYoutube(arrayData);
    });
  }, []);
  return (
    <div className="mt-8">
      <div className="row">
        {listYoutube?.map((value, key) => {
          return (
            <div className="col mt-5">
              <iframe
                src={`https://www.youtube.com/embed/${value}`}
                frameborder="0"
                allow="autoplay; encrypted-media"
                allowfullscreen
                title="video"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Body;
