"use strict";


//o id do imput da painel consulta por cpf é formNovo:opcoesConsulta:imputNumeroConsulta

//https://cnis.inss.gov.br/cnis/faces/pages/index.xhtml# 
function NewTabPainel() {

    //funciona mas não consegui preencher o formulário
    /*  window.open(
         "https://cnis.inss.gov.br/cnis/faces/pages/pfcnis/consultaPessoaFisicaComum/consultarPFDadosCadastrais2.xhtml", "_blank"); */

    /* window.open(
        "painel.html", "_blank"); */


    //requisição síncrona
    /*     var url = "https://cnis.inss.gov.br/cnis/faces/pages/pfcnis/consultaPessoaFisicaComum/consultarPFDadosCadastrais2.xhtml";//Sua URL
    
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", url, false);
        xhttp.send();//A execução do script pára aqui até a requisição retornar do servidor */


    //requisição assíncrona

    var url = "https://cnis.inss.gov.br/cnis/faces/pages/pfcnis/consultaPessoaFisicaComum/consultarPFDadosCadastrais2.xhtml";//Sua URL

    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", url, true);

    xhttp.onreadystatechange = function () {//Função a ser chamada quando a requisição retornar do servidor
        if (xhttp.readyState == 4 && xhttp.status == 200) {//Verifica se o retorno do servidor deu certo
            console.log(xhttp.responseText);
        }
    }

    xhttp.send();//A execução do script CONTINUARÁ mesmo que a requisição não tenha retornado do servidor

    xhttp.onreadystatechange = () => {
        console.log(xhttp.responseText);
    };


}