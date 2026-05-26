"use client";
import React from "react";
import styles from "./layoutSidebar.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';


export default function PrivateLayout({ children }: { children: React.ReactNode }) {
    return (
        <>

            <aside className={styles.sidebar} id="sidebar">
                <div className={styles.sidebarHeader}>
                    <h2>Banco de Ração</h2>
                </div>

                <nav>
                    <div>
                        <button className={styles.menuBtn}>📦 Controle de Estoque</button>
                        <div className={styles.submenu}>
                            <a href="#">📊 Consulta de Estoque</a>
                            <a href="#">➕ Recebimento de Mercadoria</a>
                            <a href="#">📝 Relatórios de Estoque</a>
                            <a href="#">📁 Cadastro de Produtos</a>
                        </div>
                    </div>

                    <div>
                        <button className={styles.menuBtn}>🎯 Donatários</button>
                        <div className={styles.submenu}>
                            <a href="#">👤 Cadastro de Donatário</a>
                            <a href="#">📋 Consulta de Donatários</a>
                        </div>
                    </div>

                    <div>
                        <button className={styles.menuBtn}>❤️ Doadores</button>
                        <div className={styles.submenu}>
                            <a href="#">➕ Cadastro de Doador</a>
                            <a href="#">📄 Lista de Doadores</a>
                            <a href="#">📦 Histórico de Doações</a>
                        </div>
                    </div>

                    <div>
                        <button className={styles.menuBtn}>📅 Agendamentos</button>
                        <div className={styles.submenu}>
                            <a href="#">📆 Agendamentos de Retirada</a>
                            <a href="#">👥 Gerenciar Agendados</a>
                            <a href="#">📜 Histórico de Retiradas</a>
                        </div>
                    </div>
                </nav>
            </aside>

            {/* ← ERA ISSO QUE FALTAVA TEM QUE USAR*/}
            <main className={`${styles.content} ${styles.footer}`}>
                {children}
            </main>
        </>

    );
}