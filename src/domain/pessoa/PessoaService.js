export default class PessoaService {

    constructor (http) {
        this._http = http;
    }

    buscarPorId (id) {
        return this._http.get('pessoa/' + id).then(res => res.body);
    }

    buscarComPaginacao (pagina, quantidade) {
        return this._http.get('pessoa?pagina=' + (pagina - 1) + '&qtd=' + quantidade).then(res => res.body);
    }

    buscarComFiltro (pagina, quantidade, campo, valor) {
        return this._http.get('pessoa?pagina=' + (pagina - 1) + '&qtd=' + quantidade + '&' + campo + '=' + valor).then(res => res.body);

    }

    salvar (pessoa) {
        return this._http.post('pessoa', pessoa).then(res => res.body);
    }

    excluir (id) {
        return this._http.delete('pessoa/' + id);
    }
}