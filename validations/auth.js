import {body} from 'express-validator'

export const registerValidation = [
  body('email','не валідний емейл').isEmail(),
  body('password', 'пароль менше 5 символів').isLength({min:5}),
  body('fullName', 'введіть імя').isLength({min:3}),
  body('avatarUrl').optional().isURL(),
];