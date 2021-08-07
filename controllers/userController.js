const config = require('config');
const {validationResult} = require('express-validator');
const userService = require('../services/userService');
const ApiError = require('../exceptions/apiError');

class UserController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Ошибка при валидации', errors.array()));
      }

    const {firstName, lastName, email, password} = req.body;
    const userData = await userService.registration(firstName, lastName, email, password);

    res.cookie('refreshToken', userData.refreshToken, {maxAge: 2592000000, httpOnly: true}); // maxAge: 30 days

    return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async login(req, res, next) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Ошибка при валидации', errors.array()));
      }

      const {email, password} = req.body;
      const userData = await userService.login(email, password);

      res.cookie('refreshToken', userData.refreshToken, {maxAge: 2592000000, httpOnly: true}); // maxAge: 30 days

      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async logout(req, res, next) {
    try {
      const {refreshToken} = req.cookies;
      const token = await userService.logout(refreshToken);

      res.clearCookie('refreshToken');
      return res.json(token);
    } catch (e) {
      next(e);
    }
  }

  async activate(req, res, next) {
    try {
      const activationLink = req.params.link;
      await userService.activate(activationLink);
      return res.redirect(config.get('clientUrl'));
    } catch (e) {
      next(e);
    }
  }

  async refresh(req, res, next) {
    try {
      const {refreshToken} = req.cookies;
      const userData = await userService.refresh(refreshToken);

      res.cookie('refreshToken', userData.refreshToken, {maxAge: 2592000000, httpOnly: true}); // maxAge: 30 days

      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new UserController();