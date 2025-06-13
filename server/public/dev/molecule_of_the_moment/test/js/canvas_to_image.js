$.fn.draw = function(width, height, funct) {
  var canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  funct(canvas.getContext("2d"))
  return $(this).attr('src', canvas.toDataURL())
}