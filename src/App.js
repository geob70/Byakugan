import React from "react";
import { Tokenize, byakugan } from "./core/tokenizer";
import Upload from "./windows/upload";
import AlertInfo from "./modal/alert";
import Searcher from "./windows/query";
import { readFile } from "./others/readFile";
import {
  Divider,
  Typography,
  Drawer,
  Hidden,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";
import { CloudUpload, Search, Menu, LensTwoTone } from "@material-ui/icons";
import { makeStyles, useTheme } from "@material-ui/core/styles";

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
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }
}));

function BasePage(props) {
  const [file, setFile] = React.useState(null);
  const [trie, setTrie] = React.useState(null);
  const [files, setFiles] = React.useState({});
  const [tabIndex, setIndex] = React.useState(1);
  const [message, setInfo] = React.useState("");
  const [state, setState] = React.useState("");
  const [alert, showAlert] = React.useState(false);
  const { container } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const change = index => {
    setIndex(index + 1);
  };

  const openModal = (message, state) => {
    setInfo(message);
    setState(state);
    showAlert(true);
  };

  const closeModal = () => {
    showAlert(false);
  };

  const drawer = (
    <div>
      <Typography variant="subtitle2">
        <LensTwoTone /> byakugan
      </Typography>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {["Upload File", "Search"].map((text, index) => (
          <ListItem onClick={() => change(index)} button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <CloudUpload /> : <Search />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  const handleChange = event => {
    setFile(event.target.files[0]);
  };

  const search = event => {
    console.log(byakugan(event.target.value, trie));
  };

  const upload = () => {
    if (file !== null) {
      let root = Tokenize(file.path, file.name, trie);
      setTrie(root);
      let docs = files;
      docs[file.name] = readFile(file.path);
      setFiles(docs);
      setFile(null);
      return openModal("uploaded", "success");
    } else {
      return openModal("Select a file to upload", "error");
    }
  };

  return (
    <div className={classes.root}>
      <Menu
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        className={classes.menuButton}
      />
      {/* <Typography variant="h6" noWrap>
        Responsive drawer
      </Typography> */}
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper
            }}
            ModalProps={{
              keepMounted: true
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <AlertInfo
          visible={alert}
          action={closeModal}
          state={state}
          message={message}
        />
        <div>
          {tabIndex === 1 && <Upload file={handleChange} uploader={upload} />}
          {tabIndex === 2 && <Searcher query={search} />}
        </div>
      </main>
    </div>
  );
}

export default BasePage;
