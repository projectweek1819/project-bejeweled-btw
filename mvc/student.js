// Schrijf hier je code


function onMouseDown(state, args) {
    state++;
    return state;
}

function onMouseDown2(state, args) {
    let x = state.count;
    return {count: x + 1};
}

function counter3() {

    function onMouseDown(state, args) {
        let x = state.count;
        return {count: x + 1};
    }

    return {controller: {onMouseDown}};
}

function counter4() {

    function onMouseDown(state, args) {
        let x = state.count;
        return {count: x + 1};
    }

    function onKeyDown(state, args) {
        return {count: 0};
    }

    return {controller: {onMouseDown, onKeyDown}};
}

function counter5() {

    function onMouseDown(state, args) {
        let x = state.count;
        if (args.shift) {
            x--;
        } else {
            x++;
        }
        x = (x >= 0) ? x : 0;
        return {count: x}
    }

    function onKeyDown(state, args) {
        let x = state.count;
        if (args.key === "ArrowUp") {
            x++;
        }
        else if (args.key === "ArrowDown") {
            x--;
        }
        else if (args.key === "0") {
            x = 0;
        }

        x = (x >= 0) ? x : 0;

        return {count: x}
    }

    return {controller: {onMouseDown, onKeyDown}};
}

function counter6() {
    function increment(state) {
        return {count: state.count + 1};
    }

    function decrement(state) {
        x = (state.count > 0) ? state.count - 1 : 0;
        return {count: x};
    }

    function reset(state) {
        return {count: 0}
    }

    function onMouseDown(state, args) {
        if (args.shift) {
            return decrement(state)
        } else {
            return increment(state)
        }
    }

    function onKeyDown(state, args) {
        if (args.key === "ArrowUp" || args.key === " ") {
            return increment(state);
        }
        else if (args.key === "ArrowDown") {
            return decrement(state)
        }
        else if (args.key === "0") {
            return reset(state);
        }
        return state
    }

    const controller = {onMouseDown, onKeyDown};
    const model = {increment, decrement, reset};
    return {controller, model};
}

function counter7() {
    function increment(state) {
        return {count: state.count + 1};
    }

    function decrement(state) {
        x = (state.count > 0) ? state.count - 1 : 0;
        return {count: x};
    }

    function reset(state) {
        return {count: 0}
    }

    function add(state, amount) {
        var x = state.count;
        x += amount;
        x = (x >= 0) ? x : 0;
        return {count: x}
    }

    function onMouseDown(state, args) {
        let x = state.count;
        let result = null;
        let modifier = 1

        if (args.ctrl) {
            modifier = 5;
        }

        if (args.shift) {
            return add(state, modifier * -1)
        } else {
            return add(state, modifier)
        }
    }

    function onKeyDown(state, args) {
        let modifier = 1;

        if (args.ctrl) {
            modifier = 5;
        }

        if (args.key === "ArrowUp" || args.key === " ") {
            return add(state, modifier);
        }
        else if (args.key === "ArrowDown") {
            return add(state, -modifier);
        }
        else if (args.key === "0") {
            return reset(state);
        }
        return state;
    }

    const controller = {onMouseDown, onKeyDown};
    const model = {increment, decrement, reset, add};
    return {controller, model};
}


function chronometer() {

    function timePassed(state, dt) {
        let x = state.elapsedTime;
        x += dt;
        return {elapsedTime: x}
    }

    function onTimerTick(state, dt) {
        return timePassed(state, dt)
    }


    const controller = {onTimerTick};
    const model = {timePassed}
    return {controller, model}
}

function chronometer2() {

    function timePassed(state, dt) {
        let x = state.elapsedTime;
        if (state.active) {
            x += dt;
        }
        return {elapsedTime: x, active: state.active};
    }

    function toggle(state) {
        return {elapsedTime: state.elapsedTime, active: !state.active}
    }

    function reset(state) {
        return {elapsedTime: 0, active: state.active}
    }

    function onTimerTick(state, dt) {
        return timePassed(state, dt)
    }

    function onKeyDown(state, args) {
        if (args.key === " ") {
            return toggle(state)
        } else if (args.key === "0") {
            return reset(state);
        }
        return state
    }


    const controller = {onTimerTick, onKeyDown};
    const model = {timePassed, toggle, reset}
    return {controller, model}
}

function circle() {

    function render() {
        return [{type: "circle", center: {x: 100, y: 100}, radius: 10, color: "red"}]
    }

    const view = {render};
    const model = {};
    const controller = {};
    return {view, model, controller}
}

function circle2() {

    function moveTo(state, position) {
        return {position: position};
    }

    function render(state) {
        return [{type: "circle", center: state.position, radius: 10, color: "red"}]
    }

    function onMouseDown(state, args) {
        return moveTo(state, args.position)
    }

    const view = {render};
    const model = {moveTo};
    const controller = {onMouseDown};
    return {view, model, controller}
}

function circle3() {

    function moveTo(state, position) {
        return {position: position};
    }

    function render(state) {
        return [{type: "circle", center: state.position, radius: 10, color: "red"}]
    }

    function onMouseMove(state, args) {
        return moveTo(state, args.position)
    }

    const view = {render};
    const model = {moveTo};
    const controller = {onMouseMove};
    return {view, model, controller}
}

function drawing() {

    function moveTo(state, position) {
        let tempDots = state.dots.slice()

        if (state.addMode) {
            tempDots.push(position);
        }
        return {position: position, dots: tempDots, addMode: state.addMode};
    }

    function setAddMode(state, addMode) {
        return {position: state.position, dots: state.dots, addMode: addMode}
    }

    function render(state) {
        let toRender = [];
        let radius = 5;
        if (state.addMode) {
            radius = 2;
        }


        for (let i = 0; i < state.dots.length; i++) {
            toRender.push({type: "circle", center: state.dots[i], radius: 2, color: "green"})
        }

        toRender.push(({type: "circle", center: state.position, radius: radius, color: "red"}));
        return toRender;
    }

    function onMouseMove(state, args) {
        return moveTo(state, args.position)
    }

    function onMouseDown(state, args) {
        return setAddMode(state, true)
    }

    function onMouseUp(state, args) {
        return setAddMode(state, false)
    }

    const view = {render};
    const model = {moveTo, setAddMode};
    const controller = {onMouseMove, onMouseDown, onMouseUp};
    return {view, model, controller}
}

function random() {

    function throwDie(state) {
        let rng = (4578 * state.rng ** 2 - 976161 * state.rng + 6156489) % 79729693;
        let dieValue = rng % 6 + 1
        return {rng: rng, dieValue: dieValue};
    }

    function onKeyDown(state, args) {
        if (args.key === " ") {
            return throwDie(state);
        }
        return state;
    }

    function render(state) {
        return [{type: "text", position: {x: 50, y: 50}, string: String(state.dieValue)}];
    }


    const view = {render};
    const model = {throwDie};
    const controller = {onKeyDown};
    return {view, model, controller};
}

function random2() {

    function throwDie(state) {
        let rng = nextRandom(state.rng);
        let dieValue = rng % 6 + 1;
        return [dieValue, {rng: rng, grade: state.grade}]
    }

    function nextRandom(n) {
        return (4578 * n ** 2 - 976161 * n + 6156489) % 79729693;
    }

    function generateGrade(state) {
        let result = 0;
        for (let i = 0; i < 3; i++) {
            let temp = throwDie(state);
            result += temp[0]
            state = temp[1]
        }
        return {rng: state.rng, grade: result};
    }

    function onKeyDown(state, args) {
        if (args.key === " ") {
            return generateGrade(state);
        }
        return state;
    }


    function render(state) {
        return [{type: "text", position: {x: 50, y: 50}, string: String(state.grade)}];
    }


    const view = {render};
    const model = {throwDie, nextRandom, generateGrade};
    const controller = {onKeyDown};
    return {view, model, controller};
}


function whack() {

    function distance(p, q) {
        x1 = p.x;
        x2 = q.x;
        y1 = p.y;
        y2 = q.y;

        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    }

    function nextRandomNumber(n) {
        return (4578 * n ** 2 - 976161 * n + 6156489) % 79729693;
    }

    function shrinkMole(mole, amount) {
        let x = mole.size;
        x -= amount;
        x = (x < 0) ? 0 : x;
        return {position: mole.position, size: x};
    }

    function shrinkMoles(moles, amount) {
        let result = [];
        for (let i = 0; i < moles.length; i++) {
            let temp = moles[i];
            result.push(shrinkMole(temp, amount));
        }
        return result;
    }

    function removeZeroSizedMoles(moles) {
        let copy = [];
        for (let i = 0; i < moles.length; i++) {
            let mole = moles[i];
            if (mole.size > 0) {
                copy.push(mole);
            }
        }
        return copy;
    }

    function createMole(rng) {
        rng = nextRandomNumber(rng);
        let a = rng % 500;
        rng = nextRandomNumber(rng);
        let b = rng % 500;
        rng = nextRandomNumber(rng);
        let c = (rng % 25) + 5
        return [{position: {x: a, y: b}, size: c}, rng]
    }

    function replenishMoles(moles, rng) {
        let copy = moles.slice();
        while (copy.length < 3) {
            let temp = createMole(rng);
            rng = temp[1];
            let mole = temp[0]
            copy.push(mole);
        }
        return [copy, rng];
    }

    function findMoleAt(moles, position) {
        for (let i = 0; i < moles.length; i++) {
            if (distance(moles[i].position, position) < moles[i].size) {
                return i;
            }
        }
        return -1;
    }

    function removeMoleWithIndex(moles, index) {
        let copy = moles.slice();
        copy.splice(index, 1);
        return copy;
    }

    function hit(state, position) {
        if (state.health === 0) {
            return state;
        }
        let rng = state.rng;
        let health = state.health;
        let moles = state.moles;
        let index = findMoleAt(state.moles, position);
        if (index !== -1) {
            health += 5;
            moles = removeMoleWithIndex(state.moles, index);
            let temp = replenishMoles(moles,rng);
            moles = temp[0];
            rng = temp[1];
        } else {
            health = (health >=5) ? health - 5: 0;
        }
        return {moles: moles, rng: rng, timeLasted: state.timeLasted, health: health};

    }

    function advanceTime(state,dt){
        timeLasted = state.timeLasted;
        if (state.health === 0){
            return state;
        }
        let moles = shrinkMoles(state.moles,dt * 10);
        moles = removeZeroSizedMoles(moles);
        let temp = replenishMoles(moles,state.rng)
        let rng = temp[1];
        moles = temp[0];
        let health = state.health - 10 * dt;
        health = (health >=0) ? health: 0;
        timeLasted += dt;
        return {moles: moles, rng: rng, timeLasted: timeLasted, health: health};
    }

    function onTimerTick(state,dt){
        state = advanceTime(state,dt);
        return state;
    }

    function onMouseDown(state,args){
        state = hit(state,args.position);
        return state;
    }
    
    function render(state) {
        let timeLasted = Number(state.timeLasted);
        timeLasted = timeLasted.toFixed(3);
        time = {type: "text", position: {x: 250, y: 490}, string: timeLasted};
        health = {type: "text", position: {x: 250, y: 20}, string: String(state.health)}
        let result = [];
        for (let i = 0; i < state.moles.length; i++){
            let mole = state.moles[i];
            result.push({type: "circle", center: mole.position, radius: mole.size, color: "red"});
        }
        result.push(time);
        result.push(health);
        return result;
    }


    const view = {render};
    const model = {
        distance,
        nextRandomNumber,
        shrinkMole,
        shrinkMoles,
        removeZeroSizedMoles,
        createMole,
        replenishMoles,
        findMoleAt,
        removeMoleWithIndex,
        hit,
        advanceTime
    };
    const controller = {onTimerTick,onMouseDown};
    return {view, model, controller};
}

