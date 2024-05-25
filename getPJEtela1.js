"use strict";
/* 
Nessa primeira tela do PJE vamos:
1 - verificar se o núemro do processo é o mesmo do PAT
2 - Recolher os dados do órgão jugador
3 - Recolher o nome da parte

*/


document.querySelector(".pastBtnPJE1").addEventListener("click", capituraTxtAreaPJETela1);

document.querySelector(".cleanCPF").addEventListener("click", cleanCPF);
document.querySelector(".cleanNIT").addEventListener("click", cleanNIT);
document.querySelector(".cleanDIB").addEventListener("click", cleanDIB);
document.querySelector(".cleanDIP").addEventListener("click", cleanDIP);
document.querySelector(".cleanDCB").addEventListener("click", cleanDCB);
document.querySelector(".cleanDUT").addEventListener("click", cleanDUT);
document.querySelector(".cleanRMI").addEventListener("click", cleanRMI);
document.querySelector(".gerarSabi").addEventListener("click", gerarSabi);



function capituraTxtAreaPJETela1() {
    const texto = document.querySelector("#txtareaPJE1").value;

    entradaPJE1 = texto;
    recebePJE1();

}

function cleanCPF() {
    const entradasuja = document.querySelector("#cpf").value;
    console.log(`entrada suja cpf: ${entradasuja}`);
    document.querySelector("#cpf").value = removePontosVirgulasHifenEspacoVazio2(entradasuja);
}
function cleanNIT() {
    const entradasuja = document.querySelector("#nitjud").value;
    document.querySelector("#nitjud").value = removePontosVirgulasHifenEspacoVazio2(entradasuja);
}
function cleanDIB() {
    const entradasuja = document.querySelector("#dib").value;
    document.querySelector("#dib").value = removePontosVirgulasHifenEspacoVazio2(entradasuja);
}
function cleanDIP() {
    const entradasuja = document.querySelector("#dip").value;
    document.querySelector("#dip").value = removePontosVirgulasHifenEspacoVazio2(entradasuja);
}
function cleanDCB() {
    const entradasuja = document.querySelector("#dcb").value;
    document.querySelector("#dcb").value = removePontosVirgulasHifenEspacoVazio2(entradasuja);
}
function cleanRMI() {
    const entradasuja = document.querySelector("#rmi").value;
    document.querySelector("#rmi").value = removePontosVirgulasHifenEspacoVazio2(entradasuja);
}
function cleanDUT() {
    const entradasuja = document.querySelector("#dut").value;
    document.querySelector("#dut").value = removePontosVirgulasHifenEspacoVazio2(entradasuja);
}


function gerarSabi() {


    const dii = removePontosVirgulasHifenEspacoVazio2(document.querySelector("#dii").value);
    const dib = removePontosVirgulasHifenEspacoVazio2(document.querySelector("#dib").value);
    const dip = removePontosVirgulasHifenEspacoVazio2(document.querySelector("#dip").value);
    const dcb = removePontosVirgulasHifenEspacoVazio2(document.querySelector("#dcb").value);
    const rmi = removePontosVirgulasHifenEspacoVazio2(document.querySelector("#rmi").value);

    document.querySelector("#txtareasabi").value = `Proc jud ${numeroProcessoJudicial}  DII ${dii} DIB ${dib} DIP ${dip} DCB ${dcb} RMI ${rmi}`;
}




function recebePJE1() {

    getNumeroProcessoPJE1();
    getOrgaoJulgadorPJE1();
    getNomeDaPartePJE1();

    mostrarDadosPJE1();

}

function getParteQueInteressaPJE1() {

    let e2 = entradaPJE1.slice();//clona a string
    //
    //return e2.split("Tarefa de ")[1];
    //console.log(e2);
    return e2;
}

function getNumeroProcessoPJE1() {
    //alert("parte que interessa: " + getParteQueInteressaPJE1());
    const numero = getParteQueInteressaPJE1().split("resultados encontrados.")[1].trim().split(" ")[0].split("	")[0];
    numeroProcessoPJE1 = removePontosVirgulasHifenEspacoVazio2(numero);
    //alert(`Processo: ` + numeroProcessoPJE1);
}

function getNomeDaPartePJE1() {
    const final = getParteQueInteressaPJE1().split("resultados encontrados.")[1].trim()

    console.log(`Final: '${final}'`);

    nomePartePJE1 = final.split("INSTITUTO NACIONAL DO SEGURO SOCIAL")[0].trim();//.split("resultados encontrados.")[1];
    //nomePartePJE1 = getParteQueInteressaPJE1().split("	INSTITUTO NACIONAL DO SEGURO SOCIAL - INSS")[0].split("resultados encontrados.")[1];

    console.log(`nome da parte 01 : '${nomePartePJE1}'`);
    //alert(`primeira parte do nome: ` + nomePartePJE1);

    const ultimaTabulacaoIndex = nomePartePJE1.lastIndexOf("\t");

    nomePartePJE1 = nomePartePJE1.substring(ultimaTabulacaoIndex + 1).trim();

    nomePartePJE1 = nomePartePJE1.split(" registrado(a)")[0];

    console.log(`nome da parte 02 : '${nomePartePJE1}'`);
    // nomePartePJE1 = removePontosVirgulasHifenEspacoVazio(numero);
    //alert(`nomePartePJE1: ` + nomePartePJE1);
}

function getOrgaoJulgadorPJE1() {
    //orgaoJugadorPJE1 = getParteQueInteressa().split("resultados encontrados.")[1].trim().split(" ")[0].split("	")[1];
    const pedaco = getParteQueInteressaPJE1().split("INSTITUTO NACIONAL DO SEGURO SOCIAL - INSS")[0];

    orgaoJugadorPJE1 = obterTextoAntesDaData(pedaco).split("	")[2];
    //alert(`orgaoJugadorPJE1: ` + orgaoJugadorPJE1);

}

function obterTextoAntesDaData(string) {
    const regex = /(.*?)\s*\d{2}\/\d{2}\/\d{4}/;
    const resultado = regex.exec(string);
    if (resultado && resultado.length >= 2) {
        return resultado[1];
    }
    return "";
}

function mostrarDadosPJE1() {

    if (numeroProcessoJudicial != numeroProcessoPJE1) {
        alert("NÚMERO DO PROCESSO NÃO CONFERE! PAT: " + numeroProcessoJudicial + " PJE: " + numeroProcessoPJE1);
    } else {
        // document.getElementById(`orgaoJugadorPJE1_span`).innerHTML = orgaoJugadorPJE1;
        document.getElementById(`orgaoJugadorPJE1_span`).value = orgaoJugadorPJE1;
        // document.getElementById(`nomePartePJE1_span`).innerHTML = nomePartePJE1;
        document.getElementById(`nomePartePJE1_span`).value = nomePartePJE1;
    }




    limpartxtareaPJE1();
}

function limpartxtareaPJE1() {
    if (nomePartePJE1.length > 3) {
        document.querySelector("#txtareaPJE1").value = "";
        desabilitarGetPJE1();

    }
}

function desabilitarGetPJE1() {

    console.log(`desabilitando get pje1`);
    document.querySelector("#txtareaPJE1").disabled = true;
    document.querySelector(".pastBtnPJE1").disabled = true;
}



function removePontosVirgulasHifenEspacoVazio2(texto) {

    let t2 = texto.slice();//clona a string

    t2 = t2.replaceAll(".", "");
    t2 = t2.replaceAll("/", "");
    t2 = t2.replaceAll("-", "");
    t2 = t2.replaceAll(",", "");
    t2 = t2.replaceAll(" ", "");
    t2 = t2.replaceAll("	", "");
    return t2.trim();


}


