# AI Coding Guidelines for Capstone Automation Project

## Project Overview
This is a WebDriverIO-based end-to-end test suite for the Casework legal case management application (https://app.thecasework.com). The project uses the Page Object Model pattern to test case creation workflows.

## Architecture & Patterns

### Page Object Model
- **Singleton Pattern**: All page objects export singleton instances (e.g., `export default new LoginPage()`)
- **Base Page Class**: Located in `test/pageobjects/page.js`, provides `open(path)` method that navigates to `https://app.thecasework.com/${path}`
- **Element Getters**: Use getter methods for element selectors, combining CSS selectors (`[data-testid="..."]`, `input[name="..."]`) and XPath (`//button[normalize-space()="..."]`)
- **Method Naming**: Follow camelCase for actions (e.g., `enterCaseName`, `selectRetainedBy`)

### Test Structure
- **Spec Files**: Located in `test/specs/**/*.js`, use Mocha BDD syntax with `describe`/`it` blocks
- **Setup**: `before` hook handles login and navigation to test pages
- **Test Flow**: Sequential numbered tests (01, 02, etc.) for case creation steps

## Key Conventions

### Element Selection Strategy
- **Primary**: `data-testid` attributes for reliable targeting (e.g., `[data-testid="login-submit"]`)
- **Fallback**: `name` attributes for form inputs (e.g., `input[name="username"]`)
- **XPath**: Used for dynamic content or text-based selection (e.g., `//div[@role="option"][1]`)
- **Multiple Selectors**: When elements vary, try multiple selectors in order (see `selectRetainedBy` example)

### Timing & Synchronization
- **Explicit Waits**: Use `waitForDisplayed({ timeout: 15000 })` or `waitForClickable({ timeout: 15000 })` for element readiness
- **Strategic Pauses**: 1-3 second `browser.pause()` after clicks or page loads to handle UI transitions
- **Timeouts**: Mocha test timeout set to 60s, connection retry 120s

### Authentication
- **Environment Variables**: Use `process.env.TEST_EMAIL` and `process.env.TEST_PASSWORD` for credentials
- **Dotenv**: Load via `import dotenv from 'dotenv'; dotenv.config()` in config

## Development Workflow

### Running Tests
```bash
npm run wdio  # Runs all specs with Chrome browser
```

### Adding New Tests
1. Create page object in `test/pageobjects/` extending base `Page` class
2. Export singleton instance
3. Add spec file in `test/specs/` with numbered test steps
4. Use existing patterns: wait for elements, pause after interactions, handle dynamic selectors

### Debugging
- **Logging**: Set `logLevel: 'info'` in `wdio.conf.js`
- **Browser Interaction**: Use `browser.pause()` liberally for manual inspection
- **Selector Testing**: Test selectors in browser dev tools before implementing

## Dependencies & Configuration
- **WebDriverIO v9**: Local runner with Mocha framework and spec reporter
- **Chrome Only**: Single capability configuration
- **ES Modules**: `"type": "module"` in package.json enables import/export syntax

## Common Patterns
- **Form Filling**: `await element.setValue(value)` after waiting for display
- **Dropdown Selection**: Click input, wait for options, click first available option
- **Toggle Switches**: Use `browser.execute(el => el.click(), toggleElement)` for custom elements
- **Error Handling**: Try multiple selectors when UI varies (see `selectRetainedBy`)</content>
<parameter name="filePath">/Users/qastudentafternoon/Desktop/automation/capstone/.github/copilot-instructions.md