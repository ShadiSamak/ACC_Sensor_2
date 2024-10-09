import { useState,useEffect } from 'react';
import Checkbox from '@mui/material/Checkbox';


export default function CheckboxButtonSet(props) {
    const [value, setValue] = useState({});
    const val = {}

    useEffect(()=>{
        for (var item=0;item < props.radioitems.length;item++ )
            val[props.radioitems[item]]=false;
        //console.log(val)
        setValue(val)
    }, []) 


    const handlephyActivitychangechild = (event) =>{
        let tm = event.target
        val.tm = !val.tm

        setValue(val)
        //console.log(val)
        props.change(event)
    }
    return (
        <div style={{display:'flex'}}>
            {props.radioitems.map((user) => ( <span><Checkbox  value={user} onChange={handlephyActivitychangechild}/>{user}  </span>  ))}
        </div>
    )
}
/*
import FormGroup from '@mui/material/FormGroup';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
                <FormControlLabel required control={<Checkbox />} label={user} />
onChange={this.handleChange} 

                onChange={handlephyActivitychangechild}>
                {
                    props.items.map(item=>{
                        <FormControlLabel value={item} control={<Radio />} label={item} />
                    })
                }


            <FormLabel id="demo-row-radio-buttons-group-label">{props.title}</FormLabel>
            <RadioGroup
                row
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={value}
                onChange={handlephyActivitychangechild}
            >
                <Checkbox defaultChecked={true} color="primary" />
                <FormControlLabel value="enmo" control={<Radio />} label="ENMO" />
                <FormControlLabel value="mad" control={<Radio />} label="MAD" />
                <FormControlLabel value="hfen" control={<Radio />} label="HFEN" />
                <FormControlLabel value="en" control={<Radio />} label="EN" />
                <FormControlLabel value="other" control={<Radio />} label="OTHER" />
            </RadioGroup>
*/