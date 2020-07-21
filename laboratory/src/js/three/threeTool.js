function setO3dGep(o3d, [x,y], [xc,yc], [xgap,ygap],method='set') {
    if(method=='set'){
        o3d.position.set((x-(xc-1)/2)*xgap ,0 ,(y-(yc-1)/2)*ygap)
    }else if(method=='add'){
        o3d.position.add(
            new THREE.Vector3((x-(xc-1)/2)*xgap ,0 ,(y-(yc-1)/2)*ygap)
        )
    }
}

export{
    setO3dGep,
}