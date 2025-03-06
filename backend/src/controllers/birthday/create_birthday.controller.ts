import { createBirthdayService } from '../../services/birthday/create_birthday.service'
import { RequestHandler } from 'express'

export const createBirthdayController: RequestHandler = async (req, res) => {
  try {
    const { birthday_person, date } = req.body

    const { id } = req.params

    const birthday = await createBirthdayService(birthday_person, date, id)

    res.status(201).json(birthday)
  } catch (error) {
    if (error instanceof Error) {
      console.error('Erro ao criar aniversario', error)
      res.status(500).json({ message: error.message })
    } else {
      console.error('Erro desconhecido ao criar aniversario', error)
      res.status(500).json({ message: 'Unknown error' })
    }
  }
}