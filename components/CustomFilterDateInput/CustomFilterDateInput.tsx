import styles from "./CustomFilterDateInput.module.css";
import { getTodayDate } from "@/utils/dateUtils";

interface CustomFilterDateInputProps {
    label: string;
    name: string;
    validade: boolean;
}

export const CustomFilterDateInput = (props: CustomFilterDateInputProps) => {
    const today = getTodayDate();
    
    return(
        <div className={styles.input_container} >
            <label className={styles.filter_label} >{props.label}</label>
            {props.validade ? <input type="date" className={styles.filter_input} name={props.name} /> : <input type="date" className={styles.filter_input} name={props.name} max={today} />}
        </div>
    )
}