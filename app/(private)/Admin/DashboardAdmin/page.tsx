import Link from 'next/link';
import styles from './dashboardAdmin.module.css';

const indicadores = [
    { icone: "📦", label: "Itens em Estoque",         valor: "11 registros",  sub: "230 kg no total",          cor: "teal"    },
    { icone: "⚠️", label: "Vencendo em 30 dias",      valor: "5 itens",       sub: "Requer atenção",            cor: "amarelo" },
    { icone: "📋", label: "Retiradas Pendentes",       valor: "2",             sub: "Aguardando aprovação",      cor: "teal"    },
    { icone: "📥", label: "Doações Agendadas",         valor: "3",             sub: "A confirmar esta semana",   cor: "teal"    },
];

const acessoRapido = [
    { icone: "📊", label: "Consulta de Estoque",     href: "/Admin/ConsultaEstoque"     },
    { icone: "📥", label: "Receber Doação",          href: "/Admin/ReceberDoacao"       },
    { icone: "📆", label: "Calendário de Retiradas", href: "/Admin/AgendamentosRetirada"},
    { icone: "🗂️", label: "Gerenciar Agendas",      href: "/Admin/GerenciarAgendas"    },
];

export default function DashboardAdmin() {
    return (
        <>
            <section className={styles.secao}>
                <h2 className={styles.secaoTitulo}>Indicadores</h2>
                <div className={styles.indicadoresGrid}>
                    {indicadores.map((ind, i) => (
                        <div key={i} className={`${styles.indicadorCard} ${ind.cor === "amarelo" ? styles.indicadorAmarelo : styles.indicadorTeal}`}>
                            <div className={styles.indicadorIcone}>{ind.icone}</div>
                            <div className={styles.indicadorInfo}>
                                <span className={styles.indicadorValor}>{ind.valor}</span>
                                <span className={styles.indicadorLabel}>{ind.label}</span>
                                <span className={styles.indicadorSub}>{ind.sub}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className={styles.secao}>
                <h2 className={styles.secaoTitulo}>Acesso Rápido</h2>
                <div className={styles.acessoGrid}>
                    {acessoRapido.map((item, i) => (
                        <Link key={i} href={item.href} className={styles.menuCard}>
                            <div className={styles.menuIcon}>{item.icone}</div>
                            <h3>{item.label}</h3>
                        </Link>
                    ))}
                </div>
            </section>
        </>
    );
}
