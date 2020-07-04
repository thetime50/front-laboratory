<template>
<div class="component-vue-transition">
    <div class="transition">
        <h2>transition</h2>
        <el-button @click="switchTst = !switchTst">tst</el-button>
        <transition name="tst">
            <div class="tst" v-if="switchTst">
                dummy
            </div>
        </transition>
        <div class="show">
            <span class="v-enter">
                v-enter
            </span>
            <span class="v-enter-active">
                v-enter-active
            </span>
            <span class="v-enter-to">
                v-enter-to
            </span>
            <span class="v-leave">
                v-leave
            </span>
            <span class="v-leave-active">
                v-leave-active
            </span>
            <span class="v-leave-to">
                v-leave-to
            </span>
        </div>
    </div>
    <div>
        <h2>animation</h2>
    </div>
</div>
</template>

<script>
/* message */

export default {
    name: "vue-transition",
    data () {
        return {
            switchTst:true,
        };
    },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.component-vue-transition{
    .transition{
        .tst{
            position: absolute;
            width: 100%;
            background-color: rgba(255,150,0,1);//to
        }
        .tst-enter-active, .tst-leave-active {
            transition: background-color 3s;
        }
        .tst-enter, .tst-leave-to /* .fade-leave-active below version 2.1.8 */ {
            background-color: rgba(0, 0, 0,0);//to
        }

        // .v-leave-active{
        //     transition: background-color 3s;
        //     background-color: rgba(0,0,0,0);//to
        // }
        .show{
            margin-top: 20px;
            span{
                background-color: rgba(150,150,255,0.05);
                border: solid #44f 1px;
            }
        }
        .show{
            .v-enter,.v-leave{
            }
        }
        .tst-enter+.show .v-enter{
            background-color: rgba(150,150,255,1);
        }
        // .show:not(.show+.tst-enter) .v-enter{
        //     transition: background-color 3s;
        //     color: #f00;
        // }
        .tst-enter-active+.show .v-enter-active{
            background-color: rgba(150,150,255,1);
        }
        .tst-enter-to+.show .v-enter-to{
            background-color: rgba(150,150,255,1);
        }
        .tst-leave+.show .v-leave{
            background-color: rgba(150,150,255,1);
        }
        .tst-leave-active+.show .v-leave-active{
            background-color: rgba(150,150,255,1);
        }
        .tst-leave-to+.show .v-leave-to{
            background-color: rgba(150,150,255,1);
        }
    }
}
</style>