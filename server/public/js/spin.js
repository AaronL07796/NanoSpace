/*
A basic lil' library thingy for calculating rotations in 3D-space (using magical quaternions).
It isn't complete by any means, so you probably don't want to use it in a real-world application (yet).
- ARG
*/

var Spin = function() {
  
  var THIS = {}
  
  // Multiply two quaternions
  var quat_mult = function(q1, q2) {
    return [
      (q1[0]*q2[0] - q1[1]*q2[1] - q1[2]*q2[2] - q1[3]*q2[3]),
      (q1[0]*q2[1] + q1[1]*q2[0] + q1[2]*q2[3] - q1[3]*q2[2]),
      (q1[0]*q2[2] - q1[1]*q2[3] + q1[2]*q2[0] + q1[3]*q2[1]),
      (q1[0]*q2[3] + q1[1]*q2[2] - q1[2]*q2[1] + q1[3]*q2[0])
    ]
  }
  
  
  // Multiple two quaternions, disgregarding the first component of the vectors
  var quat_pointmult = function(q1, q2) {
    return [
      (q1[0]*q2[1] + q1[1]*q2[0] + q1[2]*q2[3] - q1[3]*q2[2]),
      (q1[0]*q2[2] - q1[1]*q2[3] + q1[2]*q2[0] + q1[3]*q2[1]),
      (q1[0]*q2[3] + q1[1]*q2[2] - q1[2]*q2[1] + q1[3]*q2[0])
    ]
  }
  
  
  // Storage for the global rotation values
  var ROT_QUAT = [1, 0, 0, 0]
  var CONJ_QUAT = [1, 0, 0, 0]
  
  
  // Set the global rotation
  THIS.set_rotation = function(axis_vector, angle) {
    var sin_coeff = Math.sin(angle * 0.5)

    ROT_QUAT = [
      Math.cos(angle * 0.5),
      sin_coeff * axis_vector[0],
      sin_coeff * axis_vector[1],
      sin_coeff * axis_vector[2]
    ]
    
    CONJ_QUAT = [
      ROT_QUAT[0],
      -1 * ROT_QUAT[1],
      -1 * ROT_QUAT[2],
      -1 * ROT_QUAT[3]
    ]
  }
  
  
  // Add a rotation on top of the global rotation
  THIS.add_rotation = function(axis_vector, angle) {
    var sin_coeff = Math.sin(angle * 0.5)
    
    var rot_quat = [
      Math.cos(angle * 0.5),
      sin_coeff * axis_vector[0],
      sin_coeff * axis_vector[1],
      sin_coeff * axis_vector[2]
    ]
    
    ROT_QUAT = quat_mult(rot_quat, ROT_QUAT)
    
    CONJ_QUAT = [
      ROT_QUAT[0],
      -1 * ROT_QUAT[1],
      -1 * ROT_QUAT[2],
      -1 * ROT_QUAT[3]
    ]
  }
  
  
  // Get the current global rotation in axis-angle form
  THIS.get_rotation = function() {
    var angle = 2 * Math.acos(ROT_QUAT[0])    
    var sin_coeff = Math.sqrt(1 - ROT_QUAT[0]*ROT_QUAT[0])
    
    if(sin_coeff == 0) {
      var axis_vector = [0, 0, 0]
    } else {
      var axis_vector = [
        ROT_QUAT[1] / sin_coeff,
        ROT_QUAT[2] / sin_coeff,
        ROT_QUAT[3] / sin_coeff
      ]
    }
    
    return {'vector': axis_vector, 'angle': angle}
  }
    
  
  // Rotate a point based on the global rotation
  THIS.rotate_point = function(point) {  
    var point_quat = [0, point[0], point[1], point[2]]
    var temp = quat_mult(ROT_QUAT, point_quat)
    return quat_pointmult(temp, CONJ_QUAT)
  }
  
  
  THIS.reset = function() {
    ROT_QUAT = [1, 0, 0, 0]
    CONJ_QUAT = [1, 0, 0, 0]
  }
  
  
  THIS.reset()
  
  return THIS
  
}()


/*
Hey! I don't need this!
*/

var Vector3d = {}

Vector3d.length = function(a) {
  return Math.sqrt(a[0]*a[0] + a[1]*a[1] + a[2]*a[2])
}

Vector3d.normalize = function(a) {
  var length = Vector3d.length(a)
  return [a[0] / length, a[1] / length, a[2] / length]
}

Vector3d.cross_product = function(a, b) {
  return [
    (a[1] * b[2]) - (a[2] * b[1]),
    (a[2] * b[0]) - (a[0] * b[2]),
    (a[0] * b[1]) - (a[1] * b[0])
  ]
}

Vector3d.dot_product = function(a, b) {
  return a[0]*b[0] + a[1]*b[1] + a[2]*b[2]
}

Vector3d.angle_between = function(a, b) {
  return Math.acos(Vector3d.dot_product(a, b))
}