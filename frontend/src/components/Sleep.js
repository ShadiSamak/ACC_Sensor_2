import { useState, useEffect } from "react";
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import '../styles/sleep.css';
import data from '../data/activity.json'
import Select from 'react-select'

export default function Sleep({ parentChangeActiveTab, ...rest }) {
    // State to manage the condition for disabling text boxes
    const [disableTextBoxes, setDisableTextBoxes] = useState(false);

    // Effect to run when the component mounts to check localStorage
    useEffect(() => {
        // Get the value from localStorage
        const localStorageValue = localStorage.getItem('sleep_analysis');

        // Update state based on localStorage value
        if (localStorageValue !== null) {
            const newValue = !JSON.parse(localStorageValue);
            setDisableTextBoxes(newValue);

            if (newValue === true){
                setTimeThreshold(0)
                setAngelThreshold(0)}
            else{
                setTimeThreshold(5)
                setAngelThreshold(5)}
}
    }, [localStorage.getItem('sleep_analysis')]);

    // Time Threshold
    const [timeThreshold, setTimeThreshold] = useState(5);

    // Angle Threshold
    const [angleThreshold, setAngelThreshold] = useState(5);

    // Angle Threshold
    const [nonWearTime, setNonWearTime] = useState(false);

    // HASIB
    const [hasib, setHasib] = useState({ "value": "NotWorn", "label": "NotWorn" })
    const hasibalgos = data.filter(x => x.window.includes("HASIB"))
    const handleHasibChange = (event) => { setHasib(event); }


    const handleTimeThresholdChange = (event) => {
        setTimeThreshold(event.target.value)
    };

    const handleAngleThresholdChange = (event) => {
        setAngelThreshold(event.target.value)
    };

    const handleNWTimeChange = (event) => {
        setNonWearTime(event.target.checked)
    };


    useEffect(() => { localStorage.setItem('time_threshold', JSON.stringify(timeThreshold)); }, [timeThreshold])
    useEffect(() => { localStorage.setItem('angle_threshold', JSON.stringify(angleThreshold)); }, [angleThreshold])
    useEffect(() => { localStorage.setItem('ignore_non_wear_time', JSON.stringify(nonWearTime)); }, [nonWearTime])
    useEffect(() => { localStorage.setItem('hasib', JSON.stringify(hasib)); }, [hasib])
    
    return (
        <div>
            {/* Table with items */}
            <table style={{ marginLeft: '10vh', marginTop: '5vh' }}>
                <tr>
                    <td className="cells">
                        <li style={{ listStyleType: 'disc' }}>
                            <span style={{ color: 'black', fontSize: '15pt' }}>Time Threshold:</span>
                            <input
                                value={timeThreshold}
                                className="inp"
                                disabled={disableTextBoxes}
                                onChange={handleTimeThresholdChange} />
                            <span style={{ color: 'black', fontSize: '15pt', marginLeft: '5%' }}>mins</span>
                        </li>
                    </td>
                    <td className="cells">
                        <li style={{ listStyleType: 'disc' }}>
                            <span style={{ color: 'black', fontSize: '15pt' }}>Angle Threshold:</span>
                            <input
                                value={angleThreshold}
                                className="inp"
                                disabled={disableTextBoxes}
                                onChange={handleAngleThresholdChange} />
                            <span style={{ color: 'black', fontSize: '15pt', marginLeft: '5%' }}>degree</span>
                        </li>
                    </td>
                </tr>

                </table>
                <table style={{ marginLeft: '10vh', marginTop: '5vh', width:'100vh' }}>
                <tr>
                    <td style={{ width:'15%'  }}>
                        <div styles={{display:'flex', alignItems:'center'}}>
                        <li style={{ listStyleType: 'disc'}}>
                            <span style={{ color: 'black', fontSize: '15pt', marginRight: '10px' }}>
                                HASIB Algorithm
                            </span>
                        </li>
                        </div>
                    </td>
                    <td style={{ width:'35%'}}>
                    <Select
                                id={"HASIB"}
                                value={hasib}
                                options={hasibalgos[0].vals}
                                onChange={handleHasibChange}
                                isDisabled={disableTextBoxes}
                                className="listboxlrg"
                                />
                    </td>
                    <td className="divstyle" >
                        <li>
                        <span style={{ color: 'black', fontSize: '15pt' }}>Ignore Non-wear Time</span>
                        <FormControlLabel
                            value="start"
                            control={<Switch onChange={handleNWTimeChange} color="primary" />}
                            labelPlacement="start"
                            disabled={disableTextBoxes}
                        />
                        </li>
                    </td>
                </tr>

            </table>
        </div>
    );
};


/*

            
            <table>
                <tr>
                    <td style={{ width: '115vh', height: '8vh', textAlign: 'right', verticalAlign: 'middle' }}>
                        <div style={{ marginLeft: '15vh' }}>
                            <a style={{ fontSize: 20 }} onClick={() => parentChangeActiveTab("activity")} > {'\u2B05'} PREV  |</a>
                            <a style={{ fontSize: 20 }} onClick={() => parentChangeActiveTab("run")}>NEXT {'\u27A1'}</a>
                        </div>
                    </td>
                </tr>
            </table>




*/