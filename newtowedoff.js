
"use strict";


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
    document.getElementById("txtarea2").value = "";

}

function getStringfyOut() {

    //limpa a caixa
    document.getElementById("txtarea2").value = "";

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
    arr.push(categoriasTrabalhador);
    arr.push(temAnexos);
    arr.push(temAutodeclaracao);
    //arr.push(temVinculosPublicos);
    //arr.push(vinculoPublicoPendente);
    //arr.push(teveVinculos);
    //arr.push(teveBeneficios);
    //arr.push(teveAtividade);
    //arr.push(teveBase);
    //arr.push(teveEmpresa);

    return arr;
    /*  der, servico, protocolo, nome, cpf, nit, dataNascimento, idade, sexo, nomeMae, tipo, temAnexos, temAutodeclaracao,
         temVinculosPublicos, vinculoPublicoPendente, teveVinculos, teveBeneficios, teveAtividade, teveBase, teveEmpresa */
}


function stringfyAll() {

    let txt = '{"impedimentos":' + arrayToString(impedimentosGerais);

    // fazer o mesmo para provas
    txt += ', "provas":' + arrayToString(provasGerais);

    //dados básicos
    txt += ', "dadosBasicos":' + arrayToString(getDadosBasicos());

    //períodos autodeclarados
    txt += ', "periodosAutodeclarados":' + arrayToString(periodosAutoDeclarados);

    //períodos rurais previamente confirmados
    txt += ', "periodosRuraisPreviamenteConfirmados":' + arrayToString(periodosRuraisPreviamenteConfirmados);

    //variaveis globais 
    /* txt += ', "categoriasTrabalhador":' + arrayToString(categoriasTrabalhador); */

    //talvez colocar exigências aqui depois
    txt += ', "exigenciasGerais":' + arrayToString(exigenciasGerais);

    txt += '}';

    console.log(`Saída: ${txt}`);

    return txt;
}

function processaEntradaDeTodosOsDados(entrada) {

    var obj = JSON.parse(entrada);


    toDadosBasicos(obj.dadosBasicos);
    toProvas(obj.provas);
    toInpedimento(obj.impedimentos);
    toPeriodosAutodeclarado(obj.periodosAutodeclarados);
    toPeriodosRuraisPreviamenteConfirmados(obj.periodosRuraisPreviamenteConfirmados);
    /* toCategoriasTrabalhador(obj.categoriasTrabalhador); */
    toExigencias(obj.exigenciasGerais);


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
    getCategoriasDoTrabalhador(el[10]);
    temAnexos = el[11];
    temAutodeclaracao = el[12];
    /* temVinculosPublicos = el[13];
    vinculoPublicoPendente = el[14];
    teveVinculos = el[15];
    teveBeneficios = el[16];
    teveAtividade = el[17];
    teveBase = el[18];
    teveEmpresa = el[19]; */
}

function getCategoriasDoTrabalhador(categorias) {
    for (const cat of categorias) {
        categoriasTrabalhador.push(cat);
    }
}

function toProvas(provas) {
    provas.forEach(element => {
        //console.log(`element é um objeto que tem os seguintes atributos ${Object.keys(element)}`);
        getObjectProva(element);
    });
}

function toExigencias(exigencias) {
    exigencias.forEach(element => {
        exigenciasGerais.push(element);
    });
}

function getObjectProva(el) {

    if (el.hasOwnProperty("tipo")) {

        if (el.tipo === "prova-doc") {

            let prova = new Indicio(el.descricao, el.dataArray[0], el.fim, el.tipo);


            if (el.dataArray.length > 1) {
                for (let i = 1; i < el.dataArray.length; i++) {
                    const dt = el.dataArray[i];
                    prova.dataArray.push(dt);
                }
            }
            provasGerais.push(prova);

        } else {
            provasGerais.push(new Indicio(el.descricao, el.inicio, el.fim, el.tipo));
        }

    } else {
        provasGerais.push(new NewPeriodo(el.descricao, el.inicio, el.fim));
    }
}

function toInpedimento(impedimentos) {

    impedimentos.forEach(element => {
        //console.log(`element é um objeto que tem os seguintes atributos ${Object.keys(element)}`);
        getObjectImpedimento(element);
    });

}

function getObjectImpedimento(el) {
    impedimentosGerais.push(new Indicio(el.descricao, el.inicio, el.fim, el.tipo));
}

function toPeriodosAutodeclarado(periodos) {
    periodos.forEach(element => {
        //console.log(`element é um objeto que tem os seguintes atributos ${Object.keys(element)}`);
        getPeriodoAutodeclarado(element);
        categoriasTrabalhador.push()

        temAutodeclaracao = true;
    });

    if (periodos.length == 0) {
        temAutodeclaracao = false;
    }

}

function getPeriodoAutodeclarado(el) {
    periodosAutoDeclarados.push(new NewPeriodo(el.descricao, el.inicio, el.fim));
}


function toPeriodosRuraisPreviamenteConfirmados(periodos) {
    periodos.forEach(element => {
        //console.log(`element é um objeto que tem os seguintes atributos ${Object.keys(element)}`);
        getPeriodoPreviamenteConfirmado(element);
    });

}

function getPeriodoPreviamenteConfirmado(el) {
    periodosRuraisPreviamenteConfirmados.push(new NewPeriodo(el.descricao, el.inicio, el.fim));
}

