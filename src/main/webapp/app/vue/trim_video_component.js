/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
Vue.component('trim_component', {

    template: `
        <div>
            <label for="checkbox" ref="label_checkbox">Trim Video Off :</label>
            <input type="checkbox" id="checkbox" ref="checkbox" name="cb_trim" value=" Trim Video" v-on:click="onChangeCheckBox">
            <br/>
            Start at: 
            <label ref = "input_start" name="input_start">{{calculateDuration(st)}}</label>
            End at:
            <label ref = "input_end" name="input_end">{{calculateDuration(se)}}
            
            </label>
                
            
        </div>
    `,
    props: ['duration_data', 'post_id', 'origin_url','st', 'se','total_duration'],
    data: {

        startAt: 0,
        endAt: 0,
        state: 0,
    },
    mounted() {
        var newObj = {
            "startAt": 0,
            "endAt": 0,
            "trim_on": false
        };
        this.$emit("trim_video", newObj);
        console.log("********** on Mounted trim_component");
    },
    methods: {
        onChangeCheckBox(e) {
            var state = e.target.checked;
            this.$refs.label_checkbox.textContent = state? "Trim Video On":"Trim Video Off";

            // this.$refs.input_start.disabled = !state;
            // this.$refs.input_end.disabled = !state;
            var newObj = {
                "startAt": this.$refs.input_start.textContent,
                "endAt": this.$refs.input_end.textContent,
                "trim_on": state
            };

            this.$emit("trim_video", newObj);

        },
        calculateDuration(value) {
            var total_duration = value;
            var minutes = Math.floor(total_duration / 60);
            var seconds = Math.floor(total_duration % 60);
            var hours = Math.floor(total_duration / 3600);

            var str_minutes = minutes < 10 ? "0" + minutes.toString() : minutes.toString();
            var str_seconds = seconds < 10 ? "0" + seconds.toString() : seconds.toString();
            var str_hours = hours < 10 ? "0" + hours.toString() : hours.toString();

            return str_hours + ":" + str_minutes + ":" + str_seconds;
        },
        onInputChange(value) {
            console.log(value);
            // var x = document.getElementById("fname");
            // x.value = x.value.toUpperCase();
        }

    },

});

//Vue.prototype.$myFunc = function calculateDuration(value) {
//    var total_duration = value;
//    var minutes = Math.round(total_duration / 60);
//    var seconds = Math.round(total_duration % 60);
//    var hours = Math.round(total_duration / 3600);
//
//    var str_minutes = minutes < 10 ? "0" + minutes.toString() : minutes.toString();
//    var str_seconds = seconds < 10 ? "0" + seconds.toString() : seconds.toString();
//    var str_hours = hours < 10 ? "0" + hours.toString() : hours.toString();
//
//    return str_hours + ":" + str_minutes + ":" + str_seconds;
//}Ï