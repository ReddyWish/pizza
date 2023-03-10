import React from 'react';
import styles from './search.module.scss'
import deleteIcon from '../../assets/img/delete_icon.svg'
import {useSelector, useDispatch} from "react-redux";
import {setSearchValue} from "../../redux/searchSlice";
import {RootState} from "../../redux/store";


const Search: React.FC = () => {
  const searchValue = useSelector((state: RootState) => state.searchSlice.searchValue)
  const inputRef = React.useRef<HTMLInputElement>(null);
  console.log(searchValue)
  const dispatch = useDispatch()
  const onClickClear = () => {
    dispatch(setSearchValue(""));
    inputRef.current?.focus();
  }

  return (
    <div className={styles.root}>
    <input placeholder='Поиск пиццы...'
           className={styles.input}
           ref={inputRef}
           value={searchValue}
           onChange={event => dispatch(setSearchValue(event.target.value))}/>
      {searchValue && <img src={deleteIcon} alt="delete" className={styles.delete} onClick={() => onClickClear()}/>}
    </div>
  );
}

export default Search;