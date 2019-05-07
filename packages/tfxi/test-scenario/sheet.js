const types = {
    date: Date,
    number: Number,
    // etc.
};

let currentSelection = 'A1';
function setCurrentSelection(value) {
    currentSelection = value;
}

const selections = {};

function format(selection, type) {
    selections[selection] = type;
}

export { types, currentSelection, setCurrentSelection, format };
