import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { withStyles } from 'material-ui/styles'
import Card, { CardContent, CardMedia, CardActions } from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import Button from './Button'

const styles = theme => ({
  root: {
    display: 'grid',
    width: '100%',
  },
  card: {
    display: 'grid',
    justifySelf: 'center',
    width: '100%',
    maxWidth: 1440,
    boxShadow: 'none',
  },
  media: {
    height: 320,
  },
  content:{
    display: 'grid',
    padding: '24px 0px',
    margin: '0px',
  },
  title: {
    justifySelf: 'center',
    fontSize: '16.9px',
    fontWeight: 500,
  },
  panel: {
    display: 'grid',
    paddingTop: '0px',
  },
  info: {
    alignSelf: 'center',
    justifySelf: 'center',
    fontSize: '13px',
    fontWeight: 400,
  },
  link: {    
    marginTop: '24px',
    display: 'grid',
    textDecoration: 'none',
  }
})

const Category = props => {
  const { classes } = props
  const info = <Typography className = {classes.info} component = "p" >{ `${props.info} items` }</Typography>
  const button = <Link to = { props.path } className = { classes.link }><Button text = { props.button }/></Link>
  return (
    <div className = { classes.root }>
      <Card className = { classes.card }>
        <Link to = { props.path } className = { props.classes.link }>
          <CardMedia
            className = { classes.media }
            image = { props.image }
            title = { props.title }
          />
        </Link> 
        <CardContent className = { classes.content }>
          <Typography
            className = { classes.title }
            type = "headline"
            component = "h4"
          >
              { props.title }
          </Typography>
          <CardActions className = { classes.panel }>
            { props.info && info }
            { props.button && button }
          </CardActions>
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
  info: PropTypes.number,
  button: PropTypes.string,
}
export default withStyles(styles)(Category)
