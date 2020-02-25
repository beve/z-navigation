const toScreenXY ( position, camera, jqdiv ) => {

    var pos = position.clone();
    projScreenMat = new THREE.Matrix4();
    projScreenMat.multiply( camera.projectionMatrix, camera.matrixWorldInverse );
    projScreenMat.multiplyVector3( pos );

    return { x: ( pos.x + 1 ) * jqdiv.width() / 2 + jqdiv.offset().left,
         y: ( - pos.y + 1) * jqdiv.height() / 2 + jqdiv.offset().top };

}