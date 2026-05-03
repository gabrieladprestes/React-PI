import styles from "./CustomFilterDateInput.module.css";
import { getTodayDate } from "@/utils/dateUtils";

interface CustomFilterDateInputProps {
    label: string;
    name: string;
}

export const CustomFilterDateInput = (props: CustomFilterDateInputProps) => {
    const today = getTodayDate();

    return(
        <div className={styles.input_container} >
            <label className={styles.filter_label} >{props.label}</label>
            <input type="date" className={styles.filter_input} name={props.name} min={today} />
        </div>
    )
}