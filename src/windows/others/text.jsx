import React, { useEffect, useState } from "react";
import { Paper } from "@material-ui/core";
import { styled } from '@material-ui/core/styles';
import { } from "@material-ui/icons";

const TextPaper = styled(Paper)({
    margin: 3,
    fontSize: 15
});

function Text(props) {
    const [highlighted, setHighlight] = useState(false);
    useEffect(() => {
        setHighlight(props.highlighted);
    }, [highlighted, props.highlighted]);

    return (
        <div>
            <TextPaper style={{ background: highlighted ? 'linear-gradient(to right, #f2994a, #f2c94c)' : null }} elevation={0}>
                <span>{props.text}</span>
            </TextPaper>
        </div>
    );
}
export default Text;
