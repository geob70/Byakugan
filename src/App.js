import React from "react";
import "./App.css";
import { Tokenize, byakugan } from "./core/tokenizer";
import WordTable from "./windows/table";
import useStyles from "./style";
import Upload from "./windows/upload";
import AlertInfo from "./modal/alert";
import Searcher from "./windows/query";
import {
  Divider,
  Typography,
  Drawer,
  Hidden,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Avatar,
  CircularProgress,
  Button
} from "@material-ui/core";
import { CloudUpload, Menu, LensTwoTone } from "@material-ui/icons";
import { useTheme } from "@material-ui/core/styles";

function BasePage(props) {
  const [file, setFile] = React.useState(null);
  const [trie, setTrie] = React.useState(null);
  const [files, setFiles] = React.useState({});
  const [occurence, setOccurence] = React.useState(0);
  const [time, setTime] = React.useState(0);
  const [data, setData] = React.useState(<div></div>);
  const [query, setQuery] = React.useState(null);
  const [message, setInfo] = React.useState("");
  const [state, setState] = React.useState("");
  const [alert, showAlert] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const timer = React.useRef();
  const { container } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  React.useEffect(() => {
    setData(data);
    return () => {
      clearTimeout(timer.current);
    };
  }, [data]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const openModal = (message, state) => {
    setInfo(message);
    setState(state);
    showAlert(true);
  };

  const closeModal = () => {
    showAlert(false);
  };

  const handleChange = event => {
    setFile(event.target.files[0]);
  };

  const search = event => {
    setData(<div></div>);
    setSuccess(false);
    let start = performance.now();
    let res = byakugan(event.target.value, trie);
    let end = performance.now();
    setTime(end - start);
    if (typeof res === "string") {
      openModal(res, "warning");
    } else if (res !== null) {
      setQuery(res);
      setOccurence(res.frequency);
    } else {
      setOccurence(0);
      setTime(0);
    }
  };

  const handleButtonClick = () => {
    if (!loading) {
      setLoading(true);
      timer.current = setTimeout(() => {
        const table = displaySearch(query);
        setLoading(false);
        setSuccess(true);
        setData(table);
      }, 2000);
    }
  };

  const displaySearch = query => {
    setOccurence(query.frequency);
    let temp = [];
    Object.keys(query.index).forEach(key => {
      query.index[key].map(item =>
        temp.push({
          word: files[key][item],
          filename: key,
          index: item
        })
      );
    });
    const table = <WordTable data={temp} />;
    return table;
  };

  const upload = () => {
    if (file !== null) {
      let objData = Tokenize(file.path, file.name, trie);
      let root = objData.obj;
      let content = files;
      content[file.name] = objData.doc;
      setTrie(root);
      setFiles(content);
      setFile(null);
      return openModal("uploaded", "success");
    } else {
      return openModal("Select a file to upload", "error");
    }
  };

  const drawer = (
    <div>
      <Typography variant="subtitle2">
        <LensTwoTone /> byakugan
      </Typography>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <ListItem>
          <ListItemIcon>
            <CloudUpload />
          </ListItemIcon>
          <ListItemText primary="Upload File" />
        </ListItem>
        <ListItem>
          <Upload file={handleChange} uploader={upload} />
        </ListItem>
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <Menu
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        className={classes.menuButton}
      />
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
          <div className="display">
            <Searcher value="" query={search} />
            <div className="result">
              <span>Found {occurence} words matching </span>
              <Chip
                variant="outlined"
                size="small"
                avatar={<Avatar>!</Avatar>}
                label={"Fetched result in " + time + " milliseconds"}
              />
            </div>
            {!success && (
              <div className={classes.wrapper}>
                <p>Loading table might take a while to render</p>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.buttonSuccess}
                  disabled={loading}
                  onClick={handleButtonClick}
                >
                  Load table
                  {loading && (
                    <CircularProgress
                      size={24}
                      className={classes.buttonProgress}
                    />
                  )}
                </Button>
              </div>
            )}
            {success && data}
          </div>
        </div>
      </main>
    </div>
  );
}

export default BasePage;
