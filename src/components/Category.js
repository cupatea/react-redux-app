import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { withStyles } from 'material-ui/styles'
import Card, { CardContent, CardMedia, CardActions } from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import Button from './Button'

const styles = {
  root: {
    display: 'flex',
    justifyContent:'center',
    width: '100%',
  },
  card: {
    width: '100%',
    maxWidth: 1440,
    boxShadow: 'none',
  },
  media: {
    height: 320,
  },
  content:{
    display: 'flex',
    flexDirection: 'column',
    padding: '24px 0px',
    margin: '0px',
  },
  title: {
    textAlign: 'center',
    fontSize: '16.9px',
    fontWeight: 500,
  },
  panel: {
    display: 'flex',
    justifyContent:'center',
    paddingTop: '0px',
    marginTop: '24px',
  },
  info: {
    alignSelf: 'center',
    fontSize: '13px',
    fontWeight: 400,
  },
}

const Category = ({ classes, info, buttonText, path, image, title, linkTo })  => {
  const renderButton = () =>
    <CardActions className = { classes.panel }>
      <Button
        className = { classes.button }
        click = { () => linkTo(path) }
        text = { buttonText }
      />
    </CardActions>
  const renderInfo = () =>
    <Typography className = { classes.info } >
      { info }
    </Typography>

  return (
    <div className = { classes.root }>
      <Card className = { classes.card }>
        <Link to = { path } className = { classes.link }>
          <CardMedia
            className = { classes.media }
            image = { image }
            title = { title }
          />
        </Link>
        <CardContent className = { classes.content }>
          <Typography
            className = { classes.title }
            type = 'title'
            component = 'h4'
            children = { title }
          />
          { info && renderInfo() }
          { buttonText && renderButton() }
        </CardContent>
      </Card>
    </div>
  )
}
Category.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  info: PropTypes.string,
  button: PropTypes.string,
  linkTo:  PropTypes.func,
}
export default withStyles(styles)(Category)
