import { IAdminDonatario } from "../../interfaces/adminDonatario.interface";

export const mockDonatarios: IAdminDonatario[] = [
    {
        id: 1,
        nome: "Maria Silva",
        cpf: "123.456.789-00",
        telefone: "(15) 99999-0001",
        endereco: "Rua das Flores, 123 — Votorantim/SP",
        pets: [
            { id: 1, nome: "Rex", especie: "Cachorro", porte: "Médio" },
            { id: 2, nome: "Mimi", especie: "Gato", porte: "Pequeno" },
        ],
    },
    {
        id: 2,
        nome: "João Pereira",
        cpf: "987.654.321-00",
        telefone: "(15) 98888-0002",
        endereco: "Av. Brasil, 456 — Votorantim/SP",
        pets: [
            { id: 3, nome: "Bolinha", especie: "Cachorro", porte: "Grande" },
        ],
    },
    {
        id: 3,
        nome: "Ana Costa",
        cpf: "111.222.333-44",
        telefone: "(15) 97777-0003",
        endereco: "Rua das Acácias, 789 — Votorantim/SP",
        pets: [],
    },
    {
        id: 4,
        nome: "Beatriz Lima",
        cpf: "123.456.789-01",
        telefone: "(15) 98765-0001",
        endereco: "Rua XV de Novembro, 50 — Votorantim/SP",
        pets: [
            { id: 4, nome: "Thor", especie: "Cachorro", porte: "Pequeno" },
        ],
    },
];
