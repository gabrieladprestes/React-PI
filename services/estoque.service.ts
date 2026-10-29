import { IAdminEstoque } from "../interfaces/adminEstoque.interface";
import { mockEstoque } from "./mocks/estoque.mock";

// As funções abaixo leem dos mocks. Quando a API existir, basta trocar o corpo por um fetch.

export async function buscarEstoque(): Promise<IAdminEstoque[]> {
    return mockEstoque;
}
