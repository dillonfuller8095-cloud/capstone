import LoginPage from '../pageobjects/login.page.js'
import NewCasePage from '../pageobjects/newCase.page.js'
import { expect } from '@wdio/globals'

describe('New Case Form Validation Suite', () => {

  before(async () => {

    await LoginPage.open()

    await LoginPage.login(
      process.env.TEST_EMAIL,
      process.env.TEST_PASSWORD
    )

  })

  beforeEach(async () => {

    await NewCasePage.navigateToNewCase()

  })

  it('Valid - enter standard case name', async () => {

    await NewCasePage.enterCaseName(
      'Capstone Test Case'
    )

    await expect(
      NewCasePage.caseNameInput
    ).toBeDisplayed()

  })

  it('Valid - enter case name with numbers', async () => {

    await NewCasePage.enterCaseName(
      'Case 2026 ABC'
    )

    await expect(
      NewCasePage.caseNameInput
    ).toBeDisplayed()

  })

  it('Valid - enter long case name', async () => {

    await NewCasePage.enterCaseName(
      'Very Long Case Name Validation Workflow'
    )

    await expect(
      NewCasePage.caseNameInput
    ).toBeDisplayed()

  })

  it('Valid - select retained date', async () => {

    await NewCasePage.enterRetainedDate()

  })

  it('Valid - select retained by option', async () => {

    await NewCasePage.selectRetainedBy()

  })

  it('Valid - apply template', async () => {

    await NewCasePage.applyTemplate()

  })

  it('Valid - enter short description', async () => {

    await NewCasePage.enterDescription(
      'Short description'
    )

    await expect(
      NewCasePage.descriptionTextarea
    ).toBeDisplayed()

  })

  it('Valid - enter longer description', async () => {

    await NewCasePage.enterDescription(
      'This is a much longer description used for validation testing.'
    )

    await expect(
      NewCasePage.descriptionTextarea
    ).toBeDisplayed()

  })

  it('Valid - enter overview text', async () => {

    await NewCasePage.enterOverview(
      'Overview validation text.'
    )

    await expect(
      NewCasePage.overviewTextarea
    ).toBeDisplayed()

  })

  it('Valid - enter detailed overview', async () => {

    await NewCasePage.enterOverview(
      'This overview contains additional workflow details and validation information.'
    )

    await expect(
      NewCasePage.overviewTextarea
    ).toBeDisplayed()

  })

  it('Valid - complete full case workflow', async () => {

    await NewCasePage.enterCaseName(
      'Full Workflow Test'
    )

    await NewCasePage.enterRetainedDate()

    await NewCasePage.selectRetainedBy()

    await NewCasePage.applyTemplate()

    await NewCasePage.enterDescription(
      'Workflow description'
    )

    await NewCasePage.enterOverview(
      'Workflow overview'
    )

    await expect(
      NewCasePage.overviewTextarea
    ).toBeDisplayed()

  })

  it('Valid - complete second full workflow', async () => {

    await NewCasePage.enterCaseName(
      'Second Workflow Test'
    )

    await NewCasePage.enterRetainedDate()

    await NewCasePage.selectRetainedBy()

    await NewCasePage.applyTemplate()

    await NewCasePage.enterDescription(
      'Second workflow description'
    )

    await NewCasePage.enterOverview(
      'Second workflow overview'
    )

    await expect(
      NewCasePage.overviewTextarea
    ).toBeDisplayed()

  })

})