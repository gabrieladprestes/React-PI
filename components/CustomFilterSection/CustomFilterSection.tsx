import React from "react";
import styles from "./CustomFilterSection.module.css"

interface CustomFilterSectionProps {
    children: React.ReactNode[];
}

export const CustomFilterSection = (props: CustomFilterSectionProps) => {
    return(
        <section className={styles.filter_section} >
            {...props.children}
        </section>
    )
}