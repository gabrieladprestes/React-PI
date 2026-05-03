import { CustomPaddingContainer } from "@/components/CustomPaddingContainer/CustomPaddingContainer";
import { CustomFilterSection } from "@/components/CustomFilterSection/CustomFilterSection";
import { CustomFilterSelectInput } from "@/components/CustomFilterSelectInput/CustomFilterSelectInput";
import { IFilterSelectInput } from "@/interfaces/filterSelectInput.interface";
import { CustomFilterDateInput } from "@/components/CustomFilterDateInput/CustomFilterDateInput";
import { CustomFilterTextInput } from "@/components/CustomFilterTextInput/CustomFilterTextInput";
import { CustomFilterNumberInput } from "@/components/CustomFilterNumberInput/CustomFilterNumberInput";
import { CustomHistoryTable } from "@/components/CustomHistoryTable/CustomHistoryTable";
import { IHistoryTableTitle } from "@/interfaces/historyTableTitle.interface";
import { IHistoryTableData } from "@/interfaces/historyTableData.interface";

export default function HistoricoDoacoes() {
    const tipoProdutoOptions: IFilterSelectInput[] = [
        {
            id: 1, 
            value: "racao seca", 
            text: "Ração Seca"
        }, 
        {
            id: 2, 
            value: "racao umida", 
            text: "Ração Úmida"
        }, 
        {
            id: 3, 
            value: "petisco", 
            text: "Petisco"
        }, 
        {
            id: 4, 
            value: "medicamento", 
            text: "Medicamento"
        }]

    const titulosTabela: IHistoryTableTitle[] = [
        {
            id: 1, 
            column1: "Tipo de Produto", 
            column2: "Data da Doação", 
            column3: "Validade", 
            column4: "Lote", 
            column5: "Quantidade", 
            column6: "Observações"
        }]

    const dadosTabela: IHistoryTableData[] = [
        {
            id: 1,
            column1: "Ração seca",
            column2: "02/10/2025",
            column3: "09/03/2030",
            column4: "0923094",
            column5: "3 pacotes",
            column6: "Marca Premiere",
            link: "#",
        },
        {
            id: 2,
            column1: "Ração úmida",
            column2: "12/11/2025",
            column3: "10/01/2027",
            column4: "8402735",
            column5: "2 pacotes",
            column6: "Marca Magnus",
            link: "#",
        },
        {
            id: 3,
            column1: "Ração seca",
            column2: "12/11/2025",
            column3: "07/02/2027",
            column4: "4628429",
            column5: "1 pacotes",
            column6: "Nenhuma",
            link: "#",
        }]

    return (
        <>
            <CustomFilterSection>
                <CustomFilterSelectInput 
                    name="tipo produto" 
                    title="Tipo do produto" 
                    options={tipoProdutoOptions} 
                />
                <CustomFilterDateInput 
                    label="Data da Doação" 
                    name="data doacao" 
                />
                <CustomFilterDateInput 
                    label="Validade" 
                    name="validade" 
                />
                <CustomFilterTextInput 
                    placeholder="Lote" 
                    name="lote" 
                />
                <CustomFilterNumberInput 
                    placeholder="Quantidade" 
                    name="quantidade" 
                />
                <CustomFilterTextInput 
                    placeholder="Observações" 
                    name="observacoes" 
                />
            </CustomFilterSection>

            <CustomPaddingContainer>
                <CustomHistoryTable 
                    tableTitle="Doações Realizadas" 
                    columnsTitle={titulosTabela} 
                    columnsData={dadosTabela} 
                />
                <></>
            </CustomPaddingContainer>
        </>
    )
}