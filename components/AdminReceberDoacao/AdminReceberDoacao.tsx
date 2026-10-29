"use client";
import { useEffect, useState } from "react";
import styles from "./AdminReceberDoacao.module.css";
import { IAdminDoacaoAgendada } from "../../interfaces/adminDoacaoAgendada.interface";
import { buscarDoacoesAgendadas } from "../../services/doacoes.service";
import { formatarData } from "../../utils/dateUtils";

interface IItemExtra {
    item: string;
    quantidade: number;
}

const TIPOS_ITEM = ["Ração de Cachorro", "Ração de Gato"];

export function AdminReceberDoacao() {
    const [selecionada, setSelecionada] = useState<IAdminDoacaoAgendada | null>(null);
    const [observacao, setObservacao] = useState("");
    const [filtroData, setFiltroData] = useState("");
    const [filtroDoador, setFiltroDoador] = useState("");
    const [doacoesPendentes, setDoacoesPendentes] = useState<IAdminDoacaoAgendada[]>([]);
    const [resultado, setResultado] = useState<IAdminDoacaoAgendada[]>([]);

    // Estado do modal — itens editáveis
    const [quantidadeEditada, setQuantidadeEditada] = useState(0);
    const [itensExtras, setItensExtras] = useState<IItemExtra[]>([]);
    const [novoItemTipo, setNovoItemTipo] = useState(TIPOS_ITEM[0]);
    const [novaQtd, setNovaQtd] = useState(1);
    const [mostrarAddItem, setMostrarAddItem] = useState(false);
    const [itemPrincipalRemovido, setItemPrincipalRemovido] = useState(false);
    const [loteEditado, setLoteEditado] = useState("");

    useEffect(() => {
        buscarDoacoesAgendadas().then(dados => {
            setDoacoesPendentes(dados);
            setResultado(dados);
        });
    }, []);

    const filtrar = () => {
        setResultado(doacoesPendentes.filter(d =>
            (!filtroData || d.dataAgendada === filtroData) &&
            (!filtroDoador || d.nomeDoador.toLowerCase().includes(filtroDoador.toLowerCase()))
        ));
    };

    function abrirModal(doacao: IAdminDoacaoAgendada) {
        setSelecionada(doacao);
        setObservacao("");
        setQuantidadeEditada(doacao.quantidade);
        setItensExtras([]);
        setNovoItemTipo(TIPOS_ITEM[0]);
        setNovaQtd(1);
        setMostrarAddItem(false);
        setItemPrincipalRemovido(false);
        setLoteEditado("");
    }

    function fecharModal() {
        setSelecionada(null);
        setObservacao("");
    }

    function adicionarItemExtra() {
        if (novaQtd <= 0) return;
        setItensExtras([...itensExtras, { item: novoItemTipo, quantidade: novaQtd }]);
        setNovaQtd(1);
        setMostrarAddItem(false);
    }

    function removerItemExtra(index: number) {
        setItensExtras(itensExtras.filter((_, i) => i !== index));
    }

    return (
        <>
            <div className={styles.filtros}>
                <div>
                    <label>Data agendada</label>
                    <input type="date" aria-label="Filtrar por data" value={filtroData} onChange={e => setFiltroData(e.target.value)} />
                </div>
                <div>
                    <label>Doador</label>
                    <input placeholder="Nome do doador..." value={filtroDoador} onChange={e => setFiltroDoador(e.target.value)} />
                </div>
                <button type="button" className={styles.btnBuscar} onClick={filtrar}>Filtrar</button>
            </div>

            <table className={styles.tabela}>
                <thead>
                    <tr>
                        <th>Cód. Agendamento</th>
                        <th>Doador</th>
                        <th>Item</th>
                        <th>Quantidade</th>
                        <th>Data agendada</th>
                    </tr>
                </thead>
                <tbody>
                    {resultado.map(doacao => (
                        <tr key={doacao.id} onClick={() => abrirModal(doacao)}>
                            <td>{doacao.codigoAgendamento}</td>
                            <td>{doacao.nomeDoador}</td>
                            <td>{doacao.item}</td>
                            <td>{doacao.quantidade}</td>
                            <td>{formatarData(doacao.dataAgendada)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {selecionada && (
                <div className={styles.backdrop} onClick={fecharModal}>
                    <div className={styles.modal} onClick={e => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <h2>Detalhes da Doação</h2>
                            <button type="button" className={styles.btnFechar} onClick={fecharModal}>✕</button>
                        </div>

                        <div className={styles.modalBody}>
                            <div className={styles.campo}>
                                <span>Cód. Agendamento</span>
                                <span>{selecionada.codigoAgendamento}</span>
                            </div>
                            <div className={styles.campo}>
                                <span>Doador</span>
                                <span>{selecionada.nomeDoador}</span>
                            </div>
                            <div className={styles.campo}>
                                <span>CPF / CNPJ</span>
                                <span>{selecionada.cpfCnpj}</span>
                            </div>
                            <div className={styles.campo}>
                                <span>Telefone</span>
                                <span>{selecionada.telefone}</span>
                            </div>
                            <div className={styles.campo}>
                                <span>Data agendada</span>
                                <span>{formatarData(selecionada.dataAgendada)}</span>
                            </div>
                            {/* Seção de itens */}
                            <p className={styles.itensLabel}>Itens do recebimento</p>

                            {/* Item principal com lote, quantidade editáveis */}
                            {!itemPrincipalRemovido && (
                                <div className={styles.itemLinha}>
                                    <span className={styles.itemNome}>{selecionada.item}</span>
                                    <div className={styles.itemQtdWrapper}>
                                        <input
                                            placeholder="Lote"
                                            aria-label="Lote do item"
                                            className={styles.inputLote}
                                            value={loteEditado}
                                            onChange={e => setLoteEditado(e.target.value)}
                                        />
                                        <input
                                            type="number"
                                            aria-label="Quantidade do item"
                                            className={styles.inputQtd}
                                            value={quantidadeEditada}
                                            min={0}
                                            onChange={e => setQuantidadeEditada(Number(e.target.value))}
                                        />
                                        <span className={styles.unidade}>kg</span>
                                        <button
                                            type="button"
                                            className={styles.btnRemover}
                                            onClick={() => setItemPrincipalRemovido(true)}
                                            aria-label="Remover item"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Itens extras adicionados */}
                            {itensExtras.map((extra, i) => (
                                <div key={i} className={styles.itemLinha}>
                                    <span className={styles.itemNome}>{extra.item}</span>
                                    <div className={styles.itemQtdWrapper}>
                                        <span className={styles.itemQtdTexto}>{extra.quantidade} kg</span>
                                        <button
                                            type="button"
                                            className={styles.btnRemover}
                                            onClick={() => removerItemExtra(i)}
                                            aria-label="Remover item"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                </div>
                            ))}

                            {/* Adicionar item extra */}
                            {!mostrarAddItem ? (
                                <button
                                    type="button"
                                    className={styles.btnMostrarAdd}
                                    onClick={() => setMostrarAddItem(true)}
                                >
                                    + Adicionar produto
                                </button>
                            ) : (
                                <div className={styles.addItemRow}>
                                    <select
                                        aria-label="Tipo do item adicional"
                                        value={novoItemTipo}
                                        onChange={e => setNovoItemTipo(e.target.value)}
                                        className={styles.addItemSelect}
                                    >
                                        {TIPOS_ITEM.map(t => (
                                            <option key={t} value={t}>{t}</option>
                                        ))}
                                    </select>
                                    <input
                                        type="number"
                                        aria-label="Quantidade do item adicional"
                                        className={styles.addItemQtd}
                                        value={novaQtd}
                                        min={1}
                                        onChange={e => setNovaQtd(Number(e.target.value))}
                                    />
                                    <button
                                        type="button"
                                        className={styles.btnAdicionarItem}
                                        onClick={adicionarItemExtra}
                                    >
                                        Confirmar
                                    </button>
                                    <button
                                        type="button"
                                        className={styles.btnCancelarAdd}
                                        onClick={() => setMostrarAddItem(false)}
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            )}

                            <div>
                                <label className={styles.obsLabel}>Observações</label>
                                <textarea
                                    className={styles.obsTextarea}
                                    placeholder="Registre aqui observações sobre este recebimento..."
                                    value={observacao}
                                    onChange={e => setObservacao(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className={styles.modalFooter}>
                            <button type="button" className={styles.btnFecharFooter} onClick={fecharModal}>Fechar</button>
                            <button type="button" className={styles.btnRecusar}>Recusar Recebimento</button>
                            <button type="button" className={styles.btnConfirmar}>Confirmar Recebimento</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
