import { IAdminAgenda } from "../interfaces/adminAgenda.interface";
import { IAdminAgendamento } from "../interfaces/adminAgendamento.interface";
import { IAdminHistoricoRetirada } from "../interfaces/adminHistoricoRetirada.interface";
import { IAdminSaidaDoacao } from "../interfaces/adminSaidaDoacao.interface";
import { IAdminItemEntregue } from "../interfaces/adminSolicitacao.interface";
import { mockRetiradas, mockSolicitacoesRetirada } from "./mocks/retiradas.mock";
import { donatarioPorId } from "./mocks/donatarios.mock";
import { produtoPorCodigo } from "./mocks/produtos.mock";
import { baixaEstoque, validarSaida } from "./estoque.service";
import { usuarioLogado } from "./sessao";
import { ehMesAtual, getTodayDate } from "../utils/dateUtils";

// As funções abaixo leem e alteram os mocks (só na memória: voltam ao original com F5).
// Quando a API existir, basta trocar o corpo por um fetch.

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
                    codigoProduto: i.codigoProduto,
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
    return structuredClone(mockRetiradas);
}

// Atendimento: retiradas do donatário no mês atual
export async function buscarRetiradasDoMes(cpf: string): Promise<IAdminHistoricoRetirada[]> {
    return structuredClone(mockRetiradas.filter(r => r.cpf === cpf && ehMesAtual(r.dataRetirada)));
}

function retiradaAprovada(id: number) {
    const retirada = mockSolicitacoesRetirada.find(s => s.id === id);
    if (!retirada || retirada.status !== "aprovado") {
        throw new Error("Esta retirada não está mais aguardando entrega.");
    }
    return retirada;
}

// Saída de Doação: confere as quantidades, dá baixa no estoque e registra no histórico
export async function confirmarEntrega(id: number, itens: IAdminItemEntregue[], observacao: string) {
    const retirada = retiradaAprovada(id);

    // Valida tudo antes de mexer no estoque, para não dar baixa pela metade
    for (const item of itens) {
        const nome = nomeProduto(item.codigoProduto);
        const solicitado = retirada.itens.find(i => i.codigoProduto === item.codigoProduto)?.quantidade ?? 0;
        const total = item.lotes.reduce((acc, l) => acc + l.quantidade, 0);
        if (total > solicitado) throw new Error(`${nome}: não é possível entregar mais que o solicitado (${solicitado}).`);
        validarSaida(item.codigoProduto, item.lotes);
    }
    const entregues = itens.filter(i => i.lotes.length > 0);
    if (entregues.length === 0) throw new Error("Nenhuma quantidade para entregar. Para não entregar nada, use Cancelar Entrega.");

    const itensHistorico = entregues.flatMap(i => {
        const produto = produtoPorCodigo(i.codigoProduto);
        return baixaEstoque(i.codigoProduto, i.lotes).map(usado => ({
            codigo: i.codigoProduto,
            nome: produto?.nome ?? i.codigoProduto,
            tipo: produto?.tipo ?? "",
            lote: usado.lote,
            loteFabricante: usado.loteFabricante,
            quantidade: usado.quantidade,
        }));
    });

    const donatario = donatarioPorId(retirada.donatarioId);
    mockRetiradas.push({
        id: Math.max(0, ...mockRetiradas.map(r => r.id)) + 1,
        codigoAgendamento: retirada.codigoAgendamento,
        donatario: donatario.nome,
        cpf: donatario.cpf,
        itens: itensHistorico,
        dataRetirada: getTodayDate(),
        responsavel: usuarioLogado,
    });

    retirada.status = "entregue";
    retirada.observacao = observacao.trim() || undefined;
}

// Saída de Doação: cancelamento exige motivo
export async function cancelarEntrega(id: number, motivo: string) {
    const retirada = retiradaAprovada(id);
    if (!motivo.trim()) throw new Error("Informe o motivo do cancelamento no campo Observações.");
    retirada.status = "cancelado";
    retirada.observacao = motivo.trim();
}
