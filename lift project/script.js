/* =====================================================
   FILE 3: script.js
   This file makes the lifts WORK:
     1. Builds the buttons and lifts on the page
     2. Chooses which lift should come (dispatch)
     3. Moves the lift, opens and closes the doors
   ===================================================== */

// Hide the red warning from index.html (it only stays visible if this file fails to load)
document.getElementById("warn").style.display = "none";

// ================= SETTINGS (you can change these) =================
const FLOORS    = 6;      // number of floors: 0 (Ground) to 5
const LIFTS     = 4;      // number of lifts in the building
const FLOOR_H   = 90;     // height of one floor in px (same as --floor-h in style.css)
const SPEED     = 0.8;    // seconds the lift needs to travel ONE floor
const DOOR_TIME = 1000;   // milliseconds the doors take to open / close
const WAIT_TIME = 1500;   // milliseconds the doors stay open for people

// Show "G" for floor 0, otherwise show the number
const floorName = f => (f === 0 ? "G" : f);

// Wait for some milliseconds (used with "await" to pause the code)
const sleep = ms => new Promise(r => setTimeout(r, ms));

// Add a message to the activity log box on the page
function log(text) {
  const box = document.getElementById("log");
  const d = document.createElement("div");
  d.textContent = text;
  box.appendChild(d);
  box.scrollTop = box.scrollHeight;       // always scroll to the newest message
}

// ================= STEP 1: BUILD THE PAGE =================
const lifts = [];      // list that stores all 4 lift objects
const callBtns = [];   // list that stores the call button of every floor

// ---- Create one call button for every floor (left side) ----
const callsBox = document.getElementById("calls");
for (let f = 0; f < FLOORS; f++) {
  const row = document.createElement("div");
  row.className = "call-row";
  row.innerHTML = `<span>Floor ${floorName(f)}</span>`;

  const b = document.createElement("button");
  b.className = "call-btn";
  b.textContent = "●";
  b.onclick = () => callLift(f);          // when pressed -> find a lift for this floor
  row.appendChild(b);

  callsBox.appendChild(row);
  callBtns[f] = b;
}

// ---- Create the 4 lifts ----
const liftsBox = document.getElementById("lifts");
for (let i = 0; i < LIFTS; i++) {
  // HTML for one lift: title, motor, shaft with car + wire + doors, and the button panel
  const col = document.createElement("div");
  col.className = "lift-col";
  col.innerHTML = `
    <div class="lift-title">LIFT ${i + 1}</div>
    <div class="motor"><i></i></div>
    <div class="shaft">
      <div class="car" style="bottom:5px">
        <div class="cable"></div>
        <div class="inside"></div>
        <div class="door l"></div><div class="door r"></div>
      </div>
    </div>
    <div class="panel">
      <div class="display">G</div>
      <div class="btns"></div>
    </div>`;
  liftsBox.appendChild(col);

  // An object that remembers everything about this lift
  const lift = {
    id: i,                                   // lift number (0 to 3)
    floor: 0,                                // floor where the lift is now
    queue: [],                               // floors the lift still has to visit
    running: false,                          // true while the lift is busy working
    car: col.querySelector(".car"),          // the red lift box on the page
    display: col.querySelector(".display"),  // green floor number screen
    btns: []                                 // buttons inside the lift panel
  };

  // Create the floor buttons under the lift (top floor first)
  const btnBox = col.querySelector(".btns");
  for (let f = FLOORS - 1; f >= 0; f--) {
    const b = document.createElement("button");
    b.className = "btn";
    b.textContent = floorName(f);
    b.onclick = () => addStop(lift, f, true);   // pressed inside the lift
    btnBox.appendChild(b);
    lift.btns[f] = b;
  }
  lifts.push(lift);
}

// ================= STEP 2: WHICH LIFT SHOULD COME? =================
// Called when someone presses the call button on a floor
function callLift(floor) {
  let best = null;           // the lift we choose
  let bestCost = Infinity;   // lowest cost found so far

  for (const l of lifts) {
    // Where will this lift be after finishing its current work?
    const last = l.queue.length ? l.queue[l.queue.length - 1] : l.floor;

    // COST = distance to the caller
    //        + 2 for every stop the lift already has waiting
    //        + 1 if it is moving right now
    // The lift with the SMALLEST cost is the best one to send.
    const cost = Math.abs(last - floor);

    if (cost < bestCost) { bestCost = cost; best = l; }
  }

  callBtns[floor].classList.add("lit");     // light the call button
  log(`Floor ${floorName(floor)} button pressed -> Lift ${best.id + 1} is coming`);
  addStop(best, floor, false);              // send the chosen lift
}

// Add a floor to a lift's list of stops
// fromInside = true when the button was pressed inside the lift
function addStop(lift, floor, fromInside) {
  if (!lift.queue.includes(floor)) lift.queue.push(floor);   // do not add the same floor twice

  if (fromInside) {
    lift.btns[floor].classList.add("lit");                   // light the inside button
    log(`Lift ${lift.id + 1}: floor ${floorName(floor)} selected`);
  }
  run(lift);   // start the lift (does nothing if it is already running)
}

// ================= STEP 3: MOVE THE LIFT =================
// Keeps the lift working until it has no more stops
async function run(lift) {
  if (lift.running) return;     // already working, the loop below will pick up the new stop
  lift.running = true;

  while (lift.queue.length) {
    // Choose the NEAREST stop first (saves time)
    lift.queue.sort((a, b) => Math.abs(a - lift.floor) - Math.abs(b - lift.floor));
    const target = lift.queue.shift();      // take it out of the list

    await moveTo(lift, target);             // 1. travel to the floor
    await openCloseDoors(lift);             // 2. stop, open doors, wait, close doors

    // Turn off the lights of the buttons for this floor
    lift.btns[target].classList.remove("lit");
    callBtns[target].classList.remove("lit");
  }
  lift.running = false;         // all work finished, lift is free again
}

// Move the lift up or down to the target floor
async function moveTo(lift, target) {
  if (target === lift.floor) return;        // already on this floor

  // Time needed = number of floors x seconds per floor
  const secs = Math.abs(target - lift.floor) * SPEED;
  log(`Lift ${lift.id + 1} moving ${target > lift.floor ? "UP" : "DOWN"} to floor ${floorName(target)}`);

  // CSS does the smooth animation, we just give the new position and the time
  lift.car.style.transitionDuration = secs + "s";
  lift.car.style.bottom = target * FLOOR_H + 5 + "px";

  // While moving, update the green floor number every 0.1 second
  const timer = setInterval(() => {
    const pos = (parseFloat(getComputedStyle(lift.car).bottom) - 5) / FLOOR_H;
    lift.display.textContent = floorName(Math.round(pos));
  }, 100);

  await sleep(secs * 1000);                 // wait until the lift arrives
  clearInterval(timer);                     // stop updating the number

  lift.floor = target;                      // remember the new floor
  lift.display.textContent = floorName(target);
}

// Open the doors, wait for people, then close the doors
async function openCloseDoors(lift) {
  log(`Lift ${lift.id + 1} reached floor ${floorName(lift.floor)} - doors opening`);
  lift.car.classList.add("open");           // CSS slides the doors apart
  await sleep(DOOR_TIME + WAIT_TIME);       // opening time + waiting time
  lift.car.classList.remove("open");        // CSS slides the doors together
  await sleep(DOOR_TIME);                   // wait until doors are fully closed
}

// ================= START =================
log("System ready. All 4 lifts are at the Ground floor.");