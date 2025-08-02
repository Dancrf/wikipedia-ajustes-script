/* Créditos as ferramenta de ajustes e traduções em referências (Script de ajustes) aos autores abaixo
    /* Autores: User:Luizdl, User:Dbastro e User:Leone Melo */
/* Editado para traduzir termos católicos */

mw.loader.using('mediawiki.storage').then(function () {
    mw.storage.session.set('client-error-opt-out', '1');
});

novoEditor = mw.user.options.get('visualeditor-newwikitext') == '1';

var mesesEn = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december', 'summer', 'spring', 'fall', 'autumn', 'winter'];
var mesesabbrEn = ['jan\\.?', 'feb\\.?', 'mar\\.?', 'apr\\.?', 'may\\.?', 'jun\\.?', 'jul\\.?', 'aug\\.?', 'sep\\.?', 'oct\\.?', 'nov\\.?', 'dec\\.?', 'summer', 'spring', 'fall', 'autumn', 'winter'];
var mesesTrad = ['(?:january\\|enero\\|janvier\\|gennaio\\|xaneiro)', '(?:february\\|février\\|febrero\\|febbraio\\|febreiro)', '(?:march\\|marzo\\|mars)', '(?:april\\|avril\\|aprile)', '(?:may\\|mayo\\|mai\\|maggio)', '(?:june\\|junio\\|juin\\|giugno\\|xuño)', '(?:july\\|julio\\|juillet\\|luglio\\|xullo)', '(?:august\\|août)', '(?:september\\|septiembre\\|septembre\\|settembre)', '(?:october\\|oct[uo]bre\\|ottobre)', '(?:november\\|noviembre\\|novembre)', '(?:december\\|diciembre\\|décembre\\|decembro)', '(?:summer\\|verano\\|été)', '(?:spring\\|printemps)', '(?:fall\\|autumn\\|automne\\|otôno)', '(?:winter\\|invierno\\|hiver)'];
var mesesPt = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro', 'verão', 'primavera', 'outono', 'outono', 'inverno'];
var mesesisoPt = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', 'verão', 'primavera', 'outono', 'outono', 'inverno'];
var mesesabbrPt = ['jan\\.?', 'fev\\.?', 'mar\\.?', 'abr\\.?', 'mai\\.?', 'jun.?', 'jul.\\?', 'ago.\\?', 'set\\.?', 'out\\.?', 'nov\\.?', 'dez\\.?', 'verão', 'primavera', 'outono', 'inverno'];

function tradMes(mes) {
    for (var i = 0; i < mesesEn.length; i++) {
        if (mes.toLocaleLowerCase() == mesesEn[i]
            || mes.toLocaleLowerCase() == mesesEn[i].substring(0, 3))
            return mesesPt[i];
        else if (mes.toLocaleLowerCase() == mesesabbrEn[i]
            || mes.toLocaleLowerCase() == mesesabbrEn[i].substring(0, 3))
            return mesesPt[i];
        else if (mes.toLocaleLowerCase() == mesesPt[i])
            return mesesPt[i];
        else if (mes.toLocaleLowerCase() == mesesabbrPt[i])
            return mesesPt[i];
        else if (mes.toLocaleLowerCase() == 'marco')
            return 'março';
    }
    return 'falhou';
}

function tradisoMes(mes) {
    for (var i = 0; i < mesesEn.length; i++) {
        if (mes.toLocaleLowerCase() == mesesEn[i]
            || mes.toLocaleLowerCase() == mesesEn[i].substring(0, 3))
            return mesesisoPt[i];
        else if (mes.toLocaleLowerCase() == mesesPt[i])
            return mesesisoPt[i];
        else if (mes.toLocaleLowerCase() == 'marco')
            return '03';
    }
    return 'falhou';
}

//datas
var cvGrauO = "([^\\|\\}]*°[^\\|\\}]*[\\|\\}])",
    diaMesInv = "\\s*\\d\\d?\\s*d?e?\\s*[A-Za-zç]+\\s*\\.?(\\s*\\||\\})",
    AnoInv = "\\s*\\[?\\[?\\d+\\]?\\]?\\s*\\.?",
    diaMesAno = "\\s*(\\d+(?:[–\\-\\/]\\d+|))\\s+([A-Za-zç]+)\\s+(\\d\\d\\d\\d?)\\.?",
    linkDiaMesAno = "\\s*\\[\\[(\\d\\d(?:[–\\-\\/]\\d+|))\\s+de\\s+([A-Za-zç]+)\\]\\]\\s+de\\s+\\[?\\[?(\\d+)\\]?\\]?\\.?",
    _0linkDiaMesAno = "\\s*\\[\\[0?(\\d(?:[–\\-\\/]\\d+|))\\s+de\\s+([A-Za-zç]+)\\]\\]\\s+de\\s+\\[?\\[?(\\d+)\\]?\\]?\\.?",
    linkData = "\\s*\\[\\[(\\d+)\\]\\]",
    mesDiaAno = "\\s*([A-Za-zç]+)\\s+(\\d\\d(?:[–\\-\\/]|)),?\\s+(\\d\\d\\d\\d?)",
    _0mesDiaAno = "\\s*([A-Za-zç]+)\\s+(\\d(?:[–\\-\\/]|)),?\\s+(\\d\\d\\d\\d?)",
    mesAno = "(\\s*[A-Za-zç\\.]+)[\/, ]+(\\d\\d\\d\\d?)",
    Anomes = "(\\d\\d\\d\\d?)[\/, ]+(\\s*[A-Za-zç\\.]+)",
    mesMesAno = "(\\s*[A-Za-zç\\.]+)\\s*[–\\-\\/]\\s*([A-Za-zç\\.]+),?\\s*d?e?\\s+(\\d\\d\\d\\d?)",
    nAnoMes = "\\s*(\\d\\d\\d\\d?)[\\-\\/\\.](\\d\\d?)(\\s*\\||\\})",
    nMesAno = "\\s*(\\d\\d?)[\\-\\/\\.](\\d\\d\\d\\d?)(\\s*\\||\\})",
    sAnoMesDia = "(\\s*\\d\\d\\d\\d?)[\\-\\/]([A-Za-z]+)[\\-\\/](\\d\\d?)\\s*\\.?(\\s*(?:\\||\\}))",
    ssAnoMesDia = "(\\s*\\d\\d\\d\\d?)[\\-\\/\\.](\\d\\d?)[\\-\\/\\.](\\d)\\s*\\.?(\\s*(?:\\||\\}))",
    sDiaMesAno = "\\s*(\\d\\d?)[\\-\\/\\s]([A-Za-z]+)[\\-\\/\\s]\\,?\\.?(\\d\\d\\d\\d?)[\\.\\-]?(\\s*(?:\\||\\}))",
    ssDiaMesAno = "(\\s*\\d\\d)\\s([\\-\\/\\s])\\.?\\s*(\\d\\d)\\s*([\\-\\/\\s])\\.?\\s*(\\d\\d\\d\\d)\\.?(\\s*(?:\\||\\}))",
    _00ssDiaMesAno = "\\s*(\\d)\\s*([\\-\\/])\\.?\\s*(\\d)\\s*([\\-\\/])\\.?\\s*(\\d\\d\\d\\d)\\.?(\\s*(?:\\||\\}))",
    _0ssDiaMesAno = "(\\s*\\d\\s*\\d)\\s*([\\-\\/])\\.?\\s*(\\d)\\s*([\\-\\/])\\.?\\s*(\\d\\d\\d\\d)\\.?(\\s*(?:\\||\\}))",
    ddDiaMesAno = "(\\=?\\s*[1-3]\\d+)\\s*[de]e*\\s*([A-Za-zç]+)\\s*[de]e*\\s*(\\d\\d\\d\\d)\\d?[\\.\\,\\-]",
    _0ddDiaMesAno = "(\\=?\\s*)0\\s*(\\d(?:[–\\-\\/\\.]\\d+|))\\s*[de]e*\\.?\\s*([A-Za-zç]+)(?:[–\\-\\/\\.]\\d+|)\\s*[de]e*\\.?\\s*(\\d\\d\\d\\d?)[\\d\\.\\-]?",
    diaMesVAno = "\\s*\\[?\\[?(\\d\\d(?:[–\\-\\/]\\d\\d?|))\\s+de\\s+([A-Za-zç]+)\\]?\\]?,?\\s+\\[?\\[?(\\d\\d\\d\\d?)\\]?\\]?\\.?",
    _0diaMesVAno = "\\s*\\[?\\[?0?(\\d(?:[–\\-\\/]\\d\\d?|))\\s+de\\s+([A-Za-zç]+)\\]?\\]?,?\\s+\\[?\\[?(\\d\\d\\d\\d?)\\]?\\]?\\.?",
    prData = "\\s*\\{\\{\\s*(?:[Ss]tart date|[Dd]ata|[Dd]ata de início)\\s*\\|\\s*(\\d\\d\\d\\d?)\\s*\\|\\s*(\\d\\d?)\\s*\\|\\s*(\\d\\d?)[^\{\}]*\\}\\}\\.?",
    prDataExt = "\\s*\\{\\{[Dd]a?ta?[Eel][ix][tn]k?\\s*\\|\\s*(\\d\\d?)\\s*\\|\\s*(\\d\\d?)\\s*\\|\\s*(\\d\\d\\d\\d?)[^\{\}]*\\}\\}\\.?",
    prAcesso = "\\s*\\[?\\[?(?:\\d\\d\\d\\d\\.?|[A-Za-zç]+\\s*\\d\\d\\d\\d\\.?|[A-Za-zç]+\\s*de\s*\\d\\d\\d\\d\\.?)\\]?\\]?",
    marco = "s*((:?\\d\\d?(?:[–\\-\\/]\\d\\d?|)[\\.º]?[º]?\\s+de\\s+|)[Mm]arco\\s+de\\s+\\d\\d\\d\\d?)\\.?";

//parâmetros
var data = "\\|\\s*(?:dat[ea]|year|a[ñn]o)\\s*=",
    transmissao = "\\|\\s*(?:transmissão|air\\-?date)\\s*=",
    acessodata = "\\|\\s*(?:acc?esso?\\-?dat[ea]|acc?essadoem)\\s*=",
    publicacao = "\\|\\s*(?:publication\\-?date|data\\-publica[cç][aã]o)\\s*=",
    ptdata = "\\|\\s*(?:data|acesso\\-?data|acessadoem|arquivo\\-?data)\\s*=",
    arquivodata = "\\|\\s*ar[cq][hu]iv[eo]\\-?dat[ea]\\s*=";
function rDatas(alt, padrao) {
    if (alt.match(/falhou/)) return padrao;
    else return alt;
}
function rdata(alt, padrao) {
    return rDatas('|data=' + alt, padrao);
}
function rtransmissao(alt, padrao) {
    return rDatas('|transmissão=' + alt, padrao);
}
function racessodata(alt, padrao) {
    return rDatas('|acessodata=' + alt, padrao);
}
function rpublicacao(alt, padrao) {
    return rDatas('|data-publicação=' + alt, padrao);
}
function rarquivodata(alt, padrao) {
    return rDatas('|arquivodata=' + alt, padrao);
}

citacoes = {
    datas: {
        cond: [
            /*{ reg: /\|\s*data\s*=\s*(\d+)\s*\|\s*ano\s*=\s*(\d+)\s*\|\s*mes=(\d+)/, subs: function(achou){
                if (mesesPt[achou[3]-1])
                    return rdata(achou[1] + ' de ' + mesesPt[achou[3]-1] + ' de ' + achou[2], achou[0]);
                else return achou[0];
            } },*/
            {
                reg: /\|\s*(?:ano|year)\s*=\s*((:?\d\d?[\.º°]?[º°]?\s+de\s+|)[A-Za-zç]+\s+de\s+\d\d\d\d?)/, subs: function (achou) {
                    return rdata(achou[1], achou[0]);
                }
            }, { // remover colchete
                reg: /\|\s*(?:ano|year)\s*=\s*[\[\]\(]+(\d\d\d\d?)[\[\]\(]+/, subs: function (achou) {
                    return '|ano=' + achou[1];
                }
            }, {
                reg: /\|\s*(?:ano|year)\s*=\s*(\d\d?\d?\d?-\d\d?-\d\d?\d?\d?)/, subs: function (achou) {
                    return '|data=' + achou[1];
                }
            }, {
                reg: new RegExp(data + cvGrauO), subs: function (achou) {
                    return rdata(achou[1].replace('°', 'º'), achou[0]);
                }
            }, {
                reg: new RegExp(data + marco), subs: function (achou) {
                    return rdata(achou[1].replace(/[Mm]arco/, 'março'), achou[0]);
                }
            }, {
                reg: new RegExp(data + diaMesAno), subs: function (achou) {
                    return rdata(achou[1].replace(/[\-\/]/, '–') + ' de ' + tradMes(achou[2]) + ' de ' + achou[3], achou[0]);
                }
            }, {
                reg: new RegExp(data + linkData), subs: function (achou) {
                    return rdata(achou[1]);
                }
            }, {
                reg: new RegExp(data + linkDiaMesAno), subs: function (achou) {
                    return rdata(achou[1].replace(/[\-\/]/, '–') + ' de ' + tradMes(achou[2]) + ' de ' + achou[3], achou[0]);
                }
            }, {
                reg: new RegExp(data + _0linkDiaMesAno), subs: function (achou) {
                    return rdata(achou[1].replace(/[\-\/]/, '–') + ' de ' + tradMes(achou[2]) + ' de ' + achou[3], achou[0]);
                }
            }, {
                reg: new RegExp(data + mesDiaAno), subs: function (achou) {
                    return rdata(achou[2].replace(/[\-\/]/, '–') + ' de ' + tradMes(achou[1]) + ' de ' + achou[3], achou[0]);
                }
            }, {
                reg: new RegExp(data + _0mesDiaAno), subs: function (achou) {
                    return rdata(achou[2].replace(/[\-\/]/, '–') + ' de ' + tradMes(achou[1]) + ' de ' + achou[3], achou[0]);
                }
            }, {
                reg: new RegExp(data + mesAno), subs: function (achou) {
                    return rdata(tradMes(achou[1]) + ' de ' + achou[2], achou[0]);
                }
            }, {
                reg: new RegExp(data + Anomes), subs: function (achou) {
                    return rdata(tradMes(achou[2]) + ' de ' + achou[1], achou[0]);
                }
            }, {
                reg: new RegExp(data + mesMesAno), subs: function (achou) {
                    return rdata(tradMes(achou[1]) + '–' + tradMes(achou[2]) + ' de ' + achou[3], achou[0]);
                }
            }, {
                reg: new RegExp(data + nAnoMes), subs: function (achou) {
                    if (mesesPt[achou[2] - 1])
                        return rdata(mesesPt[achou[2] - 1] + ' de ' + achou[1] + achou[3], achou[0]);
                    else return achou[0];
                }
            }, {
                reg: new RegExp(data + nMesAno), subs: function (achou) {
                    if (mesesPt[achou[1] - 1])
                        return rdata(mesesPt[achou[1] - 1] + ' de ' + achou[2] + achou[3], achou[0]);
                    else return achou[0];
                }
            }, {
                reg: new RegExp(data + sAnoMesDia), subs: function (achou) {
                    return rdata(achou[3] + ' de ' + tradMes(achou[2]) + ' de ' + achou[1] + achou[4], achou[0]);
                }
            }, {
                reg: new RegExp(data + ssAnoMesDia), subs: function (achou) {
                    return rdata(achou[3] + ' de ' + tradMes(achou[2]) + ' de ' + achou[1] + achou[4], achou[0]);
                }
            }, {
                reg: new RegExp(data + sDiaMesAno), subs: function (achou) {
                    return rdata(achou[1] + ' de ' + tradMes(achou[2]) + ' de ' + achou[3] + achou[4], achou[0]);
                }
            }, {
                reg: new RegExp(data + ssDiaMesAno), subs: function (achou) {
                    return rdata(achou[1] + achou[2] + achou[3] + achou[4] + achou[5] + achou[6], achou[0]);
                }
            }, {
                reg: new RegExp(data + _00ssDiaMesAno), subs: function (achou) {
                    return rdata(' 0' + achou[1] + achou[2] + '0' + achou[3] + achou[4] + achou[5] + achou[6], achou[0]);
                }
            }, {
                reg: new RegExp(data + _0ssDiaMesAno), subs: function (achou) {
                    return rdata(achou[1] + achou[2] + '0' + achou[3] + achou[4] + achou[5] + achou[6], achou[0]);
                }
            }, {
                reg: new RegExp(data + ddDiaMesAno), subs: function (achou) {
                    return rdata(achou[1] + ' de ' + tradMes(achou[2]) + ' de ' + achou[3], achou[0]);
                }
            }, {
                reg: new RegExp(data + _0ddDiaMesAno), subs: function (achou) {
                    return rdata(achou[1] + achou[2] + ' de ' + tradMes(achou[3]) + ' de ' + achou[4], achou[0]);
                }
            }, {
                reg: new RegExp(data + diaMesVAno), subs: function (achou) {
                    return rdata(achou[1] + ' de ' + tradMes(achou[2]) + ' de ' + achou[3], achou[0]);
                }
            }, {
                reg: new RegExp(data + _0diaMesVAno), subs: function (achou) {
                    return rdata(achou[1] + ' de ' + tradMes(achou[2]) + ' de ' + achou[3], achou[0]);
                }
            }, {
                reg: new RegExp(data + prData), subs: function (achou) {
                    return rdata(achou[3] + '-' + mesesisoPt[achou[2] - 1] + '-' + achou[1], achou[0]);
                }
            }, {
                reg: new RegExp(data + prDataExt), subs: function (achou) {
                    return rdata(achou[1] + '-' + mesesisoPt[achou[2] - 1] + '-' + achou[3], achou[0]);
                }
            }, {
                reg: new RegExp(transmissao + prDataExt), subs: function (achou) {
                    return rtransmissao(achou[1] + '-' + mesesisoPt[achou[2] - 1] + '-' + achou[3], achou[0]);
                }
            }, {
                reg: new RegExp(transmissao + mesDiaAno), subs: function (achou) {
                    return rtransmissao(achou[2].replace(/[\-\/]/, '–') + ' de ' + tradMes(achou[1]) + ' de ' + achou[3], achou[0]);
                }
            }, {
                reg: new RegExp(transmissao + _0mesDiaAno), subs: function (achou) {
                    return rtransmissao(achou[2].replace(/[\-\/]/, '–') + ' de ' + tradMes(achou[1]) + ' de ' + achou[3], achou[0]);
                }
            }, {
                reg: new RegExp(acessodata + cvGrauO), subs: function (achou) {
                    return racessodata(achou[1].replace('°', 'º'), achou[0]);
                }
            }, {
                reg: new RegExp(acessodata + diaMesAno), subs: function (achou) {
                    return racessodata(achou[1] + ' de ' + tradMes(achou[2]) + ' de ' + achou[3], achou[0]);
                }
            }, {
                reg: new RegExp(acessodata + mesDiaAno), subs: function (achou) {
                    return racessodata(achou[2] + ' de ' + tradMes(achou[1]) + ' de ' + achou[3], achou[0]);
                }
            }, {
                reg: new RegExp(acessodata + _0mesDiaAno), subs: function (achou) {
                    return racessodata(achou[2].replace(/[\-\/]/, '–') + ' de ' + tradMes(achou[1]) + ' de ' + achou[3], achou[0]);
                }
            }, {
                reg: new RegExp(acessodata + linkDiaMesAno), subs: function (achou) {
                    return racessodata(achou[1] + ' de ' + tradMes(achou[2]) + ' de ' + achou[3], achou[0]);
                }
            }, {
                reg: new RegExp(acessodata + _0linkDiaMesAno), subs: function (achou) {
                    return racessodata('0' + achou[1] + ' de ' + tradMes(achou[2]) + ' de ' + achou[3], achou[0]);
                }
            }, {
                reg: new RegExp(acessodata + prData), subs: function (achou) {
                    return racessodata(achou[3] + '-' + mesesisoPt[achou[2] - 1] + '-' + achou[1], achou[0]);
                }
            }, {
                reg: new RegExp(acessodata + prDataExt), subs: function (achou) {
                    return racessodata(achou[1] + '-' + mesesisoPt[achou[2] - 1] + '-' + achou[3], achou[0]);
                }
            }, {
                reg: new RegExp(acessodata + diaMesVAno), subs: function (achou) {
                    return racessodata(achou[1] + ' de ' + tradMes(achou[2]) + ' de ' + achou[3], achou[0]);
                }
            }, {
                reg: new RegExp(acessodata + _0diaMesVAno), subs: function (achou) {
                    return racessodata('0' + achou[1] + ' de ' + tradMes(achou[2]) + ' de ' + achou[3], achou[0]);
                }
            }, {
                reg: new RegExp(acessodata + nAnoMes), subs: function (achou) {
                    if (mesesPt[achou[2] - 1])
                        return racessodata('01-' + mesesisoPt[achou[2] - 1] + '-' + achou[1] + achou[3], achou[0]);
                    else return achou[0];
                }
            }, {
                reg: new RegExp(acessodata + nMesAno), subs: function (achou) {
                    if (mesesPt[achou[1] - 1])
                        return racessodata('01-' + mesesisoPt[achou[1] - 1] + '-' + achou[2] + achou[3], achou[0]);
                    else return achou[0];
                }
            }, {
                reg: new RegExp(acessodata + sAnoMesDia), subs: function (achou) {
                    return racessodata(achou[3] + ' de ' + tradMes(achou[2]) + ' de ' + achou[1] + achou[4], achou[0]);
                }
            }, {
                reg: new RegExp(acessodata + sDiaMesAno), subs: function (achou) {
                    return racessodata(achou[1] + ' de ' + tradMes(achou[2]) + ' de ' + achou[3] + achou[4], achou[0]);
                }
            }, {
                reg: new RegExp(acessodata + ssDiaMesAno), subs: function (achou) {
                    return racessodata(achou[1] + achou[2] + achou[3] + achou[4] + achou[5] + achou[6], achou[0]);
                }
            }, {
                reg: new RegExp(acessodata + _00ssDiaMesAno), subs: function (achou) {
                    return racessodata('0' + achou[1] + achou[2] + achou[3] + achou[4] + achou[5] + achou[6], achou[0]);
                }
            }, {
                reg: new RegExp(acessodata + _0ssDiaMesAno), subs: function (achou) {
                    return racessodata(achou[1] + achou[2] + '0' + achou[3] + achou[4] + achou[5] + achou[6], achou[0]);
                }
            }, {
                reg: new RegExp(acessodata + ddDiaMesAno), subs: function (achou) {
                    return racessodata(achou[1] + ' de ' + tradMes(achou[2]) + ' de ' + achou[3], achou[0]);
                }
            }, {
                reg: new RegExp(acessodata + _0ddDiaMesAno), subs: function (achou) {
                    return racessodata(achou[1] + achou[2] + ' de ' + tradMes(achou[3]) + ' de ' + achou[4], achou[0]);
                }
            }, {
                reg: new RegExp(acessodata + "\\s*([A-Za-zç]+)\\s+,?d?e?\\s*(\\d\\d\\d\\d?)\\.?"), subs: function (achou) {
                    return racessodata('01-' + tradisoMes(achou[1]) + '-' + achou[2], achou[0]);
                }
            }, {
                reg: new RegExp(acessodata + marco), subs: function (achou) {
                    return racessodata(achou[1].replace(/[Mm]arco/, 'março'), achou[0]);
                }
            }, {
                reg: new RegExp(acessodata + diaMesInv), subs: function (achou) {
                    return racessodata(achou[1]);
                }
            }, {
                reg: new RegExp(publicacao + diaMesAno), subs: function (achou) {
                    return rpublicacao(achou[1].replace(/[\-\/]/, '–') + '-' + tradisoMes(achou[2]) + '-' + achou[3], achou[0]);
                }
            }, {
                reg: new RegExp(publicacao + mesDiaAno), subs: function (achou) {
                    return rpublicacao(achou[2].replace(/[\-\/]/, '–') + ' de ' + tradMes(achou[1]) + ' de ' + achou[3], achou[0]);
                }
            }, {
                reg: new RegExp(publicacao + mesAno), subs: function (achou) {
                    return rpublicacao(tradMes(achou[1]) + ' de ' + achou[2], achou[0]);
                }
            }, {
                reg: new RegExp(publicacao + diaMesVAno), subs: function (achou) {
                    return rpublicacao(achou[1].replace(/[\-\/]/, '–') + '-' + tradisoMes(achou[2]) + '-' + achou[3], achou[0]);
                }
            }, {
                reg: new RegExp(publicacao + mesAno), subs: function (achou) {
                    return rpublicacao(tradMes(achou[1]) + ' de ' + achou[2], achou[0]);
                }
            }, {
                reg: new RegExp(publicacao + mesMesAno), subs: function (achou) {
                    return rpublicacao(tradMes(achou[1]) + '–' + tradMes(achou[2]) + ' de ' + achou[3], achou[0]);
                }
            }, {
                reg: new RegExp(publicacao + nAnoMes), subs: function (achou) {
                    if (mesesPt[achou[2] - 1])
                        return rpublicacao(mesesPt[achou[2] - 1] + ' de ' + achou[1] + achou[3], achou[0]);
                    else return achou[0];
                }
            }, {
                reg: new RegExp(publicacao + nMesAno), subs: function (achou) {
                    if (mesesPt[achou[1] - 1])
                        return rpublicacao(mesesPt[achou[1] - 1] + ' de ' + achou[2] + achou[3], achou[0]);
                    else return achou[0];
                }
            }, {
                reg: new RegExp(publicacao + sAnoMesDia), subs: function (achou) {
                    return rpublicacao(achou[3] + ' de ' + tradMes(achou[2]) + ' de ' + achou[1] + achou[4], achou[0]);
                }
            }, {
                reg: new RegExp(publicacao + sDiaMesAno), subs: function (achou) {
                    return rpublicacao(achou[1] + ' de ' + tradMes(achou[2]) + ' de ' + achou[3] + achou[4], achou[0]);
                }
            }, {
                reg: new RegExp(publicacao + _0ddDiaMesAno), subs: function (achou) {
                    return rpublicacao(achou[1] + achou[2] + ' de ' + tradMes(achou[3]) + ' de ' + achou[4], achou[0]);
                }
            }, {
                reg: new RegExp(arquivodata + cvGrauO), subs: function (achou) {
                    return rarquivodata(achou[1].replace('°', 'º'), achou[0]);
                }
            }, {
                reg: new RegExp(arquivodata + diaMesAno), subs: function (achou) {
                    return rarquivodata(achou[1] + ' de ' + tradMes(achou[2]) + ' de ' + achou[3], achou[0]);
                }
            }, {
                reg: new RegExp(arquivodata + mesDiaAno), subs: function (achou) {
                    return rarquivodata(achou[2] + ' de ' + tradMes(achou[1]) + ' de ' + achou[3], achou[0]);
                }
            }, {
                reg: new RegExp(arquivodata + _0mesDiaAno), subs: function (achou) {
                    return rarquivodata(achou[2].replace(/[\-\/]/, '–') + ' de ' + tradMes(achou[1]) + ' de ' + achou[3], achou[0]);
                }
            }, {
                reg: new RegExp(arquivodata + diaMesVAno), subs: function (achou) {
                    return rarquivodata(achou[1] + ' de ' + tradMes(achou[2]) + ' de ' + achou[3], achou[0]);
                }
            }, {
                reg: new RegExp(arquivodata + _0diaMesVAno), subs: function (achou) {
                    return rarquivodata(achou[1] + ' de ' + tradMes(achou[2]) + ' de ' + achou[3], achou[0]);
                }
            }, {
                reg: new RegExp(arquivodata + sAnoMesDia), subs: function (achou) {
                    return rarquivodata(achou[3] + ' de ' + tradMes(achou[2]) + ' de ' + achou[1] + achou[4], achou[0]);
                }
            }, {
                reg: new RegExp(arquivodata + sDiaMesAno), subs: function (achou) {
                    return rarquivodata(achou[1] + ' de ' + tradMes(achou[2]) + ' de ' + achou[3] + achou[4], achou[0]);
                }
            }, {
                reg: new RegExp(arquivodata + ssDiaMesAno), subs: function (achou) {
                    return rarquivodata(achou[1] + achou[2] + achou[3] + achou[4] + achou[5] + achou[6], achou[0]);
                }
            }, {
                reg: new RegExp(arquivodata + _00ssDiaMesAno), subs: function (achou) {
                    return rarquivodata('0' + achou[1] + achou[2] + '0' + achou[3] + achou[4] + achou[5] + achou[6], achou[0]);
                }
            }, {
                reg: new RegExp(arquivodata + _0ssDiaMesAno), subs: function (achou) {
                    return rarquivodata(achou[1] + achou[2] + '0' + achou[3] + achou[4] + achou[5] + achou[6], achou[0]);
                }
            }, {
                reg: new RegExp(arquivodata + _0ddDiaMesAno), subs: function (achou) {
                    return rarquivodata(achou[1] + achou[2] + ' de ' + tradMes(achou[3]) + ' de ' + achou[4], achou[0]);
                }
            }, {
                reg: new RegExp(arquivodata + prData), subs: function (achou) {
                    return rarquivodata(achou[3] + '-' + mesesisoPt[achou[2] - 1] + '-' + achou[1], achou[0]);
                }
            }, {
                reg: new RegExp(arquivodata + ddDiaMesAno), subs: function (achou) {
                    return rarquivodata(achou[1] + ' de ' + tradMes(achou[2]) + ' de ' + achou[3], achou[0]);
                }
            }
            /*, { reg: /\|\s*dat[ea]\s*=data=\s*([A-Za-zç]+)\s+d?e?\s*(\d\d\d\d?)/, subs: function(achou){
                return '|data=' + tradMes(achou[1]) + ' de ' + achou[2];
            } }*/
        ],
        sumario: 'ajustando datas'
    },

    tradpred: {
        cond: [
            {
                reg: /\{\s\{\s*[Cc]it/, subs: function (achou) {
                    return '{{cit';
                }
            }, {
                reg: /\{\s*(?:[Cc]it[ae] ?[Ww]eb|lien web|Lien web|[rR]ef[\-\s]web|[Cc]iteer web|[wW]ebbref|[Ll]ien brisé|[Oo]bra citada|[Ii]nternetquelle)/, subs: function (achou) {
                    return '{citar web';
                }
            }, {
                reg: /\{\s*[Cc]ite AV media notes/, subs: function (achou) {
                    return '{citar vídeo notas';
                }
            }, {
                reg: /\{\s*[Cc]ite (?:video|av media|AV media)/, subs: function (achou) {
                    return '{citar vídeo';
                }
            }, {
                reg: /\{\s*[Cc]ite video game/, subs: function (achou) {
                    return '{Citar jogo eletrônico';
                }
            }, {
                reg: /\{\s*[Cc]ite thesis/, subs: function (achou) {
                    return '{citar tese';
                }
            }, {
                reg: /\{\s*(?:[Cc]ite magazine|[Cc]itar publicação)/, subs: function (achou) {
                    return '{citar revista';
                }
            }, {
                reg: /\{\s*[Cc]itar publicação/, subs: function (achou) {
                    return '{citar revista';
                }
            }, {
                reg: /\{\s*[Cc]ite report/, subs: function (achou) {
                    return '{citar relatório';
                }
            }, {
                reg: /\{\s*[Cc]ite techreport/, subs: function (achou) {
                    return '{citar relatório técnico';
                }
            }, {
                reg: /\{\s*[Cc]ite podcast/, subs: function (achou) {
                    return '{citar podcast';
                }
            }, {
                reg: /\{\s*(?:[Cc]it[ea]r? not[íi]cias?|[Cc]it[ae] newsp?a?p?e?r?|[Cc]ita novas|[Rr]ef-publicació)/, subs: function (achou) {
                    return '{citar jornal';
                }
            }, {
                reg: /\{\s*[Cc]ite map/, subs: function (achou) {
                    return '{citar mapa';
                }
            }, {
                reg: /\{\s*(?:[Cc]ite book|[Ll]iteratur|[Cc]ita libro|Citar capítulo|[Oo]uvrage|[Bb]ook)/, subs: function (achou) {
                    return '{citar livro';
                }
            }, {
                reg: /\{\s*[Cc]ite mailing list/, subs: function (achou) {
                    return '{citar lista de discussão';
                }
            }, {
                reg: /\{\s*[Gg]Geonameslänkte/, subs: function (achou) {
                    return '{Geonameslink';
                }
            }, {
                reg: /\{\s*(?:[Cc]ite journal|[Cc]ite paper|[Cc]ite document|[Cc]ite periodical|[Cc]ita publicaci[óo]n|[Cc]it[ae]r? artigo|[Tt]idskriftsref)/, subs: function (achou) {
                    return '{citar periódico';
                }
            }, {
                reg: /\{\s*[Cc]ite newsgroup/, subs: function (achou) {
                    return '{citar grupo de notícias';
                }
            }, {
                reg: /\{\s*[Cc]ite episode/, subs: function (achou) {
                    return '{citar episódio';
                }
            }, {
                reg: /\{\s*[Cc]ite serial/, subs: function (achou) {
                    return '{citar série';
                }
            }, {
                reg: /\{\s*[Cc]ite speech/, subs: function (achou) {
                    return '{citar discurso';
                }
            }, {
                reg: /\{\s*[Cc]ite interview/, subs: function (achou) {
                    return '{citar entrevista';
                }
            }, {
                reg: /\{\s*[Cc]ite encyclopedia/, subs: function (achou) {
                    return '{citar enciclopédia';
                }
            }, {
                reg: /\{\s*[Cc]ite conference/, subs: function (achou) {
                    return '{citar conferência';
                }
            }, {
                reg: /\{\s*[Cc]ite press release/, subs: function (achou) {
                    return '{citar comunicado de imprensa';
                }
            }, {
                reg: /\{\s*[Cc]ite ar[Xx]iv/, subs: function (achou) {
                    return '{citar arXiv';
                }
            }, {
                reg: /\{\s*[Cc]ite tweet/, subs: function (achou) {
                    return '{citar tweet';
                }
            }, {
                reg: /\{\s*[Cc]ite iucn/, subs: function (achou) {
                    return '{citar iucn';
                }
            }, {
                reg: /\|\s*at\s*=/, subs: function (achou) {
                    return '|em=';
                }
            }, {
                reg: /(\|\s*)(?:access[ao]?\-?dat[ea]|data_?acesso|fechaacceso|data-acc?ess?o|acessoda[^t][^a]|dataacceso|consulta|acesso|consulté le|acesso\s?\-date|data de acesso|accesso|acessdata|acesssodata|data_de acesso|consultado|acessdate|dataaceso|visitadoem|fechaaceso|accessed|accesso|acesso_data|hämtdatum|zugriff|zugriff-jahr|[Aa]bruf|data dostępu|acssodata|acsseodata|consultado em)(\s*=)/, subs: function (achou) {
                    return achou[1] + 'acessodata' + achou[2];
                }
            }, {
                reg: /(\|\s*)(?:ano|year|año)(\s*=\s*)([0-9][0-9][0-9][0-9]?),\s([0-9][0-9][0-9][0-9]?)/, subs: function (achou) {
                    return achou[1] + 'anooriginal' + achou[2] + achou[3] + achou[1] + 'ano' + achou[2] + achou[3];
                }
            }, {
                reg: /(\|\s*)(?:ano|year|año)(\s*=\s*)([0-9][0-9][0-9][0-9]?)\s*\|\s*(?:month|m[êe]s)\s*=\s*([A-Za-zç\.]+)\/([A-Za-zç\.]+)/, subs: function (achou) {
                    return achou[1] + 'data' + achou[2] + tradMes(achou[4]) + '–' + tradMes(achou[5]) + ' de ' + achou[3];
                }
            }, {
                reg: /(\|\s*)(?:ano|year|año)(\s*=\s*)([0-9][0-9][0-9][0-9]?)\s*\|\s*(?:month|m[êe]s)\s*=\s*([A-Za-zç\.]+)/, subs: function (achou) {
                    return achou[1] + 'data' + achou[2] + tradMes(achou[4]) + ' de ' + achou[3];
                }
            }, {
                reg: /(\|\s*)(?:month|m[êe]s)(\s*=\s*)([A-Za-zç\.]+)\s*\|\s*(?:ano|year|año)\s*=\s*([0-9][0-9][0-9][0-9]?)/, subs: function (achou) {
                    return achou[1] + 'data' + achou[2] + tradMes(achou[3]) + ' de ' + achou[4];
                }
            }, { // data em formato dd.mmm.dddd
                reg: /(\|[\s\n]*(?:acessodata|acesso|acessadoem|data)\s*=)[\s\n]*([0-9][0-9]?)[\.\s]+([A-Za-z][a-z][a-z][\.\s]+[0-9][0-9][0-9][0-9])/, subs: function (achou) {
                    return achou[1] + ' ' + achou[2] + ' ' + achou[3];
                }
            }, { // data em formato dd.mmm.dddd sem separador 
                reg: /(\|[\s\n]*(?:acessodata|acesso|acessadoem|data)\s*=[\s\n]*[0-9][0-9])([0-9][0-9)([0-9][0-9][0-9][0-9])\.?/, subs: function (achou) {
                    return achou[1] + '-' + achou[2] + '-' + achou[3];
                }
            }, { // data em formato dd.mmm.dddd ano dois digitos 
                reg: /(\|\s*(?:acessodata|acesso|acessadoem|data)\s*=[\s\n]*[0-9][0-9]?[\-\/][0-9][0-9]?[\-\/])(1[0-9](?![0-9]))/, subs: function (achou) {
                    return achou[1] + '20' + achou[2];
                }
            }, { // data e ano em formato dddd com texto a seguir 
                reg: /(\|\s*(?:data|date|ano|year)\s*=[\s\n]*[0-9][0-9][0-9][0-9]\s*)[\.\?](\s*\|)/, subs: function (achou) {
                    return achou[1] + achou[2];
                }
            }, { // data em formato dd de mmm de aaaa falta ano
                reg: /(\|[\s\n]*(?:acessodata|acesso|acessadoem|data|arquivodata)\s*=[\s\n]*)[0-9][0-9]?º? de [A-Za-zç]+\s*d?e?\s*([\|\}])/, subs: function (achou) {
                    return achou[1] + achou[2];
                }
            }, { // data em formato yyyy-mm-dd com texto a seguir
                reg: /(\|\s*(?:acessodata|acesso|acessadoem|data)\s*=[\s\n]*[0-9][0-9][0-9][0-9][\-\/][0-9][0-9]?[\-\/][0-9][0-9]?[^|}])[A-Za-zàÀH\d\.\-\[', \:\?\#\+]+/, subs: function (achou) {
                    return achou[1] + ' ';
                }
            }, { // data em formato yyyy-mm-dd com texto a seguir
                reg: /(\|\s*(?:acessodata|acesso|acessadoem|data)\s*=[\s\n]*[0-9][0-9][\-\/][0-9][0-9]?[\-\/][0-9][0-9][0-9][0-9][^|}])[A-Za-zàÀH\d\.\-\[', \:\?\#\+]+/, subs: function (achou) {
                    return achou[1] + ' ';
                }
            }, { // data em formato dd de aaa de dddd
                reg: /(\|[\s\n]*(?:acessodata|acesso|acessadoem|data|arquivodata)\s*=\s*)\n*([0-9][0-9]?)[de\s\.]+((?:[jJ]aneiro|[Ff]evereiro|[Mm]arço|[aA]bril|[Mm]arço|[mM]aio|[Jj]unho|[Jj]ulho|[Aa]gosto|[Ss]etembro|[Oo]utubro|[Nn]ovembro|[dD]ezembro) de [0-9][0-9][0-9][0-9])/, subs: function (achou) {
                    return achou[1] + achou[2] + ' de ' + achou[3];
                }
            }, { // data em formato ddd de aaa de dddd extra dia
                reg: /(\|[\s\n]*(?:acessodata|acesso|acessadoem|data|arquivodata)\s*=\s*)\n*([0-9][0-9])[0-9] [de\s]+((?:[jJ]aneiro|[Ff]evereiro|[Mm]arço|[aA]bril|[Mm]arço|[mM]aio|[Jj]unho|[Jj]ulho|[Aa]gosto|[Ss]etembro|[Oo]utubro|[Nn]ovembro|[dD]ezembro) de [0-9][0-9][0-9][0-9])/, subs: function (achou) {
                    return achou[1] + achou[2] + ' de ' + achou[3];
                }
            }, { // data em formato ddd ?? aaa ?? dddd
                reg: /(\|[\s\n]*(?:acessodata|acesso|acessadoem|data|arquivodata)=\s*\n*([0-9][0-9])[0-9])\s*(?!d)(?!e)\s*((?:[jJ]aneiro|[Ff]evereiro|[Mm]arço|[aA]bril|[Mm]arço|[mM]aio|[Jj]unho|[Jj]ulho|[Aa]gosto|[Ss]etembro|[Oo]utubro|[Nn]ovembro|[dD]ezembro))\s*(?!d)(?!e)\s*([0-9][0-9][0-9][0-9])/, subs: function (achou) {
                    return achou[1] + '=' + achou[2] + ' de ' + achou[3] + ' de ' + achou[4];
                }
            }, { // data em formato dd de aaa de dddd com texto a seguir
                reg: /(\|[\s\n]*(?:acessodata|acesso|acessadoem|data|arquivodata)\s*=\s*\n*[0-9][0-9]? de (?:[jJ]aneiro|[Ff]evereiro|[Mm]arço|[aA]bril|[Mm]arço|[mM]aio|[Jj]unho|[Jj]ulho|[Aa]gosto|[Ss]etembro|[Oo]utubro|[Nn]ovembro|[dD]ezembro) de [0-9][0-9][0-9][0-9][^|}])[A-Za-zàÀH\d\.\-\[',\s\:\?\#\)\+]+/, subs: function (achou) {
                    return achou[1] + ' ';
                }
            }, { // data em formato aaa./aaa. de dddd com mês abreviado
                reg: /(\|[\s\n]*(?:data|ano)\s*=\s*)\n*((?:[jJ]an|[Ff]ev|[Mm]ar|[aA]br|[Mm]ar|[mM]ai|[Jj]un|[Jj]ul|[Aa]go|[Ss]et|[Nn]ov|[dD]ez)\.?)[de\s]+([0-9][0-9][0-9][0-9])/, subs: function (achou) {
                    return achou[1] + tradMes(achou[2]) + '–' + tradMes(achou[3]) + ' de ' + achou[4];
                }
            }, { // data em formato dd aaa. dddd com mês abreviado
                reg: /(\|[\s\n]*(?:acessodata|acesso|acessadoem|data|arquivodata)\s*=\s*)\n*0([1-9][0-9]?)[\-de\s]+((?:[jJ]an|[Ff]ev|[Mm]ar|[aA]br|[Mm]ar|[mM]ai|[Jj]un|[Jj]ul|[Aa]go|[Ss]et|[Oo]ut|[Nn]ov|[dD]ez)\.?)[\-de\s]+([0-9][0-9][0-9][0-9])/, subs: function (achou) {
                    return achou[1] + achou[2] + ' de ' + achou[3] + ' de ' + achou[4];
                }
            }, { // data em formato dd de aaa de dddd
                reg: /(\|[\s\n]*(?:acessodata|acesso|acessadoem|data|arquivodata)\s*=\s*)\n*([0-9][0-9]? de (?:[jJ]aneiro|[Ff]evereiro|[Mm]arço|[aA]bril|[Mm]arço|[mM]aio|[Jj]unho|[Jj]ulho|[Aa]gosto|[Ss]etembro|[Oo]utubro|[Nn]ovembro|[dD]ezembro))[de\s]+([0-9][0-9][0-9][0-9])/, subs: function (achou) {
                    return achou[1] + achou[2] + ' de ' + achou[3];
                }
            }, { // data em formato dd de aaa de dddd. ponto no fim
                reg: /(\|[\s\n]*(?:acessodata|acesso|acessadoem|data|arquivodata)\s*=\s*\n*[0-9][0-9]? de (?:[jJ]aneiro|[Ff]evereiro|[Mm]arço|[aA]bril|[Mm]arço|[mM]aio|[Jj]unho|[Jj]ulho|[Aa]gosto|[Ss]etembro|[Oo]utubro|[Nn]ovembro|[dD]ezembro) de [0-9][0-9][0-9][0-9])\./, subs: function (achou) {
                    return achou[1];
                }
                /*            },{ // data em formato [[dd-mm-dddd]] colchete
                                reg: /(\|[\s\n]*(?:acessodata|acesso|acessadoem|data)\s*=[\s\n]*)[\]\[]+[0-9][0-9]?[\.\/\-]+[0-9][0-9]?[\.\/\-]+[0-9][0-9][0-9][0-9])[\]\[]+/, subs: function (achou) {
                                    return achou[1] +  achou[2];
                                }*/
            }, { // data em formato dd\mm\dddd
                reg: /(\|[\s\n]*(?:acessodata|acesso|acessadoem|data)\s*=)[\s\n]*([0-9][0-9]?[0-9]?[0-9]?)\\([0-9][0-9]?)\\([0-9][0-9]?[0-9]?[0-9]?)/, subs: function (achou) {
                    return achou[1] + achou[2] + '-' + achou[3] + '-' + achou[4];
                }
            }, {
                reg: /(\|\s*(?:acessodata|acesso|acessadoem|data)\s*=\s*)([0-9][0-9][0-9][0-9])\s*([A-Za-z][A-Za-zç\.]*)\s*([0-9][0-9]?)/, subs: function (achou) {
                    return achou[1] + achou[4] + ' de ' + tradMes(achou[3]) + ' de ' + achou[2];
                }
            }, {
                reg: /\|\s*(?:date|год|fecha|Jahr|datahttp:\/|[^d]ata|dat[^a]|da[^t]a|lançado|data2|datum)\s*=/, subs: function (achou) {
                    return '|data=';
                }
            }, {
                reg: /\|\s*month\s*=/, subs: function (achou) {
                    return '|mês=';
                }
            }, {
                reg: /\|\s*publication\-?date\s*=/, subs: function (achou) {
                    return '|data-publicacao=';
                }
            }, {
                reg: /\|\s*air\-?date\s*=/, subs: function (achou) {
                    return '|transmissão=';
                }
            }, {
                reg: /\|\s*(?:archiv[oe]\-?dat[ae]|data\-?arquivo|fechaarchivo|arkivdatum|archiv-datum)\s*=/, subs: function (achou) {
                    return '|arquivodata=';
                }
            }, {
                reg: /(\|\s*)arquivodata(\s*=\s*http)/, subs: function (achou) {
                    return achou[1] + 'arquivourl' + achou[2];
                }
            }, {
                reg: /(\|\s*)arquivourl(\s*=\s*[0-9])/, subs: function (achou) {
                    return achou[1] + 'arquivodata' + achou[2];
                }
            }, {
                reg: /\|\s*(?:archive\-?url|urlarchivo|archivourl|arkivurl|archiv-url)\s*=/, subs: function (achou) {
                    return '|arquivourl=';
                }
            }, {
                reg: /\|\s*(?:ID|[sc]id)\s*=/, subs: function (achou) {
                    return '|id=';
                }
            }, {
                reg: /\|\s*agency\s*=/, subs: function (achou) {
                    return '|agência=';
                }
            }, {
                reg: /\|\s*(?:l[ií]gu?a|l[ií]ngua[\d]|lang|langue|[Ll]anguage|línga[0-9]|språk|sprache|język)\s*=/, subs: function (achou) {
                    return '|língua=';
                }
            }, {
                reg: /\|\s*people\s*=/, subs: function (achou) {
                    return '|pessoas=';
                }
            }, {
                reg: /\|\s*credits\s*=/, subs: function (achou) {
                    return '|créditos=';
                }
            }, {
                reg: /\|\s*book\-?title\s*=/, subs: function (achou) {
                    return '|títulolivro=';
                }
            }, {
                reg: /\|\s*call\-?sign\s*=/, subs: function (achou) {
                    return '|indicativo=';
                }
            }, {
                reg: /\|\s*cartography\s*=/, subs: function (achou) {
                    return '|cartografia=';
                }
            }, {
                reg: /\|\s*chapter\s*=/, subs: function (achou) {
                    return '|capítulo=';
                }
            }, {
                reg: /\|\s*article\s*=/, subs: function (achou) {
                    return '|artigo=';
                }
            }, {
                reg: /\|\s*chapter\-format\s*=/, subs: function (achou) {
                    return '|formato-capitulo=';
                }
            }, {
                reg: /\|\s*(?:chapter\-?url|url_seção|capitulo[\-_]url)\s*=/, subs: function (achou) {
                    return '|capítulourl=';
                }
            }, {
                reg: /\|\s*(?:Ano|année|Datum|år)\s*=/, subs: function (achou) {
                    return '|ano=';
                }
            }, {
                reg: /\|\s*auth?or\-link\s*=/, subs: function (achou) {
                    return '|autorlink' + '=';
                }
            }, {
                reg: /\|\s*auth?or\-link(\d)\s*=/, subs: function (achou) {
                    return '|autorlink' + achou[1] + '=';
                }
            }, {
                reg: /\|\s*coauthors?\s*=/, subs: function (achou) {
                    return '|autor2' + '=';
                }
            }, {
                reg: /\|\s*(?:Autorlink|wkautore|enlaceautor|lien auteur)/, subs: function (achou) {
                    return '|autorlink';
                }
            }, {
                reg: /\|\s*(?:Editora|editorial?|editore|ed[^i]t[^o]ra|Verlag)\s*=/, subs: function (achou) {
                    return '|editora=';
                }
            }, {
                reg: /\|\s*collaboration\s*=/, subs: function (achou) {
                    return '|colaboração=';
                }
            }, {
                reg: /\|\s*conference\s*=/, subs: function (achou) {
                    return '|conferencia=';
                }
            }, {
                reg: /\|\s*conference\-format\s*=/, subs: function (achou) {
                    return '|formato-conferencia=';
                }
            }, {
                reg: /\|\s*conference\-?url\s*=/, subs: function (achou) {
                    return '|urlconferencia=';
                }
            }, {
                reg: /\|\s*(?:access?ado?em|dataaccess?o|acessado em|acessado)(\s*=)/, subs: function (achou) {
                    return '|acessadoem' + achou[1];
                }
            }, {
                reg: /(\|\s*)(?:dead\-?url|dead\-?link|url\-status|offline|urlmorto|status-url|status-arquivo)(\s*=\s*)(?:[Ll][Ii][Vv][Ee]|no|vivo)(\s*[\|\}])/, subs: function (achou) {
                    return achou[1] + 'urlmorta' + achou[2] + 'não' + achou[3];
                }
            }, {
                reg: /(\|\s*)(?:dead\-?url|dead\-?link|url\-status|offline|urlmorto|status-url|status-arquivo)(\s*=\s*)(?:[Dd][Ee][Aa][Dd]|1|ja)\s*([\|\}])/, subs: function (achou) {
                    return achou[1] + 'urlmorta' + achou[2] + 'sim' + achou[3];
                }
            }, {
                reg: /\|\s*nocaps\s*=\s*(?:[Xx]|[Yy]es|[sS]im|no)\s*/, subs: function (achou) {
                    return '';
                }
            }, {
                reg: /\|\s*name\-list\-style\s*=\s*amp\s*/, subs: function (achou) {
                    return '';
                }
            }, {
                reg: /\|\s*degree\s*=/, subs: function (achou) {
                    return '|grau=';
                }
            }, {
                reg: /\|\s*(?:edition|Ediç[aã]o|edición|Auflage)\s*=/, subs: function (achou) {
                    return '|edição=';
                }
            }, {
                reg: /\|\s*(?:otros|titelerg)\s*=/, subs: function (achou) {
                    return '|outros=';
                }
            }, {
                reg: /\|\s*(?:editors|éditeur|författarlänk)(\d?\d?\s*=)/, subs: function (achou) {
                    return '|editor' + achou[1];
                }
            }, {
                reg: /\|\s*(?:[tT]rabalh[ao]r?|publicación?|contribuition|contribuição)\s*=/, subs: function (achou) {
                    return '|publicação=';
                }
            }, {
                reg: /\|\s*encyclopa?edia\s*=/, subs: function (achou) {
                    return '|enciclopédia=';
                }
            }, {
                reg: /\|\s*episode\s*=/, subs: function (achou) {
                    return '|episódio=';
                }
            }, {
                reg: /\|\s*format\s*=/, subs: function (achou) {
                    return '|formato=';
                }
            }, {
                reg: /\|\s*interviewers?\s*=/, subs: function (achou) {
                    return '|entrevistador=';
                }
            }, {
                reg: /\|\s*map\s*=/, subs: function (achou) {
                    return '|mapa=';
                }
            }, {
                reg: /\|\s*map\-format\s*=/, subs: function (achou) {
                    return '|formato-mapa=';
                }
            }, {
                reg: /\|\s*map\-url\s*=/, subs: function (achou) {
                    return '|urlmapa=';
                }
            }, {
                reg: /\|\s*minutes\s*=/, subs: function (achou) {
                    return '|minuto=';
                }
            }, {
                reg: /\|\s*network\s*=/, subs: function (achou) {
                    return '|rede=';
                }
            }, {
                reg: /\|\s*orig\-?year\s*=/, subs: function (achou) {
                    return '|anooriginal=';
                }
            }, {
                reg: /\|\s*ISBN\s*=/, subs: function (achou) {
                    return '|isbn=';
                }
            }, {
                reg: /\|\s*DOI\s*=/, subs: function (achou) {
                    return '|doi=';
                }
            }, {
                reg: /\|\s*PMC\s*=/, subs: function (achou) {
                    return '|pmc=';
                }
            }, {
                reg: /\|\s*(?:pages|Pages|pàgines)(s?)(\s*=)/, subs: function (achou) {
                    return '|páginas' + (achou[2] ? achou[2] : '');
                }
            }, {
                reg: /\|\s*(?:page|Page|passage|[Ss]eiten|p|páxina)(s?)(\s*=)/, subs: function (achou) {
                    return '|página' + (achou[2] ? achou[2] : '');
                }
            }, {
                reg: /(\|\s*p[áa]ginas?\s*=\s*)\{\{p\.\|([0-9\-\.]*)\}\}/, subs: function (achou) {
                    return achou[1] + achou[2];
                }
            }, {
                reg: /\|\s*(?:paginas totais|páginas totais|pages totales)(\s*=)/, subs: function (achou) {
                    return '|total-páginas' + achou[1];
                }
            }, {
                reg: /(\|\s*edi[cç][aã]o\s*=\s*[0-9\_ªº\.\-\w ]+)(?:[Ii]ll?ustrated|edição|edition|ed\.?)/, subs: function (achou) {
                    return achou[1];
                }
            }, {
                reg: /(\|\s*edi[cç][aã]o\s*=\s*[0-9]+)\s*(?:a|nd|rd|st|th|\.ª?)+\s*(?:pbk|edição|edition|ed)(\s*\|)\.?/, subs: function (achou) {
                    return achou[1] + '.ª' + achou[2];
                }
            }, {
                reg: /\|\s*(?:number|issue|numéro|exemplar|nummer)\s*=/, subs: function (achou) {
                    return '|número=';
                }
            }, {
                reg: /\|\s*(?:journal|périodique|[Ww][oe]rk|)\s*=/, subs: function (achou) {
                    return '|publicação=';
                }
            }, {
                reg: /\|\s*(?:newspaper|périodique|rivista)\s*=/, subs: function (achou) {
                    return '|jornal=';
                }
            }, {
                reg: /\|\s*magazine\s*=/, subs: function (achou) {
                    return '|revista=';
                }
            }, {
                reg: /\|\s*dictionary\s*=/, subs: function (achou) {
                    return '|dicionário=';
                }
            }, {
                reg: /\|\s*(?:collection|pu[^b][^l]?icadoe?m?|imprenta|Obra|publicado\s*por|[sS]ammelwork|descrição|publicador|utgivare|opublikowany|[Hh]rsg)\s*=/, subs: function (achou) {
                    return '|publicado=';
                }
            }, {
                reg: /\|\s*(?:place|location|cidade|endereço|situação|ubicación|localidade|lieu|Ort)\s*=/, subs: function (achou) {
                    return '|local=';
                }
            }, {
                reg: /\|\s*(?:sitio|site|sitioweb|verk)\s*=/, subs: function (achou) {
                    return '|website=';
                }
            }, {
                reg: /\|\s*(?:publisher|pblicado|Publicado|published)\s*=/, subs: function (achou) {
                    return '|publicado=';
                }
            }, {
                reg: /\|\s*institution\s*=/, subs: function (achou) {
                    return '|instituição=';
                }
            }, {
                reg: /\|\s*(?:quote?s?a?t?i?o?n?|[kK]ommentar|citat|zitat|frase)\s*=/, subs: function (achou) {
                    return '|citação=';
                }
            }, {
                reg: /\|\s*registration\s*=/, subs: function (achou) {
                    return '|registro=';
                }
            }, {
                reg: /\|\s*(?:url\-access|acessourl)\s*=\s*subscription/, subs: function (achou) {
                    return '|acessourl=subscrição';
                }
            }, {
                reg: /\|\s*(?:url\-access|acessourl)\s*=\s*registration/, subs: function (achou) {
                    return '|acessourl=registro';
                }
            }, {
                reg: /\|\s*display\-?authors\s*=/, subs: function (achou) {
                    return '|numero-autores=';
                }
            }, {
                reg: /\|\s*lay-date\s*=/, subs: function (achou) {
                    return '|resumo-data=';
                }
            }, {
                reg: /\|\s*lay-summary\s*=/, subs: function (achou) {
                    return '|resumo-fonte=';
                }
            }, {
                reg: /\|\s*lay-format\s*=/, subs: function (achou) {
                    return '|resumo-formato=';
                }
            }, {
                reg: /\|\s*section\s*=/, subs: function (achou) {
                    return '|seção=';
                }
            }, {
                reg: /\|\s*season\s*=/, subs: function (achou) {
                    return '|temporada=';
                }
            }, {
                reg: /\|\s*sections\s*=/, subs: function (achou) {
                    return '|seções=';
                }
            }, {
                reg: /\|\s*sheet\s*=/, subs: function (achou) {
                    return '|folha=';
                }
            }, {
                reg: /\|\s*sheets\s*=/, subs: function (achou) {
                    return '|folhas=';
                }
            }, {
                reg: /\|\s*station\s*=/, subs: function (achou) {
                    return '|estação=';
                }
            }, {
                reg: /\|\s*subscription\s*=/, subs: function (achou) {
                    return '|subscrição=';
                }
            }, {
                reg: /\|\s*time\s*=/, subs: function (achou) {
                    return '|tempo=';
                }
            }, {
                reg: /\|\s*time\-?caption\s*=/, subs: function (achou) {
                    return '|legenda=';
                }
            }, {
                reg: /(\|\s*)(?:[tT][íi]t[rlo][el]|T[íi]tulo|tit[^u]lo|ti[^t]ulo|[^t]itle|titre|[Tt]itel|titolo|t[íi]tol|rubrik|tytuł|t[íi]tiulo)\s*=/, subs: function (achou) {
                    return achou[1] + 'título=';
                }
            }, {
                reg: /\|\s*title\-?link\s*=/, subs: function (achou) {
                    return '|títulolink=';
                }
            }, {
                reg: /\|\s*episode\-?link\s*=/, subs: function (achou) {
                    return '|episódiolink=';
                }
            }, {
                reg: /\|\s*department\s*=/, subs: function (achou) {
                    return '|departamento=';
                }
            }, {
                reg: /\|\s*(?:type|meio)\s*=/, subs: function (achou) {
                    return '|tipo=';
                }
            }, {
                reg: /\|\s*trans\-?chapter\s*=/, subs: function (achou) {
                    return '|capítulo-trad=';
                }
            }, {
                reg: /\|\s*transcript\-format\s*=/, subs: function (achou) {
                    return '|transcricao-formato=';
                }
            }, {
                reg: /\|\s*transcript\s*=/, subs: function (achou) {
                    return '|transcrição=';
                }
            }, {
                reg: /\|\s*transcript\-?url\s*=/, subs: function (achou) {
                    return '|transcriçãourl=';
                }
            }, {
                reg: /\|\s*(?:trans[\-_]?title|trans_título|transt[ií]tulo)\s*=/, subs: function (achou) {
                    return '|títulotrad=';
                }
            }, {
                reg: /\|\s*(?:year|año|datum-jahr)\s*=/, subs: function (achou) {
                    return '|ano=';
                }
            }, {
                reg: /\|\s*platform\s*=/, subs: function (achou) {
                    return '|plataforma=';
                }
            }, {
                reg: /\|\s*version\s*=/, subs: function (achou) {
                    return '|versão=';
                }
            }, {
                reg: /\|\s*scene\s*=/, subs: function (achou) {
                    return '|cena=';
                }
            }, {
                reg: /\|\s*(?:Subt[ií]tulo|sous-titre)\s*=/, subs: function (achou) {
                    return '|subtítulo=';
                }
            }, {
                reg: /\|\s*(?:volumen|Band|Volume|volum|volym|tome)\s*=/, subs: function (achou) {
                    return '|volume=';
                }
            }, { //falta nome parametro
                reg: /\|\s*(?:URL|url)\s*http/, subs: function (achou) {
                    return '|url=http';
                }
            }, { //url sem parametro
                reg: /\|\s*http/, subs: function (achou) {
                    return '|url=http';
                }
            }, {
                reg: /\|\s*(?:ссылка|páxina\-web|Online|lire en ligne|URL)\s*=/, subs: function (achou) {
                    return '|url=';
                }
            }, {
                reg: /\|\s*(?:auor|autore|Autor|autor[ra]|auth?ore?s)\s*=/, subs: function (achou) {
                    return '|autor=';
                }
            }, {
                reg: /\|\s*(?:aut[eh][uo]r|nom)(\d\d?)?\s*=/, subs: function (achou) {
                    return '|autor' + (achou[1] ? achou[1] : '') + '=';
                }
            }, {
                reg: /\|\s*author(\d\d?)?\-?link\s*=/, subs: function (achou) {
                    return '|autorlink' + (achou[1] ? achou[1] : '') + '=';
                }
            }, {
                reg: /\|\s*(?:first|nombre|priemiro|primerio|prénom|nom|förnamn)(\d?\d?)\s*=/, subs: function (achou) {
                    return '|primeiro' + (achou[1] ? achou[1] : '') + '=';
                }
            }, {
                reg: /\|\s*(?:last|apellidos?|apelidos|[uú]ltima|sobrename|surnames?|cognom|efternamn)(\d\d?)?\s*=/, subs: function (achou) {
                    return '|último' + (achou[1] ? achou[1] : '') + '=';
                }
            }, {
                reg: /\|\s*editor\s?(\d\d?)?\-last\s*=/, subs: function (achou) {
                    return '|editor-sobrenome' + (achou[1] ? achou[1] : '') + '=';
                }
            }, {
                reg: /\|\s*editor(\d\d?)?\-first\s*=/, subs: function (achou) {
                    return '|editor-nome' + (achou[1] ? achou[1] : '') + '=';
                }
            }, {
                reg: /(\|\s*(?:c?o?autor\d?e?s?|[úu]ltimo\d?|primeiro\d?|nome\d?|sobrenome\d?|pessoas)[^|]+)[;, ]*(\'\'\s*[Ee]t [Aa]l\.?\'?\'?\.?\s*)/, subs: function (achou) {
                    return achou[1] + '|numero-autores=' + achou[2];
                }
            }, {
                reg: /(\|\s*(?:c?o?autor\d?e?s?|[úu]ltimo\d?|primeiro\d?|nome\d?|sobrenome\d?|pessoas)[^|]+)[;,\[ ]*([Ee]t [Aa]l\.?\.?\]?\s*)/, subs: function (achou) {
                    return achou[1] + '|numero-autores=' + achou[2];
                }
            }, {
                reg: /(\|\s*(?:editores|editor\d?|[Ss]obrenome-editor\d?|nome-editor\d?|editor-nome\d?|pessoas)[^|]+)[;, ]*(\'\'\s*[Ee]t [Aa]l\.?\'?\'?\.?\s*)/, subs: function (achou) {
                    return achou[1] + '|numero-editores=' + achou[2];
                }
            }, { // remover parâmetro vazio
                reg: /\|\s*(?:coauth?ore?s?|m[eê]s|formato|p[aá]ginas|obra|cita|subt[ií]tulo|colaboração|autorlink|capítulourl|[vV]olume|[vV]olumes|local\-publicação|efternamn|förnamn|datum|verk|redaktör|nummer|utgivare|utgivningsort|datum-jahr|kommmentar|zitat|seiten|s[ée]ries|em|titulo-translit|titulotrad|tipo|arxiv|asin|bibcode|doi|doi-broken-date|isbn|issn|jfm|jstor|lccn|mr|oclc|ol|osti|pmc|pmid|rfc|ssrn|zbl|id|cita[çc][ãa]o|ref|pontofinal|subscri[çc][ãa]o|registr?o|editor[0-9]|editores|editor-sobrenome[0-9]|editor-nome[0-9]|editorlink[0-9]|[úu]ltimo[0-9]|primeiro[0-9]|autor[0-9]|autorlink[0-9]|departamento|aspas)\s*=\s*([\|\}])/, subs: function (achou) {
                    return achou[1];
                }
            }, {
                reg: /\|\s*developer(\d\d?)?\s*=/, subs: function (achou) {
                    return '|desenvolvedor' + achou[2] + '=';
                }
            }
        ],
        sumario: 'traduzindo nome/parâmetro'
    },

    geral: {
        cond: [
            {
                reg: /(\|\s*(?:obra|autor|último|primeiro|publicado|website|t[ií]tulo|url|arquivo\-?url|url\-?arquivo|cap[ií]tulo\-?url)\s*=\s*)([^|}]*[\S])(\s*[\|\}])/, subs: function (achou) {
                    if (achou[2].match(/\u200B|\n/)) {
                        var tmp = achou[2].replace(/ *\n */g, ' ');
                        return achou[1] + tmp.replace(/\u200B/g, '') + achou[3];
                    }
                    return achou[0];
                }
            }, { //remover espaços de url
                reg: /(\|\s*(?:url|URL|arquivourl|archiveurl|capítulourl)\s*=\s*)([^\|\{\}]*[\S])(\s*[\|\{\}])/, subs: function (achou) {
                    if (achou[2].match(/\s/)) {
                        var tmp = achou[2].replace(/ * */g, '');
                        return achou[1] + tmp.replace(/\s/g, '') + achou[3];
                    }
                    return achou[0];
                }
            }, {
                reg: /(\|\s*(?:l[ií]ngua|idioma)\s*=\s*)(?:[Cc]zech|[Cc]sech|[cC][Zz]|[Tt]checo)/, subs: function (achou) {
                    return achou[1] + 'cs';
                }
            }, {
                reg: /(\|\s*(?:l[ií]ngua|idioma)\s*=\s*)(?:[fF]rançais|[Ff]ranc[ée]sa?|[Ff]rench|\[\[[Ll]íngua francesa\|francês\]\])/, subs: function (achou) {
                    return achou[1] + 'fr';
                }
            }, {
                reg: /(\|\s*(?:l[ií]ngua|idioma)\s*=\s*)(?:[Hh]olandês|[nN]eerlandês|[Dd]utch|\[\[[Dd]utch language\|Dutch\]\]|\[\[[Ll]íngua neerlandesa\|[Nn]eerland[eê]s\]\])/, subs: function (achou) {
                    return achou[1] + 'nl';
                }
            }, {
                reg: /(\|\s*(?:l[ií]ngua|idioma)\s*=\s*)(?:pte|[Pp]ortuguesa|[Pp]ortugu[eé]se?|\[\[[Ll]íngua portuguesa\|[Pp]ortuguês\]\]|[pP]ortuguês\-Brasil|[Pp]ortuguês\-?Brasileiro)/, subs: function (achou) {
                    return achou[1] + 'pt';
                }
                //temp. devia ter poucos a. com fontes bretão, mal informado pt-br
            }, {
                reg: /(\|\s*(?:l[ií]ngua|idioma)\s*=\s*)(?:[bB][Rr]|[Pp]ortuguês brasileiro|\[\[[Pp]ortuguês brasileiro\]\]|pt_[Bb][Rr])/, subs: function (achou) {
                    return achou[1] + 'pt-br';
                }
            }, {
                reg: /(\|\s*(?:l[ií]ngua|idioma)\s*=\s*)(?:em|[Ii]ngl[eé]sa?|[Ee]nglish|[Aa]nglais|\[\[(?:[Ii]ngl[êeé]s|e?m?\s?[Ll][ií]ngua inglesa)\|[iI]ngl[éêe]s\]\]|\{\{en\}\}|angl[éèê]s|\[\[[Ii]íngles \(idioma\)\|[Ii]nglês\]\])/, subs: function (achou) {
                    return achou[1] + 'inglês';
                }
            }, {
                reg: /(\|\s*(?:l[ií]ngua|idioma)\s*=\s*)(?:deo|alem[aá]n?|\[\[[Ll][ií]ngua alemã\|alemão?\]\]|\[?\[?[Gg]erman\]?\]?|[Dd]eutsch|alemã(?!o))/, subs: function (achou) {
                    return achou[1] + 'de';
                }
            }, {
                reg: /(\|\s*(?:l[ií]ngua|idioma)\s*=\s*)(?:ês|[Ee]sp(?!a)|[Ss]panish|[Ee]spañol|castelhano|\[\[[lL]íngua castelhana\|(?:[Ee]spanhol|[Cc]astelhano)\]\]|esanhol|español|\[\[[Ss]panish language\|Spanish\]\]|castelán|castellá|[Cc]astellano|:es)/, subs: function (achou) {
                    return achou[1] + 'es';
                }
            }, {
                reg: /(\|\s*(?:l[ií]ngua|idioma)\s*=\s*)(?:[Cc]atal[áa]n|\[\[[lL]íngua catalã\|[Cc]atalão\]\]|[Cc]atalà)/, subs: function (achou) {
                    return achou[1] + 'ca';
                }
            }, {
                reg: /(\|\s*(?:l[ií]ngua|idioma)\s*=\s*)(?:[Ii]talian|\[\[[Ll][ií]ngua italiana\|italiano?\]\]|\[\[[Ii]taliano?\]\]|[Ii]taliana)(\s*[\|\}])/, subs: function (achou) {
                    return achou[1] + 'it' + achou[2];
                }
            }, {
                reg: /(\|\s*(?:l[ií]ngua|idioma)\s*=\s*)(?:albanian|Albanian|\[\[[Ll][ií]ngua albanesa\|albanês?\]\]|\[?\[?[Aa]lbânes\]?\]?)/, subs: function (achou) {
                    return achou[1] + 'sq';
                }
            }, {
                reg: /(\|\s*(?:l[ií]ngua|idioma)\s*=\s*)(?:[Aa]rabic|\[\[[Ll][ií]ngua arábica\|arábico\]\])/, subs: function (achou) {
                    return achou[1] + 'ar';
                }
            }, {
                reg: /(\|\s*(?:l[ií]ngua|idioma)\s*=\s*)(?:Latin|latin|\[\[[Ll]atim\]\]|[Ll]atín)/, subs: function (achou) {
                    return achou[1] + 'la';
                }
            }, {
                reg: /(\|\s*(?:l[ií]ngua|idioma)\s*=\s*)(?:Russian|russian|\[\[[Rr]ussian language\|[Rr]ussian\]\])/, subs: function (achou) {
                    return achou[1] + 'ru';
                }
            }, {
                reg: /(\|\s*(?:l[ií]ngua|idioma)\s*=\s*)(?:Persian|persian)/, subs: function (achou) {
                    return achou[1] + 'fa';
                }
            }, {
                reg: /(\|\s*(?:l[ií]ngua|idioma)\s*=\s*)(?:Jap[ao]nese|jap[ao]nese|[Jj][Pp]|[Jj]aponés)/, subs: function (achou) {
                    return achou[1] + 'ja';
                }
            }, {
                reg: /(\|\s*(?:l[ií]ngua|idioma)\s*=\s*)(?:Finnish|finnish)/, subs: function (achou) {
                    return achou[1] + 'fi';
                }
            }, {
                reg: /(\|\s*(?:l[ií]ngua|idioma)\s*=\s*)(?:Polish|polish|[Pp]ol[ôo]n[eê]s)/, subs: function (achou) {
                    return achou[1] + 'pl';
                }
            }, {
                reg: /(\|\s*(?:l[ií]ngua|idioma)\s*=\s*)(?:Turkish|turkish|turca)/, subs: function (achou) {
                    return achou[1] + 'tr';
                }
            }, {
                reg: /(\|\s*(?:l[ií]ngua|idioma)\s*=\s*)(?:Latvian|latvian)/, subs: function (achou) {
                    return achou[1] + 'lv';
                }
            }, {
                reg: /(\|\s*(?:l[ií]ngua|idioma)\s*=\s*)(?:Korean|korean|\[\[[Cc]oreano\]\])/, subs: function (achou) {
                    return achou[1] + 'ko';
                }
                // línguas falta, papiamento
            }, {
                reg: /(\|\s*(?:l[ií]ngua|idioma)\s*=\s*)([\w\s]{2,}) e ([\w]{2,})/, subs: function (achou) {
                    return achou[1] + ' , ' + achou[2];
                }
            }, {
                reg: /(\|\s*(?:l[ií]ngua|idioma)\s*=\s*)(?:Hebrew|hebrew)/, subs: function (achou) {
                    return achou[1] + 'he';
                }
            }, {
                reg: /(\|\s*(?:l[ií]ngua|idioma)\s*=\s*)(?:Chinese|chinese|[Mm]andarin [Cc]hinese)/, subs: function (achou) {
                    return achou[1] + 'zh';
                }
            }, {
                reg: /(\|\s*(?:l[ií]ngua|idioma)\s*=\s*)(?:Vietnamese|vietnamese)/, subs: function (achou) {
                    return achou[1] + 'vi';
                }
            }, {
                reg: /(\|\s*(?:l[ií]ngua|idioma)\s*=\s*)(?:Macedonian|macedonian)/, subs: function (achou) {
                    return achou[1] + 'mk';
                }
            }, {
                reg: /(\|\s*(?:l[ií]ngua|idioma)\s*=\s*)(?:Estonian[^o]+|estonian[^o]+)/, subs: function (achou) {
                    return achou[1] + 'et';
                }
            }, {
                reg: /(\|\s*(?:l[ií]ngua|idioma)\s*=\s*)(?:[sS]wedish|\[\[[Ll]íngua sueca\|sueca\]\]|\[\[[Ss]ueco \(idioma\)\|[Ss]ueco\]\])/, subs: function (achou) {
                    return achou[1] + 'sv';
                }
            }, {
                reg: /(\|\s*(?:l[ií]ngua|idioma)\s*=\s*)(?:[dD]anish|\[\[[Ll]íngua dinamarquesa\|[Dd]inamarquês\]\])/, subs: function (achou) {
                    return achou[1] + 'da';
                }
            }, {
                reg: /(\|\s*(?:l[ií]ngua|idioma)\s*=\s*)(?:[Nn]oregian|\[\[[Ll]íngua norueguesa\|[Nn]norueguês\]\]|[Nn]oruego|[Nn]oregê)/, subs: function (achou) {
                    return achou[1] + 'da';
                }
            }, {
                reg: /(\|\s*(?:l[ií]ngua|idioma)\s*=\s*)(?:Greek|greek|grega)/, subs: function (achou) {
                    return achou[1] + 'el';
                }
            }, { //remover versalita e small caps
                reg: /(\|\s*(?:apelido|nome|autor|último|primeiro)\s*=\s*)\{\{(?:[Vv]ersalita|[Ss]mallcaps|[Ss]mall)\|(.*)\}\}/, subs: function (achou) {
                    return achou[1] + achou[2];
                }
                /*            },{ //remover line feed
                                reg: /(\|\s*(?:t[ií]tulo|obra|publicado|publica[çc][ãa]o|autor[0-9]*|[uú]ltimo[0-9]*|apelido[0-9]*|sujeito[0-9]*|primeiro[0-9]*|jornal|periódico|editor[0-9]*|editor-nome[0-9]*|editor-sobrenome[0-9]*|editora|sobrenome[0-9]*|nome[0-9]*|prenome[0-9]*|cognome[0-9]*)\s*=\s*.*)\n+(.*)/, subs: function (achou) {
                                    return achou[1] + ' ' + achou[2];
                                }*/
            }, { //remover ligação externa de título
                reg: /(\|\s*(?:t[ií]tulo|title)\s*=\s*)https?\:\/\//, subs: function (achou) {
                    return achou[1];
                }
            }, { //remover ligação externa de título
                reg: /(\|\s*(?:t[ií]tulo|title)\s*=\s*)([^|}]+)https?\:\/\//, subs: function (achou) {
                    return achou[1] + achou[2] + ' ';
                }
            }, {
                reg: /co\-?autore?s?(\s*=\s*)([A-Za-zàáâãçéêíòóôõúüñÀÁÂÃÇÉÊÍÒÓÔÕÚÑ\.\-\[', ]+);\s*([A-Za-zàáâãçéêíòóôõúüñÀÁÂÃÇÉÊÍÒÓÔÕÚÑ\.\-\]', ]+)/, subs: function (achou) {
                    return 'autor2' + achou[1] + achou[2] + '|autor3' + achou[1] + achou[3];
                }
                //corrigir falta pipe parâmetro sem barra vertical %s+(%a[%w%-]+)%s*=') or value:match ('^(%a[%w%-]+)%s*=')
                /*	    },{ 
                                reg: /([A-Za-z\.\-\]',\/]\s+)((?:acesso-?data|acessdate|datali|data|date|t[ií]tulo|title|first[0-9]?|last[0-9]?|primeiro[0-9]?|[úu]ltimo[0-9]?|nome[0-9]?|sobrenome[0-9]?|editora|autor[0-9]?||author[0-9]?|editor-primeiro[0-9]?|editor-sobrenome[0-9]?|editor[0-9]?|publicado|publisher|arquivourl|arquivodata|jornal|periódico|work|obra|l[íi]ngua|isbn|issn|id|local|place|n[uú]mero|number)\s*\=)/, subs: function (achou) {
                                    return achou[1] + '|' + achou[2];
                                }*/
            }, {
                reg: /co\-?autore?s?(\s*=\s*[A-Za-zàáâãçéêíòóôõúüñÀÁÂÃÇÉÊÍÒÓÔÕÚÑ\.\-\[\]';, ]+)/, subs: function (achou) {
                    return 'autor2' + achou[1];
                }
            }
        ],
        sumario: 'ajustes gerais'
    },

    duplicado: {
        sumario: 'rm duplicados'
    },

    //predefinições com exclusividade de verificação
    apenas: [/\{\{\s*[Cc]it[ea]r? web\s*\|/,
        /\{\{\s*[Cc]itar (?:v[ií]deo|v[ií]deo notas)\s*\|/,
        /\{\{\s*[Cc]arece de fontes\s*\|/,
        /\{\{\s*[Cc]itation needed\s*\|/,
        /\{\{\s*[mM]ais (?:fontes|notas)\s*\|/,
        /\{\{\s*[Ll]londonGazette\s*\|/,
        /\{\{\s*[Ll]iteratur\s*\|/,
        /\{\{\s*[Ll]ien web\s*\|/,
        /\{\{\s*[Ll]ien brisé\s*\|/,
        /\{\{\s*[Tt]idskriftsref\s*\|/,
        /\{\{\s*[Cc]itar tese\s*\|/,
        /\{\{\s*[Cc]it[ea]r? tweet\s*\|/,
        /\{\{\s*[Tt](?:weet|uíte)\s*\|/,
        /\{\{\s*[Cc]itar revista\s*\|/,
        /\{\{\s*[Cc]itar (?:relatório|relatório técnico)\s*\|/,
        /\{\{\s*[Cc]itar podcast\s*\|/,
        /\{\{\s*[Cc]itar periódico\s*\|/,
        /\{\{\s*[Cc]ita publicación\s*\|/,
        /\{\{\s*[Cc]itar mapa\s*\|/,
        /\{\{\s*[Cc]ita libro\s*\|/,
        /\{\{\s*[Oo]uvrage\s*\|/,
        /\{\{\s*[Cc]itar livro\s*\|/,
        /\{\{\s*[Rr]eferência a livro\s*\|/,
        /\{\{\s*[Cc]itar lista de discussão\s*\|/,
        /\{\{\s*[Cc]itar jornal\s*\|/,
        /\{\{\s*[Cc]itar ASW\s*\|/,
        /\{\{\s*[Cc]itar jogo eletrônico\s*\|/,
        /\{\{\s*[Cc]itar not[íi]cias?\s*\|/,
        /\{\{\s*[Cc]itar grupo de notícias\s*\|/,
        /\{\{\s*[Cc]itar episódio\s*\|/,
        /\{\{\s*[Cc]itar entrevista\s*\|/,
        /\{\{\s*[Cc]itar enciclopédia\s*\|/,
        /\{\{\s*[Cc]itar discurso\s*\|/,
        /\{\{\s*[Cc]itar conferência\s*\|/,
        /\{\{\s*[Ww]ebarchive\s*\|/,
        /\{\{\s*[Ww]ebbref\s*\|/,
        /\{\{\s*[Ii]nternetquelle\s*\|/,
        /\{\{\s*[Cc]itar comunicados? de imprensa\s*\|/,
        /\{\{\s*[Cc]itar ar[Xx]iv\s*\|/,
        /\{\{\s*[Cc]ite ?web\s*\|/,
        /\{\{\s*[Cc]ite v[íi]deo(?: game|)\s*\|/,
        /\{\{\s*[Cc]ite [Aa][Vv] media(?: notes|)\s*\|/,
        /\{\{\s*[Cc]ite thesis\s*\|/,
        /\{\{\s*[Cc]ite magazine\s*\|/,
        /\{\{\s*[Cc]ite report\s*\|/,
        /\{\{\s*[Cc]ite techreport\s*\|/,
        /\{\{\s*[Cc]ite podcast\s*\|/,
        /\{\{\s*[Cc]ite ?newspaper\s*\|/,
        /\{\{\s*[Cc]ite news\s*\|/,
        /\{\{\s*[Cc]ite map\s*\|/,
        /\{\{\s*[Cc]ite book\s*\|/,
        /\{\{\s*[Cc]ite mailing list\s*\|/,
        /\{\{\s*[Cc]ite journal\s*\|/,
        /\{\{\s*[Cc]ite document\s*\|/,
        /\{\{\s*[Cc]ite paper\s*\|/,
        /\{\{\s*[Cc]ite newsgroup\s*\|/,
        /\{\{\s*[Cc]ita noticia\s*\|/,
        /\{\{\s*[Cc]ite JTWC\s*\|/,
        /\{\{\s*[Cc]ite PAGASA\s*\|/,
        /\{\{\s*[Cc]ite episode\s*\|/,
        /\{\{\s*[Cc]ite serial\s*\|/,
        /\{\{\s*[Cc]ite speech\s*\|/,
        /\{\{\s*[Cc]ite interview\s*\|/,
        /\{\{\s*[Cc]ite encyclopedia\s*\|/,
        /\{\{\s*[Cc]ite conference\s*\|/,
        /\{\{\s*[Cc]ite press(?: release|)\s*\|/,
        /\{\{\s*[Cc]ite ar[xX]iv\s*\|/,
        /\{\{\s*[Cc]it[ea]r? Metacritic\s*\|/,
        /\{\{\s*[Cc]itation\s*\|/,
        /\{\{\s*[Cc]it[ae]r? sports\-reference\s*\|/,
        /\{\{\s*[Cc]it[ea]r? iucn\s*\|/,
        /\{\{\s*[Cc]itar Infopedia\s*\|/,
        /\{\{\s*[aA]bum\s?chart\s*\|/,
        /\{\{\s*[Ss]ingle\s?chart\s*\|/,
        /\{\{\s*[eE]Floras\s*\|/,
        /\{\{\s*[Aa]rticle\s*\|/,
        /\{\{\s*[Oo]bra citada\s*\|/,
        /\{\{\s*[Rr]ef[\-\s]web\s*\|/,
        /\{\{\s*[Ww]ebarchive\s\|/
    ],
    ordem: ['datas', 'tradpred', 'geral', 'duplicado']
};

function verifDuplicado(achou) {
    function acharAninhados(cap) {
        var colch = 0;
        var chaves = 0;
        var r = '';
        for (var i = 0; i < cap.length; r += cap[i++]) {
            if (cap.charAt(i) == '[' && cap.charAt(i + 1) == '[') {
                if (chaves == 0) colch++;
                r += cap[i++];
            } else if (cap.charAt(i) == ']' && cap.charAt(i + 1) == ']') {
                if (chaves == 0) colch--;
                if (colch < 0) colch = 0;
                r += cap[i++];
            } else if (cap.charAt(i) == '{' && cap.charAt(i + 1) == '{') {
                if (colch > 0) return achou[0];
                chaves++;
                r += cap[i++];
            } else if (cap.charAt(i) == '}' &&
                (cap.charAt(i + 1) == '}' || cap.charAt(i + 1) == '')) {
                // será < 0 se atingir o fim da delimitação
                chaves--;
                if (chaves < 0) {
                    if (colch == 0) return r;
                    else return achou[0];
                }
                r += cap[i++];
            } else if (cap.charAt(i) == '|') {
                if (colch == 0 && chaves == 0) return r;
            }
        }
        if (colch == 0 && chaves == 0) return r;
        else return achou[0];
    }
    var ultimo = acharAninhados(achou[4]);
    if (ultimo == achou[0]) return achou[0];
    if (/[^\s]+/.test(ultimo)) {
        //o padrão do MediaWiki escolhe o último em caso de repetição, que se apague o primeiro
        var primeiro = acharAninhados(achou[2]);
        if (primeiro == achou[0]) return achou[0];
        return achou[2].substring(primeiro.length) + achou[3] + achou[4];
    } else {
        //se o último for vazio, mesmo sendo o padrão escolhido, faz sentido removê-lo
        return achou[1] + achou[2] + achou[4].substring(ultimo.length);
    }
}

// apenas parâmetros das predefinições delimitadas
const listaDupl = [
    '(?:acessodata|acessadoem|accessdate|dataacesso|acesso|acessdate|fechaacceso|dataacceso)',
    '(?:data|ano|date|year)',
    '(?:jornal|revista|dicion[á]rio|peri[óo]dico|site|obra|enc[yi]clop[ée]dia|encyclopaedia|trabalho|work|journal|newspapaper|periodical|dictionary,publicación|publica[cç][aã]o|website)',
    'local',
    '(?:publicado|editora)',
    't[ií]tulo',
    '(?:primeiro|primeiro1)',
    '(?:[úu]ltimo1?|autor1?|apelido1?)',
    '(?:arquivourl|urlarquivo|arquivo\\-url|archive\\-?url|wayb)',
    '(?:arquivodata|archive\\-?date|wayb)',
    'n[úu]mero',
    'volume',
    '(?:l[ií]ngua|idioma)',
    '(?:deadurl|ligação inac?tiva|li|datali|urlmorta|dead\\-?url)',
    '[Uu][Rr][Ll]',
    'ref',
    'formato?',
    'p[aá]gina',
    'p[aá]ginas',
    'wayb',
    '(?:isbn|isbn2|ISBN|ISBN2)',
    '(?:editor-nome1?|editor1?-first|editor-first?|editor-given1?|editor1?-given)',
    '(?:editor-sobrenome1?|editor1?|editor-last1?|editor1?-surname|editor-surname1?)',
    '(?:s[ée]ries?|cole[cç][ãa]o|versão|version)',
    '(?:type|medium|tipo|medio)',
    '(?:degree|grau)'
];

const duplicado = listaDupl.map((padrao) => ({
    reg: new RegExp(`(\\|\\s*${padrao}\\s*=)([\\s\\S]*)(\\|${padrao}\\s*=)([\\s\\S]*)`),
    subs: (achou) => verifDuplicado(achou)
}));

citacoes.duplicado.cond = duplicado;

links = [
    {
        reg: /<a\s*.*href\s*=\s*\"?([^\"&]*)\"?\s*[^&]*<\s*\/\s*a\s*>/, subs: function (achou) {
            var acao;
            var value = novoEditor ? 'submit' : 'edit';
            if (/\?/.test(achou[1])) acao = '&action=' + value;
            else acao = (/%3F/.test(achou[1])) ? '?&action=' + value : '?action=' + value;

            return achou[0] + '&nbsp;<a href="javascript:subsTextoBox(window.open(\''
                + encodeURIComponent(achou[1]) + acao + '\'))">Editar</a>';
        }
    },
    {
        reg: /<a\s*.*href\s*=\s*\"?([^\"&]*)\"?\s*.*<\s*\/\s*a\s*>/, subs: function (achou) {
            var acao;
            var value = novoEditor ? 'submit' : 'edit';
            if (/\?/.test(achou[1])) acao = '&action=' + value;
            else acao = (/%3F/.test(achou[1])) ? '?&action=' + value : '?action=' + value;

            return achou[0] + '&nbsp;<a href="javascript:subsTextoBox(window.open(\''
                + encodeURIComponent(achou[1]) + acao + '\'))">Editar</a>';
        }
    }
];

catolicismo = [
    {
        reg: /\b[Cc]ardeal\s+[Dd]iácono\b/g, subs: function (achou) {
            return 'cardeal-diácono';
        }
    }, {
        reg: /\b[Cc]ardeal\s+[Pp]adre\b/g, subs: function (achou) {
            return 'cardeal-presbítero';
        }
    }, {
        reg: /\b[Cc]ardeal\s+[Ss]acerdote\b/g, subs: function (achou) {
            return 'cardeal-presbítero';
        }
    }, {
        reg: /\b[Cc]ardeal\s+[Bb]ispo\b/g, subs: function (achou) {
            return 'cardeal-bispo';
        }
    }, {
        reg: /\b[Cc]ardinal\s+bishop\b/g, subs: function (achou) {
            return 'cardeal-bispo';
        }
    }, {
        reg: /\b[Cc]ardinal\s+priest\b/g, subs: function (achou) {
            return 'cardeal-presbítero';
        }
    }, {
        reg: /\b[Cc]ardinal\s+deacon\b/g, subs: function (achou) {
            return 'cardeal-diácono';
        }
    }, {
        // com hifen
        reg: /\b[Cc]ardeal[\-\s]+diácono\b/g, subs: function (achou) {
            return 'cardeal-diácono';
        }
    }, {
        reg: /\b[Cc]ardeal[\-\s]+presbítero\b/g, subs: function (achou) {
            return 'cardeal-presbítero';
        }
    }, {
        reg: /\b[Cc]ardeal[\-\s]+bispo\b/g, subs: function (achou) {
            return 'cardeal-bispo';
        }
    }, {
        // em inglês
        reg: /\b[Cc]ardinal\s+[Bb]ishop\b/g, subs: function (achou) {
            return 'cardeal-bispo';
        }
    }, {
        reg: /\b[Cc]ardinal\s+[Pp]riest\b/g, subs: function (achou) {
            return 'cardeal-presbítero';
        }
    }, {
        reg: /\b[Cc]ardinal\s+[Dd]eacon\b/g, subs: function (achou) {
            return 'cardeal-diácono';
        }
    }, {
        // sem acento - variações de maiúsculas
        reg: /\b[Cc]ardeal\s+[Dd]iacono\b/g, subs: function (achou) {
            return 'cardeal-diácono';
        }
    }, {
        reg: /\b[Cc]ardeal\s+[Pp]resbitero\b/g, subs: function (achou) {
            return 'cardeal-presbítero';
        }
    }, {
        reg: /\b[Cc]ardeal\s+[Pp]resbyter\b/g, subs: function (achou) {
            return 'cardeal-presbítero';
        }
    }, {
        // Ordem invertida em inglês
        reg: /\b[Pp]riest\s+[Cc]ardinal\b/g, subs: function (achou) {
            return 'cardeal-presbítero';
        }
    }, {
        reg: /\b[Pp]resbyter\s+[Cc]ardinal\b/g, subs: function (achou) {
            return 'cardeal-presbítero';
        }
    }, {
        reg: /\b[Bb]ishop\s+[Cc]ardinal\b/g, subs: function (achou) {
            return 'cardeal-bispo';
        }
    }, {
        reg: /\b[Dd]eacon\s+[Cc]ardinal\b/g, subs: function (achou) {
            return 'cardeal-diácono';
        }
        // titulos específicos
    }, {
        reg: /Santa Maria in Trastevere/g, subs: function (achou) {
            return '[[Santa Maria além do Tibre (título cardinalício)|Santa Maria além do Tibre]]';
        }
    }, {
        // titulos específicos
        reg: /S. Maria in Trastevere/g, subs: function (achou) {
            return '[[Santa Maria além do Tibre (título cardinalício)|Santa Maria além do Tibre]]';
        }


    }, {
        reg: /San Giorgio in Velabro/g, subs: function (achou) {
            return '[[São Jorge em Velabro (diaconia)|São Jorge em Velabro]]';
        }
    }, {
        reg: /Santa Pudenziana/g, subs: function (achou) {
            return '[[Santa Pudenciana (título cardinalício)|Santa Prudenciana]]';
        }
    }, {
        reg: /Santa Prassede/g, subs: function (achou) {
            return '[[Santa Praxedes (título cardinalício)|Santa Praxedes]]';
        }
    }, {
        reg: /(?<![Dd]iocese\s)\b[Dd]e\s+Sabina\b/g, subs: function (achou) {
            return 'de [[Diocese de Sabina-Poggio Mirteto|Sabina]]';
        }
    }, {
        reg: /\bde Ostia\b/g, subs: function (achou) {
            return 'de [[Diocese de Óstia|Óstia]]';
        }
    }, {
        reg: /\bde San Crisogono\b/g, subs: function (achou) {
            return 'de [[São Crisógono (título cardinalício)|São Crisógono]]';
        }
    }, {
        reg: /\bde San Clemente\b/g, subs: function (achou) {
            return 'de [[São Clemente (título cardinalício)|São Clemente]]';
        }
    }, {
        reg: /\bde Sant'Eusebio\b/g, subs: function (achou) {
            return 'de [[Santo Eusébio (título cardinalício)|Santo Eusébio]]';
        }
    }, {
        reg: /\bSan Pietro in Vincoli\b/g, subs: function (achou) {
            return '[[São Pedro Acorrentado (título cardinalício)|São Pedro Acorrentado]]';
        }

    }, {
        reg: /\bde Santa Prisca\b/g, subs: function (achou) {
            return '[[Santa Priscila (título cardinalício)|Santa Priscila]]';
        }

    }, {
        reg: /(?<!\[\[)\b[Dd]e\s+Santa\s+Sabina\b/g, subs: function (achou) {
            return 'de [[Santa Sabina (título cardinalício)|Santa Sabina]]';
        }
    }, {
        reg: /\bde San Sisto\b/g, subs: function (achou) {
            return 'de [[São Sisto (título cardinalício)|São Sisto]]';
        }
    }, {
        reg: /\bde Santa Maria in Cosmedin\b/g, subs: function (achou) {
            return 'de [[Santa Maria em Cosmedin (diaconia)|Santa Maria em Cosmedin]]';
        }

    }, {
        reg: /\bSantos Vito e Modesto\b/g, subs: function (achou) {
            return '[[Santos Vito, Modesto e Crescência (diaconia)|Santos Vito, Modesto e Crescência]]';
        }
    }, {
        reg: /\bde Santa Maria Nuova\b/g, subs: function (achou) {
            return 'de [[Santa Maria da Scala (diaconia)|Santa Maria da Scala]]';
        }
    }, {
        reg: /(?<!\[\[|\|)\bSanta Lúcia em Septisolio\b/g, subs: function (achou) {
            return '[[Santa Lúcia em Septisolio (diaconia)|Santa Lúcia em Septisolio]]';
        }
    }, {
        reg: /(?<!\[\[|\|)\bS. Lucia em Septisolio\b/g, subs: function (achou) {
            return '[[Santa Lúcia em Septisolio (diaconia)|Santa Lúcia em Septisolio]]';
        }
    }, {
        reg: /\bSan Giorgio em Velabro\b/g, subs: function (achou) {
            return '[[São Jorge em Velabro (diaconia)|São Jorge em Velabro]]';
        }
    }, {
        reg: /\bSanta Maria in Domnica\b/g, subs: function (achou) {
            return '[[Santa Maria em Domnica (diaconia)|Santa Maria em Domnica]]';
        }

    }, {
        reg: /\bSanta Susanna\b/g, subs: function (achou) {
            return '[[Santa Susana (título cardinalício)|Santa Susana]]';
        }


    }, {
        reg: /(?<![Dd]iocese\s)\b[Dd]e\s+Albano\b/g, subs: function (achou) {
            return 'de [[Diocese de Albano|Albano]]';
        }

    }, {
        reg: /(?<![Dd]iocese\s)\b[Dd]e\s+Palestrina\b/g, subs: function (achou) {
            return 'de [[Diocese de Palestrina|Palestrina]]';
        }

    }, {
        reg: /(?<![Dd]iocese\s)\b[Dd]e\s+Frascati\b/g, subs: function (achou) {
            return 'de [[Diocese de Frascati|Frascati]]';
        }
    }, {
        reg: /\bde Santa Cecilia\b/g, subs: function (achou) {
            return 'de [[Santa Cecília (título cardinalício)|Santa Cecília]]';
        }
    }, {
        reg: /\bSantos Quattro Coronati\b/g, subs: function (achou) {
            return '[[Quatro Santos Coroados (título cardinalício)|Quatro Santos Coroados]]';
        }
    }, {
        reg: /\bSan Marcello\b/g, subs: function (achou) {
            return '[[São Marcelo (título cardinalício)|São Marcelo]]';
        }
    }, {
        reg: /(?<!\[\[|\|)\bSantos Marcelino e Pedro\b/g, subs: function (achou) {
            return '[[Santos Marcelino e Pedro (título cardinalício)|Santos Marcelino e Pedro]]';
        }
    }, {
        reg: /\bSanta Lúcia em Silice\b/g, subs: function (achou) {
            return '[[Santa Lucia em Silice (diaconia)|Santa Lucia em Silice]]';
        }
    }, {
        reg: /\bSant'Adriano al Foro\b/g, subs: function (achou) {
            return '[[Santo Adriano no Fórum (diaconia)|Santo Adriano no Fórum]]';
        }
    }, {
        reg: /\bSan Ciriaco no Terme Diocleziane\b/g, subs: function (achou) {
            return '[[São Ciríaco nas Termas de Diocleciano (título cardinalício)|São Ciríaco nas Termas de Diocleciano]]';
        }
    }, {
        reg: /\bde Santa Balbina\b/g, subs: function (achou) {
            return 'de [[Santa Balbina (título cardinalício)|Santa Balbina]]';
        }
    }, {
        reg: /\bde San Vitale\b/g, subs: function (achou) {
            return 'dos [[Santos Vital, Valéria, Gervásio e Protásio (título cardinalício)|Santos Vital, Valéria, Gervásio e Protásio]]';
        }
    }, {
        reg: /\bSanta Maria no Portico Octaviae\b/g, subs: function (achou) {
            return '[[Santa Maria no Pórtico de Otávia (diaconia)|Santa Maria no Pórtico de Otávia]]';
        }
    }, {
        reg: /\bde San Teodoro\b/g, subs: function (achou) {
            return 'de [[São Teodoro (diaconia)|São Teodoro]]';
        }

    }, {
        reg: /\bSantos Sylvester e Martin\b/g, subs: function (achou) {
            return '[[Santos Silvestre e Martinho nos Montes (título cardinalício)|Santos Silvestre e Martinho nos Montes]]';
        }
    }, {
        reg: /Santos Silvestro e Martino/g, subs: function (achou) {
            return '[[Santos Silvestre e Martinho nos Montes (título cardinalício)|Santos Silvestre e Martinho nos Montes]]';
        }
    }, {
        reg: /\bSantos Silvestre e Martino ai Monti\b/g, subs: function (achou) {
            return '[[Santos Silvestre e Martinho nos Montes (título cardinalício)|Santos Silvestre e Martinho nos Montes]]';
        }
    }, {
        reg: /\bSanti Silvestro e Martino ai Monti\b/g, subs: function (achou) {
            return '[[Santos Silvestre e Martinho nos Montes (título cardinalício)|Santos Silvestre e Martinho nos Montes]]';
        }
    }, {
        reg: /\bSantos Sylvester e Martino ai Monti\b/g, subs: function (achou) {
            return '[[Santos Silvestre e Martinho nos Montes (título cardinalício)|Santos Silvestre e Martinho nos Montes]]';
        }
    }, {
        reg: /\bda SS. Silvestro e Martino\b/g, subs: function (achou) {
            return 'dos [[Santos Silvestre e Martinho nos Montes (título cardinalício)|Santos Silvestre e Martinho nos Montes]]';
        }
    }, {
        reg: /\bSanto Stefano em Monte Celio\b/g, subs: function (achou) {
            return '[[Santo Estêvão no Monte Celio (título cardinalício)|Santo Estêvão no Monte Celio]]';
        }
    }, {
        reg: /\bS. Stefano em Monte Celio\b/g, subs: function (achou) {
            return '[[Santo Estêvão no Monte Celio (título cardinalício)|Santo Estêvão no Monte Celio]]';
        }
    }, {
        reg: /\bS. Stefano em Celiomonte\b/g, subs: function (achou) {
            return '[[Santo Estêvão no Monte Celio (título cardinalício)|Santo Estêvão no Monte Celio]]';
        }
    }, {
        reg: /\bSanta Croce in Gerusalemme\b/g, subs: function (achou) {
            return '[[Santa Cruz de Jerusalém (título cardinalício)|Santa Cruz de Jerusalém]]';
        }
    }, {
        reg: /(?<!\[\[|\|)\bSanta Maria em Domnica\b/g, subs: function (achou) {
            return '[[Santa Maria em Domnica (diaconia)|Santa Maria em Domnica]]';
        }
    }, {
        reg: /(?<!\[\[|\|)\bSantos Vito, Modesto e Crescenzia\b/g, subs: function (achou) {
            return '[[Santos Vito, Modesto e Crescência (diaconia)|Santos Vito, Modesto e Crescência]]';
        }
    }, {
        reg: /\bSant'Agata alla Suburra\b/g, subs: function (achou) {
            return '[[Santa Águeda dos Góticos (diaconia)|Santa Águeda dos Góticos]]';
        }
    }, {
        reg: /\bSant'Agata em Suburra\b/g, subs: function (achou) {
            return '[[Santa Águeda dos Góticos (diaconia)|Santa Águeda dos Góticos]]';
        }
    }, {
        reg: /\bSant'Angelo in Pescheria\b/g, subs: function (achou) {
            return '[[Santo Ângelo em Pescheria (diaconia)|Santo Ângelo em Pescheria]]';
        }
    }, {
        reg: /\bSan Lorenzo in Damaso\b/g, subs: function (achou) {
            return '[[São Lourenço em Dâmaso (título cardinalício)|São Lourenço em Dâmaso]]';
        }
    }, {
        reg: /\bSan Lorenzo em Damaso\b/g, subs: function (achou) {
            return 'de [[São Lourenço em Dâmaso (título cardinalício)|São Lourenço em Dâmaso]]';
        }
    }, {
        reg: /\bS. Lorenzo em Damaso\b/g, subs: function (achou) {
            return 'de [[São Lourenço em Dâmaso (título cardinalício)|São Lourenço em Dâmaso]]';
        }

    }, {
        reg: /\bde San Lorenzo in Lucina\b/g, subs: function (achou) {
            return 'de [[São Lourenço em Lucina (título cardinalício)|São Lourenço em Lucina]]';
        }
    }, {
        reg: /\bde S. Lorenzo em Lucina\b/g, subs: function (achou) {
            return 'de [[São Lourenço em Lucina (título cardinalício)|São Lourenço em Lucina]]';
        }
    }, {
        reg: /\bde S. Lorenzo in Lucina\b/g, subs: function (achou) {
            return 'de [[São Lourenço em Lucina (título cardinalício)|São Lourenço em Lucina]]';
        }
    }, {
        reg: /\bS. Maria na Via Lata\b/g, subs: function (achou) {
            return '[[Santa Maria em Via Lata (diaconia)|Santa Maria em Via Lata]]';
        }

    }, {
        reg: /(?<!\[\[|\|)\bSantos Sérgio e Baco\b/g, subs: function (achou) {
            return '[[Santos Sérgio e Baco (diaconia)|Santos Sérgio e Baco]]';
        }
    }, {
        reg: /(?<!\[\[|\|)\bSS. Sergio e Bacco\b/g, subs: function (achou) {
            return '[[Santos Sérgio e Baco (diaconia)|Santos Sérgio e Baco]]';
        }
    }, {
        reg: /\bde São Cosme e Damião\b/g, subs: function (achou) {
            return 'de [[Santos Cosme e Damião (diaconia)|Santos Cosme e Damião]]';
        }
    }, {
        reg: /\bde Santos Cosme e Damião\b/g, subs: function (achou) {
            return 'de [[Santos Cosme e Damião (diaconia)|Santos Cosme e Damião]]';
        }
    }, {
        reg: /\bSS. Cosma e Damião\b/g, subs: function (achou) {
            return '[[Santos Cosme e Damião (diaconia)|Santos Cosme e Damião]]';
        }
    }, {
        reg: /\bSS. Cosma e Damiano\b/g, subs: function (achou) {
            return '[[Santos Cosme e Damião (diaconia)|Santos Cosme e Damião]]';
        }
    }, {
        reg: /\bda SS. Cosma e Damiano\b/g, subs: function (achou) {
            return 'dos [[Santos Cosme e Damião (diaconia)|Santos Cosme e Damião]]';
        }
    }, {
        reg: /\bde San Marco\b/g, subs: function (achou) {
            return 'de [[São Marcos (título cardinalício)|São Marcos]]';
        }
    }, {
        reg: /\bde S. Marco\b/g, subs: function (achou) {
            return 'de [[São Marcos (título cardinalício)|São Marcos]]';
        }

    }, {
        reg: /\bSanta Maria in Aquiro\b/g, subs: function (achou) {
            return '[[Santa Maria em Aquiro (diaconia)|Santa Maria em Aquiro]]';
        }
    }, {
        reg: /\bS. Maria in Aquiro\b/g, subs: function (achou) {
            return '[[Santa Maria em Aquiro (diaconia)|Santa Maria em Aquiro]]';
        }


    }, {
        reg: /\bSan Nicola em Carcere\b/g, subs: function (achou) {
            return '[[São Nicolau no Cárcere (diaconia)|São Nicolau no Cárcere]]';
        }

    }, {
        reg: /\bSão Nicolau em Carcere\b/g, subs: function (achou) {
            return '[[São Nicolau no Cárcere (diaconia)|São Nicolau no Cárcere]]';
        }
    }, {
        reg: /\bS. Nicola em Carcere\b/g, subs: function (achou) {
            return '[[São Nicolau no Cárcere (diaconia)|São Nicolau no Cárcere]]';
        }

    }, {
        reg: /(?<!\[\[|\|)\bSantos Nereu e Aquileu\b/g, subs: function (achou) {
            return '[[Santos Nereu e Aquileu (título cardinalício)|Santos Nereu e Aquileu]]';
        }
    }, {
        reg: /(?<!\[\[|\|)\bSantos Nereu e Aquiles\b/g, subs: function (achou) {
            return '[[Santos Nereu e Aquileu (título cardinalício)|Santos Nereu e Aquileu]]';
        }
    }, {
        reg: /(?<!\[\[|\|)\bda SS. Nereo ed Achilleo\b/g, subs: function (achou) {
            return 'dos [[Santos Nereu e Aquileu (título cardinalício)|Santos Nereu e Aquileu]]';
        }
    }, {
        reg: /\bSant'Eustachio\b/g, subs: function (achou) {
            return '[[Santo Eustáquio (diaconia)|Santo Eustáquio]]';
        }
    }, {
        reg: /\bS. Eustachio\b/g, subs: function (achou) {
            return '[[Santo Eustáquio (diaconia)|Santo Eustáquio]]';
        }
    }, {
        reg: /\bS. Eustáquio\b/g, subs: function (achou) {
            return '[[Santo Eustáquio (diaconia)|Santo Eustáquio]]';
        }

    }, {
        reg: /\bdos Santos João e Paulo\b/g, subs: function (achou) {
            return 'de [[São João e São Paulo (título cardinalício)|São João e São Paulo]]';
        }
    }, {
        reg: /\bda SS. Giovanni e Paolo\b/g, subs: function (achou) {
            return 'de [[São João e São Paulo (título cardinalício)|São João e São Paulo]]';
        }
    }, {
        reg: /\bde Sant'Anastasia\b/g, subs: function (achou) {
            return 'de [[Santa Anastácia (título cardinalício)|Santa Anastácia]]';
        }
    }, {
        reg: /\bde S. Anastasia\b/g, subs: function (achou) {
            return 'de [[Santa Anastácia (título cardinalício)|Santa Anastácia]]';
        }

    }, {
        reg: /(?<![Dd]iocese\s)\b[Dd]e\s+Porto e Silva Candida\b/g, subs: function (achou) {
            return 'de [[Diocese de Porto-Santa Rufina|Porto e Silva Candida]]';
        }
    }, {
        reg: /(?<![Dd]iocese\s)\b[Dd]e\s+Porto e S. Rufina\b/g, subs: function (achou) {
            return 'de [[Diocese de Porto-Santa Rufina|Porto e Silva Candida]]';
        }

        //
        //
    }, {
        reg: /\bSantos XII Apóstolos\b/g, subs: function (achou) {
            return '[[Santos Doze Apóstolos (título cardinalício)|Santos Doze Apóstolos]]';
        }
    }, {
        reg: /\bda SS. XII Apostoli\b/g, subs: function (achou) {
            return 'dos [[Santos Doze Apóstolos (título cardinalício)|Santos Doze Apóstolos]]';
        }

        //
        //
    }, {
        // expressões com "criado"
        reg: /\bCriado\s+diácono\s+cardeal\b/g, subs: function (achou) {
            return 'criado cardeal-diácono';
        }
    }, {
        reg: /\bcriado\s+presbítero\s+cardeal\b/g, subs: function (achou) {
            return 'criado cardeal-presbítero';
        }
    }, {
        reg: /\bcriado\s+[Pp]resbítero\s+[Cc]ardeal\b/g, subs: function (achou) {
            return 'criado cardeal-presbítero';
        }
    }, {
        reg: /\bcriado\s+padre\s+cardeal\b/g, subs: function (achou) {
            return 'criado cardeal-presbítero';
        }
    }, {
        reg: /\bcriado\s+[Pp]adre\s+[Cc]ardeal\b/g, subs: function (achou) {
            return 'criado cardeal-presbítero';
        }
    }, {
        reg: /\bcriado\s+diácono\s+cardeal\b/g, subs: function (achou) {
            return 'criado cardeal-diácono';
        }
    }, {
        reg: /\bcriado\s+[Dd]iácono\s+[Cc]ardeal\b/g, subs: function (achou) {
            return 'criado cardeal-diácono';
        }
    }, {
        // Variações sem acento
        reg: /\bcriado\s+presbitero\s+cardeal\b/g, subs: function (achou) {
            return 'criado cardeal-presbítero';
        }
    }, {
        reg: /\bcriado\s+[Pp]resbitero\s+[Cc]ardeal\b/g, subs: function (achou) {
            return 'criado cardeal-presbítero';
        }
    }, {
        reg: /\bcriado\s+diacono\s+cardeal\b/g, subs: function (achou) {
            return 'criado cardeal-diácono';
        }
    }, {
        reg: /\bcriado\s+[Dd]iacono\s+[Cc]ardeal\b/g, subs: function (achou) {
            return 'criado cardeal-diácono';
        }
    }, {
        // expressões com "feito"
        reg: /\bfeito\s+diácono\s+cardeal\b/g, subs: function (achou) {
            return 'feito cardeal-diácono';
        }
    }, {
        reg: /\bfeito\s+[Dd]iácono\s+[Cc]ardeal\b/g, subs: function (achou) {
            return 'feito cardeal-diácono';
        }
    }, {
        reg: /\bfeito\s+padre\s+cardeal\b/g, subs: function (achou) {
            return 'feito cardeal-presbítero';
        }
    }, {
        reg: /\bfeito\s+[Pp]adre\s+[Cc]ardeal\b/g, subs: function (achou) {
            return 'feito cardeal-presbítero';
        }
    }, {
        reg: /\bfeito\s+presbítero\s+cardeal\b/g, subs: function (achou) {
            return 'feito cardeal-presbítero';
        }
    }, {
        reg: /\bfeito\s+[Pp]resbítero\s+[Cc]ardeal\b/g, subs: function (achou) {
            return 'feito cardeal-presbítero';
        }
    }, {
        // variações sem acento
        reg: /\bfeito\s+presbitero\s+cardeal\b/g, subs: function (achou) {
            return 'feito cardeal-presbítero';
        }
    }, {
        reg: /\bfeito\s+[Pp]resbitero\s+[Cc]ardeal\b/g, subs: function (achou) {
            return 'feito cardeal-presbítero';
        }
    }, {
        reg: /\bfeito\s+diacono\s+cardeal\b/g, subs: function (achou) {
            return 'feito cardeal-diácono';
        }
    }, {
        reg: /\bfeito\s+[Dd]iacono\s+[Cc]ardeal\b/g, subs: function (achou) {
            return 'feito cardeal-diácono';
        }
    }, {
        // substituições diretas
        reg: /\bcardeal-sacerdote\b/g, subs: function (achou) {
            return 'cardeal-presbítero';
        }
    }
]


geral = [
    {
        reg: /\[\[[Aa]nexo:([^\[\]]*\]\])/, subs: function (achou) {
            return '[[' + achou[1];
        }
    }, {
        reg: /\[\[\s*([^\[\]]+)\s*\|\s*([^\[\]]+)\s*\]\]/, subs: function (achou) {
            var quot = '';
            var tmp = (achou[2].charAt(0).toLocaleLowerCase() + achou[2].replace(/_/g, " ").substring(1)).indexOf
                (achou[1].charAt(0).toLocaleLowerCase() + achou[1].replace(/_/g, " ").substring(1));

            if (tmp != 0) {
                quot = achou[2].match(/^(''''')(.+)\1$/) || achou[2].match(/^(''')(.+)\1$/) || achou[2].match(/^('')(.+)\1$/) || achou[2].match(/^(')(.+)\1$/) || achou[2].match(/^(")(.+)\1$/);

                if (!quot) return achou[0];

                achou[2] = quot[2];
                quot = quot[1];
                tmp = (achou[2].charAt(0).toLocaleLowerCase() + achou[2].replace(/_/g, " ").substring(1)).indexOf
                    (achou[1].charAt(0).toLocaleLowerCase() + achou[1].replace(/_/g, " ").substring(1));
            }

            if (tmp == 0) {
                var apos = achou[2].substring(achou[1].length);
                if (/^[a-zàáâãçéêíòóôõúü]*[,\.;)]?$/.test(apos))
                    return quot + '[[' + achou[2].substring(0, achou[1].length)
                        + ']]' + apos + quot;
            }
            return achou[0];
        }
    }, {
        reg: /(<\s*ref\s+(?:[^<>]*\s+)?name=[^<>]+)\s*>\s*<\s*\/ref\s*>/i, subs: function (achou) {
            return achou[1] + ' />';
        }
    }, {
        reg: /é um cidade de\s*\{\{/, subs: function (achou) {
            return 'é uma cidade de {{';
        }
    }, {
        reg: /\{\{[Rr]edação Wikidata/, subs: function (achou) {
            return '\{\{subst:PAGENAMEBASE';
        }
    }, {
        reg: /\{\{[Vv]alor Wikidata\s*\|\s*P1879/, subs: function (achou) {
            return '\{\{subst:Valor Wikidata|property=P1879|numval=1|link=-';
        }
    }, {
        reg: /\{\{[Vv]alor Wikidata\s*\|\s*((?:P131|P18|P41|P242|P36))([\|\}])/, subs: function (achou) {
            return '\{\{subst:Valor Wikidata|property=' + achou[1] + '|numval=1' + achou[2];
        }
    }, {
        reg: /<\s*ref>\{\{[Ss]afesubst:#invoke:wd\|reference\|raw\|P1538\}\}<\/ref>/, subs: function (achou) {
            return '\{\{Dados censo|ph\}\}';
        }
    }, {
        reg: /(\{\{[Vv]alor Wikidata\s*\|\s*P1082\s*\|\s*showonlyqualifier\s*=\s*P585)\}\}/, subs: function (achou) {
            return achou[1] + '|linktopic=-}}';
        }
    }, {
        reg: /[Ii]nfoTaxonomia/, subs: function (achou) {
            return 'subst:Usuário:Dbastro/Predefinição43';
        }
    }, {
        reg: /\{nfo\/Taxonomia/, subs: function (achou) {
            return '{taxobox';
        }
    }, {
        reg: /<\s*cite class=.*?<\s*\/cite\s*>/, subs: function (achou) {
            return '';
        }
    }, {
        reg: / *[\.,;]? *(<\s*ref(?:\s+[^<>]*)?>[^<>]*<\s*\/ref\s*>|<\s*ref\s+[^<>]*\/>) *([\.,;])/i, subs: function (achou) {
            return achou[2] + achou[1];
        }
    }, {
        reg: /([\w\.\],;'"]\.?|(?:<\/ref\s*>)|(?:<ref\s*(?:\s+[^<>]+|)\/>)) +<\s*ref([\s>])/i, subs: function (achou) {
            return achou[1] + '<ref' + achou[2];
        }
    }, {
        reg: /(<\/ref>)(\w)/i, subs: function (achou) {
            return achou[1] + ' ' + achou[2];
        }
    }   /* Código desativado para corrigir ref name=nome> para ref name="nome"/>
      , { reg: /(<\s*ref\s+[^<>]+\s+(?:name|group)\s*=)\s*(["'`=<>]+)(\/>|\s|>)/i, subs: function(achou){
      return achou[1] + '"' + achou[2] + '"' + achou[3];
      } }*/, {
        reg: /<\s*br\s*clear\s*=\s*\"?(none|left|right|both|initial|inherit|all)\"?\s*\/?>/i, subs: function (achou) {
            if (achou[1].toLowerCase() == "all")
                achou[1] = "both";
            return '<br style="clear: ' + achou[1] + '">';
        }
        // substitui track listing	
    }, {
        reg: /\{\{\s*[Tt](?:rack listing|racklist)/i, subs: function (achou) {
            return '{{subst:Lista de faixas/Testes';
        }
        // substitui Ligações externas	
    }, {
        reg: /\{\{\s*[Ll](?:inks|igações externas)/i, subs: function (achou) {
            return '{{subst:Ligações externas';
        }
        // substitui Ver também	
    }, {
        reg: /\{\{\s*[Vv](?:er também|eja também|er Também)/i, subs: function (achou) {
            return '{{subst:Ver também';
        }
    }, {
        reg: /<x (\s*ref\s+(?:[^<>]*\s+)?name=[^<>]+\s*>\s*\{\{[Cc]itar)/i, subs: function (achou) {
            return '<' + achou[1];
        }
    }, {
        reg: /<\s*[\/\\]\s*br\s*>/i, subs: function (achou) {
            return '<br>';
        }
    }, {
        reg: /<\s*br\s*[\\\n](\/|)>/i, subs: function (achou) {
            return '<br' + achou[1] + '>';
        }
    }, {
        reg: /Encyclopa?edia Britannica/, subs: function (achou) {
            return 'Encyclopædia Britannica';
        }
    }, {
        reg: /\[\[Pontifical Ecclesiastical Academy\]\]/, subs: function (achou) {
            return '[[Pontifícia Academia Eclesiástica]]';
        }
    }, {
        reg: /\egundo a \[\[Departamento do Censo dos Estados/, subs: function (achou) {
            return 'egundo o [[Departamento do Censo dos Estados';
        }
    }, {
        reg: /\[[aA]cácia\|[aA]cacia/, subs: function (achou) {
            return '[Acacia';
        }
    }, {
        reg: /\\\\\\cat/, subs: function (achou) {
            return '\n\[\[Categoria:Localidades do condado de Noble (Ohio)\]\]';
        }
    }, {
        reg: /\\\\\\bb/, subs: function (achou) {
            return '\n{\{Info/Biografia/Lua\}\}';
        }
    }, {
        reg: /\\\\\\ic/, subs: function (achou) {
            return '\n{\{Wikidata Infobox/core\}\}';
        }
    }, {
        reg: /\\\\\\mw/, subs: function (achou) {
            return '\n{\{Info/Monumento/Wikidata\}\}';
        }
    }, {
        reg: /\\\\\\il/, subs: function (achou) {
            return '\n{\{Info/Localidade\}\}';
        }
    }, {
        reg: /\\\\\\ie/, subs: function (achou) {
            return '\n{\{Info/Instituição educacional de pesquisa\}\}';
        }
    }, {
        reg: /\\\\\\poh/, subs: function (achou) {
            return '\n{\{Portal|Ohio\}\}';
        }
    }, {
        reg: /\\\\\\pbb/, subs: function (achou) {
            return '\n{\{Portal|Biografias\}\}';
        }
    }, {
        reg: /\\\\\\im1/, subs: function (achou) {
            return ' |imagem = {\{subst:Valor Wikidata|P18|numval=1\}\}\n |imagem_tamanho = 250px';
        }
    }, {
        reg: /\\\\\\ima/, subs: function (achou) {
            return '{\{subst:Valor Wikidata|P18|numval=1\}\}';
        }
    }, {
        reg: /\\\\\\pbo/, subs: function (achou) {
            return '\n{\{Portal|Botânica\}\}';
        }
    }, {
        reg: /\\\\\\pbi/, subs: function (achou) {
            return '\n{\{Portal|Biologia\}\}';
        }
    }, { // atalho sem infocaixa
        reg: /\\\\\\si/, subs: function (achou) {
            return '{\{sem infocaixa|taxonomia\}\}';
        }

        // atalho p.inserir refs do WD, escrevendo "\\\wf", \\\tf ... e correr ajustes p.inserir refs	
    }, {
        reg: /\\\\\\tb/, subs: function (achou) {
            return '\n\{\{taxonbar|from=\{\{subst:WD qid\}\}\}\}';
        }
    }, {
        reg: /\\\\\\tw/, subs: function (achou) {
            return '<{\{subst:Usuário:Dbastro/Predefinição45\}\}';
        }
    }, { //inserir estado ref com fonte em taxocaixa, ou 46 
        reg: /\\\\\\er/, subs: function (achou) {
            return '{\{subst:Usuário:Dbastro/Predefinição44\}\}';
        }
        // este atalho	e para inserir refs em artigos gerais wiki fontes, talvez EB
    }, {
        reg: /\\\\\\wf/, subs: function (achou) {
            return '<\{\{subst:Usuário:Dbastro/Predefinição26\}\}';
        }
        // este atalho serve para inserir refs em artigos montanhas	
    }, {
        reg: /\\\\\\wm/, subs: function (achou) {
            return '<\{\{subst:Usuário:Dbastro/Predefinição25\}\}';
        }
        // este atalho serve para inserir refs em artigos construções
    }, {
        reg: /\\\\\\w1/, subs: function (achou) {
            return '<\{\{subst:Usuário:Dbastro/Predefinição37\}\}';
        }
        // este atalho serve para inserir refs em taxo fontes (itis, fauna, worms)	
    }, {
        reg: /\\\\\\tf/, subs: function (achou) {
            return '<\{\{subst:Usuário:Dbastro/Predefinição27\}\}';
        }
        // este atalho e para inserir refs em artigos biografias
    }, {
        reg: /\\\\\\w4/, subs: function (achou) {
            return '<\{\{subst:Usuário:Dbastro/Predefinição40\}\}';
        }
        // este atalho e para inserir refs em artigos geografia
    }, {
        reg: /\\\\\\ir/, subs: function (achou) {
            return '\{\{Info/Rio/Wikidata\}\}';
        }
        // este atalho é para inserir refs em atletas
    }, {
        reg: /\\\\\\ws/, subs: function (achou) {
            return '<\{\{subst:Usuário:Dbastro/Predefinição29\}\}';
        }
        // este atalho é para inserir seção de referências
    }, {
        reg: /\\\\\\ref/, subs: function (achou) {
            return '== Referências ==\n\{\{Reflist\}\}';
        }
        // este atalho é para inserir pred. Nascidos Mortos
    }, {
        reg: /\\\\\\nm/, subs: function (achou) {
            return '\n\{\{subst:NM\/Testes2\}\}';
        }
        // este atalho é para inserir pred. Controle de autoridade
    }, {
        reg: /\\\\\\con/, subs: function (achou) {
            return '\n\{\{Controle de autoridade\}\}';
        }
    }, {
        reg: /\\\\\\dc/, subs: function (achou) {
            return '\{\{subst:Descrição curta\/Testes2\}\}';
        }
    }, {
        reg: /\\\\\\sb/, subs: function (achou) {
            return '\{\{subst:Usuário:Dbastro/Predefinição43\}\}';
        }
    }, {
        reg: /([^\\=]) +\n/, subs: function (achou) {
            return achou[1] + '\n';
        }
        /*    },{ // se tiver wayb entao arquivodata redundante
                reg: /(\{\{\s*[Cc]it(?:a|ar|ação|ation)[^}]+)(\|wayb\s*=\d*)\s*\|\s*arquivo\\-?data([^|}])/, subs: function (achou) {
                    return achou[1] + achou[2] + achou[3];
                }
            },{ //se existir colchete / parêntese reto e retirar
                reg: /(\{\{\s*[Cc]it(?:a|ar|ação|ation)[^}]+\|\s*(?:data|date)\s*=\s*)\[?\[(.?)\]\]?/, subs: function (achou) {
                    return achou[1] + achou[2];
                }*/
    }, { //se existir data seguido de número sem o igual = colocar =
        reg: /(\{\{\s*[Cc]it(?:a|ar|ação|ation)[^}]+\|\s*(?:data|date))\s*([0-9])/, subs: function (achou) {
            return achou[1] + '=' + achou[2];
        }
    }, { // colchete
        reg: /(\{\{\s*[Cc]it(?:a|ar|ação|ation)[^}]+\|\s*(?:acessadoem|acessodata|data|arquivodata|ano|m[eê]s|dia)\s*=\s*)\[\[([0-9][0-9][0-9]?[0-9]?\-[0-9][0-9]?\-[0-9][0-9]?[0-9]?[0-9?])\]\]?/, subs: function (achou) {
            return achou[1] + achou[2];
        }
    }, {
        reg: /(\{\{\s*[Cc]it(?:a|ar|ação|ation)[^}]+)(\|\s*(?:acessadoem|acessodata|data|arquivodata|ano|acesso|m[êe]s|transmissão)\s*=[^|}]+)(?:[Ee]nero|[Jj]anvier|[Gg]ennaio|[Xx]aneiro|[jJ]anuar|Січень|Январь|[sS]tyczeń|[Yy]anvar|[Jj]anuar[yi]|[Gg]ener|JANEIRO) /, subs: function (achou) {
            return achou[1] + achou[2] + 'janeiro ';
        }
    }, {
        reg: /(\{\{\s*[Cc]it(?:a|ar|ação|ation)[^}]+)(\|\s*(?:acessadoem|acessodata|data|arquivodata|ano|acesso|m[êe]s|transmissão)\s*=[^|}]+)(?:[Ff]évrier|[Ff]ebrei?ro|[Ff]ebbraio|[Ff]eb|[Ff]ebruar[iY]?|Лютий|Февраль|[Ff]evral|[Ff]ebrer|[Ff]evereiro\w|FEVEREIRO) /, subs: function (achou) {
            return achou[1] + achou[2] + 'fevereiro ';
        }
    }, {
        reg: /(\{\{\s*[Cc]it(?:a|ar|ação|ation)[^}]+)(\|\s*(?:acessadoem|acessodata|data|arquivodata|ano|acesso|m[êe]s|transmissão)\s*=[^|}]+)(?:[Mm]ars|Березень|Март|[Mm][aä]rzo?|[Mm]aa?rt|[Mm]arch|[Mm]arç|[Mm]aret|[Mm]archar|MARÇO) /, subs: function (achou) {
            return achou[1] + achou[2] + 'março ';
        }
    }, {
        reg: /(\{\{\s*[Cc]it(?:a|ar|ação|ation)[^}]+)(\|\s*(?:acessadoem|acessodata|data|arquivodata|ano|acesso|m[êe]s|transmissão)\s*=[^|}]+)(?:[Aa]vril|[Aa]prile?|[Aa]prel|Апрель|ABRIL|abrl) /, subs: function (achou) {
            return achou[1] + achou[2] + 'abril ';
        }
    }, {
        reg: /(\{\{\s*[Cc]it(?:a|ar|ação|ation)[^}]+)(\|\s*(?:acessadoem|acessodata|data|arquivodata|ano|acesso|m[êe]s|transmissão)\s*=[^|}]+)(?:[Mm][ae]i|Травень|Май|[Mm]ayo?|[Mm]aja|[Mm]ayu|[Mm]aggio|[Mm]aig|[Mm]ao|[Pp]oderia|MAIO|maj) /, subs: function (achou) {
            return achou[1] + achou[2] + 'maio ';
        }
    }, {
        reg: /(\{\{\s*[Cc]it(?:a|ar|ação|ation)[^}]+)(\|\s*(?:acessadoem|acessodata|data|arquivodata|ano|acesso|m[êe]s|transmissão)\s*=[^|}]+)(?:[Jj]un[ye]|[Jj]unio|[Jj]uin|[Gg]iugno|[Xx]uño|[Jj]uni|[İi]yun|[Jj]uhno|червня|Июнь|[Jj]unhho|JUNHO) /, subs: function (achou) {
            return achou[1] + achou[2] + 'junho ';
        }
    }, {
        reg: /(\{\{\s*[Cc]it(?:a|ar|ação|ation)[^}]+)(\|\s*(?:acessadoem|acessodata|data|arquivodata|acesso|m[êe]s|transmissão)\s*=[^|}]+)(?:[Jj]ulio|[Jj]uillet|[Ll]uglio|[Xx]ullo|[Jj]uli|[İi]yul|[Jj]uly|[Jj]uliol|Июль|JULHO) /, subs: function (achou) {
            return achou[1] + achou[2] + 'julho ';
        }
    }, {
        reg: /(\{\{\s*[Cc]it(?:a|ar|ação|ation)[^}]+)(\|\s*(?:acessadoem|acessodata|data|arquivodata|acesso|m[êe]s|transmissão)\s*=[^|}]+)(?:[Aa]oût|[aA]uguscht|[Aa]vqust|[Aa]ugust[a-z]?|[Aa]gost|[Aa]gustus|Август|AGOSTO|agoto|augusti) /, subs: function (achou) {
            return achou[1] + achou[2] + 'agosto ';
        }
    }, {
        reg: /(\{\{\s*[Cc]it(?:a|ar|ação|ation)[^}]+)(\|\s*(?:acessadoem|acessodata|data|arquivodata|acesso|m[êe]s|transmissão)\s*=[^|}]+)(?:[Ss]epti?embr[eo]|[Ss]ettembre|[Ss]entyabr|[Ss]eptember|[Ss]etembre|stembr?o|[Ss]etmbro|[sS]setenbro|Сентябрь|вересня|SETEMBRO) /, subs: function (achou) {
            return achou[1] + achou[2] + 'setembro ';
        }
    }, {
        reg: /(\{\{\s*[Cc]it(?:a|ar|ação|ation)[^}]+)(\|\s*(?:acessadoem|acessodata|data|arquivodata|acesso|m[êe]s|transmissão)\s*=[^|}]+)(?:[Oo]ctobre|[Oo]ctubre|[Oo]ttobre|[Oo]ktober|[Oo]ktyabr|[Oo]ctober|Октябрь|[Oo]uturbo|OUTUBRO) /, subs: function (achou) {
            return achou[1] + achou[2] + 'outubro ';
        }
    }, {
        reg: /(\{\{\s*[Cc]it(?:a|ar|ação|ation)[^}]+)(\|\s*(?:acessadoem|acessodata|data|arquivodata|acesso|m[êe]s|transmissão)\s*=[^|}]+)(?:[Nn]oviembre|[Nn]ovembre|[lL]istopad|[Nn]oyabr|[Nn]ovember|ноября|NOVEMBRO) /, subs: function (achou) {
            return achou[1] + achou[2] + 'novembro ';
        }
    }, {
        reg: /(\{\{\s*[Cc]it(?:a|ar|ação|ation)[^}]+)(\|\s*(?:acessadoem|acessodata|data|arquivodata|acesso|m[êe]s|transmissão)\s*=[^|}]+)(?:[Dd]dezembro[a-zA-Z]|[Dd]ici?embre|[Dd][eé][xc]embr[eo]|[Gg]rudnia|[Dd]ekabr|[Dd]e[cs]ember|[Dd]ecembre|[Dd]ezmbro|Декабрь|[Dd]dezembo|DEZEMBRO) /, subs: function (achou) {
            return achou[1] + achou[2] + 'dezembro ';
        }
    }, {
        reg: /(\{\{\s*[Cc]it(?:a|ar|ação|ation)[^}]+\|\s*(?:acessadoem|acessodata|data|arquivodata|acesso|m[êe]s|transmissão)\s*=\s*)[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9](\s*[\|\}])/, subs: function (achou) {
            return achou[1] + achou[2];
        }
    }, {
        reg: /(\{\{\s*[Cc]it(?:a|ar|ação|ation)[^}]+)(\|\s*(?:acessadoem|acessodata|data|arquivodata|acesso|m[êe]s|transmissão)\s*=\s*)[\.-]*([0-9][0-9]?[\.\/\-\]\[][0-9][0-9]?[\.\/-\]\[][1-2][0-9][0-9][0-9]\s*)[\/\.\]\[)-\w\] ]*([\|\}])/, subs: function (achou) {
            return achou[1] + achou[2] + achou[3] + achou[4];
        }
    }, { // data com link de ano
        reg: /(\{\{\s*[Cc]it(?:a|ar|ação|ation)[^}]+\|\s*(?:acessadoem|acessodata|data|arquivodata|ano)\s*=\s*[\.-]*[0-9]?[0-9]?\s?d?e?\s?[A-Za-zç]+ de )\[\[([0-9][0-9][0-9][0-9])\]\](\s*[\|\}])/, subs: function (achou) {
            return achou[1] + achou[2] + achou[3];
        }
    }, { // data sem espaço entre de
        reg: /(\{\{\s*[Cc]it(?:a|ar|ação|ation)[^}]+\|\s*(?:acessadoem|acessodata|data|arquivodata|ano)\s*=\s*[\.-]*[0-9][0-9]?)\s*[Dd][Dd]*[Ee][Ee]*\s*([A-Za-zç]+)\s*[Dd][Dd]*[Ee][Ee]*\s*(\[\[([0-9][0-9][0-9][0-9])\]\][\|\}])/, subs: function (achou) {
            return achou[1] + ' de ' + achou[2] + ' de ' + achou[3];
        }
    }, { // acesso data sem ano
        reg: /(\{\{\s*[Cc]it(?:a|ar|ação|ation)[^}]+\|\s*(?:acessadoem|acessodata|data|arquivodata|ano)\s*=\s*[\.-]*[0-9][0-9]?)\s*[Dd][Dd]*[Ee][Ee]*\s*([A-Za-zç]+)\s*[Dd][Dd]*[Ee][Ee]*\s*([\|\}])/, subs: function (achou) {
            return achou[1] + ' de ' + achou[2] + ' de ' + achou[3];
        }
        // data finaliza com Tdd-dd:dd	
    }, {
        reg: /(\{\{\s*[Cc]it(?:a|ar|ação|ation)[^}]+)(\|\s*(?:acessadoem|acessodata|data|arquivodata|ano)\s*=\s*)[\.-]*([0-9][0-9][0-9][0-9][\.\/\-][0-9][0-9]?[\.\/-][0-9][0-9]?\s*)T[0-9][0-9]?[\.\/-]?[0-9][0-9]?:?[0-9][0-9]?\w*/, subs: function (achou) {
            return achou[1] + achou[2] + achou[3];
        }
        // data ano inicia 03dd-dd-dd	
    }, {
        reg: /(\{\{\s*[Cc]it(?:a|ar|ação|ation)[^}]+\|\s*data\s*=)\s*0[0-3]([0-9][0-9]\s*-\s*[0-9]+\s*-[0-9]+)/, subs: function (achou) {
            return achou[1] + '20' + achou[2];
        }
        // data inicia dd a dd de mm de aaaa, subs. a por –	
    }, {
        reg: /(\{\{\s*[Cc]it(?:a|ar|ação|ation)[^}]+\|\s*data\s*=\s*[0-9][0-9]?) a ([0-9][0-9]? de )/, subs: function (achou) {
            return achou[1] + '–' + achou[2];
        }
    }, {
        reg: /(\{\{\s*[Cc]it(?:a|ar|ação|ation)[^}]+)(\|\s*(?:acessadoem|acessodata|data|arquivodata|ano)\s*=\s*[A-Za-zç]*)\s*de\s*\[*([0-9]*\s*)[\]\.]*([\|\}])/, subs: function (achou) {
            return achou[1] + achou[2] + ' de ' + achou[3] + achou[4];
        }
    }, {
        reg: /(\{\{\s*[Cc]it(?:a|ar|ação|ation)[^}]+)(\|\s*(?:acessadoem|acessodata|data|arquivodata|ano)\s*=\s*)[\.-]*([1-2][0-9][0-9][0-9][\.\/\-][0-9][0-9]?[\.\/\-][0-9][0-9]?\s*)[\/\.\]\[)-\w\] ]*([\|\}])/, subs: function (achou) {
            return achou[1] + achou[2] + achou[3] + achou[4];
        }
    }, {
        reg: /(\{\{\s*[Cc]it(?:a|ar|ação|ation)[^}]+)(\|\s*)(?:data|ano)(\s*=\s*.*)-XX\s*([\|\}])/, subs: function (achou) {
            return achou[1] + achou[2] + 'data' + achou[3] + achou[4];
        }
    }, {
        reg: /(\{\{\s*[Cc]it(?:a|ar|ação|ation)[^}]+\|\s*)(?:data|ano)(\s*=\s*)00[\-\/](\d{4}\s*[\|\}])/, subs: function (achou) {
            return achou[1] + 'data' + achou[2] + achou[3];
        }
        // data,ano sequência de anos 
    }, {
        reg: /(\{\{\s*[Cc]it(?:a|ar|ação|ation)[^}]+\|\s*)(?:data|ano)(\s*=\s*\d{4})[\-\/](\d{4}\s*[\|\}])/, subs: function (achou) {
            return achou[1] + 'data' + achou[2] + '–' + achou[3];
        }
        // data,ano ano e meses 
    }, {
        reg: /(\{\{\s*[Cc]it(?:a|ar|ação|ation)[^}]+\|\s*(?:data|ano)\s*=\s*)(\d{4})[\-\/ ](\w{3})[\-\/ ](\w{3})(\s*[\|\}])/, subs: function (achou) {
            return achou[1] + tradMes(achou[3]) + '–' + tradMes(achou[4]) + ' de ' + achou[2] + achou[5];
        }
    }, {
        reg: /(\{\{\s*[Cc]it(?:a|ar|ação|ation)[^}]+\|\s*)(?:data|ano)(\s*=\s*)[A-Z]{3} ([A-Z]{3}) (\d{2}) \d\d?:\d\d?:\d\d? [A-Z]{3} (\d{4})(\s*[\|\}])/, subs: function (achou) {
            return achou[1] + 'data' + achou[3] + ' ' + achou[2] + ' ' + achou[4] + ' ' + achou[5];
        }
    }, {
        reg: /(\{\{\s*[Cc]it(?:a|ar|ação|ation)[^}]+\|\s*(?:acessadoem|acessodata|data|arquivodata)\s*=\s*)\d\d?(?:| de |\/|-)[A-Za-z\.ç]+(?:| de |\/|-)\d{2,3}\s*([\|\}])/, subs: function (achou) {
            return achou[1] + achou[2];
        }
    }, {
        reg: /(\{\{\s*[Cc]it(?:a|ar|ação|ation)[^}]+\|\s*(?:acessadoem|acessodata|data|arquivodata)\s*=\s*)^[1-3]\d?(?:| de |\/|-)^[0-1]\d?(?:| de |\/|-)\d{2,3,4}\s*([\|\}])/, subs: function (achou) {
            return achou[1] + achou[2];
        }
    }, {
        reg: /(\{\{\s*[Cc]it(?:a|ar|ação|ation)[^}]+\|\s*(?:acessadoem|acessodata)\s*=\s*)(?:[A-Za-z.]+|)\d\d\d\d\s*([\|\}])/, subs: function (achou) {
            return achou[1] + achou[2];
        }
    }, {
        reg: /(\{\{\s*[Cc]it(?:a|ar|ação|ation)[^}]+)(\|acessodata\s*=\s*\d\d?)\.([A-Za-zç\. ]+\d\d\d\d\s*[\|\}])/, subs: function (achou) {
            return achou[1] + achou[2] + achou[3];
        }
    }, {
        reg: /(\{\{\s*[Cc]it(?:a|ar|ação|ation)[^}]+)(\|acessodata\s*=\s*.*\sde\s)de\s([\|\}])/, subs: function (achou) {
            return achou[1] + achou[2] + achou[3];
        }
    }, {
        reg: /(\{\{\s*[Cc]it(?:a|ar|ação|ation)[^}]+)((?:arquivo-?data|acessodata|data|)\s*=\s*\d\d? de [A-Za-zç]+ de \d\d\d\d\s+)[\.a-zA-Z-\d\:]+/, subs: function (achou) {
            return achou[1] + achou[2];
        }
    }, {
        reg: /(\{\{\s*[Cc]it(?:a|ar|ação|ation)[^}]+dat[ea]\s*=\s*\d\d?) e (\d\d? de [A-Za-zç]+ de \d\d\d\d\s+)/, subs: function (achou) {
            return achou[1] + '–' + achou[2];
        }
    }, {
        reg: /(\{\{\s*[Cc]it(?:a|ar|ação|ation)[^}]+)(\|a?[rc]?[qe]?[us]?[is]?[vo]?o?-?data\s*=\s*\d\d?)\.([A-Za-zç]+)\.(\d\d\d\d\s+)[\.\a-zA-Z\-\d\:\\)]]+/, subs: function (achou) {
            return achou[1] + achou[2] + ' de ' + achou[3] + ' de ' + achou[4];
        }
    }, {
        reg: /(\{\{\s*[Cc]it(?:a|ar|ação|ation)[^}]+)(\|\s*data\s*=\s*[1-2]\d\d\d)T[0-9][0-9]\:[0-9][0-9]+/, subs: function (achou) {
            return achou[1] + achou[2];
        }
    }, {
        reg: /(\{\{\s*[Cc]it(?:a|ar|ação|ation)[^}]+\|\s*autor\s*=\s*)\{\{[Aa]ut\|(.*)\}\}/, subs: function (achou) {
            return achou[1] + achou[2];
        }
    }, {
        reg: /(>)\s*\n+(\{\{\s*[Cc]it(?:ar web|e web|ation|ar livro|ar notícia|ar periódico|ar tese|ar relatório)[^<]+)\n+/, subs: function (achou) {
            return achou[1] + achou[2];
        }
    }, {
        reg: /(\{\{\s*[Cc]it(?:a|ar|ação|ation)[^}]+\s)\s+=/, subs: function (achou) {
            return achou[1] + '=';
        }
    }, {
        reg: /(\{\{\s*[Cc]it(?:a|ar|ação|ation)[^}]+\|a?[rc]?[qe]?[us]?[is]?[vo]?o?-?data\s*=\s*)[SsTtQqDd](?:egunda|erça|uarta|uinta|exta|ábado|omingo)-?[Ff]?e?i?r?a?,?/, subs: function (achou) {
            return achou[1];
        }
    }, {
        reg: /(\{\{\s*[Cc]it(?:a|ar|ação|ation)[^}]+)(\|a?[rc]?[qe]?[us]?[is]?[vo]?o?-?data\s*=\s*)\[?\[([\w\d\sç]+)\]?\]?/, subs: function (achou) {
            return achou[1] + achou[2] + achou[3];
        }
    }, {
        reg: /(\{\{\s*[Cc]it(?:a|ar|ação|ation)[^}]+)(\|a?[rc]?[qe]?[us]?[is]?[vo]?o?-?data\s*=\s*\d\d?)\.(\d\d?)\.(\d\d\d\d)/, subs: function (achou) {
            return achou[1] + achou[2] + '-' + achou[3] + '-' + achou[4];
        }
    }, {
        reg: /(\{\{\s*[Cc]it(?:a|ar|ação|ation)[^}]+\|\s*)co-?autor\s*=\s*([A-Za-zàáâãçéêíòóôõúüñÀÁÂÃÇÉÊÍÒÓÔÕÚÑ\.\-' ]+,\s*[A-Za-zàáâãçéêíòóôõúüñÀÁÂÃÇÉÊÍÒÓÔÕÚÑ\.\-' ]+)\se\s([A-Za-zàáâãçéêíòóôõúüñÀÁÂÃÇÉÊÍÒÓÔÕÚÑ\.\-' ]+,\s*[A-Za-zàáâãçéêíòóôõúüñÀÁÂÃÇÉÊÍÒÓÔÕÚÑ\.\-' ]+)\s*([\||\}])/, subs: function (achou) {
            return achou[1] + 'autor2=' + achou[2] + '|autor3=' + achou[3] + achou[4];
        }
    }, {
        reg: /(\{\{\s*[Cc]it(?:a|ar|ação|ation)[^}]+)(\|\s*ano\s*=\s*)(\d\d?\.[ºª])\s*[Ee]dição,?\s*([\w\síç\]\[]{3,}),?\s*(\d\d\d\d)/, subs: function (achou) {
            return achou[1] + achou[2] + achou[5] + '|edição=' + achou[3] + '|local=' + achou[4];
        }
    }, {
        reg: /(\{\{\s*[Cc]it(?:a|ar|ação|ation)[^}]+)(\|\s*ano\s*=\s*)([\w\síç]{3,}),?\s*(\d\d\d\d)/, subs: function (achou) {
            return achou[1] + achou[2] + achou[4] + '|local=' + achou[3];
        }
    }, {
        reg: /(\{\{\s*[Cc]it(?:a|ar|ação|ation)[^}]+)(\|\s*(?:ano|data)\s*=\s*[1-2][0-9][0-9][0-9])-([1-2][0-9][0-9][0-9])/, subs: function (achou) {
            return achou[1] + achou[2] + '–' + achou[3];
        }
    }, {
        reg: /(\{\{\s*[Cc]it(?:a|ar|ação|ation)[^}]+)(\|\s*(?:ano|data)\s*=\s*)([1-2][0-9])([0-9][0-9])[-–]([0-9][0-9]\s*[\|\}])/, subs: function (achou) {
            return achou[1] + achou[2] + achou[3] + achou[4] + '–' + achou[3] + achou[5];
        }
    }, {
        reg: /(\{\{\s*[Cc]it(?:a|ar|ação|ation)[^}]+)(\|\s*(?:ano|data)\s*=\s*[0-9][0-9][0-9]?)-([0-9][0-9][0-9]? de )/, subs: function (achou) {
            return achou[1] + achou[2] + '–' + achou[3];
        }
    }, {
        reg: /(\{\{\s*[Cc]it(?:a|ar|ação|ation)[^}]+)(\|\s*(?:ano|data)\s*=\s*)\{\{[Ss][ée]c\|([A-Z\s]*)\}\}/, subs: function (achou) {
            return achou[1] + achou[2] + 'século ' + achou[3];
        }
    }, {
        reg: /(\{\{\s*[Cc]it(?:a|ar|ação|ation)[^}]+)(\|\s*edi[çc][ãa]o\s*=\s*[[0-9][a-zA-Z]\. ]*)ed ([\|\}])/, subs: function (achou) {
            return achou[1] + achou[2] + achou[3];
        }
    }, {
        reg: /(\{\{\s*[Cc]it(?:a|ar|ação|ation)[^}]+)(\|\s*p[aá]ginas?\s*=\s*)(:?pág\.?|pg|\.|p\.?p?\.?)/, subs: function (achou) {
            return achou[1] + achou[2];
        }
    }, {
        reg: /(\{\{\s*[Cc]it(?:a|ar|ação|ation)[^}]+)(\|\s*)p[aá]ginas?(\s*=\s*)[Vv](?:ol\.|olumes?)/, subs: function (achou) {
            return achou[1] + achou[2] + 'volume' + achou[3];
        }
    }, {
        reg: /(\{\{\s*[Cc]itar) web([^}]*\|\s*)[Uu][Rr][Ll](\s*=\s*https?\:\/\/www\.sports\-reference\.com\/olympics)/, subs: function (achou) {
            return achou[1] + ' sports-reference' + achou[2] + 'url' + achou[3];
        }
    }, {
        reg: /<((?:small|div|blockquote|center|sup|b|i|span))\s*\/>/, subs: function (achou) {
            return '</' + achou[1] + '>';
        }
    }, {
        reg: /(<div style="clear\:left;")\s*\/>/, subs: function (achou) {
            return achou[1] + '></div>';
        }
    }, {
        reg: /(\{\{[lL]ink\s*\|\s*1?\=?\s*j)p/, subs: function (achou) {
            return achou[1] + 'a';
        }
    }, {
        reg: /(\{\{\s*[Ll]ink\s*\|[^}]+)(\|\s*(?:acdt|acessodata|acessadoem|data)\s*=\s*)\{\{[dD]tlink\|\s*(\d\d?)\s*\|\s*(\d\d?)\s*\|\s*(\d\d\d\d)\s*\}\}\.?/, subs: function (achou) {
            return achou[1] + achou[2] + achou[3] + '-' + achou[4] + '-' + achou[5];
        }
        /*            },{
                        reg: /(\{\{\s*[Cc]it(?:a|ar|ação|ation)[^}]+)\n+\s*(\|\s*(?:acessodata|acesso\-data|data|título|titulo|url|obra|coautor\d?|autor\d?|capítulo|urlcapítulo|l[íi]ngua|series|publicado|publicadopor|arquivodata|arquivourl|urlmorta|notas|outros|wayb|website|local|ano|editora|edição|p[aá]ginas?|volume|n[úu]mero|autorlink|[úu]ltimo\d*|primeiro\d*|sobrenome\d*|apelido\d*|nome\d*|editor\d*|tradutor\d*|periódico|bibcode|id|arxiv|doi|pmid|pmc|versão|isbn|issn|local|urlcapítulo|publicação|editor\d?|ano|m[eê]s|tipo|ref|jornal|grau|instituição|editor-sobrenome\d*|editor-nome\d*|editor-link\d*|contribuição|mr|local\-publica[cç][aã]o)\s*=\s*)/, subs: function (achou) {
                            return achou[1] + achou[2];
                        }*/
    },
    {
        reg: /(=\s*)(?:[Ll]igações Extern[oa]s|[Pp]áginas externas|[Ll]inks? [Ee]xtern[oa]s?|[Ll]igação extern[oa]s?|[Ee]nlaces extern[ao]s)/, subs: function (achou) {
            return achou[1] + 'Ligações externas';
        }
    }, {
        reg: /\[\[\s*[Cc]ategoria:!(?:Páginas com traduções não revistas|Artigos novos)\]\]\s*\n?/, subs: function (achou) {
            return '';
        }
    }, {
        reg: /\{\s*[Ff]ossil\s*range/, subs: function (achou) {
            return '{período fóssil';
        }
    }, {
        reg: /\{\{\s*!FDP\s*\}\}\n*/, subs: function (achou) {
            return '';
        }
    }, {
        reg: /\[\[[cC]ategoria:([a-z])/, subs: function (achou) {
            return '\[\[Categoria:\{\{safesubst:UCFIRST:' + achou[1] + '\}\}';
        }
    }, {
        reg: /(\[\[Categoria:.*\]\])(\[\[Categoria:)/, subs: function (achou) {
            return achou[1] + '\n' + achou[2];
        }
    }, {
        reg: /\[\[Category:/, subs: function (achou) {
            return '\[\[Categoria:';
        }
    }, {
        reg: /\'\'in\'\' <b>Flora e Funga do Brasil.<\/b>\s*</, subs: function (achou) {
            return '\'\'in Flora e Funga do Brasil\'\'.<';
        }
    }, {
        reg: /<\s*ref\>\{\{[Cc]itar web\s*\|url=http:\/\/www\.worldfloraonline\.org\/taxon\/\{\{#property:P7715\}\}\s*\|titulo=[A-Za-zà— ]*\|acessodata=[0-9- ]+\|website=www\.worldfloraonline\.org\}\}<\/ref>/, subs: function (achou) {
            return '<\{\{subst:Usuário:Dbastro\/Predefinição45\}\}';
        }
    }, {
        reg: /\{\{(?:[Rr]eferencias|[Rr]efer[êe]ncia|[Rr]efer[êe]ncias?\|[0-9]0?e?m?|[Rr]ef-section|[Rr]éférences|[lL]ista de referências|[Rr]eferences)\}\}/, subs: function (achou) {
            return '\{\{Referências\}\}';
        }
    }, {
        reg: /\{\{[Ll]igação inativa\|1=\{\{subst:DATA\}\}/, subs: function (achou) {
            return '{{Ligação inativa|data=maio de 2019';
        }
    }, {
        reg: /\{\{[Ll]igação inativa\|1=data=maio de 2019/, subs: function (achou) {
            return '{{Ligação inativa|data=maio de 2019';
        }
    }, {
        reg: /\|<nowiki> *<\/nowiki>/, subs: function (achou) {
            return '|';
        }
    }, {
        reg: /\}\}\s*\{\{\s*\[Ss]subscription required/, subs: function (achou) {
            return '|acesso-url=subscrição';
        }
    }, {
        reg: /(\n *(?:==|\{\{)\s*referências\s*(?:==|(?:\|[^\}]*)?\}\})[\s\S]*)(\n\s*==\s*ver também\s*==[\s\S]*)/i, subs: function (achou) {
            var p1 = achou[2], p2 = "";

            var maisSecao;
            while (maisSecao = p1.match(/(\n\s*==\s*ver também\s*==[\s\S]*)(\n\s*==\s*[^=]*\s*==[\s\S]*)/i)) {
                p1 = maisSecao[1];
                p2 = maisSecao[2] + p2;
            }

            if (!p2) {
                while (maisSecao = p1.match(/(\n\s*==\s*ver também\s*==[\s\S]*)(\n\s*(?:\[\[categor(?:ia|y)\:.*\]\]|\{\{.*\}\})[\s\S]*)/i)) {
                    p1 = maisSecao[1];
                    p2 = maisSecao[2] + p2;
                }
            }

            return p1.replace(/(.)\n*$/, "$1\n") + achou[1] + p2;
        }
    }];

foraDePredef = [
    {
        reg: /(\n\*[^\n]+)<\s*br\s*\/?>(\s*\n)/i, subs: function (achou) {
            return achou[1] + achou[2];
        }
    }, {
        reg: /(\n\*[^\n]+)\n\:\*/, subs: function (achou) {
            return achou[1] + "\n**";
        }
    }];

//predefinições com exceção de verificação
excecoes = [];

function substComExcecao(texto, cond, excecoes) {
    var tmp = '';

    for (var j = 0; j < cond.length; j++) {
        while (texto) {
            var pos = texto.search(cond[j].reg);
            while (excecoes.length > 0 && pos != -1) {
                var exce = -1;
                for (var i = 0; i < excecoes.length; i++) {
                    var _exce = texto.search(excecoes[i]);
                    if ((exce == -1) || (_exce != -1 && _exce < exce))
                        exce = _exce;
                }
                if (exce == -1) {
                    pos = texto.search(cond[j].reg);
                    break;
                }
                if (pos < exce) {
                    pos = texto.search(cond[j].reg);
                    break;
                }
                var bloco = 0;
                var exceInicial = exce;
                for (; exce < texto.length; exce++) {
                    if (texto.charAt(exce) == '{' && texto.charAt(exce + 1) == '{') {
                        bloco++;
                        exce++; //O próximo char já foi verificado
                    }
                    else if (texto.charAt(exce) == '}' && texto.charAt(exce + 1) == '}') {
                        bloco--;
                        exce++; //O próximo char já foi verificado
                    }
                    if (bloco == 0) break;
                }
                if (bloco != 0) {
                    var linhas = (tmp + texto.substring(0, exceInicial)).split('\n');
                    var erro = "Erro: O bloco da predefinição na linha: "
                        + linhas.length + ", e posição: "
                        + (linhas[linhas.length - 1].length + 1) + " nunca é fechado";

                    mw.notify(erro);
                    throw erro;
                }
                tmp += texto.substring(0, exce);
                texto = texto.substring(exce);
                pos = texto.search(cond[j].reg);
            }

            if (pos > -1) {
                tmp += texto.substring(0, pos);
                texto = texto.substring(pos);
                var achou = texto.match(cond[j].reg);
                texto = texto.replace(achou[0], '');
                tmp += cond[j].subs(achou);
            } else {
                tmp += texto;
                texto = "";
            }
        }
        texto = tmp;
        tmp = '';
    }
    return texto;
}

function substApenas(texto, cond, apenas, excecoes) {
    var tmp = '';

    while (texto) {
        var apen = -1;
        for (var i = 0; i < apenas.length; i++) {
            var _apen = texto.search(apenas[i]);
            if ((apen == -1) || (_apen != -1 && _apen < apen))
                apen = _apen;
        }
        if (apen == -1) {
            tmp += texto;
            texto = '';
            break;
        }

        var bloco = 1;
        var apenInicial = apen;
        for (++apen; apen < texto.length; apen++) {
            if (texto.charAt(apen) == '{' && texto.charAt(apen + 1) == '{') {
                bloco++;
                apen++; //O próximo char já foi verificado
            }
            else if (texto.charAt(apen) == '}' && texto.charAt(apen + 1) == '}') {
                bloco--;
                apen++; //O próximo char já foi verificado
            }
            if (bloco == 0) break;
        }
        if (bloco != 0) {
            var linhas = (tmp + texto.substring(0, apenInicial)).split('\n');
            var erro = "Erro: O bloco da predefinição na linha: "
                + linhas.length + ", e posição: "
                + (linhas[linhas.length - 1].length + 1) + " nunca é fechado";

            mw.notify(erro);
            throw erro;
        }
        if (excecoes) {
            apenInicial++;
            tmp += texto.substring(0, apenInicial)
                + substComExcecao(texto.substring(apenInicial, apen), cond, excecoes);
        } else tmp += texto.substring(0, apenInicial)
            + substituir(texto.substring(apenInicial, apen), cond);
        texto = texto.substring(apen);
    }

    return tmp;
}

function substituir(texto, cond) {
    var tmp = '';

    for (var j = 0; j < cond.length; j++) {
        while (texto) {
            var pos = texto.search(cond[j].reg);
            if (pos > -1) {
                tmp += texto.substring(0, pos);
                texto = texto.substring(pos);
                var achou = texto.match(cond[j].reg);
                texto = texto.replace(achou[0], '');
                tmp += cond[j].subs(achou);
            } else {
                tmp += texto;
                texto = "";
            }
        }
        texto = tmp;
        tmp = '';
    }
    return texto;
}

function validarSintaxePredefinicoes(temp, janela) {
    // Verificar se há blocos não fechados
    var bloco = 0;
    var pbloco = 0;
    for (var pos = 0; pos < temp.length; pos++) {
        if (temp.charAt(pos) == '<') {
            var partes = 0;
            var identif = ['math', 'nowiki'];
            var palavra = '';
            pos++;
            escopo: while (pos < temp.length) {
                switch (partes) {
                    case 0:
                        if (/^\s$/.test(temp.charAt(pos))) {
                            pos++;
                            continue escopo;
                        }
                        partes++;
                        break;
                    case 1:
                        var c = temp.charAt(pos).toLowerCase();
                        if (/^[a-z]$/.test(c)) {
                            palavra += c;
                            pos++;
                            partes++;
                            continue escopo;
                        } else break escopo;
                        break;
                    case 2:
                        var c = temp.charAt(pos).toLowerCase();
                        if (/^[a-z]$/.test(c)) {
                            palavra += c;
                            pos++;
                            continue escopo;
                        } else partes++;
                        break;
                    case 3:
                        for (var i = 0; i < identif.length; i++) {
                            if (palavra == identif[i]) {
                                partes++;
                                break;
                            }
                        }
                        if (partes == 3) break escopo;
                        break;
                    case 4:
                        if (temp.charAt(pos) == '/' && temp.charAt(pos + 1) == '>')
                            break escopo;
                        if (temp.charAt(pos) == '>') partes++;
                        pos++;
                        break;
                    case 5:
                        if (temp.charAt(pos) == '<') partes++;
                        pos++;
                        break;
                    case 6:
                        var b = false;
                        if (/^[\s\/]$/.test(temp.charAt(pos))) {
                            if (temp.charAt(pos) == '/') {
                                if (b) {
                                    partes = 5;
                                } else b = true;
                            }
                            pos++;
                            continue escopo;
                        }
                        partes++;
                        break;
                    case 7:
                        for (var num = 0; num < palavra.length; num++) {
                            if (palavra[num] != temp.charAt(pos).toLowerCase()) {
                                partes = 5;
                                break;
                            }
                            pos++;
                        }
                        if (partes == 7) partes++;
                        break;
                    case 8:
                        if (/^[^>]$/.test(temp.charAt(pos))) pos++;
                        else { pos++; break escopo }
                        break;
                }
            }
        }
        if (temp.charAt(pos) == '{' && temp.charAt(pos + 1) == '{') {
            if (bloco == 0) pbloco = pos;
            bloco++;
            pos++; //O próximo char já foi verificado
        } else if (temp.charAt(pos) == '}' && temp.charAt(pos + 1) == '}') {
            bloco--;
            pos++; //O próximo char já foi verificado
        }
        if (bloco == -1) {
            var linhas = temp.substring(0, pos).split('\n');
            var textAviso = "<div style='color: red'>Aviso:</div> Na linha: " + linhas.length + ", e posição: " + linhas[linhas.length - 1].length + " teve bloco fechado sem nenhum aberto.";

            if (window.ve && window.ve.init) {
                if (!window.avisove) {
                    textAviso += " Para ignorar clique novamente em 'Ajustes'";
                    mw.notify(textAviso);
                }
            } else {
                janela.document.getElementById("editpage-copywarn").innerHTML += textAviso
                    + " Para ignorar clique em 'Mostrar alterações'";
            }
            aviso = true;
            bloco = 0;
        }
    }
    if (bloco != 0) {
        var linhas = temp.substring(0, pbloco).split('\n');
        var erro = "Erro: O bloco da predefinição na linha: "
            + linhas.length + ", e posição: "
            + (linhas[linhas.length - 1].length + 1) + " nunca é fechado";

        mw.notify(erro);
        throw erro;
    }
}


function subsTextoBox(janela, ajustesCatolicos = false) {
    if (janela == window) _();
    else $(janela).load(_);

    function _() {
        if (!janela.aposWait) {
            janela.box = null;
            janela.sumarioEl = null;
        }
        janela.aposWait = undefined;

        if (janela.ve && janela.ve.init) {
            var mode = janela.ve.init.target.surface.getMode();
            if (mode == 'source') {
                box = {
                    valor: janela.ve.init.target.surface.model.documentModel.data.getSourceText(),
                    get value() {
                        return this.valor == null
                            ? '' : this.valor;
                    },
                    set value(val) {
                        this.valor = val.toString();
                    }
                };

                var tmp = $('.ve-ui-mwSaveDialog-summary');
                if (tmp.length > 0)
                    sumarioEl = tmp[0];
                else
                    sumarioEl = {
                        get value() {
                            return janela.ve.init.target.editSummaryValue == null
                                ? '' : janela.ve.init.target.editSummaryValue;
                        },
                        set value(val) {
                            janela.ve.init.target.editSummaryValue = val.toString();
                        }
                    };
            } else if (mode == 'visual') {
                if (!janela.box) {
                    //janela.ve.dm.MWWikitextSurfaceFragment.prototype.convertToSource(ve.init.target.surface.model.documentModel).done(function (source) {
                    wikitextPromise = ve.init.target.getWikitextFragment(ve.init.target.surface.model.documentModel, true);
                    ve.init.target.getSurface().createProgress(wikitextPromise, 'Gerando o WikiTexto').done(function (progressBar, cancelPromise) {
                        cancelPromise.fail(function () {
                            wikitextPromise.abort();
                        });
                    });
                    wikitextPromise.done(function (source) {
                        box = {
                            valor: source,
                            get value() {
                                return this.valor == null
                                    ? '' : this.valor;
                            },
                            set value(val) {
                                this.valor = val.toString();
                            }
                        };

                        var tmp = $('.ve-ui-mwSaveDialog-summary');
                        if (tmp.length > 0)
                            sumarioEl = tmp[0];
                        else
                            sumarioEl = {
                                get value() {
                                    return janela.ve.init.target.editSummaryValue == null
                                        ? '' : janela.ve.init.target.editSummaryValue;
                                },
                                set value(val) {
                                    janela.ve.init.target.editSummaryValue = val.toString();
                                }
                            };

                        janela.aposWait = true;
                        subsTextoBox(janela, ajustesCatolicos);
                    }).fail(function () {
                        mw.notify('Falhou ao tentar obter código fonte');
                    });
                    return;
                }
            } else {
                return;
            }
        } else if (janela.wikEd && janela.wikEd.textarea) {
            if (janela.wikEd.useWikEd === true)
                janela.wikEd.UpdateTextarea();
            box = janela.wikEd.textarea;
            janela.wikEd.useWikEd = false;
        } else if (janela.$('.CodeMirror').length) {
            try {
                box = janela.$('.CodeMirror')[0].CodeMirror;

                box.__defineGetter__('value', function () {
                    return this.getValue();
                });
                box.__defineSetter__('value', function (val) {
                    this.setValue(val);
                });
            } catch (e) {
                box = janela.document.getElementById('wpTextbox1');
            }

        } else {
            box = janela.document.getElementById('wpTextbox1');
        }
        if (!window.sumarioEl)
            sumarioEl = janela.document.getElementById('wpSummary');

        var temp = box.value;
        var mudou = {};
        var sumario = '';
        var comp;
        var escape = 0;
        var sumGeral = false;

        aviso = false;

        validarSintaxePredefinicoes(temp, janela);

        comp = temp.replace(/\{\{[Pp]redefinição:/g, "{{");
        if (comp != temp) {
            temp = comp;
            sumGeral = true;
        }


        for (var i = 0; i < citacoes.ordem.length; i++) {
            var obj = citacoes[citacoes.ordem[i]];
            escape = 0;
            do {
                if (escape == 9) {
                    mw.notify('Parece haver algo errado na operação: '
                        + obj.sumario + '. Parando a execução');
                    return;
                }
                escape++;
                comp = temp;
                temp = substApenas(temp, obj.cond, citacoes.apenas, [/\{\{/]);
                if ((!mudou[citacoes.ordem[i]]) && comp != temp) {
                    mudou[citacoes.ordem[i]] = true;
                    if (sumario)
                        sumario += ', ';
                    sumario += obj.sumario;
                }
            } while (comp != temp);
        }
        if (sumario) sumario += ' nas citações';

        escape = 0;
        do {
            if (escape == 30) {
                mw.notify("Parece haver algo errado ao aplicar ajustes gerais. Parando a execução");
                return;
            }
            escape++;
            comp = temp;
            temp = substComExcecao(temp, foraDePredef, [/\{\{/]);
            if ((!mudou.outros) && comp != temp) {
                sumGeral = true;
            }
        } while (comp != temp);


        if (ajustesCatolicos) {
            escape = 0;
            do {
                if (escape == 9) {
                    mw.notify('Parece haver algo errado na operação: correções católicas. Parando a execução');
                    return;
                }
                escape++;
                comp = temp;
                temp = substituir(temp, catolicismo);
                if ((!mudou.catolicismo) && comp != temp) {
                    mudou.catolicismo = true;
                    if (sumario != '')
                        sumario += ', ';
                    sumario += 'Correções de termos católicos';
                }
            } while (comp != temp);
        }

        escape = 0;
        do {
            if (escape == 12) {
                mw.notify("Parece haver algo errado ao aplicar ajustes gerais. Parando a execução");
                return;
            }
            escape++;
            comp = temp;
            temp = substituir(temp, geral);
            if ((!mudou.outros) && (comp != temp || sumGeral)) {
                mudou.outros = true;
                if (sumario != '')
                    sumario += ', outros ';
                sumario += 'ajustes';
            }
        } while (comp != temp);

        box.value = temp;

        if (sumario != '')
            sumario += ' usando [[Wikipédia:Scripts|script]]';
        {
            var tmpSmr = sumarioEl.value;
            if (tmpSmr) sumario += (sumario ? ', ' : '') + tmpSmr;
        }
        sumarioEl.value = sumario;

        if (!(janela.ve && janela.ve.init)) {
            var tmp = janela.document.getElementById('wpMinoredit');
            if (tmp)
                tmp.checked = true;
            if (!aviso) {
                //janela.document.getElementById('wpPreview').click();
                janela.document.getElementById('wpDiff').click();
                //janela.document.getElementById('wpSave').click();
            }
            box = null;
            sumarioEl = null;
        } else {
            if (aviso) {
                if (!window.avisove) {
                    avisove = true;
                    return;
                }
            }
            avisove = false;

            var form = $('<form style="display:none" method="post" action="/wiki/' + janela.mw.config.get('wgPageName')
                + '"><input name="action" value="' + 'submit'
                + '"><textarea name="wpTextbox1">'
                + '</textarea><input name="wpSummary" value="' + sumarioEl.value
                + '"><input name="wpMinoredit" value="' + 'on'
                + '"><input name="wpDiff" value="' + 'Mostrar alterações'
                + '"><input name="editRevId" value="' + janela.mw.config.get("wgCurRevisionId")
                + '"><input name="parentRevId" value="' + janela.mw.config.get("wgCurRevisionId")
                + '"><input name="baseRevId" value="' + janela.mw.config.get("wgCurRevisionId")
                + '"><input name="wpStarttime" value="' + (new Date()).toISOString().replace(/[^0-9]/g, "").slice(0, -3)
                + ($("#ca-unwatch").length ? '"><input name="wpWatchthis" checked type="checkbox' : '')
                + '"><input name="mode" value="diff'
                + '"><input name="model" value="wikitext'
                + '"><input name="format" value="text/x-wiki'
                + '"><input name="wpUltimateParam" value="1'
                + '"></form>');

            form.find("textarea").val(box.value);
            $(document.body).append(form);
            window.onbeforeunload = null;
            form.submit();
        }
    }
}

var categoria;
var afluentes;
if (categoria = document.getElementById('mw-pages')) {
    if (categoria = categoria.getElementsByClassName('mw-content-ltr')[0]) {
        fCategoria = function () {
            categoria.innerHTML = substituir(categoria.innerHTML, links);
        };
        categoria.innerHTML = '<input type="button" value="Criar links de edição automática" onclick    ="fCategoria()" ><br>' + categoria.innerHTML;
    }
} else if (afluentes = document.getElementById("mw-whatlinkshere-list")) {
    fAfluentes = function () {
        afluentes.innerHTML = substituir(afluentes.innerHTML, links);
    };
    afluentes.innerHTML = '<input type="button" value="Criar links de edição automática" onclick ="fAfluentes()" ><br>' + afluentes.innerHTML;
    //afluentes.innerHTML = substituir(afluentes.innerHTML, links);
} else if (document.getElementById('wpTextbox1') && document.getElementById('wpDiff')) {
    document.getElementById('wpDiff').outerHTML =
        document.getElementById('wpDiff').outerHTML.replace('accesskey="v"', 'accesskey="d"')
            .replace('alt-shift-v', 'alt-shift-d')
        + '\n<input id="Ajustes automáticos" '
        + 'name="Ajustes automáticos" tabindex="7" title="Ajustes automáticos [alt-shift-a]" '
        + 'type="button" class="' + $("#wpDiff").prop("class") + '" value="Ajustes automáticos" accesskey="a" onclick="subsTextoBox(window)">';
    // subsTextoBox(window)
}

function isVe() {
    var tentativas = 5;

    mw.loader.using('ext.visualEditor.ve').then(function () {
        var intervalo = setInterval(function () {
            if (ve.init) {
                if ($('.ve-ui-toolbar-ajustes').length || tentativas-- < 1) {
                    clearInterval(intervalo);
                } else if (ve.init.target && ve.init.target.surface) {
                    var mode = ve.init.target.surface.getMode();
                    if (mode == 'source' || mode == 'visual') {

                        temp = document.createElement("z");
                        tempForCatolicos = document.createElement("ajcat")

                        var refItem = $('.oo-ui-tool-name-showSave')[0];

                        if (refItem) {
                            $(refItem).after(temp);
                            temp.outerHTML = refItem.outerHTML;

                            $($('.ve-ui-toolbar-saveButton')[1])
                                .removeClass('ve-ui-toolbar-saveButton')
                                .addClass('ve-ui-toolbar-ajustes');

                            $('.ve-ui-toolbar-ajustes').find('.oo-ui-tool-title').html('Ajustes');
                            $($('.oo-ui-tool-name-showSave')[1])
                                .removeClass('oo-ui-tool-name-showSave')
                                .removeClass('oo-ui-widget-disabled')
                                .addClass('oo-ui-widget-enabled')
                                .parent()
                                .removeClass('oo-ui-toolGroup-disabled-tools')
                                .addClass('oo-ui-toolGroup-enabled-tools');

                            $('.ve-ui-toolbar-ajustes').click(function () {
                                subsTextoBox(window, false);
                            });



                            var originalButton = $('.oo-ui-tool-name-showSave');
                            var newButton = originalButton.clone();

                            newButton.find('.oo-ui-tool-title').text('CatolicoFIX');
                            newButton.find('.oo-ui-tool-title').css('color', 'white');

                            newButton.attr('title', 'Executar CatolicoFIX');

                            originalButton.after(newButton);

                            newButton.removeClass('oo-ui-widget-disabled');
                            newButton.removeAttr('aria-disabled');


                            newButton.css('background-color', '#cc9c33');

                            newButton.on('click', function (event) {
                                event.preventDefault();
                                subsTextoBox(window, true);
                            });


                        }
                    }
                }
            }
        }, 5000);
    });
}
isVe();

$(document).ready(function () {
    $('#ca-ve-edit').click(isVe);
});
