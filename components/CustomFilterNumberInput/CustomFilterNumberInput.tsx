import styles from "./CustomFilterNumberInput.module.css";

interface CustomFilterNumberInputProps {
    placeholder: string;
    name: string;
}

export const CustomFilterNumberInput = (props: CustomFilterNumberInputProps) => {
    return(
        <div className={styles.input_container}>
            <input type="number" className={styles.filter_input} placeholder={props.placeholder} name={props.name} min="1" />
        </div>
    )
}