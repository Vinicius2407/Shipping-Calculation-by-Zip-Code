import distance from "google-distance-matrix";

const apiKey = process.env.GOOGLE_API_KEY || "";

distance.key(apiKey);

export async function getDistanceBetween(origins, destinations) {
  const distanceValue = await new Promise((resolve, reject) => {
    distance.matrix(origins, destinations, (error, distances) => {

      if (!error) {
        if (distances.error_message) {
          return reject(distances.error_message);
        }

        for (const row of distances.rows) {
          if (!row) {
            
            return reject("Um ou mais endereços não encontrados");
          }
          for (const element of row.elements) {
            if (element.status === "OK") {
              return resolve(
                {
                  distancia: element.distance.value,
                  tempo: element.duration.value
                });
            } else {
              return reject("Erro interno ao calcular distância");
            }
          }
        }
      } else {
        return reject(error);
      }
    });
  });

  return distanceValue;
}
