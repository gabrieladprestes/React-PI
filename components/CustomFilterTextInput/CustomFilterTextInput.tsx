import styles from "./CustomFilterTextInput.module.css";

interface CustomFilterTextInputProps {
    placeholder: string;
    name: string;
}

export const CustomFilterTextInput = (props: CustomFilterTextInputProps) => {
    return(
        <div className={styles.input_container} >
            <input type="text" placeholder={props.placeholder} name={props.name} className={styles.filter_input} />
        </div>
    )
}