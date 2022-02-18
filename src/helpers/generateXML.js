export function generateXML(data) {
    console.log(data);
    const xml = `
        <cotacao>
            <resultado>         
            <codigo></codigo>         
            <transportadora>Pagar Online</transportadora>        
            <servico>(Pix ou Paypal)</servico>         
            <transporte>Moto</transporte>         
            <valor>${data}</valor>         
            <peso></peso>         
            <prazo_min>1 Minuto</prazo_min>         
            <prazo_max>2 Horas</prazo_max>         
            </resultado>
        </cotacao>
    `
    return xml;
}