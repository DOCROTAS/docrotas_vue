export default class CertificadoService {
    
    constructor (http) {
        this._http = http;
    }

    buscarPorId (id) {
        return this._http.get('certificado/' + id).then(res => res.body);
    }

    buscarComPaginacao (pagina, quantidade) {
        return this._http.get('certificado?pagina=' + (pagina - 1) + '&qtd=' + quantidade).then(res => res.body);
    }

    buscarComFiltro (pagina, quantidade, campo, valor) {
        return this._http.get('certificado?pagina=' + (pagina - 1) + '&qtd=' + quantidade + '&' + campo + '=' + valor).then(res => res.body);

    }

    salvar (certificado) {
        return this._http.post('certificado', certificado).then(res => res.body);
    }

    excluir (id) {
        return this._http.delete('certificado/' + id);
    }
}