"use strict";


function testeConcomitancia() {

    let periodos = [];

    periodos.push(new NewPeriodo("F", "1985-01-01", "1990-12-31"));
    periodos.push(new NewPeriodo("A", "2000-01-01", "2010-12-31"));
    periodos.push(new NewPeriodo("B", "2005-01-01", "2012-12-31"));
    periodos.push(new NewPeriodo("C", "2011-01-01", "2017-12-31"));
    periodos.push(new NewPeriodo("D", "2015-01-01", "2020-12-31"));
    periodos.push(new NewPeriodo("E", "2022-01-01", "2023-12-31"));


    let total = calculaTotalDeNewPeriodos(periodos);

    console.log(`TOTAL: ${total[0]} anos, ${total[1]} meses, ${total[2]} dias`);
}

function testeConcomitancia2() {

    let periodos = [];


    periodos.push(new NewPeriodo("A", "1989-01-01", "2010-12-31"));
    periodos.push(new NewPeriodo("B", "2000-01-01", "2020-12-31"));


    let total = calculaTotalDeNewPeriodos(periodos);

    console.log(`TOTAL: ${total[0]} anos, ${total[1]} meses, ${total[2]} dias`);
}

function testeDuracaoPeriodo() {

    let p1 = new NewPeriodo("A", "1980-01-01", "1985-12-31");
    let p2 = new NewPeriodo("B", "1990-01-01", "1995-12-31");

    console.log(`${p1.descricao} - DURAÇÃO: ${p1.duracao.years} anos,  ${p1.duracao.months} meses,  ${p1.duracao.days} dias`);
    console.log(`${p2.descricao} - DURAÇÃO: ${p2.duracao.years} anos,  ${p2.duracao.months} meses,  ${p2.duracao.days} dias`);
}

function testeLimpaExigencias() {
    let exigencia = `- Apresentar originais (ou cópias autenticadas):
    -- RG, 
    -- CPF, 
    -- todas as carteiras de trabalho (na íntegra - todas as folhas onde houver algo escrito)
    -- registro civil (certidão de nascimento ou casamento)
    -- comprovante de endereço
   - Apresentar declaração de atividade rural na forma do Anexo I do Ofício-Circular nº 46 DIRBEN/INSS, de 13/09/2019, o qual substituiu a entrevista rural (o modelo da declaração segue em anexo a esta carta e esta disponibilizado no presente requerimento, podendo ser acessado por meio do portal/aplicativo Meu INSS;`;

    let exi = exigencia.replaceAll("–", "");
    exi = exigencia.replaceAll("-", "");
    exi = exigencia.trim();
    console.log(exi);
}


