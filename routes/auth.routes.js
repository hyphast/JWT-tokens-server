// const {Router} = require('express')
// const {check, validationResult } = require('express-validator')
// const config = require('../config/default.json')
// const jwt = require('jsonwebtoken')
// const bcrypt = require('bcryptjs')
// const User = require('../models/User')
// const router = Router()
//
// router.post('/register',
//   [
//     check('firstName', 'Invalid first name').exists().trim(),
//     check('secondName', 'Invalid second name').exists().trim(),
//     check('email', 'Invalid email').isEmail(),
//     check('password', 'Password length less than 6 characters').isLength({ min: 6 }),
//   ],
//   async (req, res) => {
//   try {
//     const errors = validationResult(req)
//
//     if (!errors.isEmpty()) {
//       return res.status(400).json({
//         errors: errors.array(),
//         message: 'Incorrect registration data',
//       })
//     }
//
//     const {firstName, secondName, email, password} = req.body
//
//     const candidate = await User.findOne( {email} )
//
//     if (candidate) {
//       return res.status(400).json({ message: 'User with this Email address already exists' })
//     }
//
//     const hashedPassword = bcrypt.hash(password, 12)
//     const user = new User({ firstName, secondName, email, password: hashedPassword })
//
//     user.save()
//
//     res.status(201).json({message: 'User created'})
//
//   } catch (e) {
//     res.status(500).json({ message: "Server error" })
//   }
// })
//
// router.post('/login',
//   [
//     check('email', 'Incorrect email address').normalizeEmail({ gmail_remove_dots: false }).isEmail(),
//     check('email', 'Incorrect password').exists(),
//   ],
//   async (req, res) => {
//   try {
//     const errors = validationResult(req)
//
//     if (!errors.isEmpty()) {
//       return res.status(400).json({
//         errors: errors.array(),
//         message: 'Incorrect login data',
//       })
//     }
//
//     const {email, password} = req.body
//
//     const user = User.findOne({ email })
//
//     if (!user) {
//       return res.status(400).json({ message: 'User is not found' })
//     }
//
//     const isMatch = await bcrypt.compare(password, user.password)
//
//     if (!isMatch) {
//       return res.status(400).json({ message: 'Incorrect email or password' })
//     }
//
//     const token = jwt(
//     {
//       userId: user.id,
//       email: user.email,
//       firstName: user.firstName,
//       secondName: user.secondName,
//     },
//       config.get('jwtSecret'),
//       { expiresIn: '1h' },
//     )
//
//     res.json({ token,
//       userId: user.id,
//       email: user.email,
//       firstName: user.firstName,
//       secondName: user.secondName,
//     })
//
//   } catch (e) {
//     res.status(500).json({ message: "Server error" })
//   }
// })
//
// module.exports = router