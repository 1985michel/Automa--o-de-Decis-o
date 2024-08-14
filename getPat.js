"use strict";
/* 
let entrada = "";

let protocolo = "";
let servico = "";
let der = "";
let nome = "";
let cpf = "";
let dataNascimento = "";
let nomeMae = ""; */


document.querySelector(".pastBtnPat").addEventListener("click", capituraTxtAreaPat);

function capituraTxtAreaPat() {
    const texto = document.querySelector("#txtareaPat").value;
    //console.log(texto);
    //document.querySelector("#txtarea").textContent = nome;

    //getNomeFromTxtArea(texto);
    entradaPat = texto;
    recebePat();

    //povoaFormularioEtapa1();
    //newPovoaFormularioEtapa1();

}

// function getNomeFromTxtArea(entrada) {
//     let e2 = entrada.slice();//clona a string

//     //console.log(`e2: ${e2}`);

//     //isolando os dados do requerente
//     let e3 = ((e2.split(`Interessado(s)`)[1]).split(`Ação`)[1]).split(`Procurador(es)`)[0];

//     //console.log(`e3: %${e3[0]}%`);

//     //let e4 = e3.split(`Procurador(es)`)[0];

//     //e2 = e2[0].split(`Procurador(es) / Representante(es) Legal(is)`);

//     //console.log(`e4: ${e4}`);

//     //document.querySelector("#txtarea").textContent = e3;

// }

function recebePat() {

    getProtocolo();
    //document.querySelector("#protocolo").textContent = protocolo;

    getServico();
    //document.querySelector("#servico").textContent = servico;

    getNumeroProcessoJudicial();

    try {

        getCPFDoTitular();

        getNomeDoTitular();

        getOrgaoJulgadorPat();

        getNup();
    } catch (error) {

    }

    // getCPFDoTitular();

    // getNomeDoTitular();

    // getOrgaoJulgadorPat();

    mostrarDadosPat();



    //getDer();
    //document.querySelector("#der").textContent = `DER: ${der}`;

    //getCpfANDNomeANDDataDeNascimentoANDNomeMae();
    /*  document.querySelector("#cpf").textContent = `DER: ${der}`;
     document.querySelector("#nome").textContent = `Nome: ${nome}`;
     document.querySelector("#data_nascimento").textContent = `Data nascimento: ${dataDeNascimento}`;
     document.querySelector("#nome_mae").textContent = `Mãe: ${nomeMae}`; */

}

function mostrarDadosPat() {
    document.getElementById(`protocoloPat_span`).innerHTML = protocoloPat;
    document.getElementById(`servicoPat_span`).innerHTML = servicoPat;
    // document.getElementById(`numeroProcessoJudicialPat_span`).innerHTML = numeroProcessoJudicial;
    document.getElementById(`numeroProcessoJudicialPat_span`).value = numeroProcessoJudicial;
    //console.log(">>>>>>> NUP: " + nup);
    document.getElementById(`nup_span`).value = nup;


    if (nomeDoTitular) document.getElementById(`nomePartePJE1_span`).value = nomeDoTitular;
    if (cpfDoTitular) document.getElementById(`cpf`).value = removePontosVirgulasHifenEspacoVazio2(cpfDoTitular);
    if (orgaoJulgadorPat) document.getElementById(`orgaoJugadorPJE1_span`).value = orgaoJulgadorPat;
    if (vara) document.getElementById(`vara_span`).value = vara;
    if (varaCidade) document.getElementById(`varaCidade_span`).value = varaCidade;
    if (varaEstado) document.getElementById(`varaEstado_span`).value = varaEstado;

    limpartxtareaPat();
}

function limpartxtareaPat() {
    if (protocoloPat.length > 3) {
        document.querySelector("#txtareaPat").value = "";
        desabilitarGetPat();

    }
}

function desabilitarGetPat() {

    console.log(`desabilitando getpat`);
    document.querySelector("#txtareaPat").disabled = true;
    document.querySelector(".pastBtnPat").disabled = true;
    //document.getElementById(``).classList.add("hidden");


    // var divElement = document.querySelector("#getpat");
    // divElement.disabled = true;
}

function getParteQueInteressa() {

    //console.log("Chegou em PARTE QUE INTERESSA");
    let e2 = entradaPat.slice();//clona a string
    //
    //return e2.split("Tarefa de ")[1];
    return e2;
}

function getProtocolo() {
    console.log("CHEGOU EM GET PROTOCOLO");
    //protocoloPat = getParteQueInteressa().split("Protocolo: ")[1].split(" ")[0];
    protocoloPat = getParteQueInteressa().split("Protocolo:")[1].split(" ")[0];
    console.log("O protocolo PAT: " + protocoloPat);
    //alert(`Protocolo: ` + protocolo)
}

function getServico() {
    console.log("CHEGOU EM GET SERVIÇO");
    servicoPat = (getParteQueInteressa().split("Detalhar Tarefa")[1]).trim().split("Protocolo")[0].trim();
    //alert(`Serviço: ` + servico)
}

function getNumeroProcessoJudicial() {
    console.log("chegou em get número do processo judicial");
    numeroProcessoJudicial = (getParteQueInteressa().split("Número Processo Judicial")[1].slice(1)).trim().split("Campos Adicionais")[0].trim();
    //alert(`numeroProcessoJudicial: ` + numeroProcessoJudicial)
}

function getNup() {
    console.log("chegou em get nup");
    nup = (getParteQueInteressa().split("NUP Sapiens")[1].slice(1)).trim().split("Chave de Acesso")[0].trim().split("Etiqueta")[0].trim();
    //alert(`numeroProcessoJudicial: ` + numeroProcessoJudicial)
}

function getCPFDoTitular() {
    console.log("chegou em get CPF");
    cpfDoTitular = getParteQueInteressa().split("CPF do Titular")[1].split("Nome do Titular")[0].trim();
    //alert(`Protocolo: ` + protocolo)
}

function getNomeDoTitular() {
    console.log("chegou em get nome");
    // nomeDoTitular = getParteQueInteressa().split("Nome do Titular")[1].split("Endereço Titular")[0].trim();
    nomeDoTitular = getParteQueInteressa().split("Nome do Titular")[1].split("Endereço Titular")[0].split("Data Inicio")[0].trim();
    //alert(`Protocolo: ` + protocolo)
}

// function getNomeDoTitular() {
//     nomeDoTitular = getParteQueInteressa().split("Nome do Titular")[1].split("Endereço Titular")[0].trim();
//     //alert(`Protocolo: ` + protocolo)
// }

function getOrgaoJulgadorPat() {
    console.log("chegou em get orgao julgador");
    //orgaoJulgadorPat = getParteQueInteressa().split("Órgão Julgador")[1].split("CPF do Titular")[0].trim();
    orgaoJulgadorPat = getParteQueInteressa().split("Órgão Julgador")[1].split("CPF do Titular")[0].split("Data Inicio")[0].trim();
    //alert(`Protocolo: ` + protocolo)
    vara = extrairNumero(orgaoJulgadorPat)
    varaCidade = extractCity(orgaoJulgadorPat)
    varaEstado = getCodigoEstadoFromCidade(varaCidade)

}

function getCodigoEstadoFromCidade(cidade) {
    const cidadeClean = limpaString(cidade).toLowerCase();

    if (cidadeClean == 'brasilia') {
        return '23';
    } if (cidadesGoias.includes(cidadeClean)) {
        return '8';
    } else if (cidadesAcre.includes(cidadeClean)) {
        return '24';
    } else if (cidadesAmazonas.includes(cidadeClean)) {
        return '3';
    } else if (cidadesTocantins.includes(cidadeClean)) {
        return '28';
    } else if (cidadesMatoGrosso.includes(cidadeClean)) {
        return '10';
    } else if (cidadesRoraima.includes(cidadeClean)) {
        return '27';
    } else if (cidadesRondonia.includes(cidadeClean)) {
        return '20';
    } else if (cidadesMatoGrossoDoSul.includes(cidadeClean)) {
        return '6';
    } else if (cidadesPara.includes(cidadeClean)) {
        return '12';
    } else if (cidadesAmapa.includes(cidadeClean)) {
        return '25';
    }

    // Retorno padrão se não encontrar a cidade
    return null; // ou outra lógica conforme necessário
}


// Função para remover caracteres especiais
function limpaString(txt) {
    return txt.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // Remove acentos
}

function extractCity(varaDescription) {
    // Define uma lista de capitais conhecidas para casos especiais
    const capitals = {
        'AC': 'Rio Branco',
        'AP': 'Macapá',
        'DF': 'Brasília',
        'GO': 'Goiânia',
        'MT': 'Cuiabá',
        'PA': 'Belém',
        'AM': 'Manaus',
        'RO': 'Porto Velho',
        'RR': 'Boa Vista',
        'MS': 'Campo Grande',
        'PR': 'Curitiba',
        'RS': 'Porto Alegre',
        'TO': 'Palmas',
        'BA': 'Salvador',
        'SP': 'São Paulo',
        'RJ': 'Rio de Janeiro'
    };

    // Verifica casos especiais primeiro
    for (const uf in capitals) {
        if (varaDescription.includes(`SJ${uf}`)) {
            return capitals[uf];
        }
    }

    let cidadesEspeciais = {
        caceres: 'Cáceres',
        buritis: 'Buritis',
        pimentabueno: "PIMENTA BUENO"
    };

    for (let chave in cidadesEspeciais) {
        if (limpaString(varaDescription).toLowerCase().includes(chave)) {
            return cidadesEspeciais[chave];
        }
    }
    /** 
        if (limpaString(varaDescription).toLowerCase().includes("caceres")) {
            return 'Cáceres';
        }
    
        if (limpaString(varaDescription).toLowerCase().includes("buritis")) {
            return 'Buritis';
        }
            */


    // Verifica se há uma cidade mencionada explicitamente na descrição
    const words = varaDescription.split(" ");

    // Procura por "DE" ou "DA" para identificar a cidade
    for (let i = 0; i < words.length; i++) {
        if (words[i] === 'DE' || words[i] === 'DA') {
            if (i + 1 < words.length) {
                // Verifica se a cidade é composta por mais de uma palavra
                const cityName = [];
                for (let j = i + 1; j < words.length; j++) {
                    if (words[j] === 'VARA' || words[j] === 'UNIDADE') {
                        break;
                    }
                    cityName.push(words[j]);
                }
                const extractedCity = cityName.join(" ").trim();
                return checkFinalConditions(extractedCity);
            }
        }
    }

    // Em caso de frases especiais conhecidas
    const specialCases = {
        "MANAUS E IRANDUBA": "Manaus",
        "SÃO MIGUEL DO GUAPORÉ": "São Miguel do Guaporé",
        "Cáceres": "Cáceres",
        "Buritis": "Buritis",
        "Pimenta Bueno": 'Pimenta Bueno'
    };

    for (const caseKey in specialCases) {
        if (varaDescription.toLowerCase().includes(caseKey.toLowerCase())) {
            return specialCases[caseKey];
        }
    }

    // Fallback para descrições que não correspondem às regras
    return 'Desconhecida';
}

function checkFinalConditions(city) {
    // Lista de palavras a serem filtradas
    const filterWords = [
        'vara', 'infância', 'infancia', 'juventude', 'cível', 'civel',
        'pública', 'publica', 'públicas', 'publicas', 'público', 'públicos',
        'ambiental', 'justiça', 'acidente', 'registro', 'registros',
        'ação', 'ações', 'previdenciária', 'previdenciárias', 'genérica', 'fazenda pública', 'fazendas públicas'
    ];

    // Se a cidade contiver 'DF', retorna Brasília
    if (city.includes('DF')) {
        return 'Brasília';
    }

    // Verifica se a cidade contém alguma das palavras filtradas
    for (const word of filterWords) {
        if (city.toLowerCase().includes(word)) {
            // Submete novamente à função de extração
            return extractCity(city);
        }
    }

    // Verifica se contém números ou '.'
    if (/\d/.test(city) || city.includes('.')) {
        return 'Desconhecida';
    }

    // Se o resultado contiver 'Manaus'
    if (city.toLowerCase().includes('manaus')) {
        return 'Manaus';
    }

    return city.trim();
}

function extrairNumero(texto) {
    // Usa uma expressão regular para encontrar o primeiro dígito na string
    const resultado = texto.match(/\d+/);

    // Se encontrou algum número, retorna o primeiro encontrado
    if (resultado) {
        return resultado[0];
    }

    // Se não encontrou nenhum número, retorna '1'
    return '1';
}

// function getDer() {
//     der = ((getParteQueInteressa().split("Data de Criação da Tarefa")[1]).substring(0, 11)).trim();
// }

// function getCpfANDNomeANDDataDeNascimentoANDNomeMae() {
//     cpf = (((getParteQueInteressa().split("Interessado")[1]).split("Procurador")[0]).split("Ação")[1].trim()).substring(0, 14);

//     //cpfComPontos = cpf.slice();//clona a string

//     nome = ((getParteQueInteressa().split(cpf)[1]).split("/")[0].trim()).split("	")[0].trim();

//     dataNascimento = (getParteQueInteressa().split(nome)[1]).trim().split("	")[0];

//     nomeMae = getParteQueInteressa().split(dataNascimento)[1].trim().split("	")[0];

//     //REMOVER CARACTERES ESPECIAIS DO CPF
//     cpf = removePontosVirgulasEhifen(cpf);
// }





function removePontosVirgulasEhifen(texto) {

    let t2 = texto.slice();//clona a string

    t2 = t2.replaceAll(".", "");
    t2 = t2.replace("-", "");
    t2 = t2.replace(",", "");
    return t2;


}

{/* <p id="nome"></p>
<p id="cpf"></p>
<p id="data_nascimento"></p>
<p id="der"></p> */}

