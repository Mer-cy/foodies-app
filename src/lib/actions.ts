'use server'

import { redirect } from "next/navigation"
import { saveMeal } from "./meals"
import { revalidatePath } from "next/cache"

const isInvalidText = (text: string) => {
    return !text || text.trim() === ''
}

export const shareMeal = async (prevState: { message: string } , formData: FormData) =>{

    const meal = {
      title: formData.get('title') as string,
      summary: formData.get('summary') as string,
      instructions: formData.get('instructions') as string,
      image: formData.get('image') as File,
      creator: formData.get('name') as string,
      creator_email: formData.get('email') as string,
    }

    if ( isInvalidText(meal.title) || isInvalidText(meal.summary) || isInvalidText(meal.instructions) || !meal.image || meal.image.size === 0 || isInvalidText(meal.creator) || isInvalidText(meal.creator_email) || !meal.creator_email.includes('@') ) {
      return { 
        message: 'Invalid input. Please check your input and try again.'
      }
    }

    await saveMeal(meal)

    revalidatePath('/meals')

    redirect('/meals')
  }