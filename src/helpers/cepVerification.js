const cep_avenida_das_cataratas = process.env.AVENIDA

export async function cepVerification(cep_destino) {
    if (cep_destino === cep_avenida_das_cataratas) {
        return 1;
    } else {
        return 0;
    }
}