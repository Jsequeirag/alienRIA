const PropiedadDTOs = (propiedades) => {
  let propiedadesDTOs = propiedades.map((propiedad) => {
    return {
      id_Property: propiedad.id_Property,
      title: propiedad.title,
      description: propiedad.description,
      details: propiedad.details,
      dimension: propiedad.dimension,
      services: propiedad.services,
      amenities: propiedad.amenities,
      address_Description: propiedad.address_Description,
      realtorFullName: propiedad.realtorFullName,
      realtorPhone: propiedad.realtorPhone,
      photo: propiedad.photos[0],
      price: propiedad.price,
      latitude: propiedad.latitude ? propiedad.latitude : 0,
      longitude: propiedad.longitude ? propiedad.longitude : 0,
    };
  });

  return propiedadesDTOs;
};
module.exports = { PropiedadDTOs };
