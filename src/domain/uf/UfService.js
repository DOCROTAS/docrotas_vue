export default class UfService {

    constructor (http) {
        this._http = http;
    }

    buscarPorId (id) {
        return this._http.get('uf/' + id).then(res => res.body);
    }

    buscarComPaginacao (pagina, quantidade) {
        return this._http.get('uf?pagina=' + (pagina - 1) + '&qtd=' + quantidade).then(res => res.body);
    }

    buscarComFiltro (pagina, quantidade, campo, valor) {
        return this._http.get('uf?pagina=' + (pagina - 1) + '&qtd=' + quantidade + '&' + campo + '=' + valor).then(res => res.body);

    }

    salvar (uf) {
        return this._http.post('uf', uf).then(res => res.body);
    }

    excluir (id) {
        return this._http.delete('uf/' + id);
    }
}