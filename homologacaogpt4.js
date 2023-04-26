"use strict";

// function partesAusentes(periodo1, periodo2) {
//     const partesAusentes = [];

//     const formatoData = "dd/mm/yyyy";
//     const dataInicio1 = moment(periodo1.inicio, formatoData);
//     const dataFim1 = moment(periodo1.fim, formatoData);
//     const dataInicio2 = moment(periodo2.inicio, formatoData);
//     const dataFim2 = moment(periodo2.fim, formatoData);

//     // Verifica se o período 1 está completamente dentro do período 2
//     if (dataInicio1 >= dataInicio2 && dataFim1 <= dataFim2) {
//         return partesAusentes;
//     }

//     // Verifica se o período 2 está completamente dentro do período 1
//     if (dataInicio2 >= dataInicio1 && dataFim2 <= dataFim1) {
//         const antes = new Periodo(periodo1.descricao, periodo1.inicio, periodo2.inicio);
//         const depois = new Periodo(periodo1.descricao, periodo2.fim, periodo1.fim);
//         if (antes.inicio < antes.fim) partesAusentes.push(antes);
//         if (depois.inicio < depois.fim) partesAusentes.push(depois);
//         return partesAusentes;
//     }

//     // Verifica se os períodos se sobrepõem
//     if (dataInicio1 < dataFim2 && dataFim1 > dataInicio2) {
//         const antes = new Periodo(periodo1.descricao, periodo1.inicio, periodo2.inicio);
//         const depois = new Periodo(periodo1.descricao, periodo2.fim, periodo1.fim);
//         if (antes.inicio < antes.fim) partesAusentes.push(antes);
//         if (depois.inicio < depois.fim) partesAusentes.push(depois);
//         return partesAusentes;
//     }

//     // Os períodos não se sobrepõem
//     partesAusentes.push(periodo1);
//     return partesAusentes;
// }

function retiraPartesProibidasDoPeriodo1(periodo1, periodo2) {
    const partesAusentes = [];

    const formatoData = "DD/MM/YYYY";
    const dataInicio1 = moment(periodo1.inicio, formatoData);
    const dataFim1 = moment(periodo1.fim, formatoData);
    const dataInicio2 = moment(periodo2.inicio, formatoData);
    const dataFim2 = moment(periodo2.fim, formatoData);

    // Verifica se o período 1 está completamente dentro do período 2
    if (dataInicio1 >= dataInicio2 && dataFim1 <= dataFim2) {
        return partesAusentes;
    }

    // Verifica se o período 2 está completamente dentro do período 1
    if (dataInicio2 >= dataInicio1 && dataFim2 <= dataFim1) {
        const antes = new Periodo(
            periodo1.descricao,
            periodo1.inicio,
            moment(periodo2.inicio, formatoData)
                .subtract(1, "days")
                .format(formatoData)
        );
        const depois = new Periodo(
            periodo1.descricao,
            moment(periodo2.fim, formatoData)
                .add(1, "days")
                .format(formatoData),
            periodo1.fim
        );
        if (antes.inicio < antes.fim) partesAusentes.push(antes);
        if (depois.inicio < depois.fim) {
            depois.isDepoisDeImpedimento = true;
            partesAusentes.push(depois);
        }
        return partesAusentes;
    }

    // Verifica se os períodos se sobrepõem
    if (dataInicio1 < dataFim2 && dataFim1 > dataInicio2) {
        const antes = new Periodo(
            periodo1.descricao,
            periodo1.inicio,
            moment(periodo2.inicio, formatoData)
                .subtract(1, "days")
                .format(formatoData)
        );
        const depois = new Periodo(
            periodo1.descricao,
            moment(periodo2.fim, formatoData)
                .add(1, "days")
                .format(formatoData),
            periodo1.fim
        );

        if (antes.inicio < antes.fim) partesAusentes.push(antes);
        if (depois.inicio < depois.fim) {
            depois.isDepoisDeImpedimento = true;
            partesAusentes.push(depois);
        }
        return partesAusentes;
    }

    // Os períodos não se sobrepõem
    partesAusentes.push(periodo1);
    return partesAusentes;
}

function removePeriodosProibidos(periodosDeclarados, periodosProibidos) {
    let periodosFinais = periodosDeclarados.slice(); // cria um array cópia dos períodos declarados

    for (let periodoProibido of periodosProibidos) {
        let periodosTemp = [];

        // para cada período proibido, percorre todos os períodos finais e retira as partes proibidas
        for (let periodoFinal of periodosFinais) {
            const partesAusentes = retiraPartesProibidasDoPeriodo1(periodoFinal, periodoProibido);
            periodosTemp = periodosTemp.concat(partesAusentes);
        }

        periodosFinais = periodosTemp; // atualiza o array de períodos finais com as partes ausentes dos períodos declarados
    }

    return periodosFinais;
}

// function removePeriodosConcomitantes(periodos) {
//     // Ordenar os períodos por data de início crescente
//     const periodosOrdenados = periodos.sort((a, b) => moment(a.inicio, 'DD/MM/YYYY') - moment(b.inicio, 'DD/MM/YYYY'));

//     // Inicializar o novo array de períodos
//     const periodosSemConcomitancia = [periodosOrdenados[0]];

//     // Iterar sobre os demais períodos
//     for (let i = 1; i < periodosOrdenados.length; i++) {
//         const periodoAtual = periodosOrdenados[i];
//         const ultimoPeriodo = periodosSemConcomitancia[periodosSemConcomitancia.length - 1];

//         // Verificar se há sobreposição
//         if (moment(periodoAtual.inicio, 'DD/MM/YYYY') <= moment(ultimoPeriodo.fim, 'DD/MM/YYYY')) {
//             // Substituir o último período pelo resultado da união
//             const periodoUniao = new Periodo(
//                 ultimoPeriodo.descricao,
//                 ultimoPeriodo.inicio,
//                 moment.max(moment(periodoAtual.fim, 'DD/MM/YYYY'), moment(ultimoPeriodo.fim, 'DD/MM/YYYY')).format('DD/MM/YYYY')
//             );
//             periodosSemConcomitancia[periodosSemConcomitancia.length - 1] = periodoUniao;
//         } else {
//             // Adicionar o período atual ao novo array

//             periodosSemConcomitancia.push(periodoAtual);
//         }
//     }

//     return periodosSemConcomitancia;
// }

function removePeriodosConcomitantes(periodos) {
    // Ordenar os períodos por data de início crescente
    const periodosOrdenados = periodos.sort((a, b) => moment(a.inicio, 'DD/MM/YYYY') - moment(b.inicio, 'DD/MM/YYYY'));

    // Inicializar o novo array de períodos
    const periodosSemConcomitancia = [Object.assign({}, periodosOrdenados[0])];

    // Iterar sobre os demais períodos
    for (let i = 1; i < periodosOrdenados.length; i++) {
        const periodoAtual = periodosOrdenados[i];
        const ultimoPeriodo = periodosSemConcomitancia[periodosSemConcomitancia.length - 1];

        // Verificar se há sobreposição
        if (moment(periodoAtual.inicio, 'DD/MM/YYYY') <= moment(ultimoPeriodo.fim, 'DD/MM/YYYY')) {
            // Substituir o último período pelo resultado da união
            const periodoUniao = new Periodo(
                ultimoPeriodo.descricao,
                ultimoPeriodo.inicio,
                moment.max(moment(periodoAtual.fim, 'DD/MM/YYYY'), moment(ultimoPeriodo.fim, 'DD/MM/YYYY')).format('DD/MM/YYYY')
            );

            periodoUniao.isDepoisDeImpedimento = ultimoPeriodo.isDepoisDeImpedimento || periodoAtual.isDepoisDeImpedimento;
            periodosSemConcomitancia[periodosSemConcomitancia.length - 1] = Object.assign({}, periodoUniao);
        } else {
            // Adicionar o período atual ao novo array
            periodosSemConcomitancia.push(Object.assign({}, periodoAtual));
        }
    }

    return periodosSemConcomitancia;
}

const adicionarProvasAoPeriodo = (periodos, provas) => {
    for (let periodo of periodos) {
        for (let prova of provas) {
            const inicioPeriodo = moment(periodo.inicio, "DD/MM/YYYY").toDate().getTime();
            const fimPeriodo = moment(periodo.fim, "DD/MM/YYYY").toDate().getTime();
            const inicioProva = moment(prova.inicio, "DD/MM/YYYY").toDate().getTime();
            if (inicioProva >= inicioPeriodo && inicioProva <= fimPeriodo) {
                periodo.provas.push(prova);
            }
        }
    }
}

function removerPeriodosSemProvas(periodos) {
    return periodos.filter((periodo) => periodo.provas.length > 0);
}


function ajustarPeriodos(periodos) {
    // Percorre todos os periodos
    for (let i = 0; i < periodos.length; i++) {
        let periodo = periodos[i];

        // Verifica se o período é depois de um impedimento
        if (periodo.isDepoisDeImpedimento) {
            let dataMaisAntiga = null;

            // Procura a prova mais antiga contida no período
            for (let j = 0; j < periodo.provas.length; j++) {
                let prova = periodo.provas[j];

                // Compara as datas e guarda a mais antiga
                if (dataMaisAntiga === null || prova.inicio < dataMaisAntiga) {
                    dataMaisAntiga = prova.inicio;
                }
            }

            // Altera a data de início do período para a prova mais antiga encontrada
            periodo.inicio = dataMaisAntiga;
        }
    }
}

function clonarPeriodos(periodos) {
    // Cria um novo array com cópias dos objetos originais
    let periodosClonados = periodos.map(periodo => {
        let periodoClonado = new Periodo(periodo.descricao, periodo.inicio, periodo.fim);
        periodoClonado.provas = periodo.provas.map(prova => {
            return new Prova(prova.descricao, prova.inicio, prova.fim);
        });
        periodoClonado.isDepoisDeImpedimento = periodo.isDepoisDeImpedimento;
        return periodoClonado;
    });

    return periodosClonados;
}


// function ajustarPeriodosLimitandoPelasProvas(periodos) {
//     // Percorre todos os periodos
//     for (let i = 0; i < periodos.length; i++) {
//         let periodo = periodos[i];

//         let dataMaisAntiga = null;
//         let dataMaisRecente = null;

//         // Procura a prova mais antiga e a mais recente contidas no período
//         for (let j = 0; j < periodo.provas.length; j++) {
//             let prova = periodo.provas[j];

//             if (dataMaisAntiga === null || prova.inicio < dataMaisAntiga) {
//                 dataMaisAntiga = prova.inicio;
//             }

//             if (dataMaisRecente === null || prova.fim > dataMaisRecente) {
//                 dataMaisRecente = prova.fim;
//             }
//         }

//         // Calcula a data 7 anos e meio após a data mais nova da prova
//         let novaDataFim = new Date(dataMaisAntiga);
//         novaDataFim.setFullYear(novaDataFim.getFullYear() + 7);
//         novaDataFim.setMonth(novaDataFim.getMonth() + 6);

//         // Verifica se a data atual do período é posterior a nova data de fim
//         let dataFimAtual = new Date(periodo.fim);
//         if (dataFimAtual > novaDataFim) {
//             // Altera a data de fim do período para a nova data calculada
//             periodo.fim = novaDataFim.toLocaleDateString("pt-BR");
//         }
//     }
// }



// function quebraPeriodo(periodo) {
//     const dataInicioPeriodo = new Date(periodo.inicio.split('/').reverse().join('-'));
//     const dataFimPeriodo = new Date(periodo.fim.split('/').reverse().join('-'));
//     const periodoTotalEmMeses = (dataFimPeriodo.getFullYear() - dataInicioPeriodo.getFullYear()) * 12 + (dataFimPeriodo.getMonth() - dataInicioPeriodo.getMonth());

//     if (periodoTotalEmMeses > 90) {
//         const blocos = [];

//         let dataInicioBloco = dataInicioPeriodo;
//         let dataFimBloco = new Date(dataInicioBloco.getFullYear() + 7, dataInicioBloco.getMonth() + 6, dataInicioBloco.getDate());

//         while (dataFimBloco <= dataFimPeriodo) {
//             const provasNoBloco = periodo.provas.filter(prova => {
//                 const dataInicioProva = new Date(prova.inicio.split('/').reverse().join('-'));
//                 return dataInicioProva >= dataInicioBloco && dataInicioProva <= dataFimBloco;
//             });

//             if (provasNoBloco.length > 0) {
//                 blocos.push(new Periodo(periodo.descricao, dataInicioBloco.toLocaleDateString('pt-BR'), dataFimBloco.toLocaleDateString('pt-BR')));
//             }

//             dataInicioBloco = new Date(dataFimBloco.getFullYear(), dataFimBloco.getMonth() + 1, dataFimBloco.getDate());
//             dataFimBloco = new Date(dataInicioBloco.getFullYear() + 7, dataInicioBloco.getMonth() + 6, dataInicioBloco.getDate());
//         }

//         return blocos;
//     }

//     return [periodo];
// }

// A função abaixo funciona bem. Só continuei pesquisando para tentar aprimorá-la
// function quebraPeriodo(periodo) {
//     const dataInicioPeriodo = new Date(periodo.inicio.split('/').reverse().join('-'));
//     const dataFimPeriodo = new Date(periodo.fim.split('/').reverse().join('-'));
//     const periodoTotalEmMeses = (dataFimPeriodo.getFullYear() - dataInicioPeriodo.getFullYear()) * 12 + (dataFimPeriodo.getMonth() - dataInicioPeriodo.getMonth());

//     if (periodoTotalEmMeses > 90) {
//         const blocos = [];

//         let dataInicioBloco = dataInicioPeriodo;
//         let dataFimBloco = new Date(dataInicioBloco.getFullYear() + 7, dataInicioBloco.getMonth() + 6, dataInicioBloco.getDate());

//         while (dataFimBloco <= dataFimPeriodo) {
//             const provasNoBloco = periodo.provas.filter(prova => {
//                 const dataInicioProva = new Date(prova.inicio.split('/').reverse().join('-'));
//                 return dataInicioProva >= dataInicioBloco && dataInicioProva <= dataFimBloco;
//             });

//             if (provasNoBloco.length > 0) {
//                 const novoBloco = new Periodo(periodo.descricao, dataInicioBloco.toLocaleDateString('pt-BR'), dataFimBloco.toLocaleDateString('pt-BR'));
//                 novoBloco.provas = provasNoBloco;
//                 novoBloco.isDepoisDeImpedimento = periodo.isDepoisDeImpedimento;
//                 blocos.push(novoBloco);
//             }

//             dataInicioBloco = new Date(dataFimBloco.getFullYear(), dataFimBloco.getMonth() + 1, dataFimBloco.getDate());
//             dataFimBloco = new Date(dataInicioBloco.getFullYear() + 7, dataInicioBloco.getMonth() + 6, dataInicioBloco.getDate());
//         }

//         return blocos;
//     }

//     return [periodo];
// }


function formatDateToString(date) {
    let day = date.getDate().toString().padStart(2, '0');
    let month = (date.getMonth() + 1).toString().padStart(2, '0');
    let year = date.getFullYear().toString();
    return `${day}/${month}/${year}`;
}

function addYears(date, years) {
    let newDate = new Date(date);
    newDate.setFullYear(newDate.getFullYear() + years);
    return newDate;
}

function isBefore(date1, date2) {
    return date1 < date2;
}

function formatStringToDate(dateString) {
    const [day, month, year] = dateString.split('/');
    return new Date(year, month - 1, day);
}

// function quebraPeriodo(periodo) {
//     const seteAnosEMeio = 7.5;

//     let inicio = new Date(formatStringToDate(periodo.inicio));
//     let fim = new Date(formatStringToDate(periodo.fim));

//     let blocos = [];

//     if (isBefore(fim, addYears(inicio, seteAnosEMeio))) {
//         // Periodo com menos de 7 anos e meio
//         blocos.push({ inicio: inicio, fim: fim, provas: periodo.provas.slice(), isDepoisDeImpedimento: periodo.isDepoisDeImpedimento });
//     } else {
//         // Periodo com mais de 7 anos e meio
//         let ultimoInicio = inicio;
//         while (isBefore(addYears(ultimoInicio, seteAnosEMeio), fim)) {
//             let provasDoBloco = [];

//             for (let prova of periodo.provas) {
//                 let inicioProva = new Date(formatStringToDate(prova.inicio));
//                 if (isBefore(ultimoInicio, inicioProva) && isBefore(inicioProva, addYears(ultimoInicio, seteAnosEMeio))) {
//                     provasDoBloco.push(prova);
//                 }
//             }

//             blocos.push({
//                 inicio: ultimoInicio,
//                 fim: addYears(ultimoInicio, seteAnosEMeio),
//                 provas: provasDoBloco,
//                 isDepoisDeImpedimento: periodo.isDepoisDeImpedimento
//             });

//             ultimoInicio = addYears(ultimoInicio, seteAnosEMeio);
//         }

//         let provasDoBloco = [];

//         for (let prova of periodo.provas) {
//             let inicioProva = new Date(formatStringToDate(prova.inicio));
//             if (isBefore(ultimoInicio, inicioProva) && isBefore(inicioProva, fim)) {
//                 provasDoBloco.push(prova);
//             }
//         }

//         blocos.push({
//             inicio: ultimoInicio,
//             fim: fim,
//             provas: provasDoBloco,
//             isDepoisDeImpedimento: periodo.isDepoisDeImpedimento
//         });
//     }

//     return blocos;
// }

// function quebraPeriodo(periodo) {
//     const seteAnosEMeio = 7.5;

//     let inicio = new Date(formatStringToDate(periodo.inicio));
//     let fim = new Date(formatStringToDate(periodo.fim));

//     let blocos = [];

//     if (isBefore(fim, addYears(inicio, seteAnosEMeio))) {
//         // Periodo com menos de 7 anos e meio
//         blocos.push({ inicio: formatDateToString(inicio), fim: formatDateToString(fim), provas: periodo.provas.slice(), isDepoisDeImpedimento: periodo.isDepoisDeImpedimento });
//     } else {
//         // Periodo com mais de 7 anos e meio
//         let ultimoInicio = inicio;
//         while (isBefore(addYears(ultimoInicio, seteAnosEMeio), fim)) {
//             let provasDoBloco = [];

//             for (let prova of periodo.provas) {
//                 let inicioProva = new Date(formatStringToDate(prova.inicio));
//                 if (isBefore(ultimoInicio, inicioProva) && isBefore(inicioProva, addYears(ultimoInicio, seteAnosEMeio))) {
//                     provasDoBloco.push(prova);
//                 }
//             }

//             blocos.push({
//                 inicio: formatDateToString(ultimoInicio),
//                 fim: formatDateToString(addYears(ultimoInicio, seteAnosEMeio)),
//                 provas: provasDoBloco,
//                 isDepoisDeImpedimento: periodo.isDepoisDeImpedimento
//             });

//             ultimoInicio = addYears(ultimoInicio, seteAnosEMeio);
//         }

//         let provasDoBloco = [];

//         for (let prova of periodo.provas) {
//             let inicioProva = new Date(formatStringToDate(prova.inicio));
//             if (isBefore(ultimoInicio, inicioProva) && isBefore(inicioProva, fim)) {
//                 provasDoBloco.push(prova);
//             }
//         }

//         blocos.push({
//             inicio: formatDateToString(ultimoInicio),
//             fim: formatDateToString(fim),
//             provas: provasDoBloco,
//             isDepoisDeImpedimento: periodo.isDepoisDeImpedimento
//         });
//     }

//     return blocos;
// }

function quebraPeriodo(periodo) {
    const seteAnosEMeio = 7.5;

    let inicio = new Date(formatStringToDate(periodo.inicio));
    let fim = new Date(formatStringToDate(periodo.fim));

    let blocos = [];

    if (isBefore(fim, addYears(inicio, seteAnosEMeio))) {
        // Periodo com menos de 7 anos e meio
        blocos.push({
            inicio: formatDateToString(inicio),
            fim: formatDateToString(fim),
            provas: periodo.provas.slice(),
            isDepoisDeImpedimento: periodo.isDepoisDeImpedimento
        });
    } else {
        // Periodo com mais de 7 anos e meio
        let ultimoInicio = inicio;
        let indiceProva = 0;

        while (isBefore(addYears(ultimoInicio, seteAnosEMeio), fim)) {
            let provasDoBloco = [];

            while (
                indiceProva < periodo.provas.length &&
                isBefore(formatStringToDate(periodo.provas[indiceProva].inicio), addYears(ultimoInicio, seteAnosEMeio))
            ) {
                let prova = periodo.provas[indiceProva];

                if (isBefore(ultimoInicio, formatStringToDate(prova.inicio))) {
                    provasDoBloco.push(prova);
                }

                indiceProva++;
            }

            blocos.push({
                inicio: formatDateToString(ultimoInicio),
                fim: formatDateToString(addYears(ultimoInicio, seteAnosEMeio)),
                provas: provasDoBloco,
                isDepoisDeImpedimento: periodo.isDepoisDeImpedimento
            });

            ultimoInicio = addYears(ultimoInicio, seteAnosEMeio);
        }

        let provasDoBloco = [];

        while (
            indiceProva < periodo.provas.length &&
            isBefore(formatStringToDate(periodo.provas[indiceProva].inicio), fim)
        ) {
            let prova = periodo.provas[indiceProva];

            if (isBefore(ultimoInicio, formatStringToDate(prova.inicio))) {
                provasDoBloco.push(prova);
            }

            indiceProva++;
        }

        blocos.push({
            inicio: formatDateToString(ultimoInicio),
            fim: formatDateToString(fim),
            provas: provasDoBloco,
            isDepoisDeImpedimento: periodo.isDepoisDeImpedimento
        });
    }

    return blocos;
}

function formatDate(dateStr) {
    const [day, month, year] = dateStr.split("/");
    return new Date(`${year}-${month}-${day}`);
}

function dateDiffInYears(startDate, endDate) {
    const diffInMs = endDate.getTime() - startDate.getTime();
    return diffInMs / (1000 * 60 * 60 * 24 * 365.25);
}

function splitPeriodIntoBlocks(period, blockLength) {
    const startDate = formatDate(period.inicio);
    const endDate = formatDate(period.fim);
    const maxBlocks = Math.ceil(dateDiffInYears(startDate, endDate) / blockLength);

    const blocks = [];
    let blockStartDate = new Date(startDate);

    for (let i = 0; i < maxBlocks; i++) {
        let blockEndDate = new Date(blockStartDate);
        blockEndDate.setFullYear(blockEndDate.getFullYear() + blockLength);
        blockEndDate.setDate(blockEndDate.getDate() - 1);

        if (blockEndDate > endDate) {
            blockEndDate = new Date(endDate);
        }

        const block = {
            descricao: `${period.descricao} - Bloco ${i + 1}`,
            inicio: formatDate(blockStartDate),
            fim: formatDate(blockEndDate),
            provas: [],
            isDepoisDeImpedimento: period.isDepoisDeImpedimento,
        };

        for (const prova of period.provas) {
            const provaDate = formatDate(prova.inicio);

            if (provaDate >= blockStartDate && provaDate <= blockEndDate) {
                block.provas.push(prova);
            }
        }

        blocks.push(block);

        blockStartDate = new Date(blockEndDate);
        blockStartDate.setDate(blockStartDate.getDate() + 1);
    }

    return blocks;
}

function splitPeriodIntoMaximalBlocks(period) {
    const blockLengths = [7.5, 5, 2.5, 1, 0.5, 0.25];
    let blocks = [];

    for (const blockLength of blockLengths) {
        blocks = splitPeriodIntoBlocks(period, blockLength);
        if (blocks.length > 1) {
            break;
        }
    }

    return blocks;
}


// function adicionaProvas(periodos, provas) {
//     periodos.forEach(periodo => {
//         provas.forEach(prova => {
//             const inicioProva = new Date(prova.inicio.split('/').reverse().join('-'));
//             const inicioPeriodo = new Date(periodo.inicio.split('/').reverse().join('-'));
//             const fimPeriodo = new Date(periodo.fim.split('/').reverse().join('-'));
//             if (inicioProva >= inicioPeriodo && inicioProva <= fimPeriodo) {
//                 periodo.provas.push(prova);
//             }
//         });
//     });
// }

// function adicionaProvas(periodos, provas) {
//     for (let i = 0; i < periodos.length; i++) {
//         const periodo = periodos[i];
//         for (let j = 0; j < provas.length; j++) {
//             const prova = provas[j];
//             const formatoData = "DD/MM/YYYY";
//             const dataInicio = moment(prova.inicio, formatoData);
//             const dataFim = moment(prova.fim, formatoData);
//             const dataInicioPeriodo = moment(periodo.inicio, formatoData);
//             const dataFimPeriodo = moment(periodo.fim, formatoData);

//             if (dataInicio >= dataInicioPeriodo && dataInicio <= dataFimPeriodo) {
//                 periodo.provas.push(prova);
//             }
//         }
//     }

//     return periodos;
// }

// let periodos = [
//     { descricao: 'Período 1', inicio: '01/01/2022', fim: '28/02/2022' },
//     { descricao: 'Período 1', inicio: '01/04/2022', fim: '31/08/2022' },
//     { descricao: 'Período 1', inicio: '01/10/2022', fim: '31/12/2022' }
// ]



// let provas = [
//     { descricao: 'Prova 1', inicio: '03/01/2020', fim: '04/01/2023' },
//     { descricao: 'Prova 2', inicio: '20/01/2022', fim: '22/01/2022' },
//     { descricao: 'Prova 3', inicio: '01/08/2022', fim: '02/08/2022' },
//     { descricao: 'Prova 4', inicio: '15/04/2023', fim: '16/04/2023' },
// ]

// function adicionarDias(data, dias) {
//     const novaData = new Date(data);
//     novaData.setDate(novaData.getDate() + dias);
//     return novaData.toLocaleDateString('pt-BR');
// }

// function subtrairDias(data, dias) {
//     const novaData = new Date(data);
//     novaData.setDate(novaData.getDate() - dias);
//     return novaData.toLocaleDateString('pt-BR');
// }

// function adicionarDias(data, dias) {
//     const novaData = new Date(data);
//     novaData.setDate(novaData.getDate() + dias);
//     return novaData;
// }

// function subtrairDias(data, dias) {
//     const novaData = new Date(data);
//     novaData.setDate(novaData.getDate() - dias);
//     return novaData;
// }



function parseDate(dateString) {
    const [day, month, year] = dateString.split('/');
    return `${year}-${month}-${day}`;
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