"use strict";


//controlador de atapas
let qtdEtapas = 12;
let etapasFluxoArray = [1, 4, 5, 6, 8, 9, 7, 2, 3, 10, 11, 12];


//Aqui ficarão as funções de View

let dadosRetornoView = document.querySelector(".message");
let exigenciasView = document.querySelector(".exigencias");
let impedimentosView = document.querySelector(".impedimentos");
let provasView = document.querySelector(".provas");
let provasPorPeriodoView = document.querySelector(".provas_por_periodo");
let atencaoRetornoView = document.querySelector(".atencao");





//............................................. ETAPA 01



document.querySelector(".gravar-etapa-01").addEventListener("click", function () {

  nome = document.querySelector("#nome").value;
  dataNascimento = document.querySelector("#data-de-nascimento").value;
  der = document.querySelector("#der").value;
  idade = calculaIdade();
  sexo = document.querySelector('input[name="sexo"]:checked').value;


  if (!isDataNascimentoValida(dataNascimento)) {
    alert(`Data de nascimento inválida!`)
    return false;
  }

  if (!isDerValida(der)) {
    alert(`DER inválida!`)
    return false;
  }


  if ((sexo === "homem" && idade < 60) || (sexo === "mulher" && idade < 55)) {
    impedimentostxt += "Idade inferior ao exigido!";
    atencaoRetornoView.innerHTML = impedimentostxt;
  }

  reapresentaDadosDeRetorno();
  avancarUmaEtapa();
});

function povoaFormularioEtapa1() {
  //absorvendo os dados do getGet.js
  document.querySelector("#nome").value = nome;
  document.querySelector("#data-de-nascimento").value = deDataParaDataAmericana(dataNascimento);
  document.querySelector("#der").value = deDataParaDataAmericana(der);
  //idade = calculaIdade();
}



//monitorando se aparece a pergunta "tem autodeclaração"
document.querySelector(".tem-anexo1").addEventListener("click", function () {
  document.querySelector(".tem_autodeclaracao_class").classList.remove("hidden");
});
document.querySelector(".tem-anexo2").addEventListener("click", function () {
  document.querySelector(".tem_autodeclaracao_class").classList.add("hidden");
});

//........................................ ETAPA 02

document.querySelector(".gravar-etapa-02").addEventListener("click", function () {

  //setando o tipo: rural, indigena, pescador, nao_sei_mas_nao_indigena, nao_sei
  tipo = document.querySelector('input[name="tipo"]:checked').value;

  //verificando se tem anexos
  temAnexos = document.querySelector('input[name="tem-anexo"]:checked').value;

  //verificando se tem auto-declaração
  temAutodeclaracao = "nao";

  if (temAnexos === "sim") {
    temAutodeclaracao = document.querySelector('input[name="tem-autodeclaracao"]:checked').value; //mostra a pergunta se tem autodeclação

  } else {
    exigenciasArray.push(`
    - Apresentar originais (ou cópias autenticadas):<br>
    -- RG, <br>
    -- CPF, <br>
    -- todas as carteiras de trabalho (na íntegra - todas as folhas onde houver algo escrito)<br>
    -- registro civil (certidão de nascimento ou casamento)<br>
    -- comprovante de endereço<br>
    <br>
    `);
  }


  //console.log("Tem autodeclaracao " + temAutodeclaracao);

  //adicionando a exigencias da autodeclaração
  if (temAutodeclaracao === "nao") {
    if (tipo === "rural") {
      exigenciasArray.push(`
      - Apresentar declaração de atividade rural na forma do Anexo I do Ofício-Circular nº 46 DIRBEN/INSS, de 13/09/2019, o qual substituiu a entrevista rural (o modelo da declaração segue em anexo a esta carta e esta disponibilizado no presente requerimento, podendo ser acessado por meio do portal/aplicativo Meu INSS;
        <br>
      <br> 
        `);
    } else if (tipo == "pescador") {
      exigenciasArray.push(`
      - Apresentar formulário preenchido da Autodeclaração do Segurado Especial - Pescador, na forma do Anexo II do Ofício-Circular nº 46 DIRBEN/INSS, de 13/09/2019;
      <br>
      <br>       
      `);
    } else if (tipo == "indigena") {
      exigenciasArray.push(`
      – Para comprovação da atividade de indígena, apresentadar declaração, emitida via Sistema SEI, na forma do Anexo I da IN 77/2015; conforme convencionado no Ofício SEI nº 1/2019/APSBPD – GEXBEL/GEX/BEL;
      <br>
      <br>       
      `);
    } else if (tipo == "nao_sei_mas_nao_indigena") {
      exigenciasArray.push(`Se Trabalhador rural: <br>
      - Apresentar declaração de atividade rural na forma do Anexo I do Ofício-Circular nº 46 DIRBEN/INSS, de 13/09/2019, o qual substituiu a entrevista rural (o modelo da declaração segue em anexo a esta carta e esta disponibilizado no presente requerimento, podendo ser acessado por meio do portal/aplicativo Meu INSS;
      <br><br>
      Se Pescador:<br>
      - Apresentar formulário preenchido da Autodeclaração do Segurado Especial - Pescador, na forma do Anexo II do Ofício-Circular nº 46 DIRBEN/INSS, de 13/09/2019;
      <br><br>
      
      `);
    } else {
      exigenciasArray.push(`Se Trabalhador rural: <br>
      - Apresentar declaração de atividade rural na forma do Anexo I do Ofício-Circular nº 46 DIRBEN/INSS, de 13/09/2019, o qual substituiu a entrevista rural (o modelo da declaração segue em anexo a esta carta e esta disponibilizado no presente requerimento, podendo ser acessado por meio do portal/aplicativo Meu INSS;
      <br><br>
      Se Pescador:<br>
      - Apresentar formulário preenchido da Autodeclaração do Segurado Especial - Pescador, na forma do Anexo II do Ofício-Circular nº 46 DIRBEN/INSS, de 13/09/2019;
      <br><br>
      Se Indígena:<br>
      – Para comprovação da atividade de indígena, apresentadar declaração, emitida via Sistema SEI, na forma do Anexo I da IN 77/2015; conforme convencionado no Ofício SEI nº 1/2019/APSBPD – GEXBEL/GEX/BEL;   
      <br>
      <br> 
      `);
    }
  }

  reapresentaExigencias();
  reapresentaDadosDeRetorno();
  reapresentaImpedimentos();

  avancarUmaEtapa();


});


document.querySelector(".gravar-etapa-03").addEventListener("click", function () {

  if (processaFormularioPeriodoAutodeclarado()) {
    reapresentaDadosDeRetorno();

    avancarUmaEtapa();
  }





});

function processaFormularioPeriodoAutodeclarado() {
  let categoria = document.querySelector("#categoria1").value;
  let dataInicio = document.querySelector("#data-inicio-1").value;
  let dataFim = document.querySelector("#data-fim-1").value;

  if (!isDataVinculoValida(dataInicio)) {
    alert(`Data de início inválida`);
    return false;
  }

  if (dataFim != "") {

    if (!isDataVinculoValida(dataFim)) {
      alert(`Data de fim inválida`);
      return false;
    }

    if (!dataInicioEFimCoerentes(dataInicio, dataFim)) {
      alert(`Data de Início / fim incoerentes.`);
      return false;
    }

    if (isData1BeforeData2(der, dataFim)) {

      if (confirm("Termino maior que a DER. Assumir término da DER?")) {
        //console.log("Vamos tentar remover o " + j);
        dataFim = der.slice();
      }
    }

  } else {

    if (confirm("Assumir Término da DER?")) {
      //console.log("Vamos tentar remover o " + j);
      dataFim = der.slice();
    } else {
      alert(`Informe a data de término:`);
      return false;
    }
  }

  periodosAutoDeclaradosArray.push(new PeriodoAutoDeclarado(categoria, getData(dataInicio), getData(dataFim)));

  return true;

}




//para adicionar outro período
document.querySelector(".outro-periodo").addEventListener("click", function () {

  if (processaFormularioPeriodoAutodeclarado()) {
    reapresentaDadosDeRetorno();

    limpaFormularioPeriodoAutodeclarado();
  }

});

function limpaFormularioPeriodoAutodeclarado() {
  document.querySelector("#categoria1").value = "";
  document.querySelector("#data-inicio-1").value = "";
  document.querySelector("#data-fim-1").value = "";
}


//monitorando se aparece a pergunta "tem vinculo publico em aberto"
document.querySelector(".tem-vinculo-publico1").addEventListener("click", function () {
  document.querySelector(".tem_vinculo_publico_class").classList.remove("hidden");
  document.querySelector(".tem_vinculo_publico_aberto_class").classList.remove("hidden");
});
document.querySelector(".tem-vinculo-publico2").addEventListener("click", function () {
  document.querySelector(".tem_vinculo_publico_class").classList.add("hidden");
  document.querySelector(".tem_vinculo_publico_aberto_class").classList.add("hidden");
});


document.querySelector(".gravar-etapa-04").addEventListener("click", function () {

  //se o formulário for validado
  if (processaFormularioVinculosPublicos()) {
    reapresentaExigencias();
    reapresentaDadosDeRetorno();
    reapresentaImpedimentos();

    avancarUmaEtapa();
  }



});

//para adicionar outro período
document.querySelector(".outro-orgao").addEventListener("click", function () {

  //se o formulário for validado
  if (processaFormularioVinculosPublicos()) {

    reapresentaExigencias();
    reapresentaDadosDeRetorno();
    reapresentaImpedimentos();

    //limpa o formulário para inclusão dos dados do próximo vínculo
    limpaFormularioVinculosPubicos();
  }
  // processaFormularioVinculosPublicos();



});

function processaFormularioVinculosPublicos() {
  //verificando se teve vinculos publicos
  temVinculosPublicos = document.querySelector('input[name="tem-vinculo-publico"]:checked').value;

  nit = document.querySelector("#nit").value;


  //verificando se teve vínculos públicos em aberto / pendente
  vinculoPublicoPendente = document.querySelector('input[name="tem-vinculo-publico-aberto"]:checked').value;

  //pegando os períodos de vínculos públicos  
  let orgao = document.querySelector("#orgao").value;
  let dataInicio = document.querySelector("#data-inicio-orgao").value;
  let dataFim = document.querySelector("#data-fim-orgao").value;




  //registrando o impedimento para homologacao rural do período
  if (temVinculosPublicos === "sim") {

    if (!isDataVinculoValida(dataInicio)) {
      alert(`Data de início do vínculo inválida`);
      return false;
    }

    if (!isDataVinculoValida(dataFim) && vinculoPublicoPendente == "nao") {
      alert(`Data de fim do vínculo inválida`);
      return false;
    }

    if (!dataInicioEFimCoerentes(dataInicio, dataFim) && vinculoPublicoPendente == "nao") {
      alert(`Data de Início / fim do vínculo incoerentes.`);
      return false;
    }
    //impedimentosView.innerHTML += `<br>Orgão: ${orgao} Data Início: ${getData(dataInicio)} Data fim: ${getData(dataFim)}`;
    impedimentosArray.push(new Vinculo(orgao, getData(dataInicio), getData(dataFim), vinculoPublicoPendente));
  }

  //adicionando a exigencias do anexo VIII
  if (vinculoPublicoPendente === "sim") {

    //jó corrigindo "Municipio para Município"
    orgao = orgao.replace("MUNICIPIO", "MUNICÍPIO");
    exigenciasArray.push(`
      <br>
      - Apresentar Declaração emitida pelo(a) ${orgao} constando (1) todos os períodos trabalhados pela requerente e o regime previdenciário (rpps ou rgps) em cada período. (2) fazer constar na declaração a ocorrência de períodos de licenças, se for o caso, especificando se foram ou não remuneradas. (3) anexar cópias autenticadas de todos os decretos de nomeação e exoneração ou contratos, conforme o caso. (4) apresentar ainda cópias autenticadas das fichas financeiras de todos os períodos recolhidos ao RGPS após julho/1994, se for o caso.
      <br>
      <br>
      `);
  }

  return true;



}


function limpaFormularioVinculosPubicos() {
  document.querySelector("#orgao").value = "";
  document.querySelector("#data-inicio-orgao").value = "";
  document.querySelector("#data-fim-orgao").value = "";
}

//monitorando se teve vinculo
document.querySelector(".teve-vinculo1").addEventListener("click", function () {
  document.querySelector(".teve_vinculo_ate_class").classList.remove("hidden");
});
document.querySelector(".teve-vinculo2").addEventListener("click", function () {
  document.querySelector(".teve_vinculo_ate_class").classList.add("hidden");
});

document.querySelector(".teve-positivado1").addEventListener("click", function () {
  document.querySelector(".teve_positivado_class").classList.remove("hidden");
});
document.querySelector(".teve-positivado2").addEventListener("click", function () {
  document.querySelector(".teve_positivado_class").classList.add("hidden");
});


document.querySelector(".gravar-etapa-05").addEventListener("click", function () {

  if (processaFormularioVinculosEContribuicoes()) {

    reapresentaExigencias();
    reapresentaDadosDeRetorno();
    reapresentaProvas();
    reapresentaImpedimentos();

    avancarUmaEtapa();

  }
  //processaFormularioVinculosEContribuicoes()



});

function processaFormularioVinculosEContribuicoes() {
  //verificando se teve vinculos publicos
  teveVinculos = document.querySelector('input[name="teve-vinculo"]:checked').value;
  //console.log("teve vinculo: " + teveVinculos);

  tevePositivado = document.querySelector('input[name="teve-positivado"]:checked').value;

  const fazerExigenciasVinculo = document.querySelector('input[name="fazer-exigencias-vinculo"]:checked').value;

  if (tevePositivado === "sim") {
    let dataInicio = document.querySelector("#data-inicio-positivado").value;
    let dataFim = document.querySelector("#data-fim-positivado").value;

    if (!isDataVinculoValida(dataInicio)) {
      alert(`Data de início de Período Positivado inválida`);
      return false;
    }

    if (!isDataVinculoValida(dataFim) && fazerExigenciasVinculo == "nao") {
      alert(`Data de fim de Período Positivado inválida`);
      return false;
    }

    if (!dataInicioEFimCoerentes(dataInicio, dataFim) && fazerExigenciasVinculo == "nao") {
      alert(`Data de Início / fim de Período Positivado incoerentes.`);
      return false;
    }

    provasArray.push(new Vinculo("Período Previamente Positivado", getData(dataInicio), getData(dataFim), "periodo-positivado"));
  }

  if (teveVinculos === "sim") {
    let empregador = document.querySelector("#empregador").value;
    let dataInicio = document.querySelector("#data-inicio-vinculo").value;
    let dataFim = document.querySelector("#data-fim-vinculo").value;

    let isVinculoRural = document.querySelector('input[name="is-vinculo-rural"]:checked').value;
    console.log("tem vincuplo publico: " + isVinculoRural);

    if (!isDataVinculoValida(dataInicio)) {
      alert(`Data de início do vínculo inválida`);
      return false;
    }

    if (!isDataVinculoValida(dataFim) && fazerExigenciasVinculo == "nao") {
      alert(`Data de fim do vínculo inválida`);
      return false;
    }

    if (!dataInicioEFimCoerentes(dataInicio, dataFim) && fazerExigenciasVinculo == "nao") {
      alert(`Data de Início / fim do vínculo incoerentes.`);
      return false;
    }

    let nota = "urbano";
    if (isVinculoRural === "sim") {
      nota = "rural";
    }
    //provasView.innerHTML += `<br>Vinculo Rural: ${empregador}<br> Data Início: ${getData(dataInicio)} Data fim: ${getData(dataFim)}`;

    //todo vínculo é uma prova contra o período de Segurado Especial
    //provasArray.push(new Vinculo(empregador, getData(dataInicio), getData(dataFim), nota));

    //} else {
    //impedimentosView.innerHTML += `<br>Vinculo Urbano: ${empregador} <br> Data Início: ${getData(dataInicio)} Data fim: ${getData(dataFim)}`;
    impedimentosArray.push(new Vinculo(empregador, getData(dataInicio), getData(dataFim), nota));



    if (fazerExigenciasVinculo == "sim") {

      exigenciasArray.push(`
            <br>
            - Apresentar íntegra de todas as carteiras de trabalho do requerente - digitalizar todas as folhas onde houver algo escrito (inclusive férias, FGTS, etc)
            <br>
            <br>
            - Referente ao vínculo trabalhista com ${empregador}, caso não conste na CTPS, esta tenha sido extraviada ou não constem registros de baixa, apresentar termo de rescisão contratual OU Extrato completo da conta vinculada do FGTS emitido pela Caixa Econômica Federal e assinado e carimbado por funcionário do banco;  
            <br>
            <br>        
          
          `);

    }
  }

  return true;

}

//para adicionar outro período
document.querySelector(".outro-vinculo").addEventListener("click", function () {

  if (processaFormularioVinculosEContribuicoes()) {

    reapresentaExigencias();
    reapresentaDadosDeRetorno();
    reapresentaProvas();
    reapresentaImpedimentos();

    limpaFormularioVinculosEContribuicoes();

  }

});

document.querySelector(".outro-periodo-positivado").addEventListener("click", function () {

  if (processaFormularioVinculosEContribuicoes()) {

    reapresentaExigencias();
    reapresentaDadosDeRetorno();
    reapresentaProvas();
    reapresentaImpedimentos();

    limpaFormularioVinculosEContribuicoes();

  }

});

function limpaFormularioVinculosEContribuicoes() {
  document.querySelector("#empregador").value = "";
  document.querySelector("#data-inicio-vinculo").value = "";
  document.querySelector("#data-fim-vinculo").value = "";
  document.getElementById("nao-rural").checked = true;
}

function limpaFormularioPeriodoPositivado() {

  document.querySelector("#data-inicio-positivado").value = "";
  document.querySelector("#data-fim-positivado").value = "";

}


//monitorando se teve beneficios
document.querySelector(".teve-beneficio1").addEventListener("click", function () {
  document.querySelector(".teve_beneficio_ate_class").classList.remove("hidden");
});
document.querySelector(".teve-beneficio2").addEventListener("click", function () {
  document.querySelector(".teve_beneficio_ate_class").classList.add("hidden");
});

document.querySelector(".gravar-etapa-06").addEventListener("click", function () {

  if (processaFormularioBeneficios()) {

    reapresentaExigencias();

    reapresentaDadosDeRetorno();
    reapresentaProvas();
    reapresentaImpedimentos();

    avancarUmaEtapa();
  }
});

function processaFormularioBeneficios() {
  teveBeneficios = document.querySelector('input[name="teve-beneficio"]:checked').value;
  //console.log("teve beneficio: " + teveBeneficios);

  if (teveBeneficios === "sim") {
    let nb = document.querySelector("#nb").value;
    let dataInicio = document.querySelector("#data-inicio-beneficio").value;
    let dataFim = document.querySelector("#data-fim-beneficio").value;
    let especie = document.querySelector("#tipo-beneficio").value;

    if (!isDataVinculoValida(dataInicio)) {
      alert(`Data de início do vínculo inválida`);
      return false;
    }

    if (dataFim != "") {

      if (!isDataVinculoValida(dataFim)) {
        alert(`Data de fim do Benefício Inválida`);
        return false;
      }

      if (!dataInicioEFimCoerentes(dataInicio, dataFim)) {
        alert(`Data de Início / fim do benefício incoerentes.`);
        return false;
      }

    }


    let isBeneficioUrbano = document.querySelector('input[name="is-beneficio-urbano"]:checked').value;
    console.log("tem beneficio urbano: " + isBeneficioUrbano);

    let nota = "urbano";
    if (isBeneficioUrbano === "nao" && especie != "B87" && especie != "B88") {
      nota = "rural";
      //provasView.innerHTML += `<br>Beneficio Rural: ${especie} / ${nb}<br> Data Início: ${getData(dataInicio)} Data fim: ${getData(dataFim)}`;
      provasArray.push(new Beneficio(especie, nb, getData(dataInicio), getData(dataFim), nota));

    } else {
      /*       impedimentosView.innerHTML += `<br>Beneficio Urbano: ${especie} / ${nb} <br> Data Início: ${getData(dataInicio)} Data fim: ${getData(dataFim)}`; */
      impedimentosArray.push(new Beneficio(especie, nb, getData(dataInicio), getData(dataFim), nota));
    }
  }


  return true;

}


document.querySelector(".outro-beneficio").addEventListener("click", function () {

  if (processaFormularioBeneficios()) {

    reapresentaExigencias();
    reapresentaDadosDeRetorno();
    reapresentaProvas();
    reapresentaImpedimentos();

    limpaFormularioBeneficios();
  }

});

function limpaFormularioBeneficios() {
  document.querySelector("#nb").value = "";
  document.querySelector("#data-inicio-beneficio").value = "";
  document.querySelector("#data-fim-beneficio").value = "";
  document.querySelector("#tipo-beneficio").value = "";
}

//monitorando se teve empresas
document.querySelector(".teve-empresa1").addEventListener("click", function () {
  document.querySelector(".teve_empresa_ate_class").classList.remove("hidden");
});
document.querySelector(".teve-empresa2").addEventListener("click", function () {
  document.querySelector(".teve_empresa_ate_class").classList.add("hidden");
});


document.querySelector(".gravar-etapa-07").addEventListener("click", function () {

  //processaFormularioEmpresasNoCPF();

  if (processaFormularioEmpresasNoCPF()) {
    reapresentaExigencias();
    reapresentaDadosDeRetorno();
    reapresentaImpedimentos();
    reapresentaProvas();
    avancarUmaEtapa();
  }

});

function processaFormularioEmpresasNoCPF() {
  //verificando se teve vinculos beneficio
  teveEmpresa = document.querySelector('input[name="teve-empresa"]:checked').value;
  //console.log("teve empresa: " + teveEmpresa);

  if (teveEmpresa === "sim") {
    let cnpjCei = document.querySelector("#cnpj_cei").value;
    let nomeEmpresa = document.querySelector("#nome_empresa").value;
    let cnae = document.querySelector("#cnae").value;
    let dataInicio = document.querySelector("#data-inicio-empresa").value;
    let dataFim = document.querySelector("#data-fim-empresa").value;
    let empresaAtiva = document.querySelector("#empresa_ativa").checked;

    if (!isDataVinculoValida(dataInicio)) {
      alert(`Data de início do vínculo inválida`);
      return false;
    }

    if (!empresaAtiva) {

      if (!isDataVinculoValida(dataFim)) {
        alert(`Data de fim da empresa inválida`);
        return false;
      }

      if (!dataInicioEFimCoerentes(dataInicio, dataFim)) {
        alert(`Data de Início / fim da empresa incoerentes.`);
        return false;
      }

    }



    let isEmpresaUrbana = document.querySelector('input[name="is-empresa-urbana"]:checked').value;

    //let nota = "urbano";
    if (isEmpresaUrbana === "nao") {
      //nota = "rural";
      //provasView.innerHTML += `<br>Empresa Rural: ${nomeEmpresa} <br>CNPJ/CEI: ${cnpjCei}<br>CNAE: ${cnae}<br> Data Início: ${getData(dataInicio)} Data fim: ${getData(dataFim)}`;
      provasArray.push(new Empresa(cnpjCei, nomeEmpresa, cnae, getData(dataInicio), getData(dataFim), empresaAtiva));

    } else {

      //adicionando a exigencias sobre a empresa: 
      if (empresaAtiva) {

        exigenciasArray.push(`
            <br>
            - Consta empresa ativa (${nomeEmpresa}, CNPJ ${cnpjCei}) sob o CPF do(a) requerente. Apresentar contrato de constituição da empresa, todas as alterações contratuais e outros documentos que possuir para comprovar a situação da mesma.
            <br>
            <br>
          
          `);

      }
      impedimentosArray.push(new Empresa(cnpjCei, nomeEmpresa, cnae, getData(dataInicio), getData(dataFim), empresaAtiva));
    }
  }

  return true;
}

document.querySelector(".outra-empresa").addEventListener("click", function () {

  if (processaFormularioEmpresasNoCPF()) {
    reapresentaExigencias();
    reapresentaDadosDeRetorno();
    reapresentaImpedimentos();
    reapresentaProvas();
    limpaFormularioEmpresaNoCPF();
  }

});

function limpaFormularioEmpresaNoCPF() {
  document.querySelector("#cnpj_cei").value = "";
  document.querySelector("#nome_empresa").value = "";
  document.querySelector("#cnae").value = "";
  document.querySelector("#data-inicio-empresa").value = "";
  document.querySelector("#data-fim-empresa").value = "";
  document.querySelector("#empresa_ativa").checked = false;
  document.getElementById("sim-empresa-urbana").checked = true;
}

//monitorando se teve atividade
document.querySelector(".teve-atividade1").addEventListener("click", function () {
  document.querySelector(".teve_atividade_ate_class").classList.remove("hidden");
});
document.querySelector(".teve-atividade2").addEventListener("click", function () {
  document.querySelector(".teve_atividade_ate_class").classList.add("hidden");
});


document.querySelector(".gravar-etapa-08").addEventListener("click", function () {

  //processaFormularioAtividadesCnis();

  if (processaFormularioAtividadesCnis()) {
    reapresentaExigencias();
    reapresentaDadosDeRetorno();
    reapresentaProvas();
    reapresentaImpedimentos();

    avancarUmaEtapa();
  }


});


function processaFormularioAtividadesCnis() {
  teveAtividade = document.querySelector('input[name="teve-atividade"]:checked').value;


  if (teveAtividade === "sim") {
    let atividade = document.querySelector("#atividade").value;
    let dataInicio = document.querySelector("#data-inicio-atividade").value;
    let dataFim = document.querySelector("#data-fim-atividade").value;
    let atividadeAtiva = document.querySelector("#atividade_ativa").checked;


    if (!isDataVinculoValida(dataInicio)) {
      alert(`Data de início do vínculo inválida`);
      return false;
    }

    if (!atividadeAtiva) {

      if (!isDataVinculoValida(dataFim)) {
        alert(`Data de fim do vínculo inválida`);
        return false;
      }

      if (!dataInicioEFimCoerentes(dataInicio, dataFim)) {
        alert(`Data de Início / fim do vínculo incoerentes.`);
        return false;
      }

    }


    let isAtividadeUrbana = document.querySelector('input[name="is-atividade-urbana"]:checked').value;

    //let nota = "urbano";
    if (isAtividadeUrbana === "nao") {
      //nota = "rural";
      //provasView.innerHTML += `<br>Atividade Rural: ${atividade} <br> Data Início: ${getData(dataInicio)} Data fim: ${getData(dataFim)}`;
      provasArray.push(new Atividade(atividade, getData(dataInicio), getData(dataFim), atividadeAtiva));

    } else {

      //adicionando a exigencias sobre a atividade: 
      if (atividadeAtiva) {

        exigenciasArray.push(`
        <br>
        - Apresentar declaração informando se ainda exerce a atividade ${atividade}. Caso não exerça, informar a data que deixou de exercê-la.<br>
        <br>
        `);
        /* exigenciasView.innerHTML = "";
        for (let i = 0; i < exigenciasArray.length; i++) {
          exigenciasView.innerHTML += exigenciasArray[i];
        } */

      }
      impedimentosArray.push(new Atividade(atividade, getData(dataInicio), getData(dataFim), atividadeAtiva));
    }
  }

  return true;
}


document.querySelector(".outra-atividade").addEventListener("click", function () {

  if (processaFormularioAtividadesCnis()) {
    reapresentaExigencias();
    reapresentaDadosDeRetorno();
    reapresentaProvas();
    reapresentaImpedimentos();

    limpaFormularioAtividadeCnis();
  }



});

function limpaFormularioAtividadeCnis() {
  document.querySelector("#atividade").value = "";
  document.querySelector("#data-inicio-atividade").value = "";
  document.querySelector("#data-fim-atividade").value = "";
  document.querySelector("#atividade_ativa").checked = "";
  document.querySelector("#atividade_ativa").checked = false;
  document.getElementById("sim-atividade-urbana").checked = true;
}


//monitorando se teve base governamental
document.querySelector(".teve-base1").addEventListener("click", function () {
  document.querySelector(".teve_base_ate_class").classList.remove("hidden");
});
document.querySelector(".teve-base2").addEventListener("click", function () {
  document.querySelector(".teve_base_ate_class").classList.add("hidden");
});

//monitorando se teve seguro desemprego
document.querySelector(".teve-sd1").addEventListener("click", function () {
  document.querySelector(".teve_seguro_desemprego_class").classList.remove("hidden");
});
document.querySelector(".teve-sd2").addEventListener("click", function () {
  document.querySelector(".teve_seguro_desemprego_class").classList.add("hidden");
});

//monitorando se teve DAP
document.querySelector(".teve-dap1").addEventListener("click", function () {
  document.querySelector(".teve_dap_ate_class").classList.remove("hidden");
});
document.querySelector(".teve-dap2").addEventListener("click", function () {
  document.querySelector(".teve_dap_ate_class").classList.add("hidden");
});

//monitorando se teve Seguro defeso
document.querySelector(".teve-defeso1").addEventListener("click", function () {
  document.querySelector(".teve_defeso_ate_class").classList.remove("hidden");
});
document.querySelector(".teve-defeso2").addEventListener("click", function () {
  document.querySelector(".teve_defeso_ate_class").classList.add("hidden");
});

//monitorando se teve Sala da Cidadania
document.querySelector(".teve-sala1").addEventListener("click", function () {
  document.querySelector(".teve_sala_ate_class").classList.remove("hidden");
});
document.querySelector(".teve-sala2").addEventListener("click", function () {
  document.querySelector(".teve_sala_ate_class").classList.add("hidden");
});

//monitorando se teve RGP
document.querySelector(".teve-rgp1").addEventListener("click", function () {
  document.querySelector(".teve_rgp_class").classList.remove("hidden");
});
document.querySelector(".teve-rgp2").addEventListener("click", function () {
  document.querySelector(".teve_rgp_class").classList.add("hidden");
});

document.querySelector(".gravar-etapa-09").addEventListener("click", function () {



  if (processaFormularioBasesGovernamentais()) {
    reapresentaExigencias();
    reapresentaDadosDeRetorno();
    reapresentaImpedimentos();
    reapresentaProvas();

    avancarUmaEtapa();
  }



});

function processaFormularioBasesGovernamentais() {
  //verificando se teve base
  teveBase = document.querySelector('input[name="teve-base"]:checked').value;

  teveSeguroDesemprego = document.querySelector('input[name="teve-sd"]:checked').value;

  if (teveSeguroDesemprego === "sim") {

    if (!processaFormularioSeguroDesemprego()) {
      return false;
    }

  }


  if (teveBase === "sim") {

    //verificando se teve dap
    let teveDAP = document.querySelector('input[name="teve-dap"]:checked').value;

    if (teveDAP === "sim") {
      if (!processaFormularioDap()) {
        return false;
      }
    }

    //verificando se teve seguro defeso
    let teveDefeso = document.querySelector('input[name="teve-defeso"]:checked').value;

    if (teveDefeso === "sim") {
      if (!processaFormularioDefeso()) {
        return false;
      }
    }

    //verificando se teve registro no sala da cidadania
    let teveSala = document.querySelector('input[name="teve-sala"]:checked').value;

    if (teveSala === "sim") {
      if (!processaFormularioSala()) {
        return false;
      }
    }

    //verificando se teve rgp
    let teveRgp = document.querySelector('input[name="teve-rgp"]:checked').value;

    if (teveRgp === "sim") {

      if (!processaFormularioRGP()) {
        return false;
      }
    }
  }

  return true;

}




function processaFormularioDap() {
  let numeroDAP = document.querySelector("#numero_dap").value;
  let categoriaDAP = document.querySelector("#categoria_dap").value;
  let dataInicio = document.querySelector("#data-inicio-dap").value;
  let dataFim = document.querySelector("#data-fim-dap").value;

  if (!isDataVinculoValida(dataInicio)) {
    alert(`Data de início da DAP inválida`);
    return false;
  }

  if (dataFim != "") {

    /* if (!isDataVinculoValida(dataFim)) {
      alert(`Data de fim da DAP inválida`);
      return false;
    } */

    if (!dataInicioEFimCoerentes(dataInicio, dataFim)) {
      alert(`Data de Início / fim da DAP incoerentes.`);
      return false;
    }

  }


  provasArray.push(new DAP(numeroDAP, categoriaDAP, getData(dataInicio), getData(dataFim)));

  return true;

}

function processaFormularioSeguroDesemprego() {
  let dataInicioSD = document.querySelector("#data-inicio-sd").value;
  let dataFimSD = document.querySelector("#data-fim-sd").value;

  if (!isDataVinculoValida(dataInicioSD)) {
    alert(`Data de início do Seguro Desemprego inválida`);
    return false;
  }

  if (dataFimSD != "") {

    if (!isDataVinculoValida(dataFimSD)) {
      alert(`Data de fim do Seguro Desemprego inválida`);
      return false;
    }

    if (!dataInicioEFimCoerentes(dataInicioSD, dataFimSD)) {
      alert(`Data de Início / fim do Seguro Desemprego incoerentes.`);
      return false;
    }

  }

  impedimentosArray.push(new SeguroDesemprego(getData(dataInicioSD), getData(dataFimSD)));

  return true;

}

function processaFormularioDefeso() {
  let dataInicioDefeso = document.querySelector("#data-inicio-defeso").value;
  let dataFimDefeso = document.querySelector("#data-fim-defeso").value;

  if (!isDataVinculoValida(dataInicioDefeso)) {
    alert(`Data de início do Defeso inválida`);
    return false;
  }

  if (dataFimDefeso != "") {

    if (!isDataVinculoValida(dataFimDefeso)) {
      alert(`Data de fim do Defeso inválida`);
      return false;
    }

    if (!dataInicioEFimCoerentes(dataInicioDefeso, dataFimDefeso)) {
      alert(`Data de Início / fim do Defeso incoerentes.`);
      return false;
    }

  }


  //provasView.innerHTML += `<br>Seguro Defeso:<br> Data Início: ${getData(dataInicioDefeso)} Data fim: ${getData(dataFimDefeso)}`;
  provasArray.push(new Defeso(getData(dataInicioDefeso), getData(dataFimDefeso)));

  return true;
}

function processaFormularioSala() {
  let nomeAssentamento = document.querySelector("#nome-assentamento").value;
  let dataInicioSala = document.querySelector("#data-inicio-sala").value;
  let dataFimSala = document.querySelector("#data-fim-sala").value;

  if (!isDataVinculoValida(dataInicioSala)) {
    alert(`Data de início do Registro Sala inválida`);
    return false;
  }

  if (dataFimSala != "") {

    if (!isDataVinculoValida(dataFimSala)) {
      alert(`Data de fim do Registro Sala inválida`);
      return false;
    }

    if (!dataInicioEFimCoerentes(dataInicioSala, dataFimSala)) {
      alert(`Data de Início / fim do Registro Sala incoerentes.`);
      return false;
    }
  }


  //provasView.innerHTML += `<br>Registro de Assentado no Sala: <br>${nomeAssentamento} <br> Data Início: ${getData(dataInicioSala)} Data fim: ${getData(dataFimSala)}`;
  provasArray.push(new RegistroSala(nomeAssentamento, getData(dataInicioSala), getData(dataFimSala)));

  return true;

}

function processaFormularioRGP() {
  let numeroRgp = document.querySelector("#numero-rgp").value;
  let dataInicioRgp = document.querySelector("#data-inicio-rgp").value;
  let dataFimRgp = document.querySelector("#data-fim-rgp").value;
  let rgpAtivo = document.querySelector("#rgp-ativo").checked;


  if (!isDataVinculoValida(dataInicioRgp)) {
    alert(`Data de início do RGP inválida`);
    return false;
  }

  if (dataFimRgp != "") {

    if (!isDataVinculoValida(dataFimRgp)) {
      alert(`Data de fim do RGP inválida`);
      return false;
    }

    if (!dataInicioEFimCoerentes(dataInicioRgp, dataFimRgp)) {
      alert(`Data de Início / fim do RGP incoerentes.`);
      return false;
    }

  }



  //provasView.innerHTML += `<br>RGP: <br>${numeroRgp} <br> Data Início: ${getData(dataInicioRgp)} Data fim: ${getData(dataFimRgp)} RGP Ativo: ${rgpAtivo ? "sim" : "não"}`;
  provasArray.push(new RGP(numeroRgp, getData(dataInicioRgp), getData(dataFimRgp), rgpAtivo));

  return true;

}

document.querySelector(".outra-dap").addEventListener("click", function () {

  if (processaFormularioDap()) {
    reapresentaProvas();

    limpaFormularioDap();
  }
  //reapresentaExigencias();
  //reapresentaDadosDeRetorno();
  //reapresentaImpedimentos();


});


function limpaFormularioDap() {
  document.querySelector("#numero_dap").value = "";
  document.querySelector("#categoria_dap").value = "";
  document.querySelector("#data-inicio-dap").value = "";
  document.querySelector("#data-fim-dap").value = "";
}

document.querySelector(".outro-defeso").addEventListener("click", function () {

  if (processaFormularioDefeso()) {
    reapresentaProvas();

    limpaFormularioDefeso();
  }

});

document.querySelector(".outro-sd").addEventListener("click", function () {

  if (processaFormularioSeguroDesemprego()) {
    reapresentaImpedimentos();

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
    reapresentaProvas();

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
    reapresentaProvas();

    limpaFormularioRGP();
  }

});

function limpaFormularioRGP() {
  document.querySelector("#numero-rgp").value = "";
  document.querySelector("#data-inicio-rgp").value = "";
  document.querySelector("#data-fim-rgp").value = "";
  document.querySelector("#rgp-ativo").checked = false;
}

//monitorando se apresentou provas documentais
document.querySelector(".teve-docs1").addEventListener("click", function () {
  document.querySelector(".teve_docs_class").classList.remove("hidden");
});
document.querySelector(".teve-docs2").addEventListener("click", function () {
  document.querySelector(".teve_docs_class").classList.add("hidden");
});


document.querySelector(".gravar-etapa-10").addEventListener("click", function () {

  if (processaFormularioProvasDocumentais()) {
    reapresentaExigencias();
    reapresentaDadosDeRetorno();
    reapresentaImpedimentos();
    reapresentaProvas();

    avancarUmaEtapa();
  }



});

function processaFormularioProvasDocumentais() {
  //verificando se teve vinculos beneficio
  let teveDocs = document.querySelector('input[name="teve-docs"]:checked').value;


  if (teveDocs === "sim") {
    let descricao = document.querySelector("#descricao-documento").value;
    let dataInicio = document.querySelector("#data-inicio-doc").value;
    let dataFim = document.querySelector("#data-fim-doc").value;
    let isDocFavoravel = document.getElementById("is-doc-favoravel").checked;

    if (!isDataVinculoValida(dataInicio)) {
      alert(`Data de início inválida`);
      return false;
    }

    if (dataFim != "") {

      if (!isDataVinculoValida(dataFim)) {
        alert(`Data de fim inválida`);
        return false;
      }

      if (!dataInicioEFimCoerentes(dataInicio, dataFim)) {
        alert(`Data de Início / fim do RGP incoerentes.`);
        return false;
      }

    }

    //futuramente verificar se está no nome do requerente, caso negativo verificar se o titular tem qualidade de SE
    //let atividadeAtiva = document.querySelector("#atividade_ativa").checked;

    if (isDocFavoravel) {

      let posicao = -1;
      for (let i = 0; i < provasArray.length; i++) {
        if (provasArray[i].descricao === descricao) {
          posicao = i;
          provasArray[i].addData(getData(dataInicio));//insere só a data na prova existente
          ordenaDatasDaProvaUnica(provasArray[i]); //ordena por datas
        }
      }
      if (posicao === -1) {
        provasArray.push(new ProvaUnica(descricao, getData(dataInicio)));
      }

    } else { //Se a prova for contrária
      impedimentosArray.push(new Prova(descricao, getData(dataInicio), getData(dataFim)));
    }
  }

  return true;

}


document.querySelector("input[name=is-doc-favoravel]").addEventListener("change", function () {
  let isDocFavoravel = document.getElementById("is-doc-favoravel").checked;

  if (isDocFavoravel) { // se o doc for favorável não mostre o campo data fim
    document.querySelector(".doc_contrario_data_fim_class").classList.add("hidden");
  } else {
    document.querySelector(".doc_contrario_data_fim_class").classList.remove("hidden");
  }
});

document.querySelector(".outro-doc").addEventListener("click", function () {

  if (processaFormularioProvasDocumentais()) {
    reapresentaExigencias();
    reapresentaDadosDeRetorno();
    reapresentaImpedimentos();
    reapresentaProvas();

    limpaFormularioProvasDocumentais();
  }



});

function limpaFormularioProvasDocumentais() {
  document.querySelector("#data-inicio-doc").value = "";
}

//monitorando se aparece a pergunta "tem autodeclaração"
document.querySelector(".provas-suficientes1").addEventListener("click", function () {
  document.querySelector(".fazer-exigencias-documentais-class").classList.add("hidden");
});
document.querySelector(".provas-suficientes2").addEventListener("click", function () {
  document.querySelector(".fazer-exigencias-documentais-class").classList.remove("hidden");
});

document.querySelector(".fazer-exigencias-documentais2").addEventListener("click", function () {
  document.querySelector(".motivo-do-indeferimento").classList.remove("hidden");
});


document.querySelector(".gravar-etapa-11").addEventListener("click", function () {

  isProvasSuficientes = document.querySelector('input[name="provas-suficientes"]:checked').value;

  console.log(`Provas suficientes: ${isProvasSuficientes}`);

  let fazerExigenciasDocumentais = "";
  if (isProvasSuficientes == "nao") {
    fazerExigenciasDocumentais = document.querySelector('input[name="fazer-exigencias-documentais"]:checked').value;

    if (fazerExigenciasDocumentais == "nao") {
      motivoIndeferimento = document.querySelector("#motivo-indeferimento").value;
      console.log(`Motivo do indeferimento: ${motivoIndeferimento}`);
      if (motivoIndeferimento == "nao_apresentou_anexo_preenchido_direito") {
        oQueEstaErradoNoFormulario
          = prompt("O que está errado no formulário: ")
      } else if (motivoIndeferimento == "falta_de_carencia_so_docs_feitos_as_vesperas") {
        oQueEstaErrado
          = prompt("Foi apresentado algum documento com indício de adulteração?")
      }

      motivoIndeferimento2 = document.querySelector("#motivo-indeferimento-2").value;
      console.log(`Motivo do indeferimento2: ${motivoIndeferimento2}`);

      if (motivoIndeferimento2 != "") {
        document.querySelector("#paragrafosDeAnalisePeranteANorma2").classList.remove("hidden");
      }


      if (motivoIndeferimento2 == "nao_apresentou_anexo_preenchido_direito") {
        oQueEstaErradoNoFormulario
          = prompt("O que está errado no formulário: ")
      } else if (motivoIndeferimento2 == "falta_de_carencia_so_docs_feitos_as_vesperas") {
        oQueEstaErrado
          = prompt("Foi apresentado algum documento com indício de adulteração?")
      }

    }
  }





  if (fazerExigenciasDocumentais === "sim") {

    if (tipo == "rural") {
      exigenciasArray.push(`
      <br>
      - Para comprovação dos períodos de trabalho rural:
      <br> -- Apresentar documentos contemporâneos ao exercício da atividade rural alegada, como escritura da terra, ITRs, CCIRs, contratos de arrendamento, contratos de comodato, meação, etc., notas fiscais de compra de insumos e de venda de produção, DAPs, etc.
      <br>
      <br>
    `);
      /* exigenciasView.innerHTML = "";
      for (let i = 0; i < exigenciasArray.length; i++) {
        exigenciasView.innerHTML += exigenciasArray[i];
      } */

    } else if (tipo == "pescador") {
      exigenciasArray.push(`
      <br>
      - Para comprovação dos períodos como Pescador(a):
      <br> --Apresentar todos dos documentos que possuir para comprovação do exercício da atividade de pesca, a exemplo de carteiras de identificação profissional, notas fiscais de compras de insumos, recibos de venda de produção pesqueira, etc.
      <br>
      <br>
    `);
      /* exigenciasView.innerHTML = "";
      for (let i = 0; i < exigenciasArray.length; i++) {
        exigenciasView.innerHTML += exigenciasArray[i];
      } */
    } else if (tipo == "nao_sei") {
      exigenciasArray.push(`
      <br>
      SE TRABALHADOR RURAL
      <br>
      - Apresentar documentos contemporâneos ao exercício da atividade rural alegada, como escritura da terra, ITRs, CCIRs, contratos de arrendamento, contratos de comodato, meação, etc., notas fiscais de compra de insumos e de venda de produção, DAPs, etc.
      <br>
      <br>
      SE PESCADOR
      <br>
      - Apresentar todos dos documentos que possuir para comprovação do exercício da atividade de pesca, a exemplo de carteiras de identificação profissional, notas fiscais de compras de insumos, recibos de venda de produção pesqueira, etc.
      <br>
      <br>
      SE Indígena
      <br>
      – Para comprovação da atividade de indígena, apresentadar declaração, emitida via Sistema SEI, na forma do Anexo I da IN 77/2015; conforme convencionado no Ofício SEI nº 1/2019/APSBPD – GEXBEL/GEX/BEL;
      <br>
      <br>
    `);
      /* exigenciasView.innerHTML = "";
      for (let i = 0; i < exigenciasArray.length; i++) {
        exigenciasView.innerHTML += exigenciasArray[i];
      } */

    } else if (tipo == "nao_sei_mas_nao_indigena") {
      exigenciasArray.push(`
      <br>
      SE TRABALHADOR RURAL
      <br>
      - Apresentar documentos contemporâneos ao exercício da atividade rural alegada, como escritura da terra, ITRs, CCIRs, contratos de arrendamento, contratos de comodato, meação, etc., notas fiscais de compra de insumos e de venda de produção, DAPs, etc.
      <br>
      <br>
      SE PESCADOR
      <br>
      - Apresentar todos dos documentos que possuir para comprovação do exercício da atividade de pesca, a exemplo de carteiras de identificação profissional, notas fiscais de compras de insumos, recibos de venda de produção pesqueira, etc.
      <br>
      <br>
      
    `);


    }
    reapresentaExigencias();
    reapresentaDadosDeRetorno();
    reapresentaImpedimentos();
    reapresentaProvas();
  }




  avancarUmaEtapa();
});


document.querySelector(".gravar-etapa-12").addEventListener("click", function () {

  nb_presente = document.querySelector("#nb_presente").value;
  console.log(`NB Presente: ${nb_presente}`);

});








function reprocessaProvas() {
  reapresentaProvas();
}




function reapresentaDadosDeRetorno() {

  let texto = `
    Dados:<br><br>

    &nbsp;&nbsp;  DER: ${getData(der)}<br>
    &nbsp;&nbsp;  Serviço: ${servico}<br>
    &nbsp;&nbsp;  ${protocolo}<br>
    <br>
    &nbsp;&nbsp;  Nome: ${nome}<br>
    &nbsp;&nbsp;  CPF: ${cpf}<br>
    &nbsp;&nbsp;  NIT: ${nit}<br>
    &nbsp;&nbsp;  Data de nascimento: ${getData(dataNascimento)}<br>    
    &nbsp;&nbsp;  Idade: ${idade} anos ${sexo === "homem" && idade >= 65 ? "(Dá Híbrida / Urbana)" : ""}
    ${sexo === "mulher" && idade >= 62 ? "(Dá Híbrida / Urbana)" : ""}
    &nbsp;&nbsp;  [implementa idade mínima em: ${calculaAnoQueCompletouIdadeDesejada(sexo == "homem" ? 60 : 55)}]<br>
    &nbsp;&nbsp;  Sexo: ${sexo}<br>
    &nbsp;&nbsp;  Mãe: ${nomeMae}<br>
    <br>
    Categoria: ${tipo}<br>
    <br>
    Apresenta:<br>
    &nbsp;&nbsp;  anexos: ${temAnexos}<br>
    &nbsp;&nbsp;  autodeclaração: ${temAutodeclaracao}<br>
    <br>
    Teve vínculos públicos: ${temVinculosPublicos}<br>
    &nbsp;&nbsp;  Vínculos públicos pendentes: ${vinculoPublicoPendente}<br>
    <br>
    Teve vínculos empregatícios ou contribuições: ${teveVinculos}<br>
    <br>
    Teve Benefícios: ${teveBeneficios}<br>
    <br>
    Teve Atividade: ${teveAtividade}<br>
    <br>
    Teve Base Governamental: ${teveBase}<br>
    <br>
    Teve Empresa no CPF: ${teveEmpresa}<br>
    <br>
  `;

  let autodeclarados = "";


  if (temAutodeclaracao === "sim") {

    totalAutodeclarado = [];
    let totalAno = 0;
    let totalMes = 0;
    let totalDias = 0;

    periodosAutoDeclaradosArray.sort(sortFunction);//reordenando os periodos autodeclarados
    autodeclarados = `<br><b>Períodos autodeclarados:</b> <br>`
    for (let i = 0; i < periodosAutoDeclaradosArray.length; i++) {
      autodeclarados += ` &nbsp;&nbsp; &nbsp;&nbsp;Categoria: ${periodosAutoDeclaradosArray[i].categoria}`;
      autodeclarados += `<br> &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;<span id="autodeclarado_${i}">Período: ${periodosAutoDeclaradosArray[i].inicio} a ${periodosAutoDeclaradosArray[i].fim}</span><br>`;
      const duracaoDoPeriodo = calculaDuracao(periodosAutoDeclaradosArray[i]);
      autodeclarados += `&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;Duração: ${duracaoDoPeriodo.years} anos, ${duracaoDoPeriodo.months} meses, ${duracaoDoPeriodo.days} dias<br>`;

      totalAno += duracaoDoPeriodo.years;
      totalMes += duracaoDoPeriodo.months;
      totalDias += duracaoDoPeriodo.days;
    }

    if (totalDias >= 30) {
      while (totalDias >= 30) {
        totalMes += 1;
        totalDias -= 30;
      }
    }

    if (totalMes >= 12) {
      while (totalMes >= 12) {
        totalAno += 1;
        totalMes -= 12;
      }
    }

    totalAutodeclarado = [totalAno, totalMes, totalDias];

    autodeclarados += `<br>`;
    autodeclarados += `<b>&nbsp;&nbsp; &nbsp;&nbsp;Total: ${totalAno} anos, ${totalMes} meses e ${totalDias} dias.</b>`;

  }

  texto += autodeclarados;

  texto += `<br><br>As provas deverão estar entre:<br>`;
  //texto += `&nbsp;&nbsp; ${abrangenciaDeProvas()}`;

  //separando os períodos declarados em blocos de sete anos e meio
  getBlocosDePeriodos();

  for (let i = 0; i < blocosSeteAnosEMeio.length; i++) {
    texto += `&nbsp;&nbsp;${blocosSeteAnosEMeio[i].inicio} a ${blocosSeteAnosEMeio[i].fim};<br>`;
  }


  dadosRetornoView.innerHTML = texto;


  for (let i = 0; i < periodosAutoDeclaradosArray.length; i++) {
    document.querySelector("#autodeclarado_" + i).addEventListener("click", function () {

      if (confirm("Confirma deleção?")) {
        //console.log("Vamos tentar remover o " + j);
        periodosAutoDeclaradosArray.splice(i, 1)
        reapresentaDadosDeRetorno();
      }

    });
  }

}

/* class PeriodoAutoDeclarado {
  constructor(categoria, inicio, fim) { */













function reapresentaExigencias() {

  exigenciasView.innerHTML = "";
  let txt = "";
  for (let i = 0; i < exigenciasArray.length; i++) {
    //exigenciasView.innerHTML += exigenciasArray[i];
    txt += `<p id="exigencia_${i}">${exigenciasArray[i]}</p>`;
    txt += `<br>`;

  }

  exigenciasView.innerHTML += txt;

  for (let i = 0; i < exigenciasArray.length; i++) {

    document.querySelector("#exigencia_" + i).addEventListener("click", function () {

      if (confirm("Confirma deleção da exigência?")) {
        //console.log("Vamos tentar remover o " + j);
        //provasArray.splice(j, 1)
        //console.log(`Vamos remover um vínculo urbano: tamanho atual: ${vinculosUrbanos.length}`);
        exigenciasArray.splice(i, 1);
        //console.log(`Após remoção: tamanho atual: ${vinculosUrbanos.length}`);     

        reapresentaExigencias();
        //reapresentaProvas();
      }

    });
  }
}



function reapresentaImpedimentos() {


  //impedimentosArray.sort(sortFunction);

  //cuidando dos vínculos - etapas 4 e 5
  /*   let vinculosUrbanos = [];
    let beneficiosUrbanos = [];
    let atividadesUrbanas = [];
    let empresasNoCPF = [];
    let provasEmContrario = [];
    let impedimento_id = ""; */

  vinculosUrbanos = [];
  beneficiosUrbanos = [];
  atividadesUrbanas = [];
  empresasNoCPF = [];
  provasEmContrario = [];
  segurosDesempregos = [];
  impedimento_id = "";

  for (let i = 0; i < impedimentosArray.length; i++) {
    if (impedimentosArray[i] instanceof Vinculo) {
      if (impedimentosArray[i].nota == "rural") {
        vinculosRurais.push(impedimentosArray[i]);
      } /*else {
        vinculosUrbanos.push(impedimentosArray[i]);
      } */
      vinculosUrbanos.push(impedimentosArray[i]);
    } else if (impedimentosArray[i] instanceof Beneficio) {
      beneficiosUrbanos.push(impedimentosArray[i]);
    } else if (impedimentosArray[i] instanceof Atividade) {
      atividadesUrbanas.push(impedimentosArray[i]);
    } else if (impedimentosArray[i] instanceof Empresa) {
      empresasNoCPF.push(impedimentosArray[i]);
    } else if (impedimentosArray[i] instanceof Prova) {
      provasEmContrario.push(impedimentosArray[i]);
    } else if (impedimentosArray[i] instanceof SeguroDesemprego) {
      segurosDesempregos.push(impedimentosArray[i]);
    }
  }



  vinculosUrbanos.sort(sortVinculosEBeneficiosPorData);

  temVinculoUrbano = false;
  impedimentosView.innerHTML = "";
  let txt = "";
  for (let i = 0; i < vinculosUrbanos.length; i++) {

    if (!temVinculoUrbano) {
      temVinculoUrbano = true;
      //impedimentosView.innerHTML += `<br><b>- Vínculos Urbanos:</b><br>`;
      txt += `<p><b>Vínculos:</b></p>`;
    }
    let vinculo = vinculosUrbanos[i];


    for (let n = 0; n < impedimentosArray.length; n++) {
      if (impedimentosArray[n] instanceof Vinculo) {
        if (impedimentosArray[n].empregador == vinculo.empregador && impedimentosArray[n].inicio == vinculo.inicio) {
          //impedimentosArray.splice(n, 1);
          impedimento_id = n;
        }
      }
    }
    /* txt += `<p id="vinculo_urbano_${i}">${vinculo.inicio} - ${vinculo.empregador} - Data Início: ${vinculo.inicio} Data fim: ${vinculo.fim};</p>` */
    txt += `<p id="impedimento_${impedimento_id}">${vinculo.inicio} - ${vinculo.empregador} - Data Início: ${vinculo.inicio} Data fim: ${vinculo.fim}, Categoria: ${vinculo.nota}; </p>`

  }
  impedimentosView.innerHTML += txt;

  //cuidando dos seguros desempregos
  segurosDesempregos.sort(sortVinculosEBeneficiosPorData)
  impedimento_id = "";

  temSeguroDesemprego = false;
  txt = "";

  for (let i = 0; i < segurosDesempregos.length; i++) {

    if (!temSeguroDesemprego) {
      temSeguroDesemprego = true;
      //impedimentosView.innerHTML += `<br><b>- Benefícios Urbanos:</b><br>`;
      txt += `<br><p><b>Seguros Desempregos:</b></p>`

    }
    let sd = segurosDesempregos[i];

    for (let n = 0; n < impedimentosArray.length; n++) {
      if (impedimentosArray[n] instanceof SeguroDesemprego) {
        if (impedimentosArray[n].inicio == sd.inicio) {
          impedimento_id = n;
        }
      }
    }
    txt += `<p id="impedimento_${impedimento_id}" > Seguro Desemprego - Data Início: ${sd.inicio} Data fim: ${sd.fim};</p>`;

  }

  impedimentosView.innerHTML += txt;



  //cuidando dos benefícios

  beneficiosUrbanos.sort(sortVinculosEBeneficiosPorData);
  impedimento_id = "";

  temBeneficiosUrbanos = false;
  txt = "";
  for (let i = 0; i < beneficiosUrbanos.length; i++) {

    if (!temBeneficiosUrbanos) {
      temBeneficiosUrbanos = true;
      //impedimentosView.innerHTML += `<br><b>- Benefícios Urbanos:</b><br>`;
      txt += `<p><b>Benefícios Urbanos:</b></p>`

    }
    let beneficio = beneficiosUrbanos[i];

    for (let n = 0; n < impedimentosArray.length; n++) {
      if (impedimentosArray[n] instanceof Beneficio) {
        if (impedimentosArray[n].nb == beneficio.nb) {
          impedimento_id = n;
        }
      }
    }
    txt += `<p id="impedimento_${impedimento_id}" class="jaba"> ${beneficio.inicio} - ${beneficio.especie} / ${beneficio.nb} - Data Início: ${beneficio.inicio} Data fim: ${beneficio.fim};</p>`;

  }

  impedimentosView.innerHTML += txt;


  //cuidando das atividades do cnis

  atividadesUrbanas.sort(sortVinculosEBeneficiosPorData);

  impedimento_id = "";
  temAtividadesUrbanas = false;
  txt = "";
  for (let i = 0; i < atividadesUrbanas.length; i++) {

    if (!temAtividadesUrbanas) {
      temAtividadesUrbanas = true;
      //impedimentosView.innerHTML += `<br><b>- Atividades Urbanas:</b><br>`;
      txt += `<p><b>Atividades Urbanas:</b></p>`;
    }
    let atividade = atividadesUrbanas[i];

    for (let n = 0; n < impedimentosArray.length; n++) {
      if (impedimentosArray[n] instanceof Atividade) {
        if (impedimentosArray[n].atividade == atividade.atividade && impedimentosArray[n].inicio == atividade.inicio) {
          impedimento_id = n;
        }
      }
    }
    txt += `<p id="impedimento_${impedimento_id}">${atividade.inicio} - ${atividade.atividade} - Data Início: ${atividade.inicio} Data fim: ${atividade.fim};</p>`;

  }

  impedimentosView.innerHTML += txt;

  //cuidando das empresas no CPF

  empresasNoCPF.sort(sortVinculosEBeneficiosPorData);

  impedimento_id = "";
  temEmpresasNoCPF = false;
  txt = "";
  for (let i = 0; i < empresasNoCPF.length; i++) {

    if (!temEmpresasNoCPF) {
      temEmpresasNoCPF = true;
      //impedimentosView.innerHTML += `<br><b>- Empresas Urbanas:</b><br>`;
      txt += `<p><b>Empresas Urbanas:</b></p>`
    }
    let empresa = empresasNoCPF[i];

    for (let n = 0; n < impedimentosArray.length; n++) {
      if (impedimentosArray[n] instanceof Empresa) {
        if (impedimentosArray[n].nome == empresa.nome && impedimentosArray[n].cnpjCei == empresa.cnpjCei) {
          impedimento_id = n;
        }
      }
    }
    txt += `<p id="impedimento_${impedimento_id}">${empresa.inicio} - ${empresa.nome} - CNPJ/CEI: ${empresa.cnpjCei} - Data Início: ${empresa.inicio} Data fim: ${empresa.fim};</p>`;
  }
  impedimentosView.innerHTML += txt;

  //cuidando das provas em contrário

  provasEmContrario.sort(sortProvasOuImpedimentosSimples);

  impedimento_id = "";
  temProvaContraria = false;
  txt = "";
  for (let i = 0; i < provasEmContrario.length; i++) {

    if (!temProvaContraria) {
      temProvaContraria = true;
      //impedimentosView.innerHTML += `<br><b>- Indícios em contrário:</b><br>`;
      txt += `<p><b>Indícios em contrário:</b></p>`;
    }
    let prova = provasEmContrario[i];

    for (let n = 0; n < impedimentosArray.length; n++) {
      if (impedimentosArray[n] instanceof Prova) {
        if (impedimentosArray[n].descricao == provasEmContrario[i].descricao && impedimentosArray[n].dataInicio == provasEmContrario[i].dataInicio) {
          impedimento_id = n;
        }
      }
    }
    txt += `<p id="impedimento_${impedimento_id}">${prova.dataInicio}</b> - ${prova.descricao} - Data Início: ${prova.dataInicio} Data fim: ${prova.dataFim};</p>`;

  }
  impedimentosView.innerHTML += txt;

  //agora gerando as deleões
  for (let n = 0; n < impedimentosArray.length; n++) {

    document.querySelector("#impedimento_" + n).addEventListener("click", function () {

      if (confirm("Confirma deleção?")) {
        //console.log("Vamos tentar remover o " + j);
        impedimentosArray.splice(n, 1)
        reapresentaImpedimentos();
      }

    });
  }


}




/* function isDataBetween(periodo, data) {

  const valor = moment(deMomentParaDataAmericana(data)).isBetween(deDataParaDataAmericana(periodo.inicio, periodo.fim));
  //console.log(">>>>>>>>>>>> PROVAS POR PERIODO");
  //console.log(">>>>>>>>>>>>>>>>>>>>> " + valor);
  return valor;

} */





function apresentaDados_h2() {
  //provasPorPeriodoView.innerHTML +=

  analisaHomologacao_h2();

  provasPorPeriodoView.innerHTML += `<br><br>`;
  provasPorPeriodoView.innerHTML += `<h2>Dados de Homologação H2</h2>`;

  periodos_h2.forEach(p => {
    provasPorPeriodoView.innerHTML += `<br>`;
    provasPorPeriodoView.innerHTML += `<p><b>Periodo: ${p.periodo.categoria} : ${p.periodo.inicio} a ${p.periodo.fim}</b></p>`;
    provasPorPeriodoView.innerHTML += `<br>`;

    provasPorPeriodoView.innerHTML += `<p>&nbsp;&nbsp;a) Provas:</p>`;
    p.provas.forEach(prova => {
      provasPorPeriodoView.innerHTML += `<p>&nbsp;&nbsp;&nbsp;&nbsp;- ${prova.inicio} - ${prova.descricao}</p>`;
      provasPorPeriodoView.innerHTML += `<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Abrangência: ${prova.abrangencia.inicio} - ${prova.abrangencia.fim}</p>`;
    });

    provasPorPeriodoView.innerHTML += `<br>`;
    provasPorPeriodoView.innerHTML += `<p>&nbsp;&nbsp;b) Impedimentos:</p>`;
    p.impedimentos.forEach(impedimento => {
      provasPorPeriodoView.innerHTML += `<p>&nbsp;&nbsp;&nbsp;&nbsp;- ${impedimento.inicio} - ${impedimento.descricao}. ${impedimento.fim != "" ? `${impedimento.inicio} a ${impedimento.fim}` : ""}</p>`;
    });

    provasPorPeriodoView.innerHTML += `<br>`;
    provasPorPeriodoView.innerHTML += `<p>&nbsp;&nbsp;c) Períodos Validados:</p>`;
    p.periodosValidados.forEach(pv => {
      provasPorPeriodoView.innerHTML += `<p>&nbsp;&nbsp;&nbsp;&nbsp;- ${pv.inicio} a ${pv.fim}`;
    });
  });
}















function reapresentaProvas() {

  //vinculosRurais = [];
  beneficiosRurais = [];
  atividadesRurais = [];
  rgpTodos = [];

  provasArray.sort(sortFunction);

  //provasPorPeriodo();
  provasUteisAosPeriodos = [];


  provasView.innerHTML = "";
  periodosPreviamentePositivados = [];

  //não tem como agrupar por tipo de prova sem perder a ordem cronológica geral das provas

  for (let j = 0; j < provasArray.length; j++) {
    if (provasArray[j] instanceof Vinculo && provasArray[j].nota == "periodo-positivado") {
      let vinculo = provasArray[j];
      //vinculosRurais.push(vinculo);
      //console.log(`linha 1916: temos ${vinculosRurais} vinculos rurais`);
      //let txt = `<p id = "vinculo_rural_${j}"> `;
      let txt = `<p id = "prova_${j}"> `;
      txt += `<br>- ${vinculo.empregador}: Data Início: ${vinculo.inicio} Data fim: ${vinculo.fim};</p>`;
      provasView.innerHTML += txt;

      periodosPreviamentePositivados.push(vinculo);

      isUtilParaAlgumPeriodo(vinculo.inicio, `${vinculo.empregador}: Data Início: ${vinculo.inicio} Data fim: ${vinculo.fim};`);


    } else if (provasArray[j] instanceof Beneficio) {
      let beneficio = provasArray[j];
      beneficiosRurais.push(beneficio);
      //let txt = `<p id = "beneficio_rural_${j}"> `;
      let txt = `<p id = "prova_${j}"> `;
      txt += `<br>- Beneficio Rural: ${beneficio.especie} / ${beneficio.nb} Data Início: ${beneficio.inicio} Data fim: ${beneficio.fim};</p>`;
      provasView.innerHTML += txt;
      /* document.querySelector("#beneficio_rural_" + j).addEventListener("click", function () {
 
        if (confirm("Confirma deleção da prova?")) {
          //console.log("Vamos tentar remover o " + j);
          provasArray.splice(j, 1);
          reapresentaProvas();
        }
 
      }); */
    } else if (provasArray[j] instanceof Empresa) {
      //constructor(cnpjCei, nome, cnae, inicio, fim, isAtiva)
      let empresa = provasArray[j];
      //let txt = `<p id = "empresa_rural_${j}"> `;
      let txt = `<p id = "prova_${j}"> `;
      txt += `- ${empresa.inicio} : Empresa Rural: ${empresa.nome} CNPJ/CEI: ${empresa.cnpjCei}<br>CNAE: ${empresa.cnae}<br> Data Início: ${empresa.inicio} Data fim: ${empresa.fim};</p>`;
      provasView.innerHTML += txt;

      /* document.querySelector("#empresa_rural_" + j).addEventListener("click", function () {
 
        if (confirm("Confirma deleção da prova?")) {
          //console.log("Vamos tentar remover o " + j);
          provasArray.splice(j, 1);
          reapresentaProvas();
        }
 
      }); */


      isUtilParaAlgumPeriodo(empresa.inicio, `Empresa Rural: ${empresa.nome} CNPJ/CEI: ${empresa.cnpjCei}<br>CNAE: ${empresa.cnae}<br> Data Início: ${empresa.inicio} Data fim: ${empresa.fim};`);

    } else if (provasArray[j] instanceof Atividade) {
      //constructor(atividade, inicio, fim, isAtiva) {
      let atividade = provasArray[j];
      //let txt = `<p id = "atividade_rural_${j}"> `;
      let txt = `<p id = "prova_${j}"> `;
      txt += `- ${atividade.inicio} : Atividade Rural: ${atividade.atividade} Data Início: ${atividade.inicio} Data fim: ${atividade.fim};</p>`;
      provasView.innerHTML += txt;


      /* document.querySelector("#atividade_rural_" + j).addEventListener("click", function () {
 
        if (confirm("Confirma deleção da prova?")) {
          //console.log("Vamos tentar remover o " + j);
          provasArray.splice(j, 1);
          reapresentaProvas();
        }
 
      }); */


      isUtilParaAlgumPeriodo(atividade.inicio, `Atividade Rural: ${atividade.atividade} <br> Data Início: ${atividade.inicio} Data fim: ${atividade.fim};`);

    } else if (provasArray[j] instanceof DAP) {
      //numero, categoria, inicio, fim
      let dap = provasArray[j];
      //let txt = `<p id = "dap_${j}"> `;
      let txt = `<p id = "prova_${j}"> `;
      txt += `- ${dap.inicio} : DAP: ${dap.numero} Categoria: ${dap.categoria} Data Início: ${dap.inicio} Data fim: ${dap.fim};</p>`;
      provasView.innerHTML += txt;

      /* document.querySelector("#dap_" + j).addEventListener("click", function () {
 
        if (confirm("Confirma deleção da prova?")) {
          //console.log("Vamos tentar remover o " + j);
          provasArray.splice(j, 1);
          reapresentaProvas();
        }
 
      }); */


      //o techo abaixou trata da interpretação do 4.4.1 do OC 46/2019 - sobre a produção dos efeitos da DAP
      // entendo que a dap deve ser considerada somente na data da sua emissão.

      /* let inicio = dap.inicio.slice();
      let mInicio = deDataParaMomentjs(inicio)
      let fim = dap.fim.slice()
      let mFim = deDataParaMomentjs(fim);
      while (mInicio.isBefore(mFim)) {

        isUtilParaAlgumPeriodo(deMomentParaData(mInicio), `DAP: ${dap.numero} <br>Categoria: ${dap.categoria}<br> Data Início: ${dap.inicio} Data fim: ${dap.fim};<br>`);
        mInicio.add(1, "year");

        //momentFim.isBefore(momentFinal)

      } */

      isUtilParaAlgumPeriodo(dap.inicio, `DAP: ${dap.numero} <br>Categoria: ${dap.categoria}<br> Data Início: ${dap.inicio} Data fim: ${dap.fim};<br>`);

    } else if (provasArray[j] instanceof Defeso) {
      //inicio, fim
      let defeso = provasArray[j];
      //let txt = `<p id = "defeso_${j}"> `;
      let txt = `<p id = "prova_${j}"> `;
      txt += `- ${defeso.inicio} : Seguro Defeso:<br> Data Início: ${defeso.inicio} Data fim: ${defeso.fim};</p>`;
      provasView.innerHTML += txt;

      /* document.querySelector("#defeso_" + j).addEventListener("click", function () {
 
        if (confirm("Confirma deleção do Seguro Defeso?")) {
          //console.log("Vamos tentar remover o " + j);
          provasArray.splice(j, 1);
          reapresentaProvas();
        }
 
      }); */


      isUtilParaAlgumPeriodo(defeso.inicio, ` Seguro Defeso:<br> Data Início: ${defeso.inicio} Data fim: ${defeso.fim};`);

    } else if (provasArray[j] instanceof RegistroSala) {
      //nomeAssentamento, inicio, fim
      let registroSala = provasArray[j];
      //let txt = `<p id = "sala_${j}"> `;
      let txt = `<p id = "prova_${j}"> `;
      txt += `- Registro de Assentado no Sala: ${registroSala.nomeAssentamento} - Data Início: ${registroSala.inicio} Data fim: ${registroSala.fim};</p>`;
      provasView.innerHTML += txt;

      /* document.querySelector("#sala_" + j).addEventListener("click", function () {
 
        if (confirm("Confirma deleção da prova?")) {
          //console.log("Vamos tentar remover o " + j);
          provasArray.splice(j, 1);
          reapresentaProvas();
        }
 
      }); */
      isUtilParaAlgumPeriodo(registroSala.inicio, `Registro de Assentado no Sala: <br>${registroSala.nomeAssentamento} - Data Início: ${registroSala.inicio} Data fim: ${registroSala.fim};`);

    } else if (provasArray[j] instanceof RGP) {
      //numero, inicio, fim, isAtivo
      let rgp = provasArray[j];
      rgpTodos.push(rgp);
      //let txt = `<p id = "rgp_${j}"> `;
      let txt = `<p id = "prova_${j}"> `;
      txt += `- RGP: <br>${rgp.numero} Data Início: ${rgp.inicio} Data fim: ${rgp.fim} RGP Ativo: ${rgp.isAtivo ? "sim" : "não"};</p>`;
      provasView.innerHTML += txt;

      /* document.querySelector("#rgp_" + j).addEventListener("click", function () {
 
        if (confirm("Confirma deleção da prova?")) {
          //console.log("Vamos tentar remover o " + j);
          provasArray.splice(j, 1);
          reapresentaProvas();
        }
 
      }); */


      isUtilParaAlgumPeriodo(rgp.inicio, `RGP: <br>${rgp.numero} Data Início: ${rgp.inicio} Data fim: ${rgp.fim} RGP Ativo: ${rgp.isAtivo ? "sim" : "não"};`);

    } else if (provasArray[j] instanceof Prova) {
      //descricao, dataInicio, dataFim

      let prova = provasArray[j];
      //let txt = `<p id = "prova_${j}" > `;
      let txt = `<p id = "prova_${j}"> `;
      txt += `${prova.dataInicio} : Documento:  ${prova.descricao} Data Início: ${prova.dataInicio} Data fim: ${prova.dataFim};</p>`;
      provasView.innerHTML += txt;

      /* document.querySelector("#prova_" + j).addEventListener("click", function () {
 
        if (confirm("Confirma deleção da prova?")) {
          //console.log("Vamos tentar remover o " + j);
          provasArray.splice(j, 1);
          reapresentaProvas();
        }
 
      }); */
      isUtilParaAlgumPeriodo(prova.dataInicio, `Documento:  ${prova.descricao} <br> Data Início: ${prova.dataInicio} Data fim: ${prova.dataFim};`);

    } else if (provasArray[j] instanceof ProvaUnica) {
      //descricao, dataInicio, dataFim

      let provaUnica = provasArray[j];
      /* provasView.innerHTML += `<br> ${provaUnica.descricao} `; */
      //provasView.innerHTML += `<p class="limao"></p>`;
      //let txt = `<p id = "prova_unica_${j}">- `; <<<< tirei em 07/05/2021
      let txt = `<p> `;
      for (let i = 0; i < provaUnica.dataArray.length; i++) {
        //txt += " " + provaUnica.dataArray[i];
        let id = `prova_${j}_data_${i}`;
        txt += `<span id="${id}">${provaUnica.dataArray[i]}</span>`;

        //sexo = document.querySelector('input[name="sexo"]:checked').value;
        /* document.querySelector("#osvaldo").addEventListener("click", function () {
 
          if (confirm(`Confirma deleção da data?`)) {
            console.log("arroz");
            //console.log("Vamos tentar remover o " + j);
            //provaUnica.dataArray.splice(i, 1)
            //reapresentaProvas();
          }
 
        }); */


        if (i < (provaUnica.dataArray.length - 1)) txt += ", ";
        isUtilParaAlgumPeriodo(provaUnica.dataArray[i], `Documento: ${provaUnica.descricao};`);
      }
      //txt += ` - Documento: ${provaUnica.descricao};<span id="delete_prova_${j}">✂</span></p>`;
      //txt += ` - Documento: <span id="delete_prova_${j}">${provaUnica.descricao};</span></p>`;
      txt += ` - Documento: <span id = "prova_${j}">${provaUnica.descricao};</span></p>`;

      provasView.innerHTML += txt;

      /* for (let i = 0; i < provaUnica.dataArray.length; i++) {
        document.querySelector("#prova_" + j + "_data_" + i).addEventListener("click", function () {

          if (confirm(`Confirma deleção da data?`)) {
            //console.log("arroz");
            //console.log("Vamos tentar remover o " + j);
            provaUnica.dataArray.splice(i, 1)
            reapresentaProvas();
          }

        });

      } */



      //let chave = "#prova_unica_" + j;
      //document.querySelector("#prova_unica_" + j).addEventListener("click", openModal);
      //obteroHTMLDaEtapa();
      /* document.querySelector("#delete_prova_" + j).addEventListener("click", function () { <<< tirei em 07/05/2021

        if (confirm("Confirma deleção da prova?")) {
          //console.log("Vamos tentar remover o " + j);
          provasArray.splice(j, 1)
          reapresentaProvas();
        }

      }); */

    }
  }

  for (let n = 0; n < provasArray.length; n++) {

    //if (!(provasArray[n] instanceof ProvaUnica)) {

    document.querySelector("#prova_" + n).addEventListener("click", function () {

      if (confirm("Confirma deleção da prova?")) {
        //console.log("Vamos tentar remover o " + j);
        provasArray.splice(n, 1)
        //reapresentaProvas();
        reapresentaTudo();
      }

    });

    if (provasArray[n] instanceof ProvaUnica) {

      for (let d = 0; d < provasArray[n].dataArray.length; d++) {

        document.querySelector("#prova_" + n + "_data_" + d).addEventListener("click", function () {

          if (confirm(`Confirma deleção da data?`)) {
            //console.log("arroz");
            //console.log("Vamos tentar remover o " + j);
            provasArray[n].dataArray.splice(d, 1)
            reapresentaProvas();
          }

        });
      }

    }

  }

  provasPorPeriodo();


}

/* function deleteProva(numero) {
  console.log("Vamos tentar remover o " + numero);
  provasArray.splice(j, 1)
  reapresentaProvas();
} */

/* function obteroHTMLDaEtapa() {
  let miolo = document.querySelector(".teve_docs_class").innerHTML;
  document.querySelector(".miolo_modal").innerHTML = miolo;
  console.log(miolo);
} */


document.querySelector(".reprocessa_provas").addEventListener("click", function () {
  reprocessaProvas();
});

document.querySelector(".btn_apresenta_despacho").addEventListener("click", function () {
  //window.open('despacho.html', '_blank');
  sugerirDespacho();
});




document.querySelector(".avancar_uma_etapa").addEventListener("click", avancarUmaEtapa);
document.querySelector(".voltar_uma_etapa").addEventListener("click", voltarUmaEtapa);

function avancarUmaEtapa() {
  navegarEtapa(1);
}

function voltarUmaEtapa() {
  navegarEtapa(-1);
}

function navegarEtapa(variacao) {
  //pegando a etapa atual
  const etapaAtual = Number(document.querySelector(".etapa_atual").textContent);

  //pegando a posicao atual no etapasFluxoArray
  const posicaoAtual = etapasFluxoArray.indexOf(etapaAtual);

  if (podeAvancarEtapa(posicaoAtual, variacao)) {//protegendo para não avancar para alem no final do array
    if (podeVoltarEtapa(posicaoAtual, variacao)) {//protegendo para não ir para array negativo
      //ocultando a etapa atual
      document.querySelector(`.etapa-${etapaAtual}`).classList.add("hidden");

      if (etapaAtual == 2 && temAutodeclaracao == "nao" && variacao === 1) variacao = 2; // no avancar
      else if (etapaAtual == 10 && temAutodeclaracao == "nao" && variacao === -1) variacao = -2; // no voltar

      //exigindo a identificação da nova etapa
      document.querySelector(".etapa_atual").textContent = etapasFluxoArray[posicaoAtual + variacao];

      //mostrando a nova etapa
      document.querySelector(`.etapa-${etapasFluxoArray[posicaoAtual + variacao]}`).classList.remove("hidden");
    }
  }
}

function podeAvancarEtapa(posicaoAtual, variacao) {
  return posicaoAtual < (etapasFluxoArray.length - 1) || variacao < 0;
}

function podeVoltarEtapa(posicaoAtual, variacao) {
  return posicaoAtual > 0 || variacao > 0;
}

/*   NOVO FLUXO
    1 - 4 - 5 - 6 - 8 - 9 - 7 - 2
    (SE TIVER AUTODECLARAÇÃO) - 3 - 10 -11
    (SE NÃO TIVER AUTODLARAÇÃO) - 10 -11 */

