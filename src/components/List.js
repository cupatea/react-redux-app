import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import MaterialList, { ListItem, ListItemText } from 'material-ui/List'

const styles = {
  list: {
		width: 250,
	},
	headline: {
		textTransform: 'uppercase',		
	},
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
					<ListItemText 
						onClick = { () => item.action(item.path) } 
						secondary = { item.title }
					/>   
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