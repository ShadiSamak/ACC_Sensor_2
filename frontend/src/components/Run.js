import React, { useEffect, useState } from "react";
import Switch from '@mui/material/Switch';
import '../styles/sleep.css';
import RefreshIcon from '@mui/icons-material/Refresh';
import { IconButton } from '@mui/material';
import axios, * as others from 'axios';
import { Tooltip } from '@chakra-ui/react'
export default function Run() {
    // File
    const [day_night_value, setDayNightValue] = useState("");
    const [time_zone_value, setTimeZoneValue] = useState("");
    const [inputname_value, setInputFileValue] = useState("");
    const [outputname_value, setOutputFileValue] = useState("");

    // Pre-Processing
    const [sleep_analysis_value, setSleepAnalysisValue] = useState(false);
    const [time_window_value, setTwindowValue] = useState("");
    const [windows1_value, setWindows1Value] = useState("");
    const [windows2_value, setWindows2Value] = useState("");
    const [windows3_value, setWindows3Value] = useState("");
    const [auto_calibration_value, setAutoCalibrationValue] = useState("");
    const [pa_enmo_value, setPaEnmoValue] = useState("");
    const [pa_mad_value, setPaMadValue] = useState("");
    const [pa_hfen_value, setPaHfenValue] = useState("");
    const [pa_en_value, setPaEnValue] = useState("");
    const [pa_actilife_value, setPaActilifeValue] = useState("");
    const [proc_chunk_size_value, setProcChunkSizeValue] = useState("");

    // Activity
    const [analytical_strategy_value, setAnalyticalStrategyValue] = useState("");
    const [startofperiod, setStartOfPeriod] = useState("");
    const [endOfperiod, setEndOfPeriod] = useState("");
    const [q_win_v1_value, setQWinValue1] = useState("");
    const [q_win_v2_value, setQWinValue2] = useState("");
    const [day_crit_value, setDayCritValue] = useState("");
    const [analytical_window_value, setAnalyticalWindowValue] = useState("");
    const [device_value, setDeviceValue] = useState("");
    const [position_value, setPositionValue] = useState("");
    const [age_group_value, setAgeGroupValue] = useState("");
    const [cutpoints_value, setCutPointsValue] = useState([0, 0, 0]);
    const [detection_metric_value, setDetectionMetricValue] = useState("");
    const [boutTolInaAct_value, setBoutTolInaActtValue] = useState(0);
    const [boutTolLimAct_value, setBoutTolLimActValue] = useState(0);
    const [boutTolMVPA_value, setBoutTolMVPAValue] = useState(0);
    const [durInaAct1_value, setDurInaAct1Value] = useState("");
    const [durInaAct2_value, setDurInaAct2Value] = useState("");
    const [durInaAct3_value, setDurInaAct3Value] = useState("");
    const [durLimAct1_value, setDurLimAct1Value] = useState("");
    const [durLimAct2_value, setDurLimAct2Value] = useState("");
    const [durLimAct3_value, setDurLimAct3Value] = useState("");
    const [durMVPA1_value, setDurMVPA1Value] = useState("");
    const [durMVPA2_value, setDurMVPA2Value] = useState("");
    const [durMVPA3_value, setDurMVPA3Value] = useState("");
    
    // Sleep
    const [time_threshold_value, setTimeThresholdValue] = useState();
    const [angle_threshold_value, setAngleThresholdValue] = useState();
    const [ignore_non_wear_time_value, setIgnoreNonWearTimeValue] = useState();
    const [activityreport, setActivityReport] = useState(false);
    const [sleepreport, setSleepReport] = useState(false);
    const [visualisation, setVisualisation] = useState(false);
    const [epochlevel, setEpochLevel] = useState(false);
    const [overwrite, setoverwrite] = useState(false);
    const [hasib_value, setHasibValue] = useState();

    useEffect(() => {
        load_memory();
    }, []);

    function load_memory() {
        const sleep = localStorage.getItem('sleep_analysis')
        setSleepAnalysisValue(JSON.parse(localStorage.getItem('sleep_analysis')))

        if (JSON.parse(localStorage.getItem('time_zone')) !== "")
            setTimeZoneValue(JSON.parse(localStorage.getItem('time_zone'))['value']);
        setInputFileValue(JSON.parse(localStorage.getItem('input_file_name')));
        setOutputFileValue(JSON.parse(localStorage.getItem('output_file_name')));


        // Pre-Processing
        setWindows1Value(JSON.parse(localStorage.getItem('windows_1')));
        setWindows2Value(JSON.parse(localStorage.getItem('windows_2')));
        setWindows3Value(JSON.parse(localStorage.getItem('windows_3')));

        setAutoCalibrationValue(localStorage.getItem('auto_calib_stat'));
        setPaEnmoValue(localStorage.getItem('pa_enmo'));
        setPaMadValue(localStorage.getItem('pa_mad'));
        setPaHfenValue(localStorage.getItem('pa_hfen'));
        setPaEnValue(localStorage.getItem('pa_en'));
        setPaActilifeValue(localStorage.getItem('pa_actilife'));
        setProcChunkSizeValue(JSON.parse(localStorage.getItem('chunk_size')));

        // Activity

        const twin = JSON.parse(localStorage.getItem('time_window'))
        if (twin !== "" && twin !== 0) setTwindowValue(JSON.parse(localStorage.getItem('time_window'))['value']);

        const anstr = JSON.parse(localStorage.getItem('analytical_strategy'))
        if (anstr !== "" && anstr !== 0) setAnalyticalStrategyValue(JSON.parse(localStorage.getItem('analytical_strategy'))['value']);

        setStartOfPeriod(JSON.parse(localStorage.getItem('start_per_day')));
        setEndOfPeriod(JSON.parse(localStorage.getItem('end_per_day')));
        setQWinValue1(JSON.parse(localStorage.getItem('q_win_v1')));
        setQWinValue2(JSON.parse(localStorage.getItem('q_win_v2')));
        
        setDayCritValue(JSON.parse(localStorage.getItem('day_crit')));
        setAnalyticalWindowValue(JSON.parse(localStorage.getItem('analytical_window')));
        if (JSON.parse(localStorage.getItem('age_group')) !== "")
            setAgeGroupValue(JSON.parse(localStorage.getItem('age_group'))['value']);
        if (JSON.parse(localStorage.getItem('device')) !== "")
            setDeviceValue(JSON.parse(localStorage.getItem('device'))[0]['value'])
        if (JSON.parse(localStorage.getItem('position')) !== "")
            setPositionValue(JSON.parse(localStorage.getItem('position'))[0]['value']);

        if (JSON.parse(localStorage.getItem('cutpoints')) !== "") {
            const cutpoint_values = JSON.parse(localStorage.getItem('cutpoints'))[0]['value']
            const cutpoint_items = cutpoint_values.split(", ");
            const numArray = [];
            cutpoint_items.forEach(item => {
                const [label, value] = item.split(":");
                numArray.push(parseFloat(value));
            })

            setCutPointsValue(numArray)
        }

        if (JSON.parse(localStorage.getItem('detection_metric')) !== "")
            setDetectionMetricValue(JSON.parse(localStorage.getItem('detection_metric'))[0]['value'])

        setBoutTolInaActtValue(JSON.parse(localStorage.getItem('bout_tollorance_inactive')));
        setBoutTolLimActValue(JSON.parse(localStorage.getItem('bout_tollorance_lowactive')));
        setBoutTolMVPAValue(JSON.parse(localStorage.getItem('bout_tollorance_mvpa')));
        setDurInaAct1Value(JSON.parse(localStorage.getItem('duration_inactive1'))['value']);
        setDurInaAct2Value(JSON.parse(localStorage.getItem('duration_inactive2'))['value']);
        setDurInaAct3Value(JSON.parse(localStorage.getItem('duration_inactive3'))['value']);
        setDurLimAct1Value(JSON.parse(localStorage.getItem('duration_lowactive1'))['value']);
        setDurLimAct2Value(JSON.parse(localStorage.getItem('duration_lowactive2'))['value']);
        setDurLimAct3Value(JSON.parse(localStorage.getItem('duration_lowactive3'))['value']);
        setDurMVPA1Value(JSON.parse(localStorage.getItem('duration_mvpa1'))['value']);
        setDurMVPA2Value(JSON.parse(localStorage.getItem('duration_mvpa2'))['value']);
        setDurMVPA3Value(JSON.parse(localStorage.getItem('duration_mvpa3'))['value']);

        // Sleep
        if (sleep === 'true'){
            setTimeThresholdValue(JSON.parse(localStorage.getItem('time_threshold')));
            setAngleThresholdValue(JSON.parse(localStorage.getItem('angle_threshold')));
            setIgnoreNonWearTimeValue(localStorage.getItem('ignore_non_wear_time'));
            setHasibValue(JSON.parse(localStorage.getItem('hasib'))['value']);}
        else{
            setTimeThresholdValue("");
            setAngleThresholdValue("");
            setIgnoreNonWearTimeValue("");
            setHasibValue("");}
    }

    function changeActivityReport(event) {
        setActivityReport(activityreport => !activityreport)
    }

    function changeSleepReport() {
        setSleepReport(sleepreport => !sleepreport)
    }


    function changeVisualisation() {
        setVisualisation(visualisation => !visualisation)
    }


    function changeEpochLevel() {
        setEpochLevel(epochlevel => !epochlevel)
    }

    function changeOverwrite() {
        setoverwrite(overwrite => !overwrite)
    }

    function sendConfig() {

        let configurations = {
            "day_night": day_night_value,
            "time_zone": time_zone_value,
            "input_file_name": inputname_value,
            "output_file_name": outputname_value,
            "windows1_value": windows1_value,
            "windows2_value": windows2_value,
            "windows3_value": windows3_value,
            "auto_calibration_value": auto_calibration_value,
            "pa_enmo": pa_enmo_value,
            "pa_mad": pa_mad_value,
            "pa_hfen": pa_hfen_value,
            "pa_en": pa_en_value,
            "pa_actilife": pa_actilife_value,
            "proc_chunk_size_value": proc_chunk_size_value,
            "sleep_analysis_value": sleep_analysis_value,
            "time_window_value": time_window_value,
            "analytical_strategy_value": analytical_strategy_value,
            "startofperiod": startofperiod,
            "endOfperiod": endOfperiod,
            "q_win_v1_value": q_win_v1_value,
            "q_win_v2_value": q_win_v2_value,
            "day_crit": day_crit_value,
            "analytical_window_value": analytical_window_value,
            "device_value": device_value,
            "position_value": position_value,
            "age_group_value": age_group_value,
            "cutpoints_value": cutpoints_value,
            "detection_metric_value": detection_metric_value,
            "bout_tollorance_inactive":boutTolInaAct_value,
            "bout_tollorance_lowactive":boutTolLimAct_value,
            "bout_tollorance_mvpa":boutTolMVPA_value,
            "duration_inactive1":durInaAct1_value,
            "duration_inactive2":durInaAct2_value,
            "duration_inactive3":durInaAct3_value,
            "duration_lowactive1":durLimAct1_value,
            "duration_lowactive2":durLimAct2_value,
            "duration_lowactive3":durLimAct3_value,
            "duration_mvpa1":durMVPA1_value,
            "duration_mvpa2":durMVPA2_value,
            "duration_mvpa3":durMVPA3_value,
            "time_threshold_value": time_threshold_value,
            "angle_threshold_value": angle_threshold_value,
            "hasib":hasib_value,
            "ignore_non_wear_time_value": ignore_non_wear_time_value,
            "activityreport": activityreport,
            "sleepreport": sleepreport,
            "visualisation": visualisation,
            "epochlevel": epochlevel,
            "overwrite": overwrite
        }

        console.log(configurations)

        var data = JSON.stringify(configurations);

        var config = {
            method: 'post',
            url: 'http://localhost:8080/config',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    return (
        <>
        <table style={{ marginLeft: '10vh', marginRight: '5vh', height: '60vh' }}>
            <tr>
                <td className="cells-report">
                    <div style={{ textAlign: 'right' }}>
                        <IconButton color="primary" aria-label="upload picture" component="label" onClick={load_memory}> <RefreshIcon /> </IconButton>
                    </div>

                    <div style={{ textAlign: 'left', verticalAlign: 'top', marginLeft: '15px' }}>
                        <h5 style={{ listStyleType: 'disc' }}> ------- File -------</h5>
                        <li style={{ listStyleType: 'disc' }}> Input File ---
                            <span style={{ color: 'dodgerblue', fontSize: '12pt' }}>{inputname_value}</span>
                        </li>
                        <li style={{ listStyleType: 'disc' }}> Duration - Day - 24h ---
                            <span style={{ color: 'dodgerblue', fontSize: '12pt' }}>{day_night_value}</span>
                        </li>
                        <li style={{ listStyleType: 'disc' }}> Time Zone ---
                            <span style={{ color: 'dodgerblue', fontSize: '12pt' }}>{time_zone_value}</span>
                        </li>
                        <h5 style={{ listStyleType: 'disc' }}> ------- Pre-Processing -------</h5>
                        <li style={{ listStyleType: 'disc' }}> windows_1 ---
                            <span style={{ color: 'dodgerblue', fontSize: '12pt' }}>{windows1_value}</span>
                        </li>
                        <li style={{ listStyleType: 'disc' }}> windows_2---
                            <span style={{ color: 'dodgerblue', fontSize: '12pt' }}>{windows2_value}</span>
                        </li>
                        <li style={{ listStyleType: 'disc' }}> windows_3---
                            <span style={{ color: 'dodgerblue', fontSize: '12pt' }}>{windows3_value}</span>
                        </li>
                        <li style={{ listStyleType: 'disc' }}> Auto-Calibration---
                            <span style={{ color: 'dodgerblue', fontSize: '12pt' }}>{auto_calibration_value}</span>
                        </li>
                        <li style={{ listStyleType: 'disc' }}> Physical Activity Intensity Calculation Algorithm---
                            <span style={{ color: 'dodgerblue', fontSize: '12pt' }}>ENMO:{pa_enmo_value} ,MAD:{pa_mad_value} ,HFEN:{pa_hfen_value} ,EN:{pa_en_value} ,Acti-Life:{pa_actilife_value} </span>
                        </li>
                        <li style={{ listStyleType: 'disc' }}> Processing Chunk Size ---
                            <span style={{ color: 'dodgerblue', fontSize: '12pt' }}>{proc_chunk_size_value}</span>
                        </li>
                        <h5 style={{ listStyleType: 'disc' }}> ------- Activity -------</h5>
                        <li style={{ listStyleType: 'disc' }}> Sleep Analysis ---
                            <span style={{ color: 'dodgerblue', fontSize: '12pt' }}>{sleep_analysis_value}</span>
                        </li>
                        <li style={{ listStyleType: 'disc' }}> Time Window ---
                            <span style={{ color: 'dodgerblue', fontSize: '12pt' }}>{time_window_value}</span>
                        </li>
                        <li style={{ listStyleType: 'disc' }}> Analytical Strategy---
                            <span style={{ color: 'dodgerblue', fontSize: '12pt' }}>{analytical_strategy_value}</span>
                        </li>
                        <li style={{ listStyleType: 'disc' }}> Start day---
                            <span style={{ color: 'dodgerblue', fontSize: '12pt' }}>{startofperiod}</span>
                        </li>
                        <li style={{ listStyleType: 'disc' }}> End day---
                            <span style={{ color: 'dodgerblue', fontSize: '12pt' }}>{endOfperiod}</span>
                        </li>
                        <li style={{ listStyleType: 'disc' }}> Selection Periods_(Q window_1)---
                            <span style={{ color: 'dodgerblue', fontSize: '12pt' }}>{q_win_v1_value}</span>
                        </li>
                        <li style={{ listStyleType: 'disc' }}> Selection Periods_2(Q_window_2)---
                            <span style={{ color: 'dodgerblue', fontSize: '12pt' }}>{q_win_v2_value}</span>
                        </li>
                        <li style={{ listStyleType: 'disc' }}> Day Crit---
                            <span style={{ color: 'dodgerblue', fontSize: '12pt' }}>{day_crit_value}</span>
                        </li>
                        <li style={{ listStyleType: 'disc' }}> Analytical Window ---
                            <span style={{ color: 'dodgerblue', fontSize: '12pt' }}>{analytical_window_value[0]},{analytical_window_value[1]}</span>
                        </li>
                        <li style={{ listStyleType: 'disc' }}> Age-group---
                            <span style={{ color: 'dodgerblue', fontSize: '12pt' }}>{age_group_value}</span>
                        </li>
                        <li style={{ listStyleType: 'disc' }}> Device---
                            <span style={{ color: 'dodgerblue', fontSize: '12pt' }}>{device_value}</span>
                        </li>
                        <li style={{ listStyleType: 'disc' }}> Position---
                            <span style={{ color: 'dodgerblue', fontSize: '12pt' }}>{position_value}</span>
                        </li>
                        <li style={{ listStyleType: 'disc' }}> Cutpoints---
                            <span style={{ color: 'dodgerblue', fontSize: '12pt' }}>{cutpoints_value[0]},{cutpoints_value[1]},{cutpoints_value[2]}</span>
                        </li>
                        <li style={{ listStyleType: 'disc' }}> Detection metric ---
                            <span style={{ color: 'dodgerblue', fontSize: '12pt' }}>{detection_metric_value}</span>
                        </li>
                        <li style={{ listStyleType: 'disc' }}> Bout Tollorance---
                            <span style={{ color: 'dodgerblue', fontSize: '12pt' }}>In:{boutTolInaAct_value}, Low:{boutTolLimAct_value}, MVPA:{boutTolMVPA_value}</span>
                        </li>
                        <li style={{ listStyleType: 'disc' }}> Duration Inactive---
                            <span style={{ color: 'dodgerblue', fontSize: '12pt' }}>{durInaAct1_value},{durInaAct2_value},{durInaAct3_value}</span>
                        </li>
                        <li style={{ listStyleType: 'disc' }}> Duration Low-active---
                            <span style={{ color: 'dodgerblue', fontSize: '12pt' }}>{durLimAct1_value},{durLimAct2_value},{durLimAct3_value}</span>
                        </li>
                        <li style={{ listStyleType: 'disc' }}> Duration MVPA---
                            <span style={{ color: 'dodgerblue', fontSize: '12pt' }}>{durMVPA1_value},{durMVPA2_value},{durMVPA3_value}</span>
                        </li>
                        <h5 style={{ listStyleType: 'disc' }}> ------- Sleep -------</h5>
                        <li style={{ listStyleType: 'disc' }}> Time Threshold---
                            <span style={{ color: 'dodgerblue', fontSize: '12pt' }}>{time_threshold_value}</span>
                        </li>
                        <li style={{ listStyleType: 'disc' }}> Angle Threshold---
                            <span style={{ color: 'dodgerblue', fontSize: '12pt' }}>{angle_threshold_value}</span>
                        </li>
                        <li style={{ listStyleType: 'disc' }}> Ignore Non-wear Time---
                            <span style={{ color: 'dodgerblue', fontSize: '12pt' }}>{ignore_non_wear_time_value}</span>
                        </li>
                        <li style={{ listStyleType: 'disc' }}> HASIB Algorithm---
                            <span style={{ color: 'dodgerblue', fontSize: '12pt' }}>{hasib_value}</span>
                        </li>
                        <br />
                    </div>
                </td>
                <td className="cells-report">

                    <table style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                        <tr >
                            <td style={{
                                display: "flex",
                                justifyContent: "right"
                            }}>
                                <p style={{ marginTop: "10px" }}>Activity Report</p>
                            </td>
                            <td>
                                <Switch onChange={changeActivityReport} color="primary" />

                            </td>
                        </tr>
                        <tr>
                            <td style={{ display: "flex", justifyContent: "right" }}>
                                <p style={{ marginTop: "10px" }}>Sleep Report</p>
                            </td>
                            <td>
                                <Switch onChange={changeSleepReport} color="primary" />
                            </td>
                        </tr>
                        <tr>
                            <td style={{ display: "flex", justifyContent: "right" }}>
                                <p style={{ marginTop: "10px" }}>Visualisation</p>
                            </td>
                            <td>
                                <Switch onChange={changeVisualisation} color="primary" />
                            </td>
                        </tr>
                        <tr>
                            <td style={{ display: "flex", justifyContent: "right" }}>
                                <p style={{ marginTop: "10px" }}>Epoch Level Acc and Angle</p>
                            </td>
                            <td>
                                <Switch onChange={changeEpochLevel} color="primary" />
                            </td>
                        </tr>
                        <tr>
                            <td style={{ display: "flex", justifyContent: "right", alignItems: "center" }}>
                                <Tooltip
                                    className='tooltip'
                                    label="Only change the default value if you are familiar with this setting"
                                    placement='bottom'
                                    fontSize='xs'
                                    aria-label='A tooltip'><span style={{ color: 'black' }}>Overwrite </span>

                                </Tooltip>
                                <span style={{ color: 'dodgerblue', fontSize: '20pt' }}> *</span>
                            </td>
                            <td>
                                <Switch onChange={changeOverwrite} color="primary" />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2">
                                <br /><br />
                                <button onClick={sendConfig} className='confirm-button' >
                                    START
                                </button>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
        <br />
        </>
    )
}


        //const win1 = JSON.parse(localStorage.getItem('windows_1'))
        //if (win1 !== "" && win1 !== 0) 
        //const win2 = JSON.parse(localStorage.getItem('windows_2'))
        //if (win2 !== "" && win2 !== 0) 
        //const win3 = JSON.parse(localStorage.getItem('windows_3'))
        //if (win3 !== "" && win3 !== 0) 