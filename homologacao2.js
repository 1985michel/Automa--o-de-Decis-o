"use strict";




class Periodo_h2 {

    constructor(categoria, inicio, fim) {
        this.periodo = new PeriodoAutoDeclarado(categoria.slice(), inicio.slice(), fim.slice());
        this.provas = [];
        this.impedimentos = [];
        this.periodosValidados = [];
    }

    addProva(prova) {

        this.provas.push(prova);
        /* this.provas.push(new Prova(prova.descricao.slice(), prova.dataInicio.slice(), prova.dataFim.slice())); */
        this.provas.sort(sortFunction);
    }

    isComProva() {
        return this.provas.length > 0;
    }

    addImpedimento(impedimento) {

        this.impedimentos.push(impedimento);
        this.impedimentos.sort(sortFunction);

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



//impedimento instanceof Vinculo || impedimento instanceof Beneficio || impedimento instanceof Atividade || impedimento instanceof Empresa

function getImpedimentos_h2() {

    impedimentos_h2 = [];

    impedimentosArray.forEach(impedimento => {


        if (impedimento instanceof Vinculo) {
            let descricao = `Vínculo Urbano: ${impedimento.empregador} - ${impedimento.inicio} a ${impedimento.fim}${impedimento.nota != "" ? ", " + impedimento.nota : ""};`;

            impedimentos_h2.push(new Impedimento_h2(descricao, impedimento.inicio, impedimento.fim));

        } else if (impedimento instanceof Beneficio) {

            let beneficio = impedimento;
            let descricao = `Benefício urbano: ${beneficio.especie}/${beneficio.nb} - ${beneficio.inicio} a ${beneficio.fim}${beneficio.nota != "" ? ", " + beneficio.nota : ""};`;
            impedimentos_h2.push(new Impedimento_h2(descricao, beneficio.inicio, beneficio.fim));

        } else if (impedimento instanceof SeguroDesemprego) {

            let sd = impedimento;
            let descricao = `Seguro Desemprego: ${sd.inicio} a ${sd.fim};`;
            impedimentos_h2.push(new Impedimento_h2(descricao, sd.inicio, sd.fim));

        } else if (impedimento instanceof Atividade) {

            let atividade = impedimento;
            let descricao = `Atividade urbana: ${atividade.atividade} - ${atividade.inicio} a ${atividade.fim}${atividade.isAtiva == "sim" ? " - ativa" : ""}`;
            impedimentos_h2.push(new Impedimento_h2(descricao, atividade.inicio, atividade.fim));

        } else if (impedimento instanceof Empresa) {

            let empresa = impedimento;
            let descricao = `Empresa urbana: ${empresa.nome}, CNPJ/CEI: ${empresa.cnpjCei}, CNAE: ${empresa.cnae} - ${empresa.inicio} a ${empresa.fim}${empresa.isAtiva == "sim" ? " - ativa;" : ";"}`;
            impedimentos_h2.push(new Impedimento_h2(descricao, empresa.inicio, empresa.fim));

        } else if (impedimento instanceof Prova) {
            let prova = impedimento;
            let descricao = `Indício em contrário: ${prova.descricao} - ${prova.dataInicio} a ${prova.dataFim};`;
            impedimentos_h2.push(new Impedimento_h2(descricao, prova.dataInicio, prova.dataFim));
        }
    });
}

function getProvas_h2() {

    provas_h2 = [];

    provasArray.forEach(prova => {

        if (prova instanceof Vinculo && prova.nota == "periodo-positivado") {
            let descricao = `Período Previamente Positivado: ${prova.inicio} a ${prova.fim};`;

            provas_h2.push(new Prova_h2(descricao, prova.inicio, prova.fim));

        } else if (prova instanceof Beneficio) {

            let beneficio = prova;
            let descricao = `Benefício Rural: ${beneficio.especie}/${beneficio.nb} - ${beneficio.inicio} a ${beneficio.fim}${beneficio.nota != "" ? ", " + beneficio.nota : ""};`;
            provas_h2.push(new Prova_h2(descricao, beneficio.inicio, beneficio.fim));

        } else if (prova instanceof Atividade) {

            let atividade = prova;
            let descricao = `Atividade Rural: ${atividade.atividade} - ${atividade.inicio} a ${atividade.fim}${atividade.isAtiva == "sim" ? " - ativa" : ""}`;
            provas_h2.push(new Prova_h2(descricao, atividade.inicio, atividade.fim));

        } else if (prova instanceof Empresa) {

            let empresa = prova;
            let descricao = `Empresa Rural: ${empresa.nome}, CNPJ/CEI: ${empresa.cnpjCei}, CNAE: ${empresa.cnae} - ${empresa.inicio} a ${empresa.fim}${empresa.isAtiva == "sim" ? " - ativa" : ""};`;
            provas_h2.push(new Prova_h2(descricao, empresa.inicio, empresa.fim));

        } else if (prova instanceof DAP) {

            let dap = prova;
            let descricao = `DAP: ${dap.numero} Categoria: ${dap.categoria} Data Início: ${dap.inicio} Data fim: ${dap.fim};`;
            provas_h2.push(new Prova_h2(descricao, prova.inicio, prova.fim));

        } else if (prova instanceof Defeso) {

            let defeso = prova;
            let descricao = `Seguro Defeso:<br> Data Início: ${defeso.inicio} Data fim: ${defeso.fim};`;
            provas_h2.push(new Prova_h2(descricao, prova.inicio, prova.fim));

        } else if (prova instanceof RegistroSala) {

            let registroSala = prova;
            let descricao = `Registro de Assentado no Sala: ${registroSala.nomeAssentamento} - Data Início: ${registroSala.inicio} Data fim: ${registroSala.fim};`;
            provas_h2.push(new Prova_h2(descricao, prova.inicio, prova.fim));

        } else if (prova instanceof RGP) {
            let rgp = prova;
            let descricao = `RGP: ${rgp.numero} Data Início: ${rgp.inicio} Data fim: ${rgp.fim} RGP Ativo: ${rgp.isAtivo ? "sim" : "não"};`;
            provas_h2.push(new Prova_h2(descricao, prova.inicio, prova.fim));
        } else if (prova instanceof Prova) {
            let prova = prova;
            let descricao = `Indício favorável: ${prova.descricao} - ${prova.dataInicio};`;
            provas_h2.push(new Prova_h2(descricao, prova.dataInicio, ""));

        } else if (prova instanceof ProvaUnica) {
            let provaUnica = prova;
            provaUnica.dataArray.forEach(data => {

                let descricao = `Indício favorável: ${provaUnica.descricao} - ${data};`;
                provas_h2.push(new Prova_h2(descricao, data, ""));

            });
        }
    });
}
//primeiro vou pegar os períodos autodeclarados 
//periodosAutoDeclaradosArray

//agora vou pegar cada um desses períodos e verificar as provas que tem dentro deles

function analisaHomologacao_h2() {

    getImpedimentos_h2();

    getProvas_h2();

    etapa1_coletandoOsPeriodosDeclarados();

    etapa2_coletandoOsImpedimentosDosPeriodos();

    etapa3_coletandoAsProvasDosPeriodos()

    etapa4_extraindoPeriodoValido();

    etapa5_homologandoPorProva();


}

function etapa1_coletandoOsPeriodosDeclarados() {

    periodos_h2 = [];

    periodosAutoDeclaradosArray.forEach(periodo => {

        //console.log(`>>>>>>>>> Periodo DECLARAÇÃO - ${periodo.categoria}: ${periodo.inicio} a ${periodo.fim}`);
        periodos_h2.push(new Periodo_h2(periodo.descricao.slice(), periodo.inicio.slice(), periodo.fim.slice()));
    });

    /*  periodos_h2.forEach(p => {
         console.log(`>>>>>>>>> Periodo - ${p.periodo.categoria}: ${p.periodo.inicio} a ${p.periodo.fim}`);
     }); */

}

function etapa2_coletandoOsImpedimentosDosPeriodos() {

    periodos_h2.forEach(p_h2 => {

        impedimentos_h2.forEach(impedimento => {

            if (isImpedimento_h2AtrapalhandoOPeriodo(p_h2.periodo, impedimento)) {
                p_h2.addImpedimento(impedimento);
            }
        });

    });
}

function etapa3_coletandoAsProvasDosPeriodos() {

    periodos_h2.forEach(p_h2 => {

        provas_h2.forEach(prova => {

            if (isProva_h2ComprovandoDoPeriodo(p_h2.periodo, prova)) {
                p_h2.addProva(prova);
            }
        });
    });
}


function separaPeriodosEmBlocosDeSeteAnosEMeio_h2(periodoDeclarado) {

    //console.log("linha 1337");

    let bloco7_5 = [];

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
            bloco7_5.push(new Periodo(deMomentParaData(inicioAuxiliar), periodoDeclarado.fim));
            //console.log(retorno);
            momentFim = momentFinal;
        } else { // nesta caso vamos precisar quebrar em períodos de 7,5 anos cada
            //console.log("Estamos em períodos maiores que 7,5 anos");

            //momentFim = addSeteAnosEMeioADataInformada(periodoDeclarado.inicio);
            momentFim.add(7, "year");
            momentFim.add(6, "month");
            //console.log(`INICIO AUXILIAR: ${deMomentParaData(inicioAuxiliar)} A MOMENTFIM: ${deMomentParaData(momentFim)}`);
            //retorno += `Entre ${deMomentParaData(inicioAuxiliar)} e ${deMomentParaData(momentFim)};<br>`;
            bloco7_5.push(new Periodo(deMomentParaData(inicioAuxiliar), deMomentParaData(momentFim)));

            //abaixo levo de momento para data e volta para moment para que gere um outro objeto, do contrário é só pondeito e ao alterar altera tudo
            inicioAuxiliar = deDataParaMomentjs((deMomentParaData(momentFim.add(1, "day"))));//para começar o próximo no dia seguinte ao último momento
            //console.log(retorno);

            let novoPeriodo = new Periodo(deMomentParaData(inicioAuxiliar), periodoDeclarado.fim);
            duracaoDoPeriodo = novoPeriodo.duracao;


        }
    }

    return bloco7_5;


    //&& duracaoDoPeriodo.months ) return `Entre ${}`;
}

function etapa5_homologandoPorProva() {


    periodos_h2.forEach(p_h2 => {

        let validados = p_h2.periodosValidados;

        validados.forEach(validado => {

            p_h2.provas.forEach(prova => {
                if (isUtilParaValidado(prova, validado)) {
                    prova.abrangencia = defineAbrangenciaDaProva(prova, validado);
                }

            });

        });



    });
}

function isUtilParaValidado(prova_h2, validado) {


    if (moment(deDataParaDataAmericana(prova_h2.inicio)).isBetween(deDataParaDataAmericana(validado.inicio), deDataParaDataAmericana(validado.fim), 'days', true)) {

        return true;

    }

    return false;


}

function defineAbrangenciaDaProva(prova, validado) {
    //a prova pode homologar até 7,5 anos
    //algumas provas só fazem sentido a partir de sua data. Por exemplo, um contrato de arrendamento ou comodato, a certidão de casamento cmo a profissão do cônjuge como lavrador. Mas isso vou deixar para pensar em outro momento de maior maturidade do projeto

    let distanciaInicio = qualADistanciaEntreDate1EDat2(validado.inicio, prova.inicio);

    let distanciaFim = qualADistanciaEntreDate1EDat2(validado.fim, prova.inicio);

    let anos = 7;
    let meses = 6;

    let abrangenciaInicio = "";
    let abrangenciaFim = "";

    //a prova é a mesma data do inicio do período
    /*  if (prova.inicio == validado.inicio) {
         abrangenciaInicio = prova.inicio.slice();
 
 
         //se o período validado for com menos de 7,5 anos da prova, assuma a data fim do periodo
         if (distanciaFim[0] <= 7 && distanciaFim[1] < 6 && (distanciaFim[0] >= 0 && distanciaFim[1] >= 0 && distanciaFim[2] >= 0)) {
             abrangenciaFim = validado.fim.slice();
 
             //se for maior que 7,5 anos
         } else if ((distanciaFim[0] > 7) || (distanciaFim[0] == 7 && distanciaFim[1] > 6) || (distanciaFim[0] == 7 && distanciaFim[1] == 6 && distanciaFim[2] > 1)) {
             let iniMoment = deDataParaMomentjs(prova.inicio.slice());
             iniMoment.add(7, "year");
             iniMoment.add(6, "month");
             abrangenciaFim = deMomentParaData(iniMoment);
         }
     } else {//Prova.Inicio != validado.Inicio */

    console.log(`>>>> ${prova.descricao}: ${distanciaInicio[0]} anos, ${distanciaInicio[1]} meses e ${distanciaInicio[2]} dias do inicio`);

    //se o inicio da prova for de até 7,5 do inicio do validado ==== Nesta caso a prova vai tentar retroagir para encontra o inicio do periodo
    if (distanciaInicio[0] <= 7 && distanciaInicio[1] < 6 && (distanciaInicio[0] >= 0 && distanciaInicio[1] >= 0 && distanciaInicio[2] >= 0)) {
        abrangenciaInicio = validado.inicio.slice();
    } else { // se a prova distar mais de 7,5 anos do inicio
        console.log(`O INICIO DA PROVA ${prova.inicio} É DE MAIS DE 7,5 ANOS DO INICIO DO VALIDADO ${validado.inicio}`);

        //vamos verificar se a prova dista mais de 7,5 anos do fim do periodo. 
        if (distanciaFim[0] <= 7 && distanciaFim[1] < 6 && (distanciaFim[0] <= 0 && distanciaFim[1] <= 0 && distanciaFim[2] <= 0)) {
            abrangenciaFim = validado.fim.slice(); // se não distar assuma o fim da abrangência no fim do período

            //assuma o inicio recuando 7,5 anos ou no inicio do periodo se for menor
            if (abrangenciaInicio == "") {
                //calculando o término da abrangência
                let iniMoment = deDataParaMomentjs(abrangenciaFim.slice());
                iniMoment.subtract(7, "year");
                iniMoment.subtract(6, "month");
                let possivelInicio = deMomentParaData(iniMoment);

                //se o possivel inicio da prova for depois do inicio do periodo validado sete o inicio mais 7,5 anos
                if (isData1BeforeData2(validado.inicio, possivelInicio)) {
                    abrangenciaInicio = possivelInicio;
                } else { // do contrário sete o fim do periodo validado
                    abrangenciaInicio = validado.inicio.slice();
                }
            }
        } else {
            console.log(`DISTANCIA FIM ${distanciaFim[0]} ANOS ${distanciaFim[1]} MESES E ${distanciaFim[2]} DIAS`);
        }



    }


    //se ainda não tiver calculado o fim da abrangência
    if (abrangenciaFim == "") {
        //calculando o término da abrangência
        let iniMoment = deDataParaMomentjs(abrangenciaInicio.slice());
        iniMoment.add(7, "year");
        iniMoment.add(6, "month");
        let possivelFim = deMomentParaData(iniMoment);

        //se o possivel fim da prova for antes do fimd do periodo validado sete o inicio mais 7,5 anos
        if (isData1BeforeData2(possivelFim, validado.fim)) {
            abrangenciaFim = possivelFim;
        } else { // do contrário sete o fim do periodo validado
            abrangenciaFim = validado.fim.slice();
        }
    }
    return new Periodo(abrangenciaInicio, abrangenciaFim);
}

function qualADistanciaEntreDate1EDat2(date1, date2) {
    // se 1 for antes, retornar positivo
    //se 2 for antes, retornar negativo
    let valor = 0;
    let diff = "";
    if (isData1BeforeData2(date1, date2)) {
        valor = 1;
        diff = calculaDuracao(new Periodo(date1, date2));
    } else {
        diff = calculaDuracao(new Periodo(date2, date1));
        valor = -1;
    }

    return [diff.years * valor, diff.months * valor, diff.days * valor];

    //alert(`Com moment js: ${diff.years} anos, ${diff.months} meses, ${diff.days} dias`);
}


function etapa4_extraindoPeriodoValido() {

    periodos_h2.forEach(p_h2 => {
        removePeriodosImpedidos(p_h2);
    });


    /* 
        periodos_h2.forEach(p_h2 => {
    
            p_h2.periodosValidados = [];
    
            let blocos7_5 = separaPeriodosEmBlocosDeSeteAnosEMeio_h2(p_h2);
    
            blocos7_5.forEach(p => { //p não é um bloco h_2, é um bloco simples
    
                if (p.isComProva()) {
    
                    if () { }
    
                }
    
            });
    
    
    
    
        }); */



    /*     if (isPeriodoComProvasNosPrimeiros7AnoseEmeio()) {
            if (isPrimeirosSeteAnosEMeioSemObstaculos()) {
                homologueOsPrimeigosSeteAnosEMeio();
            } else {
                //quebre o periodo na véspera do primeiro obstáculo
    
                //remova o periodo obstaculizado
    
                //rode novamente para o próximo periodo
            }
        } else {
            getDataDaPrimeiraProva();
    
            //faça os demais procedimentos
    
            //se não houver prova, não homologue nada
        } */






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

function isDataDentroDeUmPeriodo(data, periodoInicio, periodoFim) {
    if (moment(deDataParaDataAmericana(data)).isBetween(deDataParaDataAmericana(periodoInicio), deDataParaDataAmericana(periodoFim), 'days', false)) {//não incluir mesma data
        return true;
    } else {
        return false;
    }
}

function removePeriodosImpedidos(p_h2) {

    let semImpedimentos = [];

    let inicio = p_h2.periodo.inicio.slice();

    let fim = "";

    p_h2.impedimentos.forEach(impedimento => {
        fim = getVespera(impedimento.inicio);

        console.log(`Impedimento começado em ${impedimento.inicio}`);

        if (isData1BeforeData2(inicio, fim)) {
            semImpedimentos.push(new Periodo(inicio, fim)); //pegando o primeiro periodo
        }

        p_h2.provas.forEach(prova => {
            let primeiroInicioAposImpedimento = "";

            if (isData1BeforeData2(impedimento.fim, prova.inicio)) {

                if (primeiroInicioAposImpedimento == "" || isData1BeforeData2(prova.inicio, primeiroInicioAposImpedimento)) {

                    primeiroInicioAposImpedimento = prova.inicio; // aqui extraio a primeira prova após o impedimento

                }
            }

            inicio = primeiroInicioAposImpedimento;
        });


    });

    if (isData1BeforeData2(inicio, p_h2.periodo.fim)) {

        semImpedimentos.push(new Periodo(inicio, p_h2.periodo.fim)); //pegando o ultimo periodo

    }



    console.log(`Temos ${semImpedimentos.length} períodos sem impedimentos no período de ${p_h2.periodo.inicio} a ${p_h2.periodo.fim}`);

    p_h2.periodosValidados = semImpedimentos;

}

function isProva_h2ComprovandoDoPeriodo(periodo, prova) {


    if (isDataInicioDentroDoPeriodo(prova.inicio, periodo)) {
        return true
    } else if (prova.dataFim != "" && prova.dataFim != "sem dados") {
        isDataFimDentroDoPeriodo(prova.fim, periodo)
    }
    return false;
}

function isImpedimento_h2AtrapalhandoOPeriodo(periodo, impedimento) {

    if (isDataInicioDentroDoPeriodo(impedimento.inicio, periodo) || isDataFimDentroDoPeriodo(impedimento.fim, periodo)) {
        return true
    }

    return false;
}

function isDataInicioDentroDoPeriodo(dataInicio, periodo) {
    console.log(`LINHA 257: ${periodo.inicio}`);
    return isDataDentroDeUmPeriodo(dataInicio, periodo.inicio, periodo.fim);
}

function isDataFimDentroDoPeriodo(dataFim, periodo) {
    return isDataDentroDeUmPeriodo(dataFim, periodo.inicio, periodo.fim);
}

function isDataDentroDeUmPeriodo(data, periodoInicio, periodoFim) {
    console.log(`LINHA 263: DATA ${data} periodoInicio ${periodoInicio} periodoFim ${periodoFim}`);
    if (moment(deDataParaDataAmericana(data)).isBetween(deDataParaDataAmericana(periodoInicio), deDataParaDataAmericana(periodoFim), 'days', true)) {
        return true;
    } else {
        return false;
    }
}




function getProvasPorPeriodoDeclarado() {


}




blocosSeteAnosEMeio