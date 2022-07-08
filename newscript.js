
"use strict";

let etapaAtual = 1;


function avancarUmaEtapa() {
    exibeEtapa(etapaAtual + 1);
}

for (let posicao = 1; posicao <= 15; posicao++) {
    document.getElementById(`btn_etapa_${posicao}`).addEventListener("click", function () {
        exibeEtapa(posicao);
        etapaAtual = posicao;
    });
}

function exibeEtapa(etapa) {
    console.log(`Chegou etapa: ${etapa}`);
    document.querySelector(`.etapa-${etapa}`).classList.remove("hidden");
    document.getElementById(`btn_etapa_${etapa}`).classList.add("active");
    ocultarOutrasEstapas(etapa)
    etapaAtual = etapa;

    //para etapa 4
    if (etapa == 4) {
        if (der === "") {
            document.getElementById("assumir-der-positivado").classList.add("hidden");
        } else {
            document.getElementById("assumir-der-positivado").classList.remove("hidden");
        }

        //para etapa 3
    } else if (etapa == 3) {
        if (der === "") {
            document.getElementById("assumir-der-vinculo").classList.add("hidden");
        } else {
            document.getElementById("assumir-der-vinculo").classList.remove("hidden");
        }
        //para etapa 3
    } else if (etapa == 2) {
        if (der === "") {
            document.getElementById("assumir-der-orgao").classList.add("hidden");
            document.getElementById("orgao-ou-der").classList.add("hidden");
        } else {
            document.getElementById("assumir-der-orgao").classList.remove("hidden");
            document.getElementById("orgao-ou-der").classList.remove("hidden")
        }
    } else if (etapa == 5) {
        /* if (der === "") {
            document.getElementById("assumir-der-beneficio").classList.add("hidden");
        } else {
            document.getElementById("assumir-der-beneficio").classList.remove("hidden");
        } */
    } else if (etapa == 7) {
        if (der === "") {
            document.getElementById("assumir-der-sala").classList.add("hidden");
        } else {
            document.getElementById("assumir-der-sala").classList.remove("hidden");
        }
        //para etapa 3
    }

}

function ocultarOutrasEstapas(etapaAtiva) {

    for (let posicao = 1; posicao <= 15; posicao++) {
        if (posicao != etapaAtiva) {
            document.querySelector(`.etapa-${posicao}`).classList.add("hidden");
            document.getElementById(`btn_etapa_${posicao}`).classList.remove("active");
        }
    }
}


//monitorando os botões gravar
for (let posicao = 1; posicao <= 13; posicao++) {
    document.querySelector(`.gravar-etapa-${posicao}`).addEventListener("click", function () {
        console.log("vamos executar a etapa " + posicao);
        executarEtapa(posicao);
    });
}

function executarEtapa(posicao) {
    const posicaoString = posicao + "";
    switch (posicaoString) {
        case "1":
            //console.log("vamos receber os dados basicos");
            receberDadosBasicos();
            break;
        case "2":
            receberVinculosPublicos();
            break;
        case "3":
            receberVinculosERecolhimentos();
            break;
        case "4":
            receberPeriodosPositivados();
            break;
        case "5":
            receberBeneficios();
            break;
        case "6":
            receberAtividades();
            break;
        case "7":
            receberBases();
            break;
        case "8":
            receberEmpresas();
            break;
        case "9":
            receberCategoriaESeAnexos();
            break;
        case "10":
            receberPeriodosAutodeclarados();
            break;
        case "11":
            receberProvas();
            break;
        case "12":
            analisar();
            break;
        case "13":
            receberExigencia();
            break;
        case "14":

            break;
        case "15":
            receberCnis();
            break;


        default:
            break;
    }

}




function receberDadosBasicos() {

    nome = document.querySelector("#nome").value;
    dataNascimento = document.querySelector("#data-de-nascimento").value;
    der = document.querySelector("#der").value;
    idade = calculaIdade();
    sexo = document.querySelector('input[name="btnradio-sexo"]:checked').value;

    console.log(`Nome: ${nome}`);
    console.log(`data de nascimento: ${dataNascimento}`);
    console.log(`der: ${der}`);
    console.log(`idade: ${idade}`);
    console.log(`sexo: ${sexo}`);


    if (!isDataNascimentoValida(dataNascimento)) {
        document.getElementById(`data-de-nascimento`).classList.add("is-invalid");
        return false;
    } else {
        document.getElementById(`data-de-nascimento`).classList.remove("is-invalid");
    }

    if (!isDerValida(der)) {
        document.getElementById(`der`).classList.add("is-invalid");
        return false;
    } else {
        document.getElementById(`der`).classList.remove("is-invalid");
    }


    /*     if ((sexo === "homem" && idade < 60) || (sexo === "mulher" && idade < 55)) {
            impedimentostxt += "Idade inferior ao exigido!";
            atencaoRetornoView.innerHTML = impedimentostxt;
        } */


    apresentaDadosBasicos()

    avancarUmaEtapa();
}

function apresentaDadosBasicos() {

    document.getElementById(`dados-table`).classList.remove("hidden");

    document.getElementById(`der_span`).innerHTML = getData(der);
    document.getElementById(`servico_span`).innerHTML = servico;
    document.getElementById(`protocolo_span`).innerHTML = protocolo;
    document.getElementById(`nome_span`).innerHTML = nome;
    document.getElementById(`cpf_span`).innerHTML = cpf;
    document.getElementById(`nit_span`).innerHTML = nit;
    document.getElementById(`data_de_nascimento_span`).innerHTML = getData(dataNascimento);
    document.getElementById(`idade_span`).innerHTML = ` ${idade} anos 
    ${sexo === "homem" && idade >= 65 ? "(Dá Híbrida / Urbana)" : ""}
    ${sexo === "mulher" && idade >= 62 ? "(Dá Híbrida / Urbana)" : ""}
    <br> [implementa idade mínima em: ${calculaAnoQueCompletouIdadeDesejada(sexo == "homem" ? 60 : 55)}]<br>`;
    if ((sexo === "homem" && idade < 60) || (sexo === "mulher" && idade < 55)) {
        document.getElementById(`celula_idade`).classList.remove("table-dark");
        document.getElementById(`celula_idade`).classList.add("table-danger");
    }

    document.getElementById(`sexo_span`).innerHTML = sexo;
    document.getElementById(`mae_span`).innerHTML = nomeMae;

    /*     let categorias = "";
        for (const cat of categoriasTrabalhador) {
    
            categorias += `${cat.toUpperCase()}<br>`;
    
        }
        document.getElementById(`categorias`).innerHTML = categorias; */

}

//para permitir a edição do serviço
document.querySelector("#servico_span").addEventListener("click", function () {

    if (document.getElementById("edicao-servico").classList.contains("hidden")) {
        document.getElementById("edicao-servico").classList.remove("hidden");

    } else {
        document.getElementById("edicao-servico").classList.add("hidden");
    }

});

document.querySelector(`.gravar-servico`).addEventListener("click", function () {
    let serv = document.querySelector("#tipo-servico").value;
    if (serv == "") {
        document.getElementById(`tipo-servico`).classList.add("is-invalid");
        return false;
    } else {
        document.getElementById(`tipo-servico`).classList.remove("is-invalid");
    }

    servico = serv;
    document.getElementById("edicao-servico").classList.add("hidden");
    apresentaDadosBasicos();

});

function showCategorias() {

    removeCategoriasMarcadorasDeIndefinicao();

    let conteudo = `<table class="table table-hover table-sm table-dark table-striped">
    <thead>
        <tr>
            <th scope="row" class="h3" colspan="2">Categorias<small class="blockquote-footer text-end" style="font-size:x-small;">com indícios, mas não comprovadas</small></th>
        </tr>
    </thead>
    <tbody>`;

    //for (const cat of categoriasTrabalhador) {

    for (let i = 0; i < categoriasTrabalhador.length; i++) {
        const cat = categoriasTrabalhador[i];



        let categoria = cat.slice();
        conteudo += `<tr id="categoria_${i}">
                    <th scope="col" class="col-3 align-middle text-center"><p class="align-middle text-center"><span class="fst-normal"><br>${categoria.toUpperCase()}</span>`;

    }

    conteudo += `</tbody>
    </table>`;

    document.getElementById(`show-categorias`).innerHTML = conteudo;


    for (let i = 0; i < categoriasTrabalhador.length; i++) {

        document.getElementById("categoria_" + i).addEventListener("click", function () {


            if (confirm("Confirma deleção da categoria?")) {
                //console.log("Vamos tentar remover o " + j);
                categoriasTrabalhador.splice(i, 1);
                //reapresentaProvas();
                reapresentaTudo();
            }

        });
    }
}

function newPovoaFormularioEtapa1() {
    //absorvendo os dados do getGet.js
    document.querySelector("#nome").value = nome;
    document.querySelector("#data-de-nascimento").value = deDataParaDataAmericana(dataNascimento);
    document.querySelector("#der").value = deDataParaDataAmericana(der);
}








/* Etapa 02 */
document.getElementById("btnradio21").addEventListener("click", function () {
    temVinculoPublicoViewListener();
});
document.getElementById("btnradio22").addEventListener("click", function () {
    temVinculoPublicoViewListener();
});

document.getElementById("assumir-der-orgao").addEventListener("click", function () {
    document.getElementById("data-fim-orgao").value = der;
});


function temVinculoPublicoViewListener() {

    console.log(`linha 183`);

    let status = document.querySelector('input[name="btnradio-tem-vinculo-publico"]:checked').value;

    console.log(`Status etapa 2: ${status}`);

    if (status === "tem-vinculo-publico") {
        temVinculosPublicos = true;
        document.querySelector(".tem_vinculo_publico_dados_class").classList.remove("hidden");
    } else {
        temVinculosPublicos = false;
        document.querySelector(".tem_vinculo_publico_dados_class").classList.add("hidden");
    }
}

function receberVinculosPublicos() {

    if (processaVinculosPublicos()) {
        avancarUmaEtapa();
    }
}

document.querySelector(`.outro-orgao`).addEventListener("click", function () {
    processaVinculosPublicos();
});

function processaVinculosPublicos() {
    nit = document.querySelector("#nit").value;
    document.getElementById(`nit_span`).innerHTML = nit;


    if (temVinculosPublicos) {

        let orgao = document.querySelector("#orgao").value;
        let dataInicio = document.querySelector("#data-inicio-orgao").value;
        let dataFim = document.querySelector("#data-fim-orgao").value;

        let vinculoPublicoPendente = document.querySelector('input[name="tem-vinculo-publico-pendente"]:checked').value;

        if (vinculoPublicoPendente === "nao") {
            vinculoPublicoPendente = false;
        } else {
            vinculoPublicoPendente = true;
        }

        if (!isDataVinculoValida(dataInicio)) {
            document.getElementById(`data-inicio-orgao`).classList.add("is-invalid");
            return false;
        } else {
            document.getElementById(`data-inicio-orgao`).classList.remove("is-invalid");
        }


        if (!isDataVinculoValida(dataFim) && !vinculoPublicoPendente) {
            document.getElementById(`data-fim-orgao`).classList.add("is-invalid");
            return false;
        } else {
            document.getElementById(`data-fim-orgao`).classList.remove("is-invalid");
        }

        if (!dataInicioEFimCoerentes(dataInicio, dataFim) && !vinculoPublicoPendente) {
            document.getElementById(`data-inicio-orgao`).classList.add("is-invalid");
            document.getElementById(`data-fim-orgao`).classList.add("is-invalid");
            return false;
        } else {
            document.getElementById(`data-inicio-orgao`).classList.remove("is-invalid");
            document.getElementById(`data-fim-orgao`).classList.remove("is-invalid");
        }

        impedimentosGerais.push(new Indicio(`Vínculo Público: ${orgao}`, getData(dataInicio), getData(dataFim), "vinculoPublico"));

        reapresentarImpedimentos();

        if (vinculoPublicoPendente) {
            fazerExigenciaVinculoPublico(orgao)
            reapresentarExigencias();
        }
    }
    limpaFormularioVinculosPubicos();
    return true;
}

function limpaFormularioVinculosPubicos() {
    document.querySelector("#orgao").value = "";
    document.querySelector("#data-inicio-orgao").value = "";
    document.querySelector("#data-fim-orgao").value = "";
}

function fazerExigenciaVinculoPublico(orgao) {

    orgao = orgao.slice().replace("MUNICIPIO", "MUNICÍPIO");

    exigenciasGerais.push(`
       - Na forma da IN 128/2022, artigo 69, apresentar Declaração emitida pelo(a) ${orgao}, na forma do Anexo IV da IN 128/2022, constando: (1) todos os períodos trabalhados pel${sexo == "homem" ? "o" : "a"} requerente e o regime previdenciário (RPPS ou RGPS) em cada período. (2) Fazer constar na declaração a ocorrência de períodos de licenças, se for o caso, especificando se foram ou não remuneradas. (3) Anexar cópias autenticadas de todos os decretos de nomeação e exoneração ou contratos, conforme o caso. (4) Apresentar ainda cópias autenticadas das fichas financeiras de todos os períodos recolhidos ao RGPS após julho/1994, se for o caso. Apresentar ainda o Anexo V (Relação das Remunerações sobre as quais incidem Contribuições Previdenciárias).`);

    exigenciasGerais.push(`- Na forma do art. 70 da IN 128/2022, caso algum dos períodos laborados junto a órgãos públicos tenha sido direcionado a RPPS (Regime Próprio de Previdência Social), faculta-se ${sexo == "homem" ? "ao" : "à"} requerente a apresentação de CTC (Certidão de Tempo de Contribuição), na forma do Anexo XV da IN 128/2022, acompanhada da Relação das Remunerações de Contribuições por competências (Anexo XXIII da IN 128/2022) para todos os períodos posteriores a 07/1994;`);
}






//etapa 3

document.getElementById("btnradio31").addEventListener("click", function () {
    temVinculoERecolhimentoViewListener()
});
document.getElementById("btnradio32").addEventListener("click", function () {
    temVinculoERecolhimentoViewListener()
});

document.getElementById("assumir-der-vinculo").addEventListener("click", function () {
    document.getElementById("data-fim-vinculo").value = der;
});


function temVinculoERecolhimentoViewListener() {
    let status = document.querySelector('input[name="btnradio-teve-vinculo"]:checked').value;

    console.log(`status: ${status}`);

    if (status === "tem-vinculo-recolhimento") {
        //console.log("entrou no if do status");
        temVinculosRecolhimentos = true;
        //console.log(`temVinculosRecolhimentos ${temVinculosRecolhimentos}`);
        document.querySelector(".teve_vinculo_ate_class").classList.remove("hidden");
    } else {
        temVinculosRecolhimentos = false;
        document.querySelector(".teve_vinculo_ate_class").classList.add("hidden");
    }
}

document.querySelector(`.outro-vinculo`).addEventListener("click", function () {
    processaFormularioVinculosEContribuicoes();
});

function processaFormularioVinculosEContribuicoes() {


    if (temVinculosRecolhimentos) {

        let empregador = document.querySelector("#empregador").value;
        let dataInicio = document.querySelector("#data-inicio-vinculo").value;
        let dataFim = document.querySelector("#data-fim-vinculo").value;

        let isVinculoRural = document.querySelector('input[name="is-vinculo-rural"]:checked').value;
        if (isVinculoRural === "sim") {
            isVinculoRural = true;
        } else {
            isVinculoRural = false;
        }

        let fazerExigenciasVinculo = document.querySelector('input[name="fazer-exigencias-vinculo"]:checked').value;
        if (fazerExigenciasVinculo === "sim") {
            fazerExigenciasVinculo = true;
        } else {
            fazerExigenciasVinculo = false;
        }

        //Se o vínculo estiver pendente de acerto, não precisa informar data de início
        if (!isDataVinculoValida(dataInicio) && !fazerExigenciasVinculo) {
            document.getElementById(`data-inicio-vinculo`).classList.add("is-invalid");
            return false;
        } else {
            document.getElementById(`data-inicio-vinculo`).classList.remove("is-invalid");
        }

        if (!isDataVinculoValida(dataFim) && !fazerExigenciasVinculo) {
            document.getElementById(`data-fim-vinculo`).classList.add("is-invalid");
            return false;
        } else {
            document.getElementById(`data-fim-vinculo`).classList.remove("is-invalid");
        }

        if (!dataInicioEFimCoerentes(dataInicio, dataFim) && !fazerExigenciasVinculo) {
            document.getElementById(`data-inicio-vinculo`).classList.add("is-invalid");
            document.getElementById(`data-fim-vinculo`).classList.add("is-invalid");
            return false;
        } else {
            document.getElementById(`data-inicio-vinculo`).classList.remove("is-invalid");
            document.getElementById(`data-fim-vinculo`).classList.remove("is-invalid");
        }

        //é um impedimento mesmo que seja rural pois impede homologação de Segurado Especial
        impedimentosGerais.push(new Indicio(`Vínculo/C.I. ${isVinculoRural ? "Rural" : "Urbano"}: ${empregador}`, getData(dataInicio), getData(dataFim), "vinculo"));

        if (isVinculoRural) {
            periodosRuraisPreviamenteConfirmados.push(new NewPeriodo(`Vínculo Rural: ${empregador}`, getData(dataInicio), getData(dataFim)));
        }


        reapresentarImpedimentos();


        if (fazerExigenciasVinculo) {
            fazerExigenciaVinculo(empregador)
            reapresentarExigencias();
        }
        limpaFormularioVinculosEContribuicoes()
    } else {

    }

    return true;

}

function limpaFormularioVinculosEContribuicoes() {
    document.querySelector("#empregador").value = "";
    document.querySelector("#data-inicio-vinculo").value = "";
    document.querySelector("#data-fim-vinculo").value = "";
    document.getElementById("btnradio33").checked = false;
    document.getElementById("btnradio34").checked = true;
    document.getElementById("btnradio36").checked = true;
}

function fazerExigenciaVinculo(empregador) {

    const textoCTPS = `- Apresentar íntegra de todas as carteiras de trabalho do requerente - digitalizar todas as folhas onde houver algo escrito (inclusive férias, FGTS, etc);`

    let temExigenciaCTPS = false;
    exigenciasGerais.forEach(exi => {
        if (exi === textoCTPS) {
            temExigenciaCTPS = true;
        }
    });

    if (!temExigenciaCTPS) {
        exigenciasGerais.push(textoCTPS);
    }

    exigenciasGerais.push(`- Referente ao vínculo trabalhista com ${empregador}, caso não conste na CTPS, esta tenha sido extraviada ou não constem registros de baixa, apresentar termo de rescisão contratual OU Extrato completo da conta vinculada do FGTS emitido pela Caixa Econômica Federal e assinado e carimbado por funcionário do banco;  
    `);
}

function fazerExigenciaCIExtemporaneo(inicio, fim) {

    //EU IA APENAS INCLUIR OS ANOS, MAS PARA ISSO EU TERIA DE VER - CASO A CASO - QUE ANOS JÁ TERIAM SIDO EXIGIDOS
    // NO MOMENTO NÃO JUSTIFICA

    /* exigenciasGerais.forEach(exi => {

       //se já tiver exigências de contribuições extemporâneas
       if (exi.includes("Foram identificadas contribuições extemporâneas")) {

           //apenas adicione os anos

           

       }

   });  */

    exigenciasGerais.push(`-  Foram identificadas contribuições extemporâneas realizadas em GFIP na condição de prestador de serviço / empresário. Na forma do art. 95 da IN 128/2022, apresentar documentos para comprovação da remuneração decorrente do trabalho - comprovantes da retirada de pró-labore,  declarações de imposto de renda,etc - relativas aos anos de ${inicio.split("/")[2]} a ${fim.split("/")[2]}`);



}

function receberVinculosERecolhimentos() {

    if (processaFormularioVinculosEContribuicoes()) {
        avancarUmaEtapa();
    }

}



//etapa-4

document.getElementById("btnradio41").addEventListener("click", function () {
    temPeriodosPositivadosViewListener()
});
document.getElementById("btnradio42").addEventListener("click", function () {
    temPeriodosPositivadosViewListener()
});


document.getElementById("assumir-der-positivado").addEventListener("click", function () {
    document.getElementById("data-fim-positivado").value = der;
});


function temPeriodosPositivadosViewListener() {
    let status = document.querySelector('input[name="btnradio-teve-positivado"]:checked').value;

    console.log(`status: ${status}`);

    if (status === "tem-periodo-positivado") {
        temPeriodosPositivados = true;
        document.querySelector(".teve_positivado_class").classList.remove("hidden");
    } else {
        temPeriodosPositivados = false;
        document.querySelector(".teve_positivado_class").classList.add("hidden");
    }
}

function receberPeriodosPositivados() {
    if (processaFormularioPeriodosPositivados()) {
        avancarUmaEtapa();
    }
}

document.querySelector(`.outro-periodo-positivado`).addEventListener("click", function () {
    processaFormularioPeriodosPositivados();
});

function processaFormularioPeriodosPositivados() {

    if (temPeriodosPositivados) {
        let dataInicio = document.querySelector("#data-inicio-positivado").value;
        let dataFim = document.querySelector("#data-fim-positivado").value;

        if (!isDataVinculoValida(dataInicio)) {
            document.getElementById(`data-inicio-positivado`).classList.add("is-invalid");
            return false;
        } else {
            document.getElementById(`data-inicio-positivado`).classList.remove("is-invalid");
        }

        if (!isDataVinculoValida(dataFim)) {
            document.getElementById(`data-fim-positivado`).classList.add("is-invalid");
            return false;
        } else {
            document.getElementById(`data-fim-positivado`).classList.remove("is-invalid");
        }

        if (!dataInicioEFimCoerentes(dataInicio, dataFim)) {
            document.getElementById(`data-inicio-positivado`).classList.add("is-invalid");
            document.getElementById(`data-fim-positivado`).classList.add("is-invalid");
            return false;
        } else {
            document.getElementById(`data-inicio-positivado`).classList.remove("is-invalid");
            document.getElementById(`data-fim-positivado`).classList.remove("is-invalid");
        }

        /* provasGerais.push(new Indicio("Período Previamente Positivado", getData(dataInicio), getData(dataFim), "periodoPositivado")); */

        let periodo = new NewPeriodo("Período Previamente Positivado", getData(dataInicio), getData(dataFim));

        periodosRuraisPreviamenteConfirmados.push(periodo);
        provasGerais.push(periodo);

        console.log(`TEMOS ${provasGerais.length} PROVAS`);

        reapresentarProvas();
        apresentarPeriodosPreviamenteConfirmados();
        limpaFormularioPeriodoPositivado();
    }

    return true;

}

function limpaFormularioPeriodoPositivado() {

    document.querySelector("#data-inicio-positivado").value = "";
    document.querySelector("#data-fim-positivado").value = "";

}





//ETAPA-5

document.getElementById("btnradio51").addEventListener("click", function () {
    temBeneficioViewListener()
});
document.getElementById("btnradio52").addEventListener("click", function () {
    temBeneficioViewListener()
});

/* document.getElementById("assumir-der-beneficio").addEventListener("click", function () {
    document.getElementById("data-fim-beneficio").value = der;
}); */

document.querySelector(`.outro-beneficio`).addEventListener("click", function () {
    processaFormularioBeneficios();
});

function temBeneficioViewListener() {
    let status = document.querySelector('input[name="btnradio-teve-beneficio"]:checked').value;

    if (status === "sim") {
        temBeneficios = true;
        document.querySelector(".teve_beneficio_ate_class").classList.remove("hidden");
    } else {
        temBeneficios = false;
        document.querySelector(".teve_beneficio_ate_class").classList.add("hidden");
    }
}


document.getElementById("tipo-beneficio").addEventListener("change", function () {
    categoriaDoBeneficioViewListener(this.value);
});

function categoriaDoBeneficioViewListener(especie) {
    //let especie = document.querySelector("#tipo-beneficio").value;

    if (especie === "87" || especie === "88") {
        document.getElementById("categoria-do-beneficio").classList.add("hidden");
    } else {
        document.getElementById("categoria-do-beneficio").classList.remove("hidden");
    }
}

function receberBeneficios() {

    console.log("chegou em receber benefícios");

    if (processaFormularioBeneficios()) {
        avancarUmaEtapa();
    }

}



function processaFormularioBeneficios() {

    console.log("Chegou em processa formulário de benefícios");

    if (temBeneficios) {
        let nb = document.querySelector("#nb").value;
        let dataInicio = document.querySelector("#data-inicio-beneficio").value;
        let dataFim = document.querySelector("#data-fim-beneficio").value;
        let especie = document.querySelector("#tipo-beneficio").value;

        console.log("NB: " + nb);
        console.log("Inicio: " + dataInicio);
        console.log("Fim: " + dataFim);
        console.log("Especie: " + especie);

        if (especie == "") {
            document.getElementById(`tipo-beneficio`).classList.add("is-invalid");
            return false;
        } else {
            document.getElementById(`tipo-beneficio`).classList.remove("is-invalid");
        }

        if (!isEntradaTextoValida(nb, 10)) {
            document.getElementById(`nb`).classList.add("is-invalid");
            return false;
        } else {
            document.getElementById(`nb`).classList.remove("is-invalid");
        }


        if (!isDataVinculoValida(dataInicio)) {
            document.getElementById(`data-inicio-beneficio`).classList.add("is-invalid");
            return false;
        } else {
            document.getElementById(`data-inicio-beneficio`).classList.remove("is-invalid");
        }

        if (dataFim != "") {
            if (!isDataVinculoValida(dataFim)) {
                document.getElementById(`data-fim-beneficio`).classList.add("is-invalid");
                return false;
            } else {
                document.getElementById(`data-fim-beneficio`).classList.remove("is-invalid");
            }
            if (!dataInicioEFimCoerentes(dataInicio, dataFim)) {
                document.getElementById(`data-fim-beneficio`).classList.add("is-invalid");
                document.getElementById(`data-inicio-beneficio`).classList.add("is-invalid");
                return false;
            } else {
                document.getElementById(`data-fim-beneficio`).classList.remove("is-invalid");
                document.getElementById(`data-inicio-beneficio`).classList.remove("is-invalid");
            }

        }



        let isBeneficioUrbano = document.querySelector('input[name="is-beneficio-urbano"]:checked').value;
        if (isBeneficioUrbano === "urbano") {
            isBeneficioUrbano = true;
        } else {
            isBeneficioUrbano = false;
        }

        //console.log("tem beneficio urbano: " + isBeneficioUrbano);

        let nota = "urbano";
        if (!isBeneficioUrbano && especie != "87" && especie != "88") {

            const descricao = `Benefício Rural: NB ${especie} / ${nb}`;
            provasGerais.push(new Indicio(descricao, getData(dataInicio), getData(dataFim), "beneficio"));

        } else {
            const descricao = `Benefício Urbano ${dataFim == "" ? "Ativo" : ""}: NB ${especie} / ${nb}`;
            impedimentosGerais.push(new Indicio(descricao, getData(dataInicio), getData(dataFim), "beneficio"));
            console.log(">>>>>>>>>>>>> incluimos um benefício <<<<<<<<<<<<<<<");
        }
    }

    limpaFormularioBeneficios();
    reapresentarImpedimentos();
    reapresentarProvas();

    reapresentaTudo();

    return true;

}


function limpaFormularioBeneficios() {
    document.querySelector("#nb").value = "";
    document.querySelector("#data-inicio-beneficio").value = "";
    document.querySelector("#data-fim-beneficio").value = "";
    document.querySelector("#tipo-beneficio").value = "";
}






//ETAPA-06

document.getElementById("btnradio61").addEventListener("click", function () {
    temAtividadeViewListener();
});
document.getElementById("btnradio62").addEventListener("click", function () {
    temAtividadeViewListener();
});


function temAtividadeViewListener() {

    let status = document.querySelector('input[name="btnradio-tem-atividade"]:checked').value;

    console.log(`Status etapa 6: ${status}`);

    if (status === "tem-atividade") {
        temAtividades = true;
        document.querySelector(".teve_atividade_ate_class").classList.remove("hidden");
    } else {
        temAtividades = false;
        document.querySelector(".teve_atividade_ate_class").classList.add("hidden");
    }
}

document.getElementById("btnradio63").addEventListener("click", function () {
    atividadeAtivaViewListener();
});
document.getElementById("btnradio64").addEventListener("click", function () {
    atividadeAtivaViewListener();
});

function atividadeAtivaViewListener() {

    let status = document.querySelector('input[name="btnradio-atividade-ativa"]:checked').value;


    if (status === "ativa") {
        atividadeAtiva = true;
        document.getElementById("termino-atividade").classList.add("hidden");
    } else {
        atividadeAtiva = false;
        document.getElementById("termino-atividade").classList.remove("hidden");
    }
}

function receberAtividades() {

    if (processaFormularioAtividadesCnis()) {
        limpaFormularioAtividadeCnis();
        avancarUmaEtapa();
    }
}


function processaFormularioAtividadesCnis() {

    if (temAtividades) {

        let atividade = document.querySelector("#atividade").value;
        let dataInicio = document.querySelector("#data-inicio-atividade").value;

        if (!isDataVinculoValida(dataInicio)) {
            document.getElementById(`data-inicio-atividade`).classList.add("is-invalid");
            return false;
        } else {
            document.getElementById(`data-inicio-atividade`).classList.remove("is-invalid");
        }

        let dataFim = "";

        if (!atividadeAtiva) {
            dataFim = document.querySelector("#data-fim-atividade").value;
        }

        if (!atividadeAtiva) {

            if (!isDataVinculoValida(dataFim)) {
                document.getElementById(`data-fim-atividade`).classList.add("is-invalid");
                return false;
            } else {
                document.getElementById(`data-fim-atividade`).classList.remove("is-invalid");
            }

            if (!dataInicioEFimCoerentes(dataInicio, dataFim)) {
                document.getElementById(`data-inicio-atividade`).classList.add("is-invalid");
                document.getElementById(`data-fim-atividade`).classList.add("is-invalid");
                return false;
            } else {
                document.getElementById(`data-inicio-atividade`).classList.remove("is-invalid");
                document.getElementById(`data-fim-atividade`).classList.remove("is-invalid");
            }

        }

        let isAtividadeUrbana = document.querySelector('input[name="is-atividade-urbana"]:checked').value;


        if (isAtividadeUrbana === "sim") {
            isAtividadeUrbana = true;
        } else {
            isAtividadeUrbana = false;
        }


        if (isAtividadeUrbana) {
            const fim = atividadeAtiva ? "" : getData(dataFim);
            impedimentosGerais.push(new Indicio(`Atividade Urbana ${atividadeAtiva ? "Ativa" : ""}: ${atividade}`, getData(dataInicio), fim, "atividade"));
            reapresentarImpedimentos();

            if (atividadeAtiva) {
                fazerExigenciaAtividade(atividade);
                reapresentarExigencias();
            }

        } else {
            const fim = atividadeAtiva ? "" : getData(dataFim);
            provasGerais.push(new Indicio(`Atividade Rural ${atividadeAtiva ? "Ativa" : ""}: ${atividade}`, getData(dataInicio), fim, "atividade"));
            reapresentarProvas();
        }
    } else {
        console.log("não tem atividades");
    }

    limpaFormularioAtividadeCnis();
    return true;
}

function fazerExigenciaAtividade(atividade) {
    exigenciasGerais.push(`- Apresentar declaração informando se ainda exerce a atividade de ${atividade}. Caso não exerça, informar a data que deixou de exercê-la;  
    `);
}


function limpaFormularioAtividadeCnis() {
    document.querySelector("#atividade").value = "";
    document.querySelector("#data-inicio-atividade").value = "";
    document.querySelector("#data-fim-atividade").value = "";

    document.querySelector("#btnradio63").checked = true;
    document.getElementById("btnradio65").checked = true;

    document.getElementById("termino-atividade").classList.add("hidden");
    atividadeAtiva = true;
}

document.querySelector(`.outra-atividade`).addEventListener("click", function () {
    if (processaFormularioAtividadesCnis()) {
        limpaFormularioAtividadeCnis();
    }
});





//ETAPA-7

//primeiro vamos fechar todos

document.getElementById("btnradio71").addEventListener("click", function () {
    temBaseViewListener();
});
document.getElementById("btnradio72").addEventListener("click", function () {
    temBaseViewListener();
});


function temBaseViewListener() {

    let status = document.querySelector('input[name="teve-base"]:checked').value;

    console.log(`Status etapa 7: ${status}`);

    if (status === "sim") {
        temBase = true;
        document.querySelector(".teve_base_ate_class").classList.remove("hidden");
    } else {
        temBase = false;
        document.querySelector(".teve_base_ate_class").classList.add("hidden");
    }
}


document.getElementById("btnradio73").addEventListener("click", function () {
    temDAP = true;
    document.getElementById("dap-body").classList.remove("hidden");

});
document.getElementById("btnradio74").addEventListener("click", function () {
    temDAP = false;
    document.getElementById("dap-body").classList.add("hidden")
});

document.getElementById("btnradio75").addEventListener("click", function () {
    temDefeso = true;
    document.getElementById("defeso-body").classList.remove("hidden");

});
document.getElementById("btnradio76").addEventListener("click", function () {
    temDefeso = false;
    document.getElementById("defeso-body").classList.add("hidden")
});

document.getElementById("btnradio77").addEventListener("click", function () {
    temSala = true;
    document.getElementById("sala-body").classList.remove("hidden");

});
document.getElementById("btnradio78").addEventListener("click", function () {
    temSala = false;
    document.getElementById("sala-body").classList.add("hidden")
});

document.getElementById("btnradio79").addEventListener("click", function () {
    temRGP = true;
    document.getElementById("rgp-body").classList.remove("hidden");

});
document.getElementById("btnradio710").addEventListener("click", function () {
    temRGP = false;
    document.getElementById("rgp-body").classList.add("hidden")
});

document.getElementById("btnradio711").addEventListener("click", function () {
    temSD = true;
    document.getElementById("sd-body").classList.remove("hidden");

});
document.getElementById("btnradio712").addEventListener("click", function () {
    temSD = false;
    document.getElementById("sd-body").classList.add("hidden")
});



function receberBases() {

    /* if (temBase) {
        if (processaFormularioBasesGovernamentais()) {
            avancarUmaEtapa();
        }
    } else {
        avancarUmaEtapa();
    } */
    avancarUmaEtapa();
}



function processaFormularioBasesGovernamentais() {

    if (temDAP) {
        if (!processaFormularioDap()) {
            return false;
        }
    }

    if (temDefeso) {
        if (!processaFormularioDefeso()) {
            return false;
        }
    }


    if (temSala) {
        if (!processaFormularioSala()) {
            return false;
        }
    }

    if (temRGP) {

        if (!processaFormularioRGP()) {
            return false;
        }
    }

    if (temSD) {
        if (!processaFormularioSeguroDesemprego()) {
            return false;
        }
    }


    return true;

}




function processaFormularioDap() {
    let numeroDAP = document.querySelector("#numero_dap").value;
    let categoriaDAP = document.querySelector("#categoria_dap").value;
    let dataInicio = document.querySelector("#data-inicio-dap").value;
    let dataFim = document.querySelector("#data-fim-dap").value;


    if (!isEntradaTextoValida(numeroDAP, 5)) {
        document.getElementById(`numero_dap`).classList.add("is-invalid");
        return false;
    } else {
        document.getElementById(`numero_dap`).classList.remove("is-invalid");
    }


    if (!isDataVinculoValida(dataInicio)) {
        document.getElementById(`data-inicio-dap`).classList.add("is-invalid");
        return false;
    } else {
        document.getElementById(`data-inicio-dap`).classList.remove("is-invalid");
    }


    if (!isDataVinculoValidaAceitaFuturo(dataFim)) {
        document.getElementById(`data-fim-dap`).classList.add("is-invalid");
        return false;
    } else {
        document.getElementById(`data-fim-dap`).classList.remove("is-invalid");
    }

    if (!dataInicioEFimCoerentes(dataInicio, dataFim)) {
        document.getElementById(`data-fim-dap`).classList.add("is-invalid");
        document.getElementById(`data-inicio-dap`).classList.add("is-invalid");
        return false;
    } else {
        document.getElementById(`data-inicio-dap`).classList.remove("is-invalid");
        document.getElementById(`data-fim-dap`).classList.remove("is-invalid");
    }

    if (!isEntradaTextoValida(categoriaDAP, 5)) {
        document.getElementById(`categoria_dap`).classList.add("is-invalid");
        return false;
    } else {
        document.getElementById(`categoria_dap`).classList.remove("is-invalid");
    }



    provasGerais.push(new Indicio(`DAP ${numeroDAP} - ${categoriaDAP}`, getData(dataInicio), getData(dataFim), "dap"));

    apresentarSugestaoDeHomologacao();

    return true;

}

function processaFormularioDefeso() {

    //console.log("Defendendo o pescado nacional");

    let dataInicioDefeso = document.querySelector("#data-inicio-defeso").value;
    let dataFimDefeso = document.querySelector("#data-fim-defeso").value;

    if (!isDataVinculoValida(dataInicioDefeso)) {
        document.getElementById(`data-inicio-defeso`).classList.add("is-invalid");
        return false;
    } else {
        document.getElementById(`data-inicio-defeso`).classList.remove("is-invalid");
    }

    if (!isDataVinculoValida(dataFimDefeso)) {
        document.getElementById(`data-fim-defeso`).classList.add("is-invalid");
        return false;
    } else {
        document.getElementById(`data-fim-defeso`).classList.remove("is-invalid");
    }

    if (!dataInicioEFimCoerentes(dataInicioDefeso, dataFimDefeso)) {
        document.getElementById(`data-fim-defeso`).classList.add("is-invalid");
        document.getElementById(`data-inicio-defeso`).classList.add("is-invalid");
        return false;
    } else {
        document.getElementById(`data-fim-defeso`).classList.remove("is-invalid");
        document.getElementById(`data-inicio-defeso`).classList.remove("is-invalid");
    }

    provasGerais.push(new Indicio(`Seguro Defeso`, getData(dataInicioDefeso), getData(dataFimDefeso), "defeso"));

    apresentarSugestaoDeHomologacao();

    return true;
}


document.getElementById("assumir-der-sala").addEventListener("click", function () {
    document.getElementById("data-fim-sala").value = der;
});

function processaFormularioSala() {
    let nomeAssentamento = document.querySelector("#nome-assentamento").value;
    let dataInicioSala = document.querySelector("#data-inicio-sala").value;
    let dataFimSala = document.querySelector("#data-fim-sala").value;


    if (!isEntradaTextoValida(nomeAssentamento, 5)) {
        document.getElementById(`nome-assentamento`).classList.add("is-invalid");
        return false;
    } else {
        document.getElementById(`nome-assentamento`).classList.remove("is-invalid");
    }

    if (!isDataVinculoValida(dataInicioSala)) {
        document.getElementById(`data-inicio-sala`).classList.add("is-invalid");
        return false;
    } else {
        document.getElementById(`data-inicio-sala`).classList.remove("is-invalid");
    }



    if (!isDataVinculoValida(dataFimSala)) {
        document.getElementById(`data-fim-sala`).classList.add("is-invalid");
        return false;
    } else {
        document.getElementById(`data-fim-sala`).classList.remove("is-invalid");
    }

    if (!dataInicioEFimCoerentes(dataInicioSala, dataFimSala)) {
        document.getElementById(`data-fim-sala`).classList.add("is-invalid");
        document.getElementById(`data-inicio-sala`).classList.add("is-invalid");
        return false;
    } else {
        document.getElementById(`data-inicio-sala`).classList.remove("is-invalid");
        document.getElementById(`data-fim-sala`).classList.remove("is-invalid");
    }



    //provasView.innerHTML += `<br>Registro de Assentado no Sala: <br>${nomeAssentamento} <br> Data Início: ${getData(dataInicioSala)} Data fim: ${getData(dataFimSala)}`;
    //provasArray.push(new RegistroSala(nomeAssentamento, getData(dataInicioSala), getData(dataFimSala)));
    provasGerais.push(new Indicio(`Registro no Sala Da Cidadania (INCRA): Assentamento ${nomeAssentamento}`, getData(dataInicioSala), getData(dataFimSala), "sala"));

    apresentarSugestaoDeHomologacao();

    return true;

}

function processaFormularioRGP() {
    let numeroRgp = document.querySelector("#numero-rgp").value;
    let dataInicioRgp = document.querySelector("#data-inicio-rgp").value;
    let dataFimRgp = "";
    //let rgpAtivo = document.querySelector("#rgp-ativo").checked;

    if (!isEntradaTextoValida(numeroRgp, 3)) {
        document.getElementById(`numero-rgp`).classList.add("is-invalid");
        return false;
    } else {
        document.getElementById(`numero-rgp`).classList.remove("is-invalid");
    }

    if (!isDataVinculoValida(dataInicioRgp)) {
        document.getElementById(`data-inicio-rgp`).classList.add("is-invalid");
        return false;
    } else {
        document.getElementById(`data-inicio-rgp`).classList.remove("is-invalid");
    }

    if (!rgpAtivo) {

        dataFimRgp = document.querySelector("#data-fim-rgp").value;

        if (!isDataVinculoValida(dataFimRgp)) {
            document.getElementById(`data-fim-rgp`).classList.add("is-invalid");
            return false;
        } else {
            document.getElementById(`data-fim-rgp`).classList.remove("is-invalid");
        }

        if (!dataInicioEFimCoerentes(dataInicioRgp, dataFimRgp)) {
            document.getElementById(`data-inicio-rgp`).classList.add("is-invalid");
            document.getElementById(`data-fim-rgp`).classList.add("is-invalid");
            return false;
        } else {
            document.getElementById(`data-inicio-rgp`).classList.remove("is-invalid");
            document.getElementById(`data-fim-rgp`).classList.remove("is-invalid");
        }

    }



    //provasView.innerHTML += `<br>RGP: <br>${numeroRgp} <br> Data Início: ${getData(dataInicioRgp)} Data fim: ${getData(dataFimRgp)} RGP Ativo: ${rgpAtivo ? "sim" : "não"}`;
    //provasArray.push(new RGP(numeroRgp, getData(dataInicioRgp), getData(dataFimRgp), rgpAtivo));
    const fim = rgpAtivo ? "" : getData(dataFimRgp);
    provasGerais.push(new Indicio(`RGP ${rgpAtivo ? `Ativo` : ``} nº ${numeroRgp}`, getData(dataInicioRgp), fim, "rgp"));

    apresentarSugestaoDeHomologacao();

    return true;

}

document.getElementById("btnradio713").addEventListener("click", function () {
    rgpAtivoViewListener();
});
document.getElementById("btnradio714").addEventListener("click", function () {
    rgpAtivoViewListener();
});

function rgpAtivoViewListener() {

    let status = document.querySelector('input[name="rgp-ativo"]:checked').value;


    if (status === "sim") {
        rgpAtivo = true;
        document.getElementById("termino-rgp").classList.add("hidden");
    } else {
        rgpAtivo = false;
        document.getElementById("termino-rgp").classList.remove("hidden");
    }
}


function processaFormularioSeguroDesemprego() {
    let dataInicioSD = document.querySelector("#data-inicio-sd").value;
    let dataFimSD = document.querySelector("#data-fim-sd").value;

    if (!isDataVinculoValida(dataInicioSD)) {
        document.getElementById(`data-inicio-sd`).classList.add("is-invalid");
        return false;
    } else {
        document.getElementById(`data-inicio-sd`).classList.remove("is-invalid");
    }


    if (!isDataVinculoValida(dataFimSD)) {
        document.getElementById(`data-fim-sd`).classList.add("is-invalid");
        return false;
    } else {
        document.getElementById(`data-fim-sd`).classList.remove("is-invalid");
    }

    if (!dataInicioEFimCoerentes(dataInicioSD, dataFimSD)) {
        document.getElementById(`data-inicio-sd`).classList.add("is-invalid");
        document.getElementById(`data-fim-sd`).classList.add("is-invalid");
        return false;
    } else {
        document.getElementById(`data-inicio-sd`).classList.remove("is-invalid");
        document.getElementById(`data-fim-sd`).classList.remove("is-invalid");
    }



    impedimentosGerais.push(new Indicio(`Período em Seguro Desemprego`, getData(dataInicioSD), getData(dataFimSD), "seguroDesemprego"));
    //impedimentosArray.push(new SeguroDesemprego(getData(dataInicioSD), getData(dataFimSD)));

    apresentarSugestaoDeHomologacao();

    return true;

}





document.querySelector(".outra-dap").addEventListener("click", function () {

    if (processaFormularioDap()) {
        reapresentarProvas();
        limpaFormularioDap();
    }

});


function limpaFormularioDap() {
    document.querySelector("#numero_dap").value = "";
    document.querySelector("#categoria_dap").value = "";
    document.querySelector("#data-inicio-dap").value = "";
    document.querySelector("#data-fim-dap").value = "";
}

document.querySelector(".outro-defeso").addEventListener("click", function () {

    if (processaFormularioDefeso()) {
        reapresentarProvas();
        limpaFormularioDefeso();
    }

});

document.querySelector(".outro-sd").addEventListener("click", function () {

    if (processaFormularioSeguroDesemprego()) {
        reapresentarImpedimentos();
        limpaFormularioSeguroDesemprego();
    }

});

function limpaFormularioDefeso() {
    document.querySelector("#data-inicio-defeso").value = "";
    document.querySelector("#data-fim-defeso").value = "";
}

function limpaFormularioSeguroDesemprego() {
    document.querySelector("#data-inicio-sd").value = "";
    document.querySelector("#data-fim-sd").value = "";
}

document.querySelector(".outro-sala").addEventListener("click", function () {


    if (processaFormularioSala()) {
        reapresentarProvas();

        limpaFormularioSala();
    }



});

function limpaFormularioSala() {
    document.querySelector("#nome-assentamento").value = "";
    document.querySelector("#data-inicio-sala").value = "";
    document.querySelector("#data-fim-sala").value = "";
}

document.querySelector(".outro-rgp").addEventListener("click", function () {

    if (processaFormularioRGP()) {
        reapresentarProvas();

        limpaFormularioRGP();
    }

});

function limpaFormularioRGP() {
    document.querySelector("#numero-rgp").value = "";
    document.querySelector("#data-inicio-rgp").value = "";
    document.querySelector("#data-fim-rgp").value = "";
    document.querySelector("#btnradio713").checked = true;
    document.getElementById("termino-rgp").classList.add("hidden");
    rgpAtivo = true;
}







//Etapa-8

document.getElementById("btnradio81").addEventListener("click", function () {
    temEmpresa = true;
    document.querySelector(".teve_empresa_ate_class").classList.remove("hidden");
});
document.getElementById("btnradio82").addEventListener("click", function () {
    temEmpresa = false;
    document.querySelector(".teve_empresa_ate_class").classList.add("hidden");
});

document.getElementById("btnradio83").addEventListener("click", function () {
    empresaAtiva = true;
    document.getElementById("fim-empresa").classList.add("hidden");
});
document.getElementById("btnradio84").addEventListener("click", function () {
    empresaAtiva = false;
    document.getElementById("fim-empresa").classList.remove("hidden");
});


function processaFormularioEmpresasNoCPF() {

    if (temEmpresa) {
        let cnpjCei = document.querySelector("#cnpj_cei").value;
        let nomeEmpresa = document.querySelector("#nome_empresa").value;
        let cnae = document.querySelector("#cnae").value;
        let dataInicio = document.querySelector("#data-inicio-empresa").value;
        let dataFim = document.querySelector("#data-fim-empresa").value;


        if (!isEntradaTextoValida(cnpjCei, 5)) {
            document.getElementById(`cnpj_cei`).classList.add("is-invalid");
            return false;
        } else {
            document.getElementById(`cnpj_cei`).classList.remove("is-invalid");
        }

        if (!isEntradaTextoValida(nomeEmpresa, 5)) {
            document.getElementById(`nome_empresa`).classList.add("is-invalid");
            return false;
        } else {
            document.getElementById(`nome_empresa`).classList.remove("is-invalid");
        }

        if (!isEntradaTextoValida(cnae, 3)) {
            document.getElementById(`cnae`).classList.add("is-invalid");
            return false;
        } else {
            document.getElementById(`cnae`).classList.remove("is-invalid");
        }

        if (!isDataVinculoValida(dataInicio)) {
            document.getElementById(`data-inicio-empresa`).classList.add("is-invalid");
            return false;
        } else {
            document.getElementById(`data-inicio-empresa`).classList.remove("is-invalid");
        }

        if (!empresaAtiva) {

            if (!isDataVinculoValida(dataFim)) {
                document.getElementById(`data-fim-empresa`).classList.add("is-invalid");
                return false;
            } else {
                document.getElementById(`data-fim-empresa`).classList.remove("is-invalid");
            }

            if (!dataInicioEFimCoerentes(dataInicio, dataFim)) {
                document.getElementById(`data-inicio-empresa`).classList.add("is-invalid");
                document.getElementById(`data-fim-empresa`).classList.add("is-invalid");
                return false;
            } else {
                document.getElementById(`data-inicio-empresa`).classList.remove("is-invalid");
                document.getElementById(`data-fim-empresa`).classList.remove("is-invalid");
            }

        }



        let categoria = document.querySelector('input[name="is-empresa-urbana"]:checked').value;

        let fim = getData(dataFim);
        if (empresaAtiva) { fim = ""; }

        if (categoria === "rural") {

            provasGerais.push(new Indicio(`Empresa Rural${empresaAtiva ? " Ativa" : ""}: ${nomeEmpresa}, ${cnpjCei}, ${cnae}`, getData(dataInicio), fim, "empresa"));
            reapresentarProvas();

        } else {

            impedimentosGerais.push(new Indicio(`Empresa Urbana${empresaAtiva ? " Ativa" : ""}: ${nomeEmpresa}, ${cnpjCei}, ${cnae}`, getData(dataInicio), fim, "empresa"));

            reapresentarImpedimentos();

            if (empresaAtiva) {
                fazerExigenciaEmpresa(nomeEmpresa, cnpjCei);
                reapresentarExigencias();
            }
        }
    }

    apresentarSugestaoDeHomologacao();


    return true;
}

function fazerExigenciaEmpresa(nomeEmpresa, cnpjCei) {

    exigenciasGerais.push(`- Consta empresa ativa (${nomeEmpresa}, CNPJ ${cnpjCei}) sob o CPF do(a) requerente. Apresentar contrato de constituição da empresa, todas as alterações contratuais e outros documentos que possuir para comprovar a situação da mesma.`);


}


function receberEmpresas() {

    if (processaFormularioEmpresasNoCPF()) {
        limpaFormularioEmpresaNoCPF();
        avancarUmaEtapa();
    }

}

function limpaFormularioEmpresaNoCPF() {
    document.querySelector("#cnpj_cei").value = "";
    document.querySelector("#nome_empresa").value = "";
    document.querySelector("#cnae").value = "";
    document.querySelector("#data-inicio-empresa").value = "";
    document.querySelector("#data-fim-empresa").value = "";
    document.querySelector("#btnradio83").checked = true;
    document.getElementById("btnradio86").checked = true;
    document.getElementById("fim-empresa").classList.add("hidden");
}

document.querySelector(".outra-empresa").addEventListener("click", function () {

    if (processaFormularioEmpresasNoCPF()) {
        limpaFormularioEmpresaNoCPF();

    }
});



//etapa-9

function receberCategoriaESeAnexos() {

    processaCategoriaEAnexos();
    //avancarUmaEtapa();
}

function processaCategoriaEAnexos() {

    //setando o tipo: rural, indigena, pescador, nao_sei_mas_nao_indigena, nao_sei

    let categoriaTrabalhador = document.querySelector('input[name="btn-categoria"]:checked').value;
    categoriasTrabalhador.push(categoriaTrabalhador);



    //verificando se tem anexos
    temAnexos = document.querySelector('input[name="tem-anexo"]:checked').value;
    temAnexos = (temAnexos === "tem-anexo" ? true : false);


    //verificando se tem auto-declaração
    temAutodeclaracao = false;

    if (temAnexos) {
        temAutodeclaracao = document.querySelector('input[name="tem-autodeclaracao"]:checked').value; //mostra a pergunta se tem autodeclação
        temAutodeclaracao = (temAutodeclaracao === "tem-autodeclaracao" ? true : false);

    } else {
        exigenciasGerais.push(`
    - Apresentar originais:<br>
    -- RG, <br>
    -- CPF, <br>
    -- todas as carteiras de trabalho (na íntegra - todas as folhas onde houver algo escrito)<br>
    -- registro civil (certidão de nascimento ou casamento)<br>
    -- comprovante de endereço<br>
    `);
    }


    //console.log("Tem autodeclaracao " + temAutodeclaracao);

    //adicionando a exigencias da autodeclaração
    if (!temAutodeclaracao) {
        if (categoriaTrabalhador === "rural") {
            exigenciasGerais.push(`
      - Apresentar declaração de atividade rural na forma do Anexo VIII da IN nº 128 PRES/INSS, de 28/03/2022, o qual substituiu a entrevista rural (o modelo da declaração segue em anexo a esta carta e esta disponibilizado no presente requerimento, podendo ser acessado por meio do portal/aplicativo Meu INSS;
        `);
        } else if (categoriaTrabalhador == "pescador") {
            exigenciasGerais.push(`
        - Apresentar formulário preenchido da Autodeclaração do Segurado Especial Pescador, na forma do Anexo IX da IN nº 128 PRES/INSS, de 28/03/2022;      
      `);
        } else if (categoriaTrabalhador == "indigena") {
            exigenciasGerais.push(`
      – Para comprovação da atividade de indígena, apresentar declaração, emitida preferencialmente via Sistema SEI, na forma do Anexo XXV da IN 128/2022;
      `);
        } else if (categoriaTrabalhador == "nao-indigena") {
            exigenciasGerais.push(`Se Trabalhador rural: <br>
        - Apresentar declaração de atividade rural na forma doAnexo VIII da IN nº 128 PRES/INSS, de 28/03/2022, o qual substituiu a entrevista rural (o modelo da declaração segue em anexo a esta carta e esta disponibilizado no presente requerimento, podendo ser acessado por meio do portal/aplicativo Meu INSS;;
      <br><br>
      Se Pescador:<br>
      - Apresentar formulário preenchido da Autodeclaração do Segurado Especial - Pescador, na forma do Anexo IX da IN nº 128 PRES/INSS, de 28/03/2022;
      <br><br>
      Se Extrativista:<br>
      - Apresentar formulário preenchido da Autodeclaração do Segurado Especial - Extrativista, na forma do Anexo X da IN nº 128 PRES/INSS, de 28/03/2022;      
      `);
        } else {
            exigenciasGerais.push(`Se Trabalhador rural: <br>
        - Apresentar declaração de atividade rural na forma do Anexo VIII da IN nº 128 PRES/INSS, de 28/03/2022;
                <br><br>
        Se Pescador:<br>
        - Apresentar formulário preenchido da Autodeclaração do Segurado Especial - Pescador, na forma do Anexo IX da IN nº 128 PRES/INSS, de 28/03/2022
                <br><br>
        Se Extrativista:<br>
        - Apresentar formulário preenchido da Autodeclaração do Segurado Especial - Extrativista, na forma do Anexo X da IN nº 128 PRES/INSS, de 28/03/2022;
        <br><br>
      Se Indígena:<br>
      -Para comprovação da atividade de indígena, apresentar declaração, emitida preferencialmente via Sistema SEI, na forma do Anexo XXV da IN 128/2022;
      `);
        }
    }

    //apresentaDadosBasicos();
    showCategorias();
    reapresentarExigencias();
    avancarUmaEtapa();
}


//ETAPA-10


document.getElementById("categoria").addEventListener("click", function () {

    let categoria = document.querySelector("#categoria").value;

    if (categoria != "pescador") {
        document.querySelector(".tipo-de-pescador-class").classList.add("hidden");
    } else {
        document.querySelector(".tipo-de-pescador-class").classList.remove("hidden");
    }
});

function processaFormularioPeriodoAutodeclarado() {
    let categoria = document.querySelector("#categoria").value;
    let condicao = document.querySelector("#condicao").value;
    let dataInicio = document.querySelector("#data-inicio-1").value;
    let dataFim = document.querySelector("#data-fim-1").value;


    let tipoDePescador = "";
    if (categoria == "pescador") {
        tipoDePescador = document.querySelector("#tipo-de-pescador").value;

        if (tipoDePescador == "") {
            document.getElementById(`tipo-de-pescador`).classList.add("is-invalid");
            return false;
        } else {
            document.getElementById(`tipo-de-pescador`).classList.remove("is-invalid");
        }

    }



    if (categoria == "") {
        document.getElementById(`categoria`).classList.add("is-invalid");
        return false;
    } else {
        document.getElementById(`categoria`).classList.remove("is-invalid");
    }

    if (!isEntradaTextoValida(condicao, 5)) {
        document.getElementById(`condicao`).classList.add("is-invalid");
        return false;
    } else {
        document.getElementById(`condicao`).classList.remove("is-invalid");
    }

    if (!isDataVinculoValida(dataInicio)) {
        document.getElementById(`data-inicio-1`).classList.add("is-invalid");
        return false;
    } else {
        document.getElementById(`data-inicio-1`).classList.remove("is-invalid");
    }


    if (!isDataVinculoValida(dataFim)) {
        document.getElementById(`data-fim-1`).classList.add("is-invalid");
        return false;
    } else {
        document.getElementById(`data-fim-1`).classList.remove("is-invalid");
    }

    if (!dataInicioEFimCoerentes(dataInicio, dataFim)) {
        document.getElementById(`data-inicio-1`).classList.add("is-invalid");
        document.getElementById(`data-fim-1`).classList.add("is-invalid");
        return false;
    } else {
        document.getElementById(`data-inicio-1`).classList.remove("is-invalid");
        document.getElementById(`data-fim-1`).classList.remove("is-invalid");
    }

    if (der != "") {
        if (isData1BeforeData2(der, dataFim)) {
            document.getElementById(`data-fim-1`).classList.add("is-invalid");
            document.getElementById(`termino-declarado-na-der`).classList.remove("hidden");
            return false;
        } else {
            document.getElementById(`data-fim-1`).classList.remove("is-invalid");
            document.getElementById(`termino-declarado-na-der`).classList.add("hidden");
        }
    }

    let cat = categoria.slice();
    if (checaSeJaTemACategoriaSeNaoTiverInclua(cat)) {
        showCategorias();
    }

    let tipoDePescadorFormatado = "";

    if (categoria == "rural") {
        categoria = "Rural";
    } else if (categoria == "pescador") {
        categoria = "Pescador"

        if (tipoDePescador == "profissional") {
            tipoDePescadorFormatado = "Pesca profissional";
        } else if (tipoDePescador == "subsistencia") {
            tipoDePescadorFormatado = "Pesca de subsistência";
        } else if (tipoDePescador == "ambos") {
            tipoDePescadorFormatado = "Pesca Profisisonal e Subsistência";
        } else if (tipoDePescador == "nao-informado") {
            tipoDePescadorFormatado = "Pesca não especificada (campo 3.3 Anexo IX da IN nº 128 PRES/INSS, de 28/03/2022)";
        }


    } else if (categoria == "indigena") {
        categoria = "Indígena"
    } else if (categoria == "extrativista") {
        categoria = "Extrativista";
    }


    console.log(`LINHA 1726 - TIPO DE PESCADOR: ${tipoDePescador}`);


    //periodosAutoDeclaradosArray.push(new PeriodoAutoDeclarado(categoria, getData(dataInicio), getData(dataFim)));
    let periodo = new NewPeriodo(`${categoria} - ${condicao}${cat == `pescador` ? ` - ${tipoDePescadorFormatado}` : ``}`, getData(dataInicio), getData(dataFim));
    periodo.categoria = cat;
    periodo.tipoDePescador = tipoDePescador;
    periodosAutoDeclarados.push(periodo);



    reapresentarAutodeclarados();
    showCategorias();
    apresentarSugestaoDeHomologacao();



    return true;

}

function getTipoDePescador() {

    console.log(`LINHA 1744 METODO GET TIPO DE PESCADOR`);
    for (const periodo of periodosAutoDeclarados) {
        console.log(`linha 1746 - ${periodo.categoria}`);
        if (periodo.categoria == "pescador") {
            console.log("LINHA 1748 - PESCADOR");
            return periodo.tipoDePescador;
        } else {
            console.log(`${periodo.categoria} != pescador`);
        }
    }
}

document.getElementById("assumir-der-declarado").addEventListener("click", function () {
    document.getElementById("data-fim-1").value = der;
});

function calculaTotalAutodeclarado() {

    return calculaTotalDeNewPeriodos(periodosAutoDeclarados);

}


function calculaTotalDeNewPeriodos(array) {

    let totalAutodeclado = [0, 0, 0];

    let atual = "";
    let anterior = "";
    let limpo = "";
    let limpos = [];
    array.sort(newSortFunction);

    limpos = retiraConcomitancia(array);

    limpos.forEach(p => {

        //console.log(`LINHA 1814 DE NEWSCRIPT - ${p.descricao}: ${p.inicio} a ${p.fim}`);


        totalAutodeclado[0] += p.duracao.years;
        totalAutodeclado[1] += p.duracao.months;
        totalAutodeclado[2] += p.duracao.days;
    });

    if (totalAutodeclado[2] >= 30) {
        while (totalAutodeclado[2] >= 30) {
            totalAutodeclado[1] += 1;
            totalAutodeclado[2] -= 30;
        }
    }

    if (totalAutodeclado[1] >= 12) {
        while (totalAutodeclado[1] >= 12) {
            totalAutodeclado[0] += 1;
            totalAutodeclado[1] -= 12;
        }
    }

    return totalAutodeclado;

}




function receberPeriodosAutodeclarados() {

    if (processaFormularioPeriodoAutodeclarado()) {
        limpaFormularioPeriodoAutodeclarado();
        avancarUmaEtapa();
    }

}

document.querySelector(".outro-periodo-autodeclarado").addEventListener("click", function () {

    if (processaFormularioPeriodoAutodeclarado()) {
        limpaFormularioPeriodoAutodeclarado();
    }
});

function limpaFormularioPeriodoAutodeclarado() {
    document.querySelector("#condicao").value = "";
    document.querySelector("#categoria").value = "";
    document.querySelector("#data-inicio-1").value = "";
    document.querySelector("#data-fim-1").value = "";

    document.getElementById("termino-declarado-na-der").classList.add("hidden");
}





//ETAPA-11

document.getElementById("btnradio111").addEventListener("click", function () {
    temDoc = true;
    document.querySelector(".teve_docs_class").classList.remove("hidden");

});
document.getElementById("btnradio112").addEventListener("click", function () {
    temDoc = false;
    document.querySelector(".teve_docs_class").classList.add("hidden");
});

document.getElementById("btnradio113").addEventListener("click", function () {
    document.querySelector(".doc_contrario_data_fim_class").classList.add("hidden");

});
document.getElementById("btnradio114").addEventListener("click", function () {
    document.querySelector(".doc_contrario_data_fim_class").classList.remove("hidden");
});


function receberProvas() {

    if (processaFormularioProvasDocumentais()) {
        avancarUmaEtapa();
    }

}


function processaFormularioProvasDocumentais() {
    //verificando se teve vinculos beneficio
    //let teveDocs = document.querySelector('input[name="teve-docs"]:checked').value;


    if (temDoc) {
        let descricao = document.querySelector("#descricao-documento").value;
        let dataInicio = document.querySelector("#data-inicio-doc").value;
        let dataFim = document.querySelector("#data-fim-doc").value;
        let isDocFavoravel = document.querySelector('input[name="is-doc-favoravel"]:checked').value;




        if (isDocFavoravel === "favoravel") {
            isDocFavoravel = true;
        } else {
            isDocFavoravel = false;
        }

        if (!isEntradaTextoValida(descricao, 3)) {
            document.getElementById(`descricao-documento`).classList.add("is-invalid");
            return false;
        } else {
            document.getElementById(`descricao-documento`).classList.remove("is-invalid");
        }

        if (!isDataVinculoValida(dataInicio)) {
            document.getElementById(`data-inicio-doc`).classList.add("is-invalid");
            return false;
        } else {
            document.getElementById(`data-inicio-doc`).classList.remove("is-invalid");
        }

        if (!isDocFavoravel) {

            if (!isDataVinculoValida(dataFim)) {
                document.getElementById(`data-fim-doc`).classList.add("is-invalid");
                return false;
            } else {
                document.getElementById(`data-fim-doc`).classList.remove("is-invalid");
            }

            if (!dataInicioEFimCoerentes(dataInicio, dataFim)) {
                document.getElementById(`data-inicio-doc`).classList.add("is-invalid");
                document.getElementById(`data-fim-doc`).classList.add("is-invalid");
                return false;
            } else {
                document.getElementById(`data-inicio-doc`).classList.remove("is-invalid");
                document.getElementById(`data-fim-doc`).classList.remove("is-invalid");
            }

        }

        //futuramente verificar se está no nome do requerente, caso negativo verificar se o titular tem qualidade de SE
        //let atividadeAtiva = document.querySelector("#atividade_ativa").checked;

        descricao = `Indício Documental: ${descricao}`;

        if (isDocFavoravel) {

            let jaTem = false;
            for (const prova of provasGerais) {

                if (prova.descricao == descricao) {
                    prova.addData(getData(dataInicio));
                    jaTem = true;
                }

            }

            if (!jaTem) {
                provasGerais.push(new Indicio(descricao, getData(dataInicio), getData(dataFim), "prova-doc"));
            }
            reapresentarProvas();

        } else { //Se a prova for contrária
            //impedimentosArray.push(new Prova(descricao, getData(dataInicio), getData(dataFim)));

            console.log("Descricao: " + descricao);
            console.log("Inicio: " + dataInicio);
            console.log("Fim: " + dataFim);
            console.log("isDocFavoravel: " + isDocFavoravel);


            impedimentosGerais.push(new Indicio(descricao, getData(dataInicio), getData(dataFim), "impedimento-doc"));
            reapresentarImpedimentos();
        }
    }

    apresentarSugestaoDeHomologacao();

    return true;

}


/* document.querySelector("input[name=is-doc-favoravel]").addEventListener("change", function () {
    let isDocFavoravel = document.getElementById("is-doc-favoravel").checked;

    if (isDocFavoravel) { // se o doc for favorável não mostre o campo data fim
        document.querySelector(".doc_contrario_data_fim_class").classList.add("hidden");
    } else {
        document.querySelector(".doc_contrario_data_fim_class").classList.remove("hidden");
    }
}); */

document.querySelector(".outro-doc").addEventListener("click", function () {

    if (processaFormularioProvasDocumentais()) {
        limpaFormularioProvasDocumentais();
    }
});

function limpaFormularioProvasDocumentais() {
    document.querySelector("#data-inicio-doc").value = "";
    document.querySelector("#data-fim-doc").value = "";
}


//etapa-12


document.getElementById("btnradio121").addEventListener("click", function () {
    console.log(`DEFERIR`);
    document.querySelector(".fazer-exigencias-documentais-class").classList.add("hidden");
    document.querySelector(".motivo-do-indeferimento").classList.add("hidden");
    document.getElementById("btnradio123").checked = true;

    //Opções de Deferimento automático
    document.querySelector(".div-deferimento-automarico").classList.remove("hidden");

});

document.getElementById("btnradio122").addEventListener("click", function () {
    document.querySelector(".fazer-exigencias-documentais-class").classList.remove("hidden");
    //document.querySelector(".motivo-do-indeferimento").classList.remove("hidden");
    //console.log(`INDEFERIR OU EXIGENCIA`);

    //Opções de Deferimento automático
    document.querySelector(".div-deferimento-automarico").classList.add("hidden");
});

document.getElementById("btnradio123").addEventListener("click", function () {
    document.querySelector(".motivo-do-indeferimento").classList.add("hidden");
    document.getElementById("show-data-exigencia").classList.add("hidden");
    foramEmitidasExigencias = false;
});

document.getElementById("btnradio124").addEventListener("click", function () {
    document.querySelector(".motivo-do-indeferimento").classList.remove("hidden")
        ;
    document.getElementById("show-data-exigencia").classList.add("hidden");
    foramEmitidasExigencias = false;
});

document.getElementById("btnradio125").addEventListener("click", function () {
    document.querySelector(".motivo-do-indeferimento").classList.remove("hidden");
    document.getElementById("show-data-exigencia").classList.remove("hidden");
    foramEmitidasExigencias = true;
});

document.getElementById("btnradio126").addEventListener("click", function () {
    isDeferimentoAutomatico = true;
    //alert("Deferimento Automático: " + isDeferimentoAutomatico)
});

document.getElementById("btnradio127").addEventListener("click", function () {
    isDeferimentoAutomatico = false;
    //alert("Deferimento Automático: " + isDeferimentoAutomatico)
});

function analisar() {

    let isProvasSuficientes = document.querySelector('input[name="provas-suficientes"]:checked').value;
    isProvasSuficientes = isProvasSuficientes === "suficiente" ? true : false;

    deferir = isProvasSuficientes ? true : false;

    console.log(`Provas suficientes: ${isProvasSuficientes}`);

    let fazerExigenciasDocumentais = false;

    nb_presente = document.getElementById("nb_presente").value;

    let fazerExigencias = "";
    if (!isProvasSuficientes) {
        fazerExigencias = document.querySelector('input[name="fazer-exigencias-documentais"]:checked').value;

        if (fazerExigencias === "sim") {
            fazerExigenciasDocumentais = true;
        } else if (fazerExigencias === "nao") {
            fazerExigenciasDocumentais = false;
        } else if (fazerExigencias === "fiz-antes") {
            fazerExigenciasDocumentais = false;

            dataDeEmissaoDasExigencias = document.querySelector("#data-exigencia").value;


            if (!isDataVinculoValida(dataDeEmissaoDasExigencias)) {
                document.getElementById(`data-exigencia`).classList.add("is-invalid");
                return false;
            } else {
                document.getElementById(`data-exigencia`).classList.remove("is-invalid");
            }


        }


        //fazerExigencias = fazerExigenciasDocumentais === "sim" ? true : false;

        if (!fazerExigenciasDocumentais) {


            motivoIndeferimento1 = document.querySelector("#motivo-indeferimento").value;
            console.log(`Motivo do indeferimento: ${motivoIndeferimento1}`);
            if (motivoIndeferimento1 == "nao_apresentou_anexo_preenchido_direito") {
                oQueEstaErradoNoFormulario
                    = prompt("O que está errado no formulário: ")
            } else if (motivoIndeferimento1 == "falta_de_carencia_so_docs_feitos_as_vesperas") {
                oQueEstaErradoDocsFeitosAsVesperas
                    = prompt("Foi apresentado algum documento com indício de adulteração ou feito às vésperas do requerimento?")
            } else if (motivoIndeferimento1 == "cedeu-mais-cinquenta-porcento") {
                dataCessao
                    = prompt("A partir de quando a terra foi cedida?")
            }

            motivoIndeferimento2 = document.querySelector("#motivo-indeferimento-2").value;
            console.log(`Motivo do indeferimento2: ${motivoIndeferimento2}`);


            if (motivoIndeferimento2 == "nao_apresentou_anexo_preenchido_direito") {
                oQueEstaErradoNoFormulario
                    = prompt("O que está errado no formulário: ")
            } else if (motivoIndeferimento2 == "falta_de_carencia_so_docs_feitos_as_vesperas") {
                oQueEstaErradoDocsFeitosAsVesperas
                    = prompt("Foi apresentado algum documento com indício de adulteração ou feito às vésperas do requerimento?")
            } else if (motivoIndeferimento2 == "cedeu-mais-cinquenta-porcento") {
                dataCessao
                    = prompt("A partir de quando a terra foi cedida?")
            }

            motivoIndeferimento3 = document.querySelector("#motivo-indeferimento-3").value;
            console.log(`Motivo do indeferimento2: ${motivoIndeferimento2}`);


            if (motivoIndeferimento3 == "nao_apresentou_anexo_preenchido_direito") {
                oQueEstaErradoNoFormulario
                    = prompt("O que está errado no formulário: ")
            } else if (motivoIndeferimento3 == "falta_de_carencia_so_docs_feitos_as_vesperas") {
                oQueEstaErradoDocsFeitosAsVesperas
                    = prompt("Foi apresentado algum documento com indício de adulteração ou feito às vésperas do requerimento?")
            } else if (motivoIndeferimento3 == "cedeu-mais-cinquenta-porcento") {
                dataCessao
                    = prompt("A partir de quando a terra foi cedida?")
            }
        }
    }

    if (fazerExigenciasDocumentais) {
        fazerExigenciasDocumentaisFunction();
        reapresentarExigencias();
    } else {
        sugerirDespacho();

        //2x
        avancarUmaEtapa();
        avancarUmaEtapa();
    }
}

function fazerExigenciasDocumentaisFunction() {

    //if (categoriasTrabalhador.includes("rural") && categoriasTrabalhador.includes("pescador")) {
    if (categoriasTrabalhador.includes("rural")) {
        exigenciasGerais.push(`
        - Para comprovação dos períodos de trabalho rural:<br>
        -- Apresentar documentos contemporâneos ao exercício da atividade rural alegada, como escritura da terra, ITRs, CCIRs, contratos de arrendamento, contratos de comodato, meação, etc., notas fiscais de compra de insumos e de venda de produção, DAPs, etc.`);

    } else if (categoriasTrabalhador.includes("pescador")) {
        exigenciasGerais.push(`- Para comprovação dos períodos como Pescador(a):<br>
        --Apresentar todos dos documentos que possuir para comprovação do exercício da atividade de pesca, a exemplo de carteiras de identificação profissional, notas fiscais de compras de insumos, recibos de venda de produção pesqueira, etc.`);

    } else if (categoriasTrabalhador.includes("nao-identificado")) {
        exigenciasGerais.push(`SE TRABALHADOR RURAL<br>
        - Apresentar documentos contemporâneos ao exercício da atividade rural alegada, como escritura da terra, ITRs, CCIRs, contratos de arrendamento, contratos de comodato, meação, etc., notas fiscais de compra de insumos e de venda de produção, DAPs, etc.
        <br><br>
        SE PESCADOR<br>
        - Apresentar todos dos documentos que possuir para comprovação do exercício da atividade de pesca, a exemplo de carteiras de identificação profissional, notas fiscais de compras de insumos, recibos de venda de produção pesqueira, etc.
        <br><br>
        SE Indígena<br>
        – Para comprovação da atividade de indígena, apresentar declaração, emitida preferencialmente via Sistema SEI, na forma do Anexo XXV da IN 128/2022;`);

    } else if (categoriasTrabalhador.includes("nao-indigena")) {
        exigenciasGerais.push(`SE TRABALHADOR RURAL<br>
        - Apresentar documentos contemporâneos ao exercício da atividade rural alegada, como escritura da terra, ITRs, CCIRs, contratos de arrendamento, contratos de comodato, meação, etc., notas fiscais de compra de insumos e de venda de produção, DAPs, etc.
        <br><br>
        SE PESCADOR<br>
        - Apresentar todos dos documentos que possuir para comprovação do exercício da atividade de pesca, a exemplo de carteiras de identificação profissional, notas fiscais de compras de insumos, recibos de venda de produção pesqueira, etc.`);
    }
}


//ETAPA-14

document.getElementById("tipo-exigencia").addEventListener("change", function () {
    carregarExigencia(this.value);
});

function carregarExigencia(tipo) {

    let conteudoPrevio = document.getElementById("txtexigencia").value;

    if (conteudoPrevio != "") {
        conteudoPrevio += "\n\n";
    }
    let txt = "";

    if (tipo == "docs-pessoais") {

        txt += `- Apresentar originais:<br>
        -- RG, <br>
        -- CPF, <br>
        -- todas as carteiras de trabalho (na íntegra - todas as folhas onde houver algo escrito)<br>
        -- registro civil (certidão de nascimento ou casamento)<br>
        -- comprovante de endereço<br>
        `;

    } else if (tipo == "anexo-1") {

        txt += "<br>- Apresentar declaração de atividade rural na forma do Anexo VIII da IN nº 128 PRES/INSS, de 28/03/2022";

    } else if (tipo == "anexo-2") {

        txt += "- Apresentar formulário preenchido da Autodeclaração do Segurado Especial - Pescador, na forma do Anexo IX da IN nº 128 PRES/INSS, de 28/03/2022";

    } else if (tipo == "anexo-3") {

        txt += "- Apresentar formulário preenchido da Autodeclaração do Segurado Especial - Extrativista, na forma do Anexo X da IN nº 128 PRES/INSS, de 28/03/2022";

    } else if (tipo == "provas-rurais") {

        txt += `- Apresentar documentos contemporâneos ao exercício da atividade rural alegada, como escritura da terra, ITRs, CCIRs, contratos de arrendamento, contratos de comodato, meação, etc., notas fiscais de compra de insumos e de venda de produção, DAPs, etc., na form do art. 115 e 116 da IN 128/2022`;



    } else if (tipo == "provas-rurais-intercalados-urbanos") {

        txt += ` - Conforme inciso V, §2º, art. 116 da IN nº 128 PRES/INSS, de 28/03/2022, para comprovação dos períodos de trabalho rural intercalados com atividades urbanas:<br>
        -- Deverão ser apresentados documentos contemporâneos  para comprovação do retorno à atividade rural após cada exercício de atividade urbana cujo período tenha sido superior a 120 (cento e vinte) dias. Tais documentos devem ser em nome d${sexo == "homem" ? "o" : "a"} requerente.`;



    } else if (tipo == "provas-pescador") {

        txt += `- Para comprovação dos períodos como Pescador(a):<br>
        --Apresentar todos dos documentos que possuir para comprovação do exercício da atividade de pesca, a exemplo de carteiras de identificação profissional, notas fiscais de compras de insumos, recibos de venda de produção pesqueira, etc., na forma do art. 116 da IN nº 128 PRES/INSS, de 28/03/2022`;

    } else if (tipo == "declaracao-funai") {
        txt += "– Para comprovação da atividade de indígena, apresentar declaração, emitida preferencialmente via Sistema SEI, na forma do Anexo XXV da IN 128/2022;";
    } else if (tipo == "procuracao") {
        txt += "-Apresentar procuração para representação; Modelo disponível em https://www.gov.br/inss/pt-br/centrais-de-conteudo/formularios/copy_of_Procurao.pdf";
    } else if (tipo == "procuracao-publica") {
        txt += "- Apresentar procuração pública para representação de requerente não alfabetizado ou impossibilitado de assinar, na forma do art. 541 da IN 128/2022;";
    } else if (tipo == "conjuge-nao-segurado-especial") {

        txt += `- A IN nº 128 PRES/INSS, de 28/03/2022 estabelece, art. 116, §2º, inciso IV, a necessidade do titular dos documentos apresentados possuir qualidade de segurado especial. Vez que foram apresentados documentos em nome de familiar enquadrado em outra categoria de trabalhador, deverão ser apresentados documentos em nome d${sexo == "homem" ? "o" : "a"} requerente para comprovação da atividade alegada;`;

    } else if (tipo == "filho-casado") {

        txt += `- Apresentar documentos contemporâneos ao exercício da atividade rural alegada, como escritura da terra, ITRs, CCIRs, contratos de arrendamento, contratos de comodato, meação, etc., notas fiscais de compra de insumos e de venda de produção, DAPs, etc, forma do art. 115 da IN 128/2022. Tais documentos devem ser em nome d${sexo == "homem" ? "o" : "a"} requerente. Ressaltamos que documentos em nome dos pais não servem para comprovação de atividade rural para filhos casados ou que tenham contraído união estável, na forma do  art. 109, §1º, inciso IV da IN 128/2022. Caso opte por apresentados documentos em nome dos pais, apresentar também declaração sobre a situação d${sexo == "homem" ? "o" : "a"} requerente (solteird${sexo == "homem" ? "o" : "a"}, casadd${sexo == "homem" ? "o" : "a"}, em união estável, etc.);`;

    } else if (tipo == "uniao-estavel") {

        txt += `- Apresentar documentos contemporâneos ao exercício da atividade rural alegada, como escritura da terra, ITRs, CCIRs, contratos de arrendamento, contratos de comodato, meação, etc., notas fiscais de compra de insumos e de venda de produção, DAPs, etc. Tais documentos devem ser em nome d${sexo == "homem" ? "o" : "a"} requerente. Caso queira apresentar documento em nome de cônjuge, apresentar identidade, CPF e todas as carteiras de trabalho deste. Apresentar também certidão de casamento ou, em caso de união estável, documentos para comprovação da união em data tão antiga quanto possível;`;

    } else if (tipo == "autoriza-cessacao") {

        txt += `- Vez que ${sexo == "homem" ? "o" : "a"} requerente percebe o benefício [                    ], apresentar termo de opção solicitando (1) a cessação do benefício anterior e (2) consignação de possíveis valores recebidos em duplicidade, caso tenha direito ao benefício ora requerido.`;

    } else if (tipo == "autoriza-cessacao-LOAS") {

        txt += `- Na forma do art. 639, XVIII, da IN 128/2022, vez que ${sexo == "homem" ? "o" : "a"} requerente é beneficiário em benefício assistencial (NB              ) e que não é permitida a acumulação de benefício assistencial e aposentadoria, ${sexo == "homem" ? "o" : "a"} requerente deverá se manifestar expressamente optando entre a aposentadoria (caso tenha direito) e o benefício assistencial que já recebe; [ APRESENTAR TEXTO REALIZANDO A OPÇÃO, ciente de que possíveis valores recebidos em concomitância serão consignados]; `;

    } else if (tipo == "declaracao-beneficio-rpps") {

        txt += `- Apresentar declaração sobre o recebimento de benefício em RPPS, na forma do ANEXO XXIV da IN 128/2022;`;
    } else if (tipo == "contribuicoes-extemporaneas") {

        txt += `-  Foram identificadas contribuições extemporâneas realizadas em GFIP na condição de prestador de serviço / empresário. Na forma do art. 95 da IN 128/2022, apresentar documentos para comprovação da remuneração decorrente do trabalho - comprovantes da retirada de pró-labore,  declarações de imposto de renda,etc - relativas aos anos abrangidos: xxxx, xxxx`;
    } else if (tipo == "apresentacao-de-ctc") {


        txt += `- Na forma do art. 70 da IN 128/2022, caso algum dos períodos laborados junto a órgãos públicos tenha sido direcionado a RPPS (Regime Próprio de Previdência Social), faculta-se ${sexo == "homem" ? "ao" : "à"} requerente a apresentação de CTC (Certidão de Tempo de Contribuição), na forma do Anexo XV da IN 128/2022, acompanhada da Relação das Remunerações de Contribuições por competências (Anexo XXIII da IN 128/2022) para todos os períodos posteriores a 07/1994;`;

    } else if (tipo == "diz-receber-beneficio-rpps") {


        txt += `- Como você informou que recebe pensão ou aposentadoria em outro Regime de Previdência (ou seja, outro benefício que não é pago pelo INSS), apresentar a declaração disponível em: https://www.gov.br/inss/pt-br/centrais-de-conteudo/formularios/DeclaraoderecebimentodepensoouaposentadoriaemoutroregimedePrevidncia.pdf ;`;

    }

    document.getElementById("txtexigencia").value = conteudoPrevio + txt;

}


function receberExigencia() {

    let exigencia = document.getElementById("txtexigencia").value;

    exigenciasGerais.push(exigencia);

    reapresentarExigencias();
    limparFormularioExigencia();
}

function limparFormularioExigencia() {
    document.getElementById("txtexigencia").value = "";
    document.querySelector("#tipo-exigencia").value = "";

}

//reapresentação de dados

function reapresentaTudo() {
    apresentaDadosBasicos();
    showCategorias();
    reapresentarAutodeclarados();
    reapresentarImpedimentos();
    reapresentarProvas();
    apresentarSugestaoDeHomologacao();
    apresentarPeriodosPreviamenteConfirmados();
    reapresentarExigencias();

}

function reapresentarAutodeclarados() {




    //let total = calculaTotalAutodeclarado();
    totalAutodeclarado = calculaTotalAutodeclarado();

    let conteudo = `<table class="table table-hover table-sm table-dark table-striped">
    <thead>
        <tr>
            <th scope="row" class="h3" colspan="2">Periodos Autodeclarados</th>
        </tr>
    </thead>
    <tbody>`;

    //for (let periodo of periodosAutoDeclarados) {

    for (let i = 0; i < periodosAutoDeclarados.length; i++) {
        const periodo = periodosAutoDeclarados[i];



        //console.log(`>>>>>>>>>>>>>> EXPERIÊNCIA ${periodo.categoria}`);

        temAutodeclaracao = true;

        let descricao = periodo.descricao;

        descricao += `<p class="text-end lh-sm"><small class="blockquote-footer text-end font-monospace fs-6" >${periodo.duracao.years} ano(s), ${periodo.duracao.months} mes(es) e ${periodo.duracao.days} dia(s)</small></p>`;

        conteudo += `<tr id="periodoautodeclarado_${i}">
                    <th scope="col" class="col-3 align-middle"><br><p class="align-middle text-center"><span class="fst-normal">${periodo.inicio}<br> a <span class="fst-normal">${periodo.fim}</span>`;


        conteudo += `</p></th>  <td class="col-9 text-justify align-middle"  ><p style="margin: 10px;">${descricao}</p></td>  </tr>`;

    }



    conteudo += `<tr class="${totalAutodeclarado[0] >= 15 ? "table-success" : "table-danger"}">
                    <th scope="col" class="col-3 align-middle "><p class="align-middle h5 text-center" style="margin: 10px;">Total:</span>`;

    conteudo += `</p></th>  <td class="col-9 text-justify align-middle"  ><p style="margin: 10px;" class="h5">
            ${totalAutodeclarado[0]} anos, ${totalAutodeclarado[1]} meses e ${totalAutodeclarado[2]} dias;
            </p></td></tr>`;



    conteudo += `</tbody>
    </table>`;

    document.getElementById(`show-autodeclarados`).innerHTML = conteudo;

    for (let n = 0; n < periodosAutoDeclarados.length; n++) {

        let periodo = periodosAutoDeclarados[n];

        //if (!(provasArray[n] instanceof ProvaUnica)) {

        //let id = `"prova_${n}"`;
        document.getElementById("periodoautodeclarado_" + n).addEventListener("click", function () {


            if (confirm("Confirma deleção da período?")) {
                //console.log("Vamos tentar remover o " + j);
                periodosAutoDeclarados.splice(n, 1);
                //reapresentaProvas();
                reapresentaTudo();
            }

        });

    }

}





function reapresentarImpedimentos() {

    let periodosComInicioEFimOuAtivos = [];

    let conteudo = `<table class="table table-hover table-sm table-dark table-striped">
    <thead>
        <tr>
            <th scope="row" class="h3" colspan="2">Impedimentos<small class="blockquote-footer text-end" style="font-size:x-small;">para Segurado Especial</small> <button type="button"
            class=" form-control limpar-impedimentos btn btn-outline-secondary btn-sm">Limpar</button></th>
        </tr>
    </thead>
    <tbody>`;

    //for (let impedimento of impedimentosGerais) {

    impedimentosGerais.sort(newSortFunction);

    for (let i = 0; i < impedimentosGerais.length; i++) {

        const impedimento = impedimentosGerais[i];


        if (["vinculoPublico", "vinculo", "beneficio", "atividade", "seguroDesemprego", "empresa", "impedimento-doc"].includes(impedimento.tipo)) {


            let descricao = `${impedimento.descricao};`;

            conteudo += `<tr id="impedimento_${i}">
                    <th scope="col" class="col-3 align-middle"><b>[${i + 1}]</b><br><br><p class="align-middle text-center"><span class="fst-normal">${impedimento.inicio}</span>`;
            if (impedimento.fim != "") {
                conteudo += ` a <span class="fst-normal">${impedimento.fim}</span>`;
            }

            conteudo += `</p></th>  <td class="col-9 text-justify align-middle"  ><p style="margin: 10px;">${descricao}</p></td>  </tr>`;

        }

        //Para calcular os períodos vou pegar todos os períodos contributivos com data de início e término
        //preciso lembrar que períodos ativos (vínculos, contribuições, etc) também devem ser contados.

        if (["vinculoPublico", "vinculo", "beneficio"].includes(impedimento.tipo)) {

            if (impedimento.inicio != "" && impedimento.fim != "") {
                periodosComInicioEFimOuAtivos.push(new NewPeriodo(``, impedimento.inicio, impedimento.fim));
            }
        }
    }

    let total = calculaTotalDeNewPeriodos(periodosComInicioEFimOuAtivos);

    conteudo += `<tr class="${total[0] < 15 ? "table-warning" : "table-success"}"> <td colspan="2" class="col-9 text-justify align-middle h5 white-text"  ><p style="margin: 10px;" class="h5 white-text align-middle text-center">
    ${total[0]} anos, ${total[1]} meses e ${total[2]} dias;
    </p></td></tr>`;

    conteudo += `</tbody>
    </table>`;

    document.getElementById(`show-impedimentos`).innerHTML = conteudo;


    for (let i = 0; i < impedimentosGerais.length; i++) {

        document.getElementById("impedimento_" + i).addEventListener("click", function () {


            if (confirm("Deseja Editar?")) {

                if (impedimentosGerais[i].descricao.includes("Benefício")) {

                    //pegar o número do benefício
                    let nbEdit = impedimentosGerais[i].descricao.split("/")[1].split(";")[0];
                    nbEdit = nbEdit.replaceAll(".", "");
                    nbEdit = nbEdit.replaceAll("-", "");


                    let inicioE = impedimentosGerais[i].inicio;

                    let fimE = impedimentosGerais[i].fim;

                    //let urbanoRuralEdit = "";

                    //mostra a etapa 4
                    exibeEtapa(5);

                    //exibe os campos de benefício
                    temBeneficios = true;
                    document.querySelector(".teve_beneficio_ate_class").classList.remove("hidden");

                    //povoa o formulário da etapa 4
                    newPovoaFormularioEdicaoBeneficio(nbEdit, inicioE, fimE);

                    //remove o registro pois um novo registro será inserido quando do fim da edição
                    impedimentosGerais.splice(i, 1);

                } else if (impedimentosGerais[i].descricao.includes("Vínculo") && impedimentosGerais[i].descricao.includes("Público")) {

                    let orgaoEdit = impedimentosGerais[i].descricao.split(" Público:")[1].split(";")[0];

                    let inicioE = impedimentosGerais[i].inicio;

                    let fimE = impedimentosGerais[i].fim;


                    //mostra a etapa 4
                    exibeEtapa(2);

                    //exibe os campos de benefício
                    temVinculosPublicos = true;
                    document.querySelector(".tem_vinculo_publico_dados_class").classList.remove("hidden");

                    //povoa o formulário da etapa 4
                    newPovoaFormularioEdicaoVinculoPublico(orgaoEdit, inicioE, fimE);

                    //remove o registro pois um novo registro será inserido quando do fim da edição
                    impedimentosGerais.splice(i, 1);


                } else if (impedimentosGerais[i].descricao.includes("Vínculo/C.I.")) {

                    let empregadorEdit = "";

                    if (impedimentosGerais[i].descricao.includes("Urbano:")) {
                        empregadorEdit = impedimentosGerais[i].descricao.split("Urbano:")[1].split(";")[0];
                    } else if (impedimentosGerais[i].descricao.includes("Rural:")) {
                        empregadorEdit = impedimentosGerais[i].descricao.split("Rural:")[1].split(";")[0];
                    }

                    let inicioE = impedimentosGerais[i].inicio;

                    let fimE = impedimentosGerais[i].fim;


                    //mostra a etapa 4
                    exibeEtapa(3);

                    //exibe os campos de benefício
                    temVinculosRecolhimentos = true;
                    document.querySelector(".teve_vinculo_ate_class").classList.remove("hidden");

                    //povoa o formulário da etapa 4
                    newPovoaFormularioEdicaoVinculoCI(empregadorEdit, inicioE, fimE);

                    //remove o registro pois um novo registro será inserido quando do fim da edição
                    impedimentosGerais.splice(i, 1);

                }


            } else {

                if (confirm("Confirma Deleção?")) {
                    impedimentosGerais.splice(i, 1);
                    reapresentaTudo();
                }

            }

        });
    }

    //Limpando impedimentos / limpar vínculos
    document.querySelector(`.limpar-impedimentos`).addEventListener("click", function () {

        if (confirm("Limpar Tudo?")) {

            impedimentosGerais = [];

            reapresentarImpedimentos();
            apresentarSugestaoDeHomologacao();
            //cnis = "";//essa variável está lá em cnis.js

            limparCamposCnis();


        }


    });
}

function newPovoaFormularioEdicaoBeneficio(nbE, inicioE, fimE) {
    //absorvendo os dados do getGet.js
    document.querySelector("#nb").value = nbE;
    document.querySelector("#data-inicio-beneficio").value = deDataParaDataAmericana(inicioE);
    document.querySelector("#data-fim-beneficio").value = deDataParaDataAmericana(fimE);

}

function newPovoaFormularioEdicaoVinculoPublico(orgaoEdit, inicioE, fimE) {
    //absorvendo os dados do getGet.js
    document.querySelector("#orgao").value = orgaoEdit;
    document.querySelector("#data-inicio-orgao").value = deDataParaDataAmericana(inicioE);
    document.querySelector("#data-fim-orgao").value = deDataParaDataAmericana(fimE);

}

function newPovoaFormularioEdicaoVinculoCI(empregador, inicioE, fimE) {
    //absorvendo os dados do getGet.js
    document.querySelector("#empregador").value = empregador;
    document.querySelector("#data-inicio-vinculo").value = deDataParaDataAmericana(inicioE);
    document.querySelector("#data-fim-vinculo").value = deDataParaDataAmericana(fimE);

}


function reapresentarProvas() {

    //provasGerais.sort(sortFunction);

    let conteudo = `<table class="table table-hover table-sm table-dark table-striped">
    <thead>
        <tr>
            <th scope="row" class="h3" colspan="2">Provas<small class="blockquote-footer text-end" style="font-size:x-small;">para Segurado Especial</small></th>
        </tr>
    </thead>
    <tbody>`;

    //for (let prova of provasGerais) {

    for (let i = 0; i < provasGerais.length; i++) {

        let prova = provasGerais[i];



        let descricao = `${prova.descricao}`;

        console.log(`Descricao: ${descricao}`);

        /* conteudo += `<tr >
            <th scope="col" class="col-3">` */

        if (prova instanceof NewPeriodo) {

            //conteudo += `<tr >`


            conteudo += `<tr id="prova_${i}">
                    <th scope="col" class="col-3 align-middle"><br><p class="align-middle text-center"><span class="fst-normal">${prova.inicio}</span>`;
            if (prova.fim != "") {
                conteudo += ` a <span class="fst-normal">${prova.fim}</span>`;
            }
            /* <th scope="col" class="col-3">`
            conteudo += `</th>`; */

            /* descricao += `<p class="text-end lh-sm"><span class="fw-bold">${prova.inicio}</span> a <span class="fw-bold">${prova.fim}</span><br><small class="blockquote-footer text-end font-monospace fs-6" >${prova.duracao.years} ano(s), ${prova.duracao.months} mes(es) e ${prova.duracao.days} dia(s)</small></p>`; */

            descricao += `<p class="text-end lh-sm"><small class="blockquote-footer text-end font-monospace fs-6" >${prova.duracao.years} ano(s), ${prova.duracao.months} mes(es) e ${prova.duracao.days} dia(s)</small></p>`;

            conteudo += `</p></th>  <td class="col-9 text-justify align-middle"  ><p style="margin: 10px;" >${descricao}</p></td>  </tr>`;

        } else if (prova.tipo === "prova-doc") {
            let datas = "";

            ///prova.getDatas().forEach(data => {



            for (let index = 0; index < prova.getDatas().length; index++) {
                const data = prova.getDatas()[index];
                //const idDt = prova.getDatas()[index];
                datas += `<span id="data_${i}_${index}">${data}</span><br>`;
            }
            //datas += `${data}<br>`;
            //});

            conteudo += `<tr >
                    <th scope="col" class="col-3 align-middle"><br><p class="align-middle text-center"><span class="fst-normal">${datas}</span>`;


            conteudo += `</p></th>  <td class="col-9 text-justify align-middle"  ><p style="margin: 10px;" id="prova_${i}">${descricao}</p></td>  </tr>`;

        } else if (["beneficio", "atividade", "dap", "rgp", "defeso", "sala", "empresa"].includes(prova.tipo)) {

            let descricao = `${prova.descricao};`;
            /* descricao += `<p class="text-end lh-sm"><span class="fw-bold">${impedimento.inicio}</span> a <span class="fw-bold">${impedimento.fim}</span>`; */
            /* conteudo += `<tr class="${estilos[chaveEstilos]}"> */
            conteudo += `<tr id="prova_${i}">
                    <th scope="col" class="col-3 align-middle"><br><p class="align-middle text-center"><span class="fst-normal">${prova.inicio}</span>`;
            if (prova.fim != "") {
                conteudo += ` a <span class="fst-normal">${prova.fim}</span>`;
            }

            conteudo += `</p></th>  <td class="col-9 text-justify align-middle"  ><p style="margin: 10px;" >${descricao}</p></td>  </tr>`;



        }
    }



    /* conteudo += `</th>`; */
    /* conteudo += `<td class="col-9 text-justify">${descricao}</td>
            </tr>`; */

    /* else if (prova instanceof NewPeriodo) {
           const descricao = `${prova.descricao} - ${prova.inicio} a ${prova.fim};`;
   
           conteudo += `<tr >
                   <th scope="col" class="col-3">${prova.inicio}</th>
                   <td class="col-9 text-justify">${descricao}</td>
               </tr>`;
       } */




    conteudo += `</tbody>
    </table>`;

    document.getElementById(`show-provas`).innerHTML = conteudo;

    for (let n = 0; n < provasGerais.length; n++) {

        let prova = provasGerais[n];

        //if (!(provasArray[n] instanceof ProvaUnica)) {

        //let id = `"prova_${n}"`;
        document.getElementById("prova_" + n).addEventListener("click", function () {


            if (confirm("Confirma deleção da prova?")) {
                //console.log("Vamos tentar remover o " + j);
                provasGerais.splice(n, 1);
                //reapresentaProvas();

                for (let k = 0; k < periodosRuraisPreviamenteConfirmados.length; k++) {
                    const p = periodosRuraisPreviamenteConfirmados[k];

                    if (prova.descricao == p.descricao) {
                        if (prova.inicio == p.inicio) {
                            if (prova.fim == p.fim) {
                                periodosRuraisPreviamenteConfirmados.splice(k, 1);
                            }
                        }
                    }

                }


                reapresentaTudo();
            }

        });

        if (!(prova instanceof NewPeriodo) && prova.tipo === "prova-doc") {


            for (let j = 0; j < prova.getDatas().length; j++) {
                const data = prova.getDatas()[j];

                document.getElementById("data_" + n + "_" + j).addEventListener("click", function () {


                    if (confirm("Confirma deleção da data?")) {
                        //console.log("Vamos tentar remover o " + j);
                        //provasGerais.splice(n, 1)
                        //reapresentaProvas();
                        prova.getDatas().splice(j, 1);
                        if (prova.getDatas().length == 0) {
                            provasGerais.splice(n, 1);
                        }
                        reapresentaTudo();
                    }

                });

            }
        }
    }
}






function reapresentarExigencias() {

    //const estilos = ["table-secondary", "table-dark"]
    //let chaveEstilos = 0;

    if (exigenciasGerais.length > 1) {
        limparExigênciasDuplicadas();
    }



    let conteudo = `<table class="table table-hover table-sm table-dark table-striped text-wrap">
    <thead>
        <tr>
            <th scope="row" class="h3" colspan="2">Exigencias <button type="button"
            class=" form-control limpar-exigencias btn btn-outline-secondary btn-sm">Limpar</button></th>
        </tr>
    </thead>
    <tbody>`;

    //for (let exigencia of exigenciasGerais) {

    for (let i = 0; i < exigenciasGerais.length; i++) {
        let exigencia = exigenciasGerais[i];

        /* conteudo += `<tr class="${estilos[chaveEstilos]}"> */
        conteudo += `<tr id="exigencia_${i}" scope="row">
        
            <td class="col-12"><p class="text-justify text-wrap text-break" style="margin: 10px;">${exigencia}</p></td>
        </tr>`;
        //chaveEstilos === 0 ? chaveEstilos = 1 : chaveEstilos = 0;
    }

    conteudo += `</tbody>
    </table>`;

    document.getElementById(`show-exigencias`).innerHTML = conteudo;

    for (let index = 0; index < exigenciasGerais.length; index++) {
        const exi = exigenciasGerais[index];

        document.getElementById("exigencia_" + index).addEventListener("click", function () {

            if (confirm("Deseja Editar?")) {

                let exigenciaEdit = "";

                //pegue os dados da exigencia
                exigenciaEdit = exigenciasGerais[index];


                //mostra a etapa 13 - exigencias
                exibeEtapa(13);

                //povoa o formulário de exigencias
                newPovoaFormularioEdicaoExigencia(exigenciaEdit);


                //remove o registro pois um novo registro será inserido quando do fim da edicao
                exigenciasGerais.splice(index, 1);


            } else {

                if (confirm("Confirma deleção da exigencia?")) {
                    //console.log("Vamos tentar remover o " + j);
                    exigenciasGerais.splice(index, 1);
                    //reapresentaProvas();        

                    //


                    reapresentaTudo();
                }

            }

        });
    }

    //Limpando impedimentos / limpar vínculos
    document.querySelector(`.limpar-exigencias`).addEventListener("click", function () {

        if (confirm("Limpar Tudo?")) {

            exigenciasGerais = [];

            reapresentaTudo();


        }


    });
}

function limparExigênciasDuplicadas() {

    for (let index = 0; index < exigenciasGerais.length; index++) {
        const exi1 = exigenciasGerais[index];

        for (let index2 = 1; index2 < exigenciasGerais.length; index2++) {
            const exi2 = exigenciasGerais[index2];

            if (exi1 == exi2 && index != index2) {
                exigenciasGerais.splice(index2, 1);
            }
        }
    }
}

function newPovoaFormularioEdicaoExigencia(textoExigenciaEdit) {
    //absorvendo os dados do getGet.js
    document.querySelector("#txtexigencia").value = textoExigenciaEdit;

}

function apresentarSugestaoDeHomologacao() {



    if (analisaHomologacao_h2()) {

        let total = calculaTotalSugestaoDeHomologacao();

        let conteudo = `<table class="table table-hover table-sm table-dark table-striped">
        
    <thead>
        <tr>
            <th scope="row" class="h4" colspan="2">Sugestão de Homologação</th>
        </tr>
    </thead>
    <tbody>`;

        for (let p_h2 of periodos_h2) {

            let provas = "";
            let impedimentos = "";

            for (const p of p_h2.provas) {
                provas += `${p.descricao}<br>`;
            }

            for (const i of p_h2.impedimentos) {
                impedimentos += `${i.descricao}<br>`;
            }


            let provasString = `<p class="text-end lh-sm"><small class="blockquote-footer text-end font-monospace fs-6" >${provas}</small></p>`;

            let impedimentosString = `<p class="text-end lh-sm"><small class="blockquote-footer text-end font-monospace fs-6" >${impedimentos}</small></p>`;


            for (const validado of p_h2.periodosValidados) {

                /* total[0] += validado.periodo.duracao.years;
                total[1] += validado.periodo.duracao.months;
                total[2] += validado.periodo.duracao.days; */
                let totalParcial = `${validado.periodo.duracao.years} anos, ${validado.periodo.duracao.months} meses e ${validado.periodo.duracao.days} dias`;


                conteudo += `<tr>
                <td class="col-12" colspan="2"><p class="text-justify" style="margin: 10px;">${validado.periodo.inicio} a ${validado.periodo.fim}</p>
            
                <h5>Provas que Influenciaram:</h5>
                ${provasString}
                <br><br>
                <h5>Impedimentos  que Influenciaram:</h5>
                ${impedimentosString}           
                      
                </td> </tr>`;

                conteudo += `<tr class="table-secondary">
                    <th scope="col" class="col-3 align-middle white-text"><p class="align-middle h6 text-center" style="margin: 10px;">Duração:</span>`;

                conteudo += `</p></th>  <td class="col-9 text-justify align-middle h6 white-text"  ><p style="margin: 10px;"> ${totalParcial};</p></td></tr>`;
            }





            /* if (total[2] >= 30) {
                while (total[2] >= 30) {
                    total[1] += 1;
                    total[2] -= 30;
                }
            }
 
            if (total[1] >= 12) {
                while (total[1] >= 12) {
                    total[0] += 1;
                    total[1] -= 12;
                }
            } */





        }

        conteudo += `<tr class="${total[0] < 15 ? "table-warning" : "table-success"}">
                    <th scope="col" class="col-3 align-middle white-text"><p class="align-middle h5 text-center" style="margin: 10px;">Total:</span>`;

        conteudo += `</p></th>  <td class="col-9 text-justify align-middle h5 white-text"  ><p style="margin: 10px;">
            ${total[0]} anos, ${total[1]} meses e ${total[2]} dias;
            </p></td></tr>`;

        conteudo += `</tbody>
    </table>`;

        document.getElementById(`show-periodos-homologados`).innerHTML = conteudo;

        totalSugestaoDeHomologacao = total;
        apresentarPeriodosPreviamenteConfirmadosMaisSugestaoDeHomologacao();
    }

    showTimeLineTable();

}

/* function calculaTotalPeriodosPreviamenteConfirmados() {
 
    return
} */

function calculaTotalSugestaoDeHomologacao() {

    let todosValidados = getTodosOsPeriodosValidados();

    //console.log(`NA LINHA 2431 >>>> TEMOS ${todosValidados.length} periodos`);

    let total = calculaTotalDeNewPeriodos(todosValidados);

    //console.log(`TOTAL EM 2433 >>>  ${total[0]} anos, ${total[1]} meses e ${total[2]} dias;`);
    return total;

}

function getTodosOsPeriodosValidados() {

    let todosValidados = [];
    for (const p_h2 of periodos_h2) {

        for (const validado of p_h2.periodosValidados) {
            todosValidados.push(validado.periodo);
        }
    }
    return todosValidados;
}

function apresentarPeriodosPreviamenteConfirmadosMaisSugestaoDeHomologacao() {

    //vou ter que criar um novo array de periodos juntando as sugestões de homologação com os previamente Confirmados
    //e daí fazer a contagem.

    let todos = periodosRuraisPreviamenteConfirmados.slice().concat(getTodosOsPeriodosValidados().slice());

    let totalConsiderado = calculaTotalDeNewPeriodos(todos);

    /* let totalAnos = parseInt(totalSugestaoDeHomologacao[0]) + parseInt(totalPeriodosPreviamenteConfirmados[0]);
    let totalMeses = parseInt(totalSugestaoDeHomologacao[1]) + parseInt(totalPeriodosPreviamenteConfirmados[1]);
    let totalDias = parseInt(totalSugestaoDeHomologacao[2]) + parseInt(totalPeriodosPreviamenteConfirmados[2]); */

    /* console.log(`total anos: ${totalAnos}`);
 
    if (totalDias >= 30) {
        while (totalDias >= 30) {
            totalMeses += 1;
            totalDias -= 30;
        }
    }
 
    if (totalMeses >= 12) {
        while (totalMeses >= 12) {
            totalAnos += 1;
            totalMeses -= 12;
        }
    } */

    //totalConsiderado = [totalAnos, totalMeses, totalDias];

    let conteudo = `<table class="table table-hover table-sm table-dark table-striped">
    <thead>
        <tr>
            <th scope="row" class="h4 " colspan="2">Total de Períodos  <label class="fs-5 text-muted">(sugestão):</label></th>
        </tr>
    </thead>
    <tbody>`;

    conteudo += `<tr class="${totalConsiderado[0] < 15 ? "table-danger" : "table-success"}">
                    <th scope="col" class="col-3 align-middle h5"><p class="align-middle h5 text-center" style="margin: 10px;">Total:</span>`;


    conteudo += `</p></th>  <td class="col-9 text-justify align-middle h5"  ><p style="margin: 10px;" >
    ${totalConsiderado[0]} anos, ${totalConsiderado[1]} meses e ${totalConsiderado[2]} dias;
    </p></td></tr>`;


    conteudo += `</tbody>
    </table>`;

    document.getElementById(`show-periodos-previamente-confirmados-mais-sugestao-de-homologacao`).innerHTML = conteudo;
}


function apresentarPeriodosPreviamenteConfirmados() {

    let total = calculaTotalDeNewPeriodos(periodosRuraisPreviamenteConfirmados);

    let conteudo = `<table class="table table-hover table-sm table-dark table-striped">
    <thead>
        <tr>
            <th scope="row" class="h4" colspan="2">Períodos Rurais Previamente Confirmados</th>
        </tr>
    </thead>
    <tbody>`;




    for (let periodo of periodosRuraisPreviamenteConfirmados) {

        let duracao = `<p class="text-end lh-sm "><small class="blockquote-footer text-end font-monospace fs-6" >${periodo.duracao.years} ano(s), ${periodo.duracao.months} mes(es) e ${periodo.duracao.days} dia(s)</small></p>`;

        /* total[0] += periodo.duracao.years;
        total[1] += periodo.duracao.months;
        total[2] += periodo.duracao.days; */

        conteudo += `<tr>
                    <th scope="col" class="col-3 align-middle"><br><p class="align-middle text-center"><span class="fst-normal">${periodo.inicio}</span> a <span class="fst-normal">${periodo.fim}</span>`;


        conteudo += `</p></th>  <td class="col-9 text-justify align-middle"  ><p style="margin: 10px;">${periodo.descricao}</p>${duracao}</td>  </tr>`;

    }

    /* if (total[2] >= 30) {
        while (total[2] >= 30) {
            total[1] += 1;
            total[2] -= 30;
        }
    }
 
    if (total[1] >= 12) {
        while (total[1] >= 12) {
            total[0] += 1;
            total[1] -= 12;
        }
    } */


    conteudo += `<tr class="${total[0] < 15 ? "table-warning" : "table-success"}">
                    <th scope="col" class="col-3 align-middle "><p class="align-middle h5 text-center white-text" style="margin: 10px;">Total:</span>`;


    conteudo += `</p></th>  <td class="col-9 text-justify align-middle"  ><p style="margin: 10px;" class="h5 white-text">
    ${total[0]} anos, ${total[1]} meses e ${total[2]} dias;
    </p></td></tr>`;


    conteudo += `</tbody>
    </table>`;



    document.getElementById(`show-periodos-previamente-confirmados`).innerHTML = conteudo;

    totalPeriodosPreviamenteConfirmados = total;
    apresentarPeriodosPreviamenteConfirmadosMaisSugestaoDeHomologacao();

}


function showTimeLineTable() {

    let conteudo = "";

    let larguraTotal = 0;

    let periodosValidadosENaoValidados = [];

    for (let p_h2 of periodos_h2) {

        console.log(`---- ITERAÇÃO ------ `);

        console.log(`P-H2 - ${p_h2.periodo.inicio} a ${p_h2.periodo.fim}`);

        for (const validado of p_h2.periodosValidados) {

            //periodosValidadosENaoValidados.push(new NewPeriodo("validado", validado.periodo.inicio.slice(), validado.periodo.fim.slice()))

            console.log(`LINHA 2604: ${validado.periodo.inicio} a ${validado.periodo.fim}`);

            periodosValidadosENaoValidados.push(["validado", validado]);

        }

        for (const naoValidado of p_h2.periodosNaoValidados) {

            //periodosValidadosENaoValidados.push(new NewPeriodo("naoValidado", naoValidado.periodo.inicio.slice(), naoValidado.periodo.fim.slice()))

            console.log(`LINHA 2614: ${naoValidado.periodo.inicio} a ${naoValidado.periodo.fim}`);

            periodosValidadosENaoValidados.push(["naoValidado", naoValidado]);
        }

    }


    console.log(`------------- TEMOS ${periodosValidadosENaoValidados.length} periodos ----------`);


    console.log("----------------- ANTES DA ORDENAÇÃO");
    for (const p of periodosValidadosENaoValidados) {
        console.log(`LINHA 2616: ${p[1].periodo.inicio} a ${p[1].periodo.fim}`);
    }

    periodosValidadosENaoValidados.sort(pvnvSortFunction);

    console.log("-----------------DEPOIS DA ORDENAÇÃO");
    for (const p of periodosValidadosENaoValidados) {
        console.log(`LINHA 2616: ${p[1].periodo.inicio} a ${p[1].periodo.fim}`);
    }

    larguraTotal = (periodosValidadosENaoValidados.length * 500);
    //if(periodosValidadosENaoValidados.length == 1){}

    for (const p of periodosValidadosENaoValidados) {
        //conteudo += `<div class="progress-bar" role="progressbar" style="width:40%;background-color: transparent;height: 100%;">`;


        //sucess ou danger

        let status = p[0];
        let pvnv = p[1];



        //datas
        //conteudo += `<span class=" badge bg-secondary" style="font-size: inherit;">${validado.inicio} a ${validado.fim} </span></span>`;

        let anos = pvnv.periodo.duracao.years;
        let meses = pvnv.periodo.duracao.months;
        let dias = pvnv.periodo.duracao.days;

        //let proporcao = calculaProporcaoPeriodos(anos, meses, 1500);
        //let proporcao = 1500 / periodosValidadosENaoValidados.length;

        conteudo += `<div class="progress-bar" role="progressbar" style="width:500px; background-color: transparent;height: 100%;">

                            <span class=" ${status == "validado" ? "bg-success" : "bg-danger"} align-middle text-center">
                                <span class="h4">${status == "validado" ? "Homologado" : "Não homologado"}</span><br>
                                <span class=" badge bg-secondary" style="font-size: inherit;">${pvnv.periodo.inicio} a ${pvnv.periodo.fim}<br>
                                <span class="text-muted">${anos} anos, ${meses} meses e ${dias} dias</span> </span>
                            </span>
                        
                            <div class="table-responsive">
                                <table class="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th scope="col" colspan="2" class="h6">Listando ${status == "validado" ? "Provas" : "Impedimentos"}</th>
                                        </tr>
                                        <tr class="table-active">
                                            <th scope="row">Data</th>
                                            <td>Descrição</td>
                                        </tr>
                                    </thead>
                                    <tbody>`;


        if (status == "validado") {
            for (const prova of pvnv.provas) {

                conteudo += `<tr class="table-active">
                                        <th scope="row" class="align-middle">${prova.inicio}</th>
                                        <td class="text-wrap">${prova.descricao}</td></tr>`;
            }




        } else {

            if (pvnv.impedimentos.length == 0) {

                if (pvnv.provas.length == 0) {

                    conteudo += `<tr class="table-active">
                                            <th scope="row">${`--/--/----`}</th>
                                            <td>${`Ausência de provas favoráveis`}</td></tr>`;
                }
            }




            for (const impedimento of pvnv.impedimentos) {

                conteudo += `<tr class="table-active">
                                        <th scope="row" class="align-middle">${impedimento.inicio}</th>
                                        <td class="text-wrap">${impedimento.descricao}</td></tr>`;
            }
        }



        conteudo += ` 
                            </tbody>
                        </table>
                    </div>
                </div>`;




        /* for (const prova of p_h2.provas) {
 
            conteudo += `<tr class="table-active">
            <th scope="row">${prova.inicio}</th>
            <td>${prova.descricao}</td></tr>`; */
    }
    //}

    conteudo += `           </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;

    let cabecalho = `<div class="container-fluid" >
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="card">
                                <div class="card-body" style="overflow: auto;">
                                    <h4 class="card-title mb-5">Períodos, provas e Impedimentos</h4>
                                    <div class=" progress" style="height: inherit; width:${larguraTotal}px;">`;

    conteudo = cabecalho + conteudo;

    document.getElementById(`show-time-line-table`).innerHTML = conteudo;

    //document.getElementById(`time-line-data`).innerHTML = conteudo;

}


function isPescador() {


    for (const cat of categoriasTrabalhador) {

        console.log(`>>>> CATEGORIA - ${cat}`);
        if (cat == "pescador") {
            return true;
        }
    }

    return false;

}

function isIndigena() {


    for (const cat of categoriasTrabalhador) {

        //console.log(`>>>> CATEGORIA - ${cat}`);
        if (cat == "indigena") {
            return true;
        }
    }

    return false;

}

function receberCnis() {

}



