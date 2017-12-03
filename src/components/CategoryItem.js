import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card'
import Typography from 'material-ui/Typography'

const styles = theme => ({
  root: {
    width: '100%',
    display: 'grid',
    marginBottom: '32px',
  },
  card: {
    display: 'grid',
    width: '100%',
    justifySelf: 'center',
    maxWidth: 1440,
    boxShadow: 'none',
  },
  media: {
    height: 320,
  },
  content:{
    display: 'grid',
    margin: '32px 0px',
    padding: 0,
  },
  title: {
    justifySelf: 'center',
    fontSize: '16.9px',
    fontWeight: 500,
  },
  actions:{
    display: 'grid',
  },
})

function CategoryItem(props) {
  const { classes } = props
  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image={props.image}
          title={props.title}
        />
        <CardContent className={classes.content}>
          <Typography
            className={classes.title}
            type="headline"
            component="h4"
          >
              {props.title}
          </Typography>
        </CardContent>
        <CardActions className={classes.actions}>
          {props.actions}
        </CardActions>
      </Card>
    </div>
  )
}

CategoryItem.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(CategoryItem)
