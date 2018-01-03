import React from 'react'
import PropTypes from 'prop-types'
import compose from 'recompose/compose'
import withWidth from 'material-ui/utils/withWidth'
import { withStyles } from 'material-ui/styles'
import MaterialButton from 'material-ui/Button'

const styles = theme => ({
	root: {
		justifySelf: 'center',
		alignSelf: 'start',
		padding: '8px 44px',
		margin: 0,
		border: '2px solid #000',
		backgroundColor: '#FFF',
		color: '#202020',
		outline: 'none',
		lineHeight: 1.5,
		[theme.breakpoints.down('sm')]: {
			padding: '16px 30%',
		},  
	},
})

const Button = ({ classes,click, text }) =>(
	<MaterialButton 
		className = { classes.root }
		color = 'contrast' 
		onClick = { click }
		children = { text }
	/>
)

Button.propTypes = {
	classes: PropTypes.object.isRequired,
	width: PropTypes.string.isRequired,
	click: PropTypes.func
}

export default compose(withStyles(styles), withWidth())(Button)
