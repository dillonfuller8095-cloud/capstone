import { $, browser } from '@wdio/globals'
import BaseCase from './page.js'

class NewCasePage extends BaseCase {

  retainedBySelectors = [
    '//div[@role="menuitemradio"][1]',
    '//div[@role="menuitem"][1]',
    '//div[@role="option"][1]',
  ]

  templateSelectors = [
    '//div[@role="menuitem"][1]',
    '//div[@role="menuitemradio"][1]',
    '//div[@role="option"][1]',
  ]

  get caseNameInput() {
    return $('input[name="caseName"]')
  }

  get retainedDateInput() {
    return $('[data-testid="case-retained-date-picker"]')
  }

  get day30() {
    return $('//button[normalize-space()="30"]')
  }

  get retainedByButton() {
    return $('[data-testid="client-party-dropdown"]')
  }

  get applyTemplateButton() {
    return $('button[data-testid="add-case-apply-template"]')
  }

  get descriptionTextarea() {
    return $('textarea[name="shortDescription.fieldValue"]')
  }

  get overviewTextarea() {
    return $('textarea[data-testid="case-info-card-overview-input"]')
  }

  async enterCaseName(name) {

    await this.caseNameInput.waitForDisplayed({
      timeout: 15000
    })

    await this.caseNameInput.setValue(name)

  }

  async enterRetainedDate() {

    await this.retainedDateInput.waitForDisplayed({
      timeout: 15000
    })

    await this.retainedDateInput.click()

    await this.day30.waitForClickable({
      timeout: 10000
    })

    await this.day30.click()

  }

  async selectRetainedBy() {

    await this.retainedByButton.waitForClickable({
      timeout: 15000
    })

    await this.retainedByButton.click()

    for (const selector of this.retainedBySelectors) {

      try {

        const option = await $(selector)

        await option.waitForDisplayed({
          timeout: 5000
        })

        await option.click()

        return

      } catch (error) {}

    }

    throw new Error(
      'Unable to locate retained by option'
    )

  }

  async applyTemplate() {

    await this.applyTemplateButton.waitForClickable({
      timeout: 15000
    })

    await this.applyTemplateButton.click()

    for (const selector of this.templateSelectors) {

      try {

        const option = await $(selector)

        await option.waitForDisplayed({
          timeout: 5000
        })

        await option.click()

        return

      } catch (error) {}

    }

    throw new Error(
      'Unable to locate template option'
    )

  }

  async enterDescription(text) {

    await this.descriptionTextarea.waitForDisplayed({
      timeout: 15000
    })

    await this.descriptionTextarea.setValue(text)

  }

  async enterOverview(text) {

    await this.overviewTextarea.waitForDisplayed({
      timeout: 15000
    })

    await this.overviewTextarea.setValue(text)

  }

  navigateToNewCase() {

    return super.open('case/new')

  }

}

export default new NewCasePage()