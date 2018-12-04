export default class Usuario {
    
    constructor(id, numero, serie, empresa, remetente, destinatario, tomador, vlrFrete, vlrMercadoria, cfop, baseCalculo, aliquota, vlrIcms, produto, chaveAcesso, protocoloLote, protocoloAutorizacao, dtCriacao, dtAlteracao, dtProtocoloLote, dtProcolocoloAutorizacao) {
        this.id = id;
        this.numero = numero;
        this.serie = serie;
        this.empresa = empresa;
        this.remetente = remetente;
        this.destinatario = destinatario;
        this.tomador = tomador;
        this.vlrFrete = vlrFrete;
        this.vlrMercadoria = vlrMercadoria;
        this.cfop = cfop;
        this.baseCalculo = baseCalculo;
        this.aliquota = aliquota;
        this.vlrIcms = vlrIcms;
        this.produto = produto;
        this.chaveAcesso = chaveAcesso;
        this.protocoloLote = protocoloLote;
        this.protocoloAutorizacao = protocoloAutorizacao;
        this.dtCriacao = dtCriacao;
        this.dtAlteracao = dtAlteracao;
        this.dtProtocoloLote = dtProtocoloLote;
        this.dtProcolocoloAutorizacao = dtProcolocoloAutorizacao;
    }
}