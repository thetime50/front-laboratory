<template>
    <div class="component-vue-tilt">
        <div class="title-cube" v-tilt ></div>
    </div>
</template>

<script>
    /* message */
const tcfg = 
`
{
    reverse:                false,  // reverse the tilt direction
    max:                    35,     // max tilt rotation (degrees)
    startX:                 0,      // the starting tilt on the X axis, in degrees.
    startY:                 0,      // the starting tilt on the Y axis, in degrees.
    perspective:            1000,   // Transform perspective, the lower the more extreme the tilt gets.
    scale:                  1,      // 2 = 200%, 1.5 = 150%, etc..
    speed:                  300,    // Speed of the enter/exit transition
    transition:             true,   // Set a transition on enter/exit.
    axis:                   null,   // What axis should be disabled. Can be X or Y.
    reset:                  true,   // If the tilt effect has to be reset on exit.
    easing:                 "cubic-bezier(.03,.98,.52,.99)",    // Easing on enter/exit.
    glare:                  false,  // if it should have a "glare" effect
    "max-glare":            1,      // the maximum "glare" opacity (1 = 100%, 0.5 = 50%)
    "glare-prerender":      false,  // false = VanillaTilt creates the glare elements for you, otherwise
                                    // you need to add .js-tilt-glare>.js-tilt-glare-inner by yourself
    "mouse-event-element":  null,   // css-selector or link to HTML-element what will be listen mouse events
    gyroscope:              true,   // Boolean to enable/disable device orientation detection,
    gyroscopeMinAngleX:     -45,    // This is the bottom limit of the device angle on X axis, meaning that a device rotated at this angle would tilt the element as if the mouse was on the left border of the element;
    gyroscopeMaxAngleX:     45,     // This is the top limit of the device angle on X axis, meaning that a device rotated at this angle would tilt the element as if the mouse was on the right border of the element;
    gyroscopeMinAngleY:     -45,    // This is the bottom limit of the device angle on Y axis, meaning that a device rotated at this angle would tilt the element as if the mouse was on the top border of the element;
    gyroscopeMaxAngleY:     45,     // This is the top limit of the device angle on Y axis, meaning that a device rotated at this angle would tilt the element as if the mouse was on the bottom border of the element;
}
`
// const re = RegExp("^.*$","g");
// console.log('re.exec(str)', re.exec(tcfg))

    function testRow(){
        // 
    }
    function exexRow(){
        // 
    }
    const objParse={
        exexObj(str){
            let obj = {}
            let rows = str.split(/(\r\n)|(\n)/)
            for(let row of rows){
                // console.log('rowRes', rowRes)
            }
            // let row = getRow()
        },
    }
    export default {
        name: "vue-tilt",
        data () {
            return {
                tiltCfg:objParse.exexObj(tcfg),
            };
        },
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .component-vue-tilt{
        
    }
    .title-cube{
        width: 300px;
        height: 250px;
        background-image: linear-gradient(150deg, #5a00ff 0%, #ff1ff7 100%, #ff1ff7 100%);
    }
</style>