import { CustomTitle } from "@/components/CustomTitle/CustomTitle";
import styles from './Home.module.css';

export default function Home() {
  return (
    <>
      <CustomTitle title="Banco de Rações" ></CustomTitle>
      <br/>
      <p style={{color: "#000; width: 50%"}}>Bem-vindo(a) ao banco de ração, o banco de ração solidária é um projeto sem fins lucrativos, que recebe doações de alimentos para cães e gatos, separa e distribui para pessoas necessitadas que possuem um pet. Acreditamos que nenhum bichinho deve passar fome, mas sim receber muito amor, carinho e é claro, alimento para sua barriguinha, com sua ajuda podemos transformar solidariedade em alimento e esperança.</p>
      <div style={styles} className={styles.cards_div} >
        <p>Div</p>
        <div>
          
        </div>
      </div>
    </>
  );
}
