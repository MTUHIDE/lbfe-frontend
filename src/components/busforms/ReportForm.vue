<script>
export default {
    data() {
        return {
            startDate: '',
            endDate: '',
            cancellations: '',
            totalTransports: '',
            wheelChairVans: '',
            regionalTransports: ''
        }
    }
};
</script>

<template>
    <!-- <h1>This will eventually be the report log page that will be populated by all of the driver update logs.</h1> -->
    <div class="container reportGenerator">
        <form @submit.prevent="submitForm">
            <div class="row d-flex selectRow">Select Report Range</div>

            <div class="row d-flex justify-content-center dateRow">
               <div class="col-sm-6 col-xs-6">
                    <div class="dates">
                        <div class="dateText">Start Date:</div>
                        <input type="date" v-model="startDate">
                   </div>
               </div>
               <div class="col-sm-6 col-xs-6">
                    <div class="dates">
                        <div class="dateText">End Date:</div>
                        <input type="date" v-model="endDate">
                   </div>
               </div>
            </div>

            <div class="row d-flex justify-content-center valuesRow">
                <div class="col-6 colLeft">
                    <label>
                      <input type="checkbox" id="cancelBox" v-model="cancellations">
                      <div class="colLeftTextTop">Cancellations</div>
                    </label>
                </div>

                <div class="col-6 colRight">
                    <label>
                        <input type="checkbox" id="transportBox" v-model="totalTransports">
                        <div class="colRightTextTop">Total Transports</div>
                    </label>
                </div>
            </div>

            <div class="row d-flex justify-content-center valuesRow">
                <div class="col-6 colLeft">
                    <label>
                        <input type="checkbox" id="wheelChairBox" v-model="wheelChairVans"> 
                        <div class="colLeftTextBot">Wheelchair Vans</div>
                    </label>
                </div>

                <div class="col-6 colRight">
                    <label>
                        <input type="checkbox" id="regionalBox" v-model="regionalTransports"> 
                        <div class="colRightTextBot">Regional Transports</div>
                    </label>
                </div>
            </div>

            <div class="row d-flex justify-content-center align-items-center generateRow">
                <button type="submit" class="btn btn-primary generateButton" id="reportSubmit"> Generate Reports <i class="fas fa-clipboard-list"></i></button>
            </div>
        </form>
    </div>
</template>

<style scoped>
    .reportGenerator {
        margin-bottom: 1em;
        overflow: hidden;

        border-radius: 20px;
        max-width: 750px;

        box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
        background-color: rgb(245, 245, 245);
        padding: 0;
    }

    input[type=checkbox] {
        display: none;
    }

    input[type=date] {
        width: 100%;
        padding: 0.25em;
        border-radius: 5px;
        border: 1px solid rgb(207, 207, 207);
    }

    label :checked + div {
        background: #0d6efd;
        /* padding: 1.25em; */
        color: white;
    }

    label :checked + div:hover {
        background: #0c60df;
        /* padding: 1.25em; */
        color: white;
        box-shadow: 0 0.5em 0.5em -0.4em black;
        transform: translateY(-0.25em);
    }

    label div{
        background: lightgrey;
        height: 100%;
        width: 100%;
        padding: 1em;
        text-align: center;
        transition: all 0.3s;
    }

    label div:hover {
        background: rgb(177, 175, 175);
        box-shadow: 0 0.5em 0.5em -0.4em black;
        transform: translateY(-0.25em);
    }

    label {
        width: 100%;
        height: 100%;
    }

    .colLeftTextTop {
        border-radius: var(--fb-btn-radius) 0 0 0;
    }
    .colLeftTextBot {
        border-radius: 0 0 0 var(--fb-btn-radius);
    }

    .colRightTextTop {
        border-radius: 0 var(--fb-btn-radius) 0 0;
    }

    .colRightTextBot {
        border-radius: 0 0 var(--fb-btn-radius) 0;
    }

    .colLeft {
        padding: 0 var(--fb-btn-spacing) var(--fb-btn-spacing) 0.7em;
    }

    .colRight {
        padding: 0 0.75em var(--fb-btn-spacing) var(--fb-btn-spacing);
    }

    label:hover {
        cursor: pointer;
    }

    .row {
        padding: 1em 0 1em 0;
    }

    .valuesRow {
        padding: 0 1em 0 1em;
    }

    .dates {
        text-align: center;
    }

    .dateText {
        text-align: left;
    }

    .dateRow {
        padding: 2em 1em 2em 1em;
    }

    .generateButton {
        max-width: 350px;
        padding: 0.75em;
        margin-bottom: 10px;
        transition: all 0.3s;
        background: lightgrey;
        color: rgb(39, 39, 39);
        border: none;
    }

    .generateButton:hover,
    .generateButton:focus {
        box-shadow: inset 0 -3.25em 0 0 #0d6efd;
        color: white;
    }

    .generateRow {
        height: 100%;
        margin-top: 10px;
    }

    .selectRow {
        text-align: left;
        padding-left: 2em;
        margin: 0;
        background-color: rgb(155, 155, 155);
        color: rgb(39, 39, 39);
        font-size: 1.5em;
    }

    @media only screen and (max-width: 600px) {
        .generateButton {
            width: 70%;
        }

        .dates {
           text-align: center;
           margin-bottom: 10px; 
        }

        .dateRow {
            padding: 1.5em 1em 1.5em 1em;
        }
        
        .leftColContainer {
            display: flex;
            align-items: center;
        }

        .selectRow {
            padding-left: 0;
            justify-content: center;
            width: 100%;
        }

        .valuesRow {
            font-size: 0.95em;
            padding: 0 0.75em 0 0.75em;
        }

    }

</style>