import { IAdminEstoque } from "../../interfaces/adminEstoque.interface";

export const mockEstoque: IAdminEstoque[] = [
    {
        id: 1, codigo: "RC001", nome: "Ração de Cachorro", tipo: "Ração",
        lotes: [
            { lote: "L001", saldoEstoque: 45, saldoReservado: 12, validade: "2026-12-01" },
            { lote: "L002", saldoEstoque: 30, saldoReservado: 5,  validade: "2026-08-10" },
            { lote: "L003", saldoEstoque: 10, saldoReservado: 10, validade: "2026-06-20" },
        ],
    },
    {
        id: 2, codigo: "RG001", nome: "Ração de Gato", tipo: "Ração",
        lotes: [
            { lote: "L004", saldoEstoque: 20, saldoReservado: 8,  validade: "2026-11-15" },
            { lote: "L005", saldoEstoque: 8,  saldoReservado: 6,  validade: "2026-06-15" },
            { lote: "L006", saldoEstoque: 5,  saldoReservado: 0,  validade: "2026-05-10" },
        ],
    },
    {
        id: 3, codigo: "VC001", nome: "Vermífugo Cães", tipo: "Medicamento",
        lotes: [
            { lote: "M001", saldoEstoque: 60, saldoReservado: 20, validade: "2027-03-01" },
        ],
    },
    {
        id: 4, codigo: "VG001", nome: "Vermífugo Gatos", tipo: "Medicamento",
        lotes: [
            { lote: "M002", saldoEstoque: 40, saldoReservado: 15, validade: "2026-07-10" },
        ],
    },
    {
        id: 5, codigo: "AP001", nome: "Antipulgas", tipo: "Medicamento",
        lotes: [
            { lote: "M003", saldoEstoque: 25, saldoReservado: 25, validade: "2026-06-20" },
        ],
    },
    {
        id: 6, codigo: "PC001", nome: "Petisco Cachorro", tipo: "Petisco",
        lotes: [
            { lote: "P001", saldoEstoque: 15, saldoReservado: 3,  validade: "2026-09-30" },
        ],
    },
    {
        id: 7, codigo: "PG001", nome: "Petisco Gato", tipo: "Petisco",
        lotes: [
            { lote: "P002", saldoEstoque: 12, saldoReservado: 4,  validade: "2026-06-25" },
        ],
    },
];
