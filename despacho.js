"use strict";


let cabecalhoView = document.querySelector("#cabecalho");
let paragrafoDeApresentacaoView = document.querySelector("#paragrafoDeApresentacao");
let paragrafoDeAutodeclaracaoView = document.querySelector("#paragrafoDeAutodeclaracao");
let paragrafoDeCNISView = document.querySelector("#paragrafoDeCNIS");
let paragrafoDeImpedimentosView = document.querySelector("#paragrafoDeImpedimentos");
let paragrafoDeProvasView = document.querySelector("#paragrafoDeProvas");
let paragrafoDeRGPView = document.querySelector("#paragrafoDeRGP");
let paragrafosDeAnalisePeranteANormaView = document.querySelector("#paragrafosDeAnalisePeranteANorma");
let paragrafosDeAnalisePeranteANormaView2 = document.querySelector("#paragrafosDeAnalisePeranteANorma2");
let paragrafoDeConclusaoView = document.querySelector("#paragrafoDeConclusao");

let editorGeralView = document.querySelector("#editor-geral");
//let View = document.querySelector("#");

let numeracaoDosParagrafos = 1;
let conclusao = "";

/* document.querySelector(".btn_processa_despacho").addEventListener("click", function () {
    sugerirDespacho();
}); */

function getNumeracaoDosParagrafos() {
    numeracaoDosParagrafos++;
    return numeracaoDosParagrafos - 1;
}

function sugerirDespacho() {

    console.log("sugerir despacho");

    numeracaoDosParagrafos = 1;

    cabecalho();
    paragrafoDeApresentacao();
    paragrafoDeAutodeclaracao();

    if (isProvasSuficientes == "sim") {

        paragrafoDeCNIS();
        //paragrafoDeImpedimentos();

        paragrafoDeProvas();


    } /* else {
        paragrafoDeImpedimentos();
    } */



    if (tipo == "pescador") {
        paragrafoDeRGP();
    }


    paragrafoDeAnalisePeranteANorma();
    paragrafoDeConclusao();


    /*    
    
    paragrafosDeAnalisePeranteANorma();
     */

    //editorGeralView.innerHTML = document.querySelector("#conteudo-despacho").innerHTML;
    //document.getElementById("editor").value = document.getElementById("conteudo-despacho").innerHTML;
    //document.querySelector("#editor").value = document.querySelector("#conteudo-despacho").textContent;

    let tudo = document.getElementById("conteudo-despacho").innerHTML;

    const delta = editor.clipboard.convert(tudo);

    editor.setContents(delta, 'silent');

    //editor.clipboard.dangerouslyPasteHTML(5, delta);
}


function cabecalho() {

    console.log("cabecalho");

    let txt = `Ag??ncia da Previd??ncia Social<br>

    Req.: ${nome}<br>
    Ref.: ${servico}<br>
    NB.: 41/ ${nb_presente}<br>`;
    cabecalhoView.innerHTML = txt;



}

function paragrafoDeApresentacao() {

    console.log("paragrafoDeApresentacao");

    let txt = `
    ${getNumeracaoDosParagrafos()} ??? Trata-se de requerimento de ${servico} realizado por ${sexo == "homem" ? "declarado trabalhador" : "declarada trabalhadora"} rural em ${getData(der)}, data em que  ${sexo == "homem" ? "o" : "a"} requerente,  ${sexo == "homem" ? "nascido" : "nascida"} em ${getData(dataNascimento)}, contava com ${idade} anos de vida;`;

    paragrafoDeApresentacaoView.innerHTML = txt;

}



function paragrafoDeAutodeclaracao() {

    console.log("paragrafoDeAutodeclaracao");

    let anexo = "";

    if (temAutodeclaracao === "sim") {
        if (tipo === "rural") {
            anexo = "Anexo I do Of??cio-Circular n?? 46 DIRBEN/INSS de 13/09/2019";
        } else if (tipo == "pescador") {
            anexo = "Anexo II do Of??cio-Circular n?? 46 DIRBEN/INSS de 13/09/2019";
        } else if (tipo == "indigena") {
            anexo = "Anexo I da IN 77/2015 (Certid??o de Exerc??cio de Atividade Rural - Ind??gena) ";
        }
    }

    let txt = "";

    if (temAutodeclaracao === "sim") {
        txt = `
        ${getNumeracaoDosParagrafos()} ??? Para comprova????o do labor rural alegado, ${sexo == "homem" ? "o" : "a"} requerente apresenta declara????o na forma do ${anexo}, declarando-se trabalhador${sexo == "homem" ? "" : "a"} rural segurad${sexo == "homem" ? "o" : "a"} especial nos seguintes per??odos e categorias: <br>
    `;
        periodosAutoDeclaradosArray.sort(sortFunction);//reordenando os periodos autodeclarados
        //autodeclarados = `<br><b>Per??odos autodeclarados:</b> <br>`
        for (let i = 0; i < periodosAutoDeclaradosArray.length; i++) {
            txt += ` &nbsp;&nbsp;&nbsp;&nbsp; - Categoria: ${periodosAutoDeclaradosArray[i].categoria}`;
            txt += ` - <span id="autodeclarado_${i}">Per??odo: ${periodosAutoDeclaradosArray[i].inicio} a ${periodosAutoDeclaradosArray[i].fim}</span><br>`;
            /* const duracaoDoPeriodo = calculaDuracao(periodosAutoDeclaradosArray[i]);
            txt += `&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;Dura????o: ${duracaoDoPeriodo.years} anos, ${duracaoDoPeriodo.months} meses, ${duracaoDoPeriodo.days} dias<br> */;
        }
    } else {
        txt = `
        ${getNumeracaoDosParagrafos()} ??? Foi emitida carta de exig??ncias a${sexo == "homem" ? "o" : "a"} requerente para apresenta????o das declara????es de per??odos / atividade (Anexos I ou II - rural ou percador - do Of??cio-Circular n?? 46 DIRBEN/INSS, de 13/09/2019, ou Anexo I da IN 77/2015 (Certid??o de Exerc??cio de Atividade Rural - Ind??gena). A aus??ncia de autodeclara????o impossibilita o reconhecimento da atividade;
    `;

    }

    paragrafoDeAutodeclaracaoView.innerHTML = txt;



}

//beneficiosUrbanos
function paragrafoDeCNIS() {

    console.log("paragrafoDeCNIS");

    let txt = `${getNumeracaoDosParagrafos()} ??? Verifica - se no CNIS d${sexo == "homem" ? "o" : "a"} requerente a ${teveVinculos === "sim" ? "exist??ncias" : "inexist??ncia"} de v??nculos trabalhistas ou recolhimentos. `;

    if (teveVinculos === "sim") {
        if (vinculosUrbanos.length > 0) {
            txt += ` ${sexo == "homem" ? "O" : "A"} requerente teve os seguintes per??odos de v??nculos/contribui????es urbanas:<br>`;
            for (let i = 0; i < vinculosUrbanos.length; i++) {
                let vinculo = vinculosUrbanos[i];
                if (vinculo.nota == "urbano") {
                    txt += ` &nbsp;&nbsp;&nbsp;&nbsp; - ${vinculo.empregador}, de ${vinculo.inicio} a ${vinculo.fim};<br>`;
                }

            }
        } else {
            txt += "N??o identificamos v??nculos / recolhimentos urbanos."
        }

        if (vinculosRurais.length > 0) {
            txt += ` ${sexo == "homem" ? "O" : "A"} requerente j?? computa os seguintes per??odos como trabalhador${sexo == "homem" ? "" : "a"} rural:<br>`;
            for (let i = 0; i < vinculosRurais.length; i++) {
                let vinculo = vinculosRurais[i];
                txt += ` &nbsp;&nbsp;&nbsp;&nbsp; - ${vinculo.empregador}, de ${vinculo.inicio} a ${vinculo.fim};<br>`;
            }


        } else {
            txt += "N??o identificamos v??nculos / recolhimentos rurais."
        }
    }

    if (periodosPreviamentePositivados.length > 0) {
        txt += "Observa-se que o requerente teve previamente positivados (art. 120 da IN 77/2015) os seguintes per??odos:"
        periodosPreviamentePositivados.forEach(p => {
            txt += `<br> &nbsp;&nbsp;&nbsp;&nbsp; - ${p.empregador}: ${p.inicio} a ${p.fim};`;
        });
    }

    if (segurosDesempregos.length > 0) {
        txt += "Por fim, consta recebimento dos seguintes seguros desempregos:<br>"
        segurosDesempregos.forEach(sd => {
            txt += ` &nbsp;&nbsp;&nbsp;&nbsp; - Seguro desemprego, de ${sd.inicio} a ${sd.fim};<br>`;
        });
    }

    if (teveBeneficios === "sim") {

        txt += `Por fim, ${sexo == "homem" ? "o" : "a"} requerente gozou dos seguintes benef??cios: <br>`;

        if (beneficiosUrbanos.length > 0) {
            for (let i = 0; i < beneficiosUrbanos.length; i++) {
                let beneficio = beneficiosUrbanos[i];
                txt += ` &nbsp;&nbsp;&nbsp;&nbsp; - Beneficio Urbano: ${beneficio.especie} / ${beneficio.nb} Data In??cio: ${beneficio.inicio} Data fim: ${beneficio.fim};<br>`;
            }
        }

        if (beneficiosRurais.length > 0) {
            for (let i = 0; i < beneficiosRurais.length; i++) {
                let beneficio = beneficiosRurais[i];
                txt += ` &nbsp;&nbsp;&nbsp;&nbsp; - Beneficio Rural: ${beneficio.especie} / ${beneficio.nb} Data In??cio: ${beneficio.inicio} Data fim: ${beneficio.fim};<br>`;
            }
        }

    }

    paragrafoDeCNISView.innerHTML = txt;

}

function paragrafoDeImpedimentos() {

    /*     console.log("paragrafo de impedimentos");
    
    
        document.querySelector("#txtarea").value = impedimentosView.textContent;
    
        const conteudo = document.querySelector("#txtarea").value; */

    let txt = `${getNumeracaoDosParagrafos()} - Em contr??rio ao declarado verifica-se:`;

    impedimentos_h2.forEach(i_h2 => {
        txt += `<br> &nbsp;&nbsp;&nbsp;&nbsp; - ${i_h2.descricao}`;
    });


    paragrafoDeImpedimentosView.innerHTML = txt;

}

function paragrafoDeProvas() {

    console.log("Paragrafo de Provas");

    //document.querySelector("#txtarea").value = provasView.innerHTML;

    //const conteudo = document.querySelector("#txtarea").value;

    let txt = `${getNumeracaoDosParagrafos()} - Constam nos autos para comprova????o do labor alegado:<br>`;
    //txt += provasView.textContent;

    //txt += conteudo;
    provas_h2.forEach(p_h2 => {
        txt += `<br> &nbsp;&nbsp;&nbsp;&nbsp; - ${p_h2.descricao}`;
    });

    paragrafoDeProvasView.innerHTML = txt;

    paragrafoDeProvasView.style.color = "black";

}

function paragrafoDeRGP() {

    console.log("Paragrafo de RGP");

    let txt = "";

    console.log(`Paragrafo de RGP - tamanho: ${rgpTodos.length}`);

    if (rgpTodos.length > 0) {

        txt = `${getNumeracaoDosParagrafos()} - Verifica-se que ${sexo == "homem" ? "o" : "a"} requerente conta com RGP ??? registro geral de pesca ??? a contar de ${getInicioRGP()}. Na forma do art. 41 ??1?? da IN 77/2015 e fundamenta????o adicional ??? inclusive interpretativa ??? emanada e referida no Consultar 074457/2017, somente ?? pescador profissional aquele com autoriza????o governamental via RGP:<br>

        &nbsp;&nbsp;&nbsp;&nbsp; - Decreto n?? 8425/2015<br>
    
        &nbsp;&nbsp;&nbsp;&nbsp; - Art. 1??: ?? 2?? A atividade pesqueira no Brasil s?? poder?? ser exercida por pessoa f??sica, jur??dica e embarca????o de pesca inscrita no RGP e que detenha autoriza????o, permiss??o ou licen??a para o exerc??cio da atividade pesqueira.`;


    } else {
        txt = `${getNumeracaoDosParagrafos()} - Verifica-se que ${sexo == "homem" ? "o" : "a"} requerente <b>n??o</b> conta com RGP ??? registro geral de pesca. Na forma do art. 41 ??1?? da IN 77/2015 e fundamenta????o adicional ??? inclusive interpretativa ??? emanada e referida no Consultar 074457/2017, somente ?? pescador profissional aquele com autoriza????o governamental via RGP:<br>

        &nbsp;&nbsp;&nbsp;&nbsp; - Decreto n?? 8425/2015<br>
    
        &nbsp;&nbsp;&nbsp;&nbsp; - Art. 1??: ?? 2?? A atividade pesqueira no Brasil s?? poder?? ser exercida por pessoa f??sica, jur??dica e embarca????o de pesca inscrita no RGP e que detenha autoriza????o, permiss??o ou licen??a para o exerc??cio da atividade pesqueira.`;
    }

    paragrafoDeRGPView.innerHTML = txt



}

function paragrafoDeAnalisePeranteANorma() {

    console.log("paragrafosDeAnalisePeranteANorma");

    let txt = "";

    console.log("Estamos verificando se as fprovas s??o suficientes " + isProvasSuficientes);

    if (isProvasSuficientes == "sim") {

        conclusao = "deferimento";

        console.log("sim, s??o suficientes");

        txt = `${getNumeracaoDosParagrafos()} - Observa-se que os documentos apresentados pel${sexo == "homem" ? "o" : "a"} requerente s??o listados nos art. 47 e 54 da IN 77/2015 e, ou, no art. 106 da Lei n?? 8213/1991. Tais provas, ?? luz do Of??cio Circular n??46 DIRBEN/INSS, de 13/09/2019, os documentos apresentados e as bases governamentais apontadas ratificam a atividade como segurado especial satisfazendo a car??ncia exigida (180 meses - na forma dos art. 182 do Decreto 3.048/99 e art.25, II e art. 142 da Lei 8.213/1991):<br><br>

        <i>
        &nbsp;&nbsp;&nbsp;&nbsp; 6.     Para fins de ratifica????o  do per??odo autodeclarado, ser??o observados os seguintes crit??rios:<br> 
         
        &nbsp;&nbsp;&nbsp;&nbsp;  &nbsp;&nbsp;&nbsp;&nbsp; 6.1. Per??odo de abrang??ncia da prova apresentada: <br>
         
        &nbsp;&nbsp;&nbsp;&nbsp;  &nbsp;&nbsp;&nbsp;&nbsp; I - na an??lise de benef??cios de aposentadoria por idade, para fins de c??mputo de car??ncia, dever?? ser apresentado, no m??nimo, um instrumento ratificador (base governamental ou documento) contempor??neo para cada metade da car??ncia exigida no benef??cio. Caso o segurado declare per??odo superior ?? car??ncia, o mesmo poder?? ser reconhecido, desde que haja documentos contempor??neos ao per??odo adicional; <br><br>
        
        &nbsp;&nbsp;&nbsp;&nbsp; 7.<br>
        &nbsp;&nbsp;&nbsp;&nbsp;  &nbsp;&nbsp;&nbsp;&nbsp; b) s??o consideradas provas, dentre outras, as listadas no art. 106 da Lei n?? 8.213, de 1991, bem como nos incisos I, III e IV a XI do art. 47 e art. 54 ambos da IN n?? 77/PRES/INSS, de 2015, n??o havendo distin????o entre prova plena e in??cio de prova material para fins de comprova????o de atividade rural do SE.<br>
        
        &nbsp;&nbsp;&nbsp;&nbsp;  &nbsp;&nbsp;&nbsp;&nbsp; ???<br>
        &nbsp;&nbsp;&nbsp;&nbsp;  &nbsp;&nbsp;&nbsp;&nbsp; a) todo e qualquer instrumento ratificador vale para qualquer membro do grupo familiar, devendo o titular do instrumento possuir condi????o de SE no per??odo pretendido, caso contr??rio a pessoa interessada dever?? apresentar instrumento ratificador em nome pr??prio; <br><br>
        
        &nbsp;&nbsp;&nbsp;&nbsp; 8. Os per??odos reconhecidos pelo INSS, tanto no CNIS, quanto nos sistemas de benef??cios, devem ser considerados v??lidos para todos os fins. Com rela????o aos per??odos n??o reconhecidos, caso o segurado apresente nova documenta????o com base nas novas regras vigentes, esta dever?? ser analisada.<br>
        </i>`;


        paragrafosDeAnalisePeranteANormaView.innerHTML = txt;
    } else {

        getParagrafosIndeferimento(motivoIndeferimento, "primario");

        if (motivoIndeferimento2 != "") {
            getParagrafosIndeferimento(motivoIndeferimento2, "secundario");
        }



        /*
               txt = "";
               if (motivoIndeferimento == "falta_de_qualidade_de_segurado_na_der") {
       
                   conclusao = "indeferimento"
       
                   console.log("falta de qualidade de segurado na DER");
       
                   txt = `${getNumeracaoDosParagrafos()} - O art.231 da IN 77/2015 determina a necessidade do trabalhador rural possuir qualidade de segurado especial na DER ou na data de implementa????o de todos os requisitos. ${sexo == "homem" ? "O" : "A"} requerente completou ${sexo == "homem" ? "60" : "55"} anos em ${sexo == "homem" ? calculaAnoQueCompletouIdadeDesejada(60) : calculaAnoQueCompletouIdadeDesejada(55)}, data em que j?? n??o possuiria qualidade de segurad${sexo == "homem" ? "o" : "a"} especial.`;
       
                   paragrafosDeAnalisePeranteANormaView.innerHTML = txt;
               } else if (motivoIndeferimento == "falta_de_carencia") {
       
                   conclusao = "indeferimento"
       
                   console.log("falta de car??ncia");
       
                   txt = `${getNumeracaoDosParagrafos()} - Na forma dos art. 47 e 54 da IN 77/2015, art. 106 da Lei n?? 8213/1991 e ?? luz do Of??cio Circular n??46 DIRBEN/INSS de 13/09/2019, os documentos apresentados e as bases governamentais encontradas - ou a aus??ncia destes elementos, mesmo ap??s emiss??o de carta de exig??ncias - n??o ratificam a atividade como segurad${sexo == "homem" ? "o" : "a"} especial em per??odo suficiente ?? car??ncia exigida (180 meses - na forma dos art. 182 do Decreto 3.048/99 e art.25, II e art. 142 da Lei 8.213/1991);`;
       
                   paragrafosDeAnalisePeranteANormaView.innerHTML = txt;
       
       
       
               } else if (motivoIndeferimento == "falta_de_carencia_docs_em_nome_de_nao_segurado_especial") {
       
                   conclusao = "indeferimento"
       
                   console.log("falta de car??ncia");
       
                   txt = `${getNumeracaoDosParagrafos()} - Na forma dos art. 47 e 54 da IN 77/2015, art. 106 da Lei n?? 8213/1991 e ?? luz do Of??cio Circular n??46 DIRBEN/INSS de 13/09/2019, os documentos apresentados e as bases governamentais encontradas - ou a aus??ncia destes elementos, mesmo ap??s emiss??o de carta de exig??ncias - n??o ratificam a atividade como segurad${sexo == "homem" ? "o" : "a"} especial em per??odo suficiente ?? car??ncia exigida (180 meses - na forma dos art. 182 do Decreto 3.048/99 e art.25, II e art. 142 da Lei 8.213/1991). Observa-se que foram apresentados documentos em nome de terceiros os quais n??o gozavam, ?? ??poca, de qualidade de segurado especial. Na forma do item 7, III, a), do j?? referido O.C. 46/2019, somente podem ser consideradas provas emitidas em nome d${sexo == "homem" ? "o" : "a"} requerente ou de membros do grupo familiar que detenham a qualidade de segurado especial;`;
       
                   paragrafosDeAnalisePeranteANormaView.innerHTML = txt;
               } else if (motivoIndeferimento == "nao_apresentou_anexo_preenchido_direito") {
       
                   conclusao = "indeferimento"
       
                   console.log("falta de car??ncia");
       
                   let anexo = "";
       
                   if (tipo === "rural") {
                       anexo = "Anexo I do Of??cio-Circular n?? 46 DIRBEN/INSS de 13/09/2019";
                   } else if (tipo == "pescador") {
                       anexo = "Anexo II do Of??cio-Circular n?? 46 DIRBEN/INSS de 13/09/2019";
                   } else if (tipo == "indigena") {
                       anexo = "Anexo I da IN 77/2015 (Certid??o de Exerc??cio de Atividade Rural - Ind??gena) ";
                   } else {
                       anexo = "Anexos I ou II - rural ou percador - do Of??cio-Circular n?? 46 DIRBEN/INSS, de 13/09/2019, ou Anexo I da IN 77/2015 (Certid??o de Exerc??cio de Atividade Rural - Ind??gena";
                   }
       
                   txt = `${getNumeracaoDosParagrafos()} - Mesmo ap??s emiss??o de carta de exig??ncias, ${sexo == "homem" ? "o" : "a"} requerente n??o apresentou a autodeclara????o de per??odos / atividade (${anexo}) preenchido adequadamente, o que impossibilita o reconhecimento da atividade. ${oQueEstaErradoNoFormulario};`;
       
                   paragrafosDeAnalisePeranteANormaView.innerHTML = txt;
               } else if (motivoIndeferimento == "nao_apresentou_anexo") {
       
                   //let oQueEstaErrado = prompt("O que est?? errado no formul??rio: ")
       
                   conclusao = "indeferimento"
       
                   console.log("falta de car??ncia");
       
                   let anexo = "";
       
                   if (tipo === "rural") {
                       anexo = "Anexo I do Of??cio-Circular n?? 46 DIRBEN/INSS de 13/09/2019";
                   } else if (tipo == "pescador") {
                       anexo = "Anexo II do Of??cio-Circular n?? 46 DIRBEN/INSS de 13/09/2019";
                   } else if (tipo == "indigena") {
                       anexo = "Anexo I da IN 77/2015 (Certid??o de Exerc??cio de Atividade Rural - Ind??gena) ";
                   } else {
                       anexo = "Anexos I ou II - rural ou percador - do Of??cio-Circular n?? 46 DIRBEN/INSS, de 13/09/2019, ou Anexo I da IN 77/2015 (Certid??o de Exerc??cio de Atividade Rural - Ind??gena";
                   }
       
                   txt = `${getNumeracaoDosParagrafos()} - Mesmo ap??s emiss??o de carta de exig??ncias, ${sexo == "homem" ? "o" : "a"} requerente n??o apresentou a autodeclara????o de per??odos / atividade (${anexo}), o que impossibilita o reconhecimento da atividade;`;
       
                   paragrafosDeAnalisePeranteANormaView.innerHTML = txt;
               } else if (motivoIndeferimento == "falta_de_carencia_so_docs_feitos_as_vesperas") {
       
                   conclusao = "indeferimento"
       
                   console.log("falta de car??ncia");
       
                   txt = `${getNumeracaoDosParagrafos()} - Mesmo ap??s emiss??o de carta de exig??ncias solicitando apresenta????o de documenta????o complementar, a quase totalidade dos documentos apresentados ou est??o em nome de terceiros ou foram produzidos ??s v??speras do requerimento, portanto sem validade conforme item 24 do Parecer 3136/2003. ${oQueEstaErrado != "" ? oQueEstaErrado : ""};`;
       
                   paragrafosDeAnalisePeranteANormaView.innerHTML = txt;
               } */
    }
}

function getParagrafosIndeferimento(motivo, ordem) {

    let txt = "";

    if (motivo == "falta_de_qualidade_de_segurado_na_der") {

        conclusao = "indeferimento"

        console.log("falta de qualidade de segurado na DER");

        txt = `${getNumeracaoDosParagrafos()} - O art.231 da IN 77/2015 determina a necessidade do trabalhador rural possuir qualidade de segurado especial na DER ou na data de implementa????o de todos os requisitos. ${sexo == "homem" ? "O" : "A"} requerente completou ${sexo == "homem" ? "60" : "55"} anos em ${sexo == "homem" ? calculaAnoQueCompletouIdadeDesejada(60) : calculaAnoQueCompletouIdadeDesejada(55)}, data em que j?? n??o possuiria qualidade de segurad${sexo == "homem" ? "o" : "a"} especial.`;


        //paragrafosDeAnalisePeranteANormaView.innerHTML = txt;
    } else if (motivo == "falta_de_carencia") {

        conclusao = "indeferimento"

        console.log("falta de car??ncia");

        txt = `${getNumeracaoDosParagrafos()} - Na forma dos art. 47 e 54 da IN 77/2015, art. 106 da Lei n?? 8213/1991 e ?? luz do Of??cio Circular n??46 DIRBEN/INSS de 13/09/2019, os documentos apresentados e as bases governamentais encontradas - ou a aus??ncia destes elementos, mesmo ap??s emiss??o de carta de exig??ncias - n??o ratificam a atividade como segurad${sexo == "homem" ? "o" : "a"} especial em per??odo suficiente ?? car??ncia exigida (180 meses - na forma dos art. 182 do Decreto 3.048/99 e art.25, II e art. 142 da Lei 8.213/1991);`;

        //paragrafosDeAnalisePeranteANormaView.innerHTML = txt;



    } else if (motivo == "falta_de_carencia_periodo_declarado_insuficiente") {

        conclusao = "indeferimento"

        console.log("falta de car??ncia - per??odo declarado insuficiente");

        txt = `${getNumeracaoDosParagrafos()} - A car??ncia exigida para concess??o do benef??cio requerido ?? de 180 meses (15 anos) - na forma dos art. 182 do Decreto 3.048/99 e art.25, II e art. 142 da Lei 8.213/1991. Observa-se que os per??odos autodeclarados pel${sexo == "homem" ? "o" : "a"} requerente como trabalhados totalizam apenas ${totalAutodeclarado[0]} anos, ${totalAutodeclarado[1]} meses e ${totalAutodeclarado[2]} dias, de modo que, ainda que restassem integralmente homologados, s??o insuficientes ao m??nimo exigido, n??o restando cumprido o quesito car??ncia;`;

        //paragrafosDeAnalisePeranteANormaView.innerHTML = txt;



    } else if (motivo == "falta_de_carencia_docs_em_nome_de_nao_segurado_especial") {

        conclusao = "indeferimento"

        console.log("falta de car??ncia");

        txt = `${getNumeracaoDosParagrafos()} - Na forma dos art. 47 e 54 da IN 77/2015, art. 106 da Lei n?? 8213/1991 e ?? luz do Of??cio Circular n??46 DIRBEN/INSS de 13/09/2019, os documentos apresentados e as bases governamentais encontradas - ou a aus??ncia destes elementos, mesmo ap??s emiss??o de carta de exig??ncias - n??o ratificam a atividade como segurad${sexo == "homem" ? "o" : "a"} especial em per??odo suficiente ?? car??ncia exigida (180 meses - na forma dos art. 182 do Decreto 3.048/99 e art.25, II e art. 142 da Lei 8.213/1991). Observa-se que foram apresentados documentos em nome de terceiros os quais n??o gozavam, ?? ??poca, de qualidade de segurado especial. Na forma do item 7, III, a), do j?? referido O.C. 46/2019, somente podem ser consideradas provas emitidas em nome d${sexo == "homem" ? "o" : "a"} requerente ou de membros do grupo familiar que detenham a qualidade de segurado especial;`;

        //paragrafosDeAnalisePeranteANormaView.innerHTML = txt;
    } else if (motivo == "nao_apresentou_anexo_preenchido_direito") {

        conclusao = "indeferimento"

        console.log("falta de car??ncia");

        let anexo = "";

        if (tipo === "rural") {
            anexo = "Anexo I do Of??cio-Circular n?? 46 DIRBEN/INSS de 13/09/2019";
        } else if (tipo == "pescador") {
            anexo = "Anexo II do Of??cio-Circular n?? 46 DIRBEN/INSS de 13/09/2019";
        } else if (tipo == "indigena") {
            anexo = "Anexo I da IN 77/2015 (Certid??o de Exerc??cio de Atividade Rural - Ind??gena) ";
        } else {
            anexo = "Anexos I ou II - rural ou percador - do Of??cio-Circular n?? 46 DIRBEN/INSS, de 13/09/2019, ou Anexo I da IN 77/2015 (Certid??o de Exerc??cio de Atividade Rural - Ind??gena";
        }

        txt = `${getNumeracaoDosParagrafos()} - Mesmo ap??s emiss??o de carta de exig??ncias, ${sexo == "homem" ? "o" : "a"} requerente n??o apresentou a autodeclara????o de per??odos / atividade (${anexo}) preenchida adequadamente, o que impossibilita o reconhecimento da atividade. ${oQueEstaErradoNoFormulario};`;

        //paragrafosDeAnalisePeranteANormaView.innerHTML = txt;
    } else if (motivo == "nao_apresentou_anexo") {

        //let oQueEstaErrado = prompt("O que est?? errado no formul??rio: ")

        conclusao = "indeferimento"

        console.log("falta de car??ncia");

        let anexo = "";

        if (tipo === "rural") {
            anexo = "Anexo I do Of??cio-Circular n?? 46 DIRBEN/INSS de 13/09/2019";
        } else if (tipo == "pescador") {
            anexo = "Anexo II do Of??cio-Circular n?? 46 DIRBEN/INSS de 13/09/2019";
        } else if (tipo == "indigena") {
            anexo = "Anexo I da IN 77/2015 (Certid??o de Exerc??cio de Atividade Rural - Ind??gena) ";
        } else {
            anexo = "Anexos I ou II - rural ou percador - do Of??cio-Circular n?? 46 DIRBEN/INSS, de 13/09/2019, ou Anexo I da IN 77/2015 (Certid??o de Exerc??cio de Atividade Rural - Ind??gena";
        }

        txt = `${getNumeracaoDosParagrafos()} - Mesmo ap??s emiss??o de carta de exig??ncias, ${sexo == "homem" ? "o" : "a"} requerente n??o apresentou a autodeclara????o de per??odos / atividade (${anexo}), o que impossibilita o reconhecimento da atividade;`;

        //paragrafosDeAnalisePeranteANormaView.innerHTML = txt;
    } else if (motivo == "falta_de_carencia_so_docs_feitos_as_vesperas") {

        conclusao = "indeferimento"

        console.log("falta de car??ncia");

        txt = `${getNumeracaoDosParagrafos()} - Mesmo ap??s emiss??o de carta de exig??ncias solicitando apresenta????o de documenta????o complementar, a quase totalidade dos documentos apresentados ou est??o em nome de terceiros ou foram produzidos ??s v??speras do requerimento, portanto sem validade conforme item 24 do Parecer 3136/2003. ${oQueEstaErradoDocsFeitosAsVesperas != "" ? oQueEstaErradoDocsFeitosAsVesperas : ""};`;

        //paragrafosDeAnalisePeranteANormaView.innerHTML = txt;
    } else if (motivo == "falta_de_idade_minima") {

        conclusao = "indeferimento"

        console.log("falta de idade minima");

        txt = `${getNumeracaoDosParagrafos()} - Verifica-se que ${sexo == "homem" ? "o" : "a"} requerente conta, na DER, com ${idade} anos de vida. Na forma dos art.51 e 56 do Decreto 3.048/99, a idade m??nima exigida para aposentadoria por idade rural ?? de 55 anos para mulheres e 60 anos para homens. Para benef??cios h??bridos (com c??mputo de per??odos rurais e urbanos) ou somente urbanos, a idade minima ?? de 62 anos para mulheres e 65 anos para homens;`;

    } else if (motivo == "falta_de_carencia_acampado") {

        conclusao = "indeferimento"

        console.log("falta de idade minima");

        txt = `${getNumeracaoDosParagrafos()} - Verifica-se que ${sexo == "homem" ? "o" : "a"} requerente declara per??odo como "acampad${sexo == "homem" ? "o" : "a"}". Na forma do Of??cio SEI Circular Conjunto n?? 01/2020/DIRBEN/PFE/INSS, de 16/01/2020, relativo ?? decis??o proferida pela A????o Civil P??blica n?? 000380795.2011.4.05.8300, para benef??cios requeridos a partir de 16/01/2020, os per??odos sob categoria de "acampado" n??o ser??o considerados como segurado especial.";`;

    } else if (motivo == "apresentar_impedientos") {

        paragrafoDeImpedimentos();

    } else if (motivo == "analfabeto_sem_procuracao_publica") {
        conclusao = "indeferimento"

        console.log("falta de idade minima");

        txt = `${getNumeracaoDosParagrafos()} - Verifica-se que o benef??cio foi protocolado por terceiro. Uma vez que, conforme RG apresentado, ${sexo == "homem" ? "o" : "a"} requerente n??o ?? alfabetizad${sexo == "homem" ? "o" : "a"}, foi emitida carta de exig??ncia para apresenta????o de procura????o p??blica na forma do art. 499 ?? ??nico da IN 77/2015. Decorrido o prazo legal, e at?? a data atual, n??o houve apresenta????o da procura????o;`;
    }






    if (ordem == "primario") {
        paragrafosDeAnalisePeranteANormaView.innerHTML = txt;
    } else {
        paragrafosDeAnalisePeranteANormaView2.innerHTML = txt;
    }

}

function paragrafoDeConclusao() {

    console.log("conclus??o: " + conclusao);
    let txt = "";

    if (conclusao == "deferimento") {

        txt = `${getNumeracaoDosParagrafos()} - Assim sendo, o pleito restou deferido.`;

    } else {

        if (motivoIndeferimento == "falta_de_qualidade_de_segurado_na_der") {
            txt = `${getNumeracaoDosParagrafos()} - Face ao exposto, o pleito restou indeferido por n??o comprova????o da atividade rural alegada/ falta de qualidade de segurad${sexo == "homem" ? "o" : "a"} especial na DER ou no ano em que foi implementado o quesito et??rio;`;
        } else { //if (motivoIndeferimento == "falta_de_carencia" || motivoIndeferimento == "nao_apresentou_anexo" || motivoIndeferimento == "nao_apresentou_anexo_preenchido_direito") {
            txt = `${getNumeracaoDosParagrafos()} - Face ao exposto, o pleito restou indeferido por falta de per??odo de car??ncia;`;
        }

    }

    paragrafoDeConclusaoView.innerHTML = txt;

}


function getInicioRGP() {
    if (rgpTodos.length == 1) return rgpTodos[0].inicio;
    else {
        rgpTodos.sort(function (a, b) { //isso ?? s?? para n??meros simples
            let dataA = a.inicio.slice();//clona a string
            let dataB = b.inicio.slice();
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

    return rgpTodos[0].inicio;

}


