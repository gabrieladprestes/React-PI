export interface IAdminAgendaItem {
    item: string;
    quantidade: number;
}

export interface IAdminAgenda {
    id: number;
    donatario: string;
    cpf: string;
    telefone: string;
    itensSolicitados: IAdminAgendaItem[];
    dataSolicitacao: string;
    dataAgendada: string;
    status: 'pendente' | 'aprovado' | 'recusado';
}
