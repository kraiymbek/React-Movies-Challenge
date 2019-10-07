import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Rating } from '@material-ui/lab';
import Box from "@material-ui/core/Box";
import Multiselect from 'multiselect-dropdown-react';


const styles = theme => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});


const DialogTitle = withStyles(styles)(props => {
    const { children, classes, onClose } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles(theme => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

const useStyles = makeStyles(theme => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        width: 'fit-content',
    },
    formControl: {
        marginTop: theme.spacing(2),
        minWidth: 120,
    },
    formControlLabel: {
        marginTop: theme.spacing(1),
    },
}));

export default function CustomizedDialogs(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(props.isDialogOpen);
    const [selectValue, setSelectValue] = React.useState([]);
    const [movieRating, setMovieRating] = React.useState(0);

    const [collectionTableData, setCollectionTableData] = React.useState(props.moviesList.map(item => {
        return {
            name: item.name,
            value: item.name,
        }
    }));

    const [moviesIdsDictionary, setMoviesIdsDictionary] = React.useState({});


    const handleClose = () => {
        setOpen(false);
        props.dialogClosed();
    };


    const handleMovieCollection = (e) => {
        setSelectValue(e);
        console.log(e)
        console.log(moviesIdsDictionary)
        console.log(props.moviesList)
    };

    const handleSumit = () => {
        setOpen(false);
        props.dialogClosed();
        props.dialogSubmited({movieRating, selectValue})
    };

    return (
        <div>
            <Dialog fullWidth={true} onClose={handleClose} aria-labelledby="customized-dialog-title"
                    open={open}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Modal Collection Modal
                </DialogTitle>
                <DialogContent dividers>
                    <Typography gutterBottom>
                        Choose Movie Table
                    </Typography>
                    <Multiselect options={collectionTableData} onSelectOptions={handleMovieCollection} />

                    <Box component="fieldset" mb={3} borderColor="transparent">
                        <Typography component="legend">Movie Rating</Typography>
                        <Rating
                            name="simple-controlled"
                            value={movieRating}
                            onChange={(event, newValue) => {
                                setMovieRating(newValue);
                            }}
                        />
                    </Box>

                </DialogContent>
                <DialogActions>
                    <Button disabled={!selectValue.length || !movieRating} onClick={handleSumit} color="primary">
                        Save changes
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
