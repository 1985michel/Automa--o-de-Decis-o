"use strict";

class Prova {
    constructor(descricao, dataInicio, dataFim) {
        this.dataInicio = dataInicio;
        this.dataFim = dataFim;
        this.descricao = descricao;
    }
}

class ProvaUnica {
    constructor(descricao, data) {
        this.descricao = descricao;
        this.dataArray = []
        this.dataArray.push(data);
    }

    addData(data2) {
        this.dataArray.push(data2);
    }
}

class PeriodoAutoDeclarado {
    constructor(categoria, inicio, fim) {
        this.categoria = categoria;
        this.inicio = inicio;
        this.fim = fim;
    }
}

class Periodo {
    constructor(inicio, fim) {
        this.inicio = inicio;
        this.fim = fim;
        this.duracao = this.calculaDuracao();
    }

    calculaDuracao() {
        let dataInicio = this.inicio.slice();//clona a string
        let dataFim = this.fim.slice();//clona a string

        let inicioSplit = dataInicio.split("/")
        let anoInicio = inicioSplit[2];
        let mesInicio = inicioSplit[1];
        let diaInicio = inicioSplit[0];

        let fimSplit = dataFim.split("/")
        let anoFim = fimSplit[2];
        let mesFim = fimSplit[1];
        let diaFim = fimSplit[0];

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
}

class Vinculo {
    constructor(empregador, inicio, fim, nota) {
        this.empregador = empregador;
        this.inicio = inicio;
        this.fim = fim;
        this.nota = nota;
    }
}

class Impedimento {
    constructor(idPeriodo, descricao) {
        this.idPeriodo = idPeriodo;
        this.descricao = descricao;
    }
}

class ImpedimentoHomologacao {
    constructor(inicio, fim, descricao) {
        this.inicio = inicio;
        this.fim = fim;
        this.descricao = descricao;
    }
}

class Beneficio {
    constructor(especie, nb, inicio, fim, nota) {
        this.especie = especie;
        this.nb = nb;
        this.inicio = inicio;
        this.fim = fim;
        this.nota = nota;
    }
}

class Empresa {
    constructor(cnpjCei, nome, cnae, inicio, fim, isAtiva) {
        this.cnpjCei = cnpjCei;
        this.nome = nome;
        this.cnae = cnae;
        this.inicio = inicio;
        this.fim = fim;
        this.isAtiva = isAtiva;
    }
}

class Atividade {
    constructor(atividade, inicio, fim, isAtiva) {
        this.atividade = atividade;
        this.inicio = inicio;
        this.fim = fim;
        this.isAtiva = isAtiva;
    }
}

class DAP {
    constructor(numero, categoria, inicio, fim) {
        this.numero = numero;
        this.categoria = categoria;
        this.inicio = inicio;
        this.fim = fim;
        this.dap = "dap";
    }
}

class Defeso {
    constructor(inicio, fim) {
        this.inicio = inicio;
        this.fim = fim;
        this.defeso = "defeso";
    }
}

class SeguroDesemprego {
    constructor(inicio, fim) {
        this.inicio = inicio;
        this.fim = fim;
        this.seguroDesemprego = "seguro desemprego";
    }
}

class RegistroSala {
    constructor(nomeAssentamento, inicio, fim) {
        this.nomeAssentamento = nomeAssentamento;
        this.inicio = inicio;
        this.fim = fim;
    }
}

class RGP {
    constructor(numero, inicio, fim, isAtivo) {
        this.numero = numero;
        this.inicio = inicio;
        this.fim = fim;
        this.isAtivo = isAtivo;
        this.rgp = "rgp";
    }
}

