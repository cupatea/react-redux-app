import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Paper from 'material-ui/Paper'
import Tabs, { Tab } from 'material-ui/Tabs'

const styles = theme => ({
  root: {
    flexGrow: 1,
    boxShadow: 'none',

  },
  tabs:{

  },
  tab: {
    textTransform: 'none',
    height: '35px',
  },
})

class NavTabs extends React.Component {
  state = {
    value: null,
  }

  handleChange = (event, value) => {
    this.setState({ value })
  }

  render() {
    const { classes } = this.props
    return (
      <Paper className={classes.root}>
        <Tabs className={classes.tabs}
          value={this.state.value}
          onChange={this.handleChange}
          centered
        >
          {this.props.tabs.map( tab => <Tab className={classes.tab} label={tab.label} />)}
        </Tabs>
      </Paper>
    )
  }
}

NavTabs.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(NavTabs)
