import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import MaterialList, { ListItem, ListItemText } from 'material-ui/List'
import ButtonBase from 'material-ui/ButtonBase'

const styles = {
  list: {
		width: 250,
	},
	headline: {
		textTransform: 'uppercase',		
  },
  button: {
    textAlign: 'left',
  }
}
const List = props => {
  const { classes } = props
  return (
		<MaterialList className = { classes.list }>
			<ListItem className = { classes.headline }>
				<ListItemText primary = { props.headline }/>
			</ListItem>  
			{ props.items.map((item, index) => (
				<ListItem key = { index }>
          <ButtonBase  className = { classes.button } onClick = { () => item.action(item.path) }>
					  <ListItemText secondary = { item.title }/>   
          </ButtonBase>  
				</ListItem>
      ))}   
		</MaterialList> 
	)	 
}  

List.propTypes = {
	classes: PropTypes.object.isRequired,
	headline: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape({
		title: PropTypes.string,
		path: PropTypes.string,
		action: PropTypes.func
  })),
}

export default withStyles(styles)(List)