import {body} from 'express-validator'

export const registerValidation = [
  body('email','не валідний емейл').isEmail(),
  body('password', 'пароль менше 5 символів').isLength({min:5}),
  body('fullName', 'введіть імя').isLength({min:3}),
  body('avatarUrl').optional().isURL(),
];

export const loginValidation = [
  body('email','не валідний емейл').isEmail(),
  body('password', 'пароль менше 5 символів').isLength({min:5}),

];


export const postCreateValidation = [
  body('title','Введіть заголовок статті').isLength({min:3}),
  body('text', 'Введіть текст статті').isLength({min:10}).isString(),
  body('tags', 'Невірний формат тегів').optional().isString(),
  body('imageUrl', 'Невірна ссилка на зображення').optional().isString(),
];