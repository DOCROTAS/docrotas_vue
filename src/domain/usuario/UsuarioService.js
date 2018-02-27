export default class UsuarioService {
    
    constructor (http) {
        this._http = http;
    }

    salvar (usuario) {
        return this._http.post('usuario', usuario).then(res => res.body);
    }

    buscarComPaginacao (pagina, quantidade) {
        var pag = pagina - 1;
        return this._http.get('usuario?pagina=' + pag + '&qtd=' + quantidade).then(res => res.body);
    }

    excluir (id) {
        return this._http.delete('usuario/' + id);
    }

    buscarPorId (id) {
        return this._http.get('usuario/' + id).then(res => res.body);
    }

    buscarComFiltro(pagina, quantidade, campo, valor) {
        var pag = pagina - 1;
        return this._http.get('usuario?pagina=' + pag + '&qtd=' + quantidade + '&' + campo + '=' + valor).then(res => res.body);
    }
}