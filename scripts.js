//TODO: dodaj tracking za to v kateri sobi je igralec

function getBipsiVar(varname) {
    const bipsi = document.getElementById("bipsi").contentWindow
    console.log(bipsi)

    console.log("Fetching variable of name: ", varname)

    var r = bipsi.PLAYBACK.variables.get(varname)
    console.log("VALUE OF ", varname, " IS: ", r)
    return r
}