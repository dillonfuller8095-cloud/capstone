import { $, $$, browser } from '@wdio/globals'
import Page from './page.js'

class NewCasePage extends Page {

  get caseNameInput() { return $('input[name="caseName"]') }
  get retainedDateInput() { return $('input[name="retainedDate"]') }
  get day30() { return $('//button[normalize-space()="30"]') }
  get retainedByButton() { return $('[data-testid="client-party-dropdown"]') }
  get typeCombobox() { return $('input[data-testid="case-type-combobox"]') }
  get typeFirstOption() { return $('//div[@role="option"][1]') }
  get fixedFeeToggle() { return $('input[data-testid="case-info-card-fixed-fee-switch"]') }
  get fixedFeeAmountInput() { return $('input[data-testid="case-info-card-fixed-fee-input"]') }
  get descriptionTextarea() { return $('textarea[name="shortDescription.fieldValue"]') }
  get overviewTextarea() { return $('textarea[data-testid="case-info-card-overview-input"]') }
  get applyTemplateButton() { return $('button[data-testid="add-case-apply-template"]') }
  get createTemplateOption() { return $('//div[@role="menuitem"][1]') }

  async enterCaseName(name) {
    await this.caseNameInput.waitForDisplayed({ timeout: 15000 })
    await this.caseNameInput.setValue(name)
  }

  async enterRetainedDate() {
    await this.retainedDateInput.waitForDisplayed({ timeout: 15000 })
    await this.retainedDateInput.click()
    await browser.pause(1000)
    await this.day30.waitForClickable({ timeout: 10000 })
    await this.day30.click()
  }

  async selectRetainedBy() {
    await this.retainedByButton.waitForClickable({ timeout: 15000 })
    await this.retainedByButton.click()
    await browser.pause(1000)
    const selectors = [
      '//div[@role="menuitemradio"][1]',
      '//div[@role="menuitem"][1]',
      '//div[@role="option"][1]',
    ]
    for (const sel of selectors) {
      try {
        const el = await $(sel)
        if (await el.isDisplayed()) { await el.click(); return }
      } catch (e) {}
    }
    throw new Error('selectRetainedBy: no visible option found')
  }

  async applyTemplate() {
    await this.applyTemplateButton.waitForClickable({ timeout: 15000 })
    await this.applyTemplateButton.scrollIntoView()
    await this.applyTemplateButton.click()
    await browser.pause(1500)

    const templateSelectors = [
      '//div[@role="menuitem"][1]',
      '//div[@role="menuitemradio"][1]',
      '//div[@role="option"][1]',
      '//button[normalize-space()="Create template"]'
    ]

    for (const sel of templateSelectors) {
      try {
        const option = await $(sel)
        if (await option.isDisplayed() && await option.isClickable()) {
          await option.click()
          return
        }
      } catch (e) {
        // continue to next selector
      }
    }

    throw new Error('applyTemplate: no visible template option found')
  }

  async selectType() {
    await this.typeCombobox.waitForDisplayed({ timeout: 15000 })
    await this.typeCombobox.click()
    await this.typeFirstOption.waitForClickable({ timeout: 10000 })
    await this.typeFirstOption.click()
  }

  async enterBilling(amount) {
    const toggle = await this.fixedFeeToggle
    await toggle.waitForExist({ timeout: 15000 })
    await browser.execute(el => el.click(), toggle)
    await this.fixedFeeAmountInput.waitForDisplayed({ timeout: 15000 })
    await this.fixedFeeAmountInput.click()
    await this.fixedFeeAmountInput.clearValue()
    await this.fixedFeeAmountInput.setValue(amount)
  }

  async enterDescription(text) {
    await this.descriptionTextarea.waitForDisplayed({ timeout: 15000 })
    await this.descriptionTextarea.setValue(text)
  }

  async enterOverview(text) {
    await this.overviewTextarea.waitForDisplayed({ timeout: 15000 })
    await this.overviewTextarea.setValue(text)
  }

  open() { return super.open('case/new') }
}

export default new NewCasePage()