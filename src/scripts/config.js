export default {
  allowedFileTypes: ["image/png", "image/jpeg", "image/jpg"],
  errorMessages: {
    fileType: 'File type is not supported. Please use png or jpg image.'
  },
  logoHexagons: [
    {
      size: 46,
      step: 0.3,
      options: {
        adjustment: 1, 
        color: '#292824',
        lineWidth: 2
      }
    },
    {
      size: 38,
      step: -0.5,
      options: {
        adjustment: 1, 
        color: 'indianred',
        lineWidth: 3
      }
    },
    {
      size: 30,
      step: 1,
      options: {
        adjustment: 1, 
        color: '#292824',
        lineWidth: 2
      }
    },
    {
      size: 25,
      step: 0.7,
      options: {
        adjustment: 1, 
        color: '#292824',
        lineWidth: 2
      }
    }
  ]
}