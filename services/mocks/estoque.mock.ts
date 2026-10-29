import { IAdminEstoque, IAdminEstoqueLote } from "../../interfaces/adminEstoque.interface";
import { dataRelativa } from "../../utils/dateUtils";
import { mockProdutos } from "./produtos.mock";

// Validades relativas a hoje, para sempre existir lote bom, vencendo (até 30 dias) e vencido
const lotesPorProduto: Record<string, IAdminEstoqueLote[]> = {
    RC001: [
        { lote: "L001", saldoEstoque: 45, saldoReservado: 12, validade: dataRelativa(120) },
        { lote: "L002", saldoEstoque: 30, saldoReservado: 5,  validade: dataRelativa(20)  },
        { lote: "L003", saldoEstoque: 10, saldoReservado: 10, validade: dataRelativa(-10) },
    ],
    RG001: [
        { lote: "L004", saldoEstoque: 20, saldoReservado: 8,  validade: dataRelativa(60)  },
        { lote: "L005", saldoEstoque: 8,  saldoReservado: 6,  validade: dataRelativa(15)  },
        { lote: "L006", saldoEstoque: 5,  saldoReservado: 0,  validade: dataRelativa(-30) },
    ],
    VC001: [{ lote: "M001", saldoEstoque: 60, saldoReservado: 20, validade: dataRelativa(150) }],
    VG001: [{ lote: "M002", saldoEstoque: 40, saldoReservado: 15, validade: dataRelativa(25)  }],
    AP001: [{ lote: "M003", saldoEstoque: 25, saldoReservado: 25, validade: dataRelativa(10)  }],
    PC001: [{ lote: "P001", saldoEstoque: 15, saldoReservado: 3,  validade: dataRelativa(90)  }],
    PG001: [{ lote: "P002", saldoEstoque: 12, saldoReservado: 4,  validade: dataRelativa(5)   }],
};

// Nome e tipo vêm do cadastro de produtos, para não divergirem
export const mockEstoque: IAdminEstoque[] = mockProdutos.map(p => ({
    id: p.id,
    codigo: p.codigo,
    nome: p.nome,
    tipo: p.tipo,
    lotes: lotesPorProduto[p.codigo] ?? [],
}));
