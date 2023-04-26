"use strict";

class Periodo_h2 {

    constructor(descricao, inicio, fim) {
        this.periodo = new NewPeriodo2(descricao.slice(), inicio.slice(), fim.slice());
        this.provas = [];
        this.impedimentos = [];
        this.periodosValidados = []; //p_h2
        this.periodosNaoValidados = []; //p_h2
    }
}

class NewPeriodo2 {
    constructor(descricao, inicio, fim) {
        this.descricao = descricao.slice()
        this.inicio = inicio.slice();
        this.fim = fim.slice();
        //this.duracao = this.calculaDuracao();
    }
}

class Impedimento_h2 {
    constructor(descricao, inicio, fim) {
        this.descricao = descricao.slice();
        this.inicio = inicio.slice();
        this.fim = fim.slice()
    }
}

class Prova_h2 {
    constructor(descricao, inicio, fim) {
        this.descricao = descricao.slice();
        this.inicio = inicio.slice();
        this.abrangencia = "";

        if (fim != "" && fim != "sem dados") {
            this.fim = fim.slice();
        } else {
            try {
                const [dia, mes, ano] = inicio.split("/");
                const dataInicio = new Date(`${ano}-${mes}-${dia}`);
                dataInicio.setFullYear(dataInicio.getFullYear() + 7);
                dataInicio.setMonth(dataInicio.getMonth() + 6);
                this.fim = `${dataInicio.getDate().toString().padStart(2, '0')}/${(dataInicio.getMonth() + 1).toString().padStart(2, '0')}/${dataInicio.getFullYear()}`;
            } catch (error) {
                console.log("Erro ao calcular data de fim da prova:", error);
            }
        }
    }
}

// class Prova_h2 {
//     constructor(descricao, inicio, fim) {
//         this.descricao = descricao.slice();
//         this.inicio = inicio.slice();
//         this.abrangencia = "";

//         if (fim != "" && fim != "sem dados") {
//             this.fim = fim.slice()
//         } else {
//             this.fim = "";
//         }

//     }
// }

//gpt
function ordenaPorData(array) {
    array.sort((a, b) => {
        const dataA = new Date(a.inicio.split('/').reverse().join('-'));
        const dataB = new Date(b.inicio.split('/').reverse().join('-'));
        return dataA - dataB;
    });
}

//gpt
// function coletarImpedimentosEProvas(periodosDeclarados, impedimentos, provas) {
//     // percorre os períodos declarados
//     for (let i = 0; i < periodosDeclarados.length; i++) {
//         const periodo = periodosDeclarados[i];
//         const periodoInicio = new Date(periodo.periodo.inicio);
//         const periodoFim = new Date(periodo.periodo.fim);

//         // percorre os impedimentos e verifica se está dentro do período
//         for (let j = 0; j < impedimentos.length; j++) {
//             const impedimento = impedimentos[j];
//             const impedimentoInicio = new Date(impedimento.inicio);
//             const impedimentoFim = new Date(impedimento.fim);

//             if (impedimentoInicio >= periodoInicio && impedimentoFim <= periodoFim) {
//                 periodo.impedimentos.push(impedimento);
//             }
//         }

//         // percorre as provas e verifica se está dentro do período
//         for (let k = 0; k < provas.length; k++) {
//             const prova = provas[k];
//             const provaInicio = new Date(prova.inicio);
//             const provaFim = prova.fim !== "" ? new Date(prova.fim) : null;

//             if (provaInicio >= periodoInicio && (provaFim === null || provaFim <= periodoFim)) {
//                 periodo.provas.push(prova);
//             }
//         }
//     }



//     return periodosDeclarados;
// }


function coletarImpedimentosEProvas(periodosDeclarados, impedimentos, provas) {
    const periodosComDados = periodosDeclarados.map(periodo => {
        const periodoComDados = {
            ...periodo,
            impedimentos: [],
            provas: []
        };

        for (const impedimento of impedimentos) {
            if (estaDentroDoPeriodo(impedimento, periodoComDados.periodo)) {
                periodoComDados.impedimentos.push(impedimento);
            }
        }

        for (const prova of provas) {
            if (estaDentroDoPeriodo(prova, periodoComDados.periodo)) {
                periodoComDados.provas.push(prova);
            }
        }

        return periodoComDados;
    });

    return periodosComDados;
}

// function estaDentroDoPeriodo(evento, periodo) {
//     const inicioEvento = new Date(parseDate(evento.inicio));
//     const fimEvento = new Date(parseDate(evento.fim));
//     const inicioPeriodo = new Date(parseDate(periodo.inicio));
//     const fimPeriodo = new Date(parseDate(periodo.fim));

//     return inicioEvento >= inicioPeriodo && fimEvento <= fimPeriodo;
// }

function estaDentroDoPeriodo(evento, periodo) {
    const inicioEvento = new Date(parseDate(evento.inicio));
    const fimEvento = new Date(parseDate(evento.fim));
    const inicioPeriodo = new Date(parseDate(periodo.inicio));
    const fimPeriodo = new Date(parseDate(periodo.fim));

    return (inicioEvento <= fimPeriodo && inicioEvento >= inicioPeriodo) ||
        (fimEvento <= fimPeriodo && fimEvento >= inicioPeriodo) ||
        (inicioEvento <= inicioPeriodo && fimEvento >= fimPeriodo);
}

function parseDate(dateString) {
    const [day, month, year] = dateString.split('/');
    return `${year}-${month}-${day}`;
}


function obterPeriodosLivres(periodosDeclarados, impedimentos, provas) {
    const periodosLivres = [];

    for (const periodo of periodosDeclarados) {
        const periodoLivres = new Periodo_h2(periodo.periodo.descricao, periodo.periodo.inicio, periodo.periodo.fim);

        for (const impedimento of impedimentos) {
            if (estaDentroDoPeriodo(impedimento, periodo.periodo)) {
                const periodo1 = new NewPeriodo2(periodo.periodo.descricao, periodo.periodo.inicio, impedimento.inicio);
                const periodo2 = new NewPeriodo2(periodo.periodo.descricao, impedimento.fim, periodo.periodo.fim);

                if (periodo1.inicio !== periodo1.fim) {
                    periodoLivres.periodosNaoValidados.push(periodo1);
                }

                if (periodo2.inicio !== periodo2.fim) {
                    periodoLivres.periodosNaoValidados.push(periodo2);
                }
            }
        }

        for (const prova of provas) {
            if (estaDentroDoPeriodo(prova, periodo.periodo)) {
                periodoLivres.provas.push(prova);
            }
        }

        periodosLivres.push(periodoLivres);
    }

    return periodosLivres;
}