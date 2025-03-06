import Link from 'next/link';
import classes from './page.module.css';
import MealsGrid from '@/components/Meals/MealsGrid';
import { getMeals } from '@/lib/meals';
import { Meal } from '@/lib/types';
import { Suspense } from 'react';

const Meals = async() => {
  const meals = await getMeals() as Meal[]

  return <MealsGrid meals={meals} />
}

const MealsPage = async() => {
    return (
      <>
        <header className={classes.header}>
          <h1>Delicious meals, created <span className={classes.highlight}>by you</span></h1>
          <p>Choose your favorite recipe and cook it yourself. It is easy and fun. </p>
          <p className={classes.cta}>
            <Link href='/meals/share'> Share Your Favorite Recipe</Link>
          </p>
        </header>
        <main className={classes.main}>
          <Suspense fallback={<p className={classes.loading}>Fetching meals...</p>}>
            <Meals />
          </Suspense>
          
        </main>
      </>

    );
  }
  
  export default MealsPage