"use strict";

function calcularPeriodoDisponivel(inicio, fim, periodosProibidos) {
    // Converter as datas de início e fim para o objeto Date
    let dataInicio = new Date(inicio.split('/').reverse().join('-'));
    let dataFim = new Date(fim.split('/').reverse().join('-'));

    // Filtrar os períodos proibidos que se sobrepõem com o período declarado
    let periodosSobrepoe = periodosProibidos.filter(function (periodo) {
        let dataProibidaInicio = new Date(periodo.inicio.split('/').reverse().join('-'));
        let dataProibidaFim = new Date(periodo.fim.split('/').reverse().join('-'));
        return (dataProibidaInicio <= dataFim && dataProibidaFim >= dataInicio);
    });

    // Calcular o período disponível a partir do período declarado e dos períodos proibidos
    let periodoDisponivel = [{
        descricao: 'Disponível',
        inicio: inicio,
        fim: fim
    }];

    periodosSobrepoe.forEach(function (periodo) {
        let dataProibidaInicio = new Date(periodo.inicio.split('/').reverse().join('-'));
        let dataProibidaFim = new Date(periodo.fim.split('/').reverse().join('-'));

        let periodoEsquerda = null;
        let periodoDireita = null;

        if (dataProibidaInicio > dataInicio) {
            periodoEsquerda = {
                descricao: 'Disponível',
                inicio: inicio,
                fim: periodo.inicio
            };
        }

        if (dataProibidaFim < dataFim) {
            periodoDireita = {
                descricao: 'Disponível',
                inicio: periodo.fim,
                fim: fim
            };
        }

        if (periodoEsquerda) {
            periodoDisponivel.push(periodoEsquerda);
        }

        if (periodoDireita) {
            periodoDisponivel.push(periodoDireita);
        }
    });

    // Ordenar os períodos disponíveis por ordem crescente de data de início
    periodoDisponivel.sort(function (a, b) {
        let dataA = new Date(a.inicio.split('/').reverse().join('-'));
        let dataB = new Date(b.inicio.split('/').reverse().join('-'));
        return dataA - dataB;
    });

    return periodoDisponivel;
}

// function eliminarPeriodosConcomitantes(periodos) {
//     // Ordenar os períodos por ordem crescente de data de início
//     periodos.sort(function (a, b) {
//         let dataA = new Date(a.inicio.split('/').reverse().join('-'));
//         let dataB = new Date(b.inicio.split('/').reverse().join('-'));
//         return dataA - dataB;
//     });

//     let periodosNaoConcomitantes = [];
//     let periodoAtual = periodos[0];

//     for (let i = 1; i < periodos.length; i++) {
//         let dataAtualInicio = new Date(periodoAtual.inicio.split('/').reverse().join('-'));
//         let dataAtualFim = new Date(periodoAtual.fim.split('/').reverse().join('-'));
//         let dataProximoInicio = new Date(periodos[i].inicio.split('/').reverse().join('-'));
//         let dataProximoFim = new Date(periodos[i].fim.split('/').reverse().join('-'));

//         if (dataAtualFim < dataProximoInicio) {
//             // O período atual e o próximo não são concomitantes
//             periodosNaoConcomitantes.push(periodoAtual);
//             periodoAtual = periodos[i];
//         } else if (dataAtualFim < dataProximoFim) {
//             // O período atual e o próximo são concomitantes, mas o próximo termina depois do atual
//             periodoAtual.fim = periodos[i].fim;
//         }
//     }

//     periodosNaoConcomitantes.push(periodoAtual);

//     return periodosNaoConcomitantes;
// }

function eliminarPeriodosConcomitantes(periodos) {
    const periodosNaoConcomitantes = [periodos[0]]; // Adiciona o primeiro período na lista de não-concomitantes
    let periodoAtual = periodos[0];

    for (let i = 1; i < periodos.length; i++) {
        const periodoSeguinte = periodos[i];

        // Verifica se os períodos se sobrepõem
        if (new Date(periodoAtual.fim) >= new Date(periodoSeguinte.inicio)) {
            // Unimos os dois períodos em um único período
            const periodoUnido = {
                descricao: 'Disponível',
                inicio: periodoAtual.inicio,
                fim: new Date(Math.max(new Date(periodoAtual.fim), new Date(periodoSeguinte.fim))).toLocaleDateString('pt-BR'),
            };
            periodosNaoConcomitantes.pop(); // Remove o último período adicionado na lista
            periodosNaoConcomitantes.push(periodoUnido); // Adiciona o período unido na lista de não-concomitantes
            periodoAtual = periodoUnido; // Define o período atual como sendo o período unido
        } else {
            // Adiciona o período atual na lista de não-concomitantes
            periodosNaoConcomitantes.push(periodoSeguinte);
            periodoAtual = periodoSeguinte;
        }
    }

    return periodosNaoConcomitantes;
}