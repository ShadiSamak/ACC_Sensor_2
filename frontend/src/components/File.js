import '../styles/file.css'
import { useState, useEffect } from "react";
import axios from 'axios';
import Select from 'react-select';
import tmzone from '../data/timezones.json'
import Switch from '@mui/material/Switch';

const { uniqueNamesGenerator, adjectives, colors, animals } = require('unique-names-generator');

export default function File({ parentChangeActiveTab, ...rest }) {

    // Sleep Analysis
    const [sleepAnalysis, setSleepAnalysis] = useState(false)
    const handleSleepAnalysisChange = (event) => { setSleepAnalysis(event.target.checked); }

    const tmzoneoptions = tmzone.map(t => ({
        "label": t.Country_City_Code,
        "value": t.Country_City_Code
    }))

    const [selectedTime, setSelectedTime] = useState({ "label": "Australia/Melbourne", "value": "Australia/Melbourne" });

    const shortName = uniqueNamesGenerator({
        dictionaries: [adjectives, animals, colors], // colors can be omitted here as not used
        length: 3
    })// + ".R";


    function handleTmZoneChange(event) {
        setSelectedTime(event)
    }

    const [file, setFile] = useState([]);
    const [outputfile, setoutputfile] = useState(shortName);

    function inputFileClick(event) {
        console.log(event.target.files[0])
    }

    function changeHandler(event) {
        const formData = new FormData();
        formData.append("file", event.target.files[0]);
        console.log(event.target.files[0])
        setFile(event.target.files[0].name);

        axios({
            method: 'post',
            url: 'http://localhost:8080/input',
            data: formData,
            config: { headers: { 'Content-Type': 'multipart/form-data' } }
        })
            .then(response => console.log(response))
            .catch(errors => console.log(errors))

    }

    function upnamechangeHandler(event) {
        const file_name = event.target.value
        setoutputfile(file_name)
    }

    // Store in memory
    useEffect(() => { localStorage.setItem('input_file_name', JSON.stringify(file)); }, [file])
    useEffect(() => { localStorage.setItem('time_zone', JSON.stringify(selectedTime)); }, [selectedTime])
    useEffect(() => { localStorage.setItem('output_file_name', JSON.stringify(outputfile)); }, [outputfile])
    useEffect(() => {
        localStorage.setItem('sleep_analysis', JSON.stringify(sleepAnalysis));
        console.log(sleepAnalysis)
    }, [sleepAnalysis])

    return (
        <div className="mainBlock">
            <br /><br />
            <h3> Data source and export files</h3>
            <br />
            <div className="gap" />
            <div className="textblock">

                <span style={{ fontSize: '15pt' }}> Sleep Analysis</span>
                <Switch
                    checked={sleepAnalysis}
                    onChange={handleSleepAnalysisChange}
                    inputProps={{ 'aria-label': 'controlled' }}
                />
                <br /><br />
                <h4>TimeZone: </h4>
                <Select 
                    styles={{
                        container: (provided) => ({
                            ...provided,
                            width: '10vw',  // Set the width to your desired value
                            minWidth: '300px' // Optional: Set a minimum width
                        }),
                        control: (provided) => ({
                            ...provided,
                            width: '100%', // Ensure the control takes full width of the container
                        }),
                    }} 
                    id={"Timezone_Eventlister"}
                    options={tmzoneoptions}
                    defaultValue={tmzoneoptions[6]}
                    value={selectedTime}
                    onChange={handleTmZoneChange}
                    className="pprolistbox" />

                <br />
                <h4>Input Folder: </h4>
                <br />
                <input
                    type="file"
                    className="butttons"
                    name="dirUpload"
                    webkitdirectory="true"
                    onChange={changeHandler}
                    onClick={inputFileClick}
                />
                <br /><br />
                <h4>Output File Name: </h4>
                <br />
                <input type="text" style={{ width: '40vh' }} defaultValue={shortName} onChange={upnamechangeHandler} />
                <p style={{ fontStyle: 'italic' }}>Stored Location : app_location/output/{outputfile}</p>

            </div>

        </div>
    )
}

/*
import DayNightSwitch from './DaynightSwitch';
<a style={{ display: 'flex', paddingRight: '10px', justifyContent: 'flex-end', fontSize: 20 }} onClick={() => parentChangeActiveTab("preprocessing")} >  NEXT  {'\u27A1'}</a>
                <br />
                <h4>Collected Data for: </h4>
                <DayNightSwitch t1="Day" t2="24 Hours" onClick={changeDataDur} />
    const [dataDur, setdataDur] = useState(24);


    function changeDataDur(e) {
        if (e.target.checked == false) setdataDur(12)
        else setdataDur(24)
    }
    useEffect(() => { localStorage.setItem('day_night', JSON.stringify(dataDur)); }, [dataDur])
                */