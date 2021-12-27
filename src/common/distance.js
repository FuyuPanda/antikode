exports.getDistance=(latitude,longitude)=>{
    var R = 6371; 
    var coord_monas={
        latitude:-6.175216392093846, 
        longitude:106.82719571485285
    };
    var dLat = deg2grad(coord_monas.latitude-latitude);  
    var dLon = deg2grad(coord_monas.longitude-longitude); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2grad(latitude)) * Math.cos(deg2grad(coord_monas.latitude)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; 
    return d;
}

function deg2grad(deg){
    return deg*(Math.PI/180);
}