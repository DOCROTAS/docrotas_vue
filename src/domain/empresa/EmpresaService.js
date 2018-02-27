export default class EmpresaService {

    constructor (http) {
        this._http = http;
    }

    buscarPorId (id) {
        return this._http.get('empresa/' + id).then(res => res.body);
    }

    buscarComPaginacao (pagina, quantidade) {
        return this._http.get('empresa?pagina=' + (pagina - 1) + '&qtd=' + quantidade).then(res => res.body);
    }

    buscarComFiltro (pagina, quantidade, campo, valor) {
        return this._http.get('empresa?pagina=' + (pagina - 1) + '&qtd=' + quantidade + '&' + campo + '=' + valor).then(res => res.body);

    }

    salvar (empresa) {
        return this._http.post('empresa', empresa).then(res => res.body);
    }

    excluir (id) {
        return this._http.delete('empresa/' + id);
    }
}