import React from "react";
import Grid from "../Grid/Grid";

export default React.memo(function PathFinderVisualizer({ isVisualizing }: { isVisualizing: boolean }) {
    return (
        <Grid rows={25} cols={50} isVisualizing={isVisualizing} />
    );
});
