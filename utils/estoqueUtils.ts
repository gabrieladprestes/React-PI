import { IAdminEstoqueLote } from "../interfaces/adminEstoque.interface";

export type StatusValidade = "vencido" | "vencendo" | "bom";

export function statusValidade(validade: string): StatusValidade {
    const hoje = new Date();
    const dataVal = new Date(validade);
    const diffDias = Math.floor((dataVal.getTime() - hoje.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDias < 0) return "vencido";
    if (diffDias <= 30) return "vencendo";
    return "bom";
}

export function statusGeral(lotes: IAdminEstoqueLote[]): StatusValidade {
    const statuses = lotes.map(l => statusValidade(l.validade));
    if (statuses.includes("vencido")) return "vencido";
    if (statuses.includes("vencendo")) return "vencendo";
    return "bom";
}

export function totalEstoque(lotes: IAdminEstoqueLote[]) {
    return lotes.reduce((acc, l) => acc + l.saldoEstoque, 0);
}

export function totalReservado(lotes: IAdminEstoqueLote[]) {
    return lotes.reduce((acc, l) => acc + l.saldoReservado, 0);
}

// O que pode ser entregue: só lotes dentro da validade, descontando o reservado
export function disponivelParaLiberar(lotes: IAdminEstoqueLote[]) {
    return lotes
        .filter(l => statusValidade(l.validade) !== "vencido")
        .reduce((acc, l) => acc + Math.max(l.saldoEstoque - l.saldoReservado, 0), 0);
}
