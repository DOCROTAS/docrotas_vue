import Endereco from '../../domain/endereco/Endereco'

export default class Empresa {

    constructor(id, cnpj, razao, dtCriacao, dtAlteracao, fantasia, ie, endereco, email) {
        this.id = id;
        this.cnpj = cnpj;
        this.razao = razao;
        this.dtCriacao = dtCriacao;
        this.dtAlteracao = dtAlteracao;
        this.fantasia = fantasia;
        this.ie = ie;
        this.endereco = endereco;
        this.email = email;
    }
}