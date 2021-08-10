<template>
    <div class="component-qs">
        <div class="info">
            qs 附加安全性的查询字符串解析和字符串化库<br>
            <a href="https://github.com/ljharb/qs">github</a> <br>
            <a href="https://www.npmjs.com/package/qs">npm</a> <br>
            <a href="https://storm4542.github.io/archives/7b89c88d.html">QS中文文档 2018</a>
        </div>
        <div>
            ps <br>
            <a href="https://segmentfault.com/q/1010000009976954">Object.create(null) 和 {} 区别是什么</a>
        </div>
        <div>
            <h2>str 2 obj</h2>
            <el-table :data="list">
                <el-table-column label="说明" header-align="center"
                    :formatter="(row, column, cellValue, index)=> row.desc || '-'">
                </el-table-column>
                <el-table-column label="调用" prop="calltext" header-align="center">
                    </el-table-column>
                <el-table-column label="结果" prop="fun" header-align="center">
                    <template v-slot="{row, column, $index}">
                        {{row.fun()}}
                    </template>
                    </el-table-column>
            </el-table>
        </div>
        <div>
            <h2>obj 2 str</h2>
            <el-table :data="list2">
                <el-table-column label="说明" header-align="center"
                    :formatter="(row, column, cellValue, index)=> row.desc || '-'">
                </el-table-column>
                <el-table-column label="调用" prop="calltext" header-align="center">
                    </el-table-column>
                <el-table-column label="结果" prop="fun" header-align="center">
                    <template v-slot="{row, column, $index}">
                        {{row.fun()}}
                    </template>
                    </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    /* message */
    import qs from 'qs'
    // import assert from 'assert'

    export default {
        name: "qs",
        data () {
            return {
                list:[
                    {
                        desc:'使用',
                        calltext:`qs.parse('a=1&b=2')`,
                        fun:()=>qs.parse('a=1&b=2'),
                    },
                    {
                        desc:'原型-不继承原型',
                        calltext:`qs.parse("a[hasOwnProperty]=b", { plainObjects: true })`,
                        // fun:()=>qs.parse("a[hasOwnProperty]=b", { plainObjects: true }),
                        fun:()=>'类似 Object.create(null) 的对象 没有继承原型',
                    },
                    {
                        desc:'原型-有原型',
                        calltext:`qs.parse("a[hasOwnProperty]=b", {allowPrototypes: true})`,
                        fun:()=>qs.parse("a[hasOwnProperty]=b", {allowPrototypes: true}),
                    },
                    {
                        desc:'嵌套',
                        calltext:`qs.parse('a[b][c]=j')`,
                        fun:()=>qs.parse('a[b][c]=j'),
                    },
                    {
                        desc:'嵌套-限制深度',
                        calltext:`qs.parse('a[b][c][d][e][f][g][h][i]=j', { depth: 1 })`,
                        fun:()=>qs.parse('a[b][c][d][e][f][g][h][i]=j', { depth: 1 }),
                    },
                    {
                        desc:'限制数量',
                        calltext:`qs.parse('a=b&c=d', { parameterLimit: 1 })`,
                        fun:()=>qs.parse('a=b&c=d', { parameterLimit: 1 }),
                    },

                    {
                        desc:'去除QueryFix',
                        calltext:`qs.parse('?a=b&c=d', { ignoreQueryPrefix: true })`,
                        fun:()=>qs.parse('?a=b&c=d', { ignoreQueryPrefix: true }),
                    },
                    {
                        desc:'设置分隔符',
                        calltext:`qs.parse('a=b;c=d', { delimiter: ';' })`,
                        fun:()=>qs.parse('a=b;c=d', { delimiter: ';' }),
                    },
                    {
                        desc:'设置分隔符-正则',
                        calltext:`qs.parse('a=b;c=d,e=f', { delimiter: /[;,]/ })`,
                        fun:()=>qs.parse('a=b;c=d,e=f', { delimiter: /[;,]/ }),
                    },
                    {
                        desc:'用 dots 嵌套',
                        calltext:`qs.parse('a.b=c', { allowDots: true })`,
                        fun:()=>qs.parse('a.b=c', { allowDots: true }),
                    },

                    {
                        desc:'str 2 arr',
                        calltext:``,
                        fun:()=>'',
                    },
                    {
                        desc:'使用 [] 生成数组',
                        calltext:`qs.parse('a[]=b&a[]=c')`,
                        fun:()=>qs.parse('a[]=b&a[]=c'),
                    },
                    {
                        desc:'指定index',
                        calltext:`qs.parse('a[1]=c&a[0]=b&a[4]=d')`,
                        fun:()=>qs.parse('a[1]=c&a[0]=b&a[4]=d'),
                    },
                    {
                        desc:'数组索引<20总是压缩索引间隔',
                        calltext:`qs.parse('a[1]=c&a[15]=b')`,
                        fun:()=> qs.parse('a[1]=c&a[15]=b'),
                    },
                    {
                        desc:'allowSparse 不压缩数组',
                        calltext:`qs.parse('a[1]=2&a[3]=5',{ allowSparse: true })`,
                        fun:()=> qs.parse('a[1]=2&a[3]=5',{ allowSparse: true }),
                    },
                    {
                        desc:'索引>20回转为对象',
                        calltext:`qs.parse('a[2]=c&a[21]=b')`,
                        fun:()=> qs.parse('a[2]=c&a[21]=b'),
                    },
                ],
                list2:[
                    {
                        desc:'-',
                        calltext:`-`,
                        fun:()=>1,
                    },
                ]
            };
        },
        created () {
            console.log('plainObjects', qs.parse("a[hasOwnProperty]=b", { plainObjects: true }))
            console.log('allowPrototypes',qs.parse("a[hasOwnProperty]=b", {allowPrototypes: true}))
            console.log(Object.create(null))

            console.log(qs.parse('a[1]=2&a[3]=5', { allowSparse: true }))
            var sparseArray = qs.parse('a[1]=2&a[3]=5', { allowSparse: true });
            // assert.deepEqual(sparseArray, { a: [, '2', , '5'] });
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .component-qs{
        
    }
</style>