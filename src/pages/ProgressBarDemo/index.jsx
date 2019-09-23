import React, { useEffect, useReducer } from 'react';

import useAsync from '../../common/hooks/useAsync';
import { getBars } from '../../services/ProgressBar';
import ProgressBar from '../../common/ProgressBar';
import PageContainer from '../../common/layouts/PageContainer';
import Button from '../../common/Button';

const defaultState = {
    data: {
        bars: [],
        buttons: [],
        limit: 0
    },
    selectedBar: 0
}

const actionTypes = {
    UPDATE_DATA: 'UPDATE_DATA',
    SELECT_BAR: 'SELECT_BAR',
    UPDATE_BAR: 'UPDATE_BAR'
}

const reducer = (state, action) => {
    switch (action.type) {
        case actionTypes.UPDATE_DATA:
            return { ...defaultState, data: action.payload };
        case actionTypes.SELECT_BAR:
            return { ...state, selectedBar: action.payload };
        case actionTypes.UPDATE_BAR:
            const updatedBars = [...state.data.bars];
            updatedBars.splice(state.selectedBar, 1,
                state.data.bars[state.selectedBar] + action.payload < 0
                    ? 0 : state.data.bars[state.selectedBar] + action.payload);
            return { ...state, data: { ...state.data, bars: updatedBars } };
        default:
            return state;
    }
}

const ProgressBarDemo = () => {
    const { loading, data, fetcher, error } = useAsync(true);
    const [state, dispatch] = useReducer(reducer, defaultState);
    useEffect(() => {
        fetcher(() => getBars());
    }, []);

    useEffect(() => dispatch({ type: actionTypes.UPDATE_DATA, payload: data }), [data]);

    return (
        <PageContainer>
            <h2>Progress Bar Demo</h2>
            {!loading && !error && <React.Fragment>
                {state.data.bars.map((bar, index) => (
                    <ProgressBar
                        key={index}
                        max={state.data.limit}
                        value={bar}
                        perc={((bar / state.data.limit) * 100).toFixed()}
                    />
                ))}
                <select name="dropdown"
                    onChange={(e) => dispatch({ type: actionTypes.SELECT_BAR, payload: e.target.value })}
                    defaultValue={state.selectedBar}
                >
                    {state.data.bars.map((bar, index) => (
                        <option value={index} key={index}>{`#progress${index + 1}`}</option>
                    ))}
                </select>
                {state.data.buttons.map((button, index) => (
                    <Button
                        type="button"
                        onClick={() => dispatch({ type: actionTypes.UPDATE_BAR, payload: button })}
                        key={index}
                    >
                        {button}
                    </Button>
                ))}
            </React.Fragment>}
            {loading && <div>Loading...</div>}
            {!loading && error && <div>Server error occured.</div>}
        </PageContainer>
    );
};

export default ProgressBarDemo;
