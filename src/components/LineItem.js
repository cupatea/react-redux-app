import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import compose from 'recompose/compose'
import withWidth from 'material-ui/utils/withWidth'
import IconButton from 'material-ui/IconButton'
import Close from 'material-ui-icons/Close'
import Add from 'material-ui-icons/AddCircleOutline'
import Remove from 'material-ui-icons/RemoveCircleOutline'
import Typography from 'material-ui/Typography'
import { serverURL }  from '../config/api'

const styles = theme => ({
  root: {
    display: 'flex',
    position: 'relative',
    marginTop: '36px',
  },
  image:{
    height: '72px',
    width: '72px',
  },
  flex: {
    display: 'flex',
    width: '100%',
    [theme.breakpoints.up('md')]: {
      marginLeft: '24px',
    },
    [theme.breakpoints.down('md')]: {
      marginLeft: '10px',
      flexDirection: 'column',
    },
    [theme.breakpoints.down('sm')]: {
      marginLeft: '10px',
      flexDirection: 'column',
    },
  },
  title: {
    display: 'flex',
    lineHeight: '20px',
    fontWeight: '500',
    float: 'left',
    [theme.breakpoints.up('md')]: {
      width: 'calc(100% - 438px)',
      marginTop: '26px',
      marginRight: '30px',
    },
    [theme.breakpoints.down('md')]: {
      width: 'calc(100% - 40px)',
      marginTop: '16px',
      marginRight: '0px',
    },
    [theme.breakpoints.down('sm')]: {
      width: 'calc(100% - 40px)',
      marginTop: '0px',
      marginRight: '0px',
    },
  },
  detail: {
    display: 'flex',
    height: 'auto',
    [theme.breakpoints.up('md')]: {
      marginTop: '26px',
      marginRight: '30px',
    },
    [theme.breakpoints.down('md')]: {
      justifyContent: 'flex-end',
      margin: '10px 10px 0 0',
    },
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'flex-start',
      margin: '0px',
      flexDirection: 'column',
    },
  },
  quantity:{
    display: 'flex',
    alignItems: 'center',
    minWidth: '80px',
    width: '160px',
    [theme.breakpoints.up('md')]: {
      marginTop: '-26px',
    },
    [theme.breakpoints.down('md')]: {
      marginTop: '-6.5px',
    },
    [theme.breakpoints.down('sm')]: {
      marginLeft: '-16px',
    },
  },
  lable: {
    margin: '0px',
    padding: '8px 24px 8px 0',
    fontSize: '13px',
  },
  sizes: {
    display: 'flex',
    height: 'auto',
    minWidth: '80px',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'column',
      width: '144px',
    },
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'row',
      width: '288px',
    },
  },
  size: {
    marginRight: '10px',
    textTransform: 'uppercase'
  },
  price: {
    display: 'flex',
    height: '20px',
    width: '144px',

  },
  deleteButton:{
    width: '18px',
    height: '18px',
    position: 'absolute',
    top: '24px',
    right: '0',
    color: '#757575',
  },
  quantityButton:{
    width: '30px',
    height: '30px',
    margin: '0 8px',
    color: '#757575',
  },
  icon:{
    fontSize: '18px'
  }

})

const LineItem = ({ classes, image, title, currentQuantity, sizes, currency, price, handleDelete, handleIncrement, handleDecrement }) =>(
  <div className = { classes.root }>
    <img
      className = { classes.image}
      src = { serverURL(image) }
      alt = { title }
    />
    <div className = { classes.flex }>
      <div className = { classes.title }>
        <Typography type = 'body2' children = { title } />
      </div>
      <div className = { classes.detail }>
        <div className = { classes.quantity }>
          <IconButton
            className = { classes.quantityButton }
            disabled = { currentQuantity < 2 }
            aria-label = "Remove"
            onClick = { () => handleDecrement() }
            children = { <Remove className = { classes.icon } /> }
          />
          <Typography type = 'body2' children = { currentQuantity }/>
          <IconButton
            className = { classes.quantityButton }
            aria-label = "Add"
            onClick = { () => handleIncrement() }
            children = { <Add className = { classes.icon } /> }
          />
        </div>
        <div className = { classes.sizes }>
          { Object.entries(sizes).map( size =>
              <Typography
                key = { size[0] }
                className = { classes.size }
                type = 'caption'
                children = { size[1] }
              />
            )
          }
        </div>
        <div className = { classes.price }><Typography type = 'caption' children = { currency + price }/></div>
      </div>
    </div>
    <IconButton className = { classes.deleteButton } aria-label = "Close" onClick = { () => handleDelete() }>
      <Close className = { classes.icon } />
    </IconButton>
  </div>
)

LineItem.propTypes = {
  classes: PropTypes.object.isRequired,
  width: PropTypes.string.isRequired,
  handleIncrement: PropTypes.func,
  handleDecrement: PropTypes.func,
}

export default compose(withStyles(styles), withWidth())(LineItem)
