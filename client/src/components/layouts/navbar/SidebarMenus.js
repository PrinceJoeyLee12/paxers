import React from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { Button, ListItem, useMediaQuery } from '@material-ui/core';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router';

const useStyles = makeStyles(theme => ({
  item: {
    display: 'flex',
    paddingTop: 0,
    paddingBottom: 0,
  },
  button: {
    color: theme.palette.text.secondary,
    fontWeight: theme.typography.fontWeightMedium,
    justifyContent: 'flex-start',
    letterSpacing: 0,
    padding: '10px 15px',
    textTransform: 'none',
    width: '100%',
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  title: {
    marginRight: 'auto',
  },
  active: {
    color: theme.palette.primary.main,
    '& $title': {
      fontWeight: theme.typography.fontWeightMedium,
    },
    '& $icon': {
      color: theme.palette.primary.main,
    },
  },
}));

const SidebarNavItems = ({
  className,
  index,
  href,
  icon: Icon,
  title,
  handleDrawerToggle,
  match,
  ...rest
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <ListItem
      className={classnames(classes.item, className)}
      disableGutters
      {...rest}>
      <Button
        onClick={isMobile ? handleDrawerToggle : () => {}}
        component={RouterLink}
        className={classes.button}
        activeClassName={classes.active}
        to={href}>
        {Icon && <Icon className={classes.icon} size='20' />}
        <span className={classes.title}>{title}</span>
      </Button>
    </ListItem>
  );
};

SidebarNavItems.propTypes = {
  className: PropTypes.string,
  href: PropTypes.string,
  icon: PropTypes.elementType,
  title: PropTypes.string,
};

export default withRouter(SidebarNavItems);
