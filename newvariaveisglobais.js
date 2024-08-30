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


const estados = [
    { "codigo": 24, "sigla": "AC", "nome": "acre" },
    { "codigo": 2, "sigla": "AL", "nome": "alagoas" },
    { "codigo": 3, "sigla": "AM", "nome": "amazonas" },
    { "codigo": 25, "sigla": "AP", "nome": "amapa" },
    { "codigo": 4, "sigla": "BA", "nome": "bahia" },
    { "codigo": 5, "sigla": "CE", "nome": "ceara" },
    { "codigo": 23, "sigla": "DF", "nome": "distrito federal" },
    { "codigo": 7, "sigla": "ES", "nome": "espirito santo" },
    { "codigo": 8, "sigla": "GO", "nome": "goias" },
    { "codigo": 9, "sigla": "MA", "nome": "maranhao" },
    { "codigo": 11, "sigla": "MG", "nome": "minas gerais" },
    { "codigo": 6, "sigla": "MS", "nome": "mato grosso do sul" },
    { "codigo": 10, "sigla": "MT", "nome": "mato grosso" },
    { "codigo": 12, "sigla": "PA", "nome": "para" },
    { "codigo": 13, "sigla": "PB", "nome": "paraiba" },
    { "codigo": 15, "sigla": "PE", "nome": "pernambuco" },
    { "codigo": 16, "sigla": "PI", "nome": "piaui" },
    { "codigo": 14, "sigla": "PR", "nome": "parana" },
    { "codigo": 17, "sigla": "RJ", "nome": "rio de janeiro" },
    { "codigo": 18, "sigla": "RN", "nome": "rio grande do norte" },
    { "codigo": 26, "sigla": "RO", "nome": "rondonia" },
    { "codigo": 27, "sigla": "RR", "nome": "roraima" },
    { "codigo": 19, "sigla": "RS", "nome": "rio grande do sul" },
    { "codigo": 21, "sigla": "SC", "nome": "santa catarina" },
    { "codigo": 22, "sigla": "SE", "nome": "sergipe" },
    { "codigo": 28, "sigla": "TO", "nome": "tocantins" }
]

const cidadesGoias = [
    "abadia de goias", "abadiania", "acreuna", "adelandia", "agua fria de goias", "agua limpa", "aguas lindas de goias", "alexania", "aloandia", "alto horizonte", "alto paraiso de goias", "alvorada do norte", "amaralina", "americano do brasil", "amorinopolis", "anapolis", "anhanguera", "anicuns", "aparecida de goiania", "aparecida do rio doce", "apore", "aracu", "aragarcas", "aragoiania", "araguapaz", "arenopolis", "aruana", "aurilandia", "avelinopolis", "baliza", "barro alto", "bela vista de goias", "bom jardim de goias", "bom jesus de goias", "bonfinopolis", "bonopolis", "brazabrantes", "britania", "buriti alegre", "buriti de goias", "buritinopolis", "cabeceiras", "cachoeira alta", "cachoeira de goias", "cachoeira dourada", "cacu", "caiaponia", "caldas novas", "caldazinha", "campestre de goias", "campinacu", "campinorte", "campo alegre de goias", "campo limpo de goias", "campos belos", "campos verdes", "carmo do rio verde", "castelandia", "catalao", "caturai", "cavalcante", "ceres", "cezarina", "chapadao do ceu", "cidade de goias", "cidade ocidental", "cocalzinho de goias", "colinas do sul", "corrego do ouro", "corumba de goias", "corumbaiba", "cristalina", "cristianopolis", "crixas", "crominia", "cumari", "damianopolis", "damolandia", "davinopolis", "diorama", "divinopolis de goias", "doverlandia", "edealina", "edeia", "estrela do norte", "faina", "fazenda nova", "firminopolis", "flores de goias", "formosa", "formoso", "gameleira de goias", "goianapolis", "goiandira", "goianesia", "goiania", "goianira", "goias", "goiatuba", "gouvelandia", "guapo", "guaraita", "guarani de goias", "guarinos", "heitorai", "hidrolandia", "hidrolina", "iaciara", "inaciolandia", "indiara", "inhumas", "ipameri", "ipiranga de goias", "ipora", "israelandia", "itaberai", "itaguari", "itaguaru", "itaja", "itapaci", "itapirapua", "itapuranga", "itaruma", "itaucu", "itumbiara", "ivolandia", "jandaia", "jaragua", "jatai", "jaupaci", "jesupolis", "joviania", "jussara", "lagoa santa", "leopoldo de bulhoes", "luziania", "mairipotaba", "mambai", "mara rosa", "marzagao", "matrincha", "maurilandia", "mimoso de goias", "minacu", "mineiros", "moipora", "monte alegre de goias", "montes claros de goias", "montividiu", "montividiu do norte", "morrinhos", "morro agudo de goias", "mossamedes", "mozarlandia", "mundo novo", "mutunopolis", "nazario", "neropolis", "niquelandia", "nova america", "nova aurora", "nova crixas", "nova gloria", "nova iguacu de goias", "nova roma", "nova veneza", "novo brasil", "novo gama", "novo planalto", "orizona", "ouro verde de goias", "ouvidor", "padre bernardo", "palestina de goias", "palmeiras de goias", "palmelo", "palminopolis", "panama", "paranaiguara", "parauna", "perolandia", "petrolina de goias", "pilar de goias", "piracanjuba", "piranhas", "pirenopolis", "pires do rio", "planaltina", "pontalina", "porangatu", "porteirao", "portelandia", "posse", "professor jamil", "quirinopolis", "rialma", "rianapolis", "rio quente", "rio verde", "rubiataba", "sanclerlandia", "santa barbara de goias", "santa cruz de goias", "santa fe de goias", "santa helena de goias", "santa isabel", "santa rita do araguaia", "santa rita do novo destino", "santa rosa de goias", "santa tereza de goias", "santa terezinha de goias", "santo antonio da barra", "santo antonio de goias", "santo antonio do descoberto", "sao domingos", "sao francisco de goias", "sao joao da parauna", "sao joao d alianca", "sao luis de montes belos", "sao luiz do norte", "sao miguel do araguaia", "sao miguel do passa quatro", "sao patricio", "sao simao", "senador canedo", "serranopolis", "silvania", "simolandia", "sitio d abadia", "taquaral de goias", "teresina de goias", "terezopolis de goias", "tres ranchos", "trindade", "trombas", "turvania", "turvelandia", "uirapuru", "uruacu", "uruana", "urutai", "valparaiso de goias", "varjao", "vianopolis", "vicentinopolis", "vila boa", "vila propicio"
];

const cidadesAcre = [
    "acrelandia", "assis brasil", "brasileia", "bujari", "capixaba", "cruzeiro do sul", "epitaciolandia", "feijo", "jordao", "mancio lima", "manoel urbano", "marechal thaumaturgo",
    "placido de castro", "porto acre", "porto walter", "rio branco", "rodriques alves", "santa rosa do purus", "senador guiomard", "tarauaca", "xapuri"
];
const cidadesAmazonas = [
    "alvaraes", "amatura", "anama", "anori", "apui", "atalaia do norte", "autazes", "barcelos", "barreirinha", "benjamin constant", "beruri", "boa vista do ramos",
    "boca do acre", "borba", "caapiranga", "canutama", "carauari", "careiro", "careiro da varzea", "coari", "codajas", "eirunepe", "envira", "fonte boa",
    "guajara", "humaita", "ipixuna", "iranduba", "itacoatiara", "itamarati", "itapiranga", "japura", "jurua", "jutai", "labrea", "manacapuru", "manaquiri",
    "manaus", "manicore", "maraa", "maues", "nhamunda", "nova olinda do norte", "novo airao", "novo aripuana", "parintins", "pauini", "presidente figueiredo",
    "rio preto da eva", "santa isabel do rio negro", "santo antonio do icare", "sao gabriel da cachoeira", "sao paulo de olivenca", "sao sebastiao do uatuma",
    "silves", "tabatinga", "tapaua", "tefe", "tonantins", "uaua", "urucara",
    "urucurituba"
];
const cidadesTocantins = [
    "abadia de tocantins", "agua branca do tocantins", "aguiarnopolis", "almas", "alvorada", "ananas", "angico", "aparecida do rio negro", "aruana", "augustinopolis",
    "aurora do tocantins", "axixa do tocantins", "babaçulandia", "barrolandia", "bernardo sayao", "bomberl", "brejinho de nazare", "buriti do tocantins",
    "cachoeirinha", "campos lindos", "cariri do tocantins", "carmolandia", "carrasco bonito", "caseara", "centenario", "chapada da natividade",
    "chapada de areia", "colinas do tocantins", "colmeia", "combinado", "conceicao do tocantins", "cormago", "cristalandia", "crixa do tocantins",
    "darcinopolis", "diadema", "dois irmaos do tocantins", "dourado do tocantins", "fatima", "figueiropolis", "filadelfia", "formoso do araguaia", "fortaleza do tabocao",
    "goianorte", "goiatins", "guarai", "gurupi", "ipueiras", "itacaja", "itaguatins", "iticunha", "lajeado", "lagoa da confusao", "lagoa do tocantins", "lajeado",
    "luzinopolis", "lizarda", "mambucaba", "map", "mateiros", "maurilandia do tocantins", "miracema do tocantins", "mirandopolis", "miranorte", "monte do carmo",
    "monte santo do tocantins", "nova olinda", "nova rosalandia", "novo acordo", "novo alegre", "novo jardim", "oliveira de fatima", "palmeirais", "palmeiras do tocantins",
    "palmeirante", "palmas", "paraiso do tocantins", "pau d'arco", "pedro afonso", "peixe", "petrolina do tocantins", "pindorama do tocantins", "piraque",
    "piteiras", "ponte alta do bom jesus", "ponte alta do tocantins", "porto alegre do tocantins", "porto nacional", "presidente kennedy", "pronciano", "recursolandia",
    "ribeirao grande", "riacho de santana", "rio da conceicao", "rio dos bois", "rio sono", "sampaio", "sandrina", "santa fe do tocantins", "santa maria do tocantins",
    "santa rita do tocantins", "santa rosa do tocantins", "santa teresinha do tocantins", "santa terezinha do tocantins", "santo amaro", "santo antonio de palmas",
    "santo antonio do toque", "sao bento do tocantins", "sao felix do tocantins", "sao miguel do tocantins", "sao salvador do tocantins", "sao sebastiao do tocantins",
    "sao valerio da natividade", "silvanopolis", "sitio novo do tocantins", "sombrio", "sucupira", "taguatinga", "taipas do tocantins", "talismã", "tocantinopolis", "tocantinia", "vanderlandia", "wanderlandia",
    "xambioa"
];
const cidadesMatoGrosso = [
    "acorizal", "agua boa", "alta floresta", "alto araguaia", "alto boa vista", "alto garcas", "alto paraguai", "alto taquari", "apiacas", "araguaiana",
    "araguainha", "arapatanga", "arenapolis", "aripuana", "barra do bugres", "barra do garcas", "bom jesus do araguaia", "brasilandia do sul", "campinapolis", "caceres",
    "campo novo do parecis", "campo verde", "campos de julio", "canabrava do norte", "canarana", "carlinda", "castanheira", "chapada dos guimaraes", "claudia",
    "cocalinho", "colider", "comodoro", "confresa", "conquista d'oeste", "cotrigacu", "cuiaba", "curvelandia", "denise", "diamantino", "dom aquino",
    "faval", "feliz natal", "figueiropolis d'oeste", "gaúcha do norte", "general carneiro", "gloria d'oeste", "guaranta do norte", "guiratinga",
    "indiavai", "ipiranga do norte", "itabaporã", "itamacora", "itauba", "itororo", "jacare", "jacobina", "jaciara", "jangada", "juara", "juina", "juruena", "juscimeira", "juventude", "lucas do rio verde", "luciara", "marcelândia", "matupa", "mirassol d'oeste", "nobres", "nortelandia",
    "nossa senhora do livramento", "nova bandeirantes", "nova brasilandia", "nova canaa do norte", "nova guarita", "nova lacerda", "nova marilandia",
    "nova maringa", "nova monte verde", "nova mutum", "nova nazare", "nova olimpiade", "nova santa helena", "nova ubirata", "nova xavantina", "novo horizonte do norte",
    "novo mundo", "novo santo antonio", "novo sao joaquim", "paranaita", "paranatinga", "pedra preta", "peixoto de azevedo", "planalto da serra",
    "pocone", "ponte branca", "pontes e lacerda", "porto alegre do norte", "porto dos gauchos", "porto esperidião", "porto estante", "porto velasco",
    "pouso alegre", "primavera do leste", "querencia", "reserva do cabacal", "ribeirao cascalheira", "ribeiraozinho", "rio branco", "rosario oeste", "rondonopolis",
    "salto do ceu", "santa carmen", "santa cruz do xingu", "santa rita do trivelato", "santa terezinha", "santo afonso", "santo antonio do leverger", "sao felix do araguaia",
    "sapezal", "serra nova dourada", "sinop", "sorriso", "tabapora", "tangara da serra", "tapurah", "terra nova do norte", "tesouro", "torixoreu", "uniao do sul",
    "vale de sao domingos", "varzea grande", "vera", "vila bela da santissima trindade", "vila rica"];
const cidadesRoraima = ["boa vista", "bonfim", "caracarai", "caroebe", "iracema", "mucajai", "normandia", "roraima", "sao joao da baliza",
    "sao joao da lingua", "sao luiz", "sao severo", "santa rita", "santa teresa"];

const cidadesRondonia = ["ariquemes", "buritis", "cacoal", "candeias do jamari", "canoas", "cidade negra", "cujubim", "diamantina", "espigao do oeste", "espigao d'oeste", "extrema", "jaru", "jirau",
    "machadinho doeste", "nacional", "nova brasilandia", "nova mamore", "nova monte verde", "porto velho", "presidente medici", "rio preto doeste",
    "rolim de moura", "santa luzia", "santo antonio", "sao francisco do guapore", "vila bela da santissima trindade", "vilhena"];

const cidadesMatoGrossoDoSul = ["agua clara", "alcinopolis", "amambai", "anastacio", "anhembi", "antonio joao", "aparecida do taboado", "bandeirantes", "bataguassu", "bataypora", "bela vista", "bodoquena", "bonito", "campo grande", "caracol", "cassilandia", "chapadao do sul", "corumba",
    "dourados", "gloria de dourados", "iguatemi", "inocencia", "itapora", "itapora", "jardim", "juti", "ladario", "laguna carapa", "maracaju", "mara rosa",
    "mundo novo", "navirai", "novo horizonte do sul", "paranaiba", "paraguay", "pedro gimenez", "porto murtinho", "ribas do rio pardo",
    "rio verde de mato grosso", "roxim", "selviria", "sonora", "terenos", "tres lagoas", "vicentina"];
const cidadesPara = ["abaetetuba", "abel figueiredo", "acailandia", "aflitos", "agua azul do norte", "alenquer", "algodoal", "almeirim",
    "alta floresta do para", "altamira", "anajas", "anapu", "ananindeua", "augusto correa", "aurora do para", "bagre", "baiao", "bannach", "barcarena", "belem", "belterra",
    "brazilia", "breves", "bucaina", "canaa dos carajas", "capanema", "capitao poco", "castanhal", "chapada", "colares", "conceicao do araguaia", "curionopolis",
    "curuca", "dom elizeu", "eldorado dos carajas", "estoril", "faro", "floresta do araguaia", "garrafa do norte", "goianesia do para", "iguacara", "inhangapi",
    "itaituba", "itaiteua", "jacareacanga", "japara", "jatuarana", "joana", "junior", "juruti", "maraba", "marapanim", "marituba", "mediana", "melgaco", "moju",
    "mojui dos campos", "murinin", "nova esperanca do piranha", "nova iorque", "nova sobradinho", "novo repartimento", "obidos", "obriga", "ocara", "oriximina", "ourex", "pacaja",
    "paragominas", "parauapebas", "para", "pau d'arco", "peixe boi", "pedro do campo", "prainha", "prainha do sul", "remansao", "rioclaro", "ruropolis", "salinopolis",
    "santa cruz do arari", "santa izabel do para", "santa luzia do para", "santa maria", "santa maria das barcas", "santa teresa", "santarem", "santarem novo",
    "santo antonio do taua", "sao caetano de odivelas", "sao felix do xingu", "sao francisco do para", "sao joao do araguaia", "sao joao do pacifico", "sao luiz do tapajos",
    "sao miguel do guapore", "sao sebastiao da boa vista", "soure", "tailandia", "tapura", "tucurui", "ulianopolis", "umbau", "unidade", "utai", "vila do conde", "vila rica",
    "xinguara"];
const cidadesAmapa = ["amacuro", "acua", "brasil novo", "calcoene", "cambui", "capanema", "cutias", "derli", "ferreira gomes", "itara", "lagoa do rape", "lagoa do mato",
    "lajeado", "laranjal do jari", "macapa", "mazagao", "oiapoque", "portos", "santa luzia do amapa", "santana", "serra do navio", "tartarugalzinho"];

