import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'

const styles = {
	root: {
		display: 'flex',
		justifyContent: 'center',
		marginTop: '32px',
	},
	button:{
		width: '10%',
		backgroundColor: 'black',
		fontSize: '13px'
	},
}

const Footer = ({ classes, text }) => {
	return (
		<footer className = { classes.root }>
			<Button 
				raised 
				color="accent" 
				className = { classes.button }
				children = { text }
			/>
		</footer>
	)
}

Footer.propTypes = {
	classes: PropTypes.object.isRequired,
	text: PropTypes.string.isRequired,
}

export default withStyles(styles)(Footer)
