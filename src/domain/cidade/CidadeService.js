export default class CidadeService {

    constructor (http) {
        this._http = http;
    }

    buscarPorId (id) {
        return this._http.get('cidade/' + id).then(res => res.body);
    }

    buscarComPaginacao (pagina, quantidade) {
        return this._http.get('cidade?pagina=' + (pagina - 1) + '&qtd=' + quantidade).then(res => res.body);
    }

    buscarComFiltro (pagina, quantidade, campo, valor) {
        return this._http.get('cidade?pagina=' + (pagina - 1) + '&qtd=' + quantidade + '&' + campo + '=' + valor).then(res => res.body);

    }

    salvar (cidade) {
        return this._http.post('cidade', cidade).then(res => res.body);
    }

    excluir (id) {
        return this._http.delete('cidade/' + id);
    }
}