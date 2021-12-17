let cep_avenida_das_cataratas = process.env.AVENIDA

export function cepVerification(cep_destino) {
    if (cep_destino === cep_avenida_das_cataratas) {
        console.log("ta aqui")
        return 1
    } else {
        return 0;
    }
}