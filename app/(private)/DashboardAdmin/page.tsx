
import React from "react";
import styles from './dashboardAdmin.module.css';
import { CustomCardAdmin } from '@/components/CustomCardAdmin/CustomCardAdmin';
import { IAdminCard } from '@/interfaces/adminCard.interface';
export default function DashboardAdmin() {

    const CardsAdmin: IAdminCard[] = [
        {
            id: 1,
            icone: "📦",
            link: "#",
            descricao: "Controle de estoque"
        },
        {
            id: 2,
            icone: "🎯",
            link: "#",
            descricao: "Emitir Doação"
        },
        {
            id: 3,
            icone: "❤️",
            link: "/ReceberDoacao",
            descricao: "Receber Doação"
        },
        {
            id: 4,
            icone: "📅",
            link: "#",
            descricao: "Agendamentos"
        },

    ]



    return (
        <>

            <header className={styles.topbar}>

                <div className="d-flex align-items-center gap-3">
                    <button id="btnToggle" className={styles.toggleBtn}>☰</button>
                    <h1 className="m-0">Painel Administrativo</h1>
                </div>

                <div className="d-flex align-items-rigth gap-3">
                    <span className="text-muted small">Olá, Administrador</span>
                    <button className="btn btn-outline-secondary btn-sm">Sair</button>
                </div>

            </header>

            <div>


                <h2 className="section-title mb-4">Acesso rápido</h2>

                <div className="row g-4">

                    {CardsAdmin.map((card) => {
                        return (

                            <CustomCardAdmin key={card.id} 
                            icone={card.icone} descricao={card.descricao} link={card.link}/>

                        )
                    })}

                </div>


                

            </div>

            <footer>
                Banco de Ração — Prefeitura de Votorantim
            </footer>

        </>
    );
}