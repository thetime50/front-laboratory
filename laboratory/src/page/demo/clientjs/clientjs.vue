<template>
    <div class="component-clientjs">
        <div class="info">
            <p>
                <a href="https://github.com/jackspirou/clientjs">clientjs github</a>
            </p>
        </div>
        <el-table :data="data">
            <el-table-column label="说明" header-align="center" align="center">
                <template v-slot="{row, column, $index}">
                    {{annotation[row.fun]||'-'}}
                </template>
            </el-table-column>
            <el-table-column label="方法" prop="fun" header-align="center"></el-table-column>
            <el-table-column label="值" prop="val" header-align="center">
                <template v-slot="{row, column, $index}">
                    <template v-if="typeof row.val == 'string' && row.val.length>50">
                        <el-tooltip>
                            <!-- <template #content> -->
                                <pre slot="content">{{row.val}}</pre>
                            <!-- </template> -->
                            
                            <div>
                                <pre class="val-column">{{row.val}}</pre>
                                <img v-if="row.fun == 'getCanvasPrint'" :src="row.val" />
                            </div>
                        </el-tooltip>
                    </template>
                    <template v-else>
                        <pre class="val-column">{{row.val}}</pre>
                    </template>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    /* message */
    import ClientJS from "clientjs"

    export default {
        name: "clientjs",
        data () {
            return {
                data:[],
                annotation:{
                    getFingerprint:'用户指纹(UUID)'
                },
            };
        },
        created () {
            const client = new ClientJS()
            // console.log(Object.keys(client.__proto__))
            // Object.keys(client.__proto__).forEach((v)=>{
            //     console.log(v , typeof client[v])
            // })
            this.data = Object.keys(client.__proto__).map((v)=>{
                let val = (typeof client[v] == 'function')? client[v]() : client[v]
                console.log(v,val)
                if(typeof val == 'object'){
                    val = JSON.stringify(val,null,'  ')
                }
                return {
                    fun:v,
                    val: val
                }
            })
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .component-clientjs{
        .val-column{
            overflow : hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
        }
    }
    pre{
        text-align: left;
        max-width: 50vw;
        white-space: pre-wrap;
        word-wrap: break-word;
    }
</style>