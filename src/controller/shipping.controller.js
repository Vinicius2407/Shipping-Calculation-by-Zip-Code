import { getDistanceBetween } from "../helpers/getDistanceBetween.js";
import { calculateShippingCost } from "../helpers/calculateShippingCost.js";

import axios from "axios";

class ShippingController {
  async generateJSON(request, response) {
    const { token, cep, cep_destino } = request.query;
    if (!cep || !cep_destino) {
      return response.status(400).json({ message: "CEP de origem e CEP de destino são obrigatórios" });
    }

    const origins = [cep.replace(/\D/g, "")];
    const destinations = [cep_destino.replace(/\D/g, "")]; 
    
    try {
      let distance = 0;
      try {
        distance = await getDistanceBetween(origins, destinations);
      } catch {
        const result = await axios.get(`https://api.pagar.me/1/zipcodes/${cep_destino}`);
        const newDestinations = `${result.data.street}, ${result.data.city}, ${result.data.zipcode}, ${result.data.state}`;
        distance = await getDistanceBetween(origins, [newDestinations]);
      }
      const shippingCost = calculateShippingCost(distance);

      if (shippingCost !== 0) {
        const json = {
          "valorDoFrete": shippingCost,
          "tempoParaEntrega": distance.tempo / 60
        }

        return response.status(200).send(json);
      }

      return response.status(400).json({ message: "Distância excedeu o limite do delivery" });
    } catch (error) {
      // TODO: save error to file
      console.log(error);
      return response.status(500).json({ message: "Erro interno no servidor, tente novamente" });
    }
  }
}

export default new ShippingController();
