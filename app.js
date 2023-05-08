//Pull out modules from Matter
const { Engine, World, Render, Runner, Bodies, Mouse, MouseConstraint } =
  Matter;

//height and width
const container = document.querySelector(".container__canvas");
const height = container.offsetHeight;
const width = container.offsetWidth;
const numberOfBodies = 15;

//Create an engine
const engine = Engine.create();

//Create world
const world = engine.world;

//Create a renderer
const render = Render.create({
  element: container,
  engine: engine,

  options: {
    width,
    height,
    wireframes: false,
    background: "transparent",
  },
});

//create ground
const groundTop = Bodies.rectangle(width / 2, 0, width, 40, {
  isStatic: true,
  render: {
    fillStyle: "transparent",
  },
});

//create ground
const groundBottom = Bodies.rectangle(width / 2, height, width, 40, {
  isStatic: true,
  render: {
    fillStyle: "transparent",
  },
});

//create ground
const groundLeft = Bodies.rectangle(0, height / 2, 40, height, {
  isStatic: true,
  render: {
    fillStyle: "transparent",
  },
});

//create ground
const groundRight = Bodies.rectangle(width, height / 2, 40, height, {
  isStatic: true,
  render: {
    fillStyle: "transparent",
  },
});

//generate random body
function generateBodies() {
  const bodies = [
    "./images/bubbling.svg",
    "./images/closure.svg",
    "./images/debouncing.svg",
    "./images/v8engine.svg",
    "./images/eventloop.svg",
    "./images/promise.svg",
    "./images/scope.svg",
    "./images/shallowCopy.svg",
  ];
  const total = bodies.length;
  const random = Math.floor(Math.random() * total);
  return bodies[random];
}

//create body
for (let x = 0; x < numberOfBodies; x++) {
  const box = Bodies.circle(
    Math.floor(Math.random() * width),
    Math.floor(Math.random() * 50),
    width > 100 ? 50 : 30,
    {
      render: {
        sprite: {
          texture: generateBodies(),
          xScale: width > 400 ? 0.75 : 0.6,
          yScale: width > 400 ? 0.75 : 0.6,
        },
        fillStyle: "transparent",
      },
      friction: 0.2,
      restitution: 0.6,
    }
  );

  World.add(world, box);
}

//add ground to world
World.add(world, [groundTop, groundBottom, groundLeft, groundRight]);

//create mouse
const mouse = Mouse.create(render.canvas);

//create mouse constraint
const mouseConstraint = MouseConstraint.create(engine, {
  mouse: mouse,
  constraint: {
    render: {
      visible: false,
    },
  },
});

//add mouse constraint to world
World.add(world, mouseConstraint);

//slomo
engine.timing.timeScale = 0.8;

//create runner
const runner = Runner.create();

//run the renderer
Render.run(render);

//run the runnerer
Runner.run(runner, engine);
