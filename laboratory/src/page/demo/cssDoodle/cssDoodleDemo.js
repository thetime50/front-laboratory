export const preStr={
    grid:
`
支持字格式 
'5' -- 5 x 5
'5x7'
'5 x 7'
'5,7'
`,
    use:
`
1. 通过元素属性数组
2. 通过根节点 @grid 属性设置
3. 使用 <css-doodle use="var(--rule)>  ---- <style> css-doodle {--rule: ( xxx ) } 匹配应用
    建议这样使用
    网络慢或浏览器不支持Web Component时它不​​会中断。
<css-doodle  grid = "5" ></css-doodle> 
或者
<css-doodle >
  :doodle {
    @grid: 5 / 8em;
  }
</css-doodle>
 <css-doodle >
     @grid: 5 / 8em; /*:doodle 不是必须的 可以注释 */
 </css-doodle>

或者
<style>
  css-doodle {
    --rule: (
      @grid: 5 / 8em;
    );
  }
</style>
<css-doodle use="var(--rule)"></css-doodle>
`,
    '@even':`
@even {
    :after {
        content: @index;
        color: #fff;
    }
    background: #60569e;
}
`,
    '@even(cross)': `
@even(cross) {
    :after {
        content: @index;
        color: #fff;
    }
    background: #60569e;
}
`,
}