"use client";
import { useEffect, useState } from "react";
import styles from "./AdminGerenciarAgendas.module.css";
import { IAdminAgenda } from "../../interfaces/adminAgenda.interface";
import { IAdminAgendaDoacao } from "../../interfaces/adminAgendaDoacao.interface";
import { buscarSolicitacoesRetirada } from "../../services/retiradas.service";
import { buscarSolicitacoesDoacao } from "../../services/doacoes.service";
import { formatarData } from "../../utils/dateUtils";

// Saldo atual do estoque (em kg)
// TODO (etapa 4): calcular a partir do estoque real (estoque.service) em vez de valores fixos
const saldoEstoque: Record<string, number> = {
    "Ração de Cachorro": 45,
    "Ração de Gato": 8,
};

function badgeClass(status: string, s: Record<string, string>) {
    if (status === "aprovado") return s.badgeAprovado;
    if (status === "recusado") return s.badgeRecusado;
    return s.badgePendente;
}

function labelStatus(status: string) {
    if (status === "aprovado") return "Aprovado";
    if (status === "recusado") return "Recusado";
    return "Pendente";
}

export const AdminGerenciarAgendas = () => {
    const [aba, setAba] = useState<"retiradas" | "doacoes">("retiradas");
    const [expandido, setExpandido] = useState<number | null>(null);

    // Filtros — retiradas
    const [filtroStatusR, setFiltroStatusR] = useState("");
    const [filtroNomeR, setFiltroNomeR] = useState("");
    const [filtroDataR, setFiltroDataR] = useState("");
    const [retiradas, setRetiradas] = useState<IAdminAgenda[]>([]);
    const [resultadoR, setResultadoR] = useState<IAdminAgenda[]>([]);

    // Filtros — doações
    const [filtroStatusD, setFiltroStatusD] = useState("");
    const [filtroNomeD, setFiltroNomeD] = useState("");
    const [filtroDataD, setFiltroDataD] = useState("");
    const [doacoes, setDoacoes] = useState<IAdminAgendaDoacao[]>([]);
    const [resultadoD, setResultadoD] = useState<IAdminAgendaDoacao[]>([]);

    useEffect(() => {
        buscarSolicitacoesRetirada().then(dados => {
            setRetiradas(dados);
            setResultadoR(dados);
        });
        buscarSolicitacoesDoacao().then(dados => {
            setDoacoes(dados);
            setResultadoD(dados);
        });
    }, []);

    // Datas alteradas pelo funcionário (por id do agendamento)
    const [datasAlteradas, setDatasAlteradas] = useState<Record<number, string>>({});

    // Quantidades editadas pelo funcionário — chave: "agendaId-itemIndex"
    const [quantidadesEditadas, setQuantidadesEditadas] = useState<Record<string, number>>({});

    // Status alterados localmente — chave: "r-id" (retirada) ou "d-id" (doação)
    const [statusAlterados, setStatusAlterados] = useState<Record<string, string>>({});

    function filtrarRetiradas() {
        setResultadoR(retiradas.filter(r =>
            (!filtroStatusR || r.status === filtroStatusR) &&
            (!filtroNomeR || r.donatario.toLowerCase().includes(filtroNomeR.toLowerCase())) &&
            (!filtroDataR || r.dataSolicitacao === filtroDataR)
        ));
        setExpandido(null);
    }

    function filtrarDoacoes() {
        setResultadoD(doacoes.filter(d =>
            (!filtroStatusD || d.status === filtroStatusD) &&
            (!filtroNomeD || d.doador.toLowerCase().includes(filtroNomeD.toLowerCase())) &&
            (!filtroDataD || d.dataProposta === filtroDataD)
        ));
        setExpandido(null);
    }

    function toggleCard(id: number) {
        setExpandido(expandido === id ? null : id);
    }

    function alterarData(id: number, data: string) {
        setDatasAlteradas({ ...datasAlteradas, [id]: data });
    }

    function getDataAtual(id: number, dataOriginal: string) {
        return datasAlteradas[id] ?? dataOriginal;
    }

    function alterarQuantidade(agendaId: number, itemIndex: number, valor: number) {
        const chave = `${agendaId}-${itemIndex}`;
        setQuantidadesEditadas({ ...quantidadesEditadas, [chave]: valor });
    }

    function getQuantidade(agendaId: number, itemIndex: number, qtdOriginal: number) {
        const chave = `${agendaId}-${itemIndex}`;
        return quantidadesEditadas[chave] ?? qtdOriginal;
    }

    function getStatus(prefixo: string, id: number, statusOriginal: string) {
        return statusAlterados[`${prefixo}-${id}`] ?? statusOriginal;
    }

    function definirStatus(prefixo: string, id: number, novoStatus: string) {
        setStatusAlterados({ ...statusAlterados, [`${prefixo}-${id}`]: novoStatus });
    }

    return (
        <div>
            <div className={styles.abas}>
                <button
                    type="button"
                    className={aba === "retiradas" ? styles.abaAtiva : styles.aba}
                    onClick={() => { setAba("retiradas"); setExpandido(null); }}
                >
                    Retiradas (Donatário)
                </button>
                <button
                    type="button"
                    className={aba === "doacoes" ? styles.abaAtiva : styles.aba}
                    onClick={() => { setAba("doacoes"); setExpandido(null); }}
                >
                    Doações (Doador)
                </button>
            </div>

            {aba === "retiradas" && (
                <>
                    <div className={styles.filtros}>
                        <div>
                            <label>Status</label>
                            <select aria-label="Filtrar por status" value={filtroStatusR} onChange={e => setFiltroStatusR(e.target.value)}>
                                <option value="">Todos</option>
                                <option value="pendente">Pendente</option>
                                <option value="aprovado">Aprovado</option>
                                <option value="recusado">Recusado</option>
                            </select>
                        </div>
                        <div>
                            <label>Donatário</label>
                            <input placeholder="Nome..." value={filtroNomeR} onChange={e => setFiltroNomeR(e.target.value)} />
                        </div>
                        <div>
                            <label>Data</label>
                            <input type="date" aria-label="Filtrar por data" value={filtroDataR} onChange={e => setFiltroDataR(e.target.value)} />
                        </div>
                        <button type="button" className={styles.btnFiltrar} onClick={filtrarRetiradas}>Filtrar</button>
                    </div>

                    <div className={styles.lista}>
                        {resultadoR.map(agenda => {
                            const status = getStatus("r", agenda.id, agenda.status);
                            const resumo = agenda.itensSolicitados.length === 1
                                ? agenda.itensSolicitados[0].item
                                : `${agenda.itensSolicitados.length} itens solicitados`;

                            return (
                                <div key={agenda.id} className={styles.card}>
                                    <div className={styles.cardHeader} onClick={() => toggleCard(agenda.id)}>
                                        <div className={styles.cardHeaderInfo}>
                                            <strong>{agenda.donatario}</strong>
                                            <span>Solicitado em {formatarData(agenda.dataSolicitacao)} — {resumo}</span>
                                        </div>
                                        <span className={`${styles.badge} ${badgeClass(status, styles)}`}>
                                            {labelStatus(status)}
                                        </span>
                                    </div>

                                    {expandido === agenda.id && (
                                        <div className={styles.cardBody}>
                                            <div className={styles.dadosGrid}>
                                                <p><strong>Nome:</strong> {agenda.donatario}</p>
                                                <p><strong>CPF:</strong> {agenda.cpf}</p>
                                                <p><strong>Telefone:</strong> {agenda.telefone}</p>
                                            </div>

                                            <div className={styles.itensSolicitados}>
                                                <h4>Itens solicitados</h4>
                                                <table className={styles.tabelaItens}>
                                                    <thead>
                                                        <tr>
                                                            <th>Item</th>
                                                            <th>Quantidade</th>
                                                            <th>Saldo disponível</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {agenda.itensSolicitados.map((it, i) => {
                                                            const saldo = saldoEstoque[it.item] ?? 0;
                                                            const qtd = getQuantidade(agenda.id, i, it.quantidade);
                                                            const suficiente = saldo >= qtd;
                                                            return (
                                                                <tr key={i}>
                                                                    <td>{it.item}</td>
                                                                    <td>
                                                                        <input
                                                                            type="number"
                                                                            aria-label="Quantidade"
                                                                            className={styles.inputQtd}
                                                                            value={qtd}
                                                                            min={0}
                                                                            disabled={status !== "pendente"}
                                                                            onChange={e => alterarQuantidade(agenda.id, i, Number(e.target.value))}
                                                                        />
                                                                    </td>
                                                                    <td className={suficiente ? styles.saldoOk : styles.saldoBaixo}>
                                                                        {saldo} kg
                                                                    </td>
                                                                </tr>
                                                            );
                                                        })}
                                                    </tbody>
                                                </table>
                                            </div>

                                            <div className={styles.dataAlteracao}>
                                                <label>Data de retirada</label>
                                                <input
                                                    type="date"
                                                    aria-label="Data de retirada"
                                                    disabled={status !== "pendente"}
                                                    value={getDataAtual(agenda.id, agenda.dataAgendada)}
                                                    onChange={e => alterarData(agenda.id, e.target.value)}
                                                />
                                            </div>

                                            <div className={styles.acoes}>
                                                {status === "pendente" && (
                                                    <>
                                                        <button type="button" className={styles.btnAprovar} onClick={() => definirStatus("r", agenda.id, "aprovado")}>Aprovar</button>
                                                        <button type="button" className={styles.btnRecusar} onClick={() => definirStatus("r", agenda.id, "recusado")}>Recusar</button>
                                                    </>
                                                )}
                                                {(status === "aprovado" || status === "recusado") && (
                                                    <button type="button" className={styles.btnReabrir} onClick={() => definirStatus("r", agenda.id, "pendente")}>Reabrir Solicitação</button>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </>
            )}

            {aba === "doacoes" && (
                <>
                    <div className={styles.filtros}>
                        <div>
                            <label>Status</label>
                            <select aria-label="Filtrar por status" value={filtroStatusD} onChange={e => setFiltroStatusD(e.target.value)}>
                                <option value="">Todos</option>
                                <option value="pendente">Pendente</option>
                                <option value="aprovado">Aprovado</option>
                                <option value="recusado">Recusado</option>
                            </select>
                        </div>
                        <div>
                            <label>Doador</label>
                            <input placeholder="Nome..." value={filtroNomeD} onChange={e => setFiltroNomeD(e.target.value)} />
                        </div>
                        <div>
                            <label>Data</label>
                            <input type="date" aria-label="Filtrar por data" value={filtroDataD} onChange={e => setFiltroDataD(e.target.value)} />
                        </div>
                        <button type="button" className={styles.btnFiltrar} onClick={filtrarDoacoes}>Filtrar</button>
                    </div>

                    <div className={styles.lista}>
                        {resultadoD.map(doacao => {
                            const status = getStatus("d", doacao.id, doacao.status);
                            return (
                                <div key={doacao.id} className={styles.card}>
                                    <div className={styles.cardHeader} onClick={() => toggleCard(doacao.id)}>
                                        <div className={styles.cardHeaderInfo}>
                                            <strong>{doacao.doador}</strong>
                                            <span>Previsto para {formatarData(doacao.dataProposta)} — {doacao.item}</span>
                                        </div>
                                        <span className={`${styles.badge} ${badgeClass(status, styles)}`}>
                                            {labelStatus(status)}
                                        </span>
                                    </div>

                                    {expandido === doacao.id && (
                                        <div className={styles.cardBody}>
                                            <div className={styles.dadosGrid}>
                                                <p><strong>Nome:</strong> {doacao.doador}</p>
                                                <p><strong>CPF/CNPJ:</strong> {doacao.cpfCnpj}</p>
                                                <p><strong>Telefone:</strong> {doacao.telefone}</p>
                                                <p><strong>Item:</strong> {doacao.item}</p>
                                                <p><strong>Quantidade estimada:</strong> {doacao.quantidade} kg</p>
                                            </div>

                                            <div className={styles.dataAlteracao}>
                                                <label>Data de entrega</label>
                                                <input
                                                    type="date"
                                                    aria-label="Data de entrega"
                                                    disabled={status !== "pendente"}
                                                    value={getDataAtual(doacao.id + 1000, doacao.dataProposta)}
                                                    onChange={e => alterarData(doacao.id + 1000, e.target.value)}
                                                />
                                            </div>

                                            <div className={styles.acoes}>
                                                {status === "pendente" && (
                                                    <>
                                                        <button type="button" className={styles.btnAprovar} onClick={() => definirStatus("d", doacao.id, "aprovado")}>Confirmar Agendamento</button>
                                                        <button type="button" className={styles.btnRecusar} onClick={() => definirStatus("d", doacao.id, "recusado")}>Recusar</button>
                                                    </>
                                                )}
                                                {(status === "aprovado" || status === "recusado") && (
                                                    <button type="button" className={styles.btnReabrir} onClick={() => definirStatus("d", doacao.id, "pendente")}>Reabrir Solicitação</button>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </>
            )}
        </div>
    );
};
