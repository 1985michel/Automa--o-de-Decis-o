"use strict";

class Periodo {
    constructor(descricao, inicio, fim) {
        this.descricao = descricao.slice();
        this.inicio = inicio.slice();
        this.fim = fim.slice();
        this.provas = [];
        this.isDepoisDeImpedimento = false;
    }

}

class Impedimento {
    constructor(descricao, inicio, fim) {
        this.descricao = descricao.slice();
        this.inicio = inicio.slice();
        this.fim = fim.slice()
    }
}

class Prova {
    constructor(descricao, inicio, fim) {
        this.descricao = descricao.slice();
        this.inicio = inicio.slice();
        this.fim = fim.slice()
    }
}

function isTesteFuncionando() {
    return 1985;
}

function recebeDDMMAAAARetornaMoment(data) {
    return moment(data, 'DD/MM/YYYY');
}

function recebeMomentoRetornaDDMMAAAA(momento) {
    return momento.format('DD/MM/YYYY')
}




function getDuracaoDoPeriodoEmMeses(periodo) {
    return duracaoEmMeses(periodo.inicio, periodo.fim);
}

function duracaoEmMeses(inicio, fim) {
    //const moment = require('moment');

    const inicioMoment = recebeDDMMAAAARetornaMoment(inicio);
    const fimMoment = recebeDDMMAAAARetornaMoment(fim);
    //return fimMoment.diff(inicioMoment, 'months', true);
    return fimMoment.diff(inicioMoment, 'months');
    // const dataInicioPeriodo = moment(periodo.inicio, 'DD/MM/YYYY');
    // const dataFimPeriodo = moment(periodo.fim, 'DD/MM/YYYY');
    // const periodoTotalEmMeses = dataFimPeriodo.diff(dataInicioPeriodo, 'months');
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

function retiraPartesProibidasDoPeriodo1(periodo1, periodo2) {
    const partesAusentes = [];

    const formatoData = "DD/MM/YYYY";
    const dataInicio1 = moment(periodo1.inicio, formatoData);
    const dataFim1 = moment(periodo1.fim, formatoData);
    const dataInicio2 = moment(periodo2.inicio, formatoData);
    const dataFim2 = moment(periodo2.fim, formatoData);

    //situação 1: Todo o período declarado está impedido
    // Verifica se o período 1 está completamente dentro do período 2
    //se o declarado começa igual ou depois do impedido e termina igual ou depois do impedido
    if (dataInicio1 >= dataInicio2 && dataFim1 <= dataFim2) {
        //retorna vazio pois todo o declarado está impedido
        return partesAusentes;
    }

    //situação 2: há periodo desempedido antes e, ou, depois
    // Verifica se o período 2 está completamente dentro do período 1
    //se o impedido começa depois do declarado e o impedido termina antes do declarado
    //então sobra período válido antes e depois do impedido
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
        if (antes.inicio < antes.fim) {
            //agora também estou atribuindo "isDepoisDeImpedimento" ao que vem antes, mas setando false
            antes.isDepoisDeImpedimento = periodo1.isDepoisDeImpedimento;
            partesAusentes.push(antes);
        }
        if (depois.inicio < depois.fim) {
            //só o depois do impedido recebe o atributo "isDepoisDeImpedimento"
            depois.isDepoisDeImpedimento = true;
            partesAusentes.push(depois);
        }
        return partesAusentes;
    }

    //Situação 3: Não entendi essa situação.
    // Verifica se os períodos se sobrepõem
    //se o declarado começa antes do impedido terminar e o declarado terminada depois do impedido começar
    //então o impedimento está no final declarado
    if (dataInicio1 < dataFim2 && dataFim1 > dataInicio2) {
        const antes = new Periodo(
            periodo1.descricao,
            periodo1.inicio,
            moment(periodo2.inicio, formatoData)
                .subtract(1, "days")
                .format(formatoData)
        );
        //Da forma como interpretei não vi nenhuma situação em que haveria período depois
        //Pois Declarado começa, impedido começa, declardo termina primeiro e só então impedido termina.
        const depois = new Periodo(
            periodo1.descricao,
            moment(periodo2.fim, formatoData)
                .add(1, "days")
                .format(formatoData),
            periodo1.fim
        );

        //acabo de perceber uma  coisa: não posso setar false em nenhum caso, pois o período analisado
        //pode ser parte de outro período analisado antes
        //portanto, não vou setar false jamais, mas sim copiar o atributo do período declarado
        if (antes.inicio < antes.fim) {
            antes.isDepoisDeImpedimento = periodo1.isDepoisDeImpedimento;
            partesAusentes.push(antes);
        }
        if (depois.inicio < depois.fim) {
            depois.isDepoisDeImpedimento = true;
            partesAusentes.push(depois);
        }
        return partesAusentes;
    }

    // Os períodos não se sobrepõem
    //Situação 4: Não há sobreposição
    partesAusentes.push(periodo1);
    return partesAusentes;
}





function removePeriodosConcomitantesFundindoPeriodos(periodos) {
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

const adicionarProvasAosPeriodos = (periodos, provasIn) => {

    const provasSemDuplicidade = removerProvasDuplicadas(provasIn);

    const provas = provasSemDuplicidade;


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

function removerProvasDuplicadas(arrayProvas) {
    const provasUnicas = [];

    arrayProvas.forEach((prova, index) => {
        // verifica se a prova já foi adicionada na lista de provas únicas
        const provaDuplicada = provasUnicas.some((provaUnica) => {
            return (
                prova.descricao === provaUnica.descricao &&
                prova.inicio === provaUnica.inicio &&
                prova.fim === provaUnica.fim
            );
        });

        // se a prova não é duplicada, adiciona na lista de provas únicas
        if (!provaDuplicada) {
            provasUnicas.push(prova);
        }
    });

    return provasUnicas;
}

function getProvaMaisAntiga(periodo) {
    let provaMaisAntiga = periodo.provas[0]; // Inicia com a primeira prova

    for (let i = 1; i < periodo.provas.length; i++) {
        const prova = periodo.provas[i];
        const dataProvaMaisAntiga = new Date(provaMaisAntiga.inicio.split('/').reverse().join('-'));
        const dataProva = new Date(prova.inicio.split('/').reverse().join('-'));

        if (dataProva < dataProvaMaisAntiga) {
            provaMaisAntiga = prova;
        }
    }

    return provaMaisAntiga;
}

function dataProvaMaisAntiga(periodo) {
    if (periodo.provas.length === 0) {
        return null;
    }
    let dataMaisAntiga = moment(periodo.provas[0].inicio, "DD/MM/YYYY");
    for (let i = 1; i < periodo.provas.length; i++) {
        const dataProva = moment(periodo.provas[i].inicio, "DD/MM/YYYY");
        if (dataProva.isBefore(dataMaisAntiga)) {
            dataMaisAntiga = dataProva;
        }
    }
    return dataMaisAntiga.toDate();
}


function fragmentarPeriodo(periodo) {
    const inicio = moment(periodo.inicio, 'DD/MM/YYYY');
    const fim = moment(periodo.fim, 'DD/MM/YYYY');
    const duracaoTotal = fim.diff(inicio, 'milliseconds');
    const periodoDeSeteAnos = moment.duration(7, 'years').add(6, 'months');

    let periodos = [];
    for (let i = 0; i < 50; i++) {
        const inicioPeriodo = inicio.clone().add(Math.random() * duracaoTotal, 'milliseconds');
        const fimPeriodo = inicioPeriodo.clone().add(periodoDeSeteAnos);

        if (fimPeriodo.isAfter(fim)) {
            i--;
            continue;
        }

        periodos.push(new Periodo(`Período ${i + 1}`, inicioPeriodo.format('DD/MM/YYYY'), fimPeriodo.format('DD/MM/YYYY')));
    }

    let tresPeriodos = getTresPeriodosInicioMeioFim(periodo);
    periodos.push(tresPeriodos[0]);
    periodos.push(tresPeriodos[1]);
    periodos.push(tresPeriodos[2]);

    return periodos;
}

function getTresPeriodosInicioMeioFim(periodo) {
    const periodos = [];
    const inicio = moment(periodo.inicio, "DD/MM/YYYY");
    const fim = moment(periodo.fim, "DD/MM/YYYY");
    const duracaoPeriodo = moment.duration(7, "years").add(6, "months");

    const dataCentral = moment(calcularDataCentral(periodo), "DD/MM/YYYY");
    console.log(`Data central: ${calcularDataCentral(periodo)}`);

    periodos.push(new Periodo(periodo.descricao + " - parte 1 INICIO", inicio.format("DD/MM/YYYY"), inicio.add(duracaoPeriodo).format("DD/MM/YYYY")));
    periodos.push(new Periodo(periodo.descricao + " - parte 2 MEIO", moment(dataCentral, "DD/MM/YYYY").subtract(45, 'months').format("DD/MM/YYYY"), moment(dataCentral, "DD/MM/YYYY").add(45, 'months').format("DD/MM/YYYY")));
    periodos.push(new Periodo(periodo.descricao + " - parte 3 FIM", moment(periodo.fim, "DD/MM/YYYY").subtract(90, 'months').format("DD/MM/YYYY"), periodo.fim));

    return periodos;
}

function calcularDataCentral(periodo) {
    const inicio = moment(periodo.inicio, "DD/MM/YYYY");
    const fim = moment(periodo.fim, "DD/MM/YYYY");

    const duracaoEmDias = fim.diff(inicio, "days");
    const dataCentralEmDias = Math.floor(duracaoEmDias / 2);

    const dataCentral = inicio.clone().add(dataCentralEmDias, "days");

    return dataCentral.format("DD/MM/YYYY");
}


//     const inicio = moment(periodo.inicio, 'DD/MM/YYYY');
//     const fim = moment(periodo.fim, 'DD/MM/YYYY');
//     const duracaoTotal = moment.duration(fim.diff(inicio)).asYears();

//     if (duracaoTotal <= 7.5) {
//         return [periodo];
//     }

//     const meio = moment(inicio).add(duracaoTotal / 2, 'years');
//     const primeiro = new Periodo(periodo.descricao + ' - parte 1', inicio.format('DD/MM/YYYY'), momento.add(7.5, 'years').format('DD/MM/YYYY'));
//     const segundo = new Periodo(periodo.descricao + ' - parte 2', momento.subtract(3.75, 'years').format('DD/MM/YYYY'), momento.add(3.75, 'years').format('DD/MM/YYYY'));
//     const terceiro = new Periodo(periodo.descricao + ' - parte 3', fim.subtract(7.5, 'years').format('DD/MM/YYYY'), fim.format('DD/MM/YYYY'));

//     return [primeiro, segundo, terceiro];
// }

function removerOsPeriodosSemProvas(periodos) {
    return periodos.filter(periodo => periodo.provas.length > 0);
}



// function ObterSugestoesDeHomologacao(periodosDeclarados) {

//     periodosDeclarados.forEach(periodo => {

//     });

// }