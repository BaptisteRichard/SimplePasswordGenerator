var spaces = false;
String.prototype.rtrim = function() {
    return this.replace(/\s+$/g,"");
};


function sec_rand(count) {
    let min = (-count >>> 0) % count;
    let rand = new Uint32Array(1);
    const crypto = window.crypto || window.msCrypto;

    do {
        crypto.getRandomValues(rand);
    } while (rand[0] < min);

    return rand[0] % count;
}

function generate_pass(len, set, spaces) {
    let pass = "";
    let pass_arr = "";

    if (typeof set == "string") {
        pass_arr = set.split("");
    } else {
        pass_arr = set;
    }

    pass_arr = [...new Set(pass_arr)]; // enforce unique elements in array

    for (let i = len; i > 0; i--) {
        if (spaces) {
            pass += pass_arr[sec_rand(set.length)];
            pass += " ";
        } else {
            pass += pass_arr[sec_rand(set.length)];
        }
    }

    return pass.rtrim();
}


function get_entropy() {
    return parseInt(document.querySelector("input[name='entropy']:checked").value);
}


function generate_random(count) {
    let s = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!+=&%#@.,?:_";
    let entropy = get_entropy();
    let pass_id = document.getElementById("random-pass");
    let pass_length = document.getElementById("random-length");
    let pass_entropy = document.getElementById("random-entropy");

    let len = Math.ceil(entropy / Math.log2(s.length));
    let passlist = "";

    for(var i=0;i<count;i++){
      let pass = generate_pass(len, s);
      passlist += "<p>"+pass+"</p>";
    }

    pass_length.innerHTML = len + " characters.";
    pass_id.innerHTML = passlist;
    pass_entropy.innerHTML = "~" + Math.floor(len * Math.log2(s.length)) + "-bits.";
}
