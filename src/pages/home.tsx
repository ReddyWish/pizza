import React from 'react';
import Categories from "../components/categories";
import Sort from "../components/sort";
import {sortVariants} from "../components/sort";
import Skeleton from "../components/pizzaBlock/skeleton";
import PizzaBlock from "../components/pizzaBlock/pizzaBlock";
import Pagination from "../components/pagination/pagination";
import {useSelector, useDispatch} from "react-redux";
import filterSlice, {setActiveCategory, setSelectingSorting, setCurrentPage, setFilters} from "../redux/filterSlice";
import pizzasSlice, {setPizzas, fetchPizzas} from "../redux/pizzasSlice";
import qs from "qs"
import {useNavigate} from "react-router-dom";
import {RootState} from "../redux/store";


const Home: React.FC = () => {
  const navigate = useNavigate();
  const searchValue = useSelector((state: RootState) => state.searchSlice.searchValue)
  const activeCategory = useSelector((state: RootState) => state.filterSlice.activeCategory)
  const selectedSorting = useSelector((state: RootState) => state.filterSlice.selectedSorting)
  const currentPage = useSelector((state: RootState) => state.filterSlice.currentPage) || 1
  const {pizzas, status} = useSelector((state: RootState) => state.pizzasSlice)
  const dispatch = useDispatch()
  const count = pizzas.length
  const pageSize = 4

    const filteredPizzas = pizzas.filter((item: {name: string}) => item.name.toLowerCase().includes(searchValue.toLowerCase()))
  const paginate = (pageNumber: number, pageSize: number) => {
    const startIndex = (pageNumber - 1) * pageSize
    return [...filteredPizzas].splice(startIndex, pageSize)
  }
  const pizzasCrop = paginate(currentPage, pageSize)
  const handlePageChange = (index: number) => {
    dispatch(setCurrentPage(index))
  }

  const onChangeCategory = (id: number) => {
    dispatch(setActiveCategory(id))
  }

  const selectingSortType = (i: {}) => {
    dispatch(setSelectingSorting(i))
  }

  const getPizzas = async () => {
    // @ts-ignore
    dispatch(fetchPizzas({activeCategory, selectedSorting}))
  }

  React.useEffect(() => {
    getPizzas()
  }, [activeCategory, selectedSorting])


  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortVariants.find(obj => obj.sortProperty === params.sortProperty)
      dispatch(
        setFilters({
          ...params,
          sort,
        })
      )
    }
  }, [])


  React.useEffect(() => {
    const queryString = qs.stringify({
      activeCategory,
      selectedSorting
    })
    navigate(`?${queryString}`)
  }, [activeCategory, selectedSorting])

  return (
    <div className="container">
      <div className="content__top">
        <Categories category={activeCategory} onChangeCategory={(i) => onChangeCategory(i)}/>
        <Sort selectedSorting={selectedSorting} selectingSortType={(i) => selectingSortType(i)}/>
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {
        status === 'error' ? <div>
          <h2>Корзина пустая 😕</h2>
          <p>Вероятней всего, вы не заказывали ещё пиццу.Для того, чтобы заказать пиццу, перейди на главную страницу</p>
        </div> : <div className="content__items">
          {
            status === 'loading' ? [...new Array(6)].map((_, index) => <Skeleton key={index}/>) :
              pizzasCrop.map((pizza: PizzaBlock) => <PizzaBlock key={pizza.id} {...pizza}/>)
          }
        </div>
      }

      <Pagination itemsCount={count} pageSize={pageSize} onPageChange={handlePageChange} currentPage={currentPage}/>
    </div>
  );
}

export default Home;