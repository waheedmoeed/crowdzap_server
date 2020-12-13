const jwt = require("jsonwebtoken")
const {Container} = require("typedi")
const dotenv = require("dotenv");
dotenv.config();
const bcrypt = require("bcrypt")
module.exports = class UserService{
    userModal
    kycModal
    constructor() {
        this.userModal = Container.get("userModel")
        this.kycModal = Container.get("kycModel")
    }

    async Register(userObj){
        const user = await this.userModal.findOne({email: userObj.email})
            if (user) {
                throw new Error("Email already registered")
            } else {
                const newUser = new this.userModal(userObj);
                // Hash password before saving in database
                const salt = await bcrypt.genSalt(10)
                if(salt){
                    const hash= await bcrypt.hash(newUser.password, salt)
                    if(hash){
                        newUser.password = hash;
                        const user = await this.userModal.create(newUser)
                        if(!user) throw new Error("Fail to create new user")
                        let userObject = user.toObject()
                        Reflect.deleteProperty(userObject, 'createdAt');
                        Reflect.deleteProperty(userObject, 'password');
                        Reflect.deleteProperty(userObject, 'updatedAt');
                        Reflect.deleteProperty(userObject, '__v');
                        return userObject
                    }else{
                        throw new Error("Hash error occur")
                    }
                }else{
                    throw new Error("Salt error occur")
                }
            }
    }

    async Login(email, password){
        let user = await this.userModal.findOne({email:email})
        if(!user){
            throw new Error("User not registered")
        }else{
            let compare = await bcrypt.compare(password, user.password)
            console.log(compare)
            if (compare){
                let token = await this.generateJwt(user)
                if (!token) throw new Error("Failed to generate token")
                let userObject = user.toObject()
                Reflect.deleteProperty(userObject, 'createdAt');
                Reflect.deleteProperty(userObject, 'password');
                Reflect.deleteProperty(userObject, 'updatedAt');
                Reflect.deleteProperty(userObject, '__v');
                return {user:userObject, token:token}
            }else{
                throw new Error("Password mismatch")
            }
        }
    }

    async StoreKyc(kycObj){
        const kycDoc = await this.kycModal.findOne({userId: kycObj.userId})
        if (kycDoc) {
            return false
        } else {
            const newKycDoc = new this.kycModal(kycObj);       
            const kycDoc = await this.kycModal.create(newKycDoc)
            if(!kycDoc) throw new Error("Fail to store KYC doc")
            return true
        }
    }

    generateJwt(payload){
        return jwt.sign({
            _id: payload._id,
            name: payload.name,
            email: payload.email
        },
            process.env.JWT_SECRET,
            {expiresIn: "7d",
            }
        )
    }
}