/**
 * SAIT CUSAT — Sophisticated Atmospheric Canvas Background (Hero Section Exclusively)
 * Thinned-out, sparse, subtle and elegant
 */

export function initHeroCanvas() {
  const canvas = document.getElementById('techCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let dpr = Math.min(window.devicePixelRatio || 1, 2);
  let width = 0;
  let height = 0;

  let mouse = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
    targetX: window.innerWidth / 2,
    targetY: window.innerHeight / 2,
    isActive: false
  };

  let isDark = document.documentElement.getAttribute('data-theme') === 'dark';

  // Data collections
  let nodes = [];
  let packets = [];
  let ambientParticles = [];
  let geometricShapes = [];
  let telemetryRings = [];
  let orbitalNodes = [];
  let animTime = 0;

  function updateDimensions() {
    width = window.innerWidth;
    height = window.innerHeight;
    dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);

    initScene();
  }

  function initScene() {
    // 1. Soft Ambient Particle Drift (Thinned out to be sparse & subtle)
    const particleCount = Math.max(7, Math.floor((width * height) / 120000));
    ambientParticles = [];
    for (let i = 0; i < particleCount; i++) {
      ambientParticles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.12,
        vy: -0.06 - Math.random() * 0.14,
        radius: Math.random() * 1.2 + 0.6,
        alphaOffset: Math.random() * Math.PI * 2,
        alphaSpeed: 0.008 + Math.random() * 0.012,
        isGold: Math.random() > 0.4
      });
    }

    // 2. 3D Geometric Wireframe Shapes (2 subtle shapes in Hero)
    geometricShapes = [
      // Top-Left Floating Wireframe Octahedron
      {
        type: 'octahedron',
        x: width * 0.12,
        y: height * 0.28,
        baseX: width * 0.12,
        baseY: height * 0.28,
        driftRadius: 24,
        driftSpeed: 0.004,
        driftOffset: 0,
        size: Math.min(22, width * 0.035),
        rotX: 0,
        rotY: 0,
        rotZ: 0,
        rotSpeedX: 0.004,
        rotSpeedY: 0.005,
        rotSpeedZ: 0.002,
        isGold: true
      },
      // Top-Right Floating Wireframe Cube
      {
        type: 'cube',
        x: width * 0.88,
        y: height * 0.26,
        baseX: width * 0.88,
        baseY: height * 0.26,
        driftRadius: 26,
        driftSpeed: 0.004,
        driftOffset: Math.PI * 0.6,
        size: Math.min(20, width * 0.032),
        rotX: 0,
        rotY: 0,
        rotZ: 0,
        rotSpeedX: -0.004,
        rotSpeedY: 0.005,
        rotSpeedZ: 0.003,
        isGold: false
      }
    ];

    // 3. Network Constellation Nodes (Sparse & non-busy)
    const nodeCount = Math.max(6, Math.floor((width * height) / 110000));
    nodes = [];
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        baseVx: (Math.random() - 0.5) * 0.12,
        baseVy: (Math.random() - 0.5) * 0.12,
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.12,
        radius: Math.random() * 1.0 + 0.9,
        pulseOffset: Math.random() * Math.PI * 2,
        isGold: Math.random() > 0.5,
        connections: []
      });
    }

    recalculateConnections();

    // 4. Data Packets (Sparse photons)
    packets = [];
    const packetCount = Math.min(4, Math.max(2, Math.floor(nodeCount * 0.35)));
    for (let i = 0; i < packetCount; i++) {
      const from = Math.floor(Math.random() * nodes.length);
      packets.push({
        fromNode: from,
        toNode: -1,
        progress: Math.random(),
        speed: 0.0025 + Math.random() * 0.0025,
        size: Math.random() * 0.8 + 1.2
      });
    }

    // 5. Telemetry Center Wave (Hero only)
    telemetryRings = [
      {
        cx: width * 0.5,
        cy: height * 0.44,
        maxRadius: Math.min(width, height) * 0.42,
        currentRadius: 30,
        speed: 0.22
      }
    ];

    orbitalNodes = [
      { radius: 140, angle: 0, speed: 0.0055, size: 1.8 },
      { radius: 240, angle: Math.PI * 0.8, speed: -0.0040, size: 2.0 }
    ];
  }

  function recalculateConnections() {
    const maxConnectDist = Math.min(width, height) * 0.18;
    for (let i = 0; i < nodes.length; i++) {
      nodes[i].connections = [];
    }

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxConnectDist && nodes[i].connections.length < 2 && nodes[j].connections.length < 2) {
          nodes[i].connections.push(j);
        }
      }
    }
  }

  updateDimensions();
  window.addEventListener('resize', updateDimensions, { passive: true });

  window.addEventListener('mousemove', (e) => {
    mouse.targetX = e.clientX;
    mouse.targetY = e.clientY;
    mouse.isActive = true;
  }, { passive: true });

  window.addEventListener('mouseleave', () => {
    mouse.isActive = false;
  }, { passive: true });

  // Theme observer
  const themeObserver = new MutationObserver(() => {
    isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  });
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme']
  });

  // 3D Projection Helpers
  function project3D(x, y, z, size, cx, cy, rotX, rotY, rotZ) {
    let y1 = y * Math.cos(rotX) - z * Math.sin(rotX);
    let z1 = y * Math.sin(rotX) + z * Math.cos(rotX);

    let x2 = x * Math.cos(rotY) + z1 * Math.sin(rotY);
    let z2 = -x * Math.sin(rotY) + z1 * Math.cos(rotY);

    let x3 = x2 * Math.cos(rotZ) - y1 * Math.sin(rotZ);
    let y3 = x2 * Math.sin(rotZ) + y1 * Math.cos(rotZ);

    const fov = 180;
    const scale = fov / (fov + z2 * size);
    return {
      x: cx + x3 * size * scale,
      y: cy + y3 * size * scale,
      z: z2
    };
  }

  function drawWireframeCube(ctx, shape, opacity, colorStr) {
    const vertices = [
      [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
      [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]
    ];

    const edges = [
      [0, 1], [1, 2], [2, 3], [3, 0],
      [4, 5], [5, 6], [6, 7], [7, 4],
      [0, 4], [1, 5], [2, 6], [3, 7]
    ];

    const pts = vertices.map(v =>
      project3D(v[0], v[1], v[2], shape.size, shape.x, shape.y, shape.rotX, shape.rotY, shape.rotZ)
    );

    ctx.strokeStyle = `rgba(${colorStr}, ${opacity})`;
    ctx.lineWidth = 0.6;

    edges.forEach(edge => {
      ctx.beginPath();
      ctx.moveTo(pts[edge[0]].x, pts[edge[0]].y);
      ctx.lineTo(pts[edge[1]].x, pts[edge[1]].y);
      ctx.stroke();
    });

    pts.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 1.0, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${colorStr}, ${opacity * 1.2})`;
      ctx.fill();
    });
  }

  function drawWireframeOctahedron(ctx, shape, opacity, colorStr) {
    const vertices = [
      [0, -1.3, 0], [0, 1.3, 0],
      [-1, 0, 0], [1, 0, 0],
      [0, 0, -1], [0, 0, 1]
    ];

    const edges = [
      [0, 2], [0, 3], [0, 4], [0, 5],
      [1, 2], [1, 3], [1, 4], [1, 5],
      [2, 4], [4, 3], [3, 5], [5, 2]
    ];

    const pts = vertices.map(v =>
      project3D(v[0], v[1], v[2], shape.size, shape.x, shape.y, shape.rotX, shape.rotY, shape.rotZ)
    );

    ctx.strokeStyle = `rgba(${colorStr}, ${opacity})`;
    ctx.lineWidth = 0.6;

    edges.forEach(edge => {
      ctx.beginPath();
      ctx.moveTo(pts[edge[0]].x, pts[edge[0]].y);
      ctx.lineTo(pts[edge[1]].x, pts[edge[1]].y);
      ctx.stroke();
    });
  }

  // Main Render Loop (Strictly Hero Section)
  function render() {
    animTime += 0.009;

    // Smooth mouse follower
    mouse.x += (mouse.targetX - mouse.x) * 0.03;
    mouse.y += (mouse.targetY - mouse.y) * 0.03;

    ctx.clearRect(0, 0, width, height);

    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    const heroHeight = height * 0.92;
    const heroFactor = Math.max(0, Math.min(1, 1 - (scrollY / heroHeight)));

    // If scrolled past hero section, terminate drawing for completely static non-hero sections
    if (heroFactor <= 0.005) {
      requestAnimationFrame(render);
      return;
    }

    // Color tokens
    const goldRGB = isDark ? '212, 175, 55' : '184, 147, 74';
    const navyRGB = isDark ? '196, 210, 230' : '13, 21, 38';
    const pearlRGB = isDark ? '255, 255, 255' : '184, 147, 74';
    const packetGlow = isDark ? '#FFE28A' : '#B8934A';

    // 1. Fluid Ambient Gradient Glow (Hero Only)
    const glowX1 = width * 0.5 + Math.sin(animTime * 0.5) * (width * 0.06);
    const glowY1 = height * 0.42 + Math.cos(animTime * 0.35) * (height * 0.05);
    const glowRadius1 = Math.min(width, height) * 0.55;

    const radialGlow1 = ctx.createRadialGradient(glowX1, glowY1, 0, glowX1, glowY1, glowRadius1);
    radialGlow1.addColorStop(0, `rgba(${goldRGB}, ${(isDark ? 0.05 : 0.035) * heroFactor})`);
    radialGlow1.addColorStop(0.5, `rgba(${goldRGB}, ${(isDark ? 0.015 : 0.01) * heroFactor})`);
    radialGlow1.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = radialGlow1;
    ctx.fillRect(0, 0, width, height);

    // 2. Soft Floating Particle Drift (Sparse & Subtle)
    ambientParticles.forEach((p) => {
      p.x += p.vx + Math.sin(animTime + p.alphaOffset) * 0.05;
      p.y += p.vy;

      if (p.y < -10) { p.y = height + 10; p.x = Math.random() * width; }
      if (p.x < -10) { p.x = width + 10; }
      if (p.x > width + 10) { p.x = -10; }

      const pulse = Math.sin(animTime * 1.2 + p.alphaOffset) * 0.5 + 0.5;
      const alpha = (0.12 + pulse * 0.35) * (isDark ? 0.28 : 0.18) * heroFactor;
      const color = p.isGold ? goldRGB : pearlRGB;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${color}, ${alpha})`;
      ctx.fill();
    });

    // 3. Slowly Moving 3D Wireframes (Hero Only)
    geometricShapes.forEach((shape) => {
      shape.x = shape.baseX + Math.sin(animTime * shape.driftSpeed * 50 + shape.driftOffset) * shape.driftRadius;
      shape.y = shape.baseY + Math.cos(animTime * shape.driftSpeed * 35 + shape.driftOffset) * (shape.driftRadius * 0.6);

      shape.rotX += shape.rotSpeedX;
      shape.rotY += shape.rotSpeedY;
      shape.rotZ += shape.rotSpeedZ;

      const shapeAlpha = (isDark ? 0.18 : 0.14) * heroFactor;
      const shapeColor = shape.isGold ? goldRGB : navyRGB;

      if (shape.type === 'cube') {
        drawWireframeCube(ctx, shape, shapeAlpha, shapeColor);
      } else if (shape.type === 'octahedron') {
        drawWireframeOctahedron(ctx, shape, shapeAlpha, shapeColor);
      }
    });

    // 4. Subtle Dotted Precision Grid Crosshairs (Hero Only)
    const gridStep = 90;
    const gridAlpha = (isDark ? 0.04 : 0.025) * heroFactor;
    ctx.strokeStyle = `rgba(${goldRGB}, ${gridAlpha})`;
    ctx.lineWidth = 0.5;

    for (let x = gridStep; x < width; x += gridStep) {
      for (let y = gridStep; y < height; y += gridStep) {
        const cross = 2.2;
        ctx.beginPath();
        ctx.moveTo(x - cross, y);
        ctx.lineTo(x + cross, y);
        ctx.moveTo(x, y - cross);
        ctx.lineTo(x, y + cross);
        ctx.stroke();
      }
    }

    // 5. Hero Center Telemetry Wave
    if (heroFactor > 0.05) {
      const centerX = width * 0.5;
      const centerY = height * 0.44;

      telemetryRings.forEach((ring) => {
        ring.currentRadius += ring.speed;
        if (ring.currentRadius > ring.maxRadius) {
          ring.currentRadius = 24;
        }

        const ringProgress = ring.currentRadius / ring.maxRadius;
        const ringAlpha = Math.max(0, (1 - ringProgress) * (isDark ? 0.12 : 0.08) * heroFactor);

        ctx.beginPath();
        ctx.arc(centerX, centerY, ring.currentRadius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${goldRGB}, ${ringAlpha})`;
        ctx.lineWidth = 0.6;
        ctx.stroke();
      });

      orbitalNodes.forEach((orb) => {
        orb.angle += orb.speed;
        const orbX = centerX + Math.cos(orb.angle) * orb.radius;
        const orbY = centerY + Math.sin(orb.angle) * orb.radius;

        ctx.beginPath();
        ctx.arc(orbX, orbY, orb.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${goldRGB}, ${0.65 * heroFactor})`;
        ctx.shadowColor = packetGlow;
        ctx.shadowBlur = 5 * heroFactor;
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.beginPath();
        ctx.arc(centerX, centerY, orb.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${goldRGB}, ${0.025 * heroFactor})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      });
    }

    // 6. Network Node Physics
    nodes.forEach((node) => {
      if (mouse.isActive) {
        const dxM = mouse.x - node.x;
        const dyM = mouse.y - node.y;
        const distM = Math.sqrt(dxM * dxM + dyM * dyM);
        const maxMouseDist = 140;

        if (distM < maxMouseDist && distM > 10) {
          const force = (1 - distM / maxMouseDist) * 0.008;
          node.vx += (dxM / distM) * force;
          node.vy += (dyM / distM) * force;
        }
      }

      node.vx += (node.baseVx - node.vx) * 0.02;
      node.vy += (node.baseVy - node.vy) * 0.02;

      node.x += node.vx;
      node.y += node.vy;

      if (node.x < 12) { node.x = 12; node.vx = Math.abs(node.vx); node.baseVx = Math.abs(node.baseVx); }
      if (node.x > width - 12) { node.x = width - 12; node.vx = -Math.abs(node.vx); node.baseVx = -Math.abs(node.baseVx); }
      if (node.y < 12) { node.y = 12; node.vy = Math.abs(node.vy); node.baseVy = Math.abs(node.baseVy); }
      if (node.y > height - 12) { node.y = height - 12; node.vy = -Math.abs(node.vy); node.baseVy = -Math.abs(node.baseVy); }
    });

    if (Math.floor(animTime * 60) % 180 === 0) {
      recalculateConnections();
    }

    // 7. Network Constellation Links
    const maxConnectDist = Math.min(width, height) * 0.18;
    for (let i = 0; i < nodes.length; i++) {
      const n1 = nodes[i];
      for (let j = 0; j < n1.connections.length; j++) {
        const targetIdx = n1.connections[j];
        const n2 = nodes[targetIdx];
        if (!n2) continue;

        const dx = n1.x - n2.x;
        const dy = n1.y - n2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxConnectDist) {
          const edgeOpacity = (1 - dist / maxConnectDist) * (isDark ? 0.16 : 0.10) * heroFactor;
          ctx.beginPath();
          ctx.moveTo(n1.x, n1.y);
          ctx.lineTo(n2.x, n2.y);
          ctx.strokeStyle = `rgba(${goldRGB}, ${edgeOpacity})`;
          ctx.lineWidth = 0.55;
          ctx.stroke();
        }
      }
    }

    // 8. Traveling Data Packets
    packets.forEach((packet) => {
      const n1 = nodes[packet.fromNode];
      if (!n1) return;

      if (packet.toNode === -1 || !nodes[packet.toNode]) {
        if (n1.connections.length > 0) {
          packet.toNode = n1.connections[Math.floor(Math.random() * n1.connections.length)];
        } else {
          packet.fromNode = Math.floor(Math.random() * nodes.length);
          return;
        }
      }

      const n2 = nodes[packet.toNode];
      if (!n2) return;

      packet.progress += packet.speed;
      if (packet.progress >= 1) {
        packet.progress = 0;
        packet.fromNode = packet.toNode;
        if (nodes[packet.fromNode] && nodes[packet.fromNode].connections.length > 0) {
          const conns = nodes[packet.fromNode].connections;
          packet.toNode = conns[Math.floor(Math.random() * conns.length)];
        } else {
          packet.toNode = -1;
        }
      }

      const curX = n1.x + (n2.x - n1.x) * packet.progress;
      const curY = n1.y + (n2.y - n1.y) * packet.progress;

      ctx.beginPath();
      ctx.arc(curX, curY, packet.size, 0, Math.PI * 2);
      ctx.fillStyle = isDark
        ? `rgba(255, 226, 138, ${0.65 * heroFactor})`
        : `rgba(184, 147, 74, ${0.60 * heroFactor})`;
      ctx.shadowColor = packetGlow;
      ctx.shadowBlur = 3;
      ctx.fill();
      ctx.shadowBlur = 0;
    });

    // 9. Core Network Nodes
    nodes.forEach((node) => {
      const pulse = Math.sin(animTime * 1.8 + node.pulseOffset) * 0.5 + 0.5;
      const curRadius = node.radius + pulse * 0.4;

      ctx.beginPath();
      ctx.arc(node.x, node.y, curRadius + 1.8, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${goldRGB}, ${0.05 * heroFactor})`;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(node.x, node.y, curRadius, 0, Math.PI * 2);
      ctx.fillStyle = node.isGold
        ? `rgba(${goldRGB}, ${0.45 * heroFactor})`
        : `rgba(${navyRGB}, ${0.30 * heroFactor})`;
      ctx.fill();
    });

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}
