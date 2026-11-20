const THREE = require('three');

function generateTreeData(seed = 1) {
  const branches = [];
  const leaves = [];
  const hangPoints = [];

  let s = seed;
  const random = () => {
    s = Math.sin(s) * 10000;
    return s - Math.floor(s);
  };

  const maxLevel = 5;

  function grow(position, direction, length, radius, level) {
    // Generate end point
    const end = position.clone().add(direction.clone().multiplyScalar(length));

    // Matrix for branch
    const up = new THREE.Vector3(0, 1, 0);
    const quaternion = new THREE.Quaternion().setFromUnitVectors(up, direction.clone().normalize());
    const positionCenter = position.clone().add(direction.clone().multiplyScalar(length / 2));
    
    const matrix = new THREE.Matrix4();
    matrix.compose(positionCenter, quaternion, new THREE.Vector3(radius, length, radius));
    
    branches.push({ matrix });

    if (level < maxLevel) {
      // Generate children
      const numChildren = level === 0 ? 4 : (random() > 0.2 ? 2 : 1);
      for (let i = 0; i < numChildren; i++) {
        // Bend direction outward
        const spreadAngle = level === 0 ? 0.8 : 0.5;
        const angle = random() * Math.PI * 2;
        
        // Perpendicular vector for bending
        const perp1 = new THREE.Vector3(1,0,0).applyQuaternion(quaternion);
        const perp2 = new THREE.Vector3(0,0,1).applyQuaternion(quaternion);
        
        const bend = perp1.multiplyScalar(Math.cos(angle)).add(perp2.multiplyScalar(Math.sin(angle)));
        
        let newDir = direction.clone().add(bend.multiplyScalar(spreadAngle)).normalize();
        
        // Gravity effect (pull down slightly)
        if (level > 2) {
          newDir.y -= 0.1;
          newDir.normalize();
        }

        grow(end, newDir, length * (0.75 + random()*0.2), radius * 0.6, level + 1);
      }
    } else {
      // Leaf cluster
      for(let i=0; i<3; i++) {
         const leafMatrix = new THREE.Matrix4();
         const lpos = end.clone().add(new THREE.Vector3(random()-0.5, random()-0.5, random()-0.5).multiplyScalar(2));
         const lquat = new THREE.Quaternion().setFromEuler(new THREE.Euler(random()*Math.PI, random()*Math.PI, random()*Math.PI));
         const scale = 2 + random();
         leafMatrix.compose(lpos, lquat, new THREE.Vector3(scale, scale, scale));
         leaves.push({ matrix: leafMatrix });
      }
      
      // Hanging point for memories
      hangPoints.push(end.clone());
    }
  }

  // Start trunk
  grow(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 1, 0), 10, 1.2, 0);

  // We need exactly 22 hanging points distributed nicely.
  // Sort hangPoints by height or random, take 22.
  // Actually, shuffle them or pick evenly.
  
  return { branches: branches.length, leaves: leaves.length, hangPoints: hangPoints.length };
}

console.log(generateTreeData());
