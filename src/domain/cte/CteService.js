export default class CteService {

    constructor (http) {
        this._http = http;
    }

    buscarPorId (id) {
        return this._http.get('cte/' + id).then(res => res.body);
    }

    buscarComPaginacao (pagina, quantidade) {
        return this._http.get('cte?pagina=' + (pagina - 1) + '&qtd=' + quantidade).then(res => res.body);
    }

    buscarComFiltro (pagina, quantidade, campo, valor) {
        return this._http.get('cte?pagina=' + (pagina - 1) + '&qtd=' + quantidade + '&' + campo + '=' + valor).then(res => res.body);

    }

    salvar (uf) {
        return this._http.post('cte', uf).then(res => res.body);
    }

    excluir (id) {
        return this._http.delete('cte/' + id);
    }

    transmitir (id) {
        return this._http.get('cte/transmitir/' + id).then(res => res.body);
    }

    enviarEmail (id) {
        return this._http.get('cte/email/' + id);
    }
}