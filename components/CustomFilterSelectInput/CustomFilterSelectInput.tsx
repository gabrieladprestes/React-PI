import styles from "./CustomFilterSelectInput.module.css";
import { IFilterSelectInput } from "@/interfaces/filterSelectInput.interface";

interface CustomFilterSelectInputProps {
    name: string;
    title: string;
    options: IFilterSelectInput[];
}

export const CustomFilterSelectInput = (props: CustomFilterSelectInputProps) => {
    return(
        <div className={styles.input_container} >
            <select className={styles.filter_input} name={props.name} defaultValue="0" >
                <option disabled value="0" >{props.title}</option>
                {props.options.map((option) => {
                    return(
                        <option key={option.id} value={option.value} >{option.text}</option>
                    )
                })}
            </select>
        </div>
    )
}