import { makeStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex"
    },
    drawer: {
        [theme.breakpoints.up("sm")]: {
            width: drawerWidth,
            flexShrink: 0
        }
    },
    appBar: {
        [theme.breakpoints.up("sm")]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth
        }
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up("sm")]: {
            display: "none"
        }
    },
    wrapper: {
        margin: theme.spacing(1),
        position: "relative"
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3)
    },
    buttonSuccess: {
        position: "fixed",
        top: "50%",
        left: "50%",
        /* bring your own prefixes */
        // transform: translate(-50 %, -50 %),
        backgroundColor: green[500],
        "&:hover": {
            backgroundColor: green[700]
        }
    },
    buttonProgress: {
        color: green[500],
        position: "absolute",
        top: "50%",
        left: "50%",
        marginTop: -12,
        marginLeft: -12
    }
}));

export default useStyles;