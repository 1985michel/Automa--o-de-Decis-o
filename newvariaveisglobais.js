"use strict";


let impedimentosGerais = [];
let provasGerais = [];
let exigenciasGerais = [];
let periodosRuraisPreviamenteConfirmados = []; //tratam-se dos vínculos rurais ou períodos previamente positivados
let periodosAutoDeclarados = [];
let totalSugestaoDeHomologacao = [];
let totalPeriodosPreviamenteConfirmados = [];
let totalConsiderado = []; //[anos, meses, dias]


//variáveis de dados básicos
let entrada = "";
let protocolo = "";
let servico = "";
let der = "";
let nome = "";
let cpf = "";
let nit = "";
let dataNascimento = "";
let nomeMae = "";
let idade = "";
let sexo = "";
let nb_presente = "";

//Etapa 2 - vínculos públicos
let temVinculosPublicos = false;
let temVinculosRecolhimentos = false;
let temPeriodosPositivados = false;
let temBeneficios = false;
let temAtividades = false;
let atividadeAtiva = true;
let temBase = false;
let temDAP = false;
let temDefeso = false;
let temSala = false;
let temRGP = false;
let rgpAtivo = true;
let temSD = false;
let temEmpresa = false;
let empresaAtiva = true;
let categoriasTrabalhador = [];
let temAnexos = false;
let temAutodeclaracao = false;
let temDoc = false;

//sobre exigencias
let foramEmitidasExigencias = false;
let dataDeEmissaoDasExigencias = "";

//conclusao
let deferir = false;
let motivoIndeferimento1 = "";
let motivoIndeferimento2 = "";
let motivoIndeferimento3 = "";

let totalAutodeclarado = "";

let isDeferimentoAutomatico = false;


//para o despacho
let oQueEstaErradoNoFormulario = "";
let oQueEstaErradoDocsFeitosAsVesperas = "";
let dataCessao = "";


//Variaveis judiciais
let entradaPat = "";
let protocoloPat = "";
let servicoPat = "";
let numeroProcessoJudicial = "";
let nup = "";
let cpfDoTitular = "";
let nomeDoTitular = "";
let orgaoJulgadorPat = "";
let vara = ""
let varaCidade = ""
let varaEstado = ""

let entradaPJE1 = "";
let numeroProcessoPJE1 = "";
let orgaoJugadorPJE1 = "";
let nomePartePJE1 = "";

let todoPat = "";



