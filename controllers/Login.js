import Usertask from "../models/UserModel.js";
import GenerateWebToken from "../util/Generatetoken.js";
import bcrypt from "bcrypt"
export const Login = async (req, res) => {
    const { username, password } = req.body;

    if (username && password) {
        const userFind1 = await Usertask.findOne({
            username,
        })
        if (userFind1) {
            const comaprePassword = await bcrypt.compare(password, userFind1.password);
            if (!comaprePassword) {
                return res
                    .status(400)
                    .json({
                        message: "incorrect passsword "
                    })
            }
            const generateToken1 = await GenerateWebToken(userFind1._id, res);
            if (comaprePassword && generateToken1) {
                return res
                    .status(200)
                    .json({
                        userFind1,
                        message: "user is logged succefully"

                    })
            }




        }
        else {
            return res
                .status(200)
                .json({
                    message: "user is not register"
                }
                )
        }

    }
    else {
        return res
            .status(200
            )
            .json({
                message: "all filed are requoired"
            })

    }

}