"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    LayoutDashboard,
    Package,
    BarChart2,
    PackagePlus,
    PackageMinus,
    FileText,
    FolderOpen,
    Users,
    ClipboardList,
    UserPlus,
    Heart,
    FileSearch,
    Calendar,
    CalendarDays,
    CalendarCheck,
    ScrollText,
    LogOut,
} from "lucide-react";
import styles from "./layoutSidebar.module.css";
import logoDepartamento from "./img/logo_Bem-EstarAnimal.png";
import logoPrefeitura from "./img/logo_prefeituraVotorantim.png";

// Título mostrado no topo de cada página do admin
const titulos: Record<string, string> = {
    "/Admin/DashboardAdmin": "Painel Administrativo",
    "/Admin/ConsultaEstoque": "📊 Consulta de Estoque",
    "/Admin/ReceberDoacao": "📥 Recebimento de Doação",
    "/Admin/RetiradaDoacao": "📤 Saída de Doação",
    "/Admin/CadastroProdutos": "Cadastro de Produtos",
    "/Admin/ConsultaDonatario": "📋 Consulta de Donatários",
    "/Admin/ConsultaDoador": "📄 Consulta de Doadores",
    "/Admin/AgendamentosRetirada": "📆 Calendário de Retiradas",
    "/Admin/GerenciarAgendas": "🗂️ Gerenciar Agendas",
    "/Admin/HistoricoRetiradas": "📜 Histórico",
};

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
    const [openMenu, setOpenMenu] = useState<string | null>(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const pathname = usePathname();

    const toggle = (key: string) => setOpenMenu(openMenu === key ? null : key);
    // No celular, fecha a sidebar ao clicar em um link
    const fechar = () => setSidebarOpen(false);

    return (
        <>
            {sidebarOpen && <div className={styles.overlay} onClick={fechar} />}

            <aside className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarMobileOpen : ''}`} id="sidebar">
                <div className={styles.sidebarHeader}>
                    <div className={styles.logos}>
                        <Image src={logoDepartamento} alt="Departamento de Proteção e Bem-Estar Animal" className={styles.logo} />
                        <Image src={logoPrefeitura} alt="Prefeitura Municipal de Votorantim" className={styles.logo} />
                    </div>
                    <h2>Banco de Ração</h2>
                </div>

                <nav className={styles.sidebarNav}>
                    <Link href="/Admin/DashboardAdmin" className={styles.submenuLink} onClick={fechar}>
                        <LayoutDashboard size={16} /> Dashboard
                    </Link>

                    <div>
                        <button type="button" className={styles.menuBtn} onClick={() => toggle('estoque')}>
                            <Package size={16} /> Controle de Estoque
                        </button>
                        <div className={openMenu === 'estoque' ? styles.submenuOpen : styles.submenu}>
                            <Link href="/Admin/ConsultaEstoque" onClick={fechar}><BarChart2 size={14} /> Consulta de Estoque</Link>
                            <Link href="/Admin/ReceberDoacao" onClick={fechar}><PackagePlus size={14} /> Recebimento de Doação</Link>
                            <Link href="/Admin/RetiradaDoacao" onClick={fechar}><PackageMinus size={14} /> Saída de Doação</Link>
                            <span className={styles.submenuLinkDisabled}><FileText size={14} /> Relatórios de Estoque</span>
                            <Link href="/Admin/CadastroProdutos" onClick={fechar}><FolderOpen size={14} /> Cadastro de Produtos</Link>
                        </div>
                    </div>

                    <div>
                        <button type="button" className={styles.menuBtn} onClick={() => toggle('donatarios')}>
                            <Users size={16} /> Donatários
                        </button>
                        <div className={openMenu === 'donatarios' ? styles.submenuOpen : styles.submenu}>
                            <Link href="/Admin/ConsultaDonatario" onClick={fechar}><ClipboardList size={14} /> Consulta de Donatários</Link>
                            <span className={styles.submenuLinkDisabled}><UserPlus size={14} /> Cadastro de Donatário</span>
                        </div>
                    </div>

                    <div>
                        <button type="button" className={styles.menuBtn} onClick={() => toggle('doadores')}>
                            <Heart size={16} /> Doadores
                        </button>
                        <div className={openMenu === 'doadores' ? styles.submenuOpen : styles.submenu}>
                            <Link href="/Admin/ConsultaDoador" onClick={fechar}><FileSearch size={14} /> Consulta de Doadores</Link>
                            <span className={styles.submenuLinkDisabled}><UserPlus size={14} /> Cadastro de Doador</span>
                        </div>
                    </div>

                    <div>
                        <button type="button" className={styles.menuBtn} onClick={() => toggle('agendamentos')}>
                            <Calendar size={16} /> Agendamentos
                        </button>
                        <div className={openMenu === 'agendamentos' ? styles.submenuOpen : styles.submenu}>
                            <Link href="/Admin/AgendamentosRetirada" onClick={fechar}><CalendarDays size={14} /> Calendário de Retiradas</Link>
                            <Link href="/Admin/GerenciarAgendas" onClick={fechar}><CalendarCheck size={14} /> Gerenciar Agendas</Link>
                            <Link href="/Admin/HistoricoRetiradas" onClick={fechar}><ScrollText size={14} /> Histórico de Retiradas</Link>
                        </div>
                    </div>
                </nav>

                <div className={styles.sidebarFooter}>
                    {/* Ainda não existe página de login: por enquanto volta para a Home */}
                    <Link href="/" className={styles.btnSair}>
                        <LogOut size={15} /> Sair
                    </Link>
                </div>
            </aside>

            <div className={styles.base}>
                <header className={styles.topbar}>
                    <div className="d-flex align-items-center gap-3">
                        <button type="button" className={styles.hamburger} onClick={() => setSidebarOpen(true)}>☰</button>
                        <h1>{titulos[pathname] ?? "Painel Administrativo"}</h1>
                    </div>
                    <span className="text-muted small">Olá, Administrador</span>
                </header>

                <main className={styles.content}>
                    {children}
                </main>

                <footer className={styles.footer}>
                    Banco de Ração — Prefeitura de Votorantim
                </footer>
            </div>
        </>
    );
}
