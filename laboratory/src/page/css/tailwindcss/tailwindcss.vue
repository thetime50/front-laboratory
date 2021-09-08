<template>
    <div class="component-tailwindcss">
        <h2>tailwindcss</h2>
        <div class="descriptions">
            <a href="tailwindcss.com docs">https://tailwindcss.com/docs</a> <br>
            <a href="tailwindcss.cn docs">https://www.tailwindcss.cn/docs</a> <br>
            <a href="https://juejin.cn/post/6950616890049822757">Svelte + TailwindCSS + Typescript + Vite真香</a> <br>
            <a href="https://juejin.cn/post/6881795051492474893">🎉🎉🎉 一个基于vue3+vite+ts的完整项目</a> <br>
            <br>
            - 引入 初始化 https://tailwindcss.com/docs/installation <br>
            Error: PostCSS plugin tailwindcss requires PostCSS 8. <br>
            <a href="https://tailwindcss.com/docs/installation#post-css-7-compatibility-build">PostCSS 7 compatibility build</a>
        </div>
        <div>
            <figure class="m-auto w-8/12 min-w-72 max-w-144 md:flex bg-gray-100 rounded-xl p-8 md:p-0 overflow-hidden">
                <img class="w-32 h-32 object-cover md:w-48 md:h-auto md:object-fill md:rounded-none rounded-full mx-auto" 
                    :src="require('@/assets/img/css/sarah-dayan.jpg')" alt="" width="384" height="512">
                <div class="pt-6 md:p-8 text-center md:text-left space-y-4">
                    <blockquote>
                        <p class="overflow-auto text-lg font-semibold">
                            “Tailwind CSS is the only framework that I've seen scale
                            on large teams. It’s easy to customize, adapts to any design,
                            and the build size is tiny.”
                        </p>
                    </blockquote>
                    <figcaption class="font-medium">
                        <div class="text-cyan-600" style="color: rgb(8, 145, 178)">
                            Sarah Dayan
                        </div>
                        <div class="text-gray-500">
                            Staff Engineer, Algolia
                        </div>
                    </figcaption>
                </div>
            </figure>
        </div>
    </div>
</template>

<script>
    /* message */

    export default {
        name: "tailwindcss",
        data () {
            return {
            };
        },
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .component-tailwindcss{
        
    }
</style>