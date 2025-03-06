'use client'

import ImagePicker from '@/components/Meals/ImagePicker';
import classes from './page.module.css';
import { shareMeal } from '@/lib/actions';
import MealsFormSubmit from '@/components/Meals/MealsFormSubmit';
import { useActionState } from 'react';

const ShareMealPage = () => {
 const [state, formAction] = useActionState(shareMeal, { message: '' })

  return (
    <>
      <header className={classes.header}>
        <h1>
          Share your <span className={classes.highlight}>favorite meal</span>
        </h1>
        <p>Or any other meal you feel needs sharing!</p>
      </header>
      <main className={classes.main}>
        <form className={classes.form} action={formAction}>
          <div className={classes.row}>
            <p>
              <label htmlFor="name">Your name</label>
              <input type="text" id="name" name="name" required />
            </p>
            <p>
              <label htmlFor="email">Your email</label>
              <input type="email" id="email" name="email"  />
            </p>
          </div>
          <p>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" required />
          </p>
          <p>
            <label htmlFor="summary">Short Summary</label>
            <input type="text" id="summary" name="summary" required />
          </p>
          <p>
            <label htmlFor="instructions">Instructions</label>
            <textarea
              id="instructions"
              name="instructions"
              rows={10}
              required
            ></textarea>
          </p>

          <ImagePicker label="Meal Image" name="image" />
          
          {state.message && (
            <p className="bg-blue-50 text-blue-800 border border-blue-300 p-3 rounded-md mt-2">
              {state.message}
            </p>
          )}

          <p className={classes.actions}>
            < MealsFormSubmit />
          </p>
        </form>
      </main>
    </>
  );
}

export default ShareMealPage