const bcrypt = require("bcryptjs")

function encode(){
    console.log(bcrypt.genSalt(16,  (err, scope) => {
        console.log(scope);
        bcrypt.hash('zillyG5TPCX3wTmnVfA76QKP4yBCjSmRwVhFJitY', scope, (err, hash) => {
            console.log(hash);
        })
    })); 
}

function decode(s){
    console.log(bcrypt.getSalt(s))
    console.log(bcrypt.getRounds(s))

}
decode("$2a$16$.c4W0kqrWE08UfcuEUr6Z.l929PWGFbqDkSvKsZa8KvbDMUEuRV9m")



// $2a$16$hTwYVvC.iYGJcqdbGBrMBu
// $2a$16$hTwYVvC.iYGJcqdbGBrMBuIY5mt.6sV9XLNfEslEjENOpu4/ELFzO ak

// $2a$16$hTwYVvC.iYGJcqdbGBrMBu