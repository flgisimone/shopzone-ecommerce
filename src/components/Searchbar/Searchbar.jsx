import { useGlobalContext } from "@/context"

import styles from "./styles.module.scss"

const Searchbar = () => {

    const { searchValue, setSearchValue } = useGlobalContext()

    const onHandleInput = (e) => {
        e.preventDefault()
        setSearchValue(e.target.value)
    }

    return (
    <div className={styles.searchbar}>
        <input type="text" value={searchValue} onChange={onHandleInput} className={styles.inputFilter} placeholder="Search"/>
    </div>
  )
}

export default Searchbar