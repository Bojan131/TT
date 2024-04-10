const { test, expect } = require('@playwright/test')
class LoginPage {
  constructor(page) {
    this.page = page
    this.username = page.locator("[name='userName']")
    this.password = page.locator("[name='password']")
    this.login = page.locator('#loginUser')
    this.footerText = page.locator('.footer-content span')
  }

  async goTo() {
    await this.page.goto('https://webstation.baha.com/etfs/usa')
  }

  async loginWS(username, password) {
    await this.username.fill(username)
    await this.password.fill(password)
    await this.login.click()
  }

  async incorectLoginGerman() {
    await expect(this.page.locator('.message span').first()).toHaveText('Benutzername oder Passwort ist falsch')
    await expect(this.page.locator('.message span').last()).toHaveText('Bitte versuchen Sie es nochmals.')
  }

  async disabledAccountMessage() {
    await expect(this.page.locator('.message span').first()).toHaveText('This user account is disabled. Please contact the support team for further actions.')
  }

  async incorectLogin() {
    await expect(this.page.locator('.message span').first()).toHaveText('The username or password is incorrect')
    await expect(this.page.locator('.message span').last()).toHaveText('Please try again.')
  }

  async successfullLogin() {
    await this.page.waitForSelector('.table-widget', { state: 'visible' })
    await expect(this.page).toHaveTitle(/baha wealth/)
    await expect(this.footerText).toHaveText('© 2024 baha GmbH. All rights reserved.')
  }

  async chooseLanguage(language) {
    await this.page.locator('.cb_options').click()
    const count = await this.page.locator('.ellipsis-option').count()
    for (let i = 0; i < count; ++i) {
      const text = await this.page.locator('.ellipsis-option').nth(i).textContent()
      if (text === language) {
        await this.page.locator('.ellipsis-option').nth(i).click()
        break
      }
    }
    await this.page.waitForTimeout(1000)
  }

  async resetPassword(browser, email) {
    const context = await browser.newContext()
    const page = await context.newPage()
    await page.goto('https://webstation.baha.com/etfs/usa')
    const click = page.locator('.password_link')

    const [newPage] = await Promise.all([context.waitForEvent('page'), click.click()])

    await newPage.locator("[name='UserName']").fill(email)
    await newPage.locator("[type='submit']").click()
    await expect(newPage.locator('#PasswordSentSucessfully b').first()).toHaveText('E-Mail to reset your password has been sent')
  }
}

module.exports = { LoginPage }
