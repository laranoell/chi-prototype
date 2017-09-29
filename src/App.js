import React, { Component } from 'react'
import Registration from './Registration'
import { Grid, GridItem } from './Grid'
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card'
import { Button } from 'react-toolbox/lib/button'
import { createClient } from 'contentful'
import chalk from 'chalk'
import Table from 'cli-table2'
import style from './App.css'

const SPACE_ID = 'a08kq9f4a3yo'
const ACCESS_TOKEN = '6f357929b2f09ea4a1220338990de10854c1993706646490ff5488d1a09acfcf'

const client = createClient({
  space: SPACE_ID,
  accessToken: ACCESS_TOKEN
})

function runBoilerplate () {
  displayContentTypes()
    .then(displayEntries)
    .then(() => {
      console.log('Want to go further? Feel free to check out this guide:')
      console.log(chalk.cyan('https://www.contentful.com/developers/docs/javascript/tutorials/using-js-cda-sdk/\n'))
    })
    .catch((error) => {
      console.log(chalk.red('\nError occurred:'))
      if (error.stack) {
        console.error(error.stack)
        return
      }
      console.error(error)
    })
}

function displayContentTypes () {
  console.log(chalk.green('Fetching and displaying Content Types ...'))

  return fetchContentTypes()
    .then((contentTypes) => {
      // Display a table with Content Type information
      const table = new Table({
        head: ['Id', 'Title', 'Fields']
      })
      contentTypes.forEach((contentType) => {
        console.log(contentType.name, contentType.sys.id)
        const fieldNames = contentType.fields
          .map((field) => field.name)
          .sort()
        table.push([contentType.sys.id, contentType.name, fieldNames.join(', ')])
      })
      console.log(table.toString())

      return contentTypes
    })
}

function displayEntries (contentTypes) {
  return Promise.all(contentTypes.map((contentType) => {
    return fetchEntriesForContentType(contentType)
      .then((entries) => {
        console.log(`\These are the first 100 Entries for Content Type ${chalk.cyan(contentType.name)}:\n`)
        console.log(entries)
      })
  }))
}

// Load all Content Types in your space from Contentful
function fetchContentTypes () {
  return client.getContentTypes()
    .then((response) => response.items)
    .catch((error) => {
      console.log(chalk.red('\nError occurred while fetching Content Types:'))
      console.error(error)
    })
}

// Load all entries for a given Content Type from Contentful
function fetchEntriesForContentType (contentType) {
  return client.getEntries({
    content_type: contentType.sys.id
  })
    .then((response) => response.items)
    .catch((error) => {
      console.log(chalk.red(`\nError occurred while fetching Entries for ${chalk.cyan(contentType)}:`))
      console.error(error)
    })
}

// Start the boilerplate code
runBoilerplate()

class App extends Component {
  constructor () {
    super()
    this.state = {
      articles: []
    }
  }

  componentDidMount () {
    client.getEntries({
      content_type: 'article'
    })
      .then((response) => {
        this.setState({
          articles: response.items
        })
      })
      .catch((error) => {
        console.error(error)
      })
  }

  render () {
    const { articles } = this.state
    return (
      <div className={style.App}>
        <Grid>
          {articles.map(article => {
            return (
              <GridItem key={article.fields.title} col='1/3'>
                <Card style={{width: '100%'}}>
                  <CardTitle avatar='https://placeimg.com/80/80/animals' title='Author' subtitle='Sept 28, 2017' />
                  <CardMedia aspectRatio='wide' image={article.fields.primaryImage.fields.file.url} />
                  <CardTitle title={article.fields.title} subtitle='Subtitle here' />
                  <CardText>
                    {article.fields.body.substring(0, 200)}
                  </CardText>
                  <CardActions >
                    <Button label='Read More' />
                  </CardActions>
                </Card>
              </GridItem>
            )
          })}
          <GridItem col='1/3'>
            <Registration />
          </GridItem>
        </Grid>
      </div>
    )
  }
}

export default App
