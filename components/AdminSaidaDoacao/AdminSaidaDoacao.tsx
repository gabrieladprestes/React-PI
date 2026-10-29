"use client";
import { useEffect, useState } from "react";
import styles from "./AdminSaidaDoacao.module.css";
import { IAdminSaidaDoacao } from "../../interfaces/adminSaidaDoacao.interface";
import { buscarSaidasPendentes } from "../../services/retiradas.service";
import { formatarData } from "../../utils/dateUtils";

export function AdminSaidaDoacao() {
    const [selecionada, setSelecionada] = useState<IAdminSaidaDoacao | null>(null);
    const [observacao, setObservacao] = useState("");
    const [filtroData, setFiltroData] = useState("");
    const [filtroDonatario, setFiltroDonatario] = useState("");
    const [saidasPendentes, setSaidasPendentes] = useState<IAdminSaidaDoacao[]>([]);
    const [resultado, setResultado] = useState<IAdminSaidaDoacao[]>([]);
    const [quantidadesEntregues, setQuantidadesEntregues] = useState<number[]>([]);

    useEffect(() => {
        buscarSaidasPendentes().then(dados => {
            setSaidasPendentes(dados);
            setResultado(dados);
        });
    }, []);

    function filtrar() {
        setResultado(saidasPendentes.filter(s =>
            (!filtroData || s.dataAgendada === filtroData) &&
            (!filtroDonatario || s.nomeDonatario.toLowerCase().includes(filtroDonatario.toLowerCase()))
        ));
    }

    function abrirModal(saida: IAdminSaidaDoacao) {
        setSelecionada(saida);
        setObservacao("");
        setQuantidadesEntregues(saida.itens.map(i => i.quantidadeEntregue));
    }

    function fecharModal() {
        setSelecionada(null);
        setObservacao("");
    }

    function atualizarQuantidade(index: number, valor: number) {
        const novas = [...quantidadesEntregues];
        novas[index] = valor;
        setQuantidadesEntregues(novas);
    }

    function resumoItens(saida: IAdminSaidaDoacao) {
        return saida.itens.map(i => `${i.item} (${i.quantidadeSolicitada} kg)`).join(", ");
    }

    return (
        <>
            <div className={styles.filtros}>
                <div>
                    <label>Data agendada</label>
                    <input
                        type="date"
                        aria-label="Filtrar por data"
                        value={filtroData}
                        onChange={e => setFiltroData(e.target.value)}
                    />
                </div>
                <div>
                    <label>Donatário</label>
                    <input
                        placeholder="Nome do donatário..."
                        value={filtroDonatario}
                        onChange={e => setFiltroDonatario(e.target.value)}
                        onKeyDown={e => e.key === "Enter" && filtrar()}
                    />
                </div>
                <button type="button" className={styles.btnBuscar} onClick={filtrar}>Filtrar</button>
            </div>

            <table className={styles.tabela}>
                <thead>
                    <tr>
                        <th>Cód. Agendamento</th>
                        <th>Donatário</th>
                        <th>Itens</th>
                        <th>Data agendada</th>
                    </tr>
                </thead>
                <tbody>
                    {resultado.map(saida => (
                        <tr key={saida.id} onClick={() => abrirModal(saida)}>
                            <td>{saida.codigoAgendamento}</td>
                            <td>{saida.nomeDonatario}</td>
                            <td>{resumoItens(saida)}</td>
                            <td>{formatarData(saida.dataAgendada)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {selecionada && (
                <div className={styles.backdrop} onClick={fecharModal}>
                    <div className={styles.modal} onClick={e => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <h2>Confirmar Saída de Doação</h2>
                            <button type="button" className={styles.btnFechar} onClick={fecharModal}>✕</button>
                        </div>

                        <div className={styles.modalBody}>
                            <div className={styles.campo}>
                                <span>Cód. Agendamento</span>
                                <span>{selecionada.codigoAgendamento}</span>
                            </div>
                            <div className={styles.campo}>
                                <span>Donatário</span>
                                <span>{selecionada.nomeDonatario}</span>
                            </div>
                            <div className={styles.campo}>
                                <span>CPF</span>
                                <span>{selecionada.cpf}</span>
                            </div>
                            <div className={styles.campo}>
                                <span>Telefone</span>
                                <span>{selecionada.telefone}</span>
                            </div>
                            <div className={styles.campo}>
                                <span>Data agendada</span>
                                <span>{formatarData(selecionada.dataAgendada)}</span>
                            </div>

                            <p className={styles.itensLabel}>Itens para entrega</p>

                            <table className={styles.tabelaItens}>
                                <thead>
                                    <tr>
                                        <th>Item</th>
                                        <th>Solicitado</th>
                                        <th>A entregar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {selecionada.itens.map((item, i) => (
                                        <tr key={i}>
                                            <td>{item.item}</td>
                                            <td>{item.quantidadeSolicitada} kg</td>
                                            <td>
                                                <input
                                                    type="number"
                                                    aria-label={`Quantidade a entregar de ${item.item}`}
                                                    className={styles.inputQtd}
                                                    value={quantidadesEntregues[i] ?? item.quantidadeEntregue}
                                                    min={0}
                                                    onChange={e => atualizarQuantidade(i, Number(e.target.value))}
                                                />
                                                {" kg"}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <div>
                                <label className={styles.obsLabel}>Observações</label>
                                <textarea
                                    className={styles.obsTextarea}
                                    placeholder="Registre aqui observações sobre esta entrega..."
                                    value={observacao}
                                    onChange={e => setObservacao(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className={styles.modalFooter}>
                            <button type="button" className={styles.btnFecharFooter} onClick={fecharModal}>Fechar</button>
                            <button type="button" className={styles.btnCancelar}>Cancelar Entrega</button>
                            <button type="button" className={styles.btnConfirmar}>Confirmar Entrega</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
