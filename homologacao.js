"use strict";

let h_periodosAutoDeclaradosArray = [];
let h_impedimentosHomologacaoArray = [];
let h_periodosAposPrimeiroFiltro = [];
let h_provasPorPeriodoFiltro2 = [];
let h_periodosHomologadosAposFiltro3 = [];

let periodosPossiveisPelasProvas = []; //os 15 anos que as provas alcanam (7,5 futuro, 7,5 passado)
let periodosCobertos = []; //periodos de intersecção entre o declarado e o coberto pelas provas
let periodosSemCobertura = []; //periodos que as provas não cobrem

let periodosSemCoberturaAbsoluta = [];

function aplicarImpedimentosERetornosAosPeriodosAutoDeclarados() {

    //periodosAutoDeclaradosArray - array com todos os períodos autodelcarados

    //impedimentosQueFragmentaramPeriodos - array com todos os impedimentos que fragmentaram os períodos

    //provasUteisAosPeriodos - array que tem todas as provas que foram úteis aos periodos homologados na primeira etapa

    //primeiro vou copiar o array de períodos autodeclarados para o h_periodosAutoDeclaradosArray
    copiaPeriodosAutoDeclarados()

    //agora vou coletar todos impedimentos
    coletarTodosImpedimentos();

    //vou utilizar o array de provas uteis aos períodos pois já está pronto
    //coletadas as provas

    //agora vou aplicar todos os impedimentos e ver o que sobra
    aplicarTodosImpedimentosSobreOsPeriodosAutodeclarados();//filtro #1


    console.log(`Após aplicar aplicarTodosImpedimentosSobreOsPeriodosAutodeclarados temos ${h_periodosAposPrimeiroFiltro.length} periodos`);

    h_periodosAposPrimeiroFiltro.forEach(e => {
        console.log(`LInha 33 - Periodo: ${e.inicio} a ${e.fim}`);
    });

    //agora vamos pegar os períodos filtrados na etapa 1 e filtrar
    iniciarOsPeriodosPosImpedimentosComAsProvas();//filtro #2

    console.log(`Após aplicar iniciarOsPeriodosPosImpedimentosComAsProvas temos ${h_periodosAposPrimeiroFiltro.length} periodos`);

    h_periodosAposPrimeiroFiltro.forEach(e => {
        console.log(`LInha 42 - Periodo: ${e.inicio} a ${e.fim}`);
    });

    //o filtro #3 que vai excluir os períodos que não tiverem prova
    //removerPeriodosSemProva();
    h_periodosHomologadosAposFiltro3 = h_periodosAposPrimeiroFiltro; //por hora não vou remover os que não tem prova

    console.log(`LINHA 48 DE HOMOLOGACAO. eSTAMOS COM ${h_periodosAposPrimeiroFiltro.length} PERIODOS`);

    //o filtro #4 que vai limitar cada prova a homologação de 7,5 anos
    //  - TODO aqui será a grande inovação: os 7,5 anos vai poder se mover para trás e para frente no tempo, não será rígido, mas limitando aos obstáculos


    // vou envolver cada prova em uma janela de 7,5 anos
    //    essa janela vai ter três 4 limitações
    //    1 - as bordas dos períodos autodeclarados
    //    2 - os impedimentos
    //    3 - 7,5 anos
    //    4 - se a prova for após um impedimento, ela só produzirá efeito a partir da sua data de emissão.
    //    As limitações 1 e 2 já foram aplicadas nos filtros anteriores, a limitação 3 será aplicada pela função abaixo
    limitarPeriodosPelasProvas();
    console.log(`LINHA 62 DE HOMOLOGACAO. eSTAMOS COM ${h_periodosAposPrimeiroFiltro.length} PERIODOS`);



    //vamos identificar os períodos sem cobertura absoluta, ou seja, os que nenhuma prova alcança
    getPeriodosSemCoberturaAbsoluta();

    //agora é o seguinte, vamos verificar se subtraindo os períodos sem sobertura absoluta dos declarados, se dá a carência
    let duracaoDeclaradosSemObstaculo = qualADuracaoDosPeriodosContidos(h_periodosAposPrimeiroFiltro);

    console.log(`--- Os perídos sem obstaculo totalizam: ${duracaoDeclaradosSemObstaculo[0]} anos, ${duracaoDeclaradosSemObstaculo[1]} meses e ${duracaoDeclaradosSemObstaculo[2]} dias;`);

    let duracaoSemCoberturaAbsoluta = qualADuracaoDosPeriodosContidos(periodosSemCoberturaAbsoluta);
    console.log(`--- Os perídos sem cobertura absoluta totalizam: ${duracaoSemCoberturaAbsoluta[0]} anos, ${duracaoSemCoberturaAbsoluta[1]} meses e ${duracaoSemCoberturaAbsoluta[2]} dias;`);

    console.log(`>>>>>>>>>>>>>>>>>>>> VAMOS COMPARAR OS PRÓPRIOS PERÍODOS DE COBERTURA ABSOLUTA <<<<<<<<<<<<<`);

    provasUteisAosPeriodos.forEach(e => {
        getInterseccaoEntrePeriodosSemCoberturaAbsoluta();
    });


    //vamos imprimir novamente
    let duracaoDeclaradosSemObstaculo2 = qualADuracaoDosPeriodosContidos(h_periodosAposPrimeiroFiltro);

    console.log(`--- Os perídos sem obstaculo totalizam: ${duracaoDeclaradosSemObstaculo2[0]} anos, ${duracaoDeclaradosSemObstaculo2[1]} meses e ${duracaoDeclaradosSemObstaculo2[2]} dias;`);

    let duracaoSemCoberturaAbsoluta2 = qualADuracaoDosPeriodosContidos(periodosSemCoberturaAbsoluta);
    console.log(`--- Os perídos sem cobertura absoluta totalizam: ${duracaoSemCoberturaAbsoluta2[0]} anos, ${duracaoSemCoberturaAbsoluta2[1]} meses e ${duracaoSemCoberturaAbsoluta2[2]} dias;`);


}

function qualADuracaoDosPeriodosContidos(arr) {

    let duracaoTotal = [0, 0, 0];//[anos, meses, dias]

    arr.forEach(e => {

        duracaoTotal[0] += Number(e.duracao.years);
        duracaoTotal[1] += Number(e.duracao.months);
        duracaoTotal[2] += Number(e.duracao.days);
    });

    return duracaoTotal;

    ////alert(`Com moment js: ${diff.years} anos, ${diff.months} meses, ${diff.days} dias`);

}

//vamos limitar a eficacia da prova a 7,5 anos e mover os períodos no tempo
function limitarPeriodosPelasProvas() {

    periodosPossiveisPelasProvas = []; //os 15 anos que as provas alcanam (7,5 futuro, 7,5 passado)
    periodosCobertos = []; //periodos de intersecção entre o declarado e o coberto pelas provas
    periodosSemCobertura = []; //periodos que as provas não cobrem


    console.log(`os periodos que vamos trabalha no ultimo metodo são ${h_periodosHomologadosAposFiltro3.length}`);
    h_periodosHomologadosAposFiltro3.forEach(e => {
        console.log(`Linha 77 - Periodo: ${e.inicio} a ${e.fim}`);
    });

    //primeiro vamos pegar os períodos (o que já foi verificado que têm provas e que não chocam com impedimentos)
    for (let i = 0; i < h_periodosHomologadosAposFiltro3.length; i++) {

        //periodosPossiveisPelasProvas = [];//vamos limpar o array de periodos possiveis pelas provas
        //periodosCobertos = []; //vamos limpar o Array de periodos de intersecção

        let periodo = h_periodosHomologadosAposFiltro3[i];

        //agora vamos verificar se o período é menor que 7,5 anos. Pq se for, não precisa limitar por provas
        if (!isPeriodoMenorOuIgualASeteAnosEMeio(periodo)) { //se o período for maior que 7,5 anos

            //vamos pegar as provas do periodo
            let provasDoPeriodo = getProvasDoPeriodoPeloIndiceDoPeriodo(i);

            //vamos percorrer as provas e criar um array de periodos que elas homologam
            for (let j = 0; j < provasDoPeriodo.length; j++) {

                let prova = provasDoPeriodo[j];

                //considerando a flexibilidade da cobertuda da prova, vou pegar todo o periodo possivel 7,5 anos para tras e 7,5 anos para frente
                let coberturaPossivelPelaProva = getPeriodoPossivelPelaProva(prova);

                //agora vamos guardar esse periodo para podermos decidir como usá-lo
                periodosPossiveisPelasProvas.push(coberturaPossivelPelaProva);
            }

            console.log("LINHA 99 OS PERIODOS COBERTOS PELAS PROVAS SÃO: ");
            periodosPossiveisPelasProvas.forEach(p => {
                console.log(`De ${p.inicio} a ${p.fim}`);
            });

            //neste ponto já temos todos os períodos permitidosp ela prova, então vamos decidir qual o melhor marco de início e fim de sua janela
            for (let j = 0; j < periodosPossiveisPelasProvas.length; j++) {

                let periodoPossivelPelaProva = periodosPossiveisPelasProvas[j];
                //lembrando que só estamos trabalhando com períodos superiores a 7,5 anos

                //vamos pegar o periodo e compará-lo com  cada janela criada por cada prova

                //pego a possível intersecção entre o periodo declarado e o que a prova conseguiria alcançar
                //lenbrando que primeiro tem que ser informando o periodo declarado 
                let coberturaDoPeriodoPelaProva = qualAInterceccaoEntreDoisPeriodos(periodo, periodoPossivelPelaProva);
                periodosCobertos.push(coberturaDoPeriodoPelaProva);
            }

            console.log("LINHA 118 OS válidos cobertos são: ");
            periodosCobertos.forEach(p => {
                console.log(`De ${p.inicio} a ${p.fim}`);
            });

            //eu não posso limitar a ver os períodos cobertos 
            //agora precisamos descobrir quais periodos foram declarados mas não são cobertos por prova alguma ou seja, períodos que não podem ser homologados
            for (let j = 0; j < periodosCobertos.length; j++) {

                console.log(`>>>>>>> analisando os periodos sem cobertura com relacao ao periodo De ${periodo.inicio} a ${periodo.fim}`);

                let cobertura = periodosCobertos[j];

                console.log(`>>> vamos verificar a diferença entre ${periodo.inicio} a ${periodo.fim} e ${cobertura.inicio} a ${cobertura.fim}`);
                let diferenca = qualADiferencaEntreDoisPeriodos(periodo, cobertura);

                if (diferenca instanceof Periodo) {
                    console.log(`----- linha 139: DIFERENÇA --- ${diferenca.inicio} a ${diferenca.fim}`);
                    periodosSemCobertura.push(diferenca);
                } else if (diferenca instanceof Array) {
                    diferenca.forEach(element => {
                        console.log(`----- linha 139: DIFERENÇA --- ${element.inicio} a ${element.fim}`);
                        periodosSemCobertura.push(element);
                    });
                }
            }

            console.log(`LINHA 138 OS PERÍODOS SEM COBERTURA SÃO ${periodosSemCobertura.length}: `);
            periodosSemCobertura.forEach(p => {
                console.log(`De ${p.inicio} a ${p.fim}`);
            });

            //vamos testar para ver o que já temos até aqui




        } else {
            //período menor que 7,5 anos e tem prova, então tá sussa
        }
    }

    //h_provasPorPeriodoFiltro2
    ////alert(`Com moment js: ${diff.years} anos, ${diff.months} meses, ${diff.days} dias`);

}

/* 
 Em qual período aplicar uma prova que pode se mover para trás ou para frente no tempo sem enocntrar objeção?
 Dependendo da forma como a prova é aplicada, fará a diferença entre a concessão e o indeferimento
 
 Possibilidades:
 1 - Aplicar a prova a partir de sua data
 2 - Aplicar a prova no meio do período - 45 meses para cada lado
 3 - Deixar o usuário escolher
    talvez essa opção seja interessante, considerando que documentos diferentes apresentam características diferentes, alguém não podem retroceder, como contratos de arrendamento ou escrituras
 4 - Fazer o computador calcular a maior cobertura possível com as provas apresentadas.


 Até o momento o código está fazendo a cobertura dupla (pegando cada prova e cobrindo 7,5 anos para frente e para trás), mas isso não pode ficar assim. 

 // primeiramente vou deixar o código funcional, para depois fazer estes ajustes.

*/

//agora eu quero saber quais sao os periodos que realmente não são cobertos por nenhuma prova
function getPeriodosSemCoberturaAbsoluta() {

    if (periodosSemCobertura.length > 1) {

        console.log("linha 204 período sem cobertura de tamanho " + periodosSemCobertura.length);

        periodosSemCoberturaAbsoluta = [];

        let i = 0;
        let j = 1;


        while (i < periodosSemCobertura.length) {
            while (j < periodosSemCobertura.length) {


                let diferenca = qualAInterceccaoEntreDoisPeriodos(periodosSemCobertura[i], periodosSemCobertura[j]);


                if (diferenca instanceof Periodo) {
                    console.log(`----- linha 214: DIFERENÇA --- ${diferenca.inicio} a ${diferenca.fim}`);
                    periodosSemCoberturaAbsoluta.push(diferenca);
                } else if (diferenca instanceof Array) {
                    diferenca.forEach(element => {
                        console.log(`----- linha 214: DIFERENÇA --- ${element.inicio} a ${element.fim}`);
                        periodosSemCoberturaAbsoluta.push(element);
                    });
                }
                j++;
            }
            i++;
            j = i + 1;
        }


    } else {

        periodosSemCoberturaAbsoluta.push(periodosSemCobertura[0]);
        console.log("linha 237 período sem cobertura de tamanho 0");

    }

    console.log(`>>>>>>>>>>>>>>>>>>LINHA 234 OS PERÍODOS SEM COBERTURA abusoluta são ${periodosSemCoberturaAbsoluta.length}: `);
    periodosSemCoberturaAbsoluta.forEach(p => {
        console.log(`De ${p.inicio} a ${p.fim}`);
    });

}

function getInterseccaoEntrePeriodosSemCoberturaAbsoluta() {


    let periodosSemCoberturaAbsoluta2 = [];

    if (periodosSemCoberturaAbsoluta.length > 1) {

        console.log("linha 282 período sem cobertura de tamanho " + periodosSemCoberturaAbsoluta.length);



        let i = 0;
        let j = 1;


        while (i < periodosSemCoberturaAbsoluta.length) {
            while (j < periodosSemCoberturaAbsoluta.length) {


                let diferenca = qualAInterceccaoEntreDoisPeriodos(periodosSemCoberturaAbsoluta[i], periodosSemCoberturaAbsoluta[j]);


                if (diferenca instanceof Periodo) {
                    console.log(`----- linha 214: DIFERENÇA --- ${diferenca.inicio} a ${diferenca.fim}`);
                    periodosSemCoberturaAbsoluta2.push(diferenca);
                } else if (diferenca instanceof Array) {
                    diferenca.forEach(element => {
                        console.log(`----- linha 214: DIFERENÇA --- ${element.inicio} a ${element.fim}`);
                        periodosSemCoberturaAbsoluta2.push(element);
                    });
                }
                j++;
            }
            i++;
            j = i + 1;
        }


    } else {

        periodosSemCoberturaAbsoluta2.push(periodosSemCobertura[0]);
        console.log("linha 316 período sem cobertura de tamanho 1");

    }

    console.log(`>>>>>>>>>>>>>>>>>>LINHA 320 OS PERÍODOS SEM COBERTURA abusoluta são ${periodosSemCoberturaAbsoluta2.length}: `);
    periodosSemCoberturaAbsoluta2.forEach(p => {
        console.log(`De ${p.inicio} a ${p.fim}`);
    });

    periodosSemCoberturaAbsoluta = periodosSemCoberturaAbsoluta2;

}





//função que retorna um array com os periodos de diferença entre dois periodos
//o periodo A é o mais importante, pq é o período autodeclarado que chegou aprovado até esta etapa
//o periodo B é a possivel cobertura das provas
//então a função retorna um array com os periodos de A que não são cobertos por B
function qualADiferencaEntreDoisPeriodos(a, b) {

    let periodosSemCobertura = [];

    //primeiro vamos verificar quem começa primeiro
    if (qualPeriodoComecaPrimeiro(a, b) == a) {// se a começa primeiro

        //agora vamos verificar qual periodo termina primeiro
        if (qualPeriodoTerminaPrimeiro(a, b) == a) {//se a termina primeiro

            if (isData1BeforeData2(a.fim, b.inicio)) {//a termina antes do início de B

                //não há cobertura, portanot retorne todo o A
                //periodosSemCobertura.push(new Periodo(getAmanha(a.inicio.slice()), a.fim.slice())) //Cenário 5
                //return new Periodo(getAmanha(a.inicio.slice()), a.fim.slice()); //Cenário 5;
                return new Periodo(a.inicio.slice(), a.fim.slice()); //Cenário 5;

            } else {//a termina quando B já tinha começado 

                //a primeiro pedaço de A que nao foi coberto
                //periodosSemCobertura.push(new Periodo(a.inicio.slice(), getVespera(b.inicio.slice())));//Cenário #1
                return new Periodo(a.inicio.slice(), getVespera(b.inicio.slice()));//Cenário #1
            }

        } else {//a começa primeiro, B termina primeiro // Cenário #2

            //a primeiro pedaço de A que nao foi coberto
            periodosSemCobertura.push(new Periodo(a.inicio.slice(), getVespera(b.inicio.slice())));

            //o final de A que novamente não foi coberto
            if (b.fim.slice() != a.fim.slice()) {
                periodosSemCobertura.push(new Periodo(getAmanha(b.fim.slice()), a.fim.slice()));
            }


            return periodosSemCobertura;

        }
    } else {//B começa primeiro

        //agora vamos verificar qual periodo termina primeiro
        if (qualPeriodoTerminaPrimeiro(a, b) == a) {//se a termina primeiro{

            //todo o A foi coberto
            //return 0; // para mostrar que não houve área sem cobertura //cenario #3
            return 0;

        } else { // B começa prmieiro, B termina primeiro

            if (isData1BeforeData2(b.fim, a.inicio)) { // se o be termina antes do A começar   // Cenário 6, nada foi coberto
                //periodosSemCobertura.push(new Periodo(a.inicio.slice(), a.fim.slice()));
                return new Periodo(a.inicio.slice(), a.fim.slice()); // Cenário 6, nada foi coberto
            } else { // se b termina dentro de A 
                //periodosSemCobertura.push(new Periodo(getAmanha(b.fim.slice()), a.fim.slice())); // Cenário 4
                return new Periodo(getAmanha(b.fim.slice()), a.fim.slice()); // Cenário 4
            }
        }
    }

    //return periodosSemCobertura;
}

function getVespera(data) {

    return deMomentParaData(deDataParaMomentjs(data).subtract(1, "day"));

}

function getAmanha(data) {

    return deMomentParaData(deDataParaMomentjs(data).add(1, "day"));

}

//o periodo A é o mais importante, pq é o período autodeclarado que chegou aprovado até esta etapa
//o período B é fictício, são os 15 anos de possibilidade de alcance da prova
//então o possível periodo de homologação nunca pode ser anterior ao início de A
function qualAInterceccaoEntreDoisPeriodos(a, b) {

    //primeiro vamos verificar quem começa primeiro
    if (qualPeriodoComecaPrimeiro(a, b) == a) {// se a começa primeiro

        //agora vamos verificar qual periodo termina primeiro
        if (qualPeriodoTerminaPrimeiro(a, b) == a) {//se a termina primeiro

            //então a começa primeiro e termina primeiro

            //agora eu preciso saber se A terminou antes ou depois de B começar
            if (isData1BeforeData2(a.fim, b.inicio)) {//a terminou antes de b começar >>>> Cenário #5

                return 0;//vou retornar 0 para marcar que não tem intercecção

            } else {//a terminou quando b já tinha começado
                return new Periodo(b.inicio.slice(), a.fim.slice()); //Cenário #1
            }

        } else { // se b termina primeiro

            //então a começa primeiro mas b termina primeiro
            return new Periodo(b.inicio.slice(), b.fim.slice()); // Cenário #2
        }
    } else {//se b começa primeiro

        //agora vamos verificar qual periodo termina primeiro
        if (qualPeriodoTerminaPrimeiro(a, b) == a) {//se a termina primeiro

            //então B começa primeiro e A termina primeiro          

            return new Periodo(a.inicio.slice(), a.fim.slice()); // Cenário #3

        } else { // se b termina primeiro

            //agora eu preciso saber se B começou antes ou depois de A ter terminado
            if (isData1BeforeData2(b.fim.slice(), a.inicio.slice())) {//b começa primeiro, b termina primeiro, antes do inicio de a começar

                return 0;//não há intersecção //Cenário #6

            } else { //b termina depepois de A ter começado

                return new Periodo(a.inicio.slice(), b.fim.slice());//Cenário #4
            }
        }
    }
}

// if (moment(deDataParaDataAmericana(a.inicio)).isBetween(deDataParaDataAmericana(b.inicio), deDataParaDataAmericana(b.fim), 'days', true)) {

function qualPeriodoComecaPrimeiro(a, b) {

    if (isData1BeforeData2(a.inicio, b.inicio)) {
        return a;
    } else {
        return b;
    }
}

function qualPeriodoTerminaPrimeiro(a, b) {

    if (isData1BeforeData2(a.fim, b.fim)) {
        return a;
    } else {
        return b;
    }
}

function getPeriodoPossivelPelaProva(prova) {

    let data = prova.dataInicio;

    let momen = deDataParaMomentjs(data);

    momen.add(7, "year");
    momen.add(6, "month");

    let futuro = deMomentParaData(momen);

    momen = deDataParaMomentjs(data);

    momen.subtract(7, "year");
    momen.subtract(6, "month");

    let passado = deMomentParaData(momen);

    return new Periodo(passado, futuro);
}

function getProvasDoPeriodoPeloIndiceDoPeriodo(indiceDoPeriodo) {

    let provasDoPeriodo = [];

    for (let i = 0; i < h_provasPorPeriodoFiltro2.length; i++) {

        let subArray = h_provasPorPeriodoFiltro2[i];

        let indice = subArray[0];
        let prova = subArray[1];

        if (indice == indiceDoPeriodo) {
            provasDoPeriodo.push(prova)
        }
    }

    return provasDoPeriodo;
}

function isPeriodoMenorOuIgualASeteAnosEMeio(periodo) {

    if (periodo.duracao.years < 7) {
        return true;
    } else if (periodo.duracao.years == 7 && periodo.duracao.months < 6) {
        return true;
    } else if (periodo.duracao.years == 7 && periodo.duracao.months == 6 && periodo.duracao.days == 0) {
        return true;
    } else {
        return false;
    }
}

/* function isUtilParaAlgumPeriodo(data, descricao) {
 
    //   class Prova {
     //   constructor(descricao, dataInicio, dataFim) {
 
 
    for (let i = 0; i < blocosSeteAnosEMeio.length; i++) {
        if (moment(deDataParaDataAmericana(data)).isBetween(deDataParaDataAmericana(blocosSeteAnosEMeio[i].inicio), deDataParaDataAmericana(blocosSeteAnosEMeio[i].fim), 'days', true)) {
 
            provasUteisAosPeriodos.push(new Prova(descricao, data, ""));
 
        }
    }
 
} */

function removerPeriodosSemProva() {

    //vamos limpar o array
    h_periodosHomologadosAposFiltro3 = [];

    //vamos percorrer os períodos
    for (let i = 0; i < h_periodosAposPrimeiroFiltro.length; i++) {

        let periodo = h_periodosAposPrimeiroFiltro[i];

        //e vamos percorrer as provas
        for (let j = 0; j < h_provasPorPeriodoFiltro2.length; j++) {

            let prova = h_provasPorPeriodoFiltro2[j];//aqui prova é bidimensional [indiceDoPeriodo, prova]

            //se esta prova pertencer a este periodo
            if (prova[0] == i) {

                //vamos coletá-lo
                let jaTem = false;
                h_periodosHomologadosAposFiltro3.forEach(e => {
                    if (e == periodo) {
                        jaTem = true;
                    }
                });

                if (!jaTem) {
                    h_periodosHomologadosAposFiltro3.push(periodo);
                }
            }
        }
    }


    //por fim, vamos coletar novamente as provas por período pois ao excluir alguns períodos o indice foi alterado
    coletandoAsProvasNosPeriodosJaRedatados(h_periodosHomologadosAposFiltro3);
}



function copiaPeriodosAutoDeclarados() {

    h_periodosAutoDeclaradosArray = [];

    for (let i = 0; i < periodosAutoDeclaradosArray.length; i++) {
        //verifique se tem algum impedimento dentro do período

        h_periodosAutoDeclaradosArray.push(new Periodo(periodosAutoDeclaradosArray[i].inicio.slice(), periodosAutoDeclaradosArray[i].fim.slice()));
    }

    console.log(`h_periodosAutoDeclaradosArray tem ${h_periodosAutoDeclaradosArray.length} itens.`);

}

function coletarTodosImpedimentos() {


    //limpando o array
    h_impedimentosHomologacaoArray = [];

    //primeiro eu vou coletar todos os impedimentos em um unico array descritivo
    for (let i = 0; i < impedimentosArray.length; i++) {
        if (impedimentosArray[i] instanceof Vinculo) {
            let vinculo = impedimentosArray[i];
            //let descricao = `Vínculo: ${vinculo.empregador} - ${vinculo.inicio} a ${vinculo.fim}${vinculo.nota != "" ? "," + vinculo.nota : ""};`;
            let descricao = `Vínculo: ${vinculo.empregador}${vinculo.nota != "" ? ", " + vinculo.nota : ""};`;
            h_impedimentosHomologacaoArray.push(new ImpedimentoHomologacao(vinculo.inicio, vinculo.fim, descricao));
        } else if (impedimentosArray[i] instanceof Beneficio) {
            let beneficio = impedimentosArray[i];
            let descricao = `Benefício urbano: ${beneficio.especie}/${beneficio.nb} - ${beneficio.inicio} a ${beneficio.fim}${beneficio.nota != "" ? ", " + beneficio.nota : ""};`;
            h_impedimentosHomologacaoArray.push(new ImpedimentoHomologacao(beneficio.inicio, beneficio.fim, descricao));
        } else if (impedimentosArray[i] instanceof Atividade) {
            let atividade = impedimentosArray[i];
            let descricao = `Atividade urbana: ${atividade.atividade} - ${atividade.inicio} a ${atividade.fim}${atividade.isAtiva == "sim" ? " - ativa" : ""}`;
            h_impedimentosHomologacaoArray.push(new ImpedimentoHomologacao(atividade.inicio, atividade.fim, descricao));
        } else if (impedimentosArray[i] instanceof Empresa) {
            let empresa = impedimentosArray[i];
            let descricao = `Empresa urbana: ${empresa.nome}, CNPJ/CEI: ${empresa.cnpjCei}, CNAE: ${empresa.cnae} - ${empresa.inicio} a ${empresa.fim}${empresa.isAtiva == "sim" ? " - ativa" : ""}`;
            h_impedimentosHomologacaoArray.push(new ImpedimentoHomologacao(empresa.inicio, empresa.fim, descricao));
        } else if (impedimentosArray[i] instanceof Prova) {
            let prova = impedimentosArray[i];
            let descricao = `Indício em contrário: ${prova.descricao} - ${prova.dataInicio} a ${prova.dataFim}`;
            h_impedimentosHomologacaoArray.push(new ImpedimentoHomologacao(prova.dataInicio, prova.dataFim, descricao));
        }
    }

}

//>>>>>>>>>>>>>>>>>>>>>> FILTRO Nº 1
function aplicarTodosImpedimentosSobreOsPeriodosAutodeclarados() {

    h_periodosAposPrimeiroFiltro = [];//limpando primeiro filtro

    //vamos percorrer os períodos autodeclarados e subtrair os impedimentos
    for (let i = 0; i < h_periodosAutoDeclaradosArray.length; i++) {

        let periodo = h_periodosAutoDeclaradosArray[i];
        let temImpedimentoNoPeriodo = false;


        //agora vamos percorrer os impedimentos
        for (let j = 0; j < h_impedimentosHomologacaoArray.length; j++) {

            //agora vamos ver se tem algum impedimento dentro dos períodos auto declarados
            //se tiver, vamos quebrar os periodos removendo os periodos de impedimentos
            //lembrando que o periodo após o obstáculo só pode começar a contar a partir da primeira prova favorável

            let impedimentoH = h_impedimentosHomologacaoArray[j];

            //se a data de início do impedimento está dentro do período
            if (isDataDentroDeUmPeriodo(impedimentoH.inicio, periodo.inicio, periodo.fim)) {

                temImpedimentoNoPeriodo = true;

                //como o impedimento esta dentro do periodo
                //    se eu subtrair o impedimento do periodo eu terei de colocar uma data de início, que no caso, é a primeira prova ou o começo do período (antes do impedimento)
                //        o que vier antes do impedimento é um período que terá de ter uma prova dentro

                //se a data de término do impedimento também está dentro do período
                if (isDataDentroDeUmPeriodo(impedimentoH.fim, periodo.inicio, periodo.fim)) {

                    //neste ponto, o inínio e o fim do impedimento estão dentro do período

                    //pegando o que vier antes do impedimento
                    h_periodosAposPrimeiroFiltro.push(new Periodo(periodo.inicio, getVesperaDaData(impedimentoH.inicio)));

                    //pegando o que vier depois do impedimento
                    h_periodosAposPrimeiroFiltro.push(new Periodo(getDiaSeguinte(impedimentoH.fim), periodo.fim));

                } else {// o período termina antes do impedimento terminar

                    //pegando o que vier antes do impedimento
                    h_periodosAposPrimeiroFiltro.push(new Periodo(periodo.inicio, getVesperaDaData(impedimentoH.inicio)));
                }
            } else {//o impedimento não é dentro do período

            }
        }

        if (!temImpedimentoNoPeriodo) {//se rodou todo o for de impedimentos e não tem impedimento no período, então recepcione o periodo inteiro
            h_periodosAposPrimeiroFiltro.push(periodo);//então vamos recepcionar o periodo todo
        }
    }
}

//filtro #2
function iniciarOsPeriodosPosImpedimentosComAsProvas() {

    //h_provasPorPeriodoFiltro2 = [];

    console.log(`LINHA 492 DE HOMOLOGACAO. eSTAMOS COM ${h_periodosAposPrimeiroFiltro.length} PERIODOS`);

    //vamos percorrer os períodos oriundos do primeiro filtro
    for (let j = 0; j < h_periodosAposPrimeiroFiltro.length; j++) {

        let periodo = h_periodosAposPrimeiroFiltro[j];

        //e vamos percorrer as provasUteisAosPeriodos já coletadas de forma simplificada no script
        let primeiraProvaDentroDoPeriodo = "";
        for (let i = 0; i < provasUteisAosPeriodos.length; i++) {

            let prova = provasUteisAosPeriodos[i];

            //agora vamos ver se a prova esta dentro do período
            if (isDataDentroDeUmPeriodo(prova.dataInicio, periodo.inicio, periodo.fim)) {

                //Como vou saber que aquela prova é a primeira dentro do período?
                if (primeiraProvaDentroDoPeriodo != "" && isData1BeforeData2(prova.dataInicio, primeiraProvaDentroDoPeriodo.dataInicio)) {
                    primeiraProvaDentroDoPeriodo = prova;
                } else if (primeiraProvaDentroDoPeriodo == "") {
                    primeiraProvaDentroDoPeriodo = prova;
                }

                //vamos armazenar o id do período e a prova em um array bidimencional
                //h_provasPorPeriodoFiltro2.push([j, prova]);
            }
        }

        //se NAO for o inicio de algum período autodeclarado, altere a data de inicio do período para a data da primeira prova
        if (!isPeriodoInicioDeAlgumAutodeclarado(periodo) && primeiraProvaDentroDoPeriodo != "") {
            console.log(`LINHA 562 -${periodo.inicio} - COMEÇO DE AUTODECLARADO? ${isPeriodoInicioDeAlgumAutodeclarado(periodo)}`);
            periodo.inicio = primeiraProvaDentroDoPeriodo.dataInicio.slice();
        } else {
            console.log(`LINHA 562 -${periodo.inicio} - COMEÇO DE AUTODECLARADO? ${isPeriodoInicioDeAlgumAutodeclarado(periodo)}`);
        }
    }

    coletandoAsProvasNosPeriodosJaRedatados(h_periodosAposPrimeiroFiltro);
    console.log(`LINHA 527 DE HOMOLOGACAO. eSTAMOS COM ${h_periodosAposPrimeiroFiltro.length} PERIODOS`);
}

function coletandoAsProvasNosPeriodosJaRedatados(periodosArray) {

    h_provasPorPeriodoFiltro2 = [];

    for (let j = 0; j < periodosArray.length; j++) {

        let periodo = periodosArray[j];

        //e vamos percorrer as provasUteisAosPeriodos já coletadas de forma simplificada no script
        for (let i = 0; i < provasUteisAosPeriodos.length; i++) {

            let prova = provasUteisAosPeriodos[i];

            //agora vamos ver se a prova esta dentro do período
            if (isDataDentroDeUmPeriodo(prova.dataInicio, periodo.inicio, periodo.fim)) {

                //vamos armazenar o id do período e a prova em um array bidimencional
                h_provasPorPeriodoFiltro2.push([j, prova]);
            }
        }
    }
}


function isData1BeforeData2(data1, data2) {
    return deDataParaMomentjs(data1).isBefore(deDataParaMomentjs(data2));
}

function isPeriodoInicioDeAlgumAutodeclarado(periodo) {

    let isInicio = false;
    for (let k = 0; k < h_periodosAutoDeclaradosArray.length; k++) {

        if (periodo.inicio == h_periodosAutoDeclaradosArray[k].inicio) {
            isInicio = true;
        }
    }
    return isInicio;
}

function getVesperaDaData(data) {
    return deMomentParaData(deDataParaMomentjs(data).subtract(1, "day"));
}

function getDiaSeguinte(data) {
    return deMomentParaData(deDataParaMomentjs(data).add(1, "day"));
}

function isDataDentroDeUmPeriodo(data, periodoInicio, periodoFim) {
    if (moment(deDataParaDataAmericana(data)).isBetween(deDataParaDataAmericana(periodoInicio), deDataParaDataAmericana(periodoFim), 'days', true)) {
        return true;
    } else {
        return false;
    }
}
