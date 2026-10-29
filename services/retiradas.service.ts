import { IAdminAgenda } from "../interfaces/adminAgenda.interface";
import { IAdminAgendamento } from "../interfaces/adminAgendamento.interface";
import { IAdminHistoricoRetirada } from "../interfaces/adminHistoricoRetirada.interface";
import { IAdminSaidaDoacao } from "../interfaces/adminSaidaDoacao.interface";
import { mockRetiradas, mockSolicitacoesRetirada } from "./mocks/retiradas.mock";
import { donatarioPorId } from "./mocks/donatarios.mock";
import { produtoPorCodigo } from "./mocks/produtos.mock";
import { ehMesAtual } from "../utils/dateUtils";

// As funções abaixo leem dos mocks. Quando a API existir, basta trocar o corpo por um fetch.

const nomeProduto = (codigo: string) => produtoPorCodigo(codigo)?.nome ?? codigo;

// Gerenciar Agendas: pedidos pendentes, aprovados e recusados
export async function buscarSolicitacoesRetirada(): Promise<IAdminAgenda[]> {
    return mockSolicitacoesRetirada
        .filter(s => s.status === "pendente" || s.status === "aprovado" || s.status === "recusado")
        .map(s => {
            const d = donatarioPorId(s.donatarioId);
            return {
                id: s.id,
                donatario: d.nome,
                cpf: d.cpf,
                telefone: d.telefone,
                itensSolicitados: s.itens.map(i => ({ item: nomeProduto(i.codigoProduto), quantidade: i.quantidade })),
                dataSolicitacao: s.dataSolicitacao,
                dataAgendada: s.dataAgendada,
                status: s.status as IAdminAgenda["status"],
            };
        });
}

// Calendário: uma linha por item das retiradas aprovadas
export async function buscarRetiradasAgendadas(): Promise<IAdminAgendamento[]> {
    return mockSolicitacoesRetirada
        .filter(s => s.status === "aprovado")
        .flatMap(s => s.itens.map((i, idx) => ({
            id: s.id * 100 + idx,
            donatario: donatarioPorId(s.donatarioId).nome,
            item: nomeProduto(i.codigoProduto),
            quantidade: i.quantidade,
            data: s.dataAgendada,
            status: "Confirmado",
        })));
}

// Saída de Doação: retiradas aprovadas aguardando a entrega
export async function buscarSaidasPendentes(): Promise<IAdminSaidaDoacao[]> {
    return mockSolicitacoesRetirada
        .filter(s => s.status === "aprovado")
        .map(s => {
            const d = donatarioPorId(s.donatarioId);
            return {
                id: s.id,
                codigoAgendamento: s.codigoAgendamento,
                nomeDonatario: d.nome,
                cpf: d.cpf,
                telefone: d.telefone,
                itens: s.itens.map(i => ({
                    item: nomeProduto(i.codigoProduto),
                    quantidadeSolicitada: i.quantidade,
                    quantidadeEntregue: i.quantidade,
                })),
                dataAgendada: s.dataAgendada,
                status: "aguardando",
            };
        });
}

// Histórico: retiradas já entregues
export async function buscarHistoricoRetiradas(): Promise<IAdminHistoricoRetirada[]> {
    return mockRetiradas;
}

// Atendimento: retiradas do donatário no mês atual
export async function buscarRetiradasDoMes(cpf: string): Promise<IAdminHistoricoRetirada[]> {
    return mockRetiradas.filter(r => r.cpf === cpf && ehMesAtual(r.dataRetirada));
}
