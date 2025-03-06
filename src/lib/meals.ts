import fs from 'node:fs'
import sql from 'better-sqlite3'
import slugify from 'slugify'
import xss from 'xss'
import { NewMealFromUser } from './types'

const db = sql('meals.db')

export const getMeals = async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    return db.prepare('SELECT * FROM meals').all()
}

export const getMeal = (slug: string) => {
    return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug)
}

export const saveMeal = async (meal: NewMealFromUser) => {
    meal.slug = slugify(meal.title, { lower: true })
    meal.instructions = xss(meal.instructions)

    const extension = meal.image.name.split('.').pop()
    const filename = `${meal.slug}.${extension}`

    const stream = fs.createWriteStream(`public/images/${filename}`)

    //convert image to a buffered image 
    const bufferedImage = await meal.image.arrayBuffer()

    stream.write(Buffer.from(bufferedImage), (error) => {
        if (error) {
            throw new Error('Saving image failed!')
        }
    })

    const imagePath = `/images/${filename}`

    db.prepare(`
        INSERT INTO meals 
            (slug, title, image, summary, instructions, creator, creator_email)
        VALUES
            (@slug, @title, @image, @summary, @instructions, @creator, @creator_email)
    `).run({ ...meal, image: imagePath })
}