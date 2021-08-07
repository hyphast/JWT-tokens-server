const nodemailer = require('nodemailer');
const config = require('config')

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: config.get('smtpHost'),
      port: config.get('smtpPort'),
      secure: false,
      auth: {
        user: config.get('smtpUser'),
        pass: config.get('smtpPassword')
      }
    })
  }

  async sendActivationMail(to, link) {
    await this.transporter.sendMail({
      from: config.get('smtpUser'),
      to,
      subject: 'Активация аккаунта на ' + config.get('apiUrl'),
      text: '',
      html:
      `
        <div>
            <h1>Для активации аккаунта перейдите по ссылке</h1>
            <a href="${link}">${link}</a>
        </div>
      `
    });
  }
}

module.exports = new MailService();