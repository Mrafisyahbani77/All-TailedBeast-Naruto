import axios from "axios";
import { useEffect, useState } from "react";

export default function TailedBeast() {
  const [biju, setBiju] = useState(null);

  useEffect(() => {
    axios
      .get("https://narutodb.xyz/api/tailed-beast")
      .then(function (response) {
        setBiju(response.data.tailedBeasts);
        console.log(response.data);
      })
      .catch(function (error) {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="p-4">
      {biju ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {biju.map((beast) => (
            <div key={beast.id} className="bg-slate-400 rounded-lg shadow-md p-4">
              <h2 className="text-xl font-bold mb-2">{beast.name}</h2>
              {beast.images && beast.images.length > 0 ? (
                <img
                  src={beast.images[0]}
                  alt={beast.name}
                  className="mb-2 w-full h-48 object-cover rounded"
                />
              ) : (
                <div className="mb-2 w-full h-48 flex items-center justify-center bg-gray-200 rounded">
                  <p>No Image Available</p>
                </div>
              )}
              <div>
                <h3 className="text-lg font-semibold">Debut</h3>
                <p>Manga: {beast.debut.manga}</p>
                <p>Anime: {beast.debut.anime}</p>
                <p>Novel: {beast.debut.novel}</p>
                <p>Movie: {beast.debut.movie}</p>
                <p>Game: {beast.debut.game}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Family</h3>
                {beast.family && Object.entries(beast.family).map(([key, value]) => (
                  <p key={key}>{key}: {value}</p>
                ))}
              </div>
              <div>
                <h3 className="text-lg font-semibold">Jutsu</h3>
                {beast.jutsu && (
                  <ul>
                    {beast.jutsu.map((jutsu, index) => (
                      <li key={index}>{jutsu}</li>
                    ))}
                  </ul>
                )}
              </div>
              <div>
                <h3 className="text-lg font-semibold">Unique Traits</h3>
                {beast.uniqueTraits && (
                  <ul>
                    {beast.uniqueTraits.map((trait, index) => (
                      <li key={index}>{trait}</li>
                    ))}
                  </ul>
                )}
              </div>
              <div>
                <h3 className="text-lg font-semibold">Nature Type</h3>
                {beast.natureType && (
                  <ul>
                    {beast.natureType.map((type, index) => (
                      <li key={index}>{type}</li>
                    ))}
                  </ul>
                )}
              </div>
              <div>
                <h3 className="text-lg font-semibold">Voice Actors</h3>
                {beast.voiceActors && Object.entries(beast.voiceActors).map(([lang, actor]) => (
                  <p key={lang}>{lang}: {actor}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
