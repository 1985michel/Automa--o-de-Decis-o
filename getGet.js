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


document.querySelector(".pastBtn").addEventListener("click", capituraTxtArea);

function capituraTxtArea() {
    const texto = document.querySelector("#txtarea").value;
    //console.log(texto);
    //document.querySelector("#txtarea").textContent = nome;

    //getNomeFromTxtArea(texto);
    entrada = texto;
    refatoradoDoWedoff();

    //povoaFormularioEtapa1();
    newPovoaFormularioEtapa1();

}

function getNomeFromTxtArea(entrada) {
    let e2 = entrada.slice();//clona a string

    //console.log(`e2: ${e2}`);

    //isolando os dados do requerente
    let e3 = ((e2.split(`Interessado(s)`)[1]).split(`Ação`)[1]).split(`Procurador(es)`)[0];

    //console.log(`e3: %${e3[0]}%`);

    //let e4 = e3.split(`Procurador(es)`)[0];

    //e2 = e2[0].split(`Procurador(es) / Representante(es) Legal(is)`);

    //console.log(`e4: ${e4}`);

    //document.querySelector("#txtarea").textContent = e3;

}

function refatoradoDoWedoff() {

    getProtocolo();
    //document.querySelector("#protocolo").textContent = protocolo;

    getServico();
    //document.querySelector("#servico").textContent = servico;

    getDer();
    //document.querySelector("#der").textContent = `DER: ${der}`;

    getCpfANDNomeANDDataDeNascimentoANDNomeMae();
    /*  document.querySelector("#cpf").textContent = `DER: ${der}`;
     document.querySelector("#nome").textContent = `Nome: ${nome}`;
     document.querySelector("#data_nascimento").textContent = `Data nascimento: ${dataDeNascimento}`;
     document.querySelector("#nome_mae").textContent = `Mãe: ${nomeMae}`; */

}

function getParteQueInteressa() {

    let e2 = entrada.slice();//clona a string

    return e2.split("Tarefa de ")[1];
}

function getProtocolo() {
    protocolo = getParteQueInteressa().split(" -")[0];
    protocolo = protocolo.split(":")[1];
}

function getServico() {
    servico = (getParteQueInteressa().split("Serviço")[1]).split("Unidade")[0].trim();
}

function getDer() {
    der = ((getParteQueInteressa().split("Data de Criação da Tarefa")[1]).substring(0, 11)).trim();
}

function getCpfANDNomeANDDataDeNascimentoANDNomeMae() {
    cpf = (((getParteQueInteressa().split("Interessado")[1]).split("Procurador")[0]).split("Ação")[1].trim()).substring(0, 14);

    //cpfComPontos = cpf.slice();//clona a string

    nome = ((getParteQueInteressa().split(cpf)[1]).split("/")[0].trim()).split("	")[0].trim();

    dataNascimento = (getParteQueInteressa().split(nome)[1]).trim().split("	")[0];

    nomeMae = getParteQueInteressa().split(dataNascimento)[1].trim().split("	")[0];

    //REMOVER CARACTERES ESPECIAIS DO CPF
    cpf = removePontosVirgulasEhifen(cpf);
}





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

