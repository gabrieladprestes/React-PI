import { IAdminEstoque } from "../interfaces/adminEstoque.interface";
import { IAdminLoteEntregue } from "../interfaces/adminSolicitacao.interface";
import { mockEstoque } from "./mocks/estoque.mock";
import { produtoPorCodigo } from "./mocks/produtos.mock";
import { loteCorrespondente, prefixoLote, saldoValido, statusValidade } from "../utils/estoqueUtils";

// As funções abaixo leem e alteram os mocks (só na memória: voltam ao original com F5).
// Quando a API existir, basta trocar o corpo por um fetch.

export async function buscarEstoque(): Promise<IAdminEstoque[]> {
    // Devolve uma cópia, para a tela não alterar os dados sem passar pelo service
    return structuredClone(mockEstoque);
}

// ---- Uso interno dos services de doações e retiradas ----

function itemDoEstoque(codigoProduto: string) {
    let item = mockEstoque.find(e => e.codigo === codigoProduto);
    if (!item) {
        const produto = produtoPorCodigo(codigoProduto);
        if (!produto) throw new Error(`Produto ${codigoProduto} não está cadastrado.`);
        item = { id: produto.id, codigo: produto.codigo, nome: produto.nome, tipo: produto.tipo, lotes: [] };
        mockEstoque.push(item);
    }
    return item;
}

// Próximo lote interno do tipo (L007, M004...). A numeração é única no estoque todo.
function proximoLoteInterno(tipo: string) {
    const prefixo = prefixoLote(tipo);
    const numeros = mockEstoque
        .flatMap(e => e.lotes)
        .filter(l => l.lote.startsWith(prefixo))
        .map(l => Number(l.lote.slice(prefixo.length)) || 0);
    return `${prefixo}${String(Math.max(0, ...numeros) + 1).padStart(3, "0")}`;
}

// Entrada no estoque. Mesmo lote do fabricante + mesma validade soma no lote interno existente;
// caso contrário, gera um lote interno novo. Devolve o lote interno usado.
export function entradaEstoque(codigoProduto: string, loteFabricante: string, validade: string, quantidade: number) {
    const item = itemDoEstoque(codigoProduto);
    const existente = loteCorrespondente(item.lotes, loteFabricante, validade);
    if (existente) {
        existente.saldoEstoque += quantidade;
        return { lote: existente.lote, loteFabricante: existente.loteFabricante, novo: false };
    }
    const lote = proximoLoteInterno(item.tipo);
    const fabricante = loteFabricante.trim().toUpperCase() || undefined;
    item.lotes.push({ lote, loteFabricante: fabricante, saldoEstoque: quantidade, saldoReservado: 0, validade });
    return { lote, loteFabricante: fabricante, novo: true };
}

export function saldoParaEntrega(codigoProduto: string) {
    const item = mockEstoque.find(e => e.codigo === codigoProduto);
    return item ? saldoValido(item.lotes) : 0;
}

// Confere se a saída pode ser feita dos lotes escolhidos (sem alterar nada)
export function validarSaida(codigoProduto: string, lotes: IAdminLoteEntregue[]) {
    const item = itemDoEstoque(codigoProduto);
    const vistos = new Set<string>();
    for (const escolhido of lotes) {
        const lote = item.lotes.find(l => l.lote === escolhido.lote);
        if (!lote) throw new Error(`${item.nome}: escolha um lote válido.`);
        if (vistos.has(lote.lote)) throw new Error(`${item.nome}: o lote ${lote.lote} foi escolhido mais de uma vez.`);
        vistos.add(lote.lote);
        if (statusValidade(lote.validade) === "vencido") throw new Error(`${item.nome}: o lote ${lote.lote} está vencido.`);
        if (!(escolhido.quantidade > 0)) throw new Error(`${item.nome}: informe a quantidade do lote ${lote.lote}.`);
        if (escolhido.quantidade > lote.saldoEstoque) {
            throw new Error(`${item.nome}: o lote ${lote.lote} só tem ${lote.saldoEstoque} em estoque.`);
        }
    }
}

// Baixa nos lotes escolhidos. Libera a reserva na mesma quantidade (a retirada já estava aprovada).
export function baixaEstoque(codigoProduto: string, lotes: IAdminLoteEntregue[]) {
    validarSaida(codigoProduto, lotes);
    const item = itemDoEstoque(codigoProduto);
    return lotes.map(escolhido => {
        const lote = item.lotes.find(l => l.lote === escolhido.lote)!;
        lote.saldoEstoque -= escolhido.quantidade;
        lote.saldoReservado = Math.max(lote.saldoReservado - escolhido.quantidade, 0);
        return { lote: lote.lote, loteFabricante: lote.loteFabricante, quantidade: escolhido.quantidade };
    });
}
