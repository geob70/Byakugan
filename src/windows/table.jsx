import React from "react";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import {
    Table,
    TableContainer,
    TableHead,
    TableCell,
    TableBody,
    TableRow,
    Paper,
} from '@material-ui/core';

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
}))(TableRow);

const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
});

function WordTable(props) {
    const classes = useStyles();

    return (
        <div>
            <TableContainer component={Paper}>
                <Table className={classes.table}>
                    <TableHead>
                        <StyledTableRow>
                            <StyledTableCell>Word</StyledTableCell>
                            <StyledTableCell>File Name</StyledTableCell>
                            <StyledTableCell>In index</StyledTableCell>
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {props.data.map((item, index) => {
                            return (
                                <StyledTableRow key={index}>
                                    <StyledTableCell>{item.word}</StyledTableCell>
                                    <StyledTableCell>{item.filename}</StyledTableCell>
                                    <StyledTableCell>{item.index}</StyledTableCell>
                                </StyledTableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
export default WordTable;
