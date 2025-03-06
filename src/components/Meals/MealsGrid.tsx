import classes from './MealsGrid.module.css';
import MealItem from './MealItem';
import { MealGridProps } from '@/lib/types';

const MealGrid: React.FC<MealGridProps> = ({ meals }) => {
    return (
        <ul className={classes.meals}>
            {meals.map(meal => 
                <li key={meal.id}>
                    <MealItem {...meal} />
                </li>
            )}
        </ul>
    )
}

export default MealGrid;