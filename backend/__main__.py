import flask
from flask import Flask, request, send_from_directory, send_file
from flask_cors import CORS
import subprocess
import json
import os
# app = flask.Flask(__name__)
# path = "frontend"

# @app.route("/")
# def sd_index():
# send_from_directory(app.static_folder+ '/' + path, 'index.html')
#    return flask.render_template("index.html" ,token="Hello Flask-React")

input_file = None
app = flask.Flask(__name__, static_url_path='',
                  static_folder='../frontend/build')
#comment this on deployment
CORS(app, origins=['http://localhost:3000'])
# api = Api(app)

@app.route("/test", methods={'GET'})
def test():
    return "Success!"
    #return render_template('index.html')

@app.route("/", defaults={'path': ''})
def serve(path):
    return send_from_directory(app.static_folder, 'index.html')
    #return render_template('index.html')

@app.route('/input', methods=['POST'])
def upload_file():
    
    try :    
        uploaded_file = request.files['file']

        input_file_path = os.getcwd()
        input_file_path_url = os.path.dirname(input_file_path)+'/inputfile/input.csv'#+uploaded_file.filename
        print(input_file_path_url)
        
        if uploaded_file.filename != '':
            message = uploaded_file.filename
            with open(input_file_path_url, 'w') as f:    
                uploaded_file.save(input_file_path_url)
                input_file = uploaded_file
        return uploaded_file.filename
    except Exception as inst:
         print(type(inst))    # the exception instance
         print(inst.args)     # arguments stored in .args
         print(inst)  
         return str(inst)
    return message

def run_r_script(script_path):
    try:
        # Run the R script
        result = subprocess.run(['Rscript', script_path], check=True, capture_output=True, text=True)       
        
        return {
            "stdout": result.stdout,
            "stderr": result.stderr,
            "returncode": result.returncode
        }
    except subprocess.CalledProcessError as e:
        print(f"An error occurred while running the R script: {e}")
        return {
            "error": str(e),
            "stdout": e.stdout,
            "stderr": e.stderr,
            "returncode": e.returncode
        }

@app.route('/config', methods=['POST'])
def config():   
    data={}
    if request.method == 'POST':
   
        data = request.data.decode('utf-8') 
        data_json = json.loads(data)
        #print(data_json)
        day_night_value = data_json["day_night"]
        time_zone_value = data_json["time_zone"]

        if input_file is not None:
            input_file_name = input_file
        else:
            input_file_name = data_json['input_file_name']    

        input_file_name = os.getcwd()
        input_file_name = os.path.dirname(input_file_name)+"/inputfile/input.csv"
        print(input_file_name)

        output_file_name =data_json['output_file_name']
        windows1_value = 5 if (data_json['windows1_value']=="0" or data_json['windows1_value']=="") else data_json['windows1_value']
        windows2_value = 9 if (data_json['windows2_value']=="0" or data_json['windows2_value']=="") else data_json['windows2_value']
        windows3_value = 3600 if (data_json['windows3_value']=="0" or data_json['windows3_value']=="") else data_json['windows3_value']
        auto_calibration_value =data_json['auto_calibration_value'].upper()
        pa_enmo_value =data_json['pa_enmo'].upper()
        pa_enmo_value =data_json['pa_enmo'].upper()
        pa_mad_value =data_json['pa_mad'].upper()
        pa_hfen_value =data_json['pa_hfen'].upper()
        pa_en_value =data_json['pa_en'].upper()
        pa_actilife_value =data_json['pa_actilife'].upper()
        proc_chunk_size_value =data_json['proc_chunk_size_value']
        sleep_analysis_value =data_json['sleep_analysis_value']
        time_window_value =data_json['time_window_value'] if data_json['time_window_value'] != "" else "MM"
        analytical_strategy_value =data_json['analytical_strategy_value']
        startofperiod =data_json['startofperiod']
        endOfperiod =data_json['endOfperiod']
        q_win_v1_value =data_json['q_win_v1_value']
        q_win_v2_value =data_json['q_win_v2_value']
        day_crit_value =data_json['day_crit']
        analytical_window_value =data_json['analytical_window_value']
        device_value =data_json['device_value']
        position_value =data_json['position_value']
        age_group_value =data_json['age_group_value']
        cutpoints_value =data_json['cutpoints_value']
        detection_metric_value =data_json['detection_metric_value']
        boutTolInaAct_value= int(data_json['bout_tollorance_inactive'])
        boutTolLimAct_value= int(data_json['bout_tollorance_lowactive'])
        boutTolMVPA_value=int(data_json['bout_tollorance_mvpa'])
        durInaAct1_value=int(data_json['duration_inactive1'])
        durInaAct2_value=int(data_json['duration_inactive2'])
        durInaAct3_value=int(data_json['duration_inactive3'])
        durLimAct1_value=int(data_json['duration_lowactive1'])
        durLimAct2_value=int(data_json['duration_lowactive2'])
        durMVPA1_value=int(data_json['duration_mvpa1'])
        durMVPA2_value=int(data_json['duration_mvpa2'])
        time_threshold_value=data_json['time_threshold_value']
        angle_threshold_value =data_json['angle_threshold_value']
        hasib_value = data_json['hasib']
        ignore_non_wear_time_value =data_json['ignore_non_wear_time_value']
        activityreport =data_json['activityreport']
        sleepreport =data_json['sleepreport']
        visualisation =data_json['visualisation']
        epochlevel =data_json['epochlevel']
        overwrite = data_json['overwrite']
        
        ## Additional conditions
        day_night_value_con = "c(1,2,3,4,5)" if day_night_value == 24 else "c(1,2,5)"
        
        current_dir = os.getcwd()
        current_dir = os.path.dirname(current_dir)
        output_dir = os.path.join(current_dir, "output")
        #output_file_name = "leading_falcon_scarlet"  
        output_path = os.path.join(output_dir, f"{output_file_name}.R")
        #print("CURRENT:" +output_path)

        rScript = f"""

options(repos = c(CRAN = "https://cloud.r-project.org"))

if (!requireNamespace("GGIR", quietly = TRUE)) {{
    install.packages("GGIR")
}}

# Load the GGIR package
library(GGIR)

GGIR(
    mode={day_night_value_con},
    datadir="{input_file_name}",
    outputdir="{output_path}",               
    do.imp=TRUE,
    idloc=2,
    print.filename= TRUE,
    desiredtz = "{time_zone_value}",
    overwrite="{overwrite}",
    storefolderstructure=TRUE,
    windowsizes = c({windows1_value},{windows2_value},{windows3_value}),
    do.cal = {auto_calibration_value}, 
    do.anglez=5,
    do.enmo={pa_enmo_value},
    do.mad={pa_mad_value},
    do.hfen={pa_hfen_value},
    do.en={pa_en_value},
    do.neishabouricounts = {pa_actilife_value},
    chunksize={proc_chunk_size_value},
    print.summary=TRUE,
    strategy = {analytical_strategy_value},
    hrs.del.start = {startofperiod},
    hrs.del.end = {endOfperiod},
    maxdur = 0,
    includedaycrit = {day_crit_value},
    qwindow=c({q_win_v1_value},{q_win_v2_value}),
    mvpathreshold =c({cutpoints_value[0]}, {cutpoints_value[1]}, {cutpoints_value[2]}),
    mvpadur = c({durInaAct1_value},{durInaAct2_value},{durInaAct3_value}),
    bout.metric = 6,
    boutcriter.mvpa = c({boutTolInaAct_value}),
    closedbout=FALSE,
    M5L5res = 10,
    winhr = c(1,5),
    ilevels = c(0, 50, 100, 150, 200, 250, 300, 350, 700, 8000),
    excludefirstlast = TRUE,
    includenightcrit = 16,
    iglevels = TRUE,
    MX.ig.min.dur = 1,
    qlevels = c( 960/1440, 1320/1440, 1380/1440, 1410/1440, 1425/1440, 1435/1440),
    
    timetreshold={time_threshold_value},
    anglethreshold={angle_threshold_value},
    ignorenonwear={ignore_non_wear_time_value}, 
    HASIB.algo = {hasib_value},
    def.noc.sleep = 1, 
    outliers.only = FALSE,
    criterror = 4,
    do.visual = TRUE,
    threshold.lig = c({cutpoints_value[0]}),
    threshold.mod = c({cutpoints_value[1]}),
    threshold.vig = c({cutpoints_value[2]}),
    boutcriter = {boutTolInaAct_value},
    boutcriter.in = {boutTolLimAct_value},
    boutcriter.lig = {boutTolMVPA_value},

    boutdur.in = c({durInaAct1_value},{durInaAct2_value},{durInaAct3_value}),
    boutdur.lig = c({durLimAct1_value},{durLimAct2_value}),
    boutdur.mvpa = c({durMVPA1_value},{durMVPA2_value}),

    timewindow = c("{time_window_value}"),
    includedaycrit.part5 = 2/3,
    frag.metrics="all", 
    part5_agg2_60seconds=TRUE,
    do.report=c(2,5),
    visualreport={visualisation},
    dofirstpage=TRUE,
    epochvalues2csv=TRUE,
    viewingwindow=1
    )
    """
    #print(rScript)
    
    with open(output_path, 'w') as f:
        f.write(rScript)
        send_file(output_path)
        # Run the R script
        result = run_r_script(output_path)
        print(result)
        return result #


if __name__ == "__main__":
    app.run(host='0.0.0.0',port=8080)


####
#    HASIB.algo = ,// combo box -> “vanHees2015”/“Sadeh1994”/“ColeKripke1992”/“Galland2012”/"NotWorn"

        # mode="{day_night_value_con}",//should it be based on sleep analysis or day/night
        #chunksize=1,//no one would change this. the default is = 1 ->  Numeric (default = 1). Value between 0.2 and 1 to specificy the size of chunks to be loaded as a fraction of a 12 hour period,  e.g., 0.5 equals 6 hour chunks, 1 equals 12 hour chunks. For machines with less than 4Gb of RAM memory a value below 1 is recommended.
        # strategy = {analytical_strategy_value}, // strategy 1-> Select DB of start and end Strategy 2-> Midnight - midnight --> below time selection to be deactivated for strategy 2
        # includenightcrit = 16, // how many hours do we need ...? require a slider


       # , border: '1px solid black', borderCollapse: 'collapse' 

           #qwindow=c({analytical_window_value[0]},{analytical_window_value[1]}),