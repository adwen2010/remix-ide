var csjs = require('csjs-inject')

var css = csjs`
  .instanceTitleContainer {
    display: flex;
    align-items: center;
  }
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 11px;
    height: 30px;
    width: 97%;
    overflow: hidden;
    word-break: break-word;
    line-height: initial;
    overflow: visible;
    margin-bottom: 10px;
  }
  .noInstancesText {

  }
  .titleLine {
    display: flex;
    align-items: baseline;
  }
  .titleText {
    margin-right: 1em;
    word-break: break-word;
    min-width: 230px;
  }

  .title .copy {
    color: var(--primary);
  }
  .instance {
    min-width: 310px;
    display: block;
    /* display: flex; */
    flex-direction: column;
    padding: 5px 0 0 10px;
    margin-bottom: 10px;
  }
  .instance .title:before {
    content: "\\25BE";
    margin-right: 5%;
    font-size: 1.2rem
  }
  .instance.hidesub .title:before {
    content: "\\25B8";
    margin-right: 5%;
    font-size: 1.2rem;
  }
  .instance.hidesub > * {
      display: none;
  }
  .instance.hidesub .title {
      display: flex;
  }
  .instance.hidesub .udappClose {
      display: flex;
  }
  .methCaret {
    margin-right: 5px;
    cursor: pointer;
    font-size: 16px;
    padding-top: 5px;
    vertical-align: top;
  }
  .group:after {
    content: "";
    display: table;
    clear: both;
  }
  .buttonsContainer {
    margin-top: 2%;
    display: flex;
    overflow: hidden;
  }
  .contractActions {
  }
  .instanceButton {
    border-radius: 3px;
  }
  .closeIcon {
    font-size: 12px;
    cursor: pointer;
    margin-left: 5px;
  }
  .udapp {}
  .udappClose {
    display: flex;
    justify-content: flex-end;
  }
  .contractProperty {
    overflow: auto;
    margin-bottom: 0.4em;
    width:100%;
  }
  .contractProperty.hasArgs input {
    min-width: 200px;
    padding: .36em;
    border-radius: 5px;
    width: 70%;
  }
  .contractProperty .contractActionsContainerSingle input{
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
  .contractProperty button {
    background-color: var(--warning);
    min-width: 100px;
    width: 100px;
    font-size: 10px;
    margin:0;
    word-break: inherit;
  }
  .contractProperty button:disabled {
    cursor: not-allowed;
    background-color: white;
    border-color: lightgray;
  }
  .contractProperty.constant button {
    background-color:var(--info);
    min-width: 100px;
    width: 100px;
    font-size: 10px;
    margin:0;
    word-break: inherit;
    outline: none;
  }
  .contractProperty input {
    width: 75%
  }
  .contractProperty > .value {
    box-sizing: border-box;
    float: left;
    align-self: center;
    margin-left: 4px;
  }
  .value ul {
    margin-bottom: 10px;
    padding-bottom: 5px;
    border-bottom: 1px solid var(--info);
  }
  .contractActionsContainer {
    width: 98%;
  }
  .contractActionsContainerSingle {
    display: flex;
    width: 100%;
  }
  .contractActionsContainerMulti {
    display:none;
    width: 100%;
  }
  .contractActionsContainerMultiInner {
    margin-bottom: 10px;
    padding: 0px 5px 5px 0px;
    background-color: var(--light);
    width: 99%;
    border-radius: 3px;
  }
  .multiHeader {
    text-align: left;
    font-size: 10px;
    margin-bottom: 5px;
    font-weight: bold;
  }
  .contractActionsContainerMultiInner .multiTitle {
    padding-left: 10px;
  }
  .contractProperty .multiTitle {
    display: inline-block;
    width: 90%;
    font-size: 12px;
    height: 25px;
    padding-left: 20px;
    font-weight: bold;
    line-height: 25px;
    cursor: default;
  }
  .contractProperty .contractActionsContainerMultiInner .multiArg label{
    text-align: center;
  }
  .multiHeader .methCaret {
    float: right;
    margin-right: 0;
  }
  .contractProperty.constant .multiTitle {
    display: inline-block;
    width: 90%;
    font-size: 10px;
    height: 25px;
    padding-left: 20px;
    font-weight: bold;
    line-height: 25px;
    cursor: default;
  }
  .multiArg {
    margin-bottom: 8px;
  }
  .multiArg input{
    padding: 5px;
  }

  .multiArg label {
      float: left;
      margin-right: 6px;
      font-size: 10px;
      width: 20%;
  }
  .multiArg button {
    border-radius: 3px;
    float: right;
    margin-right: 5%;
    font-size: 10px;
    border-width: 1px;
    width: inherit;
  }
  .multiHeader button {
    display: inline-block;
    width: 94%;
  }
  .hasArgs .multiArg input {
    border-left: 1px solid #dddddd;
  }
  .hasArgs input {
    display: block;
    border: 1px solid #dddddd;
    padding: .36em;
    border-left: none;
    padding: 8px 8px 8px 10px;
    font-size: 10px;
    height: 25px;
  }
  .hasArgs button {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border-right: 0;
    height: 25px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .hasArgs .contractActionsContainerMulti button {
    border-radius: 3px;
  }
  .contractActionsContainerMultiInner .multiArg i {
    padding-right: 26px;
    padding-top: 5px;
    float: right;
  },
  .hideWarningsContainer {
    display: flex;
    align-items: center;
    margin-left: 2%
  }
`

module.exports = css
