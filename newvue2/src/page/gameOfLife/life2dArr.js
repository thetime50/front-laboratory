import {
    Life2d3x3Class,
} from "./life2dMath.js"
import { re } from "mathjs";

function deepcopyarr(obj) {
    let out = [],i = 0,len = obj.length;
    for (; i < len; i++) {
        if (obj[i] instanceof Array){
            out[i] = deepcopyarr(obj[i]);
        }
        else out[i] = obj[i];
    }
    return out;
}

class Life2dMatrixArr extends Life2d3x3Class{
    _densityComputer(cells,w,h,loop){
        let density = Array.from({length:h},(v,i)=>{
            return Array.from({length:w},()=> 0)
        })
        let opt

        function tod(cel,copy = true){
            let result =copy ? deepcopyarr(cel) :cel
            result.unshift(result[result.length-1])
            result.pop()
            return result
        }
        function tou(cel,copy = true){
            let result =copy ? deepcopyarr(cel) :cel
            result.push(result[0])
            result.splice(0,1)
            return result
        }
        function tor(cel,copy = true){
            let result =copy ? deepcopyarr(cel) :cel
            result.forEach((v,i,a)=>{
                v.unshift(v[v.length-1])
                v.pop()
            })
            return result
        }
        function tol(cel,copy = true){
            let result =copy ? deepcopyarr(cel) :cel
            result.forEach((v,i,a)=>{
                v.push(v[0])
                v.splice(0,1)
            })
            return result
        }
        
        function todr(cel){
            let result =deepcopyarr(cel,false)
            tod(result,false)
            tor(result,false)
            return result
        }
        function todl(cel){
            let result =deepcopyarr(cel,false)
            tod(result,false)
            tol(result,false)
            return result
        }
        function tour(cel){
            let result =deepcopyarr(cel,false)
            tou(result,false)
            tor(result,false)
            return result
        }
        function toul(cel){
            let result =deepcopyarr(cel,false)
            tou(result,false)
            tol(result,false)
            return result
        }

        function add(cel,cel2){
            let yi=0,h=cel.length
            let result = Array.from(cel,()=>[])
            for(;yi<h;yi++){
                let row = cel[yi]
                let row2 = cel2[yi]
                let xi=0,w=row.length
                for(;xi<w;xi++){
                    result[yi][xi] = row[xi] + row2[xi] 
                }
            }
            return result
        }

        opt = tod(cells)
        density = add(density,opt)
        opt = tou(cells)
        density = add(density,opt)
        opt = tor(cells)
        density = add(density,opt)
        opt = tol(cells)
        density = add(density,opt)
        opt = todr(cells)
        density = add(density,opt)
        opt = todl(cells)
        density = add(density,opt)
        opt = tour(cells)
        density = add(density,opt)
        opt = toul(cells)
        density = add(density,opt)
        
        // console.log(density)
        return density
    }
}

export {
    Life2dMatrixArr,
}