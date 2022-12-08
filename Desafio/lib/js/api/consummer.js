let _urlBase = "http://localhost/desafio/api/api";
const request = async(method, obj = null) => {
    let result = await fetch(_urlBase, { method: method, body: obj == null ? null : JSON.stringify(obj) }).then((resp) => {
        return resp.json();
    }).then((rep) => {
        return rep;
    })
    return result;
}

const Consummer = async(method, obj_) => {
    let data_ = await request("POST", {
        "obj": {
            "method": method,
            "data": obj_
        }
    });

    return data_;
}