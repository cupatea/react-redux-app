import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Card, { CardContent, CardMedia } from 'material-ui/Card'
import Typography from 'material-ui/Typography'

const styles = {
	root: {
		display: 'flex',
		justifyContent: 'center',
		width: '100%'
	},
	card: {
		width: '100%',
		maxWidth: 300,
		boxShadow: 'none',
	},
	media: {
		height: 320,
	},
	content:{
		display: 'flex',
		justifyContent: 'center',
		marginTop: '24px',
		padding: 0,
	},
	title: {
		textAlign: 'center',
		fontSize: '16.9px',
		fontWeight: 500,
	},
	price:{
		textAlign: 'center',
		marginBottom: '24px',
		fontSize: '13px',
		fontWeight: 400,
	}
}

const Product = ({ classes, image, title, price}) => 
	<div className = { classes.root }>
		<Card className = { classes.card }>
			<CardMedia
				className = { classes.media }
				image = { image }
				title = { title }
			/>
			<CardContent className = { classes.content }>
				<Typography
					className = { classes.title }
					type = 'headline'
					component = 'h4'
					children = { title }
				/>
			</CardContent>
			<Typography
				className = { classes.price }
				type = 'title' 
				component = 'span'
				children = { '₴' + price }
			/>
		</Card>
	</div>

Product.propTypes = {
	classes: PropTypes.object.isRequired,
	title: PropTypes.string.isRequired,
	image: PropTypes.string.isRequired,
	price: PropTypes.number.isRequired,
}

export default withStyles(styles)(Product)
