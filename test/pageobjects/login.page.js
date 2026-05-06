import { $, browser } from '@wdio/globals'
import Page from './page.js'

class LoginPage extends Page {

  get inputUsername() { return $('input[name="username"]') }
  get inputPassword() { return $('input[name="password"]') }
  get btnSubmit() { return $('[data-testid="login-submit"]') }

  async login(email, password) {
    await browser.pause(3000)
    await this.inputUsername.waitForDisplayed({ timeout: 30000 })
    await this.inputUsername.setValue(email)
    await this.inputPassword.setValue(password)
    await this.btnSubmit.click()
  }

  open() { return super.open('') }
}

export default new LoginPage()