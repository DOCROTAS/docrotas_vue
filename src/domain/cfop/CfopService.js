export default class CfopService {
    
    constructor (http) {
        this._http = http;
    }

    salvar (cfop) {
        return this._http.post('cfop', cfop).then(res => res.body);
    }

    buscarComPaginacao (pagina, quantidade) {
        var pag = pagina - 1;
        return this._http.get('cfop?pagina=' + pag + '&qtd=' + quantidade).then(res => res.body);
    }

    excluir (id) {
        return this._http.delete('cfop/' + id);
    }

    buscarPorId (id) {
        return this._http.get('cfop/' + id).then(res => res.body);
    }

    buscarComFiltro(pagina, quantidade, campo, valor) {
        var pag = pagina - 1;
        return this._http.get('cfop?pagina=' + pag + '&qtd=' + quantidade + '&' + campo + '=' + valor).then(res => res.body);
    }
}