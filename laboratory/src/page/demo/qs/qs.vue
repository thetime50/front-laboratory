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
    import assert from 'assert'

    export default {
        name: "qs",
        data () {
            function filterFunc(prefix, value) {
                if (prefix == 'b') {
                    // Return an `undefined` value to omit a property.
                    return;
                }
                if (prefix == 'e[f]') {
                    return value.getTime();
                }
                if (prefix == 'e[g][0]') {
                    return value * 2;
                }
                return value;
            }
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
                        calltext:`qs.parse('a[1]=2&a[10]=5',{ allowSparse: true })`,
                        fun:()=> qs.parse('a[1]=2&a[10]=5',{ allowSparse: true }),
                    },
                    {
                        desc:'允许空值',
                        calltext:`qs.parse('a[]=&a[]=b&a[4]=b')`,
                        fun:()=> qs.parse('a[]=&a[]=b&a[4]=b'),
                    },
                    {
                        desc:'索引>20回转为对象',
                        calltext:`qs.parse('a[2]=c&a[21]=b')`,
                        fun:()=> qs.parse('a[2]=c&a[21]=b'),
                    },
                    {
                        desc:'转对象限制配置',
                        calltext:`qs.parse('a[6]=b', { arrayLimit: 5 })`,
                        fun:()=>qs.parse('a[6]=b', { arrayLimit: 5 }),
                    },
                    {
                        desc:'不转数组',
                        calltext:`qs.parse('a[]=b', { parseArrays: false })`,
                        fun:()=>qs.parse('a[]=b', { parseArrays: false }),
                    },
                    {
                        desc:'有数字有字母则结果是对象',
                        calltext:`qs.parse('a[0]=b&a[b]=c')`,
                        fun:()=>qs.parse('a[0]=b&a[b]=c'),
                    },
                    {
                        desc:'嵌套',
                        calltext:`qs.parse('a[][b]=c')`,
                        fun:()=>qs.parse('a[][b]=c'),
                    },
                    {
                        desc:'嵌套',
                        calltext:`qs.parse('a[b][]=c')`,
                        fun:()=>qs.parse('a[b][]=c'),
                    },
                    {
                        desc:'自定义 decode',
                        calltext:`qs.parse('x=z', { decoder: function (str) {
                            // Passed in values 'x', 'z'
                            return // Return decoded string
                        }})`,
                        fun:()=> '-',
                    },
                    {
                        desc:'区分null值 ',
                        calltext:qs.parse('a&b=', { strictNullHandling: true }),
                        fun:()=>qs.parse('a&b=', { strictNullHandling: true }),
                    }
                ],
                list2:[
                    {
                        desc:'stringify',
                        calltext:`qs.stringify({ a: 'b' })`,
                        fun:()=>qs.stringify({ a: 'b' }),
                    },
                    {
                        desc:'stringify',
                        calltext:`qs.stringify({ a: 'b' })`,
                        fun:()=>qs.stringify({ a: { b: 'c' }  }),
                    },
                    {
                        desc:'关闭 encode',
                        calltext:`qs.stringify({ a: { b: 'c' } }, { encode: false })`,
                        fun:()=>qs.stringify({ a: { b: 'c' } }, { encode: false }),
                    },
                    {
                        desc:'只对 value encode',
                        calltext:`qs.stringify(
                            { a: 'b', c: ['d', 'e=f'], f: [['g'], ['h']] },
                            { encodeValuesOnly: true }
                        )`,
                        fun:()=>qs.stringify(
                            { a: 'b', c: ['d', 'e=f'], f: [['g'], ['h']] },
                            { encodeValuesOnly: true }
                        ),
                    },
                    {
                        desc:'自定义 encode',
                        calltext:`qs.stringify({ a: { b: 'c' } }, { encoder: function (str) {
                            // Passed in values 'a', 'b', 'c'
                            return // Return encoded string
                        }})`,
                        fun:()=>'-',
                    },
                    {
                        desc:`解析[] 默认为 'indices'`,
                        calltext:`qs.stringify({ a: ['b', 'c'] }, { encode: false })`,
                        fun:()=>qs.stringify({ a: ['b', 'c'] }, { encode: false }),
                    },
                    {
                        desc:`解析[] 带索引 arrayFormat: 'indices'`,
                        calltext:`qs.stringify({ a: ['b', 'c'] }, { arrayFormat: 'indices',encode: false })`,
                        fun:()=>qs.stringify({ a: ['b', 'c'] }, { arrayFormat: 'indices',encode: false }),
                    },
                    {
                        desc:`解析[] 不带索引 arrayFormat: 'brackets'`,
                        calltext:`qs.stringify({ a: ['b', 'c'] }, { arrayFormat: 'brackets',encode: false })`,
                        fun:()=>qs.stringify({ a: ['b', 'c'] }, { arrayFormat: 'brackets', encode: false }),
                    },
                    {
                        desc:`解析[] 重复赋值 arrayFormat: 'repeat'`,
                        calltext:`qs.stringify({ a: ['b', 'c'] }, { arrayFormat: 'repeat',encode: false })`,
                        fun:()=>qs.stringify({ a: ['b', 'c'] }, { arrayFormat: 'repeat',encode: false }),
                    },
                    {
                        desc:'默认用[]索引',
                        calltext:`qs.stringify({ a: { b: { c: 'd', e: 'f' } } }, { encode: false })`,
                        fun:()=>qs.stringify({ a: { b: { c: 'd', e: 'f' } } }, { encode: false }),
                    },
                    {
                        desc:'使用dot索引 allowDots',
                        calltext:`qs.stringify({ a: { b: { c: 'd', e: 'f' } } }, { allowDots: true })`,
                        fun:()=>qs.stringify({ a: { b: { c: 'd', e: 'f' } } }, { allowDots: true }),
                    },
                    {
                        desc:'会省略数值里的空值',
                        calltext:`qs.stringify({ a: '',b:null })`,
                        fun:()=>qs.stringify({ a: '',b:null }),
                    },
                    {
                        desc:'key的内容为空对象时不会保留key',
                        calltext:`assert.equal(qs.stringify({ a: [], b:{}, c: { d: []}  } }), '')`,
                        fun:()=>assert.equal(qs.stringify({ a: [], b:{}, c: { d: []}  }), '') || `''`,
                    },
                    {
                        desc:'undefined 也不会保留',
                        calltext:`assert.equal(qs.stringify({ a: null, b: undefined }), 'a=')`,
                        fun:()=>assert.equal(qs.stringify({ a: null, b: undefined }), 'a='),
                    },
                    {
                        desc:'加请求前缀',
                        calltext:`qs.stringify({ a: 'b', c: 'd' }, { addQueryPrefix: true })`,
                        fun:()=>qs.stringify({ a: 'b', c: 'd' }, { addQueryPrefix: true }),
                    },
                    {
                        desc:'置分隔符',
                        calltext:`qs.stringify({ a: 'b', c: 'd' }, { delimiter: ';' })`,
                        fun:()=>qs.stringify({ a: 'b', c: 'd' }, { delimiter: ';' }),
                    },
                    {
                        desc:'指定日期类型数据的序列化',
                        calltext:`qs.stringify({ a: new Date(7) }, { serializeDate: function (d) { return d.getTime(); } })`,
                        fun:()=>qs.stringify({ a: new Date(7) }, { serializeDate: function (d) { return d.getTime(); } }),
                    },
                    {
                        desc:'sort 对key排序',
                        calltext:`qs.stringify({ a: 'c', z: 'y', b : 'f' }, { sort: (a,b)=>a.localeCompare(b) })`,
                        fun:()=>qs.stringify({ a: 'c', z: 'y', b : 'f' }, { sort: (a,b)=>a.localeCompare(b) }),
                    },
                    {
                        desc:'filter 过滤和加工',
                        calltext:`qs.stringify({ a: 'b', c: 'd', e: { f: new Date(123), g: [2] } }, { filter: filterFunc })`,
                        fun:()=>qs.stringify({ a: 'b', c: 'd', e: { f: new Date(123), g: [2] } }, { filter: filterFunc }),
                    },
                    {
                        desc:'filter',
                        calltext:`qs.stringify({ a: 'b', c: 'd', e: 'f' }, { filter: ['a', 'e'] })`,
                        fun:()=>qs.stringify({ a: 'b', c: 'd', e: 'f' }, { filter: ['a', 'e'] }),
                    },
                    {
                        desc:'filter',
                        calltext:`qs.stringify({ a: ['b', 'c', 'd'], e: 'f' }, { filter: ['a', 0, 2] })`,
                        fun:()=>qs.stringify({ a: ['b', 'c', 'd'], e: 'f' }, { filter: ['a', 0, 2] }),
                    },
                    {
                        desc:'strictNullHandling 用=号区别null值',
                        calltext:`qs.stringify({ a: null, b: '' }, { strictNullHandling: true })`,
                        fun:()=>qs.stringify({ a: null, b: '' }, { strictNullHandling: true }),
                    },
                    {
                        desc:'忽略值为null的key',
                        calltext:`qs.stringify({ a: 'b', c: null}, { skipNulls: true })`,
                        fun:()=>qs.stringify({ a: 'b', c: null}, { skipNulls: true }),
                    },
                ]
            };
        },
        created () {
            console.log('plainObjects', qs.parse("a[hasOwnProperty]=b", { plainObjects: true }))
            console.log('allowPrototypes',qs.parse("a[hasOwnProperty]=b", {allowPrototypes: true}))
            console.log(Object.create(null))

            console.log(qs.parse('a[1]=2&a[3]=5', { allowSparse: true }))
            // var sparseArray = qs.parse('a[1]=2&a[3]=5', { allowSparse: true });
            // assert.deepEqual(sparseArray, { a: [, '2', , '5'] });

            console.log(decodeURIComponent(qs.stringify({a:{b:{c:2,d:3}}})))
            
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .component-qs{
        
    }
</style>