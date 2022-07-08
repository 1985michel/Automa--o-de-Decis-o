"use strict";

//indícios podem ser favoráveis (provas) ou contrários (impedimentos)

class Indicio {
    constructor(descricao, inicio, fim, tipo) {
        this.descricao = descricao.slice();
        this.tipo = tipo.slice();
        this.dataArray = [];

        if (tipo === "prova-doc") {
            this.addData(inicio.slice());
        } else {
            this.inicio = inicio.slice();
            this.fim = fim.slice()
        }
    }

    addData(data2) {
        this.dataArray.push(data2);
    }

    getDatas() {
        return this.dataArray;
    }
}



class NewPeriodo {
    constructor(descricao, inicio, fim) {
        this.descricao = descricao.slice()
        this.inicio = inicio.slice();
        this.fim = fim.slice();
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

        let diff2 = {
            years: diff.years,
            months: diff.months,
            days: diff.days
        }

        /* if (diff2.days == 31) {

            diff2.months += 1;
            diff2.days -= 31;

        } */


        let dias = diff2.days;
        //console.log(`ANTES: DURAÇÃO: ${diff2.years} anos,  ${diff2.months} meses,  ${diff2.days} dias`);

        //console.log(`DIAS ${dias}`);

        if (diff2.days >= 30) {
            while (diff2.days >= 30) {
                diff2.months += 1;
                diff2.days -= dias;
            }
        }

        if (diff2.months >= 12) {
            while (diff2.months >= 12) {
                diff2.years += 1;
                diff2.months -= 12;
            }
        }


        return diff2;
    }
}