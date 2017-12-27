import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Paper from 'material-ui/Paper'
import MaterailTabs, { Tab } from 'material-ui/Tabs'
import Hidden from 'material-ui/Hidden'

const styles = theme => ({
  root: {
    display: 'grid',
    boxShadow: 'none',
    padding: '8px',
  },
  tabs: {
    justifySelf: 'center',
    
  },
  tab: {
    color: '#202020',
    fontWeight: 500,
    textTransform: 'none',
    height: '35px',
    opacity: 1,
  },
})


const Tabs = ({ classes, currentTab, tabs, action }) => (
  <Hidden only = 'xs'>
    <Paper className = { classes.root }>
      <MaterailTabs className = { classes.tabs } value = { currentTab ? currentTab : false } >
        { tabs.map(tab => 
          <Tab 
            className = { classes.tab } 
            key       = { tab.id }
            value     = { tab.slug }
            label     = { tab.title } 
            onClick   = { (slag) => action(tab.slug) }
          />
        )}
      </MaterailTabs>
    </Paper>
  </Hidden>
)

Tabs.propTypes = {
  classes: PropTypes.object.isRequired,
  tabs: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    slug: PropTypes.string,
    title: PropTypes.string,
  })) 
}

export default withStyles(styles)(Tabs)
