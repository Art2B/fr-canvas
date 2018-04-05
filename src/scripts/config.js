export default {
  allowedFileTypes: ["image/png", "image/jpeg", "image/jpg"],
  errorMessages: {
    fileType: 'File type is not supported. Please use png or jpg image.'
  },
  hexaOptions: {
    radius: 80,
    stepGap: 8,
    adjustment: 90,
    color: '#000000',
    lineThicknessRatio: 3.7,
    minLineThickness: 0.2,
    sideNbStep: 10,
    minRadius: 5
  },
  logoHexagons: [
    {
      step: 0.3,
      options: {
        radius: 46,
        adjustment: 1,
        color: '#292824',
        lineWidth: 2
      }
    },
    {
      step: -0.5,
      options: {
        radius: 38,
        adjustment: 1,
        color: 'indianred',
        lineWidth: 3
      }
    },
    {
      step: 1,
      options: {
        radius: 30,
        adjustment: 1,
        color: '#292824',
        lineWidth: 2
      }
    },
    {
      step: 0.7,
      options: {
        radius: 25,
        adjustment: 1,
        color: '#292824',
        lineWidth: 2
      }
    }
  ]
}