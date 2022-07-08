"use strict";
//console.log("Iniciando Get Cnis");





//let cnis = prompt("Cole com o CNIS");

/* let cnis = `

Página 1 de 3
29/01/2022 20:12:41
INSS
CNIS - Cadastro Nacional de Informações Sociais
Extrato Previdenciário - CNIS Cidadão
Identificação do Filiado
Nit: Nome:
Data de Nascimento:
Nome da Mãe:
NELMA DE FATIMA QUEIROZ PATRICIO
ABADIA SIMAO QUEIROZ
2.674.992.576-4
07/12/1959
CPF: 264.903.581-15
Relações Previdenciárias
Índice NIT Código Emp./NB Origem do Vínculo Data Início Data Fim Ult. Remun. Tipo Vínculo Indicadores
1 1.208.893.780-5 200.254.477-2 BENEFÍCIO Benefício
2 1.208.893.780-5 196.773.423-0 BENEFÍCIO Benefício
3 1.208.893.780-5 33.200.056/0134-70 LOJAS RIACHUELO SA 12/09/1981 29/03/1982 12/1982 Empregado
4 1.208.893.780-5 61.141.602/0092-90 PREFEITURA DE GOIANIA 11/10/1982 10/02/1983 02/1983 Empregado
5 1.208.893.780-5 02.920.353/0001-35 RADIANTE TECIDOS E ROUPAS LTDA 02/05/1983 20/02/1984 02/1984 Empregado
6 1.208.893.780-5 01.500.438/0001-00 DISTRIBUIDORA PROGRESSO DE SECOS E MOLHADOS E CEREAIS L - 02/01/1985 14/02/1990 02/1990 Empregado
7 2.674.992.576-4 CONTRIBUINTE INDIVIDUAL 01/05/2009 30/06/2009 Contribuinte
8 1.208.893.780-5 CONTRIBUINTE INDIVIDUAL 01/05/2009 30/06/2009 Contribuinte PREM_EXT
9 2.674.992.576-4 CONTRIBUINTE INDIVIDUAL 01/08/2009 31/10/2009 Contribuinte
10 1.208.893.780-5 CONTRIBUINTE INDIVIDUAL 01/08/2009 31/10/2009 Contribuinte PREM_EXT
11 2.674.992.576-4 CONTRIBUINTE INDIVIDUAL 01/12/2009 31/01/2011 Contribuinte
12 1.208.893.780-5 CONTRIBUINTE INDIVIDUAL 01/12/2009 31/08/2010 Contribuinte PREM_EXT
13 1.208.893.780-5 CONTRIBUINTE INDIVIDUAL 01/10/2010 31/01/2011 Contribuinte PREM_EXT
14 2.674.992.576-4 CONTRIBUINTE INDIVIDUAL 01/03/2011 31/01/2012 Contribuinte
15 1.208.893.780-5 CONTRIBUINTE INDIVIDUAL 01/03/2011 31/01/2012 Contribuinte PREM_EXT
16 1.208.893.780-5 CONTRIBUINTE INDIVIDUAL 01/05/2012 31/07/2012 Contribuinte
O INSS poderá rever a qualquer tempo as informações constantes deste extrato, conforme art. 19, § 3 do Decreto 3.048/99
Página 2 de 3
29/01/2022 20:12:41
INSS
CNIS - Cadastro Nacional de Informações Sociais
Extrato Previdenciário - CNIS Cidadão
Identificação do Filiado
Nit: Nome:
Data de Nascimento:
Nome da Mãe:
NELMA DE FATIMA QUEIROZ PATRICIO
ABADIA SIMAO QUEIROZ
2.674.992.576-4
07/12/1959
CPF: 264.903.581-15
Relações Previdenciárias
Índice NIT Código Emp./NB Origem do Vínculo Data Início Data Fim Ult. Remun. Tipo Vínculo Indicadores
17 1.208.893.780-5 CONTRIBUINTE INDIVIDUAL 01/09/2012 30/09/2012 Contribuinte
18 1.208.893.780-5 CONTRIBUINTE INDIVIDUAL 01/01/2013 31/01/2013 Contribuinte PREM_EXT
19 1.208.893.780-5 CONTRIBUINTE INDIVIDUAL 01/05/2013 31/01/2014 Contribuinte PREM_EXT
20 2.674.992.576-4 CONTRIBUINTE INDIVIDUAL 01/03/2014 31/03/2014 Contribuinte
21 2.674.992.576-4 CONTRIBUINTE INDIVIDUAL 01/04/2014 30/09/2014 Contribuinte
22 1.208.893.780-5 CONTRIBUINTE INDIVIDUAL 01/04/2014 30/09/2014 Contribuinte PREM_EXT
23 2.674.992.576-4 CONTRIBUINTE INDIVIDUAL 01/10/2014 31/10/2014 Contribuinte
24 2.674.992.576-4 CONTRIBUINTE INDIVIDUAL 01/11/2014 31/01/2015 Contribuinte
25 1.208.893.780-5 CONTRIBUINTE INDIVIDUAL 01/11/2014 31/01/2015 Contribuinte
26 2.674.992.576-4 CONTRIBUINTE INDIVIDUAL 01/02/2015 28/02/2015 Contribuinte
27 2.674.992.576-4 CONTRIBUINTE INDIVIDUAL 01/03/2015 31/03/2015 Contribuinte
28 1.208.893.780-5 CONTRIBUINTE INDIVIDUAL 01/03/2015 31/03/2015 Contribuinte
29 2.674.992.576-4 CONTRIBUINTE INDIVIDUAL 01/04/2015 30/04/2015 Contribuinte
30 2.674.992.576-4 CONTRIBUINTE INDIVIDUAL 01/05/2015 30/09/2015 Contribuinte
31 1.208.893.780-5 CONTRIBUINTE INDIVIDUAL 01/05/2015 30/09/2015 Contribuinte
32 2.674.992.576-4 CONTRIBUINTE INDIVIDUAL 01/10/2015 30/11/2015 Contribuinte
O INSS poderá rever a qualquer tempo as informações constantes deste extrato, conforme art. 19, § 3 do Decreto 3.048/99
Página 3 de 3
29/01/2022 20:12:41
INSS
CNIS - Cadastro Nacional de Informações Sociais
Extrato Previdenciário - CNIS Cidadão
Identificação do Filiado
Nit: Nome:
Data de Nascimento:
Nome da Mãe:
NELMA DE FATIMA QUEIROZ PATRICIO
ABADIA SIMAO QUEIROZ
2.674.992.576-4
07/12/1959
CPF: 264.903.581-15
Relações Previdenciárias
Índice NIT Código Emp./NB Origem do Vínculo Data Início Data Fim Ult. Remun. Tipo Vínculo Indicadores
33 2.674.992.576-4 CONTRIBUINTE INDIVIDUAL 01/12/2015 31/12/2015 Contribuinte
34 1.208.893.780-5 CONTRIBUINTE INDIVIDUAL 01/12/2015 31/12/2015 Contribuinte
35 2.674.992.576-4 CONTRIBUINTE INDIVIDUAL 01/01/2016 31/05/2016 Contribuinte
36 2.674.992.576-4 CONTRIBUINTE INDIVIDUAL 01/06/2016 30/06/2016 Contribuinte
37 1.208.893.780-5 CONTRIBUINTE INDIVIDUAL 01/06/2016 30/06/2016 Contribuinte
38 2.674.992.576-4 CONTRIBUINTE INDIVIDUAL 01/07/2016 31/12/2021 Contribuinte
Legenda de Indicadores
Indicador Descrição
PREM_EXT - Indica que a remuneração da competência é extemporânea
O INSS poderá rever a qualquer tempo as informações constantes deste extrato, conforme art. 19, § 3 do Decreto 3.048/99


`; */

let cnis = "";


//console.log(cnis);

//vou clonar a String para poder trabalhar sem alter a entrada do CNIS
//let cnisDeTrabalho = cnis.slice();


function sequenciador() {

    /*     console.log(isLetraPresente("MICHEL"));
        console.log(isLetraPresente("123"));
        console.log(isLetraPresente("12.3"));
        console.log(isLetraPresente("12,3"));
        console.log(isLetraPresente("12-3"));
        console.log(isLetraPresente("12-,.3"));
        console.log(isLetraPresente("12-,.3m")); */


    //console.log(isLetraPresente("61.141.602/0092-90"));


    getNome();
    isSameName();
    getLinhas();
    getVinculos();
    document.getElementById("txtareacnis").value = ""
}

function limparCamposCnis() {
    cnis = "";
    cnisVinculos = [];
    linhas = [];
}


//VARIÁVEIS
let cnisNome = "";

//getNome();

//pegando o nome
function getNome() {
    let cnisDeTrabalho = cnis.slice();
    cnisNome = cnisDeTrabalho.split("Nome da Mãe:")[1].trim();
    //console.log("1: " + cnisNome);
    cnisNome = cnisNome.split("\n")[0].trim();
    //console.log("[INICIO]]" + cnisNome + "[FIM]");
}


// vou fazer uma função de segurança para garantir que o CNIS que estou recebendo é do mesmo cliente
//let cnisNome = "NELMA DE FATIMA QUEIROZ PATRICIO";

function isSameName() {
    if (nome == cnisNome) {
        console.log("Mesmo Nome");
    } else {
        console.log(" ERRO! OUTRO NOME!");
    }
}

//isSameName();


//AGORA VOU PEGAR CADA UM DOS VÍNCULOS

let cnisVinculos = [];


class CnisVinculo {


    constructor(nome, inicio, fim, isPendente, tipoPendencia) {


        /* console.log("chegou no construtor::::::::::::::");
        console.log("nome: " + nome);
        console.log("inicio: " + inicio);
        console.log("fim: " + fim);
        console.log("isPendente: " + isPendente);
        console.log("tipoPendencia: " + tipoPendencia); */



        this.nome = nome;
        this.inicio = inicio;
        this.fim = fim;
        this.isVinculoPublico = false;
        this.isRural = false;// parto do pressuposto que não é rural. A alteração será manual, caso a caso
        this.isPendente = isPendente;
        this.tipoPendencia = tipoPendencia;
        this.checkIfIsVinculoPublico();

    }

    checkIfIsVinculoPublico() {

        //palavras que identificarão um vínculo público
        let indicadoresDeVinculosPublicos = ["secretaria", "estado", "municipio", "município", "municipal", "prefeitura", "camara", "câmara", "gabinete", "união", "uniao", "tribunal", "governo", "estado", "ministerio d", "ministério d", "assembleia legislativa", "universidade estadual", "universidade federal", "superintendencia"];

        let indicadoresPrivados = ["deus", "igreja", "fé", "fe", "jesus", "palavra", "ltda", "eireli"];

        indicadoresDeVinculosPublicos.forEach(palavra => {

            /* if (this.nome.toLowerCase().includes(palavra) && !this.nome.toLowerCase().includes("deus" || "igreja" || "fé" || "fe" || "jesus" || "palavra" || "ltda")) {
                this.isVinculoPublico = true;
            } */
            if (this.nome.toLowerCase().includes(palavra)) {
                this.isVinculoPublico = true;
            }

        });

        indicadoresPrivados.forEach(palavra => {
            if (this.nome.toLowerCase().includes(palavra)) {
                this.isVinculoPublico = false;
            }
        })

        if (this.tipoPendencia == "PRPPS") {
            this.isVinculoPublico = true;
        }


    }


    print() {

        console.log("Nome:" + this.nome + " - " + this.inicio + " - " + this.fim + " Pendente: " + this.isPendente + " Pendência: " + this.tipoPendencia + "  Público: " + this.isVinculoPublico);
    }
}

//getLinhas();

let linhas = [];

function getLinhas() {

    console.log("get linha");

    let cnisDeTrabalho = cnis.slice();
    let blocosDeVinculosA = [];

    console.log(cnisDeTrabalho);

    /*   let temMais = cnisDeTrabalho.conteins("Indicadores");
      while (temMais) {
          cnisDeTrabalho.split("Indicadores");
      } */

    let pedacos = cnisDeTrabalho.split("Indicadores");

    //excluindo o primeiro pedaço
    pedacos.shift()

    //excluindo o ultimo pedaço. Semanas depois peguei um caso em que excluir o último pedaço é excluir uma porrada de vínculos
    //
    if (pedacos.length > 1) {
        //vamos olhar o último pedaço para ver se ele contem algum período ou não
        if (pedacos[pedacos.length - 1].slice(0, 10) == '\nIndicador') {
            console.log('AQUI PODE EXCLUIR O ULTIMO');
            pedacos.pop();
        } else {
            console.log('AQUI NÃO PODE EXCLUIR O ULTIMO');
        }
        // pedacos.pop();
    }





    for (let index = 0; index < pedacos.length; index++) {
        console.log("PEDACO: " + index + ">>> " + pedacos[index]);
    }


    pedacos.forEach(p => {

        //se não for a ultima página
        if (p.includes("O INSS poderá")) {
            blocosDeVinculosA.push(p.split("O INSS poderá")[0].trim());
        } else if (p.includes("Legenda de")) {
            //mas se for a ultima página
            blocosDeVinculosA.push(p.split("Legenda de")[0].trim());
        }


    });

    for (let index = 0; index < blocosDeVinculosA.length; index++) {
        console.log("-----------------Bloco " + index + ">>> " + blocosDeVinculosA[index]);
    }



    //let linhas = [];

    /* blocosDeVinculosA.forEach(bloco => {
        let l = bloco.split("\n");
        l.forEach(e => {
            linhas.push(e)
        });

    }); */

    blocosDeVinculosA.forEach(bloco => {
        let l = bloco.split("\n");
        /* l.forEach(e => {

            console.log(">>> LINHA 276:" + e);

            let ePedaco = e.slice("").split(" ");
            if (ePedaco.length > 1 && ePedaco[0].length <= 3) {

                if (e.slice("").split(" ")[1].length == 15) {
                    linhas.push(e); //se houver um nit na linha então a colete
                }

            }

            // if ( e.slice("").split(" ")[1].length == 15) {
            //    linhas.push(e); //se houver um nit na linha então a colete
           // } 

        }); */


        for (let index = 0; index < l.length; index++) {
            const e = l[index];

            let ePedaco = e.slice("").split(" ");

            //se houver mais de um pedaço ao separar por espaço
            //se o prmieiro pedaço tiver até três dígitos (numeracao dos vinculos)
            //se o segundo pedaço for um nit
            if (ePedaco.length > 1 && ePedaco[0].length <= 3 && e.slice("").split(" ")[1].length == 15) {

                //if (e.slice("").split(" ")[1].length == 15) {//se houver um nit na linha então a colete
                linhas.push(e); //então a colete
                //}

            } else {//se não cumprir os requisitos acima, então é ainda um pedaço da linha anterior



                let ant = linhas.pop();


                console.log(">>>>>> LINHA 315 >>> ANTES ESTAVA ASSIM:" + ant);



                let composta = ant + "" + e;//junte na última linha adicionada

                console.log(">>>>>> LINHA 321 >>> AGORA FICOU ASSIM:" + composta);

                //se entrar neste caso, há risco de que a data fique colada com o nome
                //preciso fazer algo para garantir que isso não vai ocorrer

                let pedacoComp = composta.split(" ");

                let composta2 = "";

                pedacoComp.forEach(pedComp => {

                    //0123456789
                    //01/02/2003

                    if (pedComp.length > 10) { //maior que dez para não considerar nem datas já separada nem outros números

                        console.log(">>>>> LINHA 337 - VAMOS TRABALHAR O:" + pedComp);

                        let tamanhoPedComp = pedComp.length;
                        let corte = 0;

                        console.log(">>>>> LINHA 342 - [-5]:" + pedComp[length - 5]);
                        console.log(">>>>> LINHA 343 - [-8]:" + pedComp[length - 8]);

                        let primeiraBarra = tamanhoPedComp - 5;
                        let segundaBarra = tamanhoPedComp - 8;


                        if (pedComp[primeiraBarra] == `/` && pedComp[segundaBarra] == `/`) {//verifique se está no formado de data

                            console.log(">>>>> LINHA 343 - TEM UMA DATA DENTRO DESSE CARA):" + pedComp);

                            corte = tamanhoPedComp - 10;
                            pedComp = pedComp.slice(0, corte) + " " + pedComp.slice(corte);
                            composta2 = composta2 + " " + pedComp;
                        }
                    } else {
                        composta2 = composta2 + " " + pedComp;
                    }

                });

                console.log(">>>>>> LINHA 349 >>> POR FIM FICOU ASSIM:" + composta2);


                linhas.push(composta2);

                //linhas.push(composta);

            }

        }

    });

    for (let index = 0; index < linhas.length; index++) {
        console.log("Linha " + index + " >>> " + linhas[index]);
    }

    //console.log("LINHA 245 - TEMOS " + linhas.length + " linhas.");

    //então cada linha é um vínculo, preciso agora construir um vínculo para cada linha e inseri-lo no array de vinculos

    //primeiro preciso ser capaz de capturar o nome do empregador

}

//getVinculos();

function getVinculos() {

    console.log("LINHA 247 - TEMOS " + linhas.length + " linhas");

    let meusVinculos = [];

    for (let index = 0; index < linhas.length; index++) {
        //for (let index = 5; index < 10; index++) {


        //primeiro vou fazer uma cópia da linha para não ter problemas
        let linha = linhas[index].slice();

        //console.log("LINHA 256 - TRABALHANDO O VINCULO: " + linha);

        //agora vou separar os elementos pelos espaços em branco

        //quebrar por espaço em branco é bom, mas não resolve tudo
        //quando o nome do vínculo é grande e ocupa mais de uma linha, pode não funcionar
        //então vou quebrar mais uma vez tentando também quebrar por data

        linha.replaceAll("\n", " ");//trocar quebras de linha internas por espaço
        linha.replaceAll("  ", " "); //trocar dois espaços por 1


        /* 
        
        var numberPattern = /\d+/g;
        'something102asdfkj1948948'.match(numberPattern);
        //This would return an Array with two elements inside, '102' and '1948948'.
        //Operate as you wish.If it doesn't match any it will return null.  

        */






        let pedacosDaLinha = linha.split(" ");








        let nomeV = "";
        let inicioV = "";
        let fimV = "";
        let isPendente = false;
        let tipoPendencia = "";

        if (linha.includes("PREM_EXT")) {
            isPendente = true;
            tipoPendencia = "PREM_EXT";
        }

        if (linha.includes("PEXT")) {
            isPendente = true;
            tipoPendencia = "PEXT";
        }

        if (linha.includes("PRPPS" || "Estatutário")) {
            isPendente = true;
            tipoPendencia = "PRPPS";
        }




        //console.log(">>>>> PENDENTE: " + isPendente);


        //PRIMEIRO VOU PEGAR A DATA DE INÍCIO, POIS ELA SEGUE UM FORMATO PADRÃO E ESTÁ SEMPRE PRESENTE

        //ACABO DE VER QUE NEM TODO VÍNCULO TEM DATA DE INÍCIO. BENEFÍCIOS INDEFERIDOS, POR EXEMPLO, NÃO TÊM.

        let indiceDataInicio = 0;
        for (let i = 0; i < pedacosDaLinha.length; i++) {

            const e = pedacosDaLinha[i];

            //console.log("LINHA 297 - TRABALHANDO O PEDACO " + e);

            //se tiver o tamanho de uma data
            if (e.length === 10) {
                if (e[2] == `/` && e[5] == `/`) { //se tiver o formato de uma data
                    if (indiceDataInicio == 0) { //ou seja, se eu aindan não tiver pego a data de início
                        inicioV = e.slice();//então copie que é a data de inicio
                        indiceDataInicio = i;
                        //console.log("LINHA 305 - DATA DE INÍCIO ENCONTRADA >>> " + inicioV);
                    } else {//se eu já tiver a data de início, então é a data de término
                        fimV = e.slice();//então copie que é a data de término
                        //console.log("LINHA 308 - DATA DE TÉRMINO ENCONTRADA >>> " + fimV);
                    }
                }
            }

        }

        //se não tiver data de fim, mas tiver data de início, indique pendência
        if (fimV == "" && inicioV != "") {
            isPendente = true;
        }

        //AGORA EU PRECISO PEGAR O NOME

        //se houver data de início, então vou pegar o que vem antes
        let antesDaData = "";
        if (inicioV != "") {

            antesDaData = linha.split(inicioV)[0].trim();;

            //console.log(">>>>>>>>>>>>>>>>>>> " + antesDaData);

            //se houver letras no terceiro campo, então já é o nome
            if (isLetraPresente(pedacosDaLinha[2])) {
                nomeV = antesDaData.split(pedacosDaLinha[1])[1].trim();
                //console.log(">>>>>>>>>>>>>>>>>>> " + nomeV);

            } else {//se não houver letras, então é o NB ou CNPJ

                if (antesDaData.includes("BENEFÍCIO")) {//se for um benefício

                    nomeV = pedacosDaLinha[3].trim();
                    if (pedacosDaLinha[3].trim() == "BENEFÍCIO") {
                        //nomeV = nomeV + " - NB " + pedacosDaLinha[2];
                        nomeV = nomeV + " " + pedacosDaLinha[2];
                    }

                } else {
                    nomeV = antesDaData.split(pedacosDaLinha[2])[1].trim();
                }

            }

        } else {//se não tiver data de início vou por outro caminho

            //se houver letras no terceiro campo, então já é o nome
            if (isLetraPresente(pedacosDaLinha[2])) {
                nomeV = antesDaData.split(pedacosDaLinha[1])[1].trim();
                //console.log(">>>>>>>>>>>>>>>>>>> " + nomeV);

            } else {//se não houver letras, então é o NB ou CNPJ
                nomeV = pedacosDaLinha[3].trim();
                if (pedacosDaLinha[3].trim() == "BENEFÍCIO") {
                    //nomeV = nomeV + " - NB " + pedacosDaLinha[2];
                    nomeV = nomeV + " " + pedacosDaLinha[2];
                }
            }
        }



        cnisVinculos.push(new CnisVinculo(nomeV, inicioV, fimV, isPendente, tipoPendencia));

    }

    //console.log("Linha 288 >>>>>>>>>>>>>>>>> temos " + meusVinculos.length + " vinculos.");


    cnisVinculos.forEach(v => {
        v.print();
    });


    /* //Me interessa o terceiro OU QUARTO BLOCO (SE TIVER O CNPJ) bloco.
    //Se ele for um número, é o CEI/CNPJ da empresa. Se for o caso, descarte
    //Mas se o terceiro bloco for uma palavra, então é o nome da empresa
    // vou então usar isso como splite e pegar tudo o que vier antes da data de início
 
 
 /*     var regExp = /[a-zA-Z]/g;
    var testString = pedacosDaLinha[2];
 
    if (regExp.test(testString)) {
        //ENTÃO TEM LETRAS, É O NOME DA EMPRESA
 
        //Vou pegar novamente a linha inteira
        linha = linhas[index].slice();
 
        //vou quebrar a linha entre o inicio do nome e a primeira data
        linha.split(testString)[1, inicioV];
 
 
    } else {
        //NÃO TEM LETRAS, É O CEI/CNPJ DA EMPRESA
    } */




}

function isVinculoPendente(line) {
    let marcadoresDePendencia = ["PREM_EXT",];


    /* marcadoresDePendencia.forEach(palavra => {

        if (line.includes(palavra)) {
            return true;
        }
    }); */

    /* marcadoresDePendencia.forEach(e => {

        if (line.includes(e)) {
            console.log(">>>>> PENDÊNCIA: " + line);
            return true
        }


    }); */

    if (line.includes("PREM_EXT")) {
        //console.log(">>>>> PENDÊNCIA: " + line);
        return true;
        //return "PREM_EXT";
    }

    //console.log(">>>>> SEM PENDÊNCIA: " + line);

    return false;
}

function isLetraPresente(texto) {
    //return /^[A-Za-z\s]*$/.test(str);

    //FUNÇÃO QUE RETORNA TRUE SE HOUVER SOMENTE NÚMETRO, VIRGULA, PONTO E IFEM

    let reg = /^[0-9.,-/]+$/;
    return !(reg.test(texto));
}

//sequenciador();




//recebendo os dados
document.querySelector(".pastBtnCnis").addEventListener("click", capituraTxtAreaCnis);


function capituraTxtAreaCnis() {

    //recebe o que foi cnis que foi colado
    cnis = document.querySelector("#txtareacnis").value;


    //executa a recepção produzindo vinculos
    sequenciador();
    povoarVinculosFromCnis()


    //lista os vinculos em uma tabela
    //gerarTabela();
}



function povoarVinculosFromCnis() {

    cnisVinculos.forEach(vCnis => {

        if (vCnis.nome.includes("SEGURADO ESPECIAL") && servico == "Aposentadoria por Idade Rural") {


            //adcionar a prova
            let periodo = new NewPeriodo("Período Previamente Positivado", vCnis.inicio, vCnis.fim);

            periodosRuraisPreviamenteConfirmados.push(periodo);
            provasGerais.push(periodo);

            //console.log(`TEMOS ${provasGerais.length} PROVAS`);

            reapresentarProvas();
            apresentarPeriodosPreviamenteConfirmados();


            //se não for aposentadoria por idade rural, adicione como mais um período, igual a um vínculo trabalhista





        } else if (vCnis.nome.includes("BENEFÍCIO")) {//se for apenas um requerimento de benefício indeferido, é para ignorar

            console.log("********************* TEM UM BENEFICIO AQUI");


            if (vCnis.inicio != "") { //ou seja se começou um benefício
                console.log("********************* ELE COMECOU EM " + vCnis.inicio);
                console.log("********************* ELE termina EM " + vCnis.fim);
                console.log("********************* A DER ATUAL É " + der);
                console.log("********************* ELE FERE A DER " + isData1BeforeData2(der, vCnis.fim));


                if (vCnis.fim == "" || isData1BeforeData2(der, vCnis.fim)) { //SE O BENEFÍCIO CONTINUA ATIVO

                    //FAZER EXIGÊNCIA DE TERMO DE OPÇÃO

                    exigenciasGerais.push(`

                    
                    
                    >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> - Vez que a requerente percebe o benefício ${vCnis.nome.split(" ")[1]}, apresentar termo de opção solicitando (1) a cessação do benefício anterior e (2) consignação de possíveis valores recebidos em duplicidade, caso tenha direito ao benefício ora requerido.

                    >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> - Na forma do art. 639 da IN 128/2022, vez que ${sexo == "homem" ? "o" : "a"} requerente é beneficiári${sexo == "homem" ? "o" : "a"} em benefício assistencial ${vCnis.nome.split(" ")[1]} e que não é permitida a acumulação de benefício assistencial e aposentadoria, ${sexo == "homem" ? "o" : "a"} requerente deverá se manifestar expressamente optando entre a aposentadoria (caso tenha direito) e o benefício assistencial que já recebe; [ APRESENTAR TEXTO REALIZANDO A OPÇÃO, ciente de que possíveis valores recebidos em concomitância serão consignados ] 
                    
                    `);

                    reapresentarExigencias();

                    //INCLUIR O BENEFÍCIO LÁ NOS IMPEDIMENTOS PARA EU VER QUE ELE EXISTE
                    const descricao = `Benefício Urbano ${vCnis.fim == "" ? "Ativo" : ""}: NB ${31} / ${vCnis.nome.split(" ")[1]}`;
                    impedimentosGerais.push(new Indicio(descricao, vCnis.inicio, vCnis.fim, "beneficio"));



                } else {//se o benefício tiver início e fim, então registre-o

                    /* if (!isBeneficioUrbano && especie != "87" && especie != "88") {

                        const descricao = `Benefício Rural: NB ${especie} / ${nb}`;
                        provasGerais.push(new Indicio(descricao, getData(dataInicio), getData(dataFim), "beneficio"));

                    } else { */
                    const descricao = `Benefício Urbano ${vCnis.fim == "" ? "Ativo" : ""}: NB ${31} / ${vCnis.nome.split(" ")[1]}`;
                    impedimentosGerais.push(new Indicio(descricao, vCnis.inicio, vCnis.fim, "beneficio"));
                    //}

                }
            } //nem vou fazer o else, se o benefício nem começou não tem nada a ser registrado

        } else {

            //se for vínculo público
            if (vCnis.isVinculoPublico) {

                impedimentosGerais.push(new Indicio(`Vínculo Público: ${vCnis.nome}`, vCnis.inicio, vCnis.fim, "vinculoPublico"));

                //>>> Decidi fazer exigências para todos vínculos públicos
                //if (vCnis.isPendente) {
                fazerExigenciaVinculoPublico(vCnis.nome)
                reapresentarExigencias();
                //}

            } else {//não é vínculo público

                impedimentosGerais.push(new Indicio(`Vínculo/C.I. ${vCnis.isRural ? "Rural" : "Urbano"}: ${vCnis.nome}`, vCnis.inicio, vCnis.fim, "vinculo"));

                if (vCnis.isPendente) {
                    if (vCnis.nome.toLowerCase() == "contribuinte individual") {
                        if (vCnis.tipoPendencia == "PREM_EXT") {
                            //console.log(">>>>>>>>>>>>>>>>>>>>>>>>>> PREM_EXT");
                            fazerExigenciaCIExtemporaneo(vCnis.inicio.slice(" "), vCnis.fim.slice(" "));
                        }

                    } else {
                        fazerExigenciaVinculo(vCnis.nome)
                    }
                    reapresentarExigencias();
                }

            }

        }

    });

    reapresentarImpedimentos();
}



/* function trataDataFromCnis(dataEntrada) {
    const data = dataEntrada.split("/")
    const ano = data[2];
    const mes = data[1];
    const dia = data[0];

    if (dataEntrada == undefined || dataEntrada == "") {
        //return "sem dados"
        return "";
    } else {
        return `${ano}-${mes}-${dia}`;
    }
} */