"use strict";


/* 
class DadosBasicos {

    constructor(der, servico, protocolo, nome, cpf, nit, dataNascimento, idade, sexo, nomeMae, tipo, temAnexos, temAutodeclaracao,
        temVinculosPublicos, vinculoPublicoPendente, teveVinculos, teveBeneficios, teveAtividade, teveBase, teveEmpresa) {
        der = der;
    }

} */

function arrayToString(arr) {

    let stringada = JSON.stringify(arr);
    console.log(stringada);
    return stringada;
}


document.querySelector(".strBtn").addEventListener("click", ativaStringfyInOut);

function ativaStringfyInOut() {

    //se a caixa de texto estiver vazia
    if (document.querySelector("#txtarea2").value == "") {
        if (confirm("Gerar extração?")) {
            getStringfyOut();
        }

    } else {
        if (confirm("Introduzir dados?")) {
            getStringfyIn()
        }
    }

}

function getStringfyIn() {
    //pega os dados de entrada

    processaEntradaDeTodosOsDados(document.querySelector("#txtarea2").value);

    reapresentaTudo();

    //limpa a caixa
    document.getElementById("txtarea2").value = ""

}

function getStringfyOut() {

    //limpa a caixa
    document.getElementById("txtarea2").value = ""

    //gera os dados de saída
    document.getElementById("txtarea2").value = stringfyAll();
}

function getDadosBasicos() {
    let arr = [];

    arr.push(der);
    arr.push(servico);
    arr.push(protocolo);
    arr.push(nome);
    arr.push(cpf);
    arr.push(nit);
    arr.push(dataNascimento);
    arr.push(idade);
    arr.push(sexo);
    arr.push(nomeMae);
    arr.push(tipo);
    arr.push(temAnexos);
    arr.push(temAutodeclaracao);
    arr.push(temVinculosPublicos);
    arr.push(vinculoPublicoPendente);
    arr.push(teveVinculos);
    arr.push(teveBeneficios);
    arr.push(teveAtividade);
    arr.push(teveBase);
    arr.push(teveEmpresa);

    return arr;
    /*  der, servico, protocolo, nome, cpf, nit, dataNascimento, idade, sexo, nomeMae, tipo, temAnexos, temAutodeclaracao,
         temVinculosPublicos, vinculoPublicoPendente, teveVinculos, teveBeneficios, teveAtividade, teveBase, teveEmpresa */
}

function stringfyAll() {

    let txt = '{"impedimentos":' + arrayToString(impedimentosArray);

    // fazer o mesmo para provas
    txt += ', "provas":' + arrayToString(provasArray);

    //dados básicos
    txt += ', "dadosBasicos":' + arrayToString(getDadosBasicos());

    //períodos autodeclarados
    txt += ', "periodosAutodeclarados":' + arrayToString(periodosAutoDeclaradosArray);


    txt += '}';

    console.log(`Saída: ${txt}`);

    return txt;
}

function processaEntradaDeTodosOsDados(entrada) {

    var obj = JSON.parse(entrada);


    toInpedimento(obj.impedimentos);
    toProvas(obj.provas);
    toDadosBasicos(obj.dadosBasicos);
    toPeriodosAutodeclarado(obj.periodosAutodeclarados);


}

function reapresentaTudo() {
    reapresentaExigencias();
    reapresentaDadosDeRetorno();
    reapresentaImpedimentos();
    reapresentaProvas();
}

function toDadosBasicos(el) {

    der = el[0];
    servico = el[1];
    protocolo = el[2];
    nome = el[3];
    cpf = el[4];
    nit = el[5];
    dataNascimento = el[6];
    idade = el[7];
    sexo = el[8];
    nomeMae = el[9];
    tipo = el[10];
    temAnexos = el[11];
    temAutodeclaracao = el[12];
    temVinculosPublicos = el[13];
    vinculoPublicoPendente = el[14];
    teveVinculos = el[15];
    teveBeneficios = el[16];
    teveAtividade = el[17];
    teveBase = el[18];
    teveEmpresa = el[19];
}

function toProvas(provas) {
    provas.forEach(element => {
        //console.log(`element é um objeto que tem os seguintes atributos ${Object.keys(element)}`);
        getObjectProva(element);
    });
}

function toPeriodosAutodeclarado(periodos) {
    periodos.forEach(element => {
        //console.log(`element é um objeto que tem os seguintes atributos ${Object.keys(element)}`);
        getPeriodo(element);
    });

}

function getPeriodo(el) {
    periodosAutoDeclaradosArray.push(new PeriodoAutoDeclarado(el.categoria, el.inicio, el.fim));
}

function toInpedimento(impedimentos) {

    /*  var obj = JSON.parse(txt);
     console.log(`My obj: ${obj}`);
 
     console.log("De que tipo:" + typeof obj);
     console.log(`O obj é um array com ${obj.length} elementos`); */
    impedimentos.forEach(element => {
        //console.log(`element é um objeto que tem os seguintes atributos ${Object.keys(element)}`);
        getObjectImpedimento(element);
    });

}

function getObjectImpedimento(el) {
    if (el.hasOwnProperty("empregador")) {
        impedimentosArray.push(new Vinculo(el.empregador, el.inicio, el.fim, el.nota));
    } else if (el.hasOwnProperty("nb")) {
        impedimentosArray.push(new Beneficio(el.especie, el.nb, el.inicio, el.fim, el.nota));
    } else if (el.hasOwnProperty("atividade")) {
        impedimentosArray.push(new Atividade(el.atividade, el.inicio, el.fim, el.isAtiva));
    } else if (el.hasOwnProperty("cnpjCei")) {
        impedimentosArray.push(new Empresa(el.cnpjCei, el.nome, el.cnae, el.inicio, el.fim, el.isAtiva));
    } else if (el.hasOwnProperty("descricao")) {
        impedimentosArray.push(new Prova(el.descricao, el.dataInicio, el.dataFim));
    } else if (el.hasOwnProperty("seguroDesemprego")) {
        impedimentosArray.push(new SeguroDesemprego(el.inicio, el.fim));
    }
}

function getObjectProva(el) {

    if (el.hasOwnProperty("empregador")) {
        provasArray.push(new Vinculo(el.empregador, el.inicio, el.fim, el.nota));
    } else if (el.hasOwnProperty("nb")) {
        provasArray.push(new Beneficio(el.especie, el.nb, el.inicio, el.fim, el.nota));
    } else if (el.hasOwnProperty("atividade")) {
        provasArray.push(new Atividade(el.atividade, el.inicio, el.fim, el.isAtiva));
    } else if (el.hasOwnProperty("cnpjCei")) {
        provasArray.push(new Empresa(el.cnpjCei, el.nome, el.cnae, el.inicio, el.fim, el.isAtiva));
    } else if (el.hasOwnProperty("dap")) {
        provasArray.push(new DAP(el.numero, el.categoria, el.inicio, el.fim));
    } else if (el.hasOwnProperty("nomeAssentamento")) {
        provasArray.push(new RegistroSala(el.nomeAssentamento, el.inicio, el.fim));
    } else if (el.hasOwnProperty("defeso")) {
        provasArray.push(new Defeso(el.inicio, el.fim));
    } else if (el.hasOwnProperty("rgp")) {
        provasArray.push(new RGP(el.numero, el.inicio, el.fim, el.isAtivo));
    } else if (el.hasOwnProperty("dataInicio")) {
        provasArray.push(new Prova(el.descricao, el.dataInicio, el.dataFim));
    } else if (el.hasOwnProperty("dataArray")) {
        console.log("prova unica");
        let provaUnica = new ProvaUnica(el.descricao, el.dataArray[0]);
        if (el.dataArray.length > 1) {
            for (let i = 1; i < el.dataArray.length; i++) {
                const dt = el.dataArray[i];
                provaUnica.dataArray.push(dt);
            }
        }
        provasArray.push(provaUnica);
    }
}