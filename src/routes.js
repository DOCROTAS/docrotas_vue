import Home from './components/home/Home.vue';
import Cidade from './components/cidade/cidade.vue';
import CertificadoDigital from './components/certificadoDigital/certificadoDigital.vue';
import Empresa from './components/empresa/empresa.vue';
import Pessoa from './components/pessoa/pessoa.vue';
import UnidadeFederativa from './components/unidadeFederativa/unidadeFederativa.vue';
import Usuario from './components/usuario/Usuario.vue';
import Veiculo from './components/veiculo/Veiculo.vue';
import Configuracoes from './components/configuracoes/Configuracoes.vue';
import Cte from './components/cte/Cte.vue';
import Mdfe from './components/mdfe/Mdfe.vue';

export const routes = [
    { path: '', name: 'home', component: Home},
    { path: '/certificadoDigital', name: 'certificadoDigital', component: CertificadoDigital},
    { path: '/cidade', name: 'cidade', component: Cidade},
    { path: '/empresa', name: 'empresa', component: Empresa},
    { path: '/pessoa', name: 'pessoa', component: Pessoa},
    { path: '/pessoa', name: 'pessoa', component: Pessoa},
    { path: '/uf', name: 'unidadeFederativa', component: UnidadeFederativa},
    { path: '/usuario', name: 'usuario', component: Usuario},
    { path: '/veiculo', name: 'veiculo', component: Veiculo},
    { path: '/config', name: 'configuracoes', component: Configuracoes},
    { path: '/cte', name: 'cte', component: Cte},
    { path: '/mdfe', name: 'mdfe', component: Mdfe},
    { path: '*', name: 'home', component: Home}
]