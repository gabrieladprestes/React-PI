"use client";
import styles from "./CadastroAnimal.module.css";
import { CustomTextInput } from "@/components/CustomTextInput/CustomTextInput";
import { CustomSelectInput } from "@/components/CustomSelectInput/CustomSelectInput";
import { ISelectInput } from "@/interfaces/selectInput.interface";
import { CustomRadioContainer } from "@/components/CustomRadioContainer/CustomRadioContainer";
import { CustomRadioInput } from "@/components/CustomRadioInput/CustomRadioInput";
import { CustomRadioTextInput } from "@/components/CustomRadioTextInput/CustomRadioTextInput";

export default function CadastroAnimal() {
  const idadeSelect: ISelectInput[] = [{id: 1, text: "Filhote"}, {id: 2, text: "Adulto"}, {id: 3, text: "Senior"}];
  const porteSelect: ISelectInput[] = [{id: 1, text: "Pequeno"}, {id: 2, text: "Médio"}, {id: 3, text: "Grande"}];

  return (
    <>
      <section style={styles} className={styles.container}>
        <div style={styles} className={styles.container_title} >
          <h1>Cadastre seu animalzinho!!</h1>
        </div>

        <section style={styles} className={styles.info_container}>
          <div style={styles} className={styles.photo_container} >
            <div style={styles} className={styles.pet_photo}>
              <p>Foto do pet</p>
            </div>
          </div>

          <div style={styles} className={styles.inputs_container} >
            <CustomTextInput name="nomePet" label="Nome" placeholder="Digite aqui" />
            
            <CustomSelectInput forId="idade" label="Idade" name="idadePet" items={idadeSelect} />
            
            <CustomSelectInput forId="porte" label="Porte" name="portePet" items={porteSelect} />
          </div>
        </section>

        <CustomRadioContainer>
          <CustomRadioInput title="Espécie" name="especie" firstValue="felino" firstLabel="Felino" secondValue="canino" secondLabel="Canino" />
          <CustomRadioInput title="Sexo" name="sexo" firstValue="macho" firstLabel="Macho" secondValue="femea" secondLabel="Fêmea" />
          <CustomRadioInput title="Castrado" name="castrado" firstValue="sim" firstLabel="Sim" secondValue="nao" secondLabel="Não" />
          <CustomRadioTextInput title="Microchipado" name="microchipado" firstValue="sim" firstLabel="Sim" secondValue="nao" secondLabel="Não" placeholder="Digite aqui" />
        </CustomRadioContainer>

        <button style={styles} id={styles.submit}>Cadastrar</button>
      </section>
    </>
  );
}
