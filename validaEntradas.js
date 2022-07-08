"use strict";

function isEntradaTextoValida(entrada, tamanho) {
    if (entrada.length < tamanho) {
        return false;
    } else {
        return true;
    }
}

function isDataVinculoValida(data) {

    //data válida é entre 01/01/1950 e hoje
    const ano = data.slice().split("-")[0];

    if (ano.length != 4) {
        return false
    }

    if (deDataParaMomentjs(data).isBetween("1950-01-01", new Date(), 'days', true)) {
        return true;
    } else {
        return false;
    }
}

function isDataVinculoValidaAceitaFuturo(data) {

    //data válida é entre 01/01/1950 e hoje
    const ano = data.slice().split("-")[0];

    if (ano.length != 4) {
        return false
    }

    if (deDataParaMomentjs(data).isBetween("1950-01-01", "2030-01-01", 'days', true)) {
        return true;
    } else {
        return false;
    }
}


function dataInicioEFimCoerentes(dataInicio, dataFim) {

    //data inicio deve ser anterior ou igual a data fim
    const ano = dataInicio.slice().split("-")[0];

    if (ano.length != 4) {
        return false
    }

    const anoFim = dataFim.slice().split("-")[0];

    if (anoFim.length != 4) {
        return false
    }

    if (deDataParaMomentjs(dataInicio).isBefore(deDataParaMomentjs(dataFim)) || dataInicio == dataFim) {
        return true;
    } else {
        return false;
    }
}


function isDerValida(der) {

    //data válida é entre 01/01/2019 e hoje

    const ano = der.slice().split("-")[0];

    if (ano.length > 4) {
        return false
    }

    if (der === "") {
        return false;
    }

    if (deDataParaMomentjs(der).isBetween("2019-01-01", new Date(), 'days', true)) {
        return true;
    } else {
        return false;
    }


}

function isDataNascimentoValida(data) {

    //data válida é entre 01/01/1930 e hoje

    const ano = data.slice().split("-")[0];

    if (ano.length > 4) {
        return false
    }

    if (deDataParaMomentjs(data).isBetween("1930-01-01", new Date(), 'days', true)) {
        return true;
    } else {
        return false;
    }


}