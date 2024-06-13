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

