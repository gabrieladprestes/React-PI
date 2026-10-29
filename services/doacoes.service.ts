import { IAdminAgendaDoacao } from "../interfaces/adminAgendaDoacao.interface";
import { IAdminDoacaoAgendada } from "../interfaces/adminDoacaoAgendada.interface";
import { IAdminHistoricoDoacao } from "../interfaces/adminHistoricoDoacao.interface";
import { mockHistoricoDoacoes, mockSolicitacoesDoacao } from "./mocks/doacoes.mock";
import { doadorPorId } from "./mocks/doadores.mock";
import { produtoPorCodigo } from "./mocks/produtos.mock";

// As funções abaixo leem dos mocks. Quando a API existir, basta trocar o corpo por um fetch.

const nomeProduto = (codigo: string) => produtoPorCodigo(codigo)?.nome ?? codigo;

// Gerenciar Agendas: propostas pendentes, aprovadas e recusadas
export async function buscarSolicitacoesDoacao(): Promise<IAdminAgendaDoacao[]> {
    return mockSolicitacoesDoacao
        .filter(s => s.status === "pendente" || s.status === "aprovado" || s.status === "recusado")
        .map(s => {
            const d = doadorPorId(s.doadorId);
            return {
                id: s.id,
                doador: d.nome,
                cpfCnpj: d.cpfCnpj,
                telefone: d.telefone,
                item: nomeProduto(s.codigoProduto),
                quantidade: s.quantidade,
                dataProposta: s.dataProposta,
                status: s.status as IAdminAgendaDoacao["status"],
            };
        });
}

// Calendário: só as doações aprovadas
export async function buscarDoacoesConfirmadas(): Promise<IAdminAgendaDoacao[]> {
    return (await buscarSolicitacoesDoacao()).filter(d => d.status === "aprovado");
}

// Receber Doação: doações aprovadas aguardando o recebimento
export async function buscarDoacoesAgendadas(): Promise<IAdminDoacaoAgendada[]> {
    return mockSolicitacoesDoacao
        .filter(s => s.status === "aprovado")
        .map(s => {
            const d = doadorPorId(s.doadorId);
            return {
                id: s.id,
                codigoAgendamento: s.codigoAgendamento,
                nomeDoador: d.nome,
                cpfCnpj: d.cpfCnpj,
                telefone: d.telefone,
                item: nomeProduto(s.codigoProduto),
                quantidade: s.quantidade,
                dataAgendada: s.dataProposta,
                status: "agendado",
            };
        });
}

// Histórico: doações já recebidas
export async function buscarHistoricoDoacoes(): Promise<IAdminHistoricoDoacao[]> {
    return mockHistoricoDoacoes;
}
