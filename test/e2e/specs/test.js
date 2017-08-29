// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'default e2e tests': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer)
      .waitForElementVisible('#lottery', 5000)
      .assert.elementPresent('.rule .title')
      .assert.containsText('legend', '规则说明')
      .assert.elementCount('.logo.full-width-image', 1)
      .end()
  }
}
