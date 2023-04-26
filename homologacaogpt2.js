"use strict";

// function calcularPeriodoConfirmado(periodoDeclarado, periodosProibidos, provas) {
//     // converte as datas do período declarado para objetos Date
//     const dataInicio = toDate(periodoDeclarado.periodo.inicio);
//     const dataFim = toDate(periodoDeclarado.periodo.fim);

//     // filtra os períodos proibidos que se sobrepõem com o período declarado
//     const periodosSobrepoe = periodosProibidos.filter(p =>
//         toDate(p.inicio) < dataFim && toDate(p.fim) > dataInicio
//     );

//     // ordena as provas por data
//     const provasOrdenadas = provas.sort((p1, p2) => toDate(p1.inicio) - toDate(p2.inicio));

//     // busca a primeira prova posterior ao período proibido (se houver)
//     let primeiraProvaPosProibido = null;
//     for (let i = 0; i < provasOrdenadas.length; i++) {
//         const prova = provasOrdenadas[i];
//         if (periodosSobrepoe.every(p => toDate(p.fim) < toDate(prova.inicio))) {
//             primeiraProvaPosProibido = prova;
//             break;
//         }
//     }

//     // calcula o período confirmado
//     let dataInicioConfirmado = dataInicio;
//     if (primeiraProvaPosProibido) {
//         dataInicioConfirmado = toDate(primeiraProvaPosProibido.inicio);
//     }

//     let dataFimConfirmado = dataFim;
//     for (const periodo of periodosSobrepoe) {
//         const dataFimProibido = toDate(periodo.fim);
//         if (dataFimProibido <= dataInicioConfirmado) {
//             // o período proibido já acabou antes do período confirmado começar
//             continue;
//         }

//         if (dataFimProibido < dataFimConfirmado) {
//             // o período proibido termina antes do fim do período confirmado
//             dataFimConfirmado = dataFimProibido;
//         }
//     }

//     // converte as datas de volta para o formato "dd/mm/aaaa"
//     const dataInicioConfirmadoStr = toStr(dataInicioConfirmado);
//     const dataFimConfirmadoStr = toStr(dataFimConfirmado);

//     return {
//         dataInicio: dataInicioConfirmadoStr,
//         dataFim: dataFimConfirmadoStr
//     };
// }

// function calcularPeriodoConfirmado(periodoDeclarado, periodosProibidos, provas) {
//     // converte as datas do período declarado para objetos Date
//     const dataInicio = toDate(periodoDeclarado.periodo.inicio);
//     const dataFim = toDate(periodoDeclarado.periodo.fim);

//     // filtra os períodos proibidos que se sobrepõem com o período declarado
//     const periodosSobrepoe = periodosProibidos.filter(p =>
//         toDate(p.inicio) < dataFim && toDate(p.fim) > dataInicio
//     );

//     // ordena as provas por data
//     const provasOrdenadas = provas.sort((p1, p2) => toDate(p1.inicio) - toDate(p2.inicio));

//     // declara um array para armazenar as provas utilizadas na confirmação do período
//     let provasUtilizadas = [];

//     // busca a primeira prova posterior ao período proibido (se houver)
//     let primeiraProvaPosProibido = null;
//     for (let i = 0; i < provasOrdenadas.length; i++) {
//         const prova = provasOrdenadas[i];
//         if (periodosSobrepoe.every(p => toDate(p.fim) < toDate(prova.inicio))) {
//             primeiraProvaPosProibido = prova;
//             // adiciona a prova à lista de provas utilizadas
//             provasUtilizadas.push(prova);
//             break;
//         } else {
//             // adiciona a prova à lista de provas utilizadas
//             provasUtilizadas.push(prova);
//         }
//     }

//     // calcula o período confirmado
//     let dataInicioConfirmado = dataInicio;
//     if (primeiraProvaPosProibido) {
//         dataInicioConfirmado = toDate(primeiraProvaPosProibido.inicio);
//     }

//     let dataFimConfirmado = dataFim;
//     for (const periodo of periodosSobrepoe) {
//         const dataFimProibido = toDate(periodo.fim);
//         if (dataFimProibido <= dataInicioConfirmado) {
//             // o período proibido já acabou antes do período confirmado começar
//             continue;
//         }

//         if (dataFimProibido < dataFimConfirmado) {
//             // o período proibido termina antes do fim do período confirmado
//             dataFimConfirmado = dataFimProibido;
//         }
//     }

//     // converte as datas de volta para o formato "dd/mm/aaaa"
//     const dataInicioConfirmadoStr = toStr(dataInicioConfirmado);
//     const dataFimConfirmadoStr = toStr(dataFimConfirmado);

//     return {
//         dataInicio: dataInicioConfirmadoStr,
//         dataFim: dataFimConfirmadoStr,
//         provasUtilizadas: provasUtilizadas
//     };
// }

function calcularPeriodoConfirmado(periodoDeclarado, periodosProibidos, provas) {
    // converte as datas do período declarado para objetos Date
    const dataInicio = toDate(periodoDeclarado.periodo.inicio);
    const dataFim = toDate(periodoDeclarado.periodo.fim);

    // filtra os períodos proibidos que se sobrepõem com o período declarado
    const periodosSobrepoe = periodosProibidos.filter(p =>
        toDate(p.inicio) < dataFim && toDate(p.fim) > dataInicio
    );

    // ordena as provas por data
    const provasOrdenadas = provas.sort((p1, p2) => toDate(p1.inicio) - toDate(p2.inicio));

    // declara um array para armazenar as provas utilizadas na confirmação do período
    let provasUtilizadas = [];

    // busca a primeira prova posterior ao período proibido (se houver)
    let primeiraProvaPosProibido = null;
    for (let i = 0; i < provasOrdenadas.length; i++) {
        const prova = provasOrdenadas[i];
        if (periodosSobrepoe.every(p => toDate(p.fim) < toDate(prova.inicio))) {
            primeiraProvaPosProibido = prova;
            // adiciona a prova à lista de provas utilizadas
            provasUtilizadas.push(prova);
            break;
        } else {
            // adiciona a prova à lista de provas utilizadas
            provasUtilizadas.push(prova);
        }
    }

    // calcula o período confirmado
    let dataInicioConfirmado = dataInicio;
    if (primeiraProvaPosProibido) {
        dataInicioConfirmado = toDate(primeiraProvaPosProibido.inicio);
    }

    let dataFimConfirmado = dataFim;
    for (const periodo of periodosSobrepoe) {
        const dataFimProibido = toDate(periodo.fim);
        if (dataFimProibido <= dataInicioConfirmado) {
            // o período proibido já acabou antes do período confirmado começar
            continue;
        }

        if (dataFimProibido < dataFimConfirmado) {
            // o período proibido termina antes do fim do período confirmado
            dataFimConfirmado = dataFimProibido;
        }
    }

    // converte as datas de volta para o formato "dd/mm/aaaa"
    const dataInicioConfirmadoStr = toStr(dataInicioConfirmado);
    const dataFimConfirmadoStr = toStr(dataFimConfirmado);

    // gera array com os períodos não confirmados e seus impedimentos
    let periodosNaoConfirmados = periodosSobrepoe.filter(periodo => {
        let dataFimProibido = toDate(periodo.fim);
        return dataFimProibido > dataInicioConfirmado && dataFimProibido <= dataFimConfirmado;
    }).map(periodo => {
        return {
            periodo: {
                inicio: periodo.inicio,
                fim: periodo.fim
            },
            impedimentos: periodo.impedimentos
        };
    });


    return {
        periodoConfirmado: {
            dataInicio: dataInicioConfirmadoStr,
            dataFim: dataFimConfirmadoStr,
            provasUtilizadas: provasUtilizadas
        },
        periodosNaoConfirmados: periodosNaoConfirmados
    };
}

// Funções auxiliares para conversão entre strings e objetos Date

function toDate(dataStr) {
    const [dia, mes, ano] = dataStr.split('/').map(Number);
    return new Date(ano, mes - 1, dia);
}

function toStr(data) {
    const dia = data.getDate();
    const mes = data.getMonth() + 1;
    const ano = data.getFullYear();
    return `${padZero(dia)}/${padZero(mes)}/${ano}`;
}

function padZero(num) {
    return num.toString().padStart(2, '0');
}

// agora validando de modo que cada prova só homologa sete anos e meio

// function calcularPeriodosConfirmados(periodoDeclarado, provas) {
//     const dataInicio = toDate(periodoDeclarado.dataInicio);
//     const dataFim = toDate(periodoDeclarado.dataFim);

//     const periodosConfirmados = [];
//     const provasUsadas = [];

//     for (const prova of provas) {
//         const dataProva = toDate(prova.inicio);
//         const diferencaAnos = diferencaEmAnos(dataInicio, dataProva);

//         if (diferencaAnos > 7.5) {
//             continue;
//         }

//         let dataInicioConfirmado = dataInicio;
//         let dataFimConfirmado = dataFim;

//         if (diferencaAnos > 0) {
//             dataInicioConfirmado = adicionarAnos(dataProva, Math.ceil(diferencaAnos));
//             dataFimConfirmado = adicionarAnos(dataInicioConfirmado, diferencaEmAnos(dataInicioConfirmado, dataFim));
//         }

//         if (dataInicioConfirmado > dataFim) {
//             continue;
//         }

//         periodosConfirmados.push({
//             dataInicio: toStr(dataInicioConfirmado),
//             dataFim: toStr(dataFimConfirmado)
//         });

//         provasUsadas.push(prova);
//     }

//     return { periodosConfirmados, provasUsadas };
// }


//funções auxiliares da função acima

function diferencaEmAnos(data1, data2) {
    const umAnoEmMilissegundos = 1000 * 60 * 60 * 24 * 365;
    const diferencaEmMilissegundos = Math.abs(data1 - data2);
    return diferencaEmMilissegundos / umAnoEmMilissegundos;
}

function adicionarAnos(data, anos) {
    const novoAno = data.getFullYear() + anos;
    const novoDia = Math.min(data.getDate(), diasNoMes(novoAno, data.getMonth() + 1));
    return new Date(novoAno, data.getMonth(), novoDia);
}

function diasNoMes(ano, mes) {
    return new Date(ano, mes, 0).getDate();
}