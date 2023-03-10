import React from 'react';

type CategoriesProps = {
  category: number;
    onChangeCategory: (index: number) => void;
}

const Categories: React.FC<CategoriesProps> = ({category, onChangeCategory}) => {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']
  return (
    <div className="categories">
      <ul>
        {
          categories.map((value, index) => <li key={index}
                                                                onClick={() => onChangeCategory(index)}
                                                                className={category === index ? 'active' : ''}>{value}</li>)
        }
      </ul>
    </div>
  );
}

export default Categories;