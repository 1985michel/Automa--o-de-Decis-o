"use strict";

class Periodo_h2 {

    constructor(descricao, inicio, fim) {
        this.periodo = new NewPeriodo(descricao.slice(), inicio.slice(), fim.slice());
        this.provas = [];
        this.impedimentos = [];
        this.periodosValidados = []; //p_h2
        this.periodosNaoValidados = []; //p_h2
    }

    addProva(prova) {

        this.provas.push(prova);
        /* this.provas.push(new Prova(prova.descricao.slice(), prova.dataInicio.slice(), prova.dataFim.slice())); */
        this.provas.sort(newSortFunction);
    }

    isComProva() {
        return this.provas.length > 0;
    }

    addImpedimento(impedimento) {

        this.impedimentos.push(impedimento);
        this.impedimentos.sort(newSortFunction);

    }

    isComImpedimento() {
        return this.impedimentos.length > 0;
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
            this.fim = fim.slice()
        } else {
            this.fim = "";
        }

    }
}

let periodos_h2 = [];

let impedimentos_h2 = []

let provas_h2 = [];

function analisaHomologacao_h2() {

    getImpedimentos_h2();

    getProvas_h2();

    new_etapa1_coletandoOsPeriodosDeclarados();

    console.log(">>>> ETAPA-1<<<<<");

    let n = 1;
    for (const p of periodos_h2) {
        console.log(`${n} - ${p.periodo.inicio} a ${p.periodo.fim}`);
        n++;
    }

    console.log("        ---          ");

    new_etapa2_coletandoOsImpedimentosDosPeriodos();

    console.log(">>>> ETAPA-2<<<<<");

    n = 1;
    for (const p of periodos_h2) {
        console.log(`${n} - ${p.periodo.inicio} a ${p.periodo.fim}`);
        n++;
    }

    console.log("        ---          ");

    new_etapa3_coletandoAsProvasDosPeriodos();

    console.log(">>>> ETAPA-3<<<<<");

    n = 1;
    for (const p of periodos_h2) {
        console.log(`${n} - ${p.periodo.inicio} a ${p.periodo.fim}`);
        n++;
    }

    console.log("        ---          ");

    new_etapa4_extraindoPeriodoValido();

    console.log(">>>> ETAPA-4<<<<<");

    n = 1;
    for (let j = 0; j < periodos_h2.length; j++) {
        const p_externo = periodos_h2[j];
        console.log(`${j} - ${p_externo.periodo.inicio} a ${p_externo.periodo.fim}`);
        //}
        //for (const p of periodos_h2) {
        //console.log(`${n} - ${p.periodo.inicio} a ${p.periodo.fim}`);
        //n++;

        for (let i = 0; i < p_externo.periodosValidados.length; i++) {
            const v = p_externo.periodosValidados[i].periodo;
            console.log(`Validado ${j}${i} - ${v.descricao} - ${v.inicio} a ${v.fim}`);
        }

        for (let i = 0; i < p_externo.periodosNaoValidados.length; i++) {
            const v = p_externo.periodosNaoValidados[i].periodo;
            console.log(`NAO Validado ${j}${i} - ${v.descricao} - ${v.inicio} a ${v.fim}`);
        }

    }

    console.log("        ---          ");


    new_etapa_5_1_getProvasDosNaoImpedidos();
    new_etapa_5_2_getImpedimentosDosImpedidos();


    new_etapa5_homologandoPorProva();

    console.log(">>>> ETAPA-5<<<<<");


    //aqui quero subir um nível de validação
    //pegar do nível 3 e subir para o 2

    let validadosNivel3 = [];
    let naoValidadosNivel3 = [];

    console.log("Períodos");
    for (let i = 0; i < periodos_h2.length; i++) {

        validadosNivel3 = [];
        naoValidadosNivel3 = [];

        //PERIODOS
        const p = periodos_h2[i];
        console.log(`${i} - ${p.periodo.inicio} a ${p.periodo.fim}`);

        for (let j = 0; j < p.periodosValidados.length; j++) {//validados de P
            const pp = p.periodosValidados[j];
            console.log(`${i}${j} Validados - ${pp.periodo.inicio} a ${pp.periodo.fim}`);

            for (let k = 0; k < pp.periodosValidados.length; k++) {//validados de P
                const ppp = pp.periodosValidados[k];
                console.log(`${i}${j}${k} Validados - ${ppp.periodo.inicio} a ${ppp.periodo.fim}`);
                validadosNivel3.push(ppp);
            }

            for (let k = 0; k < pp.periodosNaoValidados.length; k++) {//NÃO validados de P
                const ppp = pp.periodosNaoValidados[k];
                console.log(`${i}${j}${k} NÃO Validados - ${ppp.periodo.inicio} a ${ppp.periodo.fim}`);
                naoValidadosNivel3.push(ppp);

            }
        }

        for (let j = 0; j < p.periodosNaoValidados.length; j++) {//NÃO validados de P
            const pp = p.periodosNaoValidados[j];
            console.log(`${i}${j} NÃO Validados - ${pp.periodo.inicio} a ${pp.periodo.fim}`);
            naoValidadosNivel3.push(pp);

            for (let k = 0; k < pp.periodosNaoValidados.length; k++) {//NÃO validados de P
                const ppp = pp.periodosNaoValidados[k];
                console.log(`${i}${j}${k} NÃO Validados - ${ppp.periodo.inicio} a ${ppp.periodo.fim}`);
                naoValidadosNivel3.push(ppp);

            }
        }

        p.periodosValidados = validadosNivel3.slice();
        p.periodosNaoValidados = naoValidadosNivel3.slice();

    }




    /* n = 1;
    for (const p of periodos_h2) {
        console.log(`${n} - ${p.periodo.inicio} a ${p.periodo.fim}`);
        n++;
    } */

    console.log("        ---          ");

    return true;

}

function getImpedimentos_h2() {

    impedimentos_h2 = [];

    impedimentosGerais.forEach(impedimento => {

        let descricao = `${impedimento.descricao} - ${impedimento.inicio} a ${impedimento.fim}`
        let imp_h2 = new Impedimento_h2(descricao, impedimento.inicio, impedimento.fim);

        impedimentos_h2.push(imp_h2);

    });



}


function getProvas_h2() {

    provas_h2 = [];

    provasGerais.forEach(prova => {

        //não faz sentido dizer que um periodo valida outro
        /* if (prova instanceof NewPeriodo) {
            let descricao = `${prova.descricao} - ${prova.inicio} a ${prova.fim};`;

            provas_h2.push(new Prova_h2(descricao, prova.inicio, prova.fim));

        } else */
        if (prova.tipo === "prova-doc") {

            //ele transforma cada data em um novo documento provah2

            prova.getDatas().forEach(data => {
                let descricao = `${prova.descricao} - ${data};`;
                provas_h2.push(new Prova_h2(descricao, data, ""));
            });

        } else if (!(prova instanceof NewPeriodo)) {

            let descricao = `${prova.descricao} - ${prova.inicio} a ${prova.fim};`;
            provas_h2.push(new Prova_h2(descricao, prova.inicio, prova.fim));

        }
    });
}

function new_etapa1_coletandoOsPeriodosDeclarados() {

    periodos_h2 = [];

    periodosAutoDeclarados.forEach(periodo => {

        //console.log("linha 190 <<<<<<<<<<<");
        //console.log(`${periodo.categoria} - ${periodo.inicio} a ${periodo.fim}`);
        periodos_h2.push(new Periodo_h2(periodo.descricao.slice(), periodo.inicio.slice(), periodo.fim.slice()));

    });

    //Observei que não não uso a descrição nos h2, vou parar de capturá-la


    //periodos_h2 = retiraConcomitancia(periodos_h2);




}

function new_etapa2_coletandoOsImpedimentosDosPeriodos() {

    periodos_h2.forEach(p_h2 => {

        impedimentos_h2.forEach(impedimento => {

            if (isImpedimento_h2AtrapalhandoOPeriodo(p_h2.periodo, impedimento)) {
                p_h2.addImpedimento(impedimento);
            }
        });

    });
}

function isImpedimento_h2AtrapalhandoOPeriodo(periodo, impedimento) {

    //para pegar as empresas ativas
    if (impedimento.fim == "" && impedimento.descricao.includes("Ativa") && impedimento.descricao.includes("Empresa")) {
        //if (impedimento.fim == "") {
        return true;
        //}
    }

    //para pegar os benefícios urbanos ativos
    if (impedimento.fim == "" && impedimento.descricao.includes("Ativo") && impedimento.descricao.includes("Benefício")) {
        //if (impedimento.fim == "") {
        return true;
        //}
    }

    if (isDataInicioDentroDoPeriodo(impedimento.inicio, periodo) || isDataFimDentroDoPeriodo(impedimento.fim, periodo)) {
        return true
    }

    return false;

}


function new_etapa3_coletandoAsProvasDosPeriodos() {

    periodos_h2.forEach(p_h2 => {

        provas_h2.forEach(prova => {

            if (isProva_h2ComprovandoDoPeriodo(p_h2.periodo, prova)) {
                p_h2.addProva(prova);
            }
        });
    });
}

function new_etapa4_extraindoPeriodoValido() {

    periodos_h2.forEach(p_h2 => {
        removePeriodosImpedidos(p_h2);
    });

}

function new_etapa_5_1_getProvasDosNaoImpedidos() {

    for (const ph2 of periodos_h2) {

        for (const valido_ph2 of ph2.periodosValidados) {

            for (const prova of ph2.provas) {

                if (isProva_h2ComprovandoDoPeriodo(valido_ph2.periodo, prova)) {
                    valido_ph2.provas.push(prova);
                }
            }
        }
    }
}

function new_etapa_5_2_getImpedimentosDosImpedidos() {

    for (const ph2 of periodos_h2) {

        for (const invalido_ph2 of ph2.periodosNaoValidados) {

            for (const impedimento of ph2.impedimentos) {

                if (isImpedimento_h2AtrapalhandoOPeriodo(invalido_ph2.periodo, impedimento)) {
                    invalido_ph2.impedimentos.push(impedimento);
                }
            }
        }
    }
}

function removePeriodosImpedidos(p_h2) {

    let semImpedimentos = [];
    let impedidos = [];

    let inicio = p_h2.periodo.inicio.slice();

    let fim = "";

    let inicioImpedido = "";
    let fimImpedido = "";

    p_h2.impedimentos.forEach(impedimento => {
        fim = getVespera(impedimento.inicio);


        if (inicioImpedido == "" || isData1BeforeData2(impedimento.inicio, inicioImpedido)) {
            inicioImpedido = impedimento.inicio.slice();
        }

        //console.log(`>>>>> INICIO DO IMPEDIMENTO: ${inicioImpedido}`);

        //console.log(`Impedimento começado em ${impedimento.inicio}`);

        if (isData1BeforeData2(inicio, fim)) {
            //semImpedimentos.push(new NewPeriodo("", inicio, fim)); //pegando o primeiro periodo
            semImpedimentos.push(new Periodo_h2(p_h2.periodo.descricao, inicio, fim)); //pegando o primeiro periodo
        }

        p_h2.provas.forEach(prova => {
            if (inicioImpedido != "") {
                let primeiroInicioAposImpedimento = "";

                if (isData1BeforeData2(impedimento.fim, prova.inicio)) {

                    if (primeiroInicioAposImpedimento == "" || isData1BeforeData2(prova.inicio, primeiroInicioAposImpedimento)) {

                        primeiroInicioAposImpedimento = prova.inicio.slice(); // aqui extraio a primeira prova após o impedimento

                    }
                }

                inicio = primeiroInicioAposImpedimento.slice();

                if (inicio != "") {
                    fimImpedido = getVespera(inicio);
                    //console.log(`>>>>> FIM DO IMPEDIMENTO: ${fimImpedido}`);
                }


                if (inicioImpedido != "" && fimImpedido != "") {

                    /* console.log(`>>>>>>>>>>>>>>>> 279`);
                    console.log(`inicio Impedido: ${inicioImpedido}`);
                    console.log(`Fim Impedido: ${fimImpedido}`); */

                    if (isData1BeforeData2(inicioImpedido, fimImpedido)) {
                        //impedidos.push(new NewPeriodo("", inicioImpedido, fimImpedido));
                        impedidos.push(new Periodo_h2(p_h2.periodo.descricao, inicioImpedido, fimImpedido));
                        inicioImpedido = "";
                        fimImpedido = "";

                    }

                }
            }

        });


    });

    if (isData1BeforeData2(inicio, p_h2.periodo.fim)) {

        // semImpedimentos.push(new Periodo(inicio, p_h2.periodo.fim)); //pegando o ultimo periodo
        semImpedimentos.push(new Periodo_h2(p_h2.periodo.descricao, inicio, p_h2.periodo.fim)); //pegando o ultimo periodo

    }

    if (inicioImpedido != "" && fimImpedido == "") {
        //impedidos.push(new NewPeriodo("", inicioImpedido, p_h2.periodo.fim)); //PEGANDO O FINAL SE TIVER INICIO IMPEDIDO.
        impedidos.push(new Periodo_h2(p_h2.periodo.descricao, inicioImpedido, p_h2.periodo.fim)); //PEGANDO O FINAL SE TIVER INICIO IMPEDIDO.
    }




    //console.log(`Temos ${semImpedimentos.length} períodos sem impedimentos no período de ${p_h2.periodo.inicio} a ${p_h2.periodo.fim}`);

    /*     console.log("\n\n\n\n\n\n\n");
        console.log(`---------------------------------------`);
    
        console.log(`>>> IMPEDIMENTOS P-H2:`);
    
        for (let index = 0; index < p_h2.impedimentos.length; index++) {
            const imp = p_h2.impedimentos[index];
            console.log(`${index} - ${imp.inicio} a ${imp.fim} - ${imp.descricao} `);
    
        }
        console.log(`\n\n`);
    
        console.log(`>>> PROVAS P-H2:`);
    
        for (let index = 0; index < p_h2.provas.length; index++) {
            const prova = p_h2.provas[index];
            console.log(`${index} - ${prova.inicio} - ${prova.descricao}`);
    
        }
        console.log(`\n\n`);
    
        console.log(`>>> Períodos sem impedimentos:`);
        for (let i = 0; i < semImpedimentos.length; i++) {
            const sem = semImpedimentos[i].periodo;
            console.log(`${i} - ${sem.descricao} - ${sem.inicio} a ${sem.fim} `);
        }
        console.log(`\n\n`);
        console.log(`>>> Períodos impedimentos:`);
        for (let i = 0; i < impedidos.length; i++) {
            const imp = impedidos[i].periodo;
            console.log(`${i} - ${imp.descricao} - ${imp.inicio} a ${imp.fim} `);
        }
        console.log(`---------------------------------------`);
        console.log("\n\n\n\n\n\n\n"); */



    p_h2.periodosValidados = semImpedimentos;
    p_h2.periodosNaoValidados = impedidos;

    //console.log(`ENCONTRAMOS ${impedidos.length} PERIODOS IMPEDIDOS`);

}


function calculaProporcaoPeriodos(anos, meses, larguraDaTela) {

    let total = calculaTotalAutodeclarado();
    let totalMeses = (total[0] * 12) + total[1];



    let periodo = (anos * 12) + meses;

    let proporcao = (100 * periodo) / totalMeses;
    proporcao = parseInt(proporcao);

    return proporcao * larguraDaTela;
}






function new_etapa5_homologandoPorProva() {


    let validadosDeSegundoNivel = [];
    let naoValidadosDeSegundoNivel = [];

    for (const p of periodos_h2) { //p é um p-h2

        const p_n1 = p.periodo; //p_n1 é um p.periodo

        console.log(`LINHA 437 - DESCRICAO ${p_n1.descricao} - ${p_n1.inicio} a ${p_n1.fim}`);

        let periodosValidados = p.periodosValidados;

        console.log(`São ${p.periodosValidados.length} periodos validados`);

        for (const v of p.periodosValidados) {

            const validado = v.periodo;

            console.log(`LINHA 441 - DESCRICAO ${validado.descricao} - ${validado.inicio} a ${validado.fim}`);

            estrategiaDeValidacaoUm(v);
        }
    }
}

//nesta estratégia quebro os períodos em blocos de 7,5 anos e vejo se tem provas dentro de cada bloco
function estrategiaDeValidacaoUm(p) {
    //p é um p_h2



    //let duracao = [periodo.duracao.years, periodo.duracao.months, periodo.duracao.days];

    //se for menor ou igual a 7,5 anos e tiver prova, valide tudo
    //if (duracao[0] < 7 || (duracao[0] == 7 && duracao[1] < 6) || (duracao[0] == 7 && duracao[1] == 6 && duracao[2] == 0)) {



    if (isPeriodoMenorOuIgualASeteAnosEMeio(p.periodo)) {

        let newP = new Periodo_h2(p.periodo.descricao, p.periodo.inicio, p.periodo.fim);
        //se tiver prova

        for (const prova of provasGerais) {

            if (prova.tipo === "prova-doc") {

                //ele transforma cada data em um novo documento provah2

                prova.getDatas().forEach(data => {
                    let newProva = new Prova_h2(prova.descricao, data, "");


                    if (prova.tipo == "sala" && isProvaPeriodoComprovandoDoPeriodo(newP.periodo, prova)) {

                        //if (isProvaPeriodoComprovandoDoPeriodo(newP.periodo, prova)) {
                        //let newP = new Periodo_h2(periodo.descricao, periodo.inicio, periodo.fim);
                        newP.provas.push(newProva);
                        //p.validados.push(newP);
                        // }

                    } else if (isProvaComumComprovandoDoPeriodo(newP.periodo, data)) {
                        //provasInternas.push(prova);
                        //newP = new Periodo_h2(periodo.descricao, periodo.inicio, periodo.fim);
                        newP.provas.push(newProva);
                        //p.validados.push(newP);
                    }

                });

                //se for qualquer outro tipo de prova que nãos eja newPeriodo ou "prova-doc"
            } else if (!(prova instanceof NewPeriodo)) {

                let newProva = new Prova_h2(prova.descricao, prova.inicio, prova.fim);

                if (isProvaComumComprovandoDoPeriodo(newP.periodo, prova.inicio)) {
                    //let newP = new Periodo_h2(periodo.descricao, periodo.inicio, periodo.fim);
                    newP.provas.push(newProva);
                    //p.validados.push(newP);
                }

            } /* else if (prova instanceof NewPeriodo) {

                let newProva = new Prova_h2(prova.descricao, prova.inicio, prova.fim);

                if (isProvaPeriodoComprovandoDoPeriodo(newP.periodo, prova)) {
                    //let newP = new Periodo_h2(periodo.descricao, periodo.inicio, periodo.fim);
                    newP.provas.push(newProva);
                    //p.validados.push(newP);
                }

            } */
        }



        if (newP.provas.length == 0) {
            p.periodosNaoValidados.push(newP);

            //aqui tem que pegar os impedimentos
            for (const impedimento of impedimentosGerais) {

                if (isImpedimentoComumAtrapalhandoPeriodo(newP.periodo, impedimento)) {
                    newP.impedimentos.push(impedimento);
                }

            }



        } else {
            p.periodosValidados.push(newP);
        }




        /* if (p.provas > 0) {
            //o periodo abaixo é um periodo_h2, dentro dos  validados, dentro do validado (3ª dimensão)

            newP.provas = p.provas;
            p.periodosValidados.push(newP);
        } else {
            p.periodosNaoValidados.push(newP);
        } */

        //se for maior que 7,5 anos
    } else {

        let blocos = fragmentaEmBlocosDeSeteAnosEMeio(p.periodo);

        //agora vamos ver se cada bloco tem uma prova dentro

        for (const p_h2 of blocos) {
            //p_h2 é um p_h2           

            console.log(`LINHA 515 RETORNO DOS BLOCOS: ${p_h2.periodo.descricao} - ${p_h2.periodo.inicio} a ${p_h2.periodo.fim}`);




            let provasInternas = [];

            let desc = p_h2.periodo.descricao.slice();
            let ini = p_h2.periodo.inicio.slice();
            let fim = p_h2.periodo.fim.slice();

            let newP = new Periodo_h2(desc, ini, fim);

            console.log(`LINHA 528 NEWP: ${desc} - ${ini} a ${fim}`);

            //let temProvas = false;

            for (const prova of provasGerais) {

                if (prova.tipo === "prova-doc") {

                    //ele transforma cada data em um novo documento provah2

                    prova.getDatas().forEach(data => {
                        let newProva = new Prova_h2(prova.descricao, data, "");
                        if (isProvaComumComprovandoDoPeriodo(newP.periodo, data)) {
                            //provasInternas.push(prova);
                            //newP = new Periodo_h2(periodo.descricao, periodo.inicio, periodo.fim);
                            newP.provas.push(newProva);
                            //p.validados.push(newP);
                        }

                    });

                    //se for qualquer outro tipo de prova que nãos eja newPeriodo ou "prova-doc"
                } else if (!(prova instanceof NewPeriodo)) {
                    {
                        let newProva = new Prova_h2(prova.descricao, prova.inicio, prova.fim);

                        if (prova.tipo == "sala" && isProvaPeriodoComprovandoDoPeriodo(newP.periodo, prova)) {

                            //if (isProvaPeriodoComprovandoDoPeriodo(newP.periodo, prova)) {
                            //let newP = new Periodo_h2(periodo.descricao, periodo.inicio, periodo.fim);
                            newP.provas.push(newProva);
                            //p.validados.push(newP);
                            // }

                        } else if (isProvaComumComprovandoDoPeriodo(newP.periodo, prova.inicio)) {
                            //let newP = new Periodo_h2(periodo.descricao, periodo.inicio, periodo.fim);
                            newP.provas.push(newProva);
                            //p.validados.push(newP);
                        }
                    }
                } /* else if (prova instanceof NewPeriodo) {

                    let newProva = new Prova_h2(prova.descricao, prova.inicio, prova.fim);

                    if (isProvaPeriodoComprovandoDoPeriodo(newP.periodo, prova)) {
                        //let newP = new Periodo_h2(periodo.descricao, periodo.inicio, periodo.fim);
                        newP.provas.push(newProva);
                        //p.validados.push(newP);
                    }

                } */
            }

            if (newP.provas.length == 0) {
                p.periodosNaoValidados.push(newP);

                //aqui tem que pegar os impedimentos
                for (const impedimento of impedimentosGerais) {

                    if (isImpedimentoComumAtrapalhandoPeriodo(newP.periodo, impedimento)) {
                        newP.impedimentos.push(impedimento);
                    }

                }



            } else {
                p.periodosValidados.push(newP);
            }
        }
    }
}

function isProvaComumComprovandoDoPeriodo(periodo, dataProva) {

    //console.log(`>>> LINHA 580 - PERIODO ${periodo.inicio} a ${periodo.fim}. Data da prova ${dataProva}`);

    //let dataProva = prova



    if (isDataInicioDentroDoPeriodo(dataProva, periodo)) {
        return true
    }

    return false;
}





function isProvaPeriodoComprovandoDoPeriodo(periodo, prova) {

    //console.log(`>>> LINHA 580 - PERIODO ${periodo.inicio} a ${periodo.fim}. Data da prova ${dataProva}`);

    //let dataProva = prova
    console.log(`************* ISPROVAPERIODOCOMPROVANDO`);

    if (isPeriodoContidoNaProva(periodo, prova)) {
        return true;
    }

    if (isDataInicioDentroDoPeriodo(prova.inicio, periodo) || isDataFimDentroDoPeriodo(prova.fim, periodo)) {
        return true
    }
    return false;
}

function isPeriodoContidoNaProva(periodo, prova) {

    console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
    console.log(("IS PERIODO CONTIDO NA PROVA"));
    console.log(`PERIODOS: ${periodo.descricao} de ${periodo.inicio} a ${periodo.fim}`);

    if (isDataInicioDentroDoPeriodo(periodo.inicio, prova)) {
        console.log(`periodo começa dentro da prova`);
        if (isDataFimDentroDoPeriodo(periodo.fim, prova)) {
            console.log(`periodo termina dentro da prova`);
            return true;
        } else {
            console.log(`periodo não termina dentro da prova`);
        }
    } else {
        console.log(`>>> periodo não está dentro da prova`);
    }

    return false;
}

function isImpedimentoComumAtrapalhandoPeriodo(periodo, impedimento) {

    //pegando as empresas ativas
    if (impedimento.tipo == "empresa") {
        if (impedimento.fim == "") {
            return true;
        }
    }

    //pegando os benefícios urbanos ativos
    if (impedimento.tipo == "beneficio") {
        if (impedimento.fim == "") {
            return true;
        }
    }

    if (isDataInicioDentroDoPeriodo(impedimento.inicio, periodo) || isDataFimDentroDoPeriodo(impedimento.fim, periodo)) {
        return true
    }

    return false;
}

function isPeriodoMenorOuIgualASeteAnosEMeio(periodo) {

    let duracao = [periodo.duracao.years, periodo.duracao.months, periodo.duracao.days];

    if (duracao[0] < 7 || (duracao[0] == 7 && duracao[1] < 6) || (duracao[0] == 7 && duracao[1] == 6 && duracao[2] == 0)) {
        return true;
    } else {
        return false;
    }
}

function fragmentaEmBlocosDeSeteAnosEMeio(periodo) {


    //periodo é um NewPeriodo, entidade interna ao p_h2

    console.log(`Linha 551 - vamos ver qual é a descrição do periodo: ${periodo.descricao}`);

    let descricao = periodo.descricao.slice();
    console.log(`LINHA 558 - ESTAMOS TRABALHANDO COM A DESCRICAO ${descricao}`);

    let blocosSeteAnosEMeio = [];

    let momentFim = deDataParaMomentjs(periodo.inicio);
    let inicioAuxiliar = deDataParaMomentjs(periodo.inicio);
    const momentFinal = deDataParaMomentjs(periodo.fim);

    if (isPeriodoMenorOuIgualASeteAnosEMeio(periodo)) {
        blocosSeteAnosEMeio.push(new Periodo_h2(descricao, periodo.inicio, periodo.fim));
        return blocosSeteAnosEMeio;
    }

    while (momentFim.isBefore(momentFinal)) {//enquanto o último período não alcançar a data fim
        momentFim.add(7, "year");
        momentFim.add(6, "month");

        blocosSeteAnosEMeio.push(new Periodo_h2(descricao, deMomentParaData(inicioAuxiliar), deMomentParaData(momentFim)));

        //abaixo levo de momento para data e volta para moment para que gere um outro objeto, do contrário é só ponteiro e ao alterar altera tudo
        inicioAuxiliar = deDataParaMomentjs((deMomentParaData(momentFim.add(1, "day"))));//para começar o próximo no dia seguinte ao último momento
        //console.log(retorno);

        let novoPeriodo = new NewPeriodo(" ", deMomentParaData(inicioAuxiliar), periodo.fim);
        //let duracao = novoPeriodo.duracao;

        if (isPeriodoMenorOuIgualASeteAnosEMeio(novoPeriodo)) {
            blocosSeteAnosEMeio.push(new Periodo_h2(descricao, deMomentParaData(inicioAuxiliar), periodo.fim));
            return blocosSeteAnosEMeio;
        }
    }

    return blocosSeteAnosEMeio;
    //return retorno;


    //&& duracaoDoPeriodo.months ) return `Entre ${}`;
}

function isUtilParaValidado(prova_h2, validado) {


    if (moment(deDataParaDataAmericana(prova_h2.inicio)).isBetween(deDataParaDataAmericana(validado.inicio), deDataParaDataAmericana(validado.fim), 'days', true)) {

        return true;

    }

    return false;


}


function qualADistanciaEntreDate1EDat2(date1, date2) {
    // se 1 for antes, retornar positivo
    //se 2 for antes, retornar negativo
    let valor = 0;
    let diff = "";
    if (isData1BeforeData2(date1, date2)) {
        valor = 1;
        diff = calculaDuracao(new NewPeriodo("", date1, date2));
    } else {
        diff = calculaDuracao(new NewPeriodo("", date2, date1));
        valor = -1;
    }

    return [diff.years * valor, diff.months * valor, diff.days * valor];

    //alert(`Com moment js: ${diff.years} anos, ${diff.months} meses, ${diff.days} dias`);
}




function isProva_h2ComprovandoDoPeriodo(periodo, prova) {


    if (isDataInicioDentroDoPeriodo(prova.inicio, periodo)) {
        return true
    } else if (prova.dataFim != "" && prova.dataFim != "sem dados") {
        isDataFimDentroDoPeriodo(prova.fim, periodo)
    }
    return false;
}

function isDataInicioDentroDoPeriodo(dataInicio, periodo) {
    //console.log(`LINHA 257: ${periodo.inicio}`);
    return isDataDentroDeUmPeriodo(dataInicio, periodo.inicio, periodo.fim);
}

function isDataFimDentroDoPeriodo(dataFim, periodo) {
    return isDataDentroDeUmPeriodo(dataFim, periodo.inicio, periodo.fim);
}

function isDataDentroDeUmPeriodo(data, periodoInicio, periodoFim) {
    //console.log(`LINHA 263: DATA ${data} periodoInicio ${periodoInicio} periodoFim ${periodoFim}`);

    //if (moment(deDataParaDataAmericana(data), "DD-MM-YYYY").isBetween(deDataParaDataAmericana(periodoInicio), deDataParaDataAmericana(periodoFim), 'days', true))
    if (moment(deDataParaDataAmericana(data)).isBetween(deDataParaDataAmericana(periodoInicio), deDataParaDataAmericana(periodoFim), 'days', true)) {
        return true;
    } else {
        return false;
    }
}

function getVespera(data) {

    return deMomentParaData(deDataParaMomentjs(data).subtract(1, "day"));

}

function getAmanha(data) {

    return deMomentParaData(deDataParaMomentjs(data).add(1, "day"));

}

function isData1BeforeData2(data1, data2) {
    return deDataParaMomentjs(data1).isBefore(deDataParaMomentjs(data2));
}