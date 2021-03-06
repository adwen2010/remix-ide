var yo = require('yo-yo')
var async = require('async')
var tooltip = require('../ui/tooltip')
var css = require('./styles/test-tab-styles')
var remixTests = require('remix-tests')
import { ApiFactory } from 'remix-plugin'

const TestTabLogic = require('./testTab/testTab')

module.exports = class TestTab extends ApiFactory {
  constructor (fileManager, filePanel, compileTab) {
    super()
    this.compileTab = compileTab
    this._view = { el: null }
    this.compileTab = compileTab
    this.fileManager = fileManager
    this.filePanel = filePanel
    this.testTabLogic = new TestTabLogic(fileManager)
    this.data = {}
    this.testList = yo`<div class=${css.testList}></div>`
  }

  get profile () {
    return {
      name: 'solidityUnitTesting',
      displayName: 'solidity unit testing',
      methods: [],
      events: [],
      icon: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyB3aWR0aD0iMjMwNCIgaGVpZ2h0PSIxNzkyIiB2aWV3Qm94PSIwIDAgMjMwNCAxNzkyIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0xNzI4IDQ0OGwtMzg0IDcwNGg3Njh6bS0xMjgwIDBsLTM4NCA3MDRoNzY4em04MjEtMTkycS0xNCA0MC00NS41IDcxLjV0LTcxLjUgNDUuNXYxMjkxaDYwOHExNCAwIDIzIDl0OSAyM3Y2NHEwIDE0LTkgMjN0LTIzIDloLTEzNDRxLTE0IDAtMjMtOXQtOS0yM3YtNjRxMC0xNCA5LTIzdDIzLTloNjA4di0xMjkxcS00MC0xNC03MS41LTQ1LjV0LTQ1LjUtNzEuNWgtNDkxcS0xNCAwLTIzLTl0LTktMjN2LTY0cTAtMTQgOS0yM3QyMy05aDQ5MXEyMS01NyA3MC05Mi41dDExMS0zNS41IDExMSAzNS41IDcwIDkyLjVoNDkxcTE0IDAgMjMgOXQ5IDIzdjY0cTAgMTQtOSAyM3QtMjMgOWgtNDkxem0tMTgxIDE2cTMzIDAgNTYuNS0yMy41dDIzLjUtNTYuNS0yMy41LTU2LjUtNTYuNS0yMy41LTU2LjUgMjMuNS0yMy41IDU2LjUgMjMuNSA1Ni41IDU2LjUgMjMuNXptMTA4OCA4ODBxMCA3My00Ni41IDEzMXQtMTE3LjUgOTEtMTQ0LjUgNDkuNS0xMzkuNSAxNi41LTEzOS41LTE2LjUtMTQ0LjUtNDkuNS0xMTcuNS05MS00Ni41LTEzMXEwLTExIDM1LTgxdDkyLTE3NC41IDEwNy0xOTUuNSAxMDItMTg0IDU2LTEwMHExOC0zMyA1Ni0zM3Q1NiAzM3E0IDcgNTYgMTAwdDEwMiAxODQgMTA3IDE5NS41IDkyIDE3NC41IDM1IDgxem0tMTI4MCAwcTAgNzMtNDYuNSAxMzF0LTExNy41IDkxLTE0NC41IDQ5LjUtMTM5LjUgMTYuNS0xMzkuNS0xNi41LTE0NC41LTQ5LjUtMTE3LjUtOTEtNDYuNS0xMzFxMC0xMSAzNS04MXQ5Mi0xNzQuNSAxMDctMTk1LjUgMTAyLTE4NCA1Ni0xMDBxMTgtMzMgNTYtMzN0NTYgMzNxNCA3IDU2IDEwMHQxMDIgMTg0IDEwNyAxOTUuNSA5MiAxNzQuNSAzNSA4MXoiLz48L3N2Zz4=',
      description: ' - '
    }
  }

  activate () {
    this.listenToEvents()
  }

  deactivate () {
  }

  listenToEvents () {
    this.filePanel.event.register('newTestFileCreated', file => {
      var testList = this.view.querySelector("[class^='testList']")
      var test = yo`<label class="singleTestLabel"><input class="singleTest" onchange=${(e) => this.toggleCheckbox(e.target.checked, file)} type="checkbox" checked="true">${file}</label>`
      testList.appendChild(test)
      this.data.allTests.push(file)
      this.data.selectedTests.push(file)
    })

    this.fileManager.events.on('currentFileChanged', (file, provider) => {
      this.testTabLogic.getTests((error, tests) => {
        if (error) return tooltip(error)
        this.data.allTests = tests
        this.data.selectedTests = [...this.data.allTests]

        const testsMessage = (tests.length ? this.listTests() : 'No test file available')
        yo.update(this.testList, yo`<div class=${css.testList}>${testsMessage}</div>`)

        if (!this.testsOutput || !this.testsSummary) return

        this.testsOutput.hidden = true
        this.testsSummary.hidden = true
        this.testsOutput.innerHTML = ''
        this.testsSummary.innerHTML = ''
      })
    })
  }

  listTests () {
    return this.data.allTests.map(test => yo`<label class="singleTestLabel"><input class="singleTest" onchange =${(e) => this.toggleCheckbox(e.target.checked, test)} type="checkbox" checked="true">${test} </label>`)
  }

  toggleCheckbox (eChecked, test) {
    if (!this.data.selectedTests) {
      this.data.selectedTests = this._view.el.querySelectorAll('.singleTest:checked')
    }
    let selectedTests = this.data.selectedTests
    selectedTests = eChecked ? [...selectedTests, test] : selectedTests.filter(el => el !== test)
    this.data.selectedTests = selectedTests
    let checkAll = this._view.el.querySelector('[id="checkAllTests"]')
    if (eChecked) {
      checkAll.checked = true
    } else if (!selectedTests.length) {
      checkAll.checked = false
    }
  }

  checkAll (event) {
    let checkBoxes = this._view.el.querySelectorAll('.singleTest')
    const checkboxesLabels = this._view.el.querySelectorAll('.singleTestLabel')
    // checks/unchecks all
    for (let i = 0; i < checkBoxes.length; i++) {
      checkBoxes[i].checked = event.target.checked
      this.toggleCheckbox(event.target.checked, checkboxesLabels[i].innerText)
    }
  }

  testCallback (result) {
    this.testsOutput.hidden = false
    if (result.type === 'contract') {
      this.testsOutput.appendChild(yo`<div class=${css.outputTitle}>${result.filename} (${result.value})</div>`)
    } else if (result.type === 'testPass') {
      this.testsOutput.appendChild(yo`<div class="${css.testPass} ${css.testLog} bg-success">✓ (${result.value})</div>`)
    } else if (result.type === 'testFailure') {
      this.testsOutput.appendChild(yo`<div class="${css.testFailure} ${css.testLog} bg-danger">✘ (${result.value})</div>`)
    }
  }

  resultsCallback (_err, result, cb) {
    // total stats for the test
    // result.passingNum
    // result.failureNum
    // result.timePassed
    cb()
  }

  updateFinalResult (_err, result, filename) {
    this.testsSummary.hidden = false
    if (_err) {
      this.testsSummary.appendChild(yo`<div class="${css.testFailureSummary} text-danger" >${_err.message}</div>`)
      return
    }
    this.testsSummary.appendChild(yo`<div class=${css.summaryTitle}> ${filename} </div>`)
    if (result.totalPassing > 0) {
      this.testsSummary.appendChild(yo`<div class="text-success" >${result.totalPassing} passing (${result.totalTime}s)</div>`)
      this.testsSummary.appendChild(yo`<br>`)
    }
    if (result.totalFailing > 0) {
      this.testsSummary.appendChild(yo`<div class="text-danger" >${result.totalFailing} failing</div>`)
      this.testsSummary.appendChild(yo`<br>`)
    }
    result.errors.forEach((error, index) => {
      this.testsSummary.appendChild(yo`<div class="text-danger" >${error.context} - ${error.value} </div>`)
      this.testsSummary.appendChild(yo`<div class="${css.testFailureSummary} text-danger" >${error.message}</div>`)
      this.testsSummary.appendChild(yo`<br>`)
    })
  }

  runTest (testFilePath, callback) {
    this.fileManager.fileProviderOf(testFilePath).get(testFilePath, (error, content) => {
      if (error) return
      var runningTest = {}
      runningTest[testFilePath] = { content }
      remixTests.runTestSources(runningTest, (result) => { this.testCallback(result) }, (_err, result, cb) => { this.resultsCallback(_err, result, cb) }, (error, result) => {
        this.updateFinalResult(error, result, testFilePath)
        callback(error)
      }, (url, cb) => {
        return this.compileTab.compileTabLogic.importFileCb(url, cb)
      })
    })
  }

  runTests () {
    this.testsOutput.innerHTML = ''
    this.testsSummary.innerHTML = ''
    var tests = this.data.selectedTests
    async.eachOfSeries(tests, (value, key, callback) => { this.runTest(value, callback) })
  }

  render () {
    this.testsOutput = yo`<div class="${css.container} border border-primary border-right-0 border-left-0 border-bottom-0"  hidden='true' id="tests"></div>`
    this.testsSummary = yo`<div class="${css.container} border border-primary border-right-0 border-left-0 border-bottom-0" hidden='true' id="tests"></div>`

    var el = yo`
      <div class="${css.testTabView} card" id="testView">
        <div class="${css.infoBox}">
          Test your smart contract by creating a foo_test.sol file (open ballot_test.sol to see the example).
          <br/>
          You will find more informations in the <a href="https://remix.readthedocs.io/en/latest/unittesting_tab.html">documentation</a>
          Then use the stand alone NPM module remix-tests to run unit tests in your Continuous Integration
          <a href="https://www.npmjs.com/package/remix-tests">https://www.npmjs.com/package/remix-tests</a>.
          <br/>
          For more details, see
          How to test smart contracts guide in our documentation.
          <div class="${css.generateTestFile} btn btn-primary m-1" onclick="${this.testTabLogic.generateTestFile(this)}">Generate test file</div>
        </div>
        <div class="${css.tests}">
          ${this.testList}
          <div class="${css.buttons} btn-group">
            <div class="${css.runButton} btn btn-primary m-1"  onclick="${this.runTests.bind(this)}">Run Tests</div>
            <label class="${css.label}" for="checkAllTests">
              <input id="checkAllTests"
                type="checkbox"
                onclick="${(event) => { this.checkAll(event) }}"
                checked="true"
              >
              Check/Uncheck all
            </label>
          </div>
          ${this.testsOutput}
          ${this.testsSummary}
        </div>
      </div>
    `
    if (!this._view.el) this._view.el = el
    return el
  }

}
