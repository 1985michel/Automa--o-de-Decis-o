"use strict";



let cabecalhoView = document.getElementById("cabecalho");
let dataHojeView = document.getElementById("dataHoje");
let paragrafodeApresentacaoView = document.getElementById("paragrafoDeApresentacao");
let paragrafoDeAutodeclaracaoView = document.getElementById("paragrafoDeAutodeclaracaoView");
let paragrafoDeCNISView = document.getElementById("paragrafoDeCNISView");
let paragrafoDeImpedimentosView = document.getElementById("paragrafoDeImpedimentosView");
let paragrafoDeProvasView = document.getElementById("paragrafoDeProvasView");
let paragrafosDeAnalisePeranteANormaView_1 = document.getElementById("paragrafosDeAnalisePeranteANormaView_1");
let paragrafosDeAnalisePeranteANormaView_2 = document.getElementById("paragrafosDeAnalisePeranteANormaView_2");
let paragrafosDeAnalisePeranteANormaView_3 = document.getElementById("paragrafosDeAnalisePeranteANormaView_3");
let paragrafoDeConclusaoView = document.getElementById("paragrafoDeConclusaoView");


let numeracaoDosParagrafos = 1;
let conclusao = "";

let todoDespacho = "";

let editorGeralView = document.querySelector("#editor-geral");

function getNumeracaoDosParagrafos() {
    numeracaoDosParagrafos++;
    return `${numeracaoDosParagrafos - 1} – `;
}



const espaco = `<span style="color: transparent;">-------</span>`


function sugerirDespacho() {

    console.log("sugerir despacho");

    numeracaoDosParagrafos = 1;



    todoDespacho += `<p class="cabecalho_despacho ql-align-center" style="text-align: center !important;"> </p><br>`;

    todoDespacho += `<p class="cabecalho_despacho ql-align-center" style="text-align: center !important;"> <img src="https://juristas.com.br/wp-content/uploads/2018/12/inss-1-300x172.png" alt="logo da Previdência Social" width="200px;" height="120px;"></p><br>`;

    /* todoDespacho += `<img src="logo_previdencia.png" alt="logo da Previdência Social" width="200px;" height="120px;" style="display: block;margin-left: auto;margin-right: auto; width: 50%;">` */

    todoDespacho += `<p  class=" ql-align-center ">Agência da Previdência Social</p>`;

    todoDespacho += `<p  id="dataHoje" class="ql-align-right ">${getDataHoje()}</p>`;

    todoDespacho += `<p  id="cabecalho" class=" ql-align-center ">${cabecalho()}</p><br>`;

    todoDespacho += `<p class="ql-align-justify ">${espaco}${paragrafoDeApresentacao()}</p>`;
    todoDespacho += `<br>`;

    if (servico == "Aposentadoria por Idade Rural" || servico == "Aposentadoria por Idade Híbrida" || servico.includes("Rural")) {

        //se for para indeferir pq já é aposentado, não quero que imprima o CNIS ou período de autodeclaração
        if (deferir || (!deferir && motivoIndeferimento1 != `ja-aposentado`)) {

            todoDespacho += `<p class="ql-align-justify ">${espaco}${paragrafoDeAutodeclaracao()}</p>`;
            todoDespacho += `<br>`;

            todoDespacho += `<p class="ql-align-justify ">${espaco}${paragrafoDeCNIS()}</p>`;
            todoDespacho += `<br>`;

        }


        if (deferir) {
            todoDespacho += `<p class="ql-align-justify ">${espaco}${paragrafoDeProvas()}</p>`;
            todoDespacho += `<br>`;
        } /* else {
        todoDespacho += `<p class="ql-align-justify ">${espaco}${paragrafoDeImpedimentos()}</p>`;
        todoDespacho += `<br>`;
    } */

        if (isPescador()) {

            todoDespacho += `<p class="ql-align-justify ">${espaco}${paragrafoDeRGP()}</p>`;
            todoDespacho += `<br>`;
        }

        /* todoDespacho += `<p class="ql-align-justify ">${espaco}${paragrafoDeAnalisePeranteANorma()}</p>`;
        todoDespacho += `<br>`;

        todoDespacho += `<p class="ql-align-justify ">${espaco}${paragrafoDeConclusao()}</p>`;
        todoDespacho += `<br>`; */

    }

    /* todoDespacho += `<p class="ql-align-justify ">${espaco}${paragrafoDeAnalisePeranteANorma()}</p>`;
    todoDespacho += `<br>`; */

    todoDespacho += paragrafoDeAnalisePeranteANorma();
    /* todoDespacho += `<br>`; */

    todoDespacho += `<p class="ql-align-justify ">${espaco}${paragrafoDeConclusao()}</p>`;
    todoDespacho += `<br>`;

    todoDespacho += `<br><br><p  id="" class="ql-align-center ">Instituto Nacional do Seguro Social</p>`;


    //todoDespacho.replace("//:0", "logo_previdencia.png");

    /* todoDespacho = '<img src="https://juristas.com.br/wp-content/uploads/2018/12/inss-1-300x172.png" alt="logo da Previdência Social" width="200px;" height="120px;"></img>' + todoDespacho; */

    editor.clipboard.dangerouslyPasteHTML(todoDespacho);




}

function localizarLogoESubstituirSeNaoTiverFuncionado() {

}


function paragrafoDeAnalisePeranteANorma() {

    //console.log("paragrafosDeAnalisePeranteANorma");

    let txt = "";

    //console.log("Estamos verificando se as fprovas são suficientes " + isProvasSuficientes);

    if (deferir) {

        conclusao = "deferimento";

        console.log("sim, são suficientes");


        if (servico == "Aposentadoria por Idade Urbana") {


            /* todoDespacho += `<p class="ql-align-justify ">${espaco}${paragrafoDeAnalisePeranteANorma()}</p>`;
            todoDespacho += `<br>`; */
            txt = `<p class="ql-align-justify ">${espaco}${paragrafoAnaliseAposentadoriaUrbana()}</p><br>`;





            //txt += `${getNumeracaoDosParagrafos()}Face ao exposto o pleito restou deferido;`;


            //o IDEIAL AQUI É SEPARAR UMA FUNÇÃO PARA RURAL, OUTRA PARA URBANO E NO DE HIBRIDO USAR AS DUAS
        } else if (servico == "Aposentadoria por Idade Rural") {


            /* txt = paragrafoAnaliseAposentadoriaRural(txt); */
            txt = `<p class="ql-align-justify ">${espaco}${paragrafoAnaliseAposentadoriaRural()}</p><br>`;

        } else if (servico == "Aposentadoria por Idade Híbrida") {

            txt = `<p class="ql-align-justify ">${espaco}${paragrafoAnaliseAposentadoriaRural()}</p><br>`;
            txt += `<p class="ql-align-justify ">${espaco}${paragrafoAnaliseAposentadoriaUrbana()}</p><br>`;

        } else if (servico == "Salário-Maternidade Rural") {

            txt = `<p class="ql-align-justify ">${espaco}${paragrafoAnaliseSalarioMaternidadeRural()}</p><br>`;


        } else if (servico == "Salário-Maternidade Urbano") {

            txt = `<p class="ql-align-justify ">${espaco}${paragrafoAnaliseSalarioMaternidadeUrbano()}</p><br>`;

        }





        return txt;

    } else {

        /* txt += getParagrafosIndeferimento(motivoIndeferimento1, 1); */
        txt += `<p class="ql-align-justify ">${espaco}${getParagrafosIndeferimento(motivoIndeferimento1, 1)}</p><br>`;

        if (motivoIndeferimento2 != "") {
            /* txt += "</p>"; */

            /* txt += getParagrafosIndeferimento(motivoIndeferimento2, 2); */
            txt += `<p class="ql-align-justify ">${espaco}${getParagrafosIndeferimento(motivoIndeferimento2, 2)}</p><br>`;
        }

        if (motivoIndeferimento3 != "") {
            //txt += "<br>";
            /* txt += getParagrafosIndeferimento(motivoIndeferimento3, 2); */
            txt += `<p class="ql-align-justify ">${espaco}${getParagrafosIndeferimento(motivoIndeferimento3, 2)}</p><br>`;
        }

        return txt;

    }
}

function paragrafoAnaliseAposentadoriaRural() {
    let txt = "";
    if (isIndigena()) {
        txt += `${getNumeracaoDosParagrafos()}Observa-se que os documentos apresentados pel${sexo == "homem" ? "o" : "a"} requerente comprovam o labor rural alegado, na forma dos art. 116  da IN 128/2022 e a Certidão fornecida pela FUNAI; `;
    } else {

        txt = `${getNumeracaoDosParagrafos()}Observa-se que os documentos apresentados pel${sexo == "homem" ? "o" : "a"} requerente e as bases governamentais identificadas são listados nos art. 115 e 116 da IN 128/2022 e, ou, no art. 106 da Lei nº 8213/1991. Assim, à luz da IN nº 128 PRES/INSS, de 28/03/2022, art. 115 e 116, os documentos apresentados e as bases governamentais apontadas ratificam a atividade como segurado especial satisfazendo a carência exigida (180 meses) na forma dos art. 182 do Decreto 3.048/99 e art.25, II e art. 142 da Lei 8.213/1991);`;



    }
    return txt;
}

function paragrafoAnaliseSalarioMaternidadeRural() {

    let txt = "";
    if (isIndigena()) {
        txt += `${getNumeracaoDosParagrafos()}Observa-se que os documentos apresentados pel${sexo == "homem" ? "o" : "a"} requerente comprovam o labor rural alegado, na forma dos art. 116  da IN 128/2022 e a Certidão fornecida pela FUNAI; `;
    } else {

        txt = `${getNumeracaoDosParagrafos()}Observa-se que os documentos apresentados pel${sexo == "homem" ? "o" : "a"} requerente e as bases governamentais identificadas são listados nos art. 115 e 116 da IN 128/2022 e, ou, no art. 106 da Lei nº 8213/1991. Assim, à luz da IN nº 128 PRES/INSS, de 28/03/2022, art. 115 e 116, os documentos apresentados e as bases governamentais apontadas ratificam a atividade como segurad${sexo == "homem" ? "o" : "a"} especial satisfazendo a carência exigida (10 meses - art. 197 da IN 128/2022) e mantendo a qualidade de segurad${sexo == "homem" ? "o" : "a"} até a data do parto (art. 184 da IN 128/2022);`;



    }
    return txt;
}

function paragrafoAnaliseSalarioMaternidadeUrbano() {

    let txt = "";
    if (isIndigena()) {
        txt += `${getNumeracaoDosParagrafos()}Observa-se que os documentos apresentados pel${sexo == "homem" ? "o" : "a"} requerente comprovam o labor rural alegado, na forma dos art. 116  da IN 128/2022 e a Certidão fornecida pela FUNAI; `;
    } else {

        txt = `${getNumeracaoDosParagrafos()}Face ao todo o exposto, restou cumprido as exigências legais de carência e qualidade de segurada - art. 197 e 184 da IN 128/2022;`;



    }
    return txt;
}

function paragrafoAnaliseAposentadoriaUrbana() {
    let txt = "";
    if (!isDeferimentoAutomatico) {

        txt += `${getNumeracaoDosParagrafos()}Computados todos os períodos válidos constantes no CNIS, microfichas e CTPS, apurou-se um total de XX anos, XX meses e XX dias de contribuição, o que equivale a XXX contribuições para efeito de carência. Na forma do art. 318 da IN 128/2022, art. 182 do Decreto 3.048/99 e art. 25 da Lei 8.213/91, a carência exigida é de 180 contribuições mensais;`;

    } else {

        txt += `${getNumeracaoDosParagrafos()}Verifica-se nos sistemas previdenciários que houve reconhecimento automático do direito, estando o benefício ativo e em recebimento;`;
    }
    return txt;
}

function getParagrafosIndeferimento(motivo, ordem) {

    let txt = "";


    if (ordem == 2) {
        txt += `<br><p class="ql-align-justify ">${espaco}`;
    }

    if (motivo == "falta_de_qualidade_de_segurado_na_der") {

        //conclusao = "indeferimento"

        console.log("falta de qualidade de segurado na DER");

        if (servico.includes("Aposentadoria por Idade Rural")) {
            txt += `${getNumeracaoDosParagrafos()}O art.258 da IN 128/2022 determina a necessidade do trabalhador rural possuir qualidade de segurado especial na DER ou na data de implementação de todos os requisitos. ${sexo == "homem" ? "O" : "A"} requerente completou ${sexo == "homem" ? "60" : "55"} anos em ${sexo == "homem" ? calculaAnoQueCompletouIdadeDesejada(60) : calculaAnoQueCompletouIdadeDesejada(55)}, data em que já não possuiria qualidade de segurad${sexo == "homem" ? "o" : "a"} especial.`;

        } else if (servico.includes("Salário-Maternidade Rural")) {
            txt += `${getNumeracaoDosParagrafos()}Na forma dos art. 115 e 116 da IN 128/2022 e art. 106 da Lei nº 8213/1991, os documentos apresentados e as bases governamentais encontradas - ou a ausência destes elementos - mesmo após emissão de carta de exigências${dataDeEmissaoDasExigencias != "" ? ` em ${getData(dataDeEmissaoDasExigencias)}` : ``}, não ratificam a atividade como segurad${sexo == "homem" ? "o" : "a"} especial em período suficiente à carência exigida (10 meses - art. 197 da IN 128/2022). Na forma do Ofício-Circular nº 46 /DIRBEN/INSS de 13 de setembro de 2019, item III, b) "para o salário maternidade, é necessário apresentar ao menos um documento anterior à data presumida do início da gravidez, guarda para fins de adoção ou ao documento que comprove a adoção." Sendo que a validade das provas se limitam a 7,5 anos de sua comprovada emissão, na forma do item III do item 6.1 do mesmo O.C. Portanto, a requerente não comprovou qualidade de segurada da previdência social com cumprimento da carência na data do parto.`;
        }

        // txt += `${getNumeracaoDosParagrafos()}O art.258 da IN 128/2022 determina a necessidade do trabalhador rural possuir qualidade de segurado especial na DER ou na data de implementação de todos os requisitos. ${sexo == "homem" ? "O" : "A"} requerente completou ${sexo == "homem" ? "60" : "55"} anos em ${sexo == "homem" ? calculaAnoQueCompletouIdadeDesejada(60) : calculaAnoQueCompletouIdadeDesejada(55)}, data em que já não possuiria qualidade de segurad${sexo == "homem" ? "o" : "a"} especial.`;


        //paragrafosDeAnalisePeranteANormaView.innerHTML = txt;
        //<option value="empresario-rural-sem-idade">Empresário Rural - sem benefício da redução da idade</option>
    } else if (motivo == "empresario-rural-sem-idade") {

        conclusao = "indeferimento"

        console.log("empresário rural sem o benefício da redução de idade");

        txt += `${getNumeracaoDosParagrafos()}Como já dito, ${sexo == "homem" ? "o" : "a"} requerente consta com ${idade} anos de vida na DER. Em análise à legislação vigente, conforme recortes abaixo, o Decreto 3.048/99 e a Lei 8.213/91, ambos com modificações legislativas posteriores, determinam que a idade mínima para aposentadoria é de 65 (sessenta e cinco) anos para homens e 60 (sessenta) anos para mulheres, reduzindo estes limites em 5 (cinco) anos para determinados trabalhadores rurais à saber: empregados; contribuintes individuais rurais que prestam serviço para diversas empresas ou pessoas; trabalhadores avulsos e segurados especiais; Ambos diplomas legais classificam ${sexo == "homem" ? "o" : "a"} requerente - proprietári${sexo == "homem" ? "o" : "a"} de área superior a 4 (quatro) módulos fiscais - em outra categoria, artigo 9, inciso V  alínea "a)", no Decreto 3.048/99, e  art. 11, inciso V alínea "a)" na Lei 8.213/91; O benefício da redução da idade em cinco anos não é estendido à categoria em que ${sexo == "homem" ? "o" : "a"} requerente é enquadrad${sexo == "homem" ? "o" : "a"}:<br><br>`;


        txt += `<p class="ql-align-justify ql-indent-1">Decreto 3.048/99
        <br>
        Art. 56. A aposentadoria por idade do trabalhador rural, uma vez cumprido o período de carência exigido, será devida aos segurados a que se referem a alínea “a” do inciso I, a alínea “j” do inciso V e os incisos VI e VII do caput do art. 9º e aos segurados garimpeiros que trabalhem, comprovadamente, em regime de economia familiar, conforme definido no § 5º do art. 9º, quando completarem cinquenta e cinco anos de idade, se mulher, e sessenta anos de idade, se homem.
        <br><br>
        Lei 8.213/91
        <br>
        Art. 48. A aposentadoria por idade será devida ao segurado que, cumprida a carência exigida nesta Lei, completar 65 (sessenta e cinco) anos de idade, se homem, e 60 (sessenta), se mulher.         (Redação dada pela Lei nº 9.032, de 1995)
        <br>
        § 1o Os limites fixados no caput são reduzidos para sessenta e cinqüenta e cinco anos no caso de trabalhadores rurais, respectivamente homens e mulheres, referidos na alínea a do inciso I, na alínea g do inciso V e nos incisos VI e VII do art. 11.</p><br>`;


        txt += `<p class="ql-align-justify">${espaco}${getNumeracaoDosParagrafos()}O art.258 da IN 128/2022 determina a necessidade do trabalhador rural possuir qualidade de segurado especial na DER ou na data de implementação de todos os requisitos. ${sexo == "homem" ? "O" : "A"} requerente completou ${idade} anos em 2021, data em que já não possuiria qualidade de segurado especial. Verifica-se que o requerente conta, na DER, com ${idade} anos de vida. Conforme exposto, a idade mínima exigida na categoria em que ${sexo == "homem" ? "o" : "a"} requerente se encontra não foi atingida;</p>`;

    } else if (motivo == "falta_de_carencia") {

        conclusao = "indeferimento"

        console.log("falta de carência");



        if (servico.includes("Aposentadoria por Idade Rural")) {
            txt += `${getNumeracaoDosParagrafos()}Na forma dos art. 115 e 116 da IN 128/2022 e art. 106 da Lei nº 8213/1991, os documentos apresentados e as bases governamentais encontradas - ou a ausência destes elementos - mesmo após emissão de carta de exigências${dataDeEmissaoDasExigencias != "" ? ` em ${getData(dataDeEmissaoDasExigencias)}` : ``}, não ratificam a atividade como segurad${sexo == "homem" ? "o" : "a"} especial em período suficiente à carência exigida (180 meses - na forma dos art. 182 do Decreto 3.048/99 e art.25, II e art. 142 da Lei 8.213/1991);`;
        } else if (servico.includes("Salário-Maternidade Rural")) {
            txt += `${getNumeracaoDosParagrafos()}Na forma dos art. 115 e 116 da IN 128/2022 e art. 106 da Lei nº 8213/1991, os documentos apresentados e as bases governamentais encontradas - ou a ausência destes elementos - mesmo após emissão de carta de exigências${dataDeEmissaoDasExigencias != "" ? ` em ${getData(dataDeEmissaoDasExigencias)}` : ``}, não ratificam a atividade como segurad${sexo == "homem" ? "o" : "a"} especial em período suficiente à carência exigida (10 meses - art. 197 da IN 128/2022). Na forma do Ofício-Circular nº 46 /DIRBEN/INSS de 13 de setembro de 2019, item III, b) "para o salário maternidade, é necessário apresentar ao menos um documento anterior à data presumida do início da gravidez, guarda para fins de adoção ou ao documento que comprove a adoção.";`;
        }





        //paragrafosDeAnalisePeranteANormaView.innerHTML = txt;



    } else if (motivo == "falta_de_carencia_periodo_declarado_insuficiente") {

        conclusao = "indeferimento"

        console.log("falta de carência - período declarado insuficiente");

        txt += `${getNumeracaoDosParagrafos()}A carência exigida para concessão do benefício requerido é de 180 meses (15 anos) - na forma dos art. 182 do Decreto 3.048/99 e art.25, II e art. 142 da Lei 8.213/1991. Observa-se que os períodos autodeclarados pel${sexo == "homem" ? "o" : "a"} requerente como trabalhados totalizam apenas ${totalAutodeclarado[0]} anos, ${totalAutodeclarado[1]} meses e ${totalAutodeclarado[2]} dias, de modo que, ainda que restassem integralmente homologados, são insuficientes ao mínimo exigido, não restando cumprido o quesito carência;`;

        //paragrafosDeAnalisePeranteANormaView.innerHTML = txt;



    } else if (motivo == "falta_de_carencia_docs_em_nome_de_nao_segurado_especial") {

        conclusao = "indeferimento"

        console.log("falta de carência");

        txt += `${getNumeracaoDosParagrafos()}Na forma dos art. 115 e 116 da IN 128/2022 e art. 106 da Lei nº 8213/1991, os documentos apresentados e as bases governamentais encontradas - ou a ausência destes elementos, mesmo após emissão de carta de exigências${dataDeEmissaoDasExigencias != "" ? ` em ${getData(dataDeEmissaoDasExigencias)}` : ``}, não ratificam a atividade como segurad${sexo == "homem" ? "o" : "a"} especial em período suficiente à carência exigida (180 meses - na forma dos art. 182 do Decreto 3.048/99 e art.25, II e art. 142 da Lei 8.213/1991). Observa-se que foram apresentados documentos em nome de terceiros os quais não gozavam, à época, de qualidade de segurado especial. Na forma dos §§ 2º(IV) e 3º(I), somente podem ser consideradas provas emitidas em nome d${sexo == "homem" ? "o" : "a"} requerente ou de membros do grupo familiar que detenham a qualidade de segurado especial;`;

        //paragrafosDeAnalisePeranteANormaView.innerHTML = txt;

    } else if (motivo == "nao_cumprimento_de_exigencias") {

        conclusao = "indeferimento"

        //console.log("falta de carência");

        txt += `${getNumeracaoDosParagrafos()}Mesmo após emissão de carta de exigências${dataDeEmissaoDasExigencias != "" ? ` em ${getData(dataDeEmissaoDasExigencias)}` : ``}, ${sexo == "homem" ? "o" : "a"} requerente não apresentou os elementos solicitados:`;


        if (exigenciasGerais.length > 0) {

            txt += `<ul class="print">`;
            exigenciasGerais.forEach(exigencia => {
                let exi = exigencia.replaceAll("–", "");
                exi = exi.replaceAll("-", "");
                exi = exi.trim();
                txt += `<li class="ql-align-justify ql-indent-1 print">${exi}`;
            });
            txt += `</ul>`;

        }

        //paragrafosDeAnalisePeranteANormaView.innerHTML = txt;
    } else if (motivo == "nao_apresentou_anexo_preenchido_direito") {

        conclusao = "indeferimento"

        console.log("falta de carência");

        let anexo = "";

        if (categoriasTrabalhador.includes("rural") && categoriasTrabalhador.includes("pescador")) {
            anexo = "Anexos VIII, IX ou X da IN 128/2022";
        } else if (categoriasTrabalhador.includes("rural")) {
            anexo = "Anexo VIII da IN 128/2022";
        } else if (categoriasTrabalhador.includes("pescador")) {
            anexo = "Anexo IX da IN 128/2022";
        } else if (categoriasTrabalhador.includes("indigena")) {
            anexo = "Anexo XXV da IN 128/2022 (Certidão de Exercício de Atividade Rural - Indígena) ";
        } else {
            anexo = "Anexos VIII (rural), IX (pescador), X (extrativista) ou XXV da IN 128/2022 (Certidão de Exercício de Atividade Rural - Indígena";
        }

        txt += `${getNumeracaoDosParagrafos()}Mesmo após emissão de carta de exigências${dataDeEmissaoDasExigencias != "" ? ` em ${getData(dataDeEmissaoDasExigencias)}` : ``}, ${sexo == "homem" ? "o" : "a"} requerente não apresentou a autodeclaração de períodos / atividade (${anexo}) preenchida adequadamente, o que impossibilita o reconhecimento da atividade. ${oQueEstaErradoNoFormulario};`;

        //paragrafosDeAnalisePeranteANormaView.innerHTML = txt;
    } else if (motivo == "nao_apresentou_anexo") {

        //let oQueEstaErrado = prompt("O que está errado no formulário: ")

        conclusao = "indeferimento"

        console.log("falta de carência");

        let anexo = "";

        let jaTem = false;

        for (const cat of categoriasTrabalhador) {

            if (cat === "rural") {
                anexo = "Anexo VIII da IN 128/2022";
                jaTem = true;
            } else if (cat == "pescador") {
                if (jaTem) {
                    anexo += " e "
                }
                anexo += "Anexo IX da IN 128/2022";
                jaTem = true;
            } else if (cat == "indigena") {
                if (jaTem) {
                    anexo += " e "
                }
                anexo += "Anexo XXV da IN 128/2022 (Certidão de Exercício de Atividade Rural - Indígena) ";
            }
        }

        if (anexo == "") {
            {
                anexo += "Anexos VIII (rural), IX (pescador), X (extrativista) ou XXV da IN 128/2022 (Certidão de Exercício de Atividade Rural - Indígena";
            }
        }

        /* if (tipo === "rural") {
            anexo = "Anexo I do Ofício-Circular nº 46 DIRBEN/INSS de 13/09/2019";
        } else if (tipo == "pescador") {
            anexo = "Anexo II do Ofício-Circular nº 46 DIRBEN/INSS de 13/09/2019";
        } else if (tipo == "indigena") {
            anexo = "Anexo I da IN 77/2015 (Certidão de Exercício de Atividade Rural - Indígena) ";
        } else {
            anexo = "Anexos I ou II - rural ou percador - do Ofício-Circular nº 46 DIRBEN/INSS, de 13/09/2019, ou Anexo I da IN 77/2015 (Certidão de Exercício de Atividade Rural - Indígena";
        } */

        txt += `${getNumeracaoDosParagrafos()}Mesmo após emissão de carta de exigências${dataDeEmissaoDasExigencias != "" ? ` em ${getData(dataDeEmissaoDasExigencias)}` : ``}, ${sexo == "homem" ? "o" : "a"} requerente não apresentou a autodeclaração de períodos / atividade (${anexo}), o que impossibilita o reconhecimento da atividade;`;

        //paragrafosDeAnalisePeranteANormaView.innerHTML = txt;
    } else if (motivo == "falta_de_carencia_so_docs_feitos_as_vesperas") {

        conclusao = "indeferimento"

        console.log("falta de carência");

        txt += `${getNumeracaoDosParagrafos()}Mesmo após emissão de carta de exigências,${dataDeEmissaoDasExigencias != "" ? ` em ${getData(dataDeEmissaoDasExigencias)}` : ``}, solicitando apresentação de documentação complementar, a quase totalidade dos documentos apresentados ou estão em nome de terceiros ou foram produzidos às vésperas do requerimento, portanto sem validade conforme item 24 do Parecer 3136/2003. ${oQueEstaErradoDocsFeitosAsVesperas != "" ? oQueEstaErradoDocsFeitosAsVesperas : ""};`;

        //paragrafosDeAnalisePeranteANormaView.innerHTML = txt;
    } else if (motivo == "falta_de_idade_minima") {

        conclusao = "indeferimento"

        console.log("falta de idade minima");

        txt += `${getNumeracaoDosParagrafos()}Verifica-se que ${sexo == "homem" ? "o" : "a"} requerente conta, na DER, com ${idade} anos de vida. Na forma dos art.51 e 56 do Decreto 3.048/99, a idade mínima exigida para aposentadoria por idade rural é de 55 anos para mulheres e 60 anos para homens. Para benefícios híbridos (com cômputo de períodos rurais e urbanos) ou somente urbanos, a idade minima é de 62 anos para mulheres e 65 anos para homens;`;

    } else if (motivo == "falta_de_carencia_acampado") {

        conclusao = "indeferimento"

        console.log("falta de idade minima");

        txt += `${getNumeracaoDosParagrafos()}Verifica-se que ${sexo == "homem" ? "o" : "a"} requerente declara período como "acampad${sexo == "homem" ? "o" : "a"}". Na forma do Ofício SEI Circular Conjunto nº 01/2020/DIRBEN/PFE/INSS, de 16/01/2020, relativo à decisão proferida pela Ação Civil Pública nº 000380795.2011.4.05.8300, para benefícios requeridos a partir de 16/01/2020, os períodos sob categoria de "acampado" não serão considerados como segurado especial.";`;

    } else if (motivo == "apresentar_impedientos") {

        if (impedimentos_h2.length > 0) {
            txt += paragrafoDeImpedimentos();
        }


    } else if (motivo == "analfabeto_sem_procuracao_publica") {
        conclusao = "indeferimento"

        console.log("falta de idade minima");

        txt += `${getNumeracaoDosParagrafos()}Verifica-se que o benefício foi protocolado por terceiro. Uma vez que, conforme RG apresentado, ${sexo == "homem" ? "o" : "a"} requerente não é alfabetizad${sexo == "homem" ? "o" : "a"}, foi emitida carta de exigência${dataDeEmissaoDasExigencias != "" ? ` em ${getData(dataDeEmissaoDasExigencias)}` : ``} para apresentação de procuração pública na forma do art. 541 da IN 128/2022. Decorrido o prazo legal, e até a data atual, não houve apresentação da procuração;`;

    } else if (motivo == "empregado-urbano-tratorista-domestico") {
        conclusao = "indeferimento"

        console.log("empregado urbano");

        txt += `${getNumeracaoDosParagrafos()}Na forma do art. 6º da IN PRES/INSS 128, de 28 de março de 2022, ${sexo == "homem" ? "o" : "a"} segurad${sexo == "homem" ? "o" : "a"}, ainda que tenha trabalhado para empregador rural ou para empresa prestadora de serviço rural, será considerad${sexo == "homem" ? "o" : "a"} como filiad${sexo == "homem" ? "o" : "a"} ao regime urbano caso exerça profissões domésticas (doméstico, cozinheiro, etc.), motorista, tratorista ou empregado de empresas agroindustriais ou agro-comerciais (aqui inclusos todos os vínculos trabalhistas do requerente);`;

    } else if (motivo == "atividades_intercaladas") {
        conclusao = "indeferimento"

        console.log("empregado urbano");

        txt += `${getNumeracaoDosParagrafos()}Na forma do inciso V, §2º, art. 116 da IN PRES/INSS 128, de 28 de março de 2022: "na hipótese de períodos intercalados de exercício de atividade rural e urbana superior a 120 (cento e vinte) dias no ano civil, deverá ser apresentado instrumento ratificador (base governamental ou documento) a cada retorno à atividade rural."`;

    } else if (motivo == "falta_representacao") {
        txt += `${getNumeracaoDosParagrafos()}Verifica-se que o benefício foi protocolado por terceiro. Uma vez que, conforme RG apresentado, ${sexo == "homem" ? "o" : "a"} requerente não é alfabetizad${sexo == "homem" ? "o" : "a"}, foi emitida carta de exigência ${dataDeEmissaoDasExigencias != "" ? ` em ${getData(dataDeEmissaoDasExigencias)}` : ``} para apresentação de procuração pública na forma do art. 541 da IN 128/2022. Decorrido o prazo legal, e até a data atual, não houve apresentação da procuração. O entendimento é ratificado na Portaria DIRBEN/INSS nº 903, de 24/06/2021, a qual aprova e divulga o Guia Prático de Entidades Parceiras - Acordo de Cooperação Técnica, apresentando no item 3.3 que "... os usuários representados deverão assinar o Termo de Representação e Autorização de Acesso à informações Previdenciárias ou a Procuração (...) O termo ou a procuração deve constar no processo de forma obrigatória ..."..`;

    } else if (motivo == "tem_loas") {
        txt += `${getNumeracaoDosParagrafos()}Em consultas às normas identificamos que o caso em tela é contemplado no art. 112, §3º da IN 128/2022 o qual determina que o recebimento de benefício de prestação continuada descaracteriza a condição de segurado especial do beneficiário.`;

    } else if (motivo == "tem_b36") {
        txt += `${getNumeracaoDosParagrafos()}Na forma do inciso VI do art. 639 da IN 128/2022, não é permitida a acumulação de auxílio-acidente com aposentadoria para benefícios posteriores a 11/11/1997. ${sexo == "homem" ? "O" : "A"} requerente é titular no auxílio-acidente de NB XX/XXXXXXX, iniciado em xx/xx/xxxx. Foi-lhe emitida carta de exigências de modo que realizasse opção entre os benefícios, mas tal manifestação não ocorreu.`;

    } else if (motivo == "ja-aposentado") {

        //conclusao = "indeferimento"

        console.log("ja-aposentado");

        txt += `${getNumeracaoDosParagrafos()}Conforme extratos em anexo, verifica-se que ${sexo == "homem" ? "o" : "a"} requerente já é aposentad${sexo == "homem" ? "o" : "a"} sob NB [          ], com início em [    ]. Não é permitida acumulação de aposentadorias, na forma do art. 639, II, da IN 128/2022;`;


        //paragrafosDeAnalisePeranteANormaView.innerHTML = txt;
        //<option value="empresario-rural-sem-idade">Empresário Rural - sem benefício da redução da idade</option>
    } else if (motivo == "cedeu-mais-cinquenta-porcento") {

        //conclusao = "indeferimento"

        console.log("ja-aposentado");

        txt += `${getNumeracaoDosParagrafos()}No formulário apresentado foi registrado  (campo 3) que desde ${dataCessao} ${sexo == "homem" ? "o" : "a"} requerente cede mais de 50% (cinquenta por cento) da propriedade. Assim, na forma do art. 112 e 113 da IN 128/2022, houve descaracterização da condição de segurado especial;`;


        //paragrafosDeAnalisePeranteANormaView.innerHTML = txt;
        //<option value="empresario-rural-sem-idade">Empresário Rural - sem benefício da redução da idade</option>
    } else if (motivo == "pensao_maior_que_o_minimo") {
        console.log("pensao>minimo");

        txt += `${getNumeracaoDosParagrafos()}Na forma do art. 113 da IN 128/2022,  o gozo de pensão por morte em valor superior ao salário-mínimo vigente descaracteriza a condição de segurado especial:`;

        txt += `<p class="ql-align-justify ql-indent-1">
        <br>
        Art. 113. O segurado especial fica excluído dessa categoria:
        ...
        III - pelo período em que o benefício de pensão por morte, auxílio-acidente ou auxílio-reclusão foi recebido com valor superior ao salário mínimo, observado o disposto na alínea “a” do inciso VIII e § 1º, ambos do art. 112 </p><br>`;

    } else if (motivo == "falta_de_carencia_urbano_nunca_contribuiu") {

        conclusao = "indeferimento"

        console.log("falta de carência urbano - nunca contribuiu");

        txt += `${getNumeracaoDosParagrafos()}Não identificamos no CNIS vínculos ou recolhimentos d${sexo == "homem" ? "o" : "a"} requerente. ${sexo == "homem" ? "O" : "A"} mesm${sexo == "homem" ? "o" : "a"} declarou não ter tempo rural. Na forma do art. 318 da IN 128/2022, art. 182 do Decreto 3.048/99 e art. 25 da Lei 8.213/91, a carência exigida é de 180 contribuições mensais;`;

        //paragrafosDeAnalisePeranteANormaView.innerHTML = txt;



    } else if (motivo == "falta_de_carencia_urbano") {

        conclusao = "indeferimento"

        console.log("falta de carência urbano");

        txt += `${getNumeracaoDosParagrafos()}Computados todos os períodos válidos constantes no CNIS, microfichas e CTPS, apurou-se um total de XX anos, XX meses e XX dias de contribuição, o que equivale a XXX contribuições para efeito de carência. Na forma do art. 318 da IN 128/2022, art. 182 do Decreto 3.048/99 e art. 25 da Lei 8.213/91, a carência exigida é de 180 contribuições mensais;`;

        //paragrafosDeAnalisePeranteANormaView.innerHTML = txt;



    } else if (motivo == "falta_de_idade_urbano") {

        conclusao = "indeferimento"

        console.log("falta de idade urbano");

        txt += `${getNumeracaoDosParagrafos()}Face ao exposto o pleito restou indeferido vez que não foi atendido o quesito idade (mínimo de ${sexo == "homem" ? "65 anos para homens" : "62 anos para mulheres"} – art. 51 do Decreto 3.048/99 atualizado, ou regra transitória pela E.C 103/2019;`;

        //paragrafosDeAnalisePeranteANormaView.innerHTML = txt;



    }


    if (ordem != 1) {
        txt += `</p>`;
    }

    return txt;


    /*     if (ordem == "primario") {
            paragrafosDeAnalisePeranteANormaView.innerHTML = txt;
        } else {
            paragrafosDeAnalisePeranteANormaView2.innerHTML = txt;
        } */

}

function paragrafoDeImpedimentos() {


    let txt = `${getNumeracaoDosParagrafos()}Em contrário ao declarado, verifica-se:`;

    txt += `<ul>`;
    impedimentos_h2.forEach(i_h2 => {
        txt += `<li class="ql-align-justify ql-indent-1">${i_h2.descricao}`;
    });
    txt += `</ul>`;


    return txt;

}


function paragrafoDeConclusao() {

    //console.log("conclusão: " + conclusao);
    let txt = "";

    if (deferir && !isDeferimentoAutomatico) {

        if (servico == "Aposentadoria por Idade Híbrida") {

            txt = `${getNumeracaoDosParagrafos()}Assim sendo, o pleito restou deferido, aplicando-se ainda o art. 48 da Lei 8.213/91 e art. 257 da IN 128/2022;`;

        } else {
            txt = `${getNumeracaoDosParagrafos()}Assim sendo, o pleito restou deferido.`;
        }


    } else if (deferir && isDeferimentoAutomatico) {

        txt = `${getNumeracaoDosParagrafos()}Diante do exposto a conclusão foi de deferimento;`;

    } else {
        /* txt += `<br>`;*/
        txt = `${getNumeracaoDosParagrafos()}Face ao exposto, o pleito restou indeferido;`;

        /* txt += `<p class="ql-align-justify ">${espaco}${Face ao exposto, o pleito restou indeferido;
    }</p > <br>`; */



        /* if (motivoIndeferimento == "falta_de_qualidade_de_segurado_na_der") {
            txt = `${getNumeracaoDosParagrafos()} - Face ao exposto, o pleito restou indeferido por não comprovação da atividade rural alegada/ falta de qualidade de segurad${sexo == "homem" ? "o" : "a"} especial na DER ou no ano em que foi implementado o quesito etário;`;
        } else { //if (motivoIndeferimento == "falta_de_carencia" || motivoIndeferimento == "nao_apresentou_anexo" || motivoIndeferimento == "nao_apresentou_anexo_preenchido_direito") {
            txt = `${getNumeracaoDosParagrafos()} - Face ao exposto, o pleito restou indeferido por falta de período de carência;`;
        } */

    }

    return txt;

}

function paragrafoDeRGP() {

    let txt = "";

    let inicioRGP = getInicioRGP();

    let tipoDePescador = getTipoDePescador();

    console.log(`LINHA 85 DESPACHO - TIPO DE PESCADOR: ${tipoDePescador}`);

    let tipoDePescadorFormatado = "";

    if (tipoDePescador == "profissional") {
        tipoDePescadorFormatado = "profissional";
    } else if (tipoDePescador == "subsistencia") {
        tipoDePescadorFormatado = "de subsistência";
    } else if (tipoDePescador == "ambos") {
        tipoDePescadorFormatado = "profissional e de subsistência";
    } else if (tipoDePescador == "nao-informado") {
        tipoDePescadorFormatado = "Pesca não especificada (campo 3.3 Anexo IX da IN 128/2022)";
    }


    //se tem RGP
    if (inicioRGP != false) {

        txt = `${getNumeracaoDosParagrafos()}Verifica-se que ${sexo == "homem" ? "o" : "a"} requerente conta com RGP – registro geral de pesca – a contar de ${inicioRGP}. `;

        if (tipoDePescador != "nao-informado") {
            txt += `${sexo == "homem" ? "O" : "A"} requerente declara ser pescador${sexo == "homem" ? "" : "a"} ${tipoDePescadorFormatado}.`;
        } else {
            txt += `${sexo == "homem" ? "O" : "A"} requerente não especifica se exerce atividade de forma profissional ou para subsistência (campo 3.3) da autodeclaração do pescador. Foi emitida carta de exigências ${sexo == "homem" ? "ao" : "à"} requerente solicitando apresentação do Anexo IX da IN 128/2022 devidamente preenchido, mas o mesmo não foi apresentado.`
        }


    } else {
        txt = `${getNumeracaoDosParagrafos()}Verifica-se que ${sexo == "homem" ? "o" : "a"} requerente <b>não</b> conta com RGP – registro geral de pesca`

        if (tipoDePescador == "profissional" || tipoDePescador == "ambos") {

            txt += `, apesar de declarar-se pescador${sexo == "homem" ? "" : "a"} profissional.`;

        } else if (tipoDePescador == "subsistencia") {
            txt += `, o que lhe é dispensável vez que se declarada pescador${sexo == "homem" ? "" : "a"} de subsistência.`;
        } else if (tipoDePescador == "nao-informado") {

            txt += `.${sexo == "homem" ? "O" : "A"} requerente não especifica se exerce atividade de forma profissional ou para subsistência (campo 3.3) da autodeclaração do pescador. Foi emitida carta de exigências ${sexo == "homem" ? "ao" : "à"} requerente solicitando apresentação do Anexo IX da IN 128/2022 devidamente preenchido, mas o mesmo não foi apresentado. `
        }

    }

    txt += ` Na forma do art. 111, §1º e §2º, da IN 128/2022, à contar de 31/03/2015, somente é pescador profissional aquele com autorização governamental via RGP, exigência dispensada aos pescadores de subsistência - aqueles que exercem as atividades sem fins lucrativos:

        <p class="ql-align-justify ql-indent-2">IN 128/2022 - art. 111:</p>

        <p class="ql-align-justify ql-indent-2">§ 1º Para período trabalhado a partir de 31 de março de 2015, o pescador artesanal deverá estar cadastrado no Registro Geral de Atividade Pesqueira - RGP, na categoria de Pescador Profissional Artesanal, conforme inciso I do art. 2º do Decreto nº 8.425, de 31 de março de 2015. <br>
        § 2º Os pescadores de subsistência, aqueles que exercem as atividades sem fins lucrativos, caso assim se declarem, estão desobrigados do cadastramento no RGP</p><br>

            <p class="ql-align-justify ql-indent-2">Decreto nº 8425/2015:</p>

            <p class="ql-align-justify ql-indent-2">Art. 1º: § 2º A atividade pesqueira no Brasil só poderá ser exercida por pessoa física, jurídica e embarcação de pesca inscrita no RGP e que detenha autorização, permissão ou licença para o exercício da atividade pesqueira.</p>`;

    return txt;
}

function getInicioRGP() {

    let rgpTodos = [];

    for (const prova of provasGerais) {

        if (prova.tipo == "rgp") {
            rgpTodos.push(prova);
        }
    }


    if (rgpTodos.length == 0) return false;
    else if (rgpTodos.length == 1) return rgpTodos[0].inicio;
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


function paragrafoDeProvas() {

    let txt = `${getNumeracaoDosParagrafos()}Constam nos autos para comprovação do labor alegado:<br>`;


    txt += `<ul>`;
    provas_h2.forEach(p_h2 => {
        txt += `<li class="ql-align-justify ql-indent-1">${p_h2.descricao}</li>`;
    });
    txt += `</ul>`;

    // paragrafoDeProvasView.innerHTML = txt;

    //paragrafoDeProvasView.style.color = "black";

    return txt;

}


function paragrafoDeAutodeclaracao() {

    console.log("paragrafoDeAutodeclaracao");

    let anexo = "";

    let jaTem = false;



    for (const cat of categoriasTrabalhador) {

        if (cat === "rural") {
            anexo = "Anexo VIII da IN PRES/INSS Nº 128, DE 28 DE MARÇO DE 2022";
            jaTem = true;
        } else if (cat == "pescador") {
            if (jaTem) {
                anexo += " e "
            }
            anexo += "Anexo IX da IN PRES/INSS Nº 128, DE 28 DE MARÇO DE 2022";
            jaTem = true;
        } else if (cat == "indigena") {
            if (jaTem) {
                anexo += " e "
            }
            anexo += "Anexo XXV da IN PRES/INSS Nº 128, DE 28 DE MARÇO DE 2022 (Certidão de Exercício de Atividade Rural - Indígena) ";
        }
    }

    /* if (temAutodeclaracao) {
        if (categoriaTrabalhador === "rural") {
                    anexo = "Anexo I do Ofício-Circular nº 46 DIRBEN/INSS de 13/09/2019";
        } else if (categoriaTrabalhador == "pescador") {
                    anexo = "Anexo II do Ofício-Circular nº 46 DIRBEN/INSS de 13/09/2019";
        } else if (categoriaTrabalhador == "indigena") {
                    anexo = "Anexo I da IN 77/2015 (Certidão de Exercício de Atividade Rural - Indígena) ";
        }
    } */

    let txt = "";

    //if (periodosAutoDeclarados.length > 0 && oQueEstaErradoNoFormulario == "") {
    if (periodosAutoDeclarados.length > 0) {
        txt = `${getNumeracaoDosParagrafos()}Para comprovação do labor rural alegado, ${sexo == "homem" ? "o" : "a"} requerente apresenta declaração na forma do ${anexo}, declarando-se trabalhador${sexo == "homem" ? "" : "a"} rural segurad${sexo == "homem" ? "o" : "a"} especial nos seguintes períodos e categorias:`;

        txt += `<ul>`;


        periodosAutoDeclarados.sort(newSortFunction);//reordenando os periodos autodeclarados
        //autodeclarados = `<br><b>Períodos autodeclarados:</b> <br>`

        for (const declarado of periodosAutoDeclarados) {
            txt += `<li class="ql-align-justify ql-indent-1">Categoria: ${declarado.descricao}`;
            txt += ` - <span>Período: ${declarado.inicio} a ${declarado.fim}</li>`;
        }

        txt += `</ul>`;
    } else {
        txt = `${getNumeracaoDosParagrafos()}Foi emitida${dataDeEmissaoDasExigencias != "" ? `, em ${getData(dataDeEmissaoDasExigencias)},` : ``} carta de exigências a${sexo == "homem" ? "o" : "a"} requerente para apresentação das declarações de períodos / atividades (Anexos VIII, IX e X - rural, pescador ou extrativista - da IN PRES/INSS Nº 128, DE 28 DE MARÇO DE 2022, ou Anexo XXV da mesma IN (Certidão de Exercício de Atividade Rural - Indígena). A ausência de autodeclaração impossibilita o reconhecimento da atividade;`;

    }

    return txt;



}


function getVinculosUrbanos() {

    let vinculosUrbanos = [];

    for (const imp of impedimentosGerais) {

        if (imp.tipo == "vinculo" && (imp.descricao.indexOf("Vínculo/C.I. Urbano") >= 0 || imp.descricao.indexOf("Vínculo Público:")) >= 0) {
            vinculosUrbanos.push(imp);
        }

        if (imp.tipo == "vinculoPublico") {
            vinculosUrbanos.push(imp);
        }

    }

    return vinculosUrbanos;
}

function getVinculosRurais() {

    let vinculosRurais = [];

    for (const imp of impedimentosGerais) {

        if (imp.tipo == "vinculo" && imp.descricao.indexOf("Vínculo/C.I. Rural") >= 0) {
            vinculosRurais.push(imp);
            //console.log(`IMPEDIMENTO v RURAL: ${imp.descricao}`);
        } else {
            //console.log(`IMPEDIMENTO NÃO VINCULO RURAL: ${imp.descricao}`);
        }

    }

    return vinculosRurais;
}

function getPreviamentePositivados() {

    let vinculosRurais = [];

    let previamentePositivados = [];

    for (const periodo of periodosRuraisPreviamenteConfirmados) {

        console.log(`>>>>>>>>>>>>>-------------- ${periodo.descricao}`);
        if (periodo.descricao == "Período Previamente Positivado") {
            previamentePositivados.push(periodo);
        }

    }

    return previamentePositivados;


}



function getSegurosDesempregos() {

    let segurosDesempregos = [];

    for (const imp of impedimentosGerais) {

        if (imp.descricao.indexOf("Período em Seguro Desemprego") >= 0) {
            segurosDesempregos.push(imp);
            console.log(`>>>>>>>>>> achamos um seguro desemprego`);
        }

    }

    return segurosDesempregos;
}

function getBeneficiosUrbanos() {

    let beneficiosUrbanos = [];

    for (const imp of impedimentosGerais) {

        if (imp.descricao.indexOf("Benefício Urbano") >= 0) {
            beneficiosUrbanos.push(imp);
        }

    }

    return beneficiosUrbanos;
}

function getBeneficiosRurais() {

    let beneficiosRurais = [];

    for (const prova of provasGerais) {

        if (prova.descricao.indexOf("Benefício Rural") >= 0) {
            beneficiosRurais.push(prova);
        }

    }

    return beneficiosRurais;
}


function paragrafoDeCNIS() {

    console.log("paragrafoDeCNIS");

    let vinculosUrbanos = getVinculosUrbanos();
    let vinculosRurais = getVinculosRurais();
    let periodosPreviamentePositivados = getPreviamentePositivados();
    let segurosDesempregos = getSegurosDesempregos();
    let beneficiosUrbanos = getBeneficiosUrbanos();
    let beneficiosRurais = getBeneficiosRurais();

    if (vinculosUrbanos.length > 0 || vinculosRurais.length > 0) {
        temVinculosRecolhimentos = true;
    }


    let txt = `${getNumeracaoDosParagrafos()}Verifica-se no CNIS d${sexo == "homem" ? "o" : "a"} requerente a ${temVinculosRecolhimentos ? "existências" : "inexistência"} de vínculos trabalhistas ou recolhimentos. `;

    if (temVinculosRecolhimentos) {
        if (vinculosUrbanos.length > 0) {
            txt += `<p class="ql-align-justify ql-indent-1">${sexo == "homem" ? "O" : "A"} requerente teve os seguintes períodos de vínculos/contribuições urbanas:</p>`;
            txt += `<ul>`;
            for (let i = 0; i < vinculosUrbanos.length; i++) {
                let vinculo = vinculosUrbanos[i];

                txt += `<li class="ql-align-justify ql-indent-2 item">${vinculo.descricao}, de ${vinculo.inicio} a ${vinculo.fim};</li>`;


            }
            txt += `</ul>`;
        } else {
            txt += `<p class="ql-align-justify ql-indent-1">Não identificamos vínculos / recolhimentos urbanos.</p>`;
        }



        if (vinculosRurais.length > 0) {
            txt += `<p class="ql-align-justify ql-indent-1">${sexo == "homem" ? "O" : "A"} requerente já computa os seguintes períodos como trabalhador${sexo == "homem" ? "" : "a"} rural:</p>`;
            txt += `<ul class="print">`;
            for (let i = 0; i < vinculosRurais.length; i++) {
                let vinculo = vinculosRurais[i];
                txt += `<li class="ql-align-justify ql-indent-2 print">${vinculo.descricao}, de ${vinculo.inicio} a ${vinculo.fim};</li>`;
            }
            txt += `</ul>`;

        } else {
            txt += `<p class="ql-align-justify ql-indent-1">Não identificamos vínculos / recolhimentos rurais.</p>`;
        }
    }

    if (periodosPreviamentePositivados.length > 0) {
        txt += `<p class="ql-align-justify ql-indent-1">Observa-se que ${sexo == "homem" ? "o" : "a"} requerente teve previamente positivados (art. 115 da IN 128/2022) os seguintes períodos:</p>`;
        txt += `<ul class="print">`;
        periodosPreviamentePositivados.forEach(p => {
            txt += `<li class="ql-align-justify ql-indent-2 print">${p.descricao}: ${p.inicio} a ${p.fim};</li>`;
        });
        txt += `</ul>`;
    }

    if (segurosDesempregos.length > 0) {
        txt += `<p class="ql-align-justify ql-indent-1">Consta recebimento dos seguintes seguros desempregos:</p>`;
        txt += `<ul>`;
        segurosDesempregos.forEach(sd => {
            txt += `<li class="ql-align-justify ql-indent-2">Seguro desemprego, de ${sd.inicio} a ${sd.fim};</li>`;
        });
        txt += `</ul>`;
    }

    // if (teveBeneficios === "sim") {

    //txt += `Por fim, ${sexo == "homem" ? "o" : "a"} requerente gozou dos seguintes benefícios: <br>`;

    if (beneficiosUrbanos.length > 0 || beneficiosRurais.length > 0) {
        txt += `<p class="ql-align-justify ql-indent-1">Por fim, ${sexo == "homem" ? "o" : "a"} requerente gozou/goza dos seguintes benefícios:</p>`;
        txt += `<ul>`;
    }

    if (beneficiosUrbanos.length > 0) {

        for (let i = 0; i < beneficiosUrbanos.length; i++) {
            let beneficio = beneficiosUrbanos[i];
            let fim = "";
            if (beneficio.fim != "") {
                fim = `, Data fim: ${beneficio.fim}`;
            }
            txt += `<li class="ql-align-justify ql-indent-2">${beneficio.descricao} Data Início: ${beneficio.inicio}${beneficio.fim != "" ? fim : ", ativo"};</li>`;
        }
    }

    if (beneficiosRurais.length > 0) {
        for (let i = 0; i < beneficiosRurais.length; i++) {
            let beneficio = beneficiosRurais[i];
            txt += `<li class="ql-align-justify ql-indent-2">${beneficio.descricao} Data Início: ${beneficio.inicio}, Data fim: ${beneficio.fim};</li>`;
        }
    }

    if (beneficiosUrbanos.length > 0 || beneficiosRurais.length > 0) {
        txt += `</ul>`;
    }

    // }

    //paragrafoDeCNISView.innerHTML = txt;

    return txt;

}





function cabecalho() {

    console.log("cabecalho");

    let especie = getEspecie();

    let txt = `Req.: ${nome}<br>
                                    Ref.: ${servico}<br>
                                        NB.: ${especie}${especie != '' ? '/' : ''} ${nb_presente}<br>`;
    // NB.: 41/ ${nb_presente}<br>`;
    //cabecalhoView.innerHTML = txt;

    return txt;
    /*     const delta = cabecalhoView.clipboard.convert(tudo);
    
        cabecalhoView.setContents(delta, 'silent'); */
}

function getEspecie() {
    if (servico.includes("Salário-Maternidade")) return "80"
    else if (servico.includes("Aposentadoria por Idade")) return "41"
    else if (servico.includes("Pensão")) return "21"
    else return ""


}

function paragrafoDeApresentacao() {

    console.log("paragrafoDeApresentacao");

    let txt = "";

    if (servico == "Aposentadoria por Idade Rural") {

        txt = `${getNumeracaoDosParagrafos()}Trata-se de requerimento de ${servico} realizado por ${sexo == "homem" ? "declarado trabalhador" : "declarada trabalhadora"} rural em ${getData(der)}, data em que  ${sexo == "homem" ? "o" : "a"} requerente,  ${sexo == "homem" ? "nascido" : "nascida"} em ${getData(dataNascimento)}, contava com ${idade} anos de vida;`;

    } else if (servico == "Aposentadoria por Idade Urbana") {

        txt = `${getNumeracaoDosParagrafos()}Trata-se de requerimento de ${servico} realizado em ${getData(der)}, data em que  ${sexo == "homem" ? "o" : "a"} requerente,  ${sexo == "homem" ? "nascido" : "nascida"} em ${getData(dataNascimento)}, contava com ${idade} anos de vida;`;

    } else if (servico == "Aposentadoria por Idade Híbrida") {

        txt = `${getNumeracaoDosParagrafos()}Trata-se de requerimento de Aposentadoria por Idade Híbrida (períodos rurais e urbanos) realizado em ${getData(der)}, data em que  ${sexo == "homem" ? "o" : "a"} requerente,  ${sexo == "homem" ? "nascido" : "nascida"} em ${getData(dataNascimento)}, contava com ${idade} anos de vida;`;

    } else if (servico == "Salário-Maternidade Rural") {

        txt = `${getNumeracaoDosParagrafos()}Trata-se de requerimento de Salário-maternidade rural realizado por declarada trabalhadora rural em ${getData(der)}, face nascimento de filho em ______________;`;

    } else if (servico == "Salário-Maternidade Urbano") {

        txt = `${getNumeracaoDosParagrafos()}Trata-se de requerimento de Salário maternidade urbano realizado em ${getData(der)}, face nascimento de filho em ____________;`;

    } else if (servico == "Pensão por Morte Urbana") {

        txt = `${getNumeracaoDosParagrafos()}Trata-se de requerimento de pensão por morte realizado em ${getData(der)}, face óbito do(a) proposto(a) instituidor(a) em ______________. ${sexo == "homem" ? "O" : "A"} requerente figura na condição de ________________`;

    } else if (servico == "Pensão por Idade Rural") {

        txt = `${getNumeracaoDosParagrafos()}Trata-se de requerimento de pensão por morte rural realizado em ${getData(der)}, face óbito do(a) proposto(a) instituidor(a) em ______________. ${sexo == "homem" ? "O" : "A"} requerente figura na condição de ________________`;
    }
    return txt;

}