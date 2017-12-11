import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { withStyles } from 'material-ui/styles'
import Paper from 'material-ui/Paper'
import MaterailTabs, { Tab } from 'material-ui/Tabs'

const styles = theme => ({
  root: {
    display: 'grid',
    boxShadow: 'none',
  },
  tabs: {
    justifySelf: 'center',
  },
  tab: {
    textTransform: 'none',
    height: '35px',
    opacity: 1,
  },
})

const Tabs = props => {
  const { classes } = props
  const currentTab = props.currentTab ? props.currentTab : false
  return (
    <Paper className = { classes.root }>
      <MaterailTabs className = { props.classes.tabs} value = { currentTab } >
        {props.tabs.map(tab => 
          <Tab 
            className = { classes.tab } 
            key       = { tab.id }
            value     = { tab.slug }
            label     = { tab.title } 
            component = { Link }
            to        = { tab.slug }
          />
        )}
      </MaterailTabs>
    </Paper>
  )
}

Tabs.propTypes = {
  classes: PropTypes.object.isRequired,
  currentTab: PropTypes.string.isRequired,
  tabs: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    slug: PropTypes.string,
    title: PropTypes.string,
  })) 
}

export default withStyles(styles)(Tabs)
