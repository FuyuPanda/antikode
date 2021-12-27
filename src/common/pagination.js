exports.getPagination = (page, size) => {
    let limit=parseInt(size);
    let offset = 0 + (page - 1) * size
    
    return { limit, offset };
  };
  

