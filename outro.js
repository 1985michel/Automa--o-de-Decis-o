
function reprocessaProvas() {
    console.log("Temos: " + provasArray.length + "provas.");


    //provasUnicasArray = []

    for (let i = 0; i < provasArray.length; i++) {
        let jaTem = false;
        let posicao = 0;

        if (provasArray[0] instanceof Prova) { // só vamos filtrar se for um objeto do tipo documento (prova)
            for (let j = 0; j < provasUnicasArray.length; j++) {
                if (provasUnicasArray.length > 0) { //se o prova única não estiver vazio

                    if (provasArray[i].descricao === provasUnicasArray[j].descricao) {
                        jaTem = true;
                        posicao = j;
                        //continue;//quebre o for do J
                        //console.log(`A prova ${provasArray[i].descricao} já tem`);
                    }
                }

            }

            if (!jaTem) {// se ainda não tem, crie uma nova prova única e coloque na lista
                //console.log("linha 1003: vamos criar uma prova única");
                provasUnicasArray.push(new ProvaUnica(provasArray[i].descricao, provasArray[i].dataInicio));
                /*  console.log("LINHA 1005: DESCRIÇÃO: " + provasArray[i].descricao + " dATA: " + provasArray[i].dataInicio);
                 console.log("LINHA 1006: " + provasUnicasArray[0].descricao); */
            } else { // se ja tem, inclua somente a data na prova única já existente
                //console.log("linha 1005: vamos adicionar uma data em uma prova já existente");
                provasUnicasArray[posicao].addData(provasArray[i].dataInicio);
            }
        }
    }

    //vamos imprimir pra ver o que sai
    /*   console.log("Provas Únicas: " + provasUnicasArray.length);
      for (let i = 0; i < provasUnicasArray.length; i++) {
        console.log("Prova " + i)
        console.log(provasUnicasArray[i].descricao);
        for (let j = 0; j < provasUnicasArray[i].dataArray.length; j++) {
          console.log(provasUnicasArray[i].dataArray[j]);
        }
      } */

    //agora vou remover as provas que estiverem no provasArray e colocar as que estiverem no provasUnicas no lugar

    let filtrado = [];
    let tem = false;

    for (let i = 0; i < provasArray.length; i++) {
        tem = false;
        if (provasArray[i] instanceof Prova || provasArray[i] instanceof ProvaUnica) {
            for (let j = 0; j < provasUnicasArray.length; j++) {

                console.log(`Comparando ${provasArray[i].descricao}  com ${provasUnicasArray[j].descricao}`);

                if (provasArray[i].descricao == provasUnicasArray[j].descricao) {
                    tem = true;
                    console.log("são iguais!!!");
                } else {
                    console.log("são diferentes...");
                }

            }
            if (!tem) filtrado.push(provasArray[i]);
        } else if (!tem) { // se não for uma prova documental
            console.log("não entrou no primeiro IF");
            filtrado.push(provasArray[i]);
        }
    }

    provasArray = [...filtrado];



    //agora vou remover as provas simples que tem duplicada em prova única

    /*   for (let i = 0; i < provasArray.length; i++) {
        console.log(provasArray[i]);
        for (let j = 0; j < provasUnicasArray.length; j++) {
          if (provasArray[i].descricao === provasUnicasArray[j].descricao) {
            provasArray.splice(i);
          }
        }
      } */


    //agora vou adicionar as provas únicas no provasArray
    for (let j = 0; j < provasUnicasArray.length; j++) {
        provasArray.push(provasUnicasArray[j]);
    }



    //console.log("O PROVASaRRAY TEM " + provasArray.length + " provas");

    //agora vamos ver se de fato foram gravadas
    /*   for (let j = 0; j < provasArray.length; j++) {
        //se o prova única não estiver vazio
        console.log("Prova " + j)
        console.log(provasArray[j].descricao);
        for (let i = 0; i < provasArray[i].dataArray.length; i++) {
          console.log(provasArray[j].dataArray[i]);
        }
      } */

    reapresentaProvas();
}
