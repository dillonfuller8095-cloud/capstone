import LoginPage from '../pageobjects/login.page.js'
import NewCasePage from '../pageobjects/newCase.page.js'

describe('Fill New Case Form', () => {

  before(async () => {
    await LoginPage.open()
    await LoginPage.login(
      process.env.TEST_EMAIL,
      process.env.TEST_PASSWORD
    )
    await browser.pause(3000)
  })

  beforeEach(async () => {
    await NewCasePage.open()
    await browser.pause(2000)
  })

  // --- VALID TESTS ---

  it('Valid - fills all required fields', async () => {
    await NewCasePage.enterCaseName('Capstone Test Case')
    await NewCasePage.enterRetainedDate()
    await NewCasePage.selectRetainedBy()
    await NewCasePage.enterBilling('500.00')
    await NewCasePage.enterDescription('Test description')
    await NewCasePage.enterOverview('This is a valid overview for the case.')
  })

  it('Valid - case name with numbers and letters', async () => {
    await NewCasePage.enterCaseName('Case 2026 ABC')
    await NewCasePage.enterRetainedDate()
    await NewCasePage.selectRetainedBy()
    await NewCasePage.enterBilling('100.00')
    await NewCasePage.enterDescription('Test description')
    await NewCasePage.enterOverview('Valid overview with numbers 12345.')
  })

  it('Valid - billing with zero amount', async () => {
    await NewCasePage.enterCaseName('Zero Billing Case')
    await NewCasePage.enterRetainedDate()
    await NewCasePage.selectRetainedBy()
    await NewCasePage.enterBilling('0.00')
    await NewCasePage.enterDescription('Test description')
    await NewCasePage.enterOverview('Case with zero billing amount.')
  })

  it('Valid - long overview text', async () => {
    await NewCasePage.enterCaseName('Long Overview Case')
    await NewCasePage.enterRetainedDate()
    await NewCasePage.selectRetainedBy()
    await NewCasePage.enterBilling('250.00')
    await NewCasePage.enterDescription('Test description')
    await NewCasePage.enterOverview('This is a much longer overview that contains detailed information about the case including background circumstances and relevant notes.')
  })

  it('Valid - minimum billing amount', async () => {
    await NewCasePage.enterCaseName('Min Billing Case')
    await NewCasePage.enterRetainedDate()
    await NewCasePage.selectRetainedBy()
    await NewCasePage.enterBilling('0.01')
    await NewCasePage.enterDescription('Test description')
    await NewCasePage.enterOverview('Case with minimum billing.')
  })

  it('Combined - stepwise full form fill then apply template last', async () => {
    await NewCasePage.enterCaseName('Combined Stepwise Case')
    await browser.pause(1000)
    await NewCasePage.enterRetainedDate()
    await browser.pause(1000)
    await NewCasePage.selectRetainedBy()
    await browser.pause(1000)
    await NewCasePage.enterBilling('500.00')
    await browser.pause(1000)
    await NewCasePage.enterDescription('Combined stepwise description')
    await browser.pause(1000)
    await NewCasePage.enterOverview('Combined stepwise overview after filling each field.')
    await browser.pause(1000)
    await NewCasePage.applyTemplate()
    await browser.pause(2000)
  })

  // --- INVALID TESTS ---

  it('Invalid - empty case name', async () => {
    await NewCasePage.enterCaseName('')
    await NewCasePage.enterRetainedDate()
    await NewCasePage.selectRetainedBy()
    await NewCasePage.enterBilling('500.00')
    await NewCasePage.enterDescription('Test description')
    await NewCasePage.enterOverview('Overview with no case name.')
  })

  it('Invalid - special characters in case name', async () => {
    await NewCasePage.enterCaseName('!@#$%^&*()')
    await NewCasePage.enterRetainedDate()
    await NewCasePage.selectRetainedBy()
    await NewCasePage.enterBilling('500.00')
    await NewCasePage.enterDescription('Test description')
    await NewCasePage.enterOverview('Overview with special character case name.')
  })

  it('Invalid - negative billing amount', async () => {
    await NewCasePage.enterCaseName('Negative Billing Case')
    await NewCasePage.enterRetainedDate()
    await NewCasePage.selectRetainedBy()
    await NewCasePage.enterBilling('-500.00')
    await NewCasePage.enterDescription('Test description')
    await NewCasePage.enterOverview('Overview with negative billing.')
  })

  it('Invalid - letters in billing amount', async () => {
    await NewCasePage.enterCaseName('Bad Billing Case')
    await NewCasePage.enterRetainedDate()
    await NewCasePage.selectRetainedBy()
    await NewCasePage.enterBilling('abc')
    await NewCasePage.enterDescription('Test description')
    await NewCasePage.enterOverview('Overview with letters in billing.')
  })

  it('Invalid - empty overview', async () => {
    await NewCasePage.enterCaseName('No Overview Case')
    await NewCasePage.enterRetainedDate()
    await NewCasePage.selectRetainedBy()
    await NewCasePage.enterBilling('500.00')
    await NewCasePage.enterDescription('Test description')
    await NewCasePage.enterOverview('')
  })

  it('Invalid - very long case name', async () => {
    await NewCasePage.enterCaseName('A'.repeat(300))
    await NewCasePage.enterRetainedDate()
    await NewCasePage.selectRetainedBy()
    await NewCasePage.enterBilling('500.00')
    await NewCasePage.enterDescription('Test description')
    await NewCasePage.enterOverview('Overview with very long case name.')
  })

  it('Invalid - empty description', async () => {
    await NewCasePage.enterCaseName('No Description Case')
    await NewCasePage.enterRetainedDate()
    await NewCasePage.selectRetainedBy()
    await NewCasePage.enterBilling('500.00')
    await NewCasePage.enterDescription('')
    await NewCasePage.enterOverview('Overview without description.')
  })

  it('Valid - case name with hyphens and spaces', async () => {
    await NewCasePage.enterCaseName('Smith vs. Jones - Case 2026')
    await NewCasePage.enterRetainedDate()
    await NewCasePage.selectRetainedBy()
    await NewCasePage.enterBilling('750.00')
    await NewCasePage.enterDescription('Litigation case')
    await NewCasePage.enterOverview('Valid case with proper naming conventions.')
  })

  it('Invalid - very large billing amount', async () => {
    await NewCasePage.enterCaseName('Large Billing Case')
    await NewCasePage.enterRetainedDate()
    await NewCasePage.selectRetainedBy()
    await NewCasePage.enterBilling('999999999.99')
    await NewCasePage.enterDescription('Test description')
    await NewCasePage.enterOverview('Case with very large billing amount.')
  })

})