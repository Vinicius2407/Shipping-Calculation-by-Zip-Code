import { getDistanceBetween } from "../helpers/getDistanceBetween.js";
import { calculateShippingCost } from "../helpers/calculateShippingCost.js";
import { axios } from "../helpers/axios.js";

class ShippingController {
  async generateXML(request, response) {
    const { token, cep, cep_destino } = request.query;
    if (!cep || !cep_destino) {
      return response.status(400).json({ message: "CEP de origem e CEP de destino são obrigatórios" });
    }

    const origins = [cep.replace(/\D/g, "")];
    const destinations = [cep_destino.replace(/\D/g, "")];
  

    try {
      let distance = 0;
      try{
        console.log("Chegou aqui");
        distance = await getDistanceBetween(origins, destinations);
      } catch {
        const result = await axios.get(`https://api.pagar.me/1/zipcodes/${destinations}`);
        const newDestinations = `${result.data.street}, ${result.data.city}, ${result.data.zipcode}, ${result.data.state}`;
        distance = await getDistanceBetween(origins, [newDestinations]);
      }

      const shippingCost = calculateShippingCost(distance);

      if (shippingCost !== 0) {
        if (token == 10517031){
          const xml = `
            <cotacao>
              <resultado>         
              <codigo></codigo>         
              <transportadora>Pagar Online</transportadora>        
              <servico>(Cartão de Crédito ou PIX)</servico>         
              <transporte>Moto</transporte>         
              <valor>${shippingCost}</valor>         
              <peso></peso>         
              <prazo_min>1 Minuto</prazo_min>         
              <prazo_max>2 Horas</prazo_max>         
              </resultado>
            </cotacao>
          `;

          return response.status(200).send(xml);
        } else {
          const xml = `
            <cotacao>
              <resultado>         
              <codigo></codigo>         
              <transportadora>Pagar na Entrega</transportadora>        
              <servico>(Dinheiro ou Cartão)</servico>         
              <transporte>Moto</transporte>         
              <valor>${shippingCost}</valor>         
              <peso></peso>         
              <prazo_min>1 Minuto</prazo_min>         
              <prazo_max>2 Horas</prazo_max>         
              </resultado>
            </cotacao>
          `;

          return response.status(200).send(xml);
        }
      }

      return response.status(400).json({ message: "Distância excedeu o limite do delivery" });
    } catch (error) {
      // TODO: save error to file
      console.error("Error", error);
      return response.status(500).json({ message: "Erro interno no servidor, tente novamente" });
    }
  }
}

export default new ShippingController();
