const elementSymbols = new Map([
    ["h", "Hydrogen"],
    ["he", "Helium"],
    ["li", "Lithium"],
    ["be", "Beryllium"],
    ["b", "Boron"],
    ["c", "Carbon"],
    ["n", "Nitrogen"],
    ["o", "Oxygen"],
    ["f", "Fluorine"],
    ["ne", "Neon"],
    ["na", "Sodium"],
    ["mg", "Magnesium"],
    ["al", "Aluminum"],
    ["si", "Silicon"],
    ["p", "Phosphorus"],
    ["s", "Sulfur"],
    ["cl", "Chlorine"],
    ["ar", "Argon"],
    ["k", "Potassium"],
    ["ca", "Calcium"],
    ["sc", "Scandium"],
    ["ti", "Titanium"],
    ["v", "Vanadium"],
    ["cr", "Chromium"],
    ["mn", "Manganese"],
    ["fe", "Iron"],
    ["co", "Cobalt"],
    ["ni", "Nickel"],
    ["cu", "Copper"],
    ["zn", "Zinc"],
    ["ga", "Gallium"],
    ["ge", "Germanium"],
    ["as", "Arsenic"],
    ["se", "Selenium"],
    ["br", "Bromine"],
    ["kr", "Krypton"],
    ["rb", "Rubidium"],
    ["sr", "Strontium"],
    ["y", "Yttrium"],
    ["zr", "Zirconium"],
    ["nb", "Niobium"],
    ["mo", "Molybdenum"],
    ["tc", "Technetium"],
    ["ru", "Ruthenium"],
    ["rh", "Rhodium"],
    ["pd", "Palladium"],
    ["ag", "Silver"],
    ["cd", "Cadmium"],
    ["in", "Indium"],
    ["sn", "Tin"],
    ["sb", "Antimony"],
    ["te", "Tellurium"],
    ["i", "Iodine"],
    ["xe", "Xenon"],
    ["cs", "Cesium"],
    ["ba", "Barium"],
    ["la", "Lanthanum"],
    ["ce", "Cerium"],
    ["pr", "Praseodymium"],
    ["nd", "Neodymium"],
    ["pm", "Promethium"],
    ["sm", "Samarium"],
    ["eu", "Europium"],
    ["gd", "Gadolinium"],
    ["tb", "Terbium"],
    ["dy", "Dysprosium"],
    ["ho", "Holmium"],
    ["er", "Erbium"],
    ["tm", "Thulium"],
    ["yb", "Ytterbium"],
    ["lu", "Lutetium"],
    ["hf", "Hafnium"],
    ["ta", "Tantalum"],
    ["w", "Tungsten"],
    ["re", "Rhenium"],
    ["os", "Osmium"],
    ["ir", "Iridium"],
    ["pt", "Platinum"],
    ["au", "Gold"],
    ["hg", "Mercury"],
    ["tl", "Thallium"],
    ["pb", "Lead"],
    ["bi", "Bismuth"],
    ["po", "Polonium"],
    ["at", "Astatine"],
    ["rn", "Radon"],
    ["fr", "Francium"],
    ["ra", "Radium"],
    ["ac", "Actinium"],
    ["th", "Thorium"],
    ["pa", "Protactinium"],
    ["u", "Uranium"],
    ["np", "Neptunium"],
    ["pu", "Plutonium"],
    ["am", "Americium"],
    ["cm", "Curium"],
    ["bk", "Berkelium"],
    ["cf", "Californium"],
    ["es", "Einsteinium"],
    ["fm", "Fermium"],
    ["md", "Mendelevium"],
    ["no", "Nobelium"],
    ["lr", "Lawrencium"],
    ["rf", "Rutherfordium"],
    ["db", "Dubnium"],
    ["sg", "Seaborgium"],
    ["bh", "Bohrium"],
    ["hs", "Hassium"],
    ["mt", "Meitnerium"],
    ["ds", "Darmstadtium"],
    ["rg", "Roentgenium"],
    ["cn", "Copernicium"],
    ["nh", "Nihonium"],
    ["fl", "Flerovium"],
    ["mc", "Moscovium"],
    ["lv", "Livermorium"],
    ["ts", "Tennessine"],
    ["og", "Oganesson"]
]);

function giga(input) {
    if (input == "" || input==undefined || input==null) return []
    const inStr = input
    ntree = {data: {el: "", offset: -1}, children: []}
    //console.log([...elementSymbols.keys()][5])
    function leaves(t, arr) {
        if (t == null || t==undefined) return
        t.children.forEach(child => {
            leaves(child, arr)
        });
        if (t.children.length == 0) {
            arr.push(t)
        }
    }
    //first match to initialize stuff
    for (j = 0; j < elementSymbols.size; ++j) {
        curElem = [...elementSymbols.keys()][j]
        toCmp = inStr.substring(0, curElem.length)
        if (toCmp.toLowerCase() == curElem) {
            ntree.children.push({data: {el: toCmp, offset: curElem.length},children: []})
        }
    }

    for (i = 0; i < inStr.length; ++i) {
        lvs = []
        leaves(ntree, lvs)
        for (j = 0; j < elementSymbols.size; ++j) {
            curElem = [...elementSymbols.keys()][j]
            for (k = 0; k < lvs.length; ++k) {
                leaf = lvs[k]
                off = leaf.data.offset
                if (off+curElem.length > inStr.length) continue
                toCmp = inStr.substring(off, off + curElem.length)
                if (toCmp.toLowerCase() == curElem) {
                    leaf.children.push({data: {el: toCmp, offset: off+curElem.length}, children: []})
                }
            }
        }
    }
    //rebuild strings
    function rebuild(t, str, arr) {
        if (t == null || t==undefined) return
        t.children.forEach(child => {
            rebuild(child, str.concat("|").concat(t.data.el), arr)
        });
        if (t.children.length == 0) {
            workingStr = str.concat("|").concat(t.data.el).substring(2)
            if (inStr != workingStr.replaceAll("|", "")) return
            elements = workingStr.split('|')
            arr.push({s: workingStr.replaceAll("|", ""), e: elements})
        }
    }
    s = []
    rebuild(ntree, "", s)
    return s
}
form = document.getElementById("input")
form.addEventListener("keydown", function(e) {
    if (!((e.keyCode >= 65 && e.keyCode <= 90) || e.keyCode == 8 || e.keyCode == 32 || (e.keyCode >= 37 && e.keyCode <= 40))) {
        e.preventDefault();
        return
    }
})
form.addEventListener("keyup", function(e) {
    if (!((e.keyCode >= 65 && e.keyCode <= 90) || e.keyCode == 8 || e.keyCode == 32)) {
        e.preventDefault();
        return
    }
    tmp = ""
    images = []
    e.target.value.split(" ").forEach((el, n) => {
        res = giga(el)
        if (res.length == 0) return
        images.push([])
        console.log(res)
        res.forEach((arr, i) => {
            images[n].push([])
            arr.e.forEach((str, j) => {
                images[n][i].push(`images/${elementSymbols.get(str)}.png`)
            });
        });
    })
    // console.log(images)
    // document.getElementById("wordDisplay").textContent = tmp
    document.getElementById("imgDisplay").innerHTML = ''
    images.forEach(arr => {
        if (arr.length == 0) return//if no words could be formed
        imgHolder = document.createElement("div")
        imgHolder.setAttribute("class", `imgHolder`)
        arr.forEach(spellings => {
            innerHolder = document.createElement("div")
            innerHolder.setAttribute("class", "spelling")
            spellings.forEach(wrd => {
                toAdd = document.createElement("img")
                toAdd.setAttribute("src", wrd)
                toAdd.setAttribute("width", 40)
                toAdd.setAttribute("height", 40)
                innerHolder.appendChild(toAdd)
            })
            imgHolder.appendChild(innerHolder)
        })
        document.getElementById("imgDisplay").appendChild(imgHolder)
    })
})

