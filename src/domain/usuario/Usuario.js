export default class Usuario {
    
    constructor(id, login, senha, email, dtCriacao, dtAlteracao, conta, nome) {
        this.id = id;
        this.login = login;
        this.senha = senha;
        this.email = email;
        this.dtCriacao = dtCriacao;
        this.dtAlteracao = dtAlteracao;
        this.conta = conta;
        this.nome = nome;
    }
}