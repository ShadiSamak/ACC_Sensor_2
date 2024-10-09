import '../styles/ppro.css'
import Select from 'react-select'
import CreatableSelect from 'react-select/creatable';
import React, { useState, useEffect } from "react";
import window from '../data/ppro.json'
import { Tooltip } from '@chakra-ui/react'
import CheckboxButtonSet from './CheckboxButtonSet'
import Slider from '@mui/material/Slider';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import sliderMarks from '../data/ppro2.json';


export default function PPro({ parentChangeActiveTab, ...rest }) {

    const windowoptions = window.map(w => ({
        "window": w.window,
        "data": w.data,
        "vals": w.vals
    }))

    // keeps the state for window1
    const [selectedlWindow_1, setWindow_1] = useState(5);
    const handleWindow1Change = (event) => { 
        const inputValue = event.target.value;
        if (isNaN(inputValue)) {
          alert('Please enter a numerical value.');
        } else {
          setWindow_1(inputValue);
        }}

    // keeps the state for window2
    const [selectedlWindow_2, setWindow_2] = useState(900);
    const handleWindow2Change = (event) => { 
        const inputValue = event.target.value;
        if (isNaN(inputValue)) {
          alert('Please enter a numerical value.');
        } else {
          setWindow_2(inputValue);
        }}

    // keeps the state for window3
    const [selectedlWindow_3, setWindow_3] = useState(3600);
    const handleWindow3Change = (event) => {
        const inputValue = event.target.value;
        if (isNaN(inputValue)) {
          alert('Please enter a numerical value.');
        } else {
          setWindow_3(inputValue);
        }}

    // keeps the state for auto calibration
    const [autocalibstat, setautocalibstat] = useState(false);
    const handleautocalibChange = (event) => { setautocalibstat(event.target.checked); }

    const [pa_enmo, setPaEnmo] = useState(false);
    const handlePaEnmoChange = (event) => { setPaEnmo(!pa_enmo); }

    const [pa_mad, setPaMad] = useState(false);
    const handlePaMadChange = (event) => { setPaMad(!pa_mad); }

    const [pa_hfen, setPaHfen] = useState(false);
    const handlePaHfenChange = (event) => { setPaHfen(!pa_hfen); }

    const [pa_en, setPaEn] = useState(false);
    const handlePaEnChange = (event) => { setPaEn(!pa_en); }

    const [pa_actilife, setPaActiLife] = useState(false);
    const handlePaActilifeChange = (event) => { setPaActiLife(!pa_actilife); }

    // keeps the value for the chunk size
    const [sliderVal, setSliderVal] = useState(1);
    const handlephyChunkSizechange = (value) => {
        setSliderVal(value);

    }

    useEffect(() => { localStorage.setItem('windows_1', JSON.stringify(selectedlWindow_1)); }, [selectedlWindow_1])
    useEffect(() => { localStorage.setItem('windows_2', JSON.stringify(selectedlWindow_2)); }, [selectedlWindow_2])
    useEffect(() => { localStorage.setItem('windows_3', JSON.stringify(selectedlWindow_3)); }, [selectedlWindow_3])
    useEffect(() => { localStorage.setItem("auto_calib_stat", JSON.stringify(autocalibstat)); }, [autocalibstat])

    useEffect(() => { localStorage.setItem("chunk_size", JSON.stringify(sliderVal)); }, [sliderVal])
    useEffect(() => { localStorage.setItem("pa_enmo", JSON.stringify(pa_enmo)); }, [pa_enmo])
    useEffect(() => { localStorage.setItem("pa_mad", JSON.stringify(pa_mad)); }, [pa_mad])
    useEffect(() => { localStorage.setItem("pa_hfen", JSON.stringify(pa_hfen)); }, [pa_hfen])
    useEffect(() => { localStorage.setItem("pa_en", JSON.stringify(pa_en)); }, [pa_en])
    useEffect(() => { localStorage.setItem("pa_actilife", JSON.stringify(pa_actilife)); }, [pa_actilife])

    return (
        <div className="mainBlock">
            <br /><br />
            <table className='pptable'>
                <td>
                    <tr>
                        <h3> Processing Window Settings:</h3>
                    </tr>
                    <br />
                    <br />
                    <tr>
                        <li style={{ listStyleType: 'square' }}>Window Settings</li>
                    </tr>
                    <br />
                    <tr>
                        <td className='pptablewintitle'>
                            <Tooltip
                                className='tooltip'
                                label={window[0].note}
                                placement='bottom'
                                fontSize='xs'
                                aria-label='A tooltip'><span style={{ color: 'black', fontWeight: 600 }}>Window_1</span>
                            </Tooltip>
                            <span style={{ color: 'dodgerblue', fontSize: '20pt' }}> *</span>
                        </td>
                        <td className='pptableinbox'>
                            <input
                                value={selectedlWindow_1}
                                className="pprolistbox"
                                onChange={handleWindow1Change} />
                        </td>
                        
                        <td className='pptablewintitle'>
                            <Tooltip
                                className='tooltip'
                                label={window[1].note}
                                placement='bottom'
                                fontSize='xs'
                                aria-label='A tooltip'><span style={{ color: 'black', fontWeight: 600 }}>Window_2</span>
                            </Tooltip>
                            <span style={{ color: 'dodgerblue', fontSize: '20pt' }}> *</span>
                        </td>
                        <td>
                            <input
                                value={selectedlWindow_2}
                                className="pprolistbox"
                                onChange={handleWindow2Change} />
                        </td>

                        <td className='pptablewintitle'>
                            <Tooltip
                                className='tooltip'
                                label={window[2].note}
                                placement='bottom'
                                fontSize='xs'
                                aria-label='A tooltip'><span style={{ color: 'black', fontWeight: 600 }}>Window_3</span>
                            </Tooltip>
                            <span style={{ color: 'dodgerblue', fontSize: '20pt' }}> *</span>
                        </td>
                        <td>
                            <input
                                value={selectedlWindow_3}
                                className="pprolistbox"
                                onChange={handleWindow3Change} />
                        </td>

                    </tr>
                </td>
            </table>
            <br />
            <table>
                <tr>
                    <td style={{ width: '35vh' }} className='pptitle'>
                        <li style={{ listStyleType: 'square' }}>Auto-Calibration<span style={{ fontStyle: 'italic' }}>(Recommended)</span></li>
                    </td>
                    <td style={{ width: '20vh' }} >
                        <FormControlLabel
                            value="start"
                            control={<Switch checked={autocalibstat} onChange={handleautocalibChange} color="primary" />} />
                    </td>
                </tr>
            </table>
            <table className='pptable'>
                <tr>
                    <td>
                        <br />

                        <tr>
                            <td className='pptitle'>
                                <li style={{ listStyleType: 'square' }}>Physical Activity Intensity Calculation Algorithm:</li>
                            </td>
                            <td >
                                <div style={{ display: 'flex' }}>
                                    <label style={{ display: 'flex', alignItems: 'center', marginRight: '20px' }}>
                                        <input
                                            type='checkbox'
                                            checked={pa_enmo}
                                            onChange={handlePaEnmoChange}
                                            style={{ width: '25px', height: '25px', marginRight: '5px' }}
                                        /> ENMO
                                    </label>
                                    <label style={{ display: 'flex', alignItems: 'center', marginRight: '20px' }}>
                                        <input
                                            type='checkbox'
                                            checked={pa_mad}
                                            onChange={handlePaMadChange}
                                            style={{ width: '25px', height: '25px', marginRight: '5px' }}
                                        /> MAD
                                    </label>
                                    <label style={{ display: 'flex', alignItems: 'center', marginRight: '20px' }}>
                                        <input
                                            type='checkbox'
                                            checked={pa_hfen}
                                            onChange={handlePaHfenChange}
                                            style={{ width: '25px', height: '25px', marginRight: '5px' }}
                                        /> HFEN
                                    </label>

                                    <label style={{ display: 'flex', alignItems: 'center', marginRight: '20px' }}>
                                        <input
                                            type='checkbox'
                                            checked={pa_en}
                                            onChange={handlePaEnChange}
                                            style={{ width: '25px', height: '25px', marginRight: '5px' }}
                                        /> EN
                                    </label>

                                    <label style={{ display: 'flex', alignItems: 'center', marginRight: '20px' }}>
                                        <input
                                            type='checkbox'
                                            checked={pa_actilife}
                                            onChange={handlePaActilifeChange}
                                            style={{ width: '25px', height: '25px', marginRight: '5px' }}
                                        /> ActiLife(Neishabouri)
                                    </label>
                                </div>
                            </td>
                        </tr>
                        <br />
                        <tr style={{ width: '100%' }}>
                            <td style={{ width: '20vh' }}>
                                <li style={{ listStyleType: 'square' }}>
                                    <Tooltip
                                        className='tooltip'
                                        label='For machines with less than 4Gb of RAM memory a value below 1 is recommended'
                                        placement='bottom'
                                        fontSize='xs'
                                        aria-label='A tooltip'>Processing Chunk Size</Tooltip>
                                    <span style={{ color: 'dodgerblue', fontSize: '20pt' }}> *</span>
                                </li>
                            </td>
                            <td style={{ width: '20vh' }}>
                                <input
                                    className='valuebox'
                                    type="text"
                                    id="country"
                                    name="country"
                                    value={sliderVal}
                                    readonly />
                            </td>
                            <td style={{ width: '40vh', paddingTop: "15pt" }}>
                                <Slider
                                    onChange={e => { handlephyChunkSizechange(e.target.value) }}
                                    defaultValue={1}
                                    aria-labelledby="discrete-slider-small-steps"
                                    step={0.1}
                                    min={0.2}
                                    max={1.0}
                                    valueLabelDisplay="auto"
                                    size="small"
                                    aria-label="Small"
                                    marks={sliderMarks.sliderMarks2}
                                />
                            </td>
                        </tr>


                    </td>
                </tr>
            </table>
            <table className='pptable'>
                <tr>
                    <td style={{ width: '100%', height: '8vh', textAlign: 'right', verticalAlign: 'middle' }}>
                        <div style={{ marginRight: '30px' }}></div>
                    </td>

                </tr>
            </table>
        </div>
    )
}

/*

 //<CheckboxButtonSet change={handlephyActivitychange} radioitems={['ENMO', 'MAD', 'HFEN', 'EN', 'ActiLife(Neishabouri)']} />

    const [pa_mad, setPaMad]= useState(false);
    const handlePaMadChange = (event) => { setPaMad(event.target.value); }


useEffect(() => { localStorage.setItem("PAICA", JSON.stringify(phyActivity));}, [phyActivity])


                            <a style={{ fontSize: 20 }} onClick={() => parentChangeActiveTab("file")} >  {'\u2B05'}   PREV  |</a>
                            <a style={{ fontSize: 20 }} onClick={() => parentChangeActiveTab("activity")}>NEXT {'\u27A1'}</a>

                            <Select id={"Timebox_Eventlister"}
                                options={window[0].vals}
                                defaultValue={window[0].vals[1]}
                                value={selectedlWindow_1}
                                onChange={handleWindow1Change}
                                className="pprolistbox" />
                            
                            <Select id={"Timebox_Eventlister"}
                                options={window[1].vals}
                                value={selectedlWindow_2}
                                defaultValue={window[1].vals[1]}
                                onChange={handleWindow2Change}
                                className="pprolistbox" />

                            <Select id={"Timebox_Eventlister"}
                                options={window[2].vals}
                                value={selectedlWindow_3}
                                defaultValue={window[2].vals[2]}
                                onChange={handleWindow3Change}
                                className="pprolistbox" />

*/