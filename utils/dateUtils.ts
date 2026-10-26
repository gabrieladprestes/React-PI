export const getTodayDate = () => {
    const hoje = new Date();
    const ano = hoje.getFullYear();
    const mes = String(hoje.getMonth() + 1).padStart(2, '0');
    const dia = String(hoje.getDate()).padStart(2, '0');

    return `${ano}-${mes}-${dia}`;
};

// "AAAA-MM-DD" -> "DD/MM/AAAA" sem passar por Date (evita voltar um dia por causa do fuso)
export const formatarData = (data: string) => data.split("-").reverse().join("/");

export const ehMesAtual = (data: string) => data.slice(0, 7) === getTodayDate().slice(0, 7);

// Data "AAAA-MM-DD" no mês atual, sem passar de hoje (usado nos mocks)
export const dataNoMesAtual = (dia: number) => {
    const hoje = getTodayDate();
    const diaValido = Math.min(dia, Number(hoje.slice(8)));
    return `${hoje.slice(0, 8)}${String(diaValido).padStart(2, '0')}`;
};
