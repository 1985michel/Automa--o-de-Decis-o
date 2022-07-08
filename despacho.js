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

    let txt = `Agência da Previdência Social<br>

    Req.: ${nome}<br>
    Ref.: ${servico}<br>
    NB.: 41/ ${nb_presente}<br>`;
    cabecalhoView.innerHTML = txt;



}

function paragrafoDeApresentacao() {

    console.log("paragrafoDeApresentacao");

    let txt = `
    ${getNumeracaoDosParagrafos()} – Trata-se de requerimento de ${servico} realizado por ${sexo == "homem" ? "declarado trabalhador" : "declarada trabalhadora"} rural em ${getData(der)}, data em que  ${sexo == "homem" ? "o" : "a"} requerente,  ${sexo == "homem" ? "nascido" : "nascida"} em ${getData(dataNascimento)}, contava com ${idade} anos de vida;`;

    paragrafoDeApresentacaoView.innerHTML = txt;

}



function paragrafoDeAutodeclaracao() {

    console.log("paragrafoDeAutodeclaracao");

    let anexo = "";

    if (temAutodeclaracao === "sim") {
        if (tipo === "rural") {
            anexo = "Anexo I do Ofício-Circular nº 46 DIRBEN/INSS de 13/09/2019";
        } else if (tipo == "pescador") {
            anexo = "Anexo II do Ofício-Circular nº 46 DIRBEN/INSS de 13/09/2019";
        } else if (tipo == "indigena") {
            anexo = "Anexo I da IN 77/2015 (Certidão de Exercício de Atividade Rural - Indígena) ";
        }
    }

    let txt = "";

    if (temAutodeclaracao === "sim") {
        txt = `
        ${getNumeracaoDosParagrafos()} – Para comprovação do labor rural alegado, ${sexo == "homem" ? "o" : "a"} requerente apresenta declaração na forma do ${anexo}, declarando-se trabalhador${sexo == "homem" ? "" : "a"} rural segurad${sexo == "homem" ? "o" : "a"} especial nos seguintes períodos e categorias: <br>
    `;
        periodosAutoDeclaradosArray.sort(sortFunction);//reordenando os periodos autodeclarados
        //autodeclarados = `<br><b>Períodos autodeclarados:</b> <br>`
        for (let i = 0; i < periodosAutoDeclaradosArray.length; i++) {
            txt += ` &nbsp;&nbsp;&nbsp;&nbsp; - Categoria: ${periodosAutoDeclaradosArray[i].categoria}`;
            txt += ` - <span id="autodeclarado_${i}">Período: ${periodosAutoDeclaradosArray[i].inicio} a ${periodosAutoDeclaradosArray[i].fim}</span><br>`;
            /* const duracaoDoPeriodo = calculaDuracao(periodosAutoDeclaradosArray[i]);
            txt += `&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;Duração: ${duracaoDoPeriodo.years} anos, ${duracaoDoPeriodo.months} meses, ${duracaoDoPeriodo.days} dias<br> */;
        }
    } else {
        txt = `
        ${getNumeracaoDosParagrafos()} – Foi emitida carta de exigências a${sexo == "homem" ? "o" : "a"} requerente para apresentação das declarações de períodos / atividade (Anexos I ou II - rural ou percador - do Ofício-Circular nº 46 DIRBEN/INSS, de 13/09/2019, ou Anexo I da IN 77/2015 (Certidão de Exercício de Atividade Rural - Indígena). A ausência de autodeclaração impossibilita o reconhecimento da atividade;
    `;

    }

    paragrafoDeAutodeclaracaoView.innerHTML = txt;



}

//beneficiosUrbanos
function paragrafoDeCNIS() {

    console.log("paragrafoDeCNIS");

    let txt = `${getNumeracaoDosParagrafos()} – Verifica - se no CNIS d${sexo == "homem" ? "o" : "a"} requerente a ${teveVinculos === "sim" ? "existências" : "inexistência"} de vínculos trabalhistas ou recolhimentos. `;

    if (teveVinculos === "sim") {
        if (vinculosUrbanos.length > 0) {
            txt += ` ${sexo == "homem" ? "O" : "A"} requerente teve os seguintes períodos de vínculos/contribuições urbanas:<br>`;
            for (let i = 0; i < vinculosUrbanos.length; i++) {
                let vinculo = vinculosUrbanos[i];
                if (vinculo.nota == "urbano") {
                    txt += ` &nbsp;&nbsp;&nbsp;&nbsp; - ${vinculo.empregador}, de ${vinculo.inicio} a ${vinculo.fim};<br>`;
                }

            }
        } else {
            txt += "Não identificamos vínculos / recolhimentos urbanos."
        }

        if (vinculosRurais.length > 0) {
            txt += ` ${sexo == "homem" ? "O" : "A"} requerente já computa os seguintes períodos como trabalhador${sexo == "homem" ? "" : "a"} rural:<br>`;
            for (let i = 0; i < vinculosRurais.length; i++) {
                let vinculo = vinculosRurais[i];
                txt += ` &nbsp;&nbsp;&nbsp;&nbsp; - ${vinculo.empregador}, de ${vinculo.inicio} a ${vinculo.fim};<br>`;
            }


        } else {
            txt += "Não identificamos vínculos / recolhimentos rurais."
        }
    }

    if (periodosPreviamentePositivados.length > 0) {
        txt += "Observa-se que o requerente teve previamente positivados (art. 120 da IN 77/2015) os seguintes períodos:"
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

        txt += `Por fim, ${sexo == "homem" ? "o" : "a"} requerente gozou dos seguintes benefícios: <br>`;

        if (beneficiosUrbanos.length > 0) {
            for (let i = 0; i < beneficiosUrbanos.length; i++) {
                let beneficio = beneficiosUrbanos[i];
                txt += ` &nbsp;&nbsp;&nbsp;&nbsp; - Beneficio Urbano: ${beneficio.especie} / ${beneficio.nb} Data Início: ${beneficio.inicio} Data fim: ${beneficio.fim};<br>`;
            }
        }

        if (beneficiosRurais.length > 0) {
            for (let i = 0; i < beneficiosRurais.length; i++) {
                let beneficio = beneficiosRurais[i];
                txt += ` &nbsp;&nbsp;&nbsp;&nbsp; - Beneficio Rural: ${beneficio.especie} / ${beneficio.nb} Data Início: ${beneficio.inicio} Data fim: ${beneficio.fim};<br>`;
            }
        }

    }

    paragrafoDeCNISView.innerHTML = txt;

}

function paragrafoDeImpedimentos() {

    /*     console.log("paragrafo de impedimentos");
    
    
        document.querySelector("#txtarea").value = impedimentosView.textContent;
    
        const conteudo = document.querySelector("#txtarea").value; */

    let txt = `${getNumeracaoDosParagrafos()} - Em contrário ao declarado verifica-se:`;

    impedimentos_h2.forEach(i_h2 => {
        txt += `<br> &nbsp;&nbsp;&nbsp;&nbsp; - ${i_h2.descricao}`;
    });


    paragrafoDeImpedimentosView.innerHTML = txt;

}

function paragrafoDeProvas() {

    console.log("Paragrafo de Provas");

    //document.querySelector("#txtarea").value = provasView.innerHTML;

    //const conteudo = document.querySelector("#txtarea").value;

    let txt = `${getNumeracaoDosParagrafos()} - Constam nos autos para comprovação do labor alegado:<br>`;
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

        txt = `${getNumeracaoDosParagrafos()} - Verifica-se que ${sexo == "homem" ? "o" : "a"} requerente conta com RGP – registro geral de pesca – a contar de ${getInicioRGP()}. Na forma do art. 41 §1º da IN 77/2015 e fundamentação adicional – inclusive interpretativa – emanada e referida no Consultar 074457/2017, somente é pescador profissional aquele com autorização governamental via RGP:<br>

        &nbsp;&nbsp;&nbsp;&nbsp; - Decreto nº 8425/2015<br>
    
        &nbsp;&nbsp;&nbsp;&nbsp; - Art. 1º: § 2º A atividade pesqueira no Brasil só poderá ser exercida por pessoa física, jurídica e embarcação de pesca inscrita no RGP e que detenha autorização, permissão ou licença para o exercício da atividade pesqueira.`;


    } else {
        txt = `${getNumeracaoDosParagrafos()} - Verifica-se que ${sexo == "homem" ? "o" : "a"} requerente <b>não</b> conta com RGP – registro geral de pesca. Na forma do art. 41 §1º da IN 77/2015 e fundamentação adicional – inclusive interpretativa – emanada e referida no Consultar 074457/2017, somente é pescador profissional aquele com autorização governamental via RGP:<br>

        &nbsp;&nbsp;&nbsp;&nbsp; - Decreto nº 8425/2015<br>
    
        &nbsp;&nbsp;&nbsp;&nbsp; - Art. 1º: § 2º A atividade pesqueira no Brasil só poderá ser exercida por pessoa física, jurídica e embarcação de pesca inscrita no RGP e que detenha autorização, permissão ou licença para o exercício da atividade pesqueira.`;
    }

    paragrafoDeRGPView.innerHTML = txt



}

function paragrafoDeAnalisePeranteANorma() {

    console.log("paragrafosDeAnalisePeranteANorma");

    let txt = "";

    console.log("Estamos verificando se as fprovas são suficientes " + isProvasSuficientes);

    if (isProvasSuficientes == "sim") {

        conclusao = "deferimento";

        console.log("sim, são suficientes");

        txt = `${getNumeracaoDosParagrafos()} - Observa-se que os documentos apresentados pel${sexo == "homem" ? "o" : "a"} requerente são listados nos art. 47 e 54 da IN 77/2015 e, ou, no art. 106 da Lei nº 8213/1991. Tais provas, à luz do Ofício Circular nº46 DIRBEN/INSS, de 13/09/2019, os documentos apresentados e as bases governamentais apontadas ratificam a atividade como segurado especial satisfazendo a carência exigida (180 meses - na forma dos art. 182 do Decreto 3.048/99 e art.25, II e art. 142 da Lei 8.213/1991):<br><br>

        <i>
        &nbsp;&nbsp;&nbsp;&nbsp; 6.     Para fins de ratificação  do período autodeclarado, serão observados os seguintes critérios:<br> 
         
        &nbsp;&nbsp;&nbsp;&nbsp;  &nbsp;&nbsp;&nbsp;&nbsp; 6.1. Período de abrangência da prova apresentada: <br>
         
        &nbsp;&nbsp;&nbsp;&nbsp;  &nbsp;&nbsp;&nbsp;&nbsp; I - na análise de benefícios de aposentadoria por idade, para fins de cômputo de carência, deverá ser apresentado, no mínimo, um instrumento ratificador (base governamental ou documento) contemporâneo para cada metade da carência exigida no benefício. Caso o segurado declare período superior à carência, o mesmo poderá ser reconhecido, desde que haja documentos contemporâneos ao período adicional; <br><br>
        
        &nbsp;&nbsp;&nbsp;&nbsp; 7.<br>
        &nbsp;&nbsp;&nbsp;&nbsp;  &nbsp;&nbsp;&nbsp;&nbsp; b) são consideradas provas, dentre outras, as listadas no art. 106 da Lei nº 8.213, de 1991, bem como nos incisos I, III e IV a XI do art. 47 e art. 54 ambos da IN nº 77/PRES/INSS, de 2015, não havendo distinção entre prova plena e início de prova material para fins de comprovação de atividade rural do SE.<br>
        
        &nbsp;&nbsp;&nbsp;&nbsp;  &nbsp;&nbsp;&nbsp;&nbsp; …<br>
        &nbsp;&nbsp;&nbsp;&nbsp;  &nbsp;&nbsp;&nbsp;&nbsp; a) todo e qualquer instrumento ratificador vale para qualquer membro do grupo familiar, devendo o titular do instrumento possuir condição de SE no período pretendido, caso contrário a pessoa interessada deverá apresentar instrumento ratificador em nome próprio; <br><br>
        
        &nbsp;&nbsp;&nbsp;&nbsp; 8. Os períodos reconhecidos pelo INSS, tanto no CNIS, quanto nos sistemas de benefícios, devem ser considerados válidos para todos os fins. Com relação aos períodos não reconhecidos, caso o segurado apresente nova documentação com base nas novas regras vigentes, esta deverá ser analisada.<br>
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
       
                   txt = `${getNumeracaoDosParagrafos()} - O art.231 da IN 77/2015 determina a necessidade do trabalhador rural possuir qualidade de segurado especial na DER ou na data de implementação de todos os requisitos. ${sexo == "homem" ? "O" : "A"} requerente completou ${sexo == "homem" ? "60" : "55"} anos em ${sexo == "homem" ? calculaAnoQueCompletouIdadeDesejada(60) : calculaAnoQueCompletouIdadeDesejada(55)}, data em que já não possuiria qualidade de segurad${sexo == "homem" ? "o" : "a"} especial.`;
       
                   paragrafosDeAnalisePeranteANormaView.innerHTML = txt;
               } else if (motivoIndeferimento == "falta_de_carencia") {
       
                   conclusao = "indeferimento"
       
                   console.log("falta de carência");
       
                   txt = `${getNumeracaoDosParagrafos()} - Na forma dos art. 47 e 54 da IN 77/2015, art. 106 da Lei nº 8213/1991 e à luz do Ofício Circular nº46 DIRBEN/INSS de 13/09/2019, os documentos apresentados e as bases governamentais encontradas - ou a ausência destes elementos, mesmo após emissão de carta de exigências - não ratificam a atividade como segurad${sexo == "homem" ? "o" : "a"} especial em período suficiente à carência exigida (180 meses - na forma dos art. 182 do Decreto 3.048/99 e art.25, II e art. 142 da Lei 8.213/1991);`;
       
                   paragrafosDeAnalisePeranteANormaView.innerHTML = txt;
       
       
       
               } else if (motivoIndeferimento == "falta_de_carencia_docs_em_nome_de_nao_segurado_especial") {
       
                   conclusao = "indeferimento"
       
                   console.log("falta de carência");
       
                   txt = `${getNumeracaoDosParagrafos()} - Na forma dos art. 47 e 54 da IN 77/2015, art. 106 da Lei nº 8213/1991 e à luz do Ofício Circular nº46 DIRBEN/INSS de 13/09/2019, os documentos apresentados e as bases governamentais encontradas - ou a ausência destes elementos, mesmo após emissão de carta de exigências - não ratificam a atividade como segurad${sexo == "homem" ? "o" : "a"} especial em período suficiente à carência exigida (180 meses - na forma dos art. 182 do Decreto 3.048/99 e art.25, II e art. 142 da Lei 8.213/1991). Observa-se que foram apresentados documentos em nome de terceiros os quais não gozavam, à época, de qualidade de segurado especial. Na forma do item 7, III, a), do já referido O.C. 46/2019, somente podem ser consideradas provas emitidas em nome d${sexo == "homem" ? "o" : "a"} requerente ou de membros do grupo familiar que detenham a qualidade de segurado especial;`;
       
                   paragrafosDeAnalisePeranteANormaView.innerHTML = txt;
               } else if (motivoIndeferimento == "nao_apresentou_anexo_preenchido_direito") {
       
                   conclusao = "indeferimento"
       
                   console.log("falta de carência");
       
                   let anexo = "";
       
                   if (tipo === "rural") {
                       anexo = "Anexo I do Ofício-Circular nº 46 DIRBEN/INSS de 13/09/2019";
                   } else if (tipo == "pescador") {
                       anexo = "Anexo II do Ofício-Circular nº 46 DIRBEN/INSS de 13/09/2019";
                   } else if (tipo == "indigena") {
                       anexo = "Anexo I da IN 77/2015 (Certidão de Exercício de Atividade Rural - Indígena) ";
                   } else {
                       anexo = "Anexos I ou II - rural ou percador - do Ofício-Circular nº 46 DIRBEN/INSS, de 13/09/2019, ou Anexo I da IN 77/2015 (Certidão de Exercício de Atividade Rural - Indígena";
                   }
       
                   txt = `${getNumeracaoDosParagrafos()} - Mesmo após emissão de carta de exigências, ${sexo == "homem" ? "o" : "a"} requerente não apresentou a autodeclaração de períodos / atividade (${anexo}) preenchido adequadamente, o que impossibilita o reconhecimento da atividade. ${oQueEstaErradoNoFormulario};`;
       
                   paragrafosDeAnalisePeranteANormaView.innerHTML = txt;
               } else if (motivoIndeferimento == "nao_apresentou_anexo") {
       
                   //let oQueEstaErrado = prompt("O que está errado no formulário: ")
       
                   conclusao = "indeferimento"
       
                   console.log("falta de carência");
       
                   let anexo = "";
       
                   if (tipo === "rural") {
                       anexo = "Anexo I do Ofício-Circular nº 46 DIRBEN/INSS de 13/09/2019";
                   } else if (tipo == "pescador") {
                       anexo = "Anexo II do Ofício-Circular nº 46 DIRBEN/INSS de 13/09/2019";
                   } else if (tipo == "indigena") {
                       anexo = "Anexo I da IN 77/2015 (Certidão de Exercício de Atividade Rural - Indígena) ";
                   } else {
                       anexo = "Anexos I ou II - rural ou percador - do Ofício-Circular nº 46 DIRBEN/INSS, de 13/09/2019, ou Anexo I da IN 77/2015 (Certidão de Exercício de Atividade Rural - Indígena";
                   }
       
                   txt = `${getNumeracaoDosParagrafos()} - Mesmo após emissão de carta de exigências, ${sexo == "homem" ? "o" : "a"} requerente não apresentou a autodeclaração de períodos / atividade (${anexo}), o que impossibilita o reconhecimento da atividade;`;
       
                   paragrafosDeAnalisePeranteANormaView.innerHTML = txt;
               } else if (motivoIndeferimento == "falta_de_carencia_so_docs_feitos_as_vesperas") {
       
                   conclusao = "indeferimento"
       
                   console.log("falta de carência");
       
                   txt = `${getNumeracaoDosParagrafos()} - Mesmo após emissão de carta de exigências solicitando apresentação de documentação complementar, a quase totalidade dos documentos apresentados ou estão em nome de terceiros ou foram produzidos às vésperas do requerimento, portanto sem validade conforme item 24 do Parecer 3136/2003. ${oQueEstaErrado != "" ? oQueEstaErrado : ""};`;
       
                   paragrafosDeAnalisePeranteANormaView.innerHTML = txt;
               } */
    }
}

function getParagrafosIndeferimento(motivo, ordem) {

    let txt = "";

    if (motivo == "falta_de_qualidade_de_segurado_na_der") {

        conclusao = "indeferimento"

        console.log("falta de qualidade de segurado na DER");

        txt = `${getNumeracaoDosParagrafos()} - O art.231 da IN 77/2015 determina a necessidade do trabalhador rural possuir qualidade de segurado especial na DER ou na data de implementação de todos os requisitos. ${sexo == "homem" ? "O" : "A"} requerente completou ${sexo == "homem" ? "60" : "55"} anos em ${sexo == "homem" ? calculaAnoQueCompletouIdadeDesejada(60) : calculaAnoQueCompletouIdadeDesejada(55)}, data em que já não possuiria qualidade de segurad${sexo == "homem" ? "o" : "a"} especial.`;


        //paragrafosDeAnalisePeranteANormaView.innerHTML = txt;
    } else if (motivo == "falta_de_carencia") {

        conclusao = "indeferimento"

        console.log("falta de carência");

        txt = `${getNumeracaoDosParagrafos()} - Na forma dos art. 47 e 54 da IN 77/2015, art. 106 da Lei nº 8213/1991 e à luz do Ofício Circular nº46 DIRBEN/INSS de 13/09/2019, os documentos apresentados e as bases governamentais encontradas - ou a ausência destes elementos, mesmo após emissão de carta de exigências - não ratificam a atividade como segurad${sexo == "homem" ? "o" : "a"} especial em período suficiente à carência exigida (180 meses - na forma dos art. 182 do Decreto 3.048/99 e art.25, II e art. 142 da Lei 8.213/1991);`;

        //paragrafosDeAnalisePeranteANormaView.innerHTML = txt;



    } else if (motivo == "falta_de_carencia_periodo_declarado_insuficiente") {

        conclusao = "indeferimento"

        console.log("falta de carência - período declarado insuficiente");

        txt = `${getNumeracaoDosParagrafos()} - A carência exigida para concessão do benefício requerido é de 180 meses (15 anos) - na forma dos art. 182 do Decreto 3.048/99 e art.25, II e art. 142 da Lei 8.213/1991. Observa-se que os períodos autodeclarados pel${sexo == "homem" ? "o" : "a"} requerente como trabalhados totalizam apenas ${totalAutodeclarado[0]} anos, ${totalAutodeclarado[1]} meses e ${totalAutodeclarado[2]} dias, de modo que, ainda que restassem integralmente homologados, são insuficientes ao mínimo exigido, não restando cumprido o quesito carência;`;

        //paragrafosDeAnalisePeranteANormaView.innerHTML = txt;



    } else if (motivo == "falta_de_carencia_docs_em_nome_de_nao_segurado_especial") {

        conclusao = "indeferimento"

        console.log("falta de carência");

        txt = `${getNumeracaoDosParagrafos()} - Na forma dos art. 47 e 54 da IN 77/2015, art. 106 da Lei nº 8213/1991 e à luz do Ofício Circular nº46 DIRBEN/INSS de 13/09/2019, os documentos apresentados e as bases governamentais encontradas - ou a ausência destes elementos, mesmo após emissão de carta de exigências - não ratificam a atividade como segurad${sexo == "homem" ? "o" : "a"} especial em período suficiente à carência exigida (180 meses - na forma dos art. 182 do Decreto 3.048/99 e art.25, II e art. 142 da Lei 8.213/1991). Observa-se que foram apresentados documentos em nome de terceiros os quais não gozavam, à época, de qualidade de segurado especial. Na forma do item 7, III, a), do já referido O.C. 46/2019, somente podem ser consideradas provas emitidas em nome d${sexo == "homem" ? "o" : "a"} requerente ou de membros do grupo familiar que detenham a qualidade de segurado especial;`;

        //paragrafosDeAnalisePeranteANormaView.innerHTML = txt;
    } else if (motivo == "nao_apresentou_anexo_preenchido_direito") {

        conclusao = "indeferimento"

        console.log("falta de carência");

        let anexo = "";

        if (tipo === "rural") {
            anexo = "Anexo I do Ofício-Circular nº 46 DIRBEN/INSS de 13/09/2019";
        } else if (tipo == "pescador") {
            anexo = "Anexo II do Ofício-Circular nº 46 DIRBEN/INSS de 13/09/2019";
        } else if (tipo == "indigena") {
            anexo = "Anexo I da IN 77/2015 (Certidão de Exercício de Atividade Rural - Indígena) ";
        } else {
            anexo = "Anexos I ou II - rural ou percador - do Ofício-Circular nº 46 DIRBEN/INSS, de 13/09/2019, ou Anexo I da IN 77/2015 (Certidão de Exercício de Atividade Rural - Indígena";
        }

        txt = `${getNumeracaoDosParagrafos()} - Mesmo após emissão de carta de exigências, ${sexo == "homem" ? "o" : "a"} requerente não apresentou a autodeclaração de períodos / atividade (${anexo}) preenchida adequadamente, o que impossibilita o reconhecimento da atividade. ${oQueEstaErradoNoFormulario};`;

        //paragrafosDeAnalisePeranteANormaView.innerHTML = txt;
    } else if (motivo == "nao_apresentou_anexo") {

        //let oQueEstaErrado = prompt("O que está errado no formulário: ")

        conclusao = "indeferimento"

        console.log("falta de carência");

        let anexo = "";

        if (tipo === "rural") {
            anexo = "Anexo I do Ofício-Circular nº 46 DIRBEN/INSS de 13/09/2019";
        } else if (tipo == "pescador") {
            anexo = "Anexo II do Ofício-Circular nº 46 DIRBEN/INSS de 13/09/2019";
        } else if (tipo == "indigena") {
            anexo = "Anexo I da IN 77/2015 (Certidão de Exercício de Atividade Rural - Indígena) ";
        } else {
            anexo = "Anexos I ou II - rural ou percador - do Ofício-Circular nº 46 DIRBEN/INSS, de 13/09/2019, ou Anexo I da IN 77/2015 (Certidão de Exercício de Atividade Rural - Indígena";
        }

        txt = `${getNumeracaoDosParagrafos()} - Mesmo após emissão de carta de exigências, ${sexo == "homem" ? "o" : "a"} requerente não apresentou a autodeclaração de períodos / atividade (${anexo}), o que impossibilita o reconhecimento da atividade;`;

        //paragrafosDeAnalisePeranteANormaView.innerHTML = txt;
    } else if (motivo == "falta_de_carencia_so_docs_feitos_as_vesperas") {

        conclusao = "indeferimento"

        console.log("falta de carência");

        txt = `${getNumeracaoDosParagrafos()} - Mesmo após emissão de carta de exigências solicitando apresentação de documentação complementar, a quase totalidade dos documentos apresentados ou estão em nome de terceiros ou foram produzidos às vésperas do requerimento, portanto sem validade conforme item 24 do Parecer 3136/2003. ${oQueEstaErradoDocsFeitosAsVesperas != "" ? oQueEstaErradoDocsFeitosAsVesperas : ""};`;

        //paragrafosDeAnalisePeranteANormaView.innerHTML = txt;
    } else if (motivo == "falta_de_idade_minima") {

        conclusao = "indeferimento"

        console.log("falta de idade minima");

        txt = `${getNumeracaoDosParagrafos()} - Verifica-se que ${sexo == "homem" ? "o" : "a"} requerente conta, na DER, com ${idade} anos de vida. Na forma dos art.51 e 56 do Decreto 3.048/99, a idade mínima exigida para aposentadoria por idade rural é de 55 anos para mulheres e 60 anos para homens. Para benefícios híbridos (com cômputo de períodos rurais e urbanos) ou somente urbanos, a idade minima é de 62 anos para mulheres e 65 anos para homens;`;

    } else if (motivo == "falta_de_carencia_acampado") {

        conclusao = "indeferimento"

        console.log("falta de idade minima");

        txt = `${getNumeracaoDosParagrafos()} - Verifica-se que ${sexo == "homem" ? "o" : "a"} requerente declara período como "acampad${sexo == "homem" ? "o" : "a"}". Na forma do Ofício SEI Circular Conjunto nº 01/2020/DIRBEN/PFE/INSS, de 16/01/2020, relativo à decisão proferida pela Ação Civil Pública nº 000380795.2011.4.05.8300, para benefícios requeridos a partir de 16/01/2020, os períodos sob categoria de "acampado" não serão considerados como segurado especial.";`;

    } else if (motivo == "apresentar_impedientos") {

        paragrafoDeImpedimentos();

    } else if (motivo == "analfabeto_sem_procuracao_publica") {
        conclusao = "indeferimento"

        console.log("falta de idade minima");

        txt = `${getNumeracaoDosParagrafos()} - Verifica-se que o benefício foi protocolado por terceiro. Uma vez que, conforme RG apresentado, ${sexo == "homem" ? "o" : "a"} requerente não é alfabetizad${sexo == "homem" ? "o" : "a"}, foi emitida carta de exigência para apresentação de procuração pública na forma do art. 499 § único da IN 77/2015. Decorrido o prazo legal, e até a data atual, não houve apresentação da procuração;`;
    }






    if (ordem == "primario") {
        paragrafosDeAnalisePeranteANormaView.innerHTML = txt;
    } else {
        paragrafosDeAnalisePeranteANormaView2.innerHTML = txt;
    }

}

function paragrafoDeConclusao() {

    console.log("conclusão: " + conclusao);
    let txt = "";

    if (conclusao == "deferimento") {

        txt = `${getNumeracaoDosParagrafos()} - Assim sendo, o pleito restou deferido.`;

    } else {

        if (motivoIndeferimento == "falta_de_qualidade_de_segurado_na_der") {
            txt = `${getNumeracaoDosParagrafos()} - Face ao exposto, o pleito restou indeferido por não comprovação da atividade rural alegada/ falta de qualidade de segurad${sexo == "homem" ? "o" : "a"} especial na DER ou no ano em que foi implementado o quesito etário;`;
        } else { //if (motivoIndeferimento == "falta_de_carencia" || motivoIndeferimento == "nao_apresentou_anexo" || motivoIndeferimento == "nao_apresentou_anexo_preenchido_direito") {
            txt = `${getNumeracaoDosParagrafos()} - Face ao exposto, o pleito restou indeferido por falta de período de carência;`;
        }

    }

    paragrafoDeConclusaoView.innerHTML = txt;

}


function getInicioRGP() {
    if (rgpTodos.length == 1) return rgpTodos[0].inicio;
    else {
        rgpTodos.sort(function (a, b) { //isso é só para números simples
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


