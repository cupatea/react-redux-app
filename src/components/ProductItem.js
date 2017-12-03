import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Card, { CardContent, CardMedia } from 'material-ui/Card'
import Typography from 'material-ui/Typography'


const styles = theme => ({
  root: {
    display: 'grid'
  },
  card: {
    display: 'grid',
    justifySelf: 'center',
    width: '100%',
    maxWidth: 300,
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
  price:{
    justifySelf: 'center',
    fontSize: '13px',
    fontWeight: 400,
  }
})

function ProductItem(props) {
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
          <Typography
            className={classes.price}
            type="title"
            component="span"
          >
            ₴{props.price}
          </Typography>
        </CardContent>
      </Card>
    </div>
  )
}

ProductItem.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(ProductItem)
