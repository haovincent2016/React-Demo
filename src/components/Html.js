import React, { PropTypes } from 'react'

export default ({ title, content, state }) => (
  <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
      <title>{ title }</title>
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      <link href="/static/css/index.css" rel="stylesheet" />
    </head>
    <body>
      <div id="app" dangerouslySetInnerHTML={{ __html: content }} />
      <script
        dangerouslySetInnerHTML={{ __html: `window.__INITIAL_STATE__=${JSON.stringify(state)}` }}
        charSet="UTF-8"
      />
      <script src="/static/bundle.js" charSet="UTF-8" />
    </body>
  </html>
)
