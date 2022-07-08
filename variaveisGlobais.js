"use strict";

//arrays de dados

let impedimentosArray = []; // o grande array de impedimentos à homologação
let provasArray = []; //o grande array de provas
let provasUnicasArray = [] // o array de provas únicas

//let obstaculosArray = [];
let exigenciasArray = []; //array com todas as exigências
let periodosAutoDeclaradosArray = []; // array com todos os períodos autodeclarados
let blocosSeteAnosEMeio = []; //array com os blocos de sete anos e meio (vou elimina-lo mais adiante)

let vinculosUrbanos = [];
let vinculosRurais = [];

let beneficiosUrbanos = [];
let beneficiosRurais = [];

let atividadesUrbanas = [];
let atividadesRurais = [];

let empresasNoCPF = [];

let provasEmContrario = []; // eliminar futuramente

let segurosDesempregos = [];
let rgpTodos = [];

let impedimento_id = "";

let provasUteisAosPeriodos = [];
let blocosHomologadosNaPrimeiraEtapa = [];
let impedimentosQueFragmentaramPeriodos = [];


//
let impedimentostxt = "";


//dados diversos
let totalAutodeclarado = [];//na verdade é um objeto

let temVinculosPublicos = "";
let vinculoPublicoPendente = "";
let periodosPreviamentePositivados = [];
let teveVinculos = "";
let tevePositivado = "";
let teveBeneficios = "";
let teveAtividade = "";
let teveBase = "";
let teveSeguroDesemprego = "";
let teveEmpresa = "";

let entrada = "";

//dados do requerente
let nome = "";
let cpf = "";
let cpfComPontos = "";
let dataNascimento = "";
let idade = 0;
let nomeMae = "";
let nit = "";
let sexo = "";
let tipo = "";// pescador, rural, urbano, não sei


//dados do requerimento
let nb_presente = "";
let protocolo = "";
let servico = "";
let der = "";


// as variáveis abaixo devem ser ligadas aos arrays e se auto-atualizarem se o array tiver elementos ou não
let temAnexos = "nao";
let temAutodeclaracao = "nao";
let temVinculoUrbano = false;
let temBeneficiosUrbanos = false;
let temAtividadesUrbanas = false;
let temEmpresasNoCPF = false;
let temProvaContraria = false;
let temSeguroDesemprego = false;

//auxiliares de despacho
let isProvasSuficientes = "";
let motivoIndeferimento = "";
let motivoIndeferimento2 = "";
let oQueEstaErrado = "";
let oQueEstaErradoNoFormulario = "";

