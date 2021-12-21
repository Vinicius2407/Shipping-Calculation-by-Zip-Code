let falls_street = process.env.AVENIDA;
let center_street = process.env.CENTER_STREET;

export async function exception(destiny_cep){
    if(destiny_cep === center_street) {
        return 5.99;
    } else if (destiny_cep === falls_street) {
        return 10.99;
    } else {
        return 0;
    }
}
