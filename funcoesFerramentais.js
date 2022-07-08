"use strict";


function getDataHoje() {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();

    today = dd + '/' + mm + '/' + yyyy;

    return today;
}



function getData(dataEntrada) {

    const data = dataEntrada.split("-")
    const ano = data[0];
    const mes = data[1];
    const dia = data[2];

    if (dataEntrada == undefined || dataEntrada == "") {
        //return "sem dados"
        return "";
    } else {
        return `${dia}/${mes}/${ano}`;
    }
}

function calculaAnoQueCompletouIdadeDesejada(idadeDesejada) {

    const ano = dataNascimento.split("-")[0];

    return (Number(ano) + idadeDesejada);



}


//rural, pescador, indigena, extrativista
function checaSeJaTemACategoriaSeNaoTiverInclua(categoria) {

    let jaTem = false;

    for (const cat of categoriasTrabalhador) {
        if (cat == categoria) {
            jaTem = true;
        }
    }

    if (!jaTem) {

        //console.log(`>>>>>>>>>> vamos incluir a categoria ${categoria}`);
        categoriasTrabalhador.push(categoria.slice());

        removeCategoriasMarcadorasDeIndefinicao();
        return true;
    } else {
        return false;
    }
}

function removeCategoriasMarcadorasDeIndefinicao() {

    let newCat = [];

    let temAlgumaValida = false;

    for (const cat of categoriasTrabalhador) {
        if (cat != "nao-indigena" && cat != "nao-identificado") {
            newCat.push(cat);
            temAlgumaValida = true;
        }
    }

    if (temAlgumaValida) {
        categoriasTrabalhador = newCat;
    }

}


function calculaIdade() {

    const dn = dataNascimento.split("-")
    const ano_aniversario = dn[0];
    const mes_aniversario = dn[1];
    const dia_aniversario = dn[2];

    const d = der.split("-");
    const ano_der = d[0];
    const mes_der = d[1];
    const dia_der = d[2];

    let quantos_anos = ano_der - ano_aniversario;

    if (mes_der < mes_aniversario || mes_der == mes_aniversario && dia_der < dia_aniversario) {
        quantos_anos--;
    }

    return quantos_anos < 0 ? 0 : quantos_anos;

}

function pvnvSortFunction(a, b) {
    return newSortFunction(a[1].periodo, b[1].periodo);
}


function newSortFunction(a, b) {

    let dataA = a.inicio.slice();//clona a string
    let dataB = b.inicio.slice();

    let aSplit = dataA.split("/")
    let anoA = aSplit[2];
    let mesA = aSplit[1];
    let diaA = aSplit[0];

    dataA = `${anoA}${mesA}${diaA}`;

    let bSplit = dataB.split("/")
    let anoB = bSplit[2];
    let mesB = bSplit[1];
    let diaB = bSplit[0];

    dataB = `${anoB}${mesB}${diaB}`;

    /*     dataA = dataA.replace(/\//g, ""); //retira as barras das datas
        dataB = dataB.replace(/\//g, ""); */
    //console.log("Data A: " + dataA);
    //console.log("Data B: " + dataB);

    if (dataA < dataB) {
        return -1;
    } else {
        return true;
    }

}






function sortFunction(a, b) {//a e b são duas provas ou provasUnicas
    //return (a.inicio - b.inicio) //faz com que o array seja ordenado numericamente e de ordem crescente.
    //replace let x = x.replace("/","");
    //clonar string 
    // creates a new string without modifying the original string
    //const new_str = str.slice();
    console.log("ENTROU EM REPROCESSA PROVAS");
    if (!(a instanceof ProvaUnica) && !(b instanceof ProvaUnica)) { //se nenhum for prova única
        let dataA = a.inicio.slice();//clona a string
        let dataB = b.inicio.slice();

        let aSplit = dataA.split("/")
        let anoA = aSplit[2];
        let mesA = aSplit[1];
        let diaA = aSplit[0];

        dataA = `${anoA}${mesA}${diaA}`;

        let bSplit = dataB.split("/")
        let anoB = bSplit[2];
        let mesB = bSplit[1];
        let diaB = bSplit[0];

        dataB = `${anoB}${mesB}${diaB}`;

        /*     dataA = dataA.replace(/\//g, ""); //retira as barras das datas
            dataB = dataB.replace(/\//g, ""); */
        console.log("Data A: " + dataA);
        console.log("Data B: " + dataB);

        if (dataA < dataB) {
            return -1;
        } else {
            return true;
        }
    } else if ((a instanceof ProvaUnica) && (b instanceof ProvaUnica)) { //se ambas forem provas únicas
        //daí eu vou ordenar considerando somente a prmieira data de cada prova

        let dataA = a.dataArray[0].slice();//clona a string, no caso a primeira data da prova única
        let dataB = b.dataArray[0].slice();
        /*     dataA = dataA.replace(/\//g, ""); //retira as barras das datas
            dataB = dataB.replace(/\//g, ""); */

        let aSplit = dataA.split("/")
        let anoA = aSplit[2];
        let mesA = aSplit[1];
        let diaA = aSplit[0];

        dataA = `${anoA}${mesA}${diaA}`;

        let bSplit = dataB.split("/")
        let anoB = bSplit[2];
        let mesB = bSplit[1];
        let diaB = bSplit[0];

        dataB = `${anoB}${mesB}${diaB}`;


        console.log("Data A: " + dataA);
        console.log("Data B: " + dataB);

        if (dataA < dataB) {
            return -1;
        } else {
            return true;
        }

    }
}

//ordena as datas da prova unica internamente
function ordenaDatasDaProvaUnica(provaUnica) {
    let datas = provaUnica.dataArray;

    datas.sort(function (a, b) { //isso é só para números simples
        let dataA = a.slice();//clona a string
        let dataB = b.slice();
        /* dataA = dataA.replace(/\//g, ""); //retira as barras das datas
        dataB = dataB.replace(/\//g, ""); */

        let aSplit = dataA.split("/")
        let anoA = aSplit[2];
        let mesA = aSplit[1];
        let diaA = aSplit[0];

        dataA = `${anoA}${mesA}${diaA}`;

        let bSplit = dataB.split("/")
        let anoB = bSplit[2];
        let mesB = bSplit[1];
        let diaB = bSplit[0];

        dataB = `${anoB}${mesB}${diaB}`;

        console.log("Data A: " + dataA);
        console.log("Data B: " + dataB);

        if (dataA < dataB) {
            return -1;
        } else {
            return true;
        }
    });

}

function separaPeriodosEmBlocosDeSeteAnosEMeio(periodoDeclarado) {

    //console.log("linha 1337");


    let duracaoDoPeriodo = calculaDuracao(periodoDeclarado); //em diff {years : 0, months : 1, days : 2, hours : 3, minutes : 4, seconds  */

    //console.log(`O período durou ${duracaoDoPeriodo.years} anos, ${duracaoDoPeriodo.months} meses, ${duracaoDoPeriodo.days} dias`);

    //let retorno = [];
    let momentFim = deDataParaMomentjs(periodoDeclarado.inicio);
    let inicioAuxiliar = deDataParaMomentjs(periodoDeclarado.inicio);
    const momentFinal = deDataParaMomentjs(periodoDeclarado.fim);

    //let resp = momentFim.isBefore(momentFinal, 'day');
    while (momentFim.isBefore(momentFinal)) {//enquanto o último período não alcançar a data fim
        console.log("linha 1351");
        //se uma prova for suficiente (periodo menor que 7,5 anos)
        if (duracaoDoPeriodo.years < 7 || (duracaoDoPeriodo.years == 7 && duracaoDoPeriodo.months <= 6)) {
            //console.log("menores de 7 anos");
            //retorno += `Entre ${deMomentParaData(inicioAuxiliar)} e ${periodoDeclarado.fim};<br>`;
            blocosSeteAnosEMeio.push(new Periodo(deMomentParaData(inicioAuxiliar), periodoDeclarado.fim));
            //console.log(retorno);
            momentFim = momentFinal;
        } else { // nesta caso vamos precisar quebrar em períodos de 7,5 anos cada
            //console.log("Estamos em períodos maiores que 7,5 anos");

            //momentFim = addSeteAnosEMeioADataInformada(periodoDeclarado.inicio);
            momentFim.add(7, "year");
            momentFim.add(6, "month");
            //console.log(`INICIO AUXILIAR: ${deMomentParaData(inicioAuxiliar)} A MOMENTFIM: ${deMomentParaData(momentFim)}`);
            //retorno += `Entre ${deMomentParaData(inicioAuxiliar)} e ${deMomentParaData(momentFim)};<br>`;
            blocosSeteAnosEMeio.push(new Periodo(deMomentParaData(inicioAuxiliar), deMomentParaData(momentFim)));

            //abaixo levo de momento para data e volta para moment para que gere um outro objeto, do contrário é só pondeito e ao alterar altera tudo
            inicioAuxiliar = deDataParaMomentjs((deMomentParaData(momentFim.add(1, "day"))));//para começar o próximo no dia seguinte ao último momento
            //console.log(retorno);

            let novoPeriodo = new Periodo(deMomentParaData(inicioAuxiliar), periodoDeclarado.fim);
            duracaoDoPeriodo = novoPeriodo.duracao;


        }
    }

    //return retorno;


    //&& duracaoDoPeriodo.months ) return `Entre ${}`;
}


function getDataMais7anosEmeio(data) {
    //primeiro, vamos verificar se o periodo autodeclarado vai para alem de seteAnosEMeio
    //if(calculaDuracao(periodoDeclarado))

    let momentAuxiliar = deDataParaMomentjs(data);

    momentAuxiliar.add(7, "year");
    momentAuxiliar.add(6, "month");

    return deMomentParaData(momentAuxiliar);

}

function getBlocosDePeriodos() {

    //cada período autodeclarado tem uma data de inicio e uma data de fim (na ausência, usar a DER);
    //se o período for superior a 7,5 anos, quebra-lo em pedaços de 7,5 anos
    //se não for, deixar inteiro

    blocosSeteAnosEMeio = [];//limpando o array
    for (let i = 0; i < periodosAutoDeclaradosArray.length; i++) {
        /* autodeclarados += ` &nbsp;&nbsp; &nbsp;&nbsp;Categoria: ${periodosAutoDeclaradosArray[i].categoria}`;
        autodeclarados += `<br> &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;Período: ${periodosAutoDeclaradosArray[i].inicio} a ${periodosAutoDeclaradosArray[i].fim}<br>`; */

        //console.log(`VAMOS CALCULAR OS BLOCOS DO PERIODO ${periodosAutoDeclaradosArray[i].categoria}`);

        separaPeriodosEmBlocosDeSeteAnosEMeio(periodosAutoDeclaradosArray[i]);

    }

}

function isData1BeforeData2(data1, data2) {
    return deDataParaMomentjs(data1).isBefore(deDataParaMomentjs(data2));
}

function retiraConcomitancia(ar) {

    let full = ar.slice();
    let i = 0;

    //se só tiver um, já retorne ele, não há concomitância
    if (full.length == 1) {
        return full;
    }

    let limpos = [];

    let anterior = full[0];
    let atual = full[1];

    let tamanhoOrigianal = full.length;

    while (i < full.length) {

        //console.log(`..... IMPRIMINDO TODOS EM i = ${i}`);
        for (const p of full) {

            //console.log(`p - ${p.descricao}: ${p.inicio} a ${p.fim}`);
        }

        if (i > 0) {

            /*  if (i == full.length) {
 
                 anterior = full[full.length - 2];
                 atual = full[full.length - 1];
 
             } else { */
            anterior = full[i - 1];
            atual = full[i];
            //}

        }

        //console.log(`--- vamos comparar ANTERIOR - ${anterior.descricao}: ${anterior.inicio} a ${anterior.fim}`);
        //console.log(`--- vamos comparar ATUAL - - ${atual.descricao}: ${atual.inicio} a ${atual.fim}`);

        let retorno = removeConcomitanciaRetonandoPeriodoUniao(anterior, atual);

        if (retorno != false) { //se ele pegou a união dos periodos

            let indiceDoAnterior = -1;
            for (let j = 0; j < full.length; j++) {
                if (full[j] == anterior) {
                    indiceDoAnterior = j;
                }
            }

            let indiceDoAtual = -1;
            for (let j = 0; j < full.length; j++) {
                if (full[j] == atual) {
                    indiceDoAtual = j;
                }
            }

            //full.shift();
            //full.shift();

            full[indiceDoAtual] = retorno;//coloco o retorno na posição do segundo
            full.splice(indiceDoAnterior, 1);//removo o primeiro elemento

            for (let j = 0; j < full.length; j++) {
                if (full[j] == retorno) {
                    i = j;
                }
            }

            //i = i - 1;
            //limpos.push(retorno);//grava o período unificado
            //console.log(`retorno - ${retorno.descricao}: ${retorno.inicio} a ${retorno.fim}`);
            //limpo = retorno;
        } else {//se não tem concomitância, grave os dois periodos
            //limpos.push(anterior);
            //console.log(`retorno ANTERIOR - ${anterior.descricao}: ${anterior.inicio} a ${anterior.fim}`);
            //limpos.push(atual);
            //console.log(`retorno ATUAL- ${atual.descricao}: ${atual.inicio} a ${atual.fim}`);
            //i++;
        }
        i++;
    }

    return full;

}

function removeConcomitanciaRetonandoPeriodoUniao(a, b) {

    let inicioApoio = "";
    let fimApoio = "";

    if (temConcomitancia(a, b)) {
        if (isData1BeforeData2(a.inicio, b.inicio)) {//se a começa antes de B

            inicioApoio = a.inicio;

            if (isData1BeforeData2(a.fim, b.fim)) {// se A termina antes de B
                fimApoio = b.fim.slice();
            } else {//se B termina primeiro
                fimApoio = a.fim.slice();
            }
        } else {//se B começa antes de A
            inicioApoio = b.inicio.slice();

            if (isData1BeforeData2(a.fim, b.fim)) {// se A termina antes de B
                fimApoio = b.fim.slice();
            } else {//se B termina primeiro
                fimApoio = a.fim.slice();
            }
        }
    } else {
        return false;
    }

    return new NewPeriodo(`(${a.descricao}-${b.descricao})`, inicioApoio, fimApoio);
}

function temConcomitancia(a, b) {

    //se a termina antes de b começar
    if (isData1BeforeData2(a.fim, b.inicio)) {

        //e se eles são diferentes
        if (a.fim != b.inciio) {
            return false;//não são concomitantes
        }

    } else {// se A termina quando b já tinha começado
        return true;
    }
}

function checkIsBefore(date1, date2) {
    return moment(date1).isBefore(date2);
}

function addSeteAnosEMeioADataInformada(data) {

    //console.log(`LINHA 1358: CHEGOU A DATA - ${data}`);

    let myMoment = deDataParaMomentjs(data);
    //console.log(`o RETORNO DE DATA PARA MOMENTO FUNCIONOU? ${myMoment.format()}`);
    myMoment.add(7, "year");
    myMoment.add(6, "month");

    //console.log(`AGORA DEPOIS DE ADICIONADO ${myMoment.format()}`);

    //console.log(`MAIS 7 ANOS E MEIO: ${myMoment.years} anos, ${myMoment.months} meses, ${myMoment.days} dias`);

    return myMoment;
}

function deDataParaMomentjs(data) {

    let dataInicio = data.slice();//clona a string

    let inicioSplit = dataInicio.split("/")
    let anoInicio = inicioSplit[2];
    let mesInicio = inicioSplit[1];
    let diaInicio = inicioSplit[0];

    const m = moment(`${anoInicio}-${mesInicio}-${diaInicio}`, 'YYYY-MM-DD');
    //console.log("DE DATA PARA MOMENT: " + m.format());

    return m;

}

function deMomentParaData(m) {
    const dia = m.date();// < 10 ? `0${m.date()}` : m.date();
    const mes = m.month() + 1;// < 10 ? `0${m.month()}` : m.month();
    //console.log(`DE MOMENT PARA DATA: ${dia}/${mes}/${m.year()}`);
    return `${dia}/${mes}/${m.year()}`;

    //return retorno;
}

function deMomentParaDataAmericana(m) {
    return `${m.year()}-${m.month()}-${m.date()}`;
}




function deDataParaDataAmericana(data) {

    //console.log("DATA QUE CHEGOU NA 1438: " + data);

    let dataInicio = data.slice();
    let inicioSplit = dataInicio.split("/")
    let anoInicio = inicioSplit[2];
    let mesInicio = inicioSplit[1];
    let diaInicio = inicioSplit[0];

    return `${anoInicio}-${mesInicio}-${diaInicio}`
}

function calculaDuracao(periodo) {

    let dataInicio = periodo.inicio.slice();//clona a string
    let dataFim = periodo.fim.slice();//clona a string

    let inicioSplit = dataInicio.split("/")
    let anoInicio = inicioSplit[2];
    let mesInicio = inicioSplit[1];
    let diaInicio = inicioSplit[0];

    let fimSplit = dataFim.split("/")
    let anoFim = fimSplit[2];
    let mesFim = fimSplit[1];
    let diaFim = fimSplit[0];

    /* var sdt = new Date(`${anoInicio}-${mesInicio}-${diaInicio}`);
    var difdt = new Date(new Date(`${anoFim}-${mesFim}-${diaFim}`) - sdt);
    alert((difdt.toISOString().slice(0, 4) - 1970) + "Y " + (difdt.getMonth() + 1) + "M " + difdt.getDate() + "D"); */

    //com moment js
    /* var m1 = moment('2014-01-01 12:00:00', 'YYYY-MM-DD HH:mm:ss');
    var m2 = moment('2014-02-03 15:04:05', 'YYYY-MM-DD HH:mm:ss'); */
    var m1 = moment(`${anoInicio}-${mesInicio}-${diaInicio}`, 'YYYY-MM-DD');
    var m2 = moment(`${anoFim}-${mesFim}-${diaFim}`, 'YYYY-MM-DD');
    //var diff = moment.preciseDiff(m1, m2); // '1 month 2 days 3 hours 4 minutes 5 seconds'

    /* To obtain the numeric values rather than a string, pass the value true as the third argument to the method:
    var diff = moment.preciseDiff(m1, m2, true); // {years : 0, months : 1, days : 2, hours : 3, minutes : 4, seconds  */
    var diff = moment.preciseDiff(m1, m2, true);

    //alert(`Com moment js: ${diff.years} anos, ${diff.months} meses, ${diff.days} dias`);
    return diff;
}

function sortProvasOuImpedimentosSimples(a, b) {
    let dataA = a.dataInicio.slice();//clona a string
    let dataB = b.dataInicio.slice();

    let aSplit = dataA.split("/")
    let anoA = aSplit[2];
    let mesA = aSplit[1];
    let diaA = aSplit[0];

    dataA = `${anoA}${mesA}${diaA}`;

    let bSplit = dataB.split("/")
    let anoB = bSplit[2];
    let mesB = bSplit[1];
    let diaB = bSplit[0];

    dataB = `${anoB}${mesB}${diaB}`;

    /*     dataA = dataA.replace(/\//g, ""); //retira as barras das datas
        dataB = dataB.replace(/\//g, ""); */
    console.log("Data A: " + dataA);
    console.log("Data B: " + dataB);

    if (dataA < dataB) {
        return -1;
    } else {
        return true;
    }
}


function sortVinculosEBeneficiosPorData(a, b) {
    let dataA = a.inicio.slice();//clona a string
    let dataB = b.inicio.slice();

    let aSplit = dataA.split("/")
    let anoA = aSplit[2];
    let mesA = aSplit[1];
    let diaA = aSplit[0];

    dataA = `${anoA}${mesA}${diaA}`;

    let bSplit = dataB.split("/")
    let anoB = bSplit[2];
    let mesB = bSplit[1];
    let diaB = bSplit[0];

    dataB = `${anoB}${mesB}${diaB}`;

    /*     dataA = dataA.replace(/\//g, ""); //retira as barras das datas
        dataB = dataB.replace(/\//g, ""); */
    console.log("Data A: " + dataA);
    console.log("Data B: " + dataB);

    if (dataA < dataB) {
        return -1;
    } else {
        return true;
    }
}

function provasPorPeriodo() {

    blocosHomologadosNaPrimeiraEtapa = [];

    provasPorPeriodoView.innerHTML = "";

    let periodoComProva = false;

    for (let i = 0; i < blocosSeteAnosEMeio.length; i++) {

        periodoComProva = false;

        for (let j = 0; j < provasUteisAosPeriodos.length; j++) {

            if (moment(deDataParaDataAmericana(provasUteisAosPeriodos[j].dataInicio)).isBetween(deDataParaDataAmericana(blocosSeteAnosEMeio[i].inicio), deDataParaDataAmericana(blocosSeteAnosEMeio[i].fim), 'days', true)) {

                if (!periodoComProva) {
                    provasPorPeriodoView.innerHTML += `<br><br>Período de <b>${blocosSeteAnosEMeio[i].inicio}</b> a <b>${blocosSeteAnosEMeio[i].fim}</b>:<br>`;
                    blocosHomologadosNaPrimeiraEtapa.push(new Periodo(blocosSeteAnosEMeio[i].inicio, blocosSeteAnosEMeio[i].fim));
                }

                provasPorPeriodoView.innerHTML += `&nbsp;&nbsp; - ${provasUteisAosPeriodos[j].dataInicio} - ${provasUteisAosPeriodos[j].descricao}<br> `;

                periodoComProva = true;
            }
        }



    }



    limitandoProvasAosObstaculos();
    provasPorPeriodoView.innerHTML += `<br><br><h2>Sugestão de Homologação:</h2><br>`;
    for (let i = 0; i < blocosHomologadosNaPrimeiraEtapa.length; i++) {
        provasPorPeriodoView.innerHTML += `<br><br>Período de <b>${blocosHomologadosNaPrimeiraEtapa[i].inicio}</b> a <b>${blocosHomologadosNaPrimeiraEtapa[i].fim}</b>;<br>`;

        let temImpedimento = false;

        for (let j = 0; j < impedimentosQueFragmentaramPeriodos.length; j++) {

            let impedimento = impedimentosQueFragmentaramPeriodos[j];
            //se o impedimento for deste periodo
            if (impedimento.idPeriodo == i) {
                if (!temImpedimento) {
                    provasPorPeriodoView.innerHTML += `<br>Indícios que limitaram a homologação integral do período:<br>`;
                    temImpedimento = true;
                }

                provasPorPeriodoView.innerHTML += `<br>&nbsp&nbsp&nbsp${impedimento.descricao}`;
            }
        }
    }



    apresentaDados_h2();

}

function isUtilParaAlgumPeriodo(data, descricao) {

    /*   class Prova {
        constructor(descricao, dataInicio, dataFim) { */


    for (let i = 0; i < blocosSeteAnosEMeio.length; i++) {
        if (moment(deDataParaDataAmericana(data)).isBetween(deDataParaDataAmericana(blocosSeteAnosEMeio[i].inicio), deDataParaDataAmericana(blocosSeteAnosEMeio[i].fim), 'days', true)) {

            provasUteisAosPeriodos.push(new Prova(descricao, data, ""));

        }
    }

}


function limitandoProvasAosObstaculos() {

    impedimentosQueFragmentaramPeriodos = [];//limpando o array


    for (let i = 0; i < blocosHomologadosNaPrimeiraEtapa.length; i++) { //vamos pegar todos os blocos para os quais há provas
        for (let j = 0; j < impedimentosArray.length; j++) { //vamos pegar todos os impedimentos

            if (impedimentosArray[j] instanceof Vinculo) {//se o impedimento for um vínculo urbano

                //verifique se o vínculo não atrapalha a homologação do bloco
                let inicioDentroDoBloco = false;
                let finalDentroDoBloco = false;
                if (moment(deDataParaDataAmericana(impedimentosArray[j].inicio)).isBetween(deDataParaDataAmericana(blocosHomologadosNaPrimeiraEtapa[i].inicio), deDataParaDataAmericana(blocosHomologadosNaPrimeiraEtapa[i].fim), 'days', true)) {
                    inicioDentroDoBloco = true;

                    //posso agora dividir o bloco em dois
                    //ou mover o final do bloco para a véspera do obstáculo - escolho essa!
                    //Depois, vou verificar se tem alguma outra prova que poderia reiniciar um novo bloco com o período não homologado

                    //ou mover o final do bloco para a véspera do obstáculo
                    blocosHomologadosNaPrimeiraEtapa[i].fim = deMomentParaData(deDataParaMomentjs(impedimentosArray[j].inicio).subtract(1, "day"));

                    //agora vou listar quais são os impedimentos que influenciaram na alteração do periodo
                    let descricao = `Vínculo: ${impedimentosArray[j].empregador} - ${impedimentosArray[j].inicio} a ${impedimentosArray[j].fim}${impedimentosArray[j].nota != "" ? "," + impedimentosArray[j].nota : ""};`;

                    impedimentosQueFragmentaramPeriodos.push(new Impedimento(i, descricao));

                    console.log(`Incluimos no período ${i} o impedimento ${descricao}`);

                    //agora tenho que fazer a data de início do próximo período ser no primeiro doc apresentado após o obstáculo

                    //verificando se tem um próximo período !!! pode ser que não tenha um próximo período mas tenha uma prova dentro do mesmo período após o término do obstáculo
                    if (i + 1 < blocosHomologadosNaPrimeiraEtapa.length) {
                        let proximoPeriodo = blocosHomologadosNaPrimeiraEtapa[i + 1];
                        let primeiraProvaAposObstaculo = "";

                        //agora eu preciso pegar as provas e ver qual é a primeira prova após o término do obstáculo
                        //vou usar o array de provasUteisAosPeriodos pois já é genérico e contém todas as provas
                        for (let k = 0; k < provasUteisAosPeriodos.length; k++) {

                            console.log("linha 2024");

                            //a prova é posterior ao fim do obstáculo?
                            if (deDataParaMomentjs(provasUteisAosPeriodos[k].dataInicio).isAfter(deDataParaMomentjs(impedimentosArray[j].fim))) {

                                //se nós não tivermos ainda uma primeira prova OU se a prova encontrada for anterior a que nós já tivermos
                                if (primeiraProvaAposObstaculo == "" || deDataParaMomentjs(primeiraProvaAposObstaculo.dataInicio).isAfter(deDataParaMomentjs(provasUteisAosPeriodos[k].dataInicio))) {

                                    //peque essa prova
                                    primeiraProvaAposObstaculo = provasUteisAosPeriodos[k];

                                    //comece o próximo período no dia da primeira prova após o obstáculo
                                    blocosHomologadosNaPrimeiraEtapa[i + 1].inicio = primeiraProvaAposObstaculo.dataInicio;

                                    /* //termine o próxmio periodo 7,5 anos após a prova OU na data de término do que foi declarado, o que for primeiro
                                    let dataFimMajoradaNaProva = getDataMais7anosEmeio(primeiraProvaAposObstaculo.dataInicio)
                  
                                    //periodosAutoDeclaradosArray array que contem todos os períodos autodeclarados
                  
                                    //se a prova majorada em 7,5 anos for antes do término do período autodeclarado
                  
                                    // mas isso é problemático, pq pode ser que a prova esteja fora do período
                  
                                    //melhor reanalizar todos os períodos autodeclarados e separa-los em blocos de 7,5 anos com base nas provas e obstáculos
                                    if(deDataParaMomentjs(dataFimMajoradaNaProva).isBefore())
                                    blocosHomologadosNaPrimeiraEtapa[i + 1].fim = getDataMais7anosEmeio(); */

                                    //empregador, inicio, fim, nota)

                                    console.log("linha 2038");

                                    /* let descricao = `Vínculo: ${impedimentosArray[j].empregador} - ${impedimentosArray[j].inicio} a ${impedimentosArray[j].fim} ${impedimentosArray[j].nota != "" ? "," + impedimentosArray[j].nota : ""}`;
                                    impedimentosQueFragmentaramPeriodos.push(new Impedimento(i, descricao));
                  
                                    console.log(`Incluimos no período ${i} o impedimento ${descricao}`); */
                                } else {
                                    console.log(`primeiraProvaAposObstaculo == "" || deDataParaMomentjs(primeiraProvaAposObstaculo.dataInicio).isAfter(deDataParaMomentjs(provasUteisAosPeriodos[k].dataInicio)): ${primeiraProvaAposObstaculo == "" || deDataParaMomentjs(primeiraProvaAposObstaculo.dataInicio).isAfter(deDataParaMomentjs(provasUteisAosPeriodos[k].dataInicio))}`);
                                }
                            } else {
                                console.log(`deDataParaMomentjs(provasUteisAosPeriodos[k].dataInicio).isAfter(deDataParaMomentjs(impedimentosArray[j].fim)): ${deDataParaMomentjs(provasUteisAosPeriodos[k].dataInicio).isAfter(deDataParaMomentjs(impedimentosArray[j].fim))}`);
                            }
                        }
                    } else {
                        console.log(`i + 1 < blocosHomologadosNaPrimeiraEtapa.length: ${i + 1} < ${blocosHomologadosNaPrimeiraEtapa.length}`);
                    }
                }
            } else if (impedimentosArray[j] instanceof Beneficio) {
                //verifique se o beneficio não atrapalha a homologação do bloco
                let inicioDentroDoBloco = false;
                let finalDentroDoBloco = false;
                if (moment(deDataParaDataAmericana(impedimentosArray[j].inicio)).isBetween(deDataParaDataAmericana(blocosHomologadosNaPrimeiraEtapa[i].inicio), deDataParaDataAmericana(blocosHomologadosNaPrimeiraEtapa[i].fim), 'days', true)) {
                    inicioDentroDoBloco = true;

                    //posso agora dividir o bloco em dois
                    //ou mover o final do bloco para a véspera do obstáculo - escolho essa!
                    //Depois, vou verificar se tem alguma outra prova que poderia reiniciar um novo bloco com o período não homologado

                    //ou mover o final do bloco para a véspera do obstáculo
                    blocosHomologadosNaPrimeiraEtapa[i].fim = deMomentParaData(deDataParaMomentjs(impedimentosArray[j].inicio).subtract(1, "day"));

                    //agora tenho que fazer a data de início do próximo período ser no primeiro doc apresentado após o obstáculo

                    //verificando se tem um próximo período
                    if (i + 1 < blocosHomologadosNaPrimeiraEtapa.length) {
                        let proximoPeriodo = blocosHomologadosNaPrimeiraEtapa[i + 1];
                        let primeiraProvaAposObstaculo = "";

                        //agora eu preciso pegar as provas e ver qual é a primeira prova após o término do obstáculo
                        //vou usar o array de provasUteisAosPeriodos pois já é genérico e contém todas as provas
                        for (let k = 0; k < provasUteisAosPeriodos.length; k++) {

                            //a prova é posterior ao fim do obstáculo?
                            if (deDataParaMomentjs(provasUteisAosPeriodos[k].dataInicio).isAfter(deDataParaMomentjs(impedimentosArray[j].fim))) {

                                //se nós não tivermos uma primeira prova OU se a prova encontrada for anterior a que nós já tivermos
                                if (primeiraProvaAposObstaculo == "" || deDataParaMomentjs(primeiraProvaAposObstaculo.dataInicio).isAfter(deDataParaMomentjs(provasUteisAosPeriodos[k].dataInicio))) {

                                    //peque essa prova
                                    primeiraProvaAposObstaculo = provasUteisAosPeriodos[k];

                                    //comece o próximo período no dia da primeira prova após o obstáculo
                                    blocosHomologadosNaPrimeiraEtapa[i + 1].inicio = primeiraProvaAposObstaculo.dataInicio;

                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

